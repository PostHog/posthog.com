import React from 'react'
import { Blockquote } from 'components/BlockQuote'

// Single source of truth for the standard "About PostHog" description.
// Used by ReaderView (the auto-appended "About" blockquote on content pages)
// and surfaced as a global MDX shortcode so handbook/docs pages can reuse the
// exact same copy instead of hard-coding their own version.
export default function AboutPostHog(): JSX.Element {
    return (
        <Blockquote>
            PostHog is an all-in-one developer platform for building successful products. We provide{' '}
            <a href="/product-analytics">product analytics</a>, <a href="/web-analytics">web analytics</a>,{' '}
            <a href="/session-replay">session replay</a>, <a href="/error-tracking">error tracking</a>,{' '}
            <a href="/feature-flags">feature flags</a>, <a href="/experiments">experiments</a>,{' '}
            <a href="/surveys">surveys</a>, <a href="/ai-observability">AI Observability</a>, <a href="/logs">logs</a>,{' '}
            <a href="/workflows">workflows</a>, <a href="/endpoints">endpoints</a>,{' '}
            <a href="/data-warehouse">data warehouse</a>, <a href="/cdp">CDP</a>, and an{' '}
            <a href="/ai">AI product assistant</a> to help debug your code, ship features faster, and keep all your
            usage and customer data in one stack.
        </Blockquote>
    )
}
