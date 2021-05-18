import React from 'react'
import { SEO } from '../components/seo'
import { CallToAction } from 'components/CallToAction'
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
                {/* and "active=true" on current tab. need help with if statement in CallToAction (white border unless active=true) */}
                <CallToAction type="button" active="true" width="auto" icon="none" href="#" className="mr-4">
                    Cloud
                </CallToAction>
                <CallToAction type="button" active="false" width="auto" icon="none" href="#">
                    Self-hosted
                </CallToAction>
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
