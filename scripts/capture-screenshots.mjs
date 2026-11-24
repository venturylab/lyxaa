/**
 * Regenerates docs/screenshots. Requires Playwright Chromium, which is not a
 * project dependency: npx --yes playwright install chromium, then
 * node scripts/capture-screenshots.mjs
 * The dev server must already be running.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const base = process.env.SCREENSHOT_BASE ?? "http://127.0.0.1:43123";
const outDir = path.resolve("docs/screenshots");

const pages = [
  ["/", "home-en"],
  ["/music", "music-en"],
  ["/live", "live-en"],
  ["/press", "press-en"],
  ["/fr/presse", "press-fr"],
  ["/legal", "legal-en"],
  ["/privacy", "privacy-en"],
];

const widths = [1440, 390];

async function shot(page, name) {
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  const overflow = await page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollWidth > root.clientWidth + 1;
  });
  console.log(`${name} overflow=${overflow}`);
}

const browser = await chromium.launch();
await mkdir(outDir, { recursive: true });

for (const width of widths) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
  });
  for (const [route, name] of pages) {
    await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    await page.locator("h1").first().waitFor();
    await shot(page, `${name}-${width}`);
  }
  await page.close();
}

async function openLive(width) {
  const page = await browser.newPage({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
  });
  await page.goto(`${base}/live`, { waitUntil: "networkidle" });
  await page.locator("#booking-name").waitFor();
  return page;
}

const errors = await openLive(1440);
await errors.locator("form button[type=submit]").click();
await errors.locator(".form-alert").waitFor();
await shot(errors, "live-en-1440-errors");
await errors.close();

for (const width of widths) {
  const page = await openLive(width);
  await page.locator("#booking-name").fill("Camille Martin");
  await page.locator("#booking-company").fill("Club Example");
  await page.locator("#booking-email").fill("camille@example.com");
  await page.locator("#booking-eventType").selectOption("club");
  await page.locator("#booking-date").fill("2026-12-12");
  await page.locator("#booking-city").fill("Lyon");
  await page.locator("#booking-message").fill("We would like a DJ set in December.");
  await page.locator(".check").click();
  await page.locator("form button[type=submit]").click();
  await page.getByRole("status").waitFor();
  await shot(page, `live-en-${width}-sent`);
  await page.close();
}

await browser.close();
