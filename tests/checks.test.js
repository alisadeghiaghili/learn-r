/**
 * Pure-logic tests for learn-r checks and scoring.
 * Run: node --test tests/
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  evaluateChecks,
  evalExpressions,
  formatScore,
  scoreClass,
} from "../js/checks.js";
import { LEVELS, getLevel, levelIndex } from "../js/levels.js";
import { normalizeEnvList } from "../js/env-shape.js";

test("evaluateChecks passes when all succeed", () => {
  const checks = [
    { type: "eval", expr: "TRUE", label: "a" },
    { type: "stdout", match: "hi", label: "b" },
  ];
  const out = evaluateChecks(checks, {
    evalResults: [true],
    stdout: "say hi now",
    hasPlot: false,
  });
  assert.equal(out.ok, true);
  assert.equal(out.results.length, 2);
});

test("evaluateChecks fails on missing stdout", () => {
  const checks = [{ type: "stdout", match: "missing", label: "x" }];
  const out = evaluateChecks(checks, { evalResults: [], stdout: "nope", hasPlot: false });
  assert.equal(out.ok, false);
  assert.equal(out.results[0].passed, false);
});

test("evaluateChecks plot flag", () => {
  const checks = [{ type: "plot", label: "p" }];
  assert.equal(
    evaluateChecks(checks, { evalResults: [], stdout: "", hasPlot: true }).ok,
    true
  );
  assert.equal(
    evaluateChecks(checks, { evalResults: [], stdout: "", hasPlot: false }).ok,
    false
  );
});

test("evalExpressions preserves order and filters non-eval", () => {
  const checks = [
    { type: "stdout", match: "z", label: "s" },
    { type: "eval", expr: "a", label: "1" },
    { type: "plot", label: "p" },
    { type: "eval", expr: "b", label: "2" },
  ];
  assert.deepEqual(evalExpressions(checks), ["a", "b"]);
});

test("formatScore mentions par and strokes", () => {
  assert.match(formatScore(2, 2), /2 strokes · par 2 · even/);
  assert.match(formatScore(1, 1), /1 stroke · par 1 · even/);
  assert.match(formatScore(1, 2), /under par/);
  assert.equal(scoreClass(1, 2), "under");
  assert.equal(scoreClass(2, 2), "par");
  assert.equal(scoreClass(3, 2), "over");
});

test("level catalog is well-formed", () => {
  assert.ok(LEVELS.length >= 12);
  for (const level of LEVELS) {
    assert.ok(level.id && level.title && level.brief && level.goal);
    assert.ok(level.par >= 1);
    assert.ok(level.checks.length > 0);
    assert.ok(typeof level.hint === "string" && level.hint.length > 0);
  }
  assert.equal(getLevel("hello")?.title, "Hello, R");
  assert.equal(levelIndex("capstone"), LEVELS.length - 1);
});

test("normalizeEnvList unwraps WebR-like shapes", () => {
  const rows = normalizeEnvList([
    {
      type: "list",
      names: { values: ["name", "class"], type: "string" },
      values: [
        { type: "string", values: ["x"] },
        { type: "string", values: ["numeric"] },
      ],
    },
  ]);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].name, "x");
  assert.equal(rows[0].class, "numeric");
});
