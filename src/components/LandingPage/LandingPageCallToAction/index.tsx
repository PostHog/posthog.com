import React from 'react'
import { CallToAction } from 'components/CallToAction'

export const LandingPageCallToAction = () => {
    return (
        <div className="flex flex-col items-center justify-center lg:justify-start sm:flex-row">
            <CallToAction icon="rocket" href="https://app.posthog.com/signup?src=home-hero">
                Get Started
            </CallToAction>
            <CallToAction icon="calendar" type="secondary" className="mt-3 sm:mt-0 sm:ml-4" to="/schedule-demo">
                Book a demo
            </CallToAction>
        </div>
    )
}
