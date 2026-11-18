import { addDays, weekStartOf } from '@/domain/dates';
import { threadFor } from '@/domain/hierarchy';
import { LEVEL_LABEL } from '@/domain/levels';
import type { Goal } from '@/domain/types';
import { selectTodayActions, selectWeekThread } from '@/store/selectors';

import type { GuideContext } from './types';

/**
 * Serializes the context pack the guide reads each turn (spec §2): the whole hierarchy,
 * the active week, today's actions, recent outcomes. Small enough to send whole.
 */
export function renderContextPack(ctx: GuideContext): string {
  const lines: string[] = [];
  if (ctx.userName) lines.push(`User name: ${ctx.userName}`);
  lines.push(`Today: ${ctx.today}`);

  lines.push('', '# Ideal scenes (verbatim, the user\'s words)');
  for (const scene of Object.values(ctx.scenes)) {
    lines.push(`## ${scene.kind === 'near_term' ? 'Near-term scene' : 'End-of-life scene'}`);
    for (const p of scene.passages) lines.push(`- [passage ${p.id}] ${p.text}`);
  }

  lines.push('', '# Goal hierarchy (verbatim)');
  const life = Object.values(ctx.goals).filter((g) => g.level === 'life' && g.status === 'active');
  for (const goal of life) renderGoalTree(ctx, goal, 0, lines);

  lines.push('', '# This week');
  for (const slot of selectWeekThread(ctx, ctx.today)) {
    const parent = slot.thread.goals[1];
    lines.push(
      `- [goal ${slot.priority.id}] ${slot.priority.text} (serves: ${parent?.text ?? 'unknown'})` +
        (slot.priority.ifThen ? ` if-then: ${slot.priority.ifThen}` : ''),
    );
    for (const action of slot.actions) {
      lines.push(`  - [action ${action.id}] (${action.status}${action.dueDate ? `, due ${action.dueDate}` : ''}) ${action.text}`);
    }
  }

  lines.push('', '# Today\'s open actions');
  for (const t of selectTodayActions(ctx, ctx.today)) {
    lines.push(`- [action ${t.action.id}] ${t.action.text} → ${t.goals.map((g) => g.text).join(' → ')}`);
  }

  lines.push('', '# Last two weeks of outcomes');
  const thisWeek = weekStartOf(ctx.today);
  const past = Object.values(ctx.goals).filter(
    (g) => g.level === 'week' && g.weekStart && g.weekStart < thisWeek && g.weekStart >= addDays(thisWeek, -14),
  );
  for (const g of past) lines.push(`- week of ${g.weekStart}: ${g.status}: ${g.text}`);

  const yesterday = ctx.days[addDays(ctx.today, -1)];
  if (yesterday) {
    lines.push('', '# Yesterday');
    if (yesterday.heading) lines.push(`- named thing: ${yesterday.heading}`);
    if (yesterday.closingNote) lines.push(`- close-of-day: ${yesterday.closingNote}`);
  }
  return lines.join('\n');
}

function renderGoalTree(ctx: GuideContext, goal: Goal, depth: number, out: string[]) {
  const indent = '  '.repeat(depth);
  const why = goal.why ? ` why: "${goal.why}"` : '';
  const quote = goal.level === 'life' && goal.sourceQuote ? ` from: "${goal.sourceQuote}"` : '';
  out.push(`${indent}- [goal ${goal.id}] ${LEVEL_LABEL[goal.level]}: ${goal.text}${why}${quote}`);
  const children = Object.values(ctx.goals)
    .filter((g) => g.parentId === goal.id && g.status !== 'dissolved' && g.level !== 'week')
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  for (const child of children) renderGoalTree(ctx, child, depth + 1, out);
}

export function describeThread(ctx: GuideContext, goalId: string): string {
  return threadFor(ctx, goalId)
    .goals.map((g) => `"${g.text}"`)
    .join(', which serves ');
}
