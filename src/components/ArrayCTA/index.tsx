import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { SignupCTA } from 'components/SignupCTA'

export const ArrayCTA = () => {
    return (
        <>
            <br />
            <p className="px-4 font-bold text-center z-10 relative mb-0 text-sm md:text-lg">Ready to find out more?</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 xl:gap-4">
                <SignupCTA width="56" text="Try PostHog - free" />
                <CallToAction type="outline" width="56" to="/contact-sales">
                    Schedule a demo
                </CallToAction>
            </div>
            <br />
        </>
    )
}
