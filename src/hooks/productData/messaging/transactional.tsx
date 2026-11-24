import React, { useState } from 'react'
import { IconCode, IconLaptop } from '@posthog/icons'
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
        label: 'Code',
        icon: <IconCode className="size-5" />,
        progressBar: 'bg-teal',
        layout: 'stack',
        heading: 'Write email as code, send it from your backend',
        description: (
            <>
                <p>
                    Keep your emails in your repo, and send them with one call on the PostHog client. Eight server SDKs
                    support it, and the REST API covers everything else.
                </p>
                <SendCode />
                {list([
                    {
                        label: 'HTML or React Email',
                        description: (
                            <>
                                Send HTML from any renderer, or pass a React Email component to the Node.js SDK as{' '}
                                <InlineCode>react</InlineCode>.
                            </>
                        ),
                    },
                    {
                        label: 'Status of every send',
                        description: 'Each send returns a message ID. Read its status from your code for 30 days.',
                    },
                    {
                        label: 'Safe retries',
                        description: 'An idempotency key stops a retry from sending the same email twice.',
                    },
                    {
                        label: 'Sensitive sends',
                        description:
                            'For sign-in codes and reset links, PostHog keeps no copy of the content and skips link tracking.',
                    },
                ])}
            </>
        ),
    },
    {
        ...slideStyle,
        slug: 'in-posthog',
        label: 'Editor',
        icon: <IconLaptop className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'float',
        heading: 'Or design templates in the PostHog editor',
        description: (
            <>
                <p>
                    When someone outside engineering owns the copy, they write the email in PostHog. Your code sends it
                    by its ID.
                </p>
                {list([
                    {
                        label: 'Versions',
                        description: 'Each publish adds a version. Roll back to any of them.',
                    },
                    {
                        label: 'Metrics',
                        description: 'Delivered, bounced, open, and click rates for each email.',
                    },
                    {
                        label: 'Sends',
                        description: "Every send with its status, and on the recipient's person.",
                    },
                ])}
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/pp_transactional_design_light_f68b361139.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/pp_transactional_design_dark_5ca3d36e60.png',
            alt: 'A transactional email template in the PostHog email editor',
        },
    },
]
