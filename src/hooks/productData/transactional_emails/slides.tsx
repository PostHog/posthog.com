import React, { useState } from 'react'
import {
    IconBrowser,
    IconCode,
    IconDecisionTree,
    IconGraph,
    IconLaptop,
    IconMegaphone,
    IconSend,
    IconShieldLock,
} from '@posthog/icons'
import { CodeBlock } from 'components/CodeBlock'
import Link from 'components/Link'
import PlatformInstall from 'components/PlatformInstall'
import { InlineCode, LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'

/**
 * Copy on these slides is checked against contents/docs/workflows/transactional-emails/*.mdx.
 * Keep it in line with them when either changes.
 */
const slideStyle = {
    color: 'bg-light dark:bg-dark',
    activeText: 'text-primary',
}

const list = (items: { label: string; description: React.ReactNode }[]) => (
    <div className="@container">
        <LabeledList items={items} />
    </div>
)

const docsLink = (to: string, children: React.ReactNode) => (
    <Link to={to} className="font-bold underline" state={{ newWindow: true }}>
        {children}
    </Link>
)

const sendSnippets: { label: string; language: string; code: string }[] = [
    {
        label: 'Node.js',
        language: 'js',
        code: `const { data, error } = await posthog.emails.send({
    to: email,
    templateId: "<template_id>",
    templateData: { first_name: firstName, reset_link: resetLink },
    distinctId: userId,
    // A retry never sends this email twice
    idempotencyKey: \`password-reset-\${resetRequestId}\`,
})`,
    },
    {
        label: 'Python',
        language: 'python',
        code: `result = posthog.emails.send(
    to=email,
    template_id="<template_id>",
    template_data={"first_name": first_name, "reset_link": reset_link},
    distinct_id=user_id,
    # A retry never sends this email twice
    idempotency_key=f"password-reset-{reset_request_id}",
)`,
    },
    {
        label: 'cURL',
        language: 'bash',
        code: `curl -X POST "https://us.posthog.com/api/projects/@current/messaging/send/email/" \\
  -H "Authorization: Bearer $POSTHOG_PROJECT_SECRET_API_KEY" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: password-reset-8f14e45f" \\
  -d '{
    "template_id": "<template_id>",
    "to": "jane@example.com",
    "distinct_id": "user_123",
    "message_data": { "first_name": "Jane", "reset_link": "https://example.com/reset?token=abc123" }
  }'`,
    },
]

const SendCode = () => {
    const [current, setCurrent] = useState<{ label?: string; language: string; code: string }>(sendSnippets[0])
    return (
        <CodeBlock currentLanguage={current} onChange={setCurrent} selector="tabs" showAskAI={false}>
            {sendSnippets}
        </CodeBlock>
    )
}

export const applications: CarouselSlide[] = [
    {
        ...slideStyle,
        slug: 'in-your-code',
        label: 'In your code',
        icon: <IconCode className="size-5" />,
        progressBar: 'bg-teal',
        layout: 'stack',
        heading: 'One call from the SDK you already run',
        description: (
            <>
                <p>
                    Send with the PostHog SDK for Node.js, Python, Go, .NET, Ruby, Rust, Elixir, or PHP, or with the
                    REST API from anything else. The client retries, sets the idempotency key, and returns a message ID.
                </p>
                <SendCode />
                {list([
                    {
                        label: 'Your templates or ours',
                        description: (
                            <>
                                Send a template you designed in PostHog by its ID, or render the email yourself (React
                                Email, MJML, a string) and send the <InlineCode>html</InlineCode>.
                            </>
                        ),
                    },
                    {
                        label: 'Scoped key',
                        description:
                            'A project secret API key with the Workflow scope can send email and read statuses, and nothing else.',
                    },
                ])}
            </>
        ),
    },
    {
        ...slideStyle,
        slug: 'in-posthog',
        label: 'In PostHog',
        icon: <IconLaptop className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Design, publish, and watch every send',
        description: (
            <>
                <p>
                    Each transactional email has its own page: design it, publish a version, and see what happened to
                    every send without leaving PostHog.
                </p>
                {list([
                    {
                        label: 'Design',
                        description:
                            'Write the subject and body in the editor, add the variables your code sends, and choose a verified sender. Edits save as a draft until you publish.',
                    },
                    {
                        label: 'Metrics',
                        description:
                            'Delivered, bounced, spam, open, and click rates per email and per sending domain, for the last hour to the last 30 days.',
                    },
                    {
                        label: 'Sends',
                        description: 'Every send with its status and log messages, and on the recipient’s person.',
                    },
                    {
                        label: 'Versions',
                        description: 'Each publish adds a version. Roll back to any of them.',
                    },
                ])}
            </>
        ),
        image: { ref: 'design' },
    },
    {
        ...slideStyle,
        slug: 'editor-mcp',
        label: 'Editor / MCP',
        icon: <IconBrowser className="size-5" />,
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Let your agent set it up',
        description: (
            <>
                <p>
                    With the PostHog MCP server in Cursor, Claude Code, or any MCP-compatible agent, ask for a
                    transactional email and get the template, the API key steps, and the code that sends it.
                </p>
                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={[
                            {
                                label: 'Design from your brand',
                                description:
                                    'The agent writes the email, makes it transactional after you confirm, and hands you the send code.',
                            },
                            {
                                label: 'Debug a send',
                                description:
                                    'Ask why an email bounced, read the send log, and see the delivery rate of an email over the last week.',
                            },
                        ]}
                    />
                    <PlatformInstall />
                </div>
            </>
        ),
    },
]

export const keyFeatures: CarouselSlide[] = [
    {
        ...slideStyle,
        slug: 'send-api',
        label: 'Send API',
        icon: <IconSend className="size-5" />,
        progressBar: 'bg-teal',
        layout: 'stack',
        heading: 'A send API built for retries',
        description: (
            <>
                <p>
                    Every send returns a message ID. Every failure returns a code you can branch on. Nothing goes out
                    twice.
                </p>
                {list([
                    {
                        label: 'Idempotency keys',
                        description:
                            'Send the ID of the reset request as the key. A retry after a timeout replays the first send instead of sending again.',
                    },
                    {
                        label: 'Status lookup',
                        description:
                            'Read queued, sent, delivered, bounced, or complained by message ID for 30 days after the send.',
                    },
                    {
                        label: 'Error codes',
                        description: (
                            <>
                                <InlineCode>recipient_suppressed</InlineCode>, <InlineCode>quota_limited</InlineCode>,{' '}
                                <InlineCode>sending_paused</InlineCode>, and the rest, each with what to do next.
                            </>
                        ),
                    },
                    {
                        label: 'Linked to the person',
                        description:
                            'Pass the distinct ID you pass to identify(), and the send and its opens and clicks land on that person.',
                    },
                ])}
            </>
        ),
        image: { ref: 'sends' },
    },
    {
        ...slideStyle,
        slug: 'delivery',
        label: 'Delivery',
        icon: <IconDecisionTree className="size-5" />,
        progressBar: 'bg-orange',
        layout: 'stack',
        heading: 'Delivery you can rely on',
        description: (
            <>
                <p>
                    A transactional email goes out the moment you call send, from a domain you verified, and nothing is
                    dropped without telling you.
                </p>
                {list([
                    {
                        label: 'Sent at once',
                        description: 'Each send is queued the moment you call, and nothing in front of it holds it up.',
                    },
                    {
                        label: 'Only hard bounces block',
                        description: (
                            <>
                                The only address PostHog refuses is one that can’t receive mail, and the API says so
                                with <InlineCode>recipient_suppressed</InlineCode> instead of dropping the email.
                            </>
                        ),
                    },
                    {
                        label: 'Reputation',
                        description:
                            'Verified sending domains, bounce and complaint rates per domain, and automatic pauses when they climb.',
                    },
                    {
                        label: 'Send before you verify',
                        description:
                            'The sandbox sender delivers to members of your organization before your domain is verified, so the first test takes minutes.',
                    },
                ])}
            </>
        ),
        image: { ref: 'reputation' },
    },
    {
        ...slideStyle,
        slug: 'observability',
        label: 'Observability',
        icon: <IconGraph className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'See what happened after the email',
        description: (
            <>
                <p>
                    Delivery is the start. Every send sits on the person’s timeline next to their events, replays, and
                    flags, so you can see whether the reset email got them back in.
                </p>
                {list([
                    {
                        label: 'What happened after',
                        description:
                            'Pick an email and an event, such as purchase completed, and see how many recipients did it, the median time to it, and the revenue.',
                    },
                    {
                        label: 'Engagement events',
                        description: (
                            <>
                                {docsLink('/docs/workflows/engagement-events', 'Email events')} in PostHog you can put
                                in funnels, cohorts, and session replay filters.
                            </>
                        ),
                    },
                ])}
            </>
        ),
        image: { ref: 'personEvents' },
    },
    {
        ...slideStyle,
        slug: 'sensitive-data',
        label: 'Security',
        icon: <IconShieldLock className="size-5" />,
        progressBar: 'bg-red',
        layout: 'stack',
        heading: 'Sign-in codes stay secret',
        description: (
            <>
                <p>
                    Turn on <strong>Protect sensitive data</strong> for emails that carry codes, reset links, or
                    receipts, in the template or per send from code.
                </p>
                {list([
                    {
                        label: 'No copy kept',
                        description:
                            'PostHog keeps no copy of the subject or body, so a one-time code never sits in a log.',
                    },
                    {
                        label: 'No tracking redirects',
                        description:
                            'Link clicks aren’t tracked, so a token in a reset link never passes through a redirect.',
                    },
                    {
                        label: 'Still observable',
                        description: 'Deliveries, opens, bounces, and the email’s status are still recorded.',
                    },
                ])}
            </>
        ),
        image: { ref: 'sensitive' },
    },
    {
        ...slideStyle,
        slug: 'messaging',
        label: 'Then: messaging',
        icon: <IconMegaphone className="size-5" />,
        progressBar: 'bg-green',
        layout: 'stack',
        heading: 'Your transactional emails work. Now lift conversion.',
        description: (
            <>
                <p>
                    The same senders, templates, and person data power {docsLink('/messaging', 'Messaging')}, PostHog’s
                    marketing automation. When the reset email is done, build the emails that bring people back.
                </p>
                {list([
                    {
                        label: 'Drip campaigns',
                        description:
                            'Onboarding and lifecycle sequences triggered by what a person does, or doesn’t do, in your product.',
                    },
                    {
                        label: 'Broadcasts',
                        description:
                            'Product updates and announcements to a cohort, with opt-outs and frequency caps handled for you.',
                    },
                    {
                        label: 'One bill',
                        description:
                            'Transactional and marketing email share the same free tier and the same per-email rate.',
                    },
                ])}
            </>
        ),
        image: { ref: 'messaging' },
    },
]
