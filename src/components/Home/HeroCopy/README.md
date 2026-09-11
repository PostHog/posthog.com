# HeroCopy

The homepage hero headline and body copy. A preview switcher lets you flip between the three
positioning options Charles is showing people.

## Use

```tsx
import { HeroBody, HeroCopyProvider, HeroCopySwitcher, HeroHeadline } from 'components/Home/HeroCopy'
;<HeroCopyProvider>
    <HeroCopySwitcher />
    <HeroHeadline />
    <HeroBody />
</HeroCopyProvider>
```

The headline and the body sit in different cells of the hero grid, so they are two components and
not one. Wrap both (and the switcher) in `HeroCopyProvider` so they stay on the same variant.

The switcher is passed to `ReaderView` as `overlay`, so it sits in the article column
outside the scroll fade mask. Hover the bottom-right corner to show it.

## Variants

Each variant in `variants.tsx` has an `id`, a short `label` for the switcher, a `headline` (a `lead`
clause and an `emphasis` clause that gets the blue highlight), and a `Body` component. `HeroBody`
adds the "Join 500,000+ teams" line after the variant body, because that line is the same in all
variants.

| Variant id    | Label           | Headline                       |
| ------------- | --------------- | ------------------------------ |
| `self-driving`| Self-driving    | Make your product self-driving |
| `data-focus`  | Data focus      | Your product's context layer   |
| `partner`     | Product partner | Build a better product         |

The active variant is also written to the `hero` query param, so a URL like `/?hero=data-focus`
opens that option directly.
