import Explorer from 'components/Explorer'
import Cover, { InvitationCover } from 'components/FieldGuides/Cover'
import SEO from 'components/seo'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import { FIELD_GUIDE_VOLUMES } from '../../constants/fieldGuides'

/** Guides per volume, counted from the content rather than declared, so a count is never stale. */
function useGuideCounts(): Record<string, number> {
    const data = useStaticQuery(graphql`
        query FieldGuideCountsQuery {
            guides: allMdx(filter: { fields: { slug: { regex: "/^/field-guides//" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
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
        counts[volume] = (counts[volume] ?? 0) + 1
    }
    return counts
}

export default function FieldGuidesPage(): JSX.Element {
    const counts = useGuideCounts()
    const volumes = [...FIELD_GUIDE_VOLUMES].sort((a, b) => a.volume - b.volume)

    return (
        <>
            <SEO
                title="Field guides - PostHog"
                description="One job per guide: what to watch for in your product, and the one click that sets it up."
                image="/images/og/default.png"
            />
            {/* showTitle false: the page owns its heading, and Explorer's would be a second h1. */}
            <Explorer
                template="generic"
                slug="field-guides"
                title="Field guides"
                showTitle={false}
                showAddressBar={false}
            >
                {/* not-prose: Explorer wraps children in prose, which underlines every cover link. */}
                <div className="@container not-prose mx-auto max-w-4xl">
                    <header className="mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-primary @xl:text-4xl">Field guides</h1>
                        <p className="m-0 max-w-xl text-secondary">
                            One job per guide: what to watch for in your product, what it looks like when you find it,
                            and the one click that sets it up. Each volume is written by the team that owns the subject.
                        </p>
                    </header>

                    {/* Static list, not a filtered view – the shelf has to be in the built HTML for
                        the .md agent mirror and for search. */}
                    <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 @xl:grid-cols-3 @3xl:grid-cols-4">
                        {volumes.map((volume) => (
                            <li key={volume.id}>
                                <Cover volume={volume} count={counts[volume.id] ?? 0} />
                            </li>
                        ))}
                        <li>
                            <InvitationCover />
                        </li>
                    </ul>
                </div>
            </Explorer>
        </>
    )
}
