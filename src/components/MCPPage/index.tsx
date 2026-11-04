import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { motion, useReducedMotion } from 'framer-motion'
import {
    IconAI,
    IconCheck,
    IconDatabase,
    IconEye,
    IconFlask,
    IconGraph,
    IconLightBulb,
    IconLock,
    IconPieChart,
    IconPulse,
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
import { InlineCode, SectionHeading } from 'components/Products/ReaderViewProduct/helpers'
import MCPInstallCTA from 'components/MCPInstallCTA'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'
import SlotMachineText from 'components/SlotMachineText'
import SmallTeam from 'components/SmallTeam'
import TeamMember from 'components/TeamMember'
import { StickerCrown } from 'components/Stickers/Stickers'
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
            <div className="grid grid-cols-[minmax(0,1fr)_8rem] items-center gap-x-4 gap-y-4 @lg/reader-content:grid-cols-[minmax(0,1fr)_10rem] @lg/reader-content:gap-x-6 @xl/reader-content:grid-cols-[minmax(0,1fr)_12rem] @xl/reader-content:gap-x-8 @2xl/reader-content:grid-cols-[minmax(0,1fr)_16rem] @3xl/reader-content:grid-cols-2 @3xl/reader-content:gap-x-10">
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
                    Your PostHog data, wherever your agent works. Query analytics, debug errors, roll out flags, and run
                    experiments from any MCP-compatible client, without opening a browser tab.
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

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="whitespace-nowrap bg-blue/10 p-0.5 font-bold text-blue">{children}</span>
)

type IconItem = {
    Icon: React.ComponentType<{ className?: string }>
    color: string
    name: string
    description: React.ReactNode
}

function IconChipRow({ items }: { items: IconItem[] }): JSX.Element {
    return (
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
}

const whatItIs: IconItem[] = [
    {
        Icon: IconSparkles,
        color: 'text-blue',
        name: 'Light on context',
        description: (
            <>
                Most clients get one <InlineCode>exec</InlineCode> tool and look up the rest on demand, so the tool list
                stays out of the context window.
            </>
        ),
    },
    {
        Icon: IconEye,
        color: 'text-green',
        name: 'Read-only if you want it',
        description: (
            <>
                Add <InlineCode>?readonly=true</InlineCode> and every write tool goes away.
            </>
        ),
    },
    {
        Icon: IconCheck,
        color: 'text-yellow',
        name: 'Free to connect',
        description: (
            <>
                Connecting and calling tools costs nothing. The few tools that run LLMs need{' '}
                <Link to="/docs/posthog-ai/allow-access" className="font-semibold underline">
                    AI data processing
                </Link>{' '}
                and add PostHog AI spend.
            </>
        ),
    },
    {
        Icon: IconLock,
        color: 'text-purple',
        name: 'Pin it to a project',
        description: "Lock a connection to one organization or project, so the agent can't switch.",
    },
]

function WhatIsMCP(): JSX.Element {
    return (
        <section id="what-is-mcp" className="scroll-mt-20 not-prose">
            <div className="grid gap-4 @3xl/reader-content:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                <div className="@container flex min-w-0 flex-col rounded border border-primary bg-primary p-4 @xl:p-6">
                    <div className="mb-5 flex items-start gap-4">
                        <div className="min-w-0 flex-1">
                            <h2 className="mb-3 mt-0 text-2xl font-bold leading-tight">
                                What is the <Highlight>PostHog MCP</Highlight>?
                            </h2>
                            <p className="m-0 text-sm text-secondary @xl:text-base">
                                Your PostHog data, wherever your agent works. Analytics, errors, flags, experiments,
                                surveys, and SQL sit behind one hosted MCP endpoint, so any MCP client can read and
                                change them: Claude, Cursor, Codex, VS Code, Windsurf, Zed, and more.
                            </p>
                        </div>
                        <SmallTeam
                            slug="context-and-mcp"
                            variant="crest"
                            crestOnly
                            className="shrink-0"
                            crestClassName="size-24 @xl:size-32"
                        />
                    </div>
                    <IconChipRow items={whatItIs} />
                    <figure className="m-0 mt-6 flex flex-col items-center">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/hog_bottle_4ba0223072.png"
                            alt=""
                            width={500}
                            loading="lazy"
                            className="w-full max-w-xs"
                            imgClassName="block w-full"
                        />
                        <figcaption className="mt-2 text-center text-sm text-secondary">
                            PostHog, bottled for any MCP client.
                        </figcaption>
                    </figure>
                </div>
                <div
                    id="installation"
                    className="@container flex min-w-0 scroll-mt-20 flex-col rounded border border-primary bg-primary p-4 @xl:p-6"
                >
                    <h2 className="mb-3 mt-0 text-2xl font-bold leading-tight">
                        Where does it <Highlight>run</Highlight>?
                    </h2>
                    <p className="m-0 text-sm text-secondary">
                        On our servers. Connect to <InlineCode>https://mcp.posthog.com/mcp</InlineCode>. You do not need
                        to host anything. Sign in with PostHog OAuth, and it routes you to your US or EU data region.
                    </p>
                    <div className="mt-6 border-t border-primary pt-4">
                        <h3 className="m-0 flex items-center gap-2 text-base font-bold">
                            <StickerCrown className="size-8 shrink-0 -rotate-6" />
                            See who uses it
                        </h3>
                        <p className="mb-0 mt-1 text-sm text-secondary">
                            The{' '}
                            <Link to="/mcp/leaderboard" state={{ newWindow: true }} className="font-semibold underline">
                                MCP leaderboard
                            </Link>{' '}
                            ranks the models and clients pinging the PostHog MCP server.
                        </p>
                    </div>
                    <div className="mt-6 border-t border-primary pt-4">
                        <h3 className="m-0 text-base font-bold">On an enterprise plan?</h3>
                        <p className="mb-0 mt-0.5 text-sm text-secondary">
                            Control access through your identity provider with{' '}
                            <Link
                                to="/docs/model-context-protocol/enterprise-managed-authorization"
                                className="font-semibold underline"
                            >
                                enterprise-managed authorization
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const checklist = [
    'Run funnels',
    'Pull errors by occurrence',
    'Write the SQL',
    'Spin up an experiment',
    'Toggle a feature flag',
    'Triage a support ticket',
    'Set up a CDP destination',
    'Query governed metrics',
    'Build a survey',
    'Find that one weird replay',
]

function MCPChecklist(): JSX.Element {
    return (
        <div className="not-prose">
            <ul className="list-none p-0 m-0 grid w-fit grid-cols-1 @xs:grid-cols-2 gap-x-6 gap-y-1.5">
                {checklist.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[14px]">
                        <IconCheck className="size-4 text-green shrink-0 mt-0.5" />
                        <span className="font-semibold">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const potatoHogs: `https://res.cloudinary.com/${string}`[] = [
    'https://res.cloudinary.com/dmukukwp6/image/upload/potato_hog_1_a786204242.png',
    'https://res.cloudinary.com/dmukukwp6/image/upload/potato_hog_3_35d1b32e18.png',
]

function MCPUseCases(): JSX.Element {
    const reducedMotion = useReducedMotion()
    const [visibleHog, setVisibleHog] = useState(0)

    useEffect(() => {
        if (reducedMotion) return
        const timer = setInterval(() => setVisibleHog((current) => (current + 1) % potatoHogs.length), 3500)
        return () => clearInterval(timer)
    }, [reducedMotion])

    return (
        <section id="use-cases" className="scroll-mt-20 not-prose">
            <div className="grid gap-6 @4xl/reader-content:grid-cols-[minmax(0,1fr)_28rem] @4xl/reader-content:gap-10">
                <div className="min-w-0">
                    <SectionHeading
                        lede={`Your agent selects from ${toolCountLabel} across ${categoryCount} categories, then reads or updates your PostHog project for you.`}
                    >
                        What can you do with it?
                    </SectionHeading>
                    <MCPChecklist />
                </div>
                <figure className="m-0 flex flex-col justify-center">
                    <div className="relative min-h-72 flex-1">
                        {potatoHogs.map((src, index) => (
                            <CloudinaryImage
                                key={src}
                                src={src}
                                alt=""
                                loading="lazy"
                                width={800}
                                className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${
                                    index === visibleHog ? 'opacity-100' : 'opacity-0'
                                }`}
                                imgClassName="size-full object-contain"
                            />
                        ))}
                    </div>
                    <figcaption className="mt-2 text-center text-sm text-secondary">
                        Some assembly required, and the agent does the assembling.
                    </figcaption>
                </figure>
            </div>
            <Capabilities />
            <p className="text-sm text-secondary leading-relaxed mt-4 mb-0">
                The semantic layer is also available, so agents can query governed metrics such as MRR with the same
                definition in every session.{' '}
                <Link to="/docs/semantic-layer" className="font-semibold underline">
                    Learn about the semantic layer
                </Link>
                .
            </p>
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
        title: 'Product analytics',
        prompt: "What's our 30-day user retention?",
        icon: <IconGraph />,
        color: 'blue',
    },
    {
        title: 'Error tracking',
        prompt: 'Show me the top 5 errors this week.',
        icon: <IconWarning />,
        color: 'orange',
    },
    {
        title: 'Session replay',
        prompt: 'Find a recording where a user got frustrated.',
        icon: <IconRewindPlay />,
        color: 'yellow',
    },
    {
        title: 'Feature flags',
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
        title: 'SQL & warehouse',
        prompt: 'Run a HogQL query to count events from the last 24 hours.',
        icon: <IconDatabase />,
        color: 'purple',
    },
    {
        title: 'Web analytics',
        prompt: 'Which referrers drove the most traffic last week?',
        icon: <IconPieChart />,
        color: 'green-2',
    },
    {
        title: 'LLM analytics',
        prompt: "What's the average tokens per trace today?",
        icon: <IconAI />,
        color: 'purple',
    },
]

const TYPING_SPEED = 30
const PAUSE_BEFORE_RESPONSE = 400
const CYCLE_INTERVAL = 5000

const fakeResponses: Record<string, string[]> = {
    'Product analytics': [
        'Running retention query for the last 30 days...',
        'Day 0: 100% → Day 1: 42% → Day 7: 28% → Day 30: 14%',
        'Retention is trending up 3% from last month.',
    ],
    'Error tracking': [
        'Fetching top errors by occurrence...',
        '1. TypeError: Cannot read property "id" of undefined (1,247)',
        '2. 504 Gateway Timeout on /api/batch (892)',
        '3. RangeError: Maximum call stack size exceeded (541)',
        '4. SyntaxError: Unexpected token in JSON at position 0 (327)',
        '5. Error: ECONNREFUSED 127.0.0.1:5432 (219)',
    ],
    'Session replay': [
        'Searching for rage-click sessions...',
        'Found 23 sessions with rage clicks in the last 7 days.',
        'Top page: /checkout (9 sessions, avg 6 clicks)',
    ],
    'Feature flags': [
        'Listing active feature flags...',
        'new-onboarding: 50% rollout | beta-dashboard: 100%',
        '12 flags active, 3 stale (no evaluations in 30d)',
    ],
    Experiments: [
        'Fetching running experiments...',
        'pricing-page-v2: +12% conversion (p=0.03) — significant',
        'onboarding-flow: +4% activation (p=0.21) — not yet',
    ],
    'SQL & warehouse': [
        'Executing HogQL query...',
        'SELECT count() FROM events WHERE timestamp > now() - interval 1 day',
        'Result: 1,847,293 events in the last 24 hours',
    ],
    'Web analytics': [
        'Querying referrer data for last 7 days...',
        '1. google.com (12,847)',
        '2. twitter.com (3,291)',
        '3. github.com (2,103)',
        '4. (direct) (1,987)',
    ],
    'LLM analytics': [
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
        description: 'Explore 20+ example prompts and multi-step recipes.',
        cta: 'Browse the recipes',
        to: '/docs/model-context-protocol/use-cases',
    },
    {
        title: 'MCP tools reference',
        Icon: IconWrench,
        color: 'text-red',
        description: 'See every tool the server exposes, grouped by product area.',
        cta: 'See every tool',
        to: '/docs/model-context-protocol/tools',
    },
    {
        title: 'FAQ and advanced setup',
        Icon: IconQuestion,
        color: 'text-blue',
        description: 'Learn about auth, scoping, filtering, and safety.',
        cta: 'Read the FAQ',
        to: '/docs/model-context-protocol/faq',
    },
]

function MCPResources(): JSX.Element {
    return (
        <section id="resources" className="scroll-mt-20 not-prose">
            <SectionHeading>Go deeper</SectionHeading>
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

interface Complaint {
    handle: string
    quote: string
    platform: 'twitter' | 'reddit'
}

const complaints: Complaint[] = [
    {
        handle: 'productpilled',
        quote: "I just spent 20 minutes trying to find where to add a property filter. I'm a senior engineer.",
        platform: 'twitter',
    },
    {
        handle: 'toomanymenus',
        quote: 'The PostHog UI has, conservatively, 14,000 menus.',
        platform: 'reddit',
    },
    {
        handle: 'phdrequired',
        quote: 'PostHog is great if you have 6 hours and a PhD in product analytics.',
        platform: 'twitter',
    },
    {
        handle: 'tabhoarder',
        quote: 'I have 14 PostHog tabs open. I do not know why.',
        platform: 'reddit',
    },
]

function ComplaintCard({ complaint }: { complaint: Complaint }): JSX.Element {
    const { handle, quote, platform } = complaint
    return (
        <figure className="m-0 flex min-w-0 flex-col rounded-md border border-primary bg-primary p-3">
            <blockquote className="m-0 flex-1 border-0 p-0 text-sm font-semibold leading-snug not-italic">
                "{quote}"
            </blockquote>
            <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                <span className="min-w-0 truncate text-xs text-secondary">
                    {platform === 'twitter' ? `@${handle}` : `u/${handle}`}
                </span>
                <span className="inline-flex items-center gap-1 rounded-sm bg-green/10 px-1 py-0.5 text-xs font-semibold text-green">
                    <IconCheck className="size-3" />
                    Should've used MCP
                </span>
            </figcaption>
        </figure>
    )
}

function NoUISection(): JSX.Element {
    return (
        <section
            id="no-ui"
            className="not-prose grid scroll-mt-20 gap-6 border-b border-primary pb-12 @3xl/reader-content:grid-cols-2 @3xl/reader-content:gap-8"
        >
            <div className="min-w-0">
                <SectionHeading>
                    You don't need to use PostHog to <Highlight>use PostHog</Highlight>
                </SectionHeading>
                <p className="m-0 text-base text-secondary">
                    PostHog has a lot of tools. We know, we built them. We also kept hearing the same thing: the UI is
                    overwhelming, and most people only use a fraction of what's there.
                </p>
                <p className="mb-0 mt-3 text-base font-bold text-primary">That's where the MCP comes in.</p>
                <div className="mt-5 rounded-md border border-primary bg-primary p-4">
                    <p className="m-0 font-bold">
                        "But I <span className="rounded-sm bg-green/10 px-0.5 text-green">like</span> the PostHog UI"
                    </p>
                    <p className="mb-0 mt-1 text-sm text-secondary">
                        Then carry on. It's not going anywhere. And while you're in there, tell{' '}
                        <TeamMember name="Adam Leith" photo />. He'll be thrilled.
                    </p>
                </div>
            </div>
            <div className="grid min-w-0 grid-cols-1 gap-3 @xl/reader-content:grid-cols-2 @3xl/reader-content:grid-rows-2">
                {complaints.map((complaint) => (
                    <ComplaintCard key={complaint.handle} complaint={complaint} />
                ))}
            </div>
        </section>
    )
}

function MCPAnalyticsStrip(): JSX.Element {
    return (
        <section
            id="mcp-analytics"
            className="not-prose grid scroll-mt-20 gap-4 rounded-md border border-blue bg-blue/10 p-4 @xl/reader-content:p-5 @3xl/reader-content:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] @3xl/reader-content:items-center"
        >
            <div className="min-w-0">
                <h2 className="m-0 text-base font-bold leading-tight @xl/reader-content:text-lg">
                    Running an MCP server of your own?
                </h2>
                <p className="mb-0 mt-1 text-sm text-secondary">
                    MCP Analytics is product analytics for MCP servers. It shows which tools agents call, what they try
                    to do, and where calls fail.
                </p>
            </div>
            <Link
                to="/docs/mcp-analytics"
                state={{ newWindow: true }}
                className="group flex min-w-0 items-center gap-3 text-primary no-underline"
            >
                <IconPulse className="size-8 shrink-0 text-blue" />
                <span className="min-w-0">
                    <strong className="block text-sm group-hover:underline">MCP Analytics →</strong>
                    <span className="block text-sm text-secondary">Read the docs.</span>
                </span>
            </Link>
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

function MCPCTA(): JSX.Element {
    return (
        <section
            id="get-started"
            className="scroll-mt-20 not-prose rounded-md border border-purple bg-purple/10 p-5 shadow-xl @md/reader-content:p-7"
        >
            <div className="grid items-center gap-6 @3xl/reader-content:grid-cols-2 @3xl/reader-content:gap-8">
                <div>
                    <h2 className="mb-2 mt-0 text-xl font-bold @xl/reader-content:text-2xl">
                        Connect your agent in one command
                    </h2>
                    <p className="m-0">
                        <strong>Get started – free.</strong> Run the wizard, sign in, and your agent can use PostHog.
                    </p>
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
                            <WhatIsMCP />
                            <MCPAnalyticsStrip />
                            <MCPUseCases />
                            <NoUISection />
                            <MCPCTA />
                            <MCPResources />
                            <MCPFaq />
                            <WaitingRoom />
                        </>
                    )}
                </div>
            </ReaderView>
        </>
    )
}
