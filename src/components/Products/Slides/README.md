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
    include: ['overview', 'features', 'pricing', 'getting-started'],
})

// Or exclude certain slides
const slides = createSlideConfig({
    exclude: ['comparison-summary', 'feature-comparison'],
})

// Custom order
const slides = createSlideConfig({
    order: ['overview', 'pricing', 'features', 'customers'],
})

// Override slide names and properties
const slides = createSlideConfig({
    overrides: {
        pricing: { name: 'Plans & Pricing' },
        features: { props: { customProp: 'value' } },
    },
})

return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={data} slideConfig={slides} />
```

### Content Configuration

You can configure content for specific slides without modifying the product data files:

```tsx
const slides = createSlideConfig({
    content: {
        // Customize the description text for the Q&A/Answers slide
        answersDescription: 'Discover insights about your users and improve your product',

        // Customize the headline for the Q&A/Answers slide (defaults to "What can I discover with {productName}?")
        answersHeadline: 'What can Product Analytics help me discover?',

        // Add a background image to the Features slide
        // The image is rendered as an absolutely positioned element behind the content
        featuresBackgroundImage: {
            url: 'https://res.cloudinary.com/dmukukwp6/image/upload/bg_replay_5775c24ad4.jpg',
            opacity: 0.2, // Optional, defaults to 0.2
            position: 'center', // Optional, defaults to 'center' (CSS object-position)
            size: 'cover', // Optional, defaults to 'cover' (CSS object-fit)
        },
    },
})
```

**Note:** The `answersDescription` property has been moved from product data files to the page configuration. This allows each product page to customize the Q&A slide content without modifying shared data files.

## Available Components

### Main Component

-   `SlidesTemplate` - Complete product page with all common logic

### Slide Configuration

-   `createSlideConfig` - Helper to customize slide configuration. Returns a `SlideConfigResult` object containing:
    -   `slides`: Array of slide configurations
    -   `content`: Optional content configuration for slides (answersDescription, answersHeadline, featuresBackgroundImage)
-   `defaultSlides` - Default slide configuration object

### Individual Slides

-   `OverviewSlide` - Product introduction with screenshot and hog image
-   `CustomersSlide` - Customer testimonials and case studies table
-   `FeaturesSlide` - Tabbed features display with images. Supports multiple layouts:
    -   **Default (grid)**: 2-column grid with centered content
    -   **Columns**: Split layout with scrollable features on left
    -   **AI**: Floating images, skills with progress bars, section labels (see AI Layout section below)
-   `QuestionsSlide` - FAQ/questions with tutorial content
-   `ComparisonSummarySlide` - "PostHog vs..." comparison summary
-   `FeatureComparisonSlide` - Detailed feature comparison table
-   `DocsSlide` - Documentation links
-   `PairsWithSlide` - "Pairs with..." other products
-   `GettingStartedSlide` - CTA section

### Utilities

-   `SlideThumbnails` - Slide navigation thumbnails
-   `PlanComparison` - Pricing comparison (already existed)

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
            props: { customProp: 'value' },
        },
    ],
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
        handle?: string // Optional: used for unique slide slug
        template?: 'tabs' | 'split' | 'grid' // Optional: slide template
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
                    fields {
                        slug
                    }
                    rawBody
                    frontmatter {
                        title
                        description
                    }
                }
            }
            allProductData {
                nodes {
                    products {
                        name
                        type
                        unit
                        addons {
                            name
                            type
                            unit
                            plans {
                                name
                                plan_key
                                included_if
                                features {
                                    key
                                    name
                                    description
                                    limit
                                    note
                                }
                            }
                        }
                        plans {
                            name
                            plan_key
                            free_allocation
                            included_if
                            features {
                                key
                                name
                                description
                                limit
                                note
                            }
                            tiers {
                                unit_amount_usd
                                up_to
                            }
                        }
                    }
                }
            }
        }
    `)

    // Optional: Customize slides
    const slides = createSlideConfig({
        // exclude: ['comparison-summary', 'feature-comparison'],
        // order: ['overview', 'pricing', 'features'],
        // overrides: { pricing: { name: 'Plans & Pricing' } },
        content: {
            // Add your answersDescription here (previously in product data files)
            answersDescription: 'Your custom description for the Q&A slide',
            // Optionally add background image for features slide
            featuresBackgroundImage: {
                url: 'https://your-image-url.jpg',
                opacity: 0.2,
            },
        },
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

-   Pass different data structures to modify content
-   Override default styling by extending component styles
-   Add or remove slides from the `rawSlides` array as needed
-   Customize the order of slides for different products

## Notes

-   The GraphQL query fetches tutorial data and product data that's shared across all products
-   Each slide component is designed to handle missing data gracefully
-   TypeScript interfaces ensure type safety when passing props
-   Components use PostHog's design system colors and spacing

## Data structure

Populate data for a product in `src/hooks/useProducts.tsx`. (This will eventually move to the billing API.) If the product isn't fully finished, use @src/hooks/useProduct.tsx, as it gets checked first and can exist without the full data structure needed for the billing API.

### Feature-Level Templates (Automatic Slide Generation)

You can now specify templates directly in your feature data structure, and SlidesTemplate will automatically create individual slides for features with custom templates:

```tsx
// In your product data file (e.g., src/hooks/productData/llm_analytics.tsx)
features: [
    {
        title: 'Trace monitoring',
        handle: 'trace_monitoring', // Optional: used for slide slug
        template: 'split', // Specify the template for this feature
        headline: 'Trace monitoring',
        description: 'Debug entire conversations...',
        // ... other feature properties
    },
    {
        title: 'Native integrations',
        handle: 'native_integrations',
        template: 'grid', // Different template for this feature
        headline: 'Works with your AI stack',
        // ... other feature properties
    },
    {
        title: 'Some other feature',
        // No template specified - will use default tabs template
        headline: 'Another feature',
        // ... other feature properties
    },
]
```

#### How it works:

1. Features without a `template` property (or with `template: 'tabs'`) will be grouped together in the default tabbed features slide
2. Features with `template: 'split'` or `template: 'grid'` will automatically get their own individual slides
3. Individual feature slides are rendered after the default features slide (if any)
4. The `handle` property is used to create unique slide slugs (e.g., `feature-trace_monitoring`)

#### Available Feature Templates:

-   **tabs** (default): Feature appears in the tabbed features slide
-   **split**: Individual slide with split layout (image on one side, content on the other)
-   **grid**: Individual slide with grid layout for feature details
-   **ai**: Individual feature with AI-specific layout (images float right, skills with progress bars, left-aligned content)

This approach eliminates the need for custom logic in individual product pages - just set the template in your feature data!

### AI Layout for Features Slide

The 'ai' layout provides a specialized template for AI-powered features with support for skills, stickers, and section labels. This layout is used on the PostHog AI product page.

#### Using the AI Layout

Set `layout: 'ai'` on individual features within your features array:

```tsx
// In your product data file (e.g., src/hooks/productData/posthog_ai.tsx)
features: [
    {
        label: 'Analytics', // Optional: Section divider label
    },
    {
        title: 'Web Analytics',
        headline: 'Web Analytics',
        layout: 'ai', // Use AI layout
        icon: <IconPieChart className="size-5 text-green" />,
        color: 'green',
        description: 'Privacy-friendly web analytics...',
        images: [
            {
                src: 'https://...',
                alt: 'Screenshot',
            },
        ],
        skills: [
            {
                name: 'Traffic seer',
                description: 'Illuminates pathways through clickthrough chaos',
                sticker: <StickerPath className="size-6" />,
                percent: 80,
            },
            {
                name: 'Writes SQL queries',
                percent: 95,
            },
        ],
    },
]
```

#### AI Layout Features

**1. Section Labels**

-   Add `{ label: 'Section Name' }` objects to visually separate groups of tabs
-   Labels render as non-clickable dividers in the tab list
-   Only visible on larger screens (`@2xl:block`)

**2. Skills Display**

-   Skills render in a 2-column grid on larger screens
-   Each skill can include:
    -   `name` (required): Skill title
    -   `description` (optional): Detailed explanation
    -   `sticker` (optional): React component for icon/sticker
    -   `percent` (optional): Progress bar percentage (0-100)
-   String-only skills are also supported: `skills: ['Skill 1', 'Skill 2']`

**3. Layout Structure**

-   **Images**: Float right on larger screens, centered on mobile
-   **Headline & Description**: Left-aligned (not centered)
-   **Features**: Vertical list format
-   **Skills**: 2-column grid with progress bars and stickers
-   **Overflow**: Auto-scrolling when content exceeds viewport

**4. Stickers**
Stickers use the `StickerComponent` system from `components/Stickers/Stickers.tsx`:

-   Import from `components/Stickers/Stickers`
-   Apply size classes: `className="size-6"`
-   Custom viewBox supported (e.g., StickerPath uses 100x100 instead of default 36x36)

#### Template Configuration

Specify the AI layout at the slide level:

```tsx
const slides = createSlideConfig({
    templates: {
        features: 'ai', // Use AI layout for all features
    },
})
```

Or use `layout: 'ai'` on individual features for mixed layouts within the same slide (tabbed and AI together).

### Slide Templates (Overview Slides)

You can use different templates of the overview slide to match your product's visual style:

```tsx
// Use stacked layout (horizontal split)
const slides = createSlideConfig({
    templates: {
        overview: 'stacked',
    },
})

// Use overlay layout (centered with background)
const slides = createSlideConfig({
    templates: {
        overview: 'overlay',
    },
})

// Use columns layout (default)
const slides = createSlideConfig({
    templates: {
        overview: 'columns', // or leave blank for default
    },
})
```

#### Available Overview Slide Templates:

-   **Columns (Default)**: Traditional layout with content in left column and images/hog on the right
-   **Stacked**: Horizontal split layout with larger icon and side-by-side content and images
-   **Overlay**: Centered vertical layout with background image and prominent centered content

All templates accept the same props and work with existing product data structure.
