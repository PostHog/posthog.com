# CanvasGallery

Renders `/desktop-gallery`: a gallery of example PostHog Desktop canvases. The filing-desk header shows how an idea and product signals become a canvas. The swipe files have an overlapping stack, staggered tabs, and aligned outer edges. Each bordered swipe file is an accordion. It expands its own canvas files in place, without changing the folder order. Any number of folders can stay open at once, and each folder closes independently. Category folders start directly with their canvas thumbnail files. Query data opens by default. Each canvas appears in one of the three folders. Each entry uses an image from the canvas docs, shows the prompt that builds something similar, and hands the prompt to PostHog Desktop with a `posthog-code://new` deep link.

## Files

| File | Purpose |
| --- | --- |
| `index.tsx` | The filing-desk header, swipe-file accordions, thumbnail file grid, community callout, Desktop call to action, and detail `Modal`. |
| `canvases.tsx` | All content. `CATEGORIES` describes the three jobs a canvas does, and `CANVASES` contains the gallery entries, images, data tools, and connectors. |

## Add a canvas

1. Add the image to the canvas docs first.
2. Add the image key to `CANVASES`, with every PostHog tool and connector the canvas reads.
3. `slug` becomes the `?canvas=` query parameter that opens the modal directly.

## Categories

`category` is the job a canvas does, and it decides the swipe file the canvas files under. It is the only taxonomy on this page. An earlier version also gave each canvas a lifespan (disposable, durable, shareable); that is gone, because the job is what a reader chooses by.

## Prompt style

A prompt is the product of this page, so write it as instructions you would want to receive. Four parts, in order: the goal and the decision it serves, the data with any term that needs a definition, the layout by section, then the details — edge cases, exclusions, what to state on the canvas, and what to do when the data will not support the question. Name the events and tables to read, but let the agent discover the specifics.

## Tool chips

`CanvasTool` holds handles from `src/data/tools.ts`. The chip takes its name and page from `getTool(handle)` and links to `/${slug}`, so a canvas can name the capability it leans on (`funnels`, `retention`) and not only the product. Only the icon and color live in `canvasToolInfo`. `toolSlugOverrides` covers handles with no product page. Check the page resolves before you add a handle: some slugs in `tools.ts` have no page (`trends`).

## Canvas files

Each folder renders the CanvasFiles thumbnail grid. Files use their canvas image and title with a visual `.canvas` extension, without a repeated type label. A single click, Enter, or Space opens the existing detail modal and its prompt actions. Container queries adjust the grid from two to four columns.

File paper mixes 30% of its containing folder color with the theme background; folded corners use 55%. Hover keeps the folder background visible and underlines the filename. Keyboard focus retains its visible ring.

## Folder interaction

The gallery uses the shared Radix accordion item, trigger, and content components. Triggers support Enter, Space, arrow keys, Home, and End. Each trigger reports its expanded state and controls its own content region. The pointer target follows the same SVG outline as the visible folder, so the transparent area beside a tab does not intercept clicks on the folder behind it. A shadow follows the folder silhouette. Reduced motion disables the content animation. The hero has no card background. The folders overlap outside a shared panel, with aligned outer edges, rounded corners, and container queries.

## Folder colors

`folderTones` holds a light and a dark value per swipe file, because the colors go on inline styles and an SVG `fill`, where a `dark:` class cannot reach. `useFolderTone()` picks one from `siteSettings.theme`. Light is warm paper. Dark uses muted sage, slate blue, and mauve, with low saturation. Folder outlines mix the folder color with 35% primary text color in light mode and 40% in dark mode so the tab and body edges remain clear. Keep each folder distinct from the others and from the page background, and keep the label readable on top.

## Community callout

The Discord callout uses the existing Discorder achievement sticker as decorative art. The shared OSButton has local spacing overrides to leave room between its Discord icon, label, and external arrow. Container queries move the button below the copy in narrow windows.

The final folder has a padded footer with “CNVS | #3” on the left and a monochrome PostHog SVG directly to the left of a subtle, embossed-style “CONFIDENTIAL: DO NOT LEAK” stamp on the right. All footer elements inherit the same color. The footer stays visible when the folder is closed and wraps in narrow windows.

## Chart rules

- One series per chart. A single series needs no legend; the panel title names it.
- Text uses text tokens (`text-primary`, `text-secondary`, `text-muted`). Only marks carry a series color.
- Status colors (`text-green`, `text-red`, `text-orange`) always come with a label or an icon, never color alone.
- Heatmaps use one hue, light to dark (`bg-blue` with opacity), not a rainbow.

## Deep links

`deepLinkFor(canvas)` builds `posthog-code://new?prompt=…`. PostHog Desktop opens the prompt in the composer.

## Analytics

Every button captures `canvas_gallery_interaction` with `action` (`view_example`, `copy_prompt`, `open_in_desktop`), `canvas`, and `category`. Copies and Desktop opens per canvas are the success metric for this page.
