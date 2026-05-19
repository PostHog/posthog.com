# CardStackCarousel

A draggable, swipeable card-stack carousel with a generic primitive, a swappable card visual layer, and a concrete `HearAboutUsCarousel` composition currently used in [contents/blog/aeo-advice.mdx](../../../contents/blog/aeo-advice.mdx).

The architecture is intentionally split so the same stack/animation behavior can be reused with a different card design (and/or a different data set) later — just swap the visual layer.

## Files

- `index.tsx` – the generic `<CardStackCarousel />` primitive (animation, drag, chevrons, counter, keyboard).
- `SignupQuoteCard.tsx` – `<SignupQuoteCard />`, the white "Where did you hear about us?" signup-form card visual.
- `HearAboutUsCarousel.tsx` – `<HearAboutUsCarousel />`, composes the primitive + `SignupQuoteCard` + `quotes.json`. This is the MDX shortcode.
- `quotes.json` – array of `{ content: string }` where `<strong>...</strong>` markers are highlighted via `RoughAnnotation`.

## Usage in MDX

`HearAboutUsCarousel` is registered as a global MDX shortcode in [src/mdxGlobalComponents.js](../../mdxGlobalComponents.js):

```mdx
<HearAboutUsCarousel />
```

## Reusing the stack with a different visual layer

Author a new card component, then compose:

```tsx
import { CardStackCarousel } from "components/CardStackCarousel"
import { MyOtherCard } from "./MyOtherCard"
import data from "./my-data.json"

export function MyOtherCarousel() {
    return (
        <CardStackCarousel
            count={data.length}
            renderCard={(i, { isActive }) => <MyOtherCard {...data[i]} isActive={isActive} />}
            ariaLabel="My other carousel"
        />
    )
}
```

## `<CardStackCarousel />` API

| Prop          | Type                                  | Default          | Description                                    |
| ------------- | ------------------------------------- | ---------------- | ---------------------------------------------- |
| `count`       | `number`                              | _required_       | Total number of slides.                        |
| `renderCard`  | `(index: number, meta: { isActive: boolean }) => React.ReactNode`  | _required_       | Renders the card at a given absolute index. `isActive` is true for the centered (front) slide only.    |
| `loop`        | `boolean`                             | `true`           | Loop from last → first (and vice versa).       |
| `className`   | `string`                              | `''`             | Extra classes on the outer container.          |
| `ariaLabel`   | `string`                              | `Card carousel`  | Accessible label for the carousel region.      |

### Behavior

- **Stack layout** – three slides at rest (offsets −1, 0, 1): left inner, center, right inner. All cards use **`transform-origin: top center`**. On **first mount** (when not `prefers-reduced-motion`), both side neighbors **fly in** from the same entry poses used on navigation. On **next** / **previous**, the new neighbor uses a **nav** entrance from the matching edge. **While dragging**, the deck picks up a small shared rotation tied to pointer movement.
- **CSS transitions** – `transform` / `opacity` ~420ms `cubic-bezier(0.22, 1, 0.36, 1)`. No external animation library.
- **Drag/swipe** – Pointer Events on the stage. A drag past ~22% of the card width (or 60px, whichever is larger) advances. Otherwise it snaps back.
- **Continuous swipes** – cards are keyed by absolute index, so React preserves DOM nodes across navigation. Swiping during an active animation smoothly redirects the in-flight card.
- **Click vs. drag** – movement under 4px is treated as a click, so the chevrons and any in-card buttons keep working.
- **Keyboard** – `ArrowLeft` / `ArrowRight` when the carousel is focused.
- **Reduced motion** – respects `prefers-reduced-motion`; transitions become instant.
- **`@container`** – widths and breakpoints adapt to the carousel's own container width, not the viewport, so it works inside any `<Reader />` / `<Editor />` window size.
- **Side cards** – the left/right stack slots are **`hidden` below the container `@lg` breakpoint** and **`@lg:block`** from `@lg` up, so narrow layouts only show the centered card (chevrons and swipe still work).

## `<SignupQuoteCard />` API

| Prop       | Type      | Description                                                                       |
| ---------- | --------- | --------------------------------------------------------------------------------- |
| `content`  | `string`  | Body copy. Wrap any segment in `<strong>...</strong>` to highlight it in yellow. |
| `isActive` | `boolean` | Pass from `renderCard`'s meta: `true` only when this slide is centered. Rough highlights are delayed until the card is active so `rough-notation` measures an un-rotated layout; once shown, they stay on as the card moves to the side. |

The card has a fixed-height "input" area so all slides share an identical UI silhouette regardless of quote length. The "Create account" button is decorative — it does not navigate.

Highlights use [`<RoughAnnotation type="highlight" />`](../Code/RoughAnnotation.tsx) (PostHog yellow at 35% alpha) **only while the card is centered** — side cards render plain `<strong>` so rough-notation never measures text under a CSS transform (which caused misaligned or “popping” highlights). After the stack settles, the highlight draws in over ~1.6s.

## Editing quotes

Edit [`quotes.json`](./quotes.json). Each entry is a `{ "content": "..." }` object; wrap highlighted phrases in `<strong>...</strong>`. Standard JSON escaping rules apply (escape `"` as `\"`).
