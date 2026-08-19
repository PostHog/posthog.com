import React, { useRef } from 'react'
import usePostHog from 'hooks/usePostHog'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import { useCopyConfettiZIndex } from 'components/PlatformInstall/confetti'
import { LOGO_SRC } from './Masthead'
import { fireHammerSwarm } from './hammerBurst'
import { igniteWordmark } from './wordmarkFire'

/**
 * Clicks needed to set the thing alight, and the longest gap that keeps a run alive. The gap is what
 * makes this a spam gate rather than a patience gate: a comfortable mash is 4–6 clicks a second, so
 * 400ms demands someone actually going at it, and idly clicking every second or so never gets there.
 */
const CLICKS_TO_IGNITE = 6
const MAX_CLICK_GAP_MS = 400

/**
 * The build mode wordmark as a button: clicking it sets hammers on it, and hammering on it long
 * enough sets it on fire — during which further clicks are ignored, though the button stays enabled
 * and focusable rather than going `disabled`. Both effects are decorative, so they're skipped
 * entirely under `prefers-reduced-motion`, and the image is labelled by the button rather than by
 * its own `alt`.
 *
 * Captures `build_mode_wordmark_clicked` on every click and `build_mode_wordmark_ignited` when one
 * lights the fire.
 */
export default function Wordmark({ className = '' }: { className?: string }): JSX.Element {
    const buttonRef = useRef<HTMLButtonElement>(null)
    // Reused from the copy-command confetti: the same "paint above windows and the taskbar" problem.
    const zIndex = useCopyConfettiZIndex()
    const prefersReducedMotion = usePrefersReducedMotion()
    const posthog = usePostHog()

    // Refs, not state: nothing here renders, so none of it needs to.
    const clicksInRun = useRef(0)
    const lastClickAt = useRef(0)
    const burning = useRef(false)

    const handleClick = () => {
        // Clicks have to keep coming to count — a run resets rather than accumulating over a visit.
        // Clicks landed during a fire sit out the bookkeeping, which resets the run for free: by the
        // time the fire is out, the last counted click is well past the gap, so someone mashing
        // through it starts a fresh run instead of re-lighting the moment it ends.
        if (!burning.current) {
            const now = performance.now()
            clicksInRun.current = now - lastClickAt.current < MAX_CLICK_GAP_MS ? clicksInRun.current + 1 : 1
            lastClickAt.current = now
        }

        // Counted before the bails below: the click happened whether or not anything moved, and the
        // run count tells a single curious click apart from a mash without needing an event per state.
        posthog?.capture('build_mode_wordmark_clicked', { clicks_in_run: clicksInRun.current })

        // Still a button, just an inert one: a fire plays start to finish rather than being restarted
        // or stacked on top of itself.
        if (burning.current || prefersReducedMotion) return

        fireHammerSwarm(buttonRef.current, zIndex)

        if (clicksInRun.current >= CLICKS_TO_IGNITE) {
            clicksInRun.current = 0
            posthog?.capture('build_mode_wordmark_ignited')
            burning.current = true
            void igniteWordmark(buttonRef.current, zIndex).then(() => {
                burning.current = false
            })
        }
    }

    return (
        <button
            ref={buttonRef}
            type="button"
            onClick={handleClick}
            aria-label="build mode"
            // `select-none`: mashing it otherwise trips the browser's double-click select and paints
            // the logo and its neighbours blue.
            className="shrink-0 grow-0 cursor-pointer select-none appearance-none border-0 bg-transparent p-0 leading-none"
        >
            <img src={LOGO_SRC} alt="" className={className} />
        </button>
    )
}
