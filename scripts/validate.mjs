#!/usr/bin/env node
/**
 * Pre-build validation: checks data integrity and absence of forbidden content.
 * Run with: node scripts/validate.mjs
 * Exits 0 on success, 1 on failure.
 */
import { readFileSync, readdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

let errors = 0;
let warnings = 0;

function fail(msg) {
  console.error(`  ✗ ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  ⚠ ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}

function loadJSON(rel) {
  const path = join(ROOT, rel);
  if (!existsSync(path)) { fail(`Missing file: ${rel}`); return null; }
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    fail(`Invalid JSON in ${rel}: ${e.message}`);
    return null;
  }
}

function grepSrc(pattern, label) {
  const re = new RegExp(pattern, "i");
  const srcDir = join(ROOT, "src");
  let found = [];

  function walk(dir) {
    readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) { walk(full); return; }
      if (!/\.(ts|astro|js|mjs|json)$/.test(entry.name)) return;
      const content = readFileSync(full, "utf8");
      if (re.test(content)) found.push(full.replace(ROOT, "").replace(/\\/g, "/"));
    });
  }
  walk(srcDir);
  return found;
}

// ─── Checks ───────────────────────────────────────────────────────────────────

console.log("\n[validate] 1. Checking required files…");

const required = [
  "package.json",
  "astro.config.mjs",
  "tsconfig.json",
  "fixtures.json",
  "broadcasters.json",
  "public/robots.txt",
  "public/c8f3a9d2b7e1054698f23a71d4b6c0e5.txt",
  "src/config/site.ts",
  "src/utils/fixtures.ts",
  "src/layouts/BaseLayout.astro",
  "src/components/BroadcasterList.astro",
  "src/components/SchemaOrg.astro",
  "src/pages/index.astro",
  "src/pages/calendario.astro",
  "src/pages/tabla-posiciones.astro",
  "src/pages/cuadro-mundial-2026.astro",
  "src/pages/partidos-hoy.astro",
  "src/pages/faq.astro",
  "src/pages/buscar.astro",
  "src/pages/[match].astro",
  "src/pages/sitemap.xml.ts",
  "src/pages/noticias/index.astro",
  "src/pages/noticias/[slug].astro",
  "src/pages/noticias/rss.xml.ts",
  "src/pages/equipos/[slug].astro",
  "src/pages/estadios/[slug].astro",
  "src/pages/ciudades/[slug].astro",
  "src/pages/historial/[slug].astro",
  "src/pages/como-ver/[pais].astro",
  "src/pages/a-que-hora-juega/[team].astro",
];

required.forEach((rel) => {
  if (existsSync(join(ROOT, rel))) {
    ok(rel);
  } else {
    fail(`Missing: ${rel}`);
  }
});

// ─── Country pages ─────────────────────────────────────────────────────────
console.log("\n[validate] 2. Checking country pages…");
const countries = ["argentina","colombia","uruguay","ecuador","chile","peru","venezuela","mexico",
                   "guatemala","el-salvador","costa-rica","panama","bolivia","honduras","nicaragua","republica-dominicana"];
countries.forEach((c) => {
  const f = `src/pages/${c}.astro`;
  existsSync(join(ROOT, f)) ? ok(f) : fail(`Missing: ${f}`);
});

// ─── Group pages ────────────────────────────────────────────────────────────
console.log("\n[validate] 3. Checking group/dynamic routes…");
const dynamicRoute = join(ROOT, "src/pages/grupo-[letra].astro");
if (existsSync(dynamicRoute)) { ok("src/pages/grupo-[letra].astro (dynamic)"); }
else { fail("Missing: src/pages/grupo-[letra].astro"); }

// ─── fixtures.json integrity ────────────────────────────────────────────────
console.log("\n[validate] 4. Checking fixtures.json integrity…");
const fixtures = loadJSON("fixtures.json");
if (fixtures) {
  if (Array.isArray(fixtures) && fixtures.length >= 48) {
    ok(`fixtures.json: ${fixtures.length} matches`);
  } else {
    warn(`fixtures.json has only ${Array.isArray(fixtures) ? fixtures.length : "?"} entries (expected ≥48)`);
  }

  const missing = fixtures.filter((f) => !f.slug || !f.teamA || !f.teamB || !f.date);
  if (missing.length > 0) {
    fail(`${missing.length} fixtures missing required fields (slug, teamA, teamB, date)`);
  } else {
    ok("All fixtures have required fields");
  }
}

// ─── broadcasters.json integrity ────────────────────────────────────────────
console.log("\n[validate] 5. Checking broadcasters.json integrity…");
const bcast = loadJSON("broadcasters.json");
if (bcast) {
  const countries = bcast.countries ?? {};
  const codes = Object.keys(countries);
  ok(`broadcasters.json: ${codes.length} country codes`);

  const noType = codes.filter((c) => {
    const entry = countries[c];
    return entry?.broadcasters?.some((b) => b.type !== "official");
  });
  if (noType.length > 0) warn(`Non-official broadcaster type found for: ${noType.join(", ")}`);

  const noHttps = codes.filter((c) => {
    const entry = countries[c];
    return entry?.broadcasters?.some((b) => !b.url?.startsWith("https://"));
  });
  if (noHttps.length > 0) fail(`Non-HTTPS broadcaster URL in: ${noHttps.join(", ")}`);
  else ok("All broadcaster URLs use HTTPS");
}

// ─── PPVTV check ─────────────────────────────────────────────────────────────
console.log("\n[validate] 6. Checking for forbidden PPVTV references…");
const ppvtvFiles = grepSrc("ppvtv", "PPVTV");
if (ppvtvFiles.length > 0) {
  ppvtvFiles.forEach((f) => fail(`PPVTV reference found in ${f}`));
} else {
  ok("No PPVTV references found in src/");
}

// ─── IndexNow key ─────────────────────────────────────────────────────────────
console.log("\n[validate] 7. Checking IndexNow configuration…");
const keyFile = join(ROOT, "public/c8f3a9d2b7e1054698f23a71d4b6c0e5.txt");
if (existsSync(keyFile)) {
  const content = readFileSync(keyFile, "utf8").trim();
  if (content === "c8f3a9d2b7e1054698f23a71d4b6c0e5") {
    ok("IndexNow key file content correct");
  } else {
    fail(`IndexNow key file content wrong: "${content}"`);
  }
} else {
  fail("IndexNow key file missing");
}

// ─── robots.txt ──────────────────────────────────────────────────────────────
console.log("\n[validate] 8. Checking robots.txt…");
const robotsTxt = readFileSync(join(ROOT, "public/robots.txt"), "utf8");
if (robotsTxt.includes("mundialenvivo.sbs/sitemap.xml")) {
  ok("robots.txt references correct sitemap URL");
} else {
  fail("robots.txt sitemap URL incorrect or missing");
}

// ─── Summary ─────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(50)}`);
if (errors === 0) {
  console.log(`✅ Validation passed (${warnings} warning${warnings !== 1 ? "s" : ""})`);
  process.exit(0);
} else {
  console.error(`❌ Validation failed: ${errors} error${errors !== 1 ? "s" : ""}, ${warnings} warning${warnings !== 1 ? "s" : ""}`);
  process.exit(1);
}
