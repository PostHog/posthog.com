import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO, { buildProductStructuredData } from 'components/seo'
import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction'
import { Accordion } from 'components/RadixUI/Accordion'
import WistiaEmbed from 'components/WistiaEmbed'
import Link from 'components/Link'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import Highlight from 'components/MCPPage/Highlight'
import { SectionHeader } from 'components/Pricing/Test/Sections'
import ThreadDemo from 'components/SlackApp/ThreadDemo'
import ThreadStarters from 'components/SlackApp/ThreadStarters'
import ProductIcon from 'components/PostHogAI/ProductIcon'
import { StickerRobot } from 'components/Stickers/Stickers'
import Tooltip from 'components/RadixUI/Tooltip'
import { LOGOS } from 'constants/logos'
import useProduct from 'hooks/useProduct'
import {
    IconBolt,
    IconBrain,
    IconBug,
    IconChat,
    IconCheck,
    IconCode,
    IconComment,
    IconCursorClick,
    IconDocument,
    IconDownload,
    IconFlag,
    IconGraph,
    IconHome,
    IconLock,
    IconPlug,
    IconPullRequest,
    IconSparkles,
    IconSupport,
    IconTarget,
    IconTerminal,
} from '@posthog/icons'

const CONNECT_SLACK_URL = 'https://app.posthog.com/integrations/slack'
const SLACK_MARKETPLACE_URL = 'https://slack.com/marketplace/A03M3FN0RSQ-posthog'

// Stand-in art until the commissioned Slack app illustrations arrive. Swap an entry here to replace one.
const ART = {
    jobs: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog_loves_slack_edb7d087cc.png',
        alt: 'A hedgehog hugging a dog that wears a Slack tag',
    },
    fighters: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/choose_your_fighter_e62bd78032.png',
        alt: '',
    },
    tryIt: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/phone_toilet_hog_b6ac6c955f.png',
        alt: '',
    },
    please: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/heart_hog_please_7b489a276c.png',
        alt: '',
    },
} as const

const h2ClassName = 'm-0 text-2xl font-bold leading-tight tracking-tight @xl/reader-content:text-3xl'

type IconComponent = React.ComponentType<{ className?: string }>

const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="rounded-sm bg-highlight py-0.5 px-1 text-xs font-bold text-red dark:text-yellow">{children}</span>
)

const Mention = () => <strong className="font-semibold text-blue">@PostHog</strong>

const CardLink = ({ to, label }: { to: string; label: string }) => (
    <Link to={to} state={{ newWindow: true }} className="mt-auto text-sm font-semibold underline">
        {label} →
    </Link>
)

type Feature = {
    Icon: IconComponent
    color: string
    name: string
    description: React.ReactNode
}

// Pairs divided by rules, like `IconChipRow` on /mcp
const FeatureRows = ({ items }: { items: Feature[] }) => {
    const rows = Array.from({ length: Math.ceil(items.length / 2) }, (_, i) => items.slice(i * 2, i * 2 + 2))
    return (
        <div className="divide-y divide-primary">
            {rows.map((row) => (
                <div
                    key={row[0].name}
                    className="grid grid-cols-1 divide-y divide-primary py-5 first:pt-0 last:pb-0 @sm:grid-cols-2 @sm:gap-x-10 @sm:divide-y-0"
                >
                    {row.map(({ Icon, color, name, description }) => (
                        <div key={name} className="py-5 first:pt-0 last:pb-0 @sm:py-0">
                            <div className="flex items-center gap-2 text-base font-semibold text-primary">
                                <Icon className={`size-5 shrink-0 ${color}`} />
                                <span>{name}</span>
                            </div>
                            <p className="mb-0 mt-1 text-sm leading-relaxed text-secondary">{description}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

// Like `IconChipRow` on /ai: two columns when the card is wide enough, one when it isn't
const FeatureChips = ({ items }: { items: Feature[] }) => (
    <div className="grid grid-cols-1 gap-x-6 gap-y-4 @sm:grid-cols-2">
        {items.map(({ Icon, color, name, description }) => (
            <div key={name}>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                    <Icon className={`size-4 shrink-0 ${color}`} />
                    <span>{name}</span>
                </div>
                <p className="mb-0 mt-0.5 text-sm text-secondary">{description}</p>
            </div>
        ))}
    </div>
)

// The "Also in Slack" block at the bottom of a card on /ai
const CardFooter = ({
    title,
    children,
    link,
}: {
    title: string
    children: React.ReactNode
    link: { label: string; to: string }
}) => (
    <div className="mt-6 border-t border-primary pt-4">
        <h4 className="m-0 text-base font-bold">{title}</h4>
        <p className="mb-0 mt-0.5 text-sm text-secondary">{children}</p>
        <Link to={link.to} state={{ newWindow: true }} className="mt-4 inline-block text-sm font-semibold underline">
            {link.label} →
        </Link>
    </div>
)

const sendsBack: Feature[] = [
    {
        Icon: IconDocument,
        color: 'text-blue',
        name: 'Canvases it keeps editing',
        description:
            'Ask for a report and get a Slack canvas. Ask for changes in the thread, and it updates the same one.',
    },
    {
        Icon: IconDownload,
        color: 'text-green',
        name: 'Spreadsheets, PDFs, and docs',
        description: 'It uploads the file to the thread: XLSX, CSV, PDF, a Word doc, an HTML page, or a ZIP.',
    },
    {
        Icon: IconCheck,
        color: 'text-yellow',
        name: 'Status you can scan',
        description:
            'It reacts to your message as it works: queued, picking a repo, working, or failed. Scan a busy channel without opening every thread.',
    },
    {
        Icon: IconBolt,
        color: 'text-red',
        name: 'The cost, in the footer',
        description: "Each reply shows what the thread has cost so far. You'll know before finance does.",
    },
]

const reachesPast: Feature[] = [
    {
        Icon: IconPlug,
        color: 'text-blue',
        name: 'Your MCP servers',
        description:
            'It uses the MCP servers you connected, like Linear and Notion, with your own access. File the ticket or read the spec from the thread.',
    },
    {
        Icon: IconBrain,
        color: 'text-green',
        name: 'Business Knowledge',
        description: 'It reads what you saved about your product and your customers before it answers.',
    },
    {
        Icon: IconChat,
        color: 'text-purple',
        name: 'Other Slack channels',
        description:
            'It only reads the thread it is in. Sync a channel with the Slack source and name the table in your agent instructions, and it can read that channel too.',
    },
]

// Smaller than the features: you set these once
const settings: { Icon: IconComponent; color: string; name: string; to: string }[] = [
    { Icon: IconHome, color: 'text-green', name: 'Default project', to: '/docs/slack#pick-a-project' },
    { Icon: IconLock, color: 'text-red', name: 'Who can join your threads', to: '/docs/slack#follow-ups-in-a-thread' },
    { Icon: IconComment, color: 'text-purple', name: 'Agent instructions', to: '/docs/slack#customize-replies' },
    { Icon: IconTarget, color: 'text-yellow', name: 'Routing rules', to: '/docs/slack/commands#routing-rules' },
]

// Ideas, not prompts: each one is a habit a team can start
const jobs: Feature[] = [
    {
        Icon: IconBug,
        color: 'text-red',
        name: 'Clear the papercuts backlog',
        description: 'Tag the bot on tickets in a #papercuts channel.',
    },
    {
        Icon: IconCursorClick,
        color: 'text-salmon',
        name: 'Fix the website with a prompt',
        description: 'Tag the bot on a typo someone spotted.',
    },
    {
        Icon: IconFlag,
        color: 'text-blue',
        name: 'Ship it behind a flag',
        description: 'Ask for the change and the rollout together.',
    },
    {
        Icon: IconCode,
        color: 'text-brown dark:text-brown-dark',
        name: 'Build what customers ask for',
        description: 'Tag the bot where a customer asked for it.',
    },
    {
        Icon: IconSupport,
        color: 'text-green',
        name: 'Walk into every call prepared',
        description: 'DM the bot for an account brief before a call.',
    },
    {
        Icon: IconTarget,
        color: 'text-purple',
        name: 'Turn interviews into themes',
        description: 'Attach transcripts and ask the bot for themes.',
    },
]

// Under the ship box, like the resources under "Your agent gets the full spread" on /mcp
const moreCards: {
    title: string
    Icon: IconComponent
    color: string
    description: string
    link: { label: string; to: string }
}[] = [
    {
        title: 'Auto model choice',
        Icon: IconSparkles,
        color: 'text-blue',
        description:
            'Turn it on, and it picks the cheapest model that can do the job. Name a model to override it, even halfway through a thread.',
        link: { label: 'Pick a model', to: '/docs/slack#auto-model-choice' },
    },
    {
        title: 'One-click replies',
        Icon: IconComment,
        color: 'text-red',
        description: 'When an answer needs a decision, it adds the likely replies as buttons. One click sends yours.',
        link: { label: 'Start a task', to: '/docs/slack#start-a-task' },
    },
    {
        title: 'Previews for PostHog links',
        Icon: IconGraph,
        color: 'text-purple',
        description:
            'Paste a link to an insight, dashboard, flag, experiment, error, or Self-driving report, and Slack shows a preview. Insights show the chart.',
        link: { label: 'Link unfurling', to: '/docs/slack#link-unfurling' },
    },
]

const SlackLogo = ({ className }: { className?: string }) => <img src={LOGOS.slack} alt="" className={className} />

// The ways in to PostHog's agent. They all use the PostHog MCP, so the choice is where you talk to it. A fighter with no
// product data has an inline `product`, like Skills on /ai.
type Fighter = {
    handle?: string
    product?: { name: string; Icon: IconComponent; color: string }
    to: string
    description: string
}

const fighters: Fighter[] = [
    {
        handle: 'posthog_ai',
        to: '/ai',
        description:
            "In the PostHog app. It knows which chart you're looking at, and can build and query anything in PostHog.",
    },
    {
        product: { name: 'Slack app', Icon: SlackLogo, color: 'primary' },
        to: '/docs/slack',
        description:
            'In your threads and DMs. Self-driving reports, subscriptions, and alerts land here too. @PostHog to summon it for questions and code fixes.',
    },
    {
        product: { name: 'Your terminal or agent', Icon: IconTerminal, color: 'purple' },
        to: '/mcp',
        description: 'In Claude Code, Cursor, Codex, and other agents, through the PostHog MCP.',
    },
]

const faqLinkClass = 'text-red dark:text-yellow font-semibold hover:underline'

const FaqLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link to={to} state={{ newWindow: true }} className={faqLinkClass}>
        {children}
    </Link>
)

// Check each answer against /docs/slack before you change it
const faqItems = [
    {
        trigger: 'Do I need to connect a repo to use the PostHog Slack app?',
        content: (
            <p>
                Data questions don't need GitHub or a repo. To ship code, connect your{' '}
                <Link
                    to="https://app.posthog.com/settings/user-personal-integrations"
                    external
                    className={faqLinkClass}
                >
                    personal GitHub
                </Link>
                , and the agent opens PRs as you. Without it, a task can use your project's GitHub App installation, and
                the PR comes from the PostHog bot.
            </p>
        ),
    },
    {
        trigger: 'How does it know whether to answer or write code?',
        content: (
            <p>
                The agent decides from your request. If it doesn't need code, the agent answers from your PostHog data.
                If it does, the agent picks a repo: the one you name, your only one, or the best match for your{' '}
                <FaqLink to="/docs/slack/commands#routing-rules">routing rules</FaqLink>. If it can't pick, it asks in
                the thread with a repo picker. The picker has a <strong>No repo needed</strong> option.
            </p>
        ),
    },
    {
        trigger: 'What happens after I tag @PostHog?',
        content: (
            <p>
                The bot reacts to your message with eyes, then posts a progress message in the thread. It shows a plan,
                checks off each step, and links to the agent logs. When it's done, it posts a summary. If a run fails,
                reply <code>retry</code> to continue from the last checkpoint. See{' '}
                <FaqLink to="/docs/slack#start-a-task">start a task</FaqLink> and{' '}
                <FaqLink to="/docs/slack#emoji-cues">emoji cues</FaqLink> for the full flow.
            </p>
        ),
    },
    {
        trigger: 'Where can I use it, and do I tag it every time?',
        content: (
            <>
                <p>
                    It works in any channel you invite it to, in a DM, and in a group DM you start with the bot in it.
                    In a DM, just type. Everywhere else, tag <code>@PostHog</code> to start a thread.
                </p>
                <p>
                    Once a thread is going, the bot can pick up replies that don't tag it. You choose how in the App
                    Home tab: ask first (the default), pick up automatically, or leave them alone. See{' '}
                    <FaqLink to="/docs/slack#reply-without-tagging-the-bot">reply without tagging the bot</FaqLink>.
                </p>
                <p>
                    It can also offer to answer a question you post in a channel without a tag, when your PostHog data
                    can answer it. See <FaqLink to="/docs/slack#questions-in-channels">questions in channels</FaqLink>.
                </p>
            </>
        ),
    },
    {
        trigger: 'Can my team work in the same thread?',
        content: (
            <p>
                Yes. By default, anyone who tags <code>@PostHog</code> in your thread can join. They can steer the run,
                add context, or answer its questions. To change who can join, open the App Home tab: ask once per
                thread, ask for each person, or ignore them.
            </p>
        ),
    },
    {
        trigger: 'How does the bot authenticate me, and who gets credit for PRs?',
        content: (
            <>
                <p>
                    The bot matches your Slack email to your PostHog account. If the emails differ, it sends you a
                    button, visible only to you, to link them. Each message then runs as the person who sent it, with
                    their own access, so a teammate can't borrow yours. The agent logs show who sent each message.
                </p>
                <p>
                    For PRs, connect your{' '}
                    <FaqLink to="/docs/slack/setup#connect-your-personal-github">personal GitHub</FaqLink> and your
                    commits carry your name. Each commit has a <code>Task-Id</code> that traces back to the thread.
                    Without it, the PR comes from the PostHog bot, through the project's GitHub App installation.
                </p>
            </>
        ),
    },
    {
        trigger: 'Can I use it in shared channels, and what can it see?',
        content: (
            <>
                <p>
                    It reads the thread it's in and the files in that thread, your PostHog data, and the repos you
                    connect. It can't read channels it isn't in.
                </p>
                <p>
                    In a Slack Connect channel, a member of your PostHog organization approves the bot once before it
                    answers. It never unfurls links there.
                </p>
                <p>
                    The full list of scopes is on the{' '}
                    <Link to={SLACK_MARKETPLACE_URL} external className={faqLinkClass}>
                        Slack marketplace listing
                    </Link>
                    . Our <FaqLink to="/privacy">privacy policy</FaqLink> covers how we collect, manage, and store your
                    data.
                </p>
            </>
        ),
    },
    {
        trigger: 'Can I change the model, the project, or how it replies?',
        content: (
            <p>
                Yes. Name a model in your message ("use fable"), or a project in the first message of a thread. Or set
                defaults in the App Home tab. For reply style, use{' '}
                <FaqLink to="/docs/tasks/agent-instructions">agent instructions</FaqLink>, which you edit in PostHog.
            </p>
        ),
    },
    {
        trigger: 'How much does it cost to use the PostHog Slack app?',
        content: (
            <p>
                The app is free to install, with no subscription. The agent uses PostHog AI credits, the same as PostHog
                AI in the app, and each reply's footer shows what the thread has cost so far. Subscriptions, link
                previews, ratings, and <code>/posthog</code> commands are free. See{' '}
                <FaqLink to="/docs/slack/pricing">Slack app pricing</FaqLink>.
            </p>
        ),
    },
    {
        trigger: 'What are the current limitations?',
        content: (
            <ul className="list-disc space-y-1 pl-5 [&_li]:!list-disc">
                <li>The sandbox lasts about six hours. After it recycles, prompt it again.</li>
                <li>Each teammate connects their own GitHub once to open PRs as themselves.</li>
                <li>
                    Files: up to 15 per message, 30 MB each (10 MB for PDFs). The bot tells you which files it skips.
                </li>
                <li>Unusual phrasing can make it miss a model or project you name. The run then uses your defaults.</li>
                <li>It's in beta, so its behavior can change between builds.</li>
            </ul>
        ),
    },
]

const heroBullets = [
    'Ask why a number moved, and get the answer in the thread',
    'Turn a bug report into a draft PR',
    'Get a brief on a customer before the call',
]

const SignupCTAs = () => (
    <div className="flex flex-wrap items-center gap-3">
        <CallToAction to={CONNECT_SLACK_URL} size="sm" externalNoIcon>
            Connect Slack
        </CallToAction>
        <span className="text-sm text-secondary">
            Not using PostHog?{' '}
            <Link to="https://app.posthog.com/signup" external>
                Sign up
            </Link>
        </span>
    </div>
)

const HeroSection = () => (
    <section className="w-full border-b border-primary pb-8">
        <div className="grid items-start gap-6 @3xl/reader-content:grid-cols-2 @3xl/reader-content:gap-10">
            <div className="order-2 min-w-0 @3xl/reader-content:order-1">
                {/* Cross out the first @, then highlight the second – "not this, this".
                    show is set explicitly because the scroll trigger's -15% rootMargin never
                    fires for a heading this close to the top of the pane. */}
                <h1 className="!mt-0 mb-4 text-3xl font-bold leading-tight @xl/reader-content:text-4xl">
                    Don't{' '}
                    <RoughAnnotation type="strike-through" color="#F54E00" strokeWidth={2} delay={300} show>
                        @ <em>me</em>
                    </RoughAnnotation>
                    ,{' '}
                    <RoughAnnotation
                        type="highlight"
                        color="rgba(48, 164, 108, 0.2)"
                        strokeWidth={1}
                        padding={2}
                        delay={1100}
                        show
                    >
                        @PostHog
                    </RoughAnnotation>
                </h1>
                <p className="mt-0 mb-4 text-lg">
                    All the PostHog you already use, plus a coding agent that lives in your Slack. Ask about your
                    product data, debug issues, and ship PRs without leaving the thread.
                </p>
                <ul className="mb-6 list-none space-y-0.5 p-0 text-base">
                    {heroBullets.map((item) => (
                        <li key={item} className="flex items-start gap-1.5">
                            <IconCheck className="mt-0.5 size-4 shrink-0 text-green" />
                            {item}
                        </li>
                    ))}
                </ul>
                <SignupCTAs />
            </div>
            <figure className="order-1 m-0 w-full min-w-0 self-center @3xl/reader-content:order-2">
                <div className="overflow-hidden rounded-md shadow-xl">
                    <WistiaEmbed mediaId="ifyltgbxid" />
                </div>
            </figure>
        </div>
    </section>
)

const jobCards: {
    Icon: IconComponent
    color: string
    tileColor: string
    title: React.ReactNode
    badge: string
    description: string
    examples: string[]
    link: { label: string; to: string }
}[] = [
    {
        Icon: IconGraph,
        color: 'text-blue',
        tileColor: 'bg-blue/10',
        title: (
            <>
                Ask <Highlight>analytics questions</Highlight>
            </>
        ),
        badge: 'No repo needed',
        description:
            'Dig into your data. It reads your insights, SQL, replays, errors, and flags, then answers in the thread with charts.',
        examples: [
            'why did EU signups drop last week?',
            'which channels brought in the most activated users this month?',
            'brief me on Acme before my call',
        ],
        link: { label: 'Ask about your product data', to: '/docs/slack#ask-about-your-product-data' },
    },
    {
        Icon: IconPullRequest,
        color: 'text-green',
        tileColor: 'bg-green/10',
        title: (
            <>
                Ship <Highlight red>code</Highlight>
            </>
        ),
        badge: 'Sandboxed',
        description:
            'Hand it the fix. It plans in a sandbox, edits files, runs your checks, and opens a draft PR. Then it babysits CI and tells the thread when the PR merges.',
        examples: [
            'fix the flaky billing CI job',
            'add a feature flag to the new checkout page',
            'resolve the merge conflicts on #1234',
        ],
        link: { label: 'Start a task', to: '/docs/slack#start-a-task' },
    },
]

const TwoJobsSection = () => (
    <section id="two-jobs" className="my-12">
        <header className="mb-6">
            <h2 className={h2ClassName}>
                One hog, <Highlight>two jobs</Highlight>
            </h2>
            <p className="mb-0 mt-3 text-base text-secondary">
                Use it two ways. Ask analytics questions and dig into your data, or hand it code to ship. It decides
                from your message.
            </p>
        </header>
        <div className="grid gap-4 @2xl/reader-content:grid-cols-2">
            {jobCards.map(({ Icon, color, tileColor, title, badge, description, examples, link }) => (
                <div key={link.to} className="flex min-w-0 flex-col rounded border border-primary bg-primary p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="m-0 flex items-center gap-3 text-xl font-bold leading-tight">
                            <span className={`flex size-10 shrink-0 items-center justify-center rounded ${tileColor}`}>
                                <Icon className={`size-6 ${color}`} />
                            </span>
                            <span>{title}</span>
                        </h3>
                        <Badge>{badge}</Badge>
                    </div>
                    <p className="mb-3 mt-2 text-sm text-secondary">{description}</p>
                    <ul className="m-0 mb-4 list-none space-y-1.5 p-0 text-sm">
                        {examples.map((example) => (
                            <li key={example}>
                                <Mention /> {example}
                            </li>
                        ))}
                    </ul>
                    <CardLink {...link} />
                </div>
            ))}
        </div>
    </section>
)

// Easter egg: say please and the bot adds an orange heart to its eyes reaction. Sways softly on hover.
const PoliteHog = ({ className = '' }: { className?: string }) => (
    <div className={`group ${className}`}>
        <Tooltip
            delay={0}
            side="right"
            className="block"
            contentClassName="whitespace-nowrap"
            trigger={
                <CloudinaryImage
                    src={ART.please.src}
                    alt={ART.please.alt}
                    loading="lazy"
                    width={240}
                    imgClassName="w-full origin-bottom group-hover:motion-safe:animate-[polite-hog-sway_2.5s_ease-in-out_infinite]"
                />
            }
        >
            Say please in your prompt for some mutual appreciation.
        </Tooltip>
        <style>{`
            @keyframes polite-hog-sway {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                25% { transform: translateY(-2px) rotate(-3deg); }
                75% { transform: translateY(-2px) rotate(3deg); }
            }
        `}</style>
    </div>
)

const WorkspaceSection = () => (
    <section id="workspace" className="my-12">
        <header className="mb-4 @3xl/reader-content:mb-6">
            <h2 className={h2ClassName}>
                Real things we're prompting that <Highlight>turn into PRs</Highlight>
            </h2>
            <p className="mb-0 mt-3 text-base text-secondary @lg/reader-content:hidden">
                Actual things happening in the PostHog Slack workspace.
            </p>
        </header>
        <ThreadDemo />
    </section>
)

const StartersSection = () => (
    <section id="starters" className="my-12">
        <header className="mb-6">
            <h2 className={h2ClassName}>
                Four ways to <Highlight red>start a thread</Highlight>
            </h2>
        </header>
        <ThreadStarters />
    </section>
)

const repliesCardClassName =
    '@container flex min-w-0 flex-col overflow-hidden rounded border border-primary bg-primary p-4 @xl:p-6'

// Laid out like "Your product data wherever you work" on /ai: a wide card, a narrow card, then the settings
const RepliesSection = () => (
    <section id="replies" className="my-12">
        <header className="mb-6">
            <h2 className={h2ClassName}>
                If you can prompt, you can <Highlight>PostHog</Highlight>
            </h2>
        </header>
        <div className="grid gap-4 @3xl/reader-content:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className={repliesCardClassName}>
                <div className="flow-root">
                    <PoliteHog className="float-right mb-3 ml-4 w-20 @sm:w-24" />
                    <h3 className="mb-3 mt-0 text-2xl font-bold">
                        Hands you the <Highlight>finished thing</Highlight>
                    </h3>
                    <p className="mb-3 mt-0 text-sm text-secondary">
                        Ask for a report, a spreadsheet, or a plan, and the file lands in the thread.
                    </p>
                </div>
                <FeatureChips items={sendsBack} />
                <CardFooter
                    title="Send it screenshots and logs"
                    link={{ label: 'Attachments', to: '/docs/slack#attachments-files-and-canvases' }}
                >
                    Attach a screenshot, PDF, log, or CSV to your message, and the agent reads it. Paste the broken
                    page, then say what to fix.
                </CardFooter>
            </div>
            <div className={repliesCardClassName}>
                <h3 className="mb-3 mt-0 text-2xl font-bold">
                    Reaches <Highlight red>past PostHog</Highlight>
                </h3>
                <p className="mb-3 mt-0 text-sm text-secondary">
                    Your product data is the start. It also uses the tools and context you give it.
                </p>
                <FeatureChips items={reachesPast} />
            </div>
        </div>
        <div className="@container mt-4 rounded border border-primary bg-primary p-4 @xl/reader-content:px-6">
            <div>
                <div className="min-w-0">
                    <h3 className="m-0 text-base font-bold">Set it once</h3>
                    <p className="mb-3 mt-0.5 text-sm text-secondary">
                        Set your defaults in the Home tab. Say something different in a message, and the message wins.
                    </p>
                    <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-1.5 p-0 @sm:grid-cols-2 @2xl:grid-cols-3">
                        {settings.map(({ Icon, color, name, to }) => (
                            <li key={name}>
                                <Link
                                    to={to}
                                    state={{ newWindow: true }}
                                    className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                                >
                                    <Icon className={`size-4 shrink-0 ${color}`} />
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
)

// Like "Your agent gets the full spread" on /mcp: a box with the art beside it, then three cards
const JobsSection = () => (
    <section id="jobs" className="my-12">
        <div className="@container rounded border border-primary bg-primary p-6 @xl:p-8">
            <div className="grid items-center gap-x-10 gap-y-8 @3xl:grid-cols-[minmax(0,1fr)_12rem]">
                <figure className="m-0 flex flex-col items-center @3xl:col-start-2 @3xl:row-start-1">
                    <CloudinaryImage
                        src={ART.jobs.src}
                        alt={ART.jobs.alt}
                        loading="lazy"
                        width={640}
                        className="w-40 @3xl:w-full"
                        imgClassName="w-full"
                    />
                    <figcaption className="mt-3 text-balance text-center text-sm text-secondary">
                        PostHog loves Slack (and Slack{' '}
                        <Link
                            to="https://slack.com/customer-stories/posthog-story"
                            external
                            className="font-semibold underline"
                        >
                            loves us back
                        </Link>
                        ).
                    </figcaption>
                </figure>
                <div className="min-w-0 @3xl:col-start-1 @3xl:row-start-1">
                    <h2 className="mb-2 mt-0 text-3xl font-bold leading-tight">
                        <Highlight red>Everyone</Highlight> can ship now
                    </h2>
                    <p className="mb-6 mt-0 text-base text-secondary">
                        It's a Slack message, so you don't need to be an engineer to be in{' '}
                        <Link
                            to="/blog/everything-is-build-mode"
                            state={{ newWindow: true }}
                            className="font-semibold underline"
                        >
                            build mode
                        </Link>
                        .
                    </p>
                    <FeatureRows items={jobs} />
                </div>
            </div>
        </div>
        <div className="mt-4 grid gap-4 @3xl/reader-content:grid-cols-3">
            {moreCards.map(({ title, Icon, color, description, link }) => (
                <div key={title} className="flex min-w-0 flex-col rounded-md border border-primary bg-primary p-5">
                    <h3 className="m-0 flex items-center gap-2 text-lg font-bold leading-tight">
                        <Icon className={`size-6 shrink-0 ${color}`} />
                        {title}
                    </h3>
                    <p className="mb-4 mt-2 text-sm text-secondary">{description}</p>
                    <CardLink {...link} />
                </div>
            ))}
        </div>
    </section>
)

// Like `AIEngineering` on /ai: a box with the art beside it, and only each name is a link
const FightersSection = () => {
    const products = useProduct()
    if (!Array.isArray(products)) return null
    return (
        <section
            id="fighters"
            className="my-12 rounded-md border border-blue bg-blue/10 p-5 shadow-xl @xl/reader-content:p-7"
        >
            <div className="grid items-center gap-6 @3xl/reader-content:grid-cols-[minmax(0,1fr)_20rem]">
                <div className="min-w-0">
                    <header className="mb-5">
                        <h2 className={`${h2ClassName} flex items-center gap-3`}>
                            <StickerRobot className="size-8 shrink-0 -rotate-6" />
                            Choose your fighter
                        </h2>
                    </header>
                    <ul className="m-0 flex list-none flex-col gap-4 p-0">
                        {fighters.map(({ handle, product: inlineProduct, to, description }) => {
                            const product = inlineProduct ?? products.find((item) => item.handle === handle)
                            if (!product) return null
                            return (
                                <li key={to} className="border-t border-blue/30 pt-4 first:border-t-0 first:pt-0">
                                    <h3 className="m-0 flex items-center gap-2 text-base font-bold">
                                        <ProductIcon product={product} className="size-5 shrink-0" />
                                        <Link to={to} state={{ newWindow: true }} className="hover:underline">
                                            {product.name} →
                                        </Link>
                                    </h3>
                                    <p className="mb-0 mt-1 text-sm text-secondary">{description}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <figure className="m-0 flex flex-col items-center">
                    <CloudinaryImage
                        src={ART.fighters.src}
                        alt={ART.fighters.alt}
                        loading="lazy"
                        width={540}
                        className="w-48 @3xl/reader-content:w-full @3xl/reader-content:max-w-72"
                        imgClassName="mx-auto w-full"
                    />
                    <figcaption className="mt-3 text-center text-sm text-secondary">
                        It's the same agent on the same PostHog MCP.
                    </figcaption>
                </figure>
            </div>
        </section>
    )
}

const TrySection = () => (
    <section
        id="try"
        className="my-12 rounded-md border border-purple bg-purple/10 p-5 shadow-xl @md/reader-content:p-7"
    >
        <div className="grid items-center gap-6 @lg/reader-content:grid-cols-[180px_minmax(0,1fr)]">
            <CloudinaryImage
                src={ART.tryIt.src}
                alt={ART.tryIt.alt}
                loading="lazy"
                width={360}
                className="hidden @lg/reader-content:block"
                imgClassName="mx-auto max-h-56 w-auto"
            />
            <div>
                <h2 className="mt-0 mb-3 text-2xl font-bold @xl/reader-content:text-3xl">
                    <Highlight>@PostHog</Highlight> from anywhere (literally)
                </h2>
                <p className="mt-0 mb-4">
                    The PostHog Slack app is free to install, and free to uninstall when you realize this means you can
                    ship production code from your phone (which, frankly, might be too much power for anyone).
                </p>
                <SignupCTAs />
            </div>
        </div>
    </section>
)

const FaqSection = () => (
    <section id="faq" className="my-12">
        <SectionHeader>
            <h2 className={h2ClassName}>Frequently @sked questions</h2>
        </SectionHeader>
        <Accordion
            type="single"
            triggerClassName="!px-3 !py-2"
            contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
            items={faqItems}
        />
    </section>
)

const seoDescription =
    'Tag @PostHog in any Slack thread to answer a data question, ship a fix, or write the report – without leaving the conversation.'

export default function SlackAppPage(): JSX.Element {
    return (
        <>
            <SEO
                title="PostHog Slack app"
                description={seoDescription}
                image="/images/og/default.png"
                structuredData={buildProductStructuredData({
                    name: 'PostHog Slack app',
                    description: seoDescription,
                    slug: 'slack-app',
                })}
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                hideMobileTableOfContents
                showQuestions={false}
                title="posthog-slack-app.md"
                hideTitle
            >
                <div className="@container/reader-content not-prose max-w-5xl mx-auto font-rounded">
                    <HeroSection />
                    <TwoJobsSection />
                    <StartersSection />
                    <RepliesSection />
                    <JobsSection />
                    <hr className="my-0 border-0 border-t border-primary" />
                    <WorkspaceSection />
                    <TrySection />
                    <FaqSection />
                    <FightersSection />
                </div>
            </ReaderView>
        </>
    )
}
