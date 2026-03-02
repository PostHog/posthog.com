import React, { useState, useEffect } from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import { CallToAction } from 'components/CallToAction'
import { ToggleGroup, type ToggleOption } from 'components/RadixUI/ToggleGroup'
import CloudinaryImage from 'components/CloudinaryImage'
import useProduct from 'hooks/useProduct'
import ClaudeLogo from '../../../contents/images/docs/llms/claude-logo.svg'
import OpenAILogo from '../../../contents/images/docs/llms/openai.svg'
import GeminiLogo from '../../../contents/images/docs/llms/gemini-logo.svg'
import GranolaIcon from '../../../contents/images/docs/signals/granola-icon.svg'
import SlackIcon from '../../../contents/images/docs/signals/Slack_icon_2019.svg'
import LinearIcon from '../../../contents/images/docs/signals/linear-icon-logo.svg'
import GitHubIcon from '../../../contents/images/docs/signals/GitHub_icon logo.svg'
import ZendeskIcon from '../../../contents/cdp/thumbnails/zendesk.svg'
import {
    IconTerminal,
    IconBolt,
    IconCode,
    IconNotification,
    IconArrowRight,
    IconTarget,
    IconGraph,
    IconGear,
    IconSparkles,
    IconCheck,
    IconWarning,
    IconRewindPlay,
    IconToggle,
    IconCreditCard,
    IconSearch,
    IconFilter,
    IconPlus,
    IconX,
    IconGithub,
    IconExternal,
    IconSort,
} from '@posthog/icons'
import { useApp } from '../../context/App'
import PostHogCode from 'components/PostHogCode'

const sidebarNav = [
    { name: 'Overview', id: 'overview', icon: <IconTerminal className="size-4" /> },
    { name: 'Product autonomy', id: 'product-autonomy', icon: <IconSparkles className="size-4" /> },
    { name: 'Signals', id: 'signals', icon: <IconNotification className="size-4" /> },
    { name: 'Agentic environment', id: 'agentic-environment', icon: <IconTerminal className="size-4" /> },
    { name: 'Code interface', id: 'code-interface', icon: <IconCode className="size-4" /> },
    { name: 'Pricing & usage', id: 'pricing', icon: <IconCreditCard className="size-4" /> },
    { name: 'How it works', id: 'how-it-works', icon: <IconBolt className="size-4" /> },
    { name: 'FAQ', id: 'faq', icon: <IconNotification className="size-4" /> },
    { name: 'Get started', id: 'get-started', icon: <IconArrowRight className="size-4" /> },
]

type SignalSourceGroupKey = 'native' | 'first-party' | 'mcp'

interface SignalSource {
    id: string
    name: string
    description: string
    href?: string
    label?: string
}

const signalSourceGroups: Record<
    SignalSourceGroupKey,
    {
        title: string
        description: string
        sources: SignalSource[]
    }
> = {
    native: {
        title: 'Native PostHog products',
        description:
            'PostHog products are a first class data source for Code: analytics, replays, experiments, feature flags, error tracking, and more.',
        sources: [
            {
                id: 'product-analytics',
                name: 'Product analytics',
                description:
                    'Funnel drops, activation issues, and usage regressions across your core product surfaces.',
                href: '/product-analytics',
            },
            {
                id: 'session-replay',
                name: 'Session replay',
                description: 'Rage clicks, confusing flows, and broken experiences spotted directly from replays.',
                href: '/session-replay',
            },
            {
                id: 'feature-flags',
                name: 'Feature flags',
                description: 'Rollouts that are under‑performing, stuck at low exposure, or causing regressions.',
                href: '/feature-flags',
            },
            {
                id: 'experiments',
                name: 'Experiments',
                description: 'Winning and losing variants, plus experiments that are under‑powered or stalled.',
                href: '/experiments',
            },
            {
                id: 'error-tracking',
                name: 'Error tracking',
                description: 'New errors, noisy endpoints, and regressions tied back to specific deployments.',
                href: '/error-tracking',
            },
            {
                id: 'surveys',
                name: 'Surveys',
                description: 'Qualitative feedback from NPS and on‑page surveys, converted into actionable work.',
                href: '/surveys',
            },
            {
                id: 'llm-analytics',
                name: 'LLM analytics',
                description: 'LLM latency, quality, and failure patterns surfaced as work for agents to tackle.',
                href: '/llm-analytics',
            },
        ],
    },
    'first-party': {
        title: 'First‑party integrations',
        description:
            'Signals also come from tools your team already lives in: planning, code, communication, and incidents.',
        sources: [
            {
                id: 'linear',
                name: 'Linear',
                description: 'Backlog, bugs, and roadmap items that should be driven by real product behaviour.',
            },
            {
                id: 'slack',
                name: 'Slack',
                description:
                    'Customer reports, internal triage, and incident channels that should become structured work.',
            },
            {
                id: 'github',
                name: 'GitHub',
                description: 'Open PRs, failing checks, and issues that connect directly to product impact.',
            },
            {
                id: 'granola',
                name: 'Granola',
                description: 'First‑party ingest and transformation pipelines feeding rich context into signals.',
            },
            {
                id: 'zendesk',
                name: 'Zendesk',
                description: 'Support tickets, agent workload, and SLA metrics that tie back to product usage.',
            },
            {
                id: 'request',
                name: 'Request a source',
                description:
                    "Don't see your tool? Tell us what you need and we'll consider building it. Or better yet, contribute to our open source repo.",
            },
        ],
    },
    mcp: {
        title: 'MCP tools',
        description:
            'For everything else, MCP tools let you define new signal sources without waiting on a native integration.',
        sources: [
            {
                id: 'observability',
                name: 'Observability & alerting',
                description: 'Pipe in alerts from services like Datadog or PagerDuty and let Code turn them into work.',
            },
            {
                id: 'support',
                name: 'Support platforms',
                description:
                    'Connect helpdesk or CRM tools so that high‑impact customer conversations generate follow‑up tasks.',
            },
            {
                id: 'internal-tools',
                name: 'Internal tools',
                description:
                    'Wire up bespoke internal dashboards or scripts as MCP tools so they can feed into the signal graph.',
            },
        ],
    },
}

const signalSourceIcons: Record<string, JSX.Element> = {
    'product-analytics': <IconGraph className="size-4 text-blue" />,
    'session-replay': <IconRewindPlay className="size-4 text-yellow" />,
    'feature-flags': <IconToggle className="size-4 text-seagreen" />,
    experiments: <IconBolt className="size-4 text-purple" />,
    'error-tracking': <IconWarning className="size-4 text-red" />,
    surveys: <IconNotification className="size-4 text-salmon" />,
    'llm-analytics': <IconSparkles className="size-4 text-orange" />,
    linear: <img src={LinearIcon} alt="Linear" className="h-4 w-auto" />,
    slack: <img src={SlackIcon} alt="Slack" className="h-4 w-auto" />,
    github: <img src={GitHubIcon} alt="GitHub" className="h-4 w-auto" />,
    granola: <img src={GranolaIcon} alt="Granola" className="h-4 w-auto" />,
    zendesk: <img src={ZendeskIcon} alt="Zendesk" className="h-4 w-auto" />,
    observability: <IconWarning className="size-4 text-yellow" />,
    support: <IconNotification className="size-4 text-salmon" />,
    'internal-tools': <IconGear className="size-4 text-blue" />,
    request: <IconPlus className="size-4 text-seagreen" />,
}

const signalSourceCardImages: Record<string, string> = {
    linear: 'https://res.cloudinary.com/dmukukwp6/image/upload/product_linear_4304fbe957.png',
    slack: 'https://res.cloudinary.com/dmukukwp6/image/upload/product_slack_650b0242cd.png',
    github: 'https://res.cloudinary.com/dmukukwp6/image/upload/product_github_537607dd5c.png',
    granola: 'https://res.cloudinary.com/dmukukwp6/image/upload/product_granola_c4875fc74e.png',
}

const signalSourceCardLogos: Record<string, JSX.Element> = {
    linear: <img src={LinearIcon} alt="Linear" className="h-8 w-auto" />,
    slack: <img src={SlackIcon} alt="Slack" className="h-8 w-auto" />,
    github: <img src={GitHubIcon} alt="GitHub" className="h-8 w-auto" />,
    granola: <img src={GranolaIcon} alt="Granola" className="h-8 w-auto" />,
    zendesk: <img src={ZendeskIcon} alt="Zendesk" className="h-8 w-auto" />,
    observability: <IconWarning className="size-8 text-yellow" />,
    support: <IconNotification className="size-8 text-salmon" />,
    'internal-tools': <IconGear className="size-8 text-blue" />,
    request: <IconPlus className="size-8 text-seagreen" />,
}

const SignalSources = () => {
    const allProducts = useProduct()
    const { siteSettings } = useApp()
    const isDark = siteSettings.theme === 'dark'

    const [activeGroup, setActiveGroup] = useState<SignalSourceGroupKey>('native')
    const [activeSourceId, setActiveSourceId] = useState<string | null>(
        signalSourceGroups.native.sources[0]?.id || null
    )

    const options: ToggleOption[] = [
        { label: 'Native integrations', value: 'native' },
        { label: 'First‑party', value: 'first-party' },
        { label: 'MCP', value: 'mcp' },
    ]

    const group = signalSourceGroups[activeGroup]
    const sources = group.sources
    const activeSource =
        sources.find((source) => source.id === activeSourceId) || (sources.length > 0 ? sources[0] : null)

    const activeProductHandle = activeGroup === 'native' && activeSource ? activeSource.id.replace(/-/g, '_') : null
    const activeProduct = activeProductHandle
        ? ((Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === activeProductHandle) : null) as any)
        : null

    return (
        <div className="space-y-3">
            <ToggleGroup
                hideTitle
                title="Signal source type"
                options={options}
                value={activeGroup}
                onValueChange={(value) => {
                    if (!value) return
                    setActiveGroup(value as SignalSourceGroupKey)
                    const first = signalSourceGroups[value as SignalSourceGroupKey].sources[0]
                    setActiveSourceId(first?.id || null)
                }}
            />

            <p className="text-sm text-secondary m-0">{group.description}</p>

            <div className="grid gap-6 @lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)] items-start">
                <div className="space-y-1.5">
                    {sources.map((source) => (
                        <OSButton
                            key={source.id}
                            align="left"
                            width="full"
                            size="md"
                            hover="background"
                            active={activeSource?.id === source.id}
                            onClick={() => setActiveSourceId(source.id)}
                        >
                            <span className="flex items-center gap-2">
                                <span className="inline-flex items-center justify-center">
                                    {signalSourceIcons[source.id] || (
                                        <span className="size-1.5 rounded-full bg-seagreen" />
                                    )}
                                </span>
                                <span className="text-sm font-medium">{source.name}</span>
                            </span>
                        </OSButton>
                    ))}
                </div>

                {activeSource && activeSource.id === 'request' ? (
                    <div
                        data-scheme="secondary"
                        className="@container flex flex-col bg-accent/50 border border-primary rounded-md overflow-hidden"
                    >
                        <div className="flex flex-col items-center justify-center text-center p-8 @xl:p-12 gap-4">
                            <span className="inline-flex items-center justify-center size-12 rounded-full bg-seagreen/20 text-seagreen">
                                <IconPlus className="size-6" />
                            </span>
                            <h3 className="text-xl font-bold tracking-tight m-0">Request a source</h3>
                            <p className="text-secondary max-w-md m-0">
                                Don&apos;t see your tool? Tell us what you need and we&apos;ll consider building it.
                            </p>
                            <OSButton asLink to="https://posthog.com/questions" external variant="secondary" size="md">
                                <span className="flex items-center gap-2">
                                    Request integration
                                    <IconExternal className="size-4" />
                                </span>
                            </OSButton>
                        </div>
                    </div>
                ) : activeSource ? (
                    activeGroup === 'native' && activeProduct ? (
                        <div
                            className={`@container flex flex-col bg-${activeProduct.color} dark:bg-accent border border-transparent dark:border-primary rounded-md overflow-hidden`}
                        >
                            <div className="flex flex-col gap-2 @sm:flex-row items-start justify-between p-4 @xl:p-6">
                                <div className="flex-1 flex gap-3">
                                    {activeProduct.Icon && (
                                        <activeProduct.Icon
                                            className={`size-8 ${activeProduct.overview?.textColor} dark:text-${activeProduct.color}`}
                                        />
                                    )}
                                    <div className={`${activeProduct.overview?.textColor} dark:text-white`}>
                                        <h3 className="text-xl font-bold tracking-tight m-0">{activeProduct.name}</h3>
                                        {activeProduct.overview?.title && (
                                            <p className="m-0 leading-tight">{activeProduct.overview.title}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-shrink-0 mt-2 @sm:mt-0 ml-10 @sm:ml-0">
                                    <OSButton
                                        asLink
                                        to={`/${activeProduct.slug}`}
                                        state={{ newWindow: true }}
                                        variant="secondary"
                                        size="md"
                                    >
                                        Explore
                                    </OSButton>
                                </div>
                            </div>
                            {activeProduct.screenshots?.home && (
                                <div
                                    className={`flex-1 flex ${
                                        activeProduct.screenshots.home.classes ||
                                        'justify-center items-end px-2 pb-2 @lg:px-4 @lg:pb-4'
                                    }`}
                                >
                                    <CloudinaryImage
                                        src={
                                            isDark && activeProduct.screenshots.home.srcDark
                                                ? activeProduct.screenshots.home.srcDark
                                                : activeProduct.screenshots.home.src
                                        }
                                        alt={activeProduct.screenshots.home.alt}
                                        width={activeProduct.screenshots.home.width}
                                        imgClassName={
                                            activeProduct.screenshots.home.imgClasses || 'rounded-md shadow-2xl'
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div
                            data-scheme="secondary"
                            className="@container flex flex-col bg-accent/50 border border-primary rounded-md overflow-hidden"
                        >
                            <div className="flex items-start gap-3 p-4 @xl:p-6">
                                {signalSourceCardLogos[activeSource.id] && (
                                    <span className="flex-shrink-0">{signalSourceCardLogos[activeSource.id]}</span>
                                )}
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight m-0">{activeSource.name}</h3>
                                    <p className="m-0 mt-1 text-sm text-secondary leading-snug">
                                        {activeSource.description}
                                    </p>
                                </div>
                            </div>
                            {signalSourceCardImages[activeSource.id] ? (
                                <div className="flex-1 flex justify-center items-end px-2 pb-2 @lg:px-4 @lg:pb-4">
                                    <CloudinaryImage
                                        src={
                                            signalSourceCardImages[
                                                activeSource.id
                                            ] as `https://res.cloudinary.com/${string}`
                                        }
                                        alt={`${activeSource.name} integration`}
                                        width={560}
                                        imgClassName="rounded-md"
                                    />
                                </div>
                            ) : (
                                <div className="flex-1 flex justify-center items-end px-2 pb-2 @lg:px-4 @lg:pb-4">
                                    <div
                                        className="max-w-xl w-full aspect-[4/3] rounded-md border border-primary bg-accent/30"
                                        aria-hidden
                                    />
                                </div>
                            )}
                        </div>
                    )
                ) : null}
            </div>
        </div>
    )
}

interface Signal {
    id: number
    title: string
    description: string
    date: string
    weight: number
    occurrences: number
    affectedUsers: number
    relatedIssues: { id: string; title: string; tag: string }[]
    issueContent?: { heading: string; subheading: string; body: string }
}

const signalData: Signal[] = [
    {
        id: 1,
        title: 'Dashboard refresh interrupted by filter changes, leaving insights empty',
        description:
            'Users experience data loss when modifying dashboard filters during an active refresh cycle. The refresh process terminates prematurely when new filter parameters are applied before the current query completes.',
        date: 'Mar 2',
        weight: 135.02,
        occurrences: 234,
        affectedUsers: 45,
        relatedIssues: [{ id: '#51023', title: 'Dashboard filters cause data loss during active refresh', tag: 'bug' }],
        issueContent: {
            heading: 'Bug report',
            subheading: 'Describe the bug',
            body: 'When changing filters while a dashboard is still loading, all insight tiles go blank and show "No data" instead of the previous results.',
        },
    },
    {
        id: 2,
        title: 'Product Tours: Add cooldown period between consecutive tour displays',
        description:
            'Users are experiencing tour fatigue when multiple product tours are eligible simultaneously, causing them to display back-to-back without any delay. This creates a poor user experience and may reduce tour effectiveness. The request is to implement a configurable cooldown period (similar to the existing survey functionality) that prevents showing any tour to users who have seen one within the past X days.',
        date: 'Mar 1',
        weight: 65.0,
        occurrences: 67,
        affectedUsers: 0,
        relatedIssues: [
            {
                id: '#48269',
                title: 'Product Tours \u2013 "do not show if a user has seen a tour in X days"',
                tag: 'enhancement',
            },
        ],
        issueContent: {
            heading: 'Feature request',
            subheading: 'Is your feature request related to a problem?',
            body: "If multiple tours are eligible right now, they'll show back to back with no delay.",
        },
    },
    {
        id: 3,
        title: 'Funnel breakdowns fail with Extended Person Properties from warehouse',
        description:
            'Funnel insights are failing to execute when users attempt to breakdown by Extended Person Properties (Data Warehouse fields joined to persons). This blocks advanced segmentation workflows.',
        date: 'Mar 1',
        weight: 61.0,
        occurrences: 89,
        affectedUsers: 12,
        relatedIssues: [
            { id: '#50891', title: 'Funnel breakdown errors on warehouse-joined person props', tag: 'bug' },
        ],
    },
    {
        id: 4,
        title: 'Sessions-on-Events Query Performance: Implement Hybrid Storage Architecture',
        description:
            'A prototype design exists to improve sessions property query performance by creating a hybrid storage model. The approach uses session materialized columns for hot queries.',
        date: 'Mar 1',
        weight: 57.09,
        occurrences: 156,
        affectedUsers: 31,
        relatedIssues: [
            { id: '#49742', title: 'Session property queries timing out on large datasets', tag: 'performance' },
        ],
    },
    {
        id: 5,
        title: "Survey Slack notification: Top 'Create & enable' button non-functional",
        description:
            "Users cannot create Slack notifications for surveys using the 'Create & enable' button in the upper-right corner of the page\u2014only the bottom button works.",
        date: 'Mar 2',
        weight: 49.55,
        occurrences: 43,
        affectedUsers: 8,
        relatedIssues: [{ id: '#50102', title: "Survey Slack 'Create & enable' button broken", tag: 'bug' }],
    },
    {
        id: 6,
        title: 'Feature Request: Dynamic Presentation Builder for Narrative Analytics',
        description:
            "Users are requesting a slide-based presentation builder that transforms PostHog's static dashboards into dynamic, personalized narrative analytics presentations.",
        date: 'Mar 2',
        weight: 44.0,
        occurrences: 28,
        affectedUsers: 0,
        relatedIssues: [{ id: '#49903', title: 'Add presentation mode for dashboards', tag: 'enhancement' }],
    },
    {
        id: 7,
        title: 'Email Verification Links Not Delivered During Sign-Up Flow',
        description:
            'A user is unable to complete account registration due to missing email verification links. This represents a critical authentication flow break.',
        date: 'Mar 2',
        weight: 26.0,
        occurrences: 15,
        affectedUsers: 15,
        relatedIssues: [{ id: '#51102', title: 'Email verification not sent for new signups', tag: 'bug' }],
    },
    {
        id: 8,
        title: 'Cohort filter not applied when viewing session recordings',
        description:
            "The navigation from Cohorts to Session Replay is broken: clicking 'View Session Recordings' from either the cohort list or detail page does not apply the cohort filter.",
        date: 'Feb 28',
        weight: 22.45,
        occurrences: 34,
        affectedUsers: 7,
        relatedIssues: [
            { id: '#50445', title: 'Cohort filter lost when navigating to session recordings', tag: 'bug' },
        ],
    },
    {
        id: 9,
        title: 'Amplitude batch migration fails to map session_id to PostHog',
        description:
            "The Amplitude to PostHog batch migration process is experiencing a critical failure when attempting to map Amplitude's native session identifiers.",
        date: 'Feb 28',
        weight: 20.5,
        occurrences: 12,
        affectedUsers: 3,
        relatedIssues: [{ id: '#50221', title: 'Amplitude migration: session_id mapping fails silently', tag: 'bug' }],
    },
    {
        id: 10,
        title: 'PostHog CLI and React Native SDK modification request',
        description:
            'A GitHub issue has been raised requesting modifications to the PostHog CLI tooling and the posthog-react-native SDK.',
        date: 'Feb 27',
        weight: 19.3,
        occurrences: 8,
        affectedUsers: 0,
        relatedIssues: [{ id: '#49801', title: 'CLI and React Native SDK improvements', tag: 'enhancement' }],
    },
]

const SignalsInbox = () => {
    const [selectedId, setSelectedId] = useState<number | null>(2)
    const [inboxTab, setInboxTab] = useState('signals')
    const selected = signalData.find((s) => s.id === selectedId) || null

    return (
        <div data-scheme="secondary" className="bg-primary rounded-md border border-primary overflow-hidden">
            <div className="flex h-[520px]">
                {/* Sidebar */}
                <div className="hidden @2xl:flex w-40 border-r border-primary flex-shrink-0 flex-col bg-primary">
                    <div className="p-2">
                        <button className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-secondary hover:text-primary hover:bg-accent rounded transition-colors cursor-pointer">
                            <IconPlus className="size-3.5" />
                            New task
                        </button>
                    </div>
                    <div className="px-1 space-y-0.5">
                        <button className="w-full flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-accent rounded text-primary cursor-default">
                            <IconNotification className="size-3.5" />
                            Inbox
                            <span className="ml-auto text-[10px] bg-red text-white rounded-full px-1.5 py-px font-bold">
                                99+
                            </span>
                        </button>
                    </div>
                    <div className="mt-4 px-3">
                        <div className="flex items-center justify-between text-[11px] font-bold text-muted uppercase tracking-wider">
                            <span>Tasks</span>
                            <IconFilter className="size-3 opacity-50" />
                        </div>
                    </div>
                </div>

                {/* Signal list */}
                <div className={`flex-1 flex flex-col min-w-0 ${selected ? 'hidden @xl:flex' : 'flex'}`}>
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary bg-accent">
                        <IconNotification className="size-4" />
                        <span className="text-sm font-bold">Inbox</span>
                        <div className="ml-auto">
                            <ToggleGroup
                                title="Inbox view"
                                hideTitle
                                options={[
                                    { label: 'Signals', value: 'signals' },
                                    { label: 'Setup', value: 'setup' },
                                ]}
                                value={inboxTab}
                                onValueChange={(v: string) => v && setInboxTab(v)}
                                className="!p-0.5"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-4 py-2 border-b border-primary text-sm">
                        <span className="font-medium text-secondary">Signals (190)</span>
                        <IconSort className="size-3.5 text-muted" />
                    </div>

                    <div className="px-4 py-2 border-b border-primary">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-accent rounded border border-primary text-sm text-muted">
                            <IconSearch className="size-3.5 flex-shrink-0" />
                            <span>Search signals...</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {signalData.map((signal) => (
                            <button
                                key={signal.id}
                                onClick={() => setSelectedId(selectedId === signal.id ? null : signal.id)}
                                className={`w-full text-left px-4 py-3 border-b border-primary hover:bg-accent transition-colors cursor-pointer ${
                                    selectedId === signal.id ? 'bg-accent' : ''
                                }`}
                            >
                                <div className="flex items-start gap-2">
                                    <span className="size-2 rounded-full bg-seagreen flex-shrink-0 mt-2" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="text-sm font-bold leading-snug line-clamp-2">
                                                {signal.title}
                                            </span>
                                            <span className="text-xs text-muted flex-shrink-0 text-right whitespace-nowrap">
                                                <span className="block">{signal.date}</span>
                                                <span className="block opacity-60">w:{signal.weight.toFixed(2)}</span>
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted mt-0.5 line-clamp-1 m-0">
                                            {signal.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Detail panel */}
                {selected && (
                    <div className="w-full @xl:w-80 @xl:max-w-80 border-l border-primary flex-shrink-0 flex flex-col overflow-y-auto">
                        <div className="p-4 space-y-4">
                            <div className="flex items-start gap-2">
                                <h4 className="text-sm font-bold m-0 flex-1 leading-snug">{selected.title}</h4>
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="flex-shrink-0 p-0.5 hover:bg-accent rounded transition-colors cursor-pointer"
                                >
                                    <IconX className="size-4 text-muted" />
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <CallToAction type="outline" size="xs">
                                    Create task
                                </CallToAction>
                                <CallToAction type="primary" size="xs">
                                    Run cloud
                                </CallToAction>
                            </div>

                            <p className="text-sm text-secondary m-0 leading-relaxed">{selected.description}</p>

                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1 text-xs font-medium bg-accent border border-primary rounded px-2 py-1">
                                    {selected.occurrences} occurrences
                                </span>
                                <span className="inline-flex items-center gap-1 text-xs font-medium bg-accent border border-primary rounded px-2 py-1">
                                    {selected.affectedUsers} affected users
                                </span>
                            </div>

                            <div>
                                <h5 className="text-xs font-bold text-muted m-0 mb-2">
                                    Signals ({selected.occurrences})
                                </h5>
                                <div className="space-y-2">
                                    {selected.relatedIssues.map((issue) => (
                                        <div
                                            key={issue.id}
                                            className="flex items-start gap-2 p-2 bg-accent rounded border border-primary"
                                        >
                                            <IconGithub className="size-3.5 flex-shrink-0 mt-0.5 text-muted" />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <span className="text-xs font-medium leading-snug">
                                                        {issue.id} {issue.title}
                                                    </span>
                                                    <IconExternal className="size-3 flex-shrink-0 text-muted mt-0.5" />
                                                </div>
                                                <span className="inline-block mt-1 text-[10px] font-medium bg-primary border border-primary rounded px-1.5 py-0.5 text-muted">
                                                    {issue.tag}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {selected.issueContent && (
                                <div className="border-t border-primary pt-3 space-y-2">
                                    <p className="text-xs font-bold text-muted m-0">
                                        ### {selected.issueContent.heading}
                                    </p>
                                    <p className="text-xs font-medium text-muted m-0">
                                        ## {selected.issueContent.subheading}
                                    </p>
                                    <p className="text-xs text-secondary m-0">{selected.issueContent.body}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

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
                                                <CallToAction href="#pricing" type="secondary" size="lg">
                                                    View pricing
                                                </CallToAction>
                                            </div>
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
                                            Imagine a product that improves itself. PostHog already has all of your data
                                            – analytics, session replays, feature flags, experiments, error tracking,
                                            surveys. PostHog Code uses these as <strong>signals</strong> to understand
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
                                        <div className="max-w-4xl mb-6">
                                            <h3 className="text-2xl @lg:text-3xl font-bold m-0 mb-3">Signal sources</h3>
                                            <p className="text-lg text-secondary max-w-2xl m-0">
                                                Signals pull from everywhere your product and team already live: PostHog
                                                products, first‑party integrations, and custom MCP tools. Switch between
                                                sources to see how they feed the inbox.
                                            </p>
                                        </div>
                                        <SignalSources />
                                    </div>

                                    <div className="px-6 @lg:px-12 pb-4">
                                        <h2 className="text-3xl @lg:text-4xl font-bold m-0 mb-3">Signals inbox</h2>
                                        <p className="text-lg text-secondary mb-2 max-w-2xl">
                                            Every datapoint becomes a signal source. Conversion drops, rage clicks,
                                            error spikes, experiment wins, survey feedback – all ranked by impact and
                                            surfaced as actionable tasks.
                                        </p>
                                    </div>

                                    {/* Interactive inbox */}
                                    <div className="px-4 @lg:px-8 pb-6">
                                        <SignalsInbox />
                                    </div>

                                    <div className="px-6 @lg:px-12 pb-12 @lg:pb-16">
                                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-secondary">
                                            {[
                                                'like a spam filter for product data',
                                                'impact-ranked prioritization',
                                                'keep, kill, or iterate code changes',
                                            ].map((item) => (
                                                <span key={item} className="flex items-center gap-1.5">
                                                    <IconCheck className="size-3 text-seagreen" />
                                                    {item}
                                                </span>
                                            ))}
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

                                {/* Code interface */}
                                <section
                                    id="code-interface"
                                    className="px-6 @lg:px-12 py-12 @lg:py-16 border-b border-primary"
                                >
                                    <div className="max-w-4xl mb-6">
                                        <h2 className="text-3xl @lg:text-4xl font-bold m-0 mb-3">The Code interface</h2>
                                        <p className="text-lg text-secondary max-w-2xl m-0">
                                            Explore the agentic coding environment: switch topics in the sidebar, read
                                            through example conversations, and try typing a message to see how PostHog
                                            Code responds.
                                        </p>
                                    </div>
                                    <div className="h-[500px] @lg:h-[600px] min-h-0">
                                        <PostHogCode />
                                    </div>
                                </section>

                                {/* Pricing & usage */}
                                <section
                                    id="pricing"
                                    className="px-6 @lg:px-12 py-12 @lg:py-16 border-b border-primary"
                                >
                                    <div className="max-w-4xl mb-8">
                                        <h2 className="text-3xl @lg:text-4xl font-bold m-0 mb-3">
                                            Simple beta pricing
                                        </h2>
                                        <p className="text-lg text-secondary max-w-2xl m-0">
                                            While PostHog Code is in beta, pricing is intentionally simple: a single
                                            seat-based subscription tier, expected to land between $100 and $200 per
                                            seat per month.
                                        </p>
                                    </div>

                                    <div className="grid @lg:grid-cols-2 gap-4 @lg:gap-6">
                                        <div className="bg-accent rounded-md border border-primary p-5 space-y-2">
                                            <h3 className="text-base font-bold m-0">Signals</h3>
                                            <p className="text-sm text-secondary m-0">
                                                Signals are built from what PostHog already knows about your product:
                                                funnel drops, error spikes, experiment wins, survey responses, LLM
                                                traces, and more.
                                            </p>
                                            <p className="text-sm font-medium m-0">
                                                While PostHog Code is in beta, <strong>signals are free</strong>. You
                                                can create, triage, and manage as many signals as you like without
                                                incremental cost.
                                            </p>
                                        </div>
                                        <div className="bg-accent rounded-md border border-primary p-5 space-y-2">
                                            <h3 className="text-base font-bold m-0">PostHog data</h3>
                                            <p className="text-sm text-secondary m-0">
                                                PostHog Code does not introduce a new data bill. Analytics, events,
                                                session replay, feature flags, experiments, error tracking, and surveys
                                                are billed exactly as they are in PostHog Cloud.
                                            </p>
                                            <p className="text-sm font-medium m-0">
                                                There is <strong>no difference in data pricing</strong> whether data is
                                                accessed through twig or directly in PostHog. For full details, see the{' '}
                                                <a href="/pricing" className="underline">
                                                    main PostHog pricing page
                                                </a>
                                                .
                                            </p>
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

                                {/* What Code is not */}
                                <section className="px-6 @lg:px-12 py-12 @lg:py-16 border-b border-primary">
                                    <div className="grid gap-6 @lg:gap-8 @lg:grid-cols-3">
                                        <div className="bg-accent rounded-md border border-primary p-5 flex flex-col gap-3">
                                            <h3 className="text-lg font-bold m-0">× not another dashboard</h3>
                                            <p className="text-sm text-secondary m-0">
                                                Signals become tasks, not graphs. Most of the work in twig happens in
                                                the signals inbox and agent chat. PostHog and twig stay linked, so when
                                                you <em>do</em> need charts you can jump straight into product
                                                analytics.
                                            </p>
                                            <div className="mt-auto space-y-2">
                                                <CallToAction href="/product-analytics" type="secondary" size="sm">
                                                    Show me some charts
                                                </CallToAction>
                                            </div>
                                        </div>

                                        <div className="bg-accent rounded-md border border-primary p-5 flex flex-col gap-3">
                                            <h3 className="text-lg font-bold m-0">× not a new model harness</h3>
                                            <p className="text-sm text-secondary m-0">
                                                PostHog Code does not ask you to adopt a new model stack. It uses the
                                                exact same AI models and harnesses you already use, at the same
                                                underlying prices&mdash;it just points them at the right work.
                                            </p>
                                            <div className="flex flex-wrap items-center gap-2 text-xs text-secondary">
                                                <span className="size-10 rounded-md border border-primary bg-primary/40 flex items-center justify-center">
                                                    <img
                                                        src={ClaudeLogo}
                                                        alt="Claude logo"
                                                        className="h-5 w-auto opacity-80"
                                                        style={{ filter: 'grayscale(1)' }}
                                                    />
                                                </span>
                                                <span className="size-10 rounded-md border border-primary bg-primary/40 flex items-center justify-center">
                                                    <img
                                                        src={OpenAILogo}
                                                        alt="OpenAI logo"
                                                        className="h-5 w-auto opacity-80"
                                                        style={{ filter: 'grayscale(1)' }}
                                                    />
                                                </span>
                                                <span className="size-10 rounded-md border border-primary bg-primary/40 flex items-center justify-center">
                                                    <img
                                                        src={GeminiLogo}
                                                        alt="Gemini logo"
                                                        className="h-5 w-auto opacity-80"
                                                        style={{ filter: 'grayscale(1)' }}
                                                    />
                                                </span>
                                            </div>
                                        </div>

                                        <div className="bg-accent rounded-md border border-primary p-5 flex flex-col gap-3">
                                            <h3 className="text-lg font-bold m-0">× not a no‑code tool</h3>
                                            <p className="text-sm text-secondary m-0">
                                                twig is built for people who write code. Orchestrate agents to build big
                                                features, then review and ship the diffs. Hardcore user of another IDE?
                                                You&apos;ll get the best experience in twig, but if you insist:
                                            </p>
                                            <div className="mt-auto">
                                                <div
                                                    data-scheme="secondary"
                                                    className="bg-primary border border-primary rounded-md px-3 py-2 text-xs font-mono"
                                                >
                                                    <span className="opacity-60 mr-2">$</span>
                                                    <span>npx @posthog/twig-mcp</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* FAQ */}
                                <section id="faq" className="px-6 @lg:px-12 py-12 @lg:py-16 border-b border-primary">
                                    <div className="max-w-3xl space-y-8">
                                        <h2 className="text-3xl @lg:text-4xl font-bold m-0">FAQ</h2>

                                        <div>
                                            <h3 className="text-xl font-bold m-0 mb-2">
                                                Does it replace Cursor or Claude Code?
                                            </h3>
                                            <p className="text-sm text-secondary m-0">
                                                No. Keep your editor. PostHog Code is the part before you open your
                                                editor&mdash;deciding what is worth working on and starting the work.
                                                You still review and ship everything.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold m-0 mb-2">
                                                What if I don&apos;t use PostHog yet?
                                            </h3>
                                            <p className="text-sm text-secondary m-0">
                                                PostHog Code runs on top of PostHog. You&apos;ll need to be on PostHog
                                                first. The good news: PostHog is free up to generous limits, and
                                                installation takes about 90 seconds.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold m-0 mb-2">Can it make bad decisions?</h3>
                                            <p className="text-sm text-secondary m-0">
                                                Yes. That is why you set a daily limit and review every PR before it
                                                ships. Code never merges anything on its own. It surfaces the work. You
                                                decide what to do with it.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold m-0 mb-2">Is my code sent to PostHog?</h3>
                                            <p className="text-sm text-secondary m-0">
                                                Agents access your GitHub repo to open PRs, similar to any CI/CD
                                                integration. Your code stays in GitHub. PostHog Code reads your product
                                                data (already in PostHog) and uses it to direct the agents.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* CTA */}
                                <section id="get-started" className="px-6 @lg:px-12 py-16 @lg:py-24">
                                    <div className="max-w-2xl mx-auto text-center">
                                        <h2 className="text-3xl @lg:text-4xl font-bold m-0 mb-4">
                                            Be the first to build with PostHog Code
                                        </h2>
                                        <p className="text-lg text-secondary mb-8">
                                            We're looking for alpha testers who currently work on a real product with
                                            real users (and want to burn some tokens with us). Stop context-switching
                                            between dashboards, agent chats and terminals. Let data drive the work with
                                            PostHog Code.
                                        </p>
                                        <div className="flex flex-wrap justify-center gap-3">
                                            <CallToAction
                                                href="https://app.posthog.com/signup"
                                                type="primary"
                                                size="lg"
                                            >
                                                Get early access
                                            </CallToAction>
                                            <CallToAction href="https://posthog.com/discord" type="secondary" size="lg">
                                                Join us on Discord
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
