import React, { useState, useEffect, useMemo } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { QuestLog, QuestLogItem } from 'components/Docs/QuestLog'
import { CallToAction } from 'components/CallToAction'
import { ProductScreenshot } from 'components/ProductScreenshot'
import { ProductVideo } from 'components/ProductVideo'
import List from 'components/List'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import { SingleCodeBlock } from 'components/CodeBlock'
import WizardCTA from 'components/WizardCTA'
import usePlatformList from 'hooks/docs/usePlatformList'
import ElevenLabsLogo from 'components/CustomerLogos/ElevenLabsLogo'
import HeygenLogo from 'components/CustomerLogos/HeygenLogo'
import FireworksAILogo from 'components/CustomerLogos/FireworksAILogo'
import { CalloutBox } from 'components/Docs/CalloutBox'
import useProduct from 'hooks/useProduct'
import 'components/Home/HeroCarousel/ProductContextDemo/animations.css'
import { Popover } from 'components/RadixUI/Popover'
import { IconRewindPlay, IconWarning, IconCode2, IconGanttChart, IconTrends } from '@posthog/icons'

const CONNECTIONS = [
    {
        source: 'error_tracking',
        label: 'Errors',
        from: 'From an error',
        cards: [
            {
                handles: ['session_replay'],
                name: 'Session replay',
                description: 'Watch the replay of the user who hit it.',
            },
            { handles: ['logs'], name: 'Logs', description: 'Read the logs from the same trace, span, or session.' },
            {
                handles: ['traces'],
                name: 'Tracing',
                description: 'Open the trace behind it, when your server SDK attaches trace context.',
            },
        ],
    },
    {
        source: 'session_replay',
        label: 'Replays',
        from: 'From a replay',
        cards: [
            {
                handles: ['error_tracking'],
                name: 'Error tracking',
                description: 'See the exceptions from the same session.',
            },
            {
                handles: ['logs'],
                name: 'Logs',
                description: 'See the backend logs from the same session.',
            },
        ],
    },
    {
        source: 'logs',
        label: 'Logs',
        from: 'From a log',
        cards: [
            {
                handles: ['session_replay'],
                name: 'Session replay',
                description: 'Jump to the replay of the user who triggered it.',
            },
            {
                handles: ['error_tracking'],
                name: 'Error tracking',
                description: 'See error tracking issues from the same session.',
            },
        ],
    },
    {
        source: 'traces',
        label: 'Traces',
        from: 'From a trace',
        cards: [
            {
                handles: ['session_replay'],
                name: 'Session replay',
                description: 'Watch the replay of the user who waited through it.',
            },
            {
                handles: ['error_tracking'],
                name: 'Error tracking',
                description: 'See the exceptions from the span, the trace, or the session.',
            },
            { handles: ['logs'], name: 'Logs', description: 'Read the logs for one span or the whole trace.' },
        ],
    },
    {
        source: 'metrics',
        label: 'Metrics',
        from: 'From a metric',
        cards: [
            {
                handles: ['traces'],
                name: 'Tracing',
                description:
                    'Click an exemplar to open the trace behind a data point, or jump to the traces for the same service and time window.',
            },
            {
                handles: ['logs'],
                name: 'Logs',
                description: 'Jump to the logs for the same service and time window.',
            },
        ],
    },
]

/** Each product's QuestLog step on this page */
const PRODUCT_STEPS: Record<string, string> = {
    error_tracking: 'quest-item-catch-every-exception',
    session_replay: 'quest-item-watch-the-session-with-the-console-open',
    logs: 'quest-item-search-and-tail-your-logs',
    traces: 'quest-item-follow-a-request-across-services',
}

/** Words in each connection's description that link to the product's step, most specific first */
const ANCHOR_TEXT: Record<string, string[]> = {
    session_replay: ['replay'],
    logs: ['backend logs', 'logs'],
    traces: ['trace'],
    error_tracking: ['error tracking issues', 'exceptions'],
}

const ConnectionCards = ({
    cards,
    allProducts,
    onNavigate,
}: {
    cards: (typeof CONNECTIONS)[number]['cards']
    allProducts: any[]
    onNavigate: () => void
}) => (
    <ul className="list-none m-0 p-0 not-prose space-y-1.5">
        {cards.map((card) => {
            const handle = card.handles[0]
            const product = allProducts.find((product) => product.handle === handle)
            const anchor = ANCHOR_TEXT[handle]?.find((text) => card.description.includes(text)) || ''
            const index = anchor ? card.description.indexOf(anchor) : -1
            const goToStep = () => {
                onNavigate()
                // Wait for the popover to close and hand focus back, or that cancels the scroll
                setTimeout(
                    () =>
                        document
                            .getElementById(PRODUCT_STEPS[handle])
                            ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
                    50
                )
            }
            return (
                <li key={card.description} className="m-0 flex items-start gap-1.5 text-sm leading-snug text-secondary">
                    {product?.Icon && (
                        <span className={`inline-block shrink-0 size-4 mt-px text-${product.color}`}>
                            <product.Icon />
                        </span>
                    )}
                    {index >= 0 ? (
                        <span>
                            {card.description.slice(0, index)}
                            <button
                                type="button"
                                onClick={goToStep}
                                className="font-semibold text-primary underline hover:text-red dark:hover:text-yellow"
                            >
                                {anchor}
                            </button>
                            {card.description.slice(index + anchor.length)}
                        </span>
                    ) : (
                        <span>{card.description}</span>
                    )}
                </li>
            )
        })}
    </ul>
)

/** Node positions share the map SVG's 1000 × 620 coordinate system */
const MAP_NODES: Record<string, { x: number; y: number }> = {
    error_tracking: { x: 500, y: 90 },
    session_replay: { x: 850, y: 250 },
    traces: { x: 730, y: 530 },
    metrics: { x: 270, y: 530 },
    logs: { x: 150, y: 250 },
}

const ConnectionMap = ({ allProducts }: { allProducts: any[] }) => {
    const [selected, setSelected] = useState(CONNECTIONS[0].source)
    const [openNode, setOpenNode] = useState<string | null>(null)
    const active = CONNECTIONS.find((connection) => connection.source === selected) || CONNECTIONS[0]
    const connected = new Set(active.cards.flatMap((card) => card.handles))
    const productFor = (handle: string) => allProducts.find((product) => product.handle === handle)

    // Every link any starting point has, drawn faintly so the whole web is visible
    const allEdges = new Set(
        CONNECTIONS.flatMap(({ source, cards }) =>
            cards.flatMap((card) => card.handles.map((handle) => [source, handle].sort().join('|')))
        )
    )
    const edgePath = (from: string, to: string) =>
        `M ${MAP_NODES[from].x} ${MAP_NODES[from].y} L ${MAP_NODES[to].x} ${MAP_NODES[to].y}`

    return (
        <div className="not-prose mb-6">
            <p className="text-sm text-secondary mb-2">Click a product to see what it links to.</p>
            <figure
                className="product-context-demo @container aspect-[1000/620] paper-desk relative w-full m-0 mb-4 border border-primary rounded"
                data-running="true"
            >
                <figcaption className="sr-only">Pick a starting point to see which products it links to.</figcaption>
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 620" fill="none" aria-hidden="true">
                    {Array.from(allEdges).map((edge) => {
                        const [a, b] = edge.split('|')
                        return (
                            <path
                                key={edge}
                                d={edgePath(a, b)}
                                className="stroke-[rgb(var(--border))] stroke-2 [stroke-dasharray:6_6]"
                            />
                        )
                    })}
                    {Array.from(connected).map((handle, index) => (
                        <g key={`${active.source}-${handle}`} className={`text-${productFor(handle)?.color}`}>
                            <path
                                d={edgePath(active.source, handle)}
                                className="stroke-current stroke-[3] opacity-40"
                            />
                            <path
                                d={edgePath(active.source, handle)}
                                pathLength="100"
                                className="context-pulse stroke-current stroke-[6] [stroke-linecap:round] [stroke-dasharray:8_100]"
                                style={{ animationDelay: `${index * -0.6}s` }}
                            />
                        </g>
                    ))}
                </svg>

                {CONNECTIONS.map(({ source, label, from, cards }) => {
                    const product = productFor(source)
                    const Icon = product?.Icon || IconTrends // Metrics has no product data entry
                    const isSelected = source === active.source
                    const isLit = isSelected || connected.has(source)
                    return (
                        <Popover
                            key={source}
                            dataScheme="primary"
                            header
                            title={from}
                            side={
                                MAP_NODES[source].y < 150
                                    ? 'bottom'
                                    : MAP_NODES[source].y > 400
                                    ? 'top'
                                    : MAP_NODES[source].x < 500
                                    ? 'right'
                                    : 'left'
                            }
                            contentClassName={`${
                                ['error_tracking', 'session_replay', 'logs', 'metrics', 'traces'].includes(source)
                                    ? 'w-[min(560px,92vw)]'
                                    : 'w-[min(380px,90vw)]'
                            } max-h-[var(--radix-popover-content-available-height)] overflow-y-auto overflow-x-hidden p-3`}
                            open={openNode === source}
                            onOpenChange={(open) => setOpenNode(open ? source : null)}
                            trigger={
                                <button
                                    type="button"
                                    aria-pressed={isSelected}
                                    onClick={() => setSelected(source)}
                                    aria-haspopup="dialog"
                                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-[1cqw] px-[2cqw] py-[1.2cqw] rounded-md border bg-primary whitespace-nowrap font-semibold text-primary text-[clamp(12px,3cqw,17px)] transition-all hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                                        isSelected
                                            ? 'border-primary shadow-lg scale-110 hover:scale-110'
                                            : 'border-primary'
                                    } ${isLit ? 'opacity-100' : 'opacity-40'}`}
                                    style={{
                                        left: `${MAP_NODES[source].x / 10}%`,
                                        top: `${(MAP_NODES[source].y / 620) * 100}%`,
                                    }}
                                >
                                    <Icon
                                        aria-hidden="true"
                                        className={`size-[clamp(14px,3.4cqw,22px)] shrink-0 ${
                                            product ? `text-${product.color}` : 'text-secondary'
                                        }`}
                                    />
                                    {label}
                                </button>
                            }
                        >
                            <ConnectionCards
                                cards={cards}
                                allProducts={allProducts}
                                onNavigate={() => setOpenNode(null)}
                            />
                            {source === 'error_tracking' && (
                                <div className="mt-3">
                                    <ProductVideo
                                        videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/Error_tracking_sessions_0b0a535be8.mp4"
                                        videoDark={undefined}
                                        autoPlay={true}
                                        loop={true}
                                        classes="rounded border border-primary"
                                    />
                                </div>
                            )}
                            {source === 'logs' && (
                                <div className="mt-3">
                                    <ProductScreenshot
                                        imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/SCR_20260427_tlab_c79adf4315.png"
                                        imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/SCR_20260427_tpbx_e2154c4155.png"
                                        alt="Logs linked to a session replay"
                                        classes="rounded"
                                        padding={false}
                                        zoom={undefined}
                                    />
                                </div>
                            )}
                            {source === 'metrics' && (
                                <div className="mt-3">
                                    <ProductScreenshot
                                        imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/from_metrics_to_logs_errors_traces_light_408558618e.png"
                                        imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/from_metrics_to_logs_traces_errors_dark_d918b9ec7f.png"
                                        alt="A metric chart with an anomaly badge and the Related menu open to logs, error logs, and traces"
                                        classes="rounded"
                                        padding={false}
                                        zoom={undefined}
                                    />
                                </div>
                            )}
                            {source === 'traces' && (
                                <div className="mt-3">
                                    <ProductScreenshot
                                        imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/trace_to_log_light_focused_4ab58fb576.png"
                                        imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/trace_to_log_focused_a353d39876.png"
                                        alt="The span inspector for a failed span, with its Logs tab showing the log lines from the same trace"
                                        classes="rounded"
                                        padding={false}
                                        zoom={undefined}
                                    />
                                </div>
                            )}
                            {source === 'session_replay' && (
                                <div className="mt-3">
                                    <ProductScreenshot
                                        imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/replay_to_logs_light_8454e55a6f.png"
                                        imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/replay_to_logs_dark_96d0f05a53.png"
                                        alt="A session replay with the inspector's Logs filter on, showing backend logs from the same session"
                                        classes="rounded"
                                        padding={false}
                                        zoom={undefined}
                                    />
                                </div>
                            )}
                        </Popover>
                    )
                })}
            </figure>
        </div>
    )
}

const TOP_COUNT = 8
const PLATFORM_ORDER = [
    '/docs/error-tracking/installation/nextjs',
    '/docs/error-tracking/installation/react',
    '/docs/error-tracking/installation/web',
    '/docs/error-tracking/installation/react-native',
    '/docs/error-tracking/installation/node',
    '/docs/error-tracking/installation/python',
    '/docs/error-tracking/installation/manual',
    '/docs/error-tracking/installation/flutter',
    '/docs/error-tracking/installation/nuxt',
    '/docs/error-tracking/installation/angular',
    '/docs/error-tracking/installation/android',
    '/docs/error-tracking/installation/svelte',
    '/docs/error-tracking/installation/hono',
    '/docs/error-tracking/installation/ruby',
    '/docs/error-tracking/installation/ios',
    '/docs/error-tracking/installation/go',
]

export default function PostHogObservabilityLanding(): JSX.Element {
    const [showMore, setShowMore] = useState(false)
    const [isIdle, setIsIdle] = useState(false)
    const allProducts = useProduct() as any[]

    const handleScrollToMCP = () => {
        document.getElementById('quest-item-let-your-ai-agent-debug-for-you')?.scrollIntoView({ behavior: 'smooth' })
    }

    const [installMCPCopied, setInstallMCPCopied] = useState(false)

    const handleCopyMCP = () => {
        navigator.clipboard.writeText('npx @posthog/wizard mcp add')
        setInstallMCPCopied(true)
        setTimeout(() => setInstallMCPCopied(false), 2000)
    }

    const allPlatforms = usePlatformList('docs/error-tracking/installation', 'observability installation')
    const sortedPlatforms = useMemo(() => {
        const indexed = new Map(allPlatforms.map((p) => [p.url, p]))
        const ordered = PLATFORM_ORDER.map((url) => indexed.get(url)).filter(Boolean) as typeof allPlatforms
        const unlisted = allPlatforms.filter((p) => !PLATFORM_ORDER.includes(p.url))
        const all = [...ordered, ...unlisted]
        return { top: all.slice(0, TOP_COUNT), rest: all.slice(TOP_COUNT) }
    }, [allPlatforms])

    useEffect(() => {
        let idleTimer: ReturnType<typeof setTimeout>

        const handleActivity = () => {
            setIsIdle(false)
            clearTimeout(idleTimer)
            idleTimer = setTimeout(() => setIsIdle(true), 2000)
        }

        handleActivity()
        window.addEventListener('pointermove', handleActivity)
        window.addEventListener('keydown', handleActivity)

        const scrollViewport = document.querySelector('[data-radix-scroll-area-viewport]')
        scrollViewport?.addEventListener('scroll', handleActivity)

        return () => {
            clearTimeout(idleTimer)
            window.removeEventListener('pointermove', handleActivity)
            window.removeEventListener('keydown', handleActivity)
            scrollViewport?.removeEventListener('scroll', handleActivity)
        }
    }, [])

    return (
        <>
            <SEO
                title="Observability built for product engineers"
                description="PostHog Observability bundles error tracking, session replay, logs, traces, and metrics into one tool, wired up to MCP so your AI agent can investigate issues end to end. Free tier covers 100k exceptions, 5k recordings, and 10 GB of logs and traces every month."
                noindex
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                hideTitle
                title="Observability built for product engineers"
                contentMaxWidthClass="max-w-5xl"
                showQuestions={false}
            >
                <div className="grid grid-cols-1 @lg:grid-cols-[2fr_0.6fr] gap-10 items-center mb-6 max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-3xl md:text-5xl !mb-4">
                            Your errors, replays, logs, and traces already know each other
                        </h1>
                        <p className="text-lg md:text-xl !mb-6 text-secondary">
                            Error tracking, session replay, logs, traces, and metrics in one place. Frontend errors and
                            replays share the same user and session out of the box. Backend errors, logs, and traces
                            join them once your server passes the PostHog session ID. An MCP server so you can debug
                            without ever opening a dashboard or learning a UI.
                            <br />
                            Time to make it official.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                Get started free
                            </CallToAction>
                            <CallToAction type="secondary" size="md" onClick={handleScrollToMCP}>
                                Install MCP
                            </CallToAction>
                        </div>
                        <p className="text-sm !mb-0 text-secondary">
                            The wizard sets up{' '}
                            <Link to="/docs/error-tracking" state={{ newWindow: true }}>
                                error tracking
                            </Link>{' '}
                            and{' '}
                            <Link to="/docs/logs" state={{ newWindow: true }}>
                                logs
                            </Link>
                            , and adds the SDK that records{' '}
                            <Link to="/docs/session-replay" state={{ newWindow: true }}>
                                session replays
                            </Link>
                            . Add{' '}
                            <Link to="/docs/distributed-tracing" state={{ newWindow: true }}>
                                traces
                            </Link>{' '}
                            with OpenTelemetry or the PostHog SDK, and{' '}
                            <Link to="/docs/metrics" state={{ newWindow: true }}>
                                metrics
                            </Link>{' '}
                            with <code>npx @posthog/wizard metrics</code>. Free for 100k exceptions, 5k web + 2.5k
                            mobile recordings, and 10 GB of logs and traces every month. No credit card, no per-seat
                            pricing.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/bug_catcher_719a67117f.png"
                            alt="PostHog hedgehog with a magnifying glass"
                            className="w-full max-w-[220px] mx-auto"
                        />
                    </div>
                </div>

                <div className="mb-12 max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center gap-x-10 gap-y-6 text-primary dark:text-primary-dark">
                        <ElevenLabsLogo className="fill-current object-contain max-w-full h-7" />
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/2025_MG_Logo_Full_9fdb693543.png"
                            alt="MoneyGram"
                            imgClassName="h-9 w-auto object-contain max-w-full dark:brightness-0 dark:invert"
                        />
                        <HeygenLogo className="object-contain max-w-full h-11" />
                        <FireworksAILogo className="object-contain max-w-full h-5" />
                    </div>
                    <p className="text-xs mt-3 !mb-0">
                        <span className="font-semibold">A few PostHog customers debugging with us in production.</span>
                        <br />
                        <span className="text-muted">
                            (Yes they actually use us, no it's not just some random engineer who tried us out 2+ years
                            ago.)
                        </span>
                    </p>
                </div>

                <div className={isIdle ? 'quest-idle' : ''}>
                    <QuestLog firstSpeechBubble="Let's get observable!" lastSpeechBubble="Time to start shipping!">
                        <QuestLogItem
                            title="Start with the wizard, then add your backend"
                            subtitle="Errors and logs from the wizard, traces and metrics from your backend"
                            icon="IconMagicWand"
                        >
                            <p>
                                Run the wizard. It sets up <strong>error tracking</strong> and <strong>logs</strong>,
                                and adds the SDK that records <strong>session replays</strong>. No copy-pasting three
                                different snippets.
                            </p>

                            <WizardCTA />

                            <h3>Add your backend</h3>

                            <ul>
                                <li>
                                    <strong>Traces:</strong> point any OpenTelemetry exporter at PostHog, or create
                                    spans with <code>posthog-node</code> or the Python SDK. See the{' '}
                                    <Link to="/docs/distributed-tracing/installation" state={{ newWindow: true }}>
                                        tracing install guides
                                    </Link>
                                    .
                                </li>
                                <li>
                                    <strong>Metrics:</strong> run <code>npx @posthog/wizard metrics</code>. You can also
                                    use <code>posthog.metrics</code> in posthog-js, posthog-node, or the Python SDK, or
                                    any OpenTelemetry exporter. See the{' '}
                                    <Link to="/docs/metrics/installation" state={{ newWindow: true }}>
                                        metrics install guides
                                    </Link>
                                    .
                                </li>
                                <li>
                                    Logs and traces use the same OpenTelemetry setup, so one exporter config covers
                                    both.
                                </li>
                            </ul>

                            <p>
                                Everything lands in the same project. Frontend errors and replays share the user and
                                session automatically. Backend logs, spans, and errors link to them when your server
                                passes the PostHog session ID. Set <code>tracing_headers</code> in posthog-js and use
                                the PostHog request context on your server.
                            </p>

                            <h3>Or install the SDK directly</h3>

                            <List
                                className="grid gap-4 grid-cols-2 @md:grid-cols-2 not-prose"
                                items={sortedPlatforms.top}
                            />

                            {showMore && sortedPlatforms.rest.length > 0 && (
                                <List
                                    className="grid gap-4 grid-cols-2 @md:grid-cols-2 not-prose mt-4"
                                    items={sortedPlatforms.rest}
                                />
                            )}

                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="mt-3 text-red dark:text-yellow font-semibold text-sm cursor-pointer hover:underline"
                            >
                                {showMore ? 'Show less' : 'See more platforms'}
                            </button>

                            <p className="mt-4 text-sm text-secondary">
                                Need platform-specific instructions for just one signal? See the{' '}
                                <Link to="/docs/session-replay/installation" state={{ newWindow: true }}>
                                    session replay
                                </Link>
                                ,{' '}
                                <Link to="/docs/logs/installation" state={{ newWindow: true }}>
                                    logs
                                </Link>
                                ,{' '}
                                <Link to="/docs/distributed-tracing/installation" state={{ newWindow: true }}>
                                    tracing
                                </Link>
                                , or{' '}
                                <Link to="/docs/metrics/installation" state={{ newWindow: true }}>
                                    metrics
                                </Link>{' '}
                                install guides.
                            </p>

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                    Get started free
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Let your AI agent debug for you"
                            subtitle="MCP across errors, replays, logs, traces, and metrics"
                            icon="IconSparkles"
                        >
                            <p>
                                <strong>
                                    Already shipping with PostHog Code, Claude Code, Cursor, Codex, or Windsurf? Boy
                                    howdy, you're going to love this.
                                </strong>{' '}
                                Wire up the PostHog MCP server and your agent can investigate an exception, pull the
                                replay of the user who hit it, read the trace, and tail the surrounding logs, all from
                                your editor.
                            </p>

                            <h3>Install in 30 seconds</h3>

                            <SingleCodeBlock language="bash" showAskAI={false}>
                                npx @posthog/wizard mcp add
                            </SingleCodeBlock>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/mcp_error_tracking_debugging30_6e25828d88.mp4"
                                videoDark={undefined}
                                classes="rounded border border-primary"
                                autoPlay={true}
                                loop={true}
                            />

                            <h3>Try prompts like</h3>

                            <ul>
                                <li>
                                    <em>
                                        "Why are checkout errors spiking? Show me a replay of a user who hit one and the
                                        surrounding logs."
                                    </em>
                                </li>
                                <li>
                                    <em>
                                        "A user reported the dashboard is broken at 2pm. Find the session, the
                                        exception, and the matching log lines."
                                    </em>
                                </li>
                                <li>
                                    <em>
                                        "Generate a regression test from the failing session in replay 12345 using the
                                        stack trace and request payload."
                                    </em>
                                </li>
                                <li>
                                    <em>"Show error logs from the API service in the last hour and group by route."</em>
                                </li>
                                <li>
                                    <em>
                                        "Find every session where CheckoutButton threw an error in the last 24h and
                                        summarize the pattern."
                                    </em>
                                </li>
                                <li>
                                    <em>"Show me the slowest spans in the checkout service over the last hour."</em>
                                </li>
                                <li>
                                    <em>
                                        "Pull the full span tree for trace ID abc123 and tell me where the time went."
                                    </em>
                                </li>
                            </ul>

                            <h3>Or use PostHog AI inside the app</h3>

                            <p>
                                Don't want to leave the browser?{' '}
                                <Link to="/docs/posthog-ai" state={{ newWindow: true }}>
                                    PostHog AI
                                </Link>{' '}
                                lives in the app and can search replays, summarize log patterns, and triage errors in
                                plain language.
                            </p>

                            <div className="flex flex-wrap gap-2 mt-4">
                                <CallToAction type="primary" size="md" onClick={handleCopyMCP}>
                                    {installMCPCopied ? 'npx command copied! 🚀' : 'Install MCP'}
                                </CallToAction>
                                <CallToAction type="secondary" size="md" to="https://app.posthog.com/signup">
                                    Get started free
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Every clue, already connected"
                            subtitle="Why the bundle beats three vendors"
                            icon="IconLogomark"
                        >
                            <p>
                                Most observability stacks are a pile of tools stitched together with hope. PostHog
                                Observability is one tool with five lenses on the same data. Every frontend exception
                                already knows the session it came from. Every replay already has the network calls and
                                console errors attached. Backend logs and traces join in once your server passes the
                                session ID.
                            </p>

                            <ConnectionMap allProducts={allProducts} />

                            <p className="text-sm text-secondary">
                                Logs, traces, and backend errors link to replays when your server passes the PostHog
                                session ID.
                            </p>

                            <CalloutBox icon="IconGraph" title="And it all feeds product analytics" type="fyi">
                                <p>
                                    Exceptions are regular PostHog events. Chart them in trends, funnels, or retention
                                    insights next to the rest of your product data. Click any data point to watch the
                                    recordings behind it. That's how you find the errors that cost you signups, not just
                                    the loudest ones.{' '}
                                    <Link to="/docs/product-analytics" state={{ newWindow: true }}>
                                        Explore product analytics
                                    </Link>
                                </p>
                            </CalloutBox>

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                    Try the bundle – free
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Catch every exception"
                            subtitle="Autocapture errors with real stack traces"
                            icon="IconWarning"
                        >
                            <p>
                                Autocapture in Error Tracking catches <code>$exception</code> events the moment they're
                                thrown, client- or server-side. Upload your source maps and stack traces point straight
                                to your original code – file, line, and function.
                            </p>

                            <p>
                                Exceptions group into issues automatically. Assign them, resolve them, or wire up Slack,
                                Discord, Teams, or a webhook so the right person hears about it instead of your users.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250728_ryub_aa8398de10.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250728_rzmm_23fa3181c4.png"
                                alt="Error tracking issue with stack trace"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <ul>
                                <li>Autocapture exceptions in the browser, mobile, and server-side</li>
                                <li>Accurate stack traces via source maps</li>
                                <li>Customize issue grouping with rules</li>
                                <li>Alerts on triggers, filters, and trends</li>
                                <li>
                                    <IconRewindPlay className="text-yellow w-5 -mt-1 inline-block" /> Jump from any
                                    exception straight into the replay of the user who hit it
                                </li>
                                <li>
                                    <IconCode2 className="text-purple w-5 -mt-1 inline-block" /> See the logs from the
                                    same trace, span, or session in the exception's Logs tab
                                </li>
                                <li>
                                    <IconGanttChart className="text-blue w-5 -mt-1 inline-block" /> Open the trace
                                    behind an exception in its Trace tab, when your server SDK attaches trace context
                                </li>
                            </ul>

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/error-tracking"
                                    state={{ newWindow: true }}
                                >
                                    Explore error tracking
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Watch the session with the console open"
                            subtitle="Session replay with DevTools context"
                            icon="IconRewindPlay"
                        >
                            <p>
                                Rethink what replays look like with PostHog. Sure, you get the video, but you also get
                                dev-tools level context synced to the timeline: console logs, network requests,
                                performance data, rage clicks, dead clicks, craaaazy clicks. (Yes, even those.)
                                <br />
                                <br />
                                When a user says "it just broke," you get the full picture with frontend context and
                                backend visibility.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/annotated_replay_inspector_ec4ceb5761.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/annotated_replay_inspector_dark_c040e66ee5.png"
                                alt="Session replay activity panel"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <ul>
                                <li>Jump to any event in the timeline to skip to what matters</li>
                                <li>See console errors and network failures in exact context</li>
                                <li>Automatic rage-click and dead-click detection (no tagging needed)</li>
                                <li>Save filters as collections your team can reuse</li>
                                <li>
                                    <IconWarning className="text-orange w-5 -mt-1 inline-block" /> Replays show the
                                    exceptions and <IconCode2 className="text-purple w-5 -mt-1 inline-block" /> backend
                                    logs from the same session
                                </li>
                            </ul>

                            <CalloutBox icon="IconEye" title="Replay Vision" type="fyi">
                                <p>
                                    Nobody has time to watch every replay. Replay Vision does. Tell it what to look for
                                    in plain English. AI watches your recordings and surfaces the sessions where
                                    something went wrong: failures, struggles, payment problems. Run{' '}
                                    <code>npx @posthog/wizard replay-vision</code> and it writes three scanners for your
                                    product. 2,500 free credits every month.{' '}
                                    <Link to="/docs/replay-vision" state={{ newWindow: true }}>
                                        Explore Replay Vision
                                    </Link>
                                </p>
                            </CalloutBox>

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/session-replay"
                                    state={{ newWindow: true }}
                                >
                                    Explore session replay
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Search and tail your logs"
                            subtitle="OTel-native logs with full-text search"
                            icon="IconCode2"
                        >
                            <p>
                                PostHog Logs works with any OpenTelemetry client – no PostHog-specific packages
                                required. Point your existing OTel SDK at PostHog, drop in your project token, and your
                                structured logs land alongside everything else.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/logs_light_dd81ff5093.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/logs_dark_d7135f1b22.png"
                                alt="PostHog Logs search interface"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <ul>
                                <li>Full-text search with multiple tokens and negative filters</li>
                                <li>Filter by time, service, resource attributes, or log level</li>
                                <li>Alert when error logs spike or specific patterns appear</li>
                                <li>
                                    <IconRewindPlay className="text-yellow w-5 -mt-1 inline-block" /> One click from a
                                    log line to the session replay of the user who triggered it
                                </li>
                                <li>
                                    <IconWarning className="text-orange w-5 -mt-1 inline-block" /> See error tracking
                                    issues from the same session in the log details
                                </li>
                            </ul>

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="/docs/logs" state={{ newWindow: true }}>
                                    Explore logs
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Follow a request across services"
                            subtitle="Distributed tracing on OpenTelemetry"
                            icon="IconGanttChart"
                        >
                            <p>
                                A trace follows one request through every service it touches. Open the waterfall and
                                find the slow query six services deep, or the background job a stack trace never shows.
                            </p>

                            <p>
                                Point any OpenTelemetry exporter at PostHog. On Node.js and Python,{' '}
                                <code>posthog-node</code> and the Python SDK can create spans themselves.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/image_3_c7dd33ad13.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/image_3_c7dd33ad13.png"
                                alt="A distributed trace shown as a waterfall of spans"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <ul>
                                <li>Search and filter spans by service, status, duration, and attributes</li>
                                <li>Read any trace end to end as a waterfall</li>
                                <li>See the logs for one span or the whole trace in the span inspector</li>
                                <li>See the errors from the same span, trace, or session</li>
                                <li>
                                    <IconRewindPlay className="text-yellow w-5 -mt-1 inline-block" /> Jump to the replay
                                    of the user behind a trace, when spans carry the PostHog session ID
                                </li>
                            </ul>

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/distributed-tracing"
                                    state={{ newWindow: true }}
                                >
                                    Explore tracing
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Chart your service metrics"
                            subtitle="Counters, gauges, and histograms next to your logs and traces"
                            icon="IconTrends"
                        >
                            <p>
                                Send request counts, latencies, and queue depths with <code>posthog.metrics</code>, any
                                OpenTelemetry SDK, or the metrics agent for existing Prometheus endpoints. Or run{' '}
                                <code>npx @posthog/wizard metrics</code> and let it instrument your services.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Clean_Shot_2026_11_26_at_15_40_59_2x_9d105b5447.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/metrics_ui_dark_2c3efe79e9.png"
                                alt="The metrics viewer charting p95 request duration grouped by status code, with the anomaly badge open to show the biggest movers"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <ul>
                                <li>Chart any metric, then group and filter it by attribute</li>
                                <li>An anomaly badge shows what changed and which values drove it</li>
                                <li>
                                    Click an exemplar to open the trace behind it, for metrics sent with trace context
                                </li>
                                <li>Jump to the logs, error logs, and traces for the same service and time window</li>
                                <li>
                                    Get alerted in Slack, Microsoft Teams, or a webhook when a metric crosses a
                                    threshold
                                </li>
                            </ul>

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="/docs/metrics" state={{ newWindow: true }}>
                                    Explore metrics
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Use for free"
                            subtitle="100k exceptions, 5k recordings, 10 GB of logs and traces"
                            icon="IconPiggyBank"
                        >
                            <p>Good news: no per-seat pricing, no enterprise plan required.</p>
                            <p>More than 90% of companies use PostHog for free.</p>

                            <h3>TL;DR 💸</h3>

                            <ul>
                                <li>No credit card required to start</li>
                                <li>
                                    <strong>Error tracking:</strong> 100k exceptions/mo free, then $0.000370 per
                                    exception with volume discounts
                                </li>
                                <li>
                                    <strong>Session replay:</strong> 5,000 web + 2,500 mobile recordings/mo free, then
                                    from $0.005 per recording
                                </li>
                                <li>
                                    <strong>Logs and tracing:</strong> 10 GB/mo free, shared across both, then $0.25/GB,
                                    down to $0.15/GB at volume
                                </li>
                                <li>
                                    <strong>Replay Vision:</strong> 2,500 free credits every month. Each scan costs 2 to
                                    15 credits depending on the model.
                                </li>
                                <li>
                                    <strong>PostHog MCP:</strong> the MCP server is free to connect and use. Some
                                    AI-powered tools bill as PostHog AI usage.
                                </li>
                                <li>Set billing limits per product to avoid surprise charges</li>
                                <li>
                                    See full pricing for{' '}
                                    <Link to="/docs/error-tracking/pricing" state={{ newWindow: true }}>
                                        error tracking
                                    </Link>
                                    ,{' '}
                                    <Link to="/docs/session-replay/pricing" state={{ newWindow: true }}>
                                        session replay
                                    </Link>
                                    ,{' '}
                                    <Link to="/docs/logs/pricing" state={{ newWindow: true }}>
                                        logs and tracing
                                    </Link>
                                    , and{' '}
                                    <Link to="/docs/replay-vision/quota-and-limits" state={{ newWindow: true }}>
                                        Replay Vision
                                    </Link>
                                </li>
                            </ul>

                            <hr className="my-6" />

                            <p>That's it! You're ready to start integrating.</p>

                            <div className="flex flex-wrap gap-2 mt-4">
                                <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                    Get started free
                                </CallToAction>
                                <CallToAction
                                    type="secondary"
                                    size="md"
                                    to="/talk-to-a-human"
                                    state={{ newWindow: true }}
                                >
                                    Talk to a human
                                </CallToAction>
                            </div>
                        </QuestLogItem>
                    </QuestLog>
                </div>

                <div className="text-center py-16 mt-4 opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <p className="text-sm text-secondary italic !mb-4">
                        You made it to the bottom. That means you probably read stack traces before filing a bug report.
                        Mad respect.
                    </p>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Frame_10138_5169832152.png"
                        alt="PostHog hedgehog"
                        className="mx-auto mb-4"
                        imgClassName="w-28 h-auto"
                    />
                    <p className="text-sm text-secondary italic !mb-0">
                        Now go install the{' '}
                        <Link to="/docs/model-context-protocol" className="underline">
                            PostHog MCP
                        </Link>{' '}
                        and let your agent do the debugging. You've earned it.
                    </p>
                </div>
            </ReaderView>
        </>
    )
}
