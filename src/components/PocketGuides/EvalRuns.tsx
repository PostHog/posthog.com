import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { AnatomyMarker } from './ReportAnatomy'

/**
 * The app's evaluation runs table in miniature, annotated. Kept honest against posthog/posthog
 * `products/ai_observability/frontend/evaluations/components/EvaluationRunsTable.tsx` – same
 * columns, same result vocabulary (True / False / N/A / Skipped), same clamped reasoning cell.
 */

export interface EvalRun {
    time: string
    /** What was scored – a generation or trace id, as the app's target cell shows it. */
    target: string
    result: 'True' | 'False' | 'N/A' | 'Skipped'
    /** The judge's own words for why. The app clamps this to two lines too. */
    reasoning: string
}

const RESULT: Record<EvalRun['result'], string> = {
    True: 'bg-green/10 text-green border border-green/40',
    False: 'bg-orange/10 text-orange border border-orange/40',
    'N/A': 'bg-accent text-secondary border border-primary dark:bg-accent-dark',
    Skipped: 'bg-accent text-secondary border border-primary dark:bg-accent-dark',
}

const HEAD = 'pb-1.5 pr-3 text-left text-[0.65em] font-bold uppercase tracking-wide text-secondary'
const CELL = 'border-t border-primary py-1.5 pr-3 align-top text-[0.75em] leading-snug'

export default function EvalRuns({ runs }: { runs: EvalRun[] }): JSX.Element {
    const reducedMotion = useReducedMotion()

    return (
        <div className="@container group/anatomy overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className={HEAD}>Timestamp</th>
                        <th className={HEAD}>
                            Target{' '}
                            <AnatomyMarker
                                n={1}
                                label="Target"
                                gloss="The generation that was scored. Click through to the trace it belongs to."
                            />
                        </th>
                        <th className={HEAD}>
                            Result{' '}
                            <AnatomyMarker
                                n={2}
                                label="Result"
                                gloss="Pass or fail. N/A and Skipped are their own outcomes – a generation the eval couldn't judge isn't a failure."
                            />
                        </th>
                        <th className={`${HEAD} pr-0`}>
                            Reasoning{' '}
                            <AnatomyMarker
                                n={3}
                                label="Reasoning"
                                gloss="Why the judge decided that, in its own words. This is what makes a pass-rate drop readable."
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {runs.map((run, index) => (
                        <motion.tr
                            key={run.target}
                            initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.25, duration: 0.3, ease: 'easeOut' }}
                        >
                            <td className={`${CELL} whitespace-nowrap tabular-nums text-secondary`}>{run.time}</td>
                            <td className={`${CELL} whitespace-nowrap font-code text-[0.7em] text-primary`}>
                                {run.target}
                            </td>
                            <td className={CELL}>
                                <span
                                    className={`inline-flex select-none items-center rounded-sm px-1.5 py-0.5 text-[0.85em] font-semibold leading-none ${
                                        RESULT[run.result]
                                    }`}
                                >
                                    {run.result}
                                </span>
                            </td>
                            <td className={`${CELL} pr-0 text-secondary`}>{run.reasoning}</td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
