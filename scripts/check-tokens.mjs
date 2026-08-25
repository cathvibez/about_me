#!/usr/bin/env node
/**
 * The one rule the v2 redesign depends on: content and components never name a
 * color. If a hex leaks into a component, swapping the identity stops being a
 * one-file edit and the whole scalability argument quietly dies.
 */
import fs from "node:fs";
import path from "node:path";

const ROOTS = ["app", "components", "lib", "content"];
const ALLOW = new Set([
  // Satori renders the OG card outside the DOM and cannot read CSS variables,
  // so this file duplicates the palette by necessity. Keep it in sync by hand.
  "app/opengraph-image.tsx",
]);

const COLOR = /#[0-9a-fA-F]{3,8}\b|\brgba?\([^)]*\)|\bhsla?\([^)]*\)/g;

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (/\.(tsx?|mdx|css)$/.test(e.name)) out.push(p);
  }
  return out;
}

const violations = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const rel = file.split(path.sep).join("/");
    if (rel === "app/globals.css" || ALLOW.has(rel)) continue;
    const lines = fs.readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      for (const m of line.matchAll(COLOR)) {
        violations.push({ rel, line: i + 1, value: m[0], text: line.trim() });
      }
    });
  }
}

if (violations.length) {
  console.error("Literal colors outside the token layer:\n");
  for (const v of violations) {
    console.error(`  ${v.rel}:${v.line}  ${v.value}`);
    console.error(`    ${v.text.slice(0, 100)}`);
  }
  console.error(
    `\n${violations.length} violation(s). Define the color in app/globals.css and ` +
      `reference it as a token instead.`,
  );
  process.exit(1);
}
console.log(`Token discipline: clean (${ROOTS.join(", ")} carry no literal colors).`);
