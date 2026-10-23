import React from 'react'
import { Annotation } from 'components/UI/Annotation'

export default function Narrow(): JSX.Element {
    return (
        <div className="flex flex-wrap gap-6">
            <div className="w-56 max-w-full">
                <Annotation note="Keep this context" side="left">
                    <div className="rounded-lg border border-primary p-4">
                        Record the steps that lead to activation.
                    </div>
                </Annotation>
            </div>
            <div className="w-64 max-w-full">
                <Annotation note="Keep the arrow too" side="bottom" shape="loop">
                    <div className="rounded-lg border border-primary p-4">
                        The note stays below the target, even in a small window.
                    </div>
                </Annotation>
            </div>
            <div className="w-56 max-w-full">
                <Annotation note="An optional accent" side="right" narrow="hide">
                    <div className="rounded-lg border border-primary p-4">Hide only optional context.</div>
                </Annotation>
            </div>
        </div>
    )
}
