import React from 'react'

export interface Point {
    x: number
    y: number
}

export interface ChartProps {
    width: number
    height: number
    isAnswered: boolean
    isStatic: boolean
}

export interface TooltipRow {
    label: string
    value: string
    swatchClassName?: string
}

export interface TooltipState {
    x: number
    y: number
    title: string
    rows: TooltipRow[]
}

export interface Series {
    stroke: string
    fill: string
    area: string
    swatch: string
}

export const SERIES: Record<'blue' | 'orange' | 'purple' | 'red', Series> = {
    blue: { stroke: 'stroke-blue', fill: 'fill-blue', area: 'fill-blue/10', swatch: 'bg-blue' },
    orange: {
        stroke: 'stroke-orange dark:stroke-orange-dark',
        fill: 'fill-orange dark:fill-orange-dark',
        area: 'fill-orange/10 dark:fill-orange-dark/10',
        swatch: 'bg-orange dark:bg-orange-dark',
    },
    purple: { stroke: 'stroke-purple', fill: 'fill-purple', area: 'fill-purple/10', swatch: 'bg-purple' },
    red: { stroke: 'stroke-red', fill: 'fill-red', area: 'fill-red/10', swatch: 'bg-red' },
}

export const GRIDLINE = { stroke: 'rgb(var(--border) / 0.7)' }
export const SURFACE_RING = { stroke: 'rgb(var(--bg))' }
export const AXIS_TEXT = 'fill-current font-mono text-[10px] text-muted'

const TOOLTIP_HALF_WIDTH = 64
const TOOLTIP_GAP = 10

export const scale =
    (domain: [number, number], range: [number, number]) =>
    (value: number): number =>
        range[0] + ((value - domain[0]) / (domain[1] - domain[0])) * (range[1] - range[0])

export const linePath = (points: Point[]): string =>
    points.map(({ x, y }, index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join('')

export const areaPath = (points: Point[], baseline: number): string =>
    `${linePath(points)}L${points[points.length - 1].x.toFixed(1)},${baseline}L${points[0].x.toFixed(1)},${baseline}Z`

export function columnPath(x: number, top: number, width: number, baseline: number, radius = 4): string {
    const corner = Math.min(radius, width / 2, Math.max(0, baseline - top))
    return [
        `M${x},${baseline}`,
        `V${top + corner}`,
        `Q${x},${top} ${x + corner},${top}`,
        `H${x + width - corner}`,
        `Q${x + width},${top} ${x + width},${top + corner}`,
        `V${baseline}`,
        'Z',
    ].join('')
}

export const nearestIndex = (pointerX: number, xs: number[]): number =>
    xs.reduce((best, x, index) => (Math.abs(x - pointerX) < Math.abs(xs[best] - pointerX) ? index : best), 0)

export const delayStyle = (delayMs: number): React.CSSProperties => ({ ['--delay' as string]: `${delayMs}ms` })

export function Tooltip({ state, width }: { state: TooltipState | null; width: number }): JSX.Element | null {
    if (!state) {
        return null
    }
    const left = Math.min(Math.max(state.x, TOOLTIP_HALF_WIDTH), width - TOOLTIP_HALF_WIDTH)
    return (
        <div
            className="pointer-events-none absolute z-10 min-w-28 -translate-x-1/2 -translate-y-full rounded border border-primary bg-primary px-2 py-1.5 text-[11px] leading-4 shadow-lg"
            style={{ left, top: state.y - TOOLTIP_GAP }}
        >
            <div className="whitespace-nowrap font-semibold text-primary">{state.title}</div>
            {state.rows.map(({ label, value, swatchClassName }) => (
                <div key={label} className="flex items-center gap-1.5 whitespace-nowrap text-secondary">
                    {swatchClassName && <span className={`size-2 shrink-0 rounded-full ${swatchClassName}`} />}
                    {label}
                    <span className="ml-auto pl-3 tabular-nums text-primary">{value}</span>
                </div>
            ))}
        </div>
    )
}

export function Marker({ x, y, series }: { x: number; y: number; series: Series }): JSX.Element {
    return <circle cx={x} cy={y} r={5} className={series.fill} style={SURFACE_RING} strokeWidth={2} />
}
