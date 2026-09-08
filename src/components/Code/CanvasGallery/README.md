# CanvasGallery

Renders `/desktop/canvases`: a gallery of example PostHog Desktop canvases. Each entry runs a small React demo on dummy data, shows the prompt that builds something similar, suggests a model, and hands the prompt to PostHog Desktop with a `posthog-code://new` deep link.

## Files

| File | Purpose |
| --- | --- |
| `index.tsx` | The gallery: shape filter cards, the card grid, and the detail `Modal`. |
| `canvases.tsx` | All content. `SHAPES` describes the three canvas shapes, `MODELS` the two suggested models, `CANVASES` the gallery entries. Add a canvas here. |
| `primitives.tsx` | Shared demo parts: `CanvasFrame`, `Panel`, `Stat`, `Sparkline`, `Bars`, the seeded random generator, and `useTick`. |
| `demos/*.tsx` | One file per shape. Each export is a demo component that renders inside `CanvasFrame`. |

## Add a canvas

1. Write a demo component in the `demos/` file for its shape. Wrap it in `<CanvasFrame title="…">`. Use container queries (`@sm`, `@md`) because the same component renders at card size (about 220 px tall) and in the modal (about 440 px tall).
2. Use `seeded()` or `series()` for dummy values. Never call `Math.random()` in render: the server and the client must produce the same markup.
3. Use `useTick(ms)` for anything that changes over time. It returns `0` on the server and stays at `0` for people who prefer reduced motion.
4. Add an entry to `CANVASES`. `slug` becomes the `?canvas=` query parameter that opens the modal directly.
5. Pick the model: `cheap` for tables and stat tiles, `strong` for animation or layout that has to fit a projector.

## Chart rules

- One series per chart. A single series needs no legend; the panel title names it.
- Text uses text tokens (`text-primary`, `text-secondary`, `text-muted`). Only marks carry a series color.
- Status colors (`text-green`, `text-red`, `text-orange`) always come with a label or an icon, never color alone.
- Heatmaps use one hue, light to dark (`bg-blue` with opacity), not a rainbow.

## Deep links

`deepLinkFor(canvas)` builds `posthog-code://new?prompt=…&model=…`. PostHog Desktop ignores a `model` value it does not know, so the ids in `MODELS` must match the app's model catalogue.

## Analytics

Every button captures `canvas_gallery_interaction` with `action` (`open_live`, `copy_prompt`, `open_in_desktop`), `canvas`, `shape`, and `model`. Copies and desktop opens per canvas are the success metric for this page.
