import React from 'react'
import {
    IconBrackets,
    IconCode,
    IconDecisionTree,
    IconGraph,
    IconLaptop,
    IconMegaphone,
    IconPalette,
    IconSend,
    IconShieldLock,
    IconSparkles,
} from '@posthog/icons'
import { CodeBlock } from 'components/CodeBlock'
import Link from 'components/Link'
import PromptDemo from 'components/MCPPage/PromptDemo'
import MCPInstallCTA from 'components/MCPInstallCTA'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { emailFlows } from './agentDemo'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'

const style = { color: 'bg-light dark:bg-dark', activeText: 'text-primary' }

// Hedgebox demo screenshots, light and dark.
const shot = (light: string, dark: string, alt: string) => ({
    src: `https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/${light}`,
    srcDark: `https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/${dark}`,
    alt,
})

// The send example from contents/docs/workflows/transactional-emails/api.mdx.
const sendExamples = [
    {
        label: 'Node.js',
        language: 'js',
        code: `const { data, error } = await posthog.emails.send({
    to: "jane@example.com",
    templateId: "<template_id>",
    templateData: { first_name: "Jane", reset_link: "https://example.com/reset?token=abc123" },
    distinctId: "user_123",
    idempotencyKey: "password-reset-8f14e45f",
})`,
    },
    {
        label: 'Python',
        language: 'python',
        code: `result = posthog.emails.send(
    to="jane@example.com",
    template_id="<template_id>",
    template_data={"first_name": "Jane", "reset_link": "https://example.com/reset?token=abc123"},
    distinct_id="user_123",
    idempotency_key="password-reset-8f14e45f",
)`,
    },
    {
        label: 'Go',
        language: 'go',
        code: `result, err := client.Emails().Send(ctx, posthog.TemplateEmail{
    To:             "jane@example.com",
    TemplateID:     "<template_id>",
    TemplateData:   map[string]interface{}{"first_name": "Jane", "reset_link": "https://example.com/reset?token=abc123"},
    DistinctID:     "user_123",
    IdempotencyKey: "password-reset-8f14e45f",
})`,
    },
    {
        label: 'Ruby',
        language: 'ruby',
        code: `result = posthog.emails.send(
  to: 'jane@example.com',
  template_id: '<template_id>',
  template_data: { first_name: 'Jane', reset_link: 'https://example.com/reset?token=abc123' },
  distinct_id: 'user_123',
  idempotency_key: 'password-reset-8f14e45f'
)`,
    },
    {
        label: 'PHP',
        language: 'php',
        code: `$result = PostHog::emails()->send([
    'to' => 'jane@example.com',
    'template_id' => '<template_id>',
    'template_data' => ['first_name' => 'Jane', 'reset_link' => 'https://example.com/reset?token=abc123'],
    'distinct_id' => 'user_123',
    'idempotency_key' => 'password-reset-8f14e45f',
]);`,
    },
    {
        label: 'REST',
        language: 'bash',
        code: `curl -X POST "https://us.posthog.com/api/messaging/send/email/" \\
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

// Workflow shapes from the building-workflows skill and the broadcasts-create MCP tool in PostHog/posthog.
const apiExamples = [
    {
        label: 'Transactional email',
        language: 'bash',
        code: sendExamples[sendExamples.length - 1].code,
    },
    {
        label: 'Broadcast',
        language: 'bash',
        code: `curl -X POST "https://us.posthog.com/api/projects/$PROJECT_ID/hog_flows/" \\
  -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Shared folders launch",
    "origin_product": "broadcasts",
    "exit_condition": "exit_only_at_end",
    "actions": [
      { "id": "trigger_node", "name": "Free plan", "type": "trigger", "config": {
          "type": "batch",
          "filters": { "properties": [{ "key": "plan", "value": ["free"], "operator": "exact", "type": "person" }] } } },
      { "id": "email_1", "name": "Launch email", "type": "function_email", "config": {
          "template_id": "template-email",
          "inputs": { "email": { "value": {
            "to": { "email": "{{ person.properties.email }}", "name": "" },
            "from": { "email": "hello@hedgebox.net", "name": "Hedgebox" },
            "subject": "New: shared folders",
            "html": "<p>Share a whole folder with one link.</p>",
            "text": "Share a whole folder with one link." } } } } },
      { "id": "exit_node", "name": "Exit", "type": "exit", "config": { "reason": "Done" } }
    ],
    "edges": [
      { "from": "trigger_node", "to": "email_1", "type": "continue" },
      { "from": "email_1", "to": "exit_node", "type": "continue" }
    ]
  }'`,
    },
    {
        label: 'Automation',
        language: 'bash',
        code: `curl -X POST "https://us.posthog.com/api/projects/$PROJECT_ID/hog_flows/" \\
  -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Nudge after signup",
    "exit_condition": "exit_only_at_end",
    "actions": [
      { "id": "trigger_node", "name": "Signed up", "type": "trigger", "config": {
          "type": "event",
          "filters": { "events": [{ "id": "signed_up", "name": "signed_up", "type": "events", "order": 0 }] } } },
      { "id": "delay_1", "name": "Wait 3 days", "type": "delay", "config": { "delay_duration": "3d" } },
      { "id": "email_1", "name": "Upload nudge", "type": "function_email", "config": {
          "template_id": "template-email",
          "template_uuid": "<saved_template_uuid>",
          "message_category_type": "marketing",
          "inputs": { "email": { "value": {
            "to": { "email": "{{ person.properties.email }}", "name": "" },
            "from": { "email": "hello@hedgebox.net", "name": "Hedgebox" } } } } } },
      { "id": "exit_node", "name": "Exit", "type": "exit", "config": { "reason": "Done" } }
    ],
    "edges": [
      { "from": "trigger_node", "to": "delay_1", "type": "continue" },
      { "from": "delay_1", "to": "email_1", "type": "continue" },
      { "from": "email_1", "to": "exit_node", "type": "continue" }
    ]
  }'`,
    },
]

const List = ({ items }: { items: [string, React.ReactNode][] }) => (
    <div className="@container">
        <LabeledList items={items.map(([label, description]) => ({ label, description }))} />
    </div>
)

const DocsLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link to={to} state={{ newWindow: true }} className="underline font-semibold">
        {children}
    </Link>
)

/**
 * Applications = the ways you send. Copy reshaped from contents/docs/workflows.
 */
export const applications: CarouselSlide[] = [
    {
        ...style,
        slug: 'your-code',
        label: 'Your code',
        icon: <IconCode className="size-5" />,
        progressBar: 'bg-red',
        layout: 'stack',
        heading: 'Send email from your backend',
        description: (
            <>
                <p>
                    Password resets, sign-in codes, and receipts go out with one API call, from Node.js, Python, Go,
                    Ruby, PHP, .NET, Rust, Elixir, or plain REST. Read the{' '}
                    <DocsLink to="/docs/workflows/transactional-emails">transactional email docs</DocsLink>.
                </p>
                <List
                    items={[
                        [
                            'Retries never double-send',
                            'Send an idempotency key, and a retry after a timeout never sends the email twice. PostHog keeps each key for 24 hours.',
                        ],
                        [
                            'Reset links stay secret',
                            'Turn on Protect sensitive data, and PostHog keeps no copy of the email and skips click tracking, so a token never goes through a redirect.',
                        ],
                        [
                            'On the person, not in a log',
                            'Pass a distinct_id, and each send lands on the person, next to their product events.',
                        ],
                        [
                            'See what happened next',
                            'See who signed in after the reset email, or paid after the receipt.',
                        ],
                    ]}
                />
                <div className="not-prose mt-6">
                    <CodeBlock currentLanguage={sendExamples[0]}>{sendExamples}</CodeBlock>
                </div>
            </>
        ),
    },
    {
        ...style,
        slug: 'your-agent',
        label: 'Your agent',
        icon: <IconSparkles className="size-5" />,
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Or just ask your agent',
        description: (
            <>
                <p>
                    The PostHog MCP lets Claude Code, Cursor, or Codex build automations, draft broadcasts, move you off
                    another provider, and tell you what an email actually did. Pick a prompt to watch the tool calls.
                </p>
                <MCPInstallCTA className="not-prose my-6 max-w-md" showDesktopLink={false} />
                <div className="not-prose">
                    <PromptDemo flows={emailFlows} placement="workflows_page" cwd="~/hedgebox" />
                </div>
            </>
        ),
    },
    {
        ...style,
        slug: 'web-app',
        label: 'Web app',
        icon: <IconLaptop className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Build it in PostHog',
        description: (
            <>
                <p>
                    The <DocsLink to="/docs/workflows/surfaces/web-app">PostHog web app</DocsLink> holds your
                    transactional emails, broadcasts, and automations, the template library, your channels, and your
                    opt-out and suppression lists.
                </p>
                <List
                    items={[
                        [
                            'Build an automation',
                            'Start from a trigger, then add delays, branches, message sends, and PostHog actions in the drag-and-drop builder.',
                        ],
                        [
                            'Work in drafts',
                            'An automation stays a draft until you turn it on, so you can build and test it without anyone getting a message.',
                        ],
                        [
                            'Reuse templates',
                            'Design an email once in the template library and use it in transactional sends, broadcasts, and automations.',
                        ],
                        [
                            'Manage channels',
                            'Verify a sending domain, and connect push, SMS, Slack, or any real-time destination.',
                        ],
                    ]}
                />
            </>
        ),
        image: shot(
            'wf_landing_builder_light_da51389d7a.png',
            'wf_landing_builder_dark_2c7e828448.png',
            'An automation in the PostHog workflow builder'
        ),
    },
    {
        ...style,
        slug: 'api',
        label: 'API',
        icon: <IconBrackets className="size-5" />,
        progressBar: 'bg-seagreen',
        layout: 'stack',
        heading: 'Manage it all over the REST API',
        description: (
            <>
                <p>
                    Use the <DocsLink to="/docs/workflows/surfaces/api">REST API</DocsLink> when you want automations
                    under version control, generated from your own system, or created as part of a deploy. A new
                    broadcast or automation starts as a draft, so nothing sends until you publish it. See the{' '}
                    <DocsLink to="/docs/api/hog-flows">workflows API reference</DocsLink> and the{' '}
                    <DocsLink to="/docs/api/messaging">sending API reference</DocsLink>.
                </p>
                <List
                    items={[
                        [
                            'Manage automations',
                            'List, create, read, update, and delete automations, including their trigger, steps, and enabled state.',
                        ],
                        [
                            'Check the blast radius',
                            'See how many people an audience matches before you publish, so you never email everyone by accident.',
                        ],
                        [
                            'Sync opt-outs',
                            'Add and remove opt-outs and suppressions from your own product, so an unsubscribe works everywhere.',
                        ],
                    ]}
                />
                <div className="not-prose mt-6">
                    <CodeBlock currentLanguage={apiExamples[0]}>{apiExamples}</CodeBlock>
                </div>
            </>
        ),
    },
]

/**
 * Key features = what each part of Workflows does. Screenshots are Hedgebox demo data.
 */
export const keyFeatures: CarouselSlide[] = [
    {
        ...style,
        slug: 'transactional',
        label: 'Transactional',
        icon: <IconSend className="size-5" />,
        progressBar: 'bg-orange',
        layout: 'stack',
        heading: 'Transactional email that lands in your product data',
        description: (
            <>
                <p>
                    Design the email in PostHog, then send it from your code with one API call. Each send lands on the
                    person, next to what they did before and after it.
                </p>
                <List
                    items={[
                        [
                            'Templates',
                            'Write the email in the editor, and your code passes in the variables, like a reset link.',
                        ],
                        [
                            'Delivery stats',
                            'Sends, deliveries, opens, clicks, and bounces for each transactional email.',
                        ],
                        [
                            'Status for every send',
                            'Look up one email by its message ID for 30 days, and see if it was delivered, bounced, or marked as spam.',
                        ],
                    ]}
                />
            </>
        ),
        image: shot(
            'wf_landing_transactional_create_light_2ef5f04bae.png',
            'wf_landing_transactional_create_dark_93a4f5e1f5.png',
            'Creating a transactional email in PostHog'
        ),
    },
    {
        ...style,
        slug: 'broadcasts',
        label: 'Broadcasts',
        icon: <IconMegaphone className="size-5" />,
        progressBar: 'bg-red',
        layout: 'stack',
        heading: 'Broadcasts that know who they are for',
        description: (
            <>
                <p>
                    Send one email to a group of people, once or on a schedule. PostHog looks at what people do in your
                    product and suggests who to email next, and PostHog AI drafts the email.
                </p>
                <List
                    items={[
                        ['Audiences', 'Pick people by their properties, cohorts, or what they did in your product.'],
                        ['Goals', 'Count the people who sign up, upgrade, or buy after the email.'],
                        [
                            'Send calendar',
                            'See every broadcast and automated email on one calendar before you pick a day.',
                        ],
                    ]}
                />
            </>
        ),
        image: shot(
            'wf_landing_calendar_light_eaa2380cb1.png',
            'wf_landing_calendar_dark_14632ec78e.png',
            'Broadcasts and automated emails on the send calendar'
        ),
    },
    {
        ...style,
        slug: 'automations',
        label: 'Automations',
        icon: <IconDecisionTree className="size-5" />,
        progressBar: 'bg-teal',
        layout: 'stack',
        heading: 'Automations that start on what people do',
        description: (
            <>
                <p>
                    An automation starts when someone does something in your product, then waits, branches, and sends
                    email, push, SMS, or Slack messages. PostHog watches how each step does and suggests changes for you
                    to approve.
                </p>
                <List
                    items={[
                        ['Triggers', 'An event, a cohort, a webhook, a schedule, or a manual run.'],
                        ['Flow logic', 'Delays, waits until a condition, and branches on properties or random splits.'],
                        ['Test runs', 'Run an automation for a test person before anyone real gets a message.'],
                    ]}
                />
            </>
        ),
        image: shot(
            'wf_landing_automation_overview_light_99f9d9cac2.png',
            'wf_landing_automation_overview_dark_6fa6877c4c.png',
            'An automation with its metrics and suggested changes'
        ),
    },
    {
        ...style,
        slug: 'editor',
        label: 'Editor',
        icon: <IconPalette className="size-5" />,
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'An email editor your whole team can use',
        description: (
            <>
                <p>
                    Type / to add a block, {'{{'} to pull in anything you know about the person, and preview the email
                    at every screen width.
                </p>
                <List
                    items={[
                        [
                            'Write it with AI',
                            'Describe the email, its audience, and its tone, and PostHog AI writes the content and the layout.',
                        ],
                        ['Personalize it', 'Use person properties and Liquid in the subject and the body.'],
                    ]}
                />
            </>
        ),
        image: shot(
            'wf_landing_email_editor_hero_light_c32cbbf051.png',
            'wf_landing_email_editor_hero_dark_14dd78cc67.png',
            'The PostHog email editor'
        ),
    },
    {
        ...style,
        slug: 'results',
        label: 'Results',
        icon: <IconGraph className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'See what people did after the email',
        description: (
            <>
                <p>
                    Sends, opens, clicks, bounces, and complaints for every email, next to what people did in your
                    product afterwards. Every send, open, and click is also an event you can use in any insight.
                </p>
                <List
                    items={[
                        ['Conversions', 'Follow people from the send to the event you care about, like a paid bill.'],
                        ['Revenue', 'Add up the revenue that came in after the email.'],
                        [
                            'Session replays',
                            <>
                                <DocsLink to="/docs/workflows/replay-vision">Replay Vision</DocsLink> watches the
                                sessions an email started, and groups what people did.
                            </>,
                        ],
                    ]}
                />
            </>
        ),
        image: shot(
            'wf_landing_transactional_impact_light_8fa12a5309.png',
            'wf_landing_transactional_impact_dark_6721526a00.png',
            'Conversions from send to paid bill'
        ),
    },
    {
        ...style,
        slug: 'deliverability',
        label: 'Deliverability',
        icon: <IconShieldLock className="size-5" />,
        progressBar: 'bg-green',
        layout: 'stack',
        heading: 'Built to land in the inbox',
        description: (
            <>
                <p>
                    The parts of email nobody wants to build, already built. Read how{' '}
                    <DocsLink to="/docs/workflows/sending-reputation">sending reputation</DocsLink> works.
                </p>
                <List
                    items={[
                        [
                            'No IP to warm up',
                            'Email goes out over shared Amazon SES IP addresses with a good reputation, from your own domain.',
                        ],
                        [
                            'Automatic suppression',
                            'Bounces and spam reports stop future sends to that address. No step can skip the check.',
                        ],
                        [
                            'Opt-out categories',
                            'People can turn off your newsletter and still get their password reset.',
                        ],
                        ['Frequency cap', 'Limit the marketing messages one person gets, across email, SMS, and push.'],
                        [
                            'Move in',
                            'Import templates, suppressions, and unsubscribes from Customer.io, Resend, Postmark, SendGrid, Mailgun, or Mailchimp.',
                        ],
                    ]}
                />
            </>
        ),
        image: shot(
            'wf_landing_reputation_light_aed3a7f627.png',
            'wf_landing_reputation_dark_caccc6a89b.png',
            'Sending health and allowance in PostHog'
        ),
    },
]
