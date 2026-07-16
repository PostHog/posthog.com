import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconRewind } from '@posthog/icons'
import { usePrefersReducedMotion } from '../../Code/usePrefersReducedMotion'

export interface RollingWordStep {
    /** The word to display */
    word: string
    /** How long (ms) to hold this word before advancing to the next */
    hold: number
}

interface RollingWordsProps {
    /** Ordered list of words + how long each is held. The final word stays permanently. */
    steps: RollingWordStep[]
    /** Classes applied to the wrapper — set the color/weight of the rolling word here. */
    className?: string
}

// Snappy curve for the cycling words. The roll duration scales with how long the word is
// held, so the fast "speed-run" pass rolls quickly instead of piling up against short holds.
const FAST_EASE = [0.33, 1, 0.68, 1] as const
const fastRoll = (hold: number) => ({ duration: Math.min(0.26, Math.max(0.07, hold / 1400)), ease: FAST_EASE })
// Graceful ease-out-expo settle for the final word
export const ROLLING_WORDS_SETTLE_MS = 700
const SETTLE_TRANSITION = { duration: ROLLING_WORDS_SETTLE_MS / 1000, ease: [0.22, 1, 0.36, 1] as const }

/**
 * Total time (ms) from mount until the final word has finished rolling in: the sum of all holds
 * (time spent advancing through the list) plus the settle animation on the last word. Useful for
 * sequencing other animations to start once the cycle has come to rest.
 */
export function rollingWordsDuration(steps: RollingWordStep[]): number {
    const totalHolds = steps.reduce((sum, step) => sum + step.hold, 0)
    return totalHolds + ROLLING_WORDS_SETTLE_MS
}

/**
 * Slot-machine word cycler for headlines. Words roll vertically in place — the outgoing word
 * slides up and out (clipped) while the incoming word rises from below. The cycle accelerates
 * (driven by each step's `hold`) and settles permanently on the last word with a slower glide.
 *
 * The cell takes each word's natural width (sized to the current word), so the line grows and
 * shrinks with the word.
 *
 * Respects `prefers-reduced-motion` by rendering only the final word, statically.
 */
export function RollingWords({ steps, className = '' }: RollingWordsProps): JSX.Element {
    const prefersReducedMotion = usePrefersReducedMotion()
    const [index, setIndex] = useState(0)

    const lastIndex = steps.length - 1
    const isFinal = index >= lastIndex

    useEffect(() => {
        if (prefersReducedMotion || isFinal) {
            return
        }
        const timer = setTimeout(() => setIndex((i) => Math.min(i + 1, lastIndex)), steps[index].hold)
        return () => clearTimeout(timer)
    }, [index, isFinal, lastIndex, prefersReducedMotion, steps])

    // Reduced motion: skip the animation, show the destination word.
    if (prefersReducedMotion) {
        return <span className={`whitespace-nowrap ${className}`}>{steps[lastIndex]?.word ?? ''}.</span>
    }

    const current = steps[index]?.word ?? ''
    // The period rides along with the verb so it rolls in/out as part of the word.
    const phrase = `${current}.`

    return (
        <span className={`group relative inline-block align-baseline ${className}`}>
            {/* In-flow sizer = current phrase, giving the slot the word's natural width */}
            <span aria-hidden className="invisible whitespace-nowrap">
                {phrase}
            </span>

            {/* Rolling cell — clips words as they slide in/out. Extends a couple px below the
                text box so descenders (g, q, y) aren't clipped at rest. */}
            <span className="absolute inset-x-0 top-0 -bottom-0.5 overflow-hidden">
                <AnimatePresence initial={false}>
                    <motion.span
                        key={current}
                        className="absolute inset-0 whitespace-nowrap text-center"
                        initial={{ y: '105%', opacity: 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        exit={{ y: '-105%', opacity: 0 }}
                        transition={isFinal ? SETTLE_TRANSITION : fastRoll(steps[index]?.hold ?? 300)}
                    >
                        {phrase}
                    </motion.span>
                </AnimatePresence>
            </span>

            {/* Replay control — appears on hover once the cycle has settled, just past the word */}
            {isFinal && (
                <button
                    type="button"
                    onClick={() => setIndex(0)}
                    aria-label="Replay"
                    className="absolute left-full top-1/2 ml-1 -translate-y-1/2 text-muted opacity-0 transition-opacity duration-150 hover:text-primary focus-visible:opacity-100 group-hover:opacity-100"
                >
                    <IconRewind className="size-4" />
                </button>
            )}
        </span>
    )
}

export default RollingWords
