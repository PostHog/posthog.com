import React, { useState } from 'react'
import {
    IconCheck,
    IconChevronDown,
    IconSort,
    IconFlag,
    IconFilter,
    IconClock,
    IconCalendar,
    IconRefresh,
} from '@posthog/icons'
import { Popover } from 'components/RadixUI/Popover'
import { PRIORITIES, PRIORITY_META } from './PriorityBadge'
import { SOURCE_META, type InboxItem, type Priority, type SourceKey } from './inboxData'

/**
 * The Inbox filter bar: sort, source, and priority, mirroring the real product's
 * controls. All three actually filter the list – see `applyFilters`.
 *
 * Each menu is single-select and selecting the active option again clears it, so a
 * visitor can always get back to the full list without a separate reset control.
 */

export type SortKey = 'priority' | 'updated' | 'newest' | 'oldest'

export interface InboxFilterState {
    sort: SortKey
    /** The discovery channel that found the report, not the product it lives in. */
    source: SourceKey | null
    priority: Priority | null
}

export const DEFAULT_FILTERS: InboxFilterState = { sort: 'priority', source: null, priority: null }

const SORT_OPTIONS: { key: SortKey; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'priority', label: 'Priority first', Icon: IconSort },
    { key: 'updated', label: 'Last updated first', Icon: IconRefresh },
    { key: 'newest', label: 'Newest first', Icon: IconCalendar },
    { key: 'oldest', label: 'Oldest first', Icon: IconClock },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * Turns an authored date like "Jul 30, 2026" into a sortable 20260730.
 *
 * Deliberately not `new Date(...)`: parsing that format is implementation-defined, and
 * the ISO form would land on UTC midnight and shift a day in western timezones. An
 * unparseable value sorts last rather than throwing.
 */
const dateKey = (value?: string): number => {
    if (!value) return 0
    const match = /^([A-Za-z]{3})[a-z]* (\d{1,2}),? (\d{4})$/.exec(value.trim())
    if (!match) return 0
    const month = MONTHS.indexOf(match[1])
    if (month < 0) return 0
    return Number(match[3]) * 10000 + (month + 1) * 100 + Number(match[2])
}

/** P0 sorts before P1. */
const priorityRank = (item: InboxItem): number => Number(item.priority.slice(1))

/**
 * Filters and sorts in one pass so the list and the result count can never disagree.
 * Returns a new array; `items` is untouched.
 */
export const applyFilters = (items: InboxItem[], filters: InboxFilterState): InboxItem[] => {
    const matching = items.filter(
        (item) =>
            (!filters.source || item.origin.product === filters.source) &&
            (!filters.priority || item.priority === filters.priority)
    )

    const sorted = [...matching]
    switch (filters.sort) {
        case 'updated':
            sorted.sort((a, b) => dateKey(b.detail?.lastUpdated) - dateKey(a.detail?.lastUpdated))
            break
        case 'newest':
            sorted.sort((a, b) => dateKey(b.detail?.firstSeen) - dateKey(a.detail?.firstSeen))
            break
        case 'oldest':
            sorted.sort((a, b) => dateKey(a.detail?.firstSeen) - dateKey(b.detail?.firstSeen))
            break
        default:
            // Most urgent first, then most recently touched among equals.
            sorted.sort(
                (a, b) =>
                    priorityRank(a) - priorityRank(b) || dateKey(b.detail?.lastUpdated) - dateKey(a.detail?.lastUpdated)
            )
    }
    return sorted
}

/** The sources present in the data, so no option in the menu leads to an empty list. */
export const sourcesInUse = (items: InboxItem[]): SourceKey[] => {
    const seen: SourceKey[] = []
    items.forEach((item) => {
        if (!seen.includes(item.origin.product)) seen.push(item.origin.product)
    })
    return seen
}

const MenuItem = ({
    icon,
    label,
    selected,
    onSelect,
}: {
    icon: React.ReactNode
    label: React.ReactNode
    selected: boolean
    onSelect: () => void
}): JSX.Element => (
    <button
        type="button"
        onClick={onSelect}
        className="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm text-primary transition-colors hover:bg-accent"
    >
        <span className="flex size-4 shrink-0 items-center justify-center">{icon}</span>
        <span className="flex-1 whitespace-nowrap">{label}</span>
        {/* Reserve the tick's width always, so labels don't shift as selection moves. */}
        <span className="flex size-4 shrink-0 items-center justify-center">
            {selected && <IconCheck className="size-4 text-primary" />}
        </span>
    </button>
)

/**
 * One filter chip and its menu. Controlled open state because Radix's Popover – unlike
 * its DropdownMenu – doesn't dismiss when something inside is clicked.
 */
const FilterMenu = ({
    name,
    icon,
    label,
    active,
    children,
}: {
    /** Stable name of the control. `label` shows the current value, so it can't do this. */
    name: string
    icon: React.ReactNode
    label: string
    /** Styles the chip as set. */
    active: boolean
    children: (close: () => void) => React.ReactNode
}): JSX.Element => {
    const [open, setOpen] = useState(false)

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
            dataScheme="secondary"
            contentClassName="border border-primary"
            align="start"
            arrow={false}
            trigger={
                <button
                    type="button"
                    data-filter={name.toLowerCase()}
                    aria-label={active ? `${name}: ${label}` : name}
                    className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded border px-2.5 text-sm transition-colors ${
                        active
                            ? 'border-primary bg-accent font-semibold text-primary'
                            : 'border-primary bg-primary text-secondary hover:text-primary'
                    }`}
                >
                    {icon}
                    {label}
                    <IconChevronDown className="size-3.5 text-secondary/70" />
                </button>
            }
        >
            <div className="min-w-[11rem]">{children(() => setOpen(false))}</div>
        </Popover>
    )
}

export default function InboxFilterBar({
    filters,
    onChange,
    sources,
}: {
    filters: InboxFilterState
    onChange: (next: InboxFilterState) => void
    sources: SourceKey[]
}): JSX.Element {
    const activeSort = SORT_OPTIONS.find((option) => option.key === filters.sort) ?? SORT_OPTIONS[0]
    const SourceIcon = filters.source ? SOURCE_META[filters.source].Icon : IconFilter

    return (
        <div className="flex items-center gap-2">
            <FilterMenu
                name="Sort"
                icon={<IconSort className="size-3.5" />}
                label={filters.sort === 'priority' ? 'Sort' : activeSort.label}
                active={filters.sort !== 'priority'}
            >
                {(close) =>
                    SORT_OPTIONS.map(({ key, label, Icon }) => (
                        <MenuItem
                            key={key}
                            icon={<Icon className="size-4 text-secondary" />}
                            label={label}
                            selected={filters.sort === key}
                            onSelect={() => {
                                onChange({ ...filters, sort: key })
                                close()
                            }}
                        />
                    ))
                }
            </FilterMenu>

            <FilterMenu
                name="Source"
                icon={<SourceIcon className={`size-3.5 ${filters.source ? SOURCE_META[filters.source].color : ''}`} />}
                label={filters.source ? SOURCE_META[filters.source].label : 'Source'}
                active={!!filters.source}
            >
                {(close) =>
                    sources.map((key) => {
                        const { label, Icon, color } = SOURCE_META[key]
                        return (
                            <MenuItem
                                key={key}
                                icon={<Icon className={`size-4 ${color}`} />}
                                label={label}
                                selected={filters.source === key}
                                onSelect={() => {
                                    onChange({ ...filters, source: filters.source === key ? null : key })
                                    close()
                                }}
                            />
                        )
                    })
                }
            </FilterMenu>

            <FilterMenu
                name="Priority"
                icon={<IconFlag className="size-3.5" />}
                label={filters.priority ?? 'Priority'}
                active={!!filters.priority}
            >
                {(close) =>
                    PRIORITIES.map((key) => {
                        const { color, label } = PRIORITY_META[key]
                        return (
                            <MenuItem
                                key={key}
                                icon={
                                    <span
                                        className="size-2 rounded-full"
                                        style={{ backgroundColor: color }}
                                        aria-hidden
                                    />
                                }
                                label={
                                    <>
                                        {key} <span className="text-secondary">· {label}</span>
                                    </>
                                }
                                selected={filters.priority === key}
                                onSelect={() => {
                                    onChange({ ...filters, priority: filters.priority === key ? null : key })
                                    close()
                                }}
                            />
                        )
                    })
                }
            </FilterMenu>

            <button
                type="button"
                onClick={() => onChange(DEFAULT_FILTERS)}
                title="Reset sort and filters"
                aria-label="Reset sort and filters"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded border border-primary bg-primary text-secondary transition-colors hover:text-primary"
            >
                <IconRefresh className="size-3.5" />
            </button>
        </div>
    )
}
