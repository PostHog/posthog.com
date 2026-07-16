# EventGraphic

A brand-templated promotional graphic for events on `/events`. It renders a square (1:1) poster in the style of PostHog's event signage and is used as the **default photo for an event whenever no photos have been uploaded** — in the events list, the event detail panel, and the live preview inside the event creation/edit form.

## Design

The template follows the [visual identity guidelines](/handbook/brand/visual-identity):

- **Headline** – the event's speaker topic (or the event name) set in **Squeak**, bold, uppercase (Squeak's only permitted usage). Long titles automatically step down a size.
- **Supporting text** – date ("Tuesday, March 17") and city/country (or "Online") set in **Open Runde** (`font-rounded`).
- **Background** – a solid fill using the **first speaker's favorite color** from their community profile (one of the 12 safelisted profile color tokens). Falls back to `yellow`. Text automatically switches between black and white based on the background's lightness (`LIGHT_BACKGROUNDS`).
- **Headshot** – the first speaker's community profile avatar (the hand-drawn portrait) in a white-ringed circle, with their name in Squeak, their role in Open Runde, and a hand-drawn-style arrow pointing at the portrait. Events without speakers get the default hedgehog artwork instead.
- **Footer bar** – white pill with the PostHog logo, plus "with {partner}" when the event has partners.

## Sizing and export

The component is sized entirely with container-query units (`cqw`), so it renders correctly at any width — from the 80px thumbnail in the events list to the form preview. Pass sizing/rounding via `className` (applied to the `@container` wrapper).

To export a 1080×1080 PNG, forward a `ref` (attached to the inner square canvas) and use `html-to-image`:

```tsx
const graphicRef = useRef<HTMLDivElement>(null)

<EventGraphic ref={graphicRef} {...props} />

const dataUrl = await toPng(graphicRef.current, {
    canvasWidth: 1080,
    canvasHeight: 1080,
    pixelRatio: 1,
})
```

Text and the inline SVG logo stay crisp at any export size because `html-to-image` rasterizes from vectors; avatar sharpness depends on the source image, so pass the full-size avatar URL (not a thumbnail format).

## Props

| Prop        | Type                                                                | Description                                                             |
| ----------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `title`     | `string`                                                             | Headline. Use the speaker topic when set, otherwise the event name.     |
| `date`      | `string?`                                                            | Event date (`YYYY-MM-DD` or ISO datetime).                              |
| `location`  | `string?`                                                            | City/country label, e.g. "Dublin, Ireland".                            |
| `online`    | `boolean?`                                                           | When true, shows "Online" instead of `location`.                       |
| `speaker`   | `{ name, color?, avatarUrl?, companyRole? }?`                        | First speaker's community profile data.                                 |
| `partners`  | `{ name: string }[]?`                                                | Event partners, rendered as "with {name}" in the footer bar.           |
| `className` | `string?`                                                            | Applied to the `@container` wrapper (use for width and rounding).      |

## Where speaker data comes from

- **EventForm preview** – the `allSqueakProfile` static query (`color`, `companyRole`, `avatar.url`), looked up by the selected speaker's `squeakId`.
- **Events page surfaces** – the runtime Strapi events API with `speakers: { populate: ['avatar'] }`, mapped to `Event.speakerProfiles` in `transformStrapiEvent`.
