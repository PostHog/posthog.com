# CanvasGallery

Renders `/desktop-gallery`: a gallery of example PostHog Desktop canvases. The filing-desk header shows how an idea and product signals become a canvas. Selecting a swipe file moves it to the front of the stack, where its color continues behind its canvas cards. All canvases opens by default. Investigate is disposable, Monitor is durable, and Present is shareable. Each entry runs a small React demo on dummy data, shows the prompt that builds something similar, and hands the prompt to PostHog Desktop with a `posthog-code://new` deep link.

## Files

| File | Purpose |
| --- | --- |
| `index.tsx` | The filing-desk header, swipe-file tabs, card grid, community callout, Desktop shameless CTA, and detail `Modal`. |
| `canvases.tsx` | All content. `SHAPES` describes lifespan, `CATEGORIES` maps a data-model job to one lifespan, and `CANVASES` contains the gallery entries, topic tags, and data tools. Add a canvas here. |
| `primitives.tsx` | Shared demo parts: `CanvasFrame`, `Panel`, `Stat`, `Sparkline`, `Bars`, the seeded random generator, and `useTick`. |
| `demos/*.tsx` | One file per shape. Each export is a demo component that renders inside `CanvasFrame`. |

## Add a canvas

1. Write a demo component in the `demos/` file for its shape. Wrap it in `<CanvasFrame>`. Use container queries (`@sm`, `@md`) because the same component renders at card size (about 220 px tall) and in the modal (about 440 px tall).
2. Use `seeded()` or `series()` for dummy values. Never call `Math.random()` in render: the server and the client must produce the same markup.
3. Use `useTick(ms)` for anything that changes over time. It returns `0` on the server and stays at `0` for people who prefer reduced motion.
4. Add an entry to `CANVASES`. Add its topic tags and data tools. `slug` becomes the `?canvas=` query parameter that opens the modal directly.

## Chart rules

- One series per chart. A single series needs no legend; the panel title names it.
- Text uses text tokens (`text-primary`, `text-secondary`, `text-muted`). Only marks carry a series color.
- Status colors (`text-green`, `text-red`, `text-orange`) always come with a label or an icon, never color alone.
- Heatmaps use one hue, light to dark (`bg-blue` with opacity), not a rainbow.

## Deep links

`deepLinkFor(canvas)` builds `posthog-code://new?prompt=…`. PostHog Desktop opens the prompt in the composer.

## Analytics

Every button captures `canvas_gallery_interaction` with `action` (`open_live`, `copy_prompt`, `open_in_desktop`), `canvas`, and `shape`. Copies and Desktop opens per canvas are the success metric for this page.
