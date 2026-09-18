import React from 'react'
import type { Priority } from './inboxData'

/**
 * The hue and name for each priority level, shared by the row badge and the priority
 * filter menu so the two can't drift.
 *
 * The ramp runs red → orange → yellow → blue → gray as severity drops, matching the
 * app's own priority menu. Hex rather than Tailwind tokens because the badge tints
 * border and background from the same value via `color-mix`.
 */
export const PRIORITY_META: Record<Priority, { color: string; label: string }> = {
    P0: { color: '#e5484d', label: 'Critical' }, // danger (red)
    P1: { color: '#f76b15', label: 'High' }, // warning (orange)
    P2: { color: '#f7a501', label: 'Medium' }, // yellow
    P3: { color: '#3b9eff', label: 'Low' }, // blue
    P4: { color: '#8f8f8f', label: 'Minimal' }, // gray
}

/** P0 first, as the filter menu lists them. */
export const PRIORITIES: Priority[] = ['P0', 'P1', 'P2', 'P3', 'P4']

export default function PriorityBadge({ priority }: { priority: Priority }): JSX.Element {
    const { color } = PRIORITY_META[priority]
    return (
        <span
            className="inline-flex size-6 shrink-0 select-none items-center justify-center rounded-sm border text-[10px] font-semibold tabular-nums"
            style={{
                color,
                borderColor: `color-mix(in srgb, ${color} 40%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)`,
            }}
            title={`Priority ${priority}`}
        >
            {priority}
        </span>
    )
}
