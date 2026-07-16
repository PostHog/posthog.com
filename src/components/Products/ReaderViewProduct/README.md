# ReaderViewProduct

Stacked, prose-first product pages rendered inside `ReaderView`. This is the replacement for the older `Slides/SlidesTemplate` flow — each product section is a normal bit of markup instead of a 1280x720 slide.

- **Product surface:** `/<product-slug>` → `<ProductReaderView productHandle="…" />` stacks one `<section>` per `productMenu` item.
- **Pricing surface:** `/<product-slug>/pricing` → `<ProductReaderView productHandle="…" surface="pricing" />` stacks one `<section>` per `pricingMenu` item.
- **Docs surface:** `/docs/<product-slug>` → a normal `<ReaderView>` that shares the same tabbed sidebar via `buildProductMenuTabs({ productData, activeSurface: 'docs' })`.

Clicking a tab in the sidebar never navigates — it just swaps which menu is visible. Clicking a menu item does navigate (in-page anchor on the active surface, cross-page Gatsby link to `${basePath}#${slug}` otherwise).

---

## Three things wired together

```
productData.<surface>Menu        →   sections rendered in the article column
[{ slug, name, template?,             (via templateRegistry[template ?? slug];
   icon?, group?, hideFromNav?,        item.props is forwarded to the section
   props? }]                           component)

                                 →   items in that surface's tab in the sidebar
                                     (via ProductNav, in-page or cross-page mode)
```

`<surface>Menu` is one of `productMenu` (Product surface) or `pricingMenu` (Pricing surface). Add `pricingMenu` to a product to make the Pricing tab appear; omit it and only Product + Docs show up.

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
  productMenu: [
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

### `group` (optional)

- String key. Consecutive items with the same `group` value render inside a single divided container (`divide-y` between sections). Standalone items render as siblings of the outer flex.

### `hideFromNav` (optional)

- When `true`, the section still renders on the page but is hidden from the sidebar nav. Useful for footer CTAs or content slated for removal.

### `props` (optional)

- Object passed straight through to the section component as extra props (alongside the standard `SectionComponentProps`). Used to feed slot-specific data into reusable templates — e.g. handing the `applications` and `top-features` carousel templates their slide arrays.

---

## Defining a product's menus

Each product that opts into `ProductReaderView` is defined in a hook file under `src/hooks/productData/` (for example [`src/hooks/productData/session_replay.tsx`](../../../hooks/productData/session_replay.tsx)). The hook is the **single source of truth** for menus, content, and section render config — there is no page-level override.

When a product's surface grows beyond the menu config and basic data fields, the supporting JSX (carousel slides, large reusable sub-trees) lives in a sibling folder named after the hook. The hook stays as a single `.tsx` file because it's shared with production tooling.

```
src/hooks/productData/
  session_replay.tsx          sessionReplay export (data + productMenu + pricingMenu)
  session_replay/             sibling folder for supporting modules
    features.tsx              `features` object reused by sections and slide arrays
    slides.tsx                CarouselSlide[] arrays consumed via menu item `props`
```

The hook is imported as `'hooks/productData/session_replay'` (resolves to `session_replay.tsx`); the sibling folder is imported via `./session_replay/<module>` from inside the hook.

Cross-product JSX primitives shared between slide content and templates (e.g. `LabeledList`, `FilterTag`, `InlineCode`) live in [`helpers.tsx`](./helpers.tsx) at this folder root, importable from `'components/Products/ReaderViewProduct/helpers'` or via the package barrel.

```tsx
// src/hooks/productData/session_replay.tsx
import { applications, topFeatures } from './session_replay/slides'
import { features } from './session_replay/features'

export const sessionReplay = {
    name: 'Session Replay',
    handle: 'session_replay',
    slug: 'session-replay',
    // …other product data
    productMenu: [
        { slug: 'overview', name: 'Overview', icon: <IconEye className="size-4" /> },
        { slug: 'customers', name: 'Who uses it?', group: 'divided', icon: <IconPeople className="size-4" /> },
        {
            slug: 'applications',
            name: 'How do I use it?',
            group: 'divided',
            icon: <IconCursorClick className="size-4" />,
            props: { slides: applications },
        },
        {
            slug: 'top-features',
            name: 'Top features',
            group: 'divided',
            icon: <IconSparkles className="size-4" />,
            props: { slides: topFeatures },
        },
        { slug: 'getting-started', name: 'Get started', group: 'divided' },
        { slug: 'pairs-with', name: 'Pairs with...', hideFromNav: true },
    ],
    pricingMenu: [
        { slug: 'calculator', name: 'Pricing calculator' },
        { slug: 'plans', name: 'Plans' },
        // Hidden footer CTA rendered at the bottom of the Pricing surface.
        { slug: 'pricing-cta', name: 'Get started', hideFromNav: true },
    ],
    features,
    // …other product data fields the templates read directly
}
```

Only the items listed in `productMenu` / `pricingMenu` render as sections — other product-data fields (like `screenshots`, `hog`, `slider`, `videos`, `presenterNotes`) are consumed by individual templates internally and don't need their own menu entry.

If a section's slug already matches a key in `templateRegistry` (see `templates/index.ts`), no extra wiring is needed; the registry resolves it automatically. Use `template:` only when the slug differs from the desired template key, or when reusing one template under several anchors.

## Page wiring

**Product page** — one-liner that just hands the `productHandle` to `ProductReaderView`. The hook supplies everything else.

```tsx
// src/pages/session-replay/index.tsx
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function SessionReplay(): JSX.Element {
    return <ProductReaderView productHandle="session_replay" />
}
```

**Pricing page** — same component, plus `surface="pricing"`:

```tsx
// src/pages/session-replay/pricing.tsx
import ProductReaderView from 'components/Products/ReaderViewProduct'

export default function SessionReplayPricing(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="session_replay"
            surface="pricing"
            seoOverrides={{ title: 'Session Replay pricing – PostHog' }}
        />
    )
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
3. Reference it from any product's `productMenu` (or `pricingMenu`):
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
| `/<currentSlug>`                      | `/<newSlug>`                    | Product root → Product root. |
| `/<currentSlug>/<section>` where `section` is in `KNOWN_SHARED_SECTIONS` (currently just `'pricing'`) | `/<newSlug>/<section>` | Preserve known shared surfaces (e.g. Pricing). |
| `/<currentSlug>/<anything-else>`      | `/<newSlug>`                    | Unknown subpath → fall back to product root. |
| `/docs/<currentSlug>/...`             | `/docs/<newSlug>`               | Docs subpaths are product-specific; always strip to docs root. |

To add a new shared surface (e.g. `tutorials`), append its segment to `KNOWN_SHARED_SECTIONS` in [`getProductSurfaceUrl.ts`](./getProductSurfaceUrl.ts).

---

## Components in this folder

| File                       | Purpose                                                            |
| -------------------------- | ------------------------------------------------------------------ |
| `index.tsx`                | `ProductReaderView` (entry point for the Product + Pricing surfaces) + barrel exports. Takes `surface?: 'product' \| 'pricing'`. |
| `types.ts`                 | `ProductNavItem`, `SectionComponentProps`, `resolveTemplate(item)`. |
| `buildProductMenuTabs.tsx` | Returns the `[Product, Pricing, Docs]` tabs for `<ReaderView menuTabs={…}>`. Tabs whose menus are empty are omitted. |
| `ProductNav.tsx`           | The single product nav. When given a `contentRef` it scrolls in-page (radix viewport + ScrollSpy active highlighting via `ElementScrollLink`); without one it emits Gatsby `<Link>`s to `${basePath}#${slug}` for cross-page jumps. The `'overview'` slug is special-cased to land at the top of the surface in both modes. |
| `ProductSwitcher.tsx`      | Searchable product dropdown rendered above the menu. Driven by `useProduct()`; navigates via `getProductSurfaceUrl`. |
| `getProductSurfaceUrl.ts`  | Pure function that maps the current path onto the equivalent surface for another product when the user switches. |
| `templates/`               | One file per section template + the `templateRegistry`.            |

---

## Future surfaces

`ProductNav` is named broadly on purpose — today it's driven by `productMenu` and `pricingMenu`, but the intent is that any product-related surface (tutorials landing page, community questions page, customer stories filtered by product, etc.) drops in the same sidebar with this nav, so switching between surfaces feels like one app. To add a new surface:

1. Add a new menu field on the product hook (e.g. `tutorialsMenu`).
2. Extend `ProductSurface` and the `SURFACE_MENU_FIELD` map in `index.tsx`, and add a tab branch in `buildProductMenuTabs.tsx`.
3. Add a new page that calls `<ProductReaderView surface="…" />`.
