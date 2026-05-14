# ImageGenerator

An abstracted, in-browser image generator at `/image-generator` (moderators only). The first consumer is the **event poster** template; the architecture is set up for additional templates (blog, changelog, etc.).

## How it works

- State (`GeneratorState`) lives in the URL via the `?s=` query param (base64-encoded JSON), so links are shareable and deeplinkable.
- The live preview renders a real React component at exact output dimensions (1200×1200 square or 1200×630 OG), scaled to fit the viewport.
- Download uses [`html-to-image`](https://github.com/bubkoo/html-to-image) `toJpeg` against the unscaled element, mirroring the approach in [`RoadmapForm`](../RoadmapForm/index.tsx).
- Themes derive from the named Tailwind brand colors in [`tailwind.config.js`](../../../tailwind.config.js); the gradient mode reuses the HSL-shift logic from [`src/pages/colors/index.tsx`](../../pages/colors/index.tsx).

## Directory layout

| Path | Purpose |
|---|---|
| `index.tsx` | Top-level component (Explorer template, left-sidebar controls, canvas, toolbar). |
| `types.ts` | `GeneratorState` and related types. |
| `state.ts` | URL ↔ state encoder/decoder, `useGeneratorState`, `buildGeneratorUrl`. |
| `themes.ts` | Theme list, `getThemeStyle`, `suggestThemeFromHex`, `pickRandomTheme`. |
| `Canvas.tsx` | Fixed-aspect render area; auto-scales preview, forwards ref to download. |
| `Toolbar.tsx` | Template + aspect selector, Download button. |
| `controls/` | Accordion control panels (Theme, Title, Text, Image, Logos, Event). |
| `sources/` | Pickers for the image slot: PersonPicker (Strapi profiles), LibraryBrowser (posthog-art-library), CloudinaryUpload. |
| `hooks/` | `useDownload`, `useCloudinaryUpload`, `useSqueakProfiles`, `useArtLibrary`. |
| `templates/event/{square,og}.tsx` | The first template, one component per aspect. |
| `templates/index.ts` | Template registry — add new templates here. |
| `integrations/eventLink.ts` | Builds a pre-filled `/image-generator?s=...` URL from an event record. Used by [`src/pages/events.tsx`](../../pages/events.tsx). |

## Adding a new template

1. Create `templates/<name>/square.tsx` and `templates/<name>/og.tsx` (a component per aspect).
2. Add a `templates/<name>/defaults.ts` that returns a `GeneratorState`.
3. Register the template id, label, and components in `templates/index.ts`.
4. Add a new option to the template `<select>` in `Toolbar.tsx` automatically (driven by `TEMPLATE_LABELS`).

## Out of scope (v1)

- Saving generated images back to Strapi records (download-only).
- Build-time OG image generation (Satori). Static fallbacks in `/static/images/og/` are unchanged.
- Per-block font controls — templates are opinionated. Only content + max-width are editable.
- Direct canvas drag/resize. Use sliders.
- "Moderator-first" ranking in the person picker — the public `allSqueakProfile` static query does not expose role. Sorting is by match quality.
