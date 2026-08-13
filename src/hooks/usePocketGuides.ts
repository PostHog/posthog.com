// Volume comes from the slug, so new volumes need no change here. Not `useSelfDrivingTemplates()` – that hardcodes self-driving.

import { graphql, useStaticQuery } from 'gatsby'
import { useMemo } from 'react'

import { POCKET_GUIDE_VOLUMES, type PocketGuideVolume } from '../constants/pocketGuides'

/** One use case, reduced to what a list row needs. The book reader wants far more. */
export interface PocketGuideEntry {
    /** Route to the guide, e.g. /pocket-guides/self-driving/flag-debt */
    url: string
    title: string
    /** Doubles as the guide page's meta description, so it reads as a sentence. */
    subtitle?: string
    /** Reading order inside its own volume. Guides come back already sorted by it. */
    order: number
}

/** A registered volume, with whatever guides exist for it on disk. */
export interface PocketGuideVolumeWithGuides extends PocketGuideVolume {
    /** Every guide in the volume, in reading order. Empty for an unwritten one. */
    guides: PocketGuideEntry[]
    /** guides.length, so a caller can show "all N" without reaching in. */
    count: number
    /** The volume's own route. */
    url: string
}

export function usePocketGuides(): PocketGuideVolumeWithGuides[] {
    const data = useStaticQuery(graphql`
        query PocketGuidesByVolumeQuery {
            guides: allMdx(filter: { fields: { slug: { regex: "/^/pocket-guides//" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        subtitle
                        bookOrder
                        report {
                            title
                        }
                    }
                }
            }
        }
    `)

    return useMemo(() => {
        const byVolume = new Map<string, PocketGuideEntry[]>()

        for (const node of data?.guides?.nodes || []) {
            // /pocket-guides/<volume>/<guide>: a volume index has no <guide>, a SKILL.md sits deeper.
            const [, , volumeId, guide, ...rest] = node.fields.slug.split('/')
            // `_`-prefixed directories are starters to copy, not guides to browse.
            if (!volumeId || !guide || rest.length > 0 || guide.startsWith('_')) {
                continue
            }
            const { title, subtitle, bookOrder, report } = node.frontmatter || {}
            // A report is what makes a page a guide; omitting bookOrder is how a draft stays unlisted.
            if (!title || !report?.title || typeof bookOrder !== 'number') {
                continue
            }
            const entries = byVolume.get(volumeId) || []
            entries.push({ url: node.fields.slug, title, subtitle: subtitle || undefined, order: bookOrder })
            byVolume.set(volumeId, entries)
        }

        // Driven by the registry, not the query, so an announced volume with no MDX yet still returns.
        return [...POCKET_GUIDE_VOLUMES]
            .sort((a, b) => a.volume - b.volume)
            .map((volume) => {
                const guides = (byVolume.get(volume.id) || []).sort((a, b) => a.order - b.order)
                return { ...volume, guides, count: guides.length, url: `/pocket-guides/${volume.id}` }
            })
    }, [data])
}

export default usePocketGuides
