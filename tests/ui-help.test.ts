import { describe, expect, it } from 'vitest';
import { formatUiHelpText, startUiTour, uiElements, uiHelpModalHtml } from '../src/ui/ui-help';

describe('ui-help module', () => {
  it('returns all UI element docs', () => {
    const elements = uiElements();
    expect(elements.length).toBeGreaterThanOrEqual(6);
    for (const el of elements) {
      expect(el.id).toBeDefined();
      expect(el.selector).toBeDefined();
      expect(el.title.length).toBeGreaterThan(0);
      expect(el.what.length).toBeGreaterThan(0);
      expect(el.how.length).toBeGreaterThan(0);
    }
  });

  it('formats console text help properly', () => {
    const text = formatUiHelpText();
    expect(text).toContain('1.');
    expect(text).toContain('levels');
  });

  it('generates modal HTML with focus buttons', () => {
    const html = uiHelpModalHtml();
    expect(html).toContain('class="ui-help"');
    expect(html).toContain('data-focus-id="level-title"');
    expect(html).toContain('data-focus-id="toolbar"');
    expect(html).toContain('data-focus-id="board"');
    expect(html).toContain('data-focus-id="dock"');
  });

  it('activates and deactivates UI tour highlighting', () => {
    const classes = new Map<string, Set<string>>();
    const elements = [
      { id: 'level-title', selector: '#level-title' },
      { id: 'toolbar', selector: '.toolbar-actions' },
      { id: 'board', selector: '#board-wrap' },
    ];
    const mockRoot = {
      querySelectorAll: (sel: string) => {
        if (sel === '.ui-tour-on') {
          return Array.from(classes.entries())
            .filter(([_, set]) => set.has('ui-tour-on'))
            .map(([_, set]) => ({
              classList: {
                remove: (c: string) => set.delete(c),
              },
            }));
        }
        return [];
      },
      querySelector: (sel: string) => {
        const found = elements.find((e) => e.selector === sel);
        if (!found) return null;
        if (!classes.has(found.selector)) classes.set(found.selector, new Set());
        const set = classes.get(found.selector)!;
        return {
          classList: {
            add: (c: string) => set.add(c),
            remove: (c: string) => set.delete(c),
          },
        };
      },
    } as unknown as ParentNode;

    const stop = startUiTour(mockRoot, undefined, 5000);
    expect(mockRoot.querySelectorAll('.ui-tour-on').length).toBe(3);

    stop();
    expect(mockRoot.querySelectorAll('.ui-tour-on').length).toBe(0);
  });
});
