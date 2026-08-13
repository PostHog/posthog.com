# AppsList

Renders PostHog's tools as a compact list of icon links to their docs, as text columns or as chips.

The list is sourced from `useProducts()` (`src/hooks/useProducts.tsx`), which is the canonical product set, the same data that powers the `/products` page. This keeps the docs "Tools" list in sync with the real lineup instead of scraping the docs navigation (which pulled in nav entries that aren't standalone products).

## Docs URLs

For most products the docs URL is `/docs/<slug>`, derived from the product's marketing `slug`. A few products have a slug that doesn't map cleanly, so they're overridden by `handle` in `docsUrlOverrides`:

- `data_warehouse` to `/docs/data-warehouse`
- `realtime_destinations` to `/docs/cdp/destinations`
- `posthog_ai` to `/docs/posthog-ai`

If a new product is added whose slug isn't its docs path, add an override.

## Usage

```tsx
import { AppsList } from 'components/Docs/AppsList'

<AppsList />
```

It renders only the grid of links, so provide your own heading and intro copy around it. Used on:

- the docs landing page (`src/pages/docs/index.tsx`), under the "Tools" heading, with `variant="chips"`
- the self-driving "Web app" surface page (`contents/docs/self-driving/web.mdx`), under "Your apps"

## Props

| Prop        | Type                   | Default     | Description                            |
| ----------- | ---------------------- | ----------- | -------------------------------------- |
| `className` | `string`               | `''`        | Extra classes appended to the wrapper. |
| `variant`   | `'columns' \| 'chips'` | `'columns'` | Layout. See below.                     |

### Variants

- **`columns`** – multi-column text columns (`@md`, `@2xl`). The original layout, used by
  `contents/docs/self-driving/web.mdx`.
- **`chips`** – each tool as a bordered pill, flowing left to right and wrapping. Fewer rows than
  `columns`, which is why the docs landing page uses it.

### How chips relate to the Surfaces row

The docs landing page renders its **Surfaces** row as the same bordered pill one size up, so the
two read as one system. Both take their metrics from `OSButton`'s `simpleSizeClasses` rather than
hand-picked padding: Surfaces uses `lg`, this uses `md`. The page's CTAs use the real `OSButton` at
`lg`, whose chunkier `primary`/`secondary` variants keep them above both. Size is the only
differentiator – background (`bg-accent`) and weight (`font-medium`) match deliberately.

## Notes

- Uses project color tokens only via each product's `color` (e.g. `text-blue`). The dynamic `text-${color}` classes mirror the pattern already used on `/products` and rely on those tokens being safelisted.
- Layout uses `@container` queries (`@md`, `@2xl`), so it reflows correctly inside resizable app windows.
