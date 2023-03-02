import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Quote } from 'components/Pricing/Quote'
import { section } from './classes'

export default function HomeQuote() {
    return (
        <Quote
            className={section('text-left')}
            name="Cat Li"
            title="Product & Engineering Lead, Y Combinator"
            image={
                <StaticImage
                    width={100}
                    height={100}
                    alt="Cat Li - Y Combinator"
                    outputPixelDensities={[1, 2]}
                    src="../../images/cat_li.png"
                />
            }
            quote={
                <span>
                    "Building is never just one-and-done. You always need to find ways to improve.
                    <span className="text-red"> PostHog is central to how we do that at Y Combinator</span>. It helps us
                    try ideas, measure results and make better products.”
                </span>
            }
        />
    )
}
