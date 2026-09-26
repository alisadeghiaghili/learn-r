/**
 * WebR runtime wrapper: eval, stdout capture, env snapshot, plots, undo replay.
 *
 * Student code enters R as a file on the virtual FS, then `parse()`.
 * Never interpolate student text into R source.
 */

import { WebR } from "https://webr.r-wasm.org/latest/webr.mjs";
import { normalizeEnvList } from "./env-shape.js";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const FS_DIR = "/home/web_user";
const OUT_PATH = `${FS_DIR}/learnr-out.txt`;
const ERR_PATH = `${FS_DIR}/learnr-err.txt`;
const CODE_PATH = `${FS_DIR}/learnr-code.R`;
const PLOT_PATH = `${FS_DIR}/learnr-plot.png`;

const BOOT_R = `
local({
  .parse_eval_top <- function(path) {
    exprs <- parse(path, keep.source = FALSE)
    if (length(exprs) == 0) return(invisible(NULL))
    last <- NULL
    for (i in seq_along(exprs)) {
      last <- withVisible(eval(exprs[[i]], envir = .GlobalEnv))
    }
    last
  }
  assign(".parse_eval_top", .parse_eval_top, envir = .GlobalEnv)
  while (!is.null(grDevices::dev.list())) grDevices::dev.off()
  options(device = function(...) {
    grDevices::png(
      filename = "${PLOT_PATH}",
      width = 640,
      height = 420,
      res = 96
    )
  })
  TRUE
})
`;

const RUN_STROKE_R = `
local({
  outPath <- "${OUT_PATH}"
  errPath <- "${ERR_PATH}"
  codePath <- "${CODE_PATH}"
  while (!is.null(grDevices::dev.list())) grDevices::dev.off()
  outCon <- file(outPath, open = "wt")
  errCon <- file(errPath, open = "wt")
  sink(outCon)
  sink(errCon, type = "message")
  ok <- FALSE
  tryCatch({
    res <- .parse_eval_top(codePath)
    if (isTRUE(res$visible)) print(res$value)
    ok <- TRUE
  }, error = function(e) {
    cat(conditionMessage(e), "\\n", file = errCon)
  })
  sink(type = "message")
  sink()
  close(outCon)
  close(errCon)
  while (!is.null(grDevices::dev.list())) grDevices::dev.off()
  if (isTRUE(ok)) 1L else 0L
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

export class RRtime {
  constructor() {
    /** @type {WebR|null} */
    this.webR = null;
    /** @type {string[]} */
    this.strokes = [];
    this.setupCode = "";
    this.hasPlot = false;
    this.lastStdout = "";
    this.lastStderr = "";
  }

  /**
   * Boot WebR.
   * @param {(p: number) => void} [onProgress]
   * @returns {Promise<void>}
   */
  async init(onProgress) {
    this.webR = new WebR();
    await this.webR.init();
    onProgress?.(0.7);
    this._ensureDir(FS_DIR);
    await this.webR.evalRVoid(BOOT_R);
    onProgress?.(1);
  }

  /**
   * Reset to setup and replay optional strokes.
   * @param {string} setupCode
   * @param {string[]} [strokes]
   * @returns {Promise<void>}
   */
  async resetTo(setupCode, strokes = []) {
    this.setupCode = setupCode ?? "";
    this.strokes = [];
    this.hasPlot = false;
    this.lastStdout = "";
    this.lastStderr = "";
    await this.webR.evalRVoid(
      `rm(list = ls(envir = .GlobalEnv, all.names = TRUE), envir = .GlobalEnv)`
    );
    await this.webR.evalRVoid(BOOT_R);
    await this._deletePlot();
    if (this.setupCode.trim()) {
      await this._evalRaw(this.setupCode);
    }
    for (const stroke of strokes) {
      const res = await this._evalRaw(stroke);
      if (res.ok) this.strokes.push(stroke);
    }
    await this._refreshPlotFlag();
  }

  /**
   * Evaluate one student stroke and record it if successful.
   * @param {string} code
   * @returns {Promise<{ ok: boolean, stdout: string, stderr: string }>}
   */
  async pushStroke(code) {
    const trimmed = code.replace(/\s+$/, "");
    if (!trimmed.trim()) {
      return { ok: true, stdout: "", stderr: "" };
    }
    const result = await this._evalRaw(trimmed);
    if (result.ok) {
      this.strokes.push(trimmed);
    }
    await this._refreshPlotFlag();
    this.lastStdout = result.stdout;
    this.lastStderr = result.stderr;
    return result;
  }

  /**
   * @returns {Promise<boolean>} true when a stroke was removed
   */
  async undoStroke() {
    if (this.strokes.length === 0) return false;
    const remaining = this.strokes.slice(0, -1);
    await this.resetTo(this.setupCode, remaining);
    return true;
  }

  /**
   * @param {string[]} exprs
   * @returns {Promise<boolean[]>}
   */
  async evalChecks(exprs) {
    const results = [];
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
   * @returns {Promise<{ name: string, class: string, type: string, length: number, preview: string }[]>}
   */
  async snapshotEnv() {
    try {
      const raw = await this.webR.evalR(SNAPSHOT_R);
      const js = await raw.toJs();
      return normalizeEnvList(js);
    } catch (err) {
      console.warn("snapshotEnv failed", err);
      return [];
    }
  }

  /**
   * @returns {Promise<string|null>} object URL for current plot PNG
   */
  async plotObjectUrl() {
    const bytes = await this._readBytes(PLOT_PATH);
    if (!bytes || bytes.length < 100) return null;
    return URL.createObjectURL(new Blob([bytes], { type: "image/png" }));
  }

  hasActivePlot() {
    return this.hasPlot;
  }

  strokeCount() {
    return this.strokes.length;
  }

  /**
   * @param {string} code
   * @returns {Promise<{ ok: boolean, stdout: string, stderr: string }>}
   */
  async _evalRaw(code) {
    try {
      await this._writeText(CODE_PATH, code + "\n");
    } catch (err) {
      return { ok: false, stdout: "", stderr: String(err) };
    }

    let codeOk = 0;
    try {
      codeOk = await this.webR.evalRNumber(RUN_STROKE_R);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const stdout = await this._readText(OUT_PATH);
      const stderr = (await this._readText(ERR_PATH)) || msg;
      return { ok: false, stdout, stderr };
    }

    const stdout = (await this._readText(OUT_PATH)).replace(/\r/g, "");
    const stderr = (await this._readText(ERR_PATH)).replace(/\r/g, "");
    return { ok: codeOk === 1, stdout, stderr };
  }

  /**
   * @param {string} path
   * @param {string} text
   */
  async _writeText(path, text) {
    await this._ensureDir(path.slice(0, path.lastIndexOf("/")) || "/");
    await Promise.resolve(this.webR.FS.writeFile(path, encoder.encode(text)));
  }

  /**
   * @param {string} dir
   */
  async _ensureDir(dir) {
    if (!dir || dir === "/") return;
    const parts = dir.split("/").filter(Boolean);
    let cur = "";
    for (const part of parts) {
      cur += `/${part}`;
      try {
        await Promise.resolve(this.webR.FS.mkdir(cur));
      } catch {
        /* exists */
      }
    }
  }

  /**
   * @param {string} path
   * @returns {Promise<Uint8Array|null>}
   */
  async _readBytes(path) {
    try {
      const data = await this.webR.FS.readFile(path);
      return data instanceof Uint8Array ? data : new Uint8Array(data);
    } catch {
      return null;
    }
  }

  /**
   * @param {string} path
   * @returns {Promise<string>}
   */
  async _readText(path) {
    const bytes = await this._readBytes(path);
    if (!bytes) return "";
    return decoder.decode(bytes);
  }

  async _refreshPlotFlag() {
    const bytes = await this._readBytes(PLOT_PATH);
    this.hasPlot = Boolean(bytes && bytes.length > 100);
  }

  async _deletePlot() {
    try {
      await Promise.resolve(this.webR.FS.unlink(PLOT_PATH));
    } catch {
      /* not present */
    }
    this.hasPlot = false;
  }
}
