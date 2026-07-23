# BrandLogos

Renders the PostHog logo lockups on the [brand assets handbook page](/handbook/brand/assets),
live from the [`@posthog/brand`](https://github.com/PostHog/brand) library — the single source
of truth for the mark. Nothing is pre-baked into `static/brand`, so the page can't drift from
the library.

## Usage

Registered as an MDX shortcode, so handbook/docs pages can drop it in directly:

```mdx
<BrandLogos />
```

## How it works

- Each lockup is a live `<Logo>` from `@posthog/brand/logo`, configured via `layout` /
  `variant` / `color` (see `LOCKUPS`).
- Download buttons serialize the rendered `<svg>` on demand:
  - **SVG** — clones the node, bakes `currentColor` (used by the `mono` lockups) into an
    explicit fill so the file stands alone, and serializes it.
  - **PNG / PNG @2x** — draws that SVG onto a canvas at `PX_PER_UNIT × scale` and exports a
    PNG blob.
  - **Padded** variants expand the `viewBox` by `PAD_FRACTION` of the shorter side, for
    services that offer no control over margin around the logo.

All download work happens in the browser on click; the component itself renders fine under
SSR (just the `<Logo>` previews).

## Adding or changing a lockup

Edit the `LOCKUPS` array. `slug` becomes the download filename; anything the `<Logo>` component
supports (`layout`, `variant`, `color`) can be set under `logo`.
