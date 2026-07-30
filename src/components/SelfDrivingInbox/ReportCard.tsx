import React from 'react'

import Markdown from 'components/Markdown'

import PriorityDot from './PriorityDot'
import { DEFAULT_PRIORITY, isReportPriority, SelfDrivingReport } from './types'

interface ReportCardProps {
    report: SelfDrivingReport
    /**
     * `page` — standalone on a template page, inside its own bordered card.
     * `preview` — filling the inbox's preview pane, where the pane provides the frame.
     */
    variant?: 'page' | 'preview'
    className?: string
}

/**
 * A self-driving report, rendered identically wherever it appears. The inbox gallery and the
 * template page share this component deliberately: seeing the same artifact in both places is
 * the teaching device, and two hand-synced copies would drift.
 */
export default function ReportCard({ report, variant = 'page', className = '' }: ReportCardProps): JSX.Element {
    const priority = isReportPriority(report.priority) ? report.priority : DEFAULT_PRIORITY
    const isPage = variant === 'page'

    return (
        <article
            className={`@container ${
                isPage ? 'rounded border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6' : ''
            } ${className}`}
        >
            <header className="mb-3">
                <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-secondary">
                    <PriorityDot priority={priority} showLabel />
                    <span aria-hidden="true">·</span>
                    <span>{report.source}</span>
                    {report.receivedAgo && (
                        <>
                            <span aria-hidden="true">·</span>
                            <span>{report.receivedAgo} ago</span>
                        </>
                    )}
                </div>
                <h3 className="m-0 text-[15px] font-bold leading-snug text-primary @[480px]:text-base">
                    {report.title}
                </h3>
            </header>

            <Markdown className="text-[15px] text-primary [&>p]:mb-2 [&>p:last-child]:mb-0">{report.body}</Markdown>

            {report.affected && <p className="mt-2 mb-0 text-[15px] text-secondary">{report.affected}</p>}

            {report.suggestedAction && (
                <div className="mt-4 border-t border-light pt-3 dark:border-dark">
                    <p className="m-0 text-[15px] text-primary">
                        <strong>Suggested action:</strong>{' '}
                        <Markdown className="inline [&>p]:m-0 [&>p]:inline">{report.suggestedAction}</Markdown>
                    </p>
                    {report.actionNote && <p className="mt-1 mb-0 text-sm text-secondary">{report.actionNote}</p>}
                </div>
            )}
        </article>
    )
}
