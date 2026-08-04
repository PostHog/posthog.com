import React from 'react'

import Markdown from 'components/Markdown'

import { SelfDrivingReport } from './types'

interface ReportCardProps {
    report: SelfDrivingReport
    /** `page` brings its own border; `preview` lets the inbox pane provide the frame. */
    variant?: 'page' | 'preview'
    className?: string
}

/** One report, shared by the gallery and the template page – seeing the same artifact teaches. */
export default function ReportCard({ report, variant = 'page', className = '' }: ReportCardProps): JSX.Element {
    const isPage = variant === 'page'

    return (
        <article
            className={`@container ${
                isPage ? 'rounded border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6' : ''
            } ${className}`}
        >
            <header className="mb-3">
                {/* No priority dot – see ReportRow. */}
                <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-secondary">
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

            {/* The impact claim, not a footnote – it's the number that decides whether this report
                is worth anyone's afternoon, so it gets weight rather than muted secondary text. */}
            {report.affected && <p className="mt-3 mb-0 text-[15px] font-bold text-primary">{report.affected}</p>}

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
