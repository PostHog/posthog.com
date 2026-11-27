import React, { useState, useEffect } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { QuestLog, QuestLogItem } from 'components/Docs/QuestLog'
import { CallToAction } from 'components/CallToAction'
import { ProductScreenshot } from 'components/ProductScreenshot'
import { ProductVideo } from 'components/ProductVideo'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import { SingleCodeBlock } from 'components/CodeBlock'
import WizardCTA from 'components/WizardCTA'
import ElevenLabsLogo from 'components/CustomerLogos/ElevenLabsLogo'
import HeygenLogo from 'components/CustomerLogos/HeygenLogo'
import FireworksAILogo from 'components/CustomerLogos/FireworksAILogo'
import { CalloutBox } from 'components/Docs/CalloutBox'
import useProduct from 'hooks/useProduct'
import 'components/Home/HeroCarousel/ProductContextDemo/animations.css'
import { Popover } from 'components/RadixUI/Popover'
import OSTabs from 'components/OSTabs'
import { IconPlus, IconTrends } from '@posthog/icons'

const CONNECTIONS = [
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
    {
        source: 'traces',
        label: 'Traces',
        from: 'From a trace',
        cards: [
            {
                handles: ['session_replay'],
                name: 'Session Replay',
                description: 'Watch the replay of the user who waited through it.',
            },
            {
                handles: ['error_tracking'],
                name: 'Error Tracking',
                description: 'See the exceptions from the span, the trace, or the session.',
            },
            { handles: ['logs'], name: 'Logs', description: 'Read the logs for one span or the whole trace.' },
        ],
    },
    {
        source: 'error_tracking',
        label: 'Errors',
        from: 'From an error',
        cards: [
            {
                handles: ['session_replay'],
                name: 'Session Replay',
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
        source: 'logs',
        label: 'Logs',
        from: 'From a log',
        cards: [
            {
                handles: ['session_replay'],
                name: 'Session Replay',
                description: 'Jump to the replay of the user who triggered it.',
            },
            {
                handles: ['error_tracking'],
                name: 'Error Tracking',
                description: 'See Error Tracking issues from the same session.',
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
                name: 'Error Tracking',
                description: 'Spot the exceptions the user ran into along the way.',
            },
            {
                handles: ['logs'],
                name: 'Logs',
                description: 'See the backend logs from the same session.',
            },
        ],
    },
]

/** The QuestLog step that holds the product explorer */
const EXPLORER_STEP = 'quest-item-meet-your-debugging-toolkit'

const CLOUDINARY = 'https://res.cloudinary.com/dmukukwp6/image/upload'

const PRODUCT_TABS = [
    {
        handle: 'error_tracking',
        label: 'Error Tracking',
        description: 'Find and fix exceptions before more users encounter them.',
        intro: (
            <>
                <p>
                    <code>$exception</code> events land the moment they're thrown, with stack traces down to the file,
                    line, and function.
                </p>
                <p>Assign issues, resolve them, and make sure the right person hears about it instead of your users.</p>
            </>
        ),
        docs: '/docs/error-tracking',
        bullets: [
            'Browser, mobile, and server-side exception autocapture',
            'Stack traces mapped to your original source code',
            'Custom issue grouping rules',
            'Alerts in Slack, Discord, Teams, or via webhooks',
        ],
        imageLight: `${CLOUDINARY}/SCR_20250728_ryub_aa8398de10.png`,
        imageDark: `${CLOUDINARY}/SCR_20250728_rzmm_23fa3181c4.png`,
        alt: 'Error Tracking issue with stack trace',
    },
    {
        handle: 'session_replay',
        label: 'Session Replay',
        description: 'See what the user saw when something broke.',
        intro: (
            <>
                <p>
                    Sure, you get the video, but you also get dev-tools level context, performance data, and craaaazy
                    clicks. (Yes, even those.)
                </p>
                <p>
                    When a user says "it just broke," you get the full picture with frontend context and backend
                    visibility.
                </p>
            </>
        ),
        docs: '/docs/session-replay',
        bullets: [
            'Console logs, network requests, and clicks synced to the timeline',
            'Automatic rage-click and dead-click detection',
            'Jump to any event to skip to what matters',
            'Saved filters your team can reuse',
        ],
        imageLight: `${CLOUDINARY}/q_auto,f_auto/annotated_replay_inspector_ec4ceb5761.png`,
        imageDark: `${CLOUDINARY}/q_auto,f_auto/annotated_replay_inspector_dark_c040e66ee5.png`,
        alt: 'Session Replay activity panel',
    },
    {
        handle: 'logs',
        label: 'Logs',
        description: 'Find out what your server was doing when something went wrong.',
        intro: (
            <p>
                Point your existing OTel SDK at PostHog, drop in your project token, and your structured logs land
                alongside everything else.
            </p>
        ),
        docs: '/docs/logs',
        bullets: [
            'Works with any OpenTelemetry client, no PostHog packages required',
            'Full-text search with multiple tokens and negative filters',
            'Filter by time, service, resource attributes, or log level',
            'Alerts when error logs spike or a pattern appears',
        ],
        imageLight: `${CLOUDINARY}/w_1600,c_limit,q_auto,f_auto/logs_light_dd81ff5093.png`,
        imageDark: `${CLOUDINARY}/w_1600,c_limit,q_auto,f_auto/logs_dark_d7135f1b22.png`,
        alt: 'PostHog Logs search interface',
    },
    {
        handle: 'traces',
        label: 'Tracing',
        description: 'Find the slow or failing service behind a request.',
        intro: (
            <>
                <p>
                    A trace follows one request through every service it touches. Open the waterfall and find the slow
                    query six services deep, or the background job a stack trace never shows.
                </p>
                <p>
                    On Node.js and Python, <code>posthog-node</code> and the Python SDK can create spans themselves.
                </p>
            </>
        ),
        docs: '/docs/distributed-tracing',
        bullets: [
            'Point any OpenTelemetry exporter at PostHog',
            'Search and filter spans by service, status, duration, and attributes',
            'Read any trace end to end as a waterfall',
            'Logs for one span or the whole trace in the span inspector',
        ],
        imageLight: `${CLOUDINARY}/image_3_c7dd33ad13.png`,
        imageDark: `${CLOUDINARY}/image_3_c7dd33ad13.png`,
        alt: 'A distributed trace shown as a waterfall of spans',
    },
    {
        handle: 'metrics',
        label: 'Metrics',
        description: 'Know when your services slow down, and why.',
        intro: (
            <p>
                Track request counts, latencies, and queue depths. Or run <code>npx @posthog/wizard metrics</code> and
                let it instrument your services.
            </p>
        ),
        docs: '/docs/metrics',
        bullets: [
            'Send with posthog.metrics, any OpenTelemetry SDK, or the metrics agent for Prometheus',
            'An anomaly badge shows what changed and which values drove it',
            'Jump to the logs and traces for the same service and time',
            'Alerts in Slack, Microsoft Teams, or a webhook',
        ],
        imageLight: `${CLOUDINARY}/q_auto,f_auto/Clean_Shot_2026_11_26_at_15_40_59_2x_9d105b5447.png`,
        imageDark: `${CLOUDINARY}/q_auto,f_auto/metrics_ui_dark_2c3efe79e9.png`,
        alt: 'The metrics viewer charting p95 request duration grouped by status code, with the anomaly badge open to show the biggest movers',
    },
]

const ProductExplorer = ({
    allProducts,
    value,
    onValueChange,
}: {
    allProducts: any[]
    value: string
    onValueChange: (value: string) => void
}) => (
    <div className="not-prose my-4">
        <OSTabs
            value={value}
            onValueChange={onValueChange}
            scrollable={false}
            // OSTabs can't measure icon labels to wrap them, so the row scrolls sideways when it doesn't fit
            tabContainerClassName="overflow-x-auto overflow-y-hidden pb-px -mb-px"
            tabs={PRODUCT_TABS.map((tab) => {
                const product = allProducts.find((product) => product.handle === tab.handle)
                return {
                    value: tab.handle,
                    label: (
                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                            <span
                                className={`inline-block shrink-0 size-4 ${
                                    product ? `text-${product.color}` : 'text-secondary'
                                }`}
                            >
                                {/* Metrics has no product data entry */}
                                {product?.Icon ? <product.Icon /> : <IconTrends />}
                            </span>
                            {tab.label}
                        </span>
                    ),
                    content: (
                        <div>
                            <p className="flex items-start gap-2 text-[15px] leading-relaxed mt-0 mb-3">
                                <span
                                    className={`inline-block shrink-0 size-5 mt-0.5 ${
                                        product ? `text-${product.color}` : 'text-secondary'
                                    }`}
                                >
                                    {/* Metrics has no product data entry */}
                                    {product?.Icon ? <product.Icon /> : <IconTrends />}
                                </span>
                                <strong>{tab.description}</strong>
                            </p>
                            <div className="pl-7 text-[15px] leading-relaxed [&_p]:mt-0 [&_p]:mb-3 [&_code]:text-sm">
                                {tab.intro}
                            </div>
                            <ul className="list-disc pl-12 m-0 mb-4 space-y-1.5 text-sm text-secondary leading-snug">
                                {tab.bullets.map((bullet) => (
                                    <li key={bullet} className="m-0">
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                            <ProductScreenshot
                                imageLight={tab.imageLight}
                                imageDark={tab.imageDark}
                                alt={tab.alt}
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />
                            {tab.handle === 'session_replay' && (
                                <div className="mt-4">
                                    <CalloutBox icon="IconEye" title="Let AI watch your recordings" type="fyi">
                                        <p>
                                            Tell Replay Vision what to look for in plain English. It scans your
                                            recordings and surfaces sessions with bugs, payment failures, or frustrated
                                            users.{' '}
                                            <Link
                                                to="/docs/replay-vision"
                                                state={{ newWindow: true }}
                                                className="font-semibold underline"
                                            >
                                                Explore Replay Vision
                                            </Link>
                                        </p>
                                    </CalloutBox>
                                </div>
                            )}
                            <Link
                                to={tab.docs}
                                state={{ newWindow: true }}
                                className="inline-block mt-3 text-sm font-semibold"
                            >
                                Explore {tab.label} →
                            </Link>
                        </div>
                    ),
                }
            })}
        />
    </div>
)

/** Words in each connection's description that open the product's tab, most specific first */
const ANCHOR_TEXT: Record<string, string[]> = {
    session_replay: ['replay'],
    logs: ['backend logs', 'logs'],
    traces: ['trace'],
    error_tracking: ['Error Tracking issues', 'exceptions'],
}

const ConnectionCards = ({
    cards,
    allProducts,
    onNavigate,
}: {
    cards: (typeof CONNECTIONS)[number]['cards']
    allProducts: any[]
    onNavigate: (handle: string) => void
}) => (
    <ul className="list-none m-0 p-0 not-prose space-y-1.5">
        {cards.map((card) => {
            const handle = card.handles[0]
            const product = allProducts.find((product) => product.handle === handle)
            const anchor = ANCHOR_TEXT[handle]?.find((text) => card.description.includes(text)) || ''
            const index = anchor ? card.description.indexOf(anchor) : -1
            const goToStep = () => {
                onNavigate(handle)
                // Wait for the popover to close and hand focus back, or that cancels the scroll
                setTimeout(
                    () =>
                        document.getElementById(EXPLORER_STEP)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
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

/** A typical debugging path, shown on the connection map's nodes */
const BUG_JOURNEY = [
    { handle: 'metrics', label: 'Metrics', title: 'Spot the spike', description: 'Checkout latency has doubled.' },
    {
        handle: 'traces',
        label: 'Tracing',
        title: 'Find the slow span',
        description: 'Requests are getting stuck at the payment service.',
    },
    {
        handle: 'error_tracking',
        label: 'Error Tracking',
        title: 'Find the error',
        description: 'A new exception is affecting checkout.',
    },
    { handle: 'logs', label: 'Logs', title: 'Inspect the logs', description: 'Payment requests are timing out.' },
    {
        handle: 'session_replay',
        label: 'Session Replay',
        title: 'Watch it break',
        description: 'Customers are clicking Pay, but nothing happens.',
    },
]

/** Node positions share the map SVG's 1000 × 760 coordinate system */
const MAP_HEIGHT = 760
const MAP_NODES: Record<string, { x: number; y: number }> = {
    metrics: { x: 500, y: 110 },
    traces: { x: 840, y: 320 },
    error_tracking: { x: 730, y: 640 },
    logs: { x: 270, y: 640 },
    session_replay: { x: 160, y: 320 },
}

const ConnectionMap = ({
    allProducts,
    onSelectProduct,
}: {
    allProducts: any[]
    onSelectProduct: (handle: string) => void
}) => {
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
        <div className="@container not-prose mb-6">
            <p className="text-sm text-secondary mb-2">Click a product to see the next clue it hands you.</p>
            <figure
                className="product-context-demo grid gap-2 p-3 @sm:block @sm:p-0 @sm:aspect-[1000/800] @sm:[--node-w:31cqw] @lg:[--node-w:28cqw] paper-desk relative w-full m-0 mb-4 border border-primary rounded"
                data-running="true"
            >
                <figcaption className="sr-only">Pick a starting point to see which products it links to.</figcaption>
                <svg
                    className="hidden @sm:block absolute inset-0 h-full w-full"
                    viewBox={`0 0 1000 ${MAP_HEIGHT}`}
                    preserveAspectRatio="none"
                    fill="none"
                    aria-hidden="true"
                >
                    {Array.from(allEdges).map((edge) => {
                        const [a, b] = edge.split('|')
                        return (
                            <path
                                key={edge}
                                d={edgePath(a, b)}
                                className="stroke-[rgb(var(--border))] stroke-2 [stroke-dasharray:6_6] [vector-effect:non-scaling-stroke]"
                            />
                        )
                    })}
                    {Array.from(connected).map((handle, index) => (
                        <g key={`${active.source}-${handle}`} className={`text-${productFor(handle)?.color}`}>
                            <path
                                d={edgePath(active.source, handle)}
                                className="stroke-current stroke-[3] opacity-40 [vector-effect:non-scaling-stroke]"
                            />
                            <path
                                d={edgePath(active.source, handle)}
                                pathLength="100"
                                className="context-pulse stroke-current stroke-[6] [stroke-linecap:round] [stroke-dasharray:8_100] [vector-effect:non-scaling-stroke]"
                                style={{ animationDelay: `${index * -0.6}s` }}
                            />
                        </g>
                    ))}
                </svg>

                {CONNECTIONS.map(({ source, from, cards }) => {
                    const product = productFor(source)
                    const step = BUG_JOURNEY.find((item) => item.handle === source)
                    const Icon = product?.Icon || IconTrends // Metrics has no product data entry
                    const isSelected = source === active.source
                    return (
                        <Popover
                            key={source}
                            dataScheme="primary"
                            header
                            title={from}
                            side={
                                MAP_NODES[source].y < 200
                                    ? 'bottom'
                                    : MAP_NODES[source].y > 500
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
                                    className={`static @sm:absolute @sm:-translate-x-1/2 @sm:-translate-y-1/2 w-full @sm:w-[var(--node-w)] flex flex-col items-start gap-1 p-2.5 @lg:p-[1.6cqw] rounded-md border bg-primary text-left text-primary transition-all hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                                        isSelected
                                            ? 'border-primary shadow-lg @sm:scale-105 @sm:hover:scale-105'
                                            : 'border-primary'
                                    }`}
                                    style={{
                                        // Keep the whole node inside the map when it gets narrow
                                        left: `clamp(calc(var(--node-w) / 2 + 4px), ${
                                            MAP_NODES[source].x / 10
                                        }%, calc(100% - var(--node-w) / 2 - 4px))`,
                                        top: `${(MAP_NODES[source].y / MAP_HEIGHT) * 100}%`,
                                    }}
                                >
                                    <span className="flex items-center gap-1.5 w-full whitespace-nowrap text-[clamp(11px,2cqw,13px)] text-secondary">
                                        <Icon
                                            aria-hidden="true"
                                            className={`size-[clamp(13px,2.4cqw,18px)] shrink-0 ${
                                                product ? `text-${product.color}` : 'text-secondary'
                                            }`}
                                        />
                                        {step?.label}
                                        {/* Turns into an × while the node's popover is open */}
                                        <IconPlus
                                            aria-hidden="true"
                                            className={`ml-auto size-4 shrink-0 text-secondary transition-transform ${
                                                openNode === source ? 'rotate-45' : ''
                                            }`}
                                        />
                                    </span>
                                    <strong className="block text-[clamp(14px,2.8cqw,18px)] leading-tight">
                                        {step?.title}
                                    </strong>
                                    {/* Too tight for the description on a narrow map; the list and the wide map have room */}
                                    <span className="block @sm:hidden @lg:block text-[clamp(11px,2cqw,13px)] leading-snug text-secondary">
                                        {step?.description}
                                    </span>
                                </button>
                            }
                        >
                            <ConnectionCards
                                cards={cards}
                                allProducts={allProducts}
                                onNavigate={(handle) => {
                                    setOpenNode(null)
                                    onSelectProduct(handle)
                                }}
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

export default function PostHogObservabilityLanding(): JSX.Element {
    const [isIdle, setIsIdle] = useState(false)
    const allProducts = useProduct() as any[]
    const [explorerTab, setExplorerTab] = useState(PRODUCT_TABS[0].handle)

    const handleScrollToMCP = () => {
        document.getElementById('quest-item-let-your-ai-agent-debug-for-you')?.scrollIntoView({ behavior: 'smooth' })
    }

    const [installMCPCopied, setInstallMCPCopied] = useState(false)

    const handleCopyMCP = () => {
        navigator.clipboard.writeText('npx @posthog/wizard mcp add')
        setInstallMCPCopied(true)
        setTimeout(() => setInstallMCPCopied(false), 2000)
    }

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
                description="PostHog Observability bundles Error Tracking, Session Replay, Logs, Tracing, and Metrics into one tool, wired up to MCP so your AI agent can investigate issues end to end. Free tier covers 100k exceptions, 5k recordings, and 10 GB of logs and traces every month."
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
                <div className="grid grid-cols-1 @lg:grid-cols-[2fr_0.6fr] gap-10 items-center mb-12 max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-3xl md:text-5xl !mb-4">The observability stack that knows your product</h1>
                        <p className="text-lg md:text-xl !mb-6 text-secondary">
                            Debug production issues with the context you already have on your users. Errors, recordings,
                            logs, traces, and metrics sit next to your product data, and your AI agent can investigate
                            all of it through MCP.
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
                            Install{' '}
                            <Link to="/docs/error-tracking/installation" state={{ newWindow: true }}>
                                error tracking
                            </Link>
                            ,{' '}
                            <Link to="/docs/session-replay/installation" state={{ newWindow: true }}>
                                session replay
                            </Link>
                            , and{' '}
                            <Link to="/docs/logs/installation" state={{ newWindow: true }}>
                                logs
                            </Link>{' '}
                            with{' '}
                            <Link to="/docs/ai-engineering/ai-wizard" state={{ newWindow: true }}>
                                one command
                            </Link>
                            . Send{' '}
                            <Link to="/docs/distributed-tracing/installation" state={{ newWindow: true }}>
                                traces
                            </Link>{' '}
                            and{' '}
                            <Link to="/docs/metrics/installation" state={{ newWindow: true }}>
                                metrics
                            </Link>{' '}
                            via OpenTelemetry or PostHog's SDKs. Free for 100k exceptions, 5k web + 2.5k mobile
                            recordings, and 10 GB of logs and traces every month. No credit card, no per-seat pricing.
                        </p>
                    </div>
                    {/* On wide windows the hedgehog spans the logo row too, so the tall image leaves no gap above it */}
                    <div className="flex justify-center @lg:row-span-2">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/bug_catcher_719a67117f.png"
                            alt="PostHog hedgehog with a magnifying glass"
                            className="w-full max-w-[220px] mx-auto"
                        />
                    </div>

                    <div className="-mt-4 @lg:mt-0">
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
                            <span className="font-semibold">
                                A few PostHog customers debugging with us in production.
                            </span>
                            <br />
                            <span className="text-muted">
                                (Yes they actually use us, no it's not just some random engineer who tried us out 2+
                                years ago.)
                            </span>
                        </p>
                    </div>
                </div>

                <div className={isIdle ? 'quest-idle' : ''}>
                    <QuestLog firstSpeechBubble="Let's get observable!" lastSpeechBubble="Time to start shipping!">
                        <QuestLogItem
                            title="Follow one bug from spike to impact"
                            subtitle="Investigate a checkout slowdown end to end"
                            icon="IconLogomark"
                        >
                            <p>
                                Your checkout is slowing down. Investigate the problem and its impact on your users
                                without leaving PostHog.
                            </p>

                            <ConnectionMap allProducts={allProducts} onSelectProduct={setExplorerTab} />

                            <CalloutBox icon="IconGraph" title="Find the errors that cost you customers" type="fyi">
                                <p>
                                    Compare checkout conversion rates for users who encountered an error. See which bugs
                                    are worth fixing first using the product data you already have.{' '}
                                    <Link to="/docs/product-analytics" state={{ newWindow: true }}>
                                        Explore Product Analytics
                                    </Link>
                                </p>
                            </CalloutBox>

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                    Get started free
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Install with one command"
                            subtitle="Errors, logs, and replays with one command"
                            icon="IconMagicWand"
                        >
                            <p>Set up Error Tracking, Logs, and Session Replay with one command.</p>

                            <WizardCTA />

                            <h3>Connect your backend</h3>

                            <p>
                                Send{' '}
                                <Link to="/docs/distributed-tracing/installation" state={{ newWindow: true }}>
                                    traces
                                </Link>{' '}
                                and{' '}
                                <Link to="/docs/metrics/installation" state={{ newWindow: true }}>
                                    metrics
                                </Link>{' '}
                                with OpenTelemetry or PostHog's SDKs. Pass the PostHog session ID to connect backend
                                data to user sessions.
                            </p>

                            <h3>Prefer to install manually?</h3>

                            <p>
                                Follow our{' '}
                                <Link to="/docs/getting-started/install" state={{ newWindow: true }}>
                                    platform-specific installation guides
                                </Link>
                                .
                            </p>

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                    Get started free
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Meet your debugging toolkit"
                            subtitle="Errors, replays, logs, traces, and metrics"
                            icon="IconApps"
                        >
                            <ProductExplorer
                                allProducts={allProducts}
                                value={explorerTab}
                                onValueChange={setExplorerTab}
                            />
                        </QuestLogItem>

                        <QuestLogItem
                            title="Let your AI agent debug for you"
                            subtitle="MCP across errors, replays, logs, traces, and metrics"
                            icon="IconSparkles"
                        >
                            <p>
                                Connect PostHog to your AI coding agent and investigate production issues without
                                leaving your editor.
                            </p>

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

                            <h3>Try asking</h3>

                            <ul className="list-none m-0 p-0 not-prose space-y-3">
                                <li className="m-0 border border-primary rounded p-4">
                                    "Why are checkout errors spiking? Show me a recording of a user who hit one and the
                                    surrounding logs."
                                </li>
                                <li className="m-0 border border-primary rounded p-4">
                                    "Which service is slowing down checkout, and which users are affected?"
                                </li>
                                <li className="m-0 border border-primary rounded p-4">
                                    "Generate a regression test from this failing session using the stack trace and
                                    request payload."
                                </li>
                            </ul>

                            <p className="text-secondary mt-4">
                                Prefer the browser? Investigate issues with{' '}
                                <Link to="/docs/posthog-ai" state={{ newWindow: true }}>
                                    PostHog AI
                                </Link>
                                .
                            </p>

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" onClick={handleCopyMCP}>
                                    {installMCPCopied ? 'npx command copied! 🚀' : 'Install MCP'}
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Free to start. Pay as you grow."
                            subtitle="100k exceptions, 5k recordings, 10 GB of logs and traces"
                            icon="IconPiggyBank"
                        >
                            <p>Good news: no per-seat pricing, no enterprise plan required.</p>
                            <p>More than 90% of companies use PostHog for free.</p>

                            <h3>TL;DR 💸</h3>

                            <ul>
                                <li>No credit card required to start</li>
                                <li>
                                    <strong>Error Tracking:</strong> 100k exceptions/mo free, then $0.000370 per
                                    exception with volume discounts
                                </li>
                                <li>
                                    <strong>Session Replay:</strong> 5,000 web + 2,500 mobile recordings/mo free, then
                                    from $0.005 per recording
                                </li>
                                <li>
                                    <strong>Logs and Tracing:</strong> 10 GB/mo free, shared across both, then $0.25/GB,
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
                                        Error Tracking
                                    </Link>
                                    ,{' '}
                                    <Link to="/docs/session-replay/pricing" state={{ newWindow: true }}>
                                        Session Replay
                                    </Link>
                                    ,{' '}
                                    <Link to="/docs/logs/pricing" state={{ newWindow: true }}>
                                        Logs and Tracing
                                    </Link>
                                    , and{' '}
                                    <Link to="/docs/replay-vision/quota-and-limits" state={{ newWindow: true }}>
                                        Replay Vision
                                    </Link>
                                </li>
                            </ul>

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
