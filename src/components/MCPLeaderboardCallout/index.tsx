/**
 * Callout that sends readers to /mcp/leaderboard.
 * Same layout as FieldGuideCallout: hog breaking out of the top border, copy, button.
 * The wrapper is a size container, so the row stacks on the callout's width.
 */
import React from 'react'
import { HedgehogBasketballCoach } from '@posthog/brand/hoggies'
import OSButton from 'components/OSButton'

export default function MCPLeaderboardCallout({ className = '' }: { className?: string }): JSX.Element {
    return (
        <aside aria-label="MCP leaderboard" className={`@container not-prose my-6 ${className}`}>
            <div className="relative border rounded bg-accent border-primary p-4 pl-28 @xl:pl-40">
                <HedgehogBasketballCoach
                    title="A hedgehog basketball coach spinning a ball, holding a clipboard"
                    className="absolute -top-4 left-2 w-24 @xl:left-3 @xl:w-32"
                />
                <div className="flex flex-col @xl:flex-row @xl:items-center gap-3 @xl:gap-4">
                    <div className="flex-1 min-w-0">
                        <strong className="block text-lg mb-0.5">We just had to rank the robots</strong>
                        <p className="m-0 text-[15px] !leading-relaxed">
                            Watch agents fight over who calls the PostHog MCP the most. The agents did not ask for this,
                            but the humans are having fun watching it.
                        </p>
                    </div>
                    <OSButton asLink to="/mcp/leaderboard" variant="primary" size="md" state={{ newWindow: true }}>
                        MCP Leaderboard
                    </OSButton>
                </div>
            </div>
        </aside>
    )
}
