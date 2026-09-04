import { graphql, useStaticQuery } from 'gatsby'

/** Numbered guides per volume. Front matter and `isPrimer` orientation pages don't count. */
export default function usePocketGuideCounts(): Record<string, number> {
    const data = useStaticQuery(graphql`
        query PocketGuideCountsQuery {
            guides: allMdx(filter: { fields: { slug: { regex: "/^/pocket-guides//" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        pocketGuideOrder
                        isPrimer
                    }
                }
            }
        }
    `)

    const counts: Record<string, number> = {}
    for (const node of data?.guides?.nodes || []) {
        const [, , volume, guide] = node.fields.slug.split('/')
        // Skip the volume's own index, sibling SKILL.md files, and `_`-prefixed starters.
        if (!volume || !guide || guide.startsWith('_') || !node.frontmatter?.title) {
            continue
        }
        // Numbered, past the front matter, and not a primer – primers can sit anywhere in the order.
        if (
            typeof node.frontmatter.pocketGuideOrder === 'number' &&
            node.frontmatter.pocketGuideOrder > 0 &&
            !node.frontmatter.isPrimer
        ) {
            counts[volume] = (counts[volume] ?? 0) + 1
        }
    }
    return counts
}
