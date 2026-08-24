import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { AnatomyMarker } from './ReportAnatomy'

/** One LLM call, in context: the trace that contains it, the steps around it, what each cost. */

export interface TraceTreeRow {
    /** What kind of event this row is – it decides the color and the label chip. */
    kind: 'trace' | 'span' | 'generation'
    /** The event's name, set in mono like the property value it is. */
    label: string
    /** The numbers that make the row worth reading: tokens, latency, cost. */
    meta?: string
    /** Nesting depth. The trace is 0; its children are 1. */
    depth?: number
    /** Annotates this row with a hoverable number, for the one or two rows carrying the point. */
    marker?: { n: number; label: string; gloss: string }
}

const KIND: Record<TraceTreeRow['kind'], { text: string; classes: string }> = {
    trace: { text: '$ai_trace', classes: 'bg-purple/10 text-purple border border-purple/40' },
    span: { text: '$ai_span', classes: 'bg-accent text-secondary border border-primary dark:bg-accent-dark' },
    generation: { text: '$ai_generation', classes: 'bg-orange/10 text-orange border border-orange/40' },
}

export default function TraceTree({ rows }: { rows: TraceTreeRow[] }): JSX.Element {
    const reducedMotion = useReducedMotion()

    return (
        <ul className="@container group/anatomy m-0 list-none space-y-1 p-0">
            {rows.map((row, index) => {
                const kind = KIND[row.kind]
                return (
                    <motion.li
                        // Labels aren't unique – a trace can hold two calls to the same model, so
                        // the row index disambiguates. Safe here: rows are static and never reorder.
                        key={`${row.kind}-${row.label}-${index}`}
                        // Indent, plus a rule down the left: the tree reads as a hierarchy without
                        // drawing box characters that a screen reader would have to say out loud.
                        className={`flex flex-wrap items-baseline gap-x-2 gap-y-0.5 py-1 text-[0.75em] leading-snug ${
                            row.depth ? 'border-l border-primary pl-3' : ''
                        }`}
                        style={{ marginLeft: `${(row.depth ?? 0) * 1.25}em` }}
                        initial={reducedMotion ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + index * 0.2, duration: 0.3, ease: 'easeOut' }}
                    >
                        <span
                            className={`inline-flex shrink-0 select-none items-center rounded-sm px-1.5 py-0.5 font-code text-[0.8em] font-semibold leading-none ${kind.classes}`}
                        >
                            {kind.text}
                        </span>
                        <span className="min-w-0 font-code text-primary">{row.label}</span>
                        {row.meta && <span className="tabular-nums text-secondary">{row.meta}</span>}
                        {row.marker && <AnatomyMarker {...row.marker} />}
                    </motion.li>
                )
            })}
        </ul>
    )
}
