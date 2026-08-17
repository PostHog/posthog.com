import React from 'react'
import { IconAtSign, IconBolt, IconPlug } from '@posthog/icons'

/**
 * Where the free tier can be spent: the browser, Slack, or your own agent over MCP.
 */

const surfaces = [
    { name: 'PostHog Web', Icon: IconBolt, color: 'text-red' },
    { name: 'PostHog Slack', Icon: IconAtSign, color: 'text-sky-blue' },
    { name: 'PostHog MCP', Icon: IconPlug, color: 'text-gray' },
]

export default function Surfaces(): JSX.Element {
    return (
        // No `@container` of its own: nothing here queries a width. One flex row that wraps
        // covers every window size, and wrapping the label with the items keeps the line from
        // breaking mid-list at narrow widths.
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] not-prose pt-4">
            <span className="text-secondary">Used across any of these products:</span>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 list-none m-0 p-0">
                {surfaces.map(({ name, Icon, color }) => (
                    <li key={name} className="flex items-center gap-1.5 whitespace-nowrap">
                        <Icon className={`size-4 shrink-0 ${color}`} />
                        <span className="font-semibold">{name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
