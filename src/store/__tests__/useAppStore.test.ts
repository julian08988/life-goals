import { buildSeed } from '@/domain/seed';
import { MemoryRepository } from '@/persistence/repository';

import { selectOrphans, selectTodayActions, selectWeekThread } from '../selectors';
import { createAppStore } from '../useAppStore';

jest.mock('expo-crypto', () => {
  let n = 0;
  return { randomUUID: () => `id-${++n}` };
});

const TODAY = '2026-11-18';

function freshStore() {
  const store = createAppStore(new MemoryRepository());
  store.getState().replaceData(buildSeed(TODAY));
  return store;
}

describe('store thread enforcement', () => {
  it('refuses a goal without a parent below the life level', () => {
    const store = freshStore();
    expect(() => store.getState().addGoal({ level: 'month', text: 'Loose goal' })).toThrow(
      /missing_parent/,
    );
  });

  it('refuses a life goal without a scene passage', () => {
    const store = freshStore();
    expect(() => store.getState().addGoal({ level: 'life', text: 'Untethered' })).toThrow(
      /life_goal_without_passage/,
    );
  });

  it('refuses an action whose parent is not a week goal', () => {
    const store = freshStore();
    expect(() =>
      store.getState().addAction({ weekGoalId: 'seed-goal-M1', text: 'x', source: 'manual' }),
    ).toThrow(/action_parent_not_week/);
  });

  it('accepts a correctly threaded week priority and action', () => {
    const store = freshStore();
    const week = store.getState().addGoal({
      level: 'week',
      text: 'Call two clients',
      parentId: 'seed-goal-M1',
      weekStart: '2026-11-16',
    });
    const action = store.getState().addAction({
      weekGoalId: week.id,
      text: 'Call the first one',
      source: 'manual',
      dueDate: TODAY,
    });
    expect(selectOrphans(store.getState())).toEqual([]);
    expect(selectTodayActions(store.getState(), TODAY).map((t) => t.action.id)).toContain(action.id);
  });

  it('carries an action into a new week priority', () => {
    const store = freshStore();
    const next = store.getState().addGoal({
      level: 'week',
      text: 'Keep reading',
      parentId: 'seed-goal-M3',
      weekStart: '2026-11-23',
    });
    const copy = store.getState().carryAction('seed-action-4', next.id);
    expect(store.getState().actions['seed-action-4'].status).toBe('carried');
    expect(copy.weekGoalId).toBe(next.id);
    expect(copy.status).toBe('open');
  });
});

describe('selectors', () => {
  it("lists today's open actions with a full thread", () => {
    const store = freshStore();
    const today = selectTodayActions(store.getState(), TODAY);
    expect(today.length).toBe(3);
    for (const t of today) {
      expect(t.goals[t.goals.length - 1].level).toBe('life');
      expect(t.passage).not.toBeNull();
    }
  });

  it("builds this week's thread with three slots", () => {
    const store = freshStore();
    const slots = selectWeekThread(store.getState(), TODAY);
    expect(slots.length).toBe(3);
    expect(slots.every((s) => s.thread.goals.length === 6)).toBe(true);
  });
});
