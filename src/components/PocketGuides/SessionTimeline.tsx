import React from 'react'

import { IconChat, IconCursorClick, IconEye, IconList, IconWarning } from '@posthog/icons'

import { FigureMarker } from './FigureMarker'

/**
 * The issue's Timeline tab, drawn. One row per thing that happened in the session, newest last,
 * with the exception steps sitting between the pageviews and logs that surround them.
 *
 * Categories, their icons, and the row shape follow the app – see
 * `frontend/src/lib/components/SessionTimeline` in the posthog repo. A row is a source icon, a
 * timestamp, a category icon, a bold primary text and a muted secondary one; the app truncates the
 * secondary rather than wrapping, so this does too.
 */

/** The app's `ItemCategory`, minus the ones a book figure never needs to draw. */
export type TimelineCategory = 'exception' | 'exception step' | 'pageview' | 'custom event' | 'console log'

const CATEGORY: Record<TimelineCategory, { Icon: React.ComponentType<{ className?: string }>; classes: string }> = {
    exception: { Icon: IconWarning, classes: 'text-red' },
    'exception step': { Icon: IconList, classes: 'text-orange' },
    pageview: { Icon: IconEye, classes: 'text-secondary' },
    'custom event': { Icon: IconCursorClick, classes: 'text-secondary' },
    'console log': { Icon: IconChat, classes: 'text-secondary' },
}

export interface TimelineRow {
    /** Wall clock, as the app prints it: HH:MM:SS. */
    time: string
    category: TimelineCategory
    /** The bold half of the row. */
    primary: string
    /** The muted half, truncated rather than wrapped. */
    secondary?: string
    /** Draws the row as the selected one, the way the app marks where you are. */
    current?: boolean
    /** Annotates this row with a hoverable number. */
    marker?: { n: number; label: string; gloss: string }
}

export default function SessionTimeline({ rows }: { rows: TimelineRow[] }): JSX.Element {
    return (
        <div className="@container group/anatomy overflow-hidden rounded border border-primary bg-primary">
            {/* The filter bar. Not interactive here – it is in the figure because the categories
                are the point: steps arrive alongside everything else the session recorded. */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-primary px-3 py-1.5 text-[0.7em] font-bold">
                {(['exception', 'exception step', 'pageview', 'custom event', 'console log'] as const).map((key) => {
                    const { Icon, classes } = CATEGORY[key]
                    return (
                        <span key={key} className={`flex items-center gap-1 capitalize ${classes}`}>
                            <Icon className="size-[1.1em]" />
                            {key}s
                        </span>
                    )
                })}
            </div>

            <ul className="m-0 list-none divide-y divide-primary p-0">
                {rows.map((row, index) => {
                    const { Icon, classes } = CATEGORY[row.category]
                    return (
                        // Rows repeat – a session throws the same error many times – so the index
                        // disambiguates. Safe: rows are static and never reorder.
                        <li
                            key={`${row.time}-${index}`}
                            className={`flex items-center gap-2 px-3 py-1 text-[0.72em] leading-relaxed ${
                                row.current ? 'border-l-2 border-l-orange bg-accent dark:bg-accent-dark' : ''
                            }`}
                        >
                            <span className="shrink-0 font-code tabular-nums text-secondary/70">{row.time}</span>
                            <Icon className={`size-[1.2em] shrink-0 ${classes}`} aria-hidden="true" />
                            <span className="shrink-0 font-bold text-primary">{row.primary}</span>
                            {row.secondary && (
                                <span className="min-w-0 truncate text-secondary/70">{row.secondary}</span>
                            )}
                            {row.marker && (
                                <span className="ml-auto shrink-0">
                                    <FigureMarker n={row.marker.n} label={row.marker.label} gloss={row.marker.gloss} />
                                </span>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
