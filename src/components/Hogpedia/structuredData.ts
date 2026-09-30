/**
 * JSON-LD for a Hogpedia page.
 *
 * An encyclopedia entry is the clearest thing an answer engine can read, so every article
 * emits `Article` plus a `BreadcrumbList`. A definitional article also emits `DefinedTerm`,
 * which is what the term entries actually are.
 */
import { POSTHOG_ORGANIZATION } from 'components/seo'

const SITE = 'https://posthog.com'

// Reuses the shared Organization node rather than a copy of it, so Hogpedia never
// describes a slightly different PostHog than the product pages do.
const { '@context': _context, ...POSTHOG_PUBLISHER } = POSTHOG_ORGANIZATION

export const buildArticleStructuredData = ({
    title,
    description,
    slug,
    dateModified,
    categories,
    isDefinition,
}: {
    title: string
    description: string
    slug: string
    dateModified?: string
    categories?: string[]
    isDefinition?: boolean
}): Record<string, any>[] => {
    const url = `${SITE}${slug}`

    const article: Record<string, any> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        isPartOf: {
            '@type': 'Collection',
            name: 'Hogpedia',
            url: `${SITE}/hogpedia`,
        },
        publisher: POSTHOG_PUBLISHER,
        ...(dateModified ? { dateModified } : {}),
        ...(categories && categories.length > 0
            ? { about: categories.map((name) => ({ '@type': 'Thing', name })) }
            : {}),
    }

    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Hogpedia', item: `${SITE}/hogpedia` },
            { '@type': 'ListItem', position: 2, name: title, item: url },
        ],
    }

    const output = [article, breadcrumb]

    if (isDefinition) {
        output.push({
            '@context': 'https://schema.org',
            '@type': 'DefinedTerm',
            name: title,
            description,
            url,
            inDefinedTermSet: {
                '@type': 'DefinedTermSet',
                name: 'Hogpedia',
                url: `${SITE}/hogpedia`,
            },
        })
    }

    return output
}

export const buildMainPageStructuredData = (articleCount: number): Record<string, any>[] => [
    {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Hogpedia',
        description: `An encyclopedia of PostHog products, concepts, company history and lore. ${articleCount} articles.`,
        url: `${SITE}/hogpedia`,
        publisher: POSTHOG_PUBLISHER,
    },
]
