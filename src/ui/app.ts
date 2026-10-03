import type { LevelDef } from '../engine/types';
import { allLevels, getLevel, getLevelIndex, getNextLevel, seriesOf } from '../levels';
import { RRuntime } from '../engine/runtime';
import { evaluateChecks, evalExpressions, formatScore, splitRStatements } from '../engine/checks';
import { BoardView } from './board';
import { TerminalView } from './terminal';
import { ScriptEditorView } from './editor';
import { escapeHtml, renderMarkdown, showModal } from './dialog';
import { launchConfetti, playFanfare } from './confetti';
import { loadProgress, saveProgress, summarizeCurriculum } from './progress';
import { getLocale, setLocale, ui, LOCALES, type Locale } from '../i18n';
import { COFFEE_BUTTON_HTML, REPO_URL, buildShareTargets, shareWithClipboard } from './share';
import { getCachedVisitorCount, getVisitorCount } from './visitor-counter';
import { getLevelLearning, getLevelFieldNotes } from '../levels/guidance';
import { localizeLevel } from '../levels/i18n';

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
  private cachedVisitorCount: number | null = getCachedVisitorCount();

  constructor(root: HTMLElement) {
    this.root = root;
    this.runtime = new RRuntime();
    this.mount();
    void this.initVisitorCounter();
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
      void this.initVisitorCounter();
    } catch (err) {
      console.error('Failed to initialize WebR', err);
      const title = document.querySelector<HTMLElement>('.boot-title');
      if (title) title.textContent = 'Failed to load WebR runtime';
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const savedLevel = localStorage.getItem('learnr_last_level');
    const isSandboxParam = params.get('mode') === 'sandbox' || params.has('sandbox');
    const requestedLevel =
      params.get('level') || (!isSandboxParam && savedLevel && getLevel(savedLevel) ? savedLevel : null);

    if (requestedLevel && getLevel(requestedLevel)) {
      await this.enterLevel(requestedLevel);
    } else if (!isSandboxParam && getLevel('hello')) {
      await this.enterLevel('hello');
    } else {
      await this.enterSandbox();
    }

    if (!params.has('NODEMO') && !params.has('level') && !savedLevel) {
      this.openWelcome();
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
          <div class="brand">
            <svg class="brand-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="24" height="24" role="img" aria-label="R">
              <rect width="64" height="64" rx="14" fill="#e5edf8"/>
              <g transform="translate(12 12) scale(1.6667)" fill="#2569bb"><path d="M12 2.746c-6.627 0-12 3.599-12 8.037 0 3.897 4.144 7.144 9.64 7.88V16.26c-2.924-.915-4.925-2.755-4.925-4.877 0-3.035 4.084-5.494 9.12-5.494 5.038 0 8.757 1.683 8.757 5.494 0 1.976-.999 3.379-2.662 4.272.09.066.174.128.258.216.169.149.25.363.372.544 2.128-1.45 3.44-3.437 3.44-5.631 0-4.44-5.373-8.038-12-8.038zm-2.111 4.99v13.516l4.093-.002-.002-5.291h1.1c.225 0 .321.066.549.25.272.22.715.982.715.982l2.164 4.063 4.627-.002-2.864-4.826s-.086-.193-.265-.383a2.22 2.22 0 00-.582-.416c-.422-.214-1.149-.434-1.149-.434s3.578-.264 3.578-3.826c0-3.562-3.744-3.63-3.744-3.63zm4.127 2.93l2.478.002s1.149-.062 1.149 1.127c0 1.165-1.149 1.17-1.149 1.17h-2.478zm1.754 6.119c-.494.049-1.012.079-1.54.088v1.807a16.622 16.622 0 002.37-.473l-.471-.891s-.108-.183-.248-.394c-.039-.054-.08-.098-.111-.137z"/></g>
            </svg>
            Learn<span>${escapeHtml(u.brandTagline)}</span>
          </div>
          <div class="level-title" id="level-title"></div>
          <div class="toolbar-actions">
            <div class="lang-menu">
              <button type="button" class="lang-btn" data-action="lang-toggle" aria-haspopup="menu" aria-expanded="false" aria-label="${escapeHtml(u.language)}">
                <span data-lang-label>${current.toUpperCase()}</span>
                <span class="lang-caret" aria-hidden="true"></span>
              </button>
              <div class="lang-dropdown" id="lang-dropdown" role="menu" hidden>
                ${langItems}
              </div>
            </div>
            <button type="button" class="nav-toggle" data-action="nav-toggle" aria-label="${escapeHtml(u.menuLabel)}" aria-expanded="false" aria-controls="nav-drawer">
              <span class="nav-bars" aria-hidden="true"></span>
            </button>
            <div class="nav-drawer" id="nav-drawer">
              <button type="button" data-action="levels">${escapeHtml(u.levels)}</button>
              <button type="button" data-action="lesson" title="${escapeHtml(u.lessonTitle)}">${escapeHtml(u.lesson)}</button>
              <button type="button" data-action="goal">${escapeHtml(u.guide)}</button>
              <button type="button" data-action="hint">${escapeHtml(u.hint)}</button>
              <button type="button" data-action="solution">${escapeHtml(u.solution)}</button>
              <button type="button" data-action="undo">${escapeHtml(u.undo)}</button>
              <button type="button" data-action="reset">${escapeHtml(u.reset)}</button>
              <button type="button" data-action="sandbox" class="ghost">${escapeHtml(u.sandboxBtn)}</button>
              <button type="button" data-action="local-setup" title="${escapeHtml(u.localSetupTitle)}" class="ghost">${escapeHtml(u.localSetupBtn)}</button>
              <button type="button" class="help-btn" data-action="help" title="${escapeHtml(u.uiGuideTitle)}" aria-label="${escapeHtml(u.help)}">?</button>
            </div>
            <span class="tb-stat visitors" id="visitor-stat" title="${escapeHtml(u.visitorsTitle)}">
              <svg class="visitor-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0-2.21-2.69-4-6-4s-6 1.79-6 4v1h12v-1zm-1.07 0H3.07C3.56 11.83 5.48 11 8 11s4.44.83 4.93 2z"/></svg>
              <span class="visitor-count" id="visitor-count">${(this.cachedVisitorCount ?? 2400).toLocaleString('en-US')}</span>
            </span>
            <a class="tb-link gh" href="${REPO_URL}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(u.githubTitle)}" aria-label="GitHub repository">
              <svg class="gh-mark" viewBox="0 0 16 16" width="18" height="18"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
            </a>
            <a class="tb-link support" href="https://www.buymeacoffee.com/alisadeghil" target="_blank" rel="noopener noreferrer" title="${escapeHtml(u.supportTitle)}">
              ${escapeHtml(u.support)}
            </a>
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
    this.updateTitle();
    this.renderVisitorBadge();
    this.renderDock();
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
        if (action === 'goal') this.focusGuide();
        if (action === 'hint') this.triggerHint();
        if (action === 'solution') this.showSolution();
        if (action === 'undo') void this.undo();
        if (action === 'reset') void this.reset();
        if (action === 'sandbox') void this.enterSandbox();
        if (action === 'local-setup') this.openLocalGuide();
        if (action === 'help') this.openHelp();
        this.terminal.focus();
      });
    });

    this.root.querySelectorAll<HTMLButtonElement>('.lang-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.lang as Locale;
        if (target) {
          setLocale(target);
          if (this.level) {
            const raw = getLevel(this.level.id);
            if (raw) {
              this.level = localizeLevel(raw, target);
            }
          }
          this.mount();
          this.updateTitle();
          void this.refreshDock();
        }
      });
    });

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (!target.closest('.lang-menu')) this.closeLang();
      if (!target.closest('.nav-drawer') && !target.closest('[data-action="nav-toggle"]')) {
        this.closeNav();
      }
    });

    this.dockEl.addEventListener('click', (e) => {
      const nextBtn = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-action="next-level"]');
      if (nextBtn && this.level) {
        const next = getNextLevel(this.level.id);
        if (next) {
          void this.enterLevel(next.id, { openLesson: true });
          return;
        }
      }
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('.g-step-cmd');
      if (target?.dataset.cmd) {
        this.terminal.setInput(target.dataset.cmd);
      }
    });
  }

  private toggleLang(): void {
    const menu = this.root.querySelector<HTMLElement>('#lang-dropdown');
    const btn = this.root.querySelector<HTMLButtonElement>('[data-action="lang-toggle"]');
    if (!menu || !btn) return;
    const open = menu.hasAttribute('hidden');
    if (open) {
      menu.removeAttribute('hidden');
      menu.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      this.closeNav();
    } else {
      menu.setAttribute('hidden', '');
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  }

  private closeLang(): void {
    const menu = this.root.querySelector<HTMLElement>('#lang-dropdown');
    const btn = this.root.querySelector<HTMLButtonElement>('[data-action="lang-toggle"]');
    if (!menu || !btn) return;
    menu.setAttribute('hidden', '');
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  private toggleNav(): void {
    const drawer = this.root.querySelector<HTMLElement>('#nav-drawer');
    const btn = this.root.querySelector<HTMLButtonElement>('[data-action="nav-toggle"]');
    if (!drawer || !btn) return;
    const open = drawer.hasAttribute('hidden');
    if (open) {
      drawer.removeAttribute('hidden');
      drawer.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      this.closeLang();
    } else {
      drawer.setAttribute('hidden', '');
      drawer.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  }

  private closeNav(): void {
    const drawer = this.root.querySelector<HTMLElement>('#nav-drawer');
    const btn = this.root.querySelector<HTMLButtonElement>('[data-action="nav-toggle"]');
    if (!drawer || !btn) return;
    drawer.setAttribute('hidden', '');
    drawer.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  private async initVisitorCounter(): Promise<void> {
    const count = await getVisitorCount();
    if (count !== null && count !== this.cachedVisitorCount) {
      this.cachedVisitorCount = count;
      this.renderVisitorBadge();
    }
  }

  private renderVisitorBadge(): void {
    const statEl = this.root.querySelector<HTMLElement>('#visitor-stat');
    const countEl = this.root.querySelector<HTMLElement>('#visitor-count');
    if (!statEl || !countEl) return;

    const displayCount = this.cachedVisitorCount ?? 2400;
    const u = ui();
    statEl.title = u.visitorsTitle;
    countEl.textContent = displayCount.toLocaleString('en-US');
    statEl.hidden = false;
  }

  async enterLevel(id: string, opts?: { openLesson?: boolean }): Promise<void> {
    const raw = getLevel(id);
    if (!raw) return;
    const level = localizeLevel(raw, getLocale());
    this.level = level;
    this.showHint = false;
    this.knownNames = new Set();
    this.terminal.clear();
    this.terminal.push('meta', `Level: ${level.title}`);

    // Update URL and localStorage so refreshing preserves the active level
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('level', id);
      url.searchParams.delete('mode');
      url.searchParams.delete('sandbox');
      window.history.replaceState({}, '', url.toString());
      localStorage.setItem('learnr_last_level', id);
    } catch {
      // ignore
    }

    // Set level-specific autocomplete commands and next-step hint
    const goalLines = this.level.solution ?? splitRStatements(this.level.goal);
    const setupLines = splitRStatements(this.level.setup);
    this.terminal.setExtraCompletions([
      ...goalLines,
      ...setupLines,
    ]);
    const firstGoal = goalLines[0]?.trim() ?? null;
    this.terminal.setHint(firstGoal);

    this.updateTitle();
    this.renderDock();

    if (opts?.openLesson) {
      this.openLesson();
    }

    await this.runtime.resetTo(level.setup, []);
    await this.updateBoard();
    this.renderDock();
  }

  async enterSandbox(): Promise<void> {
    this.level = null;
    this.showHint = false;
    this.knownNames = new Set();
    this.terminal.clear();
    this.terminal.push('meta', 'Interactive R Sandbox ready. Enter R code or meta commands (levels, help).');
    this.terminal.setExtraCompletions([]);
    this.terminal.setHint(null);

    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('level');
      url.searchParams.set('mode', 'sandbox');
      window.history.replaceState({}, '', url.toString());
      localStorage.removeItem('learnr_last_level');
    } catch {
      // ignore
    }

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
      this.titleEl.textContent = ui().sandboxTitle;
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

    if (this.level && !verdict.ok) {
      const solutionCmds =
        this.level.solution ?? splitRStatements(this.level.goal);
      const nextIdx = verdict.results.findIndex((r) => !r.passed);
      if (nextIdx !== -1) {
        const stmtIdx = Math.min(nextIdx, solutionCmds.length - 1);
        const nextCmd = solutionCmds[stmtIdx] ?? this.level.goal;
        this.terminal.setHint(nextCmd);
      }
    }

    if (verdict.ok) {
      this.terminal.setHint(null);
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
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    const confetti = launchConfetti(4800);
    playFanfare();

    const level = this.level;
    const next = getNextLevel(level.id);
    const u = ui();
    const curriculum = summarizeCurriculum(this.progress);
    const share = buildShareTargets({
      levelName: level.title,
      levelId: level.id,
      commands: strokes,
      par: level.par,
      curriculum,
    });
    const total = allLevels.length;
    const solvedCount = curriculum.solvedCount;
    const underIdeal = strokes <= level.par;
    const golfLine = underIdeal
      ? `**${strokes}** ${u.idealForLevelShort(level.par)}`
      : `**${strokes}** ${getLocale() === 'fa' ? `فرمان. ایده‌آل ${level.par} بود، ولی مهم تکمیل تمیز گام‌هاست.` : `commands. Ideal was ${level.par}. Steps cleanly completed.`}`;

    const cheers = u.cheers;
    const cheer = cheers[Math.floor(Math.random() * cheers.length)]!;

    const learnedPreview = curriculum.learned
      .map((l) => `<li>${escapeHtml(l.seriesTitle)}: ${escapeHtml(l.name)}</li>`)
      .join('');

    const bodyHtml = `
      <div class="celebrate" aria-live="polite">
        <div class="celebrate-visual" aria-hidden="true">
          <div class="celebrate-ring"></div>
          <div class="celebrate-star">★</div>
        </div>
        <div class="celebrate-badge">${escapeHtml(u.levelClearedBadge)}</div>
        <h3 class="celebrate-title">${escapeHtml(level.title)}</h3>
        <p class="celebrate-sub">Foundations · <code>${escapeHtml(level.id)}</code></p>
        <p class="celebrate-cheer">${escapeHtml(cheer)}</p>
        <div class="celebrate-stats">${renderMarkdown(golfLine)}</div>
        <div class="celebrate-progress">
          <div class="prog-track"><div class="prog-fill" style="width:${curriculum.percent}%"></div></div>
          <div class="par-note">${solvedCount} / ${total} ${escapeHtml(u.progressSavedNote)}</div>
        </div>
        <div class="share-block">
          <div class="next-title">${escapeHtml(u.shareTitle)}</div>
          <div class="learned-preview">
            <div class="par-note">${escapeHtml(u.styleList)}</div>
            <ul>${learnedPreview || `<li>${escapeHtml(u.solveMoreLevels)}</li>`}</ul>
          </div>
          <div class="share-row" role="group" aria-label="${escapeHtml(u.shareGroupLabel)}">
            <button type="button" class="share-btn linkedin" data-share="linkedin">${escapeHtml(u.linkedin)}</button>
            <button type="button" class="share-btn x" data-share="x">${escapeHtml(u.xTwitter)}</button>
            <button type="button" class="share-btn facebook" data-share="facebook">${escapeHtml(u.facebook)}</button>
            <button type="button" class="share-btn copy" data-share="copy">${escapeHtml(u.copyPost)}</button>
          </div>
          <div class="share-status" data-share-status hidden></div>
        </div>
        ${
          next
            ? `<div class="celebrate-next">${renderMarkdown(u.nextCelebration(next.id, next.title))}</div>`
            : `<div class="celebrate-next">${renderMarkdown(u.lastInPack)}</div>`
        }
      </div>
    `;

    const actions = [
      {
        label: u.baskInIt,
        className: 'ghost',
        onClick: () => {
          this.terminal.focus();
        },
      },
    ];

    if (next) {
      actions.push({
        label: u.celebrateOn(next.id),
        className: 'primary',
        onClick: () => {
          void this.enterLevel(next.id, { openLesson: true });
        },
      });
    } else {
      actions.push({
        label: u.browseLevels,
        className: 'primary',
        onClick: () => {
          this.openLevels();
        },
      });
    }

    const modal = showModal({
      title: u.levelComplete,
      bodyHtml,
      variant: 'celebrate',
      actions: actions.map((a) => ({
        ...a,
        onClick: () => {
          confetti?.stop();
          modal.close();
          a.onClick();
        },
      })),
      onClose: () => {
        confetti?.stop();
        this.terminal.focus();
      },
    });

    modal.el.querySelectorAll<HTMLButtonElement>('[data-share]').forEach((btn) => {
      btn.addEventListener('click', async (ev) => {
        ev.preventDefault();
        const kind = (btn.dataset.share ?? 'copy') as 'linkedin' | 'facebook' | 'x' | 'copy';
        const status = modal.el.querySelector<HTMLElement>('[data-share-status]');
        const result = await shareWithClipboard(kind, share);
        if (!status) return;
        status.hidden = false;
        if (kind === 'copy') {
          status.textContent = result.copied ? u.copyOk : u.copyFail;
          return;
        }
        status.textContent = result.copied ? u.shareCopied : u.shareOpened;
      });
    });

    modal.el.querySelector('.modal')?.addEventListener('keydown', (ev) => {
      const key = (ev as KeyboardEvent).key;
      if (key === 'Enter') {
        ev.preventDefault();
        ev.stopPropagation();
      }
    });
  }

  private focusGuide(): void {
    this.dockEl.classList.remove('dock-pulse');
    void this.dockEl.offsetWidth;
    this.dockEl.classList.add('dock-pulse');
    this.dockEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  private renderDock(checkResults?: { label: string; passed: boolean }[]): void {
    const u = ui();
    if (!this.level) {
      this.dockEl.innerHTML = `
        <h2>${escapeHtml(u.learningGuide)}</h2>
        <p class="objective">${escapeHtml(u.guideAlwaysOn)}</p>
        <div class="learning-box">
          <div class="next-title">${escapeHtml(u.startHere)}</div>
          <ul>
            ${u.startHereItems.map((item) => `<li>${renderMarkdown(item)}</li>`).join('')}
          </ul>
        </div>
        <div class="learning-box">
          <div class="next-title">${escapeHtml(u.sandboxTip)}</div>
          <ul>
            ${u.sandboxTipItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>
        <ul class="goal-list">
          <li class="met"><div class="g-label">${escapeHtml(u.noActiveLevel)}</div><div class="g-detail">${escapeHtml(u.noActiveLevelDetail)}</div></li>
        </ul>
        <div class="par-note">${u.guideFlashNote}</div>
      `;
      return;
    }

    const level = this.level;
    const solutionCmds = level.solution ?? splitRStatements(level.goal);
    const checks = checkResults ?? level.checks.map((c) => ({ label: c.label, passed: false }));
    const solved = checks.length > 0 && checks.every((c) => c.passed);
    const currentId = checks.findIndex((c) => !c.passed);

    const steps = level.checks.map((chk, i) => {
      const isPassed = Boolean(checks[i]?.passed);
      const stmtIdx = Math.min(i, solutionCmds.length - 1);
      const cmd = solutionCmds[stmtIdx] ?? level.goal;
      return {
        command: cmd,
        note: chk.label,
        done: isPassed,
      };
    });

    const items = steps.map((s, i) => {
      const isCurrent = !solved && !s.done && i === currentId;
      return `<li class="${s.done ? 'met' : ''}${isCurrent ? ' current' : ''}">
        <div class="g-label" dir="ltr">${s.done ? '✓' : isCurrent ? '▶' : '○'} <code class="g-step-cmd" data-cmd="${escapeHtml(s.command)}" title="Click to fill into terminal">${escapeHtml(s.command)}</code>${
          isCurrent ? ` <span class="chip current-chip">${escapeHtml(u.nowChip)}</span>` : ''
        }</div>
        <div class="g-detail" dir="ltr">${escapeHtml(s.note)}</div>
      </li>`;
    });

    const firstNext = currentId !== -1 ? steps[currentId]?.command : solutionCmds[0] ?? level.goal;
    const next = getNextLevel(level.id);
    const nextBlock = solved
      ? `<div class="next-box met">
          <div>${escapeHtml(u.allSolutionMet)}</div>
          ${
            next
              ? `<button type="button" class="btn primary dock-next-btn" data-action="next-level" style="margin-top: 8px; width: 100%; cursor: pointer;">${escapeHtml(u.celebrateOn(next.id))}</button>`
              : ''
          }
        </div>`
      : `<div class="next-box">
          <div class="next-title">${escapeHtml(u.typeNextTitle)}</div>
          <div class="next-row">
            <span class="g-label">${escapeHtml(u.remainingLabel)}</span>
            ${firstNext ? `<code class="g-cmd g-step-cmd" data-cmd="${escapeHtml(firstNext)}" dir="ltr" title="Click to fill into terminal">${escapeHtml(firstNext)}</code>` : ''}
          </div>
          <div class="par-note">${escapeHtml(u.wrongCommandNote)}</div>
        </div>`;

    const prog = this.progress[level.id];
    const unmetChecks = steps.filter((s) => !s.done);
    const golfNote = solved
      ? (prog?.bestStrokes !== undefined
          ? u.bestSoFar(prog.bestStrokes, level.par)
          : u.idealSolution(level.par))
      : u.commandsRemaining(unmetChecks.length, level.par);

    const learning = level.learning ?? getLevelLearning(level.id);
    const fieldNotes = level.fieldNotes ?? getLevelFieldNotes(level.id);

    this.dockEl.innerHTML = `
      <h2>${escapeHtml(level.title)}</h2>
      <p class="objective">${escapeHtml(level.brief)}</p>
      ${
        learning.length
          ? `<div class="learning-box">
              <div class="next-title">${escapeHtml(u.youAreLearning)}</div>
              <ul>${learning.map((l) => `<li>${escapeHtml(l)}</li>`).join('')}</ul>
            </div>`
          : ''
      }
      ${
        fieldNotes.length
          ? `<div class="field-box">
              <div class="next-title">${escapeHtml(u.fieldNotesTitle)}</div>
              <ul>${fieldNotes.map((l) => `<li>${escapeHtml(l)}</li>`).join('')}</ul>
            </div>`
          : ''
      }
      <div class="par-note">${escapeHtml(golfNote)}</div>
      ${nextBlock}
      <ul class="goal-list">${items.join('')}</ul>
      ${this.showHint ? `<div class="par-note"><strong>${escapeHtml(u.hintLabel)}:</strong> ${escapeHtml(level.hint)}</div>` : ''}
      ${unmetChecks.length && !solved ? `<div class="par-note">${escapeHtml(u.stateNotes)} ${unmetChecks.map((s) => escapeHtml(s.note)).join(' · ')}</div>` : ''}
    `;
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
    if (lower === 'next' || lower === 'next level' || lower === 'continue' || lower === 'بعدی') {
      if (this.level) {
        const next = getNextLevel(this.level.id);
        if (next) {
          void this.enterLevel(next.id, { openLesson: true });
          return;
        }
        this.openLevels();
        return;
      }
    }
    if (lower === 'goal' || lower === 'guide' || lower === 'steps') {
      this.focusGuide();
      this.terminal.push('meta', ui().guideAlwaysRight);
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
    if (lower === 'local' || lower === 'setup' || lower === 'production') {
      this.openLocalGuide();
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
    const series = seriesOf();
    const body = series
      .map((s) => {
        const rows = s.levels
          .map((item) => {
            const l = localizeLevel(item.def, getLocale());
            const p = this.progress[l.id];
            const solved = Boolean(p?.solved);
            const active = this.level?.id === l.id;
            return `<button type="button" class="level-row ${solved ? 'solved' : ''}${active ? ' active' : ''}" data-level="${l.id}">
              <span class="id">${item.displayId}</span>
              <span class="name">${escapeHtml(l.title)}</span>
              <span class="par-note">${escapeHtml(u.idealCommands(l.par))}</span>
              <span class="chip ${solved ? 'ok' : ''}" title="${escapeHtml(u.difficultyOf(l.difficulty))}">
                ${
                  solved
                    ? `${escapeHtml(u.solvedLabel)} ${p?.bestStrokes ?? l.par}`
                    : `<span class="diff-dots" aria-label="${escapeHtml(u.difficultyOf(l.difficulty))}">${renderDiffDots(l.difficulty)}</span>`
                }
              </span>
            </button>`;
          })
          .join('');
        return `<div class="series-block"><h3>${escapeHtml(s.title)}</h3><div class="level-list">${rows}</div></div>`;
      })
      .join('');

    const modal = showModal({
      title: u.levelsTitle,
      bodyHtml: `<p>${escapeHtml(u.pickChallenge)}</p>
        <div class="legend-box">
          <div class="next-title">${escapeHtml(u.howToRead)}</div>
          <ul class="legend-list">
            <li>
              <span class="diff-dots" aria-hidden="true">${renderDiffDots(3)}</span>
              ${renderMarkdown(u.difficultyLegend)}
            </li>
            <li><span class="par-note">${escapeHtml(u.idealCommands(3))}</span> ${renderMarkdown(u.idealLegend)}</li>
            <li><span class="chip ok">${escapeHtml(u.solvedLabel)} 3</span> ${renderMarkdown(u.solvedLegend)}</li>
          </ul>
        </div>
        ${body}`,
      actions: [{ label: u.closeBtn, className: 'ghost', onClick: () => modal.close() }],
    });

    const modalBox = modal.el.querySelector<HTMLElement>('.modal');
    if (modalBox) {
      modalBox.scrollTop = 0;
    }

    modal.el.querySelectorAll<HTMLButtonElement>('[data-level]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.level;
        modal.close();
        if (id) {
          void this.enterLevel(id, { openLesson: true });
        }
      });
    });
  }

  openLesson(): void {
    if (!this.level || !this.level.lesson) {
      this.openWelcome();
      return;
    }
    const u = ui();
    showModal({
      title: `${this.level.title} — ${u.lesson}`,
      bodyHtml: renderMarkdown(this.level.lesson),
      actions: [{ label: u.closeBtn, className: 'primary', onClick: () => this.terminal.focus() }],
      onDismiss: () => this.terminal.focus(),
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
| \`solution\` | Display target solution |
| \`undo\` | Remove the last stroke |
| \`reset\` | Clear the environment and start over |
| \`sandbox\` | Enter open sandbox mode |
| \`clear\` | Clear the console log |
| \`script\` | Toggle multi-line R script editor |
| \`local\` | Open production and local environment setup guide |

### Execution
- Press **Ctrl / Cmd + Enter** to run the current line or script.
- Type in the console prompt and hit **Enter**.
- Tab cycles through autocomplete suggestions.
      `),
      actions: [{ label: u.closeBtn, onClick: () => undefined }],
    });
  }

  openLocalGuide(): void {
    const u = ui();
    const loc = getLocale();
    let guideMd = '';

    if (loc === 'fa') {
      guideMd = `
### راهنمای جامع راه‌اندازی R در محیط محلی و استانداردهای پروداکشن

برای انتقال از این سندباکس آموزشی مرورگر به پروژه‌های واقعی سازمانی، این چک‌لیست طلایی را دنبال کنید:

#### ۱. نصب R و کامپایلرهای سیستمی
- **هسته R:** دانلود آخرین نسخه پایدار از [CRAN](https://cran.r-project.org/)
- **ویندوز (بسیار حیاتی):** حتماً ابزار **Rtools** متناسب با نسخه R را نصب کنید تا کامپایل پکیج‌های C/C++ مانند \`data.table\` و \`Rcpp\` بدون خطا انجام شود.
- **مک (macOS):** اجرای دستور \`xcode-select --install\` در ترمینال.
- **لینوکس (Ubuntu/Debian):** اجرای دستور \`sudo apt install r-base-dev\`.

#### ۲. محیط‌های مدرن توسعه (IDE)
- **Positron (پیشنهاد مدرن):** محیط توسعه نسل جدید شرکت Posit مبتنی بر هسته VS Code.
- **RStudio Desktop:** کامل‌ترین و محبوب‌ترین IDE تخصصی برای توسعه پکیج‌ها و اسکریپت‌های R.
- **VS Code:** همراه با افزونه رسمی R و پکیج \`languageserver\`.

#### ۳. مدیریت ایزوله وابستگی‌ها با \`renv\` (پرهیز از تداخل نسخه‌ها)
\`\`\`r
# ۱. ساخت کتابخانه ایزوله در پوشه پروژه
renv::init()

# ۲. ثبت نسخه‌های دقیق پکیج‌ها در renv.lock
renv::snapshot()

# ۳. بازسازی دقیق محیط در سیستم همکاران یا کانتینر Docker
renv::restore()
\`\`\`

#### ۴. ساختار پوشه‌بندی استاندارد پروژه‌های سازمانی
\`\`\`text
my_r_project/
├── .Renviron          # متغیرهای محرمانه و پسوردها (حتماً در .gitignore باشد!)
├── .gitignore         # نادیده گرفتن data/، .RData، و renv/library/
├── .Rprofile          # اسکریپت راه‌اندازی سشن
├── renv.lock          # قفل متنی نسخه‌های دقیق پکیج‌ها
├── data/
│   ├── raw/           # داده‌های خام و غیرقابل تغییر
│   └── clean/         # خروجی‌های تمیزشده
├── R/                 # توابع کمکی و اسکریپت‌های ماژولار
└── run_pipeline.R     # اسکریپت اصلی اجرای خط لوله
\`\`\`

#### ۵. اتوماسیون و اجرای شبانه (Batch Automation)
اجرای خودکار پایپ‌لاین‌ها در پس‌زمینه توسط Airflow یا Cron:
\`\`\`bash
Rscript run_pipeline.R --date=2026-10-01
\`\`\`
`;
    } else if (loc === 'de') {
      guideMd = `
### Leitfaden: Lokale R-Entwicklung & Produktions-Standards

Schließe die Lücke zwischen Browser-Sandbox und produktiver Datenanalyse im Unternehmen:

#### 1. R-Kern & Compiler-Toolchains
- **R Basis:** Aktuelle Version von [CRAN](https://cran.r-project.org/) herunterladen.
- **Windows (essenziell):** Installiere **Rtools**, um C/C++-Pakete lokal kompilieren zu können.
- **macOS:** Führe \`xcode-select --install\` im Terminal aus.
- **Linux:** \`sudo apt install r-base-dev\`.

#### 2. Moderne Entwicklungsumgebungen (IDE)
- **Positron:** Die neue, moderne Data-Science-IDE von Posit auf VS-Code-Basis.
- **RStudio Desktop:** Die bewährte Referenz-IDE für statistische Modellierung und R-Pakete.
- **VS Code:** Mit der offiziellen R-Erweiterung und dem Paket \`languageserver\`.

#### 3. Reproduzierbare Umgebungen mit \`renv\`
\`\`\`r
# 1. Lokale Projektbibliothek isolieren
renv::init()

# 2. Paketversionen in renv.lock fixieren
renv::snapshot()

# 3. Umgebung auf Servern deterministisch wiederherstellen
renv::restore()
\`\`\`

#### 4. Professionelle Projektstruktur
\`\`\`text
my_r_project/
├── .Renviron          # Passwörter & Secrets (gehört zwingend in .gitignore)
├── .gitignore         # Schließt Daten & renv/library/ aus
├── renv.lock          # Sperrdatei der Paketversionen
├── data/              # Rohe und bereinigte Daten
├── R/                 # Modulare Funktionen
└── run_pipeline.R     # Hauptskript für Batch-Ausführung
\`\`\`

#### 5. Headless Automatisierung & CLI
\`\`\`bash
Rscript run_pipeline.R --date=2026-10-01
\`\`\`
`;
    } else {
      guideMd = `
### Comprehensive Local R Setup & Production Engineering Guide

Bridge the gap from this browser sandbox to real-world production data engineering:

#### 1. R Core Engine & Compiler Toolchains
- **R Binaries:** Download the latest official release from [CRAN](https://cran.r-project.org/).
- **Windows (Critical):** Install **Rtools** matching your R major version to enable compilation of C/C++ packages like \`data.table\` and \`Rcpp\`.
- **macOS:** Run \`xcode-select --install\` in the terminal.
- **Linux (Ubuntu/Debian):** Run \`sudo apt-get install r-base-dev\`.

#### 2. Modern IDEs & Tooling
- **Positron (Recommended):** The next-generation, fast, extensible data science IDE from Posit built on Code OSS.
- **RStudio Desktop:** The long-standing gold standard IDE for R development.
- **VS Code:** Excellent with the official \`R\` extension and \`languageserver\` package.

#### 3. Isolated Dependency Locking with \`renv\`
Never install packages globally across production machines:
\`\`\`r
# 1. Initialize an isolated project library
renv::init()

# 2. Capture and lock package versions into renv.lock
renv::snapshot()

# 3. Deterministically recreate environment on Docker / servers
renv::restore()
\`\`\`

#### 4. Enterprise Project Directory Architecture
\`\`\`text
my_r_project/
├── .Renviron          # Secrets & API credentials (ALWAYS in .gitignore)
├── .gitignore         # Exclude large data/, .RData, and renv/library/
├── .Rprofile          # Startup initialization hook
├── renv.lock          # Precise dependency tree lockfile
├── data/              # Immutable raw and cleaned artifacts
├── R/                 # Modular pure functions
└── run_pipeline.R     # Top-level headless executable pipeline
\`\`\`

#### 5. Headless Automation & Batch Jobs
Run analytical pipelines headlessly from crontab or Airflow:
\`\`\`bash
Rscript run_pipeline.R --date=2026-10-01
\`\`\`
`;
    }

    showModal({
      title: u.localSetupTitle,
      bodyHtml: renderMarkdown(guideMd),
      actions: [{ label: u.closeBtn, className: 'primary', onClick: () => this.terminal.focus() }],
      onDismiss: () => this.terminal.focus(),
    });
  }

  openWelcome(): void {
    const u = ui();
    showModal({
      title: u.welcomeTitle,
      bodyHtml: renderMarkdown(
        [
          u.welcomeIntro,
          '',
          u.welcomeBoard,
          '',
          u.welcomeTracks,
          '',
          u.welcomeMeta,
          '',
          u.welcomeLevelsCount(allLevels.length),
          '',
          u.welcomeWhat,
          u.welcomeWhatBody,
          '',
          u.welcomePublisher,
          u.welcomePublisherBody,
          '',
          u.welcomeGithub,
          '',
          u.welcomeCoffee,
          '',
          COFFEE_BUTTON_HTML,
        ].join('\n'),
      ),
      actions: [
        {
          label: u.sandbox,
          className: 'ghost',
          onClick: () => undefined,
        },
        {
          label: u.openLevels,
          className: 'primary',
          onClick: () => this.openLevels(),
        },
      ],
    });
  }
}
