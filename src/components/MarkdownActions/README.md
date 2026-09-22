# MarkdownActions

A "Copy page" split button that surfaces the raw-markdown version of the current page — for pasting into an
LLM, reading as plain text, or handing straight to ChatGPT/Claude.

```tsx
import MarkdownActions from 'components/MarkdownActions'

<MarkdownActions pageUrl="/docs/feature-flags" className="mb-2 mx-auto max-w-2xl" />
```

It renders as two grouped buttons: a primary **Copy page** (copies the `.md` contents to the clipboard,
flipping to a green check + "Copied" for 2s) and a chevron that opens a `Popover` with **Copy as Markdown**,
**View as Markdown**, **Open in ChatGPT** and **Open in Claude**.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `pageUrl` | `string` | — | The current page path, e.g. `/docs/product-analytics/installation`. |
| `className` | `string` | `''` | Layout/width classes for the wrapper. The component supplies `not-prose flex justify-end`. |

The component owns its own visibility and its own wrapper element — callers never need to guard it.

## Where the markdown comes from

`.md` files are generated at build time in `onPostBuild`, from two separate code paths in
`gatsby/rawMarkdownUtils.ts`:

- `generateRawMarkdownPages` — every MDX page under `MARKDOWN_CONTENT_PATHS`
  (`/docs`, `/handbook`, `/blog`, `/newsletter`), minus an `excludeTerms` list.
- `generateSdkReferencesMarkdown` — `/docs/references/<id>`, which are **not** MDX.

Everything else under `/docs` (API endpoint pages, CDP destinations, warehouse sources, the hand-written
`src/pages/docs/*.tsx` pages) has no `.md` at all.

## Visibility: reserve the slot, then reveal

`useMarkdownUrlExists` does a `HEAD` request, so it cannot answer until after hydration and returns `null`
until it does. The component reserves the control's space for the whole time, and only makes the buttons
visible once the answer is `true`:

- `isMarkdownContentPath(pageUrl)` is false → render nothing at all.
- `exists === null` → wrapper mounted, buttons `invisible`. Space is held, so nothing below shifts.
- `exists === true` → buttons visible.
- `exists === false` → wrapper stays mounted, buttons stay `invisible`.

The point of holding the slot in *every* state is that the control can never be taken away after being
shown. An earlier version rendered the buttons optimistically from a render-time `isMdx` hint and removed
them when the `HEAD` came back 404. That produced a control which appeared on load and deleted itself about
a second later — and if the dropdown happened to be open, it was torn out of the DOM mid-interaction, which
read as the panel flashing and vanishing.

The cost of this shape is a reserved empty slot (roughly one button's height, right-aligned above the title)
on pages under a markdown path that have no generated `.md` — in production that is the `excludeTerms` set,
e.g. `/handbook/teams/*`. That is deliberate: dead space is a much cheaper failure than a control that
disappears while you are clicking it.

`invisible` is `visibility: hidden`, which also takes the buttons out of the tab order and the accessibility
tree while unresolved, so nothing is focusable before it is usable.

### In preview builds the control never appears

`.md` generation runs in `onPostBuild`, which returns early on `GATSBY_MINIMAL === 'true'`
(`gatsby/onPostBuild.ts`). Preview deploys are minimal builds, so **no `.md` files exist there at all** and
every `HEAD` 404s — the control stays invisible for every page. This is expected, not a bug: there is no
markdown to copy in a preview. Verify this control in a full local build or in production.

`HEAD` results are cached in module-level `Map`s, so each URL is checked once per session rather than once
per mount. Under `gatsby develop` no `.md` files exist, so the check is skipped entirely and the optimistic
gate stands — **the copy action will 404 in dev.** To exercise it for real without a full build, drop a file
at `static/docs/<slug>.md`; Gatsby serves `static/` in develop.

## Where it's rendered

`components/ReaderView` renders it at the top of the article content column — after the featured image,
immediately above the `<h1>` — right-aligned and width-matched to the prose column, so its right edge lines
up with the title. It replaced an unlabeled icon button in the ReaderView sidebar footer, which disappeared
whenever the sidebar was collapsed or unpinned, and on mobile.

The label collapses to icon-only below `@sm/reader-content` (a container query — ReaderView's content column
is a `@container`, and every app on the site is resizable, so media queries would be wrong here). Both
buttons carry `aria-label`s since the visible label is `display:none` at narrow widths.
