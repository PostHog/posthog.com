import { Quote } from 'components/Pricing/Quote'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { section } from './classes'

export default function HomeQuote() {
    return (
        <Quote
            className={section('text-left')}
            name="Nicolas Grenié"
            title="Developer Advocate, Typeform"
            image={
                <StaticImage
                    width={100}
                    height={100}
                    alt="Nicolas Grenié - Typeform"
                    src="../../images/nicolas_grenie.png"
                />
            }
            quote={
                <span>
                    "PostHog is a game-changer; it's a full-featured{' '}
                    <span className="text-red">product analytics suite you can self-host.</span> There's no need to risk
                    breaches by sending data to third parties or to waste time on lengthy compliance checks.{' '}
                    <span className="text-red">You don't even need SQL!"</span>{' '}
                </span>
            }
        />
    )
}
