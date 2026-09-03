# LetPostHogScroller

The "Let [icon] PostHog {analyze|debug|…|code}" wordmark: a preset of
[`SlotMachineText`](../SlotMachineText/README.md) with PostHog's word list, icon, and timing
already applied.

Use it wherever a page makes the point that PostHog does the work rather than only reports on
it. It is the Desktop page's header brand and the heading of the "Ramp to self-driving" section
on each product page.

## Usage

```tsx
import LetPostHogScroller from 'components/LetPostHogScroller'
;<LetPostHogScroller />
```

## Props

| Prop        | Type     | Default                                          | Description                                                          |
| ----------- | -------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| `className` | `string` | `'text-2xl @xl:text-3xl font-bold tracking-tight'` | Class on the outer wrapper. Font size and weight live here, so pass a full replacement rather than an addition. |

## Notes

- `SlotMachineText` respects `prefers-reduced-motion` and renders the final word statically, so
  no extra handling is needed here.
- The component renders inline content only. Wrap it in a heading element where the page needs
  one — it does not supply its own.
