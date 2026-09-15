import React, { useState } from 'react'
import {
    IconArrowLeft,
    IconArrowUpRight,
    IconChevronRight,
    IconClock,
    IconPencil,
    IconRefresh,
    IconGear,
} from '@posthog/icons'
import { Hint } from './prose'
import PriorityBadge from './PriorityBadge'
import { RUN_META, type RunOutcome, type Scout, type ScoutRun } from './scoutData'

/*
 * Shares the detail view's action-pill look on the Reports side, so the two detail views
 * read as the same surface.
 */
const ACTION_BUTTON_CLASS =
    'inline-flex items-center gap-1.5 rounded border border-primary bg-primary px-2 py-1 text-sm font-semibold text-primary transition-colors hover:bg-accent'

/** One cell of the stat strip under the description. */
const Stat = ({ value, label, hint }: { value: React.ReactNode; label: string; hint: string }): JSX.Element => (
    <Hint
        trigger={
            <div className="min-w-0 flex-1 px-3 py-2">
                <p className="m-0 truncate text-sm font-bold text-primary @md:text-base">{value}</p>
                <p className="m-0 truncate text-[10px] font-semibold uppercase tracking-wide text-secondary">{label}</p>
            </div>
        }
    >
        {hint}
    </Hint>
)

/** One run, collapsed to its lead line until you open it. */
const RunRow = ({ run }: { run: ScoutRun }): JSX.Element => {
    const [open, setOpen] = useState(false)
    const meta = RUN_META[run.outcome]
    const hasDetail = !!run.bullets?.length

    return (
        <div className="border-b border-primary py-2 last:border-0">
            <button
                type="button"
                onClick={() => hasDetail && setOpen(!open)}
                aria-expanded={hasDetail ? open : undefined}
                className={`flex w-full items-center gap-2 text-left ${hasDetail ? '' : 'cursor-default'}`}
            >
                {hasDetail ? (
                    <IconChevronRight
                        className={`size-3.5 shrink-0 text-secondary transition-transform ${open ? 'rotate-90' : ''}`}
                    />
                ) : (
                    <span className="size-3.5 shrink-0" aria-hidden />
                )}
                <meta.Icon className={`size-3.5 shrink-0 ${meta.color}`} />
                <span className="min-w-0 truncate text-xs text-secondary">
                    {run.when} · {run.duration}
                </span>
                {run.badge && (
                    <span className="ml-auto shrink-0 rounded-full border border-yellow/40 bg-yellow/10 px-1.5 py-0.5 text-[11px] font-semibold text-yellow">
                        {run.badge}
                    </span>
                )}
            </button>
            <p className="m-0 mt-1 pl-[1.375rem] text-sm leading-snug text-primary">{run.summary}</p>
            {open && run.bullets && (
                <ul className="m-0 mt-1.5 flex list-disc flex-col gap-1 pl-9 text-xs text-secondary">
                    {run.bullets.map((bullet, index) => (
                        // Index keys are correct here: bullets are static authored data.
                        <li key={index}>{bullet}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

const FILTERS: { key: RunOutcome | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'emitted', label: 'Emitted' },
    { key: 'quiet', label: 'Quiet' },
    { key: 'failed', label: 'Failed' },
]

/**
 * A scout's own page: what it watches, how often it runs, what it filed, what it has been
 * told, and what it has learned.
 *
 * The run filter is real. Its counts are the scout's genuine last-25 totals, which is why
 * a pill's count can exceed the number of runs listed under it – the runs here are the
 * ones captured from the app, not all 25. `scoutData.tsx` says why.
 */
export default function ScoutDetail({ scout, onBack }: { scout: Scout; onBack: () => void }): JSX.Element {
    const [filter, setFilter] = useState<RunOutcome | 'all'>('all')
    const [expanded, setExpanded] = useState(false)

    const runs = filter === 'all' ? scout.runs : scout.runs.filter((run) => run.outcome === filter)
    const countFor = (key: RunOutcome | 'all'): number => (key === 'all' ? scout.stats.runs : scout.counts[key])

    return (
        <div className="p-3 @md:p-5">
            <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:text-primary"
            >
                <IconArrowLeft className="size-4" />
                Scouts
            </button>

            {/* Title row */}
            <div className="mt-3 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <h3 className="m-0 text-lg font-bold leading-tight text-primary @md:text-xl">{scout.name}</h3>
                    <Hint
                        trigger={
                            <span className="shrink-0 rounded-full border border-orange/40 bg-orange/10 px-1.5 py-0.5 text-xs font-semibold text-orange">
                                {scout.kind}
                            </span>
                        }
                    >
                        {scout.kind === 'Canonical'
                            ? 'Ships with PostHog. Every project gets it.'
                            : 'Written by someone on the team for this project.'}
                    </Hint>
                    <Hint
                        trigger={
                            <span className="shrink-0 rounded-full border border-green/40 bg-green/10 px-1.5 py-0.5 text-xs font-semibold text-green">
                                On patrol
                            </span>
                        }
                    >
                        Running on its schedule and filing what clears its bar.
                    </Hint>
                    {scout.owner && (
                        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-secondary">
                            <span className="inline-flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-primary">
                                {scout.owner.charAt(0)}
                            </span>
                            {scout.owner}
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2">
                    {[
                        {
                            label: 'Run now',
                            Icon: IconRefresh,
                            hint: 'Runs the scout immediately instead of waiting for its schedule.',
                        },
                        {
                            label: 'Settings',
                            Icon: IconGear,
                            hint: 'Its schedule, what it watches, and who its reports route to.',
                        },
                        {
                            label: 'View skill',
                            Icon: IconArrowUpRight,
                            hint: 'A scout is a skill in your project. This opens the one behind it.',
                        },
                    ].map(({ label, Icon, hint }) => (
                        <Hint
                            key={label}
                            trigger={
                                <button type="button" className={ACTION_BUTTON_CLASS}>
                                    <Icon className="size-4 text-secondary" />
                                    {label}
                                </button>
                            }
                        >
                            {hint}
                        </Hint>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div className="mt-2">
                <p className={`m-0 text-sm leading-relaxed text-secondary ${expanded ? '' : 'line-clamp-2'}`}>
                    {scout.description}
                </p>
                <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    className="mt-0.5 text-sm font-semibold text-secondary hover:text-primary"
                >
                    {expanded ? 'Show less' : 'Show more'}
                </button>
            </div>

            {/* Stat strip */}
            <div className="mt-3 flex flex-wrap divide-x divide-primary overflow-hidden rounded-md border border-primary bg-primary">
                <Stat
                    value={scout.cadence}
                    label="Cadence"
                    hint="How often it patrols. Scouts run on a schedule, not on your data changing."
                />
                <Stat value={scout.nextRun} label="Next run" hint="When it next goes looking." />
                <Stat
                    value={scout.stats.runs}
                    label="Runs · last 25"
                    hint="A scout's history window is its last 25 runs, so scouts on different schedules stay comparable."
                />
                <Stat
                    value={scout.stats.reportsFiled}
                    label="Reports filed"
                    hint="Reports it wrote itself, over those runs."
                />
                <Stat
                    value={scout.stats.reportsEdited}
                    label="Reports edited"
                    hint="Existing reports it added evidence to instead of filing a duplicate."
                />
                <Stat
                    value={scout.stats.learned}
                    label="Learned"
                    hint="Durable memories it keeps: patterns, dedupe pointers, and rules about what to ignore."
                />
                <Stat
                    value={scout.stats.told}
                    label="Told"
                    hint="Steering notes people have left it. Notes are folded into what it has learned on the next run."
                />
            </div>

            {/* Body: runs left, memory right */}
            <div className="mt-4 grid gap-4 @3xl:grid-cols-[1fr_19rem]">
                <div className="min-w-0">
                    <h4 className="m-0 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                        Last 25 runs
                    </h4>
                    <p className="m-0 mt-0.5 text-sm text-primary">{scout.runSummary}</p>

                    {!!scout.reports?.length && (
                        <>
                            <h4 className="m-0 mt-4 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                                Reports it filed or added to
                            </h4>
                            <div className="mt-1.5 flex flex-col gap-2">
                                {scout.reports.map((report) => (
                                    <div
                                        key={report.title}
                                        className="rounded-md border border-primary bg-primary p-2.5"
                                    >
                                        <div className="flex items-start gap-2">
                                            <PriorityBadge priority={report.priority} />
                                            <div className="min-w-0 flex-1">
                                                <p className="m-0 text-sm font-semibold leading-snug text-primary">
                                                    {report.scope && (
                                                        <span className="mr-1.5 font-mono text-xs font-normal text-secondary">
                                                            {report.scope}
                                                        </span>
                                                    )}
                                                    {report.title}
                                                </p>
                                                <p className="m-0 mt-0.5 line-clamp-2 text-xs leading-snug text-secondary">
                                                    {report.summary}
                                                </p>
                                                <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
                                                    <span className="rounded-full border border-green/40 bg-green/10 px-1.5 py-0.5 font-semibold text-green">
                                                        {report.authorship}
                                                    </span>
                                                    <span
                                                        className={`rounded-full border px-1.5 py-0.5 font-semibold ${
                                                            report.status === 'Ready'
                                                                ? 'border-green/40 bg-green/10 text-green'
                                                                : 'border-orange/40 bg-orange/10 text-orange'
                                                        }`}
                                                    >
                                                        {report.status}
                                                    </span>
                                                    <span className="ml-auto text-secondary">{report.timeAgo}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Runs, with the app's All / Emitted / Quiet / Failed filter */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <h4 className="m-0 text-[10px] font-semibold uppercase tracking-wide text-secondary">Runs</h4>
                        <div className="flex shrink-0 overflow-hidden rounded border border-primary text-xs">
                            {FILTERS.map(({ key, label }) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setFilter(key)}
                                    aria-pressed={filter === key}
                                    className={`px-2 py-1 font-semibold transition-colors ${
                                        filter === key
                                            ? 'bg-accent text-primary'
                                            : 'bg-primary text-secondary hover:text-primary'
                                    }`}
                                >
                                    {label} {countFor(key)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-1 rounded-md border border-primary bg-primary px-2.5">
                        {runs.length ? (
                            runs.map((run, index) => <RunRow key={`${run.when}-${index}`} run={run} />)
                        ) : (
                            <p className="m-0 py-6 text-center text-xs text-secondary">
                                None of the runs on this page were {filter}. Its last 25 had {countFor(filter)}.
                            </p>
                        )}
                    </div>
                </div>

                {/* Memory rail */}
                <aside className="@container flex min-w-0 flex-col gap-4">
                    <div>
                        <div className="flex items-center justify-between gap-2">
                            <h4 className="m-0 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                                What you've told it
                            </h4>
                            <Hint
                                trigger={
                                    <span className="inline-flex shrink-0 items-center gap-1 rounded border border-primary bg-primary px-1.5 py-0.5 text-xs font-semibold text-primary">
                                        <IconPencil className="size-3 text-secondary" />
                                        Tell it something
                                    </span>
                                }
                            >
                                Leave a note and the scout folds it into what it has learned on its next run.
                            </Hint>
                        </div>
                        {scout.notes?.length ? (
                            <div className="mt-1.5 flex flex-col gap-2">
                                {scout.notes.map((note, index) => (
                                    // Index keys are correct here: notes are static authored data.
                                    <div key={index} className="rounded-md border border-primary bg-primary p-2.5">
                                        <div className="flex flex-wrap items-center gap-1.5 text-xs">
                                            <span className="rounded-full border border-yellow/40 bg-yellow/10 px-1.5 py-0.5 font-semibold text-yellow">
                                                {note.origin}
                                            </span>
                                            <span className="text-secondary">{note.age}</span>
                                            <span className="text-secondary/80">{note.expires}</span>
                                        </div>
                                        <p className="m-0 mt-1.5 text-xs leading-snug text-secondary">{note.body}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="m-0 mt-1.5 rounded-md border border-primary bg-primary px-3 py-6 text-center text-xs text-secondary">
                                Nothing yet. Leave a note to steer what this scout looks at, or dismiss one of its
                                reports with a reason, and that reaches it too.
                            </p>
                        )}
                    </div>

                    {!!scout.learned?.length && (
                        <div>
                            <div className="flex items-center justify-between gap-2">
                                <h4 className="m-0 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                                    What it has learned
                                </h4>
                                <span className="shrink-0 text-xs text-secondary">
                                    {scout.stats.learned} {scout.stats.learned === 1 ? 'entry' : 'entries'}
                                </span>
                            </div>
                            <div className="mt-1.5 flex flex-col gap-2">
                                {scout.learned.map((memory) => (
                                    <div key={memory.key} className="rounded-md border border-primary bg-primary p-2.5">
                                        <div className="flex flex-wrap items-center gap-1.5 text-xs">
                                            <span className="rounded border border-primary bg-accent px-1.5 py-0.5 font-mono text-[11px] text-secondary">
                                                {memory.tag}
                                            </span>
                                            <span className="min-w-0 truncate font-mono text-[11px] text-primary">
                                                {memory.key}
                                            </span>
                                            <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-secondary">
                                                <IconClock className="size-3" />
                                                {memory.when}
                                            </span>
                                        </div>
                                        <p className="m-0 mt-1.5 text-xs leading-snug text-secondary">{memory.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    )
}
