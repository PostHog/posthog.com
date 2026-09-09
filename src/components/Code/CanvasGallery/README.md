# CanvasGallery

Renders `/desktop-gallery`: a gallery of example PostHog Desktop canvases. The filing-desk header shows how an idea and product signals become a canvas. Selecting a swipe file moves it to the front of the stack, where its color continues behind its canvas cards. All canvases opens by default. Investigate is disposable, Monitor is durable, and Present is shareable. Each entry uses an image from the canvas docs, shows the prompt that builds something similar, and hands the prompt to PostHog Desktop with a `posthog-code://new` deep link.

## Files

| File | Purpose |
| --- | --- |
| `index.tsx` | The filing-desk header, swipe-file tabs, card grid, community callout, Desktop call to action, and detail `Modal`. |
| `canvases.tsx` | All content. `SHAPES` describes lifespan, `CATEGORIES` maps a data-model job to one lifespan, and `CANVASES` contains the gallery entries, images, topic tags, and data tools. |

## Add a canvas

1. Add the image to the canvas docs first.
2. Add the image key, topic tags, and data tools to `CANVASES`.
3. `slug` becomes the `?canvas=` query parameter that opens the modal directly.

## Chart rules

- One series per chart. A single series needs no legend; the panel title names it.
- Text uses text tokens (`text-primary`, `text-secondary`, `text-muted`). Only marks carry a series color.
- Status colors (`text-green`, `text-red`, `text-orange`) always come with a label or an icon, never color alone.
- Heatmaps use one hue, light to dark (`bg-blue` with opacity), not a rainbow.

## Deep links

`deepLinkFor(canvas)` builds `posthog-code://new?prompt=…`. PostHog Desktop opens the prompt in the composer.

## Analytics

Every button captures `canvas_gallery_interaction` with `action` (`view_example`, `copy_prompt`, `open_in_desktop`), `canvas`, and `shape`. Copies and Desktop opens per canvas are the success metric for this page.
