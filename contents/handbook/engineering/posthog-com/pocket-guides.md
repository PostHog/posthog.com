---
title: Pocket guides
sidebar: Handbook
showTitle: true
---

Pocket guides are the docs site's use case books at [/pocket-guides](/pocket-guides): each volume
is a shelf cover, a 101, and a set of use cases that each end in a one-click "Add this scout"
CTA. They render as a full-window e-reader – figures embedded where the prose cites them – and
everything a reader sees is authored in MDX.

This page is the short version for authors. The source of truth for the component side lives in
the repo: `src/components/PocketGuides/README.md` (the reader, figures, and MDX traps) and
`src/components/SelfDrivingInbox/README.md` (the report frontmatter contract, the SKILL.md
format, and the agent-mirror constraints).

## How a guide is authored

A use case is one directory:

```
contents/pocket-guides/<volume>/<slug>/
├── index.mdx    everything a human reads
└── SKILL.md     the scout itself, verbatim
```

- **Copy `contents/pocket-guides/self-driving/_starter/`** to begin – it's a commented skeleton
  of both files, kept out of every gallery by the `_` prefix.
- **Frontmatter carries the structured data**: `title`, `shortTitle`, `bookOrder` (reading
  order; 0 is the front matter, omit to keep a draft unlisted), the `report` block that renders
  as the inbox figures, `watches`, `requires`, `category`, and `schedule`.
- **The body carries every word.** `<LeftPage>` holds the figures, `<RightPage>` the prose; the
  reader interleaves each figure after the first block that cites it via `<SeeFig n={1} />`.
- **`SKILL.md` is a real file, not a string** – same frontmatter as the canonical scouts in the
  monorepo, so one can be pasted in or lifted out without reformatting. The page renders it
  byte-for-byte, and the "Add this scout" deep link prefills PostHog from it.

## The two MDX traps

1. **Never start a line with an inline component** (`<Term>`): MDX v1 treats a line-leading tag
   as a block and splits the paragraph. Keep inline tags mid-sentence.
2. **Don't hand-wrap block components in paragraphs** – and if a figure ever renders inside a
   `<p>`, check the `gatsby-remark-inline-jsx-paragraphs` plugin's pocket-guides guard first,
   then remember Gatsby caches compiled MDX (the fix shows only after the `.mdx` changes or
   `pnpm clean`).

## Definitions stay fresh

`<Term>` hover cards pull their definitions from the owning docs page's `description`
frontmatter at build time (for example `contents/docs/self-driving/scouts.mdx`). To change a
definition, edit the docs page – the guides follow. The authored copies in
`src/components/SelfDrivingInbox/terms.tsx` are fallbacks only.

## Measuring

Reader interactions emit the `pocket_guide_interaction` event (marker glosses, term hovers,
contents, font size, scout-file expansion) and both "Add this scout" CTAs emit it with
`kind: add_scout_click` – that click is the conversion.
