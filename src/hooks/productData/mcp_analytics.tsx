import React from 'react'
import {
    IconChat,
    IconCode,
    IconConfetti,
    IconCursorClick,
    IconEye,
    IconInfo,
    IconMagic,
    IconMessage,
    IconPlug,
    IconRocket,
    IconSparkles,
} from '@posthog/icons'
import Link from 'components/Link'
import { features } from './mcp_analytics/features'
import { applications, topFeatures } from './mcp_analytics/slides'
import MCPAnalyticsInstall from './mcp_analytics/install'
import { ApplicationsWithHowItWorks, LeaderboardSection } from './mcp_analytics/sections'
import { getTool } from '../../data/tools'

// MCP Analytics is a beta product (@posthog/mcp on npm) with a dedicated scene in the app
// gated behind the `mcp-analytics` early access feature. Copy comes from the reviewed copy draft,
// checked against contents/docs/mcp-analytics/. See src/components/EarlyAccessOptIn/README.md for how
// the opt-in links to the early access feature in the app (identity isn't shared with the website).

export const mcpAnalytics = {
    ...getTool('mcp_analytics'),
    Icon: IconPlug,
    type: 'mcp_analytics',
    teamSlug: 'mcp-analytics',
    // The `mcp-analytics` tag does not exist in the forum yet. Until someone creates it, Questions? shows
    // no recent discussions and the forum link opens an empty feed.
    forumTag: 'mcp-analytics',
    color: 'blue',
    colorSecondary: 'sky-blue',
    wizardSupport: true,
    wizardCommand: 'mcp-analytics',
    seo: {
        title: 'MCP Analytics – See everything agents do on your MCP server',
        description:
            'Every tool call, agent intent, failure, and missing capability from your MCP server, captured as PostHog events. Wrap your server once and start learning what agents actually need.',
    },
    /**
     * Sections rendered on the Product surface (`/mcp-analytics`), in page order. Each entry resolves to a
     * section template via `templateRegistry[item.template ?? item.slug]`, or to `component` when set.
     * Page-only sections live in ./mcp_analytics/sections.tsx.
     */
    productMenu: [
        { slug: 'overview', name: 'Overview', icon: <IconEye className="size-4" /> },
        {
            slug: 'eli5',
            name: 'What does it do?',
            hideFromNav: true,
            group: 'divided',
            icon: <IconInfo className="size-4" />,
        },
        {
            slug: 'top-features',
            name: 'Top features',
            group: 'divided',
            icon: <IconSparkles className="size-4" />,
            props: { slides: topFeatures },
        },
        {
            slug: 'applications',
            name: 'How do I use it?',
            group: 'divided',
            icon: <IconCursorClick className="size-4" />,
            component: ApplicationsWithHowItWorks,
            props: { slides: applications },
        },
        {
            slug: 'use-cases',
            name: 'Who is it for?',
            hideFromNav: true,
            group: 'divided',
            icon: <IconMagic className="size-4" />,
        },
        { slug: 'ask-anything', name: 'AI prompts', group: 'divided', icon: <IconChat className="size-4" /> },
        { slug: 'installation', name: 'Install', group: 'divided', icon: <IconCode className="size-4" /> },
        {
            slug: 'mcp-leaderboard',
            name: 'MCP leaderboard',
            hideFromNav: true,
            group: 'divided',
            component: LeaderboardSection,
        },
        { slug: 'community', name: 'Questions?', group: 'divided', icon: <IconMessage className="size-4" /> },
        { slug: 'pairs-with', name: 'Pairs with...', hideFromNav: true, icon: <IconConfetti className="size-4" /> },
        { slug: 'getting-started', name: 'Get started', group: 'divided', icon: <IconRocket className="size-4" /> },
    ],
    overview: {
        title: 'See everything agents do on your MCP server',
        description:
            'Product analytics for your MCP. Wrap your server once and see every tool call, failure and context of what agents were trying to do.',
        eli5: "Your MCP server is a product, and agents are its users. To improve it, you need to know which tools were called, what they sent and got back, how long it took, and whether it failed. Our SDK also asks the agent why it is calling each tool, so you'll know the user's end goal too.",
        textColor: 'text-white',
        layout: 'stacked',
    },
    useCases: {
        intro: 'For teams whose MCP is becoming an important part of their product.',
        rows: [
            [
                'MCP server builders',
                'Find and fix broken or slow tools. Get error rates, and p95 latency by tool, without building your own MCP analytics.',
            ],
            ['MCP server observers', 'Check the health of the server and how many people use it.'],
            ['Product managers', 'Learn who uses the server and what those users try to do.'],
            ['Engineers building MCP tools', 'Find the slow and failing tools and send a coding agent to fix them.'],
            ['API builders', 'Identify and fix endpoints causing high error rates in tool calls.'],
        ],
    },
    features,
    // The platform list is the same one /docs/mcp-analytics/installation uses.
    installation: {
        title: 'Install',
        headline: 'Install',
        description:
            "Add the MCP Analytics SDK to your server and wrap it once. The wizard sets up TypeScript and Python servers for you. If you'd rather one-shot it with your own coding agent, every install page has a Markdown version for agents.",
        productSlug: 'mcp-analytics',
        children: <MCPAnalyticsInstall />,
    },
    // Prompt groups follow the PostHog AI prompt analysis (Oct 2026). Tool names verified against
    // products/mcp_analytics/mcp/tools.yaml in PostHog/posthog.
    ai: {
        intro: 'Ask PostHog AI, or your agent through the PostHog MCP server. Start with the usual questions about usage and errors, then go deeper: exact error messages, release checks, clients, and the tools agents never call.',
        mcpFeatures: ['mcp_analytics'],
        hideSurfaces: true,
        // One example tool per use case for the MCP tools tab, instead of the full searchable list.
        featuredTools: [
            'query-mcp-tool-stats',
            'query-mcp-tool-failures',
            'query-mcp-harness-breakdown',
            'mcp-analytics-sessions-list',
            'query-mcp-tool-sample-intents',
            'query-mcp-missing-capabilities',
        ],
        toolsIntro: (
            <>
                See all MCP Analytics tools in the{' '}
                <Link to="/docs/mcp-analytics/surfaces/mcp" className="font-semibold underline">
                    docs
                </Link>
                .
            </>
        ),
        groups: [
            {
                title: 'Usage overview',
                tool: 'query-mcp-tool-stats',
                prompts: [
                    "Summarize how agents are using my MCP server: top tools, error rates, and what they're trying to do",
                    "Which of my MCP tools are slowest? Show p95 latency by tool, even for tools that don't fail",
                ],
            },
            {
                title: 'Clients',
                tool: 'query-mcp-harness-breakdown',
                prompts: [
                    'Which clients call my MCP server, like Claude Code, ChatGPT, or Cursor? Which ones fail the most?',
                ],
            },
            {
                title: 'Errors',
                tool: 'query-mcp-tool-failure-occurrences',
                prompts: [
                    'Which of my MCP tools are least reliable? Error rate and p95 by tool',
                    "Show me the exact error messages for search_docs's most common failure, and tell me what is causing them",
                ],
            },
            {
                title: 'Release checks',
                tool: 'query-mcp-tool-daily-stats',
                prompts: [
                    "Did yesterday's release make run_query better or worse? Compare calls, errors, and p95 latency before and after",
                ],
            },
            {
                title: 'Missing capabilities',
                tool: 'query-mcp-missing-capabilities',
                prompts: [
                    "What did agents ask my server for last month that my tools can't do? Group similar requests",
                ],
            },
            {
                title: 'Intent',
                tool: 'mcp-analytics-intent-clusters-retrieve',
                prompts: [
                    'What are agents actually trying to do across my MCP sessions? Group the intents into themes',
                ],
            },
            {
                title: 'Journeys',
                tool: 'query-mcp-tool-neighbors',
                prompts: ['Which tools do agents call right before and after create_issue?'],
            },
            {
                title: 'Tool descriptions',
                tool: 'query-mcp-tool-descriptions',
                prompts: ['Did changing the description of search_docs change its error rate?'],
            },
            {
                title: 'Accounts and models (SQL)',
                tool: 'execute-sql',
                prompts: [
                    'Which accounts used my MCP in the last 30 days, by plan type?',
                    'Which LLM models call my MCP server most?',
                    'Which tools do I list that agents never call?',
                ],
            },
        ],
    },
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
            'MCP Analytics is beta (<code>@posthog/mcp</code> on npm). Lead with the one-line wrap and "it\'s all just PostHog events." No new tooling to learn.',
    },
}

export default mcpAnalytics
