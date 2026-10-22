import React, { useMemo } from 'react'
import { cn } from '../../../../utils'
import BoardWindow from './BoardWindow'
import { AI_MODEL, BoxSummary, METRICS, Metric, MetricKey, niceCeiling, summarize } from './metrics'

const DOMAIN_HEADROOM = 1.05
const BOX_FILL_SHARE = '20%'
const MOVE = 'transition-[left,width] duration-500 ease-out'

const percentOf = (value: number, domainMax: number): number => Math.min(100, Math.max(0, (value / domainMax) * 100))

const domainMaxOf = (summary: BoxSummary): number =>
    niceCeiling(Math.max(summary.whiskerMax, summary.mean) * DOMAIN_HEADROOM)

const span = (from: number, to: number): React.CSSProperties => ({
    left: `${from}%`,
    width: `${Math.max(0, to - from)}%`,
})

const Whisker = ({ from, to }: { from: number; to: number }) => (
    <span className={cn('absolute top-1/2 h-px -translate-y-1/2 bg-current text-muted', MOVE)} style={span(from, to)} />
)

const WhiskerCap = ({ at }: { at: number }) => (
    <span
        className="absolute top-1/2 h-2.5 w-px -translate-y-1/2 bg-current text-muted transition-[left] duration-500 ease-out"
        style={{ left: `${at}%` }}
    />
)

const MetricRow = React.memo(function MetricRow({ metric, samples }: { metric: Metric; samples: number[] }) {
    const summary = useMemo(() => summarize(samples), [samples])
    if (!summary) return null
    const domainMax = domainMaxOf(summary)
    const at = (value: number): number => percentOf(value, domainMax)
    return (
        <li className="m-0 grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-x-3 gap-y-0.5">
            <span className="min-w-0 leading-tight">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <span className="size-2 shrink-0 rounded-sm" style={{ backgroundColor: metric.color }} />
                    <span className="truncate">{metric.label}</span>
                </span>
                <span className="block truncate font-mono text-[10px] text-muted">
                    median {metric.format(summary.median)}
                </span>
            </span>
            <div className="relative h-6">
                <span className="absolute inset-y-0 left-1/2 border-l border-dashed border-primary" />
                <Whisker from={at(summary.whiskerMin)} to={at(summary.p25)} />
                <Whisker from={at(summary.p75)} to={at(summary.whiskerMax)} />
                <WhiskerCap at={at(summary.whiskerMin)} />
                <WhiskerCap at={at(summary.whiskerMax)} />
                <span
                    className={cn('absolute inset-y-1 rounded-[3px] border', MOVE)}
                    style={{
                        ...span(at(summary.p25), at(summary.p75)),
                        borderColor: metric.color,
                        backgroundColor: `color-mix(in srgb, ${metric.color} ${BOX_FILL_SHARE}, transparent)`,
                    }}
                />
                <span
                    className="absolute inset-y-1 w-[3px] -translate-x-1/2 transition-[left] duration-500 ease-out"
                    style={{ left: `${at(summary.median)}%`, backgroundColor: metric.color }}
                />
                <span
                    className="absolute top-1/2 size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border bg-primary transition-[left] duration-500 ease-out"
                    style={{ left: `${at(summary.mean)}%`, borderColor: metric.color }}
                />
            </div>
            <span />
            <span className="flex justify-between font-mono text-[9px] leading-none text-muted">
                <span>{metric.format(0)}</span>
                <span>{metric.format(domainMax / 2)}</span>
                <span>{metric.format(domainMax)}</span>
            </span>
        </li>
    )
})

function BoxPlotChart({
    samples,
    className,
}: {
    samples: Record<MetricKey, number[]>
    className?: string
}): JSX.Element {
    return (
        <BoardWindow title="AI analytics" aside={`$ai_generation · ${AI_MODEL}`} className={className}>
            <ul className="m-0 flex list-none flex-col gap-3 p-3 pr-4" aria-hidden="true">
                {METRICS.map((metric) => (
                    <MetricRow key={metric.key} metric={metric} samples={samples[metric.key]} />
                ))}
            </ul>
            <p className="m-0 whitespace-nowrap border-t border-primary px-3 py-1.5 text-right font-mono text-[10px] text-muted">
                box p25–p75 · bar median · dot mean · whiskers 1.5×IQR
            </p>
        </BoardWindow>
    )
}

export default React.memo(BoxPlotChart)
