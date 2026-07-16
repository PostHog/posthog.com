import React, { useCallback, useEffect, useRef, useState } from 'react'
import { HedgehogBasketballCoach, HedgehogCowboyLasso, HedgehogPartyHog } from '@posthog/brand/hoggies'
import {
    IconAI,
    IconArrowUpRight,
    IconBolt,
    IconCheck,
    IconCode,
    IconCursor,
    IconDatabase,
    IconFlask,
    IconStack,
    IconGraph,
    IconHandMoney,
    IconLaptop,
    IconMessage,
    IconPieChart,
    IconRewindPlay,
    IconTerminal,
    IconToggle,
    IconWarning,
} from '@posthog/icons'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import Editor from 'components/Editor'
import SEO from 'components/seo'
import Link from 'components/Link'
import WizardCommand from 'components/WizardCommand'
import WistiaVideo from 'components/WistiaVideo'
import TeamMember from 'components/TeamMember'
import { Bang } from 'components/Icons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { IconPostHog } from 'components/OSIcons'
import PlatformInstall, { mcpInstallSchema } from 'components/PlatformInstall'
import type { InstallSchema } from 'components/PlatformInstall'

const mcpPageInstallSchema: InstallSchema = {
    ...mcpInstallSchema,
    title: 'Get started',
    titleInfoAction: {
        label: 'Learn more about the PostHog MCP',
        to: '/docs/model-context-protocol',
        state: { newWindow: true },
    },
    secondaryAction: {
        label: 'Sign up via web',
        to: 'https://app.posthog.com/signup',
        state: { newWindow: true, initialTab: 'signup' },
        icon: <IconArrowUpRight className="size-4 text-secondary" />,
    },
}

function Q({ text }: { text?: React.ReactNode }): JSX.Element {
    const heading = text || ''
    return <h2 className="!text-3xl !mt-12 !mb-4 first:!mt-6">{heading}</h2>
}

function MCPHeader(): JSX.Element {
    return (
        <header className="relative not-prose mb-8">
            <div className="relative flex flex-col-reverse @lg:flex-row items-center pt-8 max-w-[900px] mx-auto gap-4 @lg:gap-2">
                <div className="flex-1 text-center @lg:text-left">
                    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold !leading-[1.12] !mb-3 !mt-0 tracking-tight">
                        Ask questions.
                        <br />
                        <span className="bg-red/10 dark:bg-yellow/20 text-red dark:text-yellow rounded-md px-1 whitespace-nowrap">
                            Get answers.
                        </span>
                    </h1>
                    <p className="!mt-0 !mb-5 text-base @sm:text-lg opacity-80">
                        We don't think the future has a UI.
                        <br />
                        So we built one without one.
                    </p>
                    <WizardCommand command="mcp add" slim />
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 justify-center @lg:justify-start text-[13px] font-medium opacity-70">
                        <span className="inline-flex items-center gap-1">
                            <IconCheck className="size-3.5" />
                            50+ tools
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <IconCheck className="size-3.5" />
                            Open source
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <IconCheck className="size-3.5" />
                            Certified no-UI
                        </span>
                    </div>
                </div>
                <div className="shrink-0 flex justify-center">
                    <HedgehogCowboyLasso
                        title="PostHog hedgehog cowboy swinging a lasso"
                        className="h-auto w-52 @lg:w-72 scale-x-[-1]"
                    />
                </div>
            </div>
        </header>
    )
}

function ExplainerVideo(): JSX.Element {
    return (
        <div className="not-prose my-6">
            <p className="text-base @sm:text-lg text-primary mb-1">
                Here&apos;s <TeamMember name="Matt Brooker" photo /> explaining the PostHog MCP server.
            </p>
            <p className="text-base @sm:text-lg italic font-light text-secondary mt-0 mb-5">
                Yes, he&apos;s holding a chicken.
            </p>

            <div className="aspect-video">
                <WistiaVideo videoId="tjc4o4lldr" className="!aspect-video" autoPlay={false} />
            </div>
        </div>
    )
}

function DemoVideo(): JSX.Element {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <div className="not-prose my-6">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
                <PlatformInstall
                    schema={mcpPageInstallSchema}
                    className="relative z-20 w-full flex-[1_1_24rem] !mb-4"
                />
                <div ref={ref} className="relative h-36 @sm:h-48 min-w-0 flex-[1_1_18rem]">
                    <motion.div
                        className="absolute top-0 left-1/2 w-full max-w-96"
                        initial={{ opacity: 0, y: '100%', x: '-50%' }}
                        animate={inView ? { opacity: 1, y: 0, x: '-50%' } : { opacity: 0, y: '100%', x: '-50%' }}
                        transition={{ delay: 0.2 }}
                    >
                        <HedgehogPartyHog className="pointer-events-none w-full h-auto" />
                    </motion.div>
                </div>
            </div>
            <div className="relative z-10 rounded-md overflow-hidden border border-primary shadow-md">
                <div className="aspect-video bg-black">
                    <video
                        src="https://res.cloudinary.com/dmukukwp6/video/upload/mcp_error_tracking_debugging30_6e25828d88.mp4"
                        className="w-full h-full"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>
            </div>
        </div>
    )
}

interface SubfeatureItem {
    title: string
    description: string
    icon: React.ReactNode
    color: string
}

function Subfeatures(): JSX.Element {
    const items: SubfeatureItem[] = [
        {
            title: 'Lives in your editor',
            description: 'Cursor, Claude, Codex, Zed, VS Code, PostHog Code. Wherever you already work.',
            icon: <IconCode />,
            color: 'blue',
        },
        {
            title: 'Speaks plain English',
            description: 'You ask the question. The MCP figures out the query and answers it.',
            icon: <IconMessage />,
            color: 'purple',
        },
        {
            title: 'Costs nothing to use',
            description: "It doesn't show up on your PostHog bill. Not even on the free plan.",
            icon: <IconHandMoney />,
            color: 'seagreen',
        },
    ]
    return (
        <ul className="list-none p-0 my-6 grid grid-cols-1 @lg:grid-cols-3 gap-3 not-prose">
            {items.map((item) => (
                <li
                    key={item.title}
                    className="bg-accent dark:bg-accent-dark border border-border dark:border-border-dark rounded-md p-3"
                >
                    <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center justify-center rounded text-${item.color}`}>
                            <span className="w-5 h-5">{item.icon}</span>
                        </span>
                        <h5 className="text-lg font-bold leading-tight">{item.title}</h5>
                    </div>
                    <p className="text-sm m-0">{item.description}</p>
                </li>
            ))}
        </ul>
    )
}

const checklist = [
    'Run funnels',
    'Pull errors by occurrence',
    'Write the SQL',
    'Spin up an experiment',
    'Toggle a feature flag',
    'Create a cohort',
    'Build a survey',
    'Check your logs',
    'Find that one weird replay',
    'Remembers your event taxonomy better than you',
]

function MCPChecklist(): JSX.Element {
    return (
        <div className="not-prose">
            <ul className="list-none p-0 m-0 grid grid-cols-1 @xs:grid-cols-2 gap-x-4 gap-y-1.5">
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

interface SocialCardProps {
    username: string
    handle: string
    quote: string
    platform: 'twitter' | 'reddit'
    avatarColor: string
}

const complaintList: SocialCardProps[] = [
    {
        username: 'Maya',
        handle: 'productpilled',
        quote: "I just spent 20 minutes trying to find where to add a property filter. I'm a senior engineer.",
        platform: 'twitter',
        avatarColor: 'red',
    },
    {
        username: 'Dan',
        handle: 'toomanymenus',
        quote: 'The PostHog UI has, conservatively, 14,000 menus.',
        platform: 'reddit',
        avatarColor: 'blue',
    },
    {
        username: 'Sam',
        handle: 'phdrequired',
        quote: 'PostHog is great if you have 6 hours and a PhD in product analytics.',
        platform: 'twitter',
        avatarColor: 'orange',
    },
    {
        username: 'Jess',
        handle: 'tabhoarder',
        quote: 'I have 14 PostHog tabs open. I do not know why.',
        platform: 'reddit',
        avatarColor: 'yellow',
    },
]

function ComplaintCard({ c, rotation }: { c: SocialCardProps; rotation: string }): JSX.Element {
    return (
        <div
            className={`bg-white dark:bg-accent-dark border border-primary rounded-md p-3 flex flex-col gap-2 ${rotation}`}
        >
            <div className="flex items-center gap-2">
                <div
                    className={`size-7 rounded-full bg-${c.avatarColor} flex items-center justify-center text-white font-bold text-xs shrink-0`}
                >
                    {c.username.charAt(0).toUpperCase()}
                </div>
                <div className="leading-tight">
                    <p className="font-semibold text-[13px] m-0">{c.username}</p>
                    <p className="text-[11px] text-secondary m-0">
                        {c.platform === 'twitter' ? `@${c.handle}` : `u/${c.handle}`}
                    </p>
                </div>
                <span
                    className={`ml-auto ${
                        c.platform === 'twitter' ? 'text-base' : 'text-[10px]'
                    } text-secondary opacity-60 uppercase tracking-wider self-start`}
                >
                    {c.platform === 'twitter' ? '𝕏' : 'Reddit'}
                </span>
            </div>
            <p className="text-[13px] m-0 leading-snug flex-1">"{c.quote}"</p>
            <div className="flex items-center gap-1.5 mt-1">
                <span className="inline-flex items-center gap-1 bg-yellow text-primary text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-sm tracking-wider">
                    <IconCheck className="size-2.5" />
                    Should've used MCP
                </span>
            </div>
        </div>
    )
}

function FutureNoUI(): JSX.Element {
    const rotations = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]', 'rotate-[0.5deg]']
    return (
        <div className="not-prose my-6 grid grid-cols-1 @lg:grid-cols-[1fr,1fr] gap-6 @lg:gap-8 items-start">
            <div className="prose dark:prose-invert max-w-none text-[15px] leading-relaxed">
                <p>
                    PostHog has a lot of tools. We know &mdash; we built them. We also kept hearing the same thing: the
                    UI is overwhelming, and most people only use a fraction of what's actually there.
                </p>
                <p>
                    Even our own marketing team can&apos;t{' '}
                    <Link
                        to="/newsletter/hidden-danger-of-shipping-fast"
                        state={{ newWindow: true }}
                        className="underline"
                    >
                        keep up with how fast we ship
                    </Link>
                    .
                </p>
                <p>
                    We could have run a campaign telling you the UI is fine. We could have A/B tested a new sidebar
                    every week. We did neither, because we don&apos;t think the future has a UI at all.
                </p>
                <p className="font-semibold">That&apos;s where the MCP comes in.</p>
                <div className="mt-5 bg-accent dark:bg-accent-dark border border-primary rounded-md p-4">
                    <p className="font-bold text-[15px] m-0 mb-1">
                        &ldquo;But I <span className="bg-green/20 text-green rounded-sm px-0.5">like</span> the PostHog
                        UI&rdquo;
                    </p>
                    <p className="text-[13px] m-0 text-secondary leading-snug">
                        Then carry on. It&apos;s not going anywhere. And while you&apos;re in there, tell{' '}
                        <TeamMember name="Adam Leith" photo /> &mdash; he&apos;ll be thrilled.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 @sm:grid-cols-2 gap-3">
                {complaintList.map((c, idx) => (
                    <ComplaintCard key={c.handle} c={c} rotation={rotations[idx % rotations.length]} />
                ))}
            </div>
        </div>
    )
}

/* SupportedClients + PostHogCodeBoxout removed — replaced by <PlatformInstall /> for the
   "Where does the MCP run?" section. */

function MCPCTA(): JSX.Element {
    return (
        <div className="not-prose my-6 mt-12">
            <div className="grid grid-cols-1 @lg:grid-cols-[10rem,1fr] gap-5 @lg:gap-6 items-center bg-accent dark:bg-accent-dark border border-primary rounded p-4 @lg:ml-5">
                <div className="relative order-2 @lg:order-1 flex justify-center shrink-0 @lg:self-stretch">
                    <HedgehogBasketballCoach
                        title="PostHog basketball coach hedgehog"
                        className="w-36 h-auto translate-y-2 scale-x-[-1] @lg:absolute @lg:w-52 @lg:-left-10 @lg:-bottom-10"
                    />
                </div>
                <div className="order-1 @lg:order-2">
                    <p className="text-xl @sm:text-2xl font-bold m-0 mb-1">
                        Install the{' '}
                        <span className="bg-blue/10 dark:bg-blue/20 text-blue rounded-md px-1 whitespace-nowrap">
                            MCP
                        </span>
                    </p>
                    <p className="text-secondary m-0 mb-4 text-[13px]">
                        One command. Thirty seconds. Works in Cursor, Claude, Codex, PostHog Code, and friends.
                    </p>
                    <div className="mb-4">
                        <WizardCommand command="mcp add" slim />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
                        <Link
                            to="/docs/model-context-protocol"
                            className="font-semibold underline hover:opacity-75 !text-inherit"
                        >
                            Read the docs
                        </Link>
                        <Link
                            to="https://github.com/PostHog/posthog/tree/master/services/mcp"
                            external
                            className="!text-inherit !no-underline"
                        >
                            View on GitHub
                        </Link>
                        <Link
                            to="/blog/machine-copy-paste-mcp-intro"
                            className="font-semibold underline hover:opacity-75 !text-inherit"
                        >
                            Why we built it
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function MCPPage(): JSX.Element {
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
                description="The PostHog Model Context Protocol lets your coding agent query your real product data in plain English. No SQL, no dashboards, no tabs. Free forever."
                image="/images/og/default.png"
            />
            <Editor type="mdx" hasPadding={false} className="[&_article]:!max-w-none">
                <div className="px-4 @xl:px-8 pb-4 max-w-[900px] mx-auto">
                    <MCPHeader />

                    <Q text="What is the PostHog MCP?" />
                    <p>
                        The MCP is a server your coding agent talks to. Ask a question in English. It runs the query
                        against your PostHog data. The answer lands in your editor. No SQL. No dashboards. No tabs full
                        of charts you forgot you opened.
                    </p>
                    <p>Try things like:</p>
                    <ul>
                        <li>
                            <em>"How many unique users signed up in the last 7 days, broken down by day?"</em>
                        </li>
                        <li>
                            <em>"Create an A/B test for our pricing page that measures conversion to checkout."</em>
                        </li>
                        <li>
                            <em>"What are the top 5 errors in my project this week?"</em>
                        </li>
                    </ul>

                    <ExplainerVideo />
                    <Subfeatures />

                    <Q text="What does the MCP actually do?" />
                    <p className="max-w-xl">
                        Your agent picks the right tool from more than 50 available options, and runs it. You don't even
                        need to know what's setup; the MCP does it for you (and asks for help if needed).
                    </p>

                    <MCPChecklist />

                    <Capabilities />

                    <Q
                        text={
                            <>
                                You don&apos;t need to use PostHog to{' '}
                                <span className="bg-blue/10 dark:bg-blue/20 text-blue rounded-md px-1 whitespace-nowrap">
                                    use PostHog
                                </span>
                            </>
                        }
                    />
                    <FutureNoUI />

                    <Q text="Where does the MCP run?" />
                    <p>
                        We know{' '}
                        <Link to="/code" state={{ newWindow: true }}>
                            which code editor we prefer
                        </Link>
                        , but the MCP is flexible to most common tools.
                    </p>

                    <DemoVideo />

                    <MCPCTA />
                </div>
            </Editor>
        </>
    )
}
