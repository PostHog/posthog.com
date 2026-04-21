# ReaderViewProduct

Stacked, prose-first product pages rendered inside `ReaderView`. This is the replacement for the older `Slides/SlidesTemplate` flow — each product section is a normal bit of markup instead of a 1280x720 slide.

- **About surface:** `/<product-slug>` → `<ProductReaderView productHandle="…" />` stacks one `<section>` per `marketingMenu` item.
- **Pricing surface:** `/<product-slug>/pricing` → `<ProductReaderView productHandle="…" surface="pricing" />` stacks one `<section>` per `pricingMenu` item.
- **Docs surface:** `/docs/<product-slug>` → a normal `<ReaderView>` that shares the same tabbed sidebar via `buildProductMenuTabs({ productData, activeSurface: 'docs' })`.

Clicking a tab in the sidebar never navigates — it just swaps which menu is visible. Clicking a menu item does navigate (in-page anchor on the active surface, cross-page Gatsby link to `${basePath}#${slug}` otherwise).

---

## Three things wired together

```
productData.<surface>Menu   →   sections rendered in the article column
[{ slug, name, template? }]     (via templateRegistry[template ?? slug])

                            →   items in that surface's tab in the sidebar
                                (via MarketingNav or ProductNav)
```

`<surface>Menu` is one of `marketingMenu` (About surface) or `pricingMenu` (Pricing surface). Add `pricingMenu` to a product to make the Pricing tab appear; omit it and only About + Docs show up.

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

## Defining a product's menus

Add `marketingMenu` (and optionally `pricingMenu`) arrays to the product data hook (for example [`src/hooks/productData/session_replay.tsx`](../../../hooks/productData/session_replay.tsx)):

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
        { slug: 'comparison-summary', name: 'PostHog vs...' },
        { slug: 'feature-comparison', name: 'Feature comparison' },
        { slug: 'docs', name: 'Docs' },
        { slug: 'pairs-with', name: 'Pairs with...' },
        { slug: 'getting-started', name: 'Get started' },
    ],
    pricingMenu: [
        { slug: 'rates', name: 'Session Replay rates', template: 'pricing' },
        { slug: 'calculator', name: 'Pricing calculator' },
        { slug: 'plans', name: 'Plans' },
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

**Pricing page** — same component, just pass `surface="pricing"`:

```tsx
// src/pages/session-replay/pricing.tsx
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function SessionReplayPricing() {
    const data = useStaticQuery(/* allProductData for <Pricing> */)
    return <ProductReaderView productHandle="session_replay" data={data} surface="pricing" />
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

All three surfaces render identical sidebar tabs ("Product", "Pricing" — when `pricingMenu` exists, "Docs"). The active surface's tab uses in-page anchor scrolling; the other tabs navigate to `/<slug>#<section>` or `/<slug>/pricing#<section>` and the browser handles the anchor jump after navigation.

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
| `calculator`           | (none yet)                              | Stub — pricing calculator placeholder for the Pricing surface. |
| `plans`                | (none yet)                              | Stub — plans summary placeholder for the Pricing surface.      |

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

## Product switcher

[`ProductSwitcher`](./ProductSwitcher.tsx) is the searchable dropdown rendered at the very top of the LeftSidebar. It sources the product list from `useProduct()` (which chains in `useProducts()` plus the alpha/beta extensions in [`hooks/useProduct.ts`](../../../hooks/useProduct.ts)) and renders each entry through [`OSForm/select.tsx`](../../OSForm/select.tsx) with the product's `Icon` (tinted with `text-${color}`) and name.

```tsx
<ReaderView
    productSelect={<ProductSwitcher activeHandle="session_replay" />}
    menuTabs={menuTabs}
>
    …
</ReaderView>
```

Both `ProductReaderView` and the docs page set this up automatically; pass it manually when wiring a new product surface.

Props:
- `activeHandle: string` — the currently selected product's `handle`.
- `excludeHandles?: string[]` — handles to hide from the dropdown.

### Sizing and styling

The visible look (icon size, dropdown height, option text) is tuned inside [`ProductSwitcher.tsx`](./ProductSwitcher.tsx) via props on the underlying [`OSSelect`](../../OSForm/select.tsx):

- **Trigger size** — `size="sm"` on `OSSelect` (controls the trigger button's padding/typography). Other allowed values: `'md'`, `'lg'`.
- **Icon size** — set on the icon element built per option (currently `size-4`, tinted `text-${color}`). Edit the `<p.Icon className=… />` line in `ProductSwitcher.tsx` to change.
- **Dropdown max height** — `maxHeight="max-h-[70vh]"` (any Tailwind max-height utility works). Default in `OSSelect` is `max-h-60` if omitted.
- **Option row padding & text** — `optionClassName="!px-2 !py-1 !text-[13px]"`. This is an additive prop on `OSSelect` that's appended to each option's button class list. The `!` (Tailwind `!important`) wins against the OSSelect defaults of `px-3 py-2 text-sm`. Other `OSSelect` consumers are unaffected since `optionClassName` defaults to `''`.

What's still hard-coded inside `OSSelect` (not exposed as props): the search input row, the header rows, and the check-icon next to the active option. Add additive override props on `OSSelect` if you need those tunable.

### Navigation

Switching products navigates via [`getProductSurfaceUrl`](./getProductSurfaceUrl.ts):

| Current URL                           | Target                          | Reason |
| ------------------------------------- | ------------------------------- | ------ |
| `/<currentSlug>`                      | `/<newSlug>`                    | About root → About root. |
| `/<currentSlug>/<section>` where `section` is in `KNOWN_SHARED_SECTIONS` (currently just `'pricing'`) | `/<newSlug>/<section>` | Preserve known shared surfaces (e.g. Pricing). |
| `/<currentSlug>/<anything-else>`      | `/<newSlug>`                    | Unknown subpath → fall back to product root. |
| `/docs/<currentSlug>/...`             | `/docs/<newSlug>`               | Docs subpaths are product-specific; always strip to docs root. |

To add a new shared surface (e.g. `tutorials`), append its segment to `KNOWN_SHARED_SECTIONS` in [`getProductSurfaceUrl.ts`](./getProductSurfaceUrl.ts).

---

## Components in this folder

| File                       | Purpose                                                            |
| -------------------------- | ------------------------------------------------------------------ |
| `index.tsx`                | `ProductReaderView` (entry point for the About + Pricing surfaces) + barrel exports. Takes `surface?: 'about' \| 'pricing'`. |
| `types.ts`                 | `MarketingNavItem`, `SectionComponentProps`, `resolveTemplate(item)`. |
| `buildProductMenuTabs.tsx` | Returns the `[About, Pricing, Docs]` tabs for `<ReaderView menuTabs={…}>`. Tabs whose menus are empty are omitted. |
| `MarketingNav.tsx`         | About-tab menu on the About page. Uses `ElementScrollLink` for in-page anchor scrolling inside the radix `ScrollArea` viewport. |
| `ProductNav.tsx`           | About-tab menu on every other product surface (Docs, tutorials, community questions, etc.). Uses Gatsby `Link` → `/<slug>#<anchor>` for cross-page jumps. |
| `ProductSwitcher.tsx`      | Searchable product dropdown rendered above the menu. Driven by `useProduct()`; navigates via `getProductSurfaceUrl`. |
| `getProductSurfaceUrl.ts`  | Pure function that maps the current path onto the equivalent surface for another product when the user switches. |
| `templates/`               | One file per section template + the `templateRegistry`.            |

---

## Future surfaces

`ProductNav` is named broadly on purpose — today it's driven by `marketingMenu` and `pricingMenu`, but the intent is that any product-related surface (tutorials landing page, community questions page, customer stories filtered by product, etc.) drops in the same sidebar with this nav, so switching between surfaces feels like one app. To add a new surface:

1. Add a new menu field on the product hook (e.g. `tutorialsMenu`).
2. Extend `ProductSurface` and the `SURFACE_MENU_FIELD` map in `index.tsx`, and add a tab branch in `buildProductMenuTabs.tsx`.
3. Add a new page that calls `<ProductReaderView surface="…" />`.
