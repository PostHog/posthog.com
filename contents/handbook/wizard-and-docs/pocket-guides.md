---
title: Pocket guides
sidebar: Handbook
showTitle: true
---

Pocket guides are the docs site's use case books at [/pocket-guides](/pocket-guides): each volume
is a shelf cover, a 101, and a set of use cases that each end in a CTA. They render as a
full-window e-reader – figures embedded where the prose cites them – and everything a reader sees
is authored in MDX.

**Every use case ends in one action, and the action is what the volume is for.** Self-driving
chapters add a custom scout. AI Observability chapters hand over a PostHog AI prompt that builds
the eval, dashboard, or funnel the chapter describes. A future Support volume will have its own.
Pick the shape when you plan the volume, not per chapter – a book where every chapter ends
somewhere different reads as a link dump.

**Only use cases get a CTA.** The front matter and the 101 point onward with ordinary links in
the prose. Giving those pages a button too spends the reader's attention on "install this" and
leaves nothing for the action each use case is actually built around.

**Which volume does a use case belong to?** If the answer is a custom scout, it belongs in the
self-driving volume, even when the subject is AI Observability or Support. Other volumes cover
their product outside self-driving, and cross-link to the scout chapter that automates the manual
loop they just taught.

This page is the short version for authors. The source of truth for the component side lives in
the repo: `src/components/PocketGuides/README.md` (the reader, figures, and MDX traps) and
`src/components/SelfDrivingInbox/README.md` (the report frontmatter contract, the SKILL.md
format, and the agent-mirror constraints).

## How a guide is authored

A use case is one directory:

```
contents/pocket-guides/<volume>/<slug>/
├── index.mdx    everything a human reads
└── SKILL.md     the scout itself, verbatim (scout volumes only)
```

- **Copy `contents/pocket-guides/self-driving/_starter/`** to begin – it's a commented skeleton
  of both files, kept out of every gallery by the `_` prefix.
- **Frontmatter carries the structured data**: `title`, `shortTitle`, `pocketGuideOrder` (reading
  order; 0 is the front matter, omit to keep a draft unlisted), the `report` block that renders
  as the inbox figures, `watches`, `requires`, `category`, and `schedule`.
- **A non-scout chapter carries a `pocketGuideCta:` block instead** – `kind: prompt` with the PostHog AI
  prompt itself, or `kind: link` with a destination – rendered by `<Action />` where the chapter
  wants it, and repeated in the reader's pinned bar automatically.
- **A new volume is a directory plus a row in `src/constants/pocketGuides.ts`.** The reader reads
  the volume id off the slug, so nothing in the components needs to know your volume exists.
- **The body carries every word.** `<LeftPage>` holds the figures, `<RightPage>` the prose; the
  reader interleaves each figure after the first block that cites it via `<SeeFig n={1} />`.
- **`SKILL.md` is a real file, not a string** – same frontmatter as the canonical scouts in the
  monorepo, so one can be pasted in or lifted out without reformatting. The page renders it
  byte-for-byte, and the "Add this scout" deep link prefills PostHog from it.
- **When PostHog already ships the scout as a template, set `appTemplate:` instead.** The CTA then
  opens that template in the app, which carries the tags and schedule the encoded deep link
  doesn't. The `SKILL.md` still renders on the page, so keep it saying what the template says –
  details in `src/components/SelfDrivingInbox/README.md`.

## The two MDX traps

1. **Never start a line with an inline component** (`<Term>`): MDX v1 treats a line-leading tag
   as a block and splits the paragraph. Keep inline tags mid-sentence.
2. **Don't hand-wrap block components in paragraphs** – and if a figure ever renders inside a
   `<p>`, check the `gatsby-remark-inline-jsx-paragraphs` plugin's pocket-guides guard first,
   then remember Gatsby caches compiled MDX (the fix shows only after the `.mdx` changes or
   `pnpm clean`).

## Keep the learning in the book

A reader who clicks out to the docs mid-page usually doesn't come back. So when a guide names
something the reader might not know, define it in place:

- **`<Term>`** for a concept – the definition appears on hover, and clicking the term opens the
  docs page that owns it.
- **Figure markers** for parts of a screen – hovering a numbered marker glosses that element.
- **Plain links** only for things the reader is meant to go *do*, like an install guide, or for a
  neighbouring guide.

If you find yourself writing "see the docs for X" mid-sentence, X probably wants to be a term.

## Term definitions

`<Term>` hover-card definitions live in `src/components/PocketGuides/terms.tsx`, each
quoted from the docs page it links to. If a docs definition changes, update the quote there.

## Adding new content elements

The book styles every markdown element itself (its container opts out of the site's prose
styling), so a new kind of content – a table, a new list style, anything the guides haven't
used before – renders unstyled until the book's component map supports it.

- **Check the rendered page** whenever you introduce an element the guides haven't used yet.
  Unsupported elements fail silently: browser-default styling, not an error.
- **Inherit website defaults instead of reinventing them.** Wrap the element in the site's
  native styling (see how lists and tables borrow `.article-content` in
  `src/components/PocketGuides/bookPieces.tsx`) rather than writing book-specific styles.
- **Test text resizing on web and mobile.** Use the Aa control at every size, at desktop and
  phone widths – the book's type scales from one base size, and new elements need to keep up.

## Measuring

Reader interactions emit the `pocket_guide_interaction` event (marker glosses, term hovers,
contents, font size, scout-file expansion) and both "Add this scout" CTAs emit it with
`kind: add_scout_click` – that click is the conversion.
