/**
 * Visitor counter client with local deduplication & stale-while-revalidate.
 * Fetches page visitor count and renders a clean numeric stat in the toolbar.
 */

const STORAGE_KEY = 'learn-r:visitor-count-cache';
const LAST_VISIT_KEY = 'learn-r:last-visit-date';
const COUNT_API_BASE = 'https://countapi.mileshilliard.com/api/v1';
const COUNT_KEY = 'alisadeghiaghili-learn-r';
const BADGE_URL = 'https://api.visitorbadge.io/api/visitors?path=alisadeghiaghili.learn-r';
export const BASELINE_FALLBACK = 45;

export interface CachedCount {
  count: number;
  at: number;
}

/**
 * Extracts the numeric visitor count from the visitorbadge SVG payload.
 */
export function parseVisitorBadgeSvg(svg: string): number | null {
  const title = svg.match(/VISITORS:\s*([\d.,]+[KMB]?)/i);
  const raw = (title ? title[1] : '').replace(/,/g, '');
  if (!raw) return null;

  const suffix = raw.slice(-1).toUpperCase();
  const scale = { K: 1e3, M: 1e6, B: 1e9 }[suffix as 'K' | 'M' | 'B'] || 1;
  const numPart = scale > 1 ? raw.slice(0, -1) : raw;
  const numeric = Number.parseFloat(numPart) * scale;
  return Number.isFinite(numeric) && numeric >= 0 ? Math.round(numeric) : null;
}

/**
 * Synchronously retrieves cached count for instant zero-latency UI rendering.
 */
export function getCachedVisitorCount(): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const cached = JSON.parse(raw) as CachedCount;
      if (typeof cached.count === 'number' && Number.isFinite(cached.count) && cached.count > 0) {
        return Math.max(cached.count, BASELINE_FALLBACK);
      }
    }
  } catch {
    // restricted storage
  }
  return null;
}

/**
 * Saves count to local cache.
 */
function cacheCount(count: number): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ count, at: Date.now() }));
  } catch {
    // ignore
  }
}

/**
 * Checks if the user already visited today (UTC day string).
 */
function isNewDailyVisit(): boolean {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    if (lastVisit === today) {
      return false;
    }
    localStorage.setItem(LAST_VISIT_KEY, today);
    return true;
  } catch {
    return false;
  }
}

/**
 * Fetches with an explicit timeout to prevent hanging when APIs are slow or blocked.
 */
async function fetchWithTimeout(url: string, ms = 4000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json, image/svg+xml, */*',
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Retrieves the fresh visitor count from the primary API, with fallback to secondary SVG badge API,
 * updating local cache. If offline or blocked by adblockers, falls back to cached count or baseline.
 */
export async function getVisitorCount(): Promise<number | null> {
  const isNew = isNewDailyVisit();
  const action = isNew ? 'hit' : 'get';

  const [countApiRes, badgeRes] = await Promise.allSettled([
    // 1. Try CountAPI (JSON, CORS enabled, fast)
    (async () => {
      try {
        const res = await fetchWithTimeout(`${COUNT_API_BASE}/${action}/${COUNT_KEY}`, 3500);
        if (res.ok) {
          const data = (await res.json()) as { value?: number };
          if (typeof data.value === 'number' && Number.isFinite(data.value) && data.value > 0) {
            return data.value;
          }
        }
      } catch {}
      return null;
    })(),
    // 2. Try SVG Badge Provider fallback
    (async () => {
      try {
        const res = await fetchWithTimeout(BADGE_URL, 3500);
        if (res.ok) {
          const svg = await res.text();
          const count = parseVisitorBadgeSvg(svg);
          if (count !== null && count > 0) {
            return count;
          }
        }
      } catch {}
      return null;
    })(),
  ]);

  const countApiVal = countApiRes.status === 'fulfilled' ? countApiRes.value : null;
  const badgeVal = badgeRes.status === 'fulfilled' ? badgeRes.value : null;

  const validCounts = [countApiVal, badgeVal].filter(
    (v): v is number => typeof v === 'number' && Number.isFinite(v) && v > 0
  );

  if (validCounts.length > 0) {
    const highest = Math.max(...validCounts, BASELINE_FALLBACK);
    cacheCount(highest);
    return highest;
  }

  // 3. Fallback to cached count or baseline
  const cached = getCachedVisitorCount();
  if (cached !== null) {
    return Math.max(cached, BASELINE_FALLBACK);
  }

  return BASELINE_FALLBACK;
}
