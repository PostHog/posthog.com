import React from 'react'

import { PRIORITY_STYLES, ReportPriority } from './types'

interface PriorityDotProps {
    priority: ReportPriority
    /** Show the P0–P4 text next to the dot. When false the label stays in the a11y tree. */
    showLabel?: boolean
    className?: string
}

/** The dot means nothing to a screen reader, so the label is always present, just hidden. */
export default function PriorityDot({ priority, showLabel = false, className = '' }: PriorityDotProps): JSX.Element {
    const styles = PRIORITY_STYLES[priority]

    return (
        <span className={`inline-flex items-center gap-1.5 ${className}`}>
            <span className={`size-2 shrink-0 rounded-full ${styles.dot}`} aria-hidden="true" />
            <span className={showLabel ? `text-xs font-semibold ${styles.label}` : 'sr-only'}>
                {showLabel ? priority : `Priority ${priority}`}
            </span>
        </span>
    )
}
