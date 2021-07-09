import React from 'react'
import { CallToAction } from 'components/CallToAction'

export const LandingPageCallToAction = () => {
    return (
        <div className="ctas flex flex-col items-center justify-center mx-2 w-full max-w-xl sm:mx-auto sm:flex-row">
            <CallToAction icon="rocket" href="https://app.posthog.com/signup?src=home-hero">
                Get Started
            </CallToAction>
            <CallToAction icon="calendar" type="secondary" className="mt-3 sm:mt-0 sm:ml-4" to="/schedule-demo">
                Book a demo
            </CallToAction>
        </div>
    )
}
