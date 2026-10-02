import { describe, it, expect } from 'vitest';
import { evaluateChecks, evalExpressions, formatScore, scoreClass, splitRStatements } from '../src/engine/checks';
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

describe('splitRStatements', () => {
  it('handles empty or whitespace strings', () => {
    expect(splitRStatements('')).toEqual([]);
    expect(splitRStatements('   \n\n  ')).toEqual([]);
  });

  it('splits independent single-line statements', () => {
    const code = 'q <- 17 %/% 5\nr <- 17 %% 5\np <- 2^4';
    expect(splitRStatements(code)).toEqual([
      'q <- 17 %/% 5',
      'r <- 17 %% 5',
      'p <- 2^4',
    ]);
  });

  it('preserves multi-line statements with pipes |>', () => {
    const code = `clean_tx <- raw_tx |>
  filter(status == "COMPLETED") |>
  mutate(clean_price = as.numeric(gsub("[^0-9.]", "", price)))`;
    const res = splitRStatements(code);
    expect(res).toHaveLength(1);
    expect(res[0]).toBe(
      'clean_tx <- raw_tx |> filter(status == "COMPLETED") |> mutate(clean_price = as.numeric(gsub("[^0-9.]", "", price)))'
    );
  });

  it('preserves multi-line statements with ggplot2 + operators', () => {
    const code = `p <- ggplot(mtcars, aes(wt, mpg)) +
  geom_point() +
  theme_minimal()
print(p)`;
    const res = splitRStatements(code);
    expect(res).toHaveLength(2);
    expect(res[0]).toBe(
      'p <- ggplot(mtcars, aes(wt, mpg)) + geom_point() + theme_minimal()'
    );
    expect(res[1]).toBe('print(p)');
  });

  it('preserves multi-line functions with curly braces', () => {
    const code = `safe_parse <- function(x) {
  as.numeric(x)
}
clean_nums <- safe_parse(c("42", "invalid", "100"))`;
    const res = splitRStatements(code);
    expect(res).toHaveLength(2);
    expect(res[0]).toBe('safe_parse <- function(x) { as.numeric(x) }');
    expect(res[1]).toBe('clean_nums <- safe_parse(c("42", "invalid", "100"))');
  });
});
