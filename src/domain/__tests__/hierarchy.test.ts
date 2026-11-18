import { resolveReviewWeeks, weekStartOf } from '../dates';
import {
  actionThreadFor,
  bestMatchingPassage,
  findOrphans,
  threadFor,
  type HierarchyState,
} from '../hierarchy';
import { buildSeed } from '../seed';

const TODAY = '2026-11-18';

describe('seed hierarchy', () => {
  const seed = buildSeed(TODAY);

  it('has no orphans', () => {
    expect(findOrphans(seed)).toEqual([]);
  });

  it('threads every action up to a life goal and a scene passage', () => {
    for (const action of Object.values(seed.actions)) {
      const thread = actionThreadFor(seed, action.id);
      expect(thread).not.toBeNull();
      expect(thread!.goals[0].level).toBe('week');
      expect(thread!.goals[thread!.goals.length - 1].level).toBe('life');
      expect(thread!.passage).not.toBeNull();
    }
  });

  it('places this week on the Monday of today', () => {
    const weekGoals = Object.values(seed.goals).filter((g) => g.level === 'week');
    expect(weekGoals.some((g) => g.weekStart === weekStartOf(TODAY))).toBe(true);
  });
});

describe('threadFor', () => {
  it('stops on a broken link without throwing', () => {
    const state: HierarchyState = {
      scenes: {},
      goals: {
        a: goal('a', 'week', 'missing'),
      },
      actions: {},
    };
    const thread = threadFor(state, 'a');
    expect(thread.goals.map((g) => g.id)).toEqual(['a']);
    expect(thread.passage).toBeNull();
  });
});

describe('findOrphans', () => {
  it('flags a goal whose parent is the wrong level', () => {
    const state: HierarchyState = {
      scenes: {},
      goals: {
        life: { ...goal('life', 'life', null), scenePassageId: 'p1' },
        week: goal('week', 'week', 'life'),
      },
      actions: {},
    };
    const orphans = findOrphans(state);
    expect(orphans.map((o) => [o.id, o.reason])).toEqual(
      expect.arrayContaining([
        ['life', 'passage_not_found'],
        ['week', 'parent_level_mismatch'],
      ]),
    );
  });

  it('flags an action without a week goal', () => {
    const seed = buildSeed(TODAY);
    seed.actions['stray'] = {
      id: 'stray',
      weekGoalId: 'nope',
      text: 'Do a thing',
      dueDate: null,
      status: 'open',
      source: 'manual',
      createdAt: '2026-01-01T00:00:00.000Z',
      closedAt: null,
    };
    expect(findOrphans(seed)).toEqual([
      { kind: 'action', id: 'stray', text: 'Do a thing', reason: 'action_without_week_goal' },
    ]);
  });

  it('ignores dropped goals and actions', () => {
    const seed = buildSeed(TODAY);
    seed.goals['loose'] = { ...goal('loose', 'month', null), status: 'dropped' };
    expect(findOrphans(seed)).toEqual([]);
  });
});

describe('bestMatchingPassage', () => {
  it('prefers the passage with the most shared words', () => {
    const seed = buildSeed(TODAY);
    const passages = Object.values(seed.scenes).flatMap((s) => s.passages);
    const match = bestMatchingPassage(passages, 'sail the boat alone on the water');
    expect(match?.area).toBe('leisure');
  });
});

describe('resolveReviewWeeks', () => {
  it('closes this week and plans next on a Sunday', () => {
    expect(resolveReviewWeeks('2026-11-22')).toEqual({
      closing: '2026-11-16',
      planning: '2026-11-23',
    });
  });

  it('closes last week and plans this week on a Wednesday', () => {
    expect(resolveReviewWeeks('2026-11-18')).toEqual({
      closing: '2026-11-09',
      planning: '2026-11-16',
    });
  });
});

function goal(id: string, level: HierarchyState['goals'][string]['level'], parentId: string | null) {
  return {
    id,
    level,
    parentId,
    scenePassageId: null,
    text: id,
    sourceQuote: null,
    why: null,
    energizes: null,
    ifThen: null,
    weekStart: null,
    status: 'active' as const,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  };
}
