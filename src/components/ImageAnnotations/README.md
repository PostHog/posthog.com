# ImageAnnotations

Renders interactive callouts ("annotations") on top of an image. Instead of baking
dots/numbers into the image file, the markers are live DOM positioned with
**percentage coordinates**, so they stay anchored and scale automatically when the
image is resized.

There's an internal authoring tool at [`/image-annotator`](../../pages/image-annotator/index.tsx)
(Moderator tools → Image annotation) that lets you load an image, click to place
markers, and copy paste-ready code.

## API

It's a compound component built around a shared context. Define the `annotations`
once on the provider; `<ImageAnnotations.Image>` and `<ImageAnnotations.Key>` read
from it and cross-highlight each other on hover.

### `<ImageAnnotations>`

| Prop          | Type                     | Default      | Description                                                            |
| ------------- | ------------------------ | ------------ | ---------------------------------------------------------------------- |
| `annotations` | `Annotation[]`           | _(required)_ | The callouts to render.                                                |
| `type`        | `'dots' \| 'numbered'`   | `'numbered'` | Marker style (see below).                                              |
| `children`    | `ReactNode`              | _(required)_ | Must contain an `<ImageAnnotations.Image>` (and optionally a `.Key`).  |

```ts
interface Annotation {
    x: number // horizontal position, 0–100 (% of image width)
    y: number // vertical position, 0–100 (% of image height)
    title: string
    description?: string
}
```

### `<ImageAnnotations.Image>`

| Prop           | Type     | Description                                                              |
| -------------- | -------- | ------------------------------------------------------------------------ |
| `src`          | `string` | Image URL (Cloudinary URLs get optimized via `CloudinaryImage`).         |
| `srcDark`      | `string` | Optional dark-mode variant, swapped via the `dark:` dual-image pattern.  |
| `alt`          | `string` | Alt text.                                                                |
| `imgClassName` | `string` | Classes on the underlying `<img>`.                                       |
| `className`    | `string` | Classes on the relative wrapper.                                         |

### `<ImageAnnotations.Key>`

| Prop        | Type     | Default | Description               |
| ----------- | -------- | ------- | ------------------------- |
| `title`     | `string` | `'Key'` | Heading above the list.   |
| `className` | `string` | —       | Classes on the wrapper.   |

### `<ImageAnnotations.FromProduct>`

The recommended entry point when the image lives in a product hook. It resolves the
image (`src` + `srcDark` + `alt`) from `useProducts`, so it stays in sync if the
screenshot is ever updated, and can read a named annotation set stored on the
screenshot. Renders the provider, image, and key for you.

| Prop          | Type           | Description                                                                        |
| ------------- | -------------- | ---------------------------------------------------------------------------------- |
| `product`     | `string`       | Product handle, e.g. `"session_replay"`.                                           |
| `screenshot`  | `string`       | Key in that product's `screenshots` object, e.g. `"overview"`.                     |
| `set`         | `string`       | Name of an annotation set stored at `screenshots[screenshot].annotations[set]`.    |
| `annotations` | `Annotation[]` | Inline annotations — overrides `set`.                                              |
| `type`        | `'dots' \| 'numbered'` | Overrides the set's type (defaults to the set's type, then `numbered`).    |
| `showKey`     | `boolean`      | Force the key on/off (defaults to on for `numbered`).                              |
| `alt`, `imgClassName`, `className`, `keyTitle` | `string` | Presentation overrides.                                       |

#### Storing annotation sets in a hook

Add an `annotations` map to a screenshot. Multiple named sets are supported, since the
same image may be annotated differently in different places:

```ts
screenshots: {
    overview: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_screenshot.jpg',
        // srcDark: '…',
        alt: 'Session replay screenshot',
        annotations: {
            'dev-tools': {
                type: 'numbered',
                items: [
                    { x: 27.2, y: 9.8, title: 'Debug views' },
                    { x: 48.9, y: 7.8, title: 'DevTools' },
                ],
            },
        },
    },
}
```

```mdx
<ImageAnnotations.FromProduct product="session_replay" screenshot="overview" set="dev-tools" />
```

#### Using in MDX

`ImageAnnotations` is a **global MDX component** (registered in `src/mdxGlobalComponents`),
so you can use `<ImageAnnotations.FromProduct />` directly in any `.md`/`.mdx` file with no
import. If you'd rather keep the annotations inline in the file, note that MDX only allows
ESM — use **`export const`**, not a bare `const`:

```mdx
export const annotations = [{ x: 30, y: 50, title: 'Debug views' }]

<ImageAnnotations.FromProduct product="session_replay" screenshot="overview" annotations={annotations} />
```

The internal tool at `/image-annotator` generates both the hook entry and the
`FromProduct` usage for you when you pick a product screenshot.

## Marker types

- **`numbered`** — numbered badges paired with a `<ImageAnnotations.Key>` list (like a
  legend). Hovering a key row grows the matching marker, and vice-versa.
- **`dots`** — pulsing, clickable dots. Clicking one opens a popover with its title and
  description. A key is optional.

## Example

```tsx
import ImageAnnotations from 'components/ImageAnnotations'

const annotations = [
    { x: 30, y: 50, title: 'Debug views', description: 'Switch between heatmaps, DOM, and activity.' },
    { x: 78, y: 45, title: 'DevTools', description: 'Console, network, and errors synced to the timeline.' },
]

;<ImageAnnotations annotations={annotations} type="numbered">
    <div className="grid @2xl:grid-cols-[2fr_1fr] gap-4 items-start">
        <ImageAnnotations.Image
            src="https://res.cloudinary.com/dmukukwp6/image/upload/replay_screenshot.png"
            srcDark="https://res.cloudinary.com/dmukukwp6/image/upload/replay_screenshot_dark.png"
            alt="Session replay inspector"
            imgClassName="rounded-lg shadow-2xl"
        />
        <ImageAnnotations.Key />
    </div>
</ImageAnnotations>
```

For the pulsing-dot style with no key, just drop the `.Key` and use `type="dots"`:

```tsx
<ImageAnnotations annotations={annotations} type="dots">
    <ImageAnnotations.Image src="..." alt="..." imgClassName="rounded-lg" />
</ImageAnnotations>
```

## Notes

- Coordinates are percentages, so no JS dimension measurement is needed — the markers
  use `left: x%` / `top: y%` inside a `position: relative` wrapper.
- `.Image` and `.Key` don't need to be siblings; place them anywhere inside the provider.
- Colors use project tokens (`bg-red`, `bg-accent`, `border-primary`) — no stock Tailwind colors.
