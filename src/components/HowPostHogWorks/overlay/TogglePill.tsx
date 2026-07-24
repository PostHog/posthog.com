import React from 'react'

interface TogglePillProps {
    on: boolean
    onClick: () => void
}

export default function TogglePill({ on, onClick }: TogglePillProps): JSX.Element {
    return (
        <button className="hpw-toggle" onClick={onClick}>
            <span className="hpw-toggle-dot" />
            {on ? 'Hide PostHog instrumentation' : 'Show PostHog instrumentation'}
        </button>
    )
}
