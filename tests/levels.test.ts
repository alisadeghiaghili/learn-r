import { describe, it, expect } from 'vitest';
import { allLevels, getLevel, getNextLevel } from '../src/levels';

describe('Level catalog integrity', () => {
  it('contains at least 12 levels', () => {
    expect(allLevels.length).toBeGreaterThanOrEqual(12);
  });

  it('has unique ids for all levels', () => {
    const ids = allLevels.map((l) => l.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('validates every level definition', () => {
    for (const level of allLevels) {
      expect(level.id).toBeTruthy();
      expect(level.seriesId).toBe('foundations');
      expect(level.title.length).toBeGreaterThan(0);
      expect(level.brief.length).toBeGreaterThan(0);
      expect(level.goal.length).toBeGreaterThan(0);
      expect(level.hint.length).toBeGreaterThan(0);
      expect(level.par).toBeGreaterThanOrEqual(1);
      expect(level.difficulty).toBeGreaterThanOrEqual(1);
      expect(level.difficulty).toBeLessThanOrEqual(5);
      expect(level.checks.length).toBeGreaterThan(0);

      for (const check of level.checks) {
        expect(['eval', 'stdout', 'plot', 'pattern']).toContain(check.type);
        expect(check.label.length).toBeGreaterThan(0);
        if (check.type === 'eval') {
          expect(check.expr).toBeTruthy();
        }
        if (check.type === 'stdout') {
          expect(check.match).toBeTruthy();
        }
        if (check.type === 'pattern') {
          expect(check.pattern).toBeTruthy();
        }
      }
    }
  });

  it('resolves levels by id and navigates sequentially', () => {
    const first = allLevels[0]!;
    expect(getLevel(first.id)).toBe(first);

    const next = getNextLevel(first.id);
    expect(next).toBe(allLevels[1]);

    const last = allLevels[allLevels.length - 1]!;
    expect(getNextLevel(last.id)).toBeNull();
  });
});
