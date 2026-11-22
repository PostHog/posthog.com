import React from 'react'
import { motion, useReducedMotion, type TargetAndTransition } from 'framer-motion'
import ReaderView from 'components/ReaderView'
import SEO, { buildProductStructuredData } from 'components/seo'
import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction'
import { Accordion } from 'components/RadixUI/Accordion'
import WistiaEmbed from 'components/WistiaEmbed'
import Link from 'components/Link'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import Highlight from 'components/MCPPage/Highlight'
import IconChipRows, { type IconItem as RowItem } from 'components/MCPPage/IconChipRows'
import IconChipRow, { type IconItem as ChipItem } from 'components/PostHogAI/IconChipRow'
import { SectionHeader } from 'components/Pricing/Test/Sections'
import ModelDemo from 'components/SlackApp/ModelDemo'
import ThreadDemo from 'components/SlackApp/ThreadDemo'
import ThreadStarters from 'components/SlackApp/ThreadStarters'
import { WORKSPACE_NOTE } from 'components/SlackApp/SlackWindow'
import ProductIcon from 'components/PostHogAI/ProductIcon'
import { StickerAi, StickerRobot } from 'components/Stickers/Stickers'
import Tooltip from 'components/RadixUI/Tooltip'
import { LOGOS } from 'constants/logos'
import useProduct from 'hooks/useProduct'
import {
    IconBrain,
    IconBug,
    IconCheck,
    IconCode,
    IconCursorClick,
    IconDownload,
    IconGithub,
    IconGraph,
    IconLightBulb,
    IconLock,
    IconPeople,
    IconPlug,
    IconReceipt,
    IconSparkles,
    IconSupport,
    IconTarget,
    IconTelescope,
    IconTerminal,
} from '@posthog/icons'

const CONNECT_SLACK_URL = 'https://app.posthog.com/integrations/slack'
const SLACK_MARKETPLACE_URL = 'https://slack.com/marketplace/A03M3FN0RSQ-posthog'

// Stand-in art. Swap an entry to replace an image.
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

const CardLink = ({ to, label }: { to: string; label: string }) => (
    <Link to={to} state={{ newWindow: true }} className="mt-auto text-sm font-semibold underline">
        {label} →
    </Link>
)

const codeFeatures: ChipItem[] = [
    {
        Icon: IconSparkles,
        color: 'text-blue',
        name: 'One-click follow-ups',
        description: 'Buttons under each answer suggest what to ask next. Click one, and it asks for you.',
    },
    {
        Icon: IconTarget,
        color: 'text-brown dark:text-brown-dark',
        name: 'Routing rules',
        description: 'Rules decide which repo gets each task. Add one with /posthog rules add.',
        to: '/docs/slack/commands#routing-rules',
    },
    {
        Icon: IconGithub,
        color: 'text-seagreen',
        name: 'Your name on the PR',
        description: "Connect your GitHub, and the commits and the PR carry your name (not a bot's).",
        to: '/docs/slack/setup#connect-your-personal-github',
    },
    {
        Icon: IconReceipt,
        color: 'text-orange',
        name: 'See the cost as you go',
        description: "Every reply's footer names the model and what the thread has cost so far.",
    },
]

const analyticsFeatures: ChipItem[] = [
    {
        Icon: IconGraph,
        color: 'text-sky-blue',
        name: 'Paste a link',
        description: 'Paste a PostHog link, and Slack unfurls it into a preview.',
    },
    {
        Icon: IconDownload,
        color: 'text-yellow',
        name: 'More than text',
        description:
            'Send it screenshots, PDFs, and logs. It replies with charts, HTML pages, Slack canvases, and PostHog notebooks.',
        to: '/docs/slack#attachments-files-and-canvases',
    },
    {
        Icon: IconLock,
        color: 'text-teal',
        name: 'Ask in private',
        description: "DM it the (embarrassing) prompts you don't want in a public channel.",
    },
    {
        Icon: IconPeople,
        color: 'text-purple',
        name: 'Who can join your threads',
        description:
            'Anyone who tags @PostHog in your thread can steer it. Want a guest list? Make people ask first, or keep it just you.',
        to: '/docs/slack#follow-ups-in-a-thread',
    },
]

const jobs: RowItem[] = [
    {
        Icon: IconBug,
        color: 'text-red',
        name: 'Clear the papercuts backlog',
        description: 'Tag the bot on tickets in a #papercuts channel.',
    },
    {
        Icon: IconCursorClick,
        color: 'text-salmon',
        name: 'Fix typos where you spot them',
        description: 'Tag the bot on the page with the typo.',
    },
    {
        Icon: IconGraph,
        color: 'text-blue',
        name: 'Find out why a metric moved',
        description: "Tag the bot in an alert's thread and ask why.",
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
        name: 'Read up on a customer before a call',
        description: 'DM the bot for an account brief.',
    },
    {
        Icon: IconLightBulb,
        color: 'text-purple',
        name: 'Turn interviews into themes',
        description: 'Attach transcripts and ask the bot for themes.',
    },
]

const moreCards: {
    title: string
    Icon: IconComponent
    color: string
    description: string
    link: { label: string; to: string }
}[] = [
    {
        title: 'Warehouse sources',
        Icon: IconPlug,
        color: 'text-blue',
        description:
            'Sync Stripe, Postgres, HubSpot, and hundreds more into PostHog. The bot queries them with your product data.',
        link: { label: 'Hook up your data', to: '/docs/data-pipelines/sources' },
    },
    {
        title: 'Business Knowledge',
        Icon: IconBrain,
        color: 'text-green',
        description:
            'Add your docs, pricing, and policies once. Ask about a refund or a plan limit in Slack, and the bot answers from them.',
        link: { label: 'Teach it your business', to: '/docs/business-knowledge' },
    },
    {
        title: 'Self-driving reports',
        Icon: IconTelescope,
        color: 'text-purple',
        description:
            'Point PostHog Self-driving at your errors and session replays. Reply to a report, and the bot opens a pull request.',
        link: { label: 'Let it find the work', to: '/self-driving' },
    },
]

const SlackLogo = ({ className }: { className?: string }) => <img src={LOGOS.slack} alt="" className={className} />

// A fighter without product data has an inline `product`
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

const heroBullets = ['Ask anything about your product data', "Fix what's broken", "Ship what's next"]

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
                {/* `show` is set because the scroll trigger never fires this close to the top of the pane */}
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
    title: React.ReactNode
    description: string
    link: { label: string; to: string }
}[] = [
    {
        title: (
            <>
                Ship <Highlight red>code</Highlight>
            </>
        ),
        description:
            'Got a bug to squash or a feature to build? Tag @PostHog. It reads the thread, writes the code, and opens a draft pull request. Keep iterating in the thread while it babysits CI.',
        link: { label: 'Start a task', to: '/docs/slack#start-a-task' },
    },
    {
        title: (
            <>
                Query <Highlight>data</Highlight>
            </>
        ),
        description:
            'Got a hunch? Tag @PostHog. It reads the thread, digs through your data, and brings back an answer everyone can see.',
        link: { label: 'Ask about your product data', to: '/docs/slack#ask-about-your-product-data' },
    },
]

const Job = ({ job }: { job: (typeof jobCards)[number] }) => (
    <>
        <h3 className="m-0 text-2xl font-bold leading-tight">{job.title}</h3>
        <p className="mb-4 mt-3 text-sm text-secondary">{job.description}</p>
        <Link to={job.link.to} state={{ newWindow: true }} className="self-start text-sm font-semibold underline">
            {job.link.label} →
        </Link>
    </>
)

const [codeJob, analyticsJob] = jobCards

// Easter egg: say please, and the bot adds a heart reaction
const SWAY: TargetAndTransition = {
    y: [0, -2, -2, 0],
    rotate: [0, -3, 3, 0],
    transition: { duration: 2.5, times: [0, 0.25, 0.75, 1], ease: 'easeInOut', repeat: Infinity },
}

const PoliteHog = ({ className = '' }: { className?: string }) => {
    const reducedMotion = useReducedMotion()
    return (
        <div className={className}>
            <Tooltip
                delay={0}
                side="left"
                className="block"
                contentClassName="whitespace-nowrap leading-snug"
                trigger={
                    <motion.div className="origin-bottom" whileHover={reducedMotion ? undefined : SWAY}>
                        <CloudinaryImage
                            src={ART.please.src}
                            alt={ART.please.alt}
                            loading="lazy"
                            width={240}
                            imgClassName="w-full"
                        />
                    </motion.div>
                }
            >
                Say please in your prompt
                <br />
                for some mutual appreciation.
            </Tooltip>
        </div>
    )
}

const WorkspaceSection = () => (
    <section id="workspace" className="my-12">
        <header className="mb-4 @3xl/reader-content:mb-6">
            <h2 className={h2ClassName}>
                Real things we're prompting that <Highlight>turn into PRs</Highlight>
            </h2>
            <p className="mb-0 mt-3 text-base text-secondary @lg/reader-content:hidden">{WORKSPACE_NOTE}</p>
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
    '@container flex min-w-0 flex-col overflow-hidden rounded-md border border-primary bg-primary p-5 @xl:p-7'

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
                    <Job job={codeJob} />
                </div>
                <div className="mt-5 border-t border-primary pt-5">
                    <IconChipRow items={codeFeatures} />
                </div>
                <div className="-mb-5 mt-auto pt-6 leading-[0] @xl:-mb-7">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/slack_app_ship_a_fix_82a4003b3a.png"
                        alt="Pull requests that the PostHog bot opened from Slack threads, shown as merged and draft on GitHub"
                        loading="lazy"
                        imgClassName="w-full rounded-t"
                    />
                </div>
            </div>
            <div className={repliesCardClassName}>
                <Job job={analyticsJob} />
                <div className="mt-5 border-t border-primary pt-5">
                    <IconChipRow items={analyticsFeatures} />
                </div>
            </div>
        </div>
        <div
            id="models"
            className="mt-8 grid items-center gap-6 rounded-md border border-blue bg-blue/10 p-5 shadow-xl @xl/reader-content:p-7 @2xl/reader-content:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] @3xl/reader-content:gap-8"
        >
            <div className="min-w-0">
                <h3 className="m-0 flex items-center gap-2 text-xl font-bold @xl/reader-content:text-2xl">
                    <StickerAi className="size-8 shrink-0 -rotate-6" />
                    We're not model monogamous
                </h3>
                <p className="mb-0 mt-3 text-sm text-secondary">
                    Every current frontier model from Anthropic and OpenAI, through one interface. Pick a default you
                    trust in the Home tab. Name another in a prompt if a task needs more horsepower.
                </p>
                <p className="mb-0 mt-3 text-sm text-secondary">
                    Or turn on <strong className="font-bold text-primary">auto model choice</strong>. A fast model reads
                    your first message and picks the cheapest model that should get it right.
                </p>
            </div>
            <div className="min-w-0">
                <ModelDemo />
            </div>
        </div>
    </section>
)

const JobsSection = () => (
    <section id="jobs" className="my-12">
        <div className="@container rounded-md border border-primary bg-primary p-5 @xl:p-7">
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
                    <h2 className={h2ClassName}>
                        <Highlight red>Everyone</Highlight> can ship now
                    </h2>
                    <p className="mb-6 mt-3 text-base text-secondary">
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
                    <IconChipRows items={jobs} />
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

const FightersSection = () => {
    const products = useProduct()
    return (
        <section
            id="fighters"
            className="my-12 rounded-md border border-blue bg-blue/10 p-5 shadow-xl @xl/reader-content:p-7"
        >
            <div className="grid items-center gap-6 @3xl/reader-content:grid-cols-[minmax(0,1fr)_20rem]">
                <div className="min-w-0">
                    <header className="mb-5">
                        <h2 className="m-0 flex items-center gap-2 text-xl font-bold @xl/reader-content:text-2xl">
                            <StickerRobot className="size-8 shrink-0 -rotate-6" />
                            Choose your fighter
                        </h2>
                    </header>
                    <ul className="m-0 flex list-none flex-col gap-4 p-0">
                        {fighters.map(({ handle, product: inlineProduct, to, description }) => {
                            const product =
                                inlineProduct ??
                                (Array.isArray(products) ? products.find((item) => item.handle === handle) : undefined)
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
        className="my-12 rounded-md border border-purple bg-purple/10 p-5 shadow-xl @xl/reader-content:p-7"
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
                    slug: 'slack',
                })}
            />
            <ReaderView hideLeftSidebar hideRightSidebar showQuestions={false} title="posthog-slack-app.md" hideTitle>
                <div className="@container/reader-content not-prose max-w-5xl mx-auto font-rounded">
                    <HeroSection />
                    <RepliesSection />
                    <StartersSection />
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
