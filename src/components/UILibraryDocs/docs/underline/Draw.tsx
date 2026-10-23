import React from 'react'
import { Underline } from 'components/UI/Underline'

export default function Draw(): JSX.Element {
    return (
        <div className="max-h-60 overflow-y-auto p-3">
            <p className="!m-0 text-secondary">Scroll this preview to draw the underline.</p>
            <div className="h-64" aria-hidden="true" />
            <p className="!m-0 max-w-[24ch] text-2xl leading-relaxed">
                Give your agents{' '}
                <Underline tone="info" delay={150} animationDuration={1000}>
                    the context they need to build
                </Underline>
                .
            </p>
            <div className="h-28" aria-hidden="true" />
        </div>
    )
}
