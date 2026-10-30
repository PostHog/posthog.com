import { useStaticQuery, graphql } from 'gatsby'

export type HogpediaArticleSummary = {
    slug: string
    title: string
    description: string
    aliases: string[]
    categories: string[]
    isTalk: boolean
}

type QueryNode = {
    excerpt: string
    fields: { slug: string }
    frontmatter: {
        title: string
        description?: string
        hogpedia?: {
            aliases?: string[]
            categories?: string[]
        }
    }
}

/**
 * Every Hogpedia article, read at build time.
 *
 * The list drives the article count on the Main Page, the search index, Special:Random and
 * Special:AllPages. All four therefore agree with the files on disk, and none of them can
 * name an article that does not exist.
 */
export const useHogpediaArticles = (): HogpediaArticleSummary[] => {
    const data = useStaticQuery(graphql`
        query HogpediaArticles {
            allMdx(
                filter: { fields: { slug: { regex: "/^/hogpedia//" } }, frontmatter: { title: { ne: "" } } }
                sort: { fields: frontmatter___title, order: ASC }
            ) {
                nodes {
                    excerpt(pruneLength: 180)
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        description
                        hogpedia {
                            aliases
                            categories
                        }
                    }
                }
            }
        }
    `)

    return (data.allMdx.nodes as QueryNode[]).map((node) => ({
        slug: node.fields.slug.replace(/\/$/, ''),
        title: node.frontmatter.title,
        description: node.frontmatter.description || node.excerpt,
        aliases: node.frontmatter.hogpedia?.aliases || [],
        categories: node.frontmatter.hogpedia?.categories || [],
        isTalk: node.fields.slug.startsWith('/hogpedia/talk/'),
    }))
}

/** Articles only. Talk pages are not articles, the same as on any encyclopedia. */
export const onlyArticles = (articles: HogpediaArticleSummary[]): HogpediaArticleSummary[] =>
    articles.filter((article) => !article.isTalk)

/**
 * Picks a random article.
 *
 * Never call this during render: a random value on the server never matches the one on the
 * client, and React would report a hydration mismatch. Call it from an event handler or
 * inside an effect.
 */
export const pickRandomArticle = (articles: HogpediaArticleSummary[]): HogpediaArticleSummary | undefined => {
    const pool = onlyArticles(articles)
    if (pool.length === 0) {
        return undefined
    }
    return pool[Math.floor(Math.random() * pool.length)]
}

export type EasterEgg = {
    /** Shown above the real results, in the voice of a 2007 search page. */
    notice: React.ReactNode
}

/**
 * A few queries get an extra notice above the real results. The real results still show,
 * so the joke never replaces the answer a person came for.
 *
 * Keys are compared after lowercasing and trimming.
 */
export const SEARCH_EASTER_EGGS: Record<string, string> = {
    'google analytics':
        'Hogpedia has no article with this exact name. You may be looking for a product with a free tier.',
    hedgehog:
        'Hedgehog may refer to: the animal, the mascot, the physics engine, or the office. Hogpedia cannot tell them apart either.',
    'quick call': 'Did you mean: a Slack message that would have been fine?',
    wikipedia:
        'Hogpedia is not affiliated with any other encyclopedia. Any resemblance is a coincidence and also deliberate.',
    hogpedia:
        'Hogpedia has an article about itself. Editors have discussed whether this is a conflict of interest, twice.',
    'dark mode': 'Hogpedia does not support dark mode. It is 2007.',
    posthog: 'You are in the right place.',
}

export const findEasterEgg = (query: string): string | undefined => SEARCH_EASTER_EGGS[query.trim().toLowerCase()]
