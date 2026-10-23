import React from 'react'
import { Snippet } from 'components/UI/Snippet'

export default function Tones(): JSX.Element {
    return (
        <div className="flex flex-col gap-3">
            <Snippet text="npm install posthog-js" />
            <Snippet tone="brand" text="npx -y @posthog/wizard@latest" />
            <Snippet tone="info" prompt={false} text="POSTHOG_HOST=https://us.i.posthog.com" />
            <p className="!m-0 text-[15px]">
                <Snippet.Inline tone="success">enabled</Snippet.Inline> flags return a value.{' '}
                <Snippet.Inline tone="error">$exception</Snippet.Inline> events start an issue.
            </p>
        </div>
    )
}
