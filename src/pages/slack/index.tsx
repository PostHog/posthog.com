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
import { StickerServers } from 'components/Stickers/Stickers'
import { LOGOS } from 'constants/logos'
import useProduct from 'hooks/useProduct'
import {
    IconBell,
    IconBolt,
    IconCalendar,
    IconCheck,
    IconCode,
    IconComment,
    IconCursorClick,
    IconDocument,
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
    IconThoughtBubble,
    IconWrench,
} from '@posthog/icons'

const CONNECT_SLACK_URL = 'https://app.posthog.com/integrations/slack'
const SLACK_MARKETPLACE_URL = 'https://slack.com/marketplace/A03M3FN0RSQ-posthog'

// Stand-in art until the commissioned Slack app illustrations arrive. Swap an entry here to replace one.
const ART = {
    files: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/hoggie_mail_48daf2f4b4.png',
        alt: 'A hedgehog mail carrier putting a letter in a mailbox',
    },
    settings: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/hogue_701c84c736.png',
        alt: 'A hedgehog on the cover of Hogue magazine, under the headline "Prêt-à-prompter: this season\'s looks for every model"',
    },
    jobs: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/multiplayer_hogs_41ec7dc243.png',
        alt: '',
    },
    fighters: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/9000_hogzilla_359a450fb3.png',
        alt: '',
    },
    tryIt: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/newspaper_hog_f0dd8cda48.png',
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

// Pairs of features divided by rules, like the chips on /mcp
const FeatureRows = ({ items }: { items: Feature[] }) => {
    const rows = Array.from({ length: Math.ceil(items.length / 2) }, (_, i) => items.slice(i * 2, i * 2 + 2))
    return (
        <div className="@container">
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
        </div>
    )
}

const sendsBack: Feature[] = [
    {
        Icon: IconDocument,
        color: 'text-blue',
        name: 'Canvases and files',
        description: 'Ask for a report and get a Slack canvas. Ask for the numbers and get a spreadsheet, CSV, or PDF.',
    },
    {
        Icon: IconGraph,
        color: 'text-purple',
        name: 'Charts in link previews',
        description:
            'Paste a link to an insight (saved or not) or an experiment, and the preview shows the chart. Nobody has to screenshot it.',
    },
    {
        Icon: IconComment,
        color: 'text-green',
        name: 'One-click replies',
        description: 'When an answer needs a decision, it adds the likely replies as buttons. One click sends yours.',
    },
    {
        Icon: IconBolt,
        color: 'text-red',
        name: 'The cost, in the footer',
        description: "Each reply shows what the thread has cost so far. You'll know before finance does.",
    },
]

const makeItYours: Feature[] = [
    {
        Icon: IconThoughtBubble,
        color: 'text-purple',
        name: 'Agent instructions',
        description: (
            <>
                Project instructions for everyone, plus your own: reply format, units, and where to look for context.{' '}
                <Link
                    to="/docs/slack#customize-replies"
                    state={{ newWindow: true }}
                    className="font-semibold underline"
                >
                    How it works
                </Link>
            </>
        ),
    },
    {
        Icon: IconSparkles,
        color: 'text-blue',
        name: 'Automatic model choice',
        description:
            'Turn it on, and it picks the cheapest model that can do the job. Name a model to override it, even halfway through a thread.',
    },
    {
        Icon: IconHome,
        color: 'text-green',
        name: 'Name the project',
        description: 'Name a project in your message, or set a default in the Home tab.',
    },
    {
        Icon: IconLock,
        color: 'text-red',
        name: 'Your thread, your guest list',
        description: 'You decide who else can talk to the bot in threads you start.',
    },
]

type StackCard = {
    title: string
    Icon: IconComponent
    color: string
    description: string
    link?: { label: string; to: string }
}

const stackCards: StackCard[] = [
    {
        title: 'Your MCP servers',
        Icon: IconPlug,
        color: 'text-blue',
        description:
            'It uses the MCP servers you connected, like Linear and Notion, with your own access. File the ticket or read the spec from the thread.',
    },
    // Confirm scheduled reports with the Slack app team before this card ships
    {
        title: 'Scheduled reports',
        Icon: IconCalendar,
        color: 'text-green',
        description:
            'Send an insight or dashboard to a channel on a schedule. When a number looks off, ask @PostHog why in its thread.',
        link: { label: 'Set up a subscription', to: '/docs/product-analytics/subscriptions' },
    },
    {
        title: 'Event alerts',
        Icon: IconBell,
        color: 'text-yellow',
        description: 'Post a message to a channel every time a PostHog event matches your filter.',
        link: { label: 'Slack destination', to: '/docs/data-pipelines/destinations/slack' },
    },
]

const jobs: { Icon: IconComponent; color: string; title: string; prompt: string }[] = [
    {
        Icon: IconWrench,
        color: 'text-yellow',
        title: 'Do the chores nobody claims',
        prompt: 'fix the flaky billing CI job, then resolve the merge conflicts on #1234',
    },
    {
        Icon: IconFlag,
        color: 'text-blue',
        title: 'Ship it behind a flag',
        prompt: 'put the new onboarding flow behind a flag and roll it out to 25% of users',
    },
    {
        Icon: IconCursorClick,
        color: 'text-salmon',
        title: 'Fix the typo before the CEO sees it',
        prompt: 'fix the typo on the pricing page and swap the screenshot on /customers',
    },
    {
        Icon: IconSupport,
        color: 'text-green',
        title: 'Walk into the renewal call prepared',
        prompt: "brief me on Acme before tomorrow's call",
    },
    {
        Icon: IconTarget,
        color: 'text-purple',
        title: 'Read the interview pile',
        prompt: 'find the themes in these five interview transcripts',
    },
    {
        Icon: IconCode,
        color: 'text-brown dark:text-brown-dark',
        title: 'Build it in the thread they asked in',
        prompt: 'draft a PR for the CSV export three customers asked for',
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
            "In the PostHog app. Explore your data and build dashboards without leaving the tab. It knows which chart you're looking at.",
    },
    {
        product: { name: 'Slack app', Icon: SlackLogo, color: 'primary' },
        to: '/docs/slack',
        description:
            'In your threads and DMs. Ask in the conversation where the question came up. Self-driving reports land here too, so reply "fix" to get a PR.',
    },
    {
        product: { name: 'Your terminal or agent', Icon: IconTerminal, color: 'purple' },
        to: '/mcp',
        description:
            'In Claude Code, Cursor, Codex, and other agents, through the PostHog MCP. It checks how often an endpoint is hit before you rewrite it.',
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
        trigger: 'Do I need PostHog Desktop or GitHub?',
        content: (
            <>
                <p>
                    You don't need <FaqLink to="/desktop">PostHog Desktop</FaqLink>. It's the same agent, and the Slack
                    app is the way in for people who'd rather work from a thread.
                </p>
                <p>
                    Data questions don't need GitHub or a repo. To ship code, connect your{' '}
                    <Link
                        to="https://app.posthog.com/settings/user-personal-integrations"
                        external
                        className={faqLinkClass}
                    >
                        personal GitHub
                    </Link>
                    , and the agent opens PRs as you. Without it, a task can use your project's GitHub App installation,
                    and the PR comes from the PostHog bot.
                </p>
            </>
        ),
    },
    {
        trigger: 'How does it know whether to answer or write code?',
        content: (
            <p>
                You don't pick a mode. If the request needs code, the agent picks a repo: the one you name, your only
                one, or the best match for your <FaqLink to="/docs/slack/commands#routing-rules">routing rules</FaqLink>
                . If it can't pick, it shows a repo picker in the thread, with a <strong>No repo needed</strong> option.
                If the request doesn't need code, it answers from your PostHog data.
            </p>
        ),
    },
    {
        trigger: 'What happens after I hit send?',
        content: (
            <ol className="list-decimal space-y-1 pl-5 [&_li]:!list-decimal">
                <li>It adds an eyes reaction to your message, so you can see it's on it.</li>
                <li>It reads the thread, including the files and screenshots in it.</li>
                <li>It posts its plan in the thread and checks off each step, with a link to the agent logs.</li>
                <li>
                    For code, it works in a sandbox, opens a draft PR, and posts a <strong>Pull request opened</strong>{' '}
                    card. It watches CI and handles review comments.
                </li>
                <li>It posts a summary when it's done, and tells the thread when the PR merges or closes.</li>
                <li>
                    If a run fails, reply <code>retry</code> in the thread to continue from the last checkpoint.
                </li>
            </ol>
        ),
    },
    {
        trigger: 'Where can I use it, and do I tag it every time?',
        content: (
            <>
                <p>
                    In any channel you invite it to, in a DM, and in a group DM that you start with the bot in it. In a
                    DM, you don't need to tag it.
                </p>
                <p>
                    In a channel, tag it to start a thread. After that, it can pick up untagged replies. The person who
                    started the thread chooses how in the App Home tab: <strong>Ask them first</strong> (the default),{' '}
                    <strong>Pick them up automatically</strong>, or <strong>Leave them alone</strong>. It can also offer
                    to answer a question you post without a tag, when your PostHog data can answer it. See{' '}
                    <FaqLink to="/docs/slack#questions-in-channels">questions in channels</FaqLink>.
                </p>
            </>
        ),
    },
    {
        trigger: 'Can my team join a thread, and whose name goes on the PR?',
        content: (
            <>
                <p>
                    Yes. By default, anyone who tags <code>@PostHog</code> in your thread can join. To change that, open
                    the App Home tab: ask once per thread, ask for each person, or ignore them.
                </p>
                <p>
                    Each turn runs as the person who sent it. With a personal GitHub connection, their commits carry
                    their name. If the run started on the project's GitHub App installation, commits and PRs come from
                    the PostHog bot. Branches start with <code>posthog/</code>, and each commit has a{' '}
                    <code>Task-Id</code>, so you can trace it back to the thread.
                </p>
            </>
        ),
    },
    {
        trigger: 'Can I change the model, the project, or how it replies?',
        content: (
            <>
                <p>
                    Yes. Tasks run on Claude Opus 5.5 by default. Name another model in your message ("use fable"), or
                    turn on auto model choice in the App Home tab, and it picks the cheapest model likely to get the job
                    right. A follow-up can switch models, but only in the same family (Claude or Codex).
                </p>
                <p>
                    Name a project in the first message of a thread, or set a default in the App Home tab. A thread
                    stays in one project.
                </p>
                <p>
                    For the reply style, use <FaqLink to="/docs/tasks/agent-instructions">agent instructions</FaqLink>.
                    Project admins set them for everyone, and each person can add their own. You edit them in PostHog,
                    not in Slack.
                </p>
            </>
        ),
    },
    {
        trigger: 'What does a thread cost?',
        content: (
            <p>
                The Slack app has no subscription of its own. The agent uses PostHog AI credits, the same as PostHog AI
                in the app, and the footer of each reply shows what the thread has cost so far. Your PostHog AI billing
                limit covers both. Subscriptions, link previews, ratings, and <code>/posthog</code> commands are free.
                See <FaqLink to="/docs/slack/pricing">Slack app pricing</FaqLink>.
            </p>
        ),
    },
    {
        trigger: 'What can the bot see?',
        content: (
            <>
                <p>
                    The thread it's in and the files in that thread, your PostHog data, and the repos you connect. It
                    can't read channels it isn't in. To give it a channel's history, sync it with the{' '}
                    <FaqLink to="/docs/data-pipelines/sources/slack">Slack source</FaqLink>.
                </p>
                <p>
                    In a Slack Connect channel, a member of your PostHog organization must approve the bot once before
                    it answers, and it never unfurls links there.
                </p>
                <p>
                    Its scopes let it read mentions and the history of channels it's in, post messages and reactions,
                    read and upload files, write canvases, and match Slack users to PostHog accounts. The full list is
                    on the{' '}
                    <Link to={SLACK_MARKETPLACE_URL} external className={faqLinkClass}>
                        Slack marketplace listing
                    </Link>
                    .
                </p>
            </>
        ),
    },
    {
        trigger: 'What are the current limitations?',
        content: (
            <ul className="list-disc space-y-1 pl-5 [&_li]:!list-disc">
                <li>The sandbox lasts about six hours. After it recycles, prompt it again.</li>
                <li>
                    Each teammate connects their own GitHub once to open PRs as themselves. First-time setup has rough
                    edges.
                </li>
                <li>
                    Files: up to 15 per message, 30 MB each (10 MB for PDFs), plus 15 from earlier in the thread, with
                    50 MB in total per turn. The bot tells you which files it skipped.
                </li>
                <li>
                    An LLM reads the model or project you name, so an unusual phrasing can be missed. Then the run uses
                    your defaults.
                </li>
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
    title: React.ReactNode
    badge: string
    description: string
    examples: string[]
    link: { label: string; to: string }
}[] = [
    {
        Icon: IconGraph,
        color: 'text-blue',
        title: (
            <>
                Ask about your <Highlight>data</Highlight>
            </>
        ),
        badge: 'No repo needed',
        description:
            'The same agent as PostHog AI. It reads your insights, SQL, replays, errors, and flags, then answers in the thread with charts.',
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
        title: (
            <>
                Hand it the <Highlight red>fix</Highlight>
            </>
        ),
        badge: 'Sandboxed',
        description:
            'It plans in a sandbox, edits files, runs your checks, and opens a draft PR. Then it babysits CI and tells the thread when the PR merges.',
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
                One agent reads your product data and writes your code. Ask why EU signups dropped, then have it open
                the PR that fixes it.
            </p>
        </header>
        <div className="grid gap-4 @2xl/reader-content:grid-cols-2">
            {jobCards.map(({ Icon, color, title, badge, description, examples, link }) => (
                <div key={link.to} className="flex min-w-0 flex-col rounded border border-primary bg-primary p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="m-0 flex items-center gap-2 text-xl font-bold leading-tight">
                            <Icon className={`size-6 shrink-0 ${color}`} />
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

const WorkspaceSection = () => (
    <section id="workspace" className="my-12">
        <header className="mb-4 @3xl/reader-content:mb-6">
            <h2 className={h2ClassName}>
                Real things we're prompting that <Highlight>turn into PRs</Highlight>
            </h2>
            <p className="mb-0 mt-3 text-base text-secondary">
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

const SendsBackSection = () => (
    <section id="sends-back" className="my-12">
        <div className="@container rounded border border-primary bg-primary p-6 @xl:p-8">
            <div className="grid items-center gap-x-10 gap-y-8 @3xl:grid-cols-[minmax(0,1fr)_16rem]">
                <figure className="m-0 flex flex-col items-center @3xl:col-start-2 @3xl:row-start-1">
                    <CloudinaryImage
                        src={ART.files.src}
                        alt={ART.files.alt}
                        loading="lazy"
                        width={640}
                        className="w-48 @xl:w-56 @3xl:w-full"
                        imgClassName="w-full"
                    />
                    <figcaption className="mt-3 text-balance text-center text-sm text-secondary">
                        Delivers canvases, spreadsheets, and the occasional bad news
                    </figcaption>
                </figure>
                <div className="min-w-0 @3xl:col-start-1 @3xl:row-start-1">
                    <h2 className="mb-6 mt-0 text-3xl font-bold leading-tight">
                        It replies in more than <Highlight red>text</Highlight>
                    </h2>
                    <FeatureRows items={sendsBack} />
                </div>
            </div>
        </div>
    </section>
)

const SettingsSection = () => (
    <section id="settings" className="my-12">
        <div className="grid items-center gap-8 @3xl/reader-content:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] @3xl/reader-content:gap-12">
            <figure className="m-0 flex flex-col items-center">
                <CloudinaryImage
                    src={ART.settings.src}
                    alt={ART.settings.alt}
                    loading="lazy"
                    width={640}
                    className="w-56 @xl/reader-content:w-64 @3xl/reader-content:w-full @3xl/reader-content:max-w-xs"
                    imgClassName="w-full -rotate-2 rounded-sm shadow-xl"
                />
                <figcaption className="mt-5 text-balance text-center text-sm text-secondary">
                    Opus is in this season. So are replies under 100 words.
                </figcaption>
            </figure>
            <div className="min-w-0">
                <h2 className={h2ClassName}>
                    Make it <Highlight>yours</Highlight>
                </h2>
                <p className="mb-6 mt-3 text-base text-secondary">
                    Set your defaults once in the Home tab. Say something different in a message, and the message wins.
                </p>
                <FeatureRows items={makeItYours} />
            </div>
        </div>
    </section>
)

const StackSection = () => (
    <section id="stack" className="my-12">
        <header>
            <h2 className="m-0 flex items-start gap-3 text-xl font-bold leading-tight tracking-tight @xl/reader-content:text-2xl">
                <StickerServers className="size-8 shrink-0 -rotate-6" />
                Plugs into the rest of your stack
            </h2>
        </header>
        <div className="mt-6 grid gap-4 @3xl/reader-content:grid-cols-3">
            {stackCards.map(({ title, Icon, color, description, link }) => (
                <div key={title} className="flex min-w-0 flex-col rounded-md border border-primary bg-primary p-5">
                    <h3 className="m-0 flex items-center gap-2 text-lg font-bold leading-tight">
                        <Icon className={`size-6 shrink-0 ${color}`} />
                        {title}
                    </h3>
                    <p className="mb-4 mt-2 text-sm text-secondary">{description}</p>
                    {link && <CardLink {...link} />}
                </div>
            ))}
        </div>
    </section>
)

const JobsSection = () => (
    <section id="jobs" className="my-12">
        <SectionHeader>
            <div className="relative">
                <h2 className={h2ClassName}>
                    <Highlight red>Everyone</Highlight> can ship now
                </h2>
                <p className="mb-0 mt-2 text-base text-secondary @3xl/reader-content:mr-44">
                    It's a Slack message, so you don't need to be an engineer. People in sales and marketing have merged
                    PRs to our main repo.
                </p>
                <CloudinaryImage
                    src={ART.jobs.src}
                    alt={ART.jobs.alt}
                    loading="lazy"
                    width={320}
                    imgClassName="pointer-events-none absolute -bottom-2 right-0 hidden w-40 @3xl/reader-content:block"
                />
            </div>
        </SectionHeader>
        <div className="grid gap-x-7 @xl/reader-content:grid-cols-2 [&>div:last-child]:border-b-0 @xl/reader-content:[&>div:nth-last-child(2)]:border-b-0">
            {jobs.map(({ Icon, color, title, prompt }) => (
                <div key={title} className="flex min-w-0 flex-col border-b border-primary py-5">
                    <div className="flex items-start gap-3">
                        <Icon className={`mt-0.5 size-6 shrink-0 ${color}`} />
                        <h3 className="m-0 text-lg font-bold">{title}</h3>
                    </div>
                    <p className="mb-0 mt-2 text-sm text-secondary">
                        <Mention /> {prompt}
                    </p>
                </div>
            ))}
        </div>
        <p className="mb-0 mt-4 text-sm text-secondary">
            <strong className="text-primary">Got a list of papercuts nobody fixes?</strong> Make a{' '}
            <code>#papercuts</code> channel, invite the bot, and tag <code>@PostHog</code> on each one.
        </p>
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
            <div className="grid items-center gap-6 @3xl/reader-content:grid-cols-[minmax(0,1fr)_16rem]">
                <div className="min-w-0">
                    <h2 className={h2ClassName}>
                        Choose your <Highlight>fighter</Highlight>
                    </h2>
                    <p className="mb-5 mt-3 max-w-2xl text-base text-secondary">
                        It's the same agent on the same PostHog MCP. Pick where you talk to it: the PostHog app, Slack,
                        or your terminal.
                    </p>
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
                <CloudinaryImage
                    src={ART.fighters.src}
                    alt={ART.fighters.alt}
                    loading="lazy"
                    width={480}
                    className="hidden @3xl/reader-content:block"
                    imgClassName="mx-auto w-full"
                />
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
                <h2 className="mt-0 mb-3 flex flex-wrap items-center gap-2 text-2xl font-bold @xl/reader-content:text-3xl">
                    Try it
                    <Badge>Beta</Badge>
                </h2>
                <p className="mt-0 mb-4">
                    The PostHog Slack app is free to install, and free to uninstall when you realize this means you can
                    ship production code from your phone (which, frankly, might be too much power for anyone).
                </p>
                <SignupCTAs />
                <p className="mt-3 mb-0 text-sm text-secondary">
                    Read our{' '}
                    <Link to="/privacy" className="font-bold">
                        privacy policy
                    </Link>{' '}
                    to see how the PostHog Slack app collects, manages, and stores your data.
                </p>
            </div>
        </div>
    </section>
)

const FaqSection = () => (
    <section id="faq" className="my-12">
        <SectionHeader>
            <h2 className={h2ClassName}>Questions before you @ it</h2>
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
                    <SendsBackSection />
                    <SettingsSection />
                    <StackSection />
                    <JobsSection />
                    <FightersSection />
                    <TrySection />
                    <FaqSection />
                    <WorkspaceSection />
                </div>
            </ReaderView>
        </>
    )
}
