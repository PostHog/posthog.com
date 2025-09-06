import React from 'react'

export interface SlideConfig {
    slug: string
    name: string
    component?: React.ComponentType<any>
    props?: Record<string, any>
    template?: string
}

export interface SlideConfigResult {
    slides: SlideConfig[]
    content?: SlideConfigOptions['content']
}

export interface SlideConfigOptions {
    include?: string[]
    exclude?: string[]
    order?: string[]
    overrides?: Record<string, Partial<SlideConfig>>
    custom?: SlideConfig[]
    templates?: Record<string, string>
    content?: {
        answersDescription?: string
        answersHeadline?: string
        featuresBackgroundImage?: {
            url: string
            opacity?: number
            position?: string
            size?: string
        }
    }
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

// AI slide configuration (not included by default, only when ai data exists)
export const aiSlide: SlideConfig = { slug: 'ai', name: 'AI' }

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
 * @param options.content - Content configuration for slides
 * @param options.content.answersDescription - Custom description for the answers/questions slide
 * @param options.content.answersHeadline - Custom headline for the answers/questions slide
 * @param options.content.featuresBackgroundImage - Background image configuration for features slide
 *
 * @returns SlideConfigResult object containing slides array and content configuration
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
 *
 * // Configure content for specific slides
 * const slides = createSlideConfig({
 *     content: {
 *         answersDescription: 'Discover insights about your users and improve your product',
 *         answersHeadline: 'What can Product Analytics help me discover?',
 *         featuresBackgroundImage: {
 *             url: 'https://example.com/bg.jpg',
 *             opacity: 0.2,
 *             position: 'center',
 *             size: 'cover'
 *         }
 *     }
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
    content = {},
}: SlideConfigOptions = {}): SlideConfigResult {
    // Get all available slide slugs (default + custom)
    const defaultSlugs = Object.keys(defaultSlides)
    const customSlugs = custom.map((slide) => slide.slug)
    const allSlugs = [...defaultSlugs, ...customSlugs]

    // Filter slides based on include/exclude
    let filteredSlugs = include ? allSlugs.filter((slug) => include.includes(slug)) : allSlugs

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
    const slides = filteredSlugs.map((slug) => {
        // Check if this is a custom slide
        const customSlide = custom.find((slide) => slide.slug === slug)
        if (customSlide) {
            return customSlide
        }

        // Handle default slides
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

    return {
        slides,
        content,
    }
}
