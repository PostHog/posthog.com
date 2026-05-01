import React, { useState, useEffect, useMemo } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { QuestLog, QuestLogItem } from 'components/Docs/QuestLog'
import { CallToAction } from 'components/CallToAction'
import { ProductScreenshot } from 'components/ProductScreenshot'
import { ProductVideo } from 'components/ProductVideo'
import List from 'components/List'
import { IconGraph, IconRewindPlay, IconToggle } from '@posthog/icons'
import usePlatformList from 'hooks/docs/usePlatformList'
import Link from 'components/Link'

const TOP_COUNT = 8
const PLATFORM_ORDER = [
    '/docs/error-tracking/installation/nextjs',
    '/docs/error-tracking/installation/react',
    '/docs/error-tracking/installation/web',
    '/docs/error-tracking/installation/react-native',
    '/docs/error-tracking/installation/node',
    '/docs/error-tracking/installation/python',
    '/docs/error-tracking/installation/manual',
    '/docs/error-tracking/installation/flutter',
    '/docs/error-tracking/installation/nuxt',
    '/docs/error-tracking/installation/angular',
    '/docs/error-tracking/installation/android',
    '/docs/error-tracking/installation/svelte',
    '/docs/error-tracking/installation/hono',
    '/docs/error-tracking/installation/ruby',
    '/docs/error-tracking/installation/ios',
    '/docs/error-tracking/installation/go',
    '/docs/error-tracking/installation/ruby-on-rails',
    '/docs/error-tracking/installation/nestjs',
]

export default function ErrorTrackingLanding(): JSX.Element {
    const [showMore, setShowMore] = useState(false)
    const [isIdle, setIsIdle] = useState(false)

    const allPlatforms = usePlatformList('docs/error-tracking/installation', 'error tracking installation')
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
                title="Error tracking that helps you ship faster"
                description="Catch errors automatically, get accurate stack traces, debug with AI, and see the full picture with session replay and product analytics. Free up to 100k exceptions/mo."
                noindex
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                hideTitle
                title="Error tracking that helps you ship faster"
                contentMaxWidthClass="max-w-5xl"
                showQuestions={false}
            >
                <h1 className="text-3xl md:text-4xl !mb-6 max-w-7xl mx-auto">
                    Error tracking that helps you ship faster
                </h1>

                <div className={isIdle ? 'quest-idle' : ''}>
                    <QuestLog
                        firstSpeechBubble="Let's catch some exceptions!"
                        lastSpeechBubble="Time to start shipping!"
                    >
                        <QuestLogItem
                            title="Catch errors automatically"
                            subtitle="Capture your first exception"
                            icon="IconCode2"
                        >
                            <p>
                                Install the SDK and flip on exception autocapture. PostHog catches{' '}
                                <code>$exception</code> events the moment they're thrown, client-side or server-side.
                                Want more control? Call <code>posthog.captureException()</code> to send specific errors
                                with custom properties.
                            </p>

                            <h3>Platforms</h3>

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
                                    Install PostHog SDK
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Stack traces that point to your code"
                            subtitle="Get accurate stack traces"
                            icon="IconCode"
                        >
                            <p>
                                PostHog maps exceptions back to your original source code with line numbers and file
                                names. Just upload your source maps.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_01_30_at_09_48_09_63dd3c5241.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_01_30_at_09_48_39_1030eea240.png"
                                alt="Stack traces example"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/error-tracking/upload-source-maps"
                                    state={{ newWindow: true }}
                                >
                                    Upload source maps
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Stay on top of what matters"
                            subtitle="Monitor and resolve issues"
                            icon="IconWarning"
                        >
                            <p>
                                Exceptions get grouped into issues automatically. Assign them, resolve them, or set up
                                alerts so Slack yells at you instead of your users.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250728_ryub_aa8398de10.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250728_rzmm_23fa3181c4.png"
                                alt="Error tracking overview"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <ul>
                                <li>Manage, resolve, and auto-assign issues to team members</li>
                                <li>Customize issue grouping with rules</li>
                                <li>Set up real-time alerts based on event triggers, filters, and trends</li>
                                <li>Integrate with Slack, Discord, Teams, or an HTTP webhook</li>
                            </ul>

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/error-tracking/issues-and-exceptions"
                                    state={{ newWindow: true }}
                                >
                                    Learn about issues
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Let AI do the detective work"
                            subtitle="Debug with AI"
                            icon="IconLlmPromptEvaluation"
                        >
                            <p>
                                Connect the PostHog MCP server and let AI agents investigate errors for you. Or copy our{' '}
                                <Link to="/docs/error-tracking/fix-with-ai-prompts" state={{ newWindow: true }}>
                                    premade AI prompts
                                </Link>{' '}
                                that include full stack traces and curated instructions so your AI actually knows what
                                it's looking at.
                            </p>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/mcp_error_tracking_debugging30_6e25828d88.mp4"
                                videoDark={undefined}
                                classes="rounded"
                                autoPlay={false}
                            />

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/error-tracking/debug-errors-mcp"
                                    state={{ newWindow: true }}
                                >
                                    Explore AI features
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="See the full picture"
                            subtitle="Integrate customer data"
                            icon="IconLogomark"
                        >
                            <h3>
                                <IconRewindPlay className="text-yellow w-7 -mt-1 inline-block" /> Session replay
                            </h3>
                            <p>See exactly what users did before and after the error.</p>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/Error_tracking_sessions_0b0a535be8.mp4"
                                videoDark={undefined}
                                autoPlay={true}
                                loop={true}
                            />

                            <h3>
                                <IconGraph className="text-blue w-7 -mt-1 inline-block" /> Product analytics
                            </h3>
                            <p>
                                Use <code>$exception</code> events to create trends, funnels, or retention insights.
                                Spot patterns, prioritize what's actually hurting users.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250728_sgre_98426bdbdb.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250728_sgvz_a9af4766fe.png"
                                alt="Product analytics dashboards"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <h3>
                                <IconToggle className="text-seagreen w-7 -mt-1 inline-block" /> Feature flags
                            </h3>
                            <p>Roll out fixes to affected users first, or revert changes without a full deploy.</p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250728_sirw_4622f2f7d0.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250728_sivj_9e5d71bb69.png"
                                alt="Feature flags targeting error cohorts"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="https://us.posthog.com/signup">
                                    Install error tracking
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem title="Use for free" subtitle="Free 100k exceptions/mo" icon="IconPiggyBank">
                            <p>
                                PostHog's Error Tracking is built to be cost-effective by default, with a generous free
                                tier and transparent usage-based pricing. Since we don't charge per seat, more than 90%
                                of companies use PostHog for free.
                            </p>

                            <h2>TL;DR 💸</h2>

                            <ul>
                                <li>No credit card required to start</li>
                                <li>First 100K exceptions per month are free</li>
                                <li>Above 100k we have usage-based pricing at $0.000370/exception with discounts</li>
                                <li>Set billing limits to avoid surprise charges</li>
                                <li>
                                    See our{' '}
                                    <Link to="/docs/error-tracking/pricing" state={{ newWindow: true }}>
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
