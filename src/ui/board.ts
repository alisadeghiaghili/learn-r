import type { RObjectInfo } from '../engine/types';
import { ui } from '../i18n';
import { escapeHtml } from './dialog';

export type BoardTab = 'env' | 'plot';

export class BoardView {
  private root: HTMLElement;
  private currentTab: BoardTab = 'env';
  private envRows: RObjectInfo[] = [];
  private plotUrl: string | null = null;
  private previousNames = new Set<string>();

  constructor(root: HTMLElement) {
    this.root = root;
    this.render();
  }

  setTab(tab: BoardTab): void {
    this.currentTab = tab;
    this.render();
  }

  update(env: RObjectInfo[], plotUrl: string | null, newNames: Set<string>): void {
    this.envRows = env;
    this.previousNames = newNames;
    if (this.plotUrl && this.plotUrl !== plotUrl) {
      URL.revokeObjectURL(this.plotUrl);
    }
    this.plotUrl = plotUrl;
    if (plotUrl && this.currentTab !== 'plot') {
      // Auto-switch to plot when a plot is freshly produced
      this.currentTab = 'plot';
    }
    this.render();
  }

  private render(): void {
    const u = ui();
    const hasPlot = Boolean(this.plotUrl);

    this.root.innerHTML = `
      <div class="board-header">
        <div class="board-tabs" role="tablist">
          <button type="button" class="board-tab${this.currentTab === 'env' ? ' is-active' : ''}" data-tab="env" role="tab" aria-selected="${this.currentTab === 'env'}">
            <span>${escapeHtml(u.tabEnv)}</span>
            <span class="tab-badge">${this.envRows.length}</span>
          </button>
          <button type="button" class="board-tab${this.currentTab === 'plot' ? ' is-active' : ''}" data-tab="plot" role="tab" aria-selected="${this.currentTab === 'plot'}">
            <span>${escapeHtml(u.tabPlot)}</span>
            ${hasPlot ? '<span class="tab-badge ok">●</span>' : ''}
          </button>
        </div>
      </div>
      <div class="board-body">
        ${this.currentTab === 'env' ? this.renderEnv() : this.renderPlot()}
      </div>
    `;

    this.root.querySelectorAll<HTMLButtonElement>('.board-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab as BoardTab;
        if (tab) this.setTab(tab);
      });
    });
  }

  private renderEnv(): string {
    const u = ui();
    if (!this.envRows.length) {
      return `<div class="board-empty"><p>${escapeHtml(u.envEmpty)}</p></div>`;
    }

    const rows = this.envRows
      .map((row) => {
        const isNew = !this.previousNames.has(row.name);
        return `
          <div class="env-card${isNew ? ' is-new' : ''}">
            <div class="env-card-header">
              <span class="env-var-name">${escapeHtml(row.name)}</span>
              <span class="chip code">${escapeHtml(row.class || row.type)}${Number.isFinite(row.length) ? ` [${row.length}]` : ''}</span>
            </div>
            <div class="env-card-preview">${escapeHtml(row.preview || '—')}</div>
          </div>
        `;
      })
      .join('');

    return `<div class="env-cards-grid">${rows}</div>`;
  }

  private renderPlot(): string {
    const u = ui();
    if (!this.plotUrl) {
      return `<div class="board-empty"><p>${escapeHtml(u.plotEmpty)}</p></div>`;
    }
    return `
      <div class="plot-stage">
        <img class="plot-canvas-img" src="${this.plotUrl}" alt="R Plot Output" />
      </div>
    `;
  }
}
