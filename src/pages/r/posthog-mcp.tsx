import React, { useState, useEffect } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { QuestLog, QuestLogItem } from 'components/Docs/QuestLog'
import { CallToAction } from 'components/CallToAction'
import { ProductScreenshot } from 'components/ProductScreenshot'
import { ProductVideo } from 'components/ProductVideo'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import { SingleCodeBlock } from 'components/CodeBlock'
import ProductList from 'components/ProductList'
import WizardCTA from 'components/WizardCTA'
import ElevenLabsLogo from 'components/CustomerLogos/ElevenLabsLogo'
import HeygenLogo from 'components/CustomerLogos/HeygenLogo'
import ExaLogo from 'components/CustomerLogos/ExaLogo'

export default function PostHogMCPLanding(): JSX.Element {
    const [isIdle, setIsIdle] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        let idleTimer: ReturnType<typeof setTimeout>

        const handleActivity = () => {
            setIsIdle(false)
            clearTimeout(idleTimer)
            idleTimer = setTimeout(() => setIsIdle(true), 2000)
        }

        handleActivity()
        window.addEventListener('pointermove', handleActivity)
        window.addEventListener('keydown', handleActivity)

        const scrollViewport = document.querySelector('[data-radix-scroll-area-viewport]')
        scrollViewport?.addEventListener('scroll', handleActivity)

        return () => {
            clearTimeout(idleTimer)
            window.removeEventListener('pointermove', handleActivity)
            window.removeEventListener('keydown', handleActivity)
            scrollViewport?.removeEventListener('scroll', handleActivity)
        }
    }, [])

    return (
        <>
            <SEO
                title="PostHog MCP - A product analyst that lives in your editor"
                description="With PostHog MCP, your AI agents can grab session replays, summarize user behavior, build funnels, and turn bug reports into PRs, all from Claude Code, Cursor, Zed, or Windsurf. No per-seat pricing, no credit card."
                noindex
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                hideTitle
                title="PostHog MCP"
                contentMaxWidthClass="max-w-5xl"
                showQuestions={false}
            >
                <div className="grid grid-cols-1 @lg:grid-cols-[1.2fr_1fr] gap-10 items-center mb-6 max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-3xl md:text-5xl !mb-4">PostHog MCP</h1>
                        <p className="text-lg md:text-xl mb-6 text-secondary">
                            A product analyst that lives in your editor. Ask anything.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                Get started free
                            </CallToAction>
                            <CallToAction
                                type="secondary"
                                size="md"
                                onClick={() => {
                                    const el = document.getElementById('quest-item-install-the-mcp-with-the-wizard')
                                    if (el) {
                                        window.history.pushState(
                                            null,
                                            '',
                                            '#quest-item-install-the-mcp-with-the-wizard'
                                        )
                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    }
                                }}
                            >
                                Install MCP
                            </CallToAction>
                        </div>
                        <p className="text-sm !mb-0 text-secondary">
                            With the{' '}
                            <Link to="/docs/model-context-protocol" state={{ newWindow: true }}>
                                PostHog MCP
                            </Link>
                            , your agents become PostHog geniuses. Instead of manually searching for insights, data, or
                            trends in the PostHog user interface, just ask your agent to use the PostHog MCP. Works with
                            Cursor, Codex, Claude Code, Windsurf, VS Code, and others.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/Group_143773_7436a145da_622d666c76.png"
                            alt="PostHog MCP in your editor"
                            className="w-full max-w-[350px] mx-auto"
                        />
                    </div>
                </div>

                <div className="mb-12 max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center gap-x-12 gap-y-6 text-primary dark:text-primary-dark">
                        <ElevenLabsLogo className="fill-current object-contain max-w-full h-8" />
                        <HeygenLogo className="fill-current object-contain max-w-full h-8" />
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/kilocode_logo_c58c88f029.webp"
                            alt="Kilo Code"
                            imgClassName="object-contain max-w-full h-8 w-auto"
                        />
                        <ExaLogo className="fill-current object-contain max-w-full h-8" />
                    </div>
                    <p className="text-xs mt-3 !mb-0">
                        <span className="font-semibold">A few PostHog MCP customers.</span>
                        <br />
                        <span className="text-muted">
                            (Yes they actually use us, no it's not just some random engineer who tried us out 2+ years
                            ago.)
                        </span>
                    </p>
                </div>

                <div className={isIdle ? 'quest-idle' : ''}>
                    <QuestLog firstSpeechBubble="Let's wire up your editor!" lastSpeechBubble="Time to start shipping!">
                        <QuestLogItem
                            title="Install the MCP with the Wizard"
                            subtitle="Automatic setup with one command"
                            icon="IconMagicWand"
                        >
                            <p>
                                <strong>PostHog Wizard</strong> is an agentic CLI tool that installs and configures the
                                PostHog MCP for you. The Wizard analyzes your codebase and automagically sets up the
                                right tools, custom events, and dashboards for your product. All it takes is one line:
                            </p>

                            <WizardCTA />

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/mcp_session_replay_1080_de1089e7aa_ee24396774.mp4"
                                videoDark={undefined}
                                classes="rounded border border-primary"
                                autoPlay={true}
                            />

                            <p className="!mb-2">
                                <strong>Already using PostHog and just want to add the MCP?</strong>
                            </p>

                            <SingleCodeBlock language="bash" showAskAI={false}>
                                npx @posthog/wizard mcp add
                            </SingleCodeBlock>

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    onClick={() => {
                                        navigator.clipboard.writeText('npx @posthog/wizard mcp add')
                                        setIsCopied(true)
                                        setTimeout(() => setIsCopied(false), 2500)
                                    }}
                                >
                                    {isCopied ? 'npx command copied! 🚀' : 'Start cooking with our MCP'}
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem title="Talk to me, baby" subtitle="Natural language navigation" icon="IconChat">
                            <p>
                                Once you connect to the PostHog MCP server, see how Hogpilled your agent has become. For
                                example:
                            </p>

                            <ul>
                                <li>
                                    <em>"Why did sign-ups drop 12% last Tuesday?"</em>
                                </li>
                                <li>
                                    <em>
                                        "Build me a funnel from landing page to paid conversion, broken down by
                                        marketing source."
                                    </em>
                                </li>
                                <li>
                                    <em>
                                        "Show me warning and error logs from the last 24 hours, excluding debug noise."
                                    </em>
                                </li>
                                <li>
                                    <em>
                                        "Create a feature flag called new-checkout-flow rolled out to 20% of users on
                                        the pro plan."
                                    </em>
                                </li>
                            </ul>

                            <p>
                                The agent pulls from your real events, builds the insight, and explains what it found.
                                You stay in your IDE or CLI. No context switching, no dashboard archaeology.
                            </p>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/mcp_session_replay_1080_de1089e7aa.mp4"
                                videoDark={undefined}
                                classes="rounded border border-primary"
                                autoPlay={true}
                            />

                            <ul>
                                <li>Works with Claude, Cursor, Windsurf, and any MCP-compatible client</li>
                                <li>HogQL (our SQL) and the UI insight builder are there when you need them</li>
                                <li>Full audit log of every query run on your data, by humans or agents</li>
                            </ul>

                            <p>If you use any of the following PostHog products, you're going to love our MCP.</p>

                            <ProductList
                                className="grid gap-4 grid-cols-2 not-prose"
                                urlPrefix="/docs/"
                                products={[
                                    'product_analytics',
                                    'session_replay',
                                    'feature_flags',
                                    'experiments',
                                    'error_tracking',
                                    'surveys',
                                    'ai_observability',
                                    'data_warehouse',
                                    'cdp',
                                    'logs',
                                ]}
                            />

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/model-context-protocol"
                                    state={{ newWindow: true }}
                                >
                                    Get your agents Hogpilled
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="See your product's performance"
                            subtitle="Product analytics and insights"
                            icon="IconGraph"
                        >
                            <p>
                                The PostHog MCP server gives your AI coding agent direct access to PostHog analytics.
                                Query trends, funnels, retention, and custom HogQL – all from your code editor.
                            </p>

                            <p>With the PostHog MCP, you can:</p>

                            <ul>
                                <li>
                                    <strong>Check feature performance before making code changes</strong> – "How many
                                    users are using the new search feature this week?"
                                </li>
                                <li>
                                    <strong>Pull conversion rates into your workflow</strong> – "What's the funnel
                                    conversion from signup to first project?"
                                </li>
                                <li>
                                    <strong>Investigate metric changes</strong> – "Did the login success rate change
                                    after last Tuesday's deploy?"
                                </li>
                                <li>
                                    <strong>Build insights on demand</strong> – "Create a trend showing daily active
                                    users broken down by plan. Then, create a report."
                                </li>
                            </ul>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/MCP_claude_chat_0633217f46.mp4"
                                videoDark={undefined}
                                classes="rounded border border-primary"
                                autoPlay={true}
                            />

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/product-analytics/build-insights-mcp"
                                    state={{ newWindow: true }}
                                >
                                    Deploy MCP for Analytics
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Triage issues, fix automatically"
                            subtitle="Use PostHog's debugging tools to quickly find issues and get the context to fix them"
                            icon="IconWarning"
                        >
                            <p>
                                No more grep. No more searching through stack traces. No more comparing customer
                                profiles to your logs.
                            </p>

                            <p>
                                Instead, query your data warehouse tables, clickstream event data, errors, and more to
                                answer tough questions using your actual data – events, warehouse tables, errors,
                                recordings – in one place.
                            </p>

                            <p>With the PostHog MCP, you can:</p>

                            <ul>
                                <li>
                                    <strong>Prioritize errors by any metric</strong> – "Which errors impact user
                                    sign-ups the most?"
                                </li>
                                <li>
                                    <strong>Get front-end context while investigating logs and errors</strong> – "Show
                                    recordings from enterprise users in the last 24 hours."
                                </li>
                                <li>
                                    <strong>Let PostHog surface errors that matter most</strong> – "What services are
                                    logging errors? Search for error logs from the payments service."
                                </li>
                            </ul>

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/error-tracking/debug-errors-mcp"
                                    state={{ newWindow: true }}
                                >
                                    Debug with MCP
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Ship, measure, iterate"
                            subtitle="Feature flags, experiments, and surveys on the same events"
                            icon="IconRocket"
                        >
                            <p>
                                You've found the problem. Now ship the fix behind a flag, measured, and A/B tested. Just
                                ask your agent to do it.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/feature_flags_claude_code_3eddf374a9.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/feature_flags_claude_code_3eddf374a9.png"
                                alt="Feature flags managed from Claude Code"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <p>With the PostHog MCP, you can:</p>

                            <ul>
                                <li>
                                    <strong>Create flags while building features</strong> – "Create a flag called
                                    new-search rolled out to 10% of users" as part of your development workflow.
                                </li>
                                <li>
                                    <strong>Set up A/B tests in plain English</strong> – "Create an A/B test for the new
                                    checkout flow with a 70/30 split. Use purchase_completed as the goal metric."
                                </li>
                                <li>
                                    <strong>Get updates on experiments</strong> – "Is the dark-mode-test Experiment
                                    statistically significant yet?"
                                </li>
                            </ul>

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/experiments/create-experiments-mcp"
                                    state={{ newWindow: true }}
                                >
                                    Optimize with MCP
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Use for free"
                            subtitle="The PostHog MCP doesn't cost extra"
                            icon="IconPiggyBank"
                        >
                            <p>
                                PostHog is cheap. There's a generous free tier, no per-seat fees, and pricing is
                                usage-based and published. More than 90% of companies use PostHog for free.
                            </p>

                            <p>
                                Here's the kicker: <strong>using the PostHog MCP doesn't cost extra</strong>.
                            </p>

                            <h2>TL;DR 💸</h2>

                            <ul>
                                <li>No credit card required to start</li>
                                <li>
                                    <strong>PostHog MCP is included</strong> (no enterprise plan required)
                                </li>
                                <li>Set billing limits to avoid surprise charges</li>
                                <li>
                                    See our{' '}
                                    <Link to="/pricing" state={{ newWindow: true }}>
                                        pricing page
                                    </Link>{' '}
                                    for more up-to-date details
                                </li>
                            </ul>

                            <hr className="my-6" />

                            <p>That's it! You're ready to start integrating.</p>

                            <div className="flex flex-wrap gap-2 mt-4">
                                <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                    Get started free
                                </CallToAction>
                                <CallToAction
                                    type="secondary"
                                    size="md"
                                    to="/talk-to-a-human"
                                    state={{ newWindow: true }}
                                >
                                    Talk to a human
                                </CallToAction>
                            </div>
                        </QuestLogItem>
                    </QuestLog>
                </div>
            </ReaderView>
        </>
    )
}
