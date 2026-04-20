import React from 'react'
import { SectionComponentProps } from '../types'

/**
 * Placeholder section for the pricing surface. Replace the body with plan
 * details when ready.
 */
const Plans = ({ id }: SectionComponentProps) => {
    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-3">Plans</h2>
            <p className="text-base text-secondary leading-relaxed m-0">Coming soon.</p>
        </section>
    )
}

export default Plans
