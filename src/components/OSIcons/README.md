# OSIcons

Desktop OS-style icons used across the site.

## GlassIcon

Renders a single silhouette `path` as a frosted-glass icon — translucent white frost over a backdrop blur, hairline borders, and soft drop shadows. This is the shared treatment for all desktop icons, so the whole icon (the house, the clapperboard, etc.) _is_ the glass shape.

### Usage

```tsx
import { GlassIcon } from 'components/OSIcons'
import { HOME_SILHOUETTE, DEMO_SILHOUETTE, DEMO_THUMBNAIL } from 'components/OSIcons/glyphs'

// Minimal — just pass a silhouette path
<GlassIcon path={HOME_SILHOUETTE} />

// With an externally-hosted image clipped inside the shape (e.g. demo.mov)
<GlassIcon path={DEMO_SILHOUETTE} image={DEMO_THUMBNAIL} fillOpacity={0.2} />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `path` | `string` | **required** | Glyph fill `d`, authored in the 36-unit design canvas (or a frame matching `viewBox`) |
| `viewBox` | `string` | `"0 0 36 36"` | SVG viewBox — the 36×36 design canvas. Pass a matching one for glyphs exported in another frame (e.g. self-driving's `"0 0 33 31"`) |
| `fillRule` | `'nonzero' \| 'evenodd'` | `'nonzero'` | Use `evenodd` for glyphs with cut-out holes (e.g. the skills slash) |
| `image` | `string` | — | Externally-hosted image rendered inside the silhouette (clipped to it) |
| `fillOpacity` | `number` | `0.5` | Glass frost opacity; lower it when an `image` should show through |
| `blur` | `number` | `1.3` | Backdrop blur radius in px (≈ the export's blur at 36px) |
| `glowColor` | `string` | `#53FFCB` | Hover glow color |
| `className` | `string` | — | Additional classes on the wrapper (size is `size-9` / 36px by default) |
| `children` | `ReactNode` | — | Arbitrary SVG content clipped into the shape (under the glass fill) |

### How it works

- **Backdrop blur (frost)**: a plain HTML `<div>` with `backdrop-filter`, clipped to the silhouette via an `objectBoundingBox` clipPath (so it scales with the icon). It must be an HTML element, **not** an SVG `<foreignObject>` — browsers refuse to render `backdrop-filter` inside `foreignObject`, which silently drops the frost and leaves a flat shape. The SVG uses the default `preserveAspectRatio` (`xMidYMid meet`) so non-square glyphs aren't distorted; the frost clip uses the **same** aspect-preserving mapping (`scale 1/max(vbW,vbH)`, centered) so the two stay aligned.
- **Constant stroke + shadow**: stroke width and shadow offset/blur are fixed values in the 36-unit canvas (the export uses stroke `0.5`, shadow `dy 1`, blurs `1` & `0.5`). Author every glyph at that scale — glyphs exported cropped to a smaller frame just need their own `viewBox`, and `meet` scales them to fit.
- **Two layered copies of the same glyph `path`** (single-segment glyphs):
  - _Layer A_ — the glass fill (`white` at `fillOpacity`) + a thin soft white edge (`white` @ 0.55) aligned just _outside_ the shape, **with the drop shadow** (the icon's outer lift).
  - _Layer B_ — a thin bright white highlight (`white`) aligned just _inside_ the edge, **no shadow**. The export gives this layer a shadow too, but it falls just inside the edge and reads as an unwanted inner shadow at this size, so we drop it.
  - Together the strokes form the glass bevel (soft white outside / bright white inside, adjacent).
- **Stroke alignment via masks**: each stroke is drawn at double width and a per-segment `<mask>` keeps one half — `mo${i}` (white outside segment _i_) for the soft outer edge, `mi${i}` (white inside) for the bright highlight. This is the same result the export bakes into offset paths; the shared path + `fillRule` keeps cut-out holes (e.g. the skills slash) correct.
- **Multi-segment glyphs (`path` as an array)**: glyphs made of several overlapping segments (e.g. the PostHog hedgehog's spines + head) are **flattened into one shape** — a single union fill (grouped under one opacity so overlaps don't double-up) and a single drop shadow around the whole outer silhouette. The segments are kept distinguishable by their **per-segment bevel strokes** (the outside/inside masked highlights), so spines read as separate slabs separated by crisp light bevels — _not_ by per-segment shadows. Giving each segment its own drop shadow looks wrong: the shadows stack into heavy dark grooves between spines and the glyph reads as separate layered pieces instead of one flat shape. Author the array in paint order (first = back); give any segment with a cut-out (the hedgehog eye) `fillRule: 'evenodd'`.
- **Drop shadows**: a dark-green (`#033003`) glow @ 1 plus a `#033003` ambient @ 0.25. The filter reproduces the export's `feComposite operator="out"` **knockout**, which removes each shadow from behind the shape — without it the shadow bleeds through the translucent fill and darkens the frosted interior (it won't match Figma's lighter glass).
- **Hover**: a subtle zoom pop (`group-hover:scale-[1.03]`) plus a soft glow that fades in slowly behind the shape. Driven by the `group` class on the parent `AppLink`, so hovering the icon + label triggers it. Click has no scale (kept snappy).

Filter/clip IDs are scoped with `useId()`, so many icons can render on the same screen without colliding.

### Silhouette paths

Paths live in `glyphs.ts`. Author glyphs in the 36-unit design canvas (the default `viewBox`); just copy the **fill** `d` from the export — `GlassIcon` derives the strokes and shadows itself. A glyph exported cropped to a different frame (e.g. self-driving's `"0 0 33 31"`, download's `"0 0 32 32"`) also exports a `viewBox` constant to pass alongside it; exporting at the full 36×36 frame keeps sizes perfectly consistent. Glyphs with cut-out holes (skills slash, download arrow) render with `fillRule="evenodd"`. `PLACEHOLDER_SILHOUETTE` is a neutral rounded-square tile used as a stand-in until a real path is added.

## PricingIcon

A compound glass icon (a stack of dollar bills with a `$`) that doesn't reduce to a single fill path, so it's a one-off rather than a `GlassIcon`. The SVG lives in `svgs/pricing.svg` (imported as a component via `gatsby-plugin-react-svg`), with its shadows recoloured to the system dark-green (`#033003`). `PricingIcon` wraps it at the same `size-9` / hover treatment as the glass icons. Use this pattern for any future multi-layer icon.

## AppIcon

Renders image-based app icons from the `PRODUCT_ICON_MAP`. Supports skin variants (classic/modern). See `AppIcon.tsx` for the full icon registry.

## AppLink

Wraps any icon (AppIcon, image URL, React element, or component) in a clickable figure with a label. Handles URL resolution, drag prevention, and orientation (row/column layout).
