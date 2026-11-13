import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** The scout's worklist: one row per flag, scanned in one at a time. An inventory, not a trend. */

export interface FlagLedgerRow {
    /** The flag key, set in mono like code. */
    flag: string
    /** Where the rollout sits, e.g. "100%". */
    rollout: string
    /** How long it's been there, e.g. "4 mo". */
    age: string
    /** Evaluations per day, e.g. "~29,000". */
    evaluations: string
    /** Where the key appears, e.g. "3 files" or "not found". */
    inCode: string
    /** What the scout concluded for this row. */
    verdict: 'remove' | 'question'
}

const VERDICT: Record<FlagLedgerRow['verdict'], { text: string; classes: string }> = {
    remove: { text: 'Remove', classes: 'bg-orange/10 text-orange border border-orange/40' },
    question: { text: 'Ask first', classes: 'bg-accent text-secondary border border-primary dark:bg-accent-dark' },
}

const HEAD_CLASSES = 'pb-1.5 pr-3 text-left text-[0.65em] font-bold uppercase tracking-wide text-secondary'
const CELL_CLASSES = 'border-t border-primary py-1.5 pr-3 align-baseline text-[0.75em] leading-snug'

export default function FlagLedger({ rows }: { rows: FlagLedgerRow[] }): JSX.Element {
    const reducedMotion = useReducedMotion()

    return (
        <div className="@container overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className={HEAD_CLASSES}>Flag</th>
                        <th className={HEAD_CLASSES}>Rollout</th>
                        <th className={HEAD_CLASSES}>Age</th>
                        <th className={`${HEAD_CLASSES} hidden @md:table-cell`}>Evals/day</th>
                        <th className={HEAD_CLASSES}>In code</th>
                        <th className={`${HEAD_CLASSES} pr-0 text-right`}>Verdict</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => {
                        const verdict = VERDICT[row.verdict]
                        return (
                            <motion.tr
                                key={row.flag}
                                initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.35, duration: 0.3, ease: 'easeOut' }}
                            >
                                <td className={`${CELL_CLASSES} whitespace-nowrap font-code text-[0.7em] text-primary`}>
                                    {row.flag}
                                </td>
                                <td className={`${CELL_CLASSES} tabular-nums text-primary`}>{row.rollout}</td>
                                <td className={`${CELL_CLASSES} whitespace-nowrap tabular-nums text-secondary`}>
                                    {row.age}
                                </td>
                                <td className={`${CELL_CLASSES} hidden tabular-nums text-secondary @md:table-cell`}>
                                    {row.evaluations}
                                </td>
                                <td className={`${CELL_CLASSES} whitespace-nowrap text-secondary`}>{row.inCode}</td>
                                <td className={`${CELL_CLASSES} pr-0 text-right`}>
                                    <span
                                        className={`inline-flex select-none items-center rounded-sm px-1.5 py-0.5 text-[0.85em] font-semibold leading-none ${verdict.classes}`}
                                    >
                                        {verdict.text}
                                    </span>
                                </td>
                            </motion.tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
