import React from 'react'
import { Snippet } from 'components/UI/Snippet'

export default function Inline(): JSX.Element {
    return (
        <div className="space-y-4 text-[15px] leading-relaxed">
            <p className="!m-0">
                Install <Snippet.Inline>posthog-js</Snippet.Inline>, then set <Snippet.Inline>api_host</Snippet.Inline>{' '}
                in your SDK configuration.
            </p>
            <p className="!m-0 max-w-[30ch]">
                Connect your agent to <Snippet.Inline tone="brand">https://mcp.posthog.com/mcp</Snippet.Inline> to query
                product data.
            </p>
            <h3 className="!m-0 !text-2xl">
                Meet <Snippet.Inline tone="brand">posthog.capture()</Snippet.Inline>
            </h3>
        </div>
    )
}
