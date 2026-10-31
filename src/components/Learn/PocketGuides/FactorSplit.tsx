import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** One total split into its two factors, with a bar on the one that differs. */

export interface FactorSplitRow {
    /** Who or what this row is, e.g. "User A". */
    label: string
    /** The headline number both rows share, e.g. "$400". */
    total: string
    /** The two factors, in the order the header names them. */
    factors: [string, string]
    /** 0–1, the second factor relative to the largest row. Drives the bar width. */
    weight: number
    /** What the row turns out to be, e.g. "Growth". */
    verdict: string
    /** `concern` gets the orange treatment; `healthy` stays quiet. */
    tone: 'healthy' | 'concern'
}

// `bg-primary` is the page background, not ink – `bg-current text-primary` is how you fill with ink.
const TONE: Record<FactorSplitRow['tone'], { chip: string; bar: string }> = {
    healthy: {
        chip: 'bg-accent text-secondary border border-primary dark:bg-accent-dark',
        bar: 'bg-current text-primary opacity-40',
    },
    concern: {
        chip: 'bg-orange/10 text-orange border border-orange/40',
        bar: 'bg-orange',
    },
}

const HEAD = 'pb-1.5 pr-3 text-left text-[0.65em] font-bold uppercase tracking-wide text-secondary'
const CELL = 'border-t border-primary py-2 pr-3 align-middle text-[0.8em] leading-snug'

export default function FactorSplit({
    totalLabel,
    factorLabels,
    rows,
}: {
    /** Header for the shared number, e.g. "Monthly spend". */
    totalLabel: string
    /** Headers for the two factors, e.g. ["Traces", "Cost per trace"]. */
    factorLabels: [string, string]
    rows: FactorSplitRow[]
}): JSX.Element {
    const reducedMotion = useReducedMotion()

    return (
        <div className="@container">
            {/* The equation itself, stated once above the rows it explains. */}
            <p className="m-0 mb-3 text-[0.75em] leading-snug text-secondary">
                <span className="font-bold text-primary">{totalLabel}</span>
                {' = '}
                {factorLabels[0]}
                <span className="px-1 text-orange">&times;</span>
                {factorLabels[1]}
            </p>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className={HEAD}>&nbsp;</th>
                            <th className={HEAD}>{totalLabel}</th>
                            <th className={HEAD}>{factorLabels[0]}</th>
                            <th className={HEAD}>{factorLabels[1]}</th>
                            <th className={`${HEAD} pr-0 text-right`}>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => {
                            const tone = TONE[row.tone]
                            return (
                                <tr key={row.label}>
                                    <td className={`${CELL} font-bold text-primary`}>{row.label}</td>
                                    <td className={`${CELL} tabular-nums text-primary`}>{row.total}</td>
                                    <td className={`${CELL} tabular-nums text-secondary`}>{row.factors[0]}</td>
                                    <td className={CELL}>
                                        <span className="mb-1 block tabular-nums text-primary">{row.factors[1]}</span>
                                        {/* The bar is the point: same total, different unit cost. */}
                                        <span className="relative block h-1.5 w-full overflow-hidden rounded-sm">
                                            {/* Siblings, not nested: the track's opacity would multiply into the fill. */}
                                            <span className="absolute inset-0 bg-current text-primary opacity-10" />
                                            <motion.span
                                                className={`absolute inset-y-0 left-0 ${tone.bar}`}
                                                initial={
                                                    reducedMotion ? { width: `${row.weight * 100}%` } : { width: 0 }
                                                }
                                                whileInView={{ width: `${row.weight * 100}%` }}
                                                viewport={{ once: true, margin: '-40px' }}
                                                transition={
                                                    reducedMotion
                                                        ? { duration: 0 }
                                                        : { duration: 0.5, delay: 0.1 * index, ease: 'easeOut' }
                                                }
                                            />
                                        </span>
                                    </td>
                                    <td className={`${CELL} pr-0 text-right`}>
                                        <span
                                            className={`inline-block whitespace-nowrap rounded px-1.5 py-0.5 text-[0.8em] font-bold ${tone.chip}`}
                                        >
                                            {row.verdict}
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
