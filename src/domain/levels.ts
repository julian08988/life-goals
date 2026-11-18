import type { GoalLevel, LifeArea } from './types';

/** Top to bottom. */
export const GOAL_LEVELS: readonly GoalLevel[] = [
  'life',
  'five_year',
  'one_year',
  'six_month',
  'month',
  'week',
];

export const PARENT_LEVEL: Record<GoalLevel, GoalLevel | null> = {
  life: null,
  five_year: 'life',
  one_year: 'five_year',
  six_month: 'one_year',
  month: 'six_month',
  week: 'month',
};

export const CHILD_LEVEL: Record<GoalLevel, GoalLevel | null> = {
  life: 'five_year',
  five_year: 'one_year',
  one_year: 'six_month',
  six_month: 'month',
  month: 'week',
  week: null,
};

export const LEVEL_LABEL: Record<GoalLevel, string> = {
  life: 'Life goal',
  five_year: '5-year goal',
  one_year: '1-year goal',
  six_month: '6-month goal',
  month: 'This month',
  week: 'This week',
};

export const LEVEL_LABEL_PLURAL: Record<GoalLevel, string> = {
  life: 'Life goals',
  five_year: '5-year goals',
  one_year: '1-year goals',
  six_month: '6-month goals',
  month: 'Monthly goals',
  week: 'Weekly priorities',
};

/** Suggested counts from the method (docs/product-concept.md §4.2). */
export const LEVEL_TARGET: Record<GoalLevel, { min: number; max: number }> = {
  life: { min: 3, max: 12 },
  five_year: { min: 1, max: 5 },
  one_year: { min: 1, max: 5 },
  six_month: { min: 1, max: 3 },
  month: { min: 1, max: 3 },
  week: { min: 1, max: 3 },
};

export const LIFE_AREAS: readonly LifeArea[] = [
  'personal_growth',
  'work',
  'relationships',
  'creative',
  'money',
  'lifestyle',
  'leisure',
  'world',
];

export const LIFE_AREA_LABEL: Record<LifeArea, string> = {
  personal_growth: 'Personal growth',
  work: 'Work',
  relationships: 'Relationships',
  creative: 'Creative expression',
  money: 'Money',
  lifestyle: 'Lifestyle',
  leisure: 'Leisure and travel',
  world: 'The world',
};
