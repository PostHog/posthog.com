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
| `<Watches />` | The signal sources from this page's `watches` frontmatter |
| `<Enable />` | The one-click CTA – the book's only real button |
| `<Contents />` | The contents list, built from the book itself |
| `<SeeAlso>` | A print footnote at the foot of the column |
| `<Term name="scout">` | An orange dotted-underline definition with a hover card |

Headings map to the book's type scale: `#` is the page title, `##` a small-caps section heading.

### How the reader lays a page out

Every page is one linear scroll. `ReaderWrapper` (bookComponents.tsx) re-orders the compiled
elements by their `mdxType` and `n` props at render time: each figure is embedded after the
first block that cites it via `<SeeFig>`, and a figure nobody cites prints at the end of the
page. One exception: a figure-less page authored as two pages – the volume's front matter –
renders `<LeftPage>` and `<RightPage>` as two columns at reading widths.

The hover markers and their hint line show at reading widths only – below ~672px of container
width they're hidden (there is no hover on touch), so a figure's caption has to carry it alone
on phones.

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
- **One model drives everything.** `bookModel.tsx`'s `useBookPages()` reads every page's
  `bookOrder` and produces the reading order; the bar, contents, and page turns all derive from
  it. Front matter is unnumbered; arabic numbering starts at the page after it, so inserting a
  chapter renumbers what follows without anyone editing a number by hand.
- **Turning pages** – the margin turn zones, the bar chevrons, the foot links, and the
  left/right arrow keys all walk the same sequence.

## Files

| File | Responsibility |
|---|---|
| `Cover.tsx` | The series cover on the shelf: spine, masthead, specimen, volume number |
| `BookReader.tsx` | The full-window page: edge book tabs, popovers, turn zones, foot nav |
| `BookPage.tsx` | Renders one MDX page into the reader |
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
