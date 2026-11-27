/**
 * Callout that sends readers to /mcp/leaderboard. The layout lives in HoggieCallout.
 */
import React from 'react'
import { HedgehogBasketballCoach } from '@posthog/brand/hoggies'
import HoggieCallout from 'components/HoggieCallout'

export default function MCPLeaderboardCallout({ className = '' }: { className?: string }): JSX.Element {
    return (
        <HoggieCallout
            hoggie={HedgehogBasketballCoach}
            hoggieTitle="A hedgehog basketball coach spinning a ball, holding a clipboard"
            ariaLabel="MCP leaderboard"
            title="We just had to rank the robots"
            description="Watch agents fight over who calls the PostHog MCP the most. The agents did not ask for this, but the humans are having fun watching it."
            buttonLabel="MCP Leaderboard"
            to="/mcp/leaderboard"
            className={className}
        />
    )
}
