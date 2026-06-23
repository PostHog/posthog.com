# AppsList

Renders PostHog's products as a compact, multi-column list of icon links to their docs.

The list is sourced from `useProducts()` (`src/hooks/useProducts.tsx`), which is the canonical product set, the same data that powers the `/products` page. This keeps the docs "Apps" list in sync with the real product lineup instead of scraping the docs navigation (which pulled in nav entries that aren't standalone products).

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

- the docs landing page (`src/pages/docs/index.tsx`), under the "Apps" heading
- the self-driving "Web app" surface page (`contents/docs/start-here/web.mdx`), under "Your apps"

## Props

| Prop        | Type     | Default | Description                                 |
| ----------- | -------- | ------- | ------------------------------------------- |
| `className` | `string` | `''`    | Extra classes appended to the grid wrapper. |

## Notes

- Uses project color tokens only via each product's `color` (e.g. `text-blue`). The dynamic `text-${color}` classes mirror the pattern already used on `/products` and rely on those tokens being safelisted.
- Layout uses `@container` queries (`@md`, `@2xl`), so it reflows correctly inside resizable app windows.
