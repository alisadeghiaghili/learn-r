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
  'lesson',
  'ls()',
  'print("Hello, R!")',
  'root <- sqrt(144)',
  'nums <- c(2, 4, 6, 8)',
  'length(nums)',
  'plot(1:10, (1:10)^2)',
  'data.frame()',
  'summary()',
  'head()',
  'tail()',
  'str()',
  'dim()',
  'nrow()',
  'ncol()',
  'names()',
  'class()',
  'typeof()',
  'mean()',
  'median()',
  'sd()',
  'var()',
  'sum()',
  'matrix()',
  'list()',
  'factor()',
  'sapply()',
  'lapply()',
  'apply()',
  'table()',
  'read.csv()',
  'write.csv()',
  'paste()',
  'paste0()',
  'seq()',
  'rep()',
  'subset()',
  'merge()',
  'sort()',
  'order()',
  'unique()',
];

interface WordState {
  /** Words fully before the caret/current token. */
  head: string[];
  /** Partial current token (empty when line ends with a space). */
  current: string;
  /** True when user finished a token with whitespace. */
  afterSpace: boolean;
}

function parseLine(value: string): WordState {
  const endsWithSpace = /\s$/.test(value);
  const trimmed = value.replace(/\s+$/, '');
  if (!trimmed) {
    return { head: [], current: '', afterSpace: endsWithSpace };
  }
  const parts = trimmed.split(/\s+/);
  if (endsWithSpace) {
    return { head: parts, current: '', afterSpace: true };
  }
  return { head: parts.slice(0, -1), current: parts[parts.length - 1]!, afterSpace: false };
}

export class TerminalView {
  private logEl: HTMLElement;
  private inputEl: HTMLInputElement;
  private wrapEl: HTMLElement;
  private ghostEl: HTMLElement;
  private hintEl: HTMLElement;
  private lines: LogLine[] = [];
  private history: string[] = [];
  private historyIdx = -1;
  private draft = '';
  private hint = '';
  private extraCompletions: string[] = [];
  /** Candidates for the current word, cycled by repeated Tab. */
  private wordCycle: string[] = [];
  private wordIdx = 0;
  private wordKey = '';
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
      <div class="term-hint" id="term-hint" hidden dir="ltr"></div>
      <div class="term-input-row" dir="ltr">
        <label class="prompt" for="term-input">${escapeHtml(u.termPrompt)}</label>
        <div class="term-input-wrap" id="term-input-wrap">
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
    this.wrapEl = root.querySelector('#term-input-wrap')!;
    this.ghostEl = root.querySelector('#term-ghost')!;
    this.hintEl = root.querySelector('#term-hint')!;

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

  setLog(lines: LogLine[]): void {
    this.lines = lines;
    this.render();
  }

  getLog(): LogLine[] {
    return this.lines;
  }

  push(kind: LogKind, text: string): void {
    if (kind === 'cmd' && text) {
      const clean = text.startsWith('> ') ? text.slice(2) : text;
      this.history.push(clean.trim());
      this.historyIdx = this.history.length;
    }
    this.lines.push({ kind, text });
    if (this.lines.length > 500) this.lines = this.lines.slice(-400);
    this.render();
  }

  clear(): void {
    this.lines = [];
    this.render();
  }

  private render(): void {
    const html = this.lines
      .map((l) => {
        return `<div class="term-row is-${l.kind}">${escapeHtml(l.text)}</div>`;
      })
      .join('');
    this.logEl.innerHTML = html;
    this.logEl.scrollTop = this.logEl.scrollHeight;
  }

  setHint(command: string | null): void {
    const singleLine = (command ?? '').split('\n').map((s) => s.trim()).filter(Boolean)[0] ?? '';
    this.hint = singleLine;
    const u = ui();
    this.inputEl.placeholder = this.hint
      ? u.nextPlaceholder(this.hint)
      : 'Type an R command — help · levels · hint · script';
    this.hintEl.hidden = !this.hint;
    if (this.hint) {
      this.hintEl.innerHTML = `${escapeHtml(u.nextPrompt)}: <code>${escapeHtml(this.hint)}</code> <span class="par-note">· ${escapeHtml(u.tabFillsWord)}</span>`;
    }
    this.syncGhost();
  }

  setInput(value: string): void {
    this.inputEl.value = value;
    this.focus();
    this.syncGhost();
  }

  setExtraCompletions(commands: string[]): void {
    const singleLines = commands
      .flatMap((c) => (c || '').split('\n'))
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith('#'));
    this.extraCompletions = [...new Set<string>(singleLines)];
  }

  private allCompletions(): string[] {
    const raw = [
      ...(this.hint ? [this.hint] : []),
      ...this.extraCompletions,
      ...BASE_COMMANDS,
      ...this.history.slice().reverse(),
    ];
    const singleLines = raw.flatMap((cmd) =>
      (cmd || '').split('\n').map((s) => s.trim()).filter(Boolean)
    );
    return [...new Set<string>(singleLines)];
  }

  /** Full commands sharing head words + current token prefix. */
  private matchingCommands(head: string[], current: string): string[] {
    const cur = current.toLowerCase();
    return this.allCompletions().filter((cmd) => {
      const words = cmd.split(/\s+/);
      if (words.length <= head.length) {
        if (head.length && words.length === head.length) {
          return words.every((w, i) => w === head[i]);
        }
        return false;
      }
      for (let i = 0; i < head.length; i++) {
        if (words[i] !== head[i]) return false;
      }
      if (!cur) return true;
      return (words[head.length] ?? '').toLowerCase().startsWith(cur);
    });
  }

  /** Distinct next-word options in order, hint-first. */
  private nextWords(head: string[], current: string): string[] {
    const matches = this.matchingCommands(head, current);
    const words: string[] = [];
    const push = (w: string | undefined) => {
      if (!w) return;
      if (!words.includes(w)) words.push(w);
    };
    if (this.hint) {
      const hw = this.hint.trim().split(/\s+/);
      const okHead = head.every((h, i) => hw[i] === h);
      if (okHead && hw[head.length]) push(hw[head.length]);
    }
    for (const cmd of matches) {
      const cw = cmd.trim().split(/\s+/);
      if (cw[head.length]) push(cw[head.length]);
    }
    return words.filter((w) => !current || w.toLowerCase().startsWith(current.toLowerCase()));
  }

  /**
   * Ghost shows suffix using hidden typed span for 100% pixel-perfect alignment.
   * Never stacks or drifts under typed characters.
   */
  private syncGhost(): void {
    const value = this.inputEl.value;
    this.ghostEl.dataset.visible = '0';
    this.ghostEl.innerHTML = '';
    this.wrapEl.classList.remove('has-ghost');

    if (!value) return;

    const { head, current, afterSpace } = parseLine(value);
    const words = this.nextWords(head, afterSpace ? '' : current);
    const first = words[0];
    if (!first) return;

    if (afterSpace) {
      this.ghostEl.innerHTML = `<span style="visibility:hidden">${escapeHtml(value)}</span><span class="ghost-suffix">${escapeHtml(first)}</span>`;
      this.ghostEl.dataset.visible = '1';
      this.wrapEl.classList.add('has-ghost');
      return;
    }

    if (first.toLowerCase().startsWith(current.toLowerCase()) && first.length > current.length) {
      const suffix = first.slice(current.length);
      this.ghostEl.innerHTML = `<span style="visibility:hidden">${escapeHtml(value)}</span><span class="ghost-suffix">${escapeHtml(suffix)}</span>`;
      this.ghostEl.dataset.visible = '1';
      this.wrapEl.classList.add('has-ghost');
    }
  }

  /** Real-terminal Tab: word-by-word completion, cycling candidates on repeated Tab. */
  private applyTab(e: KeyboardEvent): void {
    e.preventDefault();
    const value = this.inputEl.value;
    const trimmedVal = value.trim();

    // 0. If input already completely matches this.hint, do not append further
    if (this.hint && trimmedVal.toLowerCase() === this.hint.trim().toLowerCase()) {
      return;
    }

    const { head, current, afterSpace } = parseLine(value);
    const cycleKey = `${head.join(' ')}|${afterSpace ? '' : current}`;

    // 1. If empty and hint exists: insert first word only
    if (!value && this.hint) {
      const firstWord = this.hint.trim().split(/\s+/)[0]!;
      this.inputEl.value = firstWord;
      this.wordCycle = [firstWord];
      this.wordIdx = 0;
      this.wordKey = firstWord;
      this.focus();
      this.syncGhost();
      return;
    }

    // 2. If current word is already completely typed and matches uniquely, advance to next word
    if (!afterSpace && current) {
      const currentMatches = this.nextWords(head, current);
      if (currentMatches.length === 1 && currentMatches[0].toLowerCase() === current.toLowerCase()) {
        const newHead = [...head, currentMatches[0]];
        const fullSoFar = newHead.join(' ');
        if (this.hint && fullSoFar.toLowerCase() === this.hint.trim().toLowerCase()) {
          this.inputEl.value = this.hint.trim();
          this.focus();
          this.syncGhost();
          return;
        }
        const nextOpts = this.nextWords(newHead, '');
        if (nextOpts.length > 0) {
          this.inputEl.value = `${newHead.join(' ')} ${nextOpts[0]}`;
          this.wordCycle = nextOpts;
          this.wordIdx = 0;
          this.wordKey = `${newHead.join(' ')}|`;
          this.focus();
          this.syncGhost();
          return;
        }
      }
    }

    const options = this.nextWords(head, afterSpace ? '' : current);
    if (!options.length) {
      this.syncGhost();
      return;
    }

    if (cycleKey !== this.wordKey || !this.wordCycle.length) {
      this.wordKey = cycleKey;
      this.wordCycle = options;
      this.wordIdx = 0;
    } else {
      this.wordIdx = (this.wordIdx + 1) % this.wordCycle.length;
    }

    const chosen = this.wordCycle[this.wordIdx] ?? options[0]!;
    const headText = head.length ? `${head.join(' ')} ` : '';
    this.inputEl.value = `${headText}${chosen}`;
    this.focus();
    this.syncGhost();

    const u = ui();
    if (this.wordCycle.length > 1) {
      const preview = this.wordCycle.slice(0, 6).join(' · ');
      this.hintEl.hidden = false;
      this.hintEl.innerHTML = `Tab word <strong>${this.wordIdx + 1}/${this.wordCycle.length}</strong>: <code>${escapeHtml(preview)}</code>${
        this.wordCycle.length > 6 ? ' …' : ''
      }`;
    } else if (this.hint) {
      this.hintEl.innerHTML = `${escapeHtml(u.nextPrompt)}: <code>${escapeHtml(this.hint)}</code> <span class="par-note">· ${escapeHtml(u.tabFillsWord)}</span>`;
    }
  }

  private onKey(e: KeyboardEvent): void {
    if (e.altKey && (e.key === '-' || e.code === 'Minus' || e.code === 'NumpadSubtract' || e.key === '–' || e.key === '—')) {
      e.preventDefault();
      this.insertAssignment();
      this.syncGhost();
      return;
    }
    if (e.key === 'Tab') {
      this.applyTab(e);
      return;
    }
    if (e.key === 'ArrowRight' && this.inputEl.selectionStart === this.inputEl.value.length) {
      const suffixEl = this.ghostEl.querySelector('.ghost-suffix');
      if (this.ghostEl.dataset.visible === '1' && suffixEl?.textContent) {
        e.preventDefault();
        this.inputEl.value += suffixEl.textContent;
        this.focus();
        this.syncGhost();
        return;
      }
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      this.inputEl.value = '';
      this.wordCycle = [];
      this.wordKey = '';
      this.syncGhost();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (document.querySelector('.overlay .modal')) return;
      const value = this.inputEl.value;
      this.inputEl.value = '';
      const trimmed = value.trim();
      if (trimmed) {
        this.history.push(trimmed);
        this.historyIdx = this.history.length;
      }
      this.wordCycle = [];
      this.wordKey = '';
      this.onSubmit(value);
      this.focus();
      this.syncGhost();
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!this.history.length) return;
      if (this.historyIdx === this.history.length) this.draft = this.inputEl.value;
      this.historyIdx = Math.max(0, this.historyIdx - 1);
      this.inputEl.value = this.history[this.historyIdx] ?? '';
      this.wordCycle = [];
      this.syncGhost();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!this.history.length) return;
      this.historyIdx = Math.min(this.history.length, this.historyIdx + 1);
      this.inputEl.value =
        this.historyIdx >= this.history.length ? this.draft : (this.history[this.historyIdx] ?? '');
      this.wordCycle = [];
      this.syncGhost();
    }
  }

  private insertAssignment(): void {
    const start = this.inputEl.selectionStart ?? this.inputEl.value.length;
    const end = this.inputEl.selectionEnd ?? start;
    const val = this.inputEl.value;
    const before = val.substring(0, start);
    const after = val.substring(end);
    const hasLeadingSpace = before.endsWith(' ') || before.endsWith('\n');
    const hasTrailingSpace = after.startsWith(' ') || after.startsWith('\n');
    let insertion = '<-';
    if (!hasLeadingSpace && before.length > 0) insertion = ' ' + insertion;
    if (!hasTrailingSpace) insertion = insertion + ' ';

    let ok = false;
    try {
      ok = document.execCommand('insertText', false, insertion);
    } catch {
      ok = false;
    }
    if (!ok) {
      this.inputEl.value = before + insertion + after;
      const newPos = start + insertion.length;
      this.inputEl.setSelectionRange(newPos, newPos);
    }
  }
}
