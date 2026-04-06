import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { QuestLog, QuestLogItem } from 'components/Docs/QuestLog'
import { CallToAction } from 'components/CallToAction'
import { ProductScreenshot } from 'components/ProductScreenshot'
import { ProductVideo } from 'components/ProductVideo'
import List from 'components/List'
import Link from 'components/Link'
import { IconGraph, IconRewindPlay, IconToggle } from '@posthog/icons'

const topPlatforms = [
    {
        label: 'Next.js',
        url: '/docs/error-tracking/installation/nextjs',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/nextjs.svg',
    },
    {
        label: 'React',
        url: '/docs/error-tracking/installation/react',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/react.svg',
    },
    {
        label: 'Web',
        url: '/docs/error-tracking/installation/web',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/js.svg',
    },
    {
        label: 'React Native',
        url: '/docs/error-tracking/installation/react-native',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/react.svg',
    },
    {
        label: 'Node.js',
        url: '/docs/error-tracking/installation/node',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/nodejs.svg',
    },
    {
        label: 'Python',
        url: '/docs/error-tracking/installation/python',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/python.svg',
    },
    {
        label: 'Manual/API',
        url: '/docs/error-tracking/installation/manual',
        icon: 'IconCode',
    },
    {
        label: 'Flutter',
        url: '/docs/error-tracking/installation/flutter',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/flutter.svg',
    },
]

const morePlatforms = [
    {
        label: 'Nuxt',
        url: '/docs/error-tracking/installation/nuxt',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/nuxt.svg',
    },
    {
        label: 'Angular',
        url: '/docs/error-tracking/installation/angular',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/angular.svg',
    },
    {
        label: 'Android',
        url: '/docs/error-tracking/installation/android',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/android.svg',
    },
    {
        label: 'SvelteKit',
        url: '/docs/error-tracking/installation/svelte',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/svelte.svg',
    },
    {
        label: 'Hono',
        url: '/docs/error-tracking/installation/hono',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hono_9d80c0611c.svg',
    },
    {
        label: 'Ruby',
        url: '/docs/error-tracking/installation/ruby',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/ruby.svg',
    },
    {
        label: 'iOS',
        url: '/docs/error-tracking/installation/ios',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/ios.svg',
    },
    {
        label: 'Go',
        url: '/docs/error-tracking/installation/go',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/go.svg',
    },
    {
        label: 'Ruby on Rails',
        url: '/docs/error-tracking/installation/ruby-on-rails',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/ruby.svg',
    },
    {
        label: 'NestJS',
        url: '/docs/error-tracking/installation/nestjs',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/nodejs.svg',
    },
]

export default function ErrorTrackingLandingPage(): JSX.Element {
    const [showMore, setShowMore] = useState(false)
    const [isIdle, setIsIdle] = useState(false)

    useEffect(() => {
        let idleTimer: ReturnType<typeof setTimeout>

        const resetIdle = () => {
            setIsIdle(false)
            clearTimeout(idleTimer)
            idleTimer = setTimeout(() => setIsIdle(true), 2000)
        }

        resetIdle()
        window.addEventListener('mousemove', resetIdle)
        window.addEventListener('keydown', resetIdle)
        window.addEventListener('scroll', resetIdle)

        return () => {
            clearTimeout(idleTimer)
            window.removeEventListener('mousemove', resetIdle)
            window.removeEventListener('keydown', resetIdle)
            window.removeEventListener('scroll', resetIdle)
        }
    }, [])

    return (
        <Layout>
            {/* Glow animation for "Use for free" sidebar item */}
            <style>{`
                @keyframes questGlow {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(255, 165, 0, 0); }
                    50% { box-shadow: 0 0 12px 2px rgba(255, 165, 0, 0.4); }
                }
                .quest-desktop-nav .space-y-4 > a:last-of-type > div:not(.border-orange) {
                    ${isIdle ? 'animation: questGlow 2s ease-in-out infinite;' : ''}
                }
            `}</style>
            <SEO
                title="Error tracking that helps you ship faster - PostHog"
                description="Catch errors automatically, get readable stack traces, and debug with AI. 100k exceptions/mo free."
            />

            <div className="max-w-5xl mx-auto px-4 py-8">
                <h1 className="text-4xl md:text-5xl mb-2 text-center">Error tracking that helps you ship faster</h1>

                <div className="mt-8">
                    <QuestLog
                        firstSpeechBubble="Errors happen. Let's catch them."
                        lastSpeechBubble="You're set. Go break things (safely)."
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

                            <List className="grid gap-4 grid-cols-2 @md:grid-cols-2 not-prose" items={topPlatforms} />

                            {showMore && (
                                <div className="mt-4">
                                    <List
                                        className="grid gap-4 grid-cols-2 @md:grid-cols-2 not-prose"
                                        items={morePlatforms}
                                    />
                                </div>
                            )}

                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="mt-3 text-red dark:text-yellow font-semibold text-sm cursor-pointer bg-transparent border-none p-0 hover:underline"
                            >
                                {showMore ? 'Show less' : 'See more platforms'}
                            </button>

                            <div className="mt-4">
                                <CallToAction type="primary" to="https://us.posthog.com/signup" externalNoIcon>
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
                            />

                            <div className="mt-4">
                                <CallToAction type="primary" to="/docs/error-tracking/upload-source-maps">
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
                            />

                            <ul>
                                <li>Manage, resolve, and auto-assign issues to team members</li>
                                <li>Customize issue grouping with rules</li>
                                <li>Set up real-time alerts based on event triggers, filters, and trends</li>
                                <li>Integrate with Slack, Discord, Teams, or an HTTP webhook</li>
                            </ul>

                            <div className="mt-4">
                                <CallToAction type="primary" to="/docs/error-tracking/managing-issues">
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
                                <Link to="/docs/error-tracking/fix-with-ai-prompts">premade AI prompts</Link> that
                                include full stack traces and curated instructions so your AI actually knows what it's
                                looking at.
                            </p>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/mcp_error_tracking_debugging30_6e25828d88.mp4"
                                alt="Use PostHog MCP to debug errors"
                                classes="rounded"
                                autoPlay={false}
                            />

                            <div className="mt-4">
                                <CallToAction type="primary" to="/docs/error-tracking/debugging-with-mcp">
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
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/error_tracking_session_replay_investigate_afdaef02a5.mp4"
                                alt="Use session replay to investigate errors"
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
                            />

                            <div className="mt-4">
                                <CallToAction type="primary" to="https://us.posthog.com/signup" externalNoIcon>
                                    Install error tracking
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem title="Use for free" subtitle="Free 100k exceptions/mo" icon="IconPiggyBank">
                            <div className="prose dark:prose-invert max-w-none">
                                <p>
                                    PostHog's Error Tracking is built to be cost-effective by default, with a generous
                                    free tier and transparent usage-based pricing. Since we don't charge per seat, more
                                    than 90% of companies use PostHog for free.
                                </p>

                                <h2>TL;DR 💸</h2>

                                <ul>
                                    <li>No credit card required to start</li>
                                    <li>First 100K exceptions per month are free</li>
                                    <li>
                                        Above 100k we have usage-based pricing at $0.000370/exception with discounts
                                    </li>
                                    <li>Set billing limits to avoid surprise charges</li>
                                    <li>
                                        See our <Link to="/pricing">pricing page</Link> for more up-to-date details
                                    </li>
                                </ul>

                                <hr />

                                <p>That's it! You're ready to start integrating.</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                <CallToAction type="primary" to="https://us.posthog.com/signup" externalNoIcon>
                                    Get started free
                                </CallToAction>
                                <CallToAction type="outline" to="/talk-to-a-human">
                                    Talk to a human
                                </CallToAction>
                            </div>
                        </QuestLogItem>
                    </QuestLog>
                </div>
            </div>
        </Layout>
    )
}
