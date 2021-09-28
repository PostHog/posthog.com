import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import React, { useEffect } from 'react'
import { Spacer } from '../Spacer'
import { InlineWidget } from 'react-calendly'

export const DemoScheduler = ({
    iframeSrc = 'https://calendly.com/yakko/yc-onboarding-group',
}: {
    iframeSrc?: string
}): JSX.Element => {
    const { posthog } = useValues(posthogAnalyticsLogic)
    useEffect(() => {
        typeof window !== 'undefined' &&
            window.addEventListener('message', function (e) {
                const { event, payload = null } = e.data
                if (event === 'calendly.event_scheduled') {
                    posthog?.capture(event, {
                        calendly_event_uri: payload?.event.uri,
                        calendly_invitee_uri: payload?.invitee.uri,
                    })
                }
            })
    })
    return (
        <>
            <div>
                <InlineWidget url={iframeSrc} styles={{ height: '1000px', margin: '0 auto' }} />
            </div>
            <Spacer height={100} />
        </>
    )
}
