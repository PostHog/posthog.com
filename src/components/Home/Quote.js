import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Quote } from 'components/Pricing/Quote'
import { section } from './classes'

export default function HomeQuote() {
    return (
        <Quote
            className={section('text-left')}
            name="James Watling"
            title="Founding CTO, EarlyDay"
            image={
                <StaticImage
                    width={100}
                    height={100}
                    alt="James Watling - EarlyDay"
                    outputPixelDensities={[1, 2]}
                    src="../../images/james_watling.jpg"
                />
            }
            quote={
                <span>
                    "PostHog is the first analytics platform that's excited me! Instead of using{' '}
                    <span className="text-red">Google Analytics</span> and <span className="text-red">HotJar</span> and{' '}
                    <span className="text-red">Intercom</span> and <span className="text-red">Mixpanel</span>, I can
                    just use PostHog.
                </span>
            }
        />
    )
}
