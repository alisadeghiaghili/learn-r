/**
 * Hardened WebR runtime wrapper for learn-r.
 *
 * Provides real R execution in WebAssembly with:
 * - Pinned WebR release (v0.6.0)
 * - Safe stdout / stderr redirection using on.exit() guards
 * - Multi-expression REPL visible printing
 * - Graphics device management and PNG plot extraction
 * - Replay-based undo architecture
 */

import { WebR } from 'webr';
import type { RObjectInfo, StrokeResult } from './types';

const FS_DIR = '/home/web_user';
const PLOT_PATH = `${FS_DIR}/learnr-plot.png`;

const BOOT_R = `
local({
  options(device = function(...) {
    grDevices::png(
      filename = "${PLOT_PATH}",
      width = 640,
      height = 420,
      res = 96
    )
  })
  env_name <- "tools:learnr"
  if (env_name %in% search()) {
    try(detach(env_name, character.only = TRUE), silent = TRUE)
  }
  learnr_env <- attach(NULL, name = env_name)
  
  .learnr_eval <- function(code_str) {
    out_lines <- character()
    err_lines <- character()
    ok <- TRUE

    tc_out <- textConnection("out_lines", "w", local = TRUE)
    tc_err <- textConnection("err_lines", "w", local = TRUE)

    sink(tc_out)
    sink(tc_err, type = "message")

    tryCatch({
      exprs <- parse(text = code_str, keep.source = FALSE)
      if (length(exprs) > 0) {
        for (i in seq_along(exprs)) {
          val <- withVisible(eval(exprs[[i]], envir = .GlobalEnv))
          if (isTRUE(val$visible)) {
            print(val$value)
          }
        }
      }
    }, error = function(e) {
      ok <<- FALSE
      cat(conditionMessage(e), "\\n")
    }, finally = {
      while (sink.number("message") > 0) sink(type = "message")
      while (sink.number() > 0) sink()
      close(tc_out)
      close(tc_err)
    })

    while (!is.null(grDevices::dev.list())) grDevices::dev.off()

    c(
      if (isTRUE(ok)) "1" else "0",
      paste(out_lines, collapse = "\\n"),
      paste(err_lines, collapse = "\\n")
    )
  }
  assign(".learnr_eval", .learnr_eval, envir = learnr_env)
  TRUE
})
`;

const SNAPSHOT_R = `
local({
  nms <- sort(ls(envir = .GlobalEnv, all.names = FALSE))
  lapply(nms, function(nm) {
    x <- get(nm, envir = .GlobalEnv, inherits = FALSE)
    cls <- paste(class(x), collapse = "/")
    typ <- typeof(x)
    len <- length(x)
    prev <- tryCatch({
      s <- utils::capture.output(
        utils::str(x, give.attr = FALSE, max.level = 1, list.len = 6)
      )
      paste(utils::head(s, 3), collapse = " · ")
    }, error = function(e) cls)
    list(name = nm, class = cls, type = typ, length = as.numeric(len), preview = prev)
  })
})
`;

export class RRuntime {
  private webR: WebR | null = null;
  private strokes: string[] = [];
  private setupCode = '';
  private hasPlot = false;
  private lastStdout = '';
  private lastStderr = '';

  /**
   * Initialize WebR with a pinned stable release base URL.
   */
  async init(onProgress?: (ratio: number) => void): Promise<void> {
    onProgress?.(0.1);
    this.webR = new WebR({
      baseUrl: 'https://webr.r-wasm.org/v0.6.0/',
    });
    await this.webR.init();
    onProgress?.(0.7);
    await this.ensureDir(FS_DIR);
    await this.webR.evalRVoid(BOOT_R);
    onProgress?.(1.0);
  }

  /**
   * Reset environment to initial setup and replay given strokes.
   */
  async resetTo(setupCode: string, strokes: string[] = []): Promise<void> {
    if (!this.webR) throw new Error('WebR runtime is not initialized');
    this.setupCode = setupCode ?? '';
    this.strokes = [];
    this.hasPlot = false;
    this.lastStdout = '';
    this.lastStderr = '';

    await this.webR.evalRVoid(
      `rm(list = ls(envir = .GlobalEnv, all.names = TRUE), envir = .GlobalEnv)`
    );
    await this.webR.evalRVoid(BOOT_R);
    await this.deletePlotFile();

    if (this.setupCode.trim()) {
      await this.evalRaw(this.setupCode);
    }

    for (const stroke of strokes) {
      const res = await this.evalRaw(stroke);
      if (res.ok) {
        this.strokes.push(stroke);
      }
    }
    await this.refreshPlotFlag();
  }

  /**
   * Evaluate a student stroke. Records code if evaluation succeeded.
   */
  async pushStroke(code: string): Promise<StrokeResult> {
    const trimmed = code.replace(/\s+$/, '');
    if (!trimmed.trim()) {
      return { ok: true, stdout: '', stderr: '', hasPlot: this.hasPlot };
    }

    const prevPlotBytes = await this.readBytes(PLOT_PATH);
    const prevPlotLen = prevPlotBytes ? prevPlotBytes.length : 0;

    const result = await this.evalRaw(trimmed);
    await this.refreshPlotFlag();

    const currPlotBytes = await this.readBytes(PLOT_PATH);
    const currPlotLen = currPlotBytes ? currPlotBytes.length : 0;
    const strokeProducedPlot = currPlotLen > 100 && currPlotLen !== prevPlotLen;

    if (result.ok) {
      this.strokes.push(trimmed);
    }

    this.lastStdout = result.stdout;
    this.lastStderr = result.stderr;

    return {
      ok: result.ok,
      stdout: result.stdout,
      stderr: result.stderr,
      hasPlot: this.hasPlot || strokeProducedPlot,
    };
  }

  /**
   * Undo the last stroke using deterministic replay.
   */
  async undoStroke(): Promise<boolean> {
    if (this.strokes.length === 0) return false;
    const remaining = this.strokes.slice(0, -1);
    await this.resetTo(this.setupCode, remaining);
    return true;
  }

  /**
   * Evaluate declarative R boolean expressions.
   */
  async evalChecks(exprs: string[]): Promise<boolean[]> {
    if (!this.webR) return exprs.map(() => false);
    const results: boolean[] = [];
    for (const expr of exprs) {
      const wrapped = `isTRUE(tryCatch(${expr}, error = function(e) FALSE))`;
      try {
        const val = await this.webR.evalRBoolean(wrapped);
        results.push(Boolean(val));
      } catch {
        results.push(false);
      }
    }
    return results;
  }

  /**
   * Capture a snapshot of all user objects in .GlobalEnv.
   */
  async snapshotEnv(): Promise<RObjectInfo[]> {
    if (!this.webR) return [];
    try {
      const raw = await this.webR.evalR(SNAPSHOT_R);
      const js = await raw.toJs();
      return this.normalizeSnapshot(js);
    } catch (err) {
      console.warn('snapshotEnv failed', err);
      return [];
    }
  }

  /**
   * Create an object URL from the current PNG plot buffer.
   */
  async plotObjectUrl(): Promise<string | null> {
    const bytes = await this.readBytes(PLOT_PATH);
    if (!bytes || bytes.length < 100) return null;
    return URL.createObjectURL(new Blob([bytes as BlobPart], { type: 'image/png' }));
  }

  hasActivePlot(): boolean {
    return this.hasPlot;
  }

  strokeCount(): number {
    return this.strokes.length;
  }

  getLastStdout(): string {
    return this.lastStdout;
  }

  getLastStderr(): string {
    return this.lastStderr;
  }

  getStrokes(): string[] {
    return [...this.strokes];
  }

  // --- Internal File-System and Raw Evaluation Helpers ---

  private async evalRaw(code: string): Promise<{ ok: boolean; stdout: string; stderr: string }> {
    if (!this.webR) throw new Error('WebR runtime is not ready');
    try {
      const codeEscaped = JSON.stringify(code);
      const res = await this.webR.evalR(`.learnr_eval(${codeEscaped})`);
      const js = await res.toJs();
      const values: string[] = Array.isArray(js)
        ? (js as string[])
        : (js as { values?: string[] })?.values ?? [];
      const ok = values[0] === '1';
      const stdout = (values[1] ?? '').trimEnd();
      const stderr = (values[2] ?? '').trimEnd();
      return { ok, stdout, stderr };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { ok: false, stdout: '', stderr: msg };
    }
  }

  private async ensureDir(dir: string): Promise<void> {
    if (!this.webR || !dir || dir === '/') return;
    const parts = dir.split('/').filter(Boolean);
    let cur = '';
    for (const part of parts) {
      cur += `/${part}`;
      try {
        await Promise.resolve(this.webR.FS.mkdir(cur));
      } catch {
        /* already exists */
      }
    }
  }

  private async readBytes(path: string): Promise<Uint8Array | null> {
    if (!this.webR) return null;
    try {
      const data = await this.webR.FS.readFile(path);
      return data instanceof Uint8Array ? data : new Uint8Array(data);
    } catch {
      return null;
    }
  }

  private async refreshPlotFlag(): Promise<void> {
    const bytes = await this.readBytes(PLOT_PATH);
    this.hasPlot = Boolean(bytes && bytes.length > 100);
  }

  private async deletePlotFile(): Promise<void> {
    if (!this.webR) return;
    try {
      await Promise.resolve(this.webR.FS.unlink(PLOT_PATH));
    } catch {
      /* not present */
    }
    this.hasPlot = false;
  }

  private normalizeSnapshot(js: unknown): RObjectInfo[] {
    if (!js || typeof js !== 'object') return [];
    const items = Array.isArray(js)
      ? js
      : (js as { values?: unknown[] }).values && Array.isArray((js as { values: unknown[] }).values)
        ? (js as { values: unknown[] }).values
        : [js];

    const out: RObjectInfo[] = [];
    for (const item of items) {
      if (!item || typeof item !== 'object') continue;
      const rec = item as Record<string, unknown>;
      const name = this.extractString(rec.name);
      if (!name) continue;
      out.push({
        name,
        class: this.extractString(rec.class) || '',
        type: this.extractString(rec.type) || '',
        length: Number(this.extractNumber(rec.length) ?? 0),
        preview: this.extractString(rec.preview) || '',
      });
    }
    return out;
  }

  private extractString(v: unknown): string {
    if (typeof v === 'string') return v;
    if (v && typeof v === 'object' && 'values' in v && Array.isArray((v as { values: unknown[] }).values)) {
      return String((v as { values: unknown[] }).values[0] ?? '');
    }
    return v != null ? String(v) : '';
  }

  private extractNumber(v: unknown): number {
    if (typeof v === 'number') return v;
    if (v && typeof v === 'object' && 'values' in v && Array.isArray((v as { values: unknown[] }).values)) {
      return Number((v as { values: unknown[] }).values[0] ?? 0);
    }
    return Number(v ?? 0);
  }
}
