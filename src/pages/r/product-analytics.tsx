import React, { useState, useEffect, useMemo } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { QuestLog, QuestLogItem } from 'components/Docs/QuestLog'
import { CallToAction } from 'components/CallToAction'
import { ProductScreenshot } from 'components/ProductScreenshot'
import { ProductVideo } from 'components/ProductVideo'
import List from 'components/List'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import { SingleCodeBlock } from 'components/CodeBlock'
import WistiaEmbed from 'components/WistiaEmbed'
import FeaturesSlide from 'components/Products/Slides/FeaturesSlide'
import { productAnalytics } from 'hooks/productData/product_analytics'
import usePlatformList from 'hooks/docs/usePlatformList'
import YCombinatorLogo from 'components/CustomerLogos/YCombinatorLogo'
import HasuraLogo from 'components/CustomerLogos/HasuraLogo'
import ContraLogo from 'components/CustomerLogos/ContraLogo'
import SpeakeasyLogo from 'components/CustomerLogos/SpeakeasyLogo'
import { IconRewindPlay, IconToggle, IconDatabase } from '@posthog/icons'

const TOP_COUNT = 8
const PLATFORM_ORDER = [
    '/docs/product-analytics/installation/react',
    '/docs/product-analytics/installation/nodejs',
    '/docs/product-analytics/installation/python',
    '/docs/product-analytics/installation/web',
    '/docs/product-analytics/installation/react-native',
    '/docs/product-analytics/installation/ios',
    '/docs/product-analytics/installation/android',
    '/docs/product-analytics/installation/flutter',
    '/docs/product-analytics/installation/ruby',
    '/docs/product-analytics/installation/go',
    '/docs/product-analytics/installation/java',
    '/docs/product-analytics/installation/dotnet',
]

export default function ProductAnalyticsLanding(): JSX.Element {
    const [showMore, setShowMore] = useState(false)
    const [isIdle, setIsIdle] = useState(false)

    const allPlatforms = usePlatformList('docs/product-analytics/installation', 'product analytics installation')
    const sortedPlatforms = useMemo(() => {
        const indexed = new Map(allPlatforms.map((p) => [p.url, p]))
        const ordered = PLATFORM_ORDER.map((url) => indexed.get(url)).filter(Boolean) as typeof allPlatforms
        const unlisted = allPlatforms.filter((p) => !PLATFORM_ORDER.includes(p.url))
        const all = [...ordered, ...unlisted]
        return { top: all.slice(0, TOP_COUNT), rest: all.slice(TOP_COUNT) }
    }, [allPlatforms])

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
                title="Product analytics that shows you what's actually happening"
                description="Autocapture events, build funnels, track retention, and analyze user behavior with AI. PostHog connects product analytics to session replay, feature flags, and experiments. Free for 1M events/month."
                noindex
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                hideTitle
                title="Product analytics that shows you what's actually happening"
                contentMaxWidthClass="max-w-5xl"
                showQuestions={false}
            >
                <div className="grid grid-cols-1 @lg:grid-cols-[1.2fr_1fr] gap-10 items-center mb-6 max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-3xl md:text-5xl !mb-4">
                            Product analytics that shows you what's actually happening
                        </h1>
                        <p className="text-lg md:text-xl mb-6 text-secondary">
                            Autocapture from day one. Ask your AI agent to build funnels, track retention, and dig into
                            user behavior — all without leaving your editor.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <CallToAction type="primary" size="md" to="https://us.posthog.com/signup">
                                Get started free
                            </CallToAction>
                            <CallToAction
                                type="secondary"
                                size="md"
                                to="/docs/model-context-protocol"
                                state={{ newWindow: true }}
                            >
                                Install MCP
                            </CallToAction>
                        </div>
                        <p className="text-sm !mb-0 text-secondary">
                            With{' '}
                            <Link to="/docs/model-context-protocol" state={{ newWindow: true }}>
                                PostHog MCP
                            </Link>
                            , your AI agent can query trends, build funnels, track retention, and turn data into
                            insights — all from Claude Code, Cursor, Zed, or Windsurf. Free for 1M events/month, no
                            per-seat pricing, no credit card required.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        {/* Placeholder: replace with final hero image */}
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_product_analytics_trend_light_703f700a5b.png"
                            alt="Product analytics dashboard"
                            className="w-full max-w-[450px] mx-auto rounded shadow-xl"
                        />
                    </div>
                </div>

                <div className="mb-12 max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center gap-x-12 gap-y-6 text-primary dark:text-primary-dark">
                        <YCombinatorLogo className="fill-current object-contain max-w-full h-8" />
                        <HasuraLogo className="fill-current object-contain max-w-full h-8" />
                        <ContraLogo className="fill-current object-contain max-w-full h-8" />
                        <SpeakeasyLogo className="fill-current object-contain max-w-full h-8" />
                    </div>
                    <p className="text-xs mt-3 !mb-0">
                        <span className="font-semibold">A few PostHog Product Analytics customers.</span>
                        <br />
                        <span className="text-muted">
                            (Yes they actually use us, no it's not just some random engineer who tried us out 2+ years
                            ago.)
                        </span>
                    </p>
                </div>

                <div className={isIdle ? 'quest-idle' : ''}>
                    <QuestLog
                        firstSpeechBubble="Let's understand your users!"
                        lastSpeechBubble="Time to start shipping!"
                    >
                        <QuestLogItem
                            title="Install with the PostHog Wizard"
                            subtitle="Autocapture + custom events in one command"
                            icon="IconMagicWand"
                        >
                            <p>
                                <strong>PostHog Wizard</strong> analyzes your codebase and automatically sets up
                                autocapture, custom events, and dashboards tailored to your product. One command does it
                                all:
                            </p>

                            <SingleCodeBlock language="bash" showAskAI={false}>
                                npx @posthog/wizard
                            </SingleCodeBlock>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/product_analytics_data_1080_0f850bdf5b.mp4"
                                videoDark={undefined}
                                classes="rounded border border-primary"
                                autoPlay={true}
                                loop={true}
                            />

                            <p>
                                Autocapture is on by default. Pageviews, clicks, form submissions, and session data are
                                tracked automatically the moment a user lands on your page. No manual event tagging
                                required.
                            </p>

                            <p>
                                Call <code>posthog.capture()</code> for custom events, or define events retroactively
                                using{' '}
                                <Link
                                    to="/docs/product-analytics/autocapture#combining-events-into-actions"
                                    state={{ newWindow: true }}
                                >
                                    actions
                                </Link>{' '}
                                — no re-deploy needed.
                            </p>

                            <SingleCodeBlock language="javascript" showAskAI={false}>
                                {`posthog.capture('signup_completed', { plan: 'pro' })`}
                            </SingleCodeBlock>

                            <h3>Or install the SDK directly</h3>

                            <List
                                className="grid gap-4 grid-cols-2 @md:grid-cols-2 not-prose"
                                items={sortedPlatforms.top}
                            />

                            {showMore && sortedPlatforms.rest.length > 0 && (
                                <List
                                    className="grid gap-4 grid-cols-2 @md:grid-cols-2 not-prose mt-4"
                                    items={sortedPlatforms.rest}
                                />
                            )}

                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="mt-3 text-red dark:text-yellow font-semibold text-sm cursor-pointer hover:underline"
                            >
                                {showMore ? 'Show less' : 'See more platforms'}
                            </button>

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="https://us.posthog.com/signup">
                                    Get started free
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Analyze with MCP and AI"
                            subtitle="Query your product data from your editor"
                            icon="IconSparkles"
                        >
                            <p>
                                <strong>MCP (Model Context Protocol)</strong> connects your AI coding agent directly to
                                your PostHog data. Point Claude Code, Cursor, Zed, or Windsurf at the{' '}
                                <Link to="/docs/model-context-protocol" state={{ newWindow: true }}>
                                    PostHog MCP server
                                </Link>{' '}
                                and ask questions about your product without opening a single dashboard.
                            </p>

                            <h3>Install in 30 seconds</h3>

                            <SingleCodeBlock language="bash" showAskAI={false}>
                                npx @posthog/wizard mcp add
                            </SingleCodeBlock>

                            <h3>Try prompts like</h3>

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
                                    <em>"Which features do my power users engage with most?"</em>
                                </li>
                                <li>
                                    <em>
                                        "Show me weekly retention for users who completed onboarding vs. those who
                                        didn't."
                                    </em>
                                </li>
                                <li>
                                    <em>
                                        "Create a trend showing daily active users broken down by plan, then save it as
                                        a dashboard."
                                    </em>
                                </li>
                            </ul>

                            <h3>Or use PostHog AI inside the app</h3>

                            <p>
                                Can't find the right insight? Just ask.{' '}
                                <Link to="/docs/posthog-ai" state={{ newWindow: true }}>
                                    PostHog AI
                                </Link>{' '}
                                knows your data and can build dashboards, create retention curves, write SQL, and
                                surface patterns you'd otherwise miss.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/SCR_20260428_byls_6beef62442.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/SCR_20260428_byoo_2fe6e6ec6f.png"
                                alt="PostHog AI example prompts"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <div className="flex flex-wrap gap-2 mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/product-analytics/build-insights-mcp"
                                    state={{ newWindow: true }}
                                >
                                    Explore AI features
                                </CallToAction>
                                <CallToAction
                                    type="secondary"
                                    size="md"
                                    to="/docs/model-context-protocol"
                                    state={{ newWindow: true }}
                                >
                                    Install MCP
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem title="See it in action" subtitle="5-minute product demo" icon="IconVideoCamera">
                            <p>
                                Watch a full walkthrough of PostHog's product analytics: from capturing your first event
                                to building funnels, digging into retention, and handing off context to your AI agent.
                            </p>

                            <div className="rounded overflow-hidden border border-primary not-prose">
                                <WistiaEmbed mediaId="0be67lqiau" />
                            </div>

                            <ul>
                                <li>Autocapture and custom event setup</li>
                                <li>Trends, funnels, retention, and user paths</li>
                                <li>Group analytics for B2B companies</li>
                                <li>PostHog AI and MCP for natural language queries</li>
                            </ul>

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="https://us.posthog.com/signup">
                                    Try it yourself — free
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Explore the analytics suite"
                            subtitle="Funnels, retention, paths, SQL, and more"
                            icon="IconGraph"
                        >
                            <p>
                                PostHog ships the full analytics toolkit: funnels, retention, user paths, lifecycle
                                charts, correlation analysis, stickiness, and HogQL. Pick the right lens for any
                                question.
                            </p>

                            <div className="h-[600px] not-prose rounded overflow-hidden border border-primary my-4">
                                <FeaturesSlide features={productAnalytics.features} />
                            </div>

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/product-analytics/insights"
                                    state={{ newWindow: true }}
                                >
                                    Explore insights docs
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Built for how engineering teams work"
                            subtitle="Real-world use cases"
                            icon="IconRocket"
                        >
                            <p>
                                PostHog is designed to be queried, not just watched. Here's how engineering teams
                                actually use it:
                            </p>

                            <h3>
                                <IconRewindPlay className="text-yellow w-7 -mt-1 inline-block" /> Funnels → Session
                                Replay
                            </h3>
                            <p>
                                Click any funnel drop-off to land directly in a playlist of session recordings for those
                                exact users. See what they saw, what they clicked, and what confused them. No CSV
                                export, no matching IDs.
                            </p>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/session_replay_funnel_1080_ff50e3d9c8.mp4"
                                videoDark={undefined}
                                classes="rounded border border-primary"
                                autoPlay={true}
                                loop={true}
                            />

                            <h3>
                                <IconToggle className="text-seagreen w-7 -mt-1 inline-block" /> Feature flag + event
                                targeting
                            </h3>
                            <p>
                                Roll out features with{' '}
                                <Link to="/docs/feature-flags" state={{ newWindow: true }}>
                                    Feature Flags
                                </Link>{' '}
                                and use product events as release conditions. Target your 10% power users, measure
                                activation, and revert without a full deploy.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250728_sirw_4622f2f7d0.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250728_sivj_9e5d71bb69.png"
                                alt="Feature flag targeting based on product events"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <h3>
                                <IconDatabase className="text-purple w-7 -mt-1 inline-block" /> B2B group analytics
                            </h3>
                            <p>
                                Track metrics at the company or team level, not just individual users. Measure
                                activation, retention, and churn by account — essential for B2B SaaS.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/dashboard_light_61b3bab3b6.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/dashboard_dark_5f2002f750.png"
                                alt="Product analytics dashboard"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="https://us.posthog.com/signup">
                                    Get started free
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem title="Use for free" subtitle="Free 1M events/mo" icon="IconPiggyBank">
                            <p>
                                PostHog's Product Analytics is built to be cost-effective by default, with a generous
                                free tier and transparent usage-based pricing. Since we don't charge per seat, more than
                                90% of companies use PostHog for free.
                            </p>

                            <h2>TL;DR 💸</h2>

                            <ul>
                                <li>No credit card required to start</li>
                                <li>First 1 million events per month are free</li>
                                <li>Above 1M we have usage-based pricing at $0.000015/event with discounts</li>
                                <li>
                                    <strong>PostHog MCP is included</strong> (no enterprise plan required)
                                </li>
                                <li>Set billing limits to avoid surprise charges</li>
                                <li>
                                    See our{' '}
                                    <Link to="/docs/product-analytics/pricing" state={{ newWindow: true }}>
                                        pricing page
                                    </Link>{' '}
                                    for more up-to-date details
                                </li>
                            </ul>

                            <hr className="my-6" />

                            <p>That's it! You're ready to start integrating.</p>

                            <div className="flex flex-wrap gap-2 mt-4">
                                <CallToAction type="primary" size="md" to="https://us.posthog.com/signup">
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
