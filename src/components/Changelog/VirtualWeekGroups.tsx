import React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import dayjs from 'dayjs'

type RoadmapType = {
    id?: string | number
    attributes?: {
        title?: string
        description?: string
        dateCompleted?: string
        topic?: {
            data?: {
                attributes?: {
                    label?: string
                }
            }
        }
        teams?: {
            data?: Array<{ id: number; attributes?: { name?: string } }>
        }
        image?: any
    }
}

function toRoman(n: number): string {
    const map: Array<[number, string]> = [
        [5, 'V'],
        [4, 'IV'],
        [3, 'III'],
        [2, 'II'],
        [1, 'I'],
    ]
    let out = ''
    let x = n
    for (const [val, sym] of map) {
        while (x >= val) {
            out += sym
            x -= val
        }
    }
    return out || `${n}`
}

function getWeekKey(dateStr: string): { key: string; label: string } {
    const d = dayjs(dateStr)
    const weekInMonth = Math.ceil(d.date() / 7)
    const label = `${d.format('MMMM')} ${d.year()} - Week ${toRoman(weekInMonth)}`
    const key = `${d.year()}-${d.month()}-${weekInMonth}`
    return { key, label }
}

interface VirtualWeekGroupsProps {
    items: RoadmapType[]
    height?: number
    cardWidth?: number
    cardGap?: number
    overscan?: number
    className?: string
}

export default function VirtualWeekGroups({
    items,
    height = 640,
    cardWidth = 360,
    cardGap = 16,
    overscan = 3,
    className = '',
}: VirtualWeekGroupsProps): JSX.Element {
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const [scrollLeft, setScrollLeft] = React.useState(0)

    const groups = React.useMemo(() => {
        const map = new Map<string, { key: string; label: string; items: RoadmapType[]; firstDate: string }>()
        for (const r of items || []) {
            const date = r?.attributes?.dateCompleted
            if (!date) {
                continue
            }
            const { key, label } = getWeekKey(date)
            const existing = map.get(key)
            if (existing) {
                existing.items.push(r)
                if (dayjs(date).isBefore(existing.firstDate)) {
                    existing.firstDate = date
                }
            } else {
                map.set(key, { key, label, items: [r], firstDate: date })
            }
        }
        const arr = Array.from(map.values())
        arr.sort((a, b) => dayjs(a.firstDate).valueOf() - dayjs(b.firstDate).valueOf())
        return arr
    }, [items])

    const cardFull = cardWidth + cardGap
    const totalWidth = groups.length * cardFull

    const rowVirtualizer = useVirtualizer({
        count: groups.length,
        getScrollElement: () => containerRef.current,
        estimateSize: () => cardFull,
        horizontal: true,
        overscan,
    })

    return (
        <div
            ref={containerRef}
            className={`relative w-full overflow-x-auto overflow-y-hidden ${className}`}
            style={{ height }}
            onScroll={(e) => setScrollLeft((e.target as HTMLDivElement).scrollLeft)}
        >
            <div style={{ width: rowVirtualizer.getTotalSize(), height: '100%', position: 'relative' }}>
                {rowVirtualizer.getVirtualItems().map((vi) => {
                    const group = groups[vi.index]
                    const left = vi.start
                    return (
                        <div
                            key={group.key}
                            className="absolute top-0"
                            style={{ left, width: cardWidth, height: '100%' }}
                        >
                            <div className="h-full w-full rounded-xl bg-white dark:bg-accent-dark border border-input shadow-[0_1px_0_rgba(0,0,0,0.05)] flex flex-col overflow-hidden">
                                <div className="px-4 pt-3 pb-1 flex items-center justify-between">
                                    <h3 className="m-0 text-lg font-semibold">{group.label}</h3>
                                    <div className="text-xs font-semibold px-2 py-0.5 rounded-full border border-input">
                                        {group.items.length}
                                    </div>
                                </div>
                                <div className="px-3 pb-3 space-y-2 overflow-y-auto">
                                    {group.items.map((r, idx) => {
                                        const title = r?.attributes?.title
                                        const team = r?.attributes?.teams?.data?.[0]?.attributes?.name
                                        return (
                                            <div
                                                key={idx}
                                                className="rounded-md border border-input bg-accent px-3 py-2"
                                            >
                                                <div className="font-semibold underline text-base leading-tight">
                                                    {title}
                                                </div>
                                                {team ? (
                                                    <div className="text-sm text-secondary mt-1">{team}</div>
                                                ) : null}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
