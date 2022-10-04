import React from 'react'
import { CallToAction } from 'components/CallToAction'

export const GDPRForm = () => (
    <>
        <br />
        <p className="px-4 font-bold text-center z-10 relative mb-0 text-sm md:text-lg">
            Want PostHog hosted on an EU Cloud?
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 xl:gap-4">
            <CallToAction width="106" to="/signup/eu-cloud">
                Join the waitlist!
            </CallToAction>
        </div>
        <br />
    </>
)
