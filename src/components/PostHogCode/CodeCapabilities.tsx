import React, { useState } from 'react'
import {
    IconGear,
    IconGitBranch,
    IconSearch,
    IconPlus,
    IconCloud,
    IconX,
    IconGithub,
    IconGraph,
    IconToggle,
    IconFlask,
    IconWarning,
} from '@posthog/icons'
import Link from 'components/Link'
import { IconGrid, IconGemini, IconOpenAI, IconAnthropic } from 'components/OSIcons/Icons'
import { LOGOS, type LogoKey } from 'constants/logos'

const HOG_FAST = 'https://res.cloudinary.com/dmukukwp6/image/upload/Code_fast_97de1bbc27.png'
const HOG_SIGNALS_INBOX = 'https://res.cloudinary.com/dmukukwp6/image/upload/mail_code_36790db1ae.png'

const grid12 = 'grid @lg/reader-content:grid-cols-12 @lg/reader-content:gap-x-10 @lg/reader-content:gap-y-8 gap-y-8'
const span7 = 'col-span-12 @lg/reader-content:col-span-7'
const span5 = 'col-span-12 @lg/reader-content:col-span-5'

const bodyComfort = 'text-[15px] leading-relaxed text-secondary'
const hogArtMax = 'w-full max-w-[280px] @lg/reader-content:max-w-[320px]'

type MCPServerRow = {
    name: string
    description: string
    logoKey: LogoKey
}

/** Logos from `LOGOS` only; copy aligned with common MCP server capabilities. */
const mcpServerRows: MCPServerRow[] = [
    {
        name: 'Attio',
        description: 'Manage Attio CRM contacts, companies, and deals.',
        logoKey: 'attio',
    },
    {
        name: 'HubSpot',
        description: 'Sync contacts, companies, and marketing lifecycle for richer agent context.',
        logoKey: 'hubspot',
    },
    {
        name: 'Stripe',
        description: 'Look up customers, subscriptions, and invoices from billing.',
        logoKey: 'stripe',
    },
    {
        name: 'Salesforce',
        description: 'Query accounts, opportunities, and CRM records your agents need in context.',
        logoKey: 'salesforce',
    },
    {
        name: 'Sentry',
        description: 'Pull issues, releases, and stack traces so agents debug against real errors.',
        logoKey: 'sentry',
    },
]

function MCPServersPreview() {
    return (
        <div className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden border-t border-primary">
            {mcpServerRows.map((row, i) => (
                <div
                    key={row.logoKey}
                    className={`flex min-h-0 flex-1 items-start gap-2.5 px-4 py-3 ${
                        i < mcpServerRows.length - 1 ? 'border-b border-primary' : ''
                    }`}
                >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-sm border border-primary bg-primary">
                        <img
                            src={LOGOS[row.logoKey]}
                            alt=""
                            className="max-h-4 w-auto max-w-5 object-contain"
                            aria-hidden
                        />
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="m-0 text-xs font-semibold text-primary">{row.name}</p>
                        <p className="m-0 mt-0.5 text-[11px] text-secondary leading-snug line-clamp-2">
                            {row.description}
                        </p>
                    </div>
                </div>
            ))}
            <div
                className="ph-code-mcp-list-fade pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20"
                aria-hidden
            />
        </div>
    )
}

const frontierMetaChipClass = 'rounded border px-1.5 py-0.5 text-[10px] font-medium leading-none'

function ProductAutonomyPitch() {
    return (
        <div
            id="product-autonomy"
            className="scroll-mt-20 mt-10 border-t border-input pt-10 @md/reader-content:mt-12 @md/reader-content:pt-12"
        >
            <div className={grid12}>
                <div className={span7}>
                    <h2 className="m-0 mb-3 text-2xl font-bold leading-tight text-primary @md/reader-content:text-3xl">
                        Self-driving development for the work you don&apos;t need to think about
                    </h2>
                    <p className={`m-0 ${bodyComfort}`}>
                        With bug fixes and consumer feedback taken care of on autopilot, you can focus on
                        higher-leverage work that demand creativity. You stay in the loop, but out of the weeds.
                    </p>
                    <Link
                        to="/docs/ai-engineering"
                        className="group mt-4 inline-flex items-start gap-2 text-sm font-semibold text-primary"
                    >
                        <IconWarning className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden />
                        <span className="underline decoration-dotted underline-offset-4 group-hover:decoration-solid">
                            Discover what&apos;s next with code quality filters for the same models you use
                        </span>
                    </Link>
                </div>
                <div className={`${span5} flex @lg/reader-content:justify-end`}>
                    <div className="flex w-full items-end justify-center">
                        <img
                            src={HOG_FAST}
                            alt="Self-driving development"
                            className={`mt-6 @lg/reader-content:mt-0 ${hogArtMax}`}
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function EmptyCell() {
    return (
        <div className="flex h-full min-h-0 w-full flex-col items-center justify-center gap-1 px-2 py-2 text-center">
            <span className="flex items-center gap-1 rounded border border-dashed border-primary px-2 py-1 text-[10px] text-secondary">
                <IconPlus className="size-2.5 shrink-0" />
                Add task
            </span>
            <span className="text-[9px] leading-tight text-secondary/50">or drag from sidebar</span>
        </div>
    )
}

function ActiveTaskCell() {
    return (
        <div className="flex h-full min-h-0 w-full flex-col gap-1.5 p-2">
            <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 truncate text-[10px] font-semibold text-primary">
                    Fix race in webhook retry queue
                </span>
                <span className="shrink-0 rounded-sm bg-green/10 px-1.5 py-0.5 text-[10px] font-medium text-green dark:bg-green/20">
                    Running
                </span>
            </div>
            <div className="rounded border border-primary bg-accent px-2 py-1.5 font-code text-[9px] leading-snug text-secondary">
                <p className="m-0 text-green">✓ Serialize retries with mutex</p>
                <p className="m-0 text-blue">→ Running affected integration tests…</p>
            </div>
            <div className="mt-auto h-1 w-full overflow-hidden rounded-full bg-accent">
                <div className="h-full w-3/4 rounded-full bg-green" />
            </div>
        </div>
    )
}

function CommandCenterPreview() {
    return (
        <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden border-t border-primary">
            <div className="shrink-0 flex items-center justify-between border-b border-primary px-3 py-1.5">
                <div className="flex items-center gap-1.5">
                    <IconGrid className="size-3.5 text-secondary" />
                    <span className="text-[10px] font-semibold text-primary">Command Center</span>
                </div>
            </div>
            <div className="shrink-0 flex items-center justify-between border-b border-primary px-3 py-1.5">
                <div className="flex items-center gap-2">
                    <span className="rounded border border-primary px-1.5 py-0.5 text-[10px] text-secondary">2x2</span>
                    <div className="flex items-center gap-1 text-[10px] text-secondary">
                        <IconSearch className="size-2.5" />
                        <span>100%</span>
                        <IconGear className="size-2.5" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-red">Stop All</span>
                    <span className="text-[10px] text-secondary">Clear</span>
                </div>
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-[repeat(2,minmax(4.5rem,1fr))] border-t border-primary">
                <div className="flex min-h-0 overflow-hidden border-r border-b border-primary">
                    <ActiveTaskCell />
                </div>
                <div className="flex min-h-0 overflow-hidden border-b border-primary">
                    <EmptyCell />
                </div>
                <div className="flex min-h-0 overflow-hidden border-r border-primary">
                    <EmptyCell />
                </div>
                <div className="flex min-h-0 overflow-hidden">
                    <EmptyCell />
                </div>
            </div>
        </div>
    )
}

const signalRows = [
    {
        id: 1,
        title: 'Dashboard refresh interrupted by filter changes, leaving insights empty',
        date: 'Mar 2',
        weight: 135.02,
        description:
            'Users experience data loss when modifying dashboard filters during an active refresh cycle. The refresh process terminates prematurely when new filter parameters are applied before the current query completes.',
        occurrences: 234,
        affectedUsers: 45,
        issue: { id: '#51023', title: 'Dashboard filters cause data loss during active refresh', tag: 'bug' },
    },
    {
        id: 2,
        title: 'Product Tours: Add cooldown period between consecutive tour displays',
        date: 'Mar 1',
        weight: 65.0,
        description:
            'Users are experiencing tour fatigue when multiple product tours display back-to-back without any delay.',
        occurrences: 67,
        affectedUsers: 22,
        issue: { id: '#48269', title: 'Product Tours -- "do not show if seen in X days"', tag: 'enhancement' },
    },
    {
        id: 3,
        title: 'Funnel breakdowns fail with Extended Person Properties from warehouse',
        date: 'Mar 1',
        weight: 61.0,
        description:
            'Funnel insights fail when users attempt to breakdown by Extended Person Properties joined from the data warehouse.',
        occurrences: 89,
        affectedUsers: 12,
        issue: { id: '#50891', title: 'Funnel breakdown errors on warehouse-joined person props', tag: 'bug' },
    },
    {
        id: 4,
        title: 'Sessions-on-Events Query Performance: Implement Hybrid Storage',
        date: 'Mar 1',
        weight: 57.09,
        description:
            'A prototype design exists to improve sessions property query performance using a hybrid storage model.',
        occurrences: 156,
        affectedUsers: 31,
        issue: { id: '#49742', title: 'Session property queries timing out on large datasets', tag: 'performance' },
    },
]

function SignalsInboxPreview() {
    const [selectedId, setSelectedId] = useState<number>(1)
    const selected = signalRows.find((s) => s.id === selectedId) || null

    return (
        <div className="flex">
            <div className="flex-1 flex flex-col min-w-0">
                <div className="flex items-center justify-between border-b border-primary px-4 py-2.5">
                    <span className="text-xs font-semibold text-primary">Inbox</span>
                    <span className="text-[10px] text-secondary">Signals ({signalRows.length})</span>
                </div>
                <div className="border-b border-primary px-4 py-2">
                    <div className="flex items-center gap-2 rounded bg-accent px-3 py-1.5 text-xs text-secondary">
                        <IconSearch className="size-3.5 text-secondary/50" />
                        Search signals...
                    </div>
                </div>
                <div className="flex flex-col">
                    {signalRows.map((signal) => (
                        <button
                            key={signal.id}
                            type="button"
                            onClick={() => setSelectedId(signal.id)}
                            className={`w-full text-left border-b border-primary px-4 py-3 transition-colors cursor-pointer hover:bg-accent ${
                                selectedId === signal.id ? 'bg-accent' : ''
                            }`}
                        >
                            <div className="flex items-start justify-between gap-2">
                                <p className="m-0 min-w-0 flex-1 text-xs font-medium leading-snug line-clamp-2 text-primary">
                                    {signal.title}
                                </p>
                                <div className="flex shrink-0 items-center gap-2 pt-0.5">
                                    <span className="text-[10px] text-secondary">{signal.date}</span>
                                    <span className="text-[10px] tabular-nums text-secondary/50">
                                        w:{signal.weight.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <p className="m-0 mt-1 text-[11px] leading-relaxed text-secondary line-clamp-2">
                                {signal.description}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {selected && (
                <div className="hidden w-80 shrink-0 flex-col border-l border-primary @md/reader-content:flex">
                    <div className="p-4 border-b border-primary">
                        <div className="flex items-start justify-between gap-2">
                            <p className="m-0 text-xs font-semibold leading-snug text-primary">{selected.title}</p>
                            <button
                                type="button"
                                onClick={() => setSelectedId(signalRows[0].id)}
                                className="shrink-0 p-0.5 hover:bg-accent rounded transition-colors cursor-pointer"
                            >
                                <IconX className="size-3.5 text-secondary" />
                            </button>
                        </div>
                    </div>
                    <div className="px-4 py-2.5 border-b border-primary flex items-center gap-2">
                        <span className="flex items-center gap-1.5 rounded border border-primary bg-accent px-3 py-1.5 text-[11px] font-medium text-primary">
                            <IconGitBranch className="size-3" />
                            Create task
                        </span>
                        <span className="flex items-center gap-1.5 rounded border border-primary bg-accent px-3 py-1.5 text-[11px] font-medium text-primary">
                            <IconCloud className="size-3" />
                            Run cloud
                        </span>
                    </div>
                    <div className="px-4 py-2.5 border-b border-primary">
                        <p className="m-0 text-[11px] text-secondary leading-relaxed">{selected.description}</p>
                    </div>
                    <div className="px-4 py-2.5 border-b border-primary flex items-center gap-4 text-[11px] text-secondary">
                        <span>
                            <strong className="text-primary">{selected.occurrences}</strong> occurrences
                        </span>
                        <span>
                            <strong className="text-primary">{selected.affectedUsers}</strong> affected users
                        </span>
                    </div>
                    <div className="px-4 py-2.5">
                        <div className="rounded border border-primary bg-accent p-2.5">
                            <div className="flex items-start gap-2">
                                <IconGithub className="size-3.5 text-secondary mt-0.5 shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="m-0 text-[11px] leading-snug text-primary">
                                        <span className="text-secondary">{selected.issue.id}</span>{' '}
                                        {selected.issue.title}
                                    </p>
                                    <span className="mt-1 inline-block rounded bg-primary px-1.5 py-0.5 text-[10px] text-secondary">
                                        {selected.issue.tag}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

interface CapabilityCardProps {
    title: string
    description: string
    children: React.ReactNode
}

function CapabilityCard({ title, description, children }: CapabilityCardProps) {
    return (
        <div className="flex flex-col overflow-hidden rounded-md border border-primary">
            <div className="px-5 py-4">
                <h3 className="m-0 text-base font-bold text-primary">{title}</h3>
                <p className="m-0 mt-1 text-sm leading-relaxed text-secondary">{description}</p>
            </div>
            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </div>
    )
}

type FrontierModelRow = {
    id: string
    title: string
    Icon: React.ComponentType<{ className?: string }>
    iconClassName: string
    /** Coding-capable models exposed for this provider (update as APIs ship new IDs). */
    models?: string[]
    comingSoon?: boolean
}

const frontierModelRows: FrontierModelRow[] = [
    {
        id: 'openai',
        title: 'OpenAI · Codex',
        Icon: IconOpenAI,
        iconClassName: 'text-primary',
        models: ['GPT-5.2', 'GPT-5.3-codex'],
    },
    {
        id: 'anthropic',
        title: 'Anthropic · Claude Code',
        Icon: IconAnthropic,
        iconClassName: 'text-primary',
        models: ['Claude Sonnet 4.6', 'Claude Opus 4.6', 'Claude Haiku 4.5'],
    },
    {
        id: 'gemini',
        title: 'Google · Gemini',
        Icon: IconGemini,
        iconClassName: '',
        comingSoon: true,
    },
    {
        id: 'byok',
        title: 'BYOK and other models',
        Icon: IconGear,
        iconClassName: 'text-brown',
        comingSoon: true,
    },
]

function UnderTheHood() {
    return (
        <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden border-t border-primary">
            {frontierModelRows.map((row, i) => {
                const RowIcon = row.Icon
                return (
                    <div
                        key={row.id}
                        className={`flex min-h-0 flex-1 items-start gap-2.5 px-4 py-3 ${
                            i < frontierModelRows.length - 1 ? 'border-b border-primary' : ''
                        }`}
                    >
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-sm border border-primary bg-primary">
                            <RowIcon className={`size-4 ${row.iconClassName}`} aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="m-0 text-xs font-semibold text-primary">{row.title}</p>
                            {row.comingSoon ? (
                                <span
                                    className={`mt-1.5 inline-flex border-input bg-accent text-muted opacity-80 ${frontierMetaChipClass}`}
                                >
                                    Coming soon
                                </span>
                            ) : row.models && row.models.length > 0 ? (
                                <ul className="m-0 mt-1.5 flex list-none flex-wrap gap-1 p-0">
                                    {row.models.map((name) => (
                                        <li
                                            key={name}
                                            className={`border-primary bg-primary text-secondary ${frontierMetaChipClass}`}
                                        >
                                            {name}
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

type InstrumentationCard = {
    title: string
    body: string
    Icon: React.ComponentType<{ className?: string }>
    /** Matches product color tokens from `useProducts` / product data */
    iconClassName: string
}

const instrumentationCards: InstrumentationCard[] = [
    {
        title: 'Event tracking in the PR',
        body: 'Adds posthog.capture for the journeys that matter so you have real charts when you merge, not a ticket for next sprint.',
        Icon: IconGraph,
        iconClassName: 'text-blue',
    },
    {
        title: 'Feature flags and rollouts',
        body: 'Creates the flag, wires isFeatureEnabled, and configures staged rollout in the same change set.',
        Icon: IconToggle,
        iconClassName: 'text-seagreen',
    },
    {
        title: 'Experiments',
        body: 'Scaffolds variants, split, and goal metric so you can read a winner before you iterate again.',
        Icon: IconFlask,
        iconClassName: 'text-purple',
    },
    {
        title: 'Error tracking',
        body: 'Wires exception capture so new code surfaces in PostHog with stack traces, not only in server logs.',
        Icon: IconWarning,
        iconClassName: 'text-orange',
    },
]

function InstantInstrumentation() {
    return (
        <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden border-t border-primary">
            {instrumentationCards.map((card, i) => {
                const RowIcon = card.Icon
                return (
                    <div
                        key={card.title}
                        className={`flex min-h-0 flex-1 items-start gap-2.5 px-4 py-3 ${
                            i < instrumentationCards.length - 1 ? 'border-b border-primary' : ''
                        }`}
                    >
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-sm border border-primary bg-primary">
                            <RowIcon className={`size-4 ${card.iconClassName}`} aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="m-0 text-xs font-semibold text-primary">{card.title}</p>
                            <p className="m-0 mt-0.5 text-[11px] text-secondary leading-snug line-clamp-2">
                                {card.body}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export function CodeCapabilities() {
    return (
        <div className="mt-10 @md/reader-content:mt-14 flex flex-col gap-6">
            <div className="grid gap-6 @md/reader-content:grid-cols-2">
                <CapabilityCard
                    title="No compromises on coding"
                    description="We're the engine. You pick the fuel. PostHog Code runs on the same frontier models you already use — at the same prices you already pay."
                >
                    <UnderTheHood />
                </CapabilityCard>

                <CapabilityCard
                    title="Agent orchestration"
                    description="Delegate individual tasks, or use the command center to spin up parallel agents. Our engineers call it dopamine mode (you'll see why)."
                >
                    <CommandCenterPreview />
                </CapabilityCard>
            </div>

            <ProductAutonomyPitch />

            <div className="grid gap-6 @md/reader-content:grid-cols-2">
                <CapabilityCard
                    title="MCP servers"
                    description="Manage MCP servers for your AI agents. Connect external services to extend your agent's capabilities."
                >
                    <MCPServersPreview />
                </CapabilityCard>

                <CapabilityCard
                    title="Instant instrumentation"
                    description="Events, flags, experiments, and error tracking land in the same PR as the product change."
                >
                    <InstantInstrumentation />
                </CapabilityCard>
            </div>
        </div>
    )
}

export function AutonomousBuildingCapability() {
    return (
        <div className="flex flex-col gap-5 @md/reader-content:gap-6">
            <div className={grid12}>
                <div className={span7}>
                    <h2 className="m-0 mb-3 text-2xl font-bold leading-tight text-primary @md/reader-content:text-3xl">
                        The signals inbox – like a spam filter for product data
                    </h2>
                    <p className={`m-0 ${bodyComfort}`}>
                        Signals are clustered and ranked by impact and urgency. You see a triaged inbox, not an
                        overwhelming wall of data.
                    </p>
                </div>
                <div className={`${span5} flex @lg/reader-content:justify-end`}>
                    <div className="flex w-full items-end justify-center">
                        <img
                            src={HOG_SIGNALS_INBOX}
                            alt="Signals inbox: triaged product data like mail"
                            className={`mt-6 @lg/reader-content:mt-0 ${hogArtMax}`}
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
            <div className="overflow-hidden rounded-md border border-primary">
                <SignalsInboxPreview />
            </div>
        </div>
    )
}
