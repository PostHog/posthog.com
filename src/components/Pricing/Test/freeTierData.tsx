import React from 'react'
import * as Icons from '@posthog/icons'

/**
 * The monthly free-tier allowance for each product.
 *
 * Extracted from `FreeTier` so it can be rendered in more than one shape — the
 * auto-scrolling ticker on the pricing pages and the plain list in
 * `Redesign/FreeTierModal` — without the two drifting. Anything that reads as
 * presentation (icon sizes, tooltip vs. inline note) is left to the renderer.
 */
export interface FreeTierProduct {
    name: string
    /** The monthly allowance, e.g. `1M events`. */
    allocation?: string
    /** Shown *instead of* an allowance, for products billed as part of another. */
    description?: string
    badge?: string
    /** Detail too long for the allowance line: a tooltip in the ticker, an inline note in the list. */
    note?: React.ReactNode
    icon: React.ComponentType<{ className?: string }>
    iconColor: string
    /** Second icon, for products whose allowance covers two things. */
    icon2?: React.ComponentType<{ className?: string }>
    icon2Color?: string
}

export const freeTierProducts: FreeTierProduct[] = [
    {
        name: 'Analytics',
        allocation: '1M events',
        icon: Icons.IconGraph,
        iconColor: 'text-blue',
        icon2: Icons.IconPieChart,
        icon2Color: 'text-green',
    },
    {
        name: 'Session replay',
        allocation: '5K recordings',
        icon: Icons.IconRewindPlay,
        iconColor: 'text-yellow',
    },
    {
        name: 'Feature flags',
        allocation: '1M requests',
        icon: Icons.IconToggle,
        iconColor: 'text-seagreen',
    },
    {
        name: 'Experiments',
        description: 'Billed with feature flags',
        icon: Icons.IconFlask,
        iconColor: 'text-purple',
    },
    {
        name: 'Error tracking',
        allocation: '100K exceptions',
        icon: Icons.IconWarning,
        iconColor: 'text-orange',
    },
    {
        name: 'Surveys',
        allocation: '1500 responses',
        icon: Icons.IconMessage,
        iconColor: 'text-red',
    },
    {
        name: 'Data warehouse',
        allocation: '1M rows + FREE historical',
        note: (
            <>
                Ongoing 1M rows/month + free historical syncs for the first 7 days for each new source (unlimited on
                paid plan, 100M otherwise)
            </>
        ),
        icon: Icons.IconDatabase,
        iconColor: 'text-purple',
    },
    {
        name: 'Data pipelines',
        allocation: '10K events + 1M rows',
        note: (
            <>
                Real-time destinations: Send events to Slack, webhooks, and 40+ tools as they happen.
                <br />
                Batch exports: Reliable scheduled exports to S3, Snowflake, BigQuery, and more
            </>
        ),
        icon: Icons.IconDecisionTree,
        iconColor: 'text-seagreen',
    },
    {
        name: 'AI Observability',
        allocation: '100K events',
        icon: Icons.IconLlmAnalytics,
        iconColor: 'text-purple',
    },
    {
        name: 'PostHog AI',
        allocation: '500 credits (worth $5)',
        icon: Icons.IconSparkles,
        iconColor: 'text-blue',
    },
    {
        name: 'Inbox',
        badge: 'Beta',
        allocation: '3 PRs',
        icon: Icons.IconNotification,
        iconColor: 'text-blue',
    },
    {
        name: 'Workflows',
        allocation: '10K messages per channel',
        icon: Icons.IconDecisionTree,
        iconColor: 'text-teal',
    },
    {
        name: 'Logs',
        allocation: '10 GB ingested',
        icon: Icons.IconTerminal,
        iconColor: 'text-blue',
    },
    {
        name: 'Replay Vision',
        allocation: '2500 credits (worth $25)',
        icon: Icons.IconEye,
        iconColor: 'text-yellow',
    },
    {
        name: 'PostHog Desktop',
        badge: 'Beta',
        allocation: '2000 credits (worth $20)',
        note: (
            <>
                Its own balance, separate from PostHog AI's. Model tokens are passed through at the provider's price
                with no markup; cloud tasks also spend credits on the sandbox they run on.
            </>
        ),
        icon: Icons.IconLaptop,
        iconColor: 'text-brown dark:text-brown-dark',
    },
]
