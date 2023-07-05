import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { RenderInClient } from 'components/RenderInClient'
import usePostHog from '../../hooks/usePostHog'

/**
 * A signup CTA that directs to the correct region (EU or US) based on feature flag.
 */
export const SignupCTA = ({
    className = '',
    text = 'Get started - free',
    type = 'primary',
    width,
    size = 'lg',
    ...other
}: {
    text?: string
    className?: string
    type?: string
    width?: string
    event?: any
    size?: 'lg' | 'sm' | 'md'
}): JSX.Element => {
    const posthog = usePostHog()

    const event = other.event ?? {
        name: `clicked ${text}`,
        type: 'cloud',
    }

    return (
        <RenderInClient
            placeholder={
                <CallToAction
                    type={type}
                    className={className}
                    width={width}
                    to={`https://app.posthog.com/signup`}
                    event={event}
                    size={size}
                >
                    {text}
                </CallToAction>
            }
            render={() => (
                <CallToAction
                    type={type}
                    className={className}
                    width={width}
                    to={`https://${posthog?.isFeatureEnabled('direct-to-eu-cloud') ? 'eu' : 'app'}.posthog.com/signup`}
                    event={event}
                    size={size}
                >
                    {text}
                </CallToAction>
            )}
        />
    )
}
