import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { useReducedMotion } from 'framer-motion'
import ReaderView from 'components/ReaderView'
import SEO, { buildProductStructuredData } from 'components/seo'
import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction'
import { Accordion } from 'components/RadixUI/Accordion'
import TabbedCarousel from 'components/TabbedCarousel'
import Tabs from 'components/RadixUI/Tabs'
import type { TabbedCarouselTab } from 'components/TabbedCarousel'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import SlicedHog from 'components/SlicedHog'
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
import { useSelfDrivingTemplates } from 'components/SelfDrivingInbox'
import { buildScoutDeepLink } from 'components/SelfDrivingInbox/scoutDeepLink'
import { displayLabel, formatWeek, getPeriods, weekShares, type LeaderboardRow } from 'components/MCPLeaderboard/data'
import useProduct from 'hooks/useProduct'
import usePostHog from 'hooks/usePostHog'
import { LOGOS, type LogoKey } from 'constants/logos'
import { IconArrowRight, IconCheck, IconCursorClick, IconEye, IconPencil, IconSparkles } from '@posthog/icons'

const SIGNUP_URL = 'https://app.posthog.com/signup'
const APP_AI_URL = 'https://app.posthog.com/ai'
const CONNECT_SLACK_URL = 'https://app.posthog.com/integrations/slack'
const SCOUTS_URL = 'https://app.posthog.com/inbox/scouts'

type IconComponent = React.ComponentType<{ className?: string }>

// Opens the PostHog AI side panel in the app with the prompt already filled in
const askUrl = (prompt: string) => `https://app.posthog.com/#panel=max:!${encodeURIComponent(prompt)}`

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="whitespace-nowrap bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
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
    'Create insights, investigate issues, and prepare changes',
    'Give your coding agents the same product context',
]

const HeroSection = () => (
    <section className="not-prose w-full border-b border-primary pb-8">
        <div className="grid items-center gap-6 @3xl/reader-content:grid-cols-2 @3xl/reader-content:gap-10">
            <div className="order-2 min-w-0 @3xl/reader-content:order-1">
                <h1 className="!mt-0 mb-4 text-3xl font-bold leading-tight @xl/reader-content:text-4xl">
                    The AI agent that already has <Highlight>your data</Highlight>
                </h1>
                <p className="mt-0 mb-4 text-lg">
                    Your events, replays, errors, and connected business data already live in PostHog. Ask a product
                    question, inspect the evidence, and use the answer to decide what to build. Skip the schema
                    briefing.
                </p>
                <CheckList items={heroBullets} className="mb-6 space-y-0.5 text-base" />
                <SignupCTAs />
            </div>
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/context_hog_32f1181f4a.png"
                alt="A hedgehog floating in a ring of dashboards, charts, maps, and logs"
                width={800}
                className="order-1 mx-auto w-full max-w-72 @3xl/reader-content:order-2 @3xl/reader-content:max-w-[400px]"
                imgClassName="w-full"
            />
        </div>
    </section>
)

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

const syncedSources: { key: LogoKey; name: string }[] = [
    { key: 'stripe', name: 'Stripe' },
    { key: 'hubspot', name: 'HubSpot' },
    { key: 'salesforce', name: 'Salesforce' },
    { key: 'zendesk', name: 'Zendesk' },
    { key: 'postgres', name: 'Postgres' },
    { key: 'snowflake', name: 'Snowflake' },
]

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
                        The answers rarely live in one table
                    </h2>
                    <p className="mb-0 mt-3 max-w-2xl text-base text-secondary @3xl/reader-content:mr-36">
                        Each tool adds a different part of the picture. Connect more of your stack, and PostHog AI has
                        more evidence for each answer.
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
                                <li key={product.handle} className="flex items-center gap-2">
                                    <ProductIcon product={product} className="size-5 shrink-0" />
                                    {product.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="border-t border-primary pt-4">
                        <h3 className="mb-2 mt-0 text-base font-bold">Plus your warehouse sources</h3>
                        <p className="mb-3 mt-0 text-sm text-secondary">
                            Connect payments, CRM, support, and database tables. Query them alongside user behavior.
                        </p>
                        <ul className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-2 p-0 text-sm @sm/reader-content:grid-cols-3">
                            {syncedSources.map(({ key, name }) => (
                                <li key={key} className="flex items-center gap-2">
                                    <img src={LOGOS[key]} alt="" className="size-4 object-contain" />
                                    {name}
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
                            Connect GitHub so coding tasks can inspect your code alongside product data and user
                            behavior. The stack trace has somewhere to go.
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
                <ContextDiagram />
            </div>
            <Capabilities />
            <div
                id="semantic-layer"
                className="relative mt-8 grid items-center gap-6 rounded-md border border-blue bg-blue/10 p-5 shadow-xl @xl/reader-content:p-7 @2xl/reader-content:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] @3xl/reader-content:gap-8"
            >
                <div className="min-w-0">
                    <h3 className="m-0 flex items-center gap-2 text-xl font-bold @xl/reader-content:text-2xl">
                        <StickerServers className="size-8 shrink-0 -rotate-3" />
                        Same question, same definition
                    </h3>
                    <p className="my-3 text-sm text-secondary">
                        The semantic layer gives agents your approved metrics, trusted tables, and reviewed joins. Fewer
                        creative interpretations of “active user.”
                    </p>
                    <dl className="my-5 grid gap-4 @lg/reader-content:grid-cols-3">
                        <div className="min-w-0 border-t border-blue/30 pt-3">
                            <dt className="text-sm font-bold">An approved metric</dt>
                            <dd className="mb-0 ml-0 mt-1 text-xs text-secondary">
                                First project within 7 days of signup
                            </dd>
                        </div>
                        <div className="min-w-0 border-t border-blue/30 pt-3">
                            <dt className="text-sm font-bold">A certified source</dt>
                            <dd className="mb-0 ml-0 mt-1 text-xs text-secondary">
                                <code className="break-words !bg-transparent !p-0 !text-xs">
                                    stripe_
                                    <wbr />
                                    subscriptions
                                </code>
                            </dd>
                        </div>
                        <div className="min-w-0 border-t border-blue/30 pt-3">
                            <dt className="text-sm font-bold">A reviewed join</dt>
                            <dd className="mb-0 ml-0 mt-1 break-words text-xs text-secondary">
                                <code className="break-words !bg-transparent !p-0 !text-xs">
                                    orders.customer_id → <wbr />
                                    stripe_customers.id
                                </code>
                            </dd>
                        </div>
                    </dl>
                    <p className="mb-3 mt-0 text-xs text-secondary">Example definitions. Your team approves its own.</p>
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
                        Product context, with the lid off. Click to inspect.
                    </p>
                </div>
            </div>
            <div className="mt-6 grid gap-6 rounded-md border border-purple bg-purple/10 p-5 @xl/reader-content:grid-cols-2 @xl/reader-content:p-6">
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
                <div>
                    <h3 className="m-0 flex items-center gap-2 text-base font-bold">
                        <StickerRobot className="size-6 shrink-0 -rotate-3" />
                        <Link to="/docs/skills" state={{ newWindow: true }}>
                            Skills
                        </Link>
                    </h3>
                    <p className="mb-0 mt-1 text-sm text-secondary">
                        Give repeat tasks reusable instructions: what to check, which tools to use, and what the result
                        must contain.
                    </p>
                </div>
            </div>
        </section>
    )
}

const useCases = [
    {
        title: 'Explain the graph everyone is staring at',
        handle: 'product_analytics',
        prompt: 'Why did checkout conversion drop on Tuesday? Check the funnel, errors, and replays.',
    },
    {
        title: 'Skip to the part where they got stuck',
        handle: 'session_replay',
        prompt: 'Find sessions where users got stuck during onboarding.',
    },
    {
        title: 'Find bugs with an audience',
        handle: 'error_tracking',
        prompt: 'Which errors affected the most users this week?',
    },
    {
        title: 'Read the feedback pile',
        handle: 'surveys',
        prompt: "Group this month's survey feedback into themes. Show the source responses.",
    },
    {
        title: 'Make an opinion testable',
        handle: 'experiments',
        prompt: 'Prepare an onboarding experiment with a conversion metric and a flag.',
    },
    {
        title: 'Retire the dashboard request',
        handle: 'dashboards',
        prompt: 'Build a dashboard for onboarding retention.',
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
                    <p className="mb-0 mt-2 text-base text-secondary">Start with the work. The prompt is included.</p>
                </div>
            </SectionHeader>
            <div className="grid gap-x-7 @xl/reader-content:grid-cols-2">
                {useCases.map(({ title, handle, prompt }) => {
                    const product = Array.isArray(products) ? products.find((item) => item.handle === handle) : null
                    return (
                        <Link
                            key={title}
                            to={askUrl(prompt)}
                            externalNoIcon
                            contextMenu={false}
                            className="group flex min-w-0 flex-col border-b border-primary py-5 !no-underline"
                            onClick={() =>
                                posthog?.capture('ai_prompt_selected', { group: title, prompt, placement: 'ai_page' })
                            }
                        >
                            <div className="flex items-start gap-3">
                                <ProductIcon product={product} className="mt-0.5 size-6 shrink-0" />
                                <h3 className="m-0 text-lg font-bold group-hover:underline">{title}</h3>
                            </div>
                            <p className="mb-0 mt-2 text-sm font-normal text-secondary">
                                “{prompt}”{' '}
                                <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-primary">
                                    Try this prompt <IconArrowRight className="size-3" />
                                </span>
                            </p>
                        </Link>
                    )
                })}
            </div>
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

const buildSurfaceTabs = (data: PageProps['data']['mcpLeaderboard'], demo: DemoPause): TabbedCarouselTab[] => [
    {
        value: 'web',
        label: 'Web',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <div className="grid items-center gap-6 rounded bg-primary p-4 pt-14 @3xl:grid-cols-2 @3xl:gap-8 @3xl:p-6 @3xl:pt-14">
                <div className="@container min-w-0">
                    <h2 className="mt-0 mb-3 text-2xl font-bold">A side panel on every page</h2>
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
                <h2 className="mt-0 mb-2 pr-12 text-2xl font-bold">Give your coding agent a conscience</h2>
                <div className="grid items-start gap-4 @lg:grid-cols-[minmax(0,1fr)_176px]">
                    <div className="min-w-0">
                        <p className="text-secondary text-sm">
                            Plug PostHog into Claude Code, Cursor, or Codex, so it asks "is anyone still on this flag?"
                            before it deletes the flag.
                        </p>
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
                        className="mx-auto w-32 @lg:mt-3 @lg:w-full"
                    />
                </div>
                <MCPWork data={data} />
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

const BackgroundWork = (): JSX.Element => {
    const posthog = usePostHog()
    const templates = useSelfDrivingTemplates()
        .filter((template) => template.scout)
        .slice(0, 3)
    const tabs = [
        {
            value: 'scouts',
            label: 'Scouts',
            image: 'https://brand.posthog.com/hoggies/explorer.svg',
            content: (
                <>
                    <h3 className="m-0 text-2xl font-bold leading-tight">
                        A scout <span className="bg-yellow/20 px-0.5">remembers to ask</span>
                    </h3>
                    <p className="my-3 text-base text-secondary">
                        Give it a question and a schedule. It investigates your product data and sends findings to Inbox
                        or Slack.
                    </p>
                    <p className="my-4 text-sm text-secondary">
                        Every morning: compare activation with the previous week. If it falls, inspect errors and
                        replays. Send a report when there is something to investigate.
                    </p>
                    <p className="my-4 text-sm">The question you ask every Monday can stop being your Monday.</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                        <OSButton asLink to={SCOUTS_URL} external size="sm" variant="primary">
                            Build a scout
                        </OSButton>
                        <Link to="/docs/self-driving/scouts" state={{ newWindow: true }} className="underline">
                            How scouts work
                        </Link>
                    </div>
                    {templates.length > 0 && (
                        <div className="mt-5 border-t border-yellow/30 pt-3">
                            <p className="mb-2 mt-0 text-sm font-semibold">Or borrow one of ours</p>
                            <ul className="m-0 list-none space-y-2 p-0 text-sm">
                                {templates.map(({ url, templateTitle, templateShortTitle, scout }) => (
                                    <li key={url}>
                                        <Link
                                            to={buildScoutDeepLink(scout)}
                                            externalNoIcon
                                            onClick={() =>
                                                posthog?.capture('pocket_guide_interaction', {
                                                    kind: 'add_scout_click',
                                                    scout: scout?.name,
                                                    placement: 'ai_page',
                                                })
                                            }
                                        >
                                            {templateShortTitle || templateTitle}{' '}
                                            <IconArrowRight className="inline size-4" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            ),
        },
        {
            value: 'inbox',
            label: 'Inbox',
            image: 'https://brand.posthog.com/hoggies/reading.svg',
            content: (
                <>
                    <h3 className="m-0 text-2xl font-bold leading-tight">
                        Evidence arrives. <span className="bg-yellow/20 px-0.5">You decide what ships</span>
                    </h3>
                    <p className="my-3 text-base text-secondary">
                        Related findings become reports, ranked by user impact and severity. Review the evidence and
                        proposed pull requests in one place.
                    </p>
                    <ul className="my-4 list-none space-y-2 p-0 text-sm text-secondary">
                        <li>Follow findings back to errors, replays, and product data</li>
                        <li>Inspect the proposed code change</li>
                        <li>Review and merge through your usual process</li>
                    </ul>
                    <p className="my-4 text-sm">The hedgehog can open the PR. It does not get your merge button.</p>
                    <Link
                        to="/docs/self-driving/inbox"
                        state={{ newWindow: true }}
                        className="text-sm font-semibold underline"
                    >
                        Follow work in Inbox →
                    </Link>
                </>
            ),
        },
        {
            value: 'replay-vision',
            label: 'Replay Vision',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/binoculars_de6c3b3595.png',
            content: (
                <>
                    <h3 className="m-0 text-2xl font-bold leading-tight">
                        Replays, now with a <span className="bg-yellow/20 px-0.5">WHERE clause</span>
                    </h3>
                    <p className="my-3 text-base text-secondary">
                        Tell a scanner what to look for. It turns recordings into structured observations you can query,
                        chart, or use in an alert.
                    </p>
                    <p className="my-4 font-mono text-xs leading-relaxed">
                        recording + events
                        <br />
                        → scanner
                        <br />→ $recording_observed
                    </p>
                    <p className="my-4 text-sm text-secondary">
                        Find repeated failed clicks on signup, group the observations by browser, then open the
                        recordings to check them.
                    </p>
                    <Link
                        to="/docs/replay-vision/observations"
                        state={{ newWindow: true }}
                        className="text-sm font-semibold underline"
                    >
                        Inspect an observation →
                    </Link>
                </>
            ),
        },
        {
            value: 'workflows',
            label: 'Workflows',
            image: 'https://res.cloudinary.com/dmukukwp6/image/upload/transformer_hedgehog_2a379334d7.png',
            content: (
                <>
                    <h3 className="m-0 text-2xl font-bold leading-tight">
                        Give the next step <span className="bg-yellow/20 px-0.5">an answer</span>
                    </h3>
                    <p className="my-3 text-base text-secondary">
                        Start an AI task from an event, webhook, or schedule. Give it tools and skills, then pass its
                        structured result to the next step.
                    </p>
                    <p className="my-4 font-mono text-xs leading-relaxed">
                        event / webhook / schedule
                        <br />
                        → AI task + tools + skills
                        <br />
                        → structured result
                        <br />→ next workflow step
                    </p>
                    <p className="my-4 text-sm text-secondary">
                        PostHog access starts read-only. Full access is configurable.
                    </p>
                    <Link
                        to="/docs/workflows/ai-tasks"
                        state={{ newWindow: true }}
                        className="text-sm font-semibold underline"
                    >
                        Build an AI workflow →
                    </Link>
                </>
            ),
        },
    ]
    return (
        <section id="background-work" className="my-12">
            <header>
                <h2 className="m-0 flex items-start gap-3 text-2xl font-bold leading-tight tracking-tight @xl/reader-content:text-3xl">
                    <StickerCoffee className="size-8 shrink-0 rotate-6" />
                    Useful while you're doing something else
                </h2>
                <p className="mb-0 mt-2 text-base text-secondary">
                    Schedule an investigation, scan replays, or put an AI task in a workflow.
                </p>
            </header>
            <Tabs.Root defaultValue="scouts" orientation="horizontal" className="not-prose mb-0 mt-6">
                <Tabs.List
                    aria-label="Background AI tools"
                    className="grid w-full grid-cols-2 !p-0 !gap-1 @xl/reader-content:grid-cols-4"
                >
                    {tabs.map(({ value, label }) => (
                        <Tabs.Trigger
                            key={value}
                            value={value}
                            className="justify-center !rounded-b-none data-[state=active]:!bg-yellow/20"
                        >
                            {label}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
                {tabs.map(({ value, content, image }) => (
                    <Tabs.Content
                        key={value}
                        value={value}
                        className="w-full overflow-hidden rounded-b-md border border-yellow bg-yellow/10"
                    >
                        <div className="grid items-center gap-5 p-5 @xl/reader-content:p-7 @3xl/reader-content:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                            <div className="min-w-0">{content}</div>
                            <div className="mx-auto aspect-square w-full max-w-64 @3xl/reader-content:max-w-xs">
                                <img src={image} alt="" loading="lazy" className="h-full w-full object-contain" />
                            </div>
                        </div>
                    </Tabs.Content>
                ))}
            </Tabs.Root>
        </section>
    )
}

const MCPWork = ({ data }: { data: PageProps['data']['mcpLeaderboard'] }) => {
    const rows = data?.rows ?? []
    const week = getPeriods(rows, 'tool_category').pop()
    const categories = week ? weekShares(rows, 'tool_category', week, 'calls_pct', { dropOther: true, limit: 6 }) : []
    return (
        <details className="mt-4 border-t border-primary pt-3 text-sm">
            <summary className="cursor-pointer font-semibold">What are agents doing with PostHog?</summary>
            {categories.length > 0 ? (
                <>
                    <p className="mb-3 text-xs text-secondary">
                        Share of MCP tool calls · week of {week && formatWeek(week)}
                    </p>
                    <ul className="m-0 list-none space-y-3 p-0">
                        {categories.map(({ label, value }) => (
                            <li key={label}>
                                <div className="mb-1 flex justify-between gap-2 text-sm">
                                    <span title={label}>{displayLabel('tool_category', label)}</span>
                                    <span className="tabular-nums">{value.toFixed(1)}%</span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-sm bg-accent">
                                    <div className="h-full bg-purple" style={{ width: `${value}%` }} />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="mb-2 mt-4 text-xs text-secondary">
                        Top six categories, without the combined small groups. Shares cover all categories, so these
                        rows may not add up to 100%. Excludes internal traffic.
                    </p>
                    <p className="my-2 text-xs text-secondary">
                        Fetched at website build time
                        {data?.fetchedAt ? `: ${new Date(data.fetchedAt).toISOString().slice(0, 10)}` : ''}. Tool calls
                        are not completed tasks.
                    </p>
                </>
            ) : (
                <p className="text-sm text-secondary">Usage data is unavailable in this build.</p>
            )}
            <Link to="/mcp/leaderboard" state={{ newWindow: true }} className="text-sm font-semibold">
                Inspect the full MCP leaderboard <IconArrowRight className="inline size-4" />
            </Link>
        </details>
    )
}

const AccessSection = ({ data }: { data: PageProps['data']['mcpLeaderboard'] }): JSX.Element => {
    const [demoPaused, setDemoPaused] = useState(false)
    const reducedMotion = useReducedMotion()
    return (
        <section id="access" className="my-12">
            <header className="mb-6">
                <h2 className="m-0 text-2xl font-bold leading-tight tracking-tight @xl/reader-content:text-3xl">
                    Your product context, where you work
                </h2>
                <p className="mb-0 mt-2 text-base text-secondary">
                    In PostHog, your terminal, your editor, or the thread that should have been a query.
                </p>
            </header>
            {/* 25 seconds, so the 20-second web demo can finish before the next slide */}
            <TabbedCarousel
                tabs={buildSurfaceTabs(data, { paused: demoPaused, setPaused: setDemoPaused })}
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

type PageProps = {
    data: {
        mcpLeaderboard: {
            rows: LeaderboardRow[]
            fetchedAt: string | null
        } | null
    }
}

export default function PostHogAIPage({ data }: PageProps): JSX.Element {
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

                    <AccessSection data={data?.mcpLeaderboard ?? null} />

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
                                    It comes with every PostHog account, plus{' '}
                                    {pricing
                                        ? `${pricing.freeCredits.toLocaleString()} free credits a month`
                                        : 'free credits every month'}
                                    . Ask here, or connect Claude, Cursor, or Codex through MCP. Your product data can
                                    join the conversation. We are comfortable sharing the chat window.
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

                    <AIEngineering />

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
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql`
    {
        mcpLeaderboard {
            rows {
                week
                facet
                grp
                label
                calls_pct
            }
            fetchedAt
        }
    }
`
