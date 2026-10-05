import React from 'react'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import McpAnalyticsDemo from 'components/McpAnalyticsDemo'

export default function McpAnalyticsDemoVideo(): JSX.Element {
    return (
        <>
            <SEO
                title="MCP analytics: an 8-bit tale - PostHog"
                description="An 8-bit animated video about MCP analytics."
                image={`/images/og/default.png`}
                noindex
            />
            <Editor title="MCP analytics: an 8-bit tale">
                <McpAnalyticsDemo />
            </Editor>
        </>
    )
}
