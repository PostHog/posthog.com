import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { createSlideConfig, SlidesTemplate } from 'components/Products/Slides'
import {
    IconArrowUpRight,
    IconCheck,
    IconCode,
    IconDashboard,
    IconFunnels,
    IconMessage,
    IconRewindPlay,
    IconRocket,
    IconSparkles,
    IconTestTube,
    IconToggle,
    IconTrends,
    IconWarning,
    IconX,
} from '@posthog/icons'

const PRODUCT_HANDLE = 'qa_swarm'

type SlideFeature = {
    title: string
    description: string
    icon?: React.ComponentType<{ className?: string }>
}

type ComparisonStatus = 'check' | 'cross' | 'warn'

type ComparisonRow = {
    feature: string
    description: string
    values: ComparisonStatus[]
}

const panelClasses = {
    purple: 'bg-purple text-white',
    blue: 'bg-blue text-white',
    yellow: 'bg-yellow text-black',
    red: 'bg-red text-white',
    seagreen: 'bg-seagreen text-white',
    salmon: 'bg-salmon text-black',
    lilac: 'bg-lilac text-black',
}

const heroChecklist = [
    'Opened the sandbox preview for this branch',
    'Ran the signup and onboarding path',
    'Verified the highest-volume survey flow still works',
    'Captured screenshots, a GIF, and run metadata',
]

const userFlowFeatures: SlideFeature[] = [
    {
        title: 'Production-informed prioritization',
        description: 'The swarm starts with flows your users already run instead of diff-only guesses.',
        icon: IconTrends,
    },
    {
        title: 'Critical paths detected automatically',
        description: 'High-traffic journeys float to the top without manual QA scripts.',
        icon: IconFunnels,
    },
    {
        title: 'Coverage tied to business impact',
        description: 'Test effort follows risky product surfaces, not just lines changed.',
        icon: IconRocket,
    },
    {
        title: 'Less noise, more signal',
        description: 'Agents spend time where breakage hurts users, revenue, or activation.',
        icon: IconSparkles,
    },
]

const debugFeatures: SlideFeature[] = [
    {
        title: 'Live logs during the run',
        description: 'The failing test can inspect runtime output while the product is still in motion.',
        icon: IconMessage,
    },
    {
        title: 'Errors tied to code paths',
        description: 'Failures connect traces, stack context, and the branch under review.',
        icon: IconCode,
    },
    {
        title: 'Replay for every failure',
        description: 'Agents can see what happened on screen instead of guessing from console text alone.',
        icon: IconRewindPlay,
    },
    {
        title: 'Fixes grounded in evidence',
        description: 'Suggested repairs are based on runtime signals, not a cold read of the diff.',
        icon: IconWarning,
    },
]

const loopFeatures: SlideFeature[] = [
    {
        title: 'Parallel agents per PR',
        description: 'Multiple agents split the critical paths and investigate in parallel.',
        icon: IconTestTube,
    },
    {
        title: 'Fixes commit back to the branch',
        description: 'When the swarm can repair an issue, it proposes a concrete code change.',
        icon: IconCode,
    },
    {
        title: 'Re-runs until must-fix issues clear',
        description: 'The loop keeps going until the blocking failures are gone.',
        icon: IconRocket,
    },
    {
        title: 'Findings stay prioritized',
        description: 'Must-fix regressions stay separate from nice-to-have cleanup.',
        icon: IconSparkles,
    },
]

const moatFeatures: SlideFeature[] = [
    {
        title: 'Analytics drives test priority',
        description: 'The swarm starts with flows users actually take.',
        icon: IconTrends,
    },
    {
        title: 'Replay records every run',
        description: 'Agent behavior is inspectable instead of opaque.',
        icon: IconRewindPlay,
    },
    {
        title: 'Errors ground the diagnosis',
        description: 'Failures connect to the same runtime signals engineers already trust.',
        icon: IconWarning,
    },
    {
        title: 'Flags expand coverage',
        description: 'The swarm can test multiple product states instead of only the default path.',
        icon: IconToggle,
    },
]

const ecosystemFeatures: SlideFeature[] = [
    {
        title: 'Session replay',
        description: 'Replay every agent test run and see exactly what happened before a failure.',
        icon: IconRewindPlay,
    },
    {
        title: 'Product analytics',
        description: 'Prioritize the flows that matter because the swarm starts from real user behavior.',
        icon: IconTrends,
    },
    {
        title: 'Feature flags',
        description: 'Test both sides of a release instead of trusting the default path.',
        icon: IconToggle,
    },
    {
        title: 'Error tracking',
        description: 'Tie every QA finding back to runtime failures in the same product engineers already use.',
        icon: IconWarning,
    },
]

const competitorCards = [
    { name: 'Greptile TREX', tone: 'bg-blue/20 text-blue border-blue/40' },
    { name: 'Tusk', tone: 'bg-yellow/25 text-yellow border-yellow/40' },
    { name: 'Checksum', tone: 'bg-red/15 text-red border-red/40' },
    { name: 'QA Wolf', tone: 'bg-seagreen/20 text-seagreen border-seagreen/40' },
    { name: 'QA Swarm', tone: 'bg-purple/20 text-purple border-purple/40' },
]

const comparisonSummary = {
    them: [
        {
            title: 'You already have a dedicated QA function',
            description: 'A managed service or human-heavy workflow may fit better than agent-driven automation.',
        },
        {
            title: 'You do not want production data informing tests',
            description: 'QA Swarm is opinionated about using real usage and runtime evidence.',
        },
        {
            title: 'You are not on PostHog',
            description: 'The core advantage comes from the PostHog data layer underneath.',
        },
    ],
    us: [
        {
            title: 'Real user behavior sets priorities',
            description: 'The swarm focuses on what matters in production, not just what changed in git.',
        },
        {
            title: 'Auto-fix uses runtime evidence',
            description: 'Agents debug with logs, errors, events, and replay before proposing changes.',
        },
        {
            title: 'QA lives with the rest of your product data',
            description: 'Analytics, replay, errors, and QA results stay in one system.',
        },
        {
            title: 'It closes the loop',
            description: 'The goal is not just finding issues. The goal is getting the PR to green.',
        },
    ],
}

const comparisonRows: ComparisonRow[] = [
    {
        feature: 'PR-triggered',
        description: 'Runs automatically on every pull request',
        values: ['check', 'check', 'check', 'check', 'check'],
    },
    {
        feature: 'Sandbox preview env',
        description: 'Isolated environment per PR',
        values: ['check', 'check', 'check', 'check', 'check'],
    },
    {
        feature: 'AI writes tests',
        description: 'Generates test code automatically',
        values: ['check', 'check', 'check', 'check', 'check'],
    },
    {
        feature: 'Production data as test source',
        description: 'Uses real user flows for prioritization',
        values: ['check', 'cross', 'check', 'warn', 'cross'],
    },
    {
        feature: 'Agent debugs with live errors and replay',
        description: 'Live access to runtime data during tests',
        values: ['check', 'cross', 'cross', 'cross', 'cross'],
    },
    {
        feature: 'Parallel swarm per PR',
        description: 'Multiple agents test in parallel',
        values: ['check', 'cross', 'cross', 'cross', 'warn'],
    },
    {
        feature: 'Auto-fix and loop until green',
        description: 'Commits fixes to the branch, then re-runs',
        values: ['check', 'cross', 'cross', 'cross', 'cross'],
    },
    {
        feature: 'Hosted preview + QA report',
        description: 'Shareable preview URL with full evidence',
        values: ['check', 'cross', 'cross', 'cross', 'cross'],
    },
    {
        feature: 'Session replay of agent runs',
        description: 'Every agent test recorded for debugging',
        values: ['check', 'cross', 'cross', 'cross', 'warn'],
    },
]

const howItWorksSteps = [
    'PR opens and triggers the QA Swarm workflow',
    'A sandbox preview spins up for that exact branch',
    'Agents exercise real user flows and debug with live product signals',
    'Findings post to the PR, fixes can land, and the run loops until green',
]

const yamlSnippet = `name: qa-swarm

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: posthog/qa-swarm-action@hackathon
        with:
          preview_url: \${{ steps.preview.outputs.url }}
          product_signals: analytics,replay,errors,flags
          mode: loop-until-green # placeholder`

const waitlistBullets = [
    'Get early access to the first QA Swarm previews.',
    'Help shape the workflow, reporting, and fix loop.',
    'Try it against real PRs instead of a canned demo.',
]

const SlideShell = ({
    eyebrow,
    title,
    description,
    tone,
    children,
}: {
    eyebrow: string
    title: string
    description: string
    tone: keyof typeof panelClasses
    children: React.ReactNode
}) => {
    return (
        <div className={`h-full p-4 @2xl:p-8 ${panelClasses[tone]}`}>
            <div className="h-full rounded-2xl bg-primary text-primary shadow-2xl overflow-hidden border border-primary/10">
                <div className="px-6 py-5 @2xl:px-10 @2xl:py-8 border-b border-primary/10">
                    <p className="text-sm uppercase tracking-[0.25em] text-secondary mb-2">{eyebrow}</p>
                    <h2 className="text-3xl @2xl:text-5xl mb-2 @2xl:mb-4 text-balance">{title}</h2>
                    <p className="text-base @2xl:text-xl text-secondary max-w-4xl mb-0">{description}</p>
                </div>
                <div className="p-6 @2xl:p-10 h-[calc(100%-10.5rem)] @2xl:h-[calc(100%-13rem)] overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    )
}

const FeatureList = ({ items }: { items: SlideFeature[] }) => {
    return (
        <div className="grid @2xl:grid-cols-2 gap-3 @2xl:gap-4">
            {items.map(({ title, description, icon: Icon }) => (
                <div key={title} className="rounded-xl border border-primary/10 bg-accent p-4 @2xl:p-5">
                    {Icon && <Icon className="size-6 mb-3 text-purple" />}
                    <h3 className="text-xl mb-2">{title}</h3>
                    <p className="text-secondary mb-0">{description}</p>
                </div>
            ))}
        </div>
    )
}

const StatusBadge = ({ label, tone }: { label: string; tone: 'success' | 'failure' }) => (
    <div
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
            tone === 'success' ? 'bg-seagreen/15 text-seagreen' : 'bg-red/15 text-red'
        }`}
    >
        <span className={`size-2 rounded-full ${tone === 'success' ? 'bg-seagreen' : 'bg-red'}`} />
        {label}
    </div>
)

const HeroVisual = () => {
    return (
        <div className="relative h-full rounded-2xl bg-gradient-to-br from-purple to-red p-4 @2xl:p-6 overflow-hidden">
            <div className="absolute inset-x-8 top-6 h-24 rounded-full bg-white/10 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col justify-end">
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-primary text-primary shadow-2xl border border-primary/15 overflow-hidden">
                    <div className="border-b border-primary/10 px-4 py-3 @2xl:px-6 @2xl:py-4 flex flex-wrap items-center gap-3">
                        <StatusBadge label="QA Swarm: PASS" tone="success" />
                        <span className="text-sm text-secondary">
                            Tested with Playwright on a sandboxed preview of this PR
                        </span>
                    </div>
                    <div className="grid @2xl:grid-cols-[1.4fr_0.9fr] gap-4 p-4 @2xl:p-6">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-secondary mb-3">What I checked</p>
                            <ul className="m-0 p-0 list-none space-y-2">
                                {heroChecklist.map((item) => (
                                    <li key={item} className="flex gap-3 items-start">
                                        <IconCheck className="size-5 text-seagreen mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-3 auto-rows-fr">
                            <div className="rounded-xl bg-accent border border-primary/10 p-3 col-span-2">
                                <div className="aspect-[16/7] rounded-lg bg-gradient-to-br from-purple/20 to-blue/20 border border-primary/10 relative overflow-hidden">
                                    <div className="absolute left-4 right-4 bottom-4 flex gap-2">
                                        <div className="h-2 flex-1 rounded-full bg-primary/20" />
                                        <div className="h-2 w-16 rounded-full bg-seagreen" />
                                    </div>
                                </div>
                                <p className="text-sm text-secondary mt-2 mb-0">
                                    GIF placeholder: full flow walkthrough
                                </p>
                            </div>
                            <div className="rounded-xl bg-accent border border-primary/10 p-3">
                                <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-yellow/25 to-red/10 border border-primary/10" />
                                <p className="text-sm text-secondary mt-2 mb-0">Embedded tab note</p>
                            </div>
                            <div className="rounded-xl bg-accent border border-primary/10 p-3">
                                <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-blue/20 to-seagreen/20 border border-primary/10" />
                                <p className="text-sm text-secondary mt-2 mb-0">Popover control path</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-primary/10 px-4 py-3 @2xl:px-6 text-sm text-secondary">
                        Run metadata: tested <code>b71394d3bd0</code> against <code>preview-pr58401.posthog.dev</code>
                    </div>
                </div>
            </div>
        </div>
    )
}

const FlowComparisonVisual = () => {
    return (
        <div className="grid @2xl:grid-cols-[0.9fr_1.1fr] gap-4 h-full">
            <div className="rounded-2xl border border-primary/10 bg-accent p-4 @2xl:p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-secondary mb-1">Diff-based QA</p>
                        <h3 className="text-2xl mb-0">Tests what changed</h3>
                    </div>
                    <StatusBadge label="Narrow coverage" tone="failure" />
                </div>
                <div className="space-y-3">
                    {['survey-editor.tsx', 'position-picker.tsx', 'tabs.tsx'].map((file) => (
                        <div
                            key={file}
                            className="rounded-xl border border-primary/10 bg-primary p-4 flex items-center justify-between"
                        >
                            <span className="font-mono text-sm">{file}</span>
                            <span className="text-sm text-secondary">changed</span>
                        </div>
                    ))}
                </div>
                <div className="mt-6 rounded-xl border border-dashed border-primary/20 p-4">
                    <p className="text-secondary mb-0">
                        Useful, but blind to the rest of the product surface area users actually depend on.
                    </p>
                </div>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-primary p-4 @2xl:p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-secondary mb-1">QA Swarm</p>
                        <h3 className="text-2xl mb-0">Tests what matters in production</h3>
                    </div>
                    <StatusBadge label="Real usage coverage" tone="success" />
                </div>
                <div className="grid gap-3">
                    {[
                        { label: 'Signup', width: 'w-full' },
                        { label: 'Onboarding', width: 'w-4/5' },
                        { label: 'Create survey', width: 'w-3/4' },
                        { label: 'Launch feedback button', width: 'w-2/3' },
                    ].map(({ label, width }, index) => (
                        <div key={label} className="rounded-xl border border-primary/10 bg-accent p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">{label}</span>
                                <span className="text-sm text-secondary">Top flow #{index + 1}</span>
                            </div>
                            <div className="h-3 rounded-full bg-primary/10 overflow-hidden">
                                <div
                                    className={`h-full rounded-full bg-gradient-to-r from-purple to-seagreen ${width}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <FeatureList items={userFlowFeatures} />
                </div>
            </div>
        </div>
    )
}

const DebugVisual = () => {
    return (
        <div className="grid @2xl:grid-cols-[1.1fr_0.9fr] gap-4 h-full">
            <div className="rounded-2xl border border-primary/10 bg-accent p-4 @2xl:p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-secondary mb-1">Agent debug view</p>
                        <h3 className="text-2xl mb-0">Failure, replay, and code context</h3>
                    </div>
                    <StatusBadge label="Live during run" tone="success" />
                </div>
                <div className="grid gap-3">
                    <div className="rounded-xl border border-primary/10 bg-primary p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">Runtime error</span>
                            <span className="text-sm text-red">400ms ago</span>
                        </div>
                        <div className="rounded-lg bg-dark p-3 text-sm text-white font-mono">
                            Error: position controls rendered for embedded survey
                            <br />
                            at SurveyEditor.handlePresentationChange
                        </div>
                    </div>
                    <div className="grid @2xl:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-primary/10 bg-primary p-3">
                            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-blue/20 to-purple/20 border border-primary/10 relative overflow-hidden">
                                <div className="absolute inset-x-3 bottom-3 h-2 rounded-full bg-primary/20" />
                            </div>
                            <p className="text-sm text-secondary mt-2 mb-0">
                                Replay frame: incorrect Position UI visible
                            </p>
                        </div>
                        <div className="rounded-xl border border-primary/10 bg-primary p-3">
                            <div className="rounded-lg bg-dark p-3 text-xs text-white font-mono h-full">
                                if (presentation === 'embedded') {'{'}
                                <br />
                                &nbsp;&nbsp;return &lt;EmbeddedNote /&gt;
                                <br />
                                {'}'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FeatureList items={debugFeatures} />
        </div>
    )
}

const LoopVisual = () => {
    const steps = ['Detect', 'Diagnose', 'Fix', 'Re-test']

    return (
        <div className="grid @2xl:grid-cols-[1.05fr_0.95fr] gap-4 h-full">
            <div className="rounded-2xl border border-primary/10 bg-accent p-4 @2xl:p-6 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-4">
                    {steps.map((step, index) => (
                        <div
                            key={step}
                            className="rounded-2xl border border-primary/10 bg-primary p-5 relative min-h-32"
                        >
                            <span className="absolute top-4 right-4 text-xs text-secondary">0{index + 1}</span>
                            <h3 className="text-2xl mb-2">{step}</h3>
                            <p className="text-secondary mb-0">
                                {step === 'Detect' && 'Run the paths users depend on.'}
                                {step === 'Diagnose' && 'Inspect replay, logs, and errors while failing.'}
                                {step === 'Fix' && 'Patch the branch when the path is clear.'}
                                {step === 'Re-test' && 'Verify the regression is actually gone.'}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-4 rounded-2xl border border-dashed border-seagreen/40 bg-seagreen/10 p-4">
                    <p className="mb-0 text-lg font-semibold text-seagreen">
                        Ship green only when the must-fix queue is empty.
                    </p>
                </div>
            </div>
            <FeatureList items={loopFeatures} />
        </div>
    )
}

const ResultsVisual = () => {
    return (
        <div className="grid @2xl:grid-cols-[1.15fr_0.85fr] gap-4 h-full">
            <div className="rounded-2xl border border-primary/10 bg-accent p-4 @2xl:p-6">
                <div className="rounded-2xl border border-primary/10 bg-primary overflow-hidden">
                    <div className="px-4 py-3 border-b border-primary/10 flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-secondary mb-1">GitHub PR comment</p>
                            <h3 className="text-2xl mb-0">QA Swarm: FAIL</h3>
                        </div>
                        <StatusBadge label="2 must-fix issues" tone="failure" />
                    </div>
                    <div className="p-4 grid gap-3">
                        {[
                            ['Must fix', 'Embedded survey still shows position controls'],
                            ['Must fix', 'Session replay captured a failed save retry'],
                            ['Nice to have', 'Popover layout shifted by 8px in preview'],
                        ].map(([label, value]) => (
                            <div
                                key={value}
                                className="rounded-xl border border-primary/10 bg-accent p-3 flex items-start justify-between gap-3"
                            >
                                <div>
                                    <span className="text-sm text-secondary">{label}</span>
                                    <p className="mb-0">{value}</p>
                                </div>
                                {label === 'Nice to have' ? (
                                    <span className="rounded-full bg-yellow/20 text-yellow px-2 py-1 text-xs font-semibold">
                                        Later
                                    </span>
                                ) : (
                                    <span className="rounded-full bg-red/15 text-red px-2 py-1 text-xs font-semibold">
                                        Blocker
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid gap-4">
                <div className="rounded-2xl border border-primary/10 bg-accent p-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-secondary mb-2">Hosted preview</p>
                    <div className="rounded-xl border border-primary/10 bg-primary p-4">
                        <p className="font-mono text-sm mb-2">preview-pr58401.posthog.dev</p>
                        <p className="text-secondary mb-0">Sandboxed environment for this exact branch.</p>
                    </div>
                </div>
                <div className="rounded-2xl border border-primary/10 bg-accent p-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-secondary mb-2">Slack update</p>
                    <div className="rounded-xl border border-primary/10 bg-primary p-4">
                        <p className="mb-1 font-semibold">#eng-reviews</p>
                        <p className="text-secondary mb-0">QA Swarm found 2 must-fix regressions on this PR.</p>
                    </div>
                </div>
                <div className="rounded-2xl border border-primary/10 bg-accent p-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-secondary mb-2">PostHog Code</p>
                    <div className="rounded-xl border border-primary/10 bg-primary p-4">
                        <div className="flex items-center justify-between">
                            <span>PR #58401</span>
                            <span className="rounded-full bg-red/15 text-red px-2 py-1 text-xs font-semibold">
                                Needs work
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DataLayerVisual = () => {
    const nodes = [
        { title: 'Product analytics', tone: 'bg-blue/20 border-blue/40 text-blue' },
        { title: 'Session replay', tone: 'bg-yellow/25 border-yellow/40 text-yellow' },
        { title: 'Error tracking', tone: 'bg-red/15 border-red/40 text-red' },
        { title: 'Feature flags', tone: 'bg-seagreen/20 border-seagreen/40 text-seagreen' },
    ]

    return (
        <div className="grid @2xl:grid-cols-[1fr_0.9fr] gap-4 h-full">
            <div className="rounded-2xl border border-primary/10 bg-accent p-4 @2xl:p-6 flex items-center justify-center">
                <div className="relative w-full max-w-3xl aspect-square">
                    <div className="absolute inset-[28%] rounded-full bg-gradient-to-br from-purple to-red text-white shadow-2xl flex flex-col items-center justify-center text-center p-6">
                        <IconTestTube className="size-12 mb-3" />
                        <h3 className="text-3xl mb-2">QA Swarm</h3>
                        <p className="mb-0 text-white/80">Agents testing with production eyes and ears.</p>
                    </div>
                    {nodes.map((node, index) => {
                        const positions = [
                            'top-0 left-1/2 -translate-x-1/2',
                            'right-0 top-1/2 -translate-y-1/2',
                            'bottom-0 left-1/2 -translate-x-1/2',
                            'left-0 top-1/2 -translate-y-1/2',
                        ]
                        return (
                            <div
                                key={node.title}
                                className={`absolute w-44 rounded-2xl border p-4 text-center shadow-md ${node.tone} ${positions[index]}`}
                            >
                                <p className="font-semibold mb-0">{node.title}</p>
                            </div>
                        )
                    })}
                    <div className="absolute inset-0 pointer-events-none">
                        <svg viewBox="0 0 100 100" className="size-full">
                            <path
                                d="M50 16 L50 34"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="text-primary/30"
                            />
                            <path
                                d="M84 50 L66 50"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="text-primary/30"
                            />
                            <path
                                d="M50 84 L50 66"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="text-primary/30"
                            />
                            <path
                                d="M16 50 L34 50"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="text-primary/30"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <FeatureList items={moatFeatures} />
        </div>
    )
}

const HowItWorksVisual = () => {
    return (
        <div className="grid @2xl:grid-cols-[1fr_0.95fr] gap-4 h-full">
            <div className="rounded-2xl border border-primary/10 bg-accent p-4 @2xl:p-6">
                <div className="grid gap-3">
                    {howItWorksSteps.map((step, index) => (
                        <div
                            key={step}
                            className="rounded-xl border border-primary/10 bg-primary p-4 flex gap-4 items-start"
                        >
                            <div className="size-10 rounded-full bg-purple text-white flex items-center justify-center font-semibold flex-shrink-0">
                                {index + 1}
                            </div>
                            <p className="mb-0">{step}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-4 rounded-xl border border-dashed border-yellow/40 bg-yellow/15 p-4">
                    <p className="mb-0 text-secondary">
                        Placeholder slide: update the workflow details once tonight&apos;s end-to-end run is clearer.
                    </p>
                </div>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-primary p-4 @2xl:p-6 overflow-hidden">
                <p className="text-sm uppercase tracking-[0.2em] text-secondary mb-2">GitHub Actions sketch</p>
                <pre className="rounded-xl bg-dark text-white p-4 text-xs @2xl:text-sm overflow-auto h-full m-0">
                    <code>{yamlSnippet}</code>
                </pre>
            </div>
        </div>
    )
}

const ComparisonSummaryVisual = () => {
    return (
        <div className="grid gap-4 h-full">
            <div className="grid grid-cols-2 @2xl:grid-cols-5 gap-3">
                {competitorCards.map((card) => (
                    <div key={card.name} className={`rounded-2xl border p-4 text-center font-semibold ${card.tone}`}>
                        {card.name}
                    </div>
                ))}
            </div>
            <div className="grid @2xl:grid-cols-2 gap-4 flex-1">
                <div className="rounded-2xl border border-primary/10 bg-accent p-5 @2xl:p-6">
                    <h3 className="text-2xl mb-4">
                        A competitor might suit you better <em>(for now)</em> if...
                    </h3>
                    <div className="grid gap-3">
                        {comparisonSummary.them.map((item) => (
                            <div key={item.title} className="rounded-xl border border-primary/10 bg-primary p-4">
                                <h4 className="text-lg mb-1">{item.title}</h4>
                                <p className="mb-0 text-secondary">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="rounded-2xl border border-primary/10 bg-primary p-5 @2xl:p-6">
                    <h3 className="text-2xl mb-4">Reasons to choose QA Swarm</h3>
                    <div className="grid gap-3">
                        {comparisonSummary.us.map((item) => (
                            <div key={item.title} className="rounded-xl border border-primary/10 bg-accent p-4">
                                <h4 className="text-lg mb-1">{item.title}</h4>
                                <p className="mb-0 text-secondary">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ComparisonStatusIcon = ({ status }: { status: ComparisonStatus }) => {
    if (status === 'check') {
        return <IconCheck className="size-5 text-green mx-auto" />
    }
    if (status === 'warn') {
        return <IconWarning className="size-5 text-yellow mx-auto" />
    }
    return <IconX className="size-5 text-red mx-auto" />
}

const FeatureComparisonVisual = () => {
    const headings = ['QA Swarm', 'Greptile TREX', 'Tusk', 'Checksum', 'QA Wolf']

    return (
        <div className="h-full rounded-2xl border border-primary/10 bg-[#2f2d2a] text-white overflow-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-white/15">
                        <th className="text-left px-4 py-4 @2xl:px-6 @2xl:py-5 text-2xl font-semibold">Feature</th>
                        {headings.map((heading) => (
                            <th
                                key={heading}
                                className="px-2 py-4 @2xl:px-4 @2xl:py-5 text-lg @2xl:text-2xl font-semibold"
                            >
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {comparisonRows.map((row) => (
                        <tr key={row.feature} className="border-b border-white/10 align-top">
                            <td className="px-4 py-4 @2xl:px-6 @2xl:py-5 max-w-md">
                                <div className="text-xl @2xl:text-2xl font-semibold">{row.feature}</div>
                                <div className="text-white/70 italic text-base @2xl:text-xl">{row.description}</div>
                            </td>
                            {row.values.map((value, index) => (
                                <td
                                    key={`${row.feature}-${index}`}
                                    className="px-2 py-4 @2xl:px-4 @2xl:py-5 text-center"
                                >
                                    <ComparisonStatusIcon status={value} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const EcosystemVisual = () => {
    return (
        <div className="grid @2xl:grid-cols-2 gap-4 h-full">
            {ecosystemFeatures.map(({ title, description, icon: Icon }) => (
                <div key={title} className="rounded-2xl border border-primary/10 bg-accent p-5 @2xl:p-6">
                    {Icon && <Icon className="size-8 mb-4 text-purple" />}
                    <h3 className="text-2xl @2xl:text-3xl mb-3">{title}</h3>
                    <p className="text-secondary mb-0 text-lg">{description}</p>
                </div>
            ))}
        </div>
    )
}

const WaitlistVisual = () => {
    return (
        <div className="grid @2xl:grid-cols-[1fr_0.95fr] gap-4 h-full">
            <div className="rounded-2xl border border-primary/10 bg-primary p-6 @2xl:p-8 flex flex-col justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-secondary mb-2">Prototype CTA</p>
                    <h3 className="text-3xl @2xl:text-5xl mb-4">Join the waitlist</h3>
                    <p className="text-secondary text-lg max-w-xl">
                        A visual placeholder for now. Hook this up to the real signup flow once the product name and
                        route are final.
                    </p>
                </div>
                <div className="rounded-2xl border border-primary/10 bg-accent p-4 @2xl:p-5">
                    <div className="grid @2xl:grid-cols-[1fr_auto] gap-3">
                        <input
                            readOnly
                            value="dan@company.com"
                            className="rounded-xl border border-primary/10 bg-primary px-4 py-3 text-primary"
                        />
                        <button
                            type="button"
                            className="rounded-xl bg-purple text-white px-5 py-3 font-semibold inline-flex items-center justify-center gap-2"
                        >
                            Join the waitlist
                            <IconArrowUpRight className="size-4" />
                        </button>
                    </div>
                    <p className="text-sm text-secondary mt-3 mb-0">
                        Placeholder form for the internal prototype preview.
                    </p>
                </div>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-accent p-6 @2xl:p-8">
                <div className="grid gap-3">
                    {waitlistBullets.map((item) => (
                        <div
                            key={item}
                            className="rounded-xl border border-primary/10 bg-primary p-4 flex gap-3 items-start"
                        >
                            <IconCheck className="size-5 text-seagreen mt-0.5 flex-shrink-0" />
                            <p className="mb-0">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const HeroSlide = () => (
    <SlideShell
        eyebrow="QA Swarm"
        title="Code generation is cheap. Validation is expensive."
        description="QA Swarm is a fleet of AI agents that test every PR, debug with live production data, and loop until your code ships green."
        tone="purple"
    >
        <HeroVisual />
    </SlideShell>
)

const ProductionFlowsSlide = () => (
    <SlideShell
        eyebrow="Production-informed coverage"
        title="Tests what your users actually do"
        description="Other tools test what changed in the diff. QA Swarm pulls top user flows from PostHog Product Analytics and prioritizes those instead."
        tone="blue"
    >
        <FlowComparisonVisual />
    </SlideShell>
)

const DebugSlide = () => (
    <SlideShell
        eyebrow="Grounded investigation"
        title="Agents debug as they test"
        description="Each agent has live access to logs, errors, events, and session replay during the run, so failures get diagnosed with evidence instead of vibes."
        tone="yellow"
    >
        <DebugVisual />
    </SlideShell>
)

const LoopSlide = () => (
    <SlideShell
        eyebrow="Find, fix, re-test"
        title="Loops until green"
        description="QA Swarm does not stop at reporting bugs. It keeps running the find-fix-retest cycle until the branch is actually ready."
        tone="red"
    >
        <LoopVisual />
    </SlideShell>
)

const ResultsSlide = () => (
    <SlideShell
        eyebrow="Output where engineers already ship"
        title="Results where engineers work"
        description="PR comment. Hosted preview. Slack update. Code dashboard. The artifacts land in the places people already check."
        tone="seagreen"
    >
        <ResultsVisual />
    </SlideShell>
)

const DataLayerSlide = () => (
    <SlideShell
        eyebrow="The moat"
        title="Built on the PostHog data layer"
        description="QA Swarm is not a standalone tool. The point is that every test can be informed by analytics, replay, errors, and flags already inside PostHog."
        tone="purple"
    >
        <DataLayerVisual />
    </SlideShell>
)

const HowItWorksSlide = () => (
    <SlideShell
        eyebrow="Technical flow"
        title="How it works"
        description="A placeholder technical slide for the prototype. Keep the shape now, then tighten the exact workflow after a real end-to-end run."
        tone="salmon"
    >
        <HowItWorksVisual />
    </SlideShell>
)

const ComparisonSummarySlide = () => (
    <SlideShell
        eyebrow="Honest comparison"
        title="PostHog vs..."
        description="This is the right tool if the team wants production-informed QA inside PostHog, not a generic testing sidecar."
        tone="lilac"
    >
        <ComparisonSummaryVisual />
    </SlideShell>
)

const FeatureComparisonSlide = () => (
    <SlideShell
        eyebrow="Scannable differentiation"
        title="Feature comparison"
        description="Prototype matrix based on the competitor comparison you attached. This can be refined later without changing the layout."
        tone="yellow"
    >
        <FeatureComparisonVisual />
    </SlideShell>
)

const EcosystemSlide = () => (
    <SlideShell
        eyebrow="Compound leverage"
        title="10x better in the PostHog ecosystem"
        description="QA Swarm gets disproportionately better when it sits inside the rest of PostHog instead of bolting onto the side."
        tone="blue"
    >
        <EcosystemVisual />
    </SlideShell>
)

const WaitlistSlide = () => (
    <SlideShell
        eyebrow="Call to action"
        title="Join the waitlist"
        description="End on a simple raise-your-hand moment. The interaction is intentionally a placeholder until the final signup destination exists."
        tone="purple"
    >
        <WaitlistVisual />
    </SlideShell>
)

export default function QASwarm(): JSX.Element {
    const data = useStaticQuery(graphql`
        query {
            allProductData {
                nodes {
                    products {
                        name
                        type
                        unit
                        addons {
                            name
                            type
                            unit
                            plans {
                                name
                                plan_key
                                included_if
                                features {
                                    key
                                    name
                                    description
                                    limit
                                    note
                                }
                            }
                        }
                        plans {
                            name
                            plan_key
                            free_allocation
                            included_if
                            features {
                                key
                                name
                                description
                                limit
                                note
                            }
                            tiers {
                                unit_amount_usd
                                up_to
                            }
                        }
                    }
                }
            }
        }
    `)

    const slides = createSlideConfig({
        custom: [
            { slug: 'hero', name: 'Hero', component: HeroSlide },
            { slug: 'production-flows', name: 'Production flows', component: ProductionFlowsSlide },
            { slug: 'debug', name: 'Debug', component: DebugSlide },
            { slug: 'loop', name: 'Loops until green', component: LoopSlide },
            { slug: 'results', name: 'Results', component: ResultsSlide },
            { slug: 'data-layer', name: 'Data layer', component: DataLayerSlide },
            { slug: 'how-it-works', name: 'How it works', component: HowItWorksSlide },
            { slug: 'comparison-summary', name: 'PostHog vs...', component: ComparisonSummarySlide },
            { slug: 'feature-comparison', name: 'Feature comparison', component: FeatureComparisonSlide },
            { slug: 'ecosystem', name: '10x better', component: EcosystemSlide },
            { slug: 'waitlist', name: 'Join the waitlist', component: WaitlistSlide },
        ],
        include: [
            'hero',
            'production-flows',
            'debug',
            'loop',
            'results',
            'data-layer',
            'how-it-works',
            'comparison-summary',
            'feature-comparison',
            'ecosystem',
            'waitlist',
        ],
    })

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={data} slideConfig={slides} />
}
