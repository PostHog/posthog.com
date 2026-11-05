import React, { useState } from 'react'
import { IconCode, IconDecisionTree, IconGraph, IconLaptop, IconSend, IconShieldLock } from '@posthog/icons'
import { CodeBlock } from 'components/CodeBlock'
import Link from 'components/Link'
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
        code: `const posthog = new PostHog("<ph_project_api_key>", {
    host: "https://us.i.posthog.com",
    secretKey: process.env.POSTHOG_PROJECT_SECRET_API_KEY,
})

const { data, error } = await posthog.emails.send({
    to: email,
    from: "Hedgebox <security@example.com>",
    subject: "Reset your password",
    html,
    templateKey: "password-reset",
})`,
    },
    {
        label: 'Python',
        language: 'python',
        code: `posthog = Posthog(
    "<ph_project_api_key>",
    host="https://us.i.posthog.com",
    secret_key=os.environ["POSTHOG_PROJECT_SECRET_API_KEY"],
)

result = posthog.emails.send(
    to=email,
    from_="Hedgebox <security@example.com>",
    subject="Reset your password",
    html=html,
    template_key="password-reset",
)`,
    },
    {
        label: 'Go',
        language: 'go',
        code: `client, err := posthog.NewWithConfig("<ph_project_api_key>", posthog.Config{
    Endpoint:  "https://us.i.posthog.com",
    SecretKey: os.Getenv("POSTHOG_PROJECT_SECRET_API_KEY"),
})

result, err := client.Emails().Send(ctx, posthog.CodeEmail{
    To:          email,
    From:        "Hedgebox <security@example.com>",
    Subject:     "Reset your password",
    HTML:        html,
    TemplateKey: "password-reset",
})`,
    },
    {
        label: 'Ruby',
        language: 'ruby',
        code: `posthog = PostHog::Client.new({
  api_key: '<ph_project_api_key>',
  host: 'https://us.i.posthog.com',
  secret_key: ENV.fetch('POSTHOG_PROJECT_SECRET_API_KEY')
})

result = posthog.emails.send(
  to: email,
  from: 'Hedgebox <security@example.com>',
  subject: 'Reset your password',
  html: html,
  template_key: 'password-reset'
)`,
    },
    {
        label: 'PHP',
        language: 'php',
        code: `PostHog::init(client: new Client(
    '<ph_project_api_key>',
    ['host' => 'https://us.i.posthog.com'],
    loadFeatureFlags: false,
    secretKey: getenv('POSTHOG_PROJECT_SECRET_API_KEY'),
));

$result = PostHog::emails()->send([
    'to' => $email,
    'from' => 'Hedgebox <security@example.com>',
    'subject' => 'Reset your password',
    'html' => $html,
    'template_key' => 'password-reset',
]);`,
    },
    {
        label: '.NET',
        language: 'csharp',
        code: `await using var posthog = new PostHogClient(new PostHogOptions
{
    ProjectToken = "<ph_project_api_key>",
    HostUrl = new Uri("https://us.i.posthog.com"),
    SecretKey = Environment.GetEnvironmentVariable("POSTHOG_PROJECT_SECRET_API_KEY"),
});

var result = await posthog.Emails.SendAsync(new SendCodeEmailOptions
{
    To = email,
    From = "Hedgebox <security@example.com>",
    Subject = "Reset your password",
    Html = html,
    TemplateKey = "password-reset",
});`,
    },
    {
        label: 'Rust',
        language: 'rust',
        code: `let posthog = posthog_rs::client(
    ClientOptionsBuilder::default()
        .api_key("<ph_project_api_key>".to_string())
        .host("https://us.i.posthog.com")
        .secret_key(std::env::var("POSTHOG_PROJECT_SECRET_API_KEY")?)
        .build()?,
)
.await;

let result = posthog
    .emails()
    .send(
        CodeEmail::new(&email, "password-reset", "Reset your password")
            .from("Hedgebox <security@example.com>")
            .html(html),
    )
    .await?;`,
    },
    {
        label: 'Elixir',
        language: 'elixir',
        code: `# config/runtime.exs
config :posthog,
  api_key: "<ph_project_api_key>",
  api_host: "https://us.i.posthog.com",
  secret_key: System.fetch_env!("POSTHOG_PROJECT_SECRET_API_KEY")

# anywhere in your app
{:ok, result} =
  PostHog.Emails.send(
    to: email,
    from: "Hedgebox <security@example.com>",
    subject: "Reset your password",
    html: html,
    template_key: "password-reset"
  )`,
    },
    {
        label: 'REST',
        language: 'bash',
        code: `curl -X POST "https://us.posthog.com/api/projects/@current/messaging/send/email/" \\
  -H "Authorization: Bearer $POSTHOG_PROJECT_SECRET_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "jane@example.com",
    "from": "Hedgebox <security@example.com>",
    "subject": "Reset your password",
    "html": "<p>Hi Jane,</p><p><a href=\\"https://example.com/reset?token=abc123\\">Reset your password</a>.</p>",
    "template_key": "password-reset"
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

export const transactional: CarouselSlide[] = [
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
                    Add a project secret API key to the PostHog client you already run, in Node.js, Python, Go, .NET,
                    Ruby, Rust, Elixir, or PHP, and send. The REST API works from anything else. The client retries,
                    sets the idempotency key, and returns a message ID.
                </p>
                <SendCode />
                {list([
                    {
                        label: 'Your templates or ours',
                        description: (
                            <>
                                Render the email yourself (React Email, MJML, a string) and send the{' '}
                                <InlineCode>html</InlineCode>, or send a template you designed in PostHog by its ID.
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
                        description: "Every send with its status and log messages, and on the recipient's person.",
                    },
                    {
                        label: 'Versions',
                        description: 'Each publish adds a version. Roll back to any of them.',
                    },
                ])}
            </>
        ),
    },
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
                    Each send returns a message ID, each failure returns an error code you can branch on, and an
                    idempotency key means a retry never sends twice.
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
    },
    {
        ...slideStyle,
        slug: 'delivery',
        label: 'Delivery',
        icon: <IconDecisionTree className="size-5" />,
        progressBar: 'bg-orange',
        layout: 'stack',
        heading: 'Out the door the moment you call send',
        description: (
            <>
                <p>
                    There is no queue of marketing email in front of your password reset. It goes out when you call
                    send, from a domain you verified, and if PostHog refuses an address it tells you why.
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
                                The only address PostHog refuses is one that can't receive mail, and the API says so
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
                    Delivery is the start. Every send sits on the person's timeline next to their events, replays, and
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
                            "Link clicks aren't tracked, so a token in a reset link never passes through a redirect.",
                    },
                    {
                        label: 'Still observable',
                        description: "Deliveries, opens, bounces, and the email's status are still recorded.",
                    },
                ])}
            </>
        ),
    },
]
