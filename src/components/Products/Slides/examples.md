# Product Page Examples

Here are some examples showing different ways to use the `SlidesTemplate` component for various PostHog products.

Each example builds `data` the same way: the billing products from `@data/products-billing.json`, in the `allProductData.nodes[0].products` shape that `SlidesTemplate` reads, plus `useContentData()` for the questions slide. See `src/views/hog/index.tsx`.

## Example 1: Simple Product Page (Analytics)

```tsx
// src/views/analytics/index.tsx
import React from 'react'
import { SlidesTemplate } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import billingProductsJson from '@data/products-billing.json'

const PRODUCT_HANDLE = 'analytics'

export default function AnalyticsPage(): JSX.Element {
    const contentData = useContentData()
    const data = { allProductData: { nodes: [{ products: billingProductsJson }] }, ...contentData }
    
    // Use all default slides
    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={data} />
}
```

## Example 2: Minimal Product Page (Feature Flags)

```tsx
// src/views/feature-flags/index.tsx
import React from 'react'
import { SlidesTemplate, createSlideConfig } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import billingProductsJson from '@data/products-billing.json'

const PRODUCT_HANDLE = 'feature_flags'

export default function FeatureFlagsPage(): JSX.Element {
    const contentData = useContentData()
    const data = { allProductData: { nodes: [{ products: billingProductsJson }] }, ...contentData }
    
    // Only include essential slides
    const slides = createSlideConfig({
        include: ['overview', 'features', 'pricing', 'docs', 'getting-started']
    })
    
    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={data} slideConfig={slides} />
}
```

## Example 3: Reordered Product Page (A/B Testing)

```tsx
// src/views/ab-testing/index.tsx
import React from 'react'
import { SlidesTemplate, createSlideConfig } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import billingProductsJson from '@data/products-billing.json'

const PRODUCT_HANDLE = 'ab_testing'

export default function ABTestingPage(): JSX.Element {
    const contentData = useContentData()
    const data = { allProductData: { nodes: [{ products: billingProductsJson }] }, ...contentData }
    
    // Put pricing up front, exclude comparisons
    const slides = createSlideConfig({
        order: ['overview', 'pricing', 'features', 'customers', 'docs'],
        exclude: ['comparison-summary', 'feature-comparison'],
        overrides: {
            pricing: { name: 'Pricing & Plans' }
        }
    })
    
    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={data} slideConfig={slides} />
}
```

## Example 4: Custom Slides (Data Warehouse)

```tsx
// src/views/data-warehouse/index.tsx
import React from 'react'
import { SlidesTemplate, createSlideConfig } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import billingProductsJson from '@data/products-billing.json'
import { DataSourcesSlide } from './DataSourcesSlide'
import { IntegrationsSlide } from './IntegrationsSlide'

const PRODUCT_HANDLE = 'data_warehouse'

export default function DataWarehousePage(): JSX.Element {
    const contentData = useContentData()
    const data = { allProductData: { nodes: [{ products: billingProductsJson }] }, ...contentData }
    
    // Add custom slides specific to data warehouse
    const slides = createSlideConfig({
        order: ['overview', 'data-sources', 'integrations', 'features', 'pricing'],
        exclude: ['customers', 'pairs-with'],
        custom: [
            { 
                slug: 'data-sources', 
                name: 'Data Sources', 
                component: DataSourcesSlide 
            },
            { 
                slug: 'integrations', 
                name: 'Integrations', 
                component: IntegrationsSlide 
            }
        ]
    })
    
    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={data} slideConfig={slides} />
}
```

## Example 5: Enterprise Product Page

```tsx
// src/views/enterprise/index.tsx
import React from 'react'
import { SlidesTemplate, createSlideConfig } from 'components/Products/Slides'
import { useContentData } from 'hooks/useContentData'
import billingProductsJson from '@data/products-billing.json'

const PRODUCT_HANDLE = 'enterprise'

export default function EnterprisePage(): JSX.Element {
    const contentData = useContentData()
    const data = { allProductData: { nodes: [{ products: billingProductsJson }] }, ...contentData }
    
    const slides = createSlideConfig({
        // Different order for enterprise focus
        order: [
            'overview', 
            'customers',  // Show enterprise customers first
            'features', 
            'pricing',    // Enterprise pricing
            'docs',
            'getting-started'
        ],
        exclude: [
            'answers',     // No FAQ for enterprise
            'pairs-with',  // No product mixing for enterprise
            'comparison-summary',
            'feature-comparison'
        ],
        overrides: {
            customers: { name: 'Enterprise Customers' },
            pricing: { name: 'Enterprise Pricing' },
            'getting-started': { name: 'Contact Sales' }
        }
    })
    
    return (
        <SlidesTemplate 
            productHandle={PRODUCT_HANDLE} 
            data={data} 
            slideConfig={slides}
            seoOverrides={{
                title: 'PostHog Enterprise - Scale with Confidence',
                description: 'Enterprise-grade product analytics with advanced security, compliance, and support.'
            }}
        />
    )
}
```

## Key Benefits

### For Development Teams:
- **2 minutes to create a new product page** instead of copying 800+ lines of code
- **Consistent styling** - changes in SlidesTemplate apply to all products
- **Type safety** - slides are validated and properly typed
- **Easy customization** - simple configuration object instead of complex code changes

### For Product Teams:
- **Flexible slide ordering** - prioritize what matters for each product
- **Easy A/B testing** - try different slide configurations
- **Rapid iteration** - modify slides without touching page structure
- **Custom content** - add product-specific slides when needed

### For Maintenance:
- **Single source of truth** - page structure lives in one place
- **Easy updates** - styling and behavior changes apply everywhere
- **Reduced bugs** - less duplicated code means fewer places for errors
- **Clear ownership** - slide components are focused and testable 