import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import HogpediaShell from 'components/Hogpedia/HogpediaShell'
import MdxLinks from 'components/Hogpedia/MdxLinks'

type ChangelogEntry = {
    date: string
    title: string
    description?: string | null
    cta?: { label?: string | null; url?: string | null } | null
}

/**
 * Special:RecentChanges, driven by the PostHog changelog.
 *
 * The entries are the same `allRoadmap` records that `/changelog` renders — completed
 * roadmap items with a date — so this page lists real shipped changes rather than a
 * fabricated edit history. The source is Strapi, and a build without it yields nothing, so
 * the page keeps an honest empty state that links to the changelog itself.
 */
export default function HogpediaRecentChanges(): JSX.Element {
    const data = useStaticQuery(graphql`
        query HogpediaRecentChanges {
            allRoadmap(
                filter: { complete: { eq: true }, date: { ne: null } }
                sort: { fields: date, order: DESC }
                limit: 50
            ) {
                nodes {
                    date
                    title
                    description
                    cta {
                        label
                        url
                    }
                }
            }
        }
    `)

    const changes: ChangelogEntry[] = data.allRoadmap?.nodes || []

    // Changelog descriptions are Markdown: several paragraphs in places, and often a bullet
    // list of the platforms a change landed on. A recent changes line wants the opening
    // sentence, so this keeps the first paragraph and stops at the first list item. The
    // links inside it render through the same helper the infoboxes use.
    const summarise = (description: string): string =>
        description
            .split(/\n\s*\n/)[0]
            .split(/\n\s*[-*]\s/)[0]
            .trim()

    return (
        <>
            <SEO
                title="Recent changes – Hogpedia"
                description="The most recent changes to PostHog, taken from the PostHog changelog."
                canonicalUrl="/hogpedia/recent-changes"
            />
            <Explorer
                template="generic"
                slug="hogpedia"
                title="Recent changes – Hogpedia"
                fullScreen
                showAddressBar={false}
            >
                <HogpediaShell title="Recent changes" slug="/hogpedia/recent-changes" showTabs={false}>
                    <div className="hp-prose">
                        {changes.length === 0 ? (
                            <p>
                                No changes are listed. Hogpedia reads this page from the{' '}
                                <Link to="/changelog">PostHog changelog</Link>, and a build without access to it cannot
                                read the entries. The changelog itself is always current.
                            </p>
                        ) : (
                            <>
                                <p>
                                    The {changes.length} most recent changes to PostHog, newest first, taken from the{' '}
                                    <Link to="/changelog">PostHog changelog</Link>. These are changes to the software,
                                    not to Hogpedia. For edits to the articles, read the{' '}
                                    <Link
                                        to="https://github.com/PostHog/posthog.com/commits/master/contents/hogpedia"
                                        externalNoIcon
                                        className="hp-external"
                                    >
                                        commit log
                                    </Link>
                                    .
                                </p>
                                <ul className="hp-changes">
                                    {changes.map((change) => (
                                        <li key={`${change.date}-${change.title}`}>
                                            <span className="hp-changes-date">
                                                {new Date(change.date).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </span>{' '}
                                            . .{' '}
                                            {change.cta?.url ? (
                                                <Link to={change.cta.url} externalNoIcon>
                                                    {change.title}
                                                </Link>
                                            ) : (
                                                <b>{change.title}</b>
                                            )}
                                            {change.description && (
                                                <>
                                                    {' '}
                                                    . .{' '}
                                                    <i>
                                                        <MdxLinks text={summarise(change.description)} />
                                                    </i>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <p>
                                    <Link to="/changelog">The full changelog</Link> ·{' '}
                                    <Link to="/roadmap">What PostHog is building next</Link>
                                </p>
                            </>
                        )}
                    </div>
                </HogpediaShell>
            </Explorer>
        </>
    )
}
