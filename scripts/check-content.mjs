#!/usr/bin/env node
/**
 * The case studies are the part of this site that actually gets you hired, and
 * the part most likely to go out weak. These are the failure modes that can be
 * caught mechanically; the judgment call still needs a human (or the
 * case-study-editor agent).
 *
 *   node scripts/check-content.mjs         warn about placeholders
 *   node scripts/check-content.mjs --ship  placeholders are errors
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const SHIP = process.argv.includes("--ship");
const DIR = path.join(process.cwd(), "content", "case-studies");

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

/* ---------- site.ts placeholders ---------- */
const siteSrc = fs.readFileSync(path.join(process.cwd(), "content", "site.ts"), "utf8");
const PLACEHOLDERS = [
  ["Your Name", "the name is still the placeholder"],
  ["you@example.com", "the email is still the placeholder"],
  ["https://example.com", "meta.url is still the placeholder — OG images and canonical links need the real domain"],
  ["linkedin.com/in/you", "the LinkedIn link is still the placeholder"],
  ["github.com/you", "the GitHub link is still the placeholder"],
];
for (const [needle, msg] of PLACEHOLDERS) {
  if (siteSrc.includes(needle)) (SHIP ? err : warn)("content/site.ts", msg);
}

/* ---------- case studies ---------- */
const REQUIRED = ["title", "outcome", "role", "team", "timeframe", "surface", "audience", "order"];
const AUDIENCES = ["hiring-manager", "founder", "technical"];

// The strategy's core warning, made mechanical: narrating process instead of
// demonstrating judgment is the single most common way a PM portfolio reads junior.
const PROCESS_NARRATION = [
  "discovery sprint", "design sprint", "user journey", "journey map",
  "ran a workshop", "held a workshop", "stakeholder alignment",
  "gathered requirements", "conducted user interviews", "affinity map",
  "double diamond", "we ideated", "brainstorming session",
];

const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx")) : [];
if (!files.length) err("content/case-studies", "no case studies found");

const published = [];

for (const file of files) {
  const where = `content/case-studies/${file}`;
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);

  for (const k of REQUIRED) {
    if (data[k] === undefined || data[k] === "") err(where, `frontmatter is missing "${k}"`);
  }
  if (data.audience && !AUDIENCES.includes(data.audience)) {
    err(where, `audience "${data.audience}" is not one of ${AUDIENCES.join(", ")}`);
  }
  if (!data.draft) published.push({ file, ...data });

  // A one-line outcome without a number is a claim, not evidence.
  if (typeof data.outcome === "string" && !/\d/.test(data.outcome)) {
    (SHIP ? err : warn)(where, "the outcome line has no number in it — that line is the whole homepage card");
  }
  if (typeof data.outcome === "string" && /^Replace with/i.test(data.outcome)) {
    (SHIP ? err : warn)(where, "the outcome line is still template text");
  }

  const headings = [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  if (headings.length < 4) {
    warn(where, `only ${headings.length} sections — the six-block skeleton keeps studies skimmable`);
  }
  const last = headings.at(-1) ?? "";
  if (!/differently|would change|in hindsight|do again/i.test(last)) {
    err(where, `the last section is "${last}" — every study closes with what you would do differently, the strongest seniority signal on the page`);
  }

  const words = content.replace(/[#|>_*`-]/g, " ").split(/\s+/).filter(Boolean).length;
  if (words < 350) (SHIP ? err : warn)(where, `${words} words — too thin to demonstrate judgment (aim 600–900)`);
  else if (words > 1400) warn(where, `${words} words — long enough that the decision block gets skipped (aim 600–900)`);

  const lower = content.toLowerCase();
  for (const phrase of PROCESS_NARRATION) {
    if (lower.includes(phrase)) {
      warn(where, `"${phrase}" narrates process — say what you concluded, not what activity you ran`);
    }
  }

  // A percentage with no denominator anywhere is the classic inflated-metric tell.
  if (/\d+\s?%/.test(content) && !/\bn\s*[≈=~]|\bof\s+[\d,]+|\bout of\b|\bbaseline\b/i.test(content)) {
    warn(where, "percentages appear without a denominator or baseline — an unanchored number invites the follow-up question you cannot answer");
  }

  if (content.includes("_Replace with") || /^_[A-Z].*_$/m.test(content.trim())) {
    (SHIP ? err : warn)(where, "still contains template prompt text");
  }
}

/* ---------- collection-level ---------- */
if (published.length > 3) {
  warn("content/case-studies", `${published.length} published studies — three is the cap; a fourth dilutes rather than adds`);
}
const orders = published.map((p) => p.order);
if (new Set(orders).size !== orders.length) {
  err("content/case-studies", `duplicate "order" values (${orders.join(", ")}) — homepage ordering is non-deterministic`);
}

/* ---------- report ---------- */
for (const w of warnings) console.warn(`  warn  ${w}`);
for (const e of errors) console.error(`  FAIL  ${e}`);

console.log(
  `\n${files.length} case stud${files.length === 1 ? "y" : "ies"} checked · ` +
    `${published.length} published · ${errors.length} error(s) · ${warnings.length} warning(s)` +
    (SHIP ? " · ship mode" : ""),
);
if (errors.length) process.exit(1);
