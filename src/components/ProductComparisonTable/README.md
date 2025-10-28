# ProductComparisonTable Component

A flexible comparison table component for displaying product and platform feature comparisons across multiple competitors.

## Props

```typescript
interface ProductComparisonTableProps {
    competitors: string[] // Array of competitor keys
    rows: RowConfig[] // Row configuration array
}

interface RowConfig {
    // Shorthand notation (recommended)
    path?: string // e.g., "error_tracking.core.error_grouping"

    // Detailed format (legacy support)
    type?: 'feature' | 'header' | 'platform'
    product?: string
    featureSet?: string
    feature?: string
    label?: string // Optional custom label override
    description?: string // Optional custom description override
    exclude?: string[] // Optional features to exclude
}
```

## Shorthand Notation

The component supports shorthand paths for easier configuration:

### Examples

```typescript
// Single feature
{ path: 'error_tracking.core.error_grouping' }

// Feature with label/description overrides
{
  path: 'error_tracking.core.exception_capture',
  label: 'Real-time error capture',
  description: 'Capture and report errors as they happen'
}

// Platform feature
{ path: 'platform.deployment.self_host' }

// Entire feature set (future enhancement)
{ path: 'error_tracking.core' }
```

### Path Structure

-   Product features: `{product}.{featureSet}.{feature}`
-   Platform features: `platform.{category}.{feature}`
-   Single-level: `{product}` or `platform` (renders all features)

## Usage

### In Blog Articles (MDX)

```mdx
import ProductComparisonTable from 'components/ProductComparisonTable'
import { rows } from './comparison-rows'

<ProductComparisonTable competitors={['posthog', 'sentry', 'rollbar']} rows={rows} />
```

### In Product Pages

```tsx
import { errorTrackingComparisonRows } from 'hooks/productData/error_tracking_rows'

const slides = createSlideConfig({
    overrides: {
        'feature-comparison': {
            props: {
                rows: errorTrackingComparisonRows,
            },
        },
    },
})
```

## Data Loading

The component automatically loads:

-   Competitor data from `src/hooks/competitorData/`
-   Feature definitions from `src/hooks/featureDefinitions/`

## Rendering

Features are displayed with:

-   ✓ (green) for supported
-   ✗ (red) for not supported
-   Text values for descriptive responses (e.g., "Open core", "1 month")

Labels and descriptions come from:

1. Override values in row config (highest priority)
2. Feature definition files
3. Fallback to feature key

## Adding Competitors

To add a new competitor:

1. Create file in `src/hooks/competitorData/`
2. Export competitor object matching the schema
3. Add to imports in `ProductComparisonTable` component
