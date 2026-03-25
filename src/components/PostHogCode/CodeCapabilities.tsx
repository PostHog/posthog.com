import React, { useState } from 'react'
import {
    IconGear,
    IconGitBranch,
    IconSearch,
    IconSparkles,
    IconPlus,
    IconCloud,
    IconLaptop,
    IconX,
    IconGithub,
} from '@posthog/icons'
import { IconGrid } from 'components/OSIcons/Icons'

interface Skill {
    id: string
    title: string
    description: string
    tools?: string[]
    workflow?: string[]
}

const skillsList: Skill[] = [
    {
        id: 'instrument-product-analytics',
        title: 'Instrument product analytics',
        description: 'Track meaningful user actions and connect them to PostHog.',
        tools: ['Read', 'Grep', 'Write', 'Shell'],
        workflow: [
            'Identify key user journeys',
            'Add events and properties',
            'Ship behind a feature flag',
            'Verify with test sessions',
        ],
    },
    {
        id: 'instrument-feature-flags',
        title: 'Instrument feature flags',
        description: 'Gate new functionality with safe rollouts.',
    },
    {
        id: 'instrument-error-tracking',
        title: 'Instrument error tracking',
        description: 'Capture exceptions with stack traces.',
    },
    {
        id: 'cleaning-up-stale-flags',
        title: 'Clean up stale feature flags',
        description: 'Detect unused flags and propose safe removal.',
    },
]

function SkillsPreview() {
    const expanded = skillsList[0]
    const rest = skillsList.slice(1)

    return (
        <div className="flex flex-1 flex-col overflow-hidden border-t border-primary">
            <div className="bg-accent border-b border-primary px-4 py-3">
                <div className="flex items-center gap-2">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-sm border border-primary bg-primary">
                        <IconSparkles className="size-4 text-yellow" />
                    </span>
                    <div>
                        <p className="m-0 text-xs font-bold text-primary">{expanded.title}</p>
                        <p className="m-0 mt-0.5 text-[11px] text-secondary leading-snug">{expanded.description}</p>
                    </div>
                </div>
                <div className="mt-3 flex items-start gap-6">
                    {expanded.tools && (
                        <div className="min-w-0">
                            <p className="m-0 text-[10px] font-semibold text-orange uppercase tracking-wide">Tools</p>
                            <div className="mt-1 flex flex-wrap gap-1">
                                {expanded.tools.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded border border-primary bg-primary px-1.5 py-0.5 text-[10px] font-medium text-secondary"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    {expanded.workflow && (
                        <div className="min-w-0 flex-1">
                            <p className="m-0 text-[10px] font-semibold text-orange uppercase tracking-wide">
                                Workflow
                            </p>
                            <ol className="m-0 mt-1 pl-4 text-[11px] text-secondary list-decimal space-y-0.5">
                                {expanded.workflow.map((step) => (
                                    <li key={step}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>
            </div>
            {rest.map((skill, i) => (
                <div
                    key={skill.id}
                    className={`flex items-center gap-2.5 px-4 py-2.5 ${
                        i < rest.length - 1 ? 'border-b border-primary' : ''
                    }`}
                >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-sm border border-primary bg-accent">
                        <IconSparkles className="size-3.5 text-yellow" />
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="m-0 text-xs font-semibold text-primary">{skill.title}</p>
                        <p className="m-0 mt-0.5 text-[11px] text-secondary leading-snug line-clamp-1">
                            {skill.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

function EmptyCell() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
            <span className="flex items-center gap-1.5 rounded border border-dashed border-primary px-3 py-1.5 text-xs text-secondary">
                <IconPlus className="size-3" />
                Add task
            </span>
            <span className="text-[11px] text-secondary/50">or drag a task from the sidebar</span>
        </div>
    )
}

function ActiveTaskCell() {
    return (
        <div className="flex h-full w-full flex-col gap-3 p-4">
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary">Fix onboarding step 3</span>
                <span className="shrink-0 rounded-sm bg-green/10 px-1.5 py-0.5 text-[10px] font-medium text-green dark:bg-green/20">
                    Running
                </span>
            </div>
            <div className="flex-1 rounded border border-primary bg-accent p-2.5 font-mono text-[10px] leading-relaxed text-secondary">
                <p className="m-0 text-green">✓ Identified root cause in OnboardingStep3.tsx</p>
                <p className="m-0 text-green">✓ Applied fix: null-check on user.preferences</p>
                <p className="m-0 text-blue">→ Running 12 affected tests...</p>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-accent">
                <div className="h-full w-[72%] rounded-full bg-green" />
            </div>
        </div>
    )
}

function CommandCenterPreview() {
    return (
        <div className="flex flex-1 flex-col overflow-hidden border-t border-primary">
            <div className="flex items-center justify-between border-b border-primary px-4 py-2.5">
                <div className="flex items-center gap-2">
                    <IconGrid className="size-4 text-secondary" />
                    <span className="text-xs font-semibold text-primary">Command Center</span>
                </div>
            </div>
            <div className="flex items-center justify-between border-b border-primary px-4 py-2">
                <div className="flex items-center gap-3">
                    <span className="rounded border border-primary px-2 py-0.5 text-xs text-secondary">2x2</span>
                    <div className="flex items-center gap-1 text-xs text-secondary">
                        <IconSearch className="size-3" />
                        <span>100%</span>
                        <IconGear className="size-3" />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-red">Stop All</span>
                    <span className="text-xs text-secondary">Clear</span>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-2 grid-rows-2">
                <div className="border-r border-b border-primary">
                    <ActiveTaskCell />
                </div>
                <div className="border-b border-primary">
                    <EmptyCell />
                </div>
                <div className="border-r border-primary">
                    <EmptyCell />
                </div>
                <div>
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
        <div className="flex border-t border-primary">
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
                <div className="hidden @md/reader-content:flex w-[320px] flex-col border-l border-primary shrink-0">
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

const executionModes = [
    {
        icon: IconGitBranch,
        title: 'Worktree',
        label: 'Recommended for parallel work',
        description:
            'Creates an isolated copy of your local project so an agent can work alongside you without conflicts. You keep coding on your branch while the agent works on its own.',
    },
    {
        icon: IconLaptop,
        title: 'Local',
        label: 'Most permissionless',
        description:
            'Runs directly on your machine, editing files in-place like a second pair of hands. Closest to how developers use AI coding tools today, with full access to your local environment and tools.',
    },
    {
        icon: IconCloud,
        title: 'Cloud',
        label: 'Preferred for async work',
        description:
            'Tasks execute in a cloud sandbox. The agent clones your repo, does its work, and pushes to a branch. Assign tasks before you leave and wake up to PRs ready for review.',
    },
]

function ExecutionModes() {
    return (
        <div className="grid gap-px overflow-hidden rounded-md border border-primary @md/reader-content:grid-cols-3">
            {executionModes.map((mode, i) => (
                <div
                    key={mode.title}
                    className={`flex flex-col px-5 py-5 ${
                        i < executionModes.length - 1
                            ? '@md/reader-content:border-r border-b @md/reader-content:border-b-0 border-primary'
                            : ''
                    }`}
                >
                    <mode.icon className="size-6 text-primary" />
                    <p className="m-0 mt-3 text-base font-bold text-primary">{mode.title}</p>
                    <p className="m-0 mt-0.5 text-xs font-medium text-orange">{mode.label}</p>
                    <p className="m-0 mt-2 text-sm leading-relaxed text-secondary">{mode.description}</p>
                </div>
            ))}
        </div>
    )
}

function UnderTheHood() {
    return (
        <div className="flex flex-1 flex-col overflow-hidden border-t border-primary">
            <div className="flex-1 overflow-hidden px-5 py-4 @md/reader-content:px-6">
                <p className="m-0 text-sm leading-relaxed text-secondary">
                    PostHog Code runs on the same frontier models you already use — at the same prices you already pay.
                    No markup, no lock-in, no proprietary model you&apos;re forced to trust. Bring the model you know is
                    best right now. Swap it when something better ships.
                </p>
                <div className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-secondary">
                    <IconGear className="mt-0.5 size-4 text-brown" aria-hidden />
                    <span>Same models. Same pricing. No lock-in.</span>
                </div>
            </div>
        </div>
    )
}

const instrumentationCards = [
    {
        title: 'Feature flag setup',
        body: 'Writes the flag, wires the SDK calls, scopes the rollout — as part of the same PR that ships the feature. Instrumentation isn’t a follow-up ticket.',
        code: 'posthog.isFeatureEnabled()',
    },
    {
        title: 'Managed rollouts',
        body: 'Staged rollout by percentage, cohort, or user property. Ramps automatically. Pauses on a spike. You define the exit criteria; it handles the gates.',
        code: 'rollout: 5% → 25% → 100%',
    },
    {
        title: 'Health checks on a cron',
        body: 'Schedules a check-in after launch — error rate, conversion, p99 latency, whatever you care about. Comes back with a verdict. No one has to remember to look.',
        code: 'Cron: 24h post-deploy',
    },
    {
        title: 'Stale flag removal',
        body: 'Finds flags that have been at 100% rollout for 30 days and nobody’s touched. Opens a PR to remove the branch, clean the calls, delete the flag. Your codebase stays readable.',
        code: 'cleanup: 30d : 100% rollout',
    },
    {
        title: 'Event tracking, written for you',
        body: 'Reads the feature you build, infers what matters to track, and adds the posthog.capture() calls. You get a PostHog dashboard on day one, not three weeks later.',
        code: "posthog.capture('feature_used')",
    },
    {
        title: 'A/B test scaffolding',
        body: 'Sets up the experiment, splits the variants, attaches the goal metric. When the cron checks in, it knows whether to call it or keep running.',
        code: 'experiment: control vs variant_a',
    },
] as const

function InstantInstrumentation() {
    return (
        <div className="flex flex-1 flex-col overflow-hidden border-t border-primary">
            <div className="flex-1 overflow-hidden px-5 py-4 @md/reader-content:px-6">
                <p className="m-0 text-sm leading-relaxed text-secondary">
                    Most teams treat instrumentation as an afterthought — a ticket that lives at the bottom of the
                    backlog until someone notices the metrics are wrong. PostHog Code makes instrumentation part of the
                    build, not a follow-up task for next sprint.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 overflow-hidden">
                    {instrumentationCards.map((card) => (
                        <div key={card.title} className="flex flex-col rounded-sm border border-input bg-primary/5 p-2">
                            <div className="flex items-start justify-between gap-2">
                                <p className="m-0 text-[11px] font-semibold text-primary line-clamp-1">{card.title}</p>
                                <span className="flex size-6 items-center justify-center rounded-sm border border-input bg-accent shrink-0">
                                    <IconSparkles className="size-3 text-yellow" aria-hidden />
                                </span>
                            </div>
                            <p className="m-0 mt-1 text-sm leading-relaxed text-secondary line-clamp-3">{card.body}</p>
                            <div className="mt-2">
                                <span className="inline-flex max-w-full items-center rounded-sm border border-input bg-accent px-2 py-1 font-mono text-[10px] text-muted truncate">
                                    {card.code}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function CodeCapabilities() {
    return (
        <div className="mt-10 @md/reader-content:mt-14 flex flex-col gap-6">
            <div className="grid gap-6 @md/reader-content:grid-cols-2">
                <CapabilityCard title="Under the hood" description="We're the engine. You pick the fuel.">
                    <UnderTheHood />
                </CapabilityCard>

                <CapabilityCard title="Instant instrumentation" description="Shipped isn’t done until it’s measured.">
                    <InstantInstrumentation />
                </CapabilityCard>
            </div>

            <div className="grid gap-6 @md/reader-content:grid-cols-2">
                <CapabilityCard
                    title="Connected to your company"
                    description="Skills package your tools, repos, and workflows into repeatable automations any agent can run."
                >
                    <SkillsPreview />
                </CapabilityCard>

                <CapabilityCard
                    title="Agent orchestration"
                    description="Delegate individual coding tasks, or use the command center to spin up to 3x3 parallel agents. Our engineers call it dopamine mode (you'll understand why)."
                >
                    <CommandCenterPreview />
                </CapabilityCard>
            </div>

            <CapabilityCard
                title="Autonomous building for the whole team"
                description="Signals surface what matters most, turning product data into prioritized tasks agents execute."
            >
                <SignalsInboxPreview />
            </CapabilityCard>

            <ExecutionModes />
        </div>
    )
}
