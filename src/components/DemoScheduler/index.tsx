import React from 'react'
import { Spacer } from '../Spacer'
import { CalendlyEventListener, EventScheduledEvent, InlineWidget } from 'react-calendly'
import usePostHog from '../../hooks/usePostHog'

export const DemoScheduler = ({
    iframeSrc = 'https://calendly.com/d/hxx-tx7-qrs/posthog-15-minute-quick-chat',
    type = 'scale',
}: {
    iframeSrc?: string
    type?: string
}): JSX.Element => {
    const posthog = usePostHog()
    const calendlyEventScheduled = (e: EventScheduledEvent) => {
        const { event, payload = null } = e.data
        posthog?.capture(event, {
            calendly_event_uri: payload?.event.uri,
            calendly_invitee_uri: payload?.invitee.uri,
            demo_type: type,
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
