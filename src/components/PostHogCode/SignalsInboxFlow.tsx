import React from 'react'
import {
    IconPulse,
    IconSparkles,
    IconTerminal,
    IconCode,
    IconEye,
    IconArrowRight,
    IconBug,
    IconGraph,
    IconMessage,
    IconFlask,
    IconWarning,
    IconGitBranch,
    IconCheck,
    IconFlag,
    IconPullRequest,
} from '@posthog/icons'

const PIPELINE_STEPS = [
    {
        icon: IconPulse,
        title: 'Signals',
        subtitle: 'Data flows in',
        color: 'orange' as const,
    },
    {
        icon: IconSparkles,
        title: 'Prioritize',
        subtitle: 'LLM triage',
        color: 'yellow' as const,
    },
    {
        icon: IconTerminal,
        title: 'Task',
        subtitle: 'Define the work',
        color: 'blue' as const,
    },
    {
        icon: IconCode,
        title: 'Execute',
        subtitle: 'Agent ships code',
        color: 'green' as const,
    },
    {
        icon: IconEye,
        title: 'Review',
        subtitle: 'You approve',
        color: 'red' as const,
    },
]

const SIGNAL_SOURCES = [
    { icon: IconBug, label: 'Error tracking', delay: '0s' },
    { icon: IconGraph, label: 'Product analytics', delay: '0.4s' },
    { icon: IconMessage, label: 'User feedback', delay: '0.8s' },
    { icon: IconFlask, label: 'Experiments', delay: '1.2s' },
    { icon: IconWarning, label: 'Session recordings', delay: '1.6s' },
]

const colorMap = {
    orange: { dot: 'bg-orange', text: 'text-orange', bg: 'bg-orange/10 dark:bg-orange/20' },
    yellow: { dot: 'bg-yellow', text: 'text-yellow', bg: 'bg-yellow/10 dark:bg-yellow/20' },
    blue: { dot: 'bg-blue', text: 'text-blue', bg: 'bg-blue/10 dark:bg-blue/20' },
    green: { dot: 'bg-green', text: 'text-green', bg: 'bg-green/10 dark:bg-green/20' },
    red: { dot: 'bg-red', text: 'text-red', bg: 'bg-red/10 dark:bg-red/20' },
}

export function SignalsInboxFlow() {
    return (
        <div className="flex flex-col overflow-hidden rounded-md border border-primary">
            <div className="border-b border-primary px-5 py-4">
                <h2 className="m-0 text-base font-bold text-primary">Signals pipeline</h2>
                <p className="m-0 mt-1 text-sm leading-relaxed text-secondary">
                    From product data to shipped code, automatically.
                </p>
            </div>

            {/* Pipeline progress bar */}
            <div className="border-b border-primary px-5 py-3">
                <div className="flex items-center gap-1">
                    {PIPELINE_STEPS.map((step, i) => (
                        <React.Fragment key={step.title}>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                                        colorMap[step.color].bg
                                    }`}
                                >
                                    <step.icon className={`size-3.5 ${colorMap[step.color].text}`} />
                                </span>
                                <div className="hidden @md/reader-content:block">
                                    <p className="m-0 text-[11px] font-semibold text-primary leading-none">
                                        {step.title}
                                    </p>
                                    <p className="m-0 text-[10px] text-secondary leading-none mt-0.5">
                                        {step.subtitle}
                                    </p>
                                </div>
                            </div>
                            {i < PIPELINE_STEPS.length - 1 && (
                                <div className="flex-1 flex items-center px-1">
                                    <div className="h-px flex-1 bg-input relative overflow-hidden">
                                        <div
                                            className={`absolute inset-y-0 left-0 w-1/3 ${colorMap[step.color].dot}`}
                                            style={{
                                                animation: `shimmer-across 2s ease-in-out infinite ${i * 0.4}s`,
                                            }}
                                        />
                                    </div>
                                    <IconArrowRight className="size-3 shrink-0 text-muted" aria-hidden />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Pipeline detail panels */}
            <div className="grid @md/reader-content:grid-cols-5 divide-y @md/reader-content:divide-y-0 @md/reader-content:divide-x divide-border">
                {/* 1 - Signals */}
                <div className="p-4 flex flex-col gap-3">
                    <p className="m-0 text-[10px] font-semibold uppercase tracking-wide text-orange">Signal sources</p>
                    <div className="flex flex-col gap-2">
                        {SIGNAL_SOURCES.map((source) => (
                            <div
                                key={source.label}
                                className="flex items-center gap-2 rounded-sm border border-primary bg-accent px-2.5 py-1.5"
                                style={{ animation: `signal-fade-in 0.5s ease-out ${source.delay} both` }}
                            >
                                <source.icon className="size-3 shrink-0 text-orange" />
                                <span className="text-[11px] text-primary truncate">{source.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2 - Prioritize */}
                <div className="p-4 flex flex-col gap-3">
                    <p className="m-0 text-[10px] font-semibold uppercase tracking-wide text-yellow">
                        Deduplicate and rank
                    </p>
                    <div className="rounded-sm border border-primary bg-accent p-3">
                        <div className="space-y-2.5">
                            <RankedSignal rank={1} label="Payment timeout" score="135.0" w="96%" />
                            <RankedSignal rank={2} label="Funnel drop-off" score="92.4" w="68%" />
                            <RankedSignal rank={3} label="Tour fatigue" score="65.0" w="48%" />
                        </div>
                    </div>
                    <p className="m-0 text-[10px] text-secondary leading-relaxed">
                        LLM deduplicates across data types and ranks by impact, urgency, and user count.
                    </p>
                </div>

                {/* 3 - Task */}
                <div className="p-4 flex flex-col gap-3">
                    <p className="m-0 text-[10px] font-semibold uppercase tracking-wide text-blue">Concrete task</p>
                    <div className="rounded-sm border border-primary bg-accent p-3">
                        <p className="m-0 text-[11px] font-semibold text-primary leading-snug">
                            Fix payment timeout in checkout
                        </p>
                        <p className="m-0 mt-1.5 text-[10px] text-secondary leading-relaxed">
                            Affecting 15% of transactions. Root cause: token refresh uses local time instead of UTC.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                            <span className="rounded bg-blue/10 px-1.5 py-0.5 text-[9px] font-medium text-blue dark:bg-blue/20">
                                bug
                            </span>
                            <span className="rounded bg-primary px-1.5 py-0.5 text-[9px] text-secondary">
                                token.ts:47
                            </span>
                        </div>
                    </div>
                    <p className="m-0 text-[10px] text-secondary leading-relaxed">
                        Vague signals become specific, actionable tasks with full context.
                    </p>
                </div>

                {/* 4 - Execute */}
                <div className="p-4 flex flex-col gap-3">
                    <p className="m-0 text-[10px] font-semibold uppercase tracking-wide text-green">Agent working</p>
                    <div className="rounded-sm border border-primary bg-accent p-2.5 font-mono text-[10px] leading-relaxed">
                        <p className="m-0 text-green">
                            <IconCheck className="inline size-3 mr-0.5" />
                            Cloned repo
                        </p>
                        <p className="m-0 text-green">
                            <IconCheck className="inline size-3 mr-0.5" />
                            Found root cause
                        </p>
                        <p className="m-0 text-green">
                            <IconCheck className="inline size-3 mr-0.5" />
                            Applied fix in token.ts
                        </p>
                        <p className="m-0 text-blue animate-pulse">
                            <IconGitBranch className="inline size-3 mr-0.5" />
                            Running 47 tests...
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 rounded-sm bg-green/10 px-1.5 py-0.5 text-[9px] font-medium text-green dark:bg-green/20">
                            <IconFlag className="size-2.5" />
                            Behind flag
                        </span>
                        <span className="text-[10px] text-secondary">Auto-flagged</span>
                    </div>
                </div>

                {/* 5 - Review */}
                <div className="p-4 flex flex-col gap-3">
                    <p className="m-0 text-[10px] font-semibold uppercase tracking-wide text-red">Your approval</p>
                    <div className="rounded-sm border border-primary bg-accent p-3">
                        <div className="flex items-center gap-2">
                            <IconPullRequest className="size-3.5 text-green" />
                            <span className="text-[11px] font-semibold text-primary">PR #51024</span>
                        </div>
                        <p className="m-0 mt-1.5 text-[10px] text-secondary leading-relaxed">
                            Fix: Use UTC in token refresh. 47 tests passing. No regressions in 30 min soak.
                        </p>
                        <div className="mt-2 flex gap-2">
                            <span className="rounded-sm bg-green/10 px-2 py-1 text-[10px] font-semibold text-green dark:bg-green/20">
                                Merge
                            </span>
                            <span className="rounded-sm border border-primary px-2 py-1 text-[10px] text-secondary">
                                Edit
                            </span>
                        </div>
                    </div>
                    <p className="m-0 text-[10px] text-secondary leading-relaxed">
                        Nothing ships without your sign-off. Review diffs, tests, and verification steps.
                    </p>
                </div>
            </div>
        </div>
    )
}

function RankedSignal({ rank, label, score, w }: { rank: number; label: string; score: string; w: string }) {
    return (
        <div>
            <div className="flex items-center justify-between gap-2 text-[11px]">
                <span className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-yellow tabular-nums">{rank}</span>
                    <span className="text-primary truncate">{label}</span>
                </span>
                <span className="font-mono text-[10px] text-secondary/60 shrink-0">{score}</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-primary/60">
                <div
                    className="h-full rounded-full bg-yellow animate-pulse"
                    style={{ width: w, animationDelay: `${rank * 300}ms` }}
                />
            </div>
        </div>
    )
}
