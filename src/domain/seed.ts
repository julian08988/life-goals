/**
 * Demo hierarchy for review. Entirely invented: a fictional product designer who
 * wants a small studio, a strong body, a paid-off home and a sailing licence.
 * Nothing here comes from a real person.
 */
import { addDays, todayISO, weekStartOf } from './dates';
import type { Action, DayRecord, Goal, GoalLevel, IdealScene, LifeArea, ScenePassage } from './types';

export interface SeedData {
  scenes: Record<string, IdealScene>;
  goals: Record<string, Goal>;
  actions: Record<string, Action>;
  days: Record<string, DayRecord>;
}

const T0 = '2026-01-05T08:00:00.000Z';

function at(offsetMinutes: number): string {
  return new Date(new Date(T0).getTime() + offsetMinutes * 60_000).toISOString();
}

const NEAR_TERM: { area: LifeArea; prompt: string; text: string }[] = [
  {
    area: 'personal_growth',
    prompt: 'Personal growth: what had happened?',
    text: 'I kept a simple routine: up at six, thirty minutes of Spanish, then the day. I stopped treating rest as something to earn.',
  },
  {
    area: 'work',
    prompt: 'Work: what had happened?',
    text: 'I left the agency and the studio had its first retainer client. The work was smaller and better. I said no twice and it was fine.',
  },
  {
    area: 'relationships',
    prompt: 'Relationships: what had happened?',
    text: 'Sunday dinner with Ana became fixed. We talked about money without a fight. I saw my brother every month.',
  },
  {
    area: 'creative',
    prompt: 'Creative expression: what had happened?',
    text: 'I published one essay a month. Short, honest, mine. A few people wrote back and that was enough.',
  },
  {
    area: 'money',
    prompt: 'Money: what had happened?',
    text: 'We overpaid the mortgage every quarter. I knew the numbers without checking. Money got boring, which is what I wanted.',
  },
  {
    area: 'lifestyle',
    prompt: 'Lifestyle: what had happened?',
    text: 'We moved closer to the water. Mornings were mine before anyone needed me. I trained twice a week without negotiating with myself.',
  },
  {
    area: 'leisure',
    prompt: 'Leisure and travel: what had happened?',
    text: 'I passed the day-skipper theory and spent ten days on the water. One weekend I took the boat out alone.',
  },
  {
    area: 'world',
    prompt: 'The world: what had happened?',
    text: 'I mentored two younger designers and told them the things nobody told me.',
  },
];

const END_OF_LIFE: { prompt: string; text: string }[] = [
  {
    prompt: 'Looking back at the whole of your life, what did you build?',
    text: 'I built a small studio that did work I was proud of for thirty years, and I never grew it past the point where I knew everyone by name.',
  },
  {
    prompt: 'Who was around you, and how did you treat them?',
    text: 'Ana and I kept choosing each other. My friends were the same six people for forty years. I showed up.',
  },
  {
    prompt: 'What did your body let you do late in life?',
    text: 'At seventy I still did a long hike every year and sailed across open water on my own.',
  },
];

interface SeedGoal {
  key: string;
  level: GoalLevel;
  text: string;
  parent?: string;
  passage?: number;
  why?: string;
  energizes?: boolean;
  ifThen?: string;
  weekOffset?: number;
  status?: Goal['status'];
  sourceQuote?: string;
}

const GOALS: SeedGoal[] = [
  { key: 'L1', level: 'life', text: 'I run a small design studio that does work I am proud of.', passage: 1, why: 'So the work is mine and I know everyone by name.' },
  { key: 'L2', level: 'life', text: 'I am strong and can still do a long hike at seventy.', passage: 10, why: 'So my body never decides what I get to do.' },
  { key: 'L3', level: 'life', text: 'Ana and I stay close and keep choosing each other.', passage: 2 },
  { key: 'L4', level: 'life', text: 'I have a close circle of six friends I see every month.', passage: 9 },
  { key: 'L5', level: 'life', text: 'I own our home outright and money is boring.', passage: 4 },
  { key: 'L6', level: 'life', text: 'I can sail a small boat across open water on my own.', passage: 6, why: 'Because I want to be the kind of person who can go.' },
  { key: 'L7', level: 'life', text: 'I write one honest essay a month and publish it.', passage: 3 },
  { key: 'L8', level: 'life', text: 'I speak Spanish well enough to live in it.', passage: 0 },
  { key: 'L9', level: 'life', text: 'I mentor two younger designers a year.', passage: 7 },
  { key: 'L10', level: 'life', text: 'I live near water, with mornings that are mine.', passage: 5 },

  { key: 'F1', level: 'five_year', text: 'The studio has three people and twelve months of runway.', parent: 'L1', energizes: true },
  { key: 'F2', level: 'five_year', text: 'I have done a four-day trek with no knee pain.', parent: 'L2', energizes: true },
  { key: 'F3', level: 'five_year', text: 'The mortgage is under half of what it is today.', parent: 'L5', energizes: true },
  { key: 'F4', level: 'five_year', text: 'I hold a coastal skipper licence and have crossed the channel.', parent: 'L6', energizes: true },
  { key: 'F5', level: 'five_year', text: 'Sixty essays published and a small list of readers who write back.', parent: 'L7', energizes: true },

  { key: 'Y1', level: 'one_year', text: 'The studio is a registered company with two retainer clients.', parent: 'F1', energizes: true },
  { key: 'Y2', level: 'one_year', text: 'I run 10 km comfortably and strength-train twice a week.', parent: 'F2', energizes: true },
  { key: 'Y3', level: 'one_year', text: 'One extra mortgage payment every quarter.', parent: 'F3', energizes: true },
  { key: 'Y4', level: 'one_year', text: 'Day-skipper course done and ten days sailed.', parent: 'F4', energizes: true },
  { key: 'Y5', level: 'one_year', text: 'Twelve essays published, one a month.', parent: 'F5', energizes: true },

  { key: 'S1', level: 'six_month', text: 'First retainer client signed.', parent: 'Y1' },
  { key: 'S2', level: 'six_month', text: 'Strength training twice a week is a habit I do not negotiate.', parent: 'Y2' },
  { key: 'S3', level: 'six_month', text: 'Day-skipper theory passed.', parent: 'Y4' },

  { key: 'M1', level: 'month', text: 'Three discovery calls with past clients about a retainer.', parent: 'S1' },
  { key: 'M2', level: 'month', text: 'Eight training sessions this month.', parent: 'S2' },
  { key: 'M3', level: 'month', text: 'Theory chapters one to four finished.', parent: 'S3' },

  { key: 'W1', level: 'week', text: 'Email five past clients and book two calls.', parent: 'M1', weekOffset: 0, ifThen: 'If it is Tuesday at 9:00, then I open the client list and send the first email.' },
  { key: 'W2', level: 'week', text: 'Two training sessions, Tuesday and Friday.', parent: 'M2', weekOffset: 0, ifThen: 'If it is 7:00 on Tuesday or Friday, then I put my shoes on before I check my phone.' },
  { key: 'W3', level: 'week', text: 'Read theory chapters one and two.', parent: 'M3', weekOffset: 0, ifThen: 'If dinner is cleared, then I read one section before anything else.' },

  { key: 'P1', level: 'week', text: 'List every past client with a one-line note on what we did.', parent: 'M1', weekOffset: -1, status: 'done' },
  { key: 'P2', level: 'week', text: 'Two training sessions.', parent: 'M2', weekOffset: -1, status: 'done' },
  { key: 'P3', level: 'week', text: 'Buy the theory book and read the introduction.', parent: 'M3', weekOffset: -1, status: 'carried' },
];

interface SeedAction {
  week: string;
  text: string;
  dayOffset: number | null;
  status?: Action['status'];
}

const ACTIONS: SeedAction[] = [
  { week: 'W1', text: 'Draft the retainer email in plain sentences.', dayOffset: 0 },
  { week: 'W1', text: 'Send it to the first five past clients.', dayOffset: 1 },
  { week: 'W2', text: 'Training session: squats, rows, twenty minutes.', dayOffset: 0 },
  { week: 'W2', text: 'Training session: Friday.', dayOffset: 3 },
  { week: 'W3', text: 'Read chapter one of the theory book.', dayOffset: 0 },
  { week: 'W3', text: 'Read chapter two.', dayOffset: 2 },
  { week: 'P1', text: 'Export the old invoices to a sheet.', dayOffset: -6, status: 'done' },
  { week: 'P1', text: 'Write one line per client.', dayOffset: -5, status: 'done' },
  { week: 'P2', text: 'Training session: Tuesday.', dayOffset: -6, status: 'done' },
  { week: 'P2', text: 'Training session: Friday.', dayOffset: -3, status: 'done' },
  { week: 'P3', text: 'Order the theory book.', dayOffset: -6, status: 'done' },
  { week: 'P3', text: 'Read the introduction.', dayOffset: -2, status: 'carried' },
];

export function buildSeed(today: string = todayISO()): SeedData {
  const thisWeek = weekStartOf(today);
  const passages: ScenePassage[] = [];

  const nearScene: IdealScene = {
    id: 'seed-scene-near',
    kind: 'near_term',
    passages: NEAR_TERM.map((p, i) => ({
      id: `seed-passage-near-${i}`,
      sceneId: 'seed-scene-near',
      area: p.area,
      prompt: p.prompt,
      text: p.text,
      order: i,
    })),
    createdAt: at(0),
    updatedAt: at(40),
  };
  const endScene: IdealScene = {
    id: 'seed-scene-end',
    kind: 'end_of_life',
    passages: END_OF_LIFE.map((p, i) => ({
      id: `seed-passage-end-${i}`,
      sceneId: 'seed-scene-end',
      area: null,
      prompt: p.prompt,
      text: p.text,
      order: i,
    })),
    createdAt: at(41),
    updatedAt: at(55),
  };
  passages.push(...nearScene.passages, ...endScene.passages);

  const goals: Record<string, Goal> = {};
  const idOf = (key: string) => `seed-goal-${key}`;
  GOALS.forEach((g, i) => {
    const passage = g.passage !== undefined ? passages[g.passage] : null;
    const weekStart = g.weekOffset !== undefined ? addDays(thisWeek, g.weekOffset * 7) : null;
    goals[idOf(g.key)] = {
      id: idOf(g.key),
      level: g.level,
      parentId: g.parent ? idOf(g.parent) : null,
      scenePassageId: passage?.id ?? null,
      text: g.text,
      sourceQuote: passage ? firstSentence(passage.text) : g.parent ? goals[idOf(g.parent)].text : null,
      why: g.why ?? null,
      energizes: g.energizes ?? null,
      ifThen: g.ifThen ?? null,
      weekStart,
      status: g.status ?? 'active',
      createdAt: at(60 + i),
      updatedAt: at(60 + i),
    };
  });

  const actions: Record<string, Action> = {};
  ACTIONS.forEach((a, i) => {
    const id = `seed-action-${i}`;
    const status = a.status ?? 'open';
    const dueDate = a.dayOffset === null ? null : addDays(today, a.dayOffset);
    actions[id] = {
      id,
      weekGoalId: idOf(a.week),
      text: a.text,
      dueDate,
      status,
      source: 'seed',
      createdAt: at(200 + i),
      closedAt: status === 'open' ? null : `${dueDate ?? today}T18:00:00.000Z`,
    };
  });

  const yesterday = addDays(today, -1);
  const days: Record<string, DayRecord> = {
    [yesterday]: {
      date: yesterday,
      startedAt: `${yesterday}T07:35:00.000Z`,
      heading: 'Read the introduction.',
      headingActionId: 'seed-action-11',
      firstStep: 'Open the book at the kitchen table before coffee.',
      obstaclePlan: 'If the phone is in reach, then it goes in the drawer first.',
      correction: null,
      innerCriticNote: null,
      closedAt: `${yesterday}T21:10:00.000Z`,
      closingNote: 'Did not read. Booked the Tuesday call instead, which serves the studio.',
    },
  };

  return {
    scenes: { [nearScene.id]: nearScene, [endScene.id]: endScene },
    goals,
    actions,
    days,
  };
}

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : text;
}
