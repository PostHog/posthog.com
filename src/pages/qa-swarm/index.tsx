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
    IconToggle,
    IconTrends,
    IconWarning,
    IconX,
} from '@posthog/icons'
import QASwarmIcon from 'components/QASwarmIcon'
import GithubCommentImage from '../../images/qa-swarm/github-comment.png'
import CheckHogImage from '../../images/qa-swarm/check-hog.png'

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

type Theme = 'white' | 'purple' | 'blue'

const productionFlowFeatures: SlideFeature[] = [
    {
        title: 'PR-aware service selection',
        description:
            'The swarm picks the right services from the PR and test plan instead of brute-forcing the whole stack.',
        icon: IconTrends,
    },
    {
        title: 'Auto-generated test scenarios',
        description: 'It turns the PR diff and runtime context into focused scenarios before it runs anything.',
        icon: IconFunnels,
    },
    {
        title: 'Coverage tied to revenue',
        description: 'Coverage follows the flows that matter to activation, retention, and paid usage.',
        icon: IconRocket,
    },
    {
        title: 'Less churn, more signal',
        description: 'Agents spend less time proving trivial diffs and more time on risky product behavior.',
        icon: IconSparkles,
    },
]

const debugFeatures: SlideFeature[] = [
    {
        title: 'Forms a root-cause hypothesis',
        description: 'The agent classifies the failure, proposes a likely cause, and tests that theory.',
        icon: IconMessage,
    },
    {
        title: 'Uses live runtime evidence',
        description: 'Logs, errors, product events, and replay are part of the debug loop while the run is active.',
        icon: IconWarning,
    },
    {
        title: 'LLM traces for the QA agent',
        description:
            'Because the MCP stack is agent-driven, developers can inspect the QA agent in PostHog LLM Analytics.',
        icon: IconCode,
    },
    {
        title: 'Reports an honest verdict',
        description: 'The output reads like an engineer investigating a bug, not a generic AI summary.',
        icon: IconRewindPlay,
    },
]

const loopFeatures: SlideFeature[] = [
    {
        title: 'Parallel agents per PR',
        description: 'Independent agents exercise separate scenarios at the same time.',
        icon: IconSparkles,
    },
    {
        title: 'Push-driven re-runs',
        description: 'A new commit supersedes the old swarm instead of queueing stale work against old code.',
        icon: IconRocket,
    },
    {
        title: 'Auto-fix commits to the branch',
        description: 'When the path is clear, the swarm can patch the branch and verify the result.',
        icon: IconCode,
    },
    {
        title: 'Must-fix versus nice-to-have',
        description: 'The output keeps blockers separate from cleanup so engineers know what actually matters.',
        icon: IconCheck,
    },
]

const resultFeatures: SlideFeature[] = [
    {
        title: 'PR comment with evidence',
        description: 'PASS/FAIL, verdict table, screenshots, and metadata all land where review already happens.',
        icon: IconMessage,
    },
    {
        title: 'Preview URL for the run',
        description: 'Each run links to the exact sandbox environment that the swarm tested.',
        icon: IconArrowUpRight,
    },
    {
        title: 'Trace the QA agent itself',
        description:
            'Inspect reasoning, tool calls, and MCP usage in PostHog LLM Analytics when a run looks suspicious.',
        icon: IconDashboard,
    },
]

const ecosystemFeatures: SlideFeature[] = [
    {
        title: 'Session replay',
        description: 'Replay every agent run and see exactly what happened before a failure.',
        icon: IconRewindPlay,
    },
    {
        title: 'Product analytics',
        description: 'Prioritize the flows that matter because the swarm starts from real user behavior.',
        icon: IconTrends,
    },
    {
        title: 'LLM Analytics',
        description:
            'Trace the QA agent itself so engineers can inspect the exact reasoning and tool usage behind a run.',
        icon: IconToggle,
    },
    {
        title: 'Error tracking',
        description: 'Tie each QA finding back to production-grade runtime evidence.',
        icon: IconWarning,
    },
]

const competitorCards = ['Greptile TREX', 'Tusk', 'Checksum', 'QA Wolf', 'QA Swarm']

const comparisonSummary = {
    them: [
        {
            title: 'You already have a dedicated QA function',
            description: 'A managed service or human-heavy process may fit better than agent-driven automation.',
        },
        {
            title: 'You do not want production data informing tests',
            description: 'QA Swarm is opinionated about grounding tests in how people actually use the product.',
        },
        {
            title: 'You are not on PostHog',
            description: 'The core edge comes from being native to the PostHog data layer.',
        },
    ],
    us: [
        {
            title: 'Real user behavior sets priorities',
            description: 'The swarm focuses on what matters in production, not just what changed in git.',
        },
        {
            title: 'Auto-fix uses runtime evidence',
            description: 'The agent debugs with logs, errors, events, replay, and traces before it suggests changes.',
        },
        {
            title: 'QA lives with the rest of your product data',
            description: 'Analytics, replay, errors, and QA results stay in one system.',
        },
        {
            title: 'It closes the loop',
            description: 'The goal is not opening tickets. The goal is getting the PR to green.',
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
        feature: 'PR-aware service selection',
        description: 'Chooses the right services from the PR and generated test plan',
        values: ['check', 'check', 'check', 'check', 'check'],
    },
    {
        feature: 'LLM traces for QA agent',
        description: 'Inspect reasoning, tool calls, and MCP usage in PostHog LLM Analytics',
        values: ['check', 'cross', 'cross', 'cross', 'cross'],
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
        description: 'Shareable preview URL with evidence',
        values: ['check', 'cross', 'cross', 'cross', 'cross'],
    },
    {
        feature: 'Replay of agent runs',
        description: 'Every agent run recorded for debugging',
        values: ['check', 'cross', 'cross', 'cross', 'warn'],
    },
]

const howItWorksSteps = [
    'A PR opens with a forced exception after the agent paginates an MCP tool three times.',
    'QA Swarm generates a test plan and picks the services it actually needs for that PR.',
    'It runs the scenarios, hits the error, and reports the issue with runtime evidence.',
    'The agent patches the problem and re-runs until the PR goes green.',
]

const yamlSnippet = `name: qa-swarm

on:
  pull_request:
    types: [opened, synchronize, reopened]

concurrency:
  group: qa-swarm-\${{ github.event.pull_request.number }}
  cancel-in-progress: true

jobs:
  qa-swarm:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Kick off swarm
        run: qa-swarm run --async --preview \${{ steps.preview.outputs.url }}
      - name: Poll task status
        run: qa-swarm wait --require health,coverage,verdict
      - name: Fail if health gates failed
        run: qa-swarm assert --all-green`

const waitlistBullets = [
    'Get early access to the first QA Swarm previews.',
    'Help shape the workflow, reporting, and fix loop.',
    'Try it on real PRs instead of a canned demo.',
]

const themeClasses: Record<Theme, string> = {
    white: 'bg-light text-primary',
    purple: 'bg-gradient-to-br from-[#7B3EF3] via-[#6F37E8] to-[#5E2FCF] text-white',
    blue: 'bg-gradient-to-br from-[#3D7CFF] via-[#2D67E2] to-[#214FAF] text-white',
}

const ThemeSlide = ({ theme, children }: { theme: Theme; children: React.ReactNode }) => {
    return (
        <div className={`h-full ${themeClasses[theme]}`}>
            <div className="mx-auto flex h-full max-w-[1180px] flex-col px-6 py-7 @2xl:px-10 @2xl:py-10">
                {children}
            </div>
        </div>
    )
}

const SectionIntro = ({
    eyebrow,
    title,
    description,
    center = false,
    inverted = false,
    compact = false,
}: {
    eyebrow: string
    title: string
    description: string
    center?: boolean
    inverted?: boolean
    compact?: boolean
}) => {
    return (
        <div className={`${center ? 'text-center items-center' : ''} flex flex-col ${compact ? 'mb-5' : 'mb-7'}`}>
            <p
                className={`mb-2 text-sm font-semibold uppercase tracking-[0.22em] ${
                    inverted ? 'text-white/70' : 'text-secondary'
                }`}
            >
                {eyebrow}
            </p>
            <h2 className={`mb-3 text-balance ${center ? 'max-w-4xl' : 'max-w-3xl'} text-4xl @2xl:text-6xl`}>
                {title}
            </h2>
            <p
                className={`${center ? 'max-w-3xl' : 'max-w-2xl'} text-base @2xl:text-xl ${
                    inverted ? 'text-white/80' : 'text-secondary'
                }`}
            >
                {description}
            </p>
        </div>
    )
}

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div
        className={`rounded-2xl border border-primary/10 bg-primary shadow-[0_18px_60px_rgba(15,23,42,0.08)] ${className}`}
    >
        {children}
    </div>
)

const ScreenshotCard = ({
    src,
    alt,
    className = '',
    imgClassName = '',
}: {
    src: string
    alt: string
    className?: string
    imgClassName?: string
}) => (
    <Card className={`overflow-hidden ${className}`}>
        <img src={src} alt={alt} className={`h-full w-full object-cover ${imgClassName}`} />
    </Card>
)

const FeatureGrid = ({ items, inverted = false }: { items: SlideFeature[]; inverted?: boolean }) => {
    return (
        <div className="grid @2xl:grid-cols-2 gap-3 @2xl:gap-4">
            {items.map(({ title, description, icon: Icon }) => (
                <div
                    key={title}
                    className={`rounded-2xl p-4 @2xl:p-5 ${
                        inverted ? 'bg-white/10 backdrop-blur-sm' : 'bg-accent border border-primary/10'
                    }`}
                >
                    {Icon && <Icon className={`mb-3 size-6 ${inverted ? 'text-white' : 'text-purple'}`} />}
                    <h3 className={`mb-2 text-xl ${inverted ? 'text-white' : 'text-primary'}`}>{title}</h3>
                    <p className={`${inverted ? 'text-white/80' : 'text-secondary'} mb-0`}>{description}</p>
                </div>
            ))}
        </div>
    )
}

const ComparisonStatusIcon = ({ status }: { status: ComparisonStatus }) => {
    if (status === 'check') {
        return <IconCheck className="mx-auto size-4 text-green @2xl:size-5" />
    }
    if (status === 'warn') {
        return <IconWarning className="mx-auto size-4 text-yellow @2xl:size-5" />
    }
    return <IconX className="mx-auto size-4 text-red @2xl:size-5" />
}

const HeroImageStack = () => {
    return (
        <div className="relative mt-4 flex flex-1 items-end justify-center overflow-hidden">
            <div className="pointer-events-none absolute inset-x-[10%] bottom-0 h-24 rounded-full bg-white/20 blur-3xl" />
            <ScreenshotCard
                src={GithubCommentImage}
                alt="QA Swarm GitHub comment"
                className="absolute left-[4%] top-14 hidden w-[28%] -rotate-[9deg] opacity-80 @2xl:block"
                imgClassName="object-left-top"
            />
            <ScreenshotCard
                src={GithubCommentImage}
                alt="QA Swarm GitHub comment detail"
                className="absolute right-[4%] top-20 hidden w-[29%] rotate-[9deg] opacity-80 @2xl:block"
                imgClassName="object-right-top"
            />
            <ScreenshotCard
                src={GithubCommentImage}
                alt="QA Swarm GitHub hero screenshot"
                className="relative z-20 w-full max-w-5xl border border-white/25 shadow-[0_30px_120px_rgba(21,12,50,0.35)]"
            />
        </div>
    )
}

const ProductionFlowVisual = () => {
    return (
        <div className="grid flex-1 gap-5 @2xl:grid-cols-[1.02fr_0.98fr]">
            <div className="grid gap-4">
                <Card className="p-5 @2xl:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm uppercase tracking-[0.18em] text-secondary">Diff-based QA</p>
                            <h3 className="mb-0 text-2xl">Tests what changed</h3>
                        </div>
                        <span className="rounded-full bg-red/15 px-3 py-1 text-sm font-semibold text-red">Narrow</span>
                    </div>
                    <div className="space-y-3">
                        {['survey-editor.tsx', 'position-picker.tsx', 'tabs.tsx'].map((file) => (
                            <div
                                key={file}
                                className="flex items-center justify-between rounded-xl border border-primary/10 bg-accent px-4 py-3"
                            >
                                <span className="font-mono text-sm">{file}</span>
                                <span className="text-sm text-secondary">changed</span>
                            </div>
                        ))}
                    </div>
                </Card>
                <FeatureGrid items={productionFlowFeatures.slice(0, 2)} />
            </div>
            <div className="grid gap-4">
                <Card className="p-5 @2xl:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm uppercase tracking-[0.18em] text-secondary">QA Swarm</p>
                            <h3 className="mb-0 text-2xl">Tests what users actually do</h3>
                        </div>
                        <span className="rounded-full bg-purple/15 px-3 py-1 text-sm font-semibold text-purple">
                            Production-informed
                        </span>
                    </div>
                    <div className="space-y-3">
                        {[
                            { label: 'Signup', width: 'w-full' },
                            { label: 'Onboarding', width: 'w-[85%]' },
                            { label: 'Create survey', width: 'w-[72%]' },
                            { label: 'Launch feedback button', width: 'w-[64%]' },
                        ].map(({ label, width }) => (
                            <div key={label} className="rounded-xl border border-primary/10 bg-accent p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="font-semibold">{label}</span>
                                    <span className="text-sm text-secondary">Top path</span>
                                </div>
                                <div className="h-3 rounded-full bg-primary/10">
                                    <div
                                        className={`h-full rounded-full bg-gradient-to-r from-[#7B3EF3] to-[#3D7CFF] ${width}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
                <FeatureGrid items={productionFlowFeatures.slice(2)} />
            </div>
        </div>
    )
}

const DebugVisual = () => {
    return (
        <div className="grid flex-1 gap-5 @2xl:grid-cols-[1fr_1fr]">
            <div className="grid gap-4">
                <Card className="p-5 @2xl:p-6">
                    <p className="mb-2 text-sm uppercase tracking-[0.18em] text-secondary">Agent reasoning</p>
                    <div className="grid gap-3">
                        {[
                            ['Observed failure', 'Position controls rendered for embedded survey'],
                            ['Hypothesis', 'Presentation state leaked between embedded and popover flows'],
                            ['Validation', 'Replay, logs, and editor state all point to the same branch change'],
                        ].map(([label, value]) => (
                            <div key={label} className="rounded-xl border border-primary/10 bg-accent p-4">
                                <p className="mb-1 text-sm font-semibold text-secondary">{label}</p>
                                <p className="mb-0">{value}</p>
                            </div>
                        ))}
                    </div>
                </Card>
                <FeatureGrid items={debugFeatures.slice(0, 2)} />
            </div>
            <div className="grid gap-4">
                <Card className="p-5 @2xl:p-6">
                    <p className="mb-3 text-sm uppercase tracking-[0.18em] text-secondary">Debug workspace</p>
                    <div className="grid gap-3 @2xl:grid-cols-[0.95fr_1.05fr]">
                        <div className="rounded-xl border border-primary/10 bg-accent p-4">
                            <p className="mb-2 font-semibold">Runtime error</p>
                            <div className="rounded-lg bg-dark p-3 text-sm text-white font-mono">
                                Error: position controls rendered for embedded survey
                                <br />
                                at SurveyEditor.handlePresentationChange
                            </div>
                        </div>
                        <ScreenshotCard
                            src={GithubCommentImage}
                            alt="QA Swarm debug evidence"
                            className="h-full"
                            imgClassName="object-top"
                        />
                    </div>
                </Card>
                <FeatureGrid items={debugFeatures.slice(2)} />
            </div>
        </div>
    )
}

const LoopVisual = () => {
    return (
        <div className="grid flex-1 gap-6 @2xl:grid-cols-[1fr_0.95fr]">
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm @2xl:p-8">
                <div className="mb-6 flex items-center gap-3 text-white/80">
                    <QASwarmIcon className="size-8" />
                    <span className="text-lg font-semibold">One loop, not a pile of dashboards</span>
                </div>
                <div className="grid gap-4">
                    {[
                        ['1. Detect', 'Run the product paths users depend on most.'],
                        ['2. Debug', 'Use runtime evidence to explain what broke and why.'],
                        ['3. Fix', 'Patch the branch when the fix is clear enough to verify.'],
                        ['4. Re-test', 'Start over on the newest commit until the PR is actually green.'],
                    ].map(([label, copy]) => (
                        <div
                            key={label}
                            className="flex items-start justify-between gap-4 border-b border-white/15 pb-4 last:border-b-0 last:pb-0"
                        >
                            <h3 className="mb-0 min-w-[110px] text-lg font-semibold text-white @2xl:text-xl">
                                {label}
                            </h3>
                            <p className="mb-0 max-w-[420px] text-white/78">{copy}</p>
                        </div>
                    ))}
                </div>
            </div>
            <FeatureGrid items={loopFeatures} inverted />
        </div>
    )
}

const ResultsVisual = () => {
    return (
        <div className="grid flex-1 gap-5 @2xl:grid-cols-[1.15fr_0.85fr]">
            <ScreenshotCard src={GithubCommentImage} alt="QA Swarm GitHub comment result" />
            <div className="grid gap-4">
                <FeatureGrid items={resultFeatures} />
                <Card className="p-5">
                    <p className="mb-2 text-sm uppercase tracking-[0.18em] text-secondary">Run metadata</p>
                    <div className="grid gap-3">
                        {[
                            ['Preview', 'preview-pr58401.posthog.dev'],
                            ['Branch', 'qa-swarm-landing-page'],
                            ['Verdict', 'PASS with one coverage gap called out honestly'],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="flex items-center justify-between rounded-xl bg-accent px-4 py-3"
                            >
                                <span className="text-secondary">{label}</span>
                                <span className="font-mono text-sm">{value}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}

const HowItWorksVisual = () => {
    return (
        <div className="grid flex-1 gap-5 @2xl:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-3">
                {howItWorksSteps.map((step, index) => (
                    <Card key={step} className="p-5">
                        <div className="flex gap-4">
                            <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-purple text-white font-semibold">
                                {index + 1}
                            </div>
                            <p className="mb-0 pt-1">{step}</p>
                        </div>
                    </Card>
                ))}
            </div>
            <Card className="overflow-hidden bg-[#1F2230] text-white">
                <div className="border-b border-white/10 px-5 py-4">
                    <p className="mb-0 text-sm uppercase tracking-[0.18em] text-white/70">GitHub Actions sketch</p>
                </div>
                <pre className="m-0 h-full overflow-auto p-5 text-xs @2xl:text-sm">
                    <code>{yamlSnippet}</code>
                </pre>
            </Card>
        </div>
    )
}

const ComparisonSummaryVisual = () => {
    return (
        <div className="grid flex-1 gap-5">
            <div className="grid grid-cols-2 gap-3 @2xl:grid-cols-5">
                {competitorCards.map((name, index) => (
                    <div
                        key={name}
                        className={`rounded-full px-4 py-2 text-center text-sm font-semibold @2xl:text-base ${
                            index === competitorCards.length - 1
                                ? 'bg-purple text-white shadow-[0_12px_30px_rgba(123,62,243,0.25)]'
                                : 'border border-primary/10 bg-accent'
                        }`}
                    >
                        {name}
                    </div>
                ))}
            </div>
            <div className="grid flex-1 gap-5 @2xl:grid-cols-2">
                <Card className="p-5 @2xl:p-6">
                    <h3 className="mb-4 text-2xl">
                        A competitor might suit you better <em>(for now)</em> if...
                    </h3>
                    <div className="grid gap-3">
                        {comparisonSummary.them.map((item) => (
                            <div key={item.title} className="border-b border-primary/10 pb-3 last:border-b-0 last:pb-0">
                                <h4 className="mb-1 text-lg">{item.title}</h4>
                                <p className="mb-0 text-secondary">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className="p-5 @2xl:p-6">
                    <h3 className="mb-4 text-2xl">Reasons to choose QA Swarm</h3>
                    <div className="grid gap-3">
                        {comparisonSummary.us.map((item) => (
                            <div key={item.title} className="border-b border-primary/10 pb-3 last:border-b-0 last:pb-0">
                                <h4 className="mb-1 text-lg">{item.title}</h4>
                                <p className="mb-0 text-secondary">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}

const FeatureComparisonVisual = () => {
    const headings = ['QA Swarm', 'Greptile TREX', 'Tusk', 'Checksum', 'QA Wolf']

    return (
        <div className="flex flex-1 flex-col">
            <div className="overflow-hidden rounded-2xl bg-[#2F2D2A] text-white shadow-2xl">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="px-3 py-3 text-left text-base font-semibold @2xl:px-4 @2xl:text-lg">
                                Feature
                            </th>
                            {headings.map((heading) => (
                                <th
                                    key={heading}
                                    className={`px-2 py-3 text-center text-xs font-semibold @2xl:px-3 @2xl:text-sm ${
                                        heading === 'QA Swarm' ? 'bg-white/5' : ''
                                    }`}
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonRows.map((row) => (
                            <tr key={row.feature} className="border-b border-white/10 last:border-b-0">
                                <td className="px-3 py-2.5 align-top @2xl:px-4">
                                    <div className="text-sm font-semibold @2xl:text-[15px]">{row.feature}</div>
                                    <div className="text-[11px] leading-snug text-white/65 @2xl:text-xs">
                                        {row.description}
                                    </div>
                                </td>
                                {row.values.map((value, index) => (
                                    <td
                                        key={`${row.feature}-${index}`}
                                        className={`px-2 py-2.5 text-center ${index === 0 ? 'bg-white/5' : ''}`}
                                    >
                                        <ComparisonStatusIcon status={value} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const EcosystemVisual = () => {
    return <FeatureGrid items={ecosystemFeatures} inverted />
}

const WaitlistVisual = () => {
    return (
        <div className="grid flex-1 items-center gap-6 @2xl:grid-cols-[0.95fr_1.05fr]">
            <div>
                <div className="mb-5 flex items-center gap-3 text-white/90">
                    <QASwarmIcon className="size-10" />
                    <span className="text-2xl font-semibold">QA Swarm</span>
                </div>
                <h3 className="mb-4 text-4xl @2xl:text-6xl">Join the waitlist</h3>
                <p className="mb-6 max-w-xl text-lg text-white/80">
                    A prototype today. A real product soon. Get early access and help shape how the swarm reports,
                    debugs, and closes the loop.
                </p>
                <div className="mb-6 grid gap-3">
                    {waitlistBullets.map((item) => (
                        <div
                            key={item}
                            className="flex items-start gap-3 rounded-2xl bg-white/12 px-4 py-3 backdrop-blur-sm"
                        >
                            <IconCheck className="mt-0.5 size-5 flex-shrink-0 text-white" />
                            <p className="mb-0 text-white/85">{item}</p>
                        </div>
                    ))}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 font-semibold text-purple">
                    Join the waitlist
                    <IconArrowUpRight className="size-4" />
                </div>
            </div>
            <div className="flex justify-center">
                <Card className="w-full max-w-[430px] overflow-hidden bg-white">
                    <img src={CheckHogImage} alt="Hedgehog holding a checkbox" className="mx-auto w-[280px] pt-8" />
                    <div className="px-6 pb-6 text-center">
                        <h4 className="mb-2 text-2xl">Ship with confidence</h4>
                        <p className="mb-0 text-secondary">
                            The end state is simple: every PR gets tested, explained, and checked off before it goes
                            live.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}

const HeroSlide = () => (
    <ThemeSlide theme="purple">
        <div className="flex h-full flex-col items-center">
            <div className="pt-4 @2xl:pt-8">
                <div className="mb-4 flex items-center justify-center gap-3 text-white/90">
                    <QASwarmIcon className="size-10 @2xl:size-12" />
                    <span className="text-3xl font-semibold @2xl:text-4xl">QA Swarm</span>
                </div>
                <h1 className="mx-auto mb-4 max-w-5xl text-center text-5xl font-bold leading-tight text-balance text-white drop-shadow-2xl @2xl:text-7xl">
                    Test every PR until it ships
                </h1>
                <p className="mx-auto mb-0 max-w-3xl text-center text-lg leading-relaxed text-white/80 @2xl:text-2xl">
                    A fleet of AI agents that test every PR, debug with live production data, and loop until your code
                    ships green.
                </p>
            </div>
            <HeroImageStack />
        </div>
    </ThemeSlide>
)

const ProductionFlowsSlide = () => (
    <ThemeSlide theme="white">
        <SectionIntro
            eyebrow="Production-informed coverage"
            title="Tests what your users actually do"
            description="Other tools brute-force the environment. QA Swarm reads the PR, generates a test plan, and picks the services and paths that actually matter."
        />
        <ProductionFlowVisual />
    </ThemeSlide>
)

const DebugSlide = () => (
    <ThemeSlide theme="white">
        <SectionIntro
            eyebrow="Grounded debugging"
            title="Agents debug as they test"
            description="Each agent has live access to logs, errors, events, replay, and its own LLM traces. It forms a hypothesis, tests it, and shows the work."
        />
        <DebugVisual />
    </ThemeSlide>
)

const LoopSlide = () => (
    <ThemeSlide theme="blue">
        <SectionIntro
            eyebrow="Find, fix, re-test"
            title="Loops until green"
            description="The swarm runs scenarios in parallel, commits fixes when it can, and restarts against the newest push instead of wasting time on stale runs."
            inverted
        />
        <LoopVisual />
    </ThemeSlide>
)

const ResultsSlide = () => (
    <ThemeSlide theme="white">
        <SectionIntro
            eyebrow="Output where engineers already work"
            title="Results where engineers work"
            description="PR comments with evidence. A hosted preview. Slack updates. A PostHog Code status row. The artifacts land where review already happens."
        />
        <ResultsVisual />
    </ThemeSlide>
)

const HowItWorksSlide = () => (
    <ThemeSlide theme="white">
        <SectionIntro
            eyebrow="Technical flow"
            title="How it works"
            description="This prototype run used a forced exception after three MCP pagination steps so the agent had something real to detect, report, and auto-fix."
        />
        <HowItWorksVisual />
    </ThemeSlide>
)

const ComparisonSummarySlide = () => (
    <ThemeSlide theme="white">
        <SectionIntro
            eyebrow="Honest comparison"
            title="PostHog vs..."
            description="The right fit if the team wants production-informed QA inside PostHog, not another generic testing sidecar."
            compact
        />
        <ComparisonSummaryVisual />
    </ThemeSlide>
)

const FeatureComparisonSlide = () => (
    <ThemeSlide theme="white">
        <SectionIntro
            eyebrow="Feature comparison"
            title="Feature comparison"
            description="Compact by design so the whole matrix fits on the standard presentation canvas."
            compact
        />
        <FeatureComparisonVisual />
    </ThemeSlide>
)

const EcosystemSlide = () => (
    <ThemeSlide theme="blue">
        <SectionIntro
            eyebrow="10x better in the PostHog ecosystem"
            title="10x better in the PostHog ecosystem"
            description="QA Swarm gets disproportionately better when the rest of PostHog is already there."
            inverted
        />
        <EcosystemVisual />
    </ThemeSlide>
)

const WaitlistSlide = () => (
    <ThemeSlide theme="purple">
        <WaitlistVisual />
    </ThemeSlide>
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
            { slug: 'how-it-works', name: 'How it works', component: HowItWorksSlide },
            { slug: 'comparison-summary', name: 'PostHog vs...', component: ComparisonSummarySlide },
            { slug: 'feature-comparison', name: 'Feature comparison', component: FeatureComparisonSlide },
            { slug: 'ecosystem', name: '10x better', component: EcosystemSlide },
            { slug: 'waitlist', name: 'Join the waitlist', component: WaitlistSlide },
        ],
        exclude: [
            'overview',
            'customers',
            'features',
            'posthog-on-posthog',
            'videos',
            'answers',
            'pricing',
            'docs',
            'pairs-with',
            'getting-started',
        ],
        order: [
            'hero',
            'production-flows',
            'debug',
            'loop',
            'results',
            'how-it-works',
            'comparison-summary',
            'feature-comparison',
            'ecosystem',
            'waitlist',
        ],
    })

    return <SlidesTemplate productHandle={PRODUCT_HANDLE} data={data} slideConfig={slides} />
}
