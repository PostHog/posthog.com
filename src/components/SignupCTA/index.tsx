import React, { useEffect } from 'react'
import { CallToAction } from 'components/CallToAction'
import usePostHog from 'lib/usePostHog'

/**
 * A signup CTA that directs to the correct region (EU or US) based on feature flag.
 */
export const SignupCTA = ({
    className = '',
    text = 'Get started - free',
    type = 'primary',
    width,
    event,
}: {
    text?: string
    className?: string
    type?: string
    width?: string
    event?: any
}): JSX.Element => {
    const posthog = usePostHog()
    const [directToEu, setDirectToEu] = React.useState(false)

    useEffect(() => {
        posthog?.onFeatureFlags(() => {
            setDirectToEu(posthog?.isFeatureEnabled('test-direct-to-eu-cloud'))
        })
    }, [])

    return (
        <CallToAction
            type={type}
            className={className}
            width={width}
            to={`https://${directToEu ? 'eu' : 'app'}.posthog.com/signup`}
            event={event}
        >
            {text}
        </CallToAction>
    )
}
