import React, { useState } from 'react'
import { AXIS_TEXT, GRIDLINE, Marker, SERIES, Tooltip, delayStyle, linePath, nearestIndex, scale } from '../charts'
import type { ChartProps, Series, TooltipState } from '../charts'

interface Plan {
    name: string
    series: Series
    retained: number[]
}

export const PLANS: Plan[] = [
    { name: 'Team', series: SERIES.blue, retained: [100, 71, 63, 60, 58, 57, 56, 56, 55] },
    { name: 'Pro', series: SERIES.orange, retained: [100, 58, 47, 42, 39, 37, 36, 35, 34] },
    { name: 'Free', series: SERIES.purple, retained: [100, 42, 31, 25, 22, 20, 19, 18, 18] },
]

const WEEKS = PLANS[0].retained.length
const Y_TICKS = [25, 50, 75, 100]
const AXIS_SPACE = 30
const LABEL_SPACE = 64
const TOP_SPACE = 6
const BOTTOM_SPACE = 18
const DRAW_MS = 1100
const STAGGER_MS = 220
const DIMMED_OPACITY = 0.35

const final = (plan: Plan): number => plan.retained[WEEKS - 1]

export const RETENTION_MULTIPLE = `${Math.round(final(PLANS[0]) / final(PLANS[PLANS.length - 1]))}×`

export function PlanLegend(): JSX.Element {
    return (
        <span className="flex items-center gap-2 font-mono text-[10px] leading-4 text-muted">
            {PLANS.map(({ name, series }) => (
                <span key={name} className="flex items-center gap-1">
                    <span className={`size-2 rounded-full ${series.swatch}`} />
                    {name}
                </span>
            ))}
        </span>
    )
}

export default function RetentionByPlan({ width, height, isAnswered }: ChartProps): JSX.Element {
    const [hovered, setHovered] = useState<number | null>(null)
    const baseline = height - BOTTOM_SPACE
    const x = scale([0, WEEKS - 1], [AXIS_SPACE, width - LABEL_SPACE])
    const y = scale([0, 100], [baseline, TOP_SPACE])
    const lines = PLANS.map((plan) => ({
        ...plan,
        points: plan.retained.map((value, week) => ({ x: x(week), y: y(value) })),
    }))
    const xs = lines[0].points.map((point) => point.x)
    const tooltip: TooltipState | null =
        hovered === null
            ? null
            : {
                  x: xs[hovered],
                  y: Math.min(...lines.map((line) => line.points[hovered].y)),
                  title: hovered === 0 ? 'Signup week' : `Week ${hovered}`,
                  rows: PLANS.map((plan) => ({
                      label: plan.name,
                      value: `${plan.retained[hovered]}%`,
                      swatchClassName: plan.series.swatch,
                  })),
              }

    return (
        <div
            className="relative size-full"
            onPointerMove={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect()
                setHovered(nearestIndex(event.clientX - bounds.left, xs))
            }}
            onPointerLeave={() => setHovered(null)}
        >
            <svg width={width} height={height} className="absolute inset-0 overflow-visible">
                {Y_TICKS.map((tick) => (
                    <g key={tick}>
                        <line x1={AXIS_SPACE} x2={width - LABEL_SPACE} y1={y(tick)} y2={y(tick)} style={GRIDLINE} />
                        <text x={AXIS_SPACE - 6} y={y(tick) + 3} textAnchor="end" className={AXIS_TEXT}>
                            {tick}%
                        </text>
                    </g>
                ))}
                <text x={x(0)} y={height - 4} className={AXIS_TEXT}>
                    W0
                </text>
                <text x={x(WEEKS - 1)} y={height - 4} textAnchor="end" className={AXIS_TEXT}>
                    W{WEEKS - 1}
                </text>
                {lines.map((line, index) => (
                    <g
                        key={line.name}
                        className="transition-opacity duration-500"
                        style={{ opacity: isAnswered && index > 0 ? DIMMED_OPACITY : 1 }}
                    >
                        <path
                            d={linePath(line.points)}
                            pathLength={1}
                            fill="none"
                            strokeWidth={2}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            className={`data-story-draw ${line.series.stroke}`}
                            style={{ ...delayStyle(index * STAGGER_MS), ['--duration' as string]: `${DRAW_MS}ms` }}
                        />
                        <text
                            x={x(WEEKS - 1) + 8}
                            y={line.points[WEEKS - 1].y + 3}
                            className="data-story-fade fill-current text-[10px] text-secondary"
                            style={delayStyle(DRAW_MS + index * STAGGER_MS)}
                        >
                            <tspan className="font-semibold text-primary">{line.name}</tspan> {final(line)}%
                        </text>
                    </g>
                ))}
                {hovered !== null && (
                    <>
                        <line
                            x1={xs[hovered]}
                            x2={xs[hovered]}
                            y1={TOP_SPACE}
                            y2={baseline}
                            style={{ stroke: 'rgb(var(--text-secondary) / 0.5)' }}
                        />
                        {lines.map((line) => (
                            <Marker key={line.name} x={xs[hovered]} y={line.points[hovered].y} series={line.series} />
                        ))}
                    </>
                )}
            </svg>
            <Tooltip state={tooltip} width={width} />
        </div>
    )
}
