# Instrumentation

The `/instrumentation` page (`src/pages/instrumentation/`): an interactive explainer that shows what instrumentation is by instrumenting a fake demo site with every PostHog product.

## What it is

One screen, never navigating away: **Unter** (a fictional Uber for hedgehogs) inside a fake browser frame, with a docked column of explanations beside it. Unter has four pages switched by React state, not routes, since the OS window system owns the URL.

The column's nav is a mock of the [PostHog toolbar](/docs/toolbar). **Inspect** starts off, so you first see Unter as its users do; turning it on drops numbered markers on the instrumented elements. Each product button filters those markers, and products with nothing on the current page are disabled.

Selecting a marker expands its explanation, code, and docs link in the column. Selecting one that lives inside a trigger-based widget (the popover survey, which appears after the host signup form is submitted) opens that widget first so the marker has something to point at. That changes layout without resizing either container, so `index.tsx` bumps a `revision` value to force a re-measure.

## Structure

```
index.tsx                   Page/inspect/selection state; lays out frame + sidebar
BrowserFrame.tsx            Fake browser chrome; its body is the query root for targets
unter.css                   ALL Unter styling (un-*), scoped and light-locked
Unter/                      The fake site: four pages plus its own widgets
overlay/
  types.ts                  Annotation and tool types
  tools.ts                  Tool registry: names, colors, icons, docs URLs
  annotations/*.tsx         The content, one file per Unter page
  useAnnotationPositions.ts Measures marker positions per layout change
  MarkerLayer.tsx           Numbered markers + selection outline
  AnnotationSidebar.tsx     The docked column
  ToolbarBar.tsx            Toolbar mock: Inspect, per-tool filtering, reset
```

## Constraints worth knowing before editing

- **No `position: fixed`.** Pages render inside draggable, `overflow-hidden` OS windows, so the survey and toolbar are `absolute` inside the frame body.
- **Container queries only.** `.unter-frame` is a named container (`container-name: unter`) that all Unter CSS queries; the page layout uses Tailwind `@container` classes. No viewport media queries.
- **Markers render inside the element they were measured against**, so they move with their target for free. An earlier version tracked them with a `requestAnimationFrame` loop against the viewport; it jittered and drifted. Don't reintroduce it. Targets pinned to the frame rather than the scrolling page (the sticky nav, the survey) are measured against the frame and returned separately.
- **Stacking is a layer order, not per-element `z-index`:** scrolling content (`z-20` wrapper) < the survey popover (`z-25`) < markers for sticky and frame-pinned targets (`z-30`). A marker layer can only paint as high as its container allows, so raising `z-index` on a marker itself does nothing. Content markers sit below Unter's sticky nav (`z-40`) deliberately, so a marker scrolling under the header is clipped by it.
- **Unter is deliberately not PostHog-styled**, because it's someone else's website. `unter.css` is scoped under `.unter-root` and light-locked (literal colors, no semantic tokens) so the site theme can't bleed in. The PostHog-side UI is the opposite: semantic tokens, `OSButton`, `ScrollArea`, `@posthog/icons`.
- **Tool colors are literal hex** in `tools.ts`, applied inline, because `productData` stores token names and Tailwind can't JIT dynamic `bg-${color}` classes. Each entry names the token it came from, so drift is checkable.
- **They're "tools", not "products".** Error tracking, session replay and the rest are tools; "products" means the interfaces you reach them through (web, MCP, Slack, desktop).
- **Docs links use `disablePrefetch externalNoIcon`** on `components/Link`, which opens a real browser tab. Both props are needed: `Link` picks GatsbyLink vs `<a>` from the URL alone, so `disablePrefetch` is what gets an anchor and `externalNoIcon` is what puts `target="_blank"` on it. `state={{ newWindow: true }}` opens an OS window on top of the demo instead, which interrupts whoever is exploring it. Check docs URLs resolve: several plausible ones (`/docs/cohorts`, `/docs/error-tracking/source-maps`) don't exist.
- **`showAddressBar={false}` on the `Explorer`.** It defaults on and renders a category `<Select>`; with no `selectOptions` it's an empty, unclickable dropdown.

## Adding an annotation

1. Put `data-unter-id="my-target"` on the Unter element.
2. Add an entry to the right `overlay/annotations/*.tsx`:
   - `target`: that `data-unter-id`. `dx`/`dy`: fractional position within the target's box (0–1; outside that range sits outside the element, e.g. `dy: 1.15` is just below). Avoid negative values on full-width elements, or the marker lands outside the frame.
   - `tool`: a key from `tools.ts`, which drives color, icon, and docs link.
   - `body`: `{ why, code?: { language, snippet }, after? }`. The column is ~384px, so keep snippet lines short. Explain the mechanic in `why`; jokes belong in `after`.

Marker numbers, sidebar rows, and filter counts all derive from the same array, so ordering is automatic.
