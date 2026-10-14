import React, { useEffect, useState } from 'react'
import { SERIES, Tooltip, delayStyle } from '../charts'
import type { ChartProps, TooltipState } from '../charts'

type SortKey = 'events' | 'revenue'

interface ErrorRow {
    name: string
    events: number
    revenue: number
    customers: number
}

const ERRORS: ErrorRow[] = [
    { name: 'ResizeObserver loop limit exceeded', events: 18200, revenue: 0, customers: 0 },
    { name: 'ChunkLoadError: settings.js', events: 6400, revenue: 1100, customers: 4 },
    { name: 'NetworkError: /api/flags', events: 4900, revenue: 600, customers: 2 },
    { name: '504 POST /api/invoices', events: 1150, revenue: 8100, customers: 6 },
    { name: 'TypeError: card is undefined', events: 310, revenue: 12400, customers: 9 },
]

const SERIES_COLOR = SERIES.red
const RESORT_DELAY_MS = 650
const STAGGER_MS = 80
const BAR_HEIGHT = 8
const LABEL_HEIGHT = 16

const compact = (value: number): string =>
    value >= 1000 ? `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k` : value.toLocaleString('en-US')

const formatValue = (row: ErrorRow, sortKey: SortKey): string =>
    sortKey === 'revenue' ? `$${compact(row.revenue)}` : compact(row.events)

const ranked = (sortKey: SortKey): ErrorRow[] => [...ERRORS].sort((a, b) => b[sortKey] - a[sortKey])

export const TOP_ERROR = ranked('revenue')[0]
export const TOP_ERROR_VOLUME_RANK = ranked('events').indexOf(TOP_ERROR) + 1
export const formatRevenue = (value: number): string => `$${compact(value)}`

export default function ErrorsByRevenue({ width, height, isAnswered, isStatic }: ChartProps): JSX.Element {
    const [sortKey, setSortKey] = useState<SortKey>(isAnswered && isStatic ? 'revenue' : 'events')
    const [tooltip, setTooltip] = useState<TooltipState | null>(null)
    const rowHeight = height / ERRORS.length
    const order = ranked(sortKey)
    const largest = Math.max(...ERRORS.map((row) => row[sortKey]))

    useEffect(() => {
        if (!isAnswered) {
            return
        }
        const timer = window.setTimeout(() => setSortKey('revenue'), isStatic ? 0 : RESORT_DELAY_MS)
        return () => window.clearTimeout(timer)
    }, [isAnswered, isStatic])

    return (
        <div className="relative size-full" onPointerLeave={() => setTooltip(null)}>
            {ERRORS.map((row, index) => {
                const rank = order.indexOf(row)
                const isTop = sortKey === 'revenue' && rank === 0
                return (
                    <div
                        key={row.name}
                        className="absolute inset-x-0 top-0 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                        style={{ height: rowHeight, transform: `translateY(${rank * rowHeight}px)` }}
                        onPointerEnter={() =>
                            setTooltip({
                                x: width / 2,
                                y: rank * rowHeight,
                                title: row.name,
                                rows: [
                                    { label: 'Events', value: row.events.toLocaleString('en-US') },
                                    { label: 'Paying customers', value: String(row.customers) },
                                    { label: 'MRR at risk', value: formatRevenue(row.revenue) },
                                ],
                            })
                        }
                    >
                        <div
                            className="flex items-baseline justify-between gap-3 font-mono text-[11px]"
                            style={{ height: LABEL_HEIGHT }}
                        >
                            <span className={`truncate ${isTop ? 'text-primary' : 'text-secondary'}`}>{row.name}</span>
                            <span className="shrink-0 tabular-nums text-primary">{formatValue(row, sortKey)}</span>
                        </div>
                        <div className="mt-1 w-full" style={{ height: BAR_HEIGHT }}>
                            <div className="data-story-grow-x h-full" style={delayStyle(index * STAGGER_MS)}>
                                <div
                                    className={`h-full rounded-r-sm transition-[width,opacity] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${SERIES_COLOR.swatch}`}
                                    style={{
                                        width: `${Math.max(1, (row[sortKey] / largest) * 100)}%`,
                                        opacity: sortKey === 'revenue' && !isTop ? 0.45 : 1,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )
            })}
            <Tooltip state={tooltip} width={width} />
        </div>
    )
}
