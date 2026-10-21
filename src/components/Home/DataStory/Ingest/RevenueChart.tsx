import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { animate, motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../../../utils'
import { Bin, Board, CHART_SECONDS, TICK_MS } from './board'
import BoardWindow from './BoardWindow'
import { formatDollars } from './StoreWindow'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
const MIN_REVENUE_RANGE = 40
const REVENUE_TOP = 18
const REVENUE_BOTTOM = 92
const RECENT_PAYMENT_MS = 4000
const VIEW_EASE_S = 0.6
const MARKER_TOP_LIMIT = 10
const MARKER_BOTTOM_LIMIT = 96
const MARKER_MIN_GAP = 14
const REVENUE_MILESTONES = [
    { amount: 1699, label: 'a MacBook Pro' },
    { amount: 4400, label: 'a month of SF rent' },
    { amount: 13200, label: '1 second of Apple revenue' },
    { amount: 23500, label: '50k packs of ramen' },
    { amount: 500000, label: 'a YC check' },
    { amount: 8000000, label: 'a Super Bowl ad' },
    { amount: 14000000, label: 'one night of the Eras Tour' },
    { amount: 100000000, label: 'ready to IPO' },
    { amount: 1000000000, label: 'unicorn revenue' },
]

const sum = (values: number[]): number => values.reduce((total, value) => total + value, 0)

const ChartArea = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={cn('relative h-28 overflow-hidden border-b border-l border-primary', className)}>
        {[25, 50, 75].map((line) => (
            <span
                key={line}
                className="absolute inset-x-0 border-t border-dashed border-primary"
                style={{ top: `${line}%` }}
            />
        ))}
        {children}
    </div>
)

const ScrollingTrack = ({ bins, children }: { bins: Bin[]; children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null)
    const reduceMotion = useReducedMotion()
    const newestSecond = bins[bins.length - 1].second
    useIsomorphicLayoutEffect(() => {
        const track = ref.current
        if (!track || reduceMotion) return
        const animation = track.animate(
            [{ transform: 'translateX(0%)' }, { transform: `translateX(-${100 / bins.length}%)` }],
            { duration: TICK_MS, easing: 'linear', fill: 'forwards' }
        )
        return () => animation.cancel()
    }, [newestSecond, reduceMotion])
    return (
        <div
            ref={ref}
            className="absolute inset-y-0 left-0"
            style={{ width: `${(bins.length / (bins.length - 1)) * 100}%` }}
        >
            {children}
        </div>
    )
}

interface RevenueView {
    start: number
    range: number
}

const revenuePosition = (amount: number, { start, range }: RevenueView): number =>
    REVENUE_BOTTOM - ((amount - start) / range) * (REVENUE_BOTTOM - REVENUE_TOP)

const revenueLine = (bins: Bin[], start: number, view: RevenueView): string => {
    let running = start
    const steps = bins.map((bin, index) => {
        const before = revenuePosition(running, view)
        running += bin.revenue
        return `L ${index} ${before} L ${index} ${revenuePosition(running, view)}`
    })
    return `M 0 ${revenuePosition(start, view)} ${steps.join(' ')} L ${bins.length} ${revenuePosition(running, view)}`
}

const placeMilestones = (markers: (HTMLSpanElement | null)[], view: RevenueView): void => {
    let lastShown = -Infinity
    REVENUE_MILESTONES.forEach(({ amount }, index) => {
        const marker = markers[index]
        if (!marker) return
        const position = revenuePosition(amount, view)
        const shown =
            position >= MARKER_TOP_LIMIT &&
            position <= MARKER_BOTTOM_LIMIT &&
            Math.abs(position - lastShown) >= MARKER_MIN_GAP
        if (shown) lastShown = position
        marker.style.top = `${Math.min(100, Math.max(0, position))}%`
        marker.style.opacity = shown ? '1' : '0'
    })
}

const useEasedView = (target: RevenueView, draw: (view: RevenueView) => void): void => {
    const reduceMotion = useReducedMotion()
    const view = useRef(target)
    const drawRef = useRef(draw)
    drawRef.current = draw
    useIsomorphicLayoutEffect(() => drawRef.current(view.current))
    useEffect(() => {
        const from = view.current
        if (from.start === target.start && from.range === target.range) return
        if (reduceMotion) {
            view.current = target
            drawRef.current(target)
            return
        }
        const controls = animate(0, 1, {
            duration: VIEW_EASE_S,
            ease: 'easeOut',
            onUpdate: (progress) => {
                view.current = {
                    start: from.start + (target.start - from.start) * progress,
                    range: from.range * (target.range / from.range) ** progress,
                }
                drawRef.current(view.current)
            },
        })
        return () => controls.stop()
    }, [target.start, target.range, reduceMotion])
}

export default function RevenueChart({ board, className }: { board: Board; className?: string }): JSX.Element {
    const { bins, revenue, rows, now } = board
    const windowRevenue = sum(bins.map((bin) => bin.revenue))
    const start = revenue - windowRevenue
    const lineRef = useRef<SVGPathElement>(null)
    const areaRef = useRef<SVGPathElement>(null)
    const markerRefs = useRef<(HTMLSpanElement | null)[]>([])
    useEasedView({ start, range: Math.max(MIN_REVENUE_RANGE, windowRevenue) }, (view) => {
        const line = revenueLine(bins, start, view)
        lineRef.current?.setAttribute('d', line)
        areaRef.current?.setAttribute('d', `${line} L ${bins.length} 100 L 0 100 Z`)
        placeMilestones(markerRefs.current, view)
    })
    const latest = rows.find(({ amount }) => amount)
    const recent = latest && now - latest.at < RECENT_PAYMENT_MS
    return (
        <BoardWindow
            title="Stripe revenue"
            aside={`+${formatDollars(windowRevenue)} · ${CHART_SECONDS}s`}
            className={className}
        >
            <div className="px-3 pb-2 pt-2" aria-hidden="true">
                <div className="mb-1.5 flex items-baseline gap-2">
                    <motion.span
                        key={revenue}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        className="shrink-0 text-2xl font-bold tabular-nums"
                    >
                        {formatDollars(revenue)}
                    </motion.span>
                    <span className="min-w-0 truncate font-mono text-[11px]">
                        {recent && latest && (
                            <span className="text-green">
                                +{formatDollars(latest.amount ?? 0)} from {latest.person}
                            </span>
                        )}
                    </span>
                </div>
                <ChartArea className="h-24">
                    <ScrollingTrack bins={bins}>
                        <svg
                            viewBox={`0 0 ${bins.length} 100`}
                            preserveAspectRatio="none"
                            className="absolute inset-0 size-full text-green"
                        >
                            <path ref={areaRef} fill="currentColor" fillOpacity={0.12} />
                            <path
                                ref={lineRef}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinejoin="round"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </ScrollingTrack>
                    {REVENUE_MILESTONES.map(({ amount, label }, index) => (
                        <span
                            key={amount}
                            ref={(marker) => {
                                markerRefs.current[index] = marker
                            }}
                            className="pointer-events-none absolute inset-x-0 z-10 border-t border-dotted border-green/50 opacity-0 transition-opacity duration-300"
                        >
                            <span className="absolute bottom-px left-1 whitespace-nowrap rounded-sm bg-primary px-1 font-mono text-[10px] leading-4 text-muted">
                                {label}
                            </span>
                        </span>
                    ))}
                </ChartArea>
            </div>
        </BoardWindow>
    )
}
