import { describe, expect, it } from 'vitest';
import { parseVisitorBadgeSvg } from '../src/ui/visitor-counter';

describe('parseVisitorBadgeSvg', () => {
  it('parses visitor count from visitorbadge title', () => {
    const svg = `<svg role="img" aria-label="VISITORS: 10 / 25"><title>VISITORS: 10 / 25</title></svg>`;
    expect(parseVisitorBadgeSvg(svg)).toBe(10);
  });

  it('parses formatted count with commas', () => {
    const svg = `<svg><title>VISITORS: 1,450</title></svg>`;
    expect(parseVisitorBadgeSvg(svg)).toBe(1450);
  });

  it('parses abbreviations like K and M', () => {
    const svgK = `<svg><title>VISITORS: 2.5K</title></svg>`;
    expect(parseVisitorBadgeSvg(svgK)).toBe(2500);

    const svgM = `<svg><title>VISITORS: 1.2M</title></svg>`;
    expect(parseVisitorBadgeSvg(svgM)).toBe(1200000);
  });

  it('returns null on invalid title', () => {
    const svg = `<svg><title>NO COUNT HERE</title></svg>`;
    expect(parseVisitorBadgeSvg(svg)).toBeNull();
  });
});

describe('getCachedVisitorCount', () => {
  const store = new Map<string, string>();
  (globalThis as unknown as { localStorage: Storage }).localStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: (i: number) => Array.from(store.keys())[i] ?? null,
    length: store.size,
  };

  it('reads cached value from storage when present', async () => {
    const { getCachedVisitorCount } = await import('../src/ui/visitor-counter');
    localStorage.setItem('learn-r:visitor-count-cache', JSON.stringify({ count: 2450, at: Date.now() }));
    expect(getCachedVisitorCount()).toBe(2450);
  });

  it('returns null when storage is empty or invalid', async () => {
    const { getCachedVisitorCount } = await import('../src/ui/visitor-counter');
    localStorage.removeItem('learn-r:visitor-count-cache');
    expect(getCachedVisitorCount()).toBeNull();

    localStorage.setItem('learn-r:visitor-count-cache', 'invalid-json');
    expect(getCachedVisitorCount()).toBeNull();
  });
});
