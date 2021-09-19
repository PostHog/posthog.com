import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Quote } from 'components/Pricing/Quote'
import { section } from './classes'

export default function HomeQuote() {
    return (
        <Quote
            className={section('text-left')}
            name="Ben White"
            title="@benjackwhite"
            image={
                <StaticImage
                    width={100}
                    height={100}
                    alt="Ben White - @benjackwhite"
                    outputPixelDensities={[1, 2]}
                    src="../../images/ben-white.png"
                />
            }
            quote={
                <span>
                    PostHog is what I always wanted a Product Analytics SaaS to be.{' '}
                    <span className="text-red">Private cloud option</span> so GDPR becomes way more manageable,{' '}
                    <span className="text-red">
                        features built based on direct community feedback, focus on simplicity and usefulness
                    </span>{' '}
                    over vanity features...Great job people!
                </span>
            }
        />
    )
}
