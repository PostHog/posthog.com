import React, { useEffect, useState } from 'react'
import {
    IconChevronDown,
    IconSearch,
    IconSort,
    IconCompass,
    IconFlag,
    IconRefresh,
    IconNotification,
} from '@posthog/icons'
import ReportRow from './ReportRow'
import ReportDetail from './ReportDetail'
import { INBOX_ITEMS } from './inboxData'

// A quiet, non-interactive filter chip mirroring the real Inbox filter bar.
const FilterChip = ({ icon, label }: { icon: React.ReactNode; label: string }): JSX.Element => (
    <span className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded border border-primary bg-primary px-2.5 text-sm text-secondary">
        {icon}
        {label}
        <IconChevronDown className="size-3.5 text-secondary/70" />
    </span>
)

const Tab = ({ label, count, active }: { label: string; count?: number; active?: boolean }): JSX.Element => (
    <span
        className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap pb-2 ${
            active
                ? 'border-b-2 border-red font-semibold text-primary dark:border-yellow'
                : 'border-b-2 border-transparent text-secondary'
        }`}
    >
        {label}
        {typeof count === 'number' && <span className="text-xs tabular-nums text-secondary">{count}</span>}
    </span>
)

export default function InboxReplica(): JSX.Element {
    const [openedIds, setOpenedIds] = useState<Set<string>>(new Set())
    const [openId, setOpenId] = useState<string | null>(null)

    // Deep-link: open whichever item the URL hash points at on mount.
    useEffect(() => {
        const slug = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
        if (slug && INBOX_ITEMS.some((i) => i.id === slug)) {
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

    const openItemData = openId ? INBOX_ITEMS.find((i) => i.id === openId) ?? null : null

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
                            Pull requests agents opened to resolve reports. Review and merge them on GitHub.
                        </p>
                    </div>

                    {/* Tab bar + scope picker */}
                    <div className="mt-3 flex items-end justify-between gap-2 border-b border-primary px-4 @md:px-6">
                        <div className="flex items-end gap-4 overflow-x-auto text-sm">
                            <Tab label="Pull requests" count={INBOX_ITEMS.length} active />
                            <Tab label="Reports" count={254} />
                        </div>
                        <div className="mb-1.5 hidden shrink-0 items-center overflow-hidden rounded border border-primary text-xs @md:flex">
                            <span className="px-2 py-1 text-secondary">For you</span>
                            <span className="inline-flex items-center gap-1 border-l border-primary bg-primary px-2 py-1 font-semibold text-primary">
                                Entire project
                                <IconChevronDown className="size-3" />
                            </span>
                        </div>
                    </div>

                    {/* Filter bar */}
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 @md:px-6">
                        <span className="inline-flex h-8 min-w-[200px] flex-1 items-center gap-1.5 rounded border border-primary bg-primary px-2.5 text-sm text-secondary @md:max-w-sm">
                            <IconSearch className="size-3.5" />
                            Search by title or description.
                        </span>
                        <div className="ml-auto flex items-center gap-2">
                            <FilterChip icon={<IconSort className="size-3.5" />} label="Sort" />
                            <FilterChip icon={<IconCompass className="size-3.5" />} label="Scout" />
                            <FilterChip icon={<IconFlag className="size-3.5" />} label="Priority" />
                            <span className="inline-flex size-8 items-center justify-center rounded border border-primary bg-primary text-secondary">
                                <IconRefresh className="size-3.5" />
                            </span>
                        </div>
                    </div>

                    {/* List */}
                    <div className="mx-auto flex max-w-4xl flex-col gap-2.5 px-4 pb-5 @md:px-6">
                        {INBOX_ITEMS.map((item) => (
                            <ReportRow
                                key={item.id}
                                item={item}
                                isUnread={!openedIds.has(item.id)}
                                onOpen={() => openItem(item.id)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
