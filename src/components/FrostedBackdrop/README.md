# FrostedBackdrop

Draws frosted glass without `backdrop-filter`. It renders a blurred copy of the desktop wallpaper, aligned to the viewport, with a tint on top.

## Why it exists

`backdrop-filter` makes its element a composited layer. In WebKit, a small composited layer is not tiled, so its bitmap grows with page zoom² × device pixel ratio² ([WebKit bug 305622](https://bugs.webkit.org/show_bug.cgi?id=305622)). On an iPhone, pinch-zoom on a full-screen frosted window can use hundreds of MB and make Safari reload the page.

A CSS `filter: blur()` on normal content is not composited in WebKit. It paints into the tiled document layer, so its memory does not grow with zoom. Only the wallpaper is behind an app window, so a blurred copy of the wallpaper looks the same as the live blur.

`AppWindow` uses it for every window, on desktop and on mobile, also in the server HTML.

## Usage

Put it as the first child of a positioned surface. Give the other children `position: relative` so that DOM order paints them above it.

```tsx
import FrostedBackdrop from 'components/FrostedBackdrop'
import { WINDOW_SCHEME, WINDOW_TINT } from '../../constants/frostedSurfaces'

<div className="relative overflow-hidden rounded-lg">
    <FrostedBackdrop tintClassName={WINDOW_TINT} />
    <div className="relative">Content</div>
</div>
```

To fade content into the glass (in place of a `mask-image` fade over a scroll area), use a thin strip with a gradient mask:

```tsx
<FrostedBackdrop
    className="inset-x-0 top-0 h-8 [mask-image:linear-gradient(to_bottom,black,transparent)]"
    tintClassName={WINDOW_TINT}
    dataScheme={WINDOW_SCHEME}
/>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tintClassName` | `string` | – | Background classes for the tint above the blur. Use the same tint as the surface, for example `WINDOW_TINT`. |
| `className` | `string` | `'inset-0'` | Position and size of the backdrop inside its parent. |
| `dataScheme` | `string` | – | Sets `data-scheme`, so that the tint resolves the same colors as the surface. Use it when the backdrop is inside an element with a different scheme. |

## How it works

- Nine copies of `<Wallpapers />` are arranged in a 3×3 grid, mirrored at the edges, and blurred together with `blur-3xl` (64 px, the same radius as `backdrop-blur-3xl`). The mirrored edges give the same edge result as a live backdrop blur, which repeats edge pixels and does not fade to transparent.
- A layout effect aligns the blurred copy to the viewport with a `transform: translate()`. It runs again on resize, and at the end of any animation or transition. Do not align with `left` and `top`: Chrome counts a change of layout position as a layout shift (CLS), but it does not count a change of `transform`.
- The server has no layout, so the server HTML puts the copy at a default position (`-EDGE_PADDING_PX`) with no transform. Until hydration, the copy is offset by the position of the surface on the screen (for example 8 × 49 px for a mobile window). At hydration, the layout effect aligns it. Under the blur and the tint, this shift is small.
- When reduce transparency is on, the blurred copy is hidden and the tint is opaque.
- The copies use 32 px wide wallpaper images. The live wallpaper keeps the full-size images. See [Image size](#image-size).

## Image size

The tiles set `BlurredWallpaperContext` to `true`. In `Wallpapers.tsx`, `SceneBackground` and `SceneImage` read it and request a 32 px wide Cloudinary image. `SceneImage` keeps the full `width` and `height` attributes and aspect ratio, so the layout of the copy does not change. Under a 64 px blur, the small image looks the same as the full-size image.

The small image is necessary for Largest Contentful Paint (LCP):

- Chrome ignores an image that fills the full viewport, so it ignores the live wallpaper.
- The surface clips the copy, so the copy is smaller than the viewport. Chrome counts it, and it is the largest element in the window.
- With a full-size image, the LCP time is when the copy paints with its image. That is later than the text, and for a copy that mounts after hydration, it is the hydration time.
- Chrome reduces the counted size of an image that is displayed larger than its natural size. A 32 px image counts as about 1% of the screen, so it is never the LCP element.

When you add an image layer to a wallpaper scene, use `SceneBackground` or `SceneImage`. A plain `CloudinaryImage` or an inline `background-image` loads the full-size image in the copies, and that copy can become the LCP element.

## Limitations

- It shows only the wallpaper. Content behind the surface, such as desktop icons or other windows, does not show through. Use it only where the wallpaper is the only thing behind the surface, for example an app window. Desktop icons are never behind a window. A fixed-size modal opens above another window, but its content is opaque, so its backdrop is not visible.
- The surface must not move while it is visible, except through animations that end with an `animationend` or `transitionend` event.
- Do not put it under content that must stay outside a stacking context. Give the content container `isolate`, so that negative z-index content stays above the backdrop.
