import Explorer from 'components/Explorer'
import Cover from 'components/FieldGuides/Cover'
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
                description="A field guide tells you what you're looking at in the wild. Ours tell you what you're looking at in your product, and then help you fix it."
                image="/images/og/default.png"
            />
            {/* showTitle false: the page owns its heading, and Explorer's would be a second h1. */}
            <Explorer
                template="generic"
                slug="field-guides"
                title="Field guides"
                showTitle={false}
                showAddressBar={false}
                // Explorer's <main> hardcodes bg-primary, so the ground has to be recoloured from
                // here – a child can't fill a parent whose height is content-driven.
                className="[&_main]:bg-accent dark:[&_main]:bg-accent-dark"
            >
                {/* not-prose: Explorer wraps children in prose, which underlines every cover link. */}
                <div className="@container not-prose p-2 @xl:p-6">
                    <div className="mx-auto max-w-5xl">
                        <header className="mb-10 max-w-2xl">
                            <h1 className="m-0 text-4xl font-bold leading-tight text-primary @xl:text-5xl">
                                Field guides
                            </h1>
                            <p className="mt-3 mb-0 text-base leading-relaxed text-secondary @xl:text-lg">
                                A field guide tells you what you're looking at in the wild. Ours tell you what you're
                                looking at in your product, and then help you fix it.
                            </p>
                        </header>

                        {/* Static list, not a filtered view – the shelf has to be in the built HTML
                            for the .md agent mirror and for search. */}
                        <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 @md:grid-cols-2 @2xl:grid-cols-3">
                            {volumes.map((volume) => (
                                <li key={volume.id}>
                                    <Cover volume={volume} count={counts[volume.id] ?? 0} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Explorer>
        </>
    )
}
