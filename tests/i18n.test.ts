import { describe, it, expect } from 'vitest';
import { en } from '../src/i18n/en';
import { fa } from '../src/i18n/fa';
import { de } from '../src/i18n/de';
import { LOCALES } from '../src/i18n';
import { allLevels } from '../src/levels';
import { localizeLevel } from '../src/levels/i18n';

describe('i18n integrity', () => {
  it('supports en, fa, and de locales', () => {
    expect(LOCALES).toContain('en');
    expect(LOCALES).toContain('fa');
    expect(LOCALES).toContain('de');
  });

  it('guarantees key parity among English, Persian, and German', () => {
    const enKeys = Object.keys(en).sort();
    const faKeys = Object.keys(fa).sort();
    const deKeys = Object.keys(de).sort();
    expect(faKeys).toEqual(enKeys);
    expect(deKeys).toEqual(enKeys);

    for (const key of enKeys) {
      const enVal = (en as unknown as Record<string, unknown>)[key];
      const faVal = (fa as unknown as Record<string, unknown>)[key];
      const deVal = (de as unknown as Record<string, unknown>)[key];
      expect(typeof faVal).toBe(typeof enVal);
      expect(typeof deVal).toBe(typeof enVal);
    }
  });

  it('localizes level content across all three languages', () => {
    const first = allLevels[0]!;

    const localizedEn = localizeLevel(first, 'en');
    expect(localizedEn.lesson).toContain('Chapter 1');

    const localizedFa = localizeLevel(first, 'fa');
    expect(localizedFa.title).toContain('۰۱. مقدمه');
    expect(localizedFa.lesson).toContain('فصل ۱');

    const localizedDe = localizeLevel(first, 'de');
    expect(localizedDe.title).toContain('01. Einführung');
    expect(localizedDe.lesson).toContain('Kapitel 1');
  });

  it('covers all 29 levels across en, fa, and de without missing translations', () => {
    expect(allLevels.length).toBe(29);
    for (const level of allLevels) {
      const localizedEn = localizeLevel(level, 'en');
      const localizedFa = localizeLevel(level, 'fa');
      const localizedDe = localizeLevel(level, 'de');

      expect(localizedEn.lesson).toBeDefined();
      expect(localizedEn.lesson!.length).toBeGreaterThan(20);
      expect(localizedFa.title.length).toBeGreaterThan(0);
      expect(localizedFa.lesson).toBeDefined();
      expect(localizedFa.lesson!.length).toBeGreaterThan(20);
      expect(localizedDe.title.length).toBeGreaterThan(0);
      expect(localizedDe.lesson).toBeDefined();
      expect(localizedDe.lesson!.length).toBeGreaterThan(20);
    }
  });
});

