# SlicedHog

A hedgehog in six layers that opens into slices when half of it is on screen. When it is open, the layers float and sometimes move in and out together. A click closes it or opens it again.

```tsx
import SlicedHog from 'components/SlicedHog'

<SlicedHog className="max-w-xl mx-auto" label="A hedgehog cut open to show your product data" />
```

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `''` | Classes for the button. Set the width here. The height follows from the aspect ratio. |
| `label` | `string` | A general description | The accessible name. The images are decorative. |
| `title` | `string` | None | A tooltip that shows on hover. |

## Changing the layers

`LAYERS` is in paint order, back to front. Each layer has:

- `naturalWidth`, `naturalHeight`: the pixel size of the image. These keep the relative scale of the art.
- `openLeft`: the left edge when open, as a percent of the container width.
- `tuck`: the distance to the left of the front hog when closed. The small gaps make the closed stack look sliced. `CLOSED_SPREAD` scales all of them, so a sliver of each slice stays visible.

Each image comes from Cloudinary at 600px wide (`IMAGE_WIDTH`). If you show the hog wider than `max-w-3xl`, increase this value.

## Behavior

- The open and close spring and the idle motion are on different elements, so they do not interfere.
- The idle motion stops when the hog is off screen.
- With reduced motion, it starts open, does not move, and a click changes state immediately.
- The server render shows the closed hog, so the slices do not flash open before hydration.
