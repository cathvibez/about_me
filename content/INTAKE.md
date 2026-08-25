# Intake — everything the site needs from you

Fill in the blanks below and hand it back. I'll wire it into `content/site.ts`
and the three MDX files; you never have to touch the code.

Work top to bottom. **Part 1 through 3 take about 20 minutes** and unblock the
whole homepage. **Part 4 is the real work** — it's also the part that actually
gets you hired, so give it the good hours, not the tired ones.

Anything you leave blank stays a placeholder, and `npm run check:ship` will keep
failing until it's filled. That's the gate working, not a bug.

---

## Part 1 · Identity

**1.1 Full name, as you want it read**
```
```

**1.2 The spine claim** — one sentence, under 20 words, sits directly under your
name. It's the first thing every reader sees and does more work than the rest of
the site combined. Current draft, edit or replace:

> A product manager who writes the spec, builds the prototype, and holds their
> own in the architecture review.

```
```

*Fails if:* it's a job title ("Senior PM with 8 years experience"), a list of
skills, or true of a hundred other people.

**1.3 Contact email** — the one you'll actually check
```
```

**1.4 Links** — delete any you don't want shown
```
LinkedIn:
GitHub:
Anything else (Substack, X, personal blog):
```

---

## Part 2 · Three proof points

Three short lines, each **with a number in it**, sitting under the claim. These
are the claim's collateral — a reader should half-believe you before deciding
whether to open a case study.

Format is a big figure plus a one-line gloss. Examples of the *shape*:

| Figure | Gloss |
| --- | --- |
| `0→1` | Products shipped end to end, spec through launch |
| `$4.2M` | ARR influenced by roadmap I owned in 2024 |
| `40M` | Monthly transactions on the surface I was responsible for |
| `3→14` | Grew the pod I product-led over two years |

```
2.1  Figure:                Gloss:

2.2  Figure:                Gloss:

2.3  Figure:                Gloss:
```

*Fails if:* no number, or a number you can't source in an interview.

---

## Part 3 · About

Three sentences. Two about the work, one that's actually human — the human one
is what people remember and quote back to you. Current draft mentions the
Pacific Northwest and being on the water; replace with whatever is true.

```
```

---

## Part 4 · The three case studies

Each study aims at a different reader. Don't try to make one study serve all
three — that's how you get three mediocre ones.

For **each** study, I need the four header-strip fields plus the six blocks.
600–900 words each. Bullet fragments are fine — I'll shape the prose.

### Header strip (all three studies need these four)

```
Title:          (a real title, not "Case Study 1")
Outcome:        (one line, WITH A NUMBER — this is the homepage card)
Role:           (e.g. Product Manager, or "Solo — product, design, engineering")
Team:           (e.g. "6 eng · 1 design · 1 data", or "1")
Timeframe:      (e.g. "2024 — 9 months")
Surface:        (e.g. "Web + iOS", "API + internal tooling")
```

### The six blocks

```
1. SITUATION AND STAKES
   What was true when you arrived, and what it would have cost to get wrong.
   Two paragraphs max.

2. THE DECISION YOU OWNED
   Not the process you ran — the call you made, the options you rejected, and
   the reasoning that separated them. This is the block that gets you hired.

3. THE ARTIFACT
   One real thing: a metrics tree, a spec excerpt, an architecture sketch, a
   prototype frame, a before/after table. Describe it and I'll build it.

4. OUTCOME
   Numbers with denominators and a time window.
   Good:  "Activation 21% → 28% over 8 weeks, n≈12k"
   Bad:   "+34% activation"
   A mixed or negative result honestly reported is a strong ending.

5. WHAT YOU'D DO DIFFERENTLY
   Specific and non-defensive. The strongest seniority signal on the page.
```

---

### Study 1 — for the big-co hiring manager: **scope and outcome**

A shipped product you can name. Leads with the size of the problem and the
number at the end. Proves you've operated at real altitude.

```
Header strip:


Blocks 1–5:


```

### Study 2 — for the founder: **end-to-end range**

A side project (`loft`? `laundromat`?). You defined it, designed it, built it,
shipped it. Frame it as **a bet with a thesis**, not a hobby — that framing is
the whole difference between "cute" and "credible".

```
Header strip:


Blocks 1–5:


```

### Study 3 — for the technical/AI team: **a defensible tradeoff**

The shortest of the three by design. One decision where you weighed something
real — latency against quality, build against buy, model cost against accuracy,
a migration against a deadline. Name the numbers. Proves the CS background is
load-bearing rather than decorative.

```
Header strip:


Blocks 1–5:


```

---

## Part 5 · Assets and infrastructure

```
5.1  Domain you've bought (or want):
5.2  Résumé PDF — drop the file at public/resume.pdf, then tick:  [ ] done
5.3  Résumé in plain text, so /resume reads without a download:

5.4  Favicon — a letter, a mark, or "just use my initials":
5.5  Should the GitHub repo be private while you draft?  [ ] yes  [ ] no
```

---

## Part 6 · Optional, and fine to skip for v1

```
6.1  A photo of you (many PM portfolios skip this; it's genuinely optional)
6.2  Testimonials or quotes from people you've worked with
6.3  Talks, writing, or podcasts you want linked
6.4  Anything under NDA you want handled as shape-not-name
     (e.g. "a payments product at a mid-size fintech, ~40M monthly transactions")
```

---

## Two rules I'll hold you to

**Every number has to survive a follow-up question.** I will never invent a
metric, a company, or an achievement on your behalf. If a claim needs evidence
you haven't given me, I'll ask rather than fill it in.

**Two strong studies beat three rushed ones.** If you run out of steam, tell me
and we ship two. Set `draft: true` on the third and it disappears from the
homepage until it's ready.
