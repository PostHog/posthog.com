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
} from '@posthog/icons'
import CodeBlock from 'components/Home/CodeBlock'
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
                    The Support helpdesk in PostHog is your home base. Open a ticket and the customer's session replays,
                    recent events, exceptions, and previous tickets sit right next to the conversation – so you can see
                    what broke instead of asking someone to describe it from memory.
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
                                    'Leave internal context for teammates. Customers never see them, and they don’t count toward unread messages.',
                            },
                            {
                                label: 'Assign, tag, and snooze',
                                description:
                                    'Route tickets to a person or role, categorize with free-form tags, and snooze anything waiting on someone else.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'slack',
        label: 'Slack',
        icon: <IconAtSign className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-red',
        layout: 'stack',
        heading: 'Triage without leaving Slack',
        description: (
            <>
                <p>
                    Connect Slack to turn messages, mentions, or an emoji reaction into tickets – handy for shared
                    customer channels where bug reports arrive disguised as small talk. Replies post back to the
                    original thread.
                </p>
                <p>
                    You can also tag <code>@PostHog</code> in any thread to ask about your support data, like how ticket
                    volume correlates with other metrics, and review self-driving reports built from your tickets.
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
                    The PostHog MCP includes tools for listing, reading, replying to, and updating tickets – so your
                    agent can pull a ticket's context while you're fixing the bug it describes, then reply to the
                    customer when the fix ships.
                </p>
                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={[
                            {
                                label: 'Investigate with context',
                                description:
                                    'Pull the ticket, its session replay, and related errors into your agent’s context before touching code.',
                            },
                            {
                                label: 'Close the loop',
                                description:
                                    'Reply to the customer and update the ticket status without switching windows.',
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
                    you the same backend – tickets, messages, unread counts, delivery status – so you can build a fully
                    custom support experience into your product.
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

export const topFeatures: CarouselSlide[] = [
    {
        slug: 'channels',
        label: 'Every channel',
        icon: <IconChat className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'One helpdesk, four ways in',
        description: (
            <>
                <p>
                    Tickets reach you through four channels, and every one syncs both ways – you answer from a single
                    place, and the reply lands wherever the conversation started.
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
                                    'Forward your support@ mail in, and replies thread back to the customer’s inbox.',
                            },
                            {
                                label: 'Slack',
                                description:
                                    'Turn messages, mentions, or an emoji reaction in shared channels into tickets.',
                            },
                            {
                                label: 'GitHub',
                                description:
                                    'Issues in monitored repos become tickets, and replies post back as comments.',
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
                                description: 'Watch the customer’s session replay from right before they wrote in.',
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
        slug: 'workflows',
        label: 'Workflows',
        icon: <IconBolt className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Automate the busywork',
        description: (
            <>
                <p>
                    Support plugs straight into Workflows, so every ticket event – a new ticket, a reply from you or the
                    customer, a status or assignee change – can trigger the full Workflows toolkit. Update the ticket
                    itself, or reach beyond it: post to Slack, fire a webhook, run anything Workflows can run. Rules you
                    control – no autonomous AI deciding your SLA policy at 3am.
                </p>
                <div className="@container">
                    <LabeledList
                        columns={[1, 2]}
                        items={[
                            {
                                label: 'Set SLAs',
                                description:
                                    'Based on channel or priority, then filter tickets by on track, at risk, or breached.',
                            },
                            {
                                label: 'Auto-assign',
                                description: 'Route new tickets to a role or by customer email domain.',
                            },
                            {
                                label: 'Tag automatically',
                                description: 'Categorize tickets as they arrive so views stay useful.',
                            },
                            {
                                label: 'Reopen on reply',
                                description: 'A resolved ticket reopens itself when the customer responds.',
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
                    Support isn't just a pile of tickets – it's a signal source. AI scouts pick up recurring issues
                    across your tickets and group them with related errors and replays into Self-driving reports. When
                    there's a code fix, you get a draft pull request to review. Nothing merges without a human.
                </p>
                <p>
                    Answering customers happens here, in Support. Reviewing and merging fixes happens in the
                    Self-driving inbox – fix the cause once, instead of answering the same ticket every week.
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
        label: 'Zendesk import',
        icon: <IconDownload className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-red',
        layout: 'stack',
        heading: 'Bring your history with you',
        description: (
            <>
                <p>
                    Migrating shouldn't mean starting from an empty helpdesk. The Zendesk import (beta) brings over your
                    full message threads (including internal notes), customer names and emails, tags, statuses,
                    priorities, attachments, and original timestamps.
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
