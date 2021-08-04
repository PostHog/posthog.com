import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { useValues } from 'kea'
import { signupLogic } from 'logic/signupLogic'
import { useState } from 'react'
import { useEffect } from 'react'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'

export const LandingPageCallToAction = (): JSX.Element => {
    const { hasEmailGatedSignup } = useValues(signupLogic)
    const { isLoggedIn } = useValues(posthogAnalyticsLogic)
    const showEmailGatedLink = hasEmailGatedSignup && !isLoggedIn

    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        // TRICKY: https://github.com/PostHog/posthog.com/issues/1709
        setHasMounted(true)
    }, [])

    return (
        <div className="ctas flex flex-col items-center justify-center w-full max-w-xl sm:mx-auto sm:flex-row">
            {hasMounted && (
                <CallToAction
                    icon="rocket"
                    type="primary"
                    to={showEmailGatedLink ? '/sign-up' : undefined}
                    href={!showEmailGatedLink ? 'https://app.posthog.com/signup?src=home-hero' : undefined}
                >
                    Get Started
                </CallToAction>
            )}
            <CallToAction icon="calendar" type="secondary" className="mt-3 sm:mt-0 sm:ml-4" to="/schedule-demo">
                Book a demo
            </CallToAction>
        </div>
    )
}
