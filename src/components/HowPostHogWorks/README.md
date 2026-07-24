# HowPostHogWorks

The `/how-posthog-works` page: an interactive explainer that teaches what instrumentation is (and what PostHog does) by showing every product instrumented on a fake demo website.

## What it is

**Snuffl** is a fictional Uber-style rideshare app for hedgehogs, rendered inside a fake browser frame. It has three SPA-style pages (Ride, Open your highway, Safety) switched with React state — no real routes, since the OS window system owns the URL.

On top of it sits the **instrumentation overlay**: a toggle pill reveals color-coded pins anchored to live page elements. Each pin opens a popover explaining which PostHog product instruments that element, why, and the code behind it. A legend (top right) filters pins by product.

## Structure

```
index.tsx                   Intro bar + BrowserFrame + ScrollArea + SnufflSite + InstrumentationOverlay
BrowserFrame.tsx            Fake browser chrome; its body is the overlay's coordinate stage
snuffl.css                  ALL Snuffl visual styling (sn-*) + overlay chrome (hpw-*)
Snuffl/                     The fake site (pages, widgets, inline SVG art)
overlay/
  types.ts                  Annotation/product types
  products.ts               Product registry: names, PostHog brand colors (literal hex), icons, docs URLs
  annotations/{ride,highway,safety}.tsx   The pin content, one file per Snuffl page
  useAnchorTracking.ts      The rAF loop that glues pins/outline/popover to their anchors
  InstrumentationOverlay.tsx  Stage + toggle + legend + chips + popover, state owner
  TogglePill.tsx Legend.tsx Chip.tsx AnnotationPopover.tsx
```

## Design constraints (why it's built this way)

- **No `position: fixed` anywhere.** Pages render inside draggable, `overflow-hidden` OS windows, so everything floating (toggle, legend, chips, popover, chat widget, survey) is `absolute` inside the browser-frame body.
- **Snuffl is deliberately not PostHog-styled** — it's "someone else's website", so the overlay pops against it. Its styling lives in `snuffl.css`, scoped under `.snuffl-root` and light-locked (`color-scheme: light`, literal colors only, no semantic tokens) so the site theme can't bleed in. The mockup's off-scale pixel sizes live in real CSS instead of arbitrary Tailwind values.
- **Container queries only.** `.snuffl-frame` is a named CSS container (`container-name: snuffl`); all Snuffl/overlay responsiveness queries it. No viewport media queries.
- **Product colors are literal hex** (in `products.ts`, provenance commented) applied via inline styles, because Tailwind can't JIT dynamic `bg-${color}` class names.
- **Anchor tracking is one rAF pass** (`useAnchorTracking.ts`) writing transforms straight to DOM nodes — no per-frame React state. Both stage and target rects are read in viewport space, so scrolling, window drags, and resizes all cancel out without listeners. The loop only runs while the overlay is on, and pauses when the tab is hidden.
- **The popover is custom, not Radix** — Radix portals to `<body>` with no collision boundary, which escapes the window clipping model.

## Adding an annotation

1. Put `data-snuffl-id="my-target"` on the Snuffl element to annotate.
2. Add an entry to the right `overlay/annotations/*.tsx` file:
   - `target`: the `data-snuffl-id` value; `dx`/`dy`: fractional position of the pin within the target's rect (0–1; values outside that range sit outside the element, e.g. `dy: 1.15` is just below).
   - `product`: a key from `products.ts` (drives pin color, chip tag, popover pill, legend row, docs link).
   - `body`: `{ why, code?: { language, snippet }, after? }` — JSX prose around a `SingleCodeBlock` snippet.

Everything else (chip, dot, legend counts, filtering, popover) is derived.
