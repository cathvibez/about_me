#!/usr/bin/env node
/**
 * Every text/background pairing the site actually uses, in every theme state
 * a viewer can land in. Catches the classic bug where one theme is designed
 * and the other is assumed.
 */
import { readThemes, isHex, contrast } from "./lib/css-tokens.mjs";

const AA_TEXT = 4.5;   // body-size text
const AA_GRAPHIC = 3.0; // focus rings and meaningful UI boundaries
// WCAG 1.4.11 exempts purely decorative graphics. The hairline dividers carry
// no information the headings do not already carry, so they are held to
// "visible" rather than "3:1" — a 3:1 hairline on this ground would read as a
// heavy black rule and wreck the page. Anything that conveys state stays at 3:1.
const DECORATIVE = 1.25;

/** [foreground, background, minimum, what it is] */
const PAIRS = [
  ["ink", "ground", AA_TEXT, "headings on the page"],
  ["ink-2", "ground", AA_TEXT, "body copy on the page"],
  ["ink-3", "ground", AA_TEXT, "mono labels on the page"],
  ["ink", "panel", AA_TEXT, "headings in a card"],
  ["ink-2", "panel", AA_TEXT, "body copy in a card"],
  ["ink-3", "panel", AA_TEXT, "mono labels in a card"],
  ["ink", "panel-2", AA_TEXT, "text on the secondary surface"],
  ["accent-text", "ground", AA_TEXT, "links and stats on the page"],
  ["accent-text", "panel", AA_TEXT, "links and stats in a card"],
  ["btn-fg", "btn-bg", AA_TEXT, "the primary button label"],
  ["ink", "pine-bg", AA_TEXT, "text in a callout"],
  ["ink-2", "slate-bg", AA_TEXT, "code blocks"],
  ["accent", "ground", AA_GRAPHIC, "accent rules and borders"],
  ["rule", "ground", DECORATIVE, "hairline dividers (decorative)"],
  ["accent", "panel", AA_GRAPHIC, "card hover border"],
];

const THEMES = ["dark", "lightSystem", "lightExplicit"];
const LABEL = {
  dark: "dark",
  lightSystem: "light (system preference)",
  lightExplicit: "light (explicit toggle)",
};

const themes = readThemes();
let failures = 0;
let checked = 0;

for (const key of THEMES) {
  const t = themes[key];
  const rows = [];
  for (const [fg, bg, min, what] of PAIRS) {
    const a = t[fg];
    const b = t[bg];
    if (!a || !b) {
      console.error(`  MISSING  --${fg} or --${bg} is undefined in ${LABEL[key]}`);
      failures++;
      continue;
    }
    if (!isHex(a) || !isHex(b)) continue; // non-color token, skip
    const ratio = contrast(a, b);
    checked++;
    const ok = ratio >= min;
    if (!ok) failures++;
    rows.push([ok, `${ratio.toFixed(2)}:1`.padStart(8), `${fg} on ${bg}`.padEnd(26), `need ${min}`, what]);
  }
  console.log(`\n${LABEL[key]}`);
  for (const [ok, ratio, pair, need, what] of rows) {
    console.log(`  ${ok ? "ok  " : "FAIL"} ${ratio}  ${pair} ${ok ? "" : `(${need}) `}— ${what}`);
  }
}

// The two light blocks must define the same tokens with the same values.
const { lightMedia, lightStamp } = themes.raw;
const keys = new Set([...Object.keys(lightMedia), ...Object.keys(lightStamp)]);
const drift = [...keys].filter((k) => lightMedia[k] !== lightStamp[k]);
if (drift.length) {
  console.error(
    `\nFAIL  light theme drift — these differ between the media query and the ` +
      `[data-theme="light"] block, so the toggle and the OS preference disagree:\n  ` +
      drift.map((k) => `--${k}: ${lightMedia[k] ?? "(unset)"} vs ${lightStamp[k] ?? "(unset)"}`).join("\n  "),
  );
  failures += drift.length;
}

console.log(`\n${checked} pairings checked across 3 theme states.`);
if (failures) {
  console.error(`${failures} contrast failure(s).`);
  process.exit(1);
}
console.log("All pass WCAG AA.");
