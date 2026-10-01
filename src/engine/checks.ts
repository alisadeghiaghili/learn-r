import type { CheckDef, CheckResult } from './types';

export interface CheckContext {
  evalResults?: boolean[];
  stdout: string;
  hasPlot: boolean;
  studentCode: string;
}

/**
 * Pure evaluation of declarative checks against execution context.
 */
export function evaluateChecks(
  checks: CheckDef[],
  ctx: CheckContext,
): { ok: boolean; results: CheckResult[] } {
  const evalQueue = [...(ctx.evalResults ?? [])];

  const results: CheckResult[] = checks.map((check) => {
    let passed = false;

    switch (check.type) {
      case 'eval': {
        passed = evalQueue.length > 0 ? Boolean(evalQueue.shift()) : false;
        break;
      }
      case 'stdout': {
        if (check.match) {
          passed = ctx.stdout.includes(check.match);
        }
        break;
      }
      case 'plot': {
        passed = Boolean(ctx.hasPlot);
        break;
      }
      case 'pattern': {
        if (check.pattern) {
          const reg = typeof check.pattern === 'string' ? new RegExp(check.pattern) : check.pattern;
          passed = reg.test(ctx.studentCode);
        }
        break;
      }
    }

    return { label: check.label, passed };
  });

  return {
    ok: results.length > 0 && results.every((r) => r.passed),
    results,
  };
}

/**
 * Extract R expressions that require WebR evaluation.
 */
export function evalExpressions(checks: CheckDef[]): string[] {
  return checks
    .filter((c) => c.type === 'eval' && typeof c.expr === 'string' && c.expr.trim().length > 0)
    .map((c) => c.expr!);
}

/**
 * Format strokes against par for golf scoring.
 */
export function formatScore(strokes: number, par: number | null): string {
  const strokeLabel = `${strokes} stroke${strokes === 1 ? '' : 's'}`;
  if (par === null) return strokeLabel;
  const base = `${strokeLabel} · par ${par}`;
  if (strokes === 0) return base;
  if (strokes < par) return `${base} · under par`;
  if (strokes === par) return `${base} · even`;
  return `${base} · over par`;
}

/**
 * Classify score relative to par for styling.
 */
export function scoreClass(strokes: number, par: number | null): 'under' | 'par' | 'over' | 'none' {
  if (par === null) return 'none';
  if (strokes < par) return 'under';
  if (strokes === par) return 'par';
  return 'over';
}
