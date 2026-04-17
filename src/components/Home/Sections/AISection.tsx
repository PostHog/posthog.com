import React from 'react'
import Link from 'components/Link'
import Markdown from 'components/Markdown'

export const AISection = () => (
    <div id="ai">
        <h2>PostHog AI</h2>

        <Markdown>{`PostHog AI works across PostHog – and it's *way* more than just generating insights.

PostHog AI helps you automate monotonous tasks of gathering context and summarizing information, and can even create multi-variate experiments and feature flags – all with natural language. And soon, it'll have the ability to make code changes to fix bugs and create pull requests.`}</Markdown>

        <Link to="/ai" state={{ newWindow: true }}>
            Learn about PostHog AI
        </Link>
    </div>
)

export default AISection
