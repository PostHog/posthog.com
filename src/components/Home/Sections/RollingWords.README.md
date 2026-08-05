# RollingWords

A kinetic inline word-cycler for headlines. Renders a single word slot that **vertically rolls** through a list of words — each word rises from below as it fades in, while the outgoing word continues upward and fades out. The slot takes each word's **natural width**, so the line grows and shrinks with the word. The list **accelerates** (driven by each step's `hold`) and then **settles permanently on the last word** with a slower, graceful fade.

Built for the homepage hero: _"Let PostHog **analyze → diagnose → … → code**"_.

## Usage

```tsx
import { RollingWords, type RollingWordStep } from 'components/Home/Sections/RollingWords'

const HERO_VERBS: RollingWordStep[] = [
    { word: 'analyze', hold: 1000 },
    { word: 'diagnose', hold: 800 },
    // ...accelerating...
    { word: 'ship', hold: 110 },
    { word: 'code', hold: 0 }, // final word — sits permanently
]

;<h1>
    Let PostHog <RollingWords steps={HERO_VERBS} className="text-red dark:text-yellow font-bold" />
</h1>
```

## Props

| Prop        | Type                | Default | Description                                                                                          |
| ----------- | ------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `steps`     | `RollingWordStep[]` | —       | Ordered words + per-word `hold` (ms before advancing). The **last** word stays permanently.          |
| `className` | `string`            | `''`    | Applied to the wrapper. Set the rolling word's **color and weight** here. |

`RollingWordStep` = `{ word: string; hold: number }`.

## How it works

- **Roll:** `framer-motion`'s `AnimatePresence` (`initial={false}`) swaps the word. Words stack absolutely in a vertically-clipping cell: enter `y: 105% → 0` + fade in; exit `y: 0 → -105%` + fade out. An invisible in-flow sizer set to the **current** word gives the cell its natural width.
- **Acceleration:** a `setTimeout` chain advances `index` using `steps[index].hold`. It stops once the last word is reached. The roll duration also scales with each word's `hold`, so very short holds roll quickly instead of piling up against the next swap — this makes a rapid "speed-run" of words (short holds) blur past smoothly. Compose multi-pass effects (e.g. a readable pass then an accelerating blur) by repeating words in the `steps` array with decreasing holds.
- **Settle:** the last word uses a longer ease-out-expo transition (`[0.22, 1, 0.36, 1]`, 0.7s) instead of the snappy curve used for the fast cycle.
- **Replay:** once the cycle settles on the final word, a small `IconRewind` button appears just past the word — only on hover (or keyboard focus) — and restarts the animation from the first word.
- **Accessibility:** respects `prefers-reduced-motion` (via `components/Code/usePrefersReducedMotion`) by rendering only the final word, statically (no replay control).

## Notes

- Only the **color/weight** belong in `className`; sizing comes from the surrounding heading.
- The slot grows/shrinks to each word's natural width, so place it where trailing layout shift is harmless (e.g. at the end of a line).
