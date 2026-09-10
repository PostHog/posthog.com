import React, { useEffect } from 'react'
import { useLocation } from '@reach/router'
import { Calculator } from 'components/Pricing/Test/Calculator'
import { scrollToElement } from 'components/ScrollToElement'
import AgentEstimateLink from 'components/Pricing/AgentEstimateLink'

/**
 * The pricing calculator as a plain, always-visible section.
 *
 * The section title lives on the page (`pages/pricing`), which also owns the
 * `#calculator` anchor, so the heading matches its siblings. This component is just the
 * wrapper that neutralizes the calculator's own layout.
 *
 * `?calculator` in the URL still scrolls here, so an estimate can be shared as a link.
 */
export default function CalculatorSection(): JSX.Element {
    const { search } = useLocation()
    const isDeepLinked = new URLSearchParams(search).has('calculator')

    useEffect(() => {
        if (isDeepLinked) {
            requestAnimationFrame(() => scrollToElement('calculator', -20))
        }
    }, [isDeepLinked])

    return (
        // Test/Calculator's SectionLayout margins can't be overridden by a className prop:
        // `my-0` loses to its `mb-12` in Tailwind's cascade regardless of class order, so it
        // takes a child selector to win on specificity.
        <div className="not-prose [&>section]:my-0 [&>section]:px-0">
            <p className="text-[15px] text-secondary mb-6" data-ai-estimate-placement="outside-calculator">
                Coming from another tool? <AgentEstimateLink source="outside-calculator" /> using your real usage there.
            </p>
            <Calculator hideHeader id="" />
        </div>
    )
}
