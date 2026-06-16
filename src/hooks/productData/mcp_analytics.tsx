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
            'Wrap your MCP server in one line. Every tool call, what the agent wanted, and every failure lands in PostHog as a normal event you can query, chart, and alert on.',
        textColor: 'text-white',
        layout: 'columns',
    },
    // TODO (asset step): capture the /mcp-analytics scene in the app and upload to Cloudinary,
    // then add screenshots.overview here and `images` on the feature cards below.
    // screenshots: {
    //     overview: {
    //         src: 'https://res.cloudinary.com/dmukukwp6/image/upload/<mcp_overview>.png',
    //         alt: 'MCP analytics dashboard',
    //         classes: '',
    //     },
    // },
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
                'Each <code>tools/call</code> becomes a <code>$mcp_tool_call</code> event with the parameters, response, duration, and error state. See which tools agents reach for and which they ignore.',
        },
        {
            title: 'Agent intent',
            icon: <IconThoughtBubble />,
            color: 'seagreen',
            headline: 'Agent intent',
            description:
                'The SDK injects a <code>context</code> argument and captures it as <code>$mcp_intent</code>, so you see the goal behind each call. Set <code>intentFallback</code> for agents that ignore it.',
        },
        {
            title: 'Advertised vs called',
            icon: <IconListTreeConnected />,
            color: 'purple',
            headline: 'Advertised vs called',
            description:
                'Every <code>tools/list</code> response is captured as <code>$mcp_tools_list</code>. Join it against tool calls to find the tools you advertise but agents never invoke.',
        },
        {
            title: 'Clients',
            icon: <IconPlug />,
            color: 'red',
            headline: 'Clients',
            description:
                "Every event carries the MCP client name and version, so you know whether it's Claude Desktop, Cursor, Codex, or your own server connecting.",
        },
        {
            title: 'Sessions',
            icon: <IconRewindPlay />,
            color: 'yellow',
            headline: 'Sessions',
            description:
                'A <code>$mcp_conversation_id</code> stitches multi-turn conversations together, so you can follow a single session across every tool call.',
        },
        {
            title: 'Capability gaps',
            icon: <IconSparkles />,
            color: 'orange',
            headline: 'Capability gaps',
            description:
                "Flip on <code>reportMissing</code> and agents can tell you what they wanted but you don't offer yet. Every ask is a <code>$mcp_missing_capability</code> event: a roadmap written by your users' agents.",
        },
        {
            title: 'See it in PostHog',
            handle: 'see_it_in_posthog',
            icon: <IconGraph />,
            color: 'blue',
            headline: "One wrapper call, then it's just PostHog",
            description:
                "Wrap your server with <code>instrument()</code> and every request emits a <code>$mcp_*</code> event. From there it's normal PostHog: insights, dashboards, alerts, SQL, and error tracking all work, no extra plumbing.",
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
        },
        {
            question: "What's the agent trying to do?",
        },
        {
            question: 'Which tools are advertised but never called?',
        },
        {
            question: "What's a tool's error rate and p95 latency?",
        },
        {
            question: "What did agents ask for that you don't offer?",
        },
        {
            question: 'How does a single session unfold?',
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
