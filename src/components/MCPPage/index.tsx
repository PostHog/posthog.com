import React, { useCallback, useEffect, useRef, useState } from 'react'
import { HedgehogBasketballCoach, HedgehogCowboyLasso } from '@posthog/brand/hoggies'
import {
    IconAI,
    IconArrowUpRight,
    IconCheck,
    IconCode,
    IconDatabase,
    IconFlask,
    IconGraph,
    IconHandMoney,
    IconMessage,
    IconPieChart,
    IconRewindPlay,
    IconToggle,
    IconWarning,
} from '@posthog/icons'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import SEO from 'components/seo'
import Link from 'components/Link'
import WizardCommand from 'components/WizardCommand'
import TeamMember from 'components/TeamMember'
import ScrollArea from 'components/RadixUI/ScrollArea'
import ReaderView from 'components/ReaderView'
import { InlineCode, SectionHeading } from 'components/Products/ReaderViewProduct/helpers'
import PlatformInstall, { mcpInstallSchema } from 'components/PlatformInstall'
import type { InstallSchema } from 'components/PlatformInstall'
import mcpToolsData from '../../data/mcp-tools.json'

// The tool schema is fetched from the main repo at build time, so the exact totals move
// between builds. Round down to the nearest hundred to keep the claim true either way.
const { categories: toolCategories } = mcpToolsData as { categories: { tools: unknown[] }[] | null }
const toolCount = toolCategories?.reduce((total, category) => total + category.tools.length, 0) ?? 0
const categoryCount = toolCategories?.length ?? 0
const toolCountLabel = toolCount >= 100 ? `${Math.floor(toolCount / 100) * 100}+ tools` : 'Hundreds of tools'

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

function MCPHeader(): JSX.Element {
    return (
        <section id="overview" className="scroll-mt-20 not-prose flex flex-col gap-12 max-w-5xl mx-auto w-full">
            <header className="relative flex flex-col-reverse @3xl/reader-content:flex-row items-center gap-4 @3xl/reader-content:gap-8">
                <div className="flex-1 text-center @3xl/reader-content:text-left">
                    <h1 className="text-4xl @3xl/reader-content:text-5xl font-bold !leading-[1.12] !mb-3 !mt-0 tracking-tight">
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
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 justify-center @3xl/reader-content:justify-start text-[13px] font-medium opacity-70">
                        <span className="inline-flex items-center gap-1">
                            <IconCheck className="size-3.5" />
                            {toolCountLabel}
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <IconCheck className="size-3.5" />
                            Free hosted server
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <IconCheck className="size-3.5" />
                            Open source
                        </span>
                    </div>
                </div>
                <div className="shrink-0 flex justify-center">
                    <HedgehogCowboyLasso
                        title="PostHog hedgehog cowboy swinging a lasso"
                        className="h-auto w-52 @3xl/reader-content:w-72 scale-x-[-1]"
                    />
                </div>
            </header>
        </section>
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
            title: 'Works where you work',
            description: 'Use it in PostHog Desktop, Claude, Cursor, Codex, VS Code, Windsurf, Zed, or any MCP client.',
            icon: <IconCode />,
            color: 'blue',
        },
        {
            title: 'Reads and writes',
            description: 'Query analytics, investigate errors, manage flags, and take action across PostHog.',
            icon: <IconMessage />,
            color: 'purple',
        },
        {
            title: 'Free to connect',
            description: 'Connections and tool calls are free. Tools that use PostHog AI can add AI spend.',
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

function WhatIsMCP(): JSX.Element {
    return (
        <section id="what-is-mcp" className="scroll-mt-20 not-prose">
            <SectionHeading>What is the PostHog MCP?</SectionHeading>
            <div className="max-w-3xl text-lg leading-relaxed">
                <p className="m-0">
                    The PostHog MCP is a free, hosted server that lets your AI agent use PostHog. Ask in plain English.
                    Your agent ships a feature flag from a prompt, digs into a stack trace without leaving your editor,
                    runs a HogQL query, or triages a support ticket – and answers where you already work.
                </p>
            </div>
            <Subfeatures />
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

function MCPUseCases(): JSX.Element {
    return (
        <section id="use-cases" className="scroll-mt-20 not-prose">
            <SectionHeading
                lede={`Your agent selects from ${toolCountLabel} across ${categoryCount} product areas, then reads or updates your PostHog project for you.`}
            >
                What can you do with it?
            </SectionHeading>
            <MCPChecklist />
            <Capabilities />
            <p className="text-sm text-secondary leading-relaxed mt-4 mb-0">
                The semantic layer is also available in beta, so agents can query governed metrics such as MRR with the
                same definition in every session.{' '}
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

function WhyMCP(): JSX.Element {
    return (
        <section id="why-mcp" className="scroll-mt-20 not-prose">
            <SectionHeading>
                You don&apos;t need to use PostHog to{' '}
                <span className="bg-blue/10 dark:bg-blue/20 text-blue rounded-md px-1 whitespace-nowrap">
                    use PostHog
                </span>
            </SectionHeading>
            <FutureNoUI />
        </section>
    )
}

function MCPInstallation(): JSX.Element {
    return (
        <section id="installation" className="scroll-mt-20 not-prose">
            <SectionHeading lede="The PostHog Wizard installs the MCP in supported clients. You can also connect any MCP-compatible client manually.">
                Where does the MCP run?
            </SectionHeading>
            <div className="bg-primary rounded shadow-2xl p-4 @2xl/reader-content:p-8 @4xl/reader-content:p-10">
                <PlatformInstall schema={mcpPageInstallSchema} className="w-full !mb-0" />
                <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-3 mt-4">
                    <div className="border border-primary rounded p-4">
                        <h3 className="text-base font-bold text-primary mt-0 mb-1">Hosted endpoint</h3>
                        <p className="text-sm text-secondary leading-relaxed m-0">
                            Connect to <InlineCode>https://mcp.posthog.com/mcp</InlineCode>. You do not need to host a
                            server yourself.
                        </p>
                    </div>
                    <div className="border border-primary rounded p-4">
                        <h3 className="text-base font-bold text-primary mt-0 mb-1">Automatic region routing</h3>
                        <p className="text-sm text-secondary leading-relaxed m-0">
                            Sign in with PostHog OAuth. The authentication server routes you to the correct US or EU
                            data region.
                        </p>
                    </div>
                    <div className="border border-primary rounded p-4">
                        <h3 className="text-base font-bold text-primary mt-0 mb-1">Light on context</h3>
                        <p className="text-sm text-secondary leading-relaxed m-0">
                            Most clients get a single <InlineCode>exec</InlineCode> tool and look up the others on
                            demand, so a large tool list does not fill the context window.
                        </p>
                    </div>
                    <div className="border border-primary rounded p-4">
                        <h3 className="text-base font-bold text-primary mt-0 mb-1">Read-only if you want it</h3>
                        <p className="text-sm text-secondary leading-relaxed m-0">
                            Add <InlineCode>?readonly=true</InlineCode> to remove every write tool. You can also filter
                            the tool list or pin the agent to one project.
                        </p>
                    </div>
                </div>
                <p className="text-sm text-secondary leading-relaxed mt-4 mb-0">
                    Connecting and calling MCP tools is free. Some tools use LLMs internally and can add PostHog AI
                    spend. These tools require{' '}
                    <Link to="/docs/posthog-ai/allow-access" className="font-semibold underline">
                        AI data processing
                    </Link>{' '}
                    to be enabled. Enterprise plans can control access through their identity provider with{' '}
                    <Link
                        to="/docs/model-context-protocol/enterprise-managed-authorization"
                        className="font-semibold underline"
                    >
                        enterprise-managed authorization
                    </Link>
                    .
                </p>
            </div>
        </section>
    )
}

const resources = [
    {
        title: 'Use cases',
        description: 'Explore 20+ example prompts and multi-step recipes.',
        to: '/docs/model-context-protocol/use-cases',
    },
    {
        title: 'MCP tools reference',
        description: 'See every tool the server exposes, grouped by product area.',
        to: '/docs/model-context-protocol/tools',
    },
    {
        title: 'FAQ and advanced setup',
        description: 'Learn about auth, scoping, filtering, and safety.',
        to: '/docs/model-context-protocol/faq',
    },
]

function MCPResources(): JSX.Element {
    return (
        <section id="resources" className="scroll-mt-20 not-prose">
            <SectionHeading>Go deeper</SectionHeading>
            <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-3 gap-3">
                {resources.map((resource) => (
                    <Link
                        key={resource.title}
                        to={resource.to}
                        className="group block border border-primary rounded p-4 bg-primary !no-underline hover:bg-accent transition-colors"
                    >
                        <span className="flex items-center justify-between gap-3 font-bold text-primary">
                            {resource.title}
                            <IconArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                        <span className="block text-sm text-secondary leading-relaxed mt-2">
                            {resource.description}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    )
}

function MCPCTA(): JSX.Element {
    return (
        <section id="get-started" className="scroll-mt-20 not-prose mb-20">
            <div className="grid grid-cols-1 @3xl/reader-content:grid-cols-[10rem,1fr] gap-5 @3xl/reader-content:gap-6 items-center bg-accent dark:bg-accent-dark border border-primary rounded p-4 @3xl/reader-content:ml-5">
                <div className="relative order-2 @3xl/reader-content:order-1 flex justify-center shrink-0 @3xl/reader-content:self-stretch">
                    <HedgehogBasketballCoach
                        title="PostHog basketball coach hedgehog"
                        className="w-36 h-auto translate-y-2 scale-x-[-1] @3xl/reader-content:absolute @3xl/reader-content:w-52 @3xl/reader-content:-left-10 @3xl/reader-content:-bottom-10"
                    />
                </div>
                <div className="order-1 @3xl/reader-content:order-2">
                    <p className="text-xl @sm:text-2xl font-bold m-0 mb-1">
                        Install the{' '}
                        <span className="bg-blue/10 dark:bg-blue/20 text-blue rounded-md px-1 whitespace-nowrap">
                            MCP
                        </span>
                    </p>
                    <p className="text-secondary m-0 mb-4 text-[13px]">
                        One command. Thirty seconds. Works in Cursor, Claude, Codex, PostHog Desktop, and friends.
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
        </section>
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
                description="The PostHog Model Context Protocol lets your AI agent query data and take action across PostHog from any MCP-compatible client."
                image="/images/og/default.png"
            />
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
                    <MCPHeader />
                    <div className="not-prose flex flex-col divide-y divide-primary [&>*]:py-8 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0">
                        <WhatIsMCP />
                        <MCPUseCases />
                        <WhyMCP />
                        <MCPInstallation />
                        <MCPResources />
                    </div>
                    <MCPCTA />
                </div>
            </ReaderView>
        </>
    )
}
