import React, { useState } from 'react'
import { TripDetailsView } from '@posthog/twig-components/account'
import { stays } from '@posthog/twig-components/catalog'
import { StayCardContent } from '@posthog/twig-components/stay-card'
import coast from '@posthog/twig-components/assets/coast.jpg'
import '@posthog/twig-components/catalog.css'
import '@posthog/twig-components/compact.css'
import { TwigWordmark } from '@posthog/twig-components/compact'

import PostHogInspector, { InspectorCode, InspectorDetails, InspectorStatus } from './PostHogInspector'
import { Exhibit } from './ProductAnalyticsExhibits'

// The booking from Twig's Error Tracking lab. Its host record never reaches `readTripHost`.
const stay = stays.find((candidate) => candidate.id === 'stay-02') ?? stays[0]
const booking = { id: 'booking_1', stay, dateLabel: 'Jun 12 – 15', guestsLabel: '2 guests', statusLabel: 'Upcoming' }
const MESSAGE = "Cannot read properties of undefined (reading 'name')"

/** The properties every Twig event carries, so an exception reads like any other event. Local teaching data only. */
const EVENT_METADATA = {
    distinct_id: 'guest_123',
    $session_id: 'session_456',
    $current_url: 'https://twig.com/account/trips',
    $browser: 'Chrome',
    $groups: { host: 'dolores' },
    '$feature/trip-details-redesign': 'test',
}

/** An `$exception` payload for each capture path, with the properties the issue filters name. */
const exceptionPayload = (mechanism: string, handled: boolean, properties: Record<string, string> = {}) =>
    JSON.stringify(
        {
            event: '$exception',
            properties: {
                ...EVENT_METADATA,
                $exception_list: [{ type: 'TypeError', value: MESSAGE, mechanism: { type: mechanism, handled } }],
                $exception_types: ['TypeError'],
                $exception_values: [MESSAGE],
                $exception_handled: handled,
                ...properties,
            },
        },
        null,
        2
    )

function TwigFrame({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <section aria-label="Twig" className="twig-compact">
            <div className="twig-compact-header">
                <TwigWordmark />
            </div>
            <div className="twig-account-layout p-3 @md:p-4">{children}</div>
        </section>
    )
}

const autocapturedPayload = exceptionPayload('onerror', false)

/** Trip details throws in a click handler with no catch, so only the SDK's `window.onerror` hook sees it. */
export function AutocapturedExceptionFigure(): JSX.Element {
    const [clicks, setClicks] = useState(0)

    return (
        <Exhibit stacked onReset={() => setClicks(0)}>
            <div className="grid items-start gap-4 @lg:grid-cols-[minmax(0,1.05fr)_minmax(14rem,0.95fr)]">
                <TwigFrame>
                    <article className="twig-compact-stay">
                        <StayCardContent
                            compact
                            stay={stay}
                            image={
                                <div className="vac-image">
                                    <img src={coast} alt={stay.images[0]?.alt ?? ''} />
                                </div>
                            }
                        />
                    </article>
                    <div className="mt-4 flex">
                        <span className="relative inline-flex">
                            <button
                                type="button"
                                className="vac-button vac-primary"
                                onClick={() => setClicks((count) => count + 1)}
                            >
                                Trip details
                            </button>
                            {clicks === 0 && (
                                // The pulsing dot from ImageAnnotations, so the control reads as the thing to try.
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center"
                                >
                                    <span className="absolute inline-flex size-5 animate-ping rounded-full bg-yellow opacity-60 motion-reduce:hidden" />
                                    <span className="relative inline-flex size-3 rounded-full bg-yellow ring-2 ring-white" />
                                </span>
                            )}
                        </span>
                    </div>
                </TwigFrame>
                <PostHogInspector>
                    {clicks > 0 && (
                        <InspectorCode
                            label="Event payload · selected properties"
                            meta="autocaptured"
                            value={autocapturedPayload}
                            expand
                            collapsed={['$groups', '$exception_list']}
                            partial
                            notes={{
                                $exception_handled: {
                                    n: 2,
                                    label: 'Not handled',
                                    gloss: "Twig's code didn't catch the error, so the SDK caught it at window.onerror.",
                                },
                                $exception_values: {
                                    n: 1,
                                    label: 'No context',
                                    gloss: 'The exception says what broke, but nothing says which stay the guest opened.',
                                },
                            }}
                        />
                    )}
                    <InspectorStatus tone={clicks > 0 ? 'error' : 'neutral'}>
                        {clicks > 0
                            ? 'Nothing changed for the guest, but the SDK captured the error.'
                            : 'Click Trip details in Twig.'}
                    </InspectorStatus>
                </PostHogInspector>
            </div>
        </Exhibit>
    )
}

/** Trip details catching the error, showing a retry, and capturing each failure with the stay. */
export function TripDetailsErrorFigure(): JSX.Element {
    const [occurrences, setOccurrences] = useState(1)

    return (
        <Exhibit stacked onReset={() => setOccurrences(1)}>
            <div className="grid items-start gap-4 @lg:grid-cols-[minmax(0,1.05fr)_minmax(14rem,0.95fr)]">
                <TwigFrame>
                    <TripDetailsView
                        booking={booking}
                        errorMessage="Try to load details again."
                        onRetry={() => setOccurrences((count) => count + 1)}
                    />
                </TwigFrame>
                <PostHogInspector>
                    <InspectorDetails
                        tab="Issue"
                        title="Trip host name is missing"
                        meta={`${occurrences} ${occurrences === 1 ? 'occurrence' : 'occurrences'}`}
                        rows={[
                            { label: 'Occurrences', value: String(occurrences) },
                            { label: 'Issues', value: '1' },
                            { label: 'Status', value: 'Active' },
                        ]}
                    />
                    <InspectorCode
                        label="Event payload · selected properties"
                        meta="captureException"
                        value={exceptionPayload('generic', true, { surface: 'trip_details', stay_id: stay.id })}
                        expand
                        collapsed={['$groups', '$exception_list']}
                        partial
                        notes={{
                            stay_id: {
                                n: 2,
                                label: 'Twig context',
                                gloss: 'Twig adds the stay, so the issue shows which booking failed.',
                            },
                            $exception_handled: {
                                n: 1,
                                label: 'Handled',
                                gloss: 'Twig caught the error and sent it with captureException.',
                            },
                        }}
                    />
                    <InspectorStatus tone="error">
                        {occurrences === 1
                            ? 'Twig caught the error, showed a retry, and sent it with the stay. Click Try again in Twig.'
                            : `Each retry throws the same TypeError, so all ${occurrences} exceptions are in one issue.`}
                    </InspectorStatus>
                </PostHogInspector>
            </div>
        </Exhibit>
    )
}
