import React from 'react'
import { useActions } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import { CallToAction } from 'components/CallToAction'

export const LandingPageCallToAction = () => {
    const { setIsGetStartedModalOpen } = useActions(layoutLogic)
    return (
        <div className="flex flex-col">
            <CallToAction icon="rocket" className="mx-auto" onClick={() => setIsGetStartedModalOpen(true)}>
                Get Started
            </CallToAction>
            <CallToAction icon="calendar" type="secondary" className="mt-3 mx-auto" to="/schedule-demo">
                Book a demo
            </CallToAction>
        </div>
    )
}
