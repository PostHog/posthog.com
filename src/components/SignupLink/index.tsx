import React, { useCallback } from 'react'
import { Link } from 'gatsby'
import usePostHog from '../../hooks/usePostHog'

export default function SignupLink() {
    const posthog = usePostHog()

    return (
        <Link
            to={`https://${
                posthog?.isFeatureEnabled && posthog?.isFeatureEnabled('direct-to-eu-cloud') ? 'eu' : 'app'
            }.posthog.com/signup`}
        >
            here
        </Link>
    )
}
