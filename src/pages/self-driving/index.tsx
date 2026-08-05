import React from 'react'
import { graphql } from 'gatsby'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction'
import TabbedCarousel from 'components/TabbedCarousel'
import type { TabbedCarouselTab } from 'components/TabbedCarousel'
import Link from 'components/Link'
import { WINDOW_BG } from '../../constants/frostedSurfaces'
import useProduct from 'hooks/useProduct'
import { useApp } from '../../context/App'
import { GetStarted } from 'components/Home/Test'
import { CatalogLayers } from 'components/ContextWarehouseCatalog'
import {
    IconArrowUpRight,
    IconAtSign,
    IconBolt,
    IconCheckCircle,
    IconCode,
    IconCoffee,
    IconCompass,
    IconLock,
    IconPeople,
    IconPlug,
    IconPullRequest,
    IconRewindPlay,
    IconSearch,
    IconShieldLock,
    IconSparkles,
    IconStack,
    IconSupport,
    IconTerminal,
    IconWarning,
} from '@posthog/icons'

type IconComponent = React.ComponentType<{ className?: string }>
type CloudinarySrc = `https://res.cloudinary.com/${string}`

const LOOP_SCOUTS_IMAGE: CloudinarySrc = 'https://res.cloudinary.com/dmukukwp6/image/upload/scouts_8fe0af6de1.png'
const LOOP_INBOX_IMAGE: CloudinarySrc =
    'https://res.cloudinary.com/dmukukwp6/image/upload/inbox_prs_cloud_f44f8ba69b.png'
const LOOP_MERGE_IMAGE: CloudinarySrc = 'https://res.cloudinary.com/dmukukwp6/image/upload/4_merge_ffb549df4a.png'
const sectionHeadingClassName = 'my-6 mt-12 text-2xl font-bold @md/reader-content:text-3xl'

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

// Icon + text rows for enriching carousel slides (à la the Slack app carousel).
const IconList = ({ items }: { items: { Icon: IconComponent; color: string; text: React.ReactNode }[] }) => (
    <ul className="mt-3 mb-0 list-none space-y-2 pl-0">
        {items.map(({ Icon, color, text }, index) => (
            <li key={index} className="flex items-start gap-2 text-base text-secondary">
                <Icon className={`size-5 shrink-0 mt-0.5 ${color}`} />
                <span>{text}</span>
            </li>
        ))}
    </ul>
)

// Titled columns of icon + label, like the Slack app "ship a fix" slide.
type IconGroup = { title: string; description: string; items: { Icon: IconComponent; color: string; name: string }[] }

const IconGroupColumns = ({ groups }: { groups: IconGroup[] }) => (
    <div className="not-prose mt-4 grid grid-cols-1 gap-6 @sm:grid-cols-2">
        {groups.map((group) => (
            // @container so the items below can wrap to two columns when the group is wide enough
            // (full-width on mobile → 2 cols, keeping the slide short; side-by-side on desktop → 1 col)
            <div key={group.title} className="@container flex flex-col gap-3">
                <div>
                    <p className="m-0 text-base font-bold text-primary">{group.title}</p>
                    <p className="m-0 text-sm text-secondary">{group.description}</p>
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-1.5 @xs:grid-cols-2">
                    {group.items.map(({ Icon, color, name }) => (
                        <span key={name} className="flex items-start gap-1.5 text-sm text-primary">
                            <Icon className={`mt-0.5 size-5 shrink-0 ${color}`} />
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        ))}
    </div>
)

type TabPanelHighlightColor = 'blue' | 'red' | 'yellow' | 'green'

const tabPanelHighlightClasses: Record<TabPanelHighlightColor, string> = {
    blue: 'bg-blue/10 text-blue dark:bg-blue/20',
    red: 'bg-red/10 text-red dark:bg-red/20',
    yellow: 'bg-yellow/15 text-yellow dark:bg-yellow/20',
    green: 'bg-green/10 text-green dark:bg-green/20',
}

const TabPanel = ({
    title,
    highlightedTitle,
    titleSuffix,
    highlightColor = 'blue',
    children,
    image,
}: {
    title: string
    highlightedTitle?: string
    titleSuffix?: string
    highlightColor?: TabPanelHighlightColor
    children: React.ReactNode
    image: CloudinarySrc
}) => {
    const fullTitle = [title, highlightedTitle, titleSuffix].filter(Boolean).join(' ')

    return (
        <div className="rounded bg-primary p-4 @xl:p-6">
            <h2 className="mt-0 mb-2 text-2xl font-bold">
                {title}
                {highlightedTitle ? (
                    <>
                        {' '}
                        <span className={`rounded-sm px-0.5 ${tabPanelHighlightClasses[highlightColor]}`}>
                            {highlightedTitle}
                        </span>
                        {titleSuffix ? ` ${titleSuffix}` : null}
                    </>
                ) : null}
            </h2>
            <div className="text-secondary">{children}</div>
            <div className="-mx-4 -mb-4 mt-4 overflow-hidden rounded-b leading-[0] @xl:-mx-6 @xl:-mb-6">
                <CloudinaryImage src={image} alt={fullTitle} imgClassName="w-full block" />
            </div>
        </div>
    )
}

// Signal sources shown on the carousel's first slide, à la the homepage "debug and fix" slide.
const signalSources: { Icon: IconComponent; color: string; name: string; description: string; href: string }[] = [
    {
        Icon: IconWarning,
        color: 'text-yellow',
        name: 'Error tracking',
        description: 'Exceptions and stack traces grouped into issues',
        href: '/error-tracking',
    },
    {
        Icon: IconRewindPlay,
        color: 'text-orange',
        name: 'Session replay',
        description: 'Dead clicks, quick backs, long stalls',
        href: '/session-replay',
    },
    {
        Icon: IconSupport,
        color: 'text-blue',
        name: 'Support',
        description: 'Tickets and conversations from your users',
        href: '/support',
    },
    {
        Icon: IconPlug,
        color: 'text-purple',
        name: 'External tools',
        description: 'Zendesk, Linear, GitHub issues',
        href: '/docs/self-driving/signals',
    },
]

// Example scouts, drawn from /docs/self-driving/scout-examples.
const scoutGroups: IconGroup[] = [
    {
        title: 'Canonical scouts',
        description: 'Pre-built to watch common patterns.',
        items: [
            { Icon: IconCheckCircle, color: 'text-green', name: 'Health checks' },
            { Icon: IconStack, color: 'text-blue', name: 'Data pipelines' },
            { Icon: IconSparkles, color: 'text-purple', name: 'AI observability' },
            { Icon: IconSearch, color: 'text-orange', name: 'Observability gaps' },
        ],
    },
    {
        title: 'Custom scouts',
        description: 'Specific to your product.',
        items: [
            { Icon: IconAtSign, color: 'text-sky-blue', name: 'A Slack channel' },
            { Icon: IconBolt, color: 'text-yellow', name: 'A custom event' },
            { Icon: IconCode, color: 'text-blue', name: 'A GitHub repo' },
            { Icon: IconCompass, color: 'text-purple', name: 'The troop itself' },
        ],
    },
]

const loopTabs: TabbedCarouselTab[] = [
    {
        value: 'signals',
        label: 'Signals',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <TabPanel
                title="Notable things"
                highlightedTitle="happening in your product"
                image="https://res.cloudinary.com/dmukukwp6/image/upload/report_177cacd2dd.png"
            >
                <p className="m-0">A signal is a single observation about your product.</p>
                <div className="not-prose mt-4 grid grid-cols-1 gap-x-4 gap-y-3 @sm:grid-cols-2">
                    {signalSources.map(({ Icon, color, name, description, href }) => (
                        <div key={name} className="flex items-start gap-2">
                            <Icon className={`mt-0.5 size-5 shrink-0 ${color}`} />
                            <div>
                                <p className="m-0 text-base font-bold">
                                    <Link
                                        to={href}
                                        state={{ newWindow: true }}
                                        className="text-primary underline underline-offset-2 hover:text-red dark:hover:text-yellow"
                                    >
                                        {name}
                                    </Link>
                                </p>
                                <p className="m-0 text-sm leading-snug text-secondary">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </TabPanel>
        ),
    },
    {
        value: 'scouts',
        label: 'Scouts',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <TabPanel
                title="Specialist agents that"
                highlightedTitle="go deep"
                titleSuffix="on one surface"
                highlightColor="red"
                image={LOOP_SCOUTS_IMAGE}
            >
                <p className="m-0">Scouts run on a schedule and build durable memory of what they've seen.</p>
                <IconGroupColumns groups={scoutGroups} />
            </TabPanel>
        ),
    },
    {
        value: 'inbox',
        label: 'Inbox',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        content: (
            <TabPanel
                title="One"
                highlightedTitle="prioritized list"
                titleSuffix="of work to review"
                highlightColor="yellow"
                image={LOOP_INBOX_IMAGE}
            >
                <p className="m-0">Your Inbox clusters related findings into researched reports, ranked by priority.</p>
                <div className="not-prose mt-4 grid grid-cols-1 gap-4 @sm:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconCode className="size-5 shrink-0 text-blue" />
                            <span className="text-base font-bold text-primary">Code importance</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Is the issue in a hot path like checkout, signup, or billing?
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconPeople className="size-5 shrink-0 text-purple" />
                            <span className="text-base font-bold text-primary">User impact</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            How many users are affected, and are they on a paid plan?
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconWarning className="size-5 shrink-0 text-red" />
                            <span className="text-base font-bold text-primary">Severity</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Is the product broken for these users, or just a minor UX issue?
                        </p>
                    </div>
                </div>
            </TabPanel>
        ),
    },
    {
        value: 'pull-requests',
        label: 'Pull requests',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <TabPanel
                title="Actionable reports, opened as"
                highlightedTitle="pull requests"
                highlightColor="green"
                image={LOOP_MERGE_IMAGE}
            >
                <p className="m-0">
                    When something needs a code change, an agent clones your repo into a sandbox, traces the root cause,
                    writes the code, and opens a pull request. If a report <em>isn't</em> actionable, it triggers a
                    research task.
                </p>
                <div className="not-prose mt-4 grid grid-cols-1 gap-4 @sm:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconSearch className="size-5 shrink-0 text-blue" />
                            <span className="text-base font-bold text-primary">Root cause analysis</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Pairs the signal with your code to find what's actually broken.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconShieldLock className="size-5 shrink-0 text-purple" />
                            <span className="text-base font-bold text-primary">Sandboxed execution</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Clones your repo, applies the fix, and runs your tests.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <IconCheckCircle className="size-5 shrink-0 text-green" />
                            <span className="text-base font-bold text-primary">You review and merge</span>
                        </div>
                        <p className="m-0 mt-1 text-sm leading-snug text-secondary">
                            Chat with the agent to tweak it, or merge as-is (lgtm!).
                        </p>
                    </div>
                </div>
            </TabPanel>
        ),
    },
]

type SelfDrivingPR = {
    prNumber: number
    summary: string
    type: string
    scope: string
    url: string
    mergedAt: string
}

// Conventional-commit type -> tag text color + left accent-stripe color for each ticker card.
const PR_TYPE_STYLES: Record<string, { label: string; accent: string }> = {
    fix: { label: 'text-red', accent: 'bg-red' },
    feat: { label: 'text-green', accent: 'bg-green' },
    perf: { label: 'text-blue', accent: 'bg-blue' },
    refactor: { label: 'text-purple', accent: 'bg-purple' },
    chore: { label: 'text-secondary', accent: 'bg-orange' },
    docs: { label: 'text-secondary', accent: 'bg-orange' },
    test: { label: 'text-secondary', accent: 'bg-orange' },
    style: { label: 'text-secondary', accent: 'bg-orange' },
    build: { label: 'text-secondary', accent: 'bg-orange' },
    ci: { label: 'text-secondary', accent: 'bg-orange' },
}
const prTypeStyle = (type: string) => PR_TYPE_STYLES[type] ?? { label: 'text-primary', accent: 'bg-orange' }

// Soft fade on both edges so cards scroll in/out instead of hard-clipping.
const TICKER_FADE = 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)'

// Short, human "merged N ago" – computed in the browser so it stays fresh between rebuilds.
const timeAgo = (iso: string): string => {
    if (!iso) return ''
    const then = new Date(iso).getTime()
    // Guard against missing/epoch dates (e.g. a PR with no merge date) rendering as "2949w ago".
    if (Number.isNaN(then) || then <= 0) return ''
    const seconds = Math.max(0, (Date.now() - then) / 1000)
    const days = Math.floor(seconds / 86400)
    if (days >= 7) return `${Math.floor(days / 7)}w ago`
    if (days >= 1) return `${days}d ago`
    const hours = Math.floor(seconds / 3600)
    if (hours >= 1) return `${hours}h ago`
    const minutes = Math.floor(seconds / 60)
    return minutes >= 1 ? `${minutes}m ago` : 'just now'
}

const TickerCard = ({ pr }: { pr: SelfDrivingPR }): JSX.Element => {
    const style = prTypeStyle(pr.type)
    return (
        <Link
            to={pr.url}
            external
            externalNoIcon
            className="group relative flex w-[300px] flex-shrink-0 items-start gap-2.5 overflow-hidden rounded-md border border-primary bg-primary py-2.5 pl-4 pr-3.5 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-secondary hover:shadow-md"
        >
            {/* Type-colored accent stripe down the left edge */}
            <span className={`absolute inset-y-0 left-0 w-1 ${style.accent}`} aria-hidden />
            <IconPullRequest className="mt-0.5 size-4 shrink-0 text-green" />
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wide">
                    <span className={style.label}>{pr.type || 'merged'}</span>
                    {pr.scope && <span className="truncate normal-case text-secondary">{pr.scope}</span>}
                </div>
                <p className="m-0 truncate text-sm text-primary group-hover:underline">{pr.summary}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-secondary">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green/10 px-1.5 py-px font-semibold text-green">
                        <IconCheckCircle className="size-3" />
                        merged
                    </span>
                    <span className="font-mono">#{pr.prNumber}</span>
                    <span aria-hidden>·</span>
                    {/* Relative time is computed at render, so it differs between the SSR build and
                        the client – suppress the expected hydration mismatch on this text node. */}
                    <span suppressHydrationWarning>{timeAgo(pr.mergedAt)}</span>
                </div>
            </div>
        </Link>
    )
}

// One continuously scrolling row. `direction` sets scroll direction (1 = left→right rail advance,
// -1 = the reverse). Pauses on hover/focus and stops entirely for reduced-motion users.
const TickerRow = ({ prs, direction }: { prs: SelfDrivingPR[]; direction: 1 | -1 }): JSX.Element => {
    const railRef = React.useRef<HTMLDivElement>(null)
    const pausedRef = React.useRef(false)

    // Two copies of the list so scrollLeft can wrap seamlessly at either end.
    const loop = [...prs, ...prs]

    React.useEffect(() => {
        const rail = railRef.current
        if (!rail || prs.length === 0) return
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return

        let frame = 0
        // Keep a float accumulator: writing to scrollLeft rounds to whole pixels, so a
        // sub-pixel step read back from scrollLeft rounds away to nothing (the reverse row
        // never moves and the wrap logic teleports it). Track the true position ourselves
        // and wrap by modulo so both directions advance smoothly at the intended speed.
        let pos = rail.scrollLeft
        const step = () => {
            if (!pausedRef.current) {
                const half = rail.scrollWidth / 2
                if (half > 0) {
                    pos = (pos + 0.5 * direction) % half
                    if (pos < 0) pos += half
                    rail.scrollLeft = pos
                }
            }
            frame = requestAnimationFrame(step)
        }
        frame = requestAnimationFrame(step)
        return () => cancelAnimationFrame(frame)
    }, [prs.length, direction])

    const pause = () => {
        pausedRef.current = true
    }
    const resume = () => {
        pausedRef.current = false
    }

    return (
        <div
            ref={railRef}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocusCapture={pause}
            onBlurCapture={resume}
            className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ maskImage: TICKER_FADE, WebkitMaskImage: TICKER_FADE }}
        >
            {loop.map((pr, i) => (
                <TickerCard key={`${pr.prNumber}-${i}`} pr={pr} />
            ))}
        </div>
    )
}

// A "wall of merges": one row when there are only a few PRs, two rows scrolling in
// opposite directions when there are enough to fill them.
const SelfDrivingTicker = ({ prs }: { prs: SelfDrivingPR[] }): JSX.Element | null => {
    if (prs.length === 0) return null
    const twoRows = prs.length >= 6
    const mid = Math.ceil(prs.length / 2)
    const rowA = twoRows ? prs.slice(0, mid) : prs
    const rowB = twoRows ? prs.slice(mid) : []

    return (
        <div className="not-prose flex flex-col gap-3">
            <TickerRow prs={rowA} direction={1} />
            {rowB.length > 0 && <TickerRow prs={rowB} direction={-1} />}
        </div>
    )
}

type Product = {
    handle: string
    name: string
    slug?: string
    Icon?: IconComponent
    color?: string
    status?: string
}

const workSurfaces: {
    Icon: IconComponent
    iconColor: string
    label: React.ReactNode
    copy: React.ReactNode
    cta?: React.ReactNode
}[] = [
    {
        Icon: IconCoffee,
        iconColor: 'text-brown dark:text-brown-dark',
        label: (
            <span className="inline-flex items-center gap-2">
                <Link to="/desktop" state={{ newWindow: true }} className="font-bold text-primary">
                    PostHog Desktop
                </Link>
                <span className="inline-flex items-center rounded-sm bg-yellow/15 px-1 py-0.5 text-xs font-bold text-yellow">
                    Beta
                </span>
            </span>
        ),
        copy: 'A desktop app for driving parallel agents to edit your product. The same Inbox and reports live here.',
        cta: (
            <CallToAction to="/desktop" state={{ newWindow: true }} type="secondary" size="md">
                Get the app
            </CallToAction>
        ),
    },
    {
        Icon: IconBolt,
        iconColor: 'text-red',
        label: <span className="font-bold text-primary">PostHog Web</span>,
        copy: 'The full product in your browser. Explore your data, review proposed work, and dig into the evidence.',
        cta: (
            <CallToAction to="https://app.posthog.com/signup" externalNoIcon type="primary" size="md">
                Sign up for free
            </CallToAction>
        ),
    },
    {
        Icon: IconAtSign,
        iconColor: 'text-sky-blue',
        label: (
            <Link to="/slack" state={{ newWindow: true }} className="font-bold text-primary">
                PostHog Slack
            </Link>
        ),
        copy: '@PostHog brings reports, data answers, and agent work into the channels each team already watches.',
        cta: (
            <CallToAction to="/slack" state={{ newWindow: true }} type="secondary" size="md">
                Add to Slack
            </CallToAction>
        ),
    },
    {
        Icon: IconPlug,
        iconColor: 'text-gray',
        label: (
            <Link to="/mcp" state={{ newWindow: true }} className="font-bold text-primary">
                PostHog MCP
            </Link>
        ),
        copy: 'Pull self-driving context into other tools, and pull context from your other tools into PostHog.',
        cta: (
            <CallToAction to="/mcp" state={{ newWindow: true }} type="secondary" size="md">
                Hook it up
            </CallToAction>
        ),
    },
    {
        Icon: IconTerminal,
        iconColor: 'text-green',
        label: (
            <Link to="/docs/cli" state={{ newWindow: true }} className="font-bold text-primary">
                PostHog CLI
            </Link>
        ),
        copy: 'Self-driving from your terminal. Query your data and drive agents right where you already work, and wire it into your scripts and CI.',
        cta: (
            <CallToAction to="/docs/cli" state={{ newWindow: true }} type="secondary" size="md">
                Read the docs
            </CallToAction>
        ),
    },
]

const automaticToolHandles = [
    'product_analytics',
    'web_analytics',
    'ai_observability',
    'session_replay',
    'replay_vision',
    'feature_flags',
    'experiments',
    'error_tracking',
    'logs',
    'endpoints',
    'workflows_emails',
    'surveys',
    'heatmaps',
    'group_analytics',
]

const ProductRow = ({ product }: { product: Product }): JSX.Element => {
    const Icon = product.Icon
    const isWIP = product.status === 'WIP'

    return (
        <Link
            to={`/${product.slug}`}
            state={{ newWindow: true }}
            className={`group flex w-full items-center gap-2 py-0.5 text-left ${
                isWIP ? 'pointer-events-none opacity-60' : ''
            }`}
        >
            {Icon && <Icon className={`size-6 shrink-0 text-${product.color || 'gray'}`} />}
            <span className="text-base font-medium text-primary group-hover:underline group-hover:underline-offset-2">
                {product.name}
            </span>
            {product.status && (
                <span
                    className={`size-1.5 shrink-0 rounded-full ${
                        product.status === 'beta' ? 'bg-yellow' : product.status === 'alpha' ? 'bg-orange' : 'bg-red'
                    }`}
                />
            )}
        </Link>
    )
}

const AutomaticToolingSection = (): JSX.Element => {
    const allProducts = useProduct() as Product[]
    const productsByHandle = React.useMemo(
        () =>
            allProducts.reduce<Record<string, Product>>((acc, product) => {
                acc[product.handle] = product
                return acc
            }, {}),
        [allProducts]
    )

    return (
        <section className="not-prose my-12 space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0">
                <h2 className="m-0 text-2xl font-bold @md/reader-content:text-3xl">
                    Give your agents the tools they need
                </h2>
                <p className="mt-2 mb-0 w-full text-base leading-relaxed text-secondary">
                    PostHog gives your product the context it needs to become self-driving: usage, errors, replays,
                    flags, experiments, feedback, logs, and the tools agents use to act on what they learn.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-1.5 @md/reader-content:grid-cols-2 @3xl/reader-content:grid-cols-3">
                {automaticToolHandles.map((handle) => {
                    const product = productsByHandle[handle]
                    if (!product?.slug) return null
                    return <ProductRow key={handle} product={product} />
                })}
            </div>
        </section>
    )
}

const ContextWarehouseSection = (): JSX.Element => (
    <section className="not-prose my-12">
        <h2 className="m-0 text-2xl font-bold @md/reader-content:text-3xl">
            Everything lives in your context warehouse
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-secondary">
            Use PostHog as the full context layer for your product, or mix and match with your own tools.
        </p>
        <CatalogLayers />
    </section>
)

type HumanRole = {
    heading: string
    copy: string
    image: CloudinarySrc
    alt: string
}

const humanRoles: HumanRole[] = [
    {
        heading: "You're (still) the driver",
        copy: "Like a Waymo, a self-driving product doesn't decide where you're going (it just makes getting there easier). You choose where the product goes next.",
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/w_500,c_limit,q_auto,f_auto/hog_head_point_b6a2ffb400.png',
        alt: 'A hedgehog pointing to the side',
    },
    {
        heading: 'Skip to the good part',
        copy: "Somebody's gotta clean up around here. Turns out it doesn't have to be you. Bug fixes and maintenance work land in your inbox. Hit merge and move on with your day.",
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_popcorn_82aa11ea69.png',
        alt: 'A hedgehog eating popcorn',
    },
    {
        heading: 'Outship everyone',
        copy: "Product capability used to scale with headcount. Now it's handled (without adding any). A small team with self-driving can outship companies 10x the size.",
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_laptop_2afc8d8955.png',
        alt: 'A hedgehog working at a laptop',
    },
]

const QuestionsSection = (): JSX.Element => {
    const { openNewChat } = useApp()

    return (
        <section className="not-prose my-12">
            <h2 className="m-0 text-2xl font-bold @md/reader-content:text-3xl">Questions?</h2>
            <div className="mt-4 max-w-2xl">
                <h3 className="mb-2 text-lg font-semibold text-secondary">Answers</h3>
                <p className="mb-6 text-base leading-relaxed text-secondary">
                    There are a few ways you can get answers to specific questions about self-driving products.
                </p>
                <ol className="space-y-4 pl-6">
                    <li className="list-decimal">
                        <Link to="/docs/self-driving" state={{ newWindow: true }} className="font-bold underline">
                            Check the docs
                        </Link>
                        <p className="m-0 mt-1 text-base text-secondary">
                            Read how Inbox, signal sources, scouts, reports, and pull requests fit together.
                        </p>
                    </li>
                    <li className="list-decimal">
                        <Link
                            to="#"
                            onClick={() =>
                                openNewChat({
                                    path: 'ask-max-/self-driving',
                                    context: [
                                        {
                                            type: 'page',
                                            value: { path: '/self-driving', label: 'Self-driving' },
                                        },
                                    ],
                                })
                            }
                            className="font-bold underline"
                        >
                            Ask PostHog AI <IconArrowUpRight className="inline-block size-4 opacity-75" />
                        </Link>
                        <p className="m-0 mt-1 text-base text-secondary">
                            Ask about the product, docs, examples, or how this fits your own workflow.
                        </p>
                    </li>
                    <li className="list-decimal">
                        <Link to="/talk-to-a-human" className="font-bold underline" state={{ newWindow: true }}>
                            Talk to a human <IconArrowUpRight className="inline-block size-4 opacity-75" />
                        </Link>
                        <p className="m-0 mt-1 text-base text-secondary">
                            Useful for questions about setup, terms, volume, or whether self-driving fits your team.
                        </p>
                    </li>
                </ol>
            </div>
        </section>
    )
}

export default function SelfDrivingPage({
    data,
}: {
    data?: { allSelfDrivingPullRequest?: { nodes: SelfDrivingPR[] } }
}): JSX.Element {
    const selfDrivingPRs = data?.allSelfDrivingPullRequest?.nodes ?? []
    const humanRoleCardBackground = WINDOW_BG
    return (
        <>
            <SEO
                title="PostHog self-driving"
                description="PostHog is the context warehouse and product toolkit that helps humans and AI agents understand, improve, and ship better products."
                image="/images/og/default.png"
            />
            <ReaderView
                proseSize="lg"
                hideLeftSidebar
                showQuestions={false}
                title="self-driving.md"
                hideTitle
                className="overflow-x-hidden"
            >
                <div className="relative z-10">
                    <div className="not-prose mb-8 pt-2 @lg/reader-content:pt-6 @3xl:mb-12">
                        <section className="mx-auto grid max-w-6xl gap-6 @3xl/reader-content:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)] @3xl/reader-content:items-center">
                            <div>
                                <h1 className="m-0 text-3xl font-bold !leading-tight @md/reader-content:text-4xl @3xl/reader-content:text-5xl">
                                    What if your product
                                    <br />
                                    <span className="whitespace-nowrap">
                                        <Highlight>built itself?</Highlight>
                                    </span>
                                </h1>
                                <p className="mt-5 mb-0 max-w-3xl text-lg leading-relaxed text-secondary">
                                    <strong className="text-primary">
                                        You have a new pull request ready for review.
                                    </strong>{' '}
                                    <em>(Yep, really.)</em>
                                </p>
                                <p className="mb-0 mt-6 max-w-3xl text-[15px] text-secondary @xl/reader-content:text-[17px]">
                                    While you slept, PostHog dug through your product data, found what was worth fixing,
                                    and had agents do the work. <Highlight>All you need to do is hit merge.</Highlight>
                                </p>
                                <p className="mb-0 mt-4 max-w-3xl text-[15px] text-secondary @xl/reader-content:text-[17px]">
                                    PostHog instruments your codebase, then combines that context with
                                    product data like analytics events, errors, and recordings to understand problems and
                                    propose fixes.
                                </p>
                                <GetStarted selfDriving />
                            </div>

                            <div className="relative overflow-hidden rounded-md border border-primary bg-primary shadow-2xl">
                                <div className="h-64 overflow-hidden bg-accent @sm/reader-content:h-72 @xl/reader-content:h-80">
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/inbox_light_9aa9eed335.png"
                                        alt="The Inbox surfacing reports and pull requests across PostHog Desktop and the cloud"
                                        className="dark:hidden w-full"
                                        imgClassName="block w-full"
                                    />
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/inbox_dark_216a157762.png"
                                        alt="The Inbox surfacing reports and pull requests across PostHog Desktop and the cloud"
                                        className="hidden dark:block w-full"
                                        imgClassName="block w-full"
                                    />
                                </div>
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/self_driving_with_road_3ff29b8dc3.png"
                                    alt=""
                                    aria-hidden
                                    imgClassName="pointer-events-none absolute inset-x-0 bottom-0 z-30 block w-full max-w-none"
                                />
                            </div>
                        </section>
                    </div>

                    <div className="mx-auto max-w-6xl">
                        {/* How a product develops itself */}
                        <h2 id="how" className={sectionHeadingClassName}>
                            How PostHog makes your product self-driving
                        </h2>
                        <div className="not-prose my-6">
                            <TabbedCarousel tabs={loopTabs} variant="hero" />
                        </div>

                        {/* PostHog agents run on their own, but don't run wild */}
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/transformer_hedgehog_2a379334d7.png"
                            alt="A hedgehog transforming into a self-driving machine"
                            className="@lg/reader-content:float-right @lg/reader-content:max-w-[220px] @lg/reader-content:ml-6 mb-4 mt-2"
                            imgClassName="w-full"
                        />
                        <h3 className={sectionHeadingClassName}>PostHog agents run on their own, but don't run wild</h3>
                        <p>
                            Self-driving is autonomy from instruction, not from you. Agents work in the background
                            without you prompting them to make progress, but nothing ships on autopilot.
                        </p>
                        <IconList
                            items={[
                                {
                                    Icon: IconShieldLock,
                                    color: 'text-purple',
                                    text: (
                                        <>
                                            <strong className="text-primary">It's stuck in a sandbox.</strong> Work
                                            happens in the cloud, nowhere near your repo. Agents follow your branch
                                            protections, CI, and review rules.
                                        </>
                                    ),
                                },
                                {
                                    Icon: IconPullRequest,
                                    color: 'text-red dark:text-yellow',
                                    text: (
                                        <>
                                            <strong className="text-primary">The work can't merge itself.</strong>{' '}
                                            Nothing reaches production until a human clicks merge. Robots don't touch
                                            the big green button.
                                        </>
                                    ),
                                },
                                {
                                    Icon: IconStack,
                                    color: 'text-blue',
                                    text: (
                                        <>
                                            <strong className="text-primary">PRs {'>'} Issues.</strong> Raw signals are
                                            deduped and clustered into reports. Actionable ones become PRs. You only pay
                                            for real work completed.
                                        </>
                                    ),
                                },
                                {
                                    Icon: IconLock,
                                    color: 'text-green',
                                    text: (
                                        <>
                                            <strong className="text-primary">Your secrets are safe.</strong> Literally,
                                            and so is your code. Private repos stay private, and so does your data.
                                            (We're training AI models, but{' '}
                                            <Link to="/blog/training-ai-models" state={{ newWindow: true }}>
                                                not on your code
                                            </Link>
                                            .)
                                        </>
                                    ),
                                },
                            ]}
                        />
                        <div className="clear-both" />

                        {/* Live ticker: real self-driving PRs merged into PostHog's own repo */}
                        {selfDrivingPRs.length > 0 && (
                            <div className="not-prose my-8 overflow-hidden rounded-md border border-primary bg-accent p-4 @md/reader-content:p-6">
                                <div className="mb-3 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        {/* Pulsing "live" indicator */}
                                        <span className="relative flex size-2 shrink-0">
                                            <span className="absolute inline-flex size-full animate-pulse rounded-full bg-green opacity-75" />
                                            <span className="relative inline-flex size-2 rounded-full bg-green" />
                                        </span>
                                        <p className="m-0 font-mono text-[11px] font-bold uppercase tracking-wider text-secondary">
                                            Merged into PostHog by self-driving
                                        </p>
                                    </div>
                                    <Link
                                        to="https://github.com/PostHog/posthog/pulls?q=is%3Apr+is%3Amerged+%22from+an+inbox+report%22"
                                        external
                                        externalNoIcon
                                        className="whitespace-nowrap text-xs font-semibold text-red dark:text-yellow"
                                    >
                                        See them all →
                                    </Link>
                                </div>
                                <SelfDrivingTicker prs={selfDrivingPRs} />
                            </div>
                        )}

                        {/* Works in your workflow */}
                        <h3 className={sectionHeadingClassName}>Works in your workflow</h3>
                        <p className="mb-0">
                            <span className="block">The same Inbox and agents show up wherever your team works.</span>
                        </p>
                        <div className="not-prose mt-8 mb-12 grid gap-4 @md/reader-content:grid-cols-2 @4xl/reader-content:grid-cols-3">
                            {workSurfaces.map(({ Icon, iconColor, label, copy, cta }, index) => (
                                <div
                                    key={index}
                                    className="flex min-h-full flex-col rounded-md border border-primary bg-primary p-5 shadow-sm @lg/reader-content:p-6"
                                >
                                    <p className="m-0 flex items-center gap-2 text-lg font-bold text-primary">
                                        <Icon className={`size-5 shrink-0 ${iconColor}`} />
                                        {label}
                                    </p>
                                    <p className="m-0 mt-3 text-sm text-secondary">{copy}</p>
                                    {cta && <div className="mt-auto flex justify-start pt-5">{cta}</div>}
                                </div>
                            ))}
                        </div>

                        <AutomaticToolingSection />
                        <ContextWarehouseSection />

                        {/* So, what's left for you? */}
                        <h3 className={sectionHeadingClassName}>So, what's left for you?</h3>
                        <p className="max-w-xl">
                            Work lands while you sleep. You wake up to diffs and reports waiting for review.{' '}
                            <em>Then what?</em>
                        </p>
                        <div className="not-prose grid grid-cols-1 @md/reader-content:grid-cols-3 gap-3 my-6">
                            {humanRoles.map(({ heading, copy, image, alt }) => (
                                <div
                                    key={heading}
                                    className={`flex flex-col overflow-hidden rounded-md border border-primary ${humanRoleCardBackground}`}
                                >
                                    <div className="p-4">
                                        <p className="m-0 text-base font-bold text-primary">{heading}</p>
                                        <p className="m-0 mt-1 text-base text-secondary">{copy}</p>
                                    </div>
                                    <div className="mt-auto px-6 @md/reader-content:px-8">
                                        <CloudinaryImage
                                            src={image}
                                            alt={alt}
                                            className="w-full !block"
                                            imgClassName="w-full !block"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <QuestionsSection />
                    </div>
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql`
    query SelfDrivingPage {
        allSelfDrivingPullRequest(
            filter: { state: { eq: "merged" } }
            sort: { fields: mergedAt, order: DESC }
            limit: 24
        ) {
            nodes {
                prNumber
                summary
                type
                scope
                url
                mergedAt
            }
        }
    }
`
