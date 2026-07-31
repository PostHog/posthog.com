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
    IconCompass,
} from '@posthog/icons'
import { Popover } from 'components/RadixUI/Popover'
import { PRIORITIES, PRIORITY_META } from './PriorityBadge'
import { SOURCE_META, sourceKeyOf, type InboxItem, type Priority, type SourceKey } from './inboxData'

/**
 * The Inbox filter bar: sort, source, and priority, mirroring the real product's
 * controls. All three actually filter the list – see `applyFilters`.
 *
 * Sort is single-select. Source and priority are multi-select, matching the real Inbox:
 * clicking an option toggles it and leaves the menu open so several can be picked in one
 * go. Clearing every option in a menu returns it to "off", and the reset button beside
 * the bar clears all three at once.
 */

export type SortKey = 'priority' | 'updated' | 'newest' | 'oldest'

export interface InboxFilterState {
    sort: SortKey
    /** Discovery channels that found the report, not the products it lives in. Empty = all. */
    sources: SourceKey[]
    /** Scout categories, the other half of the Source menu. Empty = all. */
    scouts: string[]
    /** Empty = all. */
    priorities: Priority[]
}

export const DEFAULT_FILTERS: InboxFilterState = { sort: 'priority', sources: [], scouts: [], priorities: [] }

/** Add or remove `value`, so a menu row can toggle its own selection. */
const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value]

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
    // Sources and scouts are two halves of one menu, so they union rather than intersect –
    // picking "Replay Vision" and the "Cohorts" scout shows both, not neither.
    const sourceFacetOff = !filters.sources.length && !filters.scouts.length
    const matchesSource = (item: InboxItem): boolean =>
        sourceFacetOff ||
        filters.sources.includes(sourceKeyOf(item)) ||
        (item.origin.kind === 'scout' && filters.scouts.includes(item.origin.scout))

    const matching = items.filter(
        (item) => matchesSource(item) && (!filters.priorities.length || filters.priorities.includes(item.priority))
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

/**
 * The signal sources present in the data, so no option in the menu leads to an empty list.
 *
 * `signals_scout` is deliberately excluded: scouts get their own group below, listed by
 * name, and a flat "Scout" row beside that group would be a second control for the same
 * thing – the menu rendered "Scout" twice. Matching the product, where the scout filter
 * takes skill names rather than the bare source product.
 */
export const sourcesInUse = (items: InboxItem[]): SourceKey[] => {
    const seen: SourceKey[] = []
    items.forEach((item) => {
        const key = sourceKeyOf(item)
        if (key !== 'signals_scout' && !seen.includes(key)) seen.push(key)
    })
    return seen
}

/**
 * The scout categories present in the data, for the Source menu's nested Scout group.
 * Currently empty – every real report on this page was found by a signal source rather
 * than a scout – so the group renders only once scout-authored items exist.
 */
export const scoutsInUse = (items: InboxItem[]): string[] => {
    const seen: string[] = []
    items.forEach((item) => {
        if (item.origin.kind === 'scout' && !seen.includes(item.origin.scout)) seen.push(item.origin.scout)
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
    scouts = [],
}: {
    filters: InboxFilterState
    onChange: (next: InboxFilterState) => void
    sources: SourceKey[]
    /** Scout categories in the active tab's data. Omitted or empty hides the Scout group. */
    scouts?: string[]
}): JSX.Element {
    const activeSort = SORT_OPTIONS.find((option) => option.key === filters.sort) ?? SORT_OPTIONS[0]

    // The chip reads as the single selection when there's one, and a count beyond that.
    const sourceCount = filters.sources.length + filters.scouts.length
    const onlySource = filters.sources.length === 1 && !filters.scouts.length ? filters.sources[0] : null
    const SourceIcon = onlySource ? SOURCE_META[onlySource].Icon : IconFilter
    const sourceLabel = onlySource
        ? SOURCE_META[onlySource].label
        : sourceCount === 1
        ? `Scout · ${filters.scouts[0]}`
        : sourceCount > 1
        ? `${sourceCount} sources`
        : 'Source'

    const priorityLabel = filters.priorities.length ? [...filters.priorities].sort().join(', ') : 'Priority'

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

            {/* Source and Priority are multi-select, so neither closes on pick. */}
            <FilterMenu
                name="Source"
                icon={<SourceIcon className={`size-3.5 ${onlySource ? SOURCE_META[onlySource].color : ''}`} />}
                label={sourceLabel}
                active={sourceCount > 0}
            >
                {() => (
                    <>
                        {sources.map((key) => {
                            const { label, Icon, color } = SOURCE_META[key]
                            return (
                                <MenuItem
                                    key={key}
                                    icon={<Icon className={`size-4 ${color}`} />}
                                    label={label}
                                    selected={filters.sources.includes(key)}
                                    onSelect={() => onChange({ ...filters, sources: toggle(filters.sources, key) })}
                                />
                            )
                        })}
                        {/* Only rendered when scout-authored items exist, so it can't dead-end. */}
                        {scouts.length > 0 && (
                            <>
                                <p className="m-0 mt-1 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-secondary">
                                    Scout
                                </p>
                                {scouts.map((scout) => (
                                    <MenuItem
                                        key={scout}
                                        icon={<IconCompass className="size-4 text-secondary" />}
                                        label={scout}
                                        selected={filters.scouts.includes(scout)}
                                        onSelect={() => onChange({ ...filters, scouts: toggle(filters.scouts, scout) })}
                                    />
                                ))}
                            </>
                        )}
                    </>
                )}
            </FilterMenu>

            <FilterMenu
                name="Priority"
                icon={<IconFlag className="size-3.5" />}
                label={priorityLabel}
                active={filters.priorities.length > 0}
            >
                {() =>
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
                                selected={filters.priorities.includes(key)}
                                onSelect={() => onChange({ ...filters, priorities: toggle(filters.priorities, key) })}
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
