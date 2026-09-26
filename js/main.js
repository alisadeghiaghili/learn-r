/**
 * learn-r application bootstrap and command loop.
 */

import { LEVELS, getLevel, levelIndex } from "./levels.js";
import { evaluateChecks, evalExpressions, formatScore, scoreClass } from "./checks.js";
import { RRtime } from "./runtime.js";
import {
  appendConsole,
  clearConsole,
  renderLevelList,
  renderBrief,
  renderChecks,
  renderHint,
  showOverlay,
  hideOverlay,
} from "./ui.js";
import { renderEnvTree, renderPlot, setVizTab } from "./visualizer.js";

const els = {
  modeLabel: document.querySelector("#mode-label"),
  strokesLabel: document.querySelector("#strokes-label"),
  parLabel: document.querySelector("#par-label"),
  progressLabel: document.querySelector("#progress-label"),
  levelList: document.querySelector("#level-list"),
  btnSandbox: document.querySelector("#btn-sandbox"),
  btnRun: document.querySelector("#btn-run"),
  btnUndo: document.querySelector("#btn-undo"),
  btnReset: document.querySelector("#btn-reset"),
  btnHint: document.querySelector("#btn-hint"),
  btnHelp: document.querySelector("#btn-help"),
  editor: document.querySelector("#editor"),
  consoleOut: document.querySelector("#console-out"),
  envTree: document.querySelector("#env-tree"),
  plotImg: document.querySelector("#plot-img"),
  plotEmpty: document.querySelector("#plot-empty"),
  briefBody: document.querySelector("#brief-body"),
  checkList: document.querySelector("#check-list"),
  overlay: document.querySelector("#overlay"),
  boot: document.querySelector("#boot"),
  bootBar: document.querySelector("#boot-bar-fill"),
  viz: document.querySelector(".viz"),
};

/** @type {{ activeId: string|null, solved: Set<string>, showHint: boolean, plotUrl: string|null, knownNames: Set<string> }} */
const state = {
  activeId: null,
  solved: new Set(),
  showHint: false,
  plotUrl: null,
  knownNames: new Set(),
};

const runtime = new RRtime();
const STORAGE_KEY = "learn-r-solved-v1";

function loadSolved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    for (const id of JSON.parse(raw)) state.solved.add(id);
  } catch {
    /* ignore */
  }
}

function saveSolved() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.solved]));
}

function currentLevel() {
  return state.activeId ? getLevel(state.activeId) : null;
}

function isSandbox() {
  return state.activeId === null;
}

function updateChrome() {
  const level = currentLevel();
  els.modeLabel.textContent = isSandbox() ? "sandbox" : `level ${levelIndex(state.activeId) + 1}`;
  els.strokesLabel.textContent = `${runtime.strokeCount()} stroke${runtime.strokeCount() === 1 ? "" : "s"}`;
  if (level) {
    els.parLabel.hidden = false;
    els.parLabel.textContent = `par ${level.par}`;
  } else {
    els.parLabel.hidden = true;
  }
  els.progressLabel.textContent = `${state.solved.size} / ${LEVELS.length}`;
}

async function refreshPanels(checksPreview) {
  updateChrome();
  renderLevelList(els.levelList, LEVELS, state, (id) => void enterLevel(id));
  const level = currentLevel();
  renderBrief(els.briefBody, level ?? {}, checksPreview ?? [], state.showHint, isSandbox());

  if (level && checksPreview) {
    renderChecks(els.checkList, checksPreview);
  } else {
    els.checkList.replaceChildren();
  }
  renderHint(els.checkList, level?.hint, state.showHint && !isSandbox());

  const rows = await runtime.snapshotEnv();
  const nextNames = new Set(rows.map((r) => r.name));
  renderEnvTree(els.envTree, rows, state.knownNames);
  state.knownNames = nextNames;

  const url = await runtime.plotObjectUrl();
  if (state.plotUrl && state.plotUrl !== url) {
    URL.revokeObjectURL(state.plotUrl);
  }
  state.plotUrl = url;
  renderPlot(els.plotImg, els.plotEmpty, url);
  if (url) setVizTab(els.viz, "plot");
}

/**
 * @returns {Promise<{ ok: boolean, results: { label: string, passed: boolean }[] }>}
 */
async function runChecks() {
  const level = currentLevel();
  if (!level) return { ok: false, results: [] };

  const exprs = evalExpressions(level.checks);
  const evalResults = await runtime.evalChecks(exprs);
  const stdout = runtime.lastStdout ?? "";
  const ctx = {
    evalResults,
    // Only real R stdout — never the echoed editor line.
    stdout: runtime.lastStdout ?? "",
    hasPlot: runtime.hasActivePlot(),
  };
  return evaluateChecks(level.checks, ctx);
}

async function afterStroke(stdout, stderr) {
  if (stdout) appendConsole(els.consoleOut, stdout, "stdout");
  if (stderr) appendConsole(els.consoleOut, stderr, "stderr");

  let checksPreview = [];
  if (!isSandbox()) {
    const verdict = await runChecks();
    checksPreview = verdict.results;
    if (verdict.ok) {
      await onLevelClear();
    }
  }
  await refreshPanels(checksPreview);
}

async function runEditor() {
  const code = els.editor.value;
  if (!code.trim()) return;

  appendConsole(els.consoleOut, `> ${code.trim().replace(/\n/g, "\n  ")}`, "input");

  const meta = matchMeta(code.trim());
  if (meta) {
    await runMeta(meta);
    els.editor.value = "";
    return;
  }

  els.editor.value = "";
  const result = await runtime.pushStroke(code);
  await afterStroke(result.stdout, result.stderr);
}

/**
 * @param {string} line
 * @returns {string|null}
 */
function matchMeta(line) {
  const cmd = line.split(/\s+/)[0].toLowerCase();
  const known = new Set(["levels", "help", "undo", "reset", "hint", "sandbox", "next", "prev"]);
  return known.has(cmd) ? cmd : null;
}

async function runMeta(cmd) {
  if (cmd === "levels") {
    appendConsole(els.consoleOut, LEVELS.map((l, i) => `${String(i + 1).padStart(2, "0")}  ${l.title}`).join("\n"), "meta");
    return;
  }
  if (cmd === "help") {
    showHelp();
    return;
  }
  if (cmd === "undo") {
    await undo();
    return;
  }
  if (cmd === "reset") {
    await resetLevel();
    return;
  }
  if (cmd === "hint") {
    state.showHint = true;
    await refreshPanels(await previewChecks());
    return;
  }
  if (cmd === "sandbox") {
    await enterSandbox();
    return;
  }
  if (cmd === "next") {
    const i = levelIndex(state.activeId);
    if (i >= 0 && i < LEVELS.length - 1) await enterLevel(LEVELS[i + 1].id);
    else appendConsole(els.consoleOut, "Already on the last level.", "meta");
    return;
  }
  if (cmd === "prev") {
    const i = levelIndex(state.activeId);
    if (i > 0) await enterLevel(LEVELS[i - 1].id);
    else appendConsole(els.consoleOut, "Already on the first level.", "meta");
  }
}

async function previewChecks() {
  if (isSandbox()) return [];
  const verdict = await runChecks();
  return verdict.results;
}

async function undo() {
  const done = await runtime.undoStroke();
  appendConsole(els.consoleOut, done ? "Undid last stroke." : "Nothing to undo.", "meta");
  await afterStroke("", "");
}

async function resetLevel() {
  const level = currentLevel();
  clearConsole(els.consoleOut);
  appendConsole(els.consoleOut, "Environment reset.", "meta");
  await runtime.resetTo(level?.setup ?? "", []);
  state.knownNames = new Set();
  state.showHint = false;
  await refreshPanels(await previewChecks());
}

async function enterLevel(id) {
  const level = getLevel(id);
  if (!level) return;
  state.activeId = id;
  state.showHint = false;
  state.knownNames = new Set();
  clearConsole(els.consoleOut);
  appendConsole(els.consoleOut, `Level: ${level.title}`, "meta");
  await runtime.resetTo(level.setup, []);
  hideOverlay(els.overlay);
  await refreshPanels(level.checks.map((c) => ({ label: c.label, passed: false })));
}

async function enterSandbox() {
  state.activeId = null;
  state.showHint = false;
  state.knownNames = new Set();
  clearConsole(els.consoleOut);
  appendConsole(els.consoleOut, "Sandbox ready.", "meta");
  await runtime.resetTo("", []);
  hideOverlay(els.overlay);
  await refreshPanels([]);
}

async function onLevelClear() {
  const level = currentLevel();
  if (!level || state.solved.has(level.id)) {
    if (level) {
      appendConsole(els.consoleOut, "Level already solved.", "ok");
    }
    return;
  }

  const strokes = runtime.strokeCount();
  state.solved.add(level.id);
  saveSolved();
  appendConsole(els.consoleOut, `Level clear. ${formatScore(strokes, level.par)}`, "ok");

  const idx = levelIndex(level.id);
  const next = LEVELS[idx + 1];
  showOverlay(
    els.overlay,
    {
      title: "Level clear",
      score: formatScore(strokes, level.par),
      body: next ? `Next up: ${next.title}` : "Foundations complete. Sandbox is open.",
      actions: [
        ...(next ? [{ label: "Next level", id: "next", primary: true }] : []),
        { label: "Replay", id: "replay" },
        { label: "Sandbox", id: "sandbox" },
      ],
    },
    async (action) => {
      hideOverlay(els.overlay);
      if (action === "next" && next) await enterLevel(next.id);
      else if (action === "replay") await enterLevel(level.id);
      else if (action === "sandbox") await enterSandbox();
      else await refreshPanels(await previewChecks());
    }
  );
}

function showHelp() {
  showOverlay(
    els.overlay,
    {
      title: "How to play",
      body: [
        "Write R code in the editor and Run. The Environment and Plot tabs show state after every stroke.",
        "Commands: levels · hint · undo · reset · sandbox · next · prev · help",
        "Golf: match or beat par. Undo removes the last stroke. Reset restarts the level.",
      ].join("\n\n"),
      actions: [{ label: "Close", id: "close", primary: true }],
    },
    () => hideOverlay(els.overlay)
  );
}

function scoreClassOnClear(strokes, par) {
  return scoreClass(strokes, par);
}

function wireEvents() {
  els.btnRun.addEventListener("click", () => void runEditor());
  els.btnUndo.addEventListener("click", () => void undo());
  els.btnReset.addEventListener("click", () => void resetLevel());
  els.btnHelp.addEventListener("click", () => showHelp());
  els.btnHint.addEventListener("click", async () => {
    state.showHint = true;
    await refreshPanels(await previewChecks());
    if (isSandbox()) {
      appendConsole(els.consoleOut, "Hint is only available in levels.", "meta");
    }
  });
  els.btnSandbox.addEventListener("click", () => void enterSandbox());

  els.editor.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      void runEditor();
    }
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      void runEditor();
    }
  });

  for (const tab of els.viz.querySelectorAll(".viz-tab")) {
    tab.addEventListener("click", () => {
      setVizTab(els.viz, tab.dataset.viz);
    });
  }
}

function applyUrlParams() {
  const params = new URLSearchParams(location.search);
  const levelId = params.get("level");
  return { levelId: levelId && getLevel(levelId) ? levelId : null };
}

async function boot() {
  loadSolved();
  wireEvents();
  els.bootBar.style.width = "18%";

  try {
    await runtime.init((p) => {
      els.bootBar.style.width = `${Math.round(p * 100)}%`;
    });
  } catch (err) {
    els.boot.querySelector(".boot-title").textContent = "Failed to load R";
    els.boot.querySelector(".boot-note").textContent =
      err instanceof Error ? err.message : String(err);
    console.error(err);
    return;
  }

  const { levelId } = applyUrlParams();

  try {
    if (levelId) {
      await enterLevel(levelId);
    } else {
      await enterSandbox();
      showHelp();
    }
  } catch (err) {
    console.error(err);
    els.boot.querySelector(".boot-title").textContent = "Failed to start session";
    els.boot.querySelector(".boot-note").textContent =
      err instanceof Error ? err.message : String(err);
    return;
  }

  els.boot.hidden = true;
}

void boot();

// re-export for debugging in console
window.learnR = { runtime, state, LEVELS, scoreClassOnClear };
