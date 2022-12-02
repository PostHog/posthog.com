import React from 'react'
import { CallToAction } from 'components/CallToAction'

export const LPCTA = () => (
    <>
        <br />
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 xl:gap-4">
            <CallToAction width="56" to="https://app.posthog.com/signup">
                Try PostHog today
            </CallToAction>
            <CallToAction type="outline" width="56" to="/book-a-demo">
                Schedule a demo
            </CallToAction>
        </div>
        <br />
    </>
)
