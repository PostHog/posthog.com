# SlotMachineText

One line of text that ends in a vertical "slot machine" word scroller. The reel cycles a list of
words in order, **holds on the last word** for a beat, then loops back to the start seamlessly.

Built to be reused across the site (product pages, marketing beats, etc.) — the prefix, words,
colors, and timing are all props.

## Usage

```tsx
import SlotMachineText from 'components/SlotMachineText'
import posthogIcon from '../images/posthog-icon-white.svg'

;<SlotMachineText
    className="text-2xl @xl:text-3xl font-bold"
    words={['analyze', 'debug', 'instrument', 'ship', 'experiment', 'query', 'flag', 'code']}
    wordClassName="text-red dark:text-yellow"
    prefix={
        <span className="inline-flex items-center gap-2">
            <img src={posthogIcon} alt="" aria-hidden className="size-7 rounded-md" />
            <span>PostHog</span>
        </span>
    }
/>
```

## Props

| Prop                 | Type              | Default | Notes                                                                        |
| -------------------- | ----------------- | ------- | ---------------------------------------------------------------------------- |
| `words`              | `string[]`        | —       | Words cycled in order. The **last** word is held longer before looping.      |
| `prefix`             | `React.ReactNode` | —       | Static content before the scroller (icon + label, etc.).                     |
| `interval`           | `number`          | `1200`  | ms each word rests before scrolling to the next.                             |
| `holdDuration`       | `number`          | `2400`  | ms the final word is held before the reel loops.                             |
| `transitionDuration` | `number`          | `550`   | ms the scroll between words takes.                                           |
| `className`          | `string`          | `''`    | Outer wrapper — put font size/weight here.                                   |
| `wordClassName`      | `string`          | `''`    | Applied to each scrolling word (color/gradient).                             |
| `srWord`             | `string`          | —       | Word announced to screen readers. Defaults to the last word.                 |

## How it works

- The reel is the `words` list plus a duplicate of the first word appended at the end. Advancing onto
  that duplicate scrolls one more step in the same direction, then the position snaps back to the real
  first word **without** a transition — so the loop is seamless and always scrolls downward.
- One word's rendered height is measured (and re-measured via `ResizeObserver`) so the reel translates
  exactly one line per step at any font size.

## Accessibility

- Honors `prefers-reduced-motion`: renders the final word statically, no animation.
- The moving reel is `aria-hidden`; a visually-hidden copy of `srWord` (default: last word) is exposed
  to assistive tech so the line still reads sensibly (e.g. "PostHog code").
