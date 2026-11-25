import React from 'react'
import {
    IconAtSign,
    IconBolt,
    IconChat,
    IconCode,
    IconDownload,
    IconEye,
    IconLaptop,
    IconMagic,
    IconPullRequest,
    IconSparkles,
} from '@posthog/icons'
import CodeBlock from 'components/Home/CodeBlock'
import Link from 'components/Link'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import PlatformInstall from 'components/PlatformInstall'

export const applications: CarouselSlide[] = [
    {
        slug: 'helpdesk',
        label: 'Helpdesk',
        icon: <IconLaptop className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Work tickets with the whole story in view',
        description: (
            <>
                <p>
                    Open a ticket and the customer's session replays, recent events, exceptions, and previous tickets
                    sit next to the conversation. You see what broke instead of asking someone to describe it from
                    memory.
                </p>
                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={[
                            {
                                label: 'Filter and save views',
                                description:
                                    'Filter by status, priority, channel, SLA state, tags, or assignee, then save the combinations you use daily.',
                            },
                            {
                                label: 'Reply and update in one step',
                                description:
                                    'Send a reply and set the ticket to pending, on hold, or resolved with one click.',
                            },
                            {
                                label: 'Private notes',
                                description:
                                    "Leave internal context for teammates. Customers never see them, and they don't count toward unread messages.",
                            },
                            {
                                label: 'Assign, tag, and snooze',
                                description:
                                    'Route tickets to a person or role, categorize with free-form tags, and snooze anything waiting on someone else.',
                            },
                            {
                                label: 'AI investigation (beta)',
                                description:
                                    "Turn it on and the AI agent reads the ticket's events, errors, replays, and logs, then leaves what it found as a private note.",
                            },
                        ]}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'editor',
        label: 'Editor / MCP',
        icon: <IconMagic className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Manage tickets from your editor',
        description: (
            <>
                <p>
                    The PostHog MCP has tools to list, read, reply to, and update tickets. Your agent pulls a ticket's
                    context while you fix the bug it describes, then replies to the customer when the fix ships.
                </p>
                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={[
                            {
                                label: 'Investigate with context',
                                description:
                                    "Pull the ticket, its session replay, and related errors into your agent's context before touching code.",
                            },
                            {
                                label: 'Close the loop',
                                description:
                                    'Reply to the customer and update the ticket status without switching windows.',
                            },
                            {
                                label: 'Describe a workflow, get a draft',
                                description:
                                    'Tell PostHog AI or Claude what rule you want, and it drafts the workflow for you to review. Our support lead builds most of our support workflows this way.',
                            },
                            {
                                label: 'Works anywhere MCP does',
                                description:
                                    "Cursor, Claude Code, PostHog Code, VS Code, or any MCP-compatible agent that has 'Code' in the title.",
                            },
                        ]}
                    />
                    <PlatformInstall />
                </div>
            </>
        ),
    },
    {
        slug: 'slack',
        label: 'Slack & Teams',
        icon: <IconAtSign className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-red',
        layout: 'stack',
        heading: 'Triage without leaving Slack',
        description: (
            <>
                <p>
                    Add the SupportHog bot to Slack to turn messages, mentions, or an emoji reaction into tickets. This
                    works well in shared customer channels, where bug reports arrive disguised as small talk. Replies
                    post back to the original thread. Microsoft Teams works the same way (beta), with mentions instead
                    of emoji.
                </p>
                <p>
                    PostHog runs support this way for customers who have a shared channel with us. You can also tag{' '}
                    <code>@PostHog</code> in any thread to ask about your support data, like how ticket volume
                    correlates with other metrics, and review self-driving reports built from your tickets.
                </p>
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/slack_light_15ad69ec86.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/slack_dark_fc660ed74e.png',
            alt: 'The PostHog Slack app answering a question in a thread',
        },
    },
    {
        slug: 'api',
        label: 'API',
        icon: <IconCode className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'stack',
        heading: 'Build your own support UI',
        description: (
            <>
                <p>
                    Don't like our widget? Rude, but fine. The <code>posthog.conversations</code> JavaScript API gives
                    you the same backend (tickets, messages, unread counts, delivery status), so you can build your own
                    support UI into your product.
                </p>
                <CodeBlock
                    code={`// Send a message (creates a ticket if none exists)
const response = await posthog.conversations.sendMessage('Hello, I need help!')

// Fetch the conversation
const { messages } = await posthog.conversations.getMessages(response.ticket_id)`}
                    language="js"
                    hideNumbers={undefined}
                    lineNumberStart={undefined}
                    tooltips={undefined}
                />
            </>
        ),
    },
]

export const keyFeatures: CarouselSlide[] = [
    {
        slug: 'channels',
        label: 'Every channel',
        icon: <IconChat className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'One helpdesk, six ways in',
        description: (
            <>
                <p>
                    Every channel syncs both ways. You answer from one place, and the reply lands where the conversation
                    started.
                </p>
                <div className="@container">
                    <LabeledList
                        columns={[1, 2]}
                        items={[
                            {
                                label: 'Widget',
                                description:
                                    'An in-app chat button that auto-attaches events, session replay, URL, and identity to every ticket.',
                            },
                            {
                                label: 'Email',
                                description:
                                    "Forward your support@ mail in, and replies thread back to the customer's inbox.",
                            },
                            {
                                label: 'Slack',
                                description:
                                    'Turn messages, mentions, or an emoji reaction in shared channels into tickets.',
                            },
                            {
                                label: 'Microsoft Teams (beta)',
                                description: 'Mention SupportHog, or mark a channel as a support channel.',
                            },
                            {
                                label: 'GitHub',
                                description:
                                    'Issues in monitored repos become tickets, and replies post back as comments.',
                            },
                            {
                                label: 'API',
                                description: 'Send tickets from your own contact form or support UI.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'context',
        label: 'Context attached',
        icon: <IconEye className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Every ticket arrives with receipts',
        description: (
            <>
                <p>
                    Because Support is part of PostHog, tickets from your app arrive with the context already attached.
                    No "can you send a screenshot?", no "what browser are you on?", no interpretive dance of
                    reproduction steps.
                </p>
                <div className="@container">
                    <LabeledList
                        columns={[1, 2]}
                        items={[
                            {
                                label: 'Session recording',
                                description: "Watch the customer's session replay from right before they wrote in.",
                            },
                            {
                                label: 'Recent events',
                                description: 'The events from when the ticket was created, in order.',
                            },
                            {
                                label: 'Exceptions',
                                description: 'Any errors from their session, linked to error tracking.',
                            },
                            {
                                label: 'Previous tickets',
                                description: 'Past conversations with the same person, so nobody repeats themselves.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'ai-agent',
        label: 'AI agent (beta)',
        icon: <IconSparkles className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'stack',
        heading: 'AI does the context. People do the conversation.',
        description: (
            <>
                <p>
                    Turn on the AI agent and it drafts a reply to each new ticket, based on your Business knowledge
                    (your docs, links, and notes). Drafts land as private notes, so a person on your team decides what
                    the customer reads. It's free while in beta. Ask us to turn it on for your project.
                </p>
                <div className="@container">
                    <LabeledList
                        columns={[1, 2]}
                        items={[
                            {
                                label: 'Investigates first',
                                description:
                                    "With read-only access, it can check the customer's events, errors, replays, and logs before it writes.",
                            },
                            {
                                label: 'Private where it matters',
                                description:
                                    'Diagnostic and billing tickets always get a private note, never an automatic reply.',
                            },
                            {
                                label: 'Auto-replies you choose',
                                description: 'You can let it answer how-to questions directly, one channel at a time.',
                            },
                            {
                                label: 'Learns from your team (beta)',
                                description:
                                    "It can add reusable answers from your team's replies on resolved tickets. You review and edit everything it learns.",
                            },
                        ]}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'workflows',
        label: 'Workflows',
        icon: <IconBolt className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Build your support process in Workflows',
        description: (
            <>
                <p>
                    Every ticket event can start a workflow: a new ticket, a reply from you or the customer, a change of
                    status or assignee. A workflow can update the ticket, post to Slack, call a webhook, or run an AI
                    task. Rules you control. No autonomous AI deciding your SLA policy at 3am.
                </p>
                <p>
                    PostHog's own support team runs on 27 of these workflows. Start from the{' '}
                    <Link
                        to="https://app.posthog.com/workflows/templates?tagFilter=support"
                        className="font-semibold underline"
                        externalNoIcon
                    >
                        support templates
                    </Link>{' '}
                    they built.
                </p>
                <div className="@container">
                    <LabeledList
                        columns={[1, 2]}
                        items={[
                            {
                                label: 'Set SLAs',
                                description:
                                    "Based on channel, priority, or the customer's plan, then filter tickets by on track, at risk, or breached.",
                            },
                            {
                                label: 'Triage with AI',
                                description: 'An AI task step can set the team, tags, and priority on each new ticket.',
                            },
                            {
                                label: 'Auto-assign',
                                description: 'Route new tickets to a role or by customer email domain.',
                            },
                            {
                                label: 'Reopen on reply',
                                description: 'A resolved ticket reopens itself when the customer responds.',
                            },
                            {
                                label: 'Tag automatically',
                                description: 'Categorize tickets as they arrive so views stay useful.',
                            },
                            {
                                label: 'Notify anywhere',
                                description:
                                    'Ping a Slack channel about high-priority tickets, or call a webhook to loop in other tools.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'self-driving',
        label: 'Feeds Self-driving',
        icon: <IconPullRequest className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'stack',
        heading: 'Tickets become pull requests',
        description: (
            <>
                <p>
                    AI scouts pick up recurring issues across your tickets and group them with related errors and
                    replays into Self-driving reports. When there's a code fix, you get a draft pull request to review.
                    Nothing merges without a human.
                </p>
                <p>
                    You answer customers in Support. You review and merge fixes in the Self-driving inbox, so you fix
                    the cause once instead of answering the same ticket every week.
                </p>
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/inbox_light_9aa9eed335.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/inbox_dark_216a157762.png',
            alt: 'The Self-driving inbox with reports generated from support tickets',
        },
    },
    {
        slug: 'import',
        label: 'Imports',
        icon: <IconDownload className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-red',
        layout: 'stack',
        heading: 'Bring your history with you',
        description: (
            <>
                <p>
                    Moving helpdesks shouldn't mean starting from an empty inbox. Import your old tickets from Zendesk,
                    Intercom, or Pylon (all in beta). The Zendesk import brings over full message threads (including
                    internal notes), customer names and emails, tags, statuses, priorities, attachments, and original
                    timestamps.
                </p>
                <p>Your first day on PostHog Support starts with all the context of your last day on Zendesk.</p>
            </>
        ),
        image: {
            src: '/images/products/support/ticket-sidebar.png',
            alt: 'A ticket imported from Zendesk in PostHog Support, with its original Zendesk ID, channel, status, priority, assignee, and tags intact',
            maxWidth: 'max-w-md',
        },
    },
]
