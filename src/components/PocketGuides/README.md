# PocketGuides

The digital book format for pocket guides – the docs-site sibling of the marketing team's field
guide microsites. Educational register, not marketing: the structure does the teaching, and the
whole thing uses PostHog fonts and tokens only.

**Every page of a book is an MDX file.** Nothing in this folder contains prose – these components
are layout and vocabulary, the words all live in `contents/pocket-guides/`.

```
contents/pocket-guides/self-driving/
├── index.mdx              bookOrder: 0 – the front matter (title page + contents)
├── 101/index.mdx          bookOrder: 1 – the primer
└── <use-case>/
    ├── index.mdx          bookOrder: 2+ – one use case
    └── SKILL.md           the scout itself, rendered as a figure
```

`gatsby/createPages.ts` already routes everything under `contents/pocket-guides/` through
`src/templates/Template.tsx`, which hands any `/pocket-guides/` slug to `BookPage`.

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

`<LeftPage>` is the left page, `<RightPage>` the right. The body renders once per side behind a gate, so
each page scrolls independently while the file stays one readable document. Content outside either
wrapper lands on the right page.

**Left page = figures, right page = text is a convention, not a rule** – both take arbitrary content, and a
future volume can mix them however its material wants.

### Components available in a body

| Component | What it does |
|---|---|
| `<LeftPage>` / `<RightPage>` | Which page the content lands on |
| `<Eyebrow>` | The small line above a title-page heading |
| `<Fig n caption legend>` | Any exhibit, in a numbered frame |
| `<ReportFigure n caption legend>` | This use case's report, drawn as its inbox moment |
| `<ScoutFigure n caption>` | This use case's `SKILL.md` |
| `<LoopFigure n caption>` | The self-driving loop diagram |
| `<Watches />` | The signal sources from this page's `watches` frontmatter |
| `<Enable />` | The one-click CTA – the book's only real button |
| `<Contents />` | The contents list, built from the book itself |
| `<SeeAlso>` | A print footnote at the foot of the column |
| `<Term name="scout">` | An orange dotted-underline definition with a hover card |

Headings map to the book's type scale: `#` is the page title, `##` a small-caps section heading.

### The single-page read (mobile and narrow windows)

Below ~944px of container width the spread becomes a plain one-column page: no book furniture,
just the content with each figure embedded after the first block that cites it via `<SeeFig>`,
plus prev/next/All-guides links and the pinned scout bar. This is automatic – authors still
write `<LeftPage>` figures and `<RightPage>` prose, and `SinglePageWrapper` (bookComponents.tsx)
re-orders the compiled elements by their `mdxType` and `n` props at render time. Two authoring
consequences: a figure nobody cites prints at the end of the page, and the hover markers plus
their hint line are hidden in this mode (there is no hover on touch), so a figure's caption has
to carry it alone.

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

## The book UI

- **`BookSpread`** – the volume's color spine down the left edge (matching its shelf cover), two
  pages joined at a gutter shadow, running heads, folios, click-to-turn page margins, and index
  tabs pinned left with a "Return to bookshelf" link. Below `@4xl` the pages stack in DOM order.
- **The book fits the window; pages scroll internally.** Like paper in a frame: the desk never
  scrolls, each page owns its own scroll. (A strict no-scroll fit-or-split rule was tried and
  reverted – splitting just moved the overflow around.)
- **One model drives everything.** `bookModel.tsx`'s `useBookPages()` reads every page's
  `bookOrder` and produces the reading order; folios, tabs, contents lines, and page turns all
  derive from it. Front matter is unnumbered; arabic numbering starts at the page after it, so
  inserting a chapter renumbers what follows without anyone editing a number by hand.
- **Turning pages** – the margin turn zones, the folio links, and the left/right arrow keys all
  walk the same sequence.

## Files

| File | Responsibility |
|---|---|
| `Cover.tsx` | The series cover on the shelf: spine, masthead, specimen, volume number |
| `BookSpread.tsx` | The open-book frame: spine, two pages, gutter, heads, folios, turn zones, tabs |
| `BookPage.tsx` | Renders one MDX page into the spread, once per side |
| `bookComponents.tsx` | The MDX vocabulary above, plus prose styling |
| `bookModel.tsx` | Reading order, page numbers, tabs, arrow-key turns |
| `Figure.tsx` | A framed, captioned exhibit – "Fig. 1 – …" |
| `InboxFigure.tsx` | One use case's inbox moment, annotated |

Volume metadata lives in `src/constants/pocketGuides.ts` (data-only so `gatsby/` can import it).
The report frontmatter contract and the `.md` agent-mirror constraints are documented in
`components/SelfDrivingInbox/README.md`.

**Adding a frontmatter field** needs a matching declaration in
`gatsby/createSchemaCustomization.ts` plus `pnpm clean` – Gatsby won't infer fields that only some
pages declare.
