/**
 * Domain model for the goal hierarchy.
 *
 * Invariant ("Week Weave"): every goal below the life level has a parent one level
 * up; every life goal points at the ideal-scene passage it was distilled from; every
 * action belongs to a week-level goal. Nothing is saved without a thread back to the
 * user's own words. See docs/core-product.md §5.
 */

export type LifeArea =
  | 'personal_growth'
  | 'work'
  | 'relationships'
  | 'creative'
  | 'money'
  | 'lifestyle'
  | 'leisure'
  | 'world';

export type SceneKind = 'near_term' | 'end_of_life';

export interface ScenePassage {
  id: string;
  sceneId: string;
  /** Life area for near-term passages; null for end-of-life prompts. */
  area: LifeArea | null;
  /** The question the guide asked, kept so the answer stays readable in context. */
  prompt: string;
  /** Verbatim, the user's words. */
  text: string;
  order: number;
}

export interface IdealScene {
  id: string;
  kind: SceneKind;
  passages: ScenePassage[];
  createdAt: string;
  updatedAt: string;
}

export type GoalLevel = 'life' | 'five_year' | 'one_year' | 'six_month' | 'month' | 'week';

export type GoalStatus = 'active' | 'done' | 'carried' | 'dropped' | 'dissolved';

export interface Goal {
  id: string;
  level: GoalLevel;
  /** Null only for life goals. */
  parentId: string | null;
  /** Set for life goals: the passage this goal was distilled from. */
  scenePassageId: string | null;
  /** Verbatim, the user's words. Model suggestions are overwritten by edits. */
  text: string;
  /** Sentence from the scene (or the parent) this goal threads back to. */
  sourceQuote: string | null;
  /** The user's own answer to "why does this matter?", when captured. */
  why: string | null;
  /** Body check from the method: does saying it out loud energize or drain? */
  energizes: boolean | null;
  /** Week-level implementation intention: "If it is Tuesday 7:00, then ...". */
  ifThen: string | null;
  /** Week-level only: ISO date (YYYY-MM-DD) of the Monday the priority belongs to. */
  weekStart: string | null;
  status: GoalStatus;
  createdAt: string;
  updatedAt: string;
}

export type ActionStatus = 'open' | 'done' | 'carried' | 'dropped';

export type ActionSource = 'interview' | 'morning' | 'talk' | 'review' | 'manual' | 'seed';

export interface Action {
  id: string;
  /** Parent week-level goal. Required: an action without a priority is an orphan. */
  weekGoalId: string;
  text: string;
  /** ISO date (YYYY-MM-DD) the action is meant for; null means "sometime this week". */
  dueDate: string | null;
  status: ActionStatus;
  source: ActionSource;
  createdAt: string;
  closedAt: string | null;
}

/** One day's Morning Course and close-of-day, without streaks. */
export interface DayRecord {
  date: string;
  startedAt: string | null;
  /** The one thing the user named for today, in their words. */
  heading: string | null;
  headingActionId: string | null;
  /** First two minutes of the heading action. */
  firstStep: string | null;
  /** Smallest step back on course, if yesterday slipped. */
  correction: string | null;
  closedAt: string | null;
  /** End-of-day sentence: "what did you do today the future you would recognize?" */
  closingNote: string | null;
}

export type FourQuestion = 'why' | 'prioritize' | 'stay_on_course' | 'work_on_now';

export interface Citation {
  /** Where the quote comes from. */
  kind: 'goal' | 'passage' | 'action';
  id: string;
  quote: string;
}

export interface ProposedAction {
  text: string;
  /** The week-level goal this action should thread to; null means the guide could not place it. */
  weekGoalId: string | null;
  /** Human-readable name of the goal it serves, for display. */
  servesText: string | null;
}

export interface GuideAnswer {
  question: FourQuestion | null;
  text: string;
  citations: Citation[];
  nextAction: ProposedAction;
}

export interface ConversationTurn {
  id: string;
  role: 'user' | 'guide';
  text: string;
  question: FourQuestion | null;
  nextAction: ProposedAction | null;
  citations: Citation[];
  createdAt: string;
}

export interface ConversationSession {
  id: string;
  kind: 'talk' | 'morning' | 'review' | 'interview';
  startedAt: string;
  endedAt: string | null;
  turns: ConversationTurn[];
}

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface WeeklyReviewRecord {
  id: string;
  closedWeekStart: string;
  plannedWeekStart: string;
  completedAt: string;
  /** One sentence the user said about the week, kept neutral. */
  note: string | null;
}

export interface Settings {
  name: string | null;
  /** 0 = Sunday … 6 = Saturday. */
  reviewDay: Weekday;
  /** HH:MM, 24h. */
  morningTime: string;
  voiceOutput: boolean;
  demoMode: boolean;
  /** Hook for the opt-in self-talk layer; not v1 core. */
  selfTalkLayer: boolean;
}

export const INTERVIEW_STEPS = [
  'welcome',
  'near_term_scene',
  'end_of_life_scene',
  'life_goals',
  'five_year',
  'one_year',
  'six_month',
  'month',
  'week',
  'actions',
  'closing',
] as const;

export type InterviewStep = (typeof INTERVIEW_STEPS)[number];

export interface InterviewProgress {
  step: InterviewStep;
  /** Index inside a multi-prompt step (scene passages). */
  promptIndex: number;
  completedAt: string | null;
}
