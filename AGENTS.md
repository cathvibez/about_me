<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

Personal portfolio site. Its single job is to get its owner hired, and every
decision below serves that. Read `README.md` for the layout.

## The one rule

**Content and components never name a color.** Every hex lives in the token block
at the top of `app/globals.css`; components reference tokens (`bg-panel`,
`text-ink-2`). This is what makes a v2 redesign a one-file edit instead of a
rewrite. `npm run check:tokens` enforces it.

The sole exception is `app/opengraph-image.tsx` — Satori renders outside the DOM
and cannot read CSS variables, so it duplicates the palette by hand.

## Before you claim anything works

```
npm run check    # tokens · contrast · content · eslint · tsc
npm run build    # everything must prerender static
```

`npm run check:ship` additionally fails on unreplaced placeholder content. Run it
before a production deploy.

## Structure

- `content/` never imports from `components/`. Content does not know how it looks.
- `components/primitives/` is rhythm and layout — stable across a redesign.
- `components/blocks/` is personality — replaced wholesale in v2.
- `components/SignatureSlot.tsx` renders `null` and is where v2's interactive
  centrepiece lands. Leave it in place.
- Case studies are MDX with zod-validated frontmatter (`content/schema.ts`). A
  malformed file fails the build rather than shipping a broken page.

## Things that will bite you

- **MDX plugins:** case studies compile via `compileMDX()` called directly in
  `app/work/[slug]/page.tsx`. Passing `options` as a JSX prop to `<MDXRemote/>`
  silently drops the plugin list on next-mdx-remote v6, which kills `remark-gfm`
  and renders tables as literal pipe characters. Do not "simplify" this back.
- **Three theme states, not two:** `:root` (dark), the `prefers-color-scheme`
  media block, and `[data-theme="light"]`. The two light blocks must stay
  identical; `check-contrast.mjs` fails on drift.
- **The accent splits in two:** `--accent` (`#FF6B4A`) for rules and borders,
  `--accent-text` (`#FFA48D`) for anything at text size. Pure coral is 3.3:1 on
  the Sound Water ground — using it for body text is a contrast bug.

## Content standards

Case studies follow a six-block skeleton and close with "what I would do
differently" — `check-content.mjs` enforces the closing block and warns on
process narration, missing denominators, and thin drafts. Three published studies
is the cap.

**Never invent an achievement, metric, or detail on the user's behalf.** Every
number on this site has to survive a follow-up question in an interview.

## Agents

- `case-study-editor` — reviews a draft against the hiring rubric
- `design-guard` — token discipline, contrast, and theme-state audit
