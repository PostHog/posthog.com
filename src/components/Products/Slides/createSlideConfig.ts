import React from 'react'

export interface SlideConfig {
    handle: string
    name: string
    component?: React.ComponentType<any>
    props?: Record<string, any>
}

export interface SlideConfigOptions {
    include?: string[]
    exclude?: string[]
    order?: string[]
    overrides?: Record<string, Partial<SlideConfig>>
    custom?: SlideConfig[]
}

// Default slide configuration
export const defaultSlides: Record<string, SlideConfig> = {
    overview: { handle: 'overview', name: 'Overview' },
    customers: { handle: 'customers', name: 'Customers' },
    features: { handle: 'features', name: 'Features' },
    answers: { handle: 'answers', name: 'Answers' },
    pricing: { handle: 'pricing', name: 'Pricing' },
    'comparison-summary': { handle: 'comparison-summary', name: 'PostHog vs... (the tl;dr)' },
    'feature-comparison': { handle: 'feature-comparison', name: 'Feature comparison' },
    docs: { handle: 'docs', name: 'Docs' },
    'pairs-with': { handle: 'pairs-with', name: 'Pairs with...' },
    'getting-started': { handle: 'getting-started', name: 'Getting started' },
}

/**
 * Create a custom slide configuration
 *
 * @param options Configuration options
 * @returns Array of slide configurations
 *
 * @example
 * // Include only specific slides
 * const slides = createSlideConfig({
 *   include: ['overview', 'features', 'pricing']
 * })
 *
 * @example
 * // Exclude specific slides
 * const slides = createSlideConfig({
 *   exclude: ['comparison-summary', 'feature-comparison']
 * })
 *
 * @example
 * // Custom order
 * const slides = createSlideConfig({
 *   order: ['overview', 'pricing', 'features', 'customers']
 * })
 *
 * @example
 * // Override slide properties
 * const slides = createSlideConfig({
 *   overrides: {
 *     pricing: { name: 'Plans & Pricing' },
 *     features: { props: { customProp: 'value' } }
 *   }
 * })
 *
 * @example
 * // Add custom slides
 * const slides = createSlideConfig({
 *   custom: [
 *     { handle: 'custom-slide', name: 'My Custom Slide', component: MyCustomComponent }
 *   ]
 * })
 */
export function createSlideConfig(options: SlideConfigOptions = {}): SlideConfig[] {
    const { include, exclude, order, overrides = {}, custom = [] } = options

    let slides: SlideConfig[] = []

    // Start with default slides
    const slideHandles = Object.keys(defaultSlides)

    // Apply include filter
    let filteredHandles = include ? slideHandles.filter((handle) => include.includes(handle)) : slideHandles

    // Apply exclude filter
    if (exclude) {
        filteredHandles = filteredHandles.filter((handle) => !exclude.includes(handle))
    }

    // Apply custom order if specified
    if (order) {
        const orderedHandles = order.filter((handle) => filteredHandles.includes(handle))
        const remainingHandles = filteredHandles.filter((handle) => !order.includes(handle))
        filteredHandles = [...orderedHandles, ...remainingHandles]
    }

    // Create slide configs with overrides
    slides = filteredHandles.map((handle) => {
        const defaultSlide = defaultSlides[handle]
        const override = overrides[handle] || {}

        return {
            ...defaultSlide,
            ...override,
            props: {
                ...defaultSlide.props,
                ...override.props,
            },
        }
    })

    // Add custom slides
    slides.push(...custom)

    return slides
}
