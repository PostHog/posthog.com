import React, { useEffect } from 'react'
import { useLocation } from '@reach/router'
import { useInView } from 'react-intersection-observer'
import { Calculator } from 'components/Pricing/Test/Calculator'
import { scrollToElement } from 'components/ScrollToElement'
import usePostHog from 'hooks/usePostHog'

/**
 * The pricing calculator as a plain, always-visible section.
 *
 * The section title lives on the page (`pages/pricing`), which also owns the
 * `#calculator` anchor, so the heading matches its siblings. This component is just the
 * wrapper that neutralizes the calculator's own layout.
 *
 * `?calculator` in the URL still scrolls here, so an estimate can be shared as a link.
 *
 * Scrolling into view fires `pricing_calculator_viewed`, once per page load. It is the
 * denominator for `pricing_calculator_interacted`: an always-visible calculator has no open
 * step, so a rate needs a "saw it" event. It is not a continuation of the reveal link's
 * `pricing_calculator_expanded` — see the README before comparing across 2026-09-08.
 */
export default function CalculatorSection(): JSX.Element {
    const { search } = useLocation()
    const posthog = usePostHog()
    const isDeepLinked = new URLSearchParams(search).has('calculator')
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

    useEffect(() => {
        if (isDeepLinked) {
            requestAnimationFrame(() => scrollToElement('calculator', -20))
        }
    }, [isDeepLinked])

    useEffect(() => {
        if (inView) {
            posthog?.capture('pricing_calculator_viewed', { deep_linked: isDeepLinked })
        }
    }, [inView])

    return (
        // Test/Calculator's SectionLayout margins can't be overridden by a className prop:
        // `my-0` loses to its `mb-12` in Tailwind's cascade regardless of class order, so it
        // takes a child selector to win on specificity.
        <div ref={ref} className="not-prose [&>section]:my-0 [&>section]:px-0">
            <Calculator hideHeader id="" />
        </div>
    )
}
