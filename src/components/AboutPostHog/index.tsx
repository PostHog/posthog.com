import React from 'react'
import { Blockquote } from 'components/BlockQuote'

// Single source of truth for the standard "About PostHog" description.
// Used by ReaderView (the auto-appended "About" blockquote on content pages)
// and surfaced as a global MDX shortcode so handbook/docs pages can reuse the
// exact same copy instead of hard-coding their own version.
export default function AboutPostHog(): JSX.Element {
    return (
        <Blockquote>
            PostHog is the leading platform for building self-driving products. With a full suite of developer tools –{' '}
            <a href="/ai-observability">AI observability</a>, <a href="/product-analytics">product analytics</a>,{' '}
            <a href="/session-replay">session replay</a>, <a href="/feature-flags">feature flags</a>,{' '}
            <a href="/experiments">experiments</a>, <a href="/error-tracking">error tracking</a>,{' '}
            <a href="/logs">logs</a>, and more – PostHog captures all the context agents need to diagnose problems,
            uncover opportunities, and ship fixes. A <a href="/data-stack">data warehouse</a> and <a href="/cdp">CDP</a>{' '}
            tie it all together, unifying that context into one source agents can read across. You can steer it all from{' '}
            <a href="/slack">Slack</a>, <a href="/ai">the web app</a>, the desktop (
            <a href="/desktop">PostHog Desktop</a>), or your own editor via <a href="/mcp">the MCP</a>.
        </Blockquote>
    )
}
