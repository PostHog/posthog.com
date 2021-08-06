import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { useValues } from 'kea'
import { signupLogic } from 'logic/signupLogic'

export const LandingPageCallToAction = (): JSX.Element => {
    const { shouldAutoRedirect } = useValues(signupLogic)
    return (
        <div className="ctas flex flex-col items-center justify-center w-full max-w-xl sm:mx-auto sm:flex-row">
            <CallToAction
                icon="rocket"
                type="primary"
                onClick={() => {
                    if (shouldAutoRedirect) {
                        window.location.href = 'https://app.posthog.com/signup?src=home-hero'
                    } else {
                        window.location.pathname = '/sign-up'
                    }
                }}
            >
                Get Started
            </CallToAction>
            <CallToAction icon="calendar" type="secondary" className="mt-3 sm:mt-0 sm:ml-4" to="/schedule-demo">
                Book a demo
            </CallToAction>
        </div>
    )
}
