import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** The leak, drawn: starts above, finishes below, and the filled gap – the vanished – is the subject. */

const WIDTH = 300
const HEIGHT = 110
const PAD = 3
/** Top of the plot area – leaves room for the marker label above. */
const TOP = 8

export interface LeakFunnelProps {
    /** 0–1 per point: everyone who starts the action. The top edge of the flow. */
    starts: number[]
    /** 0–1 per point, same length: everyone who finishes. Falls below `starts` at the leak. */
    finishes: number[]
    /** 0–1 along the x-axis: the deploy the drop is measured against. */
    markerAt?: number
    markerLabel?: string
    /** Printed on the gap, e.g. "~1,240/day vanish here – no error, no alert". */
    leakLabel?: string
    /** Legend line for the top edge, e.g. "Started · ~4,000/day". */
    startsLabel?: string
    /** Legend line for the lower edge, e.g. "Finished · 92% → 61%". */
    finishesLabel?: string
}

const x = (index: number, count: number) => PAD + (index * (WIDTH - PAD * 2)) / (count - 1)
const y = (value: number) => TOP + (1 - value) * (HEIGHT - TOP - PAD)

function lineFor(values: number[]): string {
    return values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i, values.length).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
}

/** The gap: down the finishes curve, then back along the starts curve. */
function gapFor(starts: number[], finishes: number[]): string {
    const down = finishes.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i, finishes.length).toFixed(1)} ${y(v).toFixed(1)}`)
    const back = [...starts].map((v, i) => `L ${x(i, starts.length).toFixed(1)} ${y(v).toFixed(1)}`).reverse()
    return `${down.join(' ')} ${back.join(' ')} Z`
}

export default function LeakFunnel({
    starts,
    finishes,
    markerAt = 0.5,
    markerLabel,
    leakLabel,
    startsLabel,
    finishesLabel,
}: LeakFunnelProps): JSX.Element {
    const reducedMotion = useReducedMotion()
    const markerX = PAD + markerAt * (WIDTH - PAD * 2)

    return (
        <div className="@container">
            {markerLabel && (
                <div className="relative mb-1 h-[1.1em]">
                    <span
                        className="absolute -translate-x-1/2 whitespace-nowrap text-[0.7em] uppercase tracking-wide text-secondary"
                        style={{ left: `${(markerX / WIDTH) * 100}%` }}
                    >
                        {markerLabel}
                    </span>
                </div>
            )}

            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full" role="img" aria-label={leakLabel}>
                <line
                    x1={PAD}
                    y1={HEIGHT - PAD}
                    x2={WIDTH - PAD}
                    y2={HEIGHT - PAD}
                    className="stroke-primary opacity-20"
                    strokeWidth={1}
                />
                <line
                    x1={markerX}
                    y1={TOP}
                    x2={markerX}
                    y2={HEIGHT}
                    className="stroke-orange opacity-40"
                    strokeWidth={1}
                    strokeDasharray="2 3"
                />

                {/* The leak itself: filled after the lines have drawn it into existence. */}
                <motion.path
                    d={gapFor(starts, finishes)}
                    className="fill-orange"
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 0.22 }}
                    transition={{ delay: 1.1, duration: 0.5, ease: 'easeOut' }}
                />

                <motion.path
                    d={lineFor(starts)}
                    fill="none"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-primary opacity-45"
                    initial={reducedMotion ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: 'easeInOut' }}
                />
                <motion.path
                    d={lineFor(finishes)}
                    fill="none"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-orange"
                    initial={reducedMotion ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.35, ease: 'easeInOut' }}
                />
            </svg>

            {/* The label points at the gap, printed under the chart where there's room to read. */}
            <div className="mt-2 flex flex-col gap-1 text-[0.7em] leading-snug">
                {leakLabel && (
                    <motion.p
                        className="m-0 flex items-baseline gap-1.5 font-semibold text-primary"
                        initial={reducedMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.3 }}
                    >
                        <span
                            aria-hidden="true"
                            className="inline-block size-2 shrink-0 self-center bg-orange opacity-40"
                        />
                        {leakLabel}
                    </motion.p>
                )}
                <p className="m-0 flex flex-wrap gap-x-4 gap-y-0.5 text-secondary">
                    {startsLabel && (
                        <span className="inline-flex items-baseline gap-1.5">
                            <span
                                aria-hidden="true"
                                className="inline-block h-0.5 w-3 shrink-0 self-center bg-current text-primary opacity-45"
                            />
                            {startsLabel}
                        </span>
                    )}
                    {finishesLabel && (
                        <span className="inline-flex items-baseline gap-1.5">
                            <span
                                aria-hidden="true"
                                className="inline-block h-0.5 w-3 shrink-0 self-center bg-orange"
                            />
                            {finishesLabel}
                        </span>
                    )}
                </p>
            </div>
        </div>
    )
}
