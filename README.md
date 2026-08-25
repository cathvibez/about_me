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

Pacific Northwest. Sound Water `#1E4D5B` ground, Pacific Mist `#D0D7DE` text,
Neon Sunset `#FF6B4A` accent, Evergreen Pine `#2C4C3E` and Urban Slate `#4A4E58`
for callouts and code. Dark-first; light is a deliberate role swap, and both
themes plus the unstamped system default are defined at token level.

Coral splits into two tokens on purpose: `--accent` (`#FF6B4A`) for rules and
borders, `--accent-text` (`#FFA48D`) for anything at text size, because the pure
coral only reaches 3.3:1 on the water ground.

## Note on MDX

Case studies compile via `compileMDX()` called directly in
`app/work/[slug]/page.tsx`, not `<MDXRemote/>`. Passing `options` as a JSX prop
to `MDXRemote` silently drops the plugin list on next-mdx-remote v6, which kills
`remark-gfm` and renders tables as literal pipes.
