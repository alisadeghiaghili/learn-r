/**
 * DOM helpers: console log, sidebar, brief, overlays.
 */

/**
 * @param {HTMLElement} out
 * @param {string} text
 * @param {"input"|"stdout"|"stderr"|"meta"|"ok"} kind
 */
export function appendConsole(out, text, kind = "stdout") {
  const line = document.createElement("div");
  line.className = `console-line is-${kind}`;
  line.textContent = text;
  out.append(line);
  out.scrollTop = out.scrollHeight;
}

/**
 * @param {HTMLElement} out
 */
export function clearConsole(out) {
  out.replaceChildren();
}

/**
 * @param {HTMLElement} list
 * @param {import('./levels.js').LEVELS} levels
 * @param {{ activeId: string|null, solved: Set<string> }} state
 * @param {(id: string) => void} onSelect
 */
export function renderLevelList(list, levels, state, onSelect) {
  list.replaceChildren();
  levels.forEach((level, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "level-item";
    if (state.activeId === level.id) btn.classList.add("is-active");
    if (state.solved.has(level.id)) btn.classList.add("is-done");

    const num = document.createElement("span");
    num.className = "level-num";
    num.textContent = String(index + 1).padStart(2, "0");

    const name = document.createElement("span");
    name.className = "level-name";
    name.textContent = level.title;

    const mark = document.createElement("span");
    mark.className = "level-mark";
    mark.textContent = state.solved.has(level.id) ? "✓" : `par ${level.par}`;

    btn.append(num, name, mark);
    btn.addEventListener("click", () => onSelect(level.id));
    list.append(btn);
  });
}

/**
 * @param {HTMLElement} root
 * @param {{ title: string, brief: string, goal: string, hint?: string }} level
 * @param {{ label: string, passed: boolean }[]} checks
 * @param {boolean} showHint
 * @param {boolean} isSandbox
 */
export function renderBrief(root, level, checks, showHint, isSandbox) {
  root.replaceChildren();

  if (isSandbox) {
    const title = document.createElement("h2");
    title.className = "brief-title";
    title.textContent = "Sandbox";
    const text = document.createElement("p");
    text.className = "brief-text";
    text.textContent =
      "Free R session. Type code and Run. Use the commands below anytime.";
    const goal = document.createElement("pre");
    goal.className = "brief-goal";
    goal.textContent = [
      "levels   open the level list",
      "hint     show a hint (levels)",
      "undo     remove last stroke",
      "reset    clear the environment",
      "help     command reference",
    ].join("\n");
    root.append(title, text, goal);
    return;
  }

  const title = document.createElement("h2");
  title.className = "brief-title";
  title.textContent = level.title;

  const text = document.createElement("p");
  text.className = "brief-text";
  text.textContent = level.brief;

  const label = document.createElement("div");
  label.className = "brief-section-label";
  label.textContent = "Target";

  const goal = document.createElement("pre");
  goal.className = "brief-goal";
  goal.textContent = level.goal;

  root.append(title, text, label, goal);
}

/**
 * @param {HTMLElement} list
 * @param {{ label: string, passed: boolean }[]} checks
 */
export function renderChecks(list, checks) {
  list.replaceChildren();
  if (!checks.length) return;

  const label = document.createElement("div");
  label.className = "brief-section-label";
  label.textContent = "Checks";
  list.append(label);

  for (const check of checks) {
    const row = document.createElement("div");
    row.className = "check-item";
    if (check.passed) row.classList.add("is-ok");
    else row.classList.add("is-fail");

    const dot = document.createElement("span");
    dot.className = "check-dot";

    const text = document.createElement("span");
    text.textContent = check.label;

    row.append(dot, text);
    list.append(row);
  }
}

/**
 * @param {HTMLElement} list
 * @param {string|null} hint
 * @param {boolean} show
 */
export function renderHint(list, hint, show) {
  const existing = list.querySelector(".hint-box");
  if (existing) existing.remove();
  if (!show || !hint) return;
  const box = document.createElement("div");
  box.className = "hint-box";
  box.textContent = hint;
  list.append(box);
}

/**
 * @param {HTMLElement} overlay
 * @param {{ title: string, body: string, score?: string, actions: { label: string, id: string, primary?: boolean }[] }} spec
 * @param {(id: string) => void} onAction
 */
export function showOverlay(overlay, spec, onAction) {
  const title = overlay.querySelector("#overlay-title");
  const score = overlay.querySelector("#overlay-score");
  const body = overlay.querySelector("#overlay-body");
  const actions = overlay.querySelector("#overlay-actions");

  title.textContent = spec.title;
  if (spec.score) {
    score.hidden = false;
    score.textContent = spec.score;
  } else {
    score.hidden = true;
    score.textContent = "";
  }
  body.innerHTML = "";
  if (spec.body.includes("<pre") || spec.body.includes("\n")) {
    const pre = document.createElement("pre");
    pre.textContent = spec.body;
    body.append(pre);
  } else {
    const p = document.createElement("p");
    p.textContent = spec.body;
    body.append(p);
  }

  actions.replaceChildren();
  for (const action of spec.actions) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = action.primary ? "btn btn-primary" : "btn";
    btn.textContent = action.label;
    btn.dataset.action = action.id;
    btn.addEventListener("click", () => onAction(action.id));
    actions.append(btn);
  }

  overlay.hidden = false;
}

/**
 * @param {HTMLElement} overlay
 */
export function hideOverlay(overlay) {
  overlay.hidden = true;
}

/**
 * @param {{ title: string, body: string, code?: string, hint?: string }} level
 * @returns {string}
 */
export function formatLevelBody(level) {
  const parts = [level.body ?? level.brief];
  if (level.code) parts.push(level.code);
  if (level.hint) parts.push(`Hint: ${level.hint}`);
  return parts.join("\n\n");
}
