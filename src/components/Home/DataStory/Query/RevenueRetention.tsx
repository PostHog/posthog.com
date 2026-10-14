import React, { useEffect, useState } from 'react'
import { IconTrending } from '@posthog/icons'
import { Marker, SERIES, Tooltip, areaPath, delayStyle, linePath, nearestIndex, scale } from '../charts'
import type { ChartProps, TooltipState } from '../charts'

const MONTHS = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
const NET_REVENUE_RETENTION = [109, 110, 110, 111, 112, 112, 113, 114, 115, 116, 117, 118]
const COMPARE_MONTHS_BACK = 6
const SERIES_COLOR = SERIES.blue
const HEADLINE_HEIGHT = 64
const SPARK_TOP_SPACE = 10
const SPARK_BOTTOM_SPACE = 4
const SPARK_PADDING = 0.5
const COUNT_MS = 900
const DRAW_MS = 1000

const latest = NET_REVENUE_RETENTION[NET_REVENUE_RETENTION.length - 1]
const compared = NET_REVENUE_RETENTION[NET_REVENUE_RETENTION.length - 1 - COMPARE_MONTHS_BACK]
const easeOut = (progress: number): number => 1 - Math.pow(1 - progress, 3)

function useCountUp(from: number, to: number, isRunning: boolean): number {
    const [value, setValue] = useState(isRunning ? from : to)

    useEffect(() => {
        if (!isRunning) {
            setValue(to)
            return
        }
        const startedAt = performance.now()
        let frame = requestAnimationFrame(function step(now) {
            const progress = Math.min(1, (now - startedAt) / COUNT_MS)
            setValue(Math.round(from + (to - from) * easeOut(progress)))
            if (progress < 1) {
                frame = requestAnimationFrame(step)
            }
        })
        return () => cancelAnimationFrame(frame)
    }, [from, to, isRunning])

    return value
}

export default function RevenueRetention({ width, height, isAnswered, isStatic }: ChartProps): JSX.Element {
    const [hovered, setHovered] = useState<number | null>(null)
    const shown = useCountUp(compared, latest, isAnswered && !isStatic)
    const sparkTop = HEADLINE_HEIGHT + SPARK_TOP_SPACE
    const baseline = height - SPARK_BOTTOM_SPACE
    const x = scale([0, NET_REVENUE_RETENTION.length - 1], [0, width])
    const y = scale([Math.min(...NET_REVENUE_RETENTION) - SPARK_PADDING, latest + SPARK_PADDING], [baseline, sparkTop])
    const points = NET_REVENUE_RETENTION.map((value, index) => ({ x: x(index), y: y(value) }))
    const marked = hovered ?? NET_REVENUE_RETENTION.length - 1
    const tooltip: TooltipState | null =
        hovered === null
            ? null
            : {
                  x: points[hovered].x,
                  y: points[hovered].y,
                  title: MONTHS[hovered],
                  rows: [{ label: 'Net revenue retention', value: `${NET_REVENUE_RETENTION[hovered]}%` }],
              }

    return (
        <div className="relative size-full">
            <div className="flex items-end gap-3" style={{ height: HEADLINE_HEIGHT }}>
                <span className="text-5xl font-bold leading-none tabular-nums tracking-tight text-primary">
                    {shown}
                    <span className="text-2xl">%</span>
                </span>
                <span className="mb-1 flex items-center gap-1 rounded-full bg-accent px-1.5 text-[11px] font-semibold leading-5 text-primary">
                    <IconTrending className="size-3 text-green-dark dark:text-green" />
                    {latest - compared} pts since {MONTHS[MONTHS.length - 1 - COMPARE_MONTHS_BACK]}
                </span>
            </div>
            <svg
                width={width}
                height={height}
                className="absolute inset-0 overflow-visible"
                onPointerMove={(event) => {
                    const bounds = event.currentTarget.getBoundingClientRect()
                    setHovered(
                        nearestIndex(
                            event.clientX - bounds.left,
                            points.map((point) => point.x)
                        )
                    )
                }}
                onPointerLeave={() => setHovered(null)}
            >
                <rect x={0} y={sparkTop} width={width} height={baseline - sparkTop} fill="transparent" />
                <path
                    d={areaPath(points, baseline)}
                    className={`data-story-fade ${SERIES_COLOR.area}`}
                    style={delayStyle(DRAW_MS)}
                />
                <path
                    d={linePath(points)}
                    pathLength={1}
                    fill="none"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className={`data-story-draw ${SERIES_COLOR.stroke}`}
                    style={{ ['--duration' as string]: `${DRAW_MS}ms` }}
                />
                <g className="data-story-fade" style={delayStyle(hovered === null ? DRAW_MS : 0)}>
                    <Marker x={points[marked].x} y={points[marked].y} series={SERIES_COLOR} />
                </g>
            </svg>
            <Tooltip state={tooltip} width={width} />
        </div>
    )
}
