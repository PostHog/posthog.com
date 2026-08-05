import React, { useEffect, useMemo, useState } from 'react'
import { IconChevronDown, IconSearch, IconNotification } from '@posthog/icons'
import OSButton from 'components/OSButton'
import ReportRow from './ReportRow'
import ReportDetail from './ReportDetail'
import InboxFilterBar, {
    applyFilters,
    sourcesInUse,
    scoutsInUse,
    DEFAULT_FILTERS,
    type InboxFilterState,
} from './InboxFilters'
import { INBOX_ITEMS, REPORT_ITEMS } from './inboxData'
import { Hint } from './prose'

/**
 * The two halves of the Inbox. Pull requests are reports an agent already turned into a
 * merged pull request; reports are the stage before that – researched and written up,
 * but not yet committed to a fix.
 */
type TabKey = 'prs' | 'reports'

const TABS: { key: TabKey; label: string; items: typeof INBOX_ITEMS; hint: string; empty: string }[] = [
    {
        key: 'prs',
        label: 'Pull requests',
        items: INBOX_ITEMS,
        hint: 'Reports an agent took to a pull request.',
        // Deliberately no count: the list grows as walkthroughs land, and a hardcoded
        // number here went stale the first time one was added.
        empty: 'These are the real ones we merged, so not every combination has a result.',
    },
    {
        key: 'reports',
        label: 'Reports',
        items: REPORT_ITEMS,
        hint: 'Researched and written up, but no pull request yet – this is the stage every merged one passed through first.',
        // No count here either, for the same reason as the tab above.
        empty: 'These are real open reports, so not every combination has a result.',
    },
]

const Tab = ({
    label,
    count,
    active,
    onClick,
}: {
    label: string
    count?: number
    active?: boolean
    onClick: () => void
}): JSX.Element => (
    <button
        type="button"
        onClick={onClick}
        className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap pb-2 ${
            active
                ? 'border-b-2 border-red font-semibold text-primary dark:border-yellow'
                : 'border-b-2 border-transparent text-secondary hover:text-primary'
        }`}
    >
        {label}
        {typeof count === 'number' && <span className="text-xs tabular-nums text-secondary">{count}</span>}
    </button>
)

const ALL_ITEMS = [...INBOX_ITEMS, ...REPORT_ITEMS]

export default function InboxReplica(): JSX.Element {
    const [openedIds, setOpenedIds] = useState<Set<string>>(new Set())
    const [openId, setOpenId] = useState<string | null>(null)
    const [filters, setFilters] = useState<InboxFilterState>(DEFAULT_FILTERS)
    const [tab, setTab] = useState<TabKey>('prs')

    const activeTab = TABS.find((t) => t.key === tab) ?? TABS[0]
    const visibleItems = useMemo(() => applyFilters(activeTab.items, filters), [activeTab, filters])
    // Derived from the active tab's data, so every option in the menu returns at least one row.
    const sources = useMemo(() => sourcesInUse(activeTab.items), [activeTab])
    const scouts = useMemo(() => scoutsInUse(activeTab.items), [activeTab])

    // Deep-link: open whichever item the URL hash points at on mount, and select the tab
    // it lives on so backing out of the detail view lands on the right list.
    useEffect(() => {
        const slug = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
        if (slug && ALL_ITEMS.some((i) => i.id === slug)) {
            setOpenId(slug)
            setOpenedIds((prev) => new Set(prev).add(slug))
            if (REPORT_ITEMS.some((i) => i.id === slug)) setTab('reports')
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

    // Filters are per-tab concepts (sources differ), so switching resets them.
    const selectTab = (key: TabKey): void => {
        setTab(key)
        setFilters(DEFAULT_FILTERS)
    }

    const openItemData = openId ? ALL_ITEMS.find((i) => i.id === openId) ?? null : null

    return (
        <div className="@container overflow-hidden rounded-lg border border-primary bg-accent shadow-xl">
            {openItemData ? (
                <ReportDetail item={openItemData} onBack={closeItem} />
            ) : (
                <>
                    {/* Scene header */}
                    <div className="px-4 pt-4 @md:px-6">
                        <div className="flex items-center gap-2">
                            <IconNotification className="size-5 text-primary" />
                            <h2 className="m-0 text-xl font-bold text-primary">Inbox</h2>
                        </div>
                        <p className="m-0 mt-1 text-sm text-secondary">
                            {tab === 'prs'
                                ? 'Pull requests agents opened to resolve reports. Review and merge them on GitHub.'
                                : 'Issues and opportunities agents found in your product data, researched and prioritized for your review.'}
                        </p>
                    </div>

                    {/* Tab bar + scope picker */}
                    <div className="mt-3 flex items-end justify-between gap-2 border-b border-primary px-4 @md:px-6">
                        <div className="flex items-end gap-4 overflow-x-auto text-sm">
                            {TABS.map((t) => (
                                <Hint
                                    key={t.key}
                                    trigger={
                                        <Tab
                                            label={t.label}
                                            count={t.items.length}
                                            active={t.key === tab}
                                            onClick={() => selectTab(t.key)}
                                        />
                                    }
                                >
                                    {t.hint}
                                </Hint>
                            ))}
                        </div>
                        <Hint
                            trigger={
                                <div className="mb-1.5 hidden shrink-0 items-center overflow-hidden rounded border border-primary text-xs @md:flex">
                                    <span className="px-2 py-1 text-secondary">For you</span>
                                    <span className="inline-flex items-center gap-1 border-l border-primary bg-primary px-2 py-1 font-semibold text-primary">
                                        Entire project
                                        <IconChevronDown className="size-3" />
                                    </span>
                                </div>
                            }
                        >
                            Switch between reports assigned to you and everything found across the whole project.
                        </Hint>
                    </div>

                    {/* Filter bar */}
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 @md:px-6">
                        <span className="inline-flex h-8 min-w-[200px] flex-1 items-center gap-1.5 rounded border border-primary bg-primary px-2.5 text-sm text-secondary @md:max-w-sm">
                            <IconSearch className="size-3.5" />
                            Search by title or description.
                        </span>
                        <div className="ml-auto">
                            <InboxFilterBar filters={filters} onChange={setFilters} sources={sources} scouts={scouts} />
                        </div>
                    </div>

                    {/* List */}
                    <div className="mx-auto flex max-w-4xl flex-col gap-2.5 px-4 pb-5 @md:px-6">
                        {visibleItems.length ? (
                            visibleItems.map((item) => (
                                <ReportRow
                                    key={item.id}
                                    item={item}
                                    isUnread={!openedIds.has(item.id)}
                                    onOpen={() => openItem(item.id)}
                                />
                            ))
                        ) : (
                            <div className="rounded-md border border-primary bg-primary px-4 py-8 text-center">
                                <p className="m-0 text-sm font-semibold text-primary">
                                    No {tab === 'prs' ? 'pull requests' : 'reports'} match these filters
                                </p>
                                <p className="m-0 mt-1 text-sm text-secondary">{activeTab.empty}</p>
                                <div className="mt-3 flex justify-center">
                                    <OSButton size="sm" variant="secondary" onClick={() => setFilters(DEFAULT_FILTERS)}>
                                        Clear filters
                                    </OSButton>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
