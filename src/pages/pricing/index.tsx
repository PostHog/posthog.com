import Pricing from 'components/Pricing/Pricing'
import { Pricing as PricingControl } from 'components/Pricing/experiment-control/Pricing'
import { RenderInClient } from 'components/RenderInClient'
import Spinner from 'components/Spinner'
import posthog from 'posthog-js'
import React from 'react'

const PricingPage = (): JSX.Element => {
    return (
        <RenderInClient
            render={() => {
                return posthog.getFeatureFlag('teams-pricing-page') !== 'test' ? <PricingControl /> : <Pricing />
            }}
            placeholder={<Spinner />}
        />
    )
}

export default PricingPage
