import React from 'react'
import { CallToAction } from 'components/CallToAction'

export const LandingPageCallToAction = () => {
    return (
        <div className="flex flex-col hero-cta">
            <CallToAction icon="rocket" href="https://app.posthog.com/signup?src=home-hero" className="mx-auto">
                Get Started
            </CallToAction>
            <CallToAction icon="calendar" type="secondary" className="mt-3 mx-auto" to="/schedule-demo">
                Book a demo
            </CallToAction>
        </div>
    )
}
