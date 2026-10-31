import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ReaderView from 'components/ReaderView'
import SEO, { buildProductStructuredData } from 'components/seo'
import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction'
import { Accordion } from 'components/RadixUI/Accordion'
import TabbedCarousel from 'components/TabbedCarousel'
import type { TabbedCarouselTab } from 'components/TabbedCarousel'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import SlicedHog from 'components/SlicedHog'
import SlotMachineText from 'components/SlotMachineText'
import ContextDiagram from 'components/PostHogAI/ContextDiagram'
import ProductIcon from 'components/PostHogAI/ProductIcon'
import { SectionHeader } from 'components/Pricing/Test/Sections'
import {
    StickerCoffee,
    StickerMicroscope,
    StickerMindMap,
    StickerRobot,
    StickerServers,
} from 'components/Stickers/Stickers'
import Capabilities, { AIEngineering } from 'components/PostHogAI/Capabilities'
import Testimonials from 'components/PostHogAI/Testimonials'
import AskAnythingDemo from 'components/Home/HeroCarousel/AskAnythingDemo'
import { SlidePausedContext } from 'components/Home/HeroCarousel/autoAdvanceGate'
import AskMax from 'components/AskMax'
import MCPInstallCTA from 'components/MCPInstallCTA'
import PlatformInstall, { cliInstallSchema } from 'components/PlatformInstall'
import useProduct from 'hooks/useProduct'
import usePostHog from 'hooks/usePostHog'
import { LOGOS, type LogoKey } from 'constants/logos'
import {
    IconArrowRight,
    IconCheck,
    IconCursorClick,
    IconEye,
    IconNotification,
    IconPencil,
    IconSparkles,
    IconTelescope,
} from '@posthog/icons'
import posthogIcon from '../../images/posthog-icon-white.svg'

const SIGNUP_URL = 'https://app.posthog.com/signup'
const APP_AI_URL = 'https://app.posthog.com/ai'
const CONNECT_SLACK_URL = 'https://app.posthog.com/integrations/slack'

type IconComponent = React.ComponentType<{ className?: string }>

// Opens the PostHog AI side panel in the app with the prompt already filled in
const askUrl = (prompt: string) => `https://app.posthog.com/#panel=max:!${encodeURIComponent(prompt)}`

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="whitespace-nowrap bg-blue/10 p-0.5 font-bold text-blue">{children}</span>
)

type IconItem = {
    Icon: IconComponent
    color: string
    name: string
}

const IconChipRow = ({ items }: { items: IconItem[] }) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @2xl:grid-cols-4 gap-x-1">
        {items.map(({ Icon, color, name }) => (
            <span
                key={name}
                className="inline-flex items-center gap-1.5 text-primary text-sm whitespace-nowrap font-semibold p-2"
            >
                <Icon className={`size-4 shrink-0 ${color}`} />
                {name}
            </span>
        ))}
    </div>
)

const CheckList = ({ items, className = '' }: { items: string[]; className?: string }) => (
    <ul className={`list-none p-0 ${className}`}>
        {items.map((item) => (
            <li key={item} className="flex items-start gap-1.5">
                <IconCheck className="mt-0.5 size-4 shrink-0 text-green" />
                {item}
            </li>
        ))}
    </ul>
)

// The page's two calls to action, shown in the hero and in the Try it box
const SignupCTAs = () => (
    <div className="flex flex-wrap items-center gap-3">
        <CallToAction to={SIGNUP_URL} size="sm" externalNoIcon>
            Get started – free
        </CallToAction>
        <span className="text-sm text-secondary">
            Using PostHog?{' '}
            <Link to={APP_AI_URL} external>
                Open PostHog AI
            </Link>
        </span>
    </div>
)

const heroBullets = [
    'Query product behavior and connected business data',
    'Create flags, dashboards, surveys, and alerts',
    'Investigate errors and summarize session replays',
]

const HeroSection = () => {
    const reducedMotion = useReducedMotion()
    return (
        <section className="not-prose w-full border-b border-primary pb-8">
            <div className="grid items-start gap-6 @3xl/reader-content:grid-cols-2 @3xl/reader-content:gap-10">
                <div className="order-2 min-w-0 @3xl/reader-content:order-1">
                    <div className="mb-4 border-b border-primary pb-3">
                        <SlotMachineText
                            className="text-xl font-bold tracking-tight @xl/reader-content:text-2xl"
                            words={[
                                'analyze',
                                'replay',
                                'debug',
                                'instrument',
                                'flag',
                                'experiment',
                                'survey',
                                'query',
                                'automate',
                                'monitor',
                                'support',
                                'ship',
                                'code',
                            ]}
                            holdDuration={1200}
                            wordClassName="text-red dark:text-yellow"
                            prefix={
                                <span className="inline-flex items-center gap-2">
                                    <span>Let</span>
                                    <img
                                        src={posthogIcon}
                                        alt=""
                                        aria-hidden
                                        className="size-5 rounded-md @xl/reader-content:size-6"
                                    />
                                    <span>PostHog</span>
                                </span>
                            }
                        />
                    </div>
                    <h1 className="!mt-0 mb-4 text-3xl font-bold leading-tight @xl/reader-content:text-4xl">
                        The agent that already understands <Highlight>your context</Highlight>
                    </h1>
                    <p className="mt-0 mb-4 text-lg">
                        PostHog AI answers product questions from your own events, replays, errors, logs, and warehouse
                        tables (and shows the evidence). It lives in PostHog and Slack. Your coding agent gets the same
                        data through MCP.
                    </p>
                    <CheckList items={heroBullets} className="mb-6 space-y-0.5 text-base" />
                    <SignupCTAs />
                </div>
                <motion.div
                    className="order-1 mx-auto w-full max-w-72 self-center @3xl/reader-content:order-2 @3xl/reader-content:max-w-[400px]"
                    animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
                    transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
                >
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/context_hog_32f1181f4a.png"
                        alt="A hedgehog floating in a ring of dashboards, charts, maps, and logs"
                        width={800}
                        className="w-full"
                        imgClassName="w-full"
                    />
                </motion.div>
            </div>
        </section>
    )
}

const contextProducts = [
    'product_analytics',
    'web_analytics',
    'session_replay',
    'error_tracking',
    'logs',
    'ai_observability',
    'feature_flags',
    'experiments',
    'surveys',
    'workflows_emails',
    'replay_vision',
    'support',
]

const syncedSources: { key: LogoKey; name: string; to: string }[] = [
    { key: 'stripe', name: 'Stripe', to: '/docs/data-pipelines/sources/stripe' },
    { key: 'hubspot', name: 'HubSpot', to: '/docs/data-pipelines/sources/hubspot' },
    { key: 'salesforce', name: 'Salesforce', to: '/docs/data-pipelines/sources/salesforce' },
    { key: 'zendesk', name: 'Zendesk', to: '/docs/data-pipelines/sources/zendesk' },
    { key: 'postgres', name: 'Postgres', to: '/docs/data-pipelines/sources/postgres' },
    { key: 'snowflake', name: 'Snowflake', to: '/docs/data-pipelines/sources/snowflake' },
]

const semanticDefinitions = [
    'MRR',
    'Active users',
    'Activation rate',
    'Churn',
    'Conversion rate',
    'Net revenue retention',
    'Certified tables',
    'Reviewed joins',
]

const subtleLinkClass = 'flex items-center gap-2 text-inherit !no-underline hover:!underline'

const ContextLayerSection = () => {
    const products = useProduct()
    const sources = Array.isArray(products)
        ? contextProducts.flatMap((handle) => {
              const product = products.find((item) => item.handle === handle)
              return product ? [product] : []
          })
        : []
    return (
        <section id="context" className="my-12">
            <SectionHeader>
                <div className="relative">
                    <h2 className="m-0 text-2xl font-bold leading-tight tracking-tight @xl/reader-content:text-3xl">
                        More data in, better answers out
                    </h2>
                    <p className="mb-0 mt-3 text-base text-secondary @3xl/reader-content:mr-36">
                        Events show what people did. Errors and logs show what broke. Payments and tickets show what it
                        meant for the customer. Connect more of your stack to capture more context to query.
                    </p>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/curious_hog_d91b1a8b89.png"
                        alt=""
                        loading="lazy"
                        width={224}
                        imgClassName="pointer-events-none absolute -bottom-2 right-0 hidden w-28 @3xl/reader-content:block"
                    />
                </div>
            </SectionHeader>
            <div className="grid items-stretch gap-6 @4xl/reader-content:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="mb-3 mt-0 text-base font-bold">Already in PostHog</h3>
                        <ul className="m-0 grid list-none gap-x-3 gap-y-2 p-0 text-sm @sm/reader-content:grid-cols-2">
                            {sources.map((product) => (
                                <li key={product.handle}>
                                    <Link
                                        to={`/${product.slug}`}
                                        state={{ newWindow: true }}
                                        className={subtleLinkClass}
                                    >
                                        <ProductIcon product={product} className="size-5 shrink-0" />
                                        {product.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="border-t border-primary pt-4">
                        <h3 className="mb-2 mt-0 text-base font-bold">Plus your warehouse sources</h3>
                        <p className="mb-3 mt-0 text-sm text-secondary">
                            Connect payments, CRM, support, and database tables.
                        </p>
                        <ul className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-2 p-0 text-sm @sm/reader-content:grid-cols-3">
                            {syncedSources.map(({ key, name, to }) => (
                                <li key={key}>
                                    <Link to={to} state={{ newWindow: true }} className={subtleLinkClass}>
                                        <img src={LOGOS[key]} alt="" className="size-4 object-contain" />
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="/context-warehouse/sources"
                            state={{ newWindow: true }}
                            className="mt-4 inline-block text-sm font-semibold underline"
                        >
                            All data sources →
                        </Link>
                    </div>
                    <div className="border-t border-primary pt-4">
                        <h3 className="mb-2 mt-0 flex items-center gap-2 text-base font-bold">
                            <img src={LOGOS.github} alt="" className="size-5 shrink-0 dark:invert" />
                            And your code
                        </h3>
                        <p className="mb-3 mt-0 text-sm text-secondary">
                            Connect GitHub, and context can become a pull request. The agent works from your repo and
                            the product data behind it.
                        </p>
                        <Link
                            to="/docs/libraries/github"
                            state={{ newWindow: true }}
                            className="text-sm font-semibold underline"
                        >
                            Connect GitHub →
                        </Link>
                    </div>
                </div>
                <div className="min-w-0">
                    <ContextDiagram />
                    <Capabilities />
                </div>
            </div>
            <div
                id="semantic-layer"
                className="relative mt-8 grid items-center gap-6 rounded-md border border-blue bg-blue/10 p-5 shadow-xl @xl/reader-content:p-7 @2xl/reader-content:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] @3xl/reader-content:gap-8"
            >
                <div className="min-w-0">
                    <h3 className="m-0 flex items-center gap-2 text-xl font-bold @xl/reader-content:text-2xl">
                        <StickerServers className="size-8 shrink-0 -rotate-3" />
                        Semantics actually do matter
                    </h3>
                    <p className="my-3 text-sm text-secondary">
                        The semantic layer gives agents your approved metrics, trusted tables, and reviewed joins. Fewer
                        creative interpretations of “active user.”
                    </p>
                    <ul className="my-5 flex list-none flex-wrap gap-2 p-0">
                        {semanticDefinitions.map((name) => (
                            <li
                                key={name}
                                className="rounded-full border border-blue/30 bg-primary/40 px-3 py-1 text-sm font-semibold"
                            >
                                {name}
                            </li>
                        ))}
                    </ul>
                    <Link
                        to="/docs/semantic-layer"
                        state={{ newWindow: true }}
                        className="text-sm font-semibold underline"
                    >
                        How the semantic layer works →
                    </Link>
                </div>
                <div className="min-w-0">
                    <SlicedHog label="A hedgehog that opens into slices of product data" />
                    <p className="mb-0 mt-4 text-center text-xs text-secondary">
                        Slice it any way you like. MRR still means one thing.
                    </p>
                </div>
            </div>
        </section>
    )
}

const SkillsAndMemory = () => (
    <div className="my-12 grid gap-6 rounded-md border border-purple bg-purple/10 p-5 @xl/reader-content:grid-cols-2 @xl/reader-content:p-6">
        <div>
            <h3 className="m-0 flex items-center gap-2 text-base font-bold">
                <StickerRobot className="size-6 shrink-0 -rotate-3" />
                <Link to="/docs/skills" state={{ newWindow: true }}>
                    Skills
                </Link>
            </h3>
            <p className="mb-0 mt-1 text-sm text-secondary">
                Give repeat tasks reusable instructions: what to check, which tools to use, and what the result must
                contain.
            </p>
        </div>
        <div>
            <h3 className="m-0 flex items-center gap-2 text-base font-bold">
                <StickerMindMap className="size-6 shrink-0 rotate-3" />
                <Link to="/docs/posthog-ai/edit-memory" state={{ newWindow: true }}>
                    Memory
                </Link>
            </h3>
            <p className="mb-0 mt-1 text-sm text-secondary">
                Save product background across conversations. Explain what "activated" means once. It was a long
                meeting.
            </p>
        </div>
    </div>
)

const useCases = [
    {
        title: 'Explain the graph everyone is staring at',
        handle: 'product_analytics',
        prompt: 'How did usage change this week compared to last week? Check errors and replays for a cause.',
    },
    {
        title: 'Skip to the part where they got stuck',
        handle: 'session_replay',
        prompt: 'Find sessions with rage clicks or errors, and summarize what the users were trying to do.',
    },
    {
        title: 'Find bugs with an audience',
        handle: 'error_tracking',
        prompt: 'Which errors affected the most users this week?',
    },
    {
        title: 'Read the feedback pile',
        handle: 'surveys',
        prompt: 'Summarize my survey responses from the last 30 days by theme, with example quotes.',
    },
    {
        title: 'Make an opinion testable',
        handle: 'experiments',
        prompt: 'Find a high-traffic page and suggest an A/B test for it. Then draft the experiment.',
    },
    {
        title: 'Retire the dashboard request',
        handle: 'dashboards',
        prompt: 'Build a dashboard with daily active users, top pages, and retention.',
    },
]

const PromptsSection = (): JSX.Element => {
    const posthog = usePostHog()
    const products = useProduct()
    return (
        <section id="use-cases" className="my-12">
            <SectionHeader>
                <div>
                    <h2 className="m-0 flex items-start gap-3 text-2xl font-bold leading-tight tracking-tight @xl/reader-content:text-3xl">
                        <StickerMicroscope className="size-8 shrink-0 -rotate-6" />
                        Actual jobs for your AI
                    </h2>
                    <p className="mb-0 mt-2 text-base text-secondary">
                        Prompts for the work PostHog AI can take off your plate.
                    </p>
                </div>
            </SectionHeader>
            <div className="grid gap-x-7 @xl/reader-content:grid-cols-2 [&>div:last-child]:border-b-0 @xl/reader-content:[&>div:nth-last-child(2)]:border-b-0">
                {useCases.map(({ title, handle, prompt }) => {
                    const product = Array.isArray(products) ? products.find((item) => item.handle === handle) : null
                    return (
                        <div key={title} className="flex min-w-0 flex-col border-b border-primary py-5">
                            <div className="flex items-start gap-3">
                                <ProductIcon product={product} className="mt-0.5 size-6 shrink-0" />
                                <h3 className="m-0 text-lg font-bold">{title}</h3>
                            </div>
                            <p className="mb-0 mt-2 text-sm font-normal text-secondary">
                                “{prompt}”{' '}
                                <Link
                                    to={askUrl(prompt)}
                                    externalNoIcon
                                    contextMenu={false}
                                    className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-primary underline"
                                    onClick={() =>
                                        posthog?.capture('ai_prompt_selected', {
                                            group: title,
                                            prompt,
                                            placement: 'ai_page',
                                        })
                                    }
                                >
                                    Try this prompt <IconArrowRight className="size-3" />
                                </Link>
                            </p>
                        </div>
                    )
                })}
            </div>
            <p className="mb-0 mt-4 text-sm">
                <Link
                    to="/docs/posthog-ai/example-prompts"
                    state={{ newWindow: true }}
                    className="font-semibold underline"
                >
                    More example prompts in the docs →
                </Link>
            </p>
        </section>
    )
}

type DemoPause = { paused: boolean; setPaused: (paused: boolean) => void }

// The demo's pause also holds the access carousel, so the paused demo stays on screen
const WebDemo = ({ paused, setPaused }: DemoPause): JSX.Element => {
    const [run, setRun] = useState(0)
    // Changing tabs unmounts the demo, so drop its hold on the carousel
    useEffect(() => () => setPaused(false), [setPaused])
    return (
        <div className="mx-auto w-full min-w-0 max-w-md">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-secondary">
                <span>Scripted sample · connected tools</span>
                <div className="flex gap-2">
                    <OSButton size="sm" onClick={() => setPaused(!paused)}>
                        {paused ? 'Play' : 'Pause'}
                    </OSButton>
                    <OSButton
                        size="sm"
                        onClick={() => {
                            setRun((value) => value + 1)
                            setPaused(false)
                        }}
                    >
                        Replay
                    </OSButton>
                </div>
            </div>
            <SlidePausedContext.Provider value={paused}>
                <AskAnythingDemo key={run} />
            </SlidePausedContext.Provider>
            <p className="mb-0 mt-3 text-xs text-secondary">
                Questions about these tools?{' '}
                <AskMax linkOnly className="font-semibold underline">
                    Ask the documentation chat.
                </AskMax>
            </p>
        </div>
    )
}

const inAppChips: IconItem[] = [
    { Icon: IconEye, color: 'text-blue', name: 'Knows the open page' },
    { Icon: IconPencil, color: 'text-purple', name: 'Edits forms live' },
    { Icon: IconSparkles, color: 'text-yellow', name: 'Real insight widgets' },
    { Icon: IconCursorClick, color: 'text-green', name: 'Preview before writes' },
]

const SurfaceFacts = ({ agent, controls }: { agent: string; controls: string }) => (
    <dl className="my-4 space-y-1 text-sm">
        <div>
            <dt className="inline font-bold">Agent: </dt>
            <dd className="m-0 inline text-secondary">{agent}</dd>
        </div>
        <div>
            <dt className="inline font-bold">We control: </dt>
            <dd className="m-0 inline text-secondary">{controls}</dd>
        </div>
    </dl>
)

const buildSurfaceTabs = (demo: DemoPause): TabbedCarouselTab[] => [
    {
        value: 'web',
        label: 'Web',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <div className="grid items-center gap-6 rounded bg-primary p-4 pt-14 @3xl:grid-cols-2 @3xl:gap-8 @3xl:p-6 @3xl:pt-14">
                <div className="@container min-w-0">
                    <h2 className="mt-0 mb-3 text-2xl font-bold">Ask about the page you are looking at</h2>
                    <div className="flow-root">
                        <div className="float-right ml-4 mb-3 w-24 @sm:w-28">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/highlighter_hog_86b1a1f873.png"
                                alt=""
                                loading="lazy"
                                width={288}
                                imgClassName="w-full"
                            />
                        </div>
                        <p className="mt-0 text-secondary text-sm">
                            It knows what you have open, so "why did this drop?" on a dashboard is about that dashboard.
                            Ask it to change a flag, and the form in front of you updates.
                        </p>
                        <p className="mb-3 text-secondary text-sm">
                            Watch it investigate falling paid conversions, from product behavior to payments and recent
                            code changes. The answer comes with evidence. You are allowed to be suspicious.
                        </p>
                    </div>
                    <SurfaceFacts
                        agent="PostHog AI."
                        controls="All of it: the model, prompts, tools, and memory. We pick the model for each task."
                    />
                    <IconChipRow items={inAppChips} />
                    <OSButton
                        asLink
                        to={askUrl('Why are signups growing, but paid conversions falling?')}
                        external
                        variant="primary"
                        size="md"
                        className="mt-4"
                    >
                        Try with your data
                    </OSButton>
                    <p className="mb-0 mt-2 text-xs text-secondary">Opens in your signed-in project.</p>
                </div>
                <WebDemo {...demo} />
            </div>
        ),
    },
    {
        value: 'mcp',
        label: 'MCP',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <div className="rounded p-4 pb-6 bg-primary">
                <h2 className="mt-0 mb-2 pr-12 text-2xl font-bold">Headless PostHog use</h2>
                <div className="grid items-center gap-4 @lg:grid-cols-[minmax(0,1fr)_16rem]">
                    <div className="min-w-0">
                        <p className="text-secondary text-sm">
                            Plug PostHog into Claude Code, Cursor, or Codex, so it asks "is anyone still on this flag?"
                            before it deletes the flag.
                        </p>
                        <SurfaceFacts
                            agent="Yours: Claude Code, Cursor, Codex, or any other MCP client."
                            controls="The tools and the data they return. Your client picks the model and writes the prompts. A few tools call an LLM inside PostHog, and that usage bills as PostHog AI."
                        />
                        <MCPInstallCTA className="max-w-md" showDesktopLink={false} />
                        <p className="text-sm mt-4 mb-0">
                            <Link
                                to="/docs/model-context-protocol/tools"
                                state={{ newWindow: true }}
                                className="font-semibold"
                            >
                                Inspect the MCP tools
                            </Link>
                        </p>
                    </div>
                    <img
                        src="https://brand.posthog.com/hoggies/ichabod.svg"
                        alt=""
                        loading="lazy"
                        className="mx-auto w-40 @lg:w-full"
                    />
                </div>
            </div>
        ),
    },
    {
        value: 'cli',
        label: 'CLI',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <div className="rounded p-4 pb-6 bg-primary">
                <h2 className="mt-0 mb-2 text-2xl font-bold">SQL from your terminal, scripts, and CI</h2>
                <p className="text-secondary text-sm">
                    <code>posthog-cli api</code> puts the same tools in a shell command, for anything that has no MCP
                    client (including that cron job nobody talks about).
                </p>
                <SurfaceFacts
                    agent="None. You run the commands, or your script or coding agent does."
                    controls="The commands and the tools behind them."
                />
                <PlatformInstall schema={cliInstallSchema} />
                <p className="text-sm mt-4 mb-0">
                    <Link to="/docs/cli" state={{ newWindow: true }} className="font-semibold">
                        Read the CLI docs
                    </Link>
                </p>
            </div>
        ),
    },
    {
        value: 'slack',
        label: 'Slack',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        content: (
            <div className="rounded pt-4 px-4 bg-primary">
                <h2 className="mt-0 mb-2 text-2xl font-bold">Answer the question in the thread that asked it</h2>
                <p className="text-secondary text-sm">
                    Tag <code>@PostHog</code> with a data question. Continue the investigation in the thread, with the
                    context of the conversation.
                </p>
                <SurfaceFacts
                    agent="PostHog AI, in beta."
                    controls="The same as the web app: the model, prompts, and tools. Slack supplies the thread as context."
                />
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <CallToAction to={CONNECT_SLACK_URL} size="sm" externalNoIcon>
                        Connect Slack
                    </CallToAction>
                    <Link to="/slack" state={{ newWindow: true }} className="text-sm font-semibold">
                        More about the Slack app
                    </Link>
                </div>
                <div className="-mx-4 leading-[0]">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/subscription_insights_50ce62125e.png"
                        alt="A PostHog insight subscription posted to a Slack channel"
                        imgClassName="w-full"
                    />
                </div>
            </div>
        ),
    },
]

const backgroundTools = [
    {
        label: 'Scouts',
        Icon: IconTelescope,
        color: 'text-red',
        description: 'Agents that investigate your product on a schedule and file a report when something needs you.',
        to: '/docs/self-driving/scouts',
        cta: 'How scouts work',
    },
    {
        label: 'Inbox',
        Icon: IconNotification,
        color: 'text-blue',
        description: 'Reports ranked by impact, each with the evidence and a pull request ready to review.',
        to: '/docs/self-driving/inbox',
        cta: 'Reports and pull requests',
    },
    {
        label: 'Replay Vision',
        Icon: IconEye,
        color: 'text-yellow',
        description: 'Scanners that watch your session replays for you and turn what they see into data you can query.',
        to: '/docs/replay-vision',
        cta: 'How Replay Vision works',
    },
]

const BackgroundWork = (): JSX.Element => (
    <section id="background-work" className="my-12">
        <header>
            <h2 className="m-0 flex items-start gap-3 text-2xl font-bold leading-tight tracking-tight @xl/reader-content:text-3xl">
                <StickerCoffee className="size-8 shrink-0 rotate-6" />
                Useful while you're doing something else
            </h2>
            <p className="mb-0 mt-2 text-base text-secondary">
                Agents that keep working when the chat window is closed.
            </p>
        </header>
        <div className="not-prose mt-6 grid gap-4 @3xl/reader-content:grid-cols-3">
            {backgroundTools.map(({ label, Icon, color, description, to, cta }) => (
                <div
                    key={label}
                    className="flex min-w-0 flex-col overflow-hidden rounded-md border border-primary bg-primary"
                >
                    <div className="flex flex-1 flex-col p-5">
                        <h3 className="m-0 flex items-center gap-2 text-lg font-bold leading-tight">
                            <Icon className={`size-6 shrink-0 ${color}`} />
                            {label}
                        </h3>
                        <p className="mb-4 mt-2 text-sm text-secondary">{description}</p>
                        <Link to={to} state={{ newWindow: true }} className="mt-auto text-sm font-semibold underline">
                            {cta} →
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </section>
)

const AccessSection = (): JSX.Element => {
    const [demoPaused, setDemoPaused] = useState(false)
    const reducedMotion = useReducedMotion()
    return (
        <section id="access" className="my-12">
            <header className="mb-6">
                <h2 className="m-0 text-2xl font-bold leading-tight tracking-tight @xl/reader-content:text-3xl">
                    Your product data wherever you work
                </h2>
                <p className="mb-0 mt-2 text-base text-secondary">
                    PostHog AI runs in PostHog and Slack. In your editor or terminal, your own agent reaches the same
                    data through MCP and the CLI.
                </p>
            </header>
            {/* 25 seconds, so the 20-second web demo can finish before the next slide */}
            <TabbedCarousel
                tabs={buildSurfaceTabs({ paused: demoPaused, setPaused: setDemoPaused })}
                slideDuration={25000}
                paused={demoPaused || !!reducedMotion}
                pauseOnFocus
            />
        </section>
    )
}

type FaqEntry = { question: string; answer: string; link?: { label: string; to: string } }

// Free allocation and credit price, read from billing data so the copy follows the price list
type Pricing = { freeCredits: number; creditPrice: number }

const formatUSD = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)

const costAnswer = (pricing: Pricing | null) =>
    pricing
        ? `Every organization gets ${pricing.freeCredits.toLocaleString()} free credits each month, worth ${formatUSD(
              pricing.freeCredits * pricing.creditPrice
          )}. After that, ${Math.round(1 / pricing.creditPrice)} credits cost $1. `
        : 'Every organization gets free credits each month, and you pay for what you use after that. '

// Answers are plain text so the same array feeds the accordion and the FAQPage structured data
const buildFaq = (pricing: Pricing | null): FaqEntry[] => [
    {
        question: 'How much does PostHog AI cost?',
        answer: `${costAnswer(
            pricing
        )}We charge the LLM provider's cost plus 20%, and you see the cost live as you work. Questions about how to use PostHog are free.`,
        link: { label: 'PostHog AI pricing', to: '/docs/posthog-ai/pricing' },
    },
    {
        question: 'Can I cap what I spend?',
        answer: 'Yes. PostHog sets a default billing limit of $150, and you can set your own. When you reach it, AI features pause until your credits reset at the start of the next billing period.',
        link: { label: 'Billing limits', to: '/docs/posthog-ai/pricing' },
    },
    {
        question: 'What can it read and change?',
        answer: 'Access depends on the app and its configured tools. PostHog AI can query project data and create supported objects. Desktop and Inbox can prepare code changes for review. Workflow AI tasks start read-only; full access is configurable.',
        link: { label: 'Access control', to: '/docs/settings/access-control' },
    },
    {
        question: 'Where does my data go?',
        answer: 'PostHog AI runs on models from Anthropic, OpenAI, and Google, so your messages and the data the agent reads pass through them. Azure powers semantic search and can see actions and cohorts. Our DPA prohibits providers from training on your data. PostHog’s own anonymized model training has a separate opt-out setting.',
        link: { label: 'Subprocessors', to: '/subprocessors' },
    },
    {
        question: 'How do I turn PostHog AI off?',
        answer: 'An organization admin can turn off PostHog AI data analysis in Settings > Organization > General. When it is off, no data goes to AI providers. You can turn it back on at any time, and your chat history stays.',
    },
    {
        question: 'Can I self-host PostHog AI or use my own models?',
        answer: 'No. PostHog AI only runs in PostHog Cloud, and PostHog picks the most efficient model for each task.',
    },
]

const toAccordionItems = (faq: FaqEntry[]) =>
    faq.map(({ question, answer, link }) => ({
        trigger: question,
        content: (
            <>
                <p>{answer}</p>
                {link && (
                    <p>
                        <Link
                            to={link.to}
                            state={{ newWindow: true }}
                            className="text-red dark:text-yellow font-semibold hover:underline"
                        >
                            {link.label}
                        </Link>
                    </p>
                )}
            </>
        ),
    }))

export default function PostHogAIPage(): JSX.Element {
    const posthogAI = useProduct({ handle: 'posthog_ai' }) as {
        seo: { title: string; description: string }
        freeLimit?: number
        startsAt?: string
    }
    const { title, description } = posthogAI.seo
    const pricing: Pricing | null =
        posthogAI.freeLimit && posthogAI.startsAt
            ? { freeCredits: posthogAI.freeLimit, creditPrice: Number(posthogAI.startsAt) }
            : null
    const faq = buildFaq(pricing)

    return (
        <>
            <SEO
                title={title}
                description={description}
                image="/images/og/default.png"
                structuredData={buildProductStructuredData({
                    name: 'PostHog AI',
                    description,
                    slug: 'ai',
                    faq: faq.map(({ question, answer }) => ({ question, answer })),
                })}
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                hideMobileTableOfContents
                showQuestions={false}
                title="posthog-ai.md"
                hideTitle
            >
                <div className="@container/reader-content not-prose max-w-5xl mx-auto font-rounded">
                    <HeroSection />
                    <ContextLayerSection />
                    <PromptsSection />

                    <SkillsAndMemory />

                    <div className="border-t border-primary" />

                    <AccessSection />

                    <BackgroundWork />

                    <Testimonials />

                    <div
                        id="try"
                        className="not-prose bg-blue/10 border border-blue rounded-md p-5 shadow-xl @md/reader-content:p-7 my-6"
                    >
                        <div className="grid @lg/reader-content:grid-cols-[minmax(0,1fr)_180px] gap-6 items-center">
                            <div>
                                <h2 className="mt-0 mb-3 text-2xl font-bold @xl/reader-content:text-3xl">
                                    It's not magic (but it feels like it)
                                </h2>
                                <p className="mt-0 mb-4">
                                    PostHog AI comes with every PostHog account, plus{' '}
                                    {pricing
                                        ? `${pricing.freeCredits.toLocaleString()} free credits a month`
                                        : 'free credits every month'}
                                    . Sign up, open the chat, and ask it a question about your own data. Or connect your
                                    coding agent through MCP.
                                </p>
                                <SignupCTAs />
                            </div>
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/wizard_indigo_hog_d7099863ad.png"
                                alt=""
                                loading="lazy"
                                width={360}
                                className="hidden @lg/reader-content:block"
                                imgClassName="mx-auto hidden max-h-56 w-auto @lg/reader-content:block"
                            />
                        </div>
                    </div>

                    <SectionHeader>
                        <h2 className="mb-0 mt-10 text-2xl font-bold">The sensible questions</h2>
                    </SectionHeader>
                    <div className="not-prose mt-4">
                        <Accordion
                            type="single"
                            triggerClassName="!px-3 !py-2"
                            contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                            items={toAccordionItems(faq)}
                        />
                    </div>

                    <AIEngineering />
                </div>
            </ReaderView>
        </>
    )
}
