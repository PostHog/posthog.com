import React from 'react'
import { Applications } from 'components/Products/ReaderViewProduct/templates'
import MCPAnalyticsHowItWorks from 'components/MCPAnalyticsHowItWorks'
import MCPLeaderboardCallout from 'components/MCPLeaderboardCallout'
import type { CarouselSlide, SectionComponentProps } from 'components/Products/ReaderViewProduct/types'

/**
 * Page-only sections for /mcp-analytics, wired in through the menu item's `component` field so the
 * shared templates stay untouched.
 */

/** The shared "How do I use it?" carousel, with the 3-step diagram directly below it. */
export const ApplicationsWithHowItWorks = (props: SectionComponentProps & { slides?: CarouselSlide[] }) => (
    <div>
        <Applications {...props} />
        <MCPAnalyticsHowItWorks className="-mt-4" />
    </div>
)

/** "We just had to rank the robots" callout that links to /mcp/leaderboard. */
export const LeaderboardSection = ({ id }: SectionComponentProps) => (
    <section id={id} className="scroll-mt-20">
        <MCPLeaderboardCallout className="!my-0" />
    </section>
)
