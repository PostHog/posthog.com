import React from 'react'
import { IconBrowser } from '@posthog/icons'
import { IconMCP, IconSlack } from 'components/OSIcons'

/**
 * Where the free tier can be spent: the browser, Slack, or your own agent over MCP.
 *
 * A one-line footnote under `FreeTierTicker`, because "which surface am I allowed to use
 * this from?" is a question about the allowances directly above it, not a section of its
 * own. It replaced a full section on self-driving billing, which explained the same three
 * surfaces at a length that made a billing exception look like a second pitch.
 *
 * **Nothing here links out.** These are labels on the allowances above, not three more
 * places to go — the page has one signup CTA and this shouldn't compete with it.
 */

const surfaces = [
    { name: 'Web', Icon: IconBrowser },
    { name: 'Slack', Icon: IconSlack },
    { name: 'MCP', Icon: IconMCP },
]

export default function Surfaces(): JSX.Element {
    return (
        // No `@container` of its own: nothing here queries a width. One flex row that wraps
        // covers every window size, and wrapping the label with the items keeps the line from
        // breaking mid-list at narrow widths.
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] not-prose">
            <span className="text-secondary">Used across any of these products:</span>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 list-none m-0 p-0">
                {surfaces.map(({ name, Icon }) => (
                    <li key={name} className="flex items-center gap-1.5 whitespace-nowrap">
                        <Icon className="size-4 shrink-0 text-primary" />
                        <span className="font-semibold">{name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
