import React, { useState, useEffect } from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import OSTable from 'components/OSTable'
import { CallToAction } from 'components/CallToAction'
import {
    IconTerminal,
    IconBolt,
    IconNotification,
    IconArrowRight,
    IconChevronRight,
    IconTarget,
    IconGraph,
    IconGear,
    IconSparkles,
    IconCheck,
    IconWarning,
    IconTrends,
    IconRewindPlay,
    IconToggle,
} from '@posthog/icons'
import { useApp } from '../../context/App'

const sidebarNav = [
    { name: 'Overview', id: 'overview', icon: <IconTerminal className="size-4" /> },
    { name: 'Product autonomy', id: 'product-autonomy', icon: <IconSparkles className="size-4" /> },
    { name: 'Signals', id: 'signals', icon: <IconNotification className="size-4" /> },
    { name: 'Agentic environment', id: 'agentic-environment', icon: <IconTerminal className="size-4" /> },
    { name: 'Agent orchestrator', id: 'orchestrator', icon: <IconGear className="size-4" /> },
    { name: 'How it works', id: 'how-it-works', icon: <IconBolt className="size-4" /> },
    { name: 'Get started', id: 'get-started', icon: <IconArrowRight className="size-4" /> },
]

const signalRows = [
    {
        cells: [
            {
                content: (
                    <span className="inline-flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-red" /> Critical
                    </span>
                ),
            },
            { content: 'Checkout conversion dropped 12% since deploy #4891' },
            { content: <span className="opacity-60">Product analytics</span> },
            { content: <span className="opacity-60">2m ago</span> },
        ],
    },
    {
        cells: [
            {
                content: (
                    <span className="inline-flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-yellow" /> High
                    </span>
                ),
            },
            { content: 'Users rage-clicking "Export" button on dashboard page' },
            { content: <span className="opacity-60">Session replay</span> },
            { content: <span className="opacity-60">8m ago</span> },
        ],
    },
    {
        cells: [
            {
                content: (
                    <span className="inline-flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-yellow" /> High
                    </span>
                ),
            },
            { content: 'Error rate spike in /api/billing endpoint (4.2% -> 11.8%)' },
            { content: <span className="opacity-60">Error tracking</span> },
            { content: <span className="opacity-60">14m ago</span> },
        ],
    },
    {
        cells: [
            {
                content: (
                    <span className="inline-flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-blue" /> Medium
                    </span>
                ),
            },
            { content: 'Feature flag "new-onboarding" showing 23% lift in activation' },
            { content: <span className="opacity-60">Experiments</span> },
            { content: <span className="opacity-60">1h ago</span> },
        ],
    },
    {
        cells: [
            {
                content: (
                    <span className="inline-flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-blue" /> Medium
                    </span>
                ),
            },
            { content: 'LLM latency p99 exceeded 4s threshold on summarization endpoint' },
            { content: <span className="opacity-60">LLM analytics</span> },
            { content: <span className="opacity-60">2h ago</span> },
        ],
    },
    {
        cells: [
            {
                content: (
                    <span className="inline-flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-green" /> Low
                    </span>
                ),
            },
            { content: 'Survey "NPS Q1" collected 500+ responses, ready for analysis' },
            { content: <span className="opacity-60">Surveys</span> },
            { content: <span className="opacity-60">3h ago</span> },
        ],
    },
]

const signalColumns = [
    { name: 'Priority', width: '100px' },
    { name: 'Signal' },
    { name: 'Source', width: '140px' },
    { name: 'Time', width: '80px', align: 'right' as const },
]

const Sidebar = ({ activeSection }: { activeSection: string }) => {
    return (
        <nav className="space-y-0.5 p-2">
            <div className="px-2 py-1.5 mb-2">
                <h3 className="text-[13px] font-bold text-primary m-0 flex items-center gap-2">
                    <IconTerminal className="size-4 text-seagreen" />
                    PostHog Code
                </h3>
            </div>
            {sidebarNav.map((item) => (
                <OSButton
                    key={item.id}
                    align="left"
                    width="full"
                    size="md"
                    hover="background"
                    active={activeSection === item.id}
                    icon={item.icon}
                    onClick={() => {
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                >
                    {item.name}
                </OSButton>
            ))}
        </nav>
    )
}

const PillarCard = ({
    icon,
    title,
    description,
    color,
    features,
}: {
    icon: React.ReactNode
    title: string
    description: string
    color: string
    features: string[]
}) => (
    <div className="bg-accent rounded-md border border-primary p-6 @lg:p-8 flex flex-col">
        <span className={`inline-block mb-4 text-${color}`}>{icon}</span>
        <h3 className="text-xl @lg:text-2xl font-bold mb-2 m-0">{title}</h3>
        <p className="text-secondary mb-4">{description}</p>
        <ul className="list-none m-0 p-0 space-y-2 mt-auto">
            {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                    <IconCheck className="size-4 text-seagreen flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
    </div>
)

const FlowStep = ({
    number,
    title,
    description,
    icon,
}: {
    number: string
    title: string
    description: string
    icon: React.ReactNode
}) => (
    <div className="flex gap-4 items-start">
        <div className="flex-shrink-0 size-10 rounded-full bg-accent border border-primary flex items-center justify-center text-sm font-bold text-seagreen">
            {number}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-seagreen">{icon}</span>
                <h4 className="text-base font-bold m-0">{title}</h4>
            </div>
            <p className="text-sm text-secondary m-0">{description}</p>
        </div>
    </div>
)

export default function Code(): JSX.Element {
    const { websiteMode } = useApp()
    const [activeSection, setActiveSection] = useState('overview')

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting)
                if (visible.length > 0) {
                    setActiveSection(visible[0].target.id)
                }
            },
            { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
        )

        sidebarNav.forEach((item) => {
            const el = document.getElementById(item.id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <>
            <SEO
                title="PostHog Code – Product autonomy for engineering teams"
                description="An agentic coding environment, agent orchestrator, and signal-driven inbox that turns product data into prioritized work and deploys agents to ship PRs."
            />
            <Explorer template="generic" slug="code" fullScreen showTitle={false} padding={false}>
                <div
                    className={`@container flex flex-col @3xl:flex-row h-full text-primary ${
                        websiteMode ? 'min-h-[calc(100vh-48px)]' : ''
                    }`}
                >
                    {/* Sidebar */}
                    <aside
                        data-scheme="secondary"
                        className={`hidden @3xl:block w-56 bg-primary border-r border-primary flex-shrink-0 ${
                            websiteMode ? 'h-[calc(100vh-48px)] sticky top-[48px]' : 'h-full'
                        }`}
                    >
                        <ScrollArea className="h-full">
                            <Sidebar activeSection={activeSection} />
                        </ScrollArea>
                    </aside>

                    {/* Main content */}
                    <main data-scheme="primary" className="flex-1 bg-primary min-w-0">
                        <ScrollArea className={websiteMode ? '' : 'h-full'}>
                            <div className="@container">
                                {/* Hero / Overview */}
                                <section id="overview" className="relative overflow-hidden border-b border-primary">
                                    <div className="relative px-6 @lg:px-12 py-12 @lg:py-20">
                                        <div className="max-w-3xl">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-primary text-sm font-medium mb-6">
                                                <IconTerminal className="size-4 text-seagreen" />
                                                <span>PostHog Code</span>
                                            </div>
                                            <h1 className="text-4xl @lg:text-5xl @2xl:text-6xl font-bold m-0 mb-4 text-balance">
                                                Your product builds <em className="text-seagreen not-italic">itself</em>
                                            </h1>
                                            <p className="text-lg @lg:text-xl text-secondary max-w-2xl mb-8">
                                                PostHog Code is an agentic coding environment that turns signals from
                                                your product data into a prioritized inbox of work, then deploys agents
                                                to ship the code. It&apos;s a completely new way to build and grow a
                                                product.
                                            </p>
                                            <div className="flex flex-wrap gap-3">
                                                <CallToAction
                                                    href="https://app.posthog.com/signup"
                                                    type="primary"
                                                    size="lg"
                                                >
                                                    Get early access
                                                </CallToAction>
                                                <CallToAction href="/blog" type="secondary" size="lg">
                                                    Learn more
                                                </CallToAction>
                                            </div>
                                        </div>

                                        {/* Abstract graphic element */}
                                        <div className="hidden @2xl:block absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.08]">
                                            <IconTerminal className="size-[400px]" />
                                        </div>
                                    </div>

                                    {/* Pillar chips */}
                                    <div className="px-6 @lg:px-12 pb-8 flex flex-wrap gap-3">
                                        {[
                                            {
                                                label: 'Agentic coding environment',
                                                icon: <IconTerminal className="size-4" />,
                                            },
                                            { label: 'Agent orchestrator', icon: <IconGear className="size-4" /> },
                                            {
                                                label: 'Signals inbox + task management',
                                                icon: <IconNotification className="size-4" />,
                                            },
                                        ].map((chip) => (
                                            <span
                                                key={chip.label}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-accent border border-primary text-sm font-medium"
                                            >
                                                <span className="text-seagreen">{chip.icon}</span>
                                                {chip.label}
                                            </span>
                                        ))}
                                    </div>
                                </section>

                                {/* Product autonomy */}
                                <section
                                    id="product-autonomy"
                                    className="px-6 @lg:px-12 py-12 @lg:py-16 border-b border-primary"
                                >
                                    <div className="max-w-4xl">
                                        <h2 className="text-3xl @lg:text-4xl font-bold m-0 mb-3">Product autonomy</h2>
                                        <p className="text-lg text-secondary mb-8 max-w-2xl">
                                            A product that improves itself. PostHog already has all of your
                                            data&mdash;analytics, session replays, feature flags, experiments, error
                                            tracking, surveys. Code uses these as <strong>signals</strong> to understand
                                            what your product needs, prioritizes the work, and deploys agents to execute
                                            it.
                                        </p>
                                    </div>

                                    <div className="grid @lg:grid-cols-3 gap-4 @lg:gap-6">
                                        <div className="bg-accent rounded-md border border-primary p-5">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="size-8 rounded bg-seagreen/10 flex items-center justify-center">
                                                    <IconGraph className="size-5 text-seagreen" />
                                                </span>
                                                <h4 className="font-bold m-0">Signals in</h4>
                                            </div>
                                            <p className="text-sm text-secondary m-0">
                                                Product analytics, session replays, error tracking, experiments,
                                                surveys, LLM traces, and external sources feed a continuous signal
                                                stream.
                                            </p>
                                        </div>
                                        <div className="bg-accent rounded-md border border-primary p-5">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="size-8 rounded bg-seagreen/10 flex items-center justify-center">
                                                    <IconTarget className="size-5 text-seagreen" />
                                                </span>
                                                <h4 className="font-bold m-0">Prioritized inbox</h4>
                                            </div>
                                            <p className="text-sm text-secondary m-0">
                                                Signals are ranked by impact and urgency into a task inbox. You see what
                                                matters most, not an overwhelming wall of data.
                                            </p>
                                        </div>
                                        <div className="bg-accent rounded-md border border-primary p-5">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="size-8 rounded bg-seagreen/10 flex items-center justify-center">
                                                    <IconBolt className="size-5 text-seagreen" />
                                                </span>
                                                <h4 className="font-bold m-0">Agents ship PRs</h4>
                                            </div>
                                            <p className="text-sm text-secondary m-0">
                                                Agents take prioritized tasks, generate code changes, and open pull
                                                requests. You review and merge&mdash;or let them run.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* Signals inbox */}
                                <section id="signals" className="border-b border-primary">
                                    <div className="px-6 @lg:px-12 pt-12 @lg:pt-16 pb-4">
                                        <h2 className="text-3xl @lg:text-4xl font-bold m-0 mb-3">Signals inbox</h2>
                                        <p className="text-lg text-secondary mb-2 max-w-2xl">
                                            Every PostHog product becomes a signal source. Conversion drops, rage
                                            clicks, error spikes, experiment wins, survey feedback&mdash;all ranked by
                                            impact and surfaced as actionable tasks.
                                        </p>
                                    </div>

                                    {/* Mock inbox UI */}
                                    <div className="px-4 @lg:px-8 pb-8">
                                        <div
                                            data-scheme="secondary"
                                            className="bg-primary rounded-md border border-primary overflow-hidden"
                                        >
                                            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary bg-accent">
                                                <IconNotification className="size-4 text-seagreen" />
                                                <span className="text-sm font-bold">Signals</span>
                                                <span className="text-xs bg-red text-white rounded-full px-1.5 py-0.5 font-bold ml-1">
                                                    {signalRows.length}
                                                </span>
                                                <div className="ml-auto flex items-center gap-2 text-sm text-muted">
                                                    <span>All sources</span>
                                                    <IconChevronRight className="size-3 rotate-90" />
                                                </div>
                                            </div>
                                            <OSTable columns={signalColumns} rows={signalRows} size="sm" />
                                        </div>
                                    </div>

                                    {/* Signal detail split */}
                                    <div className="px-6 @lg:px-12 pb-12 @lg:pb-16">
                                        <div className="grid @xl:grid-cols-2 gap-6 @lg:gap-8">
                                            <div>
                                                <h3 className="text-xl font-bold m-0 mb-3">
                                                    Not just alerts&mdash;a plan of action
                                                </h3>
                                                <p className="text-secondary mb-4">
                                                    Each signal comes with context: what changed, who is affected, and a
                                                    suggested fix. Accept the task and an agent starts working
                                                    immediately, or add it to your backlog for later.
                                                </p>
                                                <ul className="list-none m-0 p-0 space-y-3">
                                                    {[
                                                        'Aggregates signals from every PostHog product',
                                                        'Ranks by user impact, revenue risk, and urgency',
                                                        'Connects external sources (GitHub, Sentry, PagerDuty)',
                                                        'One-click agent deployment for any task',
                                                    ].map((item) => (
                                                        <li key={item} className="flex items-start gap-2 text-sm">
                                                            <IconCheck className="size-4 text-seagreen flex-shrink-0 mt-0.5" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="bg-accent rounded-md border border-primary p-5">
                                                <div className="text-xs font-bold text-muted uppercase tracking-wider mb-3">
                                                    Signal detail
                                                </div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="size-2 rounded-full bg-red" />
                                                            <span className="font-bold text-sm">Critical</span>
                                                        </div>
                                                        <p className="text-sm font-medium m-0">
                                                            Checkout conversion dropped 12% since deploy #4891
                                                        </p>
                                                    </div>
                                                    <div className="border-t border-primary pt-3">
                                                        <div className="text-xs font-bold text-muted mb-2">Context</div>
                                                        <p className="text-xs text-secondary m-0 mb-2">
                                                            Funnel analysis shows a new JS error in the payment form
                                                            affecting 340 users in the last hour. Error:
                                                            <code className="text-xs ml-1">
                                                                TypeError: Cannot read property &apos;validate&apos; of
                                                                undefined
                                                            </code>
                                                        </p>
                                                    </div>
                                                    <div className="border-t border-primary pt-3">
                                                        <div className="text-xs font-bold text-muted mb-2">
                                                            Suggested action
                                                        </div>
                                                        <p className="text-xs text-secondary m-0 mb-3">
                                                            Fix null check in PaymentForm.tsx:L142 where stripe
                                                            validation was removed in deploy #4891
                                                        </p>
                                                        <CallToAction type="primary" size="xs">
                                                            Deploy agent to fix
                                                        </CallToAction>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Three pillars */}
                                <section
                                    id="agentic-environment"
                                    className="px-6 @lg:px-12 py-12 @lg:py-16 border-b border-primary"
                                >
                                    <div className="mb-8">
                                        <h2 className="text-3xl @lg:text-4xl font-bold m-0 mb-3">
                                            Three pillars, one platform
                                        </h2>
                                        <p className="text-lg text-secondary max-w-2xl">
                                            PostHog Code combines an agentic coding environment, an agent orchestrator,
                                            and a signal-driven inbox into a single integrated platform.
                                        </p>
                                    </div>

                                    <div className="grid @lg:grid-cols-3 gap-4 @lg:gap-6">
                                        <PillarCard
                                            icon={<IconTerminal className="size-8" />}
                                            title="Agentic coding environment"
                                            description="A development environment where agents work alongside you. Write code, review diffs, run tests, and iterate&mdash;with agents handling the tedious parts."
                                            color="seagreen"
                                            features={[
                                                'Full codebase context and understanding',
                                                'Agents write, test, and iterate on code',
                                                'Integrated diff review and merge flow',
                                                'Works with your existing repo and CI/CD',
                                            ]}
                                        />
                                        <PillarCard
                                            icon={<IconGear className="size-8" />}
                                            title="Agent orchestrator"
                                            description="Coordinate multiple agents working in parallel across your codebase. Route tasks, manage dependencies, and keep everything moving."
                                            color="blue"
                                            features={[
                                                'Parallel agent execution across tasks',
                                                'Dependency-aware task routing',
                                                'Automatic conflict resolution',
                                                'Full audit trail of every agent action',
                                            ]}
                                        />
                                        <PillarCard
                                            icon={<IconNotification className="size-8" />}
                                            title="Signals inbox + task management"
                                            description="PostHog data flows into a ranked inbox of prioritized work. Conversion drops, error spikes, and experiment wins become tasks that agents can execute."
                                            color="yellow"
                                            features={[
                                                'Every PostHog product is a signal source',
                                                'Impact-ranked prioritization',
                                                'One-click agent deployment per task',
                                                'Connect external data sources',
                                            ]}
                                        />
                                    </div>
                                </section>

                                {/* Orchestrator detail */}
                                <section
                                    id="orchestrator"
                                    className="px-6 @lg:px-12 py-12 @lg:py-16 border-b border-primary"
                                >
                                    <div className="grid @xl:grid-cols-2 gap-8 @lg:gap-12 items-start">
                                        <div>
                                            <h2 className="text-3xl @lg:text-4xl font-bold m-0 mb-3">
                                                Orchestration that scales
                                            </h2>
                                            <p className="text-lg text-secondary mb-6">
                                                The orchestrator coordinates agents across tasks, manages dependencies,
                                                resolves conflicts, and maintains a complete audit trail. Think of it as
                                                a project manager that never sleeps.
                                            </p>
                                            <div className="grid @sm:grid-cols-2 gap-4">
                                                {[
                                                    {
                                                        icon: <IconRewindPlay className="size-5" />,
                                                        title: 'Session replay integration',
                                                        description:
                                                            'Agents watch user sessions to understand bugs in context',
                                                    },
                                                    {
                                                        icon: <IconTrends className="size-5" />,
                                                        title: 'Analytics-informed',
                                                        description:
                                                            'Prioritize work based on real product usage patterns',
                                                    },
                                                    {
                                                        icon: <IconToggle className="size-5" />,
                                                        title: 'Feature flag aware',
                                                        description:
                                                            'Agents deploy behind flags and roll out incrementally',
                                                    },
                                                    {
                                                        icon: <IconWarning className="size-5" />,
                                                        title: 'Error tracking loop',
                                                        description:
                                                            'Errors become tasks, fixes become PRs, automatically',
                                                    },
                                                ].map((item) => (
                                                    <div
                                                        key={item.title}
                                                        className="bg-accent rounded border border-primary p-4"
                                                    >
                                                        <span className="text-seagreen mb-2 block">{item.icon}</span>
                                                        <h4 className="text-sm font-bold m-0 mb-1">{item.title}</h4>
                                                        <p className="text-xs text-secondary m-0">{item.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Mock orchestrator view */}
                                        <div
                                            data-scheme="secondary"
                                            className="bg-primary rounded-md border border-primary overflow-hidden"
                                        >
                                            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary bg-accent">
                                                <IconGear className="size-4 text-blue" />
                                                <span className="text-sm font-bold">Agent orchestrator</span>
                                                <span className="ml-auto text-xs text-muted">3 agents active</span>
                                            </div>
                                            <div className="divide-y divide-primary">
                                                {[
                                                    {
                                                        agent: 'Agent #1',
                                                        task: 'Fix checkout validation',
                                                        status: 'Writing tests',
                                                        statusColor: 'text-seagreen',
                                                    },
                                                    {
                                                        agent: 'Agent #2',
                                                        task: 'Optimize dashboard queries',
                                                        status: 'PR ready for review',
                                                        statusColor: 'text-blue',
                                                    },
                                                    {
                                                        agent: 'Agent #3',
                                                        task: 'Add export retry logic',
                                                        status: 'Running CI',
                                                        statusColor: 'text-yellow',
                                                    },
                                                ].map((row) => (
                                                    <div
                                                        key={row.agent}
                                                        className="px-4 py-3 flex items-center gap-3 text-sm"
                                                    >
                                                        <span className="font-mono text-xs text-muted w-16 flex-shrink-0">
                                                            {row.agent}
                                                        </span>
                                                        <span className="flex-1 truncate font-medium">{row.task}</span>
                                                        <span
                                                            className={`text-xs font-medium ${row.statusColor} flex-shrink-0`}
                                                        >
                                                            {row.status}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* How it works */}
                                <section
                                    id="how-it-works"
                                    className="px-6 @lg:px-12 py-12 @lg:py-16 border-b border-primary"
                                >
                                    <h2 className="text-3xl @lg:text-4xl font-bold m-0 mb-3">How it works</h2>
                                    <p className="text-lg text-secondary mb-10 max-w-2xl">
                                        PostHog Code connects to your existing PostHog instance and your codebase. The
                                        loop is simple: data becomes signals, signals become tasks, tasks become PRs.
                                    </p>

                                    <div className="max-w-2xl space-y-8">
                                        <FlowStep
                                            number="1"
                                            title="Connect your codebase"
                                            description="Point PostHog Code at your repository. It maps your codebase, understands your architecture, and indexes the context agents need to write good code."
                                            icon={<IconTerminal className="size-5" />}
                                        />
                                        <FlowStep
                                            number="2"
                                            title="Signals flow in"
                                            description="PostHog products generate signals automatically: funnel drops, error spikes, experiment results, survey responses, session replay insights. External sources plug in too."
                                            icon={<IconGraph className="size-5" />}
                                        />
                                        <FlowStep
                                            number="3"
                                            title="Inbox prioritizes work"
                                            description="Signals are ranked by user impact, revenue risk, and urgency. Your inbox shows what matters most, with full context and a suggested action for each item."
                                            icon={<IconNotification className="size-5" />}
                                        />
                                        <FlowStep
                                            number="4"
                                            title="Agents write the code"
                                            description="Accept a task and an agent starts working: writing code, adding tests, running CI. Multiple agents work in parallel across different tasks."
                                            icon={<IconGear className="size-5" />}
                                        />
                                        <FlowStep
                                            number="5"
                                            title="You review and ship"
                                            description="Agents open PRs with full context: what signal triggered the change, what was changed, and why. You review, merge, and the loop continues."
                                            icon={<IconBolt className="size-5" />}
                                        />
                                    </div>
                                </section>

                                {/* CTA */}
                                <section id="get-started" className="px-6 @lg:px-12 py-16 @lg:py-24">
                                    <div className="max-w-2xl mx-auto text-center">
                                        <h2 className="text-3xl @lg:text-4xl font-bold m-0 mb-4">
                                            Build products that build themselves
                                        </h2>
                                        <p className="text-lg text-secondary mb-8">
                                            PostHog Code is the missing link between your product data and your
                                            codebase. Stop context-switching between dashboards and your
                                            editor&mdash;let the data drive the work.
                                        </p>
                                        <div className="flex flex-wrap justify-center gap-3">
                                            <CallToAction
                                                href="https://app.posthog.com/signup"
                                                type="primary"
                                                size="lg"
                                            >
                                                Get early access
                                            </CallToAction>
                                            <CallToAction href="/talk-to-a-human" type="secondary" size="lg">
                                                Talk to a human
                                            </CallToAction>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </ScrollArea>
                    </main>
                </div>
            </Explorer>
        </>
    )
}
