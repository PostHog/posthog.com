import React from 'react'
import { CallToAction } from 'components/CallToAction'

export const LandingPageCallToAction = (): JSX.Element => {
    return (
        <div className="flex flex-col justify-center items-center space-y-2 md:space-y-3">
            <CallToAction type="primary" width="56" to="/docs/self-host/">
                Get started
            </CallToAction>
            <CallToAction type="outline" width="56" to="/schedule-demo">
                Schedule a demo
            </CallToAction>
        </div>
    )
}
