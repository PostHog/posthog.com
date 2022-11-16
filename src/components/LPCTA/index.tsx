import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import { SignupCTA } from 'components/SignupCTA'

export const LPCTA = () => {
    const { posthog } = useValues(posthogAnalyticsLogic)

    return (
        <>
            <br />
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 xl:gap-4">
                <SignupCTA width="56" text="Try PostHog today" />
                <CallToAction type="outline" width="56" to="/book-a-demo">
                    Schedule a demo
                </CallToAction>
            </div>
            <br />
        </>
    )
}
