import React from 'react'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'

/**
 * A signup CTA that directs to the correct region (EU or US) based on feature flag.
 */
export const SignupCTA = ({
    className = '',
    text = 'Get started - free',
}: {
    text?: string
    className?: string
}): JSX.Element => {
    const { posthog } = useValues(posthogAnalyticsLogic)
    return (
        <CallToAction
            type="primary"
            className={className}
            to={`https://${
                posthog?.isFeatureEnabled && posthog?.isFeatureEnabled('direct-to-eu-cloud') ? 'eu' : 'app'
            }.posthog.com/signup`}
        >
            {text}
        </CallToAction>
    )
}
