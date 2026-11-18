import { create } from 'zustand';
import { persist, type PersistStorage, type StorageValue } from 'zustand/middleware';

import { assertActionThreaded, assertThreaded, childrenOf } from '@/domain/hierarchy';
import { newId, nowISO } from '@/domain/ids';
import type {
  Action,
  ActionSource,
  ActionStatus,
  ConversationSession,
  ConversationTurn,
  DayRecord,
  Goal,
  GoalLevel,
  GoalStatus,
  IdealScene,
  InterviewProgress,
  LifeArea,
  SceneKind,
  Settings,
  WeeklyReviewRecord,
} from '@/domain/types';
import {
  AsyncStorageRepository,
  PERSISTED_VERSION,
  type PersistedState,
  type StateRepository,
} from '@/persistence/repository';

export const DEFAULT_SETTINGS: Settings = {
  name: null,
  reviewDay: 0,
  morningTime: '07:30',
  voiceOutput: true,
  demoMode: false,
  selfTalkLayer: false,
};

export const INITIAL_INTERVIEW: InterviewProgress = {
  step: 'welcome',
  promptIndex: 0,
  completedAt: null,
};

export interface NewGoalInput {
  level: GoalLevel;
  text: string;
  parentId?: string | null;
  scenePassageId?: string | null;
  sourceQuote?: string | null;
  why?: string | null;
  energizes?: boolean | null;
  ifThen?: string | null;
  weekStart?: string | null;
}

export interface NewActionInput {
  weekGoalId: string;
  text: string;
  source: ActionSource;
  dueDate?: string | null;
}

type Data = Omit<PersistedState, 'version'>;

export interface AppState extends Data {
  hydrated: boolean;
  setHydrated: (value: boolean) => void;

  ensureScene: (kind: SceneKind) => string;
  savePassage: (input: {
    sceneId: string;
    area: LifeArea | null;
    prompt: string;
    text: string;
    order: number;
  }) => string;

  addGoal: (input: NewGoalInput) => Goal;
  updateGoal: (id: string, patch: Partial<Omit<Goal, 'id' | 'createdAt'>>) => void;
  setGoalStatus: (id: string, status: GoalStatus) => void;
  /** Removes a goal that has no children and no actions; otherwise throws. */
  removeGoal: (id: string) => void;

  addAction: (input: NewActionInput) => Action;
  updateAction: (id: string, patch: Partial<Omit<Action, 'id' | 'createdAt'>>) => void;
  setActionStatus: (id: string, status: ActionStatus) => void;
  /** Marks the action carried and creates its open copy under `toWeekGoalId`. */
  carryAction: (id: string, toWeekGoalId: string) => Action;

  startDay: (input: {
    date: string;
    heading: string | null;
    headingActionId: string | null;
    firstStep: string | null;
    obstaclePlan: string | null;
    correction: string | null;
    innerCriticNote: string | null;
  }) => void;
  closeDay: (date: string, closingNote: string | null) => void;

  startSession: (kind: ConversationSession['kind']) => string;
  appendTurn: (sessionId: string, turn: Omit<ConversationTurn, 'id' | 'createdAt'>) => void;
  endSession: (sessionId: string) => void;

  recordReview: (input: Omit<WeeklyReviewRecord, 'id' | 'completedAt'>) => void;

  updateSettings: (patch: Partial<Settings>) => void;
  setInterview: (progress: Partial<InterviewProgress>) => void;
  completeInterview: () => void;

  /** Replaces all data (used by demo mode and by "start over"). */
  replaceData: (data: Partial<Data>) => void;
  resetAll: () => void;
}

export function emptyData(): Data {
  return {
    scenes: {},
    goals: {},
    actions: {},
    days: {},
    sessions: {},
    reviews: {},
    settings: DEFAULT_SETTINGS,
    interview: INITIAL_INTERVIEW,
  };
}

function storageFromRepository(repository: StateRepository): PersistStorage<Data> {
  return {
    async getItem(): Promise<StorageValue<Data> | null> {
      const loaded = await repository.load();
      if (!loaded) return null;
      const { version, ...state } = loaded;
      return { state, version };
    },
    async setItem(_name, value) {
      await repository.save({ version: value.version ?? PERSISTED_VERSION, ...value.state });
    },
    async removeItem() {
      await repository.clear();
    },
  };
}

export function createAppStore(repository: StateRepository) {
  return create<AppState>()(
    persist(
      (set, get) => ({
        ...emptyData(),
        hydrated: false,
        setHydrated: (hydrated) => set({ hydrated }),

        ensureScene: (kind) => {
          const existing = Object.values(get().scenes).find((s) => s.kind === kind);
          if (existing) return existing.id;
          const scene: IdealScene = {
            id: newId(),
            kind,
            passages: [],
            createdAt: nowISO(),
            updatedAt: nowISO(),
          };
          set((s) => ({ scenes: { ...s.scenes, [scene.id]: scene } }));
          return scene.id;
        },

        savePassage: ({ sceneId, area, prompt, text, order }) => {
          const scene = get().scenes[sceneId];
          if (!scene) throw new Error('Scene not found');
          const existing = scene.passages.find((p) => p.order === order);
          const passage = existing
            ? { ...existing, text, prompt, area }
            : { id: newId(), sceneId, area, prompt, text, order };
          const passages = [...scene.passages.filter((p) => p.order !== order), passage].sort(
            (a, b) => a.order - b.order,
          );
          set((s) => ({
            scenes: { ...s.scenes, [sceneId]: { ...scene, passages, updatedAt: nowISO() } },
          }));
          return passage.id;
        },

        addGoal: (input) => {
          const goal: Goal = {
            id: newId(),
            level: input.level,
            parentId: input.parentId ?? null,
            scenePassageId: input.scenePassageId ?? null,
            text: input.text.trim(),
            sourceQuote: input.sourceQuote ?? null,
            why: input.why ?? null,
            energizes: input.energizes ?? null,
            ifThen: input.ifThen ?? null,
            weekStart: input.weekStart ?? null,
            status: 'active',
            createdAt: nowISO(),
            updatedAt: nowISO(),
          };
          assertThreaded(get(), goal);
          set((s) => ({ goals: { ...s.goals, [goal.id]: goal } }));
          return goal;
        },

        updateGoal: (id, patch) => {
          const current = get().goals[id];
          if (!current) return;
          const next: Goal = { ...current, ...patch, updatedAt: nowISO() };
          if (patch.parentId !== undefined || patch.level !== undefined) {
            assertThreaded(get(), next);
          }
          set((s) => ({ goals: { ...s.goals, [id]: next } }));
        },

        setGoalStatus: (id, status) => get().updateGoal(id, { status }),

        removeGoal: (id) => {
          const state = get();
          if (childrenOf(state, id).length > 0) {
            throw new Error('Re-thread or remove the goals under this one first.');
          }
          if (Object.values(state.actions).some((a) => a.weekGoalId === id)) {
            throw new Error('Re-thread or remove the actions under this priority first.');
          }
          set((s) => {
            const goals = { ...s.goals };
            delete goals[id];
            return { goals };
          });
        },

        addAction: (input) => {
          const action: Action = {
            id: newId(),
            weekGoalId: input.weekGoalId,
            text: input.text.trim(),
            dueDate: input.dueDate ?? null,
            status: 'open',
            source: input.source,
            createdAt: nowISO(),
            closedAt: null,
          };
          assertActionThreaded(get(), action);
          set((s) => ({ actions: { ...s.actions, [action.id]: action } }));
          return action;
        },

        updateAction: (id, patch) => {
          const current = get().actions[id];
          if (!current) return;
          const next: Action = { ...current, ...patch };
          if (patch.weekGoalId !== undefined) assertActionThreaded(get(), next);
          set((s) => ({ actions: { ...s.actions, [id]: next } }));
        },

        setActionStatus: (id, status) =>
          get().updateAction(id, { status, closedAt: status === 'open' ? null : nowISO() }),

        carryAction: (id, toWeekGoalId) => {
          const current = get().actions[id];
          if (!current) throw new Error('Action not found');
          get().setActionStatus(id, 'carried');
          return get().addAction({
            weekGoalId: toWeekGoalId,
            text: current.text,
            source: 'review',
            dueDate: null,
          });
        },

        startDay: ({ date, heading, headingActionId, firstStep, obstaclePlan, correction, innerCriticNote }) => {
          const existing = get().days[date];
          const record: DayRecord = {
            date,
            startedAt: existing?.startedAt ?? nowISO(),
            heading,
            headingActionId,
            firstStep,
            obstaclePlan,
            correction,
            innerCriticNote,
            closedAt: existing?.closedAt ?? null,
            closingNote: existing?.closingNote ?? null,
          };
          set((s) => ({ days: { ...s.days, [date]: record } }));
        },

        closeDay: (date, closingNote) => {
          const existing = get().days[date] ?? {
            date,
            startedAt: null,
            heading: null,
            headingActionId: null,
            firstStep: null,
            obstaclePlan: null,
            correction: null,
            innerCriticNote: null,
            closedAt: null,
            closingNote: null,
          };
          set((s) => ({
            days: { ...s.days, [date]: { ...existing, closedAt: nowISO(), closingNote } },
          }));
        },

        startSession: (kind) => {
          const session: ConversationSession = {
            id: newId(),
            kind,
            startedAt: nowISO(),
            endedAt: null,
            turns: [],
          };
          set((s) => ({ sessions: { ...s.sessions, [session.id]: session } }));
          return session.id;
        },

        appendTurn: (sessionId, turn) => {
          const session = get().sessions[sessionId];
          if (!session) return;
          const full: ConversationTurn = { ...turn, id: newId(), createdAt: nowISO() };
          set((s) => ({
            sessions: {
              ...s.sessions,
              [sessionId]: { ...session, turns: [...session.turns, full] },
            },
          }));
        },

        endSession: (sessionId) => {
          const session = get().sessions[sessionId];
          if (!session) return;
          set((s) => ({
            sessions: { ...s.sessions, [sessionId]: { ...session, endedAt: nowISO() } },
          }));
        },

        recordReview: (input) => {
          const review: WeeklyReviewRecord = { ...input, id: newId(), completedAt: nowISO() };
          set((s) => ({ reviews: { ...s.reviews, [review.id]: review } }));
        },

        updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),

        setInterview: (progress) => set((s) => ({ interview: { ...s.interview, ...progress } })),

        completeInterview: () =>
          set((s) => ({ interview: { ...s.interview, step: 'closing', completedAt: nowISO() } })),

        replaceData: (data) => set({ ...emptyData(), ...data }),

        resetAll: () => set(emptyData()),
      }),
      {
        name: 'life-goals',
        version: PERSISTED_VERSION,
        storage: storageFromRepository(repository),
        partialize: (state): Data => ({
          scenes: state.scenes,
          goals: state.goals,
          actions: state.actions,
          days: state.days,
          sessions: state.sessions,
          reviews: state.reviews,
          settings: state.settings,
          interview: state.interview,
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      },
    ),
  );
}

export const useAppStore = createAppStore(new AsyncStorageRepository());
