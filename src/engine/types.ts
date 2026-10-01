/**
 * Core type definitions for the learn-r execution engine, levels, and state.
 */

export type CheckType = 'eval' | 'stdout' | 'plot' | 'pattern';

export interface CheckDef {
  type: CheckType;
  /** R expression that must evaluate to TRUE in the session */
  expr?: string;
  /** Substring or regex that must match in stdout */
  match?: string;
  /** Regex pattern that student code must satisfy (e.g. enforcing |> or sapply) */
  pattern?: RegExp | string;
  /** Human-readable explanation of what this check verifies */
  label: string;
}

export interface CheckResult {
  label: string;
  passed: boolean;
}

export interface LevelDef {
  id: string;
  seriesId: string;
  title: string;
  brief: string;
  /** Expected solution or target code shown to the student */
  goal: string;
  /** Initial R code evaluated before student strokes begin */
  setup: string;
  /** Minimum number of run submissions (strokes) to beat the level */
  par: number;
  /** Difficulty rating from 1 to 5 */
  difficulty: number;
  checks: CheckDef[];
  hint: string;
  /** Full educational lesson text shown in intro modal */
  lesson?: string;
}

export interface SeriesDef {
  id: string;
  title: string;
  description: string;
}

export interface RObjectInfo {
  name: string;
  class: string;
  type: string;
  length: number;
  preview: string;
}

export interface StrokeResult {
  ok: boolean;
  stdout: string;
  stderr: string;
  hasPlot: boolean;
}

export interface LevelProgress {
  solved: boolean;
  bestStrokes?: number;
}
