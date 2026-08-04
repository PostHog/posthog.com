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
                description="One PostHog use case per guide. See what it looks like in a real product, then set it up in one click."
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
                <div className="@container not-prose -m-4 min-h-full bg-accent p-6 @xl:p-10 dark:bg-accent-dark">
                    <div className="mx-auto max-w-5xl">
                        <header className="mb-10 max-w-2xl">
                            <h1 className="m-0 text-4xl font-bold leading-tight text-primary @xl:text-5xl">
                                Field guides
                            </h1>
                            <p className="mt-3 mb-0 text-base leading-relaxed text-secondary @xl:text-lg">
                                One PostHog use case per guide. See what it looks like in a real product, then set it up
                                in one click.
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

                        {/* The shelf is thin, so say what a volume holds rather than leave the
                            ground empty under it. */}
                        <section className="mt-12 max-w-2xl border-t border-primary pt-6">
                            <h2 className="m-0 mb-3 font-squeak text-sm uppercase tracking-wider text-secondary">
                                What's in a volume
                            </h2>
                            <dl className="m-0 grid gap-x-8 gap-y-4 @xl:grid-cols-2">
                                <div>
                                    <dt className="m-0 text-[15px] font-bold text-primary">One guide per job</dt>
                                    <dd className="m-0 mt-1 text-[15px] leading-snug text-secondary">
                                        One thing worth catching, shown as the report you'd get when it happens.
                                    </dd>
                                </div>
                                <div>
                                    <dt className="m-0 text-[15px] font-bold text-primary">
                                        A real example, not a sketch
                                    </dt>
                                    <dd className="m-0 mt-1 text-[15px] leading-snug text-secondary">
                                        Real numbers and real event names, from a product shaped like yours.
                                    </dd>
                                </div>
                                <div>
                                    <dt className="m-0 text-[15px] font-bold text-primary">One click at the end</dt>
                                    <dd className="m-0 mt-1 text-[15px] leading-snug text-secondary">
                                        A scout, a query, a workflow – whatever the job needs, already written.
                                    </dd>
                                </div>
                                <div>
                                    <dt className="m-0 text-[15px] font-bold text-primary">
                                        Written by whoever owns it
                                    </dt>
                                    <dd className="m-0 mt-1 text-[15px] leading-snug text-secondary">
                                        Each volume comes from the team that knows the subject, not from a docs queue.
                                    </dd>
                                </div>
                            </dl>
                        </section>
                    </div>
                </div>
            </Explorer>
        </>
    )
}
