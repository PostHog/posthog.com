import React from 'react'
import { SEO } from '../components/seo'
import { PricingHero } from '../components/Pricing/PricingHero'
import { PricingTable } from '../components/Pricing/PricingTable'
import { RocketHorizontalRule } from '../components/RocketHorizontalRule'
import { PricingComparison } from '../components/Pricing/PricingComparison'
import { Savings } from '../components/Pricing/Savings'
import { FAQs } from '../components/Pricing/FAQs'
import { Footer } from '../components/Footer'

import '../components/Pricing/styles/index.scss'

const PricingNew = (): JSX.Element => {
    return (
        <div className="pricing-hero">
            <SEO title="PostHog Pricing" description="Find out how much it costs to use PostHog" />

            <PricingHero />
            <div className="flex justify-center ">
                {/* needs to tab like in current pricing page */}
                <div className="px-4 py-2 bg-orange text-white">Cloud</div>
                <div className="px-4 py-2 bg-white">Self-hosted</div>
            </div>
            <PricingTable />
            <RocketHorizontalRule />
            <PricingComparison />
            <Savings />
            <FAQs />
            <Footer onPostPage={false} transparentBg />
        </div>
    )
}

export default PricingNew
