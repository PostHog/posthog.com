import React from 'react'
import {
    IconPlug,
    IconTarget,
    IconThoughtBubble,
    IconListTreeConnected,
    IconRewindPlay,
    IconSparkles,
    IconGraph,
} from '@posthog/icons'
import OSButton from 'components/OSButton'

// MCP analytics is an alpha product (@posthog/mcp on npm) with a dedicated scene in the app
// gated behind the `mcp-analytics` early access feature. Copy here is sourced from the docs in
// contents/docs/mcp-analytics/. There are no marketing screenshots yet, so the slides are
// text/icon-driven — drop Cloudinary image URLs into `screenshots.overview` and the per-feature
// `images` arrays when they exist. See src/components/EarlyAccessOptIn/README.md for how the
// opt-in links to the early access feature in the app (identity isn't shared with the website).

export const mcpAnalytics = {
    name: 'MCP analytics',
    Icon: IconPlug,
    description: 'See how agents actually use your MCP server',
    handle: 'mcp_analytics',
    type: 'mcp_analytics',
    slug: 'mcp-analytics',
    color: 'blue',
    colorSecondary: 'sky-blue',
    category: 'analytics',
    // Alpha, gated behind the `mcp-analytics` early access feature. 'beta' renders the badge on
    // the overview slide and keeps the product clickable in nav (only 'WIP' is disabled).
    status: 'beta',
    seo: {
        title: 'MCP analytics – See how agents use your MCP server in PostHog',
        description:
            "Understand how agents actually use your MCP server: which tools get called, what the agent wanted, where calls fail, and which capabilities are missing. It's all normal PostHog events.",
    },
    overview: {
        title: 'See how agents use your MCP server',
        description:
            'Product analytics for your MCP server. Wrap it in one line and every tool call, agent intent, and failure lands in PostHog as a normal event you can query, chart, and alert on.',
        textColor: 'text-white',
        layout: 'columns',
    },
    // TODO (asset step): add `images` on the feature cards below.
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/mcp_dashboard_light_0907967b56.png',
            alt: 'MCP analytics dashboard',
            classes: '',
        },
    },
    features: [
        {
            label: 'Features',
        },
        {
            title: 'Every tool call',
            icon: <IconTarget />,
            color: 'blue',
            headline: 'Every tool call',
            description:
                'Every tool call becomes an event. See exactly what the agent sent, what came back, how long it took, and whether it failed.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/mcp_activity_feed_light_197cb57f3c.png',
                    srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/mcp_activity_feed_dark_e795d95547.png',
                    alt: 'MCP tool call activity feed',
                },
            ],
        },
        {
            title: 'Agent intent',
            icon: <IconThoughtBubble />,
            color: 'seagreen',
            headline: 'Agent intent',
            description:
                'Capture the goal behind each call, so you can tell a useful request from a confused one. The SDK reads the agent intent automatically.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/mcp_card_intent_light_701844569c.png',
                    srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/mcp_card_intent_dark_1b033bf1dc.png',
                    alt: 'Agent intent captured for each tool call in a session',
                },
            ],
        },
        {
            title: 'Advertised vs called',
            icon: <IconListTreeConnected />,
            color: 'purple',
            headline: 'Advertised vs called',
            description:
                'See which tools you advertise but agents never call, so you can cut what nobody uses and improve what they do.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/mcp_card_advertised_light_2e98fb854f.png',
                    srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/mcp_card_advertised_dark_b189093a50.png',
                    alt: 'Per-tool call volume and reliability table',
                },
            ],
        },
        {
            title: 'Clients',
            icon: <IconPlug />,
            color: 'red',
            headline: 'Clients',
            description:
                "Know which clients are connecting and which version they're on, whether that's Claude Desktop, Cursor, Codex, or your own.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/mcp_card_clients_light_4a22b61f07.png',
                    srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/mcp_card_clients_dark_42dc6cf72c.png',
                    alt: 'Share of MCP calls by client',
                },
            ],
        },
        {
            title: 'Sessions',
            icon: <IconRewindPlay />,
            color: 'yellow',
            headline: 'Sessions',
            description:
                'Follow a whole conversation across every tool call. PostHog stitches multi-turn sessions together so you can see how a task really unfolds.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/mcp_sessions_light_bdd1eb84cb.png',
                    srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/mcp_sessions_dark_d5b4aa4577.png',
                    alt: 'MCP session timeline stepping through tool calls',
                },
            ],
        },
        {
            title: 'Capability gaps',
            icon: <IconSparkles />,
            color: 'orange',
            headline: 'Capability gaps',
            description:
                "Let agents tell you what they wanted but you don't offer yet. Unmet demand turns into a roadmap written by your users' agents.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/mcp_missing_capability_light_f9864cae92.png',
                    srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/mcp_missing_capability_dark_aac81d58c5.png',
                    alt: 'Missing capabilities broken down by client',
                },
            ],
        },
        {
            title: 'See it in PostHog',
            handle: 'see_it_in_posthog',
            icon: <IconGraph />,
            color: 'blue',
            headline: "One wrapper call, then it's just PostHog",
            description:
                "Wrap your server in one line and every request becomes a PostHog event. From there it's all the tools you already know: insights, dashboards, alerts, SQL, and error tracking, with no extra setup.",
            children: (
                <div className="p-8 @2xl:p-12 space-y-6">
                    <pre className="bg-accent rounded-md p-4 text-sm overflow-x-auto">
                        <code>npm install @posthog/mcp posthog-node</code>
                    </pre>
                    <div className="flex flex-wrap gap-2">
                        <OSButton
                            variant="primary"
                            size="md"
                            asLink
                            external
                            to="https://us.posthog.com/mcp-analytics/dashboard"
                        >
                            View in PostHog
                        </OSButton>
                        <OSButton variant="secondary" size="md" asLink to="/docs/mcp-analytics/start-here">
                            Read the docs
                        </OSButton>
                    </div>
                </div>
            ),
        },
    ],
    answersDescription: 'Understand how agents actually use your MCP server',
    questions: [
        {
            question: 'Which tools is each client calling, and how often?',
            url: '/docs/mcp-analytics/queries#top-tools-per-server',
        },
        {
            question: "What's the agent trying to do?",
            url: '/docs/mcp-analytics/intent',
        },
        {
            question: 'Which tools are advertised but never called?',
            url: '/docs/mcp-analytics/queries#advertised-tools-that-never-get-called',
        },
        {
            question: "What's a tool's error rate and p95 latency?",
            url: '/docs/mcp-analytics/queries#error-rate-per-tool',
        },
        {
            question: "What did agents ask for that you don't offer?",
            url: '/docs/mcp-analytics/missing-capability',
        },
        {
            question: 'How does a single session unfold?',
            url: '/docs/mcp-analytics/conversation-id',
        },
    ],
    pairsWith: [
        {
            slug: 'product-analytics',
            description: 'Build trends and funnels over MCP events without leaving PostHog.',
        },
        {
            slug: 'error-tracking',
            description: 'Failed tool calls emit $exception events, so broken tools show up as issues.',
        },
        {
            slug: 'dashboards',
            description: 'Pin tool-call volume, error rate, latency, and intent samples to a dashboard.',
        },
        {
            slug: 'data-warehouse',
            description: 'Query raw MCP events with HogQL in the SQL editor when you need more detail.',
        },
    ],
    presenterNotes: {
        overview:
            'MCP analytics is alpha (<code>@posthog/mcp</code> on npm). Lead with the one-line wrap and "it\'s all just PostHog events." No new tooling to learn.',
    },
}

export default mcpAnalytics
