import React from 'react'

import Link from 'components/Link'

import PriorityDot from './PriorityDot'
import { DEFAULT_PRIORITY, InboxTemplate, isReportPriority } from './types'

interface ReportRowProps {
    template: InboxTemplate
    selected?: boolean
    /** Plain left-click only – the caller prevents navigation, so open-in-new-tab keeps working. */
    onSelect?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

/** One inbox row. Always a real anchor, so the list works with JavaScript disabled. */
export default function ReportRow({ template, selected = false, onSelect }: ReportRowProps): JSX.Element {
    const { report } = template
    const priority = isReportPriority(report.priority) ? report.priority : DEFAULT_PRIORITY

    return (
        <Link
            to={template.url}
            className={`@container block border-b border-light px-4 py-3 no-underline transition-colors last:border-b-0 dark:border-dark ${
                selected ? 'bg-accent dark:bg-accent-dark' : 'hover:bg-accent/60 dark:hover:bg-accent-dark/60'
            }`}
            aria-current={selected ? 'true' : undefined}
            onClick={onSelect}
        >
            <span className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-secondary">
                <PriorityDot priority={priority} showLabel />
                <span aria-hidden="true">·</span>
                <span className="truncate">{report.source}</span>
                {report.receivedAgo && (
                    <>
                        <span aria-hidden="true">·</span>
                        <span className="shrink-0">{report.receivedAgo}</span>
                    </>
                )}
            </span>

            <span className="block text-[15px] font-semibold leading-snug text-primary">{report.title}</span>
        </Link>
    )
}
