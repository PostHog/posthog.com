# ImageGallery

A responsive grid of screenshots. Each item can carry a caption and a dark mode pair, and every
item zooms when you click it.

`ImageGallery` is registered as an MDX shortcode, so docs, handbook, and blog pages can use it
without an import.

## When to use it

| Component          | Shows                        | Use it when                                        |
| ------------------ | ---------------------------- | -------------------------------------------------- |
| `ProductScreenshot` | One image                    | One screenshot illustrates the paragraph next to it |
| `ImageSlider`      | One image at a time          | The images are a sequence, and space is tight       |
| `ImageGallery`     | All images at once, in a grid | The range of options **is** the point               |

Reach for `ImageGallery` when a reader must compare or browse, not read in order.

## Props

| Prop        | Type                 | Default | Description                                            |
| ----------- | -------------------- | ------- | ------------------------------------------------------ |
| `images`    | `ImageGalleryImage[]` | –       | Required. The images, in the order they are shown.      |
| `columns`   | `2 \| 3`             | `2`     | Columns at the widest size. Always 1 in a narrow window. |
| `className` | `string`             | `''`    | Extra classes on the wrapper.                           |

### `ImageGalleryImage`

| Field     | Type              | Description                                                              |
| --------- | ----------------- | ------------------------------------------------------------------------ |
| `light`   | `string`          | Required. The light mode image URL.                                       |
| `dark`    | `string`          | The dark mode image URL. Without it, the light image shows in both modes.  |
| `alt`     | `string`          | Required. Alt text, used for both modes.                                   |
| `caption` | `React.ReactNode` | A short label below the image.                                             |

## Usage

```mdx
<ImageGallery
    columns={2}
    images={[
        {
            light: 'https://res.cloudinary.com/dmukukwp6/image/upload/canvas_light.png',
            dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/canvas_dark.png',
            alt: 'A personal dashboard canvas',
            caption: 'Personal dashboard',
        },
        {
            light: 'https://res.cloudinary.com/dmukukwp6/image/upload/slide_deck.png',
            alt: 'A slide deck canvas',
            caption: 'Slide deck',
        },
    ]}
/>
```

## Notes

- The grid is built with `@container` queries, so it responds to the window width, not the
  screen width. All pages on posthog.com are resizable.
- `columns` accepts only 2 or 3. Tailwind cannot see a class name that is built at runtime, so
  the column classes are written out in full in `index.tsx`. Add a new entry there to support
  more columns.
- Dark mode uses the same `dark:hidden` / `hidden dark:block` pair as `ProductScreenshot`. Both
  images load. Do not use the gallery for very large images.
