import React from 'react'
import { IconCheck, IconChevronDown, IconSearch, IconSort, IconCompass, IconFlag, IconRefresh } from '@posthog/icons'
import { Popover } from 'components/RadixUI/Popover'
import {
    SORT_OPTIONS,
    PRIORITY_OPTIONS,
    PRIORITY_MEANING,
    SIGNAL_SOURCES,
    SCOUTS,
    SOURCE_META,
    type InboxFilters,
    type SortValue,
    type SourceKey,
    type Priority,
} from './inboxData'

// A quiet filter chip that lights up when a selection is active, matching the real
// Inbox filter bar. `icon` sits left, a chevron sits right. forwardRef + prop spread
// so it works as a Radix Popover `asChild` trigger (which passes ref + onClick down).
type ChipProps = {
    icon: React.ReactNode
    label: string
    active?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>
const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
    ({ icon, label, active, className = '', ...props }, ref) => (
        <button
            ref={ref}
            type="button"
            {...props}
            className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded border px-2.5 text-sm transition-colors ${
                active
                    ? 'border-secondary bg-primary font-semibold text-primary'
                    : 'border-primary bg-primary text-secondary hover:border-secondary'
            } ${className}`}
        >
            {icon}
            {label}
            <IconChevronDown className="size-3.5 text-secondary/70" />
        </button>
    )
)
Chip.displayName = 'Chip'

// A selectable row inside a popover: label on the left, a check on the right when selected.
const OptionRow = ({
    selected,
    onClick,
    children,
    indent,
}: {
    selected: boolean
    onClick: () => void
    children: React.ReactNode
    indent?: boolean
}): JSX.Element => (
    <button
        type="button"
        onClick={onClick}
        className={`flex w-full items-center justify-between gap-3 rounded px-2 py-1.5 text-left text-sm text-primary hover:bg-accent ${
            indent ? 'pl-7' : ''
        }`}
    >
        <span className="flex items-center gap-2">{children}</span>
        {selected && <IconCheck className="size-4 shrink-0 text-red dark:text-yellow" />}
    </button>
)

const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

interface InboxFilterBarProps {
    filters: InboxFilters
    onChange: (next: InboxFilters) => void
}

export default function InboxFilterBar({ filters, onChange }: InboxFilterBarProps): JSX.Element {
    const sortLabel = SORT_OPTIONS.find((o) => o.value === filters.sort)?.label ?? 'Sort'

    // Source trigger label: quiet "Source" until a source or scout is picked.
    const sourceCount = filters.sources.length + filters.scouts.length
    const sourceLabel =
        sourceCount === 0
            ? 'Source'
            : sourceCount === 1
            ? filters.sources.length === 1
                ? SOURCE_META[filters.sources[0]].label
                : `Scout · ${filters.scouts[0]}`
            : `${sourceCount} sources`

    const priorityLabel = filters.priorities.length === 0 ? 'Priority' : [...filters.priorities].sort().join(', ')

    const setSort = (value: SortValue): void => onChange({ ...filters, sort: value })
    const setSources = (sources: SourceKey[]): void => onChange({ ...filters, sources })
    const setScouts = (scouts: string[]): void => onChange({ ...filters, scouts })
    const setPriorities = (priorities: Priority[]): void => onChange({ ...filters, priorities })

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-8 min-w-[200px] flex-1 items-center gap-1.5 rounded border border-primary bg-primary px-2.5 text-sm text-secondary @md:max-w-sm">
                <IconSearch className="size-3.5" />
                Search by title or description.
            </span>
            <div className="ml-auto flex items-center gap-2">
                {/* Sort – single select */}
                <Popover
                    dataScheme="primary"
                    contentClassName="min-w-[200px]"
                    trigger={<Chip icon={<IconSort className="size-3.5" />} label={sortLabel} active />}
                >
                    <div className="flex flex-col">
                        {SORT_OPTIONS.map((o) => (
                            <OptionRow
                                key={o.value}
                                selected={filters.sort === o.value}
                                onClick={() => setSort(o.value)}
                            >
                                {o.label}
                            </OptionRow>
                        ))}
                    </div>
                </Popover>

                {/* Source – multi select, with a nested Scout group */}
                <Popover
                    dataScheme="primary"
                    contentClassName="min-w-[220px]"
                    trigger={
                        <Chip
                            icon={<IconCompass className="size-3.5" />}
                            label={sourceLabel}
                            active={sourceCount > 0}
                        />
                    }
                >
                    <div className="flex flex-col">
                        <p className="m-0 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-secondary">
                            Sources
                        </p>
                        {SIGNAL_SOURCES.map((key) => {
                            const meta = SOURCE_META[key]
                            const Icon = meta.Icon
                            return (
                                <OptionRow
                                    key={key}
                                    selected={filters.sources.includes(key)}
                                    onClick={() => setSources(toggle(filters.sources, key))}
                                >
                                    <Icon className={`size-4 ${meta.color}`} />
                                    {meta.label}
                                </OptionRow>
                            )
                        })}
                        <p className="m-0 mt-1 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-secondary">
                            Scout
                        </p>
                        {SCOUTS.map((scout) => (
                            <OptionRow
                                key={scout}
                                selected={filters.scouts.includes(scout)}
                                onClick={() => setScouts(toggle(filters.scouts, scout))}
                                indent
                            >
                                <IconCompass className="size-4 text-secondary" />
                                {scout}
                            </OptionRow>
                        ))}
                    </div>
                </Popover>

                {/* Priority – multi select */}
                <Popover
                    dataScheme="primary"
                    contentClassName="min-w-[200px]"
                    trigger={
                        <Chip
                            icon={<IconFlag className="size-3.5" />}
                            label={priorityLabel}
                            active={filters.priorities.length > 0}
                        />
                    }
                >
                    <div className="flex flex-col">
                        {PRIORITY_OPTIONS.map((p) => (
                            <OptionRow
                                key={p}
                                selected={filters.priorities.includes(p)}
                                onClick={() => setPriorities(toggle(filters.priorities, p))}
                            >
                                <span
                                    className="size-2 shrink-0 rounded-full"
                                    style={{ backgroundColor: PRIORITY_MEANING[p].dot }}
                                />
                                <span className="font-mono">{p}</span>
                                <span className="text-secondary">· {PRIORITY_MEANING[p].label}</span>
                            </OptionRow>
                        ))}
                    </div>
                </Popover>

                <span className="inline-flex size-8 items-center justify-center rounded border border-primary bg-primary text-secondary">
                    <IconRefresh className="size-3.5" />
                </span>
            </div>
        </div>
    )
}
