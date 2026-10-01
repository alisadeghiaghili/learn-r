import type { LevelDef } from '../engine/types';
import { allLevels, getLevel, getLevelIndex, getNextLevel } from '../levels';
import { RRuntime } from '../engine/runtime';
import { evaluateChecks, evalExpressions, formatScore, scoreClass } from '../engine/checks';
import { BoardView } from './board';
import { TerminalView } from './terminal';
import { ScriptEditorView } from './editor';
import { escapeHtml, renderMarkdown, showModal } from './dialog';
import { launchConfetti, playFanfare } from './confetti';
import { loadProgress, saveProgress, summarizeCurriculum } from './progress';
import { getLocale, setLocale, ui, LOCALES, type Locale } from '../i18n';
import { COFFEE_BUTTON_HTML, REPO_URL } from './share';

function renderDiffDots(difficulty: number): string {
  const n = Math.max(0, Math.min(5, difficulty));
  return Array.from({ length: 5 }, (_, i) => `<i class="diff-dot${i < n ? ' on' : ''}"></i>`).join('');
}

export class App {
  private root: HTMLElement;
  private runtime: RRuntime;
  private level: LevelDef | null = null;
  private board!: BoardView;
  private terminal!: TerminalView;
  private editor!: ScriptEditorView;
  private dockEl!: HTMLElement;
  private titleEl!: HTMLElement;
  private progress = loadProgress();
  private showHint = false;
  private knownNames = new Set<string>();

  constructor(root: HTMLElement) {
    this.root = root;
    this.runtime = new RRuntime();
    this.mount();
  }

  async init(): Promise<void> {
    const bootEl = document.querySelector<HTMLElement>('#boot-bar-fill');
    try {
      await this.runtime.init((p) => {
        if (bootEl) bootEl.style.width = `${Math.round(p * 100)}%`;
      });
      const bootCard = document.querySelector<HTMLElement>('#boot');
      if (bootCard) {
        bootCard.hidden = true;
        bootCard.style.display = 'none';
        bootCard.remove();
      }
    } catch (err) {
      console.error('Failed to initialize WebR', err);
      const title = document.querySelector<HTMLElement>('.boot-title');
      if (title) title.textContent = 'Failed to load WebR runtime';
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const requestedLevel = params.get('level');
    if (requestedLevel && getLevel(requestedLevel)) {
      await this.enterLevel(requestedLevel);
    } else {
      await this.enterSandbox();
      if (!params.has('NODEMO')) {
        this.openWelcome();
      }
    }
  }

  private mount(): void {
    const u = ui();
    const current = getLocale();
    const langItems = LOCALES.map(
      (loc) =>
        `<button type="button" class="lang-option${current === loc ? ' on' : ''}" data-lang="${loc}" role="menuitem">${loc.toUpperCase()}</button>`,
    ).join('');

    this.root.innerHTML = `
      <div class="app-main">
        <header class="toolbar">
          <div class="brand">Learn<span>${escapeHtml(u.brandTagline)}</span></div>
          <div class="level-title" id="level-title"></div>
          <div class="toolbar-actions">
            <div class="lang-menu">
              <button type="button" class="lang-btn" data-action="lang-toggle" aria-label="${escapeHtml(u.language)}">
                <span>${current.toUpperCase()}</span>
                <span class="lang-caret" aria-hidden="true"></span>
              </button>
              <div class="lang-dropdown" id="lang-dropdown" hidden>
                ${langItems}
              </div>
            </div>
            <button type="button" class="nav-toggle" data-action="nav-toggle" aria-label="${escapeHtml(u.menuLabel)}">
              <span class="nav-bars" aria-hidden="true"></span>
            </button>
            <div class="nav-drawer" id="nav-drawer" hidden>
              <button type="button" data-action="levels">${escapeHtml(u.levels)}</button>
              <button type="button" data-action="lesson" title="${escapeHtml(u.lessonTitle)}">${escapeHtml(u.lesson)}</button>
              <button type="button" data-action="hint">${escapeHtml(u.hint)}</button>
              <button type="button" data-action="solution">${escapeHtml(u.solution)}</button>
              <button type="button" data-action="undo">${escapeHtml(u.undo)}</button>
              <button type="button" data-action="reset">${escapeHtml(u.reset)}</button>
              <button type="button" data-action="sandbox" class="ghost">${escapeHtml(u.sandboxBtn)}</button>
              <button type="button" class="help-btn" data-action="help">?</button>
              <a class="tb-link gh" href="${REPO_URL}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(u.githubTitle)}">
                <svg class="gh-mark" viewBox="0 0 16 16" width="18" height="18"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
              </a>
              <a class="tb-link support" href="https://www.buymeacoffee.com/alisadeghil" target="_blank" rel="noopener noreferrer" title="${escapeHtml(u.supportTitle)}">
                ${escapeHtml(u.support)}
              </a>
            </div>
          </div>
        </header>
        <div class="board-wrap" id="board-wrap"></div>
        <div class="editor-drawer" id="editor-drawer"></div>
        <div class="terminal" id="terminal"></div>
      </div>
      <aside class="dock" id="dock" aria-label="${escapeHtml(u.guidePanel)}"></aside>
    `;

    this.titleEl = this.root.querySelector('#level-title')!;
    this.dockEl = this.root.querySelector('#dock')!;
    this.board = new BoardView(this.root.querySelector('#board-wrap')!);
    this.editor = new ScriptEditorView(
      this.root.querySelector('#editor-drawer')!,
      (code) => void this.executeRCode(code),
    );
    this.terminal = new TerminalView(
      this.root.querySelector('#terminal')!,
      (cmd) => void this.handleCommand(cmd),
      () => this.editor.toggle(),
    );

    this.wireToolbar();
  }

  private wireToolbar(): void {
    this.root.querySelectorAll<HTMLButtonElement>('[data-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        if (action === 'lang-toggle') {
          this.toggleLang();
          return;
        }
        if (action === 'nav-toggle') {
          this.toggleNav();
          return;
        }
        this.closeNav();
        this.closeLang();

        if (action === 'levels') this.openLevels();
        if (action === 'lesson') this.openLesson();
        if (action === 'hint') this.triggerHint();
        if (action === 'solution') this.showSolution();
        if (action === 'undo') void this.undo();
        if (action === 'reset') void this.reset();
        if (action === 'sandbox') void this.enterSandbox();
        if (action === 'help') this.openHelp();
        this.terminal.focus();
      });
    });

    this.root.querySelectorAll<HTMLButtonElement>('.lang-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.lang as Locale;
        if (target) {
          setLocale(target);
          this.mount();
          void this.refreshDock();
        }
      });
    });
  }

  private toggleLang(): void {
    const dd = this.root.querySelector('#lang-dropdown');
    if (dd) dd.toggleAttribute('hidden');
  }

  private closeLang(): void {
    const dd = this.root.querySelector('#lang-dropdown');
    if (dd) dd.setAttribute('hidden', '');
  }

  private toggleNav(): void {
    const drawer = this.root.querySelector('#nav-drawer');
    if (drawer) drawer.toggleAttribute('hidden');
  }

  private closeNav(): void {
    const drawer = this.root.querySelector('#nav-drawer');
    if (drawer) drawer.setAttribute('hidden', '');
  }

  async enterLevel(id: string): Promise<void> {
    const level = getLevel(id);
    if (!level) return;
    this.level = level;
    this.showHint = false;
    this.knownNames = new Set();
    this.terminal.clear();
    this.terminal.push('meta', `Level: ${level.title}`);

    await this.runtime.resetTo(level.setup, []);
    await this.updateBoard();
    this.renderDock();
    this.updateTitle();
  }

  async enterSandbox(): Promise<void> {
    this.level = null;
    this.showHint = false;
    this.knownNames = new Set();
    this.terminal.clear();
    this.terminal.push('meta', 'Interactive R Sandbox ready. Enter R code or meta commands (levels, help).');

    await this.runtime.resetTo('', []);
    await this.updateBoard();
    this.renderDock();
    this.updateTitle();
  }

  private updateTitle(): void {
    if (this.level) {
      const idx = getLevelIndex(this.level.id) + 1;
      this.titleEl.textContent = `Level ${idx} · ${this.level.title}`;
    } else {
      this.titleEl.textContent = 'Sandbox';
    }
  }

  private async updateBoard(): Promise<void> {
    const env = await this.runtime.snapshotEnv();
    const plotUrl = await this.runtime.plotObjectUrl();
    const currNames = new Set(env.map((o) => o.name));
    this.board.update(env, plotUrl, this.knownNames);
    this.knownNames = currNames;
  }

  private async executeRCode(code: string): Promise<void> {
    this.terminal.push('cmd', `> ${code.trim().replace(/\n/g, '\n  ')}`);
    const result = await this.runtime.pushStroke(code);

    if (result.stdout) {
      this.terminal.push('out', result.stdout);
    }
    if (result.stderr) {
      this.terminal.push('err', result.stderr);
    }

    await this.updateBoard();
    await this.checkVerification(code);
  }

  private async checkVerification(lastCode: string): Promise<void> {
    if (!this.level) return;

    const exprs = evalExpressions(this.level.checks);
    const evalResults = await this.runtime.evalChecks(exprs);

    const verdict = evaluateChecks(this.level.checks, {
      evalResults,
      stdout: this.runtime.getLastStdout(),
      hasPlot: this.runtime.hasActivePlot(),
      studentCode: lastCode,
    });

    this.renderDock(verdict.results);

    if (verdict.ok) {
      await this.onLevelClear();
    }
  }

  private async onLevelClear(): Promise<void> {
    if (!this.level) return;
    const strokes = this.runtime.strokeCount();
    const par = this.level.par;

    this.progress[this.level.id] = {
      solved: true,
      bestStrokes: Math.min(this.progress[this.level.id]?.bestStrokes ?? strokes, strokes),
    };
    saveProgress(this.progress);

    this.terminal.push('ok', `Level clear! ${formatScore(strokes, par)}`);
    launchConfetti();
    playFanfare();

    const next = getNextLevel(this.level.id);
    const u = ui();

    showModal({
      title: u.levelClearTitle,
      bodyHtml: renderMarkdown(`
### ${this.level.title}
Score: **${formatScore(strokes, par)}**

${next ? `Next up: **${next.title}**` : u.foundationsComplete}
      `),
      actions: [
        ...(next
          ? [
              {
                label: u.nextLevel,
                className: 'primary',
                onClick: () => void this.enterLevel(next.id),
              },
            ]
          : []),
        {
          label: u.replayLevel,
          className: 'ghost',
          onClick: () => void this.enterLevel(this.level!.id),
        },
        {
          label: u.sandbox,
          className: 'ghost',
          onClick: () => void this.enterSandbox(),
        },
      ],
    });
  }

  private renderDock(checkResults?: { label: string; passed: boolean }[]): void {
    const u = ui();
    if (!this.level) {
      const summary = summarizeCurriculum(this.progress);
      this.dockEl.innerHTML = `
        <div class="dock-section">
          <h3>${escapeHtml(u.sandbox)}</h3>
          <p class="muted">Free session. Write R code in the console or editor.</p>
        </div>
        <div class="dock-section">
          <h4>Progress: ${summary.solvedCount} / ${summary.total} (${summary.percent}%)</h4>
          <button type="button" class="btn btn-block primary" id="dock-btn-levels">${escapeHtml(u.levels)}</button>
        </div>
      `;
      this.dockEl.querySelector('#dock-btn-levels')?.addEventListener('click', () => this.openLevels());
      return;
    }

    const strokes = this.runtime.strokeCount();
    const checks = checkResults ?? this.level.checks.map((c) => ({ label: c.label, passed: false }));

    const checkItems = checks
      .map(
        (c) => `
        <div class="check-item ${c.passed ? 'is-ok' : 'is-fail'}">
          <span class="check-dot"></span>
          <span class="check-label">${escapeHtml(c.label)}</span>
        </div>
      `,
      )
      .join('');

    this.dockEl.innerHTML = `
      <div class="dock-header">
        <div class="dock-meta-row">
          <div class="diff-dots">${renderDiffDots(this.level.difficulty)}</div>
          <span class="chip ${scoreClass(strokes, this.level.par)}">${escapeHtml(u.parLabel)} ${this.level.par} · ${strokes} ${escapeHtml(u.strokesLabel)}</span>
        </div>
        <h2>${escapeHtml(this.level.title)}</h2>
        <p class="dock-brief">${escapeHtml(this.level.brief)}</p>
      </div>

      <div class="dock-section">
        <div class="dock-section-head">
          <span class="dock-section-title">${escapeHtml(u.targetHeading)}</span>
        </div>
        <pre class="dock-goal"><code>${escapeHtml(this.level.goal)}</code></pre>
      </div>

      <div class="dock-section">
        <div class="dock-section-head">
          <span class="dock-section-title">${escapeHtml(u.checksHeading)}</span>
        </div>
        <div class="check-list">${checkItems}</div>
      </div>

      ${
        this.showHint
          ? `
        <div class="dock-section hint-box">
          <span class="dock-section-title">${escapeHtml(u.hintLabel)}</span>
          <p>${escapeHtml(this.level.hint)}</p>
        </div>
      `
          : ''
      }

      <div class="dock-actions">
        <button type="button" class="btn btn-sm ghost" id="dock-btn-hint">${escapeHtml(u.hint)}</button>
        <button type="button" class="btn btn-sm ghost" id="dock-btn-undo">${escapeHtml(u.undo)}</button>
        <button type="button" class="btn btn-sm ghost" id="dock-btn-reset">${escapeHtml(u.reset)}</button>
      </div>
    `;

    this.dockEl.querySelector('#dock-btn-hint')?.addEventListener('click', () => this.triggerHint());
    this.dockEl.querySelector('#dock-btn-undo')?.addEventListener('click', () => void this.undo());
    this.dockEl.querySelector('#dock-btn-reset')?.addEventListener('click', () => void this.reset());
  }

  private async refreshDock(): Promise<void> {
    if (!this.level) {
      this.renderDock();
      return;
    }
    const exprs = evalExpressions(this.level.checks);
    const evalResults = await this.runtime.evalChecks(exprs);
    const verdict = evaluateChecks(this.level.checks, {
      evalResults,
      stdout: this.runtime.getLastStdout(),
      hasPlot: this.runtime.hasActivePlot(),
      studentCode: '',
    });
    this.renderDock(verdict.results);
  }

  async handleCommand(cmd: string): Promise<void> {
    const raw = cmd.trim();
    if (!raw) return;

    const lower = raw.toLowerCase();
    if (lower === 'help') {
      this.openHelp();
      return;
    }
    if (lower === 'levels') {
      this.openLevels();
      return;
    }
    if (lower === 'hint') {
      this.triggerHint();
      return;
    }
    if (lower === 'show solution' || lower === 'solution') {
      this.showSolution();
      return;
    }
    if (lower === 'undo') {
      await this.undo();
      return;
    }
    if (lower === 'reset') {
      await this.reset();
      return;
    }
    if (lower === 'sandbox') {
      await this.enterSandbox();
      return;
    }
    if (lower === 'script' || lower === 'editor') {
      this.editor.toggle();
      return;
    }
    if (lower === 'clear') {
      this.terminal.clear();
      return;
    }
    if (lower === 'lesson') {
      this.openLesson();
      return;
    }

    await this.executeRCode(raw);
  }

  private triggerHint(): void {
    if (!this.level) {
      this.terminal.push('meta', 'Hints are available in levels mode.');
      return;
    }
    this.showHint = true;
    void this.refreshDock();
    this.terminal.push('meta', `Hint: ${this.level.hint}`);
  }

  private showSolution(): void {
    if (!this.level) return;
    this.terminal.push('meta', `Goal solution:\n${this.level.goal}`);
  }

  private async undo(): Promise<void> {
    const ok = await this.runtime.undoStroke();
    this.terminal.push('meta', ok ? 'Undid last stroke.' : 'Nothing to undo.');
    await this.updateBoard();
    await this.refreshDock();
  }

  private async reset(): Promise<void> {
    if (this.level) {
      await this.runtime.resetTo(this.level.setup, []);
    } else {
      await this.runtime.resetTo('', []);
    }
    this.terminal.clear();
    this.terminal.push('meta', 'Environment reset.');
    await this.updateBoard();
    await this.refreshDock();
  }

  openLevels(): void {
    const u = ui();
    const items = allLevels
      .map((lvl, i) => {
        const solved = Boolean(this.progress[lvl.id]?.solved);
        const active = this.level?.id === lvl.id;
        return `
          <button type="button" class="level-card${active ? ' is-active' : ''}${solved ? ' is-solved' : ''}" data-level="${lvl.id}">
            <div class="level-card-num">${String(i + 1).padStart(2, '0')}</div>
            <div class="level-card-info">
              <div class="level-card-title">${escapeHtml(lvl.title)}</div>
              <div class="level-card-brief">${escapeHtml(lvl.brief)}</div>
            </div>
            <div class="level-card-meta">
              <span class="chip ${solved ? 'ok' : ''}">${solved ? '✓ Done' : `par ${lvl.par}`}</span>
            </div>
          </button>
        `;
      })
      .join('');

    showModal({
      title: u.levels,
      bodyHtml: `<div class="level-dialog-grid">${items}</div>`,
      actions: [{ label: u.closeBtn, onClick: () => undefined }],
    });

    document.querySelectorAll<HTMLButtonElement>('.level-card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.dataset.level;
        if (id) {
          void this.enterLevel(id);
        }
      });
    });
  }

  openLesson(): void {
    if (!this.level || !this.level.lesson) return;
    showModal({
      title: `${this.level.title} — Lesson`,
      bodyHtml: renderMarkdown(this.level.lesson),
      actions: [{ label: ui().closeBtn, onClick: () => undefined }],
    });
  }

  openHelp(): void {
    const u = ui();
    showModal({
      title: u.help,
      bodyHtml: renderMarkdown(`
### Command Reference

| Command | Effect |
|---|---|
| \`levels\` | Open the level catalog |
| \`lesson\` | View detailed explanation for current level |
| \`hint\` | Reveal the level hint |
| \`show solution\` | Display target solution |
| \`undo\` | Remove the last stroke |
| \`reset\` | Clear the environment and start over |
| \`sandbox\` | Enter open sandbox mode |
| \`clear\` | Clear the console log |
| \`script\` | Toggle multi-line R script editor |

### Execution
- Press **Ctrl / Cmd + Enter** to run the current line or script.
- Type in the console prompt and hit **Enter**.
- Tab cycles through autocomplete suggestions.
      `),
      actions: [{ label: u.closeBtn, onClick: () => undefined }],
    });
  }

  openWelcome(): void {
    const u = ui();
    showModal({
      title: u.welcomeTitle,
      bodyHtml: renderMarkdown(`
${u.welcomeIntro}

${u.welcomeBoard}

${u.welcomeLevelsCount(allLevels.length)}

${COFFEE_BUTTON_HTML}
      `),
      actions: [
        {
          label: u.sandbox,
          className: 'ghost',
          onClick: () => undefined,
        },
        {
          label: u.levels,
          className: 'primary',
          onClick: () => this.openLevels(),
        },
      ],
    });
  }
}
