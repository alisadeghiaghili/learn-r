/**
 * Headless smoke test against a running learn-r server.
 * Usage: node scripts/smoke.mjs http://127.0.0.1:5177/
 */

import puppeteer from "puppeteer-core";

const base = process.argv[2] ?? "http://127.0.0.1:5177/";
const chromePath =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

const page = await browser.newPage();
const pageErrors = [];
page.on("pageerror", (err) => pageErrors.push(err.message));
page.on("console", (msg) => {
  if (msg.type() === "error") {
    const text = msg.text();
    if (!text.includes("favicon")) console.error("CONSOLE", text);
  }
});

async function boot(url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForFunction(
    () => {
      const boot = document.querySelector("#boot");
      return Boolean(boot?.hidden) && document.querySelector(".level-item");
    },
    { timeout: 90000, polling: 300 }
  );
}

async function openLevel(titlePrefix) {
  const clicked = await page.evaluate((prefix) => {
    const items = [...document.querySelectorAll(".level-item")];
    const target = items.find((el) => el.textContent.includes(prefix));
    if (!target) return false;
    target.click();
    return true;
  }, titlePrefix);
  if (!clicked) throw new Error(`level not found: ${titlePrefix}`);
  await page.waitForFunction(
    (prefix) => {
      const t = document.querySelector("#brief-body .brief-title")?.textContent ?? "";
      return t.includes(prefix) && document.querySelector("#mode-label")?.textContent?.startsWith("level");
    },
    { timeout: 30000 },
    titlePrefix
  );
}

async function runCode(code) {
  await page.click("#editor", { clickCount: 3 });
  await page.keyboard.press("Backspace");
  await page.type("#editor", code);
  await page.click("#btn-run");
  await page.waitForFunction(
    (previous) => {
      const label = document.querySelector("#strokes-label")?.textContent ?? "";
      return label !== previous && /stroke/.test(label);
    },
    { timeout: 45000 },
    await page.$eval("#strokes-label", (el) => el.textContent)
  );
}

async function waitForClear() {
  await page.waitForFunction(
    () => {
      const t = document.querySelector("#overlay-title");
      return t?.textContent === "Level clear" && !document.querySelector("#overlay").hidden;
    },
    { timeout: 45000 }
  );
  return page.$eval("#overlay-score", (el) => el.textContent);
}

async function closeOverlay() {
  const btn = await page.$("#overlay-actions button");
  if (btn) await btn.click();
}

await boot(base);

// Dismiss help
await closeOverlay();

// Level 1
await openLevel("Hello, R");
await runCode('print("Hello, R!")');
const score1 = await waitForClear();
if (!/1 stroke/.test(score1)) {
  console.error("FAIL level1 score", score1);
  await browser.close();
  process.exit(1);
}
console.log("OK hello", score1);
await closeOverlay();

// Level 2
await openLevel("Numbers");
await runCode("root <- sqrt(144)");
const score2 = await waitForClear();
console.log("OK numbers", score2);
await closeOverlay();

// Plot level
await openLevel("Plot");
await runCode("x <- 1:10\ny <- x^2\nplot(x, y)");
const score3 = await waitForClear();
console.log("OK plot", score3);
const hasPlotImg = await page.evaluate(() => {
  const img = document.querySelector("#plot-img");
  return Boolean(img && !img.hidden && img.src);
});
if (!hasPlotImg) {
  console.error("FAIL plot image missing");
  await browser.close();
  process.exit(1);
}
console.log("OK plot image");

const realErrors = pageErrors.filter((m) => !/ErrnoError:\s*20|ErrnoError:\s*44/.test(m));
if (realErrors.length) {
  console.error("PAGEERRORS", realErrors);
}

// FS noise should be gone after async fix; report if present
if (pageErrors.length) {
  console.error("FS_NOISE", pageErrors);
}

await browser.close();
console.log("SMOKE PASS");
