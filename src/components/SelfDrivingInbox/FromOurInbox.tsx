import React, { useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import dayjs from 'dayjs'
import { IconPullRequest } from '@posthog/icons'

import Link from 'components/Link'
import Markdown from 'components/Markdown'

import ReportCard from './ReportCard'
import { InboxExample, UNCATEGORIZED } from './types'

/**
 * Every example is one frontmatter-only file under `from-our-inbox/_examples/`. The `_` prefix
 * keeps them out of the page and nav builders, the same way `_snippets` works.
 */
export function useInboxExamples(): InboxExample[] {
    const data = useStaticQuery(graphql`
        query FromOurInboxQuery {
            examples: allMdx(
                filter: { fields: { slug: { regex: "/^/docs/self-driving/from-our-inbox/_examples//" } } }
            ) {
                nodes {
                    frontmatter {
                        category
                        report {
                            title
                            source
                            body
                            suggestedAction
                            affected
                        }
                        inboxExample {
                            reportId
                            publishedAt
                            outcome
                            pullRequest {
                                url
                                title
                                mergedAt
                            }
                        }
                    }
                }
            }
        }
    `)

    return useMemo(
        () =>
            (data?.examples?.nodes || [])
                .filter((node: any) => node.frontmatter?.report?.title && node.frontmatter?.inboxExample?.pullRequest)
                .map(
                    (node: any): InboxExample => ({
                        ...node.frontmatter.inboxExample,
                        category: node.frontmatter.category || UNCATEGORIZED,
                        report: node.frontmatter.report,
                    })
                )
                // Newest first, so the page reads as a feed. The id breaks ties between same-day entries.
                .sort(
                    (a: InboxExample, b: InboxExample) =>
                        b.publishedAt.localeCompare(a.publishedAt) || a.reportId.localeCompare(b.reportId)
                ),
        [data]
    )
}

// Gatsby returns these dates as UTC midnight. Keep only the calendar day, so a viewer west of UTC
// does not see the day before.
const formatDate = (date?: string): string | null => (date ? dayjs(date.slice(0, 10)).format('MMM D, YYYY') : null)

function prNumber(url: string): string | null {
    const match = url.match(/\/pull\/(\d+)/)
    return match ? `#${match[1]}` : null
}

function Row({
    example,
    selected,
    onSelect,
}: {
    example: InboxExample
    selected: boolean
    onSelect: () => void
}): JSX.Element {
    return (
        <button
            type="button"
            onClick={onSelect}
            aria-pressed={selected}
            className={`block w-full px-4 py-3 text-left hover:bg-accent ${selected ? 'bg-accent' : ''}`}
        >
            <span className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-secondary">
                <span>{example.report.source}</span>
                <span aria-hidden="true">·</span>
                <span>{formatDate(example.publishedAt)}</span>
            </span>
            <span className="block text-sm font-bold leading-snug text-primary">{example.report.title}</span>
            <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-green">
                <IconPullRequest className="size-3.5" />
                Merged
            </span>
        </button>
    )
}

function Detail({ example }: { example: InboxExample }): JSX.Element {
    const { pullRequest } = example
    const merged = formatDate(pullRequest.mergedAt)
    const number = prNumber(pullRequest.url)

    return (
        <div className="space-y-4">
            <ReportCard report={example.report} />
            <section className="rounded border border-primary p-4">
                <h4 className="m-0 mb-2 text-sm font-bold text-primary">What happened next</h4>
                <p className="m-0 flex items-start gap-1.5 text-[15px] text-primary">
                    <IconPullRequest className="mt-0.5 size-4 shrink-0 text-green" />
                    <Link to={pullRequest.url} externalNoIcon className="font-semibold">
                        {pullRequest.title}
                        {number && <span className="text-secondary"> {number}</span>}
                    </Link>
                </p>
                {merged && <p className="m-0 mt-1 pl-[22px] text-sm text-secondary">Merged {merged}</p>}
                {example.outcome && (
                    <Markdown className="mt-2 text-[15px] text-primary [&>p]:mb-0">{example.outcome}</Markdown>
                )}
            </section>
        </div>
    )
}

/** A read-only mock of the inbox, filled with real reports from PostHog's own project. */
export default function FromOurInbox(): JSX.Element | null {
    const examples = useInboxExamples()
    const [selectedId, setSelectedId] = useState<string | undefined>(examples[0]?.reportId)
    const selected = examples.find((example) => example.reportId === selectedId) || examples[0]

    if (!selected) {
        return null
    }

    return (
        <div className="@container not-prose my-6 overflow-hidden rounded border border-primary bg-primary">
            <header className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-primary px-4 py-2">
                <p className="m-0 text-sm font-bold text-primary">Inbox</p>
                <span className="text-sm text-secondary">
                    PostHog's own project · {examples.length} {examples.length === 1 ? 'report' : 'reports'}, every one
                    merged
                </span>
            </header>

            <div className="@[720px]:grid @[720px]:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                <ul className="m-0 list-none p-0 @[720px]:max-h-[720px] @[720px]:overflow-y-auto @[720px]:border-r @[720px]:border-primary">
                    {examples.map((example) => {
                        const isSelected = example.reportId === selected.reportId
                        return (
                            <li key={example.reportId} className="m-0 border-b border-primary last:border-b-0">
                                <Row
                                    example={example}
                                    selected={isSelected}
                                    onSelect={() => setSelectedId(example.reportId)}
                                />
                                {/* Narrow windows open the report under its row instead of in a side pane. */}
                                {isSelected && (
                                    <div className="border-t border-primary p-4 @[720px]:hidden">
                                        <Detail example={example} />
                                    </div>
                                )}
                            </li>
                        )
                    })}
                </ul>
                {/* Every report renders into the built HTML, so the .md mirror and search see them all. */}
                <div className="hidden p-4 @[720px]:block">
                    {examples.map((example) => (
                        <div key={example.reportId} className={example.reportId === selected.reportId ? '' : 'hidden'}>
                            <Detail example={example} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
