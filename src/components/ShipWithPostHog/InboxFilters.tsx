import React, { useState } from 'react'
import { IconCheck, IconChevronDown } from '@posthog/icons'
import { Popover } from 'components/RadixUI/Popover'
import { PRIORITIES, PRIORITY_META } from './PriorityBadge'
import { DEFAULT_STATUSES, STATUSES, statusOf, type InboxItem, type Priority, type ReportStatus } from './inboxData'

/**
 * The inbox filter bar: priority, status, and sort, mirroring the redesigned product.
 * All three actually filter the list – see `applyFilters`.
 *
 * Priority and sort are single-select and close on pick. Status is multi-select and
 * stays open, so several can be ticked in one go. There's no reset button: the app has
 * none, and each menu's own "All priorities" row or checkboxes already clear it.
 *
 * The Source menu is gone. The redesign dropped it from the bar, and with it the nested
 * Scout group – scouts are their own tab now rather than a facet of this list.
 */

export type SortKey = 'priority' | 'updated' | 'newest' | 'oldest'

export interface InboxFilterState {
    sort: SortKey
    /** Null = every priority, which the menu shows as "All priorities". */
    priority: Priority | null
    /** Empty = none match, so the list empties. Defaults to the two open states. */
    statuses: ReportStatus[]
}

export const DEFAULT_FILTERS: InboxFilterState = {
    sort: 'priority',
    priority: null,
    // Copied, so resetting can't hand out a reference to the shared default.
    statuses: [...DEFAULT_STATUSES],
}

/** Whether the status menu has been moved off its default, whatever the count. */
const statusesChanged = (statuses: ReportStatus[]): boolean =>
    statuses.length !== DEFAULT_STATUSES.length || statuses.some((status) => !DEFAULT_STATUSES.includes(status))

/** Add or remove `value`, so a menu row can toggle its own selection. */
const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value]

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
    { key: 'priority', label: 'Priority first' },
    { key: 'updated', label: 'Last updated first' },
    { key: 'newest', label: 'Newest first' },
    { key: 'oldest', label: 'Oldest first' },
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
        (item) => (!filters.priority || item.priority === filters.priority) && filters.statuses.includes(statusOf(item))
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

const MenuItem = ({
    icon,
    label,
    selected,
    onSelect,
}: {
    icon?: React.ReactNode
    label: React.ReactNode
    selected: boolean
    onSelect: () => void
}): JSX.Element => (
    <button
        type="button"
        onClick={onSelect}
        className="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm text-primary transition-colors hover:bg-accent"
    >
        {icon !== undefined && <span className="flex size-4 shrink-0 items-center justify-center">{icon}</span>}
        <span className="flex-1 whitespace-nowrap">{label}</span>
        {/* Reserve the tick's width always, so labels don't shift as selection moves. */}
        <span className="flex size-4 shrink-0 items-center justify-center">
            {selected && <IconCheck className="size-4 text-primary" />}
        </span>
    </button>
)

/** A checkbox row, for the multi-select status menu. */
const CheckboxItem = ({
    label,
    checked,
    onSelect,
}: {
    label: React.ReactNode
    checked: boolean
    onSelect: () => void
}): JSX.Element => (
    <button
        type="button"
        onClick={onSelect}
        role="menuitemcheckbox"
        aria-checked={checked}
        className="flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm text-primary transition-colors hover:bg-accent"
    >
        <span
            className={`flex size-4 shrink-0 items-center justify-center rounded-sm border ${
                checked ? 'border-red bg-red text-white dark:border-yellow dark:bg-yellow' : 'border-primary'
            }`}
        >
            {checked && <IconCheck className="size-3" />}
        </span>
        <span className="flex-1 whitespace-nowrap">{label}</span>
    </button>
)

/**
 * One filter chip and its menu. Controlled open state because Radix's Popover – unlike
 * its DropdownMenu – doesn't dismiss when something inside is clicked.
 */
const FilterMenu = ({
    name,
    label,
    active,
    children,
}: {
    /** Stable name of the control. `label` shows the current value, so it can't do this. */
    name: string
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
}: {
    filters: InboxFilterState
    onChange: (next: InboxFilterState) => void
}): JSX.Element {
    const activeSort = SORT_OPTIONS.find((option) => option.key === filters.sort) ?? SORT_OPTIONS[0]

    /*
     * The status chip counts rather than lists: the labels are long enough that two of
     * them would push the bar wider than the list it sits above. One selection is worth
     * naming, though – that's the case where the count tells you nothing.
     */
    const statusLabel = filters.statuses.length === 1 ? filters.statuses[0] : `${filters.statuses.length} statuses`

    return (
        <div className="flex flex-wrap items-center gap-2">
            <FilterMenu
                name="Priority"
                label={
                    filters.priority
                        ? `${filters.priority} · ${PRIORITY_META[filters.priority].label}`
                        : 'All priorities'
                }
                active={filters.priority !== null}
            >
                {(close) => (
                    <>
                        <MenuItem
                            label="All priorities"
                            selected={filters.priority === null}
                            onSelect={() => {
                                onChange({ ...filters, priority: null })
                                close()
                            }}
                        />
                        {PRIORITIES.map((key) => {
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
                                        onChange({ ...filters, priority: key })
                                        close()
                                    }}
                                />
                            )
                        })}
                    </>
                )}
            </FilterMenu>

            {/* Multi-select, so it doesn't close on pick. */}
            <FilterMenu name="Status" label={statusLabel} active={statusesChanged(filters.statuses)}>
                {() =>
                    STATUSES.map((status) => (
                        <CheckboxItem
                            key={status}
                            label={status}
                            checked={filters.statuses.includes(status)}
                            onSelect={() => onChange({ ...filters, statuses: toggle(filters.statuses, status) })}
                        />
                    ))
                }
            </FilterMenu>

            <FilterMenu name="Sort" label={`Sort: ${activeSort.label}`} active={filters.sort !== 'priority'}>
                {(close) =>
                    SORT_OPTIONS.map(({ key, label }) => (
                        <MenuItem
                            key={key}
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
        </div>
    )
}
