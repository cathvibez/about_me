# portfolio

Personal site. Content-led v1, wired so a design-forward v2 is a token swap
rather than a rewrite.

```
npm run dev     # http://localhost:3000
npm run build   # everything prerenders static
```

## The one rule

**Content never knows what it looks like.** No literal colors in components —
every one comes from the token block at the top of `app/globals.css`. The single
exception is `app/opengraph-image.tsx`, which renders through Satori and cannot
read CSS variables, so its hexes are duplicated there by necessity.

## Where things live

| Path                       | What it is                                            |
| -------------------------- | ----------------------------------------------------- |
| `content/site.ts`          | Every word on the homepage. Claim, proof points, links |
| `content/case-studies/*`   | MDX, frontmatter validated by `content/schema.ts`      |
| `app/globals.css`          | The whole visual identity — a v2 redesign starts here  |
| `components/primitives/`   | Rhythm and layout. Stable across a redesign            |
| `components/blocks/`       | Personality. Replaced wholesale in v2                  |
| `components/SignatureSlot` | Renders `null`. v2's interactive centrepiece goes here |

## Before you ship

- [ ] Replace the placeholders in `content/site.ts` — name, claim, proof, email, links
- [ ] Write the three case studies in `content/case-studies/` (each file has the
      six-block skeleton with a prompt for what belongs in each block)
- [ ] Set `meta.url` in `content/site.ts` to the real domain
- [ ] Drop the résumé at `public/resume.pdf` and mirror it in `app/resume/page.tsx`
- [ ] Replace `app/favicon.ico`
- [ ] Check the OG card at `/opengraph-image`

Set `draft: true` in a case study's frontmatter to hide it from the homepage
without deleting the file.

## Palette

Origami. A paper ground, creases instead of borders, and hierarchy built from
folded tonal steps rather than hue. Colour is nearly absent by design: the one
accent is a muted slate (`#4A5C6E`) that reads as ink held to the light, so
nothing competes with the writing. The primary button is ink on paper, no hue
at all.

Light-first — paper is the base state, dark is the deliberate swap. All three
viewer states (base, `prefers-color-scheme: dark`, and `[data-theme="dark"]`)
are defined at token level, and `check-contrast.mjs` fails if the two dark
blocks drift apart.

`--accent` is for rules, markers, and focus rings; `--accent-text` for anything
at text size. Both clear AA comfortably in both themes.

## Note on MDX

Case studies compile via `compileMDX()` called directly in
`app/work/[slug]/page.tsx`, not `<MDXRemote/>`. Passing `options` as a JSX prop
to `MDXRemote` silently drops the plugin list on next-mdx-remote v6, which kills
`remark-gfm` and renders tables as literal pipes.
