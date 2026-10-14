import React, { useState } from 'react'
import {
    AXIS_TEXT,
    GRIDLINE,
    Marker,
    SERIES,
    Tooltip,
    areaPath,
    delayStyle,
    linePath,
    nearestIndex,
    scale,
} from '../charts'
import type { ChartProps, TooltipState } from '../charts'

const WEEKLY_ACTIVATION = [30.8, 31.6, 30.2, 31.9, 30.7, 31.4, 36.1, 36.9, 37.8, 37.2, 38.4, 38.1]
const RELEASE_WEEK = 6
const RELEASE_LABEL = 'v2 onboarding'
const Y_DOMAIN: [number, number] = [26, 42]
const Y_TICKS = [30, 35, 40]
const SERIES_COLOR = SERIES.purple
const AXIS_SPACE = 26
const TOP_SPACE = 22
const RIGHT_SPACE = 8
const BOTTOM_SPACE = 18
const DRAW_MS = 1200
const AVERAGE_DELAY_MS = 1250

const average = (values: number[]): number => values.reduce((sum, value) => sum + value, 0) / values.length

const BEFORE = average(WEEKLY_ACTIVATION.slice(0, RELEASE_WEEK))
const AFTER = average(WEEKLY_ACTIVATION.slice(RELEASE_WEEK))

export const ACTIVATION_LIFT = `${Math.round((AFTER / BEFORE - 1) * 100)}%`
export const ACTIVATION_AVERAGES = `avg ${Math.round(BEFORE)}% → ${Math.round(AFTER)}%`

export default function ActivationTrend({ width, height }: ChartProps): JSX.Element {
    const [hovered, setHovered] = useState<number | null>(null)
    const baseline = height - BOTTOM_SPACE
    const x = scale([0, WEEKLY_ACTIVATION.length - 1], [AXIS_SPACE, width - RIGHT_SPACE])
    const y = scale(Y_DOMAIN, [baseline, TOP_SPACE])
    const points = WEEKLY_ACTIVATION.map((value, index) => ({ x: x(index), y: y(value) }))
    const releaseX = x(RELEASE_WEEK - 0.5)
    const tooltip: TooltipState | null =
        hovered === null
            ? null
            : {
                  x: points[hovered].x,
                  y: points[hovered].y,
                  title: `Week ${hovered + 1}`,
                  rows: [{ label: 'Activated', value: `${WEEKLY_ACTIVATION[hovered].toFixed(1)}%` }],
              }

    return (
        <div
            className="relative size-full"
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
            <svg width={width} height={height} className="absolute inset-0 overflow-visible">
                {Y_TICKS.map((tick) => (
                    <g key={tick}>
                        <line x1={AXIS_SPACE} x2={width - RIGHT_SPACE} y1={y(tick)} y2={y(tick)} style={GRIDLINE} />
                        <text x={AXIS_SPACE - 6} y={y(tick) + 3} textAnchor="end" className={AXIS_TEXT}>
                            {tick}%
                        </text>
                    </g>
                ))}
                <text x={x(0)} y={height - 4} className={AXIS_TEXT}>
                    W1
                </text>
                <text x={x(WEEKLY_ACTIVATION.length - 1)} y={height - 4} textAnchor="end" className={AXIS_TEXT}>
                    W{WEEKLY_ACTIVATION.length}
                </text>
                <path
                    d={areaPath(points.slice(RELEASE_WEEK - 1), baseline)}
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
                <g className="data-story-fade" style={delayStyle(DRAW_MS * (RELEASE_WEEK / WEEKLY_ACTIVATION.length))}>
                    <line
                        x1={releaseX}
                        x2={releaseX}
                        y1={TOP_SPACE - 8}
                        y2={baseline}
                        style={{ stroke: 'rgb(var(--text-secondary))' }}
                    />
                    <text
                        x={releaseX + 5}
                        y={TOP_SPACE - 1}
                        className="fill-current text-[10px] font-semibold text-primary"
                    >
                        {RELEASE_LABEL}
                    </text>
                </g>
                {[
                    { from: 0, to: RELEASE_WEEK - 1, value: BEFORE },
                    { from: RELEASE_WEEK, to: WEEKLY_ACTIVATION.length - 1, value: AFTER },
                ].map(({ from, to, value }) => (
                    <g key={from} className="data-story-fade" style={delayStyle(AVERAGE_DELAY_MS)}>
                        <line
                            x1={x(from)}
                            x2={x(to)}
                            y1={y(value)}
                            y2={y(value)}
                            style={{ stroke: 'rgb(var(--text-secondary) / 0.6)' }}
                        />
                    </g>
                ))}
                {hovered !== null && (
                    <>
                        <line
                            x1={points[hovered].x}
                            x2={points[hovered].x}
                            y1={TOP_SPACE}
                            y2={baseline}
                            style={{ stroke: 'rgb(var(--text-secondary) / 0.5)' }}
                        />
                        <Marker x={points[hovered].x} y={points[hovered].y} series={SERIES_COLOR} />
                    </>
                )}
            </svg>
            <Tooltip state={tooltip} width={width} />
        </div>
    )
}
