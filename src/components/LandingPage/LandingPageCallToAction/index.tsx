import { CallToAction } from 'components/CallToAction'
import React from 'react'

export const LandingPageCallToAction = (): JSX.Element => {
    return (
        <div className="flex flex-col justify-center items-center space-y-2 md:space-y-3">
            <CallToAction type="primary" width="56" to="https://app.posthog.com/signup">
                Get started
            </CallToAction>
            <CallToAction type="outline" width="56" to="/demo">
                Schedule a demo
            </CallToAction>
        </div>
    )
}
