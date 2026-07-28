import React from 'react'
import {
    IconChat,
    IconConfetti,
    IconCursorClick,
    IconEye,
    IconGraph,
    IconInfo,
    IconList,
    IconMagic,
    IconMap,
    IconNewspaper,
    IconRocket,
    IconShieldPeople,
    IconSparkles,
    IconSupport,
} from '@posthog/icons'
import { applications, topFeatures } from './support/slides'

export const support = {
    Icon: IconSupport,
    name: 'Support',
    handle: 'support',
    slug: 'support',
    teamSlug: 'conversations',
    color: 'blue',
    colorSecondary: 'blue',
    category: 'communication',
    description: 'Built-in customer support with chat widget and unified helpdesk.',
    shortDescription: 'One helpdesk for every customer conversation',
    seo: {
        title: 'Support – Customer support with product context built in | PostHog',
        description:
            'PostHog Support centralizes tickets from your app, email, Slack, and GitHub into a single helpdesk – with session replays, events, and errors attached to each one.',
    },
    /**
     * Sections rendered on the Product surface (`/support`). Each entry resolves
     * to a section template via `templateRegistry[item.template ?? item.slug]`.
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
            slug: 'use-cases',
            name: 'Who is it for?',
            hideFromNav: true,
            group: 'divided',
            icon: <IconMagic className="size-4" />,
        },
        {
            slug: 'applications',
            name: 'How do I use it?',
            group: 'divided',
            icon: <IconCursorClick className="size-4" />,
            props: { slides: applications },
        },
        {
            slug: 'top-features',
            name: 'Top features',
            group: 'divided',
            icon: <IconSparkles className="size-4" />,
            props: { slides: topFeatures },
        },
        {
            slug: 'ask-anything',
            name: 'AI prompts',
            group: 'divided',
            icon: <IconChat className="size-4" />,
        },
        { slug: 'pairs-with', name: 'Pairs with...', hideFromNav: true, icon: <IconConfetti className="size-4" /> },
        {
            slug: 'posthog-vs',
            name: 'PostHog vs...',
            template: 'comparison-summary',
            group: 'divided',
            icon: <IconList className="size-4" />,
        },
        {
            slug: 'feature-comparison',
            name: 'Feature comparison',
            group: 'divided',
            icon: <IconGraph className="size-4" />,
        },
        { slug: 'roadmap', name: 'Roadmap', group: 'divided', icon: <IconMap className="size-4" /> },
        { slug: 'changelog', name: 'Changelog', group: 'divided', icon: <IconNewspaper className="size-4" /> },
        { slug: 'team', name: 'Team', group: 'divided', icon: <IconShieldPeople className="size-4" /> },
        { slug: 'getting-started', name: 'Get started', group: 'divided', icon: <IconRocket className="size-4" /> },
    ],
    overview: {
        title: 'One place for every user conversation',
        description:
            'Support is one of the tools that makes your product self-driving: a helpdesk where you can solve tickets that arrive with full user context. Agents can turn these tickets into PRs, proposing fixes and improvements for your review.',
        eli5: "Support is a helpdesk for solving customer tickets, which arrive from an in-app chat widget, email, Slack, or GitHub. Tickets arrive with full context from other PostHog tools, like session replays, recent events, and errors attached. Recurring problems get picked up by agents as signal, so PostHog can draft pull requests to ship improvements.",
        textColor: 'text-black', // tw
    },
    hogs: {
        mobileHog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_phone_638d7d1ae4.png',
        },
    },
    useCases: {
        intro: 'Support is used across teams depending on your role.',
        rows: [
            [
                'Product engineers',
                'Respond to escalated tickets with the session replay and error trace already attached',
            ],
            ['Support', 'A daily driver for ticket response, with all the customer context you need in PostHog'],
            ['PMs & designers', 'Get reports of where users hit friction, pulled through the MCP'],
            ['Growth', 'Investigate how support tickets correlate with other metrics, right from Slack'],
            ['QA', 'Turn GitHub issues into tickets to validate user frustration'],
        ],
    },
    ai: {
        intro: 'Ask PostHog AI to triage, investigate, and answer tickets. Works in PostHog AI (in-app chat), PostHog Desktop, Slack, and your product editor (using the MCP).',
        mcpToolsFeature: 'conversations',
        groups: [
            {
                title: 'Triage',
                tool: 'conversations-tickets-list',
                prompts: [
                    'Show me all new tickets from the last 24 hours',
                    'List high-priority tickets that are at risk of breaching SLA',
                    'Which open tickets mention the checkout flow?',
                    'Which tickets are assigned to me and still unanswered?',
                ],
            },
            {
                title: 'Investigate',
                tool: 'conversations-tickets-retrieve',
                prompts: [
                    'Summarize what the customer on ticket #482 did before they wrote in',
                    'Find the session replay attached to this ticket and tell me where it went wrong',
                    'Are there errors in this customer’s session that match an existing issue?',
                    'Have we heard from anyone else at this customer’s company recently?',
                ],
            },
            {
                title: 'Respond',
                tool: 'conversations-tickets-reply-create',
                prompts: [
                    'Draft a reply to ticket #123 explaining the workaround',
                    'Reply to this ticket with a link to the relevant docs and mark it resolved',
                ],
            },
            {
                title: 'Analyze',
                prompts: [
                    'Which feature generates the most tickets?',
                    'How does ticket volume this week compare to last week?',
                    'Do customers who file tickets retain better or worse than those who don’t?',
                ],
            },
        ],
    },
    comparison: {
        summary: {
            them: [
                {
                    title: 'You need voice, phone, or call center support channels',
                },
                {
                    title: 'You want a mature ecosystem of helpdesk add-ons, marketplaces, and certified consultants',
                },
            ],
            us: [
                {
                    title: 'Tickets arrive with session replays, events, and errors attached – no reproduction steps required',
                },
                {
                    title: 'Support data lives next to your product analytics',
                    subtitle: 'Correlate tickets with retention, funnels, and flags',
                },
                {
                    title: 'Recurring issues become Self-driving reports and draft PRs',
                },
                {
                    title: 'Core features are free',
                    subtitle: 'No per-seat pricing',
                },
            ],
        },
        companies: [
            {
                name: 'Zendesk',
                key: 'zendesk',
            },
            {
                name: 'Intercom',
                key: 'intercom',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        rows: ['support'],
    },
    pairsWith: [
        {
            slug: 'product-analytics',
            description: 'Investigate the numbers behind each ticket, including how they correlate with retention',
        },
        {
            slug: 'session-replay',
            description: 'Watch exactly what a customer did before they wrote in – no reproduction steps needed',
        },
        {
            slug: 'error-tracking',
            description: 'See the full stack trace behind every error to find the root cause of each ticket',
        },
    ],
}
