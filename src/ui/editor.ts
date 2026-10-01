import { ui } from '../i18n';
import { escapeHtml } from './dialog';

export class ScriptEditorView {
  private root: HTMLElement;
  private textarea!: HTMLTextAreaElement;
  private onRun: (code: string) => void;
  private isExpanded = false;

  constructor(root: HTMLElement, onRun: (code: string) => void) {
    this.root = root;
    this.onRun = onRun;
    this.render();
  }

  getValue(): string {
    return this.textarea.value;
  }

  setValue(val: string): void {
    this.textarea.value = val;
  }

  toggle(expanded?: boolean): void {
    this.isExpanded = expanded !== undefined ? expanded : !this.isExpanded;
    this.root.classList.toggle('is-open', this.isExpanded);
    if (this.isExpanded) {
      this.textarea.focus();
    }
  }

  isOpen(): boolean {
    return this.isExpanded;
  }

  private render(): void {
    const u = ui();
    this.root.innerHTML = `
      <div class="editor-bar">
        <span class="editor-title">R Script</span>
        <div class="editor-bar-actions">
          <button type="button" class="btn btn-sm primary" id="editor-run-btn">
            <span>${escapeHtml(u.runBtn)}</span>
            <span class="kbd-badge">${escapeHtml(u.runKeyHint)}</span>
          </button>
          <button type="button" class="btn btn-sm ghost" id="editor-toggle-btn">
            ${escapeHtml(u.editorClose)}
          </button>
        </div>
      </div>
      <div class="editor-textarea-wrap">
        <textarea
          id="editor-textarea"
          class="editor-textarea"
          spellcheck="false"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          placeholder="# Write multi-line R code here and press Run (Ctrl+Enter)"
          rows="6"
        ></textarea>
      </div>
    `;

    this.textarea = this.root.querySelector('#editor-textarea')!;
    const runBtn = this.root.querySelector('#editor-run-btn')!;
    const toggleBtn = this.root.querySelector('#editor-toggle-btn')!;

    runBtn.addEventListener('click', () => {
      const code = this.textarea.value;
      if (code.trim()) {
        this.onRun(code);
      }
    });

    toggleBtn.addEventListener('click', () => {
      this.toggle(false);
    });

    this.textarea.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const code = this.textarea.value;
        if (code.trim()) {
          this.onRun(code);
        }
      }
      // Handle Tab key for 2 spaces indentation
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        this.textarea.value = this.textarea.value.substring(0, start) + '  ' + this.textarea.value.substring(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = start + 2;
      }
    });
  }
}
