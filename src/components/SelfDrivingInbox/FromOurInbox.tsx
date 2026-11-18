import React, { useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import dayjs from 'dayjs'
import { IconCheck, IconChevronDown, IconPullRequest } from '@posthog/icons'

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
                            resolution {
                                label
                                resolvedAt
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
                .filter((node: any) => {
                    const example = node.frontmatter?.inboxExample
                    // An example must show its outcome: a merged pull request, or work that needed none.
                    return node.frontmatter?.report?.title && (example?.pullRequest?.url || example?.resolution?.label)
                })
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

function Row({ example, open, onToggle }: { example: InboxExample; open: boolean; onToggle: () => void }): JSX.Element {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={`inbox-example-${example.reportId}`}
            className={`flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-accent ${open ? 'bg-accent' : ''}`}
        >
            <span className="min-w-0 flex-1">
                <span className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-secondary">
                    <span>{example.report.source}</span>
                    <span aria-hidden="true">·</span>
                    <span>{formatDate(example.publishedAt)}</span>
                </span>
                <span className="block text-sm font-bold leading-snug text-primary">{example.report.title}</span>
                <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-green">
                    {example.pullRequest ? (
                        <>
                            <IconPullRequest className="size-3.5" />
                            Merged
                        </>
                    ) : (
                        <>
                            <IconCheck className="size-3.5" />
                            {example.resolution?.label}
                        </>
                    )}
                </span>
            </span>
            <IconChevronDown
                className={`mt-1 size-5 shrink-0 text-secondary transition-transform motion-reduce:transition-none ${
                    open ? 'rotate-180' : ''
                }`}
            />
        </button>
    )
}

function PullRequestOutcome({ pullRequest }: { pullRequest: NonNullable<InboxExample['pullRequest']> }): JSX.Element {
    const merged = formatDate(pullRequest.mergedAt)
    const number = prNumber(pullRequest.url)

    return (
        <>
            <p className="m-0 flex items-start gap-1.5 text-[15px] text-primary">
                <IconPullRequest className="mt-0.5 size-4 shrink-0 text-green" />
                <Link to={pullRequest.url} externalNoIcon className="font-semibold">
                    {pullRequest.title}
                    {number && <span className="text-secondary"> {number}</span>}
                </Link>
            </p>
            {merged && <p className="m-0 mt-1 pl-[22px] text-sm text-secondary">Merged {merged}</p>}
        </>
    )
}

function ResolutionOutcome({ resolution }: { resolution: NonNullable<InboxExample['resolution']> }): JSX.Element {
    const resolved = formatDate(resolution.resolvedAt)

    return (
        <>
            <p className="m-0 flex items-start gap-1.5 text-[15px] font-semibold text-primary">
                <IconCheck className="mt-0.5 size-4 shrink-0 text-green" />
                {resolution.label}, no pull request needed
            </p>
            {resolved && <p className="m-0 mt-1 pl-[22px] text-sm text-secondary">Resolved {resolved}</p>}
        </>
    )
}

function Detail({ example }: { example: InboxExample }): JSX.Element {
    return (
        <div className="space-y-4">
            <ReportCard report={example.report} />
            <section className="rounded border border-primary p-4">
                <h4 className="m-0 mb-2 text-sm font-bold text-primary">What happened next</h4>
                {example.pullRequest ? (
                    <PullRequestOutcome pullRequest={example.pullRequest} />
                ) : (
                    example.resolution && <ResolutionOutcome resolution={example.resolution} />
                )}
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
    const [openIds, setOpenIds] = useState<Set<string>>(new Set())

    if (examples.length === 0) {
        return null
    }

    const toggle = (reportId: string): void =>
        setOpenIds((current) => {
            const next = new Set(current)
            if (!next.delete(reportId)) {
                next.add(reportId)
            }
            return next
        })

    return (
        <div className="@container not-prose my-6 overflow-hidden rounded border border-primary bg-primary">
            <header className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-primary px-4 py-2">
                <p className="m-0 text-sm font-bold text-primary">Inbox</p>
                <span className="text-sm text-secondary">
                    PostHog's own project · {examples.length} {examples.length === 1 ? 'report' : 'reports'}, every one
                    acted on
                </span>
            </header>

            <ul className="m-0 list-none p-0">
                {examples.map((example) => {
                    const open = openIds.has(example.reportId)
                    return (
                        <li key={example.reportId} className="m-0 border-b border-primary last:border-b-0">
                            <Row example={example} open={open} onToggle={() => toggle(example.reportId)} />
                            {/* Collapsed reports stay in the built HTML, so the .md mirror and search see them all. */}
                            <div
                                id={`inbox-example-${example.reportId}`}
                                className={open ? 'border-t border-primary p-4' : 'hidden'}
                            >
                                <Detail example={example} />
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
