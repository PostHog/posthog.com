import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Explorer from 'components/Explorer'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import HogpediaShell from 'components/Hogpedia/HogpediaShell'

type Commit = {
    date: string
    message: string
    url: string
    author?: { login: string; html_url: string } | null
}

type Change = Commit & { title: string; slug: string }

/**
 * Special:RecentChanges, driven by the real commit log.
 *
 * `gatsby-source-git-metadata` attaches the commits for each content file. That plugin
 * needs `GITHUB_API_KEY`, and it attaches nothing without one, so this page has an honest
 * empty state rather than a fabricated list. Byte counts are not shown because the plugin
 * does not report them.
 */
export default function HogpediaRecentChanges(): JSX.Element {
    const data = useStaticQuery(graphql`
        query HogpediaRecentChanges {
            allMdx(filter: { fields: { slug: { regex: "/^/hogpedia//" } }, frontmatter: { title: { ne: "" } } }) {
                nodes {
                    fields {
                        slug
                        commits {
                            date
                            message
                            url
                            author {
                                login
                                html_url
                            }
                        }
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    `)

    const changes: Change[] = data.allMdx.nodes
        .flatMap((node: any) =>
            (node.fields.commits || []).map((commit: Commit) => ({
                ...commit,
                title: node.frontmatter.title,
                slug: node.fields.slug.replace(/\/$/, ''),
            }))
        )
        .sort((a: Change, b: Change) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 60)

    return (
        <>
            <SEO
                title="Recent changes – Hogpedia"
                description="The most recent edits to Hogpedia articles, taken from the commit log of the posthog.com repository."
                canonicalUrl="/hogpedia/recent-changes"
                noindex
            />
            <Explorer template="generic" slug="hogpedia" title="Recent changes – Hogpedia" fullScreen>
                <HogpediaShell title="Recent changes" slug="/hogpedia/recent-changes" showTabs={false}>
                    <div className="hp-prose">
                        {changes.length === 0 ? (
                            <p>
                                No edits are listed. Hogpedia reads its history from the commit log of the{' '}
                                <Link
                                    to="https://github.com/PostHog/posthog.com/commits/master/contents/hogpedia"
                                    externalNoIcon
                                    className="hp-external"
                                >
                                    posthog.com repository
                                </Link>
                                , and a build without a GitHub token cannot read it. The link above always shows the
                                real history.
                            </p>
                        ) : (
                            <>
                                <p>
                                    The {changes.length} most recent edits to Hogpedia, newest first. This list is the
                                    real commit log of{' '}
                                    <Link
                                        to="https://github.com/PostHog/posthog.com/tree/master/contents/hogpedia"
                                        externalNoIcon
                                        className="hp-external"
                                    >
                                        contents/hogpedia
                                    </Link>
                                    .
                                </p>
                                <ul className="hp-changes">
                                    {changes.map((change) => (
                                        <li key={`${change.url}-${change.slug}`}>
                                            <span className="hp-changes-diff">
                                                (
                                                <Link to={change.url} externalNoIcon>
                                                    diff
                                                </Link>{' '}
                                                |{' '}
                                                <Link
                                                    to={`https://github.com/PostHog/posthog.com/commits/master/contents${change.slug}.mdx`}
                                                    externalNoIcon
                                                >
                                                    hist
                                                </Link>
                                                )
                                            </span>{' '}
                                            . . <Link to={change.slug}>{change.title}</Link>;{' '}
                                            <span className="hp-changes-date">
                                                {new Date(change.date).toLocaleString('en-US', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </span>{' '}
                                            . .{' '}
                                            {change.author ? (
                                                <Link to={change.author.html_url} externalNoIcon>
                                                    {change.author.login}
                                                </Link>
                                            ) : (
                                                <span>an unknown editor</span>
                                            )}{' '}
                                            <i>({change.message})</i>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </HogpediaShell>
            </Explorer>
        </>
    )
}
