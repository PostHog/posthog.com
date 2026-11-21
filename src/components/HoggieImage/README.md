# HoggieImage

Shows a `@posthog/brand` hoggie PNG. It can flip the hoggie (`mirror`) or show only part of it (`crop`). Both use CSS, so the site ships no extra image files.

Use it for a bundled hoggie PNG. For a Cloudinary image, use `CloudinaryImage`.

## Usage

```tsx
import HoggieImage from 'components/HoggieImage'
import hedgehogWizard1Png from 'hoggies/wizard-1.png'

<HoggieImage src={hedgehogWizard1Png} mirror imgClassName="h-40" alt="A hedgehog wizard" />
```

The `hoggies` alias in `gatsby-node.ts` points to `node_modules/@posthog/brand/dist/generated/hoggies/png`. Some brand file names differ from the component names, for example `9-9-6.png` and `popcorn.png`.

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `src` | `string` | The imported hoggie PNG. |
| `mirror` | `boolean` | Flips the hoggie so it faces the other way. |
| `crop` | `[x, y, width, height]` | Shows only this box of the art. The units are the 1000×1000 art, measured before the mirror. |
| `className` | `string` | Classes for the wrapper `<div>`. |
| `imgClassName` | `string` | Classes for the `<img>`. |

Other props, such as `alt`, `width`, and `loading`, go to the `<img>`.

## Layout

Without `crop`, the layout is the same as `CloudinaryImage`: an `inline-block` wrapper with `className`, and the `<img>` inside it with `imgClassName`. You can move a call site from one component to the other and keep its classes.

With `crop`, the wrapper is the visible image. It gets both `className` and `imgClassName`, and its aspect ratio is the crop box's. Set its size with a width or a height on the call site. The `<img>` inside is absolute and larger than the wrapper, and the wrapper hides the overflow. Because the wrapper must have a size, `crop` does not work where the image itself is absolutely positioned to fill a box.

## Data with Cloudinary and hoggie images

Some data mixes Cloudinary URLs and hoggie PNGs, for example the product `hog` and `hogs` fields. A component that renders it picks the component with `isCloudinaryImage` from `components/CloudinaryImage`:

```tsx
{isCloudinaryImage(hog.src) ? (
    <CloudinaryImage src={hog.src} alt={hog.alt} imgClassName="w-32" />
) : (
    <HoggieImage src={hog.src} mirror={hog.mirror} alt={hog.alt} imgClassName="w-32" />
)}
```

Put `mirror` and `crop` next to `src` in the data, as `mirror: true` or `crop: [x, y, width, height]`.
