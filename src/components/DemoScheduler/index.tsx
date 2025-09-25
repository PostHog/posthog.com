import React from 'react'
import { useCalendlyEventListener, InlineWidget } from 'react-calendly'
import usePostHog from '../../hooks/usePostHog'

export const DemoScheduler = ({
    iframeSrc = 'https://calendly.com/d/hxx-tx7-qrs/posthog-15-minute-quick-chat',
    type = 'scale',
    className = '',
}: {
    iframeSrc?: string
    type?: string
    className?: string
}): JSX.Element => {
    const posthog = usePostHog()

    useCalendlyEventListener({
        onEventScheduled: (e) => {
            posthog?.capture('calendly_event_scheduled', {
                calendly_event_uri: e.data.payload?.event?.uri,
                calendly_invitee_uri: e.data.payload?.invitee?.uri,
                demo_type: type,
            })
        },
    })

    return <InlineWidget url={iframeSrc} className={className} />
}
