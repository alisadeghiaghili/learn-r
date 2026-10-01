import type { LevelProgress } from '../engine/types';
import { allLevels } from '../levels';

export const STORAGE_KEY = 'learn-r-progress-v2';
export const COOKIE_KEY = 'learn_r_progress';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 400; // ~400 days

export interface PersistBlob {
  progress: Record<string, LevelProgress>;
  savedAt?: string;
}

export interface CurriculumSummary {
  solvedCount: number;
  total: number;
  percent: number;
}

function readCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const parts = document.cookie.split(';');
  for (const part of parts) {
    const [rawKey, ...rest] = part.trim().split('=');
    if (rawKey !== COOKIE_KEY) continue;
    try {
      return decodeURIComponent(rest.join('='));
    } catch {
      return rest.join('=');
    }
  }
  return null;
}

function writeCookie(payload: string): void {
  if (typeof document === 'undefined') return;
  const encoded = encodeURIComponent(payload);
  document.cookie = `${COOKIE_KEY}=${encoded}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function parseBlob(raw: string | null): Record<string, LevelProgress> | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as PersistBlob | Record<string, LevelProgress>;
    if (parsed && typeof parsed === 'object' && 'progress' in parsed) {
      return (parsed as PersistBlob).progress ?? {};
    }
    return parsed as Record<string, LevelProgress>;
  } catch {
    return null;
  }
}

export function loadProgress(): Record<string, LevelProgress> {
  let fromLocal: Record<string, LevelProgress> | null = null;
  let fromCookie: Record<string, LevelProgress> | null = null;
  try {
    fromLocal = parseBlob(localStorage.getItem(STORAGE_KEY));
  } catch {
    fromLocal = null;
  }
  try {
    fromCookie = parseBlob(readCookie());
  } catch {
    fromCookie = null;
  }

  const merged: Record<string, LevelProgress> = {};
  for (const src of [fromCookie ?? {}, fromLocal ?? {}]) {
    for (const [id, prog] of Object.entries(src)) {
      if (!prog) continue;
      const prev = merged[id];
      merged[id] = {
        solved: Boolean(prog.solved || prev?.solved),
        bestStrokes:
          prev?.bestStrokes === undefined
            ? prog.bestStrokes
            : prog.bestStrokes === undefined
              ? prev.bestStrokes
              : Math.min(prev.bestStrokes, prog.bestStrokes),
      };
    }
  }
  return merged;
}

export function saveProgress(progress: Record<string, LevelProgress>): void {
  const blob: PersistBlob = { progress, savedAt: new Date().toISOString() };
  const raw = JSON.stringify(blob);
  try {
    localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    /* ignore */
  }
  writeCookie(raw);
}

export function summarizeCurriculum(progress: Record<string, LevelProgress>): CurriculumSummary {
  const total = allLevels.length;
  const solvedCount = allLevels.filter((lvl) => Boolean(progress[lvl.id]?.solved)).length;
  const percent = total > 0 ? Math.round((solvedCount / total) * 100) : 0;
  return { solvedCount, total, percent };
}
