import React from 'react'
import { Highlight } from 'components/UI/Highlight'

export default function Draw(): JSX.Element {
    return (
        <div className="max-h-60 overflow-y-auto p-3">
            <p className="!m-0 text-secondary">Scroll this preview to draw the marker.</p>
            <div className="h-64" aria-hidden="true" />
            <p className="!m-0 max-w-[32ch] text-2xl font-semibold leading-relaxed">
                Give your agents{' '}
                <Highlight delay={150} animationDuration={1000}>
                    the same product context as your team
                </Highlight>
                .
            </p>
            <div className="h-28" aria-hidden="true" />
        </div>
    )
}
