import React from 'react'
import Link from 'components/Link'
import Markdown from 'components/Markdown'
import Pricing from 'components/Home/New/Pricing'
import { ImageMoney } from 'components/Home/Decorations'

export const PricingSection = () => (
    <div id="pricing">
        <h2>Usage-based pricing</h2>

        <ImageMoney />

        <Markdown>{`Our whole philosophy is that you shouldn't have to worry about pricing.

All our paid products are pay-per-use with generous monthly free tiers. In fact, 98% of our customers use PostHog for free.

We aim to match the cheapest option at scale – PostHog should be a no-brainer. You never have to "jump on a quick call" with sales.

Here are some examples of how we charge for most popular products:`}</Markdown>

        <Pricing />

        <Link to="/pricing" state={{ newWindow: true }}>
            Explore pricing
        </Link>
    </div>
)

export default PricingSection
