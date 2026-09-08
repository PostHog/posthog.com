import React, { useMemo, useState } from 'react'
import { IconChevronDown, IconSearch } from '@posthog/icons'
import { Hint } from './prose'
import { RUN_META, SCOUT_TOTALS, SCOUTS, type Scout } from './scoutData'

/**
 * The Scouts tab's list.
 *
 * The search is real – it matches a scout's name, owner, and description. The three
 * dropdowns beside it (All scouts / Any tag / Any owner / Sort) are chrome with `Hint`
 * tooltips, like the search box on the Reports tab: four scouts don't need faceting, and
 * a menu with one useful option in it reads worse than no menu.
 */

/** One block per captured run, coloured by what the run did. */
const RunStrip = ({ scout }: { scout: Scout }): JSX.Element => (
    <Hint
        trigger={
            <span className="flex shrink-0 items-center gap-0.5" aria-label={`${scout.runs.length} recent runs`}>
                {scout.runs.map((run, index) => (
                    <span
                        // Index keys are correct here: runs are static authored data.
                        key={index}
                        className={`h-3.5 w-1.5 rounded-sm ${RUN_META[run.outcome].block}`}
                    />
                ))}
            </span>
        }
    >
        Each block is one run: blue filed or edited a report, grey looked and found nothing worth your time. Of its last
        25, {scout.counts.emitted} emitted and {scout.counts.quiet} were quiet.
    </Hint>
)

const ScoutCard = ({ scout, onOpen }: { scout: Scout; onOpen: () => void }): JSX.Element => (
    <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onOpen()
            }
        }}
        aria-label={`Open scout ${scout.name}`}
        className="group cursor-pointer rounded-md border border-primary bg-primary p-3 transition-colors hover:border-secondary hover:bg-accent focus-visible:border-secondary focus-visible:outline-none @md:p-4"
    >
        <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <Hint
                        trigger={
                            <span
                                className={`size-2 shrink-0 rounded-full ${
                                    scout.state === 'Working' ? 'bg-green' : 'bg-blue'
                                }`}
                            />
                        }
                    >
                        {scout.state === 'Working'
                            ? 'On patrol with its baselines established.'
                            : 'Still settling in. It runs, but it is learning what normal looks like before it files much.'}
                    </Hint>
                    <span className="min-w-0 truncate text-sm font-semibold text-primary">{scout.name}</span>
                </div>
                <p className="m-0 mt-1 line-clamp-1 text-xs leading-snug text-secondary">{scout.lastRun}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-secondary">
                    <span>{scout.state}</span>
                    <span aria-hidden>·</span>
                    <span>{scout.cadence}</span>
                    <span aria-hidden>·</span>
                    <span>Next run {scout.nextRun}</span>
                </div>
            </div>

            {/* Run strip and the on/off switch, as the app has them */}
            <div className="flex shrink-0 items-center gap-3 self-center border-l border-primary pl-3">
                <span className="hidden @md:block">
                    <RunStrip scout={scout} />
                </span>
                <Hint
                    trigger={
                        <span className="flex h-4 w-7 shrink-0 items-center rounded-full bg-red px-0.5 dark:bg-yellow">
                            <span className="ml-auto size-3 rounded-full bg-white" />
                        </span>
                    }
                >
                    Pause a scout and it stops patrolling without losing what it has learned.
                </Hint>
            </div>
        </div>
    </div>
)

export default function ScoutList({ onOpen }: { onOpen: (id: string) => void }): JSX.Element {
    const [query, setQuery] = useState('')

    const visible = useMemo(() => {
        const needle = query.trim().toLowerCase()
        if (!needle) return SCOUTS
        return SCOUTS.filter((scout) =>
            [scout.name, scout.owner ?? '', scout.description].join(' ').toLowerCase().includes(needle)
        )
    }, [query])

    return (
        <>
            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-2 px-4 py-3 @md:px-6">
                <span className="inline-flex h-8 min-w-[10rem] flex-1 items-center gap-1.5 rounded border border-primary bg-primary px-2.5 text-sm text-primary @md:max-w-xs">
                    <IconSearch className="size-3.5 shrink-0 text-secondary" />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search scouts…"
                        aria-label="Search scouts"
                        className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-primary placeholder:text-secondary focus:outline-none"
                    />
                </span>
                {/* Chrome: four scouts don't need faceting. */}
                {[
                    {
                        label: 'All scouts',
                        hint: 'Filter to the scouts that are on patrol, paused, or still settling in.',
                    },
                    { label: 'Any tag', hint: 'Scouts can be tagged by the surface they watch.' },
                    {
                        label: 'Any owner',
                        hint: 'Custom scouts belong to whoever wrote them. Canonical ones ship with PostHog.',
                    },
                    {
                        label: 'Sort: Name',
                        hint: 'Sort by name, by how recently a scout ran, or by how much it has filed.',
                    },
                ].map((menu) => (
                    <Hint
                        key={menu.label}
                        trigger={
                            <span className="hidden h-8 shrink-0 items-center gap-1.5 rounded border border-primary bg-primary px-2.5 text-sm text-secondary @lg:inline-flex">
                                {menu.label}
                                <IconChevronDown className="size-3.5 text-secondary/70" />
                            </span>
                        }
                    >
                        {menu.hint}
                    </Hint>
                ))}
            </div>

            {/* Project totals */}
            <div className="mx-auto max-w-4xl px-4 @md:px-6">
                <Hint
                    trigger={
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-secondary">
                            <span>
                                <span className="font-semibold text-orange">{SCOUT_TOTALS.pausingSoon}</span> pausing
                                soon
                            </span>
                            <span>
                                <span className="font-semibold text-red">{SCOUT_TOTALS.recentlyPaused}</span> recently
                                paused
                            </span>
                            <span>
                                <span className="font-semibold text-primary">{SCOUT_TOTALS.onPatrol}</span> on patrol
                            </span>
                            <span>
                                <span className="font-semibold text-primary">{SCOUT_TOTALS.runs}</span> runs
                            </span>
                            <span>
                                <span className="font-semibold text-primary">{SCOUT_TOTALS.reportsFiled}</span> reports
                                filed
                            </span>
                            <span>
                                <span className="font-semibold text-primary">{SCOUT_TOTALS.reportsEdited}</span> reports
                                edited
                            </span>
                            <span>
                                <span className="font-semibold text-primary">{SCOUT_TOTALS.learned}</span> learned
                            </span>
                        </div>
                    }
                >
                    Real totals from this project, covering the last 7 days. {SCOUT_TOTALS.onPatrol} scouts are on
                    patrol, and the four below are the ones this page shows.
                </Hint>
            </div>

            {/* List */}
            <div className="mx-auto flex max-w-4xl flex-col gap-2.5 px-4 pb-4 pt-3 @md:px-6">
                {visible.length ? (
                    visible.map((scout) => <ScoutCard key={scout.id} scout={scout} onOpen={() => onOpen(scout.id)} />)
                ) : (
                    <p className="m-0 rounded-md border border-primary bg-primary px-4 py-8 text-center text-sm text-secondary">
                        No scout matches “{query.trim()}”.
                    </p>
                )}
            </div>

            <p className="m-0 mx-auto max-w-4xl px-4 pb-5 text-xs text-secondary @md:px-6">
                Each scout's run strip shows the runs we captured, so scouts on different schedules stay comparable. New
                scouts are created as <code className="font-mono">signals-scout-*</code> skills in your PostHog project.
            </p>
        </>
    )
}
