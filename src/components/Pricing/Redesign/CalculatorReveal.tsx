import React, { useEffect, useState } from 'react'
import { useLocation } from '@reach/router'
import { motion, useReducedMotion } from 'framer-motion'
import { Calculator } from 'components/Pricing/Test/Calculator'
import { scrollToElement } from 'components/ScrollToElement'
import usePostHog from 'hooks/usePostHog'
import { RenderInClient } from 'components/RenderInClient'
import AgentEstimateLink, {
    AI_PRICING_EXPERIMENT_VARIANTS,
    AI_PRICING_FLAG,
} from 'components/Pricing/AgentEstimateLink'

const PANEL_ID = 'calculator-panel'

/**
 * Keeps the pricing calculator collapsed until someone asks for it.
 *
 * Most visitors to this page are deciding whether to try PostHog for free, and an estimator
 * muddies that: it reframes the page from "this is free for you" to "work out your bill".
 * So this is deliberately the quietest thing on the page — one sentence and a text link,
 * with no card, fill, or heading. It renders as a footnote at the bottom of the MoreOptions
 * section (not as its own section), so the cards and the calculator share one section break
 * before the FAQ. The calculator mounts only once opened, so it costs everyone else nothing.
 *
 * `?calculator` in the URL renders it already open and scrolls to it, so an estimate can be
 * shared as a link. Everything else goes through the link.
 *
 * Expanding fires `pricing_calculator_expanded`. `pricing_calculator_interacted` fires on the
 * controls themselves, so that's the one to use for engagement — it also covers the people who
 * arrive with `?calculator` and never click the link.
 */
export default function CalculatorReveal(): JSX.Element {
    const { search } = useLocation()
    const posthog = usePostHog()
    const isDeepLinked = new URLSearchParams(search).has('calculator')
    const [open, setOpen] = useState(isDeepLinked)
    // The calculator stays mounted after the first open so hiding it doesn't throw away
    // whatever volumes someone just dialled in.
    const [hasOpened, setHasOpened] = useState(isDeepLinked)
    // Tracks whether the expand/collapse has finished, so the panel can drop `overflow-hidden`
    // (the calculator's sidebar is `sticky` and its tooltips escape their box) and take the
    // collapsed content out of the tab order.
    const [settled, setSettled] = useState(true)
    const reduceMotion = useReducedMotion()

    const toggle = () => {
        const next = !open
        setOpen(next)
        if (next) {
            setHasOpened(true)
            posthog?.capture('pricing_calculator_expanded', { trigger: 'link' })
        }
        setSettled(false)
    }

    useEffect(() => {
        if (isDeepLinked) {
            // Wait a frame so the section is in the DOM before measuring.
            requestAnimationFrame(() => scrollToElement('calculator', -20))
        }
    }, [isDeepLinked])

    return (
        // Footnote inside the MoreOptions section — not its own SectionLayout. Owns #calculator
        // for deep links; spacing is just a gap below the cards.
        <div id="calculator" className="not-prose mt-6">
            <p className="text-[15px] text-secondary mb-0">
                Most companies stay on the free tier.{' '}
                <button
                    type="button"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls={PANEL_ID}
                    className="font-semibold text-red dark:text-yellow underline"
                >
                    {open ? 'Hide the calculator' : "Calculate what you'd pay past it"}
                </button>
                <RenderInClient
                    render={() => {
                        return window.posthog?.getFeatureFlag?.(AI_PRICING_FLAG) ===
                            AI_PRICING_EXPERIMENT_VARIANTS.outside_calculator ? (
                            <>
                                {' or '}
                                <AgentEstimateLink
                                    source={AI_PRICING_EXPERIMENT_VARIANTS.outside_calculator}
                                    label="get AI to do it for you"
                                    popoverText={
                                        open
                                            ? `It's probably easier for you to close the calculator yourself... that said, AI can certainly help you estimate your bill. Try it out:`
                                            : undefined
                                    }
                                />
                            </>
                        ) : (
                            <></>
                        )
                    }}
                />
            </p>

            <motion.div
                id={PANEL_ID}
                initial={false}
                animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                onAnimationComplete={() => setSettled(true)}
                className={`${settled && open ? 'overflow-visible' : 'overflow-hidden'} ${
                    settled && !open ? 'invisible' : ''
                }`}
            >
                {/* Test/Calculator's SectionLayout margins can't be overridden by a className prop:
                    `my-0` loses to its `mb-12` in Tailwind's cascade regardless of class order, so
                    it takes a child selector to win on specificity. */}
                <div className="border-t border-primary mt-4 pt-6 [&>section]:my-0 [&>section]:px-0">
                    {hasOpened && <Calculator hideHeader id="" />}
                </div>
            </motion.div>
        </div>
    )
}
