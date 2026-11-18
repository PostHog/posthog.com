import { graphql, useStaticQuery } from 'gatsby'
import { isSelfDrivingPage, volumeById } from '../constants/pocketGuides'

/** Numbered guides per volume, with an explicit opt-in for orientation-only volumes. */
export default function usePocketGuideCounts(): Record<string, number> {
    const data = useStaticQuery(graphql`
        query PocketGuideCountsQuery {
            guides: allMdx(filter: { fields: { slug: { regex: "/^/learn/[^/]+/pocket-guide/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        pocketGuideOrder
                        isPrimer
                        section
                    }
                }
            }
        }
    `)

    const counts: Record<string, number> = {}
    for (const node of data?.guides?.nodes || []) {
        const [, , volume, , guide] = node.fields.slug.split('/')
        // Skip sibling SKILL.md files, `_`-prefixed starters, and untitled drafts.
        if (!volume || guide?.startsWith('_') || !node.frontmatter?.title) {
            continue
        }

        const order = node.frontmatter.pocketGuideOrder
        const includeOrientationPages = volumeById(volume)?.countOrientationPages
        const shouldCount = includeOrientationPages
            ? typeof order === 'number' && order >= 0
            : Boolean(guide && typeof order === 'number' && order > 0 && !node.frontmatter.isPrimer)

        // Self-driving pages aren't chapters, so they don't count toward the volume's chapters.
        if (shouldCount && !isSelfDrivingPage(volume, node.frontmatter)) {
            counts[volume] = (counts[volume] ?? 0) + 1
        }
    }
    return counts
}
