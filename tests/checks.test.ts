import { describe, it, expect } from 'vitest';
import { evaluateChecks, evalExpressions, formatScore, scoreClass } from '../src/engine/checks';
import type { CheckDef } from '../src/engine/types';

describe('evaluateChecks', () => {
  it('passes when all check conditions succeed', () => {
    const checks: CheckDef[] = [
      { type: 'eval', expr: 'TRUE', label: 'eval check' },
      { type: 'stdout', match: 'Hello', label: 'stdout check' },
      { type: 'plot', label: 'plot check' },
      { type: 'pattern', pattern: /\|\>/, label: 'pipe check' },
    ];

    const verdict = evaluateChecks(checks, {
      evalResults: [true],
      stdout: 'Hello, World!',
      hasPlot: true,
      studentCode: '1:10 |> mean()',
    });

    expect(verdict.ok).toBe(true);
    expect(verdict.results).toEqual([
      { label: 'eval check', passed: true },
      { label: 'stdout check', passed: true },
      { label: 'plot check', passed: true },
      { label: 'pipe check', passed: true },
    ]);
  });

  it('fails when stdout match is missing', () => {
    const checks: CheckDef[] = [
      { type: 'stdout', match: 'Expected String', label: 'stdout check' },
    ];

    const verdict = evaluateChecks(checks, {
      evalResults: [],
      stdout: 'Different string',
      hasPlot: false,
      studentCode: '',
    });

    expect(verdict.ok).toBe(false);
    expect(verdict.results[0]!.passed).toBe(false);
  });

  it('fails when pattern is not satisfied in code', () => {
    const checks: CheckDef[] = [
      { type: 'pattern', pattern: /\bsapply\b/, label: 'sapply used' },
    ];

    const verdict = evaluateChecks(checks, {
      evalResults: [],
      stdout: '',
      hasPlot: false,
      studentCode: 'sq <- (1:5)^2',
    });

    expect(verdict.ok).toBe(false);
    expect(verdict.results[0]!.passed).toBe(false);
  });

  it('requires plot flag for plot checks', () => {
    const checks: CheckDef[] = [{ type: 'plot', label: 'drawn plot' }];

    const fail = evaluateChecks(checks, {
      evalResults: [],
      stdout: '',
      hasPlot: false,
      studentCode: '',
    });
    expect(fail.ok).toBe(false);

    const pass = evaluateChecks(checks, {
      evalResults: [],
      stdout: '',
      hasPlot: true,
      studentCode: '',
    });
    expect(pass.ok).toBe(true);
  });
});

describe('evalExpressions', () => {
  it('extracts non-empty eval expressions in exact order', () => {
    const checks: CheckDef[] = [
      { type: 'eval', expr: 'x == 1', label: '1' },
      { type: 'stdout', match: 'out', label: '2' },
      { type: 'eval', expr: 'y == 2', label: '3' },
      { type: 'plot', label: '4' },
    ];

    expect(evalExpressions(checks)).toEqual(['x == 1', 'y == 2']);
  });
});

describe('formatScore and scoreClass', () => {
  it('formats stroke count and par correctly', () => {
    expect(formatScore(1, 1)).toBe('1 stroke · par 1 · even');
    expect(formatScore(1, 2)).toBe('1 stroke · par 2 · under par');
    expect(formatScore(3, 2)).toBe('3 strokes · par 2 · over par');
    expect(formatScore(2, null)).toBe('2 strokes');
  });

  it('classifies score appropriately', () => {
    expect(scoreClass(1, 2)).toBe('under');
    expect(scoreClass(2, 2)).toBe('par');
    expect(scoreClass(3, 2)).toBe('over');
    expect(scoreClass(1, null)).toBe('none');
  });
});
