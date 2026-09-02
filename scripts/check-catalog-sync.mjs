#!/usr/bin/env node
// check-catalog-sync.mjs
// Ensures the KNOWN list in dsh-bootcheck stays in sync with the DICT keys
// in dsh-skill-cheatsheet. If a skill is added to the cheatsheet dictionary
// but not mirrored into bootcheck's KNOWN array, bootcheck would falsely
// report it as "not catalogued". Run with: node scripts/check-catalog-sync.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cheat = readFileSync(join(root, "packages/dsh-skill-cheatsheet/lib/client.js"), "utf8");
const boot = readFileSync(join(root, "packages/dsh-bootcheck/lib/client.js"), "utf8");

const dictKeys = [...cheat.matchAll(/"([a-z0-9-]+)":\s*\{/g)].map((m) => m[1]);
const knownMatch = boot.match(/var KNOWN = \[([^\]]*)\]/);
if (!knownMatch) {
  console.error("bootcheck: could not locate KNOWN array");
  process.exit(1);
}
const known = [...knownMatch[1].matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);

const missing = dictKeys.filter((k) => !known.includes(k));
const extra = known.filter((k) => !dictKeys.includes(k));

let ok = true;
if (missing.length) {
  ok = false;
  console.error(`bootcheck KNOWN is missing: ${missing.join(", ")}`);
}
if (extra.length) {
  ok = false;
  console.error(`bootcheck KNOWN has extra entries not in DICT: ${extra.join(", ")}`);
}
if (ok) {
  console.log(`OK: ${dictKeys.length} dictionary keys all mirrored in bootcheck KNOWN.`);
}
process.exit(ok ? 0 : 1);
