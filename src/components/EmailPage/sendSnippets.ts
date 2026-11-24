// The full send snippets from the Messaging product page (#22023, messaging/transactional.tsx), with the subject,
// template, and body swapped for each example email. Keep them in line with contents/docs/workflows/transactional-emails.
const baseSnippets: { label: string; language: string; code: string }[] = [
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

export function sendSnippets(email: { subject: string; template: string; html: string }): typeof baseSnippets {
    return baseSnippets.map((s) => ({
        ...s,
        code: s.code
            .split('Reset your password')
            .join(email.subject)
            .split('password-reset')
            .join(email.template)
            .split('<p>Hello world</p>')
            .join(email.html),
    }))
}
