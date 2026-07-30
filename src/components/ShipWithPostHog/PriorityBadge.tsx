import React from 'react'
import type { Priority } from './inboxData'

// Matches the real Inbox priority chip: a tinted square monogram whose hue runs
// P0 (critical) → P4 (minimal). Hex values mirror PRIORITY_ACCENT in the app.
const PRIORITY_COLOR: Record<Priority, string> = {
    P0: '#e5484d', // danger (red)
    P1: '#f76b15', // warning (orange)
    P2: '#f2555a', // danger-lighter (light red)
    P3: '#3b9eff', // blue
    P4: '#8f8f8f', // gray
}

export default function PriorityBadge({ priority }: { priority: Priority }): JSX.Element {
    const color = PRIORITY_COLOR[priority]
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
