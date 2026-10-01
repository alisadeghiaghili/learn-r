import { ui } from '../i18n';
import { escapeHtml } from './dialog';

export type LogKind = 'cmd' | 'out' | 'err' | 'meta' | 'ok';

export interface LogLine {
  kind: LogKind;
  text: string;
}

const BASE_COMMANDS = [
  'help',
  'levels',
  'hint',
  'show solution',
  'reset',
  'undo',
  'sandbox',
  'clear',
  'script',
  'ls()',
  'print("Hello, R!")',
  'root <- sqrt(144)',
  'nums <- c(2, 4, 6, 8)',
  'length(nums)',
  'plot(1:10, (1:10)^2)',
  'data.frame()',
  'sapply()',
];

export class TerminalView {
  private logEl: HTMLElement;
  private inputEl: HTMLInputElement;
  private ghostEl: HTMLElement;
  private lines: LogLine[] = [];
  private history: string[] = [];
  private historyIdx = -1;
  private draft = '';
  private onSubmit: (cmd: string) => void;
  private onOpenEditor: () => void;

  constructor(
    root: HTMLElement,
    onSubmit: (cmd: string) => void,
    onOpenEditor: () => void,
  ) {
    this.onSubmit = onSubmit;
    this.onOpenEditor = onOpenEditor;
    const u = ui();

    root.innerHTML = `
      <div class="term-toolbar">
        <span class="term-status-badge">Console</span>
        <button type="button" class="btn btn-sm ghost" id="term-btn-script" title="Toggle multi-line script editor">
          ${escapeHtml(u.editorOpen)}
        </button>
      </div>
      <div class="term-log" id="term-log" role="log" aria-live="polite" dir="ltr"></div>
      <div class="term-input-row" dir="ltr">
        <label class="prompt" for="term-input">${escapeHtml(u.termPrompt)}</label>
        <div class="term-input-wrap">
          <div class="term-ghost" id="term-ghost" aria-hidden="true"></div>
          <input
            id="term-input"
            class="term-input"
            autocomplete="off"
            spellcheck="false"
            placeholder=""
            dir="ltr"
            aria-label="${escapeHtml(u.termAriaLabel)}"
          />
        </div>
      </div>
    `;

    this.logEl = root.querySelector('#term-log')!;
    this.inputEl = root.querySelector('#term-input')!;
    this.ghostEl = root.querySelector('#term-ghost')!;

    root.querySelector('#term-btn-script')?.addEventListener('click', () => {
      this.onOpenEditor();
    });

    this.inputEl.addEventListener('keydown', (e) => this.onKey(e));
    this.inputEl.addEventListener('input', () => this.syncGhost());
  }

  focus(): void {
    if (document.querySelector('.overlay .modal')) return;
    this.inputEl.focus();
    const len = this.inputEl.value.length;
    try {
      this.inputEl.setSelectionRange(len, len);
    } catch {
      /* ignore */
    }
  }

  push(kind: LogKind, text: string): void {
    this.lines.push({ kind, text });
    const row = document.createElement('div');
    row.className = `term-row is-${kind}`;
    row.textContent = text;
    this.logEl.appendChild(row);
    this.logEl.scrollTop = this.logEl.scrollHeight;
  }

  clear(): void {
    this.lines = [];
    this.logEl.replaceChildren();
  }

  private onKey(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = this.inputEl.value.trim();
      this.inputEl.value = '';
      this.syncGhost();
      if (!val) return;
      this.history.push(val);
      this.historyIdx = this.history.length;
      this.draft = '';
      this.onSubmit(val);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIdx === this.history.length) {
        this.draft = this.inputEl.value;
      }
      if (this.historyIdx > 0) {
        this.historyIdx -= 1;
        this.inputEl.value = this.history[this.historyIdx] ?? '';
        this.syncGhost();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIdx < this.history.length - 1) {
        this.historyIdx += 1;
        this.inputEl.value = this.history[this.historyIdx] ?? '';
        this.syncGhost();
      } else if (this.historyIdx === this.history.length - 1) {
        this.historyIdx = this.history.length;
        this.inputEl.value = this.draft;
        this.syncGhost();
      }
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const match = this.findMatch(this.inputEl.value);
      if (match) {
        this.inputEl.value = match;
        this.syncGhost();
      }
      return;
    }
  }

  private findMatch(prefix: string): string | null {
    if (!prefix.trim()) return null;
    return BASE_COMMANDS.find((cmd) => cmd.startsWith(prefix) && cmd !== prefix) ?? null;
  }

  private syncGhost(): void {
    const val = this.inputEl.value;
    const match = this.findMatch(val);
    if (match) {
      this.ghostEl.textContent = val + match.slice(val.length);
    } else {
      this.ghostEl.textContent = '';
    }
  }
}
