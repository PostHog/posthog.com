import React from 'react'
import PostHogInspector, { InspectorCode, InspectorStatus } from './PostHogInspector'

type PostHogEventInspectorProps = {
    clicked: string | null
    destination?: string
    timestamp: string | null
    eventCount: number
}

export default function PostHogEventInspector({
    clicked,
    destination,
    timestamp,
    eventCount,
}: PostHogEventInspectorProps): JSX.Element {
    const label = clicked === 'All' ? 'All locations' : clicked
    const eventPayload = JSON.stringify(
        {
            event: 'stay_filter_selected',
            timestamp,
            properties: destination ? { destination_type: destination } : {},
        },
        null,
        2
    )

    return (
        <PostHogInspector>
            {label ? (
                <>
                    <InspectorCode label="Clicked element" value={`<button aria-pressed="true">${label}</button>`} />
                    <InspectorCode
                        label="Event payload · selected properties"
                        value={eventPayload}
                        meta={`${eventCount} ${eventCount === 1 ? 'event' : 'events'} captured`}
                    />
                </>
            ) : (
                <InspectorStatus>Choose a destination on Twig to inspect its event.</InspectorStatus>
            )}
        </PostHogInspector>
    )
}
