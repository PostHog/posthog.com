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
| `<Frontispiece />` | The volume's cover hoggie, for its title page |
| `<Fig n caption legend>` | Any exhibit, in a numbered frame |
| `<ScreenshotFigure n caption product screenshot set>` | A screenshot a product page already ships, framed as a figure |
| `<ReportFigure n caption legend>` | This use case's report, drawn as its inbox moment |
| `<ScoutFigure n caption>` | This use case's `SKILL.md` |
| `<LoopFigure n caption>` | The self-driving loop diagram |
| `<PersonsModalFigure n caption count>` | The persons modal behind a funnel step, in miniature |
| `<TriggerGroupFigure n caption>` | The app's trigger group form, in miniature |
| `<RedirectLoopFigure n caption>` | The redirect trap, animated on a CSS timeline |
| `<Watches />` | The signal sources from this page's `watches` frontmatter |
| `<Enable />` | The one-click CTA – the book's only real button |
| `<Setup subcommand="…" />` | The wizard install command, copyable – for a volume's prerequisite |
| `<Contents />` | The contents list, built from the book itself |
| `<SeeAlso>` | A print footnote at the foot of the column |
| `<Term name="scout">` | An orange dotted-underline definition with a hover card |
| `<ViewRecordings />` / `<ViewRecording />` | An app button drawn inline in a sentence (UIButton.tsx) |
| `<AskAI q="…" />` | A question linked straight into PostHog AI, drawn as a control |
| `<ScannerTemplate name template type asks answers property>` | A Replay Vision template, linked into the editor pre-filled |

Headings map to the book's type scale: `#` is the page title, `##` a small-caps section heading.

### Reusing a product page's screenshots

A figure doesn't have to be drawn. `<ScreenshotFigure>` resolves an image – light, dark, alt text,
and any named annotation sets – from `useProducts`, so the book cites the same asset the marketing
page uses instead of keeping its own copy of a URL:

```mdx
<ScreenshotFigure
    n={1}
    product="session_replay"
    screenshot="overview"
    set="dev-tools"
    caption="The player, with the DevTools panel synced to the timeline."
/>
```

`screenshot` is a key in that product hook's `screenshots` object; `set` is a named annotation set
stored on it (`screenshots.overview.annotations['dev-tools']`). The figure draws the image itself
and places the book's own `FigureMarker` at each set coordinate – not the product pages' annotator,
whose ringed pins and separate key belong to a different surface. Omit `set` for a plain image, and
use the figure's own `legend` instead. Annotation coordinates are authored with the internal tool
at `/image-annotator` – see `components/ImageAnnotations/README.md` for the product-page component
that reads the same sets.

Check the asset before you cite it. Product pages carry hero crops as well as full screenshots –
`session_replay`'s `overview` is 1052×1374 because it's pinned to the corner of a hero and clipped
by it, which in a figure frame reads as a tall, badly cropped image. Landscape screenshots with a
`srcDark` variant (`home`, `filters`, `technical-context`) are the ones that frame well.

Annotation sets are authored against one image, so its coordinates don't transfer to another
screenshot of the same surface. Without a set, the figure's own `legend` does that job.

Nothing renders if the key doesn't resolve, so a renamed screenshot drops the figure rather than
printing an empty frame. Drawn figures are still the right answer for anything no screenshot shows
(a funnel, a schedule, a loop) – see `figures.tsx`.

### How the reader lays a page out

Every page is one linear scroll. `ReaderWrapper` (ReaderWrapper.tsx) re-orders the compiled
elements by their `mdxType` and `n` props at render time: each figure is embedded after the
first block that cites it via `<SeeFig>`, and a figure nobody cites prints at the end of the
page. One exception: a figure-less page authored as two pages – the volume's front matter –
renders `<LeftPage>` and `<RightPage>` as two columns at reading widths.

### Figure markers, and what phones get instead

Every annotated figure – an anatomy diagram, an annotated screenshot – numbers its parts with
`FigureMarker` (FigureMarker.tsx). A marker takes a `label` and a `gloss`, opens them on hover or
tap, and registers them with the enclosing `<Fig>`.

That registration is what makes the figures work without hover. At reading widths the markers
fade in on figure hover and their gloss appears in place, with `<AnatomyHint />` inviting it.
Below ~672px of container width there is no hover, so instead the markers stay visible and the
figure prints every gloss as a numbered key under the exhibit, matching the numbers on it.
Nothing to configure: use `FigureMarker` inside a `<Fig>` and both behaviors come with it.

Markers over an image pass `visibility="always"` – there they anchor a spot rather than label a
part, so one hidden until hover would leave nothing to find.

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
Only inline ones – `<Term>` and `<SeeFig>` – need to stay mid-sentence. Cite a figure the way the
guides already do (`The whole system is <SeeFig n={1} />`), never as `<SeeFig n={1} /> is the…`:
the leading tag drops the rest of the paragraph out of the prose map, so it renders as a bare
text node in the container's default black – invisible in dark mode.

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
| `bookComponents.tsx` | Assembles the MDX vocabulary from the files below |
| `ReaderWrapper.tsx` | The figure-interleaving MDX wrapper + LeftPage/RightPage markers |
| `figures.tsx` | Fig and every `<XxxFigure>` exhibit |
| `bookPieces.tsx` | SeeFig, Eyebrow, Watches, Enable, Contents, SeeAlso, prose styling |
| `bookContext.tsx` | EntryProvider + useEntry/useTemplate (page data for figures) |
| `bookModel.tsx` | Reading order, page numbers, tabs, arrow-key turns |
| `Figure.tsx` | A framed, captioned exhibit – "Fig. 1 – …" |
| `FigureMarker.tsx` | The numbered marker every figure annotates with, and its narrow-reader key |
| `AnatomyFrame.tsx` | The shell every annotated miniature shares: hover scope, @container, entrance fade |
| `InboxFigure.tsx` | One use case's inbox moment, annotated |
| `ReportAnatomy.tsx` / `ReportDetailAnatomy.tsx` | The inbox card and its opened detail view, in miniature |
| `PersonsModal.tsx` / `TriggerGroupForm.tsx` | App surfaces drawn in miniature for the replay volume |
| `RedirectLoop.tsx` | The redirect trap, animated in CSS |
| `UIButton.tsx` | App controls drawn inline in a sentence, plus AskAI and ScannerTemplate links |
| `volumeArt.tsx` | One hoggie per volume, shared by the shelf cover and the title page |

Volume metadata lives in `src/constants/pocketGuides.ts` (data-only so `gatsby/` can import it).
The report frontmatter contract and the `.md` agent-mirror constraints are documented in
`components/SelfDrivingInbox/README.md`.

**Adding a frontmatter field** needs a matching declaration in
`gatsby/createSchemaCustomization.ts` plus `pnpm clean` – Gatsby won't infer fields that only some
pages declare.
