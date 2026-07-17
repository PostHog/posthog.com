import React from 'react'
import SEO from 'components/seo'
import WhyPostHogViewer from 'components/WhyPostHog'

export default function Workflow(): JSX.Element {
    return (
        <>
            <SEO
                title="Works with your agents"
                description="PostHog fits into your AI workflow. Use the PostHog MCP from Claude Code, Cursor, or Codex to instrument tracking, wrap features in flags, build dashboards, and ask questions about your data – without leaving your editor."
                image="/images/og/default.png"
            />
            <WhyPostHogViewer>
                <h1>Works with your agents</h1>
                <p>We're not writing much code by hand anymore and chances are neither are you.</p>
                <p>
                    Use the <a href="/mcp">PostHog MCP</a> to instrument tracking code, wrap a new feature in a flag,
                    spin up a dashboard to monitor it, and even ask questions about feature usage – all without leaving
                    your AI coding environment.
                </p>
                <blockquote>
                    <p>
                        New to PostHog? Run the PostHog Wizard in your codebase to implement some basic tracking around
                        your main features. It serves as an example of how it works and gives your AI agents the skills
                        to instrument new features properly. Takes about ~8 minutes.
                    </p>
                    <p>
                        <code>npx -y @posthog/wizard@latest</code>
                    </p>
                </blockquote>

                <h2>If you like your workflow, you can keep it</h2>
                <p>
                    Using Claude Code, Cursor, or Codex? Add the <a href="/mcp">PostHog MCP</a> to utilize nearly all of
                    PostHog's suite of analysis and data tools. Our tools are designed to work together – but if you'd
                    rather start with only one or two products, you can do that too.
                </p>
                <p>Try prompting your AI coding editor with…</p>
                <ul>
                    <li>
                        <em>
                            "Use the PostHog MCP to create a new experiment called "homepage-test" with two test
                            variants and distribute traffic evenly"
                        </em>
                    </li>
                    <li>
                        <em>
                            "Add PostHog tracking to this button and pass along UTM values as properties on the event"
                        </em>
                    </li>
                    <li>
                        <em>
                            "When this form is submitted, create a PostHog workflow that sends a notification to my
                            #alerts Slack channel."
                        </em>
                    </li>
                </ul>
                <p>
                    If you're already using PostHog for analytics or debugging, you can ask questions about your data
                    without leaving your editor. Examples:
                </p>
                <ul>
                    <li>
                        <em>"Ask PostHog how many unique users clicked this button in the last 7 days"</em>
                    </li>
                    <li>
                        <em>"Have there been any recent errors logged to PostHog in this component?"</em>
                    </li>
                </ul>

                <h2>But if you like trying new things…</h2>
                <p>
                    PostHog Code, our AI code editor (available on desktop and soon on the web), has everything you've
                    read about above, <em>but also comes with features you can't get anywhere else.</em>
                </p>
                <ul>
                    <li>
                        Signals – PostHog automatically monitors logs, errors, and summarizes session recordings to find
                        patterns, then ships PRs to fix issues.
                    </li>
                    <li>Control Center – Monitor multiple agents all in one place</li>
                </ul>
                <p>
                    With PostHog Code you don't need a separate subscription to Claude Code or Codex – you get access to
                    all the latest AI models directly within PostHog, and it costs about the same.
                </p>
            </WhyPostHogViewer>
        </>
    )
}
