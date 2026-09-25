# PocketGuides

The digital book format for pocket guides – the docs-site sibling of the marketing team's field
guide microsites. Educational register, not marketing: the structure does the teaching, and the
reader UI uses PostHog fonts and tokens. The Product Analytics guide's Twig views retain Twig styling.

**Every page of a book is an MDX file.** Narrative prose lives in `contents/pocket-guides/`.
Components here supply layout, interactions, and short labels for the data they display.

The Product Analytics figures use commit-pinned `@posthog/twig-components` views for browsing and
stay cards. `ProductAnalyticsExhibits.tsx` owns the guide's example event feed and chart. Reader
clicks only change local example state – they do not send practice events to PostHog.
`TwigBrowseFigure.tsx` imports Twig's styles and photos from the package, so a package update must
be reviewed on both sites.

```
contents/pocket-guides/<volume>/
├── index.mdx              pocketGuideOrder: 0 – the front matter (title page + contents)
├── 101/index.mdx          pocketGuideOrder: 1 – the primer
└── <use-case>/
    ├── index.mdx          pocketGuideOrder: 2+ – one use case
    └── SKILL.md           the scout itself, rendered as a figure (scout volumes only)
```

`gatsby/createPages.ts` already routes everything under `contents/pocket-guides/` through
`src/templates/Template.tsx`, which hands any `/pocket-guides/` slug to `BookPage`.

**One reader, many volumes.** The volume id is the second path segment, and `BookPage` reads it
off the slug (`volumeIdFromUrl`) to build that book's reading order. A new volume is a directory
plus a row in `src/constants/pocketGuides.ts` – no reader changes. The shelf counts a volume's
use cases by `pocketGuideOrder >= 2`, so a volume whose chapters aren't scouts still counts correctly.

**Teach inside the book.** A reader who leaves for the docs mid-page usually doesn't come back, so
a concept they might not know should be a `<Term>` (definition on hover, with its own "Read the
docs" button) or an annotated figure marker – not a link in the prose. Keep plain links for things
the reader is meant to go *do*, like an install guide. Term definitions are quoted from the docs
page that owns the concept, so this can't drift into a second source of truth.

**Every use case ends in a CTA, and only use cases have one.** Front matter and the 101 send
people onward with ordinary links in the prose – a CTA there devalues the one that matters.
Which CTA depends on the volume: self-driving chapters enable a scout (`<Enable />`, driven by
the sibling SKILL.md), and every other volume authors its own in the `pocketGuideCta:` frontmatter block and
renders it with `<Action />` – today a PostHog AI prompt (`kind: prompt`) or a plain destination
(`kind: link`). Both shapes also drive the pinned bar at the foot of the reader, so the page's
action and the shortcut to it can't drift apart.

## Authoring a page

Frontmatter carries structured data; the body carries every word.

```mdx
---
title: Remove the feature flags you already rolled out
shortTitle: Flag debt      # tab label, falls back to title
pocketGuideOrder: 3               # reading order; 0 is the front matter, omit to keep a draft unlisted
---

<LeftPage>

<ReportFigure n={1} caption="…" legend="…" />

</LeftPage>

<RightPage>

# Remove the feature flags you already rolled out

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
| `<ScoutFigure n caption>` | This use case's `SKILL.md`, from its self-driving `InboxTemplate` |
| `<SkillFigure n caption>` | This page's own `SKILL.md`, for guides with no `InboxTemplate` |
| `<LoopFigure n caption>` | The self-driving loop diagram |
| `<TraceFigure n caption rows>` | One LLM trace, nested – generations and spans with their numbers |
| `<Watches />` | The signal sources from this page's `watches` frontmatter |
| `<Enable />` | The scout CTA – one click to add this page's scout |
| `<Action />` | The CTA for volumes whose answer isn't a scout, from `pocketGuideCta:` frontmatter |
| `<SeeAlso>` | A print footnote at the foot of the column |
| `<Term name="scout">` | An orange dotted-underline definition with a hover card |

Headings, paragraphs, lists, tables, and inline code use the same prose styling as docs.

### How the reader lays a page out

Every page is one linear scroll. `ReaderWrapper` (ReaderWrapper.tsx) re-orders the compiled
elements by their `mdxType` and `n` props at render time: each figure is embedded after the
first block that cites it via `<SeeFig>`, and a figure nobody cites prints at the end of the
page. Landing-page introductions render in one column in both the standalone reader and docs'
Learn surface. Contents navigation belongs to each surface's sidebar, so introductory MDX does
not include a separate contents page.

The hover markers and their hint line show at reading widths only – below ~672px of container
width they're hidden (there is no hover on touch), so a figure's caption has to carry it alone
on phones.

### Adding new content elements

The standalone reader applies the shared docs prose classes, and the Learn surface inherits
them from `ReaderView`. The Aa control overrides the text size only after a reader changes it.
When a guide introduces a new content element, check its rendered appearance against docs in
light and dark mode and at narrow and wide widths. Keep book-specific mappings in
[bookPieces.tsx](./bookPieces.tsx) only for behavior the shared prose styles cannot provide.

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

- **`BookReader`** – wide windows pin the Contents panel on the left, with a compact Home and
  reading-size control bar. `BookPage` uses Explorer's `transparent` option so the standard
  frosted app-window background shows through, as it does in the docs reader. The sidebar
  has no separate background or shadow, so it shares that same surface.
  The page scrolls independently, and long contents
  lists scroll within the sidebar. Below `@4xl`, compact book tabs keep the Contents and Aa
  popovers. The reading column has its own container queries, click-to-turn page margins, and
  a foot line with prev/next turns, "All guides" (except where prev already is the shelf), and
  "p. N of M".
- **One model drives everything.** `bookModel.tsx`'s `useBookPages(volumeId)` reads every page's
  `pocketGuideOrder` and produces that volume's reading order; the bar, contents, and page turns all
  derive from it. Front matter is unnumbered; arabic numbering starts at the page after it, so
  inserting a chapter renumbers what follows without anyone editing a number by hand.
- **Turning pages** – the margin turn zones, the bar chevrons, the foot links, and the
  left/right arrow keys all walk the same sequence.

## Files

| File | Responsibility |
|---|---|
| `Cover.tsx` | The series cover on the shelf: spine, masthead, specimen, volume number |
| `Book.tsx` | The volume as a coloured spine for the `/docs` library column, plus the `BookShelf` it sits in |
| `VolumeCard.tsx` | One volume pitched as a card: cover, pitch, button. Shared by the docs pages and `/self-driving` |
| `GuidesForProduct.tsx` | Looks up the volume for a docs slug and renders a `VolumeCard`. Renders nothing when there is none |
| `BookReader.tsx` | The full-window page: pinned sidebar, compact book tabs, turn zones, foot nav |
| `BookPage.tsx` | Renders one MDX page into the reader |
| `bookComponents.tsx` | Assembles the MDX vocabulary from the files below |
| `ReaderWrapper.tsx` | The figure-interleaving MDX wrapper + LeftPage/RightPage markers |
| `figures.tsx` | Fig and every `<XxxFigure>` exhibit |
| `bookPieces.tsx` | SeeFig, Eyebrow, Watches, Enable, SeeAlso, prose styling |
| `Action.tsx` | The non-scout CTA and its pinned bar, from `pocketGuideCta:` frontmatter |
| `terms.tsx` | The book's vocabulary – `<Term>` and every hover-card definition |
| `bookContext.tsx` | EntryProvider + useEntry/useTemplate (page data for figures) |
| `bookModel.tsx` | Volume id, reading order, page numbers, tabs, arrow-key turns |
| `useSkillFile.ts` | Pairs a page with its sibling `SKILL.md`, for `<SkillFigure>` |
| `Figure.tsx` | A framed, captioned exhibit – "Fig. 1 – …" |
| `InboxFigure.tsx` | One use case's inbox moment, annotated |
| `TraceTree.tsx` | An LLM trace drawn as nested rows – the AI Observability volume's hero |

`Cover` and `Book` are two views of one volume. `Cover` is the shelf at `/pocket-guides`, where a
book stands face-out with its art. `Book` is the library column on the `/docs` index, where each
volume is a single coloured spine – `bg-<token>` with `Vol. N`, the title, and the guide count
printed along it. Both take `{ volume, count }`, both link with `state={{ newWindow: true }}`, and
both skip the link for a `comingSoon:` volume. Counts for either come from
`src/hooks/usePocketGuideCounts.ts`.

**Every spine is the same height.** The guide count is printed on the spine, so it does not also
need to be implied by the size – and a shelf whose proportions shift each time someone writes a page
never looks composed.

**Cover art is `Cover`-only.** `VOLUME_ART` is deliberately not exported. A spine is a few
characters tall; art belongs on the face-out covers, where there is room for it.

**The hover differs between the two on purpose.** `Cover` tilts, hinged at the spine, like picking a
book off a shelf. `Book` only scales slightly – a tilt on a thin horizontal bar reads as a glitch
rather than as an object. Both are `motion-safe:`.

`BookShelf` is layout only: a `max-w-[420px]` column. The cap is what keeps a spine spine-shaped –
when the docs index stacks into one column the library gets the full window width, and without it
the volumes stretch into wall-wide slivers.

`GuidesForProduct` is the tool-docs entry point: `<GuidesForProduct product="ai-observability" />`,
imported into whichever page owns that product's syllabus – `start-here.mdx` for AI Observability,
`index.mdx` for Self-driving. It matches the slug against `docsProduct` on a volume via `volumeForProduct`
and **returns `null` when nothing matches** – most products have no volume, so dropping it on a page
is always safe. Adding a product to the mechanism is one line: set `docsProduct` on its volume in
`src/constants/pocketGuides.ts`.

Both it and the "Learn it by use case" block on `/self-driving` (`src/pages/self-driving/index.tsx`)
render `VolumeCard`, so the card is defined once. `VolumeCard` takes the pitch, the link, and the
button label as props, because those are the only things the two surfaces disagree on – the docs
pages send a reader to the volume, `/self-driving` sends them to the whole shelf.

`VolumeCard` deliberately has no `overflow-hidden`: the cover's hover tilt lifts a drop shadow, and
clipping the card would cut it off.

In `.mdx`, wrap the component in a `<div>`. On its own line MDX treats it as a paragraph and emits
`<p>`, which cannot legally hold the cover's `<article>` and `<header>`.

Volume metadata lives in `src/constants/pocketGuides.ts` (data-only so `gatsby/` can import it).
The report frontmatter contract and the `.md` agent-mirror constraints are documented in
`components/SelfDrivingInbox/README.md`.

**Adding a frontmatter field** needs a matching declaration in
`gatsby/createSchemaCustomization.ts` plus `pnpm clean` – Gatsby won't infer fields that only some
pages declare.

### Code and event examples

`PocketGuideCodeEvents` is the guide's code-and-outcome exhibit. It renders a single frame with
code on the left and simulated event rows on the right, stacking them when the reading column is
narrow. Pass the language key (for example, `javascript`), code, event name, column label, and
example rows from MDX. The code side derives its visible language label from that key and has its
own copy button. These rows are local teaching data, not PostHog events.

Authors choose the format per example: use a fenced code block (`js`, `python`, etc.) to show code
alone, `PocketGuideCodeEvents` to show code beside the simulated events it produces, or a figure's
event inspector to focus on one selected interaction. Product Analytics uses the Twig event
figures for the filter example.

### Twig in Product Analytics

The introduction uses a screenshot of Twig's homepage from `static/pocket-guides/posthog/`.
The Events and properties chapter uses `BrowseStays` and `StayCardContent` from the pinned
`@posthog/twig-components` package. `TwigBrowseFigure` adds local filter state and package photos.
`TwigEventFlow` places the PostHog event inspector below the Twig view. The chapter's activity
feed, event properties, and chart are guide-owned examples in `ProductAnalyticsExhibits.tsx`.
These examples do not send events to a PostHog project.

Twig.com owns its pages and instrumentation. The package owns reusable Twig UI, data, styles,
and assets. PostHog.com owns the teaching prose and example data. When the package pin changes,
review the Twig views on both sites at narrow and wide widths, in both themes.
