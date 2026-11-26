import React from 'react'
import {
    IconChat,
    IconConfetti,
    IconCursorClick,
    IconEye,
    IconGraph,
    IconInfo,
    IconMagic,
    IconRocket,
    IconSparkles,
    IconSupport,
} from '@posthog/icons'
import Link from 'components/Link'
import TeamMember from 'components/TeamMember'
import { Tweet } from 'components/Tweet'
import { SectionHeading } from 'components/Products/ReaderViewProduct/helpers'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct/types'
import { applications, keyFeatures } from './support/slides'
import { PRODUCT_COLORS } from 'constants/productColors'
import HoggieImage from 'components/HoggieImage'
import hedgehogLifeguardPng from 'hoggies/lifeguard.png'
import hedgehogFingerGunsPng from 'hoggies/finger-guns.png'

const SupportTweet = ({ id }: SectionComponentProps) => (
    <section id={id} className="scroll-mt-20 not-prose">
        <SectionHeading>We didn't pay him to say this (honest)</SectionHeading>
        {/* Same layout as the "Who is it for?" table: the tweet takes the full column and the hog fills a fixed
            column on the right, sized to the tweet's height. */}
        <div className="grid grid-cols-1 gap-6 @2xl/reader-content:grid-cols-[minmax(0,1fr)_10rem] @5xl/reader-content:grid-cols-[minmax(0,1fr)_18rem] @5xl/reader-content:gap-8 items-stretch">
            <Tweet
                name="Mathew Chan"
                handle="itsmattchan"
                avatar="https://pbs.twimg.com/profile_images/1905465377280151552/VmDQ3bmf_400x400.jpg"
                avatarAlt="Mathew Chan"
                url="https://x.com/itsmattchan/status/2107843274643788213"
                alertMessage="Go say it on X – this is just a screenshot in HTML form."
                className="!mb-0 !max-w-none"
            >
                Just had my first holy shit moment with @posthog - I had a feedback form wired up to their support
                ticket feature, and because I had "self-driving" turned on and wired up to my codebase, posthog read the
                support ticket, identified the fix, then opened a PR. This feels like the future. Well done lads, well
                done. 👏
            </Tweet>
            <HoggieImage
                src={hedgehogFingerGunsPng}
                mirror
                alt="A hedgehog doing finger guns"
                className="hidden @2xl/reader-content:block relative"
                imgClassName="absolute inset-0 size-full object-contain"
            />
        </div>
    </section>
)

export const support = {
    Icon: IconSupport,
    name: 'Support',
    handle: 'support',
    slug: 'support',
    teamSlug: 'conversations',
    color: PRODUCT_COLORS.support,
    colorSecondary: 'blue',
    category: 'communication',
    description: 'Helpdesk with session replays, events, and errors attached to every ticket.',
    shortDescription: 'Helpdesk with product context on every ticket',
    seo: {
        title: 'Support – Customer support with product context built in | PostHog',
        description:
            "PostHog Support is a free helpdesk for tickets from your app, email, Slack, Microsoft Teams, and GitHub. Each ticket opens with the customer's session replay, events, and errors.",
    },
    /**
     * Sections rendered on the Product surface (`/support`). Each entry resolves
     * to a section template via `templateRegistry[item.template ?? item.slug]`.
     */
    productMenu: [
        {
            slug: 'overview',
            name: 'Overview',
            icon: <IconEye className="size-4" />,
        },
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
            slug: 'posthog-on-posthog',
            name: 'How we use it',
            group: 'divided',
            icon: <IconSupport className="size-4" />,
        },
        {
            slug: 'applications',
            name: 'How do I use it?',
            group: 'divided',
            icon: <IconCursorClick className="size-4" />,
            props: { slides: applications },
        },
        {
            slug: 'key-features',
            name: 'Key features',
            group: 'divided',
            icon: <IconSparkles className="size-4" />,
            props: { slides: keyFeatures },
        },
        {
            slug: 'social-proof',
            name: "We didn't pay him to say this (honest)",
            hideFromNav: true,
            group: 'divided',
            icon: <IconChat className="size-4" />,
            component: SupportTweet,
        },
        {
            slug: 'ask-anything',
            name: 'AI prompts',
            group: 'divided',
            icon: <IconChat className="size-4" />,
        },
        { slug: 'pairs-with', name: 'Pairs with...', hideFromNav: true, icon: <IconConfetti className="size-4" /> },
        {
            slug: 'feature-comparison',
            name: 'Feature comparison',
            group: 'divided',
            icon: <IconGraph className="size-4" />,
        },
        { slug: 'getting-started', name: 'Get started', group: 'divided', icon: <IconRocket className="size-4" /> },
    ],
    overview: {
        title: 'Support tickets that arrive with the bug attached',
        description: '"Which tickets this week came from users who hit an error?"',
        eli5: "Support is a helpdesk inside PostHog for tickets from your app, email, Slack, Microsoft Teams, and GitHub. Each ticket opens with the customer's replay, events, and errors, and PostHog AI can turn recurring problems into a draft pull request.",
        textColor: 'text-black', // tw
    },
    hogs: {
        mobileHog: {
            src: hedgehogLifeguardPng,
            crop: [127, 60, 745, 911],
            alt: 'A lifeguard hedgehog with binoculars and a life ring',
        },
    },
    useCases: {
        intro: 'For early teams leaving a shared inbox, and engineers who debug tickets.',
        rows: [
            [
                'Founders and early engineers',
                'Swap the shared inbox and Jira board for a free helpdesk. If you already run posthog-js, the chat widget is one setting away. No contract and no per-seat price.',
            ],
            [
                'Engineers on support rotation',
                "Open the ticket in PostHog, watch the replay, and read the stack trace that it links to directly. Then fix the bug and reply to the customer through the MCP. That's how our PostHog engineers do support.",
            ],
            [
                'Support engineers',
                'Work tickets from saved views with SLAs, assignment, and macros. Check the errors and the replay yourself before you escalate.',
            ],
            [
                'Support leads',
                'Build SLAs, routing, and CSAT surveys in Workflows. Ticket events sit next to your product analytics, so you can report on both together.',
            ],
            [
                'Product managers',
                'Read Self-driving reports that group recurring tickets with the errors and replays behind them.',
            ],
        ],
    },
    postHogOnPostHog: {
        title: 'How PostHog uses Support (and Workflows)',
        description: (
            <>
                We moved our support team off Zendesk in July 2026. Support had no SLAs, routing, or CSAT surveys then,
                so the team built them in Workflows. We now run 27 support workflows.{' '}
                <Link to="/blog/support-workflows" className="font-semibold underline" state={{ newWindow: true }}>
                    Read how we built them
                </Link>
                .
            </>
        ),
        benefits: [
            {
                title: 'AI triage on every ticket',
                description: (
                    <>
                        Our support lead <TeamMember name="Abigail Richardson" photo /> built a workflow that runs a
                        read-only PostHog AI task on each new ticket. The task sets the owning team, the subject expert,
                        and the priority.
                    </>
                ),
            },
            {
                title: 'Routing with no upkeep',
                description:
                    "A destination reads the team tag and posts the ticket to that team's Slack channel. When a team is renamed or split, nothing needs an update.",
            },
            {
                title: 'SLAs set by plan',
                description:
                    "Workflows read the customer's plan and churn risk from Customer Analytics, then set first response, next response, and update deadlines. Team channels get a Slack warning 2 hours and 30 minutes before a breach.",
            },
            {
                title: 'Incidents in one place',
                description: (
                    <>
                        <TeamMember name="Chris Shine" photo /> built a workflow that tags open tickets about a new
                        incident. New tickets about the same incident get the tag too.
                    </>
                ),
            },
            {
                title: 'Personal SLA alerts',
                description: (
                    <>
                        <TeamMember name="Christiaan Hendriksen" photo /> gets a Slack warning 15 minutes before the SLA
                        deadline on each open ticket assigned to him.
                    </>
                ),
            },
            {
                title: 'Follow a ticket',
                description: (
                    <>
                        <TeamMember name="Christian Rafferty" photo /> and <TeamMember name="Luke Belton" photo /> built
                        workflows that email you when someone replies to a ticket you follow.
                    </>
                ),
            },
        ],
    },
    ai: {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog_ai_hogs_d4c45b4550.png',
        imageAlt: 'A support team of hedgehogs at their desks',
        intro: 'Ask PostHog AI to triage tickets, investigate them, and draft replies. It reads the ticket, the replay, and the errors.',
        mcpFeatures: ['conversations'],
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
                    "Are there errors in this customer's session that match an existing issue?",
                    'Check the logs from the 10 minutes before this ticket was created',
                    "Have we heard from anyone else at this customer's company recently?",
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
                    'Which tickets this week came from users who hit an error?',
                    'How does ticket volume this week compare to last week?',
                    "Do customers who file tickets retain better or worse than those who don't?",
                ],
            },
            {
                title: 'Automate',
                prompts: [
                    'Build a workflow that warns #support 2 hours before a ticket breaches its SLA',
                    'Tag every new ticket with the team that owns the feature it mentions',
                    'Email the customer a CSAT survey the day after their ticket is resolved',
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
                {
                    title: 'You need a public help center for customers',
                },
            ],
            us: [
                {
                    title: 'Tickets arrive with session replays, events, and errors attached',
                    subtitle: 'No reproduction steps required',
                },
                {
                    title: 'Support data lives next to your product analytics',
                    subtitle: 'Correlate tickets with retention, funnels, and flags',
                },
                {
                    title: 'Support knowledge lives in PostHog too',
                    subtitle: 'Business knowledge drafts answers and learns from resolved tickets',
                },
                {
                    title: 'Support and engineering work in the same tool',
                    subtitle: 'Escalate a ticket without copying its context into Jira',
                },
                {
                    title: 'Recurring issues become Self-driving reports and draft PRs',
                },
                {
                    title: 'Free core, with no contract and no per-seat price',
                    subtitle: 'Widget, inbox, every channel, workflows, and imports',
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
            slug: 'session-replay',
            description: 'Watch what the customer did before they wrote in, with no reproduction steps',
        },
        {
            slug: 'error-tracking',
            description: 'Open the stack trace behind a ticket and see how many other users hit the same error',
        },
        {
            slug: 'workflows',
            description: 'Build SLAs, routing, and CSAT surveys on ticket events. Our support team runs on 27 of them.',
        },
    ],
}
