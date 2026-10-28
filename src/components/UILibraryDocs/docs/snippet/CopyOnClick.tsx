import React from 'react'
import { Snippet } from 'components/UI/Snippet'

export default function CopyOnClick(): JSX.Element {
    return (
        <div className="flex flex-col gap-3">
            <Snippet copyOnClick text="npx -y @posthog/wizard@latest" />
            <p className="!m-0 text-body">
                Your project token is <Snippet.Inline copyOnClick>phc_k8Fz2nQw7xR4tY1u</Snippet.Inline>.
            </p>
        </div>
    )
}
