import React, { useEffect } from 'react'
import { useLocation } from '@reach/router'
import { Calculator } from 'components/Pricing/Test/Calculator'
import { SidebarList, SidebarListItem, Discounts } from 'components/Pricing/PricingExperiment'
import { scrollToElement } from 'components/ScrollToElement'

/**
 * The pricing calculator as a plain, always-visible section — the `redesign` variant's
 * treatment. `CalculatorReveal` is the collapsed alternative that `redesign-calculator-minimized`
 * uses; the two are the only difference between those variants.
 *
 * The section title lives in the page (`Experiment/RedesignPage`), which also owns the
 * `#calculator` anchor, so the heading matches its siblings exactly. This component is just the
 * wrapper that neutralizes the calculator's own layout.
 *
 * `?calculator` in the URL still scrolls here, so an estimate can be shared as a link.
 */
export default function CalculatorSection(): JSX.Element {
    const { search } = useLocation()
    const isDeepLinked = new URLSearchParams(search).has('calculator')

    useEffect(() => {
        if (isDeepLinked) {
            // Wait a frame so the section is in the DOM before measuring.
            requestAnimationFrame(() => scrollToElement('calculator', -20))
        }
    }, [isDeepLinked])

    return (
        // Test/Calculator's SectionLayout margins can't be overridden by a className prop:
        // `my-0` loses to its `mb-12` in Tailwind's cascade regardless of class order, so it
        // takes a child selector to win on specificity.
        <div className="not-prose [&>section]:my-0 [&>section]:px-0">
            <Calculator
                SidebarList={SidebarList}
                SidebarListItem={SidebarListItem}
                Discounts={Discounts}
                hideHeader
                id=""
            />
        </div>
    )
}
