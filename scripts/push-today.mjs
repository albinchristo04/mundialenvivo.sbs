#!/usr/bin/env node
/**
 * Submit today's match pages to IndexNow for rapid indexing.
 * Run after deploying new content: npm run push:today
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const SITE = "https://mundialenvivo.sbs";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? "c8f3a9d2b7e1054698f23a71d4b6c0e5";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

function loadJSON(rel) {
  return JSON.parse(readFileSync(join(ROOT, rel), "utf8"));
}

function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

async function main() {
  const fixtures = loadJSON("fixtures.json");
  const today = todayUTC();

  const todayMatches = fixtures.filter((f) => {
    const matchDate = f.date?.slice(0, 10);
    return matchDate === today;
  });

  if (todayMatches.length === 0) {
    console.log(`[push-today] No matches scheduled for ${today}`);
    process.exit(0);
  }

  const urls = todayMatches.map((f) => `${SITE}/${f.slug}`);

  // Also include partidos-hoy
  urls.unshift(`${SITE}/partidos-hoy`);

  console.log(`[push-today] Submitting ${urls.length} URLs for ${today}:`);
  urls.forEach((u) => console.log(`  ${u}`));

  const body = JSON.stringify({
    host: "mundialenvivo.sbs",
    key: INDEXNOW_KEY,
    keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  });

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body,
  });

  if (response.ok || response.status === 202) {
    console.log(`[push-today] IndexNow submitted successfully (HTTP ${response.status})`);
  } else {
    const text = await response.text();
    console.error(`[push-today] IndexNow error HTTP ${response.status}: ${text}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("[push-today] Fatal:", err.message);
  process.exit(1);
});
