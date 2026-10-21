# SlicedHog

A hedgehog that opens into slices, like a loaf of bread, when it scrolls into view. Each slice is a different kind of data, so it shows "context" without a diagram.

It starts closed, but still a little sliced: the layers stack behind the front hog with small gaps, in the middle of the container. When half of it is on screen, the layers spring out to their open positions, then float up and down. Click it to close it and open it again.

## Usage

```tsx
import SlicedHog from 'components/SlicedHog'

<SlicedHog className="max-w-xl mx-auto" />
<SlicedHog label="A hedgehog cut open to show your product data" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | `''` | Classes for the wrapper. Use it to set the width. The height follows from the width. |
| `label` | `string` | A generic description | The accessible name. The images themselves are decorative. |

## Layers

Back to front, which is also the paint order:

| Layer | Image |
|---|---|
| Back (brain) | `back_hog_203f4b58bd.png` |
| Pink notes | `4_slice_17f56d54c6.png` |
| Code | `3_slice_a5fde2abfa.png` |
| Grid | `2_slice_ef37167f3a.png` |
| Stripes | `1_slice_80f9cf3a3b.png` |
| Front hog | `front_hog_b2e22c2f66.png` |

Each layer's width comes from its natural pixel width, so the art keeps its relative scale. `openLeft` is the layer's left edge when open, as a percent of the container. `tuck` is how far left of the front hog a layer sits when closed: 3.5% for each step back, so the gaps read as slices. The back hog is the widest layer, so it gets 2% more. The closed stack is centered from the largest `tuck`. To change the spread, edit those values in `LAYERS`.

## Notes

- **Motion:** `framer-motion` springs each layer on `x`. The outer layers (the brain and the front hog) move first, and the middle slices follow.
- **Float:** once open, each layer bobs up and down by 1.5% of its height. The float stops while the hog is off screen, so it does not keep six layers animating when nobody can see them. Each one has its own duration and start time, so they never move in step. The float is on an inner element, so it never fights the spring on `x`.
- **Reduced motion:** with `prefers-reduced-motion`, it starts open, does not float, and a click switches between open and closed with no animation.
- **Server render:** the page HTML has the closed hog, so there is no flash of open slices before hydration.
- **Images:** each layer asks Cloudinary for a 600px-wide copy (`IMAGE_WIDTH`) in place of the ~1,100px original. That is enough for a 2x screen up to about `max-w-3xl`. Raise it if you show the hog wider.
- **Sizing:** the container sets its own aspect ratio from the tallest layer. It has no container queries of its own, so it scales with whatever width you give it.
