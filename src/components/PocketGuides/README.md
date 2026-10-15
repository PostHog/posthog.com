# PocketGuides

Pocket Guide content is shared by product Learn tabs and the remaining standalone readers.
Product Analytics is the layout reference for guides embedded in Learn. Its Twig examples retain
Twig styling inside the shared docs reader.

**Every chapter is an MDX file.** Narrative prose lives in `contents/pocket-guides/`.
Components here supply layout, interactions, and short labels for the data they display.

The Product Analytics figures use commit-pinned `@posthog/twig-components` views for browsing and
stay cards. `ProductAnalyticsExhibits.tsx` owns the guide's example events and chart, while
`PostHogInspector.tsx` provides the shared frame and event or identity details.
`SessionReplayInspector.tsx` provides the playback-synced event timeline used beside a replay.
Reader clicks only change local example state – they do not send practice events to PostHog.
`TwigBrowseFigure.tsx` imports Twig's styles and photos from the package, so a package update must
be reviewed on both sites.

```
contents/pocket-guides/<volume>/
├── index.mdx              pocketGuideOrder: 0 – the introduction
├── 101/index.mdx          pocketGuideOrder: 1 – the primer
└── <use-case>/
    ├── index.mdx          pocketGuideOrder: 2+ – one use case
    └── SKILL.md           the scout itself, rendered as a figure (scout volumes only)
```

`gatsby/createPages.ts` already routes everything under `contents/pocket-guides/` through
`src/templates/Template.tsx`, which hands any `/pocket-guides/` slug to `BookPage`.

**One reader, many volumes.** The volume id is the second path segment, and `BookPage` reads it
off the slug (`volumeIdFromUrl`) to build that book's reading order. A new volume is a directory
plus a few registry entries (see [Adding a volume](#adding-a-volume)) – no reader changes. The shelf counts a volume's
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

## Adding a volume

`pnpm test:pocket-guides` checks these conventions and runs in the deploy preview workflow.
`pnpm lint:pocket-guide-layout` checks the shared reader and Learn layout locally and in CI.

| Where | What | Why |
|---|---|---|
| `contents/pocket-guides/<id>/` | `index.mdx` at order 0 and a 101 at order 1 | Learn navigation and the standalone reader both use this order |
| `src/constants/pocketGuides.ts` | The shelf row | Cover, spine, and volume number |
| `VOLUME_ART` in `volumeArt.tsx` | The volume's one hedgehog illustration, from the [PostHog brand site](https://brand.posthog.com/hoggies) | Art stays on the shelf cover and, for standalone guides, the title page; Learn pages use the docs reader instead |
| `VOLUME_SUBCOMMAND` in `Action.tsx` | The wizard command for the volume, if it has one | `<Setup />` renders it with `@latest` pinned and copies tracked; a pasted `npx` command gets neither |
| `pocketGuideVolume` in `src/hooks/productData/<product>.tsx`, and `src/pages/docs/<product>/learn/[...chapter].tsx` | The docs Learn tab, for a volume with `docsProduct` | The product's docs link to the book it teaches |

## Authoring a page

Frontmatter carries structured data; the body carries every word.

```mdx
---
title: Remove the feature flags you already rolled out
shortTitle: Flag debt      # tab label, falls back to title
pocketGuideOrder: 3               # reading order; 0 is the front matter, omit to keep a draft unlisted
---

# Remove the feature flags you already rolled out

Prose, **markdown**, and <Term name="scout" /> definitions. This is the figure <SeeFig n={1} />.

<ReportFigure n={1} caption="…" legend="…" />

## A section heading

<Enable />
```

Write Learn chapters in reading order, with each figure directly after the text that introduces it.
Data Stack and self-driving still use `<LeftPage>` and `<RightPage>` in the standalone reader.

### Components available in a body

| Component | What it does |
|---|---|
| `<LeftPage>` / `<RightPage>` | Legacy figure and prose markers for the standalone Data Stack and self-driving guides |
| `<Eyebrow>` | The small line above a standalone title-page heading; hidden in Learn |
| `<Setup />` | The volume's wizard command, for the front matter |
| `<Frontispiece />` | The standalone title page's hedgehog illustration; hidden in Learn |
| `<Fig n caption legend>` | Any exhibit, in a numbered frame |
| `<ReportFigure n caption legend>` | This use case's report, drawn as its inbox moment |
| `<ScoutFigure n caption>` | This use case's `SKILL.md`, from its self-driving `InboxTemplate` |
| `<SkillFigure n caption>` | This page's own `SKILL.md`, for guides with no `InboxTemplate` |
| `<LoopFigure n caption>` | The self-driving loop diagram |
| `<TraceFigure n caption rows>` | One LLM trace, nested – generations and spans with their numbers |
| `<Watches />` | The signal sources from this page's `watches` frontmatter |
| `<Enable />` | The scout CTA – one click to add this page's scout |
| `<Action />` | The CTA for volumes whose answer isn't a scout, from `pocketGuideCta:` frontmatter |
| `<SeeAlso>` | A resource aside in Learn; a print-style footnote in the standalone reader |
| `<Term name="scout">` | An orange dotted-underline definition with a hover card |

Paragraphs, lists, tables, and inline code use the docs prose styling. Chapter headings use the
shared scale in `guideProse.css`.

Write code samples and tables as native Markdown in the prose. A figure is for an exhibit
Markdown can't render, like annotated mock UI; `pocketGuides.test.ts` fails a figure whose only
content is a code block or a table.

### How the reader lays a page out

Every page is one linear scroll. Learn chapters render in the order written. For Data Stack and
self-driving, `ReaderWrapper` (ReaderWrapper.tsx) still places figures from `<LeftPage>` after the
first prose block in `<RightPage>` that cites them with `<SeeFig>`. Landing-page introductions
render in one column in both the standalone reader and docs' Learn surface. Contents navigation
belongs to each surface's sidebar, so introductory MDX does not include a separate contents page.

The hover markers and their hint line show at reading widths only – below ~672px of container
width they're hidden (there is no hover on touch), so a figure's caption has to carry it alone
on phones.

### Adding new content elements

The standalone reader applies the shared docs prose classes, and the Learn surface inherits
them from `ReaderView`. `guideProse.css` defines the chapter heading hierarchy, See also block,
and the standalone reader's Aa sizes. The Aa control starts at 17px.
The Learn sidebar is rendered only by `LearnNav` in `buildProductMenuTabs.tsx`; its shared styles
live in `learnNav.css`. Change those classes to update all four Learn guides together.
`guideProse.css` also styles the shared figure and callout panels, inline controls, and scanner
templates. `PostHogInspector` owns the inspector's shared frame, tabs, data rows, and status styles in
`postHogInspector.css`. `twigGuide.css` holds guide-specific framing and compact card variants
around the shared `@posthog/twig-components` components; the package remains the source of their
base styles. ESLint rejects inline styles in these presentational components and the reader layout,
and rejects a second `<nav>` in the Learn page components. Calculated positions and colors inside
interactive figures can still use inline styles.
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

Learn chapters use `ReaderView`'s large prose size, while standalone chapters start at 17px and
keep the Aa controls. Opening any guide applies the site's reduced-transparency window and
sidebar styles until the last guide closes; the reader's saved display setting is untouched.

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
| `ReaderWrapper.tsx` | Linear Learn chapter wrapper; also handles legacy LeftPage/RightPage markers in standalone guides |
| `guideProse.css` | Shared chapter headings, See also blocks, and reading sizes |
| `postHogInspector.css` | Shared inspector frame, tabs, trees, status, and replay event list |
| `twigGuide.css` | Compact Twig frame and card variants for guide exhibits |
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

### Twig in Product Analytics

The Product Analytics Learn hub previews three paths: an agent prompt, the embedded story, and
the external Twig demo. Its landing page remains a choice page; story chapters render on child
routes under `/docs/product-analytics/learn`, with the Learn tab active and the shared product
sidebar providing chapter navigation. Legacy standalone Pocket Guide URLs redirect to those Learn
routes, and bookshelf covers open the embedded introduction directly.

The Events and properties chapter uses destination filters and `StayCardContent` from the pinned
`@posthog/twig-components` package. `TwigBrowseFigure` shows three destination buttons and one
compact stay card, using local filter state and package photos. The examples place the labeled
Twig view and Inspector side by side in wide containers and stack them in narrow containers.
Reset clears captured events and restarts the automated visitor. The inspectors show event
timestamps separately from custom properties. These examples do not send events to a PostHog
project.

The Identity and sessions chapter uses `SavedStay`, `LoginView`, `SavedStaysView`, and
`ProfileMenu` from the same package. PostHog.com owns the example identifiers, sessions, and
person-linking state around those Twig views. The package does not call `identify`, `reset`, or
capture events.

The Trends and funnels chapter uses `ProductAnalyticsTrendsFunnelsExhibits.tsx` for three small
figures. `FilterUsersTrendFigure` reduces Week 2's 19 filter events to eight people beside a
compact Trends view based on the PostHog insight controls. Edgar's original Forest event, with
its filter, identity, and session fields, is available as a drill-down. The compact time plot compares
five and eight unique users; Edgar's repeated selections still count as one person
in the second week. The drill-down has a caption and keeps its back control inside the Inspector header.
These panels remain side by side; narrow windows show a sideways-scroll cue and snap to each panel.
`BookingStepsFigure` reuses
Twig's `StayCardContent` and shared primary button styling. Once the figure is mostly visible, it waits
three seconds and plays a confirmed request followed by a clearly labeled, separate failed request.
The sequence plays once, with event arrivals in the Inspector. Selecting Book stay pauses
autoplay and switches between the two outcomes; reduced motion starts on the confirmed outcome.
The booking response is simulated locally; it never submits a booking or captures events. `BookingFunnelFigure` pairs the
10-to-six person funnel result with a shared Inspector that opens one of the four drop-offs and
matches its `booking_started` event to a failed simulated response by `request_id`. These are guide-owned teaching fixtures, not
new Twig instrumentation or a live PostHog query. The failed fixture uses `user_409` and
`req-204`; Edgar's confirmed fixture uses `user_812` and `req-203`.

Twig.com owns its pages and instrumentation. The package owns reusable Twig UI, data, styles,
and assets. PostHog.com owns the teaching prose and example data. When the package pin changes,
review the Twig views on both sites at narrow and wide widths, in both themes.
