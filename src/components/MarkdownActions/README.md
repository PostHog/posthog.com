# MarkdownActions

A "Copy page" split button that surfaces the raw-markdown version of the current page — for pasting into an
LLM, reading as plain text, or handing straight to ChatGPT/Claude.

```tsx
import MarkdownActions from 'components/MarkdownActions'

<MarkdownActions pageUrl="/docs/feature-flags" isMdx className="mb-2 mx-auto max-w-2xl" />
```

It renders as two grouped buttons: a primary **Copy page** (copies the `.md` contents to the clipboard,
flipping to a green check + "Copied" for 2s) and a chevron that opens a `Popover` with **Copy as Markdown**,
**View as Markdown**, **Open in ChatGPT** and **Open in Claude**.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `pageUrl` | `string` | — | The current page path, e.g. `/docs/product-analytics/installation`. |
| `isMdx` | `boolean` | `false` | The caller's render-time hint that this page is MDX. Drives the optimistic gate below. |
| `className` | `string` | `''` | Layout/width classes for the wrapper. The component supplies `not-prose flex justify-end`. |

The component owns its own visibility and its own wrapper element, returning `null` when hidden — callers
never need to guard it, and no empty spacer is left behind.

## Where the markdown comes from

`.md` files are generated at build time in `onPostBuild`, from two separate code paths in
`gatsby/rawMarkdownUtils.ts`:

- `generateRawMarkdownPages` — every MDX page under `MARKDOWN_CONTENT_PATHS`
  (`/docs`, `/handbook`, `/blog`, `/newsletter`), minus an `excludeTerms` list.
- `generateSdkReferencesMarkdown` — `/docs/references/<id>`, which are **not** MDX.

Everything else under `/docs` (API endpoint pages, CDP destinations, warehouse sources, the hand-written
`src/pages/docs/*.tsx` pages) has no `.md` at all.

## Visibility: why the gate is tri-state

```
visible = isMarkdownContentPath(pageUrl) && (exists === true || (exists === null && isMdx))
```

`useMarkdownUrlExists` does a `HEAD` request, so it can only answer after hydration and returns `null` until
then. If we waited for it, the button would never appear in the static HTML and would pop in — a visible
layout shift right above the page title.

So `null` falls back to `isMdx`, which is known at render time. But `isMdx` alone is **not** a superset of
"has a `.md`": SDK reference pages have one and are not MDX. Hence the three states —

- `exists === true` → show, even if `isMdx` is false (catches SDK references).
- `exists === null` → show if `isMdx` (optimistic; ships in static HTML).
- `exists === false` → hide.

The one accepted cost is a page that is MDX under a markdown path but excluded from generation
(`/handbook/teams/*`): the button appears, then disappears when the HEAD resolves.

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
