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
 * Format commands against ideal count.
 */
export function formatScore(strokes: number, par: number | null): string {
  const strokeLabel = `${strokes} command${strokes === 1 ? '' : 's'}`;
  if (par === null) return strokeLabel;
  const base = `${strokeLabel} · ideal: ${par}`;
  if (strokes <= par) return `${base} (clean run!)`;
  return base;
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

/**
 * Splits multiline R code into top-level runnable statements,
 * respecting brackets, braces, parentheses, and continuation operators.
 */
export function splitRStatements(code: string): string[] {
  if (!code || !code.trim()) return [];
  const lines = code.split('\n');
  const statements: string[] = [];
  let current: string[] = [];
  let depth = 0;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    current.push(line);

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '(' || ch === '{' || ch === '[') depth++;
      else if (ch === ')' || ch === '}' || ch === ']') depth = Math.max(0, depth - 1);
    }

    const endsWithContinuation = /(?:\|\>|%\>%|\+|\,|\-\>|\<-)\s*$/.test(line);

    if (depth === 0 && !endsWithContinuation) {
      statements.push(current.join(' '));
      current = [];
    }
  }

  if (current.length > 0) {
    statements.push(current.join(' '));
  }

  return statements.length > 0 ? statements : [code.trim()];
}
