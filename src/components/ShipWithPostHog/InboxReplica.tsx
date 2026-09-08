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
 * The list shows three whole rows plus half of the fourth, then scrolls.
 *
 * Pure arithmetic in CSS, not a measurement. `ReportRow` is a fixed `--row-h` tall with
 * every line inside it single-line, so three and a half rows is exactly
 * `3.5 × row + 3 × gap` at any container width:
 *   base  3.5 × 5.5rem  + 3 × 0.625rem = 21.125rem
 *   @md   3.5 × 6.25rem + 3 × 0.625rem = 23.75rem
 *
 * An earlier version measured the rendered rows with a `ResizeObserver` and re-derived the
 * cap. It went stale whenever the observer missed a reflow, which is the failure this
 * replaces. The classes below are spelled out literally because Tailwind's JIT can't see
 * a class name built from a template string, and the height reads `var(--row-h)` because
 * the bare custom-property shorthand is Tailwind 4 only – this project is on 3.4.
 *
 * `overflow-x-hidden` is load-bearing: a horizontal scrollbar on this element would eat
 * ten pixels of its height and turn the half row into a 0.45 row.
 *
 * Change the row height and both caps change with it – keep the four numbers in step.
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
                        <p className="m-0 mt-1 text-sm text-secondary">{SUBTITLE[tab]}</p>
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

                    {tab === 'scouts' ? (
                        <ScoutList onOpen={setOpenScoutId} />
                    ) : tab === 'settings' ? (
                        <InboxSettings />
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

                            {/* List – capped at three and a half rows, then scrolls */}
                            <div className="mx-auto max-w-4xl px-4 pb-5 @md:px-6">
                                {visibleItems.length ? (
                                    <div className="flex max-h-[21.125rem] flex-col gap-2.5 overflow-y-auto overflow-x-hidden pr-1 [--row-h:5.5rem] @md:max-h-[23.75rem] @md:[--row-h:6.25rem]">
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
                </>
            )}
        </div>
    )
}
