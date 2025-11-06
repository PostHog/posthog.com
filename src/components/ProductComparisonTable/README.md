# ProductComparisonTable Component

A flexible comparison table component for displaying product and platform feature comparisons across multiple competitors.

## Props

```typescript
interface ProductComparisonTableProps {
    competitors: string[] // Array of competitor keys
    rows: (RowConfig | string)[] // Array of row configs or string paths
    width?: 'auto' | 'full' // Table width (default: 'auto')
    autoExpand?: boolean // When true, auto-expand single product names and include platform features (default: false)
    excludedSections?: string[] // Sections to exclude from rendering (e.g., ['platform'] or ['platform.deployment'])
    requireCompleteData?: boolean // When true, only show rows where ALL competitors have data (default: false)
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
    values?: (string | boolean | number | undefined)[] // For custom per-competitor values (array length should match competitors array)
}
```

## Type Inference

The component automatically infers the row type based on the fields present:

-   **Header**: `{ label: 'Section name' }` - label only, no product/feature/values (description is optional)
-   **Custom row**: `{ label: 'Custom feature', values: [true, false] }` - label with values array (treated as feature row)
-   **Product-level**: `{ product: 'product_analytics' }` - product without featureSet/feature
-   **Feature**: `{ product: 'error_tracking', feature: 'error_alerts' }` - product with feature
-   **Platform feature**: `{ feature: 'open_source' }` - feature without product (if exists in platform definitions)

## Auto-Expansion Modes

The component has two distinct modes of operation:

### Blog Article Mode (autoExpand=false, default)

When used in blog articles without `autoExpand`, the component only renders explicitly specified rows:

```tsx
<ProductComparisonTable
    competitors={['posthog', 'sentry', 'rollbar']}
    rows={[
        'error_tracking.core.error_alerts', // Individual feature only
        'error_tracking.summary', // Single product-level row
    ]}
/>
```

In this mode:

-   Single product names like `'experiments'` create a single product-level availability row
-   No automatic expansion or platform features added
-   Precise control over what appears in the table

### Product Page Mode (autoExpand=true)

When used on product pages via `FeatureComparisonSlide`, the component auto-expands to show full feature sets:

```tsx
<ProductComparisonTable competitors={['posthog', 'optimizely', 'amplitude']} rows={['experiments']} autoExpand={true} />
```

In this mode:

-   Single product names like `'experiments'` expand to ALL sections and features
-   Platform features automatically appended at the end
-   Section headers with descriptions included
-   PostHog displayed as first column (after feature name column)
-   Only rows with complete data shown (requireCompleteData=true)
-   Empty sections/features automatically filtered out
-   Comparison links hidden when on the current page

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
        'error_tracking', // Entire product (all sections if autoExpand=true)
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

The component automatically expands shorter paths based on the `autoExpand` setting:

**With autoExpand=false (blog articles):**

-   `experiments` → Single product availability row
-   `experiments.summary` → Single product availability row
-   `experiments.targeting` → Section header + all targeting features
-   `platform.deployment` → Section header + all deployment features
-   `experiments.targeting.features.cohort_integration` → Individual feature (no expansion)

**With autoExpand=true (product pages):**

-   `experiments` → Expands to ALL sections (features, supported_tests, targeting, implementation, analysis, platforms) + platform features
-   Each section includes a header with description
-   All features within each section rendered
-   Platform features automatically appended

### External Row Files (Complex Cases)

For more complex configurations, you can use external files:

```javascript
// comparison-rows.js
export const comparisonRows = [
    'error_tracking.core',
    'platform.pricing',
    {
        path: 'error_tracking.integrations.session_replay',
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
-   **Products**: `{product}` (expands based on autoExpand setting)
-   **Summary**: `{product}.summary` (product-level comparison row)

## Excluding Sections

Product pages can exclude certain sections from rendering using the `excluded_sections` configuration in product data files:

```typescript
// In product data file (e.g., llm_analytics.tsx)
export const llmAnalytics = {
    comparison: {
        companies: [...],
        rows: ['llm_analytics'],
        excluded_sections: ['platform'], // Hide entire platform
    },
}

// Or exclude specific subnodes:
export const errorTracking = {
    comparison: {
        companies: [...],
        rows: ['error_tracking'],
        excluded_sections: [
            'platform.libraries',
            'platform.integrations',
        ], // Hide only these two sections
    },
}
```

Exclusion rules:

-   Exact match: `'platform'` excludes the entire platform
-   Parent path: `'platform.deployment'` excludes all deployment features
-   Subnode path: `'platform.deployment.self_host'` excludes only that specific feature
-   Excluded sections are completely omitted from rendering
-   Section headers with no features after exclusions are automatically hidden

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

### Custom Line Items with Per-Competitor Values

If you need to add a custom row that doesn't exist in the competitor data, use the `values` property:

```tsx
<ProductComparisonTable
    competitors={['posthog', 'amplitude']}
    rows={[
        {
            label: 'In-app prompts and messages',
            description: 'Send messages to users in your app',
            values: [true, false], // One value per competitor, in order
        },
        {
            label: 'Custom pricing tier',
            description: 'Special pricing available',
            values: ['Enterprise only', 'All plans'],
        },
    ]}
/>
```

The `values` array should have the same length as the `competitors` array, with each value corresponding to a competitor in the same order. Custom values are treated as having data and won't be filtered out by the automatic empty row filtering.

### Section Headers

Organize tables into logical groups with section headers. Headers only require a `label` property:

```tsx
<ProductComparisonTable
    competitors={['posthog', 'amplitude']}
    rows={[
        { label: 'Core Features' }, // Section header - description is optional
        'product_analytics.features.autocapture',
        'product_analytics.features.cohorts',
        { label: 'Advanced Analytics' },
        'product_analytics.insights.sql_editor',
        'product_analytics.group_analytics',
    ]}
/>
```

Headers span across all columns and are visually separated with borders. The `description` field is optional and typically not used for manual headers.

### In Product Pages

Product pages automatically use `productData.comparison` via `SlidesTemplate` with `autoExpand=true`:

```typescript
// In product data file (e.g., experiments.tsx)
export const experiments = {
    comparison: {
        companies: [
            { name: 'Optimizely', key: 'optimizely', link: '/blog/posthog-vs-optimizely' },
            { name: 'Amplitude', key: 'amplitude', link: '/blog/posthog-vs-amplitude' },
            { name: 'PostHog', key: 'posthog' },
        ],
        rows: ['experiments'], // Auto-expands to all sections + platform
        excluded_sections: ['platform.libraries'], // Optional: exclude sections
        require_complete_data: true, // Optional: only show rows where ALL competitors have data
    },
}
```

The flow is:

1. `SlidesTemplate` reads `productData.comparison`
2. Reorders competitors to put PostHog first
3. Passes `excluded_sections` and `require_complete_data` to `FeatureComparisonSlide`
4. `FeatureComparisonSlide` renders with `autoExpand={true}` and optional `requireCompleteData`
5. Component auto-expands rows and appends platform features
6. Excluded sections are filtered out
7. If `require_complete_data` is true, rows with incomplete data are filtered out
8. Empty section headers are automatically hidden

## Data Structure

Product feature definitions support:

-   A `summary` section for product-level comparisons (supports optional `url` and `docsUrl`)
-   A top-level `features` node for simple features that don't belong to a named sub-section
-   Optional named sections (e.g., `trends`, `funnels`, `user_paths`) that can include:
    -   `description` – section description shown in header
    -   `features` – the feature map displayed when you reference the section's features

```typescript
// experiments.tsx
export const experimentsFeatures = {
    summary: {
        name: 'Experiments',
        description: 'Run A/B tests and multivariate experiments',
        url: '/experiments',
        docsUrl: '/docs/experiments',
    },
    pricing: {
        description: 'Experiment pricing information',
        // ... pricing features (excluded from product page rendering by default)
    },
    features: {
        // Top-level features (note: no nested 'features' property here)
        count_value_metrics: { name: 'Count value metrics', description: '...' },
        custom_goals: { name: 'Custom goals', description: '...' },
    },
    targeting: {
        description: 'Precisely target who sees each variant',
        features: {
            cohort_integration: { name: 'Cohort integration', description: '...' },
            custom_targeting: { name: 'Custom targeting', description: '...' },
        },
    },
}
```

**Important structural notes:**

-   `summary` and `pricing` sections are skipped during auto-expansion
-   Top-level `features` sections are processed first WITHOUT headers (allows multiple products' features to group together)
-   Other sections like `targeting` are processed second WITH headers and descriptions
-   Top-level `features` has feature definitions directly (no nested `features` property)
-   Other sections like `targeting` have features nested under a `features` property
-   The component handles both structures automatically

## Data Loading

The component automatically loads:

-   Competitor data from `src/hooks/competitorData/`
-   Feature definitions from `src/hooks/featureDefinitions/`

## Rendering

### Cell Values

-   ✓ (green) for `true` or supported features
-   ✗ (red) for `false` or unsupported features
-   Text values for descriptive responses (e.g., "Beta", "Open core", "1 month")
-   React elements (JSX) can be rendered directly (e.g., links with HTML)

### Feature Information

Labels and descriptions are resolved in this order:

1. **Override values** in row config (highest priority) - `label` and `description` props
2. **Feature definition files** - from `src/hooks/featureDefinitions/`
3. **Summary section** - for product-level comparisons
4. **Fallback** - feature key or product handle (with sentence casing applied)

### Label Formatting

-   **Custom labels**: Displayed exactly as provided (e.g., `{ label: 'In-app messages' }`)
-   **Derived labels**: Sentence-cased from keys (first letter capitalized only)
    -   `deployment` → `Deployment`
    -   `analytics_integration` → `Analytics integration`
    -   `supported_tests` → `Supported tests`

### Headers

Auto-generated section headers:

-   Display the section name (sentence-cased from key) and optional description
-   Automatically span all columns
-   Styled with bottom border for visual separation
-   Hidden if no features exist after filtering/exclusions

### Automatic Filtering

The component automatically filters out rows with no data:

1. **Empty feature rows**:
    - By default (requireCompleteData=false): Rows where ALL competitors have undefined/null/empty values are hidden
    - With requireCompleteData=true: Rows where ANY competitor has undefined/null/empty values are hidden
2. **Empty section headers**: Headers with no visible features beneath them are removed
3. **Custom values preserved**: Rows with `values` arrays are always kept (they have explicit data)

**requireCompleteData option:**

-   When `false` (default): Shows rows if at least ONE competitor has data (good for blog articles)
-   When `true`: Shows rows only if ALL competitors have data (good for product pages)
-   Configured per-product in productData files via `require_complete_data` setting
-   When not specified, defaults to `false` for maximum flexibility

This ensures clean, data-driven tables that only show relevant information.

### Path behavior recap

-   `product_analytics` → product summary + availability (or all sections if autoExpand=true)
-   `product_analytics.trends` → section header + all features in trends
-   `product_analytics.features.autocapture` → single feature row
-   `platform.deployment` → section header + all deployment features
-   `platform.deployment.self_host` → single platform feature row

### Values

-   Availability rows read `available` from the competitor data at the exact path
-   Feature rows read the value at the exact nested path; booleans render ✓/✗ and numbers/strings render as text
-   If no matching data exists (value is `undefined`), the company cell is left blank
-   A red ✗ only appears for explicit `false` values
-   React elements are rendered directly (useful for custom HTML/links)

### Competitor Names and Links

Competitor columns display:

-   Full competitor name from competitor data (e.g., "Amplitude" not "amplitude")
-   Optional "compare" link to comparison article (if `comparisonArticle` is set in competitor data)
-   "compare" link is hidden when viewing the comparison article itself (prevents self-referential links)
-   PostHog logo instead of text name
-   On product pages, PostHog appears as first column after feature names

## Adding Competitors

To add a new competitor:

1. Create file in `src/hooks/competitorData/`
2. Export competitor object matching the schema
3. Add to imports in `ProductComparisonTable` component
4. Optionally add `comparisonArticle` path for linking to comparison posts

Example:

```typescript
// competitor.tsx
export const newCompetitor = {
    name: 'New Competitor',
    key: 'new_competitor',
    assets: {
        icon: '/images/competitors/new-competitor.svg',
        comparisonArticle: '/blog/posthog-vs-new-competitor',
    },
    products: {
        experiments: {
            available: true,
            features: {
                custom_goals: true,
                // ...
            },
        },
    },
    platform: {
        deployment: {
            features: {
                self_host: false,
                // ...
            },
        },
    },
}
```

## Migration Notes

All old manual `features` arrays in product data files have been removed. The system now uses:

1. **Feature definitions** (`src/hooks/featureDefinitions/`) - define feature names, descriptions, and structure
2. **Competitor data** (`src/hooks/competitorData/`) - store boolean/string values per competitor
3. **Product data** (`src/hooks/productData/`) - configuration only (companies, rows, excluded_sections)

This centralized approach:

-   Eliminates duplication
-   Makes updates easier (change once, reflected everywhere)
-   Enables auto-expansion on product pages
-   Provides consistent feature definitions across all comparisons
