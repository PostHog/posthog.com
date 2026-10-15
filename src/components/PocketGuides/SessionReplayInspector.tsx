import React from 'react'

import PostHogInspector from './PostHogInspector'

export type SessionReplayInspectorEvent = {
    timeMs: number
    kind: string
    title: string
    properties: Array<{ label: string; value: string }>
}

export default function SessionReplayInspector({
    events,
    activeIndex,
}: {
    events: SessionReplayInspectorEvent[]
    activeIndex: number
}): JSX.Element {
    const clickCount = events.filter((event) => event.kind === 'Click').length
    const pageCount = events.filter((event) => event.kind === 'Pageview').length

    return (
        <PostHogInspector>
            <div className="posthog-inspector__tabs">
                <span className="posthog-inspector__tab">Events</span>
            </div>

            <div className="posthog-inspector__event-summary">
                <span>{clickCount} clicks</span>
                <span>{pageCount} pages</span>
            </div>

            <ol className="posthog-inspector__events">
                {events.map((item, index) => (
                    <li
                        key={`${item.timeMs}-${item.title}`}
                        aria-current={activeIndex === index ? 'true' : undefined}
                        className="posthog-inspector__event"
                    >
                        <time className="posthog-inspector__event-time">
                            {Math.floor(item.timeMs / 60000)}:
                            {String(Math.floor((item.timeMs % 60000) / 1000)).padStart(2, '0')}
                        </time>
                        <div className="posthog-inspector__event-main">
                            <div className="posthog-inspector__event-label">
                                <span aria-hidden="true" className="posthog-inspector__event-dot" />
                                <div className="posthog-inspector__event-main">
                                    <strong className="posthog-inspector__event-title">{item.title}</strong>
                                    <span className="posthog-inspector__event-kind">{item.kind}</span>
                                </div>
                            </div>
                        </div>
                        {activeIndex === index && (
                            <dl className="posthog-inspector__event-properties">
                                {item.properties.map(({ label, value }) => (
                                    <div key={label} className="posthog-inspector__event-property">
                                        <dt>{label}</dt>
                                        <dd>{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        )}
                    </li>
                ))}
            </ol>
        </PostHogInspector>
    )
}
