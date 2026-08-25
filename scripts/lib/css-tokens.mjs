import fs from "node:fs";
import path from "node:path";

const CSS = path.join(process.cwd(), "app", "globals.css");

/** Capture `--name: value;` pairs inside the block that starts at `anchor`. */
function blockAt(src, anchor) {
  const start = src.indexOf(anchor);
  if (start === -1) throw new Error(`Theme block not found in globals.css: ${anchor}`);
  let i = src.indexOf("{", start) + 1;
  let depth = 1;
  const from = i;
  while (i < src.length && depth > 0) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") depth--;
    i++;
  }
  const body = src.slice(from, i - 1);
  const tokens = {};
  for (const m of body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
    tokens[m[1]] = m[2].trim();
  }
  return tokens;
}

/**
 * The three states a viewer can be in. `dark` is the base `:root`; the two
 * light blocks must stay in sync with each other or the toggle disagrees
 * with the OS preference.
 */
export function readThemes() {
  const src = fs.readFileSync(CSS, "utf8");
  const dark = blockAt(src, ":root {");
  const lightMedia = blockAt(src, ':root:not([data-theme="dark"])');
  const lightStamp = blockAt(src, ':root[data-theme="light"]');
  return {
    dark,
    lightSystem: { ...dark, ...lightMedia },
    lightExplicit: { ...dark, ...lightStamp },
    raw: { dark, lightMedia, lightStamp },
  };
}

export const isHex = (v) => /^#[0-9a-fA-F]{3,8}$/.test(v);

const srgb = (c) => {
  const x = c / 255;
  return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
};

export function luminance(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
}

export function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}
