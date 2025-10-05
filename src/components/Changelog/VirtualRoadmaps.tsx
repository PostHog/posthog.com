import React from 'react'
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
    }
}

interface VirtualRoadmapsProps {
    items: RoadmapType[]
    height?: number
    rowHeight?: number
    overscan?: number
    className?: string
}

export default function VirtualRoadmaps({
    items,
    height = 640,
    rowHeight = 220,
    overscan = 6,
    className = '',
}: VirtualRoadmapsProps): JSX.Element {
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const [scrollTop, setScrollTop] = React.useState(0)

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop((e.target as HTMLDivElement).scrollTop)
    }

    const total = items.length
    const totalHeight = total * rowHeight
    const viewportHeight = height
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
    const endIndex = Math.min(total - 1, Math.ceil((scrollTop + viewportHeight) / rowHeight) + overscan)

    const visibleItems = [] as Array<{ index: number; item: RoadmapType }>
    for (let i = startIndex; i <= endIndex; i++) {
        visibleItems.push({ index: i, item: items[i] })
    }

    return (
        <div
            ref={containerRef}
            className={`relative w-full overflow-auto border border-input rounded-md bg-accent ${className}`}
            style={{ height }}
            onScroll={onScroll}
        >
            <div style={{ height: totalHeight, position: 'relative' }}>
                {visibleItems.map(({ index, item }) => {
                    const top = index * rowHeight
                    const title = item?.attributes?.title
                    const dateCompleted = item?.attributes?.dateCompleted
                    const topic = item?.attributes?.topic?.data?.attributes?.label
                    return (
                        <div
                            key={(item as any)?.id || `${index}-${title}`}
                            className="absolute left-0 right-0 p-3"
                            style={{ top, height: rowHeight }}
                        >
                            <div className="h-full w-full rounded-md bg-white dark:bg-accent-dark border border-input shadow-[0_1px_0_rgba(0,0,0,0.05)] flex">
                                <div className="flex-1 p-4">
                                    <div className="text-xs text-secondary mb-1">
                                        {dateCompleted ? dayjs(dateCompleted).format('MMMM D, YYYY') : ''}
                                    </div>
                                    <h3 className="m-0 text-base font-semibold leading-tight">{title}</h3>
                                    {topic ? <div className="text-sm mt-1">{topic}</div> : null}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
