import React, { useEffect, useMemo, useState } from 'react'
import { IconChevronDown, IconNotification } from '@posthog/icons'
import OSButton from 'components/OSButton'
import ReportRow from './ReportRow'
import ReportDetail from './ReportDetail'
import InboxFilterBar, { applyFilters, DEFAULT_FILTERS, type InboxFilterState } from './InboxFilters'
import { ALL_ITEMS } from './inboxData'
import InboxSettings from './InboxSettings'
import ScoutList from './ScoutList'
import ScoutDetail from './ScoutDetail'
import { SCOUTS } from './scoutData'
import { Hint } from './prose'

/**
 * The Self-driving inbox scene.
 *
 * One list, not two. A pull request is a property of an item here rather than a tab of
 * its own – some of these reports produced one and some haven't yet, which is what the
 * status filter is for.
 */

/** All three of the app's tabs, and all three are real. */
type TabKey = 'reports' | 'scouts' | 'settings'

const TABS: { key: TabKey; label: string }[] = [
    { key: 'reports', label: 'Reports' },
    { key: 'scouts', label: 'Scouts' },
    { key: 'settings', label: 'Settings' },
]

/** Each tab's own subtitle, as the app swaps it. */
const SUBTITLE: Record<TabKey, string> = {
    reports: 'Issues and opportunities found in your product, ready to review.',
    scouts: 'Scheduled agents that sweep this project and file what they find.',
    settings: 'Signal sources, PR generation, code access, and notifications.',
}

/*
 * Every tab shares one panel height, so switching tabs can't resize the card.
 *
 * The height is the Reports tab's own arithmetic: its filter bar, then three whole rows
 * plus half of the fourth, then its bottom padding. `ReportRow` is a fixed `--row-h` tall
 * with every line inside it single-line, so the list part is exactly
 * `3.5 × row + 3 × gap` at any container width:
 *   base  56px bar + (3.5 × 5.5rem  + 3 × 0.625rem) + 20px pad = 25.875rem
 *   @md   56px bar + (3.5 × 6.25rem + 3 × 0.625rem) + 20px pad = 28.5rem
 * The half row is the affordance that says the list scrolls. Scouts and Settings are
 * taller than this and scroll inside the same panel.
 *
 * An earlier version measured the rendered rows with a `ResizeObserver` and re-derived the
 * cap. It went stale whenever the observer missed a reflow, which is the failure this
 * replaces. The classes below are spelled out literally because Tailwind's JIT can't see
 * a class name built from a template string, and the rows read `var(--row-h)` because the
 * bare custom-property shorthand is Tailwind 4 only – this project is on 3.4.
 *
 * `overflow-x-hidden` is load-bearing: a horizontal scrollbar on a scroller would eat ten
 * pixels of its height and turn the half row into a 0.45 row.
 *
 * Change the row height and both panel heights change with it – keep the four numbers in
 * step. A filter bar that wraps at a narrow width takes its extra line from the list
 * rather than from the panel, which is the trade that keeps the card a constant height.
 */

export default function InboxReplica(): JSX.Element {
    const [openedIds, setOpenedIds] = useState<Set<string>>(new Set())
    const [openId, setOpenId] = useState<string | null>(null)
    const [filters, setFilters] = useState<InboxFilterState>(DEFAULT_FILTERS)
    const [tab, setTab] = useState<TabKey>('reports')
    const [openScoutId, setOpenScoutId] = useState<string | null>(null)

    const visibleItems = useMemo(() => applyFilters(ALL_ITEMS, filters), [filters])

    // Deep-link: open whichever item the URL hash points at on mount.
    useEffect(() => {
        const slug = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
        if (slug && ALL_ITEMS.some((i) => i.id === slug)) {
            setOpenId(slug)
            setOpenedIds((prev) => new Set(prev).add(slug))
        }
    }, [])

    const setHash = (slug: string | null): void => {
        if (typeof window === 'undefined') return
        const url = slug ? `#${slug}` : window.location.pathname + window.location.search
        window.history.replaceState(null, '', url)
    }

    const openItem = (id: string): void => {
        setOpenId(id)
        setOpenedIds((prev) => new Set(prev).add(id))
        setHash(id)
    }

    const closeItem = (): void => {
        setOpenId(null)
        setHash(null)
    }

    // Switching tabs closes whatever detail was open on the old one.
    const selectTab = (key: TabKey): void => {
        setTab(key)
        setOpenId(null)
        setOpenScoutId(null)
        setHash(null)
    }

    const openItemData = openId ? ALL_ITEMS.find((i) => i.id === openId) ?? null : null
    const openScout = openScoutId ? SCOUTS.find((s) => s.id === openScoutId) ?? null : null

    return (
        <div className="@container overflow-hidden rounded-lg border border-primary bg-accent shadow-xl">
            {openItemData ? (
                <ReportDetail item={openItemData} onBack={closeItem} />
            ) : openScout ? (
                <ScoutDetail scout={openScout} onBack={() => setOpenScoutId(null)} />
            ) : (
                <>
                    {/* Scene header */}
                    <div className="px-4 pt-4 @md:px-6">
                        <div className="flex items-center gap-2">
                            <IconNotification className="size-5 text-primary" />
                            <h2 className="m-0 text-xl font-bold text-primary">Self-driving inbox</h2>
                        </div>
                        {/*
                         * Two lines are reserved below @2xl, where the longer subtitles wrap and the
                         * shorter ones don't. Without it the header moves by a line on a tab switch,
                         * which is the same wobble the panel height below exists to stop.
                         */}
                        <p className="m-0 mt-1 min-h-[2.5rem] text-sm text-secondary @2xl:min-h-0">{SUBTITLE[tab]}</p>
                    </div>

                    {/* Tab bar */}
                    <div className="mt-3 border-b border-primary px-4 @md:px-6">
                        <div className="flex items-end gap-4 overflow-x-auto text-sm">
                            {TABS.map((entry) => {
                                const active = entry.key === tab
                                const className = `flex shrink-0 items-center whitespace-nowrap pb-2 ${
                                    active
                                        ? 'border-b-2 border-red font-semibold text-primary dark:border-yellow'
                                        : 'border-b-2 border-transparent text-secondary hover:text-primary'
                                }`
                                return (
                                    <button
                                        key={entry.key}
                                        type="button"
                                        onClick={() => selectTab(entry.key)}
                                        className={className}
                                    >
                                        {entry.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Tab panel – one height for all three tabs, so switching can't resize the card */}
                    <div className="flex h-[25.875rem] flex-col [--row-h:5.5rem] @md:h-[28.5rem] @md:[--row-h:6.25rem]">
                        {tab === 'scouts' || tab === 'settings' ? (
                            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
                                {tab === 'scouts' ? <ScoutList onOpen={setOpenScoutId} /> : <InboxSettings />}
                            </div>
                        ) : (
                            <>
                                {/* Filter bar: filters left, scope and triage right, as the app has them */}
                                <div className="flex flex-wrap items-center gap-2 px-4 py-3 @md:px-6">
                                    <InboxFilterBar filters={filters} onChange={setFilters} />

                                    <div className="ml-auto flex items-center gap-2">
                                        <Hint
                                            trigger={
                                                <span className="hidden h-8 shrink-0 items-center gap-1.5 rounded border border-primary bg-primary px-2.5 text-sm text-secondary @lg:inline-flex">
                                                    Triage mode
                                                    <kbd className="rounded border border-primary px-1 font-mono text-[10px]">
                                                        T
                                                    </kbd>
                                                </span>
                                            }
                                        >
                                            Step through reports one at a time, deciding on each before the next.
                                        </Hint>
                                        <Hint
                                            trigger={
                                                <span className="hidden h-8 shrink-0 items-center gap-1.5 rounded border border-primary bg-primary px-2.5 text-sm text-secondary @md:inline-flex">
                                                    Entire project
                                                    <IconChevronDown className="size-3" />
                                                </span>
                                            }
                                        >
                                            Switch between reports assigned to you and everything found across the whole
                                            project.
                                        </Hint>
                                    </div>
                                </div>

                                {/* List – fills the panel, showing three and a half rows, then scrolls */}
                                <div className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col px-4 pb-5 @md:px-6">
                                    {visibleItems.length ? (
                                        <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto overflow-x-hidden pr-1">
                                            {visibleItems.map((item) => (
                                                <ReportRow
                                                    key={item.id}
                                                    item={item}
                                                    isUnread={!openedIds.has(item.id)}
                                                    onOpen={() => openItem(item.id)}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="rounded-md border border-primary bg-primary px-4 py-8 text-center">
                                            <p className="m-0 text-sm font-semibold text-primary">
                                                No reports match these filters
                                            </p>
                                            <p className="m-0 mt-1 text-sm text-secondary">
                                                These are real reports, so not every combination has a result.
                                            </p>
                                            <div className="mt-3 flex justify-center">
                                                <OSButton
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={() => setFilters(DEFAULT_FILTERS)}
                                                >
                                                    Reset filters
                                                </OSButton>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
