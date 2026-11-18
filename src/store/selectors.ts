import { todayISO, weekStartOf } from '@/domain/dates';
import {
  actionThreadFor,
  actionsForWeekGoal,
  findOrphans,
  threadFor,
  type ActionThread,
  type GoalThread,
  type HierarchyState,
  type Orphan,
} from '@/domain/hierarchy';
import type { Action, DayRecord, Goal } from '@/domain/types';

export interface WeekSlot {
  priority: Goal;
  thread: GoalThread;
  actions: Action[];
}

/** Week-level goals for the week containing `date`, with their threads and actions. */
export function selectWeekThread(state: HierarchyState, date: string = todayISO()): WeekSlot[] {
  const weekStart = weekStartOf(date);
  return Object.values(state.goals)
    .filter((g) => g.level === 'week' && g.weekStart === weekStart && g.status !== 'dissolved')
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map((priority) => ({
      priority,
      thread: threadFor(state, priority.id),
      actions: actionsForWeekGoal(state, priority.id),
    }));
}

/**
 * Today's actions with their full thread. An action counts as "today" when it is open
 * and due today, overdue, or undated within the current week.
 */
export function selectTodayActions(state: HierarchyState, date: string = todayISO()): ActionThread[] {
  const weekStart = weekStartOf(date);
  const out: ActionThread[] = [];
  for (const action of Object.values(state.actions)) {
    if (action.status !== 'open') continue;
    const parent = state.goals[action.weekGoalId];
    if (!parent || parent.weekStart !== weekStart) continue;
    if (action.dueDate && action.dueDate > date) continue;
    const thread = actionThreadFor(state, action.id);
    if (thread) out.push(thread);
  }
  return out.sort((a, b) => {
    const da = a.action.dueDate ?? '9999';
    const db = b.action.dueDate ?? '9999';
    return da.localeCompare(db) || a.action.createdAt.localeCompare(b.action.createdAt);
  });
}

export function selectDoneToday(state: HierarchyState, date: string = todayISO()): ActionThread[] {
  const out: ActionThread[] = [];
  for (const action of Object.values(state.actions)) {
    if (action.status !== 'done' || !action.closedAt?.startsWith(date)) continue;
    const thread = actionThreadFor(state, action.id);
    if (thread) out.push(thread);
  }
  return out;
}

export function selectOrphans(state: HierarchyState, weekStart?: string): Orphan[] {
  return findOrphans(state, weekStart ? { weekStart } : {});
}

export function selectHasHierarchy(state: HierarchyState): boolean {
  return Object.values(state.goals).some((g) => g.level === 'life' && g.status === 'active');
}

/** The "why" line for an action: the life goal (or highest ancestor) in the user's words. */
export function whyLineFor(thread: GoalThread): string | null {
  const top = thread.goals[thread.goals.length - 1];
  if (!top) return null;
  return top.why ?? top.text;
}

/** Monthly goals untouched by any weekly priority for the last two completed weeks. */
export function selectNeglectedMonthGoals(state: HierarchyState, date: string = todayISO()): Goal[] {
  const thisWeek = weekStartOf(date);
  const weeks = Object.values(state.goals)
    .filter((g) => g.level === 'week' && g.weekStart && g.weekStart < thisWeek)
    .map((g) => g.weekStart as string);
  const distinct = Array.from(new Set(weeks)).sort().slice(-2);
  if (distinct.length < 2) return [];
  const served = new Set(
    Object.values(state.goals)
      .filter((g) => g.level === 'week' && g.weekStart && distinct.includes(g.weekStart))
      .map((g) => g.parentId),
  );
  return Object.values(state.goals).filter(
    (g) => g.level === 'month' && g.status === 'active' && !served.has(g.id),
  );
}

export function dayRecordFor(days: Record<string, DayRecord>, date: string): DayRecord | null {
  return days[date] ?? null;
}
