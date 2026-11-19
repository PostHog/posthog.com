import React, { useState } from 'react'
import { IconCode, IconLaptop, IconShieldLock } from '@posthog/icons'
import { CodeBlock } from 'components/CodeBlock'
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
    html: "<p>Hello world</p>",
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
    html="<p>Hello world</p>",
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
    HTML:        "<p>Hello world</p>",
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
  html: '<p>Hello world</p>',
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
    'html' => '<p>Hello world</p>',
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
    Html = "<p>Hello world</p>",
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
            .html("<p>Hello world</p>"),
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
    html: "<p>Hello world</p>",
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
    "html": "<p>Hello world</p>",
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
        heading: 'Send from the PostHog SDK',
        description: (
            <>
                <p>
                    Add a project secret API key to your PostHog client and call send. Node.js, Python, Go, Ruby, PHP,
                    .NET, Rust, and Elixir all support it, and the REST API covers everything else. The client retries,
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
        slug: 'in-posthog',
        label: 'In PostHog',
        icon: <IconLaptop className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Design and publish templates in PostHog',
        description: (
            <>
                <p>
                    Each transactional email gets its own page in PostHog, where you write it, publish versions, and see
                    every send.
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
                        label: 'What happened next',
                        description:
                            'See what the recipient did in the 7 days before and after a send, with the page and session of each event.',
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
        slug: 'sensitive-data',
        label: 'Security',
        icon: <IconShieldLock className="size-5" />,
        progressBar: 'bg-red',
        layout: 'stack',
        heading: 'Keep sign-in codes out of logs',
        description: (
            <>
                <p>
                    Turn on <strong>Protect sensitive data</strong> for emails with codes or reset links, in the
                    template or per send from code. PostHog then keeps no copy of the content and skips link tracking.
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
