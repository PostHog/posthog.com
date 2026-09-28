# Embedded pricing calculator

`Embedded.tsx` exposes the current pricing page calculator as the global MDX component `PricingCalculator`. Blog authors do not need an import.

```mdx
## Estimate your monthly cost

<PricingCalculator
    defaultProducts={["product_analytics", "session_replay"]}
/>
```

## Props

| Prop | Type | Default | Behavior |
| --- | --- | --- | --- |
| `defaultProducts` | `string[]` | The pricing page's default selection | Selects the initial products, in the supplied order. The first available product is active. |

Use the product `type` values from `src/hooks/productData`, such as `product_analytics`, `session_replay`, `feature_flags`, or `error_tracking`. The calculator filters unavailable products and removes duplicate selections. An empty array starts with the existing empty estimate view.

```mdx
<PricingCalculator
/>

<PricingCalculator
    defaultProducts={["error_tracking"]}
/>

<PricingCalculator
    defaultProducts={[]}
/>
```

These are alternative examples. Use one calculator per article: its share link stores an estimate in the page's query parameters. Shared estimates take precedence over `defaultProducts`. Readers can add or remove products, change usage, select add-ons, inspect rates, and share an estimate with the existing controls.

Keep the tag on multiple lines. The site's `gatsby-remark-inline-jsx-paragraphs` plugin wraps single-line components in a paragraph, which is not valid for this block component.

`defaultProducts` initializes local state on mount. Changes to the prop do not reset a reader's estimate.

## Implementation

- `Embedded.tsx` adds the article wrapper and disables article typography inside the tool. `RenderInClient` keeps the initial server and client markup consistent. `React.lazy` loads the calculator on demand; the placeholder includes a link to `/pricing`.
- `Tabbed.tsx` owns selection, usage, totals, and share links. The pricing page uses the same component without props. Its container queries respond to the calculator's available width.
- `useProducts` and the existing billing query provide product data and rates. The embed does not define prices or duplicate calculator logic.
- Both `src/mdxGlobalComponents.js` and `src/mdxGlobalComponents.ts` register the shortcode. The JavaScript registry currently takes precedence in Gatsby's resolver.
- The old named `PricingCalculator` export in this directory's `index.tsx` is a separate, legacy implementation. The MDX shortcode uses `Embedded.tsx` and the current `Tabbed.tsx` implementation.

The embed uses the site's existing app, theme, and billing-data providers. It is not a standalone third-party widget.

## Verification

Check an MDX article at narrow and wide window sizes in light and dark mode. Check initial selection, an empty selection, duplicate or unavailable product types, adding and removing products, usage changes, and shared-link restoration. Also check `/pricing` with no props to confirm its default selection and pricing behavior.
