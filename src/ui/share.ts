export const REPO_URL = 'https://github.com/alisadeghiaghili/learn-r';
export const COFFEE_URL = 'https://www.buymeacoffee.com/alisadeghil';

export const COFFEE_BUTTON_HTML = `
<div class="coffee-cta">
  <a class="bmc-btn" href="${COFFEE_URL}" target="_blank" rel="noopener noreferrer">
    <span class="bmc-cup" aria-hidden="true">☕</span>
    <span>Buy me a coffee</span>
  </a>
</div>`;

export function getShareUrl(levelId?: string | null): string {
  const url = new URL(window.location.origin + window.location.pathname);
  if (levelId) {
    url.searchParams.set('level', levelId);
  }
  return url.toString();
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fallback below */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}
