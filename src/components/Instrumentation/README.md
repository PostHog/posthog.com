# Instrumentation

The `/instrumentation` page (`src/pages/instrumentation/`): an interactive explainer that shows what instrumentation is by instrumenting a fake demo site with every PostHog tool.

## What it is

One screen, never navigating away: **Unter** (a fictional Uber for hedgehogs) inside a fake browser frame, with a docked column of explanations beside it. Unter has four pages switched by React state, not routes, since the OS window system owns the URL.

The column's nav is a mock of the [PostHog toolbar](/docs/toolbar). **Inspect** starts off, so you first see Unter as its users do; turning it on drops numbered markers on the instrumented elements. Each tool button filters those markers, and tools with nothing on the current page are disabled.

Selecting a marker expands its explanation, code, and docs link in the column. The demo's survey is toggled by a "Quick survey" badge on the footer's top edge, not on a timer, so it never covers what you're reading. Its annotation points at that badge rather than at the popover, which keeps the marker on the page whether the survey is open or not. Opening it changes layout without resizing either container, so `index.tsx` bumps a `revision` value to force a re-measure.

Page navigation exists twice on purpose. Unter has its own nav inside the frame, and the sidebar repeats it as a switcher carrying per-page touchpoint counts (`Shuffle 16 · Host 9 · Help 4 · Safety 9`). Readers watch the column, and the demo's own nav was easy to miss; the counts are the part that says there's something on the other pages worth going to. Both navs call the same `onNavigate`, so they can't disagree about which page is open.

Most tools are also instrumented on more than one page, so two further hints point at the rest: the line under a filtered list, and the tooltip on a grayed-out tool button. Both come from one `elsewhere` map in `index.tsx`, which names pages with Unter's own nav labels (`NAV_ITEMS`) so a hint says exactly what there is to click.

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
  ToolbarBar.tsx            Toolbar mock: Inspect and per-tool filtering
```

## Constraints worth knowing before editing

- **No `position: fixed`.** Pages render inside draggable, `overflow-hidden` OS windows, so the survey and toolbar are `absolute` inside the frame body.
- **Container queries only.** `.unter-frame` is a named container (`container-name: unter`) that all Unter CSS queries; the page layout uses Tailwind `@container` classes. No viewport media queries.
- **Markers render inside the element they were measured against**, so they move with their target for free. An earlier version tracked them with a `requestAnimationFrame` loop against the viewport; it jittered and drifted. Don't reintroduce it. Targets pinned to the frame rather than the scrolling page (the sticky nav, the survey) are measured against the frame and returned separately.
- **Stacking is a layer order, not per-element `z-index`:** scrolling content (`z-20` wrapper) < the survey popover (`z-25`) < markers for sticky and frame-pinned targets (`z-30`). A marker layer can only paint as high as its container allows, so raising `z-index` on a marker itself does nothing. Content markers sit below Unter's sticky nav (`z-40`) deliberately, so a marker scrolling under the header is clipped by it.
- **Unter is deliberately not PostHog-styled**, because it's someone else's website. `unter.css` is scoped under `.unter-root` and light-locked (literal colors, no semantic tokens) so the site theme can't bleed in. That's about styling, not glyphs: Unter's icons come from `@posthog/icons` like everywhere else in the repo, sized and colored by `.un-*` CSS. Don't hand-roll SVGs for it. What Unter skips is the design system, so no `OSButton`, no `ScrollArea`, no semantic color tokens.
- **Tool colors are Tailwind tokens, never hex.** Each tool names a palette token (`color: 'blue'`) and `TOOL_CLASSES` in `tools.ts` maps it to full class strings (`bg-blue`, `text-blue`, `border-blue bg-blue/10`). They're spelled out because the JIT scans source text and can't resolve `bg-${color}`; this is the pattern `components/Glow` uses. Don't substitute hexes: `AI/TerminalFeatures.tsx` did, and its `orange` is now actually the `red` token.
- **They're "tools", not "products".** Error tracking, session replay and the rest are tools; "products" means the interfaces you reach them through (web, MCP, Slack, desktop).
- **Docs links use `disablePrefetch externalNoIcon`** on `components/Link`, which opens a real browser tab. Both props are needed: `Link` picks GatsbyLink vs `<a>` from the URL alone, so `disablePrefetch` is what gets an anchor and `externalNoIcon` is what puts `target="_blank"` on it. `state={{ newWindow: true }}` opens an OS window on top of the demo instead, which interrupts whoever is exploring it. Check docs URLs resolve: several plausible ones (`/docs/cohorts`, `/docs/error-tracking/source-maps`) don't exist.
- **`showAddressBar={false}` on the `Explorer`.** It defaults on and renders a category `<Select>`; with no `selectOptions` it's an empty, unclickable dropdown.
- **Pass a stable array to `useAnnotationPositions`** (`NO_ANNOTATIONS` when inspect is off). The hook re-measures whenever its annotation array changes identity and re-measuring sets state, so an inline `[]` is a 60fps render loop in the state the page loads in.
- **Unter's clickable-looking cards are real `<button>`s.** They were `<div>`s with `cursor: pointer`, unreachable by keyboard, while markers claimed clicking them fired events. A `<button>` can't contain block content, which is why the tier and app cards use `<span>` + `un-*-name` / `un-*-desc` classes rather than `<h3>` / `<p>`.
- **Anything the demo shows conditionally needs its trigger gated the same way.** The survey popover used to be `display: none` below a 680px frame while its badge stayed clickable, so the badge did nothing and the badge's marker went missing from a count that still included it.

## Adding an annotation

1. Put `data-unter-id="my-target"` on the Unter element. Target whatever the annotation is really about: if a feature flag hides a whole section, mark the section, not its button, since the selection outline is what shows the scope.
2. Add an entry to the right `overlay/annotations/*.tsx`:
   - `target`: that `data-unter-id`. `dx`/`dy`: fractional position within the target's box (0–1; outside that range sits outside the element, e.g. `dy: 1.15` is just below, `dx: 0` straddles the left edge). Avoid negative values on full-width elements, or the marker lands outside the frame. Fractions scale with the box, so on wide targets check the marker at more than one window width: `dx: 0.315` on the nav sat in empty space at one size and on top of a link at another.
   - `tool`: a key from `tools.ts`, which drives color, icon, and docs link.
   - `body`: `{ why, code?: { language, snippet }, after? }`. The column is ~384px, so keep snippet lines short.
3. Write it like docs, not like copy. The `title` should say what the tool does ("Source maps make stack traces readable"), not be oblique about it ("Why the stack trace is readable"). `why` states the mechanic in plain language; `after` gives the practical consequence. A joke is fine once the point has landed, but it can't be doing the explaining.

Marker numbers, sidebar rows, and filter counts all derive from the same array, so ordering is automatic.
