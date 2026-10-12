# FrostedBackdrop

Draws frosted glass without `backdrop-filter`. It renders a blurred copy of the desktop wallpaper, aligned to the viewport, with a tint on top.

## Why it exists

`backdrop-filter` makes its element a composited layer. In WebKit, a small composited layer is not tiled, so its bitmap grows with page zoom² × device pixel ratio² ([WebKit bug 305622](https://bugs.webkit.org/show_bug.cgi?id=305622)). On an iPhone, pinch-zoom on a full-screen frosted window can use hundreds of MB and make Safari reload the page.

A CSS `filter: blur()` on normal content is not composited in WebKit. It paints into the tiled document layer, so its memory does not grow with zoom. The wallpaper is the only thing behind a full-screen mobile window, so a blurred copy of the wallpaper looks the same as the live blur.

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
- A layout effect aligns the blurred copy to the viewport. It runs again on resize, and at the end of any animation or transition.
- When reduce transparency is on, the blurred copy is hidden and the tint is opaque.

## Limitations

- It shows only the wallpaper. Content behind the surface, such as desktop icons or other windows, does not show through. Use it only where the wallpaper is the only thing behind the surface, for example a full-screen window on mobile.
- The surface must not move while it is visible, except through animations that end with an `animationend` or `transitionend` event.
- Do not put it under content that must stay outside a stacking context. Give the content container `isolate`, so that negative z-index content stays above the backdrop.
