import React, { useEffect, useState } from 'react'
import usePostHog from 'hooks/usePostHog'
import { useLocation } from '@reach/router'
import { pricingMenu } from '../../navs'
import Layout from 'components/Layout'
import PricingExperiment from 'components/Pricing/PricingExperiment'

const PricingPage = (): JSX.Element => {
    const posthog = usePostHog()
    const { search } = useLocation()

    return (
        <Layout parent={pricingMenu}>
            <PricingExperiment />
        </Layout>
    )
}

export default PricingPage
