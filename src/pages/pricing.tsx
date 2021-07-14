import React from 'react'
import { SEO } from '../components/seo'
import { CallToAction } from 'components/CallToAction'
import { PricingHero } from '../components/Pricing/PricingHero'
import { PricingTable } from '../components/Pricing/PricingTable'
import { CloudVsSelfHost } from '../components/Pricing/CloudVsSelfHost'
import { PlanComparison } from '../components/Pricing/PlanComparison'
import { Savings } from '../components/Pricing/Savings'
import { FAQs } from '../components/Pricing/FAQs'
import { Quote } from '../components/Pricing/Quote'
import { Footer } from '../components/Footer'
import { useLocation } from '@reach/router'
import '../components/Pricing/styles/index.scss'

const PricingNew = (): JSX.Element => {
    const { hash } = useLocation()
    const SHOW_SCALE_HASH = '#scale'
    return (
        <div className="pricing-hero relative">
            <SEO title="PostHog Pricing" description="Find out how much it costs to use PostHog" />
            <PricingHero />
            <PricingTable showScaleByDefault={hash === SHOW_SCALE_HASH} />
            <CloudVsSelfHost />
            <h3 className="relative text-white text-center">Compare plans</h3>
            <PlanComparison />
            {/* <Savings /> */}
            <FAQs />
            <Quote />
            <Footer onPostPage={false} transparentBg />
        </div>
    )
}

export default PricingNew
