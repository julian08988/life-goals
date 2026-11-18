import type { MethodNoteKey } from '@/content/methods';
import { spokenReason } from '@/content/methods';
import { LIFE_AREAS, LIFE_AREA_LABEL } from '@/domain/levels';
import type { GoalLevel, InterviewStep, LifeArea } from '@/domain/types';

/** Spec §3: the near-term scene is 6–9 months out. */
export const NEAR_TERM_HORIZON = 'six to nine months from now';

/** Spec §6: the three lines we say out loud. "Proven" never appears in app copy. */
export const HEADLINE = 'Keep your life goals in sight. Work towards them every day.';
export const SUBLINE = 'Built on neuroscience and behavioral research.';
export const THIRD_LINE = 'No streaks. A missed day gets a correction, not a penalty.';

export interface ScenePrompt {
  area: LifeArea | null;
  prompt: string;
  spoken: string;
}

export const NEAR_TERM_PROMPTS: ScenePrompt[] = LIFE_AREAS.map((area) => ({
  area,
  prompt: `${LIFE_AREA_LABEL[area]}: what had happened?`,
  spoken: `${LIFE_AREA_LABEL[area]}. It is ${NEAR_TERM_HORIZON} and it went the way you wanted. Past tense: what had happened?`,
}));

export const END_OF_LIFE_PROMPTS: ScenePrompt[] = [
  {
    area: null,
    prompt: 'Looking back at the whole of your life, what did you build?',
    spoken: 'Now the long view. You are old and looking back on a whole life. What did you build?',
  },
  {
    area: null,
    prompt: 'Who was around you, and how did you treat them?',
    spoken: 'Who was around you at the end, and how did you treat them?',
  },
  {
    area: null,
    prompt: 'What did your body and your days let you do, late in life?',
    spoken: 'What did your body and your days let you do, late in life?',
  },
];

export interface LevelStepConfig {
  step: InterviewStep;
  level: GoalLevel;
  title: string;
  spoken: string;
  /** Asked when the goal is saved, for the want/should and body check. */
  bodyCheck: boolean;
  /** Week level: ask for the if-then plan. */
  ifThen: boolean;
  methodKey: MethodNoteKey;
}

export const LEVEL_STEPS: LevelStepConfig[] = [
  {
    step: 'five_year',
    level: 'five_year',
    title: 'Five years',
    spoken: `Pick up to five goals for the next five years. Each one serves a life goal; choose the parent first. ${spokenReason('interview.parent_picker')}`,
    bodyCheck: true,
    ifThen: false,
    methodKey: 'interview.want_vs_should',
  },
  {
    step: 'one_year',
    level: 'one_year',
    title: 'One year',
    spoken: 'Now one year out. Three to five goals, each a step toward a five-year goal. Be specific: what is true in twelve months?',
    bodyCheck: true,
    ifThen: false,
    methodKey: 'interview.want_vs_should',
  },
  {
    step: 'six_month',
    level: 'six_month',
    title: 'Six months',
    spoken: 'Six months. Three milestones, each on the way to a one-year goal.',
    bodyCheck: false,
    ifThen: false,
    methodKey: 'interview.parent_picker',
  },
  {
    step: 'month',
    level: 'month',
    title: 'This month',
    spoken: 'This month. Three goals, each moving a six-month milestone.',
    bodyCheck: false,
    ifThen: false,
    methodKey: 'interview.parent_picker',
  },
  {
    step: 'week',
    level: 'week',
    title: 'This week',
    spoken: `This week. Three priorities, each tied to a monthly goal, each with a when and a where. ${spokenReason('interview.week')}`,
    bodyCheck: false,
    ifThen: true,
    methodKey: 'interview.week',
  },
];

export const STEP_SPOKEN: Partial<Record<InterviewStep, string>> = {
  welcome: `${HEADLINE} ${SUBLINE} ${THIRD_LINE} This takes about forty-five minutes. Stop any time; you come back to the same question. ${spokenReason('interview.opening')}`,
  near_term_scene: `First, the near-term scene. ${spokenReason('interview.near_term_scene')}`,
  end_of_life_scene: `Now the end-of-life scene. ${spokenReason('interview.end_of_life_scene')}`,
  life_goals: `From your two scenes, here are life-goal candidates, each tied to your own sentence. Edit, remove, add. Keep ten to twelve. ${spokenReason('interview.life_goals')}`,
  actions: 'Last step: for each priority, name the first concrete action and the day you will do it.',
  closing: 'Done. Pick your review day and your morning time. Your week is set.',
};

export const STEP_TITLE: Record<InterviewStep, string> = {
  welcome: 'Welcome',
  near_term_scene: 'Near-term scene',
  end_of_life_scene: 'End-of-life scene',
  life_goals: 'Life goals',
  five_year: 'Five years',
  one_year: 'One year',
  six_month: 'Six months',
  month: 'This month',
  week: 'This week',
  actions: 'Next actions',
  closing: 'Set',
};
