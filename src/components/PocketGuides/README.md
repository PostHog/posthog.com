# PocketGuides

The digital book format for pocket guides – the docs-site sibling of the marketing team's field
guide microsites. Educational register, not marketing: the structure does the teaching, and the
whole thing uses PostHog fonts and tokens only.

**Every page of a book is an MDX file.** Nothing in this folder contains prose – these components
are layout and vocabulary, the words all live in `contents/pocket-guides/`.

```
contents/pocket-guides/<volume>/
├── index.mdx              bookOrder: 0 – the front matter (title page + contents)
├── 101/index.mdx          bookOrder: 1 – the primer
└── <use-case>/
    ├── index.mdx          bookOrder: 2+ – one use case
    └── SKILL.md           the scout itself, rendered as a figure (scout volumes only)
```

`gatsby/createPages.ts` already routes everything under `contents/pocket-guides/` through
`src/templates/Template.tsx`, which hands any `/pocket-guides/` slug to `BookPage`.

**One reader, many volumes.** The volume id is the second path segment, and `BookPage` reads it
off the slug (`volumeIdFromUrl`) to build that book's reading order. A new volume is a directory
plus a row in `src/constants/pocketGuides.ts` – no reader changes. The shelf counts a volume's
use cases by `bookOrder >= 2`, so a volume whose chapters aren't scouts still counts correctly.

**Teach inside the book.** A reader who leaves for the docs mid-page usually doesn't come back, so
a concept they might not know should be a `<Term>` (definition on hover, with its own "Read the
docs" button) or an annotated figure marker – not a link in the prose. Keep plain links for things
the reader is meant to go *do*, like an install guide. Term definitions are quoted from the docs
page that owns the concept, so this can't drift into a second source of truth.

**Every use case ends in a CTA, and only use cases have one.** Front matter and the 101 send
people onward with ordinary links in the prose – a CTA there devalues the one that matters.
Which CTA depends on the volume: self-driving chapters enable a scout (`<Enable />`, driven by
the sibling SKILL.md), and every other volume authors its own in the `cta:` frontmatter block and
renders it with `<Action />` – today a PostHog AI prompt (`kind: prompt`) or a plain destination
(`kind: link`). Both shapes also drive the pinned bar at the foot of the reader, so the page's
action and the shortcut to it can't drift apart.

## Authoring a page

Frontmatter carries structured data; the body carries every word.

```mdx
---
title: Feature flag debt
shortTitle: Flag debt      # tab label, falls back to title
bookOrder: 3               # reading order; 0 is the front matter, omit to keep a draft unlisted
---

<LeftPage>

<ReportFigure n={1} caption="…" legend="…" />

</LeftPage>

<RightPage>

# Feature flag debt

Prose, **markdown**, and <Term name="scout" /> definitions.

## A section heading

<Enable />

</RightPage>
```

`<LeftPage>` holds a page's figures, `<RightPage>` its prose – authoring markers, not layout.
The reader interleaves them at render time (see below). Content outside either wrapper renders
after the prose.

### Components available in a body

| Component | What it does |
|---|---|
| `<LeftPage>` / `<RightPage>` | Figures vs prose – markers the reader interleaves |
| `<Eyebrow>` | The small line above a title-page heading |
| `<Fig n caption legend>` | Any exhibit, in a numbered frame |
| `<ReportFigure n caption legend>` | This use case's report, drawn as its inbox moment |
| `<ScoutFigure n caption>` | This use case's `SKILL.md` |
| `<LoopFigure n caption>` | The self-driving loop diagram |
| `<TraceFigure n caption rows>` | One LLM trace, nested – generations and spans with their numbers |
| `<Watches />` | The signal sources from this page's `watches` frontmatter |
| `<Enable />` | The scout CTA – one click to add this page's scout |
| `<Action />` | The CTA for volumes whose answer isn't a scout, from `cta:` frontmatter |
| `<Contents />` | The contents list, built from the book itself |
| `<SeeAlso>` | A print footnote at the foot of the column |
| `<Term name="scout">` | An orange dotted-underline definition with a hover card |

Headings map to the book's type scale: `#` is the page title, `##` a small-caps section heading.

### How the reader lays a page out

Every page is one linear scroll. `ReaderWrapper` (ReaderWrapper.tsx) re-orders the compiled
elements by their `mdxType` and `n` props at render time: each figure is embedded after the
first block that cites it via `<SeeFig>`, and a figure nobody cites prints at the end of the
page. One exception: a figure-less page authored as two pages – the volume's front matter –
renders `<LeftPage>` and `<RightPage>` as two columns at reading widths.

The hover markers and their hint line show at reading widths only – below ~672px of container
width they're hidden (there is no hover on touch), so a figure's caption has to carry it alone
on phones.

### Adding new content elements

The page container is `not-prose`, so any element the prose map doesn't cover renders with bare
browser defaults – silently. When a guide introduces something new (a table was the first),
check the rendered page, and prefer wrapping the element in the site's native styling over
book-specific styles: see how `ul`/`ol`/`table` borrow `.article-content` in
[bookPieces.tsx](./bookPieces.tsx). Then test the Aa reading-size control at desktop and phone
widths.

### One MDX trap worth knowing

**Never start a line with an inline component.** MDX treats a line-leading JSX tag as a *block*,
which splits the paragraph around it and leaves the tail unstyled:

```mdx
<!-- Broken: the sentence splits into three pieces -->
…first the report as it lands in your
<Term name="inbox" /> and the pull request it becomes…

<!-- Fine: the tag sits mid-line -->
…first the report as it lands in
your <Term name="inbox" /> and the pull request it becomes…
```

Block components (`<Watches />`, `<Enable />`, the figures) are meant to start their own line.
Only inline ones – `<Term>` – need to stay mid-sentence.

There is a mirror-image trap at the site level: the `gatsby-remark-inline-jsx-paragraphs` plugin
wraps any *standalone single-line self-closing* component in a `<p>` so docs prose keeps its
max-width. For block components here that produced invalid `<p><figure>` nesting, so the plugin
skips everything under `contents/pocket-guides/` (see the guard at the top of
`plugins/gatsby-remark-inline-jsx-paragraphs/index.js`). If a figure ever renders wrapped in a
paragraph again, check that guard first – and note Gatsby caches compiled MDX, so the fix only
shows after the `.mdx` file itself changes (or `pnpm clean`).

## The reader UI

- **`BookReader`** – the window itself is the page, no inner frame and no toolbar: reading
  controls are book tabs on the page's left edge (shelf link, a Contents popover, an Aa
  reading-size control), a centered reading column, click-to-turn page margins, and a foot line
  with prev/next turns, "All guides" (except where prev already is the shelf), and "p. N of M".
- **One model drives everything.** `bookModel.tsx`'s `useBookPages(volumeId)` reads every page's
  `bookOrder` and produces that volume's reading order; the bar, contents, and page turns all
  derive from it. Front matter is unnumbered; arabic numbering starts at the page after it, so
  inserting a chapter renumbers what follows without anyone editing a number by hand.
- **Turning pages** – the margin turn zones, the bar chevrons, the foot links, and the
  left/right arrow keys all walk the same sequence.

## Files

| File | Responsibility |
|---|---|
| `Cover.tsx` | The series cover on the shelf: spine, masthead, specimen, volume number |
| `BookReader.tsx` | The full-window page: edge book tabs, popovers, turn zones, foot nav |
| `BookPage.tsx` | Renders one MDX page into the reader |
| `bookComponents.tsx` | Assembles the MDX vocabulary from the files below |
| `ReaderWrapper.tsx` | The figure-interleaving MDX wrapper + LeftPage/RightPage markers |
| `figures.tsx` | Fig and every `<XxxFigure>` exhibit |
| `bookPieces.tsx` | SeeFig, Eyebrow, Watches, Enable, Contents, SeeAlso, prose styling |
| `Action.tsx` | The non-scout CTA and its pinned bar, from `cta:` frontmatter |
| `terms.tsx` | The book's vocabulary – `<Term>` and every hover-card definition |
| `bookContext.tsx` | EntryProvider + useEntry/useTemplate (page data for figures) |
| `bookModel.tsx` | Volume id, reading order, page numbers, tabs, arrow-key turns |
| `Figure.tsx` | A framed, captioned exhibit – "Fig. 1 – …" |
| `InboxFigure.tsx` | One use case's inbox moment, annotated |
| `TraceTree.tsx` | An LLM trace drawn as nested rows – the AI Observability volume's hero |

Volume metadata lives in `src/constants/pocketGuides.ts` (data-only so `gatsby/` can import it).
The report frontmatter contract and the `.md` agent-mirror constraints are documented in
`components/SelfDrivingInbox/README.md`.

**Adding a frontmatter field** needs a matching declaration in
`gatsby/createSchemaCustomization.ts` plus `pnpm clean` – Gatsby won't infer fields that only some
pages declare.
