# ReaderViewProduct

Stacked, prose-first product pages rendered inside `ReaderView`. This is the replacement for the older `Slides/SlidesTemplate` flow — each product section is a normal bit of markup instead of a 1280x720 slide.

- **About surface:** `/<product-slug>` → `<ProductReaderView productHandle="…" />` stacks one `<section>` per `marketingMenu` item.
- **Docs surface:** `/docs/<product-slug>` → a normal `<ReaderView>` that shares the same tabbed sidebar via `buildProductMenuTabs({ productData, activeSurface: 'docs' })`.

Clicking a tab in the sidebar never navigates — it just swaps which menu is visible. Clicking a menu item does navigate (in-page anchor or cross-page Gatsby link).

---

## Three things wired together

```
productData.marketingMenu   →   section rendered in the article column
[{ slug, name, template? }]     (via templateRegistry[template ?? slug])

                            →   item in the About tab of the sidebar
                                (via MarketingNav or ProductNav)
```

`slug`, `name`, and `template` are the only inputs you need to think about.

### `slug`

- Unique id for the menu item.
- Becomes the `id` of the rendered `<section id={slug}>` — so the anchor link `/<product>#<slug>` just works.
- Defaults as the lookup key into `templateRegistry` if no `template` is specified.

### `name`

- The label shown in the sidebar.

### `template` (optional)

- String key into `templateRegistry` (see `templates/index.ts`).
- When omitted, defaults to `slug`.
- Lets multiple items reuse the same template under different anchors:

  ```ts
  marketingMenu: [
      { slug: 'core-features', name: 'Core features', template: 'features' },
      { slug: 'mobile-features', name: 'Mobile features', template: 'features' },
  ]
  ```

- Or lets a single item pick a template that doesn't match its slug:

  ```ts
  { slug: 'why-us', name: 'Why PostHog', template: 'comparison-summary' }
  ```

### `icon` (optional)

- Any `React.ReactNode`. Rendered next to the `name` in the sidebar.

---

## Defining a product's menu

Add a `marketingMenu` array to the product data hook (for example [`src/hooks/productData/session_replay.tsx`](../../../hooks/productData/session_replay.tsx)):

```tsx
export const sessionReplay = {
    name: 'Session Replay',
    handle: 'session_replay',
    slug: 'session-replay',
    // …other product data
    marketingMenu: [
        { slug: 'overview', name: 'Overview' },
        { slug: 'customers', name: 'Customers' },
        { slug: 'features', name: 'Features' },
        { slug: 'ai', name: 'AI' },
        { slug: 'answers', name: 'Questions' },
        { slug: 'pricing', name: 'Pricing' },
        { slug: 'comparison-summary', name: 'PostHog vs...' },
        { slug: 'feature-comparison', name: 'Feature comparison' },
        { slug: 'docs', name: 'Docs' },
        { slug: 'pairs-with', name: 'Pairs with...' },
        { slug: 'getting-started', name: 'Get started' },
    ],
}
```

Only the items listed here render — other product-data fields (like `screenshots`, `hog`, `slider`, `videos`, `presenterNotes`) are consumed by individual templates internally and don't need their own menu entry.

## Page wiring

**About page** — stacks the sections and auto-wires the sidebar:

```tsx
// src/pages/session-replay/index.tsx
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function SessionReplay() {
    const data = useStaticQuery(/* allProductData for <Pricing> */)
    return <ProductReaderView productHandle="session_replay" data={data} />
}
```

**Docs page** — provides its own body, opts in to the shared sidebar:

```tsx
// src/pages/docs/session-replay.tsx
import ReaderView from 'components/ReaderView'
import { buildProductMenuTabs } from 'components/Products/ReaderViewProduct'
import useProduct from 'hooks/useProduct'

const SessionRecording = () => {
    const productData = useProduct({ handle: 'session_replay' })
    const menuTabs = buildProductMenuTabs({ productData, activeSurface: 'docs' })

    return (
        <ReaderView menuTabs={menuTabs}>
            {/* …docs page content… */}
        </ReaderView>
    )
}
```

Both surfaces render identical sidebar tabs ("About" and "Docs"). On the About page the About items scroll in-place; on the Docs page they navigate to `/<slug>#<section>` and the browser handles the anchor jump after navigation.

---

## The template library

Templates live in [`templates/`](./templates) and are registered in [`templates/index.ts`](./templates/index.ts). Each template receives the same `SectionComponentProps`:

```ts
interface SectionComponentProps {
    id: string          // from the menu item's slug
    productData: any    // from useProduct({ handle })
    data: any           // pass-through from the page (GraphQL result)
    customers: any[]
    customerSlugs: string[]
    hasCaseStudy: (slug: string) => boolean
    allProducts: any[]
}
```

The only invariant: wrap the output in `<section id={id} className="scroll-mt-20 not-prose">…</section>` so the anchor jump lands in the right spot and the `ReaderView`'s prose styles don't leak in.

### Built-in templates

| Template key           | Reads from `productData`                | Summary                                                        |
| ---------------------- | --------------------------------------- | -------------------------------------------------------------- |
| `overview`             | `name`, `Icon`, `overview`, `screenshots`, `status` | Hero: title, description, product icon, screenshot. |
| `customers`            | `customers`                             | Grid of customer cards + optional case-study link.             |
| `features`             | `features`                              | Vertical list of feature cards (headline, description, images, children, sub-features, labels). |
| `ai`                   | `ai`, `name`                            | AI skills + prompts + hero image.                              |
| `posthog-on-posthog`   | `postHogOnPostHog`                      | How PostHog uses this product internally.                      |
| `answers`              | `questions`, `answersHeadline`, `answersDescription` | Question list with optional tutorial links.       |
| `pricing`              | `handle`                                | Wraps the existing `PlanComparison` billing table.             |
| `comparison-summary`   | `comparison.summary`                    | Two-column us-vs-them overview.                                |
| `feature-comparison`   | `comparison.companies`, `comparison.rows`, `comparison.excluded_sections` | Wraps `ProductComparisonTable`. |
| `docs`                 | `slug`, `name`                          | `DocLinks` populated from `docsMenu` lookup.                   |
| `pairs-with`           | `pairsWith`                             | Grid of cards linking to other products.                       |
| `getting-started`      | `name`                                  | Wizard install command + signup CTA.                           |

If a template finds nothing to render (e.g. `customers` for a product with no `customers` data), it returns `null` — the section disappears but the menu item stays.

### Adding a new template

1. Create a component in `templates/` that accepts `SectionComponentProps` and wraps its output in `<section id={id} className="scroll-mt-20 not-prose">…</section>`.
2. Register it in [`templates/index.ts`](./templates/index.ts):
   ```ts
   import MyTemplate from './MyTemplate'
   export const templateRegistry = {
       …,
       'my-template': MyTemplate,
   }
   ```
3. Reference it from any product's `marketingMenu`:
   ```ts
   { slug: 'some-slug', name: 'Some name', template: 'my-template' }
   ```

---

## Components in this folder

| File                       | Purpose                                                            |
| -------------------------- | ------------------------------------------------------------------ |
| `index.tsx`                | `ProductReaderView` (the About-surface entry point) + barrel exports. |
| `types.ts`                 | `MarketingNavItem`, `SectionComponentProps`, `resolveTemplate(item)`. |
| `buildProductMenuTabs.tsx` | Returns the `[About, Docs]` tabs for `<ReaderView menuTabs={…}>`. |
| `MarketingNav.tsx`         | About-tab menu on the About page. Uses `ElementScrollLink` for in-page anchor scrolling inside the radix `ScrollArea` viewport. |
| `ProductNav.tsx`           | About-tab menu on every other product surface (Docs, tutorials, community questions, etc.). Uses Gatsby `Link` → `/<slug>#<anchor>` for cross-page jumps. |
| `templates/`               | One file per section template + the `templateRegistry`.            |

---

## Future surfaces

`ProductNav` is named broadly on purpose — today it's driven by `marketingMenu`, but the intent is that any product-related surface (tutorials landing page, community questions page, customer stories filtered by product, etc.) drops in the same sidebar with this nav, so switching between surfaces feels like one app. When new surfaces are added, extend `buildProductMenuTabs` with more tabs alongside "About" and "Docs".
