import { describe, it, expect } from 'vitest';
import { en } from '../src/i18n/en';
import { fa } from '../src/i18n/fa';
import { LOCALES } from '../src/i18n';

describe('i18n integrity', () => {
  it('supports en and fa locales', () => {
    expect(LOCALES).toContain('en');
    expect(LOCALES).toContain('fa');
  });

  it('guarantees key parity between English and Persian', () => {
    const enKeys = Object.keys(en).sort();
    const faKeys = Object.keys(fa).sort();
    expect(faKeys).toEqual(enKeys);

    for (const key of enKeys) {
      const enVal = (en as unknown as Record<string, unknown>)[key];
      const faVal = (fa as unknown as Record<string, unknown>)[key];
      expect(typeof faVal).toBe(typeof enVal);
    }
  });
});
