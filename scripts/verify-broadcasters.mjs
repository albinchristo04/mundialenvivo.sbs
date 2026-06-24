#!/usr/bin/env node
/**
 * Verifies that all broadcaster URLs in broadcasters.json are reachable.
 * Run before deployment: node scripts/verify-broadcasters.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import https from "node:https";
import http from "node:http";

const DIR = dirname(fileURLToPath(import.meta.url));
const FILE = resolve(DIR, "..", "broadcasters.json");
const data = JSON.parse(readFileSync(FILE, "utf-8"));

function checkUrl(url) {
  return new Promise((resolve) => {
    const mod = url.startsWith("https") ? https : http;
    const req = mod.get(url, { timeout: 8000, headers: { "User-Agent": "Mozilla/5.0 MundialEnVivo/1.0" } }, (res) => {
      resolve({ url, status: res.statusCode, ok: res.statusCode < 400 });
      res.resume();
    });
    req.on("error", (e) => resolve({ url, status: 0, ok: false, error: e.message }));
    req.on("timeout", () => { req.destroy(); resolve({ url, status: 0, ok: false, error: "timeout" }); });
  });
}

const urls = [];
for (const country of Object.values(data.countries)) {
  for (const b of country.broadcasters) {
    if (!urls.includes(b.url)) urls.push(b.url);
  }
}

console.log(`Checking ${urls.length} broadcaster URLs...`);
const results = await Promise.all(urls.map(checkUrl));

let passed = 0, failed = 0;
for (const r of results) {
  if (r.ok) {
    console.log(`✓ ${r.url} (${r.status})`);
    passed++;
  } else {
    console.error(`✗ ${r.url} — ${r.error ?? `HTTP ${r.status}`}`);
    failed++;
  }
}

console.log(`\nResults: ${passed} passed, ${failed} failed`);

// Update _lastVerified date
data._lastVerified = new Date().toISOString().split("T")[0];
writeFileSync(FILE, JSON.stringify(data, null, 2));
console.log("Updated _lastVerified in broadcasters.json");

if (failed > 0) process.exit(1);
