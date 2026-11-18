import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
  Action,
  ConversationSession,
  DayRecord,
  Goal,
  IdealScene,
  InterviewProgress,
  Settings,
  WeeklyReviewRecord,
} from '@/domain/types';

export const PERSISTED_VERSION = 1;

/** Everything the app needs to come back exactly as it was. */
export interface PersistedState {
  version: number;
  scenes: Record<string, IdealScene>;
  goals: Record<string, Goal>;
  actions: Record<string, Action>;
  days: Record<string, DayRecord>;
  sessions: Record<string, ConversationSession>;
  reviews: Record<string, WeeklyReviewRecord>;
  settings: Settings;
  interview: InterviewProgress;
}

/**
 * Where state lives. Local-first: the app reads and writes through this interface
 * only, so a later Supabase-backed implementation can sync without touching screens.
 */
export interface StateRepository {
  load(): Promise<PersistedState | null>;
  save(state: PersistedState): Promise<void>;
  clear(): Promise<void>;
}

const STORAGE_KEY = 'life-goals/state';

export class AsyncStorageRepository implements StateRepository {
  constructor(private readonly key: string = STORAGE_KEY) {}

  async load(): Promise<PersistedState | null> {
    const raw = await AsyncStorage.getItem(this.key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as PersistedState;
    } catch {
      return null;
    }
  }

  async save(state: PersistedState): Promise<void> {
    await AsyncStorage.setItem(this.key, JSON.stringify(state));
  }

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(this.key);
  }
}

/** In-memory repository for tests and for previews that must not touch the device. */
export class MemoryRepository implements StateRepository {
  private state: PersistedState | null = null;

  async load(): Promise<PersistedState | null> {
    return this.state;
  }

  async save(state: PersistedState): Promise<void> {
    this.state = state;
  }

  async clear(): Promise<void> {
    this.state = null;
  }
}
