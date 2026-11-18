import type { HierarchyState } from '@/domain/hierarchy';
import type { DayRecord, FourQuestion, GuideAnswer, ScenePassage } from '@/domain/types';

export interface GuideContext extends HierarchyState {
  days: Record<string, DayRecord>;
  today: string;
  userName: string | null;
}

export interface TalkRequest {
  context: GuideContext;
  /** Question the user picked from the four quick prompts, if any. */
  question: FourQuestion | null;
  userText: string;
  /** Earlier turns in this session, oldest first. */
  history: { role: 'user' | 'guide'; text: string }[];
}

export interface LifeGoalCandidate {
  text: string;
  passageId: string;
  sourceQuote: string;
}

export interface ChildGoalSuggestion {
  text: string;
  parentId: string;
}

/**
 * The guide. `MockGuide` is deterministic and offline; `LLMGuide` uses Anthropic and
 * degrades to `MockGuide` on any failure. Every answer threads to the user's words and
 * ends in a next action (spec §2 rules 1 and 2).
 */
export interface GuideProvider {
  readonly kind: 'mock' | 'llm';
  talk(request: TalkRequest): Promise<GuideAnswer>;
  /** 10–12 life-goal candidates, each tagged to a scene passage. */
  distillLifeGoals(passages: ScenePassage[]): Promise<LifeGoalCandidate[]>;
}
