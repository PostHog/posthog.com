import Control from 'components/Pricing/Control'
import React, { useEffect, useState } from 'react'
import Test from 'components/Pricing/Test'
import usePostHog from '../../hooks/usePostHog'

const PricingNew = () => {
    const posthog = usePostHog()
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
