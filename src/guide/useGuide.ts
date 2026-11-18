import { useMemo } from 'react';

import { hasLLM } from '@/config/env';
import { todayISO } from '@/domain/dates';
import { useAppStore } from '@/store/useAppStore';

import { LLMGuide } from './LLMGuide';
import { MockGuide } from './MockGuide';
import type { GuideContext, GuideProvider } from './types';

let shared: GuideProvider | null = null;

export function guide(): GuideProvider {
  if (!shared) shared = hasLLM() ? new LLMGuide() : new MockGuide();
  return shared;
}

export function useGuide(): GuideProvider {
  return useMemo(() => guide(), []);
}

/** Snapshot of store state the guide reads. Call inside handlers, not during render. */
export function buildGuideContext(): GuideContext {
  const s = useAppStore.getState();
  return {
    scenes: s.scenes,
    goals: s.goals,
    actions: s.actions,
    days: s.days,
    today: todayISO(),
    userName: s.settings.name,
  };
}
