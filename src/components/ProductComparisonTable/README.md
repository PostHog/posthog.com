# ProductComparisonTable Component

A flexible comparison table component for displaying product and platform feature comparisons across multiple competitors.

## Props

```typescript
interface ProductComparisonTableProps {
    competitors: string[] // Array of competitor keys
    rows: (RowConfig | string)[] // Array of row configs or string paths
    width?: 'auto' | 'full' // Table width (default: 'auto')
}

interface RowConfig {
    // Shorthand path (recommended)
    path?: string // e.g., "error_tracking.core.error_alerts" or "error_tracking.core"

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

### Inline Rows (Recommended)

You can define rows directly inline using string paths:

```tsx
<ProductComparisonTable
    competitors={['posthog', 'sentry', 'rollbar']}
    rows={[
        'error_tracking.core.error_alerts', // Individual feature
        'error_tracking.summary', // Product-level comparison
        'error_tracking.core', // All features in core section
        'error_tracking', // Entire product (all sections)
        'platform.deployment.self_host', // Individual platform feature
        'platform.pricing', // All pricing features
        {
            path: 'platform.analytics_integration.built_in_analytics',
            label: 'Custom label',
            description: 'Custom description',
        },
    ]}
/>
```

### Path Expansion

The component automatically expands shorter paths:

-   `error_tracking` → Expands to entire product (summary + all sections with headers)
-   `error_tracking.summary` → Expands to product-level comparison row
-   `error_tracking.core` → Expands to section header + all features in core section
-   `platform.deployment` → Expands to section header + all deployment features
-   `error_tracking.core.error_alerts` → Individual feature (no expansion)

### External Row Files (Complex Cases)

For more complex configurations, you can use external files:

```javascript
// comparison-rows.js
export const comparisonRows = [
    'error_tracking.core',
    'platform.pricing',
    {
        path: 'error_tracking.integrations.session_replays',
        label: 'Session replay integration',
    },
]
```

```tsx
import { comparisonRows } from './comparison-rows'
;<ProductComparisonTable competitors={['posthog', 'sentry']} rows={comparisonRows} />
```

### Path Structure

-   **Product features**: `{product}.{featureSet}.{feature}`
-   **Platform features**: `platform.{category}.{feature}`
-   **Sections**: `{product}.{featureSet}` (expands to all features in section)
-   **Products**: `{product}` (expands to entire product with all sections)
-   **Summary**: `{product}.summary` (product-level comparison row)

## Usage

### In Blog Articles (MDX)

**Inline rows (simplest):**

```mdx
<ProductComparisonTable
    competitors={['posthog', 'sentry', 'rollbar']}
    rows={[
        'error_tracking.core.error_alerts',
        'error_tracking.core.exception_capture',
        'platform.deployment.self_host',
    ]}
/>
```

**With section expansion:**

```mdx
<ProductComparisonTable
    competitors={['posthog', 'sentry', 'rollbar']}
    rows={[
        'error_tracking.core', // Expands to all core features
        'platform.pricing', // Expands to all pricing features
    ]}
/>
```

**External file (for complex cases):**

```mdx
import { comparisonRows } from './comparison-rows'

<ProductComparisonTable competitors={['posthog', 'sentry', 'rollbar']} rows={comparisonRows} />
```

### Product-Level Comparisons

For comparing which products competitors offer:

```tsx
<ProductComparisonTable
    competitors={['posthog', 'amplitude']}
    rows={['product_analytics.summary', 'session_replay.summary', 'error_tracking.summary']}
/>
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
// In product data file (e.g., error_tracking.tsx)
export const errorTracking = {
    // ... other config
    comparison: {
        companies: [
            { name: 'Sentry', key: 'sentry' },
            { name: 'PostHog', key: 'posthog' },
        ],
        rows: ['error_tracking'], // Expands to all sections and features
    },
}
```

## Data Structure

Product feature definitions are organized with a `summary` section for product-level comparisons:

```typescript
// error_tracking.tsx
export const errorTrackingFeatures = {
    summary: {
        name: 'Error tracking',
        description: 'Track and monitor errors and exceptions in your code',
    },
    core: {
        error_alerts: {
            name: 'Error alerts',
            description: 'Get notified in real time...',
        },
        // ... more features
    },
    monitoring: {
        // ... features
    },
    integrations: {
        // ... features
    },
}
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
3. **Summary section** - for product-level comparisons
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
