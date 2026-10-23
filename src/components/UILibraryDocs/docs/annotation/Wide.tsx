import React from 'react'
import { Annotation } from 'components/UI/Annotation'

export default function Wide(): JSX.Element {
    return (
        <div
            role="region"
            aria-label="Wide annotation examples"
            tabIndex={0}
            className="max-w-full overflow-x-auto rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
        >
            <div className="min-w-[640px] space-y-8 p-3">
                <Annotation note="Start with a question" side="left" shape="curved" tone="brand">
                    <div className="rounded-lg border border-primary p-6">Which features bring people back?</div>
                </Annotation>
                <Annotation note="Follow the journey" side="right" shape="loop" tone="info">
                    <div className="rounded-lg border border-primary p-6">Signup → Activation → Return visit</div>
                </Annotation>
                <Annotation note="Check the result" side="left" shape="straight">
                    <div className="rounded-lg border border-primary p-6">
                        Compare behavior before and after a release.
                    </div>
                </Annotation>
                <Annotation note="Look for a pattern" side="right" shape="curved" tone="success">
                    <div className="rounded-lg border border-primary p-6">
                        Find the events that returning users share.
                    </div>
                </Annotation>
                <Annotation note="Compare both paths" side="left" shape="loop" tone="warning">
                    <div className="rounded-lg border border-primary p-6">Check where people leave the funnel.</div>
                </Annotation>
                <Annotation note="Find the failed step" side="right" shape="straight" tone="error">
                    <div className="rounded-lg border border-primary p-6">
                        Replay the session that contains the error.
                    </div>
                </Annotation>
            </div>
        </div>
    )
}
