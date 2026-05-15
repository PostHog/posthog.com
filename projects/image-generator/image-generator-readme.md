# Image generator — implementation

Internal moderator tool at `/image-generator`. Generates social images (event posters today; blog/changelog templates can be added later). Companion to [image-generator.md](image-generator.md), which is the product brief.

## TL;DR

- Standalone page using the `<Explorer />` template, gated to moderators (`useUser().isModerator`).
- State lives entirely in the URL (`?s=<base64-JSON>`), so cross-links from `/events` deeplink straight into a pre-filled session, and any session is shareable.
- Live preview renders a real React component at exact output dimensions (1200×1200 or 1200×630), scaled to fit the viewport via CSS `transform`.
- Download captures the unscaled element with [`html-to-image`](https://github.com/bubkoo/html-to-image) `toJpeg` at the true output resolution.
- Themes derive from the 11 named brand colors in [`tailwind.config.js`](../tailwind.config.js); gradient mode reuses the HSL-shift logic from [`/colors`](../src/pages/colors/index.tsx). The library auto-suggests the closest theme when you pick an art asset.
- Renders client-side only. No build-time Satori, no Strapi write-back in v1.

## Where things live

```
src/components/ImageGenerator/
  index.tsx                       # Top-level: <Explorer /> shell, accordion sidebar, canvas + toolbar
  README.md                       # Per-folder reference for future contributors
  types.ts                        # GeneratorState, Theme, LogoEntry, etc.
  state.ts                        # URL ↔ state encoder/decoder, useGeneratorState, buildGeneratorUrl
  themes.ts                       # Named themes, getThemeStyle, getThemeForeground, suggestThemeFromHex
  Canvas.tsx                      # Fixed-aspect render area; ResizeObserver-driven CSS scale
  Toolbar.tsx                     # Template + aspect toggle, Download button
  controls/
    ThemePicker.tsx               # 11×2 swatch grid (solid + gradient)
    TitleControl.tsx              # Title content (HTML) + max-width %
    TextControl.tsx               # Subtext content (HTML) + max-width %
    ImageControl.tsx              # Source tabs (Person/Library/Upload) + size/X/Y/rotation sliders
    LogosControl.tsx              # Add/remove logos, per-row variant/size, arrangement
    EventControl.tsx              # Event-specific: date, time, calendar toggle
    Slider.tsx                    # Shared range input with label/value display
  sources/
    PersonPicker.tsx              # Squeak profile autocomplete (uses thumb in list, full URL on canvas)
    LibraryBrowser.tsx            # posthog-art-library grid, auto-suggests theme from dominant color
    CloudinaryUpload.tsx          # File input → Squeak upload util
  hooks/
    useDownload.ts                # toJpeg wrapper, filename convention, downloaded/downloading flags
    useCloudinaryUpload.ts        # Wraps Squeak uploadImage util with the user's JWT
    useSqueakProfiles.ts          # Static allSqueakProfile query + match-quality ranking
    useArtLibrary.ts              # Caches /data/index.json from posthog-art-library
  templates/
    index.ts                      # CANVAS_DIMENSIONS, TEMPLATE_LABELS, TEMPLATE_COMPONENTS registry
    event/
      EventBase.tsx               # Reusable slot components: TitleBlock, TextBlock, ImageSlot, CalendarTile, LogoBar, PersonNameBadge
      square.tsx                  # 1200×1200 layout for events
      og.tsx                      # 1200×630 layout for events
      defaults.ts                 # Initial state for the event template
  integrations/
    eventLink.ts                  # buildEventGeneratorUrl(event) — used by /events
src/pages/
  image-generator.tsx             # Page shell + moderator gate
src/navs/
  internalTools.ts                # "Image generator" entry for the internal tools tree
src/components/TaskBarMenu/
  index.tsx                       # "Image generator" entry under the moderator menu
src/pages/
  events.tsx                      # Generate-image OSButton next to edit/delete (state={{newWindow:true}})
```

## State model

```ts
type GeneratorState = {
  template: 'event'
  aspect: 'square' | 'og'
  theme: { name: string; mode: 'solid' | 'gradient' }
  title: { content: string; maxWidth: number }         // HTML, 0–100 %
  text:  { content: string; maxWidth: number }         // HTML, 0–100 %
  image: {
    source: 'person' | 'library' | 'upload' | null
    personId?, personName?, personRole?, personAvatarUrl?
    librarySlug?, libraryUrl?
    uploadUrl?
    size: number      // % of default
    x: number         // px offset (negative = left)
    y: number         // px offset (negative = up)
    rotation: number  // degrees
  }
  logos: LogoEntry[]                                   // unlimited, each independently sized
  logoPlacement: 'overlay' | 'inline'
  logoArrangement: { direction: 'row' | 'col'; gap: number }
  event?: { date?: string; time?: string; showCalendar: boolean }
}
```

URL encoding:

```ts
encodeState(state)  // JSON.stringify → btoa
decodeState(encoded) // atob → JSON.parse, returns null on failure
```

`useGeneratorState()` reads the initial value from `?s=` on first render and writes back to the URL via `window.history.replaceState` on every change (no navigation, so no scroll jump). On SSR it returns `eventDefaults()`.

## Rendering pipeline

1. `<Canvas />` mounts a fixed-size div at the **exact output dimensions** (1200×1200 or 1200×630) and applies a `transform: scale(s)` to fit the viewport. A `ResizeObserver` keeps `s` in sync.
2. The template component (`templates/event/square.tsx` or `og.tsx`) reads from `state` and renders into that fixed-size div via positioned slots from `EventBase.tsx`.
3. On Download, `useDownload.download(canvasRef, state)` calls `toJpeg(canvasRef, { canvasWidth, canvasHeight, quality: 1, pixelRatio: 1, skipFonts: true })`. The ref points at the **unscaled** inner div so the JPEG matches the true output dimensions.
4. Filename convention: `${template}-${aspect}-${slugified-title}.jpeg`.

### Fonts

Two webfonts are used, both already loaded by [`Fonts.css`](../src/components/Layout/Fonts.css):

| Use | Font | Notes |
|---|---|---|
| Title, calendar tile, person name | **Squeak** | Brand display; applied via inline `font-family: Squeak, sans-serif` so `html-to-image` captures it reliably. Single weight (bold). |
| Description text, person name/role badge | **Open Runde** | Body face; via inline `font-family: Open Runde, sans-serif`. Weight 500/600. |

`toJpeg` is called with `skipFonts: true` because the fonts are already loaded into the page — that flag prevents the library from re-fetching and embedding them, which speeds up the export.

### Theme contrast

[`themes.ts`](../src/components/ImageGenerator/themes.ts) exposes:

- `getThemeStyle(theme)` — returns the `backgroundColor` (solid) or `background` (gradient) inline style.
- `getThemeForeground(theme)` — computes the HSL lightness of the base hue and returns `#F54E00` (brand red) when lightness > 65, otherwise `#fff`. The template uses this for the title and person name/role color. Logos pick `mono-white` vs `mono-black` from the same rule in `eventDefaults()`.
- `suggestThemeFromHex(hex)` — finds the closest named theme to an arbitrary color (HSL distance). Used by the library browser to auto-pick a matching theme when you click an asset (uses `colors.dominant[0]` from the art library JSON).
- `pickRandomTheme(seed)` — deterministic per-id pick, used by the events cross-link so the same event always opens with the same default theme.

## Event template layout

Everything except the title/text column is **absolutely positioned**. The title and subtext live in the document flow inside `<div class="absolute inset-0 flex flex-col p-16">`, which lets the optional inline-mode logo bar use `mt-auto` to glue itself to the bottom.

```
┌─────────────────────────────────────────────┐
│  ┌─ TITLE (Squeak, uppercase)               │
│     subtext (Open Runde) ─┐                 │
│                                  ┌── CAL ─┐ │
│                                  │ MAY    │ │
│                                  │   15   │ │
│                                  └────────┘ │
│                                             │
│                          ┌──────────┐       │
│                          │          │       │
│                          │  IMAGE   │       │
│                          │  bleeds  │──────►│
│                          │  -100 px │       │
│                          └──────────┘       │
│                  [Name / Role badge]        │
├─────────────────────────────────────────────┤
│ ░░░░░░░░░░░░ logos (60% white + blur) ░░░░░│
└─────────────────────────────────────────────┘
```

Key slots in [`EventBase.tsx`](../src/components/ImageGenerator/templates/event/EventBase.tsx):

- **`TitleBlock`** — Squeak, uppercase, `letter-spacing: -1`, `line-height: 0.95`. Size set per template (150 square / 88 OG). `maxWidth` is user-adjustable %.
- **`TextBlock`** — Open Runde, weight 600, 46 (square) / 28 (OG), 40px top margin.
- **`CalendarTile`** — absolute top-right, white pill with red header strip (`#F54E00`) containing the month abbreviation; large day number below. Hardcoded red regardless of theme.
- **`ImageSlot`** — absolute bottom-right with negative `right` offset so the image bleeds off the canvas edge. `transform-origin: bottom right` so the user's size/X/Y/rotation sliders all pivot from that anchor. For person sources, the image is unframed (no rounded clip); the name/role badge sits over it.
- **`PersonNameBadge`** — semi-transparent dark pill (`rgba(0,0,0,0.35)`), `rounded-2xl`, Open Runde, format `Name / Role` with a faded slash separator. Positioned just above the logo bar when overlays are on; drops near the bottom when logos are inline.
- **`LogoBar`** — when `logoPlacement === 'overlay'`, full-width strip at the bottom with `background: rgba(255,255,255,0.6)` + `backdrop-filter: blur(20px)`. When `'inline'`, it lives inside the content column with `mt-auto`.

## Cross-link from /events

[`integrations/eventLink.ts`](../src/components/ImageGenerator/integrations/eventLink.ts) exports `buildEventGeneratorUrl(event)`, which:

1. Starts from `eventDefaults()`.
2. Overrides `title`, `event.date`, and `event.time` from the Strapi event record.
3. Picks a theme deterministically from the event id (`event.id % 22`), so re-clicking the button always opens the same default.

[`src/pages/events.tsx`](../src/pages/events.tsx) renders an `<OSButton icon={<IconImage />} asLink to={buildEventGeneratorUrl(...)} state={{ newWindow: true }} />` next to the moderator edit/delete buttons. The `newWindow: true` state tells the window manager to open the link in a fresh window instead of replacing the current one.

## Adding a new template

1. Create `templates/<name>/square.tsx` and `templates/<name>/og.tsx` (each is a regular React component receiving `{ state: GeneratorState }`).
2. Add `templates/<name>/defaults.ts` exporting a `<name>Defaults()` that returns a full `GeneratorState`.
3. Register the template id, label, and components in [`templates/index.ts`](../src/components/ImageGenerator/templates/index.ts). The toolbar template `<select>` is driven by `TEMPLATE_LABELS`, so no other wiring is needed.
4. If the new template needs different control panels, conditionally render them from `index.tsx` based on `state.template`.

The shared slot components in `EventBase.tsx` are reusable across templates if the visual language stays consistent — pull what you need (`TitleBlock`, `TextBlock`, `LogoBar`, etc.) rather than re-implementing.

## Known limitations / explicit punts (v1)

- **No build-time OG generation.** Static images in `/static/images/og/` are unchanged. If you need a per-event OG, generate it in the tool and upload it manually.
- **No Strapi write-back.** Generated images are download-only. Future work: optionally PUT the rendered Cloudinary URL to the event's `ogImage` field.
- **No moderator-first ranking in the person picker.** The public `allSqueakProfile` static query doesn't expose `role`, so results are sorted by match quality (exact → prefix → contains) instead of role. Adding `role` to the Strapi-exposed schema would unblock this.
- **`backdrop-filter` may not fully render in the downloaded JPEG.** `html-to-image` renders the DOM through SVG `foreignObject`; backdrop-filter support depends on the browser. The on-screen preview always looks right; the downloaded file is the place to verify.
- **Type controls are locked.** Title and subtext only expose content + max-width %. Font size/weight/color/alignment are template-level. Templates are opinionated by design.
- **No direct canvas drag.** Image manipulation is sliders-only (size, X, Y, rotation).

## Verification checklist

1. Sign in as a moderator. Open `/image-generator`. Confirm the Explorer-template layout (left sidebar accordions, centered canvas, toolbar with template/aspect/Download).
2. Switch aspect: square ↔ OG. The canvas should swap templates and the URL `?s=` should update.
3. Copy the URL into a new tab — state restores exactly.
4. Person picker: type a teammate's name. Pick one; the larger illustration loads, name/role badge appears.
5. Library tab: browse, click a hedgehog asset. The image loads on the canvas; the theme picker auto-jumps to the closest match.
6. Upload tab: drop an image. Confirm it uploads via the Squeak `uploadImage` util and renders.
7. Logos: add a second logo (paste SVG or upload). Confirm independent sizing. Toggle overlay ↔ inline.
8. From `/events`, click the Generate-image icon next to a moderator event row. New window opens pre-filled.
9. Download. The JPEG should be 1200×1200 or 1200×630 and match the preview.
10. Sign out (or use a non-moderator account). Confirm the gated empty state at `/image-generator`.
