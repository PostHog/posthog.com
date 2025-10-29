# ProductComparisonTable Component

A flexible comparison table component for displaying product and platform feature comparisons across multiple competitors.

## Props

```typescript
interface ProductComparisonTableProps {
    competitors: string[] // Array of competitor keys
    rows: RowConfig[] // Row configuration array
    width?: 'auto' | 'full' // Table width (default: 'auto')
}

interface RowConfig {
    // Shorthand notation (recommended)
    path?: string // e.g., "error_tracking.core.error_grouping" or "product_analytics"

    // Type is inferred automatically, but can be explicitly set if needed
    type?: 'feature' | 'header' | 'platform' | 'product'

    // For explicit configuration (type inferred automatically)
    product?: string
    featureSet?: string
    feature?: string
    label?: string // For headers or custom overrides
    description?: string // Optional custom description override
    exclude?: string[] // Optional features to exclude
    customValue?: string | boolean // For custom product-level values
}
```

## Type Inference

The component automatically infers the row type based on the fields present:

-   **Header**: `{ label: 'Section name' }` - label without product/feature
-   **Product-level**: `{ product: 'product_analytics' }` - product without featureSet/feature
-   **Feature**: `{ product: 'error_tracking', feature: 'error_alerts' }` - product with feature
-   **Platform feature**: `{ feature: 'open_source' }` - feature without product (if exists in platform definitions)

## Configuration Examples

### Shorthand Path Notation

```typescript
// Single feature
{
    path: 'error_tracking.core.error_grouping'
}

// Platform feature
{
    path: 'platform.deployment.self_host'
}

// Product-level comparison
{
    path: 'product_analytics'
}
```

### Explicit Configuration

```typescript
// Header (type inferred from label)
{ label: 'Core features' }

// Product-level comparison
{ product: 'product_analytics' }

// Feature
{ product: 'error_tracking', feature: 'error_alerts' }

// Feature with overrides
{
  product: 'error_tracking',
  feature: 'exception_capture',
  label: 'Real-time error capture',
  description: 'Capture and report errors as they happen'
}

// Platform feature (type inferred from feature-only)
{ feature: 'open_source' }
```

### Path Structure

-   Product features: `{product}.{featureSet}.{feature}`
-   Platform features: `platform.{category}.{feature}`
-   Product-level: `{product}` (checks if product is available)

## Usage

### In Blog Articles (MDX)

```mdx
import ProductComparisonTable from 'components/ProductComparisonTable'
import { comparisonRows } from './comparison-rows'

<ProductComparisonTable competitors={['posthog', 'sentry', 'rollbar']} rows={comparisonRows} />
```

**Example row configuration:**

```javascript
export const comparisonRows = [
    { path: 'error_tracking.core.error_alerts' },
    { path: 'error_tracking.core.exception_capture' },
    { path: 'platform.deployment.self_host' },
]
```

### Product-Level Comparisons

For comparing which products competitors offer:

```javascript
export const productRows = [
    { product: 'product_analytics' },
    { product: 'session_replay' },
    { product: 'error_tracking' },
    { product: 'llm_analytics' },
]
```

### In Product Pages

Product pages automatically use `productData.comparison.rows` via `SlidesTemplate`:

```tsx
// In product data file (e.g., error_tracking.tsx)
import { errorTrackingProductFeatures } from './error_tracking_features'

export const errorTracking = {
    // ... other config
    comparison: {
        companies: [
            { name: 'Sentry', key: 'sentry' },
            { name: 'PostHog', key: 'posthog' },
        ],
        rows: errorTrackingProductFeatures,
    },
}
```

**Example feature configuration:**

```typescript
export const errorTrackingProductFeatures = [
    { label: 'Core features' },
    { product: 'error_tracking', feature: 'error_alerts' },
    { product: 'error_tracking', feature: 'exception_capture' },
    { label: 'Platform features' },
    { feature: 'open_source' },
    { feature: 'self_host' },
]
```

## Data Loading

The component automatically loads:

-   Competitor data from `src/hooks/competitorData/`
-   Feature definitions from `src/hooks/featureDefinitions/`

## Rendering

### Cell Values

-   ✓ (green) for `true` or supported features
-   ✗ (red) for `false` or unsupported features
-   Text values for descriptive responses (e.g., "Beta", "Open core", "1 month")

### Feature Information

Labels and descriptions are resolved in this order:

1. **Override values** in row config (highest priority) - `label` and `description` props
2. **Feature definition files** - from `src/hooks/featureDefinitions/`
3. **Product descriptions** - from `src/hooks/featureDefinitions/products.tsx` for product-level comparisons
4. **Fallback** - feature key or product handle

### Headers

Header rows automatically span all columns using `col-span-full` and display the label with bold styling.

### Competitor Names

Competitor columns display the full competitor name (e.g., "Amplitude") rather than the key (e.g., "amplitude"), with optional links to comparison articles.

## Adding Competitors

To add a new competitor:

1. Create file in `src/hooks/competitorData/`
2. Export competitor object matching the schema
3. Add to imports in `ProductComparisonTable` component
