import React from 'react'
import SEO from 'components/seo'
import WhyPostHogViewer from 'components/WhyPostHog'

export default function WhatIsPostHog(): JSX.Element {
    return (
        <>
            <SEO
                title="What is PostHog?"
                description="PostHog is a developer-focused platform to analyze, test, and improve your software products – and give your AI agents the context they need to do it."
                image="/images/og/default.png"
            />
            <WhyPostHogViewer>
                <h1>What is PostHog?</h1>
                <p>
                    We're a developer-focused platform used to{' '}
                    <strong>analyze, test, and improve software products</strong>
                    —especially web apps, mobile apps, and SaaS tools. Our tools give AI agents the context they need to
                    understand usage, fix bugs, and continuously ship improvements so you can focus on what AI can't do.
                </p>
                <p>
                    Think of PostHog as a <strong>"control center" for your app</strong>:
                </p>
                <ul>
                    <li>
                        It tells you <strong>what users are doing</strong>
                    </li>
                    <li>
                        Helps you <strong>find bugs or friction</strong>
                    </li>
                    <li>
                        Lets you <strong>build and test new features</strong>
                    </li>
                    <li>Keeps all your product data in one place</li>
                </ul>
                <p>
                    PostHog connects product usage signals – what users actually do, where things break, what they say –
                    directly to your AI development workflow. With our tools like{' '}
                    <a href="/error-tracking">Error Tracking</a>, <a href="/session-replay">Session Replay</a>,{' '}
                    <a href="/logs">Logs</a>, and <a href="/product-analytics">Analytics</a>, PostHog surfaces what
                    needs fixing – then automatically creates pull requests for you.
                </p>

                <h2>It's like an onion</h2>
                <p>
                    We started out by building Product Analytics, but our suite has grown into nearly every tool you
                    need for building successful products.
                </p>
                <p>
                    There are a few things we don't do (yet) like auth, billing, and hosting. But we do pretty much
                    everything else.
                </p>
                <ul>
                    <li>
                        <strong>Data: Input layer</strong> → collects everything users do
                    </li>
                    <li>
                        <strong>Insights: Brain layer</strong> → analyzes, finds patterns
                    </li>
                    <li>
                        <strong>Tooling: Action layer</strong> → experiments, feature flags, fixes
                    </li>
                    <li>
                        <strong>Build: AI layer</strong> → helps you build and optimize automatically
                    </li>
                </ul>

                <h2>Tooling examples</h2>
                <p>
                    Check out our <a href="/products">full product suite</a>, but here's a gist of what we do:
                </p>
                <ul>
                    <li>
                        <strong>Product analytics</strong> → track clicks, usage, funnels, retention
                    </li>
                    <li>
                        <strong>Session replay</strong> → watch recordings of real users interacting with your product
                        as they click, type, scroll, and navigate
                    </li>
                    <li>
                        <strong>Feature flags</strong> → turn features on/off without deploying code
                    </li>
                    <li>
                        <strong>A/B testing (experiments)</strong> → test changes and measure impact
                    </li>
                    <li>
                        <strong>Error tracking</strong> → monitor crashes and bugs
                    </li>
                    <li>
                        <strong>Surveys &amp; feedback</strong> → collect user input
                    </li>
                    <li>
                        <strong>Data warehouse + pipelines</strong> → centralize and analyze data
                    </li>
                    <li>
                        <strong>AI observability</strong> → monitor the quality of how LLMs interact with users
                    </li>
                    <li>
                        <strong>AI tools</strong> → query data, debug issues, and automate analysis
                    </li>
                </ul>
                <p>Our tools are made to be used together, but you can also pick and choose what you want to use.</p>
            </WhyPostHogViewer>
        </>
    )
}
