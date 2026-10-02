import type { Locale, UiStrings } from './types';
import { en } from './en';
import { fa } from './fa';
import { de } from './de';

export const LOCALES: Locale[] = ['en', 'fa', 'de'];
const STORAGE_KEY = 'learn-r-locale-v1';

const catalogs: Record<Locale, UiStrings> = { en, fa, de };

let currentLocale: Locale = 'en';

export function getLocale(): Locale {
  return currentLocale;
}

export function setLocale(locale: Locale): void {
  currentLocale = locale;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
  applyDocumentLocale();
}

export function initLocale(): void {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && LOCALES.includes(saved)) {
      currentLocale = saved;
      return;
    }
    const nav = navigator.language.slice(0, 2).toLowerCase();
    if (nav === 'fa' || nav === 'pe') {
      currentLocale = 'fa';
      return;
    }
    if (nav === 'de') {
      currentLocale = 'de';
      return;
    }
  } catch {
    /* ignore */
  }
  currentLocale = 'en';
}

export function applyDocumentLocale(): void {
  if (typeof document === 'undefined') return;
  const isRtl = currentLocale === 'fa';
  document.documentElement.lang = currentLocale;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.body.classList.toggle('is-rtl', isRtl);
}

export function ui(): UiStrings {
  return catalogs[currentLocale] ?? en;
}

export * from './types';
