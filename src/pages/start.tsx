import React from 'react'
import SEO from 'components/seo'
import WhyPostHogViewer from 'components/WhyPostHog'

export default function Start(): JSX.Element {
    return (
        <>
            <SEO
                title="How to get started"
                description="The fastest ways to get started with PostHog: run the Wizard, add the MCP to your AI editor, or try PostHog Code."
                image="/images/og/default.png"
            />
            <WhyPostHogViewer>
                <h1>How to get started</h1>
                <p>There are a few ways to get going, depending on how you like to work.</p>

                <h2>Wizard</h2>
                <p>
                    Run the PostHog Wizard in your codebase to implement some basic tracking around your main features.
                    It serves as an example of how PostHog works and gives your AI agents the skills to instrument new
                    features properly. Takes about ~8 minutes.
                </p>
                <p>
                    <code>npx -y @posthog/wizard@latest</code>
                </p>

                <h2>MCP</h2>
                <p>
                    Already using Claude Code, Cursor, or Codex? Add the <a href="/mcp">PostHog MCP</a> to use nearly
                    all of PostHog's suite of analysis and data tools – instrument tracking, wrap features in flags,
                    build dashboards, and ask questions about your data, all without leaving your editor.
                </p>

                <h2>PostHog Code</h2>
                <p>
                    PostHog Code is our AI code editor (available on desktop and soon on the web). It has everything
                    above, plus features you can't get anywhere else – like Signals, which monitors logs, errors, and
                    session recordings to find patterns and ships PRs to fix issues automatically.
                </p>
            </WhyPostHogViewer>
        </>
    )
}
