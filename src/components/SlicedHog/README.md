# SlicedHog

A hedgehog in six layers that opens into slices when half of it is on screen. When it is open, the layers float and sometimes move in and out together. A click closes it or opens it again.

```tsx
import SlicedHog from 'components/SlicedHog'

<SlicedHog className="max-w-xl mx-auto" label="A hedgehog cut open to show your product data" />
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `''` | Classes for the button. Set the width here. The height follows from the aspect ratio. |
| `label` | `string` | A general description | The accessible name. The art is decorative. |
| `title` | `string` | None | A tooltip that shows on hover. |

## Changing the layers

The art is the `slices` hoggie from `@posthog/brand`, imported from `@posthog/brand/hoggies/svg/slices`. It is one flat SVG, and its paths paint back to front. Each layer renders the same `viewBox` with only its own run of paths, so the layers line up.

`LAYERS` is in paint order, back to front. Each layer has:

- `paths`: the first and last path index of the layer.
- `shade`: paths from the translucent shade group that belong to the layer.
- `clip`: moves the slanted clip line. Each slice's fur reaches over the previous slice, so every layer but the back one is clipped just left of its own edge.
- `artLeft`: the left edge of the visible art, in SVG units. The art shows the open state.

`VIEW_BOX` is the box around the whole art. The component calculates the closed positions from `artLeft`. `CLOSED_TUCK` sets how much of the open spacing each layer keeps, and `CLOSED_SPREAD` scales the gaps, so a sliver of each slice stays visible.

If a brand update changes the art, check the path indexes, `artLeft`, and `VIEW_BOX` again.

## Behavior

- The open and close spring and the idle motion are on different elements, so they do not interfere.
- The idle motion stops when the hog is off screen.
- With reduced motion, it starts open, does not move, and a click changes state immediately.
- The art loads in its own chunk after hydration, because it is about 260 KB of gzipped path data. The server render is an empty box of the right size, and the reveal waits for the art.
