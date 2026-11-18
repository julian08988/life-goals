import { PARENT_LEVEL } from './levels';
import type { Action, Goal, GoalLevel, IdealScene, ScenePassage } from './types';

/** The hierarchy as stored: normalized maps keyed by id. */
export interface HierarchyState {
  scenes: Record<string, IdealScene>;
  goals: Record<string, Goal>;
  actions: Record<string, Action>;
}

export interface GoalThread {
  /** From the goal itself up to the life goal. */
  goals: Goal[];
  /** The ideal-scene passage the life goal was distilled from, when resolvable. */
  passage: ScenePassage | null;
}

export interface ActionThread extends GoalThread {
  action: Action;
}

export type OrphanReason =
  | 'missing_parent'
  | 'parent_not_found'
  | 'parent_level_mismatch'
  | 'life_goal_without_passage'
  | 'passage_not_found'
  | 'action_without_week_goal'
  | 'action_parent_not_week';

export interface Orphan {
  kind: 'goal' | 'action';
  id: string;
  text: string;
  reason: OrphanReason;
}

export function findPassage(state: HierarchyState, passageId: string): ScenePassage | null {
  for (const scene of Object.values(state.scenes)) {
    const passage = scene.passages.find((p) => p.id === passageId);
    if (passage) return passage;
  }
  return null;
}

export function allPassages(state: HierarchyState): ScenePassage[] {
  return Object.values(state.scenes).flatMap((scene) => scene.passages);
}

/** Walk parent links from `goalId` to the life goal. Stops on a broken link. */
export function threadFor(state: HierarchyState, goalId: string): GoalThread {
  const goals: Goal[] = [];
  const seen = new Set<string>();
  let current: Goal | null = state.goals[goalId] ?? null;
  while (current && !seen.has(current.id)) {
    seen.add(current.id);
    goals.push(current);
    current = current.parentId ? (state.goals[current.parentId] ?? null) : null;
  }
  const top = goals[goals.length - 1];
  const passage =
    top && top.level === 'life' && top.scenePassageId
      ? findPassage(state, top.scenePassageId)
      : null;
  return { goals, passage };
}

export function actionThreadFor(state: HierarchyState, actionId: string): ActionThread | null {
  const action = state.actions[actionId];
  if (!action) return null;
  return { action, ...threadFor(state, action.weekGoalId) };
}

export function lifeGoalOf(state: HierarchyState, goalId: string): Goal | null {
  const { goals } = threadFor(state, goalId);
  const top = goals[goals.length - 1];
  return top && top.level === 'life' ? top : null;
}

export function childrenOf(state: HierarchyState, parentId: string): Goal[] {
  return Object.values(state.goals)
    .filter((g) => g.parentId === parentId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function goalsAtLevel(state: HierarchyState, level: GoalLevel): Goal[] {
  return Object.values(state.goals)
    .filter((g) => g.level === level)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function activeGoalsAtLevel(state: HierarchyState, level: GoalLevel): Goal[] {
  return goalsAtLevel(state, level).filter((g) => g.status === 'active');
}

export function actionsForWeekGoal(state: HierarchyState, weekGoalId: string): Action[] {
  return Object.values(state.actions)
    .filter((a) => a.weekGoalId === weekGoalId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

/** Validate a single goal's thread. Returns the reason it is an orphan, or null. */
export function goalOrphanReason(state: HierarchyState, goal: Goal): OrphanReason | null {
  const expectedParent = PARENT_LEVEL[goal.level];
  if (expectedParent === null) {
    if (!goal.scenePassageId) return 'life_goal_without_passage';
    if (!findPassage(state, goal.scenePassageId)) return 'passage_not_found';
    return null;
  }
  if (!goal.parentId) return 'missing_parent';
  const parent = state.goals[goal.parentId];
  if (!parent) return 'parent_not_found';
  if (parent.level !== expectedParent) return 'parent_level_mismatch';
  return null;
}

export function actionOrphanReason(state: HierarchyState, action: Action): OrphanReason | null {
  if (!action.weekGoalId) return 'action_without_week_goal';
  const parent = state.goals[action.weekGoalId];
  if (!parent) return 'action_without_week_goal';
  if (parent.level !== 'week') return 'action_parent_not_week';
  return null;
}

/**
 * Orphan check over the whole hierarchy. Dissolved and dropped goals are skipped;
 * they are allowed to lose their thread when the user lets them go.
 */
export function findOrphans(
  state: HierarchyState,
  options: { weekStart?: string } = {},
): Orphan[] {
  const orphans: Orphan[] = [];
  for (const goal of Object.values(state.goals)) {
    if (goal.status === 'dissolved' || goal.status === 'dropped') continue;
    if (options.weekStart && goal.level === 'week' && goal.weekStart !== options.weekStart) {
      continue;
    }
    const reason = goalOrphanReason(state, goal);
    if (reason) orphans.push({ kind: 'goal', id: goal.id, text: goal.text, reason });
  }
  for (const action of Object.values(state.actions)) {
    if (action.status === 'dropped') continue;
    if (options.weekStart) {
      const parent = state.goals[action.weekGoalId];
      if (parent && parent.weekStart !== options.weekStart) continue;
    }
    const reason = actionOrphanReason(state, action);
    if (reason) orphans.push({ kind: 'action', id: action.id, text: action.text, reason });
  }
  return orphans;
}

/** Throws when a goal would be saved without a valid thread. Used by the store. */
export function assertThreaded(state: HierarchyState, goal: Goal): void {
  const reason = goalOrphanReason(state, goal);
  if (reason) {
    throw new Error(`Goal "${goal.text}" cannot be saved: ${reason}`);
  }
}

export function assertActionThreaded(state: HierarchyState, action: Action): void {
  const reason = actionOrphanReason(state, action);
  if (reason) {
    throw new Error(`Action "${action.text}" cannot be saved: ${reason}`);
  }
}

/** Pick the passage whose words best overlap the goal text; used when the user types a life goal freehand. */
export function bestMatchingPassage(passages: ScenePassage[], text: string): ScenePassage | null {
  const words = new Set(tokenize(text));
  let best: ScenePassage | null = null;
  let bestScore = 0;
  for (const passage of passages) {
    if (!passage.text.trim()) continue;
    const score = tokenize(passage.text).filter((w) => words.has(w)).length;
    if (score > bestScore) {
      best = passage;
      bestScore = score;
    }
  }
  return best ?? passages.find((p) => p.text.trim()) ?? null;
}

/** Sentence from `text` that best overlaps `query`; falls back to the first sentence. */
export function bestMatchingSentence(text: string, query: string): string | null {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return null;
  const words = new Set(tokenize(query));
  let best = sentences[0];
  let bestScore = -1;
  for (const sentence of sentences) {
    const score = tokenize(sentence).filter((w) => words.has(w)).length;
    if (score > bestScore) {
      best = sentence;
      bestScore = score;
    }
  }
  return best;
}

export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'i', 'my', 'me', 'we', 'our', 'to', 'of', 'in', 'on',
  'at', 'for', 'with', 'that', 'this', 'it', 'is', 'was', 'had', 'have', 'has', 'be', 'been',
  'am', 'are', 'were', 'so', 'as', 'by', 'from', 'not', 'no', 'do', 'did', 'done', 'would',
  'could', 'should', 'will', 'can', 'all', 'every', 'each', 'into', 'than', 'then', 'there',
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}
