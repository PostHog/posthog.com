import React from 'react'

export interface SlideConfig {
    slug: string
    name: string
    component?: React.ComponentType<any>
    props?: Record<string, any>
    template?: string
}

export interface SlideConfigOptions {
    include?: string[]
    exclude?: string[]
    order?: string[]
    overrides?: Record<string, Partial<SlideConfig>>
    custom?: SlideConfig[]
    templates?: Record<string, string>
}

// Default slide configuration
export const defaultSlides: Record<string, SlideConfig> = {
    overview: { slug: 'overview', name: 'Overview' },
    customers: { slug: 'customers', name: 'Customers' },
    features: { slug: 'features', name: 'Features' },
    answers: { slug: 'answers', name: 'Answers' },
    pricing: { slug: 'pricing', name: 'Pricing' },
    'comparison-summary': { slug: 'comparison-summary', name: 'PostHog vs... (the tl;dr)' },
    'feature-comparison': { slug: 'feature-comparison', name: 'Feature comparison' },
    docs: { slug: 'docs', name: 'Docs' },
    'pairs-with': { slug: 'pairs-with', name: 'Pairs with...' },
    'getting-started': { slug: 'getting-started', name: 'Get started' },
}

/**
 * Create a customized slide configuration for a product page
 *
 * @param options Configuration options
 * @param options.include - Array of slide slugs to include (if provided, only these will be included)
 * @param options.exclude - Array of slide slugs to exclude
 * @param options.order - Custom order for slides (remaining slides will be appended in default order)
 * @param options.overrides - Override properties for specific slides
 * @param options.custom - Array of custom slides to add
 * @param options.templates - Specify templates for slides (e.g., overview: 'stacked')
 *
 * @returns Array of SlideConfig objects
 *
 * @example
 * ```tsx
 * // Only include specific slides
 * const slides = createSlideConfig({
 *     include: ['overview', 'features', 'pricing']
 * })
 *
 * // Exclude certain slides
 * const slides = createSlideConfig({
 *     exclude: ['comparison-summary', 'feature-comparison']
 * })
 *
 * // Custom order with overrides
 * const slides = createSlideConfig({
 *     order: ['overview', 'pricing', 'features'],
 *     overrides: {
 *         pricing: { name: 'Plans & Pricing' }
 *     }
 * })
 *
 * // Use different overview slide templates
 * const slides = createSlideConfig({
 *     templates: {
 *         overview: 'stacked'  // Use OverviewSlideStacked instead of default columns
 *     }
 * })
 *
 * // Template options: 'columns' (default), 'stacked', 'overlay'
 *
 * // Add custom slides
 * const slides = createSlideConfig({
 *     custom: [
 *         { slug: 'custom-slide', name: 'My Custom Slide', component: MyCustomComponent }
 *     ]
 * })
 * ```
 */
export function createSlideConfig({
    include,
    exclude = [],
    order = [],
    overrides = {},
    custom = [],
    templates = {},
}: {
    include?: string[]
    exclude?: string[]
    order?: string[]
    overrides?: Record<string, Partial<SlideConfig>>
    custom?: SlideConfig[]
    templates?: Record<string, string>
} = {}): SlideConfig[] {
    // Get all available slide slugs
    const slideSlugs = Object.keys(defaultSlides)

    // Filter slides based on include/exclude
    let filteredSlugs = include ? slideSlugs.filter((slug) => include.includes(slug)) : slideSlugs

    // Remove excluded slides
    if (exclude.length > 0) {
        filteredSlugs = filteredSlugs.filter((slug) => !exclude.includes(slug))
    }

    // Apply custom order
    if (order.length > 0) {
        const orderedSlugs = order.filter((slug) => filteredSlugs.includes(slug))
        const remainingSlugs = filteredSlugs.filter((slug) => !order.includes(slug))
        filteredSlugs = [...orderedSlugs, ...remainingSlugs]
    }

    // Create final slide configuration
    let slides = filteredSlugs.map((slug) => {
        const defaultSlide = defaultSlides[slug]
        const override = overrides[slug] || {}
        const template = templates[slug]

        return {
            ...defaultSlide,
            ...override,
            // Ensure slug is preserved
            slug: defaultSlide.slug,
            // Add template if specified
            ...(template && { template }),
        }
    })

    // Add custom slides
    if (custom.length > 0) {
        slides = [...slides, ...custom]
    }

    return slides
}
