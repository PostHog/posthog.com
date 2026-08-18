import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { IconCopy, IconRewindPlay } from '@posthog/icons'

import { FigureMarker } from './FigureMarker'

/**
 * The persons modal you get from clicking a funnel step, in miniature – the moment an insight
 * stops being a number and becomes a list of people you can watch. Drawn rather than
 * screenshotted so it scales with the reader's Aa control, stays legible on a phone, and doesn't
 * carry a real customer's email addresses.
 *
 * Markers stay visible at every width, like the trigger group figure: the two things worth
 * pointing at are easy to skim past in the real UI.
 *
 * Partial by design: the app's footer row (Download CSV, Save as cohort, View events, Open as new
 * insight) and the per-row sort handles are left out so the figure teaches one idea.
 */

/** One person row: avatar, email, distinct ID, and their own recording button. */
function PersonRow({
    initial,
    email,
    distinctId,
    marker,
    buttonMarker,
}: {
    initial: string
    email: string
    distinctId: string
    marker?: React.ReactNode
    buttonMarker?: React.ReactNode
}): JSX.Element {
    return (
        <div className="flex items-center justify-between gap-2 rounded border border-primary bg-primary px-2 py-1.5">
            <div className="flex min-w-0 items-center gap-2">
                <span
                    aria-hidden="true"
                    className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-[0.6em] font-bold uppercase text-secondary dark:bg-accent-dark"
                >
                    {initial}
                </span>
                <div className="min-w-0">
                    <span className="flex items-center gap-1.5 text-[0.7em] font-bold leading-snug text-primary">
                        <span className="truncate">{email}</span>
                        {marker}
                    </span>
                    <span className="flex items-center gap-1 text-[0.6em] leading-snug text-secondary">
                        <span className="truncate">{distinctId}</span>
                        <IconCopy className="size-2.5 shrink-0 opacity-60" aria-hidden="true" />
                    </span>
                </div>
            </div>
            <span className="inline-flex shrink-0 select-none items-center gap-1 rounded border border-primary px-1.5 py-0.5 text-[0.6em] font-semibold leading-none text-secondary">
                View recording
                <IconRewindPlay className="size-2.5" aria-hidden="true" />
            </span>
        </div>
    )
}

export interface PersonsModalProps {
    /** The count as the app phrases it above the list. */
    count?: string
}

export default function PersonsModal({ count = 'More than 100 unique persons' }: PersonsModalProps): JSX.Element {
    const reducedMotion = useReducedMotion()
    const animate = !reducedMotion

    return (
        <div className="group/anatomy relative @container">
            <motion.div
                initial={animate ? { opacity: 0, y: 6 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="rounded border border-primary bg-accent p-3 dark:bg-accent-dark @md:p-4"
            >
                {/* The modal's header: the count on the left, the all-of-them button on the right. */}
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[0.75em] font-bold leading-snug text-primary">{count}</span>
                    <span className="inline-flex shrink-0 select-none items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded border border-primary bg-primary px-2 py-1 text-[0.65em] font-bold leading-none text-primary">
                            View recordings
                            <IconRewindPlay className="size-3" aria-hidden="true" />
                        </span>
                        <FigureMarker
                            n={2}
                            label="View recordings"
                            gloss="watch their sessions as they flowed through this funnel"
                            visibility="always"
                        />
                    </span>
                </div>

                <div className="space-y-1.5">
                    {/* Invented addresses on example.com – never paste real ones out of a screenshot. */}
                    <PersonRow
                        initial="A"
                        email="ana@example.com"
                        distinctId="wWratLxRfKGsXHkS…WDfk3jPZ9Gbgjto"
                        marker={
                            <FigureMarker
                                n={1}
                                label="The people behind the number"
                                gloss="every person the step counted, not a sample of them"
                                visibility="always"
                            />
                        }
                    />
                    <PersonRow initial="J" email="jordan@example.com" distinctId="tnHphQQPtYSCBRNP…8oDqFsQbw4AG6Ta" />
                    <PersonRow initial="S" email="sam@example.org" distinctId="nrejD9nmwEPRd7PE…ASxux7Tn25y8M6h" />
                    <PersonRow initial="P" email="priya@example.net" distinctId="wmKv4hcghqoTCi3…Xq7bLm2ZfPd9Nsa" />
                </div>
            </motion.div>
        </div>
    )
}
