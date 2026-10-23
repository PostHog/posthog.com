import React from 'react'
import { Annotation } from 'components/UI/Annotation'
import { Button } from 'components/UI/Button'

export default function Shapes(): JSX.Element {
    return (
        <div className="w-[400px] max-w-full space-y-8">
            <Annotation note="Start here" side="left" shape="curved" tone="brand" drawIn>
                <div className="rounded-lg border border-primary p-6">
                    <h3 className="m-0 mb-3">See what people do in your product</h3>
                    <Button>Explore product analytics</Button>
                </div>
            </Annotation>
            <Annotation note="Follow the whole journey" side="right" shape="loop" tone="info">
                <div className="rounded-lg border border-primary p-6">Signup → Activation → Return visit</div>
            </Annotation>
            <Annotation note="Your first insight" side="top" shape="straight">
                <div className="rounded-lg border border-primary p-6">Which features bring people back?</div>
            </Annotation>
            <Annotation note="Check the next step" side="bottom" shape="curved" tone="success">
                <div className="rounded-lg border border-primary p-6">Turn an insight into a product change.</div>
            </Annotation>
            <Annotation note="Check this journey too" side="bottom" shape="loop" tone="warning">
                <div className="rounded-lg border border-primary p-6">Compare the paths that lead to activation.</div>
            </Annotation>
            <Annotation note="Find the failed step" side="bottom" shape="straight" tone="error">
                <div className="rounded-lg border border-primary p-6">Replay the session that contains the error.</div>
            </Annotation>
        </div>
    )
}
