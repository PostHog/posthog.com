import React from 'react'
import 'components/Pricing/styles/index.scss'
import usePostHog from '../../hooks/usePostHog'
import { RenderInClient } from 'components/RenderInClient'
import PricingControl from './control/Pricing'
import PricingTest from './test/Pricing'

const Pricing = (): JSX.Element => {
    const posthog = usePostHog()

    return (
        <RenderInClient>
            {posthog?.isFeatureEnabled && posthog?.getFeatureFlag('website-pricing-page-test') === 'test' ? (
                <PricingTest />
            ) : (
                <PricingControl />
            )}
        </RenderInClient>
    )
}

export default Pricing
