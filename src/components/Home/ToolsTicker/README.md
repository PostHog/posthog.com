# ToolsTicker

A one-line, infinitely rolling marquee of PostHog products: a static label ("Built-in tools for your agents:") followed by a horizontally scrolling strip of product icons + names, each linking to its product page.

Currently rendered in the homepage hero (`src/components/Home/Test/index.tsx`), directly under the tabbed `HeroCarousel`.

## Usage

```tsx
import ToolsTicker from 'components/Home/ToolsTicker'

<ToolsTicker className="mb-8" />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `handles` | `string[]` | Core products + notable betas (18 handles) | Product handles resolved via `useProduct()` |
| `label` | `string` | `"Built-in tools for your agents:"` | Static prefix shown before the scrolling strip |
| `className` | `string` | `''` | Extra classes on the root element |

Handles that don't resolve to a product with a `name` and `slug` are silently skipped. `SLUG_OVERRIDES` in the component maps handles whose product data has no `slug` (currently `inbox` → `docs/self-driving/inbox`).

## How the loop works

- The item list is rendered **twice** inside a `flex w-max` track.
- The `tools-ticker-marquee` keyframe (defined in `src/styles/global.css`, next to `hero-carousel-progress`) animates the track from `translateX(0)` to `translateX(-50%)` – exactly one copy's width – so the loop is seamless for any number of items.
- Each `<ul>` has `pr-6` matching its internal `gap-6`, so the seam between copies is invisible.
- Duration is `items × 2.5s`, keeping the apparent speed constant when the list changes.

## Behavior

- **Pause on hover/focus**: `animationPlayState` toggles via mouse enter/leave and focus/blur (focus events bubble from the links), same pattern as `HeroCarousel`'s progress bar.
- **Reduced motion**: with `prefers-reduced-motion: reduce`, the animation is disabled and the strip becomes a manually scrollable `overflow-x-auto` row.
- **Accessibility**: the duplicate copy is `aria-hidden` and its links have `tabIndex={-1}`, so screen readers and keyboard users encounter each product exactly once.
- **Edge fade**: CSS `mask-image` gradients fade both ends of the strip (same arbitrary-value pattern as `PlatformInstall/CopyableCommand`).

## Conventions

- Links use `state={{ newWindow: true }}` so product pages open in a new OS-style window.
- Icon colors use the dynamic `text-${product.color}` pattern – all colors used by the default handles are in `safelist.txt`. If you add a handle with a new color, confirm it's safelisted.
- Layout uses container queries only (`@sm:`); the label stacks above the strip in narrow containers.
- SSR-safe: data comes from `useProduct()` (Gatsby static query); no browser globals.
