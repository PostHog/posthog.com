# CardStackCarousel

A carousel that shows a stack of three cards: the active card in front and one tilted card on each side. `CardStackCarousel` controls the stack and the motion. You supply the card visual with `renderCard`.

## Files

- `index.tsx` – `<CardStackCarousel />`, the stack, chevrons, counter, and keyboard controls
- `SignupQuoteCard.tsx` – the "Where did you hear about us?" signup-form card
- `HearAboutUsCarousel.tsx` – the stack with `SignupQuoteCard` and `quotes.json`. It is a global MDX shortcode (`<HearAboutUsCarousel />`), used in `contents/blog/aeo-advice.mdx`.
- `quotes.json` – `{ "content": "..." }` entries. Wrap a phrase in `<strong>...</strong>` to highlight it.

## Usage

```tsx
import { CardStackCarousel } from 'components/CardStackCarousel'

<CardStackCarousel
    count={data.length}
    renderCard={(i, { isActive }) => <MyCard {...data[i]} isActive={isActive} />}
    ariaLabel="Customer quotes"
/>
```

To put the stack straight on the page, with no frame:

```tsx
<CardStackCarousel
    count={notes.length}
    renderCard={renderNote}
    size="sm"
    framed={false}
    showCounter={false}
    stageClassName="mt-4 h-[calc(min(90cqw,240px)_+_20px)]"
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `count` | `number` | required | The number of cards. |
| `renderCard` | `(index, { isActive }) => ReactNode` | required | Renders the card at `index`. `isActive` is true only for the front card. |
| `loop` | `boolean` | `true` | Go from the last card back to the first card. |
| `ariaLabel` | `string` | `'Card carousel'` | The accessible name of the carousel. |
| `size` | `'sm' \| 'md'` | `'md'` | The card width (240px or 368px) and the chevron size. |
| `framed` | `boolean` | `true` | The tan background, border, rounded corners, and vertical margin. |
| `showCounter` | `boolean` | `true` | Shows "1 of 6" above the stack. When false, only screen readers announce it. |
| `stageClassName` | `string` | `'h-[285px] @md:h-[325px]'` | Replaces the stage height. The cards are absolutely positioned, so set a height that fits your card. |
| `className` | `string` | `''` | Classes for the outer container. |

## Behavior

- **Controls:** the chevrons, and `ArrowLeft` / `ArrowRight` when the carousel has focus.
- **Motion:** CSS transitions on `transform` and `opacity` (420ms). On mount and on each move, the new side card comes in from the edge.
- **Reduced motion:** with `prefers-reduced-motion`, all moves are instant.
- **Narrow containers:** the side cards are transparent below the `@lg` container width (512px), so only the front card shows.
- **Focus:** side cards are `aria-hidden`. Give focusable elements in a card `tabIndex={isActive ? 0 : -1}`.

## `<SignupQuoteCard />`

| Prop | Type | Description |
| --- | --- | --- |
| `content` | `string` | The quote. `<strong>...</strong>` segments get a yellow `RoughAnnotation` highlight. |
| `isActive` | `boolean` | Pass it from `renderCard`. The highlight draws only when the card is in front, because `rough-notation` measures incorrectly under a CSS transform. |

The input area has a fixed height, so all cards have the same shape. The "Create account" button does nothing.
