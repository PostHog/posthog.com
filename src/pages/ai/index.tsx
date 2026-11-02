import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ReaderView from 'components/ReaderView'
import SEO, { buildProductStructuredData } from 'components/seo'
import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction'
import { Accordion } from 'components/RadixUI/Accordion'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import SlicedHog from 'components/SlicedHog'
import SlotMachineText from 'components/SlotMachineText'
import ContextDiagram from 'components/PostHogAI/ContextDiagram'
import ProductIcon from 'components/PostHogAI/ProductIcon'
import { SectionHeader } from 'components/Pricing/Test/Sections'
import { StickerCoffee, StickerMicroscope, StickerRobot } from 'components/Stickers/Stickers'
import Capabilities, { AIEngineering } from 'components/PostHogAI/Capabilities'
import Testimonials from 'components/PostHogAI/Testimonials'
import MCPInstallCTA from 'components/MCPInstallCTA'
import useProduct from 'hooks/useProduct'
import usePostHog from 'hooks/usePostHog'
import { LOGOS, type LogoKey } from 'constants/logos'
import {
    IconArrowRight,
    IconCheck,
    IconBrain,
    IconCheckCircle,
    IconEye,
    IconNotification,
    IconFilter,
    IconNotebook,
    IconGraph,
    IconRocket,
    IconSparkles,
    IconTelescope,
} from '@posthog/icons'
import posthogIcon from '../../images/posthog-icon-white.svg'

const SIGNUP_URL = 'https://app.posthog.com/signup'
const APP_AI_URL = 'https://app.posthog.com/ai'

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
    description?: string
    to?: string
}

const IconChipRow = ({ items }: { items: IconItem[] }) => (
    <div className="grid grid-cols-1 gap-x-6 gap-y-4 @sm:grid-cols-2">
        {items.map(({ Icon, color, name, description, to }) => {
            const title = (
                <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                    <Icon className={`size-4 shrink-0 ${color}`} />
                    <span className={to ? 'group-hover:underline' : undefined}>{name}</span>
                </div>
            )
            return (
                <div key={name}>
                    {to ? (
                        <Link to={to} state={{ newWindow: true }} className="group block !no-underline">
                            {title}
                        </Link>
                    ) : (
                        title
                    )}
                    {description && <p className="mb-0 mt-0.5 text-sm text-secondary">{description}</p>}
                </div>
            )
        })}
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
                        The answers are already in your data. PostHog AI finds them across your events, replays, errors,
                        logs, and warehouse tables. Ask in PostHog or Slack, or connect your coding agent through MCP.
                    </p>
                    <CheckList items={heroBullets} className="mb-6 space-y-0.5 text-base" />
                    <SignupCTAs />
                </div>
                <motion.div
                    className="order-1 mx-auto w-full max-w-72 self-center @3xl/reader-content:order-2 @3xl/reader-content:max-w-sm"
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
                        Events and replays show what people did. Errors and logs show what broke. Feed PostHog AI the
                        rest of your stack too. Every source you add is more context to answer from.
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
                            to="/docs/data-pipelines/sources"
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
                        <StickerMicroscope className="size-8 shrink-0 -rotate-6" />
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
        title: 'Find the errors that hit the most users',
        handle: 'error_tracking',
        prompt: 'Which errors affected the most users this week?',
    },
    {
        title: 'Read the feedback pile',
        handle: 'surveys',
        prompt: 'Summarize survey responses from the last 30 days.',
    },
    {
        title: 'Make an opinion testable',
        handle: 'experiments',
        prompt: 'Find a high-traffic page and suggest an A/B test for it. Then draft the experiment.',
    },
    {
        title: 'Build a dashboard by describing it',
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
                        <StickerRobot className="size-8 shrink-0 -rotate-3" />
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

const inAppChips: IconItem[] = [
    {
        Icon: IconSparkles,
        color: 'text-blue',
        name: 'Knows what you’re looking at',
        description: 'It sees the page you’re on. No need to explain which chart you mean.',
        to: '/docs/posthog-ai/context-and-commands',
    },
    {
        Icon: IconBrain,
        color: 'text-green',
        name: 'Remembers your business',
        description: 'Save what you sell and who your customers are with /remember.',
        to: '/docs/posthog-ai/edit-memory',
    },
    {
        Icon: IconFilter,
        color: 'text-purple',
        name: 'Edits the filters on the page',
        description: 'It edits the filters on your open insight. Tweak a chart by asking.',
        to: '/docs/posthog-ai/surfaces/web-app',
    },
    {
        Icon: IconNotebook,
        color: 'text-yellow',
        name: 'Writes up notebooks',
        description: 'Notebooks mix text, charts, and replays in one doc. PostHog AI writes them for you.',
        to: '/docs/posthog-ai/tools',
    },
]

const agentChips: IconItem[] = [
    {
        Icon: IconCheckCircle,
        color: 'text-green',
        name: 'Check before you change',
        description: 'Ask “how often is this endpoint hit?” before you rewrite it.',
    },
    {
        Icon: IconGraph,
        color: 'text-purple',
        name: 'Size the impact',
        description: 'See how an experiment is trending before you ramp, hold, or roll back.',
    },
    {
        Icon: IconRocket,
        color: 'text-blue',
        name: 'Verify the deploy',
        description: 'See whether latency or conversion moved before you ship the next thing.',
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
        description: 'Reports ranked by priority, each with its evidence, plus a pull request when there is a fix.',
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
                Useful while you’re doing something else
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
    return (
        <section id="access" className="my-12">
            <header className="mb-6">
                <h2 className="m-0 text-2xl font-bold leading-tight tracking-tight @xl/reader-content:text-3xl">
                    Your product data <Highlight>wherever you work</Highlight>
                </h2>
            </header>
            <div className="grid gap-4 @3xl/reader-content:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                <div className="@container flex min-w-0 flex-col overflow-hidden rounded border border-primary bg-primary p-4 @xl:p-6">
                    <div className="flow-root">
                        <div className="float-right mb-3 ml-4 w-20 @sm:w-24">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog_ai_42392777d8.png"
                                alt=""
                                loading="lazy"
                                width={288}
                                imgClassName="w-full"
                            />
                        </div>
                        <h3 className="mb-3 mt-0 text-2xl font-bold">
                            PostHog AI in <Highlight>PostHog Web</Highlight>
                        </h3>
                        <p className="mb-3 mt-0 text-sm text-secondary">
                            Start with a trend, then ask for the SQL behind it, the replays that match, or a survey to
                            learn why. PostHog AI switches modes as you go and keeps the whole thread.
                        </p>
                    </div>
                    <IconChipRow items={inAppChips} />
                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                        <OSButton
                            asLink
                            to={askUrl('Why are signups growing, but paid conversions falling?')}
                            external
                            variant="primary"
                            size="md"
                        >
                            Try with your data
                        </OSButton>
                        <p className="m-0 text-xs text-secondary">Opens in your signed-in project.</p>
                    </div>
                    <div className="mt-6 border-t border-primary pt-4">
                        <h4 className="m-0 text-base font-bold">Also in Slack</h4>
                        <p className="mb-0 mt-0.5 text-sm text-secondary">
                            Product discussions happen in Slack, so PostHog goes there too. Mention{' '}
                            <code>@PostHog</code> in a thread to analyze your data, or to hand a fix to a coding agent.
                        </p>
                        <Link
                            to="/slack"
                            state={{ newWindow: true }}
                            className="mt-4 inline-block text-sm font-semibold underline"
                        >
                            More about the Slack app →
                        </Link>
                    </div>
                    <div className="-mx-4 -mb-4 mt-auto pt-4 leading-[0] @xl:-mx-6 @xl:-mb-6">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/Inbox_in_slack_229d1d3693.png"
                            alt="PostHog Inbox reports posted to a Slack channel, with buttons to review the pull request"
                            loading="lazy"
                            imgClassName="w-full"
                        />
                    </div>
                </div>
                <div className="@container min-w-0 rounded border border-primary bg-primary p-4 @xl:p-6">
                    <h3 className="mb-3 mt-0 text-2xl font-bold">
                        PostHog in your <Highlight>coding agent</Highlight>
                    </h3>
                    <p className="mb-3 mt-0 text-sm text-secondary">
                        Plug PostHog into Claude Code, Cursor, or wherever you’re building.
                    </p>
                    <IconChipRow items={agentChips} />
                    <MCPInstallCTA className="mt-4 max-w-md" showDesktopLink={false} />
                    <div className="mt-6 border-t border-primary pt-4">
                        <h4 className="m-0 text-base font-bold">Also in your terminal and CI</h4>
                        <p className="mb-0 mt-0.5 text-sm text-secondary">
                            <code>posthog-cli api</code> gives you the MCP tool catalog as shell commands, including SQL
                            queries.
                        </p>
                        <Link
                            to="/docs/cli"
                            state={{ newWindow: true }}
                            className="mt-4 inline-block text-sm font-semibold underline"
                        >
                            Read the CLI docs →
                        </Link>
                    </div>
                </div>
            </div>
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
        )}We charge the LLM provider’s cost plus 20%, and you see the cost live as you work. Questions about how to use PostHog are free.`,
        link: { label: 'PostHog AI pricing', to: '/docs/posthog-ai/pricing' },
    },
    {
        question: 'Can I cap what I spend?',
        answer: 'Yes. PostHog sets a $150 billing limit by default, and you can set your own. When you hit it, AI features pause until your credits reset at the start of the next billing period.',
        link: { label: 'Billing limits', to: '/docs/posthog-ai/pricing' },
    },
    {
        question: 'Do I need to turn anything on first?',
        answer: 'Yes, once. PostHog AI uses outside model providers, so an organization admin has to approve it. The first time you send a chat message, PostHog AI asks the admin to approve. Admins can also switch it on in Settings > Organization > General.',
        link: { label: 'Allow PostHog AI access', to: '/docs/posthog-ai/allow-access' },
    },
    {
        question: 'What can it see and change?',
        answer: 'It can read your events, persons, sessions, groups, actions, cohorts, data warehouse schema, and saved insights and dashboards. It follows your access controls, so it only sees what you can see. It can also create dashboards, surveys, alerts, and feature flags. For changes in code, it starts a coding task on a repository you connected and tells you when a pull request is ready to review.',
        link: { label: 'Access control', to: '/docs/settings/access-control' },
    },
    {
        question: 'Where does my data go?',
        answer: 'PostHog AI runs on models from Anthropic, OpenAI, and Google, so your messages and the data it reads pass through them. Azure handles semantic search and can see your actions and cohorts. We can’t promise zero data retention yet, because not every model provider offers it.',
        link: { label: 'Subprocessors', to: '/subprocessors' },
    },
    {
        question: 'Does anyone train on my data?',
        answer: 'Model providers don’t. Our DPA bans them from using your data to train or fine-tune their models. PostHog does train its own models on anonymized data, and you can opt out with the “Enable AI training on anonymized data” setting.',
        link: { label: 'AI data FAQ', to: '/docs/posthog-ai/faq' },
    },
    {
        question: 'How do I turn PostHog AI off?',
        answer: 'An organization admin can switch off PostHog AI data analysis in Settings > Organization > General. While it is off, no data goes to AI providers. You can turn it back on any time, and your chat history stays.',
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

                    <AccessSection />

                    <BackgroundWork />

                    <PromptsSection />

                    <Testimonials />

                    <div
                        id="try"
                        className="not-prose bg-purple/10 border border-purple rounded-md p-5 shadow-xl @md/reader-content:p-7 my-6"
                    >
                        <div className="grid @lg/reader-content:grid-cols-[180px_minmax(0,1fr)] gap-6 items-center">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/wizard_indigo_hog_d7099863ad.png"
                                alt=""
                                loading="lazy"
                                width={360}
                                className="hidden @lg/reader-content:block"
                                imgClassName="mx-auto hidden max-h-56 w-auto @lg/reader-content:block"
                            />
                            <div>
                                <h2 className="mt-0 mb-3 text-2xl font-bold @xl/reader-content:text-3xl">
                                    It’s not magic (but it feels like it)
                                </h2>
                                <p className="mt-0 mb-4">
                                    PostHog AI knows when things break, what users love, and what to build next. Every
                                    organization gets{' '}
                                    {pricing
                                        ? `${pricing.freeCredits.toLocaleString()} free credits a month`
                                        : 'free credits every month'}{' '}
                                    to ask harder questions that help you build a better product.
                                </p>
                                <SignupCTAs />
                            </div>
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
