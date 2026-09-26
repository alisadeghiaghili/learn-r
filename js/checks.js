/**
 * Pure helpers for level checks and golf scoring.
 * No DOM, no WebR — unit-testable in Node.
 */

/**
 * @typedef {Object} Check
 * @property {"eval"|"stdout"|"plot"} type
 * @property {string} [expr] R expression that must return TRUE
 * @property {string} [match] substring that must appear in stdout
 * @property {string} label
 */

/**
 * @typedef {Object} CheckContext
 * @property {Set<boolean>|boolean[]} evalResults
 * @property {string} stdout
 * @property {boolean} hasPlot
 */

/**
 * Evaluate checks against a result context.
 *
 * @param {Check[]} checks
 * @param {CheckContext} ctx
 * @returns {{ ok: boolean, results: { label: string, passed: boolean }[] }}
 */
export function evaluateChecks(checks, ctx) {
  const evalQueue = Array.isArray(ctx.evalResults)
    ? [...ctx.evalResults]
    : [...(ctx.evalResults ?? [])];

  const results = checks.map((check) => {
    let passed = false;
    if (check.type === "eval") {
      passed = evalQueue.length > 0 ? Boolean(evalQueue.shift()) : false;
    } else if (check.type === "stdout") {
      passed = ctx.stdout.includes(check.match);
    } else if (check.type === "plot") {
      passed = Boolean(ctx.hasPlot);
    }
    return { label: check.label, passed };
  });

  return {
    ok: results.length > 0 && results.every((r) => r.passed),
    results,
  };
}

/**
 * Split a checks array into eval expressions (order-preserving).
 *
 * @param {Check[]} checks
 * @returns {string[]}
 */
export function evalExpressions(checks) {
  return checks
    .filter((c) => c.type === "eval" && typeof c.expr === "string" && c.expr.length > 0)
    .map((c) => c.expr);
}

/**
 * Format golf score versus par.
 *
 * @param {number} strokes
 * @param {number|null} par
 * @returns {string}
 */
export function formatScore(strokes, par) {
  const strokeLabel = `${strokes} stroke${strokes === 1 ? "" : "s"}`;
  if (par == null) return strokeLabel;
  const base = `${strokeLabel} · par ${par}`;
  if (strokes === 0) return `${base}`;
  if (strokes < par) return `${base} · under par`;
  if (strokes === par) return `${base} · even`;
  return base;
}

/**
 * Classify score relative to par.
 *
 * @param {number} strokes
 * @param {number|null} par
 * @returns {"under"|"par"|"over"|"none"}
 */
export function scoreClass(strokes, par) {
  if (par == null) return "none";
  if (strokes < par) return "under";
  if (strokes === par) return "par";
  return "over";
}
