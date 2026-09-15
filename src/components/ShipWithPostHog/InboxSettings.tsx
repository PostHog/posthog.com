import React, { useState } from 'react'
import {
    IconChevronRight,
    IconDatabase,
    IconEye,
    IconGear,
    IconGithub,
    IconGraph,
    IconList,
    IconMessage,
    IconPulse,
    IconRocket,
    IconSparkles,
    IconSupport,
    IconWarning,
} from '@posthog/icons'
import { Hint } from './prose'

/**
 * The Settings tab.
 *
 * Everything here is real configuration from project 2, and unusually for this page it
 * needed almost no scrubbing: the sources, their on/off states, the thresholds, the
 * GitHub connection and the billing-period PR count carry no customer data. The two
 * identifying details are kept deliberately – "Connected to PostHog" and who created the
 * connection – for the same reason the Reports tab publishes real reviewer names.
 *
 * What's genuinely interactive: every toggle, and both threshold pickers. They're local
 * state, so they move and stay moved. What isn't: Connect / Disconnect / Manage on
 * GitHub, the per-source chevrons, and the two collapsible rows under PR generation –
 * each carries a `Hint` saying what it would do, as the rest of the page does.
 */

interface SourceRow {
    name: string
    description: string
    Icon: React.ComponentType<{ className?: string }>
    color: string
    /** Renders an Alpha pill beside the name. */
    alpha?: boolean
    /** Right-hand detail, e.g. "35 of 60 scanners on". */
    detail?: string
    /** A source still backfilling shows a badge rather than a switch. */
    syncing?: boolean
    /** Not connected: offers a Connect button in place of the switch. */
    connectable?: boolean
    /** Initial switch position. */
    on?: boolean
}

const POSTHOG_SOURCES: SourceRow[] = [
    {
        name: 'Error tracking',
        description: 'New errors, regressions, and spikes in your app',
        Icon: IconWarning,
        color: 'text-red',
        detail: '3 of 3 signal types on',
        on: true,
    },
    {
        name: 'Support',
        description: 'Problems customers raise in support',
        Icon: IconSupport,
        color: 'text-blue',
        on: true,
    },
    {
        name: 'Replay vision',
        description: 'UX problems your scanners find while watching recordings',
        Icon: IconEye,
        color: 'text-yellow',
        detail: '35 of 60 scanners on',
        on: true,
    },
    {
        name: 'AI observability',
        description: 'Changes in the quality and behavior of your AI features',
        Icon: IconSparkles,
        color: 'text-purple',
        on: true,
    },
    {
        name: 'Product analytics',
        description: 'Unexpected shifts in your product metrics',
        Icon: IconGraph,
        color: 'text-blue',
        alpha: true,
        on: true,
    },
    {
        name: 'Health checks',
        description: 'Missing events, proxy gaps, and outdated SDKs',
        Icon: IconPulse,
        color: 'text-red',
        on: true,
    },
]

const EXTERNAL_SOURCES: SourceRow[] = [
    { name: 'GitHub issues', description: 'Issues filed in GitHub', Icon: IconGithub, color: 'text-primary', on: true },
    {
        name: 'GitHub CI',
        description: 'Flaky checks and slowing GitHub Actions workflows',
        Icon: IconGear,
        color: 'text-yellow',
        alpha: true,
        syncing: true,
        on: true,
    },
    { name: 'Linear', description: 'Issues tracked in Linear', Icon: IconList, color: 'text-muted', connectable: true },
    { name: 'Zendesk', description: 'Incoming Zendesk tickets', Icon: IconSupport, color: 'text-green', on: true },
    {
        name: 'pganalyze',
        description: 'Slow Postgres queries and bad indexes',
        Icon: IconDatabase,
        color: 'text-blue',
        on: true,
    },
]

const PROJECT_THRESHOLDS = ['P0', 'P1+', 'P2+', 'P3+', 'All']
const MY_THRESHOLDS = ['Default', 'P0', 'P1+', 'P2+', 'P3+', 'All']

/** The switch. Real local state, so it moves when you click it. */
const Switch = ({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }): JSX.Element => (
    <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={onToggle}
        className={`flex h-5 w-9 shrink-0 items-center rounded-full px-0.5 transition-colors ${
            on ? 'bg-red dark:bg-yellow' : 'bg-border'
        }`}
    >
        <span className={`size-4 rounded-full bg-white transition-transform ${on ? 'translate-x-4' : ''}`} />
    </button>
)

/** A section card, as every block on this tab is one. */
const Card = ({
    title,
    description,
    children,
}: {
    title: string
    description: string
    children: React.ReactNode
}): JSX.Element => (
    <section className="rounded-lg border border-primary bg-primary p-4 @md:p-5">
        <h3 className="m-0 text-base font-bold text-primary">{title}</h3>
        <p className="m-0 mt-0.5 text-sm text-secondary">{description}</p>
        <div className="mt-3">{children}</div>
    </section>
)

/** One segmented threshold picker. Real local state. */
const Segmented = ({
    options,
    value,
    onChange,
    label,
}: {
    options: string[]
    value: string
    onChange: (next: string) => void
    label: string
}): JSX.Element => (
    <div className="flex flex-wrap overflow-hidden rounded border border-primary" role="group" aria-label={label}>
        {options.map((option) => (
            <button
                key={option}
                type="button"
                onClick={() => onChange(option)}
                aria-pressed={value === option}
                className={`min-w-11 border-r border-primary px-2 py-1 text-xs font-semibold transition-colors last:border-r-0 ${
                    value === option
                        ? 'bg-red text-white dark:bg-yellow dark:text-primary'
                        : 'bg-primary text-secondary hover:text-primary'
                }`}
            >
                {option}
            </button>
        ))}
    </div>
)

const SourceList = ({ heading, rows }: { heading: string; rows: SourceRow[] }): JSX.Element => {
    const [on, setOn] = useState<Record<string, boolean>>(() =>
        Object.fromEntries(rows.map((row) => [row.name, !!row.on]))
    )

    return (
        <>
            <h4 className="m-0 mb-1 mt-3 text-xs font-semibold uppercase tracking-wide text-secondary first:mt-0">
                {heading}
            </h4>
            <ul className="m-0 flex list-none flex-col p-0">
                {rows.map((row) => (
                    <li key={row.name} className="flex items-center gap-3 border-b border-primary py-2.5 last:border-0">
                        <row.Icon className={`size-4 shrink-0 ${row.color}`} />
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-sm font-semibold text-primary">{row.name}</span>
                                {row.alpha && (
                                    <Hint
                                        trigger={
                                            <span className="rounded-full border border-purple/40 bg-purple/10 px-1.5 py-0.5 text-[10px] font-semibold text-purple">
                                                Alpha
                                            </span>
                                        }
                                    >
                                        Early access. It files reports, but its bar is still moving.
                                    </Hint>
                                )}
                            </div>
                            <p className="m-0 text-xs leading-snug text-secondary">{row.description}</p>
                        </div>

                        {row.detail && (
                            <span className="hidden shrink-0 text-xs text-secondary @md:block">{row.detail}</span>
                        )}
                        {row.syncing && (
                            <Hint
                                trigger={
                                    <span className="shrink-0 rounded-full border border-yellow/40 bg-yellow/10 px-1.5 py-0.5 text-[10px] font-semibold text-yellow">
                                        Syncing
                                    </span>
                                }
                            >
                                Backfilling its history. It starts filing once it knows what normal looks like.
                            </Hint>
                        )}

                        {/* A source that isn't connected offers Connect where its switch would be. */}
                        {row.connectable ? (
                            <Hint
                                trigger={
                                    <span className="shrink-0 rounded border border-primary bg-accent px-2 py-1 text-xs font-semibold text-primary">
                                        Connect
                                    </span>
                                }
                            >
                                Not connected. Connecting it lets agents read issues from it as signals.
                            </Hint>
                        ) : (
                            <Switch
                                on={!!on[row.name]}
                                onToggle={() => setOn((prev) => ({ ...prev, [row.name]: !prev[row.name] }))}
                                label={`${row.name} source`}
                            />
                        )}

                        <Hint trigger={<IconChevronRight className="size-4 shrink-0 text-secondary" />}>
                            Opens this source's own settings: which signal types it watches, and how sensitive it is.
                        </Hint>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default function InboxSettings(): JSX.Element {
    const [prGeneration, setPrGeneration] = useState(true)
    const [projectThreshold, setProjectThreshold] = useState('All')
    const [myThreshold, setMyThreshold] = useState('Default')
    const [notifyTeam, setNotifyTeam] = useState(false)
    const [notifyMe, setNotifyMe] = useState(false)

    return (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-4 @md:px-6">
            <Card
                title="Signal sources"
                description="Each source watches for signals, and spins up an agent to look into them."
            >
                <SourceList heading="PostHog data" rows={POSTHOG_SOURCES} />
                <SourceList heading="External sources" rows={EXTERNAL_SOURCES} />
            </Card>

            <Card
                title="Autonomy"
                description="How much agents do on their own: opening pull requests, and how many reports arrive each day."
            >
                <div className="flex items-center gap-3">
                    <IconRocket className="size-4 shrink-0 text-yellow" />
                    <div className="min-w-0 flex-1">
                        <p className="m-0 text-sm font-semibold text-primary">PR generation</p>
                        <p className="m-0 text-xs text-secondary">Agents open PRs for actionable reports.</p>
                    </div>
                    <Switch on={prGeneration} onToggle={() => setPrGeneration(!prGeneration)} label="PR generation" />
                </div>

                <div className="mt-3">
                    <p className="m-0 mb-1 text-xs text-secondary">Project threshold</p>
                    <Segmented
                        options={PROJECT_THRESHOLDS}
                        value={projectThreshold}
                        onChange={setProjectThreshold}
                        label="Project threshold"
                    />
                </div>

                <div className="mt-3">
                    <p className="m-0 mb-1 text-xs text-secondary">My threshold</p>
                    <Segmented
                        options={MY_THRESHOLDS}
                        value={myThreshold}
                        onChange={setMyThreshold}
                        label="My threshold"
                    />
                    <p className="m-0 mt-1 text-xs text-secondary">
                        Overrides the project threshold for reports that suggest you as reviewer. It applies across all
                        your projects.
                    </p>
                </div>

                {['Base branch overrides', 'Daily report limit'].map((row) => (
                    <Hint
                        key={row}
                        trigger={
                            <div className="mt-2 flex items-center justify-between gap-2 rounded border border-primary bg-accent px-2.5 py-1.5 text-sm text-primary">
                                {row}
                                <IconChevronRight className="size-4 shrink-0 text-secondary" />
                            </div>
                        }
                    >
                        {row === 'Base branch overrides'
                            ? 'Which branch agents open pull requests against, per repository.'
                            : 'A ceiling on how many reports can arrive in a day, so a noisy source cannot flood you.'}
                    </Hint>
                ))}
            </Card>

            <Card
                title="Code access"
                description="Connect GitHub so agents can read repositories and open pull requests."
            >
                <div className="flex flex-wrap items-center gap-3 rounded-md border border-primary bg-accent p-3">
                    <IconGithub className="size-8 shrink-0 text-primary" />
                    <div className="min-w-0 flex-1">
                        <p className="m-0 text-sm text-primary">
                            <span className="font-semibold underline">Connected</span> to PostHog
                        </p>
                        <p className="m-0 text-xs text-secondary">Created 9 months ago by David Newell</p>
                        <p className="m-0 text-xs text-secondary">All repositories in PostHog (725)</p>
                    </div>
                    <Hint
                        trigger={
                            <span className="shrink-0 rounded border border-red/40 px-2 py-1 text-xs font-semibold text-red">
                                Disconnect
                            </span>
                        }
                    >
                        Revokes access. Agents stop reading code and stop opening pull requests.
                    </Hint>
                </div>
                <Hint
                    trigger={
                        <span className="mt-2 inline-flex items-center gap-1.5 rounded border border-primary bg-primary px-2 py-1 text-sm font-semibold text-primary">
                            <IconGithub className="size-4 text-secondary" />
                            Manage on GitHub
                        </span>
                    }
                >
                    Add the PostHog app to another GitHub account, or change which repositories it can see.
                </Hint>
            </Card>

            <Card
                title="Notifications"
                description="Post reports to a Slack channel, and get pinged when you're a suggested reviewer."
            >
                {[
                    {
                        name: 'Notify the whole team',
                        description:
                            'Post every report to one channel, whether or not a reviewer is suggested. PostHog must be in the channel.',
                        on: notifyTeam,
                        toggle: () => setNotifyTeam(!notifyTeam),
                    },
                    {
                        name: 'Notify me directly',
                        description:
                            "When you're a suggested reviewer, get pinged in your own channel. PostHog must be in the channel.",
                        on: notifyMe,
                        toggle: () => setNotifyMe(!notifyMe),
                    },
                ].map((row) => (
                    <div key={row.name} className="flex items-start gap-3 border-b border-primary py-2.5 last:border-0">
                        <IconMessage className="mt-0.5 size-4 shrink-0 text-secondary" />
                        <div className="min-w-0 flex-1">
                            <p className="m-0 text-sm font-semibold text-primary">{row.name}</p>
                            <p className="m-0 text-xs leading-snug text-secondary">
                                {row.description} Invite it with <code className="font-mono">/invite @PostHog</code>.
                            </p>
                        </div>
                        <Switch on={row.on} onToggle={row.toggle} label={row.name} />
                    </div>
                ))}
            </Card>

            <Card title="Usage" description="Pull requests agents opened this billing period.">
                <p className="m-0 text-sm font-semibold text-primary">Pull requests</p>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-accent">
                    <div className="h-full w-2/3 rounded-full bg-red dark:bg-yellow" />
                </div>
                <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2 text-xs text-secondary">
                    <Hint
                        trigger={
                            <span>
                                <span className="font-semibold text-primary">1931</span> PRs created
                            </span>
                        }
                    >
                        Real, and from this project's own billing period. This is the loop this page is about, running
                        on PostHog itself.
                    </Hint>
                    <span>Resets Sep 18</span>
                </div>
            </Card>
        </div>
    )
}
