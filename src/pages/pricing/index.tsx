import React, { useEffect, useState } from 'react'
import usePostHog from 'hooks/usePostHog'
import { useLocation } from '@reach/router'
import { pricingMenu } from '../../navs'
import Layout from 'components/Layout'
import PricingExperiment from 'components/Pricing/PricingExperiment'
import Explorer from 'components/Explorer'

const PricingPage = (): JSX.Element => {
    const posthog = usePostHog()
    const { search } = useLocation()

    return (
        <Explorer
            title="pricing"
            slug="/pricing"
            template="generic"
            fullScreen
        >
            <PricingExperiment />
        </Explorer>
    )
}

export default PricingPage
