import { buildSeed } from '@/domain/seed';

import { MockGuide, classify, parseMinutes, splitCandidates } from '../MockGuide';
import type { GuideContext } from '../types';

const TODAY = '2026-11-18';

function context(): GuideContext {
  const seed = buildSeed(TODAY);
  return { ...seed, today: TODAY, userName: 'Sam' };
}

describe('MockGuide', () => {
  const g = new MockGuide();

  it.each(['why', 'prioritize', 'stay_on_course', 'work_on_now'] as const)(
    'answers %s with citations and a threaded next action',
    async (question) => {
      const answer = await g.talk({ context: context(), question, userText: 'Help me.', history: [] });
      expect(answer.question).toBe(question);
      expect(answer.text.length).toBeGreaterThan(40);
      expect(answer.citations.length).toBeGreaterThan(0);
      expect(answer.nextAction.weekGoalId).toMatch(/^seed-goal-W/);
      expect(answer.nextAction.text.length).toBeGreaterThan(5);
    },
  );

  it('quotes the life goal in the why answer', async () => {
    const answer = await g.talk({
      context: context(),
      question: 'why',
      userText: 'Why am I emailing past clients?',
      history: [],
    });
    expect(answer.text).toContain('I run a small design studio');
  });

  it('names an unattached candidate when prioritizing', async () => {
    const answer = await g.talk({
      context: context(),
      question: 'prioritize',
      userText: 'I have a pile: email clients, training, a podcast invite.',
      history: [],
    });
    expect(answer.text).toContain('podcast invite');
    expect(answer.text).toContain('does not attach');
  });

  it('scales the now answer to the minutes given', async () => {
    const answer = await g.talk({
      context: context(),
      question: null,
      userText: 'I have 20 minutes. What do I do?',
      history: [],
    });
    expect(answer.question).toBe('work_on_now');
    expect(answer.text).toContain('20 minutes');
  });

  it('asks for the interview when there is no hierarchy', async () => {
    const answer = await g.talk({
      context: { scenes: {}, goals: {}, actions: {}, days: {}, today: TODAY, userName: null },
      question: 'why',
      userText: 'Why?',
      history: [],
    });
    expect(answer.nextAction.weekGoalId).toBeNull();
    expect(answer.text).toContain('interview');
  });

  it('distills candidates tagged to passages', async () => {
    const ctx = context();
    const passages = Object.values(ctx.scenes).flatMap((s) => s.passages);
    const candidates = await g.distillLifeGoals(passages);
    expect(candidates.length).toBeGreaterThanOrEqual(8);
    expect(candidates.length).toBeLessThanOrEqual(12);
    for (const c of candidates) {
      expect(passages.some((p) => p.id === c.passageId && p.text.includes(c.sourceQuote))).toBe(true);
    }
  });
});

describe('helpers', () => {
  it('classifies the four questions', () => {
    expect(classify('Why am I even doing this?')).toBe('why');
    expect(classify('Which should I do first? There is a pile.')).toBe('prioritize');
    expect(classify('Third week in a row I did nothing.')).toBe('stay_on_course');
    expect(classify('I have forty minutes, what do I do now?')).toBe('work_on_now');
  });

  it('parses minutes and hours', () => {
    expect(parseMinutes('I have 40 minutes')).toBe(40);
    expect(parseMinutes('about an hour')).toBe(60);
    expect(parseMinutes('half an hour')).toBe(30);
    expect(parseMinutes('no idea')).toBeNull();
  });

  it('splits candidate lists', () => {
    expect(splitCandidates('I have a pile: hire the designer, the pricing page and daycare tours.')).toEqual([
      'hire the designer',
      'the pricing page',
      'daycare tours',
    ]);
  });
});
