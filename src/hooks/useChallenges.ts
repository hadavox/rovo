import { useState, useCallback } from 'react';
import { BaseChallenge } from '../data/challenges';

export interface ActiveChallenge {
  instanceId: string;
  challengeId: string;
  reps?: number;
  cycleEveryDays: number;
  startDate: string;        // YYYY-MM-DD
  completedDates: string[]; // YYYY-MM-DD[]
}

const STORAGE_KEY = 'rovo_challenges';

export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function randomId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function load(): ActiveChallenge[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ActiveChallenge[]) : [];
  } catch {
    return [];
  }
}

// ── Pure helpers (all take totalDays from the BaseChallenge) ────────────────

export function expectedSessionDates(ac: ActiveChallenge, totalDays: number): string[] {
  const count = Math.ceil(totalDays / ac.cycleEveryDays);
  const dates: string[] = [];
  let current = ac.startDate;
  for (let i = 0; i < count; i++) {
    dates.push(current);
    current = addDays(current, ac.cycleEveryDays);
  }
  return dates;
}

export function isDueToday(ac: ActiveChallenge, totalDays: number): boolean {
  return expectedSessionDates(ac, totalDays).includes(todayStr());
}

export function isDoneToday(ac: ActiveChallenge): boolean {
  return ac.completedDates.includes(todayStr());
}

export function currentStreak(ac: ActiveChallenge, totalDays: number): number {
  const sessions = expectedSessionDates(ac, totalDays);
  const done = new Set(ac.completedDates);
  const today = todayStr();
  let streak = 0;
  for (let i = sessions.length - 1; i >= 0; i--) {
    if (sessions[i] > today) continue;
    if (done.has(sessions[i])) streak++;
    else break;
  }
  return streak;
}

export function nextDueDate(ac: ActiveChallenge, totalDays: number): string {
  const today = todayStr();
  return expectedSessionDates(ac, totalDays).find((d) => d > today) ?? '';
}

export function isComplete(ac: ActiveChallenge, totalDays: number): boolean {
  const sessions = expectedSessionDates(ac, totalDays);
  return sessions.length > 0 && sessions.every((d) => ac.completedDates.includes(d));
}

// ── Hook ────────────────────────────────────────────────────────────────────

export function useChallenges() {
  const [activeChallenges, setActiveChallenges] = useState<ActiveChallenge[]>(load);

  const persist = useCallback((updated: ActiveChallenge[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setActiveChallenges(updated);
  }, []);

  const startChallenge = useCallback((
    base: BaseChallenge,
    reps: number | undefined,
    cycleEveryDays: number,
  ): string => {
    const instanceId = randomId();
    const ac: ActiveChallenge = {
      instanceId,
      challengeId: base.id,
      reps,
      cycleEveryDays,
      startDate: todayStr(),
      completedDates: [],
    };
    persist([...load(), ac]);
    return instanceId;
  }, [persist]);

  const markDone = useCallback((instanceId: string, dateStr: string) => {
    persist(
      load().map((ac) =>
        ac.instanceId === instanceId && !ac.completedDates.includes(dateStr)
          ? { ...ac, completedDates: [...ac.completedDates, dateStr] }
          : ac
      )
    );
  }, [persist]);

  const abandon = useCallback((instanceId: string) => {
    persist(load().filter((ac) => ac.instanceId !== instanceId));
  }, [persist]);

  return { activeChallenges, startChallenge, markDone, abandon };
}
