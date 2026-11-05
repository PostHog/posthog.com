import slugify from 'slugify'

/**
 * The categories Hogpedia sorts its articles into. The list is fixed so the Explore module
 * on the Main Page and the category pages never disagree.
 *
 * There is deliberately no "People" category. Hogpedia documents the company and its
 * products, not biographies of the people who work there.
 */
export const HOGPEDIA_CATEGORIES = ['Products', 'Concepts', 'Company', 'History', 'Hog lore'] as const

export type HogpediaCategory = (typeof HOGPEDIA_CATEGORIES)[number]

export const categorySlug = (category: string): string => slugify(category, { lower: true, strict: true })

export const categoryPath = (category: string): string => `/hogpedia/category/${categorySlug(category)}`

/**
 * Page names under `/hogpedia/` that `src/pages/hogpedia/` owns.
 *
 * `gatsby/createPages.ts` throws when an article slug collides with one of these, so a new
 * article can never silently shadow the Main Page or a meta page.
 */
export const HOGPEDIA_RESERVED = [
    'about',
    'all-pages',
    'category',
    'donate',
    'random',
    'recent-changes',
    'search',
] as const
