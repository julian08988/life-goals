import type { Weekday } from './types';

const DAY_MS = 24 * 60 * 60 * 1000;

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function todayISO(now: Date = new Date()): string {
  return toISODate(now);
}

export function addDays(iso: string, days: number): string {
  const date = parseISODate(iso);
  return toISODate(new Date(date.getTime() + days * DAY_MS));
}

/** Monday of the week containing `iso`. Weeks run Monday to Sunday. */
export function weekStartOf(iso: string): string {
  const date = parseISODate(iso);
  const offset = (date.getDay() + 6) % 7;
  return toISODate(new Date(date.getTime() - offset * DAY_MS));
}

export function weekdayOf(iso: string): Weekday {
  return parseISODate(iso).getDay() as Weekday;
}

export function formatWeekRange(weekStart: string): string {
  const start = parseISODate(weekStart);
  const end = parseISODate(addDays(weekStart, 6));
  const fmt = (d: Date) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  return `${fmt(start)} – ${fmt(end)}`;
}

export function formatLongDate(iso: string): string {
  return parseISODate(iso).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export const WEEKDAY_LABEL: Record<Weekday, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

/**
 * Which week a Weekly Review closes and which it plans.
 * On the weekend the current week is closed and next week planned; on a weekday the
 * previous week is closed and the current week planned, so a first review mid-week
 * still produces this week's priorities.
 */
export function resolveReviewWeeks(today: string): { closing: string; planning: string } {
  const thisWeek = weekStartOf(today);
  const day = weekdayOf(today);
  const weekend = day === 0 || day === 6;
  const closing = weekend ? thisWeek : addDays(thisWeek, -7);
  return { closing, planning: addDays(closing, 7) };
}
