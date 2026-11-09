import React from 'react'
import MCPLeaderboardCallout from 'components/MCPLeaderboardCallout'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct/types'

/**
 * Page-only sections for /mcp-analytics, wired in through the menu item's `component` field so the
 * shared templates stay untouched.
 */

/** "We just had to rank the robots" callout that links to /mcp/leaderboard. */
export const LeaderboardSection = ({ id }: SectionComponentProps) => (
    <section id={id} className="scroll-mt-20">
        <MCPLeaderboardCallout className="!my-0" />
    </section>
)
