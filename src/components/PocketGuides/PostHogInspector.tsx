import React from 'react'
import './postHogInspector.css'

/** The PostHog side of Twig interactions, styled like a light developer inspector. */
export default function PostHogInspector({
    children,
    className = '',
    compact = false,
    headerAction,
}: {
    children: React.ReactNode
    className?: string
    compact?: boolean
    headerAction?: React.ReactNode
}): JSX.Element {
    return (
        <section
            aria-label="Inspector"
            className={`posthog-inspector${compact ? ' posthog-inspector--compact' : ''} ${className}`}
        >
            <div className="posthog-inspector__header">
                <span>Inspector</span>
                {headerAction}
            </div>
            <div aria-live="polite" className="posthog-inspector__body">
                {children}
            </div>
        </section>
    )
}

export function InspectorCode({ label, value, meta }: { label: string; value: string; meta?: string }): JSX.Element {
    const isElement = label === 'Clicked element'

    return (
        <div className="posthog-inspector__panel">
            <div className="posthog-inspector__tabs">
                <span className="posthog-inspector__tab">{isElement ? 'Elements' : 'Event data'}</span>
                <span className={`posthog-inspector__meta${meta ? ' posthog-inspector__meta--badge' : ''}`}>
                    {meta ?? (isElement ? 'selected node' : 'selected properties')}
                </span>
            </div>
            {isElement ? <ElementTree value={value} /> : <EventTree value={value} />}
        </div>
    )
}

export function InspectorJavaScript({
    lines,
    highlightedLine,
    meta,
}: {
    lines: string[]
    highlightedLine: number
    meta?: string
}): JSX.Element {
    return (
        <div className="posthog-inspector__panel">
            <div className="posthog-inspector__tabs">
                <span className="posthog-inspector__tab">SDK call</span>
                {meta && <span className="posthog-inspector__meta posthog-inspector__meta--badge">{meta}</span>}
            </div>
            <div className="posthog-inspector__code-body">
                <div className="posthog-inspector__code-label">
                    <svg aria-hidden="true" className="size-3 shrink-0" viewBox="0 0 12 12">
                        <path d="m2 4 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    browser tracking code
                </div>
                <div className="posthog-inspector__tree-indent posthog-inspector__tree-indent--code">
                    <pre className="posthog-inspector__pre">
                        <code className="posthog-inspector__code">
                            {lines.map((line, index) => (
                                <span
                                    key={`${index}-${line}`}
                                    className="posthog-inspector__code-line"
                                    data-highlighted={index === highlightedLine || undefined}
                                >
                                    {index === highlightedLine ? (
                                        <mark className="posthog-inspector__highlight">{line}</mark>
                                    ) : (
                                        line
                                    )}
                                </span>
                            ))}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    )
}

export function InspectorDetails({
    tab,
    title,
    meta,
    rows,
}: {
    tab: string
    title: string
    meta?: string
    rows: Array<{ label: string; value: string }>
}): JSX.Element {
    return (
        <div className="posthog-inspector__panel">
            <div className="posthog-inspector__tabs">
                <span className="posthog-inspector__tab">{tab}</span>
                {meta && <span className="posthog-inspector__meta posthog-inspector__meta--badge">{meta}</span>}
            </div>
            <div className="posthog-inspector__tree">
                <details open className="posthog-inspector__details">
                    <summary className="posthog-inspector__summary">{title}</summary>
                    <div className="posthog-inspector__tree-indent">
                        {rows.map(({ label, value }) => (
                            <div key={`${label}-${value}`} className="posthog-inspector__tree-row">
                                <span className="posthog-inspector__key">{label}</span>:{' '}
                                <span className="posthog-inspector__value">{JSON.stringify(value)}</span>
                            </div>
                        ))}
                    </div>
                </details>
            </div>
        </div>
    )
}

function ElementTree({ value }: { value: string }): JSX.Element {
    const match = value.match(/^<(\w+)\s+([^=]+)="([^"]+)">([^<]+)<\/(\w+)>$/)

    return (
        <div className="posthog-inspector__tree">
            <div className="posthog-inspector__selected-element">
                <span aria-hidden="true" className="posthog-inspector__line-number">
                    1
                </span>
                <samp className="posthog-inspector__tree-row">
                    {match ? (
                        <>
                            &lt;<span className="posthog-inspector__tag">{match[1]}</span>{' '}
                            <span className="posthog-inspector__key">{match[2]}</span>=
                            <span className="posthog-inspector__value">"{match[3]}"</span>&gt;{match[4]}&lt;/
                            <span className="posthog-inspector__tag">{match[5]}</span>&gt;
                        </>
                    ) : (
                        value
                    )}
                </samp>
            </div>
        </div>
    )
}

function EventTree({ value }: { value: string }): JSX.Element {
    const payload = JSON.parse(value) as {
        event: string
        timestamp?: string
        properties: Record<string, string | number | boolean>
    }
    const properties = Object.entries(payload.properties)

    return (
        <div className="posthog-inspector__tree">
            <details open className="posthog-inspector__details">
                <summary className="posthog-inspector__summary">capture payload</summary>
                <div className="posthog-inspector__tree-indent">
                    <div className="posthog-inspector__tree-row">
                        <span className="posthog-inspector__key">event</span>:{' '}
                        <span className="posthog-inspector__value">"{payload.event}"</span>
                    </div>
                    {payload.timestamp && (
                        <div className="posthog-inspector__tree-row">
                            <span className="posthog-inspector__key">timestamp</span>:{' '}
                            <span className="posthog-inspector__value">"{payload.timestamp}"</span>
                        </div>
                    )}
                    <details open>
                        <summary className="posthog-inspector__summary posthog-inspector__key">
                            properties <span className="posthog-inspector__muted">{'{' + properties.length + '}'}</span>
                        </summary>
                        <div className="posthog-inspector__tree-indent">
                            {properties.length ? (
                                properties.map(([key, propertyValue]) => (
                                    <div key={key} className="posthog-inspector__tree-row">
                                        <span className="posthog-inspector__key">{key}</span>:{' '}
                                        <span className="posthog-inspector__value">
                                            {JSON.stringify(propertyValue)}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="posthog-inspector__muted">No properties</div>
                            )}
                        </div>
                    </details>
                </div>
            </details>
        </div>
    )
}

export function InspectorStatus({
    children,
    tone = 'neutral',
}: {
    children: React.ReactNode
    tone?: 'neutral' | 'error'
}): JSX.Element {
    return (
        <div className="posthog-inspector__status" data-tone={tone}>
            <span aria-hidden="true" className="posthog-inspector__status-dot" />
            <span>{children}</span>
        </div>
    )
}
