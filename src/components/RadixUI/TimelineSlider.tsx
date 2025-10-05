import * as React from 'react'

type TimelineItem = {
    label: string
    key?: string
    year?: number
}

interface TimelineSliderProps {
    months: TimelineItem[]
    value: [number, number]
    onValueChange: (value: [number, number]) => void
    className?: string
    minStepsBetweenThumbs?: number
    defaultValue?: [number, number]
    activity?: number[][]
    binsPerMonth?: number
    showYearLabels?: boolean
    minMonthWidth?: number
}

/**
 * TimelineSlider – a Radix Slider-based range selector with month ticks and labels
 */
export const TimelineSlider = ({
    months,
    value,
    onValueChange,
    className = '',
    minStepsBetweenThumbs = 0,
    // defaultValue no longer used (legacy from Radix wrapper)
    activity,
    binsPerMonth = 4,
    showYearLabels = true,
    minMonthWidth = 48,
}: TimelineSliderProps): JSX.Element => {
    const max = Math.max(0, months.length - 1)
    const viewportRef = React.useRef<HTMLDivElement | null>(null)
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const dragStateRef = React.useRef<{
        startClientX: number
        startRange: [number, number]
        isDragging: boolean
        mode: 'move' | 'resize-start' | 'resize-end'
    }>({ startClientX: 0, startRange: [0, 0], isDragging: false, mode: 'move' })

    // Pan state for scrolling the track when it overflows
    const panStateRef = React.useRef<{ startClientX: number; startOffset: number; isPanning: boolean } | null>(null)
    const [viewportWidth, setViewportWidth] = React.useState(0)
    const [contentWidth, setContentWidth] = React.useState(0)
    const [offsetPx, setOffsetPx] = React.useState(0)

    const percentForIndex = (index: number): number => {
        if (max === 0) {
            return 0
        }
        return (index / max) * 100
    }

    // No Radix slider: value is controlled entirely via custom window + handles

    const clampRange = (start: number, end: number): [number, number] => {
        const width = Math.max(0, end - start)
        const clampedStart = Math.max(0, Math.min(max - width, start))
        const clampedEnd = Math.min(max, clampedStart + width)
        return [clampedStart, clampedEnd]
    }

    const handleWindowPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.stopPropagation()
        const target = e.currentTarget as HTMLDivElement
        if (
            typeof (target as unknown as { setPointerCapture?: (id: number) => void }).setPointerCapture === 'function'
        ) {
            ;(target as unknown as { setPointerCapture: (id: number) => void }).setPointerCapture(e.pointerId)
        }
        dragStateRef.current = {
            startClientX: e.clientX,
            startRange: [value[0], value[1]],
            isDragging: true,
            mode: 'move',
        }
    }

    const startResize = (e: React.PointerEvent<HTMLDivElement>, mode: 'resize-start' | 'resize-end'): void => {
        e.stopPropagation()
        const target = e.currentTarget as HTMLDivElement
        if (
            typeof (target as unknown as { setPointerCapture?: (id: number) => void }).setPointerCapture === 'function'
        ) {
            ;(target as unknown as { setPointerCapture: (id: number) => void }).setPointerCapture(e.pointerId)
        }
        dragStateRef.current = {
            startClientX: e.clientX,
            startRange: [value[0], value[1]],
            isDragging: true,
            mode,
        }
    }

    const handleWindowPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragStateRef.current.isDragging) {
            return
        }
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect || max === 0) {
            return
        }
        const dx = e.clientX - dragStateRef.current.startClientX
        const stepPx = rect.width / max
        if (stepPx <= 0) {
            return
        }
        const deltaSteps = Math.round(dx / stepPx)
        const mode = dragStateRef.current.mode
        let s = value[0]
        let e2 = value[1]
        if (mode === 'move') {
            const start = dragStateRef.current.startRange[0] + deltaSteps
            const end = dragStateRef.current.startRange[1] + deltaSteps
            ;[s, e2] = clampRange(start, end)
        } else if (mode === 'resize-start') {
            const tentative = dragStateRef.current.startRange[0] + deltaSteps
            const maxStart = dragStateRef.current.startRange[1] - (minStepsBetweenThumbs || 0)
            s = Math.max(0, Math.min(maxStart, tentative))
            e2 = dragStateRef.current.startRange[1]
        } else if (mode === 'resize-end') {
            const tentative = dragStateRef.current.startRange[1] + deltaSteps
            const minEnd = dragStateRef.current.startRange[0] + (minStepsBetweenThumbs || 0)
            e2 = Math.min(max, Math.max(minEnd, tentative))
            s = dragStateRef.current.startRange[0]
        }
        if (s !== value[0] || e2 !== value[1]) {
            onValueChange([s, e2])
        }
    }

    const handleWindowPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        dragStateRef.current.isDragging = false
        const target = e.currentTarget as HTMLDivElement
        if (
            typeof (target as unknown as { releasePointerCapture?: (id: number) => void }).releasePointerCapture ===
            'function'
        ) {
            ;(target as unknown as { releasePointerCapture: (id: number) => void }).releasePointerCapture(e.pointerId)
        }
    }

    const handleWindowDoubleClick = () => {
        if (max <= 0) {
            return
        }
        const endIndex = Math.max(0, Math.min(max, value[1]))
        const startIndex = Math.max(0, endIndex - 1)
        onValueChange([startIndex, endIndex])
    }

    // Setup resize observer on viewport to know available width
    React.useLayoutEffect(() => {
        const el = viewportRef.current
        if (!el) {
            return
        }
        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setViewportWidth(entry.contentRect.width)
            }
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    // Compute content width and clamp current offset
    React.useEffect(() => {
        const width = Math.max(viewportWidth, months.length * minMonthWidth)
        setContentWidth(width)
        const minOffset = Math.min(0, viewportWidth - width)
        setOffsetPx((prev) => Math.max(minOffset, Math.min(0, prev)))
    }, [viewportWidth, months.length, minMonthWidth])

    // Snap timeline so the start of the selected window is visible near the left when value changes
    React.useEffect(() => {
        if (contentWidth <= viewportWidth || max === 0) {
            return
        }
        const startPercent = value[0] / max
        const targetLeft = startPercent * contentWidth
        // Center-ish bias: leave small padding
        const padding = 24
        const nextOffset = Math.min(0, Math.max(viewportWidth - contentWidth, -targetLeft + padding))
        setOffsetPx(nextOffset)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value[0], contentWidth, viewportWidth, max])

    const beginPan = (e: React.PointerEvent<HTMLDivElement>) => {
        // Only enable when content wider than viewport
        if (contentWidth <= viewportWidth) {
            return
        }
        const target = e.currentTarget as HTMLDivElement
        if (
            typeof (target as unknown as { setPointerCapture?: (id: number) => void }).setPointerCapture === 'function'
        ) {
            ;(target as unknown as { setPointerCapture: (id: number) => void }).setPointerCapture(e.pointerId)
        }
        panStateRef.current = { startClientX: e.clientX, startOffset: offsetPx, isPanning: true }
    }

    const panMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const st = panStateRef.current
        if (!st?.isPanning) {
            return
        }
        const dx = e.clientX - st.startClientX
        const next = st.startOffset + dx
        const minOffset = Math.min(0, viewportWidth - contentWidth)
        setOffsetPx(Math.max(minOffset, Math.min(0, next)))
    }

    const endPan = (e: React.PointerEvent<HTMLDivElement>) => {
        const target = e.currentTarget as HTMLDivElement
        if (
            typeof (target as unknown as { releasePointerCapture?: (id: number) => void }).releasePointerCapture ===
            'function'
        ) {
            ;(target as unknown as { releasePointerCapture: (id: number) => void }).releasePointerCapture(e.pointerId)
        }
        if (panStateRef.current) {
            panStateRef.current.isPanning = false
        }
    }

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (contentWidth <= viewportWidth) {
            return
        }
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
        if (delta === 0) {
            return
        }
        e.preventDefault()
        const minOffset = Math.min(0, viewportWidth - contentWidth)
        setOffsetPx((prev) => {
            const next = prev - delta
            return Math.max(minOffset, Math.min(0, next))
        })
    }

    return (
        <div ref={viewportRef} className={`w-full overflow-hidden ${className}`} onWheel={handleWheel}>
            {/* Ticks and month labels */}
            <div
                className="relative mt-2 select-none"
                style={{ width: '100%' }}
                onPointerDown={beginPan}
                onPointerMove={panMove}
                onPointerUp={endPan}
                onPointerCancel={endPan}
            >
                <div
                    ref={containerRef}
                    className="relative pt-6"
                    style={{ width: `${contentWidth}px`, transform: `translateX(${offsetPx}px)` }}
                >
                    {/* Year separators and labels */}
                    {showYearLabels ? (
                        <div className="pointer-events-none absolute left-0 right-0 top-0 h-6">
                            {(() => {
                                const parts: JSX.Element[] = []
                                let start = 0
                                let currentYear = months[0]?.year
                                for (let i = 1; i <= months.length; i++) {
                                    const year = months[i]?.year
                                    if (year !== currentYear || i === months.length) {
                                        if (i < months.length) {
                                            const left = `${percentForIndex(i)}%`
                                            parts.push(
                                                <div
                                                    key={`sep-${i}`}
                                                    className="absolute -translate-x-1/2 top-[22px]"
                                                    style={{ left }}
                                                >
                                                    <div className="w-[2px] h-5 bg-black/80" />
                                                </div>
                                            )
                                        }
                                        const midIndex = Math.floor((start + (i - 1)) / 2)
                                        const midLeft = `${percentForIndex(midIndex)}%`
                                        if (currentYear != null) {
                                            parts.push(
                                                <div
                                                    key={`year-${currentYear}-${start}`}
                                                    className="absolute -translate-x-1/2 top-0"
                                                    style={{ left: midLeft }}
                                                >
                                                    <span className="text-sm font-semibold text-primary">
                                                        {currentYear}
                                                    </span>
                                                </div>
                                            )
                                        }
                                        start = i
                                        currentYear = year
                                    }
                                }
                                return parts
                            })()}
                        </div>
                    ) : null}
                    {/* Activity dots row */}
                    <div className="relative h-3">
                        {months.map((m, i) => {
                            const bins = activity?.[i] || Array.from({ length: binsPerMonth }, () => 0)
                            return bins.map((count, k) => {
                                const pos = ((i + (k + 0.5) / bins.length) / max) * 100
                                const inRange =
                                    i + (k + 0.5) / bins.length >= value[0] && i + (k + 0.5) / bins.length <= value[1]
                                const intensity = count
                                // Color mapping: black = no activity, then light green -> darker green
                                let colorClass = 'bg-black'
                                if (intensity === 1) {
                                    colorClass = 'bg-green opacity-60'
                                } else if (intensity === 2) {
                                    colorClass = 'bg-green opacity-80'
                                } else if (intensity >= 3) {
                                    colorClass = 'bg-green opacity-100'
                                }
                                const finalClass = colorClass
                                return (
                                    <div
                                        key={`${i}-${k}`}
                                        className="absolute -translate-x-1/2 top-1/2 -mt-[3px]"
                                        style={{ left: `${pos}%` }}
                                    >
                                        <div className={`h-1.5 w-1.5 rounded-sm ${finalClass}`} />
                                    </div>
                                )
                            })
                        })}
                    </div>
                    {/* Ticks */}
                    <div className="pointer-events-none relative h-3">
                        {months.map((m, i) => {
                            const left = `${percentForIndex(i)}%`
                            const isActive = i >= value[0] && i <= value[1]
                            return (
                                <div key={m.key || `${i}`} className="absolute -translate-x-1/2" style={{ left }}>
                                    <div
                                        className={`w-px ${
                                            isActive ? 'bg-light-10 dark:bg-light-2' : 'bg-light-6 dark:bg-light-5'
                                        }`}
                                        style={{ height: i % 3 === 0 ? 12 : 8 }}
                                    />
                                </div>
                            )
                        })}
                    </div>

                    {/* Draggable selection window */}
                    <div className="absolute left-0 right-0 top-0 bottom-0">
                        <div
                            role="slider"
                            aria-valuemin={0}
                            aria-valuemax={max}
                            aria-valuenow={value[0]}
                            aria-label="Timeline window"
                            className="absolute top-2 bottom-2 rounded-md border border-primary/80 bg-transparent cursor-grab active:cursor-grabbing touch-none"
                            style={{
                                left: `${percentForIndex(value[0])}%`,
                                right: `${100 - percentForIndex(value[1])}%`,
                            }}
                            onPointerDown={handleWindowPointerDown}
                            onPointerMove={handleWindowPointerMove}
                            onPointerUp={handleWindowPointerUp}
                            onPointerCancel={handleWindowPointerUp}
                            onDoubleClick={handleWindowDoubleClick}
                        >
                            {/* Resize handles */}
                            <div
                                aria-label="Resize start"
                                className="absolute inset-y-0 -left-1 w-3 cursor-ew-resize flex items-center justify-center"
                                onPointerDown={(e) => startResize(e, 'resize-start')}
                                onPointerMove={handleWindowPointerMove}
                                onPointerUp={handleWindowPointerUp}
                                onPointerCancel={handleWindowPointerUp}
                            >
                                <div className="w-px h-4 bg-input" />
                            </div>
                            <div
                                aria-label="Resize end"
                                className="absolute inset-y-0 -right-1 w-3 cursor-ew-resize flex items-center justify-center"
                                onPointerDown={(e) => startResize(e, 'resize-end')}
                                onPointerMove={handleWindowPointerMove}
                                onPointerUp={handleWindowPointerUp}
                                onPointerCancel={handleWindowPointerUp}
                            >
                                <div className="w-px h-4 bg-input" />
                            </div>
                        </div>
                    </div>

                    {/* Labels */}
                    <div
                        className="mt-2 grid gap-1"
                        style={{ gridTemplateColumns: `repeat(${months.length}, minmax(0, 1fr))` }}
                    >
                        {months.map((m, i) => {
                            const isActive = i >= value[0] && i <= value[1]
                            return (
                                <div key={m.key || `${i}`} className="text-center text-[10px] leading-none select-none">
                                    <span className={`${isActive ? 'text-primary font-semibold' : 'text-muted'}`}>
                                        {m.label}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimelineSlider
