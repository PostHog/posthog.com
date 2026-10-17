import { graphql, useStaticQuery } from 'gatsby'
import { volumeById } from '../constants/pocketGuides'

/** Numbered guides per volume, with an explicit opt-in for orientation-only volumes. */
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
        // Skip sibling SKILL.md files, `_`-prefixed starters, and untitled drafts.
        if (!volume || guide?.startsWith('_') || !node.frontmatter?.title) {
            continue
        }

        const order = node.frontmatter.pocketGuideOrder
        const includeOrientationPages = volumeById(volume)?.countOrientationPages
        const shouldCount = includeOrientationPages
            ? typeof order === 'number' && order >= 0
            : Boolean(guide && typeof order === 'number' && order > 0 && !node.frontmatter.isPrimer)

        if (shouldCount) {
            counts[volume] = (counts[volume] ?? 0) + 1
        }
    }
    return counts
}
