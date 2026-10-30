import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export interface DivergenceSeries {
    label: string
    /** What the line does, in a few words. Printed under the label. */
    note?: string
    /** 0–1, normalized within this series. Its own axis – these are different units. */
    values: number[]
    /** The line that moved. Drawn in the volume color; the others stay quiet. */
    emphasis?: boolean
}

const WIDTH = 300
const HEIGHT = 46
const PAD = 3

function pathFor(values: number[]): string {
    const step = (WIDTH - PAD * 2) / (values.length - 1)
    return values
        .map((value, index) => {
            const x = PAD + index * step
            const y = PAD + (1 - value) * (HEIGHT - PAD * 2)
            return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
        })
        .join(' ')
}

/** The discriminator, drawn as small multiples – different units, so a shared axis would lie. */
export default function Divergence({
    series,
    markerAt = 0.5,
    markerLabel,
}: {
    series: DivergenceSeries[]
    /** 0–1 along the x-axis: the deploy, release, or change everything is measured against. */
    markerAt?: number
    markerLabel?: string
}): JSX.Element {
    const reducedMotion = useReducedMotion()
    const markerX = PAD + markerAt * (WIDTH - PAD * 2)

    return (
        <div className="@container">
            {/* The label sits directly above its marker, aligned via a mirrored grid row. */}
            {markerLabel && (
                <div className="mb-1 grid grid-cols-1 items-center gap-1 @sm:grid-cols-[8rem_1fr]">
                    <span aria-hidden="true" className="hidden @sm:block" />
                    <div className="relative h-[1.1em]">
                        <span
                            className="absolute -translate-x-1/2 whitespace-nowrap text-[0.7em] uppercase tracking-wide text-secondary"
                            style={{ left: `${((PAD + markerAt * (WIDTH - PAD * 2)) / WIDTH) * 100}%` }}
                        >
                            {markerLabel}
                        </span>
                    </div>
                </div>
            )}

            <div className="relative">
                {/* One continuous marker; stacked layouts keep per-chart lines to spare the labels. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 hidden grid-cols-[8rem_1fr] gap-1 @sm:grid"
                >
                    <span />
                    <span className="relative block">
                        <span
                            className="absolute inset-y-0 w-px text-orange opacity-40"
                            style={{
                                left: `${((PAD + markerAt * (WIDTH - PAD * 2)) / WIDTH) * 100}%`,
                                background:
                                    'repeating-linear-gradient(to bottom, currentColor 0 3px, transparent 3px 7px)',
                            }}
                        />
                    </span>
                </div>
                <div className="space-y-3">
                    {series.map((line, index) => (
                        <div key={line.label} className="grid grid-cols-1 items-center gap-1 @sm:grid-cols-[8rem_1fr]">
                            <div className="min-w-0">
                                <p className="m-0 text-[0.8em] font-bold leading-tight text-primary">{line.label}</p>
                                {line.note && (
                                    <p className="m-0 text-[0.8em] leading-tight text-secondary">{line.note}</p>
                                )}
                            </div>

                            <svg
                                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                                className="h-auto w-full"
                                role="img"
                                aria-label={`${line.label}: ${line.note ?? ''}`}
                            >
                                {/* Baseline, so a flat line still reads as a measurement. */}
                                <line
                                    x1={PAD}
                                    y1={HEIGHT - PAD}
                                    x2={WIDTH - PAD}
                                    y2={HEIGHT - PAD}
                                    className="stroke-primary opacity-20"
                                    strokeWidth={1}
                                />
                                {/* Per-chart marker only where the continuous overlay can't run. */}
                                <line
                                    x1={markerX}
                                    y1={0}
                                    x2={markerX}
                                    y2={HEIGHT}
                                    className="stroke-orange opacity-40 @sm:hidden"
                                    strokeWidth={1}
                                    strokeDasharray="2 3"
                                />
                                {/* Same weight for every series – color alone carries the emphasis. */}
                                <motion.path
                                    d={pathFor(line.values)}
                                    fill="none"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={line.emphasis ? 'stroke-orange' : 'stroke-primary opacity-45'}
                                    initial={reducedMotion ? false : { pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.1, delay: 0.15 + index * 0.25, ease: 'easeInOut' }}
                                />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
