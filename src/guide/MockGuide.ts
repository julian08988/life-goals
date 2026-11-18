import { spokenReason } from '@/content/methods';
import { addDays, weekStartOf } from '@/domain/dates';
import { bestMatchingSentence, splitSentences, threadFor, tokenize } from '@/domain/hierarchy';
import type { Citation, FourQuestion, Goal, GuideAnswer, ProposedAction, ScenePassage } from '@/domain/types';
import { selectTodayActions, selectWeekThread, type WeekSlot } from '@/store/selectors';

import type { GuideContext, GuideProvider, LifeGoalCandidate, TalkRequest } from './types';

/**
 * Deterministic, rule-based guide. Works offline from the stored hierarchy. Answers
 * thread to the user's words and end in a next action, like the LLM guide must.
 */
export class MockGuide implements GuideProvider {
  readonly kind = 'mock';

  async talk(request: TalkRequest): Promise<GuideAnswer> {
    const { context } = request;
    const slots = selectWeekThread(context, context.today);
    if (slots.length === 0) return noWeekAnswer(context);

    const question = request.question ?? classify(request.userText);
    const focus = pickFocus(slots, request.userText);
    switch (question) {
      case 'why':
        return answerWhy(context, focus);
      case 'prioritize':
        return answerPrioritize(context, slots, request.userText);
      case 'stay_on_course':
        return answerStayOnCourse(context, slots, focus);
      case 'work_on_now':
        return answerWorkOnNow(context, slots, request.userText);
    }
  }

  async distillLifeGoals(passages: ScenePassage[]): Promise<LifeGoalCandidate[]> {
    const candidates: LifeGoalCandidate[] = [];
    for (const passage of passages) {
      const sentences = splitSentences(passage.text).filter((s) => tokenize(s).length >= 2);
      const chosen = sentences.slice(0, passage.area ? 1 : 2);
      for (const sentence of chosen) {
        candidates.push({
          text: toPresentTense(sentence),
          passageId: passage.id,
          sourceQuote: sentence,
        });
      }
      if (candidates.length >= 12) break;
    }
    return candidates.slice(0, 12);
  }
}

const KEYWORDS: Record<FourQuestion, string[]> = {
  why: ['why', 'point', 'bother', 'matter', 'reason', 'even'],
  prioritize: ['prioriti', 'first', 'order', 'pile', 'too many', 'which', 'list', 'sort'],
  stay_on_course: ['course', 'again', 'keep', 'week in a row', 'third', 'drift', 'slipp', 'failing', 'not a', 'give up'],
  work_on_now: ['now', 'minutes', 'hour', 'today', 'what do i do', 'what should i do', 'next'],
};

export function classify(text: string): FourQuestion {
  const lower = text.toLowerCase();
  let best: FourQuestion = 'work_on_now';
  let bestScore = 0;
  for (const q of Object.keys(KEYWORDS) as FourQuestion[]) {
    const score = KEYWORDS[q].filter((k) => lower.includes(k)).length;
    if (score > bestScore) {
      best = q;
      bestScore = score;
    }
  }
  return best;
}

function pickFocus(slots: WeekSlot[], text: string): WeekSlot {
  const words = new Set(tokenize(text));
  let best = slots[0];
  let bestScore = -1;
  for (const slot of slots) {
    const haystack = [slot.priority.text, ...slot.thread.goals.map((g) => g.text), ...slot.actions.map((a) => a.text)].join(' ');
    const score = tokenize(haystack).filter((w) => words.has(w)).length;
    if (score > bestScore) {
      best = slot;
      bestScore = score;
    }
  }
  return best;
}

function citeGoal(goal: Goal): Citation {
  return { kind: 'goal', id: goal.id, quote: goal.text };
}

function nextActionFor(slot: WeekSlot, text: string): ProposedAction {
  return { text, weekGoalId: slot.priority.id, servesText: slot.priority.text };
}

function firstOpenAction(slot: WeekSlot) {
  return slot.actions.find((a) => a.status === 'open') ?? null;
}

function closing(): string {
  return `Say when you will do it. ${spokenReason('talk.closing')}`;
}

function answerWhy(ctx: GuideContext, slot: WeekSlot): GuideAnswer {
  const chain = slot.thread.goals;
  const life = chain[chain.length - 1];
  const steps = chain.slice(1).map((g) => `"${g.text}"`);
  const passage = slot.thread.passage;
  const whyLine = life.why ? ` You said why: "${life.why}".` : '';
  const sceneLine = passage ? ` Your own words: "${bestMatchingSentence(passage.text, life.text) ?? passage.text}".` : '';
  const text =
    `"${slot.priority.text}" serves ${steps.join(', which serves ')}.${whyLine}${sceneLine} ` +
    `Does that still hold? If yes, the next step is small. If no, say so and we re-plan this slot. ` +
    closing();
  const open = firstOpenAction(slot);
  return {
    question: 'why',
    text,
    citations: [
      ...chain.map(citeGoal),
      ...(passage ? [{ kind: 'passage' as const, id: passage.id, quote: passage.text }] : []),
    ],
    nextAction: nextActionFor(slot, open ? `Today: ${open.text}` : `Today, 20 minutes on "${slot.priority.text}".`),
  };
}

function answerPrioritize(ctx: GuideContext, slots: WeekSlot[], userText: string): GuideAnswer {
  const candidates = splitCandidates(userText);
  const attached: string[] = [];
  const unattached: string[] = [];
  let firstSlot = slots[0];
  for (const c of candidates) {
    const words = new Set(tokenize(c));
    const match = slots.find((s) =>
      tokenize([s.priority.text, ...s.thread.goals.map((g) => g.text)].join(' ')).some((w) => words.has(w)),
    );
    if (match) {
      attached.push(`"${c}" serves "${match.thread.goals[1]?.text ?? match.priority.text}".`);
      firstSlot = match;
    } else {
      unattached.push(c);
    }
  }
  const carried = slots.find((s) => wasCarriedBefore(ctx, s.priority));
  const lead = carried ?? firstSlot;
  const parts: string[] = [];
  if (attached.length) parts.push(attached.join(' '));
  if (unattached.length) {
    parts.push(
      `${unattached.map((u) => `"${u}"`).join(', ')} ${unattached.length === 1 ? 'does' : 'do'} not attach to anything you set. Name the goal it serves and we add it; otherwise it waits.`,
    );
  }
  if (candidates.length === 0) {
    parts.push(`This week you have ${slots.length} priorities: ${slots.map((s) => `"${s.priority.text}"`).join('; ')}.`);
  }
  parts.push(
    carried
      ? `"${carried.priority.text}" was carried from last week, so it goes first.`
      : `"${lead.priority.text}" goes first.`,
  );
  const open = firstOpenAction(lead);
  parts.push(closing());
  return {
    question: 'prioritize',
    text: parts.join(' '),
    citations: slots.map((s) => citeGoal(s.priority)),
    nextAction: nextActionFor(lead, open ? `Tomorrow morning, 60 minutes: ${open.text}` : `Tomorrow morning, 60 minutes on "${lead.priority.text}".`),
  };
}

function answerStayOnCourse(ctx: GuideContext, slots: WeekSlot[], slot: WeekSlot): GuideAnswer {
  const month = slot.thread.goals[1];
  const history = month ? pastWeeksFor(ctx, month.id) : [];
  const slipped = history.filter((g) => g.status !== 'done');
  const pattern =
    history.length === 0
      ? `This is the first week on "${slot.priority.text}", so there is no pattern yet.`
      : slipped.length === 0
        ? `The last ${history.length} week${history.length > 1 ? 's' : ''} on "${month?.text}" closed as done. You are on course.`
        : `${slipped.length} of the last ${history.length} weeks on "${month?.text}" closed as ${slipped.map((g) => g.status).join(' and ')}. That is the data.`;
  const text =
    `${pattern} Two honest options: it is still a goal you want and it is slipping, so we shrink the step; or its season changed, so we move it and say so out loud. ` +
    `Which is it? A re-plan is a legitimate outcome. ${spokenReason('morning.correction')} ` +
    closing();
  const open = firstOpenAction(slot);
  return {
    question: 'stay_on_course',
    text,
    citations: [citeGoal(slot.priority), ...(month ? [citeGoal(month)] : [])],
    nextAction: nextActionFor(slot, open ? `Smallest version, 15 minutes: ${open.text}` : `15 minutes on "${slot.priority.text}", today.`),
  };
}

function answerWorkOnNow(ctx: GuideContext, slots: WeekSlot[], userText: string): GuideAnswer {
  const minutes = parseMinutes(userText);
  const today = selectTodayActions(ctx, ctx.today);
  const named = ctx.days[ctx.today]?.headingActionId;
  const pick = today.find((t) => t.action.id === named) ?? today[0] ?? null;
  const slot = pick ? slots.find((s) => s.priority.id === pick.action.weekGoalId) ?? slots[0] : pickFocus(slots, userText);
  const goal = slot.thread.goals[1]?.text ?? slot.priority.text;
  const actionText = pick ? pick.action.text : `the first step of "${slot.priority.text}"`;
  const scale = minutes
    ? minutes < 30
      ? ` ${minutes} minutes is enough for the first two minutes of it, done properly. That alone counts as on course.`
      : ` ${minutes} minutes fits it.`
    : '';
  const text =
    `One thing: ${actionText}. It serves "${goal}".${scale} ` +
    `${spokenReason('morning.first_two_minutes')} Tell me the first two minutes, then go. ` +
    closing();
  return {
    question: 'work_on_now',
    text,
    citations: [citeGoal(slot.priority), ...(pick ? [{ kind: 'action' as const, id: pick.action.id, quote: pick.action.text }] : [])],
    nextAction: nextActionFor(slot, `Now${minutes ? `, ${minutes} minutes` : ''}: ${pick ? pick.action.text : `start "${slot.priority.text}"`}`),
  };
}

function noWeekAnswer(ctx: GuideContext): GuideAnswer {
  const hasGoals = Object.values(ctx.goals).some((g) => g.level === 'month' && g.status === 'active');
  return {
    question: null,
    text: hasGoals
      ? 'There are no priorities set for this week yet. Run the Weekly Review and pick three, each tied to a monthly goal. Then ask me again.'
      : 'I do not have your goals yet. Finish the interview first; then I can answer from your own words.',
    citations: [],
    nextAction: {
      text: hasGoals ? 'Open Weekly Review and set this week\'s three priorities.' : 'Finish the interview.',
      weekGoalId: null,
      servesText: null,
    },
  };
}

function wasCarriedBefore(ctx: GuideContext, priority: Goal): boolean {
  if (!priority.parentId || !priority.weekStart) return false;
  const lastWeek = addDays(priority.weekStart, -7);
  return Object.values(ctx.goals).some(
    (g) => g.level === 'week' && g.parentId === priority.parentId && g.weekStart === lastWeek && g.status === 'carried',
  );
}

function pastWeeksFor(ctx: GuideContext, monthGoalId: string): Goal[] {
  const thisWeek = weekStartOf(ctx.today);
  return Object.values(ctx.goals)
    .filter((g) => g.level === 'week' && g.parentId === monthGoalId && g.weekStart && g.weekStart < thisWeek)
    .sort((a, b) => (a.weekStart ?? '').localeCompare(b.weekStart ?? ''))
    .slice(-4);
}

export function splitCandidates(text: string): string[] {
  const afterColon = text.includes(':') ? text.slice(text.indexOf(':') + 1) : text;
  return afterColon
    .split(/,|;|\band\b|\n/)
    .map((s) => s.replace(/[.?!]+$/, '').trim())
    .filter((s) => s.length > 2 && !/^(i have|i've got|a pile|there's)/i.test(s));
}

export function parseMinutes(text: string): number | null {
  const m = text.match(/(\d+)\s*(min|minutes|m\b)/i);
  if (m) return Number(m[1]);
  const h = text.match(/(\d+(?:\.\d+)?|an?|half an?)\s*(hour|hr)/i);
  if (h) {
    const n = h[1].startsWith('half') ? 0.5 : /^an?$/.test(h[1]) ? 1 : Number(h[1]);
    return Math.round(n * 60);
  }
  return null;
}

function toPresentTense(sentence: string): string {
  return sentence
    .replace(/^I (had|have) /, 'I have ')
    .replace(/\bI was\b/g, 'I am')
    .replace(/\bwe were\b/gi, 'we are')
    .replace(/\bwe had\b/gi, 'we have')
    .replace(/\bbecame\b/g, 'is')
    .replace(/\bkept\b/g, 'keep')
    .replace(/\bleft\b/g, 'leave')
    .replace(/\bpublished\b/g, 'publish')
    .replace(/\bpassed\b/g, 'pass')
    .replace(/\bmoved\b/g, 'move')
    .replace(/\bbuilt\b/g, 'build')
    .replace(/\bmentored\b/g, 'mentor')
    .replace(/\btrained\b/g, 'train')
    .replace(/\boverpaid\b/g, 'overpay')
    .replace(/\bstopped\b/g, 'stop')
    .replace(/\bspent\b/g, 'spend')
    .replace(/\bsaw\b/g, 'see')
    .replace(/\bknew\b/g, 'know')
    .replace(/\bdid\b/g, 'do')
    .replace(/\.$/, '')
    .concat('.');
}
