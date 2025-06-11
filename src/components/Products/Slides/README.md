# Product Slides Components

This directory contains reusable slide components for PostHog product pages. These components were extracted from the session-replay page to enable easy replication for other PostHog products.

## Available Components

### Core Slides
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

## Usage

### 1. Import Components

```tsx
import {
    SlideThumbnails,
    OverviewSlide,
    CustomersSlide,
    FeaturesSlide,
    QuestionsSlide,
    PlanComparison,
    ComparisonSummarySlide,
    FeatureComparisonSlide,
    DocsSlide,
    PairsWithSlide,
    GettingStartedSlide,
} from 'components/Products/Slides'
```

### 2. Set Product Configuration

```tsx
// Change this for each product
const PRODUCT_TYPE = 'your_product_type'
```

### 3. Create Raw Slides Array

```tsx
const rawSlides = [
    {
        name: 'Overview',
        content: (
            <OverviewSlide
                productName={productHandle?.name}
                productTitle={productHandle?.title}
                productDescription={productHandle?.description}
                Icon={productHandle?.Icon}
                screenshotSrc={productHandle?.screenshots?.[0]?.src}
                screenshotAlt={productHandle?.screenshots?.[0]?.alt}
                hogSrc={productHandle?.hog?.src}
                hogAlt={productHandle?.hog?.alt}
            />
        ),
    },
    // ... other slides
]
```

### 4. Required Data Structure

The components expect data from `useProduct({ type: PRODUCT_TYPE })` with the following structure:

```tsx
interface ProductHandle {
    name: string
    title?: string
    description: string
    Icon?: React.ComponentType
    type: string
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
    handle: string
}
```

### 5. GraphQL Query

Use the same GraphQL query as session-replay/index.tsx to fetch tutorial and product data.

## Creating a New Product Page

1. Copy `src/pages/session-replay/index.tsx` to your new product directory
2. Update the `PRODUCT_TYPE` constant
3. Modify the `rawSlides` array as needed for your product
4. Update SEO metadata and any product-specific customizations
5. Ensure your product data follows the expected structure

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