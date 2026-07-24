# BrandLogos

Renders the PostHog logo lockups on the [brand assets handbook page](/handbook/brand/assets),
live from the [`@posthog/brand`](https://github.com/PostHog/brand) library — the single source
of truth for the mark. The page previews and downloads do not depend on `static/brand`, so they
can't drift from the library.

Stable public `/brand/*` URLs are maintained separately for external consumers. The
`scripts/generate-brand-assets.mjs` script materializes those compatibility files from the same
package and runs automatically before the standard Gatsby start and build commands.

## Usage

Registered as an MDX shortcode, so handbook/docs pages can drop it in directly:

```mdx
<BrandLogos />
```

## How it works

- Each lockup is a live `<Logo>` from `@posthog/brand/logo`, configured via `layout` /
  `variant` / `color` (see `LOCKUPS`).
- The standard and light square logomarks keep the package's 52:28 mark intact and center it on
  a transparent 60:60 canvas for avatars and integrations that require square images.
- Download buttons serialize the rendered `<svg>` on demand:
  - **SVG** — clones the node, bakes `currentColor` (used by the `mono` lockups) into an
    explicit fill so the file stands alone, and serializes it.
  - **PNG / PNG @2x** — draws that SVG onto a canvas at `PX_PER_UNIT × scale` and exports a
    PNG blob.
  - **Padded** variants expand the `viewBox` by `PAD_FRACTION` of the shorter side, for
    services that offer no control over margin around the logo.
  - **Square** variants first expand the `viewBox` equally around the unmodified mark. Their
    padded downloads then add the same extra clear space outside that square canvas as the
    other lockups.

All download work happens in the browser on click; the component itself renders fine under
SSR (just the `<Logo>` previews).

## Adding or changing a lockup

Edit the `LOCKUPS` array. `slug` becomes the download filename; anything the `<Logo>` component
supports (`layout`, `variant`, `color`) can be set under `logo`.
