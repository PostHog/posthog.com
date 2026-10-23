import React from 'react'
import { Reveal } from 'components/UI/Reveal'

export default function Stagger(): JSX.Element {
    return (
        <div className="space-y-12">
            <Reveal
                text="Understand your users. Build a better product."
                effect="fade"
                delay={150}
                stagger={60}
                className="text-2xl font-bold leading-snug"
            />
            <Reveal stagger={100} delay={150} className="space-y-4">
                <h3 className="m-0">From a question to an answer</h3>
                <p className="m-0">Use product analytics to find where users stop.</p>
                <p className="m-0">Open a session replay to see what happened.</p>
                <p className="m-0">Test a change with a feature flag.</p>
            </Reveal>
        </div>
    )
}
