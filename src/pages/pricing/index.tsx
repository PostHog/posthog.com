import Control from 'components/Pricing/Control'
import React, { useEffect, useState } from 'react'
import Test from 'components/Pricing/Test'

import { useValues } from 'kea'

import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'

const PricingNew = () => {
    const { posthog } = useValues(posthogAnalyticsLogic)
    const [loading, setLoading] = useState(true)
    const [featureFlagEnabled, setFeatureFlagEnabled] = useState(false)

    useEffect(() => {
        if (posthog && posthog.getFeatureFlag && posthog.getFeatureFlag('highlight-open-source') === 'test') {
            setFeatureFlagEnabled(true)
        }
        setLoading(false)
    }, [])

    return loading ? null : featureFlagEnabled ? <Test /> : <Control />
}

export default PricingNew
