# HoggieImage

Shows a hoggie PNG from `@posthog/brand`. It can flip the hoggie (`mirror`) or show only part of it (`crop`). CSS does both, so the site needs no extra image files.

Use it for a hoggie PNG. For a Cloudinary image, use `CloudinaryImage`.

## Usage

```tsx
import HoggieImage from 'components/HoggieImage'
import hedgehogWizard1Png from 'hoggies/wizard-1.png'

<HoggieImage src={hedgehogWizard1Png} alt="A hedgehog wizard" className="w-40" mirror />
```

The `hoggies` alias in `gatsby-node.ts` points to `node_modules/@posthog/brand/dist/generated/hoggies/png`. Some file names differ from the component names, for example `9-9-6.png` and `popcorn.png`.

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `src` | `string` | The imported PNG. |
| `alt` | `string` | Defaults to `''`, because most hoggies are decorative. Set it when the hoggie means something. |
| `className` | `string` | Classes for the box that holds the image. Put size, position, margin, and float classes here. |
| `mirror` | `boolean` | Flips the hoggie to face the other way. |
| `crop` | `[x, y, width, height]` | Shows only this box of the art, in the units of the 1000×1000 PNG, measured before the mirror. |
| `imgClassName` | `string` | Classes for the `<img>`. Not allowed with `crop`. |

Other props, for example `loading`, `title`, and `width`, go to the `<img>`.

## Layout

The component renders a `<span>` that holds an `<img>`, the same layout as `CloudinaryImage`. So a component can render either one with the same classes. The `<span>` is `inline-block` unless `className` changes it.

The `<img>` fills the box (Tailwind sets `max-width: 100%` on images). Put float, margin, and position classes on `className`, not on `imgClassName`. A float on the `<img>` floats inside the box and does not affect the text around it.

With `crop`, the box is a window with the aspect ratio of the crop. The `<img>` inside is larger, and the window hides the rest. Give the box a width or a height with `className` (for example `w-full`, `w-28`, or `h-full`). A `max-width` or `max-height` alone does not give the box a size.

### Crop to the art

Each PNG has empty space around the art. The old hedgehog images had none, so a hoggie at the old size looks smaller. To show the hoggie at the old size, crop to the box around its art. This command prints that box as `widthxheight+x+y`:

```sh
magick node_modules/@posthog/brand/dist/generated/hoggies/png/money.png -channel A -threshold 0 +channel -format '%@' info:
```

For `money`, it prints `836x764+82+118`, so use `crop={[82, 118, 836, 764]}`.

Three hoggies are narrower than 1000 px: `burning-money`, `mailbox`, and `workmaxxing`. Do not crop them, because the crop math expects a 1000×1000 PNG.

## Data with Cloudinary URLs and hoggies

Some data has a Cloudinary URL for some items and a hoggie for others, for example the product `hog` fields. Use `isCloudinaryImage` from `components/CloudinaryImage` to select the component:

```tsx
{isCloudinaryImage(hog.src) ? (
    <CloudinaryImage src={hog.src} alt={hog.alt} className="w-32" />
) : (
    <HoggieImage src={hog.src} alt={hog.alt} className="w-32" mirror={hog.mirror} />
)}
```

Put `mirror` and `crop` next to `src` in the data.
