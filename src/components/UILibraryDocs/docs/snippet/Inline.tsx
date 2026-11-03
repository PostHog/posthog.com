import React from 'react'
import { Snippet } from 'components/UI/Snippet'

export default function Inline(): JSX.Element {
    return (
        <div className="flex max-w-[65ch] flex-col gap-3 text-body">
            <p className="!m-0">
                Install <Snippet.Inline>posthog-js</Snippet.Inline>, then set <Snippet.Inline>api_host</Snippet.Inline>{' '}
                in your SDK configuration.
            </p>
            <p className="!m-0">
                Connect your agent to <Snippet.Inline color="yellow">https://mcp.posthog.com/mcp</Snippet.Inline> to
                query product data from your editor.
            </p>
        </div>
    )
}
