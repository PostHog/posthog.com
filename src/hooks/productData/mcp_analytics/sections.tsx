import React from 'react'
import MCPLeaderboardCallout from 'components/MCPLeaderboardCallout'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct/types'

/**
 * Page-only sections for /mcp-analytics, wired in through the menu item's `component` field so the
 * shared templates stay untouched.
 */

/** "We just had to rank the robots" callout that links to /mcp/leaderboard. */
export const LeaderboardSection = ({ id }: SectionComponentProps) => (
    // Key features already ends with mb-12. This section is its own group, so the page
    // stack adds another gap-12 above it. -mt-12 cancels that extra gap.
    <section id={id} className="scroll-mt-20 -mt-12">
        <MCPLeaderboardCallout className="!my-0" />
    </section>
)
