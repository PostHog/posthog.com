import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import React from 'react'
import { Spacer } from '../Spacer'
import { CalendlyEventListener, EventScheduledEvent, InlineWidget } from 'react-calendly'

export const DemoScheduler = ({
    iframeSrc = 'https://calendly.com/cameron-posthog/yc-onboarding',
}: {
    iframeSrc?: string
}): JSX.Element => {
    const { posthog } = useValues(posthogAnalyticsLogic)
    const calendlyEventScheduled = (e: EventScheduledEvent) => {
        const { event, payload = null } = e.data
        posthog?.capture(event, {
            calendly_event_uri: payload?.event.uri,
            calendly_invitee_uri: payload?.invitee.uri,
        })
    }

    return (
        <>
            <div>
                <CalendlyEventListener onEventScheduled={calendlyEventScheduled}>
                    <InlineWidget url={iframeSrc} styles={{ height: '1000px', margin: '0 auto' }} />
                </CalendlyEventListener>
            </div>
            <Spacer height={100} />
        </>
    )
}
