# Product Slides Components

This directory contains reusable slide components for PostHog product pages. These components were extracted from the session-replay page to enable easy replication for other PostHog products.

## Quick Start

### Simple Product Page (Recommended)

The easiest way to create a new product page is using the `SlidesTemplate` component:

```tsx
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SlidesTemplate } from 'components/Products/Slides'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'your_product_handle'

export default function YourProductPage(): JSX.Element {
    const data = useStaticQuery(/* your GraphQL query */)
    
    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={data} />
}
```

### Customizing Slides

You can customize which slides to include and their order:

```tsx
import { SlidesTemplate, createSlideConfig } from 'components/Products/Slides'

// Only include specific slides
const slides = createSlideConfig({
    include: ['overview', 'features', 'pricing', 'getting-started']
})

// Or exclude certain slides
const slides = createSlideConfig({
    exclude: ['comparison-summary', 'feature-comparison']
})

// Custom order
const slides = createSlideConfig({
    order: ['overview', 'pricing', 'features', 'customers']
})

// Override slide names and properties
const slides = createSlideConfig({
    overrides: {
        pricing: { name: 'Plans & Pricing' },
        features: { props: { customProp: 'value' } }
    }
})

return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={data} slideConfig={slides} />
```

## Available Components

### Main Component
- `SlidesTemplate` - Complete product page with all common logic

### Slide Configuration
- `createSlideConfig` - Helper to customize slide configuration
- `defaultSlides` - Default slide configuration object

### Individual Slides
- `OverviewSlide` - Product introduction with screenshot and hog image
- `CustomersSlide` - Customer testimonials and case studies table
- `FeaturesSlide` - Tabbed features display with images
- `QuestionsSlide` - FAQ/questions with tutorial content
- `ComparisonSummarySlide` - "PostHog vs..." comparison summary
- `FeatureComparisonSlide` - Detailed feature comparison table
- `DocsSlide` - Documentation links
- `PairsWithSlide` - "Pairs with..." other products
- `GettingStartedSlide` - CTA section

### Utilities
- `SlideThumbnails` - Slide navigation thumbnails
- `PlanComparison` - Pricing comparison (already existed)

## Advanced Usage

### Custom Components

You can add custom slides or override default ones:

```tsx
import { MyCustomSlide } from './MyCustomSlide'

const slides = createSlideConfig({
    custom: [
        { 
            slug: 'custom-demo', 
            name: 'Product Demo', 
            component: MyCustomSlide,
            props: { customProp: 'value' }
        }
    ]
})
```

### Manual Slide Creation (Advanced)

If you need more control, you can still use individual slide components:

```tsx
import {
    OverviewSlide,
    FeaturesSlide,
    // ... other components
} from 'components/Products/Slides'

// Create your own slide configuration
const rawSlides = [
    {
        slug: 'overview',
        name: 'Overview',
        content: (
            <OverviewSlide
                productName={productHandle?.name}
                // ... other props
            />
        ),
    },
    // ... other slides
]
```

### 4. Required Data Structure

The components expect data from `useProduct({ handle: PRODUCT_HANDLE })` with the following structure:

```tsx
interface ProductData {
    name: string
    Icon?: React.ComponentType
    handle: string
    slug: string
    answersDescription: string // needs to be moved
    color: string
    seo: {
        title: string
        description: string
    }
    overview?: {
        title: string
        description: string
        textColor: string // tailwind color value
    }
    screenshots?: Array<{ src: string; alt: string }>
    hog?: { src: string; alt: string }
    features?: Array<{
        title: string
        headline: string
        description?: string
        icon?: any
        color?: string
        features?: Array<{ title: string; description: string }>
        images?: Array<{ src: string; alt: string }>
    }>
    questions?: Array<{
        question: string
        url?: string
    }>
    answersDescription?: string
    customers?: Record<string, { headline: string; description: string }>
    comparison?: {
        summary?: {
            them: Array<{ title: string; subtitle?: string; subtitleUrl?: string }>
            us: Array<{ title: string; subtitle?: string }>
        }
        features?: Array<{
            feature: string
            companies: Record<string, boolean | string>
        }>
    }
    pairsWith?: Array<{ slug: string; description: string }>
    seo?: {
        title: string
        description: string
    }
}
```

## Creating a New Product Page

### Method 1: Using SlidesTemplate (Recommended)

1. Create a new file in `src/pages/[product-name]/index.tsx`
2. Set up the basic structure:

```tsx
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { SlidesTemplate, createSlideConfig } from 'components/Products/Slides'

// Product configuration - change this to adapt for different products
const PRODUCT_HANDLE = 'your_product_handle'

export default function YourProductPage(): JSX.Element {
    const data = useStaticQuery(graphql`
        query {
            allMdx(filter: { fields: { slug: { regex: "/^/tutorials/" } } }) {
                nodes {
                    fields { slug }
                    rawBody
                    frontmatter { title description }
                }
            }
            allProductData {
                nodes {
                    products {
                        name type unit
                        addons { name type unit plans { name plan_key included_if features { key name description limit note } } }
                        plans { name plan_key free_allocation included_if features { key name description limit note } tiers { unit_amount_usd up_to } }
                    }
                }
            }
        }
    `)

    // Optional: Customize slides
    const slides = createSlideConfig({
        // exclude: ['comparison-summary', 'feature-comparison'],
        // order: ['overview', 'pricing', 'features'],
        // overrides: { pricing: { name: 'Plans & Pricing' } }
    })

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={data} slideConfig={slides} />
}
```

3. Update the `PRODUCT_HANDLE` constant
4. Optionally customize the slide configuration
5. Ensure your product data follows the expected structure

### Method 2: Manual Setup (Advanced)

If you need more control, you can still copy the original session-replay structure and modify it.

## Customization

Each slide component accepts specific props and can be customized:

- Pass different data structures to modify content
- Override default styling by extending component styles
- Add or remove slides from the `rawSlides` array as needed
- Customize the order of slides for different products

## Notes

- The GraphQL query fetches tutorial data and product data that's shared across all products
- Each slide component is designed to handle missing data gracefully
- TypeScript interfaces ensure type safety when passing props
- Components use PostHog's design system colors and spacing 

## Data structure

Populate data for a product in `src/hooks/useProducts.tsx`. (This will eventually move to the billing API.) If the product isn't fully finished, use @src/hooks/useProduct.tsx, as it gets checked first and can exist without the full data structure needed for the billing API.

```

    {
        Icon: IconRewindPlay,
        name: 'Session replay',
        handle: 'session_replay',
        slug: 'session-replay',
        title: 'Watch people use your product',
        description: '',
        color: 'yellow',
        seo: {
            title: 'Session replay - PostHog',
            description: 'Watch people use your product to diagnose issues and understand user behavior',
        },

        screenshots: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_screenshot_de8cb3a4ed.jpg',
                alt: 'Session replay screenshot',
            },
        ],
        hog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_hog_20fc000c14.png',
            alt: 'A hedgehog watching some session recordings',
        },
        slider: {
            marks: [5000, 25000, 120000, 500000],
            min: 5000,
            max: 500000,
        },
        volume: 5000,
        customers: {
            hasura: {
                headline: 'improved conversion rates by 10-20%',
                description: "We wouldn't have noticed that needed fixing without PostHog's session replays.",
            },
            elevenlabs: {
                headline: 'uses replays and surveys when testing ideas',
                description:
                    'We watch lots of replays when testing a feature, and love how easy it is to launch surveys',
            },
        },
        features: [
            {
                title: 'Event timeline',
                headline: 'Event timeline',
                description:
                    "See the history of everything that happened in a user's session, including clicks, scrolls, and more.",
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/SessionReplay/images/timeline.png',
                        alt: 'Timeline',
                    },
                ],
            },
            {
                title: 'More features',
                headline: 'More features',
                features: [
                    {
                        title: 'Filter by event',
                        description: 'Filter by events to quickly find relevant recordings',
                    },
                ],
            },
        ],
        questions: [
            {
                question: 'Why are users dropping off in my funnel?',
                url: '/tutorials/explore-insights-session-recordings#watching-users-through-funnels',
            },
            { question: 'How do I figure out how to lower churn?', url: '/tutorials/churn-rate#session-recordings' },
        ],
        comparison: {
            summary: {
                them: [
                    {
                        title: 'Error tracking',
                        subtitle: 'In progress!',
                        subtitleUrl: 'https://github.com/PostHog/posthog/issues/23400',
                    },
                    {
                        title: 'Alerting',
                        subtitle: 'In progress!',
                        subtitleUrl: 'https://github.com/PostHog/posthog/issues/14331',
                    },
                ],
                us: [
                    {
                        title: 'Interlinking with feature flags and insights',
                        subtitle: 'Jump between them easily',
                    },
                    {
                        title: 'Collaboration, sharing, and embedding exporting recordings',
                    },
                    {
                        title: 'No limits on how many recordings captured',
                    },
                ],
            },
            features: [
                {
                    feature: 'Flutter recordings',
                    companies: {
                        Hotjar: false,
                        LogRocket: false,
                        Matomo: false,
                        FullStory: false,
                        PostHog: '<a href="https://github.com/PostHog/posthog-flutter/issues/69">In beta</a>',
                    },
                },
            ],
        },
        pairsWith: [
            {
                slug: '/product-analytics',
                description: 'Jump into a playlist of session recordings directly from any time series in a graph',
            },
            {
                slug: '/feature-flags',
                description: "See which feature flags are enabled for a user's session",
            },
            {
                slug: '/experiments',
                description:
                    'Generate a playlist of recordings limited to an A/B test or specific group within a multivariate experiment.',
            },
        ],
    },
    ```