import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { motion, useReducedMotion } from 'framer-motion'
import {
    IconAI,
    IconCheck,
    IconArrowRight,
    IconArrowUpRight,
    IconDatabase,
    IconFlask,
    IconGraph,
    IconLightBulb,
    IconPieChart,
    IconShieldPeople,
    IconPlug,
    IconQuestion,
    IconRewindPlay,
    IconSparkles,
    IconToggle,
    IconWarning,
    IconWrench,
} from '@posthog/icons'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import SEO from 'components/seo'
import Link from 'components/Link'
import { Accordion } from 'components/RadixUI/Accordion'
import ScrollArea from 'components/RadixUI/ScrollArea'
import ReaderView from 'components/ReaderView'
import { SectionHeading } from 'components/Products/ReaderViewProduct/helpers'
import MCPInstallCTA from 'components/MCPInstallCTA'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'
import CustomerLogo from 'components/CustomerLogo'
import SlotMachineText from 'components/SlotMachineText'
import SmallTeam from 'components/SmallTeam'
import { StickerAi } from 'components/Stickers/Stickers'
import { useCustomers, Customer } from 'hooks/useCustomers'
import {
    IconClaudeCode,
    IconGemini,
    IconOpenAI,
    LogomarkCodex,
    LogomarkCursor,
    LogomarkVSCode,
    LogomarkWindsurf,
    LogomarkZed,
} from 'components/OSIcons/Icons'
import posthogIcon from '../../images/posthog-icon-white.svg'
import { buildMcpBrief } from './agentBrief'
import WaitingRoom from './WaitingRoom'
import mcpToolsData from '../../data/mcp-tools.json'

// The tool schema is fetched from the main repo at build time, so the exact totals move
// between builds. Round down to the nearest hundred to keep the claim true either way.
const { categories: toolCategories } = mcpToolsData as {
    categories: { name: string; tools: { name: string }[] }[] | null
}
const toolCount = toolCategories?.reduce((total, category) => total + category.tools.length, 0) ?? 0
const categoryCount = toolCategories?.length ?? 0
const toolCountLabel = toolCount >= 100 ? `${Math.floor(toolCount / 100) * 100}+ tools` : 'Hundreds of tools'

type Reader = 'human' | 'agent'

// What an agent gets from /mcp: the same brief the build writes to /mcp.md.
function AgentView({ onBack }: { onBack: () => void }): JSX.Element {
    return (
        <section className="not-prose flex flex-col gap-3">
            <button
                type="button"
                onClick={onBack}
                className="m-0 w-fit cursor-pointer border-0 bg-transparent p-0 text-sm font-semibold underline"
            >
                ← Back to the page for humans
            </button>
            <p className="text-sm text-secondary m-0">
                This is what an agent gets when it reads this page. It is also at{' '}
                <a href="/mcp.md" className="font-semibold underline">
                    /mcp.md
                </a>
                .
            </p>
            <pre className="m-0 p-4 bg-accent border border-primary rounded-md text-sm leading-relaxed whitespace-pre-wrap break-words">
                {buildMcpBrief(toolCategories)}
            </pre>
        </section>
    )
}

function MCPHeader({ onReadAsAgent }: { onReadAsAgent: () => void }): JSX.Element {
    const reducedMotion = useReducedMotion()
    const agentLink = (
        <>
            Are you an agent?{' '}
            <a
                href="/mcp.md"
                onClick={(event) => {
                    event.preventDefault()
                    onReadAsAgent()
                }}
                className="font-semibold underline"
            >
                Read the plain version
            </a>
            .
        </>
    )
    return (
        <section id="overview" className="scroll-mt-20 not-prose w-full border-b border-primary pb-8">
            <div className="grid grid-cols-[minmax(0,1fr)_6rem] items-center gap-x-4 gap-y-4 @lg/reader-content:grid-cols-[minmax(0,1fr)_8rem] @lg/reader-content:gap-x-6 @xl/reader-content:grid-cols-[minmax(0,1fr)_10rem] @xl/reader-content:gap-x-8 @2xl/reader-content:grid-cols-[minmax(0,1fr)_12rem] @3xl/reader-content:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] @3xl/reader-content:gap-x-10">
                <div className="col-span-full min-w-0 border-b border-primary pb-3 @lg/reader-content:col-span-1">
                    <SlotMachineText
                        className="text-lg font-bold tracking-tight @sm/reader-content:text-xl @xl/reader-content:text-2xl"
                        words={['tabs', 'dashboards', 'sidebars', 'filter menus', 'clicking', 'the browser']}
                        holdDuration={1600}
                        wordClassName="text-red dark:text-yellow"
                        prefix={
                            <span className="inline-flex items-center gap-2">
                                <span>Use</span>
                                <img
                                    src={posthogIcon}
                                    alt=""
                                    aria-hidden
                                    className="size-5 rounded-md @xl/reader-content:size-6"
                                />
                                <span>PostHog without</span>
                            </span>
                        }
                    />
                </div>
                <div className="col-start-2 row-start-2 flex w-full flex-col items-center gap-3 @lg/reader-content:row-span-5 @lg/reader-content:row-start-1">
                    <motion.div
                        className="w-full"
                        animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
                        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
                    >
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/headless_horsehog_17d1541713.png"
                            alt="A hedgehog dressed as the headless horseman, riding a toy horse and holding a flaming pumpkin"
                            width={800}
                            className="w-full"
                            imgClassName="w-full"
                        />
                    </motion.div>
                    <p className="m-0 hidden text-balance text-center text-sm text-secondary @lg/reader-content:block">
                        {agentLink}
                    </p>
                </div>
                <h1 className="col-start-1 row-start-2 !m-0 min-w-0 text-3xl font-bold leading-tight @xl/reader-content:text-4xl">
                    PostHog, <span className="whitespace-nowrap bg-blue/10 p-0.5 font-bold text-blue">headless</span>
                </h1>
                <p className="col-span-full m-0 text-base @lg/reader-content:col-span-1 @xl/reader-content:text-lg">
                    The PostHog MCP pulls your product data into wherever your agents work. Query analytics, debug
                    errors, roll out flags, and run experiments from any MCP-compatible client.
                </p>
                <MCPInstallCTA className="hidden max-w-md @lg/reader-content:flex" showDesktopLink={false} />
                <div className="col-span-full @lg/reader-content:hidden">
                    <OSButton asLink to="/docs/model-context-protocol" variant="primary" size="md">
                        Read the setup guide
                    </OSButton>
                </div>
                <p className="col-span-full m-0 text-sm text-secondary @lg/reader-content:hidden">{agentLink}</p>
            </div>
        </section>
    )
}

const Highlight = ({ children, red }: { children: React.ReactNode; red?: boolean }) => (
    <span className={`whitespace-nowrap p-0.5 font-bold ${red ? 'bg-red/10 text-red' : 'bg-blue/10 text-blue'}`}>
        {children}
    </span>
)

type IconItem = {
    Icon: React.ComponentType<{ className?: string }>
    color: string
    name: string
    description: React.ReactNode
}

function IconChipRow({ items }: { items: IconItem[] }): JSX.Element {
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

const whatItIs: IconItem[] = [
    {
        Icon: IconToggle,
        color: 'text-green',
        name: 'Every product, read and write',
        description:
            'Build, ship, and measure from one UI. Your agent can find a bug, ship the fix behind a flag, and check the result.',
    },
    {
        Icon: IconShieldPeople,
        color: 'text-purple',
        name: 'Scale and Enterprise add-on',
        description: (
            <>
                Approve change requests from your agent, and manage access with{' '}
                <Link
                    to="/docs/model-context-protocol/enterprise-managed-authorization"
                    state={{ newWindow: true }}
                    className="font-semibold underline"
                >
                    enterprise-managed authorization
                </Link>
                .
            </>
        ),
    },
    {
        Icon: IconGraph,
        color: 'text-orange',
        name: 'Uses your metric definitions',
        description: (
            <>
                Ask for MRR, and get the real thing from your{' '}
                <Link to="/docs/semantic-layer" state={{ newWindow: true }} className="font-semibold underline">
                    semantic layer
                </Link>
                .
            </>
        ),
    },
    {
        Icon: IconSparkles,
        color: 'text-blue',
        name: 'Light on context',
        description: 'Most agent clients only look up tools as needed (tokenminning is tokenwinning).',
    },
]

function WhatIsMCP(): JSX.Element {
    return (
        <section id="what-is-mcp" className="scroll-mt-20 not-prose">
            <div className="@container rounded border border-primary bg-primary p-6 @xl:p-8">
                <div className="grid items-center gap-x-10 gap-y-8 @3xl:grid-cols-[minmax(0,1fr)_18rem]">
                    <figure className="m-0 flex flex-col items-center @3xl:col-start-2 @3xl:row-start-1">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog_toast_hog_a271b970dd.png"
                            alt="ToastHog"
                            title="ToastHog"
                            loading="lazy"
                            width={800}
                            className="w-56 @xl:w-72 @3xl:w-full"
                        />
                        <figcaption className="mt-3 text-center text-sm text-secondary">
                            PostHog. Part of the agentic breakfast of champions. See the{' '}
                            <Link
                                to="/mcp/leaderboard"
                                state={{ newWindow: true }}
                                title="MCP leaderboard"
                                className="font-semibold underline"
                            >
                                leaderboard
                            </Link>
                            .
                        </figcaption>
                    </figure>
                    <div className="min-w-0 @3xl:col-start-1 @3xl:row-start-1">
                        <h2 className="mb-6 mt-0 text-3xl font-bold leading-tight">
                            Your agent gets the <Highlight red>full spread</Highlight>
                        </h2>
                        <IconChipRow items={whatItIs} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const connectors: { name: string; how: string; Icon: React.ComponentType<{ className?: string }>; to: string }[] = [
    {
        name: 'ChatGPT',
        how: 'Plugin',
        Icon: IconOpenAI,
        to: 'https://chatgpt.com/plugins/plugin_asdk_app_699caef2d680819188727b0ddbb349dd',
    },
    {
        name: 'Claude',
        how: 'Connector directory',
        Icon: IconClaudeCode,
        to: 'https://claude.ai/directory/connectors/posthog',
    },
    { name: 'Cursor', how: 'Setup guide', Icon: LogomarkCursor, to: '/docs/model-context-protocol/cursor' },
    { name: 'Codex', how: 'Setup guide', Icon: LogomarkCodex, to: '/docs/model-context-protocol/codex' },
    { name: 'VS Code', how: 'Setup guide', Icon: LogomarkVSCode, to: '/docs/model-context-protocol/vscode' },
    { name: 'Windsurf', how: 'Setup guide', Icon: LogomarkWindsurf, to: '/docs/model-context-protocol/windsurf' },
    { name: 'Zed', how: 'Setup guide', Icon: LogomarkZed, to: '/docs/model-context-protocol/zed' },
    { name: 'Gemini CLI', how: 'AI plugin', Icon: IconGemini, to: 'https://github.com/PostHog/ai-plugin' },
]

function MCPConnectors(): JSX.Element {
    return (
        <section id="installation" className="scroll-mt-20 not-prose">
            <header className="mb-4">
                <h2 className="mb-3 mt-0 text-balance text-2xl font-bold leading-tight text-primary">
                    Which agents can use it?
                </h2>
                <p className="m-0 mb-6 max-w-prose text-balance text-lg leading-relaxed text-secondary">
                    Any MCP client can connect. PostHog hosts the server, so you run nothing. Sign in with your PostHog
                    account, and it sends you to your US or EU data region.
                </p>
            </header>
            <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 @3xl/reader-content:grid-cols-4">
                {connectors.map(({ name, how, Icon, to }) => (
                    <li key={name} className="min-w-0">
                        <Link
                            to={to}
                            state={to.startsWith('/') ? { newWindow: true } : undefined}
                            className="flex items-center gap-3 rounded-md border border-primary bg-primary p-3 text-primary hover:border-blue hover:text-primary"
                        >
                            <Icon className="size-8 shrink-0" />
                            <span className="min-w-0">
                                <span className="block truncate text-base font-bold leading-tight">{name}</span>
                                <span className="flex items-center gap-1 text-sm text-secondary">
                                    <span className="truncate">{how}</span>
                                    <IconArrowRight className="size-4 shrink-0" />
                                </span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="mt-6 flex items-start gap-3">
                <IconPlug className="mt-0.5 size-5 shrink-0 text-blue" />
                <p className="m-0 text-sm leading-relaxed text-secondary">
                    <span className="font-semibold text-primary">Want skills too?</span> The{' '}
                    <Link to="https://github.com/PostHog/ai-plugin" className="font-semibold underline">
                        PostHog AI plugin
                    </Link>{' '}
                    installs the same MCP server plus more than 30 PostHog skills in one step. It works in Claude Code,
                    Codex, Cursor, and Gemini CLI. If you connect the server by hand, you get the same tools without the
                    bundled skills.
                </p>
            </div>
        </section>
    )
}

const checklist = [
    { label: 'Find where users drop off', to: '/docs/product-analytics/funnels' },
    { label: 'See which errors hit most users', to: '/docs/error-tracking' },
    { label: 'Answer a question with SQL', to: '/docs/sql' },
    { label: 'Set up an A/B test', to: '/docs/experiments' },
    { label: 'Turn a feature flag on or off', to: '/docs/feature-flags' },
    { label: 'Triage a support ticket', to: '/docs/support' },
    { label: 'Send events to another tool', to: '/docs/data-pipelines' },
    { label: 'Restore a deleted feature flag', to: '/docs/feature-flags/creating-feature-flags' },
    { label: 'Ask users with a survey', to: '/docs/surveys' },
    { label: 'Find the replay of a bug report', to: '/docs/session-replay' },
]

function MCPChecklist(): JSX.Element {
    return (
        <div className="not-prose">
            <ul className="list-none p-0 m-0 grid w-fit grid-cols-1 @xs:grid-cols-2 gap-x-6 gap-y-1.5">
                {checklist.map(({ label, to }) => (
                    <li key={label} className="flex items-start gap-2 text-sm">
                        <IconCheck className="size-4 text-green shrink-0 mt-0.5" />
                        <Link
                            to={to}
                            state={{ newWindow: true }}
                            className="font-semibold text-primary hover:underline"
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function MCPUseCases(): JSX.Element {
    return (
        <section id="use-cases" className="scroll-mt-20 not-prose border-t border-primary pt-12">
            <div className="grid gap-6 @4xl/reader-content:grid-cols-[minmax(0,1fr)_28rem] @4xl/reader-content:gap-10">
                <div className="min-w-0">
                    <SectionHeading
                        lede={`Your agent selects from ${toolCountLabel} across ${categoryCount} categories, then reads or updates your PostHog project for you.`}
                    >
                        What can you do with the PostHog MCP?
                    </SectionHeading>
                    <MCPChecklist />
                </div>
                <figure className="m-0 flex flex-col items-center justify-center">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/hog_bottle_4ba0223072.png"
                        alt=""
                        width={900}
                        loading="lazy"
                        className="w-full max-w-lg"
                        imgClassName="block w-full"
                    />
                    <figcaption className="mt-2 text-center text-sm text-secondary">
                        All your product context, bottled up for agents
                    </figcaption>
                </figure>
            </div>
            <Capabilities />
        </section>
    )
}

interface CapabilityItem {
    title: string
    prompt: string
    icon: React.ReactNode
    color: string
}

const capabilityList: CapabilityItem[] = [
    {
        title: 'Product Analytics',
        prompt: "What's our 30-day user retention?",
        icon: <IconGraph />,
        color: 'blue',
    },
    {
        title: 'Error Tracking',
        prompt: 'Show me the top 5 errors this week.',
        icon: <IconWarning />,
        color: 'orange',
    },
    {
        title: 'Session Replay',
        prompt: 'Find a recording where a user got frustrated.',
        icon: <IconRewindPlay />,
        color: 'yellow',
    },
    {
        title: 'Feature Flags',
        prompt: 'List all my feature flags and their rollout percentages.',
        icon: <IconToggle />,
        color: 'seagreen',
    },
    {
        title: 'Experiments',
        prompt: 'Summarize the results of my running experiments.',
        icon: <IconFlask />,
        color: 'purple',
    },
    {
        title: 'SQL & Warehouse',
        prompt: 'Run a HogQL query to count events from the last 24 hours.',
        icon: <IconDatabase />,
        color: 'purple',
    },
    {
        title: 'Web Analytics',
        prompt: 'Which referrers drove the most traffic last week?',
        icon: <IconPieChart />,
        color: 'green-2',
    },
    {
        title: 'AI Observability',
        prompt: "What's the average tokens per trace today?",
        icon: <IconAI />,
        color: 'purple',
    },
]

const TYPING_SPEED = 30
const PAUSE_BEFORE_RESPONSE = 400
const CYCLE_INTERVAL = 5000

const fakeResponses: Record<string, string[]> = {
    'Product Analytics': [
        'Running retention query for the last 30 days...',
        'Day 0: 100% → Day 1: 42% → Day 7: 28% → Day 30: 14%',
        'Retention is trending up 3% from last month.',
    ],
    'Error Tracking': [
        'Fetching top errors by occurrence...',
        '1. TypeError: Cannot read property "id" of undefined (1,247)',
        '2. 504 Gateway Timeout on /api/batch (892)',
        '3. RangeError: Maximum call stack size exceeded (541)',
        '4. SyntaxError: Unexpected token in JSON at position 0 (327)',
        '5. Error: ECONNREFUSED 127.0.0.1:5432 (219)',
    ],
    'Session Replay': [
        'Searching for rage-click sessions...',
        'Found 23 sessions with rage clicks in the last 7 days.',
        'Top page: /checkout (9 sessions, avg 6 clicks)',
    ],
    'Feature Flags': [
        'Listing active feature flags...',
        'new-onboarding: 50% rollout | beta-dashboard: 100%',
        '12 flags active, 3 stale (no evaluations in 30d)',
    ],
    Experiments: [
        'Fetching running experiments...',
        'pricing-page-v2: +12% conversion (p=0.03) – significant',
        'onboarding-flow: +4% activation (p=0.21) – not yet',
    ],
    'SQL & Warehouse': [
        'Executing HogQL query...',
        'SELECT count() FROM events WHERE timestamp > now() - interval 1 day',
        'Result: 1,847,293 events in the last 24 hours',
    ],
    'Web Analytics': [
        'Querying referrer data for last 7 days...',
        '1. google.com (12,847)',
        '2. twitter.com (3,291)',
        '3. github.com (2,103)',
        '4. (direct) (1,987)',
    ],
    'AI Observability': [
        'Querying LLM trace metrics...',
        'Avg tokens/trace today: 2,847 (input: 1,203 / output: 1,644)',
        'Total cost: $14.29 across 892 traces',
    ],
}

function useTypewriter(text: string, speed: number, startTyping: boolean) {
    const [displayed, setDisplayed] = useState('')
    const [done, setDone] = useState(false)

    useEffect(() => {
        setDisplayed('')
        setDone(false)
        if (!startTyping) return

        let i = 0
        const timer = setInterval(() => {
            i++
            setDisplayed(text.slice(0, i))
            if (i >= text.length) {
                clearInterval(timer)
                setDone(true)
            }
        }, speed)
        return () => clearInterval(timer)
    }, [text, speed, startTyping])

    return { displayed, done }
}

function TerminalResponse({ lines, show }: { lines: string[]; show: boolean }) {
    const [visibleCount, setVisibleCount] = useState(0)

    useEffect(() => {
        setVisibleCount(0)
        if (!show) return
        let i = 0
        const timer = setInterval(() => {
            i++
            setVisibleCount(i)
            if (i >= lines.length) clearInterval(timer)
        }, 300)
        return () => clearInterval(timer)
    }, [lines, show])

    if (!show) return null

    return (
        <div className="mt-3 space-y-1">
            {lines.slice(0, visibleCount).map((line, i) => (
                <p key={i} className="m-0 text-[12px] @sm:text-[13px] font-mono text-green/90 leading-relaxed">
                    {line}
                </p>
            ))}
        </div>
    )
}

function Capabilities(): JSX.Element {
    const [activeIndex, setActiveIndex] = useState(0)
    const [startTyping, setStartTyping] = useState(true)
    const cycleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isPaused = useRef(false)

    const cap = capabilityList[activeIndex]
    const { displayed, done } = useTypewriter(cap.prompt, TYPING_SPEED, startTyping)
    const [showResponse, setShowResponse] = useState(false)

    useEffect(() => {
        if (done) {
            const t = setTimeout(() => setShowResponse(true), PAUSE_BEFORE_RESPONSE)
            return () => clearTimeout(t)
        }
        setShowResponse(false)
    }, [done])

    const goTo = useCallback(
        (index: number) => {
            if (index === activeIndex && startTyping) return
            isPaused.current = false
            setShowResponse(false)
            setStartTyping(false)
            setActiveIndex(index)
            requestAnimationFrame(() => setStartTyping(true))
        },
        [activeIndex, startTyping]
    )

    useEffect(() => {
        if (cycleTimer.current) clearTimeout(cycleTimer.current)
        if (!showResponse || isPaused.current) return

        cycleTimer.current = setTimeout(() => {
            goTo((activeIndex + 1) % capabilityList.length)
        }, CYCLE_INTERVAL)

        return () => {
            if (cycleTimer.current) clearTimeout(cycleTimer.current)
        }
    }, [showResponse, activeIndex, goTo])

    const handleChipClick = (index: number) => {
        isPaused.current = true
        if (cycleTimer.current) clearTimeout(cycleTimer.current)
        goTo(index)
    }

    return (
        <div className="not-prose mt-6">
            <div className="rounded-md overflow-hidden border border-primary shadow-md">
                <div className="bg-[#1e1e2e] dark:bg-[#11111b] border-b border-white/10 px-3 py-2 flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <span className="size-2.5 rounded-full bg-red/60" />
                        <span className="size-2.5 rounded-full bg-yellow/80" />
                        <span className="size-2.5 rounded-full bg-green/70" />
                    </div>
                    <span className="text-[11px] font-mono text-white/40 ml-2 truncate">posthog-mcp</span>
                    <span className="ml-auto text-[9px] uppercase tracking-wider font-semibold text-white/30 inline-flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-green animate-pulse" />
                        Live
                    </span>
                </div>

                <div className="bg-[#1e1e2e] dark:bg-[#11111b] h-[200px] [&_[data-radix-scroll-area-scrollbar]]:bg-white/5 [&_[data-radix-scroll-area-scrollbar]:hover]:bg-white/10 [&_[data-radix-scroll-area-thumb]]:!bg-white/30 [&_[data-radix-scroll-area-thumb]:hover]:!bg-white/50">
                    <ScrollArea className="h-full">
                        <div className="px-4 py-4">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`inline-flex size-4 shrink-0 text-${cap.color}`}>{cap.icon}</span>
                                <span className="text-[10px] uppercase tracking-wider font-semibold text-white/40">
                                    {cap.title}
                                </span>
                            </div>
                            <p className="m-0 text-[13px] @sm:text-[15px] font-mono text-white/90 leading-relaxed">
                                <span className="text-yellow mr-1.5">{'>'}</span>
                                {displayed}
                                {!done && (
                                    <span className="inline-block w-[2px] h-[14px] bg-yellow ml-0.5 align-middle animate-[pulse_1s_steps(1)_infinite]" />
                                )}
                            </p>

                            <TerminalResponse lines={fakeResponses[cap.title] || []} show={showResponse} />
                        </div>
                    </ScrollArea>
                </div>

                <div
                    className="bg-[#16161e] dark:bg-[#0a0a12] border-t border-white/10 px-3 py-2.5 overflow-x-auto"
                    style={{ scrollbarWidth: 'none' }}
                >
                    <div className="flex items-center gap-1.5 w-max">
                        {capabilityList.map((c, i) => (
                            <button
                                key={c.title}
                                onClick={() => handleChipClick(i)}
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer border-0 whitespace-nowrap shrink-0 ${
                                    i === activeIndex
                                        ? 'bg-white/15 text-white'
                                        : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70'
                                }`}
                            >
                                <span className={`inline-flex size-3 shrink-0 text-${c.color}`}>{c.icon}</span>
                                {c.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const resources = [
    {
        title: 'Use cases',
        Icon: IconLightBulb,
        color: 'text-yellow',
        description: 'Prompts to copy, from one-line questions to multi-step jobs.',
        cta: 'Browse the recipes',
        to: '/docs/model-context-protocol/use-cases',
    },
    {
        title: 'MCP tools reference',
        Icon: IconWrench,
        color: 'text-red',
        description: 'Every tool your agent can call, sorted by product.',
        cta: 'See every tool',
        to: '/docs/model-context-protocol/tools',
    },
    {
        title: 'FAQ and advanced setup',
        Icon: IconQuestion,
        color: 'text-blue',
        description: 'How sign-in works, what it costs, and how to limit what your agent can touch.',
        cta: 'Read the FAQ',
        to: '/docs/model-context-protocol/faq',
    },
]

function MCPResources(): JSX.Element {
    return (
        <section id="resources" className="scroll-mt-20 not-prose">
            <h2 className="mb-6 mt-0 text-balance text-2xl font-bold leading-tight text-primary">Go deeper</h2>
            <div className="grid gap-4 @3xl/reader-content:grid-cols-3">
                {resources.map(({ title, Icon, color, description, cta, to }) => (
                    <div
                        key={title}
                        className="flex min-w-0 flex-col overflow-hidden rounded-md border border-primary bg-primary"
                    >
                        <div className="flex flex-1 flex-col p-5">
                            <h3 className="m-0 flex items-center gap-2 text-lg font-bold leading-tight">
                                <Icon className={`size-6 shrink-0 ${color}`} />
                                {title}
                            </h3>
                            <p className="mb-4 mt-2 text-sm text-secondary">{description}</p>
                            <Link
                                to={to}
                                state={{ newWindow: true }}
                                className="mt-auto text-sm font-semibold underline"
                            >
                                {cta} →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

const faq: { question: string; answer: string; link?: { label: string; to: string } }[] = [
    {
        question: 'How much does it cost?',
        answer: 'Connecting to the MCP server and calling its tools is free. Standard PostHog usage and billing still apply to the data your queries use. Some tools use LLMs internally and can add PostHog AI spend. Those tools need AI data processing to be enabled in your organization, and they are hidden when it is off.',
        link: { label: 'Cost details', to: '/docs/model-context-protocol/faq#how-much-does-it-cost' },
    },
    {
        question: 'Are there rate limits?',
        answer: 'Yes. The server allows 480 requests per minute and 4,800 per hour. The limits count per credential, which is the OAuth token or personal API key that your client uses. A request over the limit gets a 429 response with a Retry-After header.',
        link: { label: 'Rate limits', to: '/docs/model-context-protocol/faq#are-there-rate-limits' },
    },
    {
        question: 'Do I need to create an API key?',
        answer: 'No. OAuth is the recommended way, and the wizard sets it up. If your client does not support OAuth, use a personal API key with the MCP Server preset.',
        link: { label: 'API key setup', to: '/docs/model-context-protocol/faq#using-an-api-key-instead-of-oauth' },
    },
    {
        question: 'Is it safe to let an agent write to my project?',
        answer: 'Review tool calls before they run, because an LLM can be tricked into following untrusted commands. You can also limit the session to read-only tools, filter the tools by feature or name, and pin the agent to one organization or project.',
        link: { label: 'Read-only mode', to: '/docs/model-context-protocol/faq#restricting-to-read-only-mcp-tools' },
    },
    {
        question: 'Where does my data go?',
        answer: 'The server is a proxy to your PostHog instance, and it routes to the US or EU region of the account you sign in with. It does not store your analytics data. Queries run against your project, and the results go straight to your AI client.',
        link: { label: 'Data and privacy', to: '/docs/model-context-protocol/faq#where-is-my-data-sent' },
    },
    {
        question: 'Can I use more than one account, organization, or project?',
        answer: 'Yes, with one MCP connection for each. A single connection signs in as one account and has one active organization and project.',
        link: {
            label: 'Multiple accounts and projects',
            to: '/docs/model-context-protocol/faq#working-with-multiple-accounts-organizations-or-projects',
        },
    },
    {
        question: 'Can my organization manage access through our identity provider?',
        answer: 'Yes, with the Scale or Enterprise platform add-on. Enterprise-managed authorization (ID-JAG) lets Okta, Entra ID, and other identity providers control MCP access, instead of per-user OAuth or API keys.',
        link: {
            label: 'Enterprise-managed authorization',
            to: '/docs/model-context-protocol/enterprise-managed-authorization',
        },
    },
]

const ctaBoxClassName = 'scroll-mt-20 not-prose rounded-md border p-5 shadow-xl @md/reader-content:p-7'

// Real quotes about the MCP only. Each one is the `mcp` product quote of a person in `useCustomers`.
// The first quote gets the big card, so put the longest one first.
const mcpQuotes = [
    { customer: 'soundboost', author: 'berkan_cesur' },
    { customer: 'qred', author: 'lezgin_zilan' },
]

// A number from a published post, like the stats on the customers page. `customer` only sets the logo.
const mcpStat = {
    customer: 'posthog',
    stat: '2.5x',
    label: 'more insights made by agents through the MCP than by people in the web app, in one month',
    to: '/blog/how-ai-agents-behave',
    linkLabel: 'Read the post',
}

// One card style for the quotes and the stat: a title and the logo at the top, the text, and a link to the source.
function StoryCard({
    customer,
    title,
    children,
    to = `/customers/${customer.slug}`,
    linkLabel = 'Read the story',
    className = '',
}: {
    customer: Customer
    title: React.ReactNode
    children: React.ReactNode
    to?: string
    linkLabel?: string
    className?: string
}): JSX.Element {
    return (
        <figure
            className={`m-0 flex min-w-0 flex-col gap-3 rounded-md border border-primary bg-primary p-4 ${className}`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">{title}</div>
                <div className="flex h-5 shrink-0 items-center">
                    <CustomerLogo customer={customer} className="h-5 max-w-24" />
                </div>
            </div>
            <div className="flex-1 text-sm leading-snug text-secondary">{children}</div>
            <figcaption className="flex justify-end text-xs">
                <Link to={to} state={{ newWindow: true }} className="group font-semibold">
                    {linkLabel} <IconArrowUpRight className="inline-block size-4 text-muted group-hover:text-primary" />
                </Link>
            </figcaption>
        </figure>
    )
}

function MCPNoUI(): JSX.Element {
    const { getCustomer } = useCustomers()
    const quotes = mcpQuotes.flatMap(({ customer: slug, author }) => {
        const customer = getCustomer(slug)
        const person = customer?.quotes?.[author]
        const text = person?.products?.mcp
        return customer && person && text ? [{ customer, person, text }] : []
    })
    const statCustomer = getCustomer(mcpStat.customer)

    return (
        <section
            id="no-ui"
            className="not-prose grid scroll-mt-20 gap-6 @3xl/reader-content:grid-cols-2 @3xl/reader-content:gap-8"
        >
            <div className="min-w-0">
                <SectionHeading
                    className="!mb-0"
                    lede={
                        <>
                            PostHog has a lot of tools for product engineers. We know, we built them. We also kept
                            hearing the same thing: the UI is overwhelming, and with agents it's better to pull context
                            into where you're already building.{' '}
                            <strong className="text-primary">That's where the MCP comes in.</strong>
                        </>
                    }
                >
                    You don't need to use PostHog to <Highlight red>use PostHog</Highlight>
                </SectionHeading>
                <div className="max-w-md rounded-md border border-primary bg-primary p-4">
                    <p className="m-0 font-bold">
                        "But I <span className="rounded-sm bg-green/10 px-0.5 text-green">like</span> the PostHog UI"
                    </p>
                    <p className="mb-0 mt-1 text-sm text-secondary">
                        Then carry on. Try the{' '}
                        <Link
                            to="/roadmap?feature=today-rail-nav"
                            state={{ newWindow: true }}
                            className="font-semibold underline"
                        >
                            new navigation beta
                        </Link>{' '}
                        and tell <SmallTeam slug="surfaces" /> (they'll be thrilled).
                    </p>
                </div>
            </div>
            <div className="grid min-w-0 grid-cols-1 gap-3 @xl/reader-content:grid-cols-2">
                {quotes.map(({ customer, person, text }, index) => (
                    <StoryCard
                        key={customer.slug}
                        customer={customer}
                        className={index === 0 ? '@xl/reader-content:row-span-2' : ''}
                        title={
                            <>
                                <p className="m-0 font-bold leading-tight text-primary">{person.name}</p>
                                <p className="m-0 mt-1 text-sm text-secondary">
                                    {person.role}, {customer.name}
                                </p>
                            </>
                        }
                    >
                        <blockquote className="m-0 border-0 p-0 not-italic">&ldquo;{text}&rdquo;</blockquote>
                    </StoryCard>
                ))}
                {statCustomer && (
                    <StoryCard
                        customer={statCustomer}
                        to={mcpStat.to}
                        linkLabel={mcpStat.linkLabel}
                        title={
                            <p className="m-0 text-3xl font-bold leading-none tracking-tight text-primary">
                                {mcpStat.stat}
                            </p>
                        }
                    >
                        <p className="m-0">{mcpStat.label}</p>
                    </StoryCard>
                )}
            </div>
        </section>
    )
}

function MCPSetupCTA(): JSX.Element {
    return (
        <section
            id="setup"
            className={`${ctaBoxClassName} grid items-center gap-6 border-green bg-green/10 @3xl/reader-content:grid-cols-3 @3xl/reader-content:gap-8`}
        >
            <div className="min-w-0 @3xl/reader-content:col-span-2">
                <h2 className="mb-2 mt-0 text-xl font-bold @xl/reader-content:text-2xl">
                    No PostHog in your app yet? Your agent can add it
                </h2>
                <p className="m-0 text-sm @xl/reader-content:text-base">
                    Connect the MCP, then ask your agent to install PostHog in your GitHub repository. The{' '}
                    <Link
                        to="/docs/ai-engineering/ai-wizard"
                        state={{ newWindow: true }}
                        className="font-semibold underline"
                    >
                        PostHog wizard
                    </Link>{' '}
                    runs in the cloud, makes the code changes, and opens a pull request for you to review.
                </p>
                <MCPInstallCTA className="mt-5 w-full" showDesktopLink={false} />
            </div>
            <figure className="m-0 flex min-w-0 flex-col items-center gap-3">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/Group_144404_d649bc516c.png"
                    alt="A hedgehog toy with its arm, ear, shoe, and hat in pieces on the floor around it"
                    title="Mr. Potato Hog, now with context included."
                    loading="lazy"
                    width={600}
                    className="w-full max-w-40 @3xl/reader-content:max-w-60"
                    imgClassName="block w-full"
                />
                <figcaption className="m-0 text-balance text-center text-sm text-secondary">
                    Some assembly required (by your agent)
                </figcaption>
            </figure>
        </section>
    )
}

function MCPFaq(): JSX.Element {
    return (
        <section id="faq" className="scroll-mt-20 not-prose">
            <SectionHeading>Questions people ask before connecting</SectionHeading>
            <Accordion
                type="single"
                triggerClassName="!px-3 !py-2"
                contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                items={faq.map(({ question, answer, link }) => ({
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
                }))}
            />
        </section>
    )
}

function MCPCTA({
    id,
    title,
    children,
    className = '',
}: {
    id: string
    title: string
    children: React.ReactNode
    className?: string
}): JSX.Element {
    return (
        <section id={id} className={`${ctaBoxClassName} border-purple bg-purple/10 ${className}`}>
            <div className="grid items-center gap-6 @3xl/reader-content:grid-cols-2 @3xl/reader-content:gap-8">
                <div>
                    <h2 className="mb-2 mt-0 flex items-center gap-2 text-xl font-bold @xl/reader-content:text-2xl">
                        {title}
                        <StickerAi className="size-8 shrink-0 -rotate-3 @xl/reader-content:size-10" />
                    </h2>
                    <p className="m-0 text-sm @xl/reader-content:text-base">{children}</p>
                </div>
                <MCPInstallCTA className="w-full" showDesktopLink={false} />
            </div>
        </section>
    )
}

export default function MCPPage(): JSX.Element {
    const [reader, setReader] = useState<Reader>('human')
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'MCP')
        }
    }, [])

    return (
        <>
            <SEO
                title="PostHog MCP – Ask questions. Get answers."
                description="The PostHog Model Context Protocol lets your AI agent query data and take action across PostHog from any MCP-compatible client."
                image="/images/og/default.png"
            />
            <Helmet>
                <link rel="alternate" type="text/markdown" href="https://posthog.com/mcp.md" />
            </Helmet>
            <ReaderView
                title="MCP"
                hideTitle
                hideLeftSidebar
                hideRightSidebar
                hideMarkdownActions
                proseSize="lg"
                showQuestions={false}
            >
                <div className="flex flex-col gap-12 max-w-5xl mx-auto w-full">
                    {reader === 'agent' ? (
                        <AgentView onBack={() => setReader('human')} />
                    ) : (
                        <>
                            <MCPHeader onReadAsAgent={() => setReader('agent')} />
                            <MCPNoUI />
                            <MCPUseCases />
                            <MCPConnectors />
                            <WhatIsMCP />
                            <MCPResources />
                            <MCPSetupCTA />
                            <MCPFaq />
                            <WaitingRoom />
                            <MCPCTA id="connect" title="Don't keep your agent waiting" className="-mt-6 mb-20">
                                <strong>Get started – free.</strong> One command connects the PostHog MCP to Claude
                                Code, Codex, Cursor, VS Code, and Zed.
                            </MCPCTA>
                        </>
                    )}
                </div>
            </ReaderView>
        </>
    )
}
