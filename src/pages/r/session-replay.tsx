import React, { useState, useEffect, useMemo } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { QuestLog, QuestLogItem } from 'components/Docs/QuestLog'
import { CallToAction } from 'components/CallToAction'
import { ProductScreenshot } from 'components/ProductScreenshot'
import { ProductVideo } from 'components/ProductVideo'
import List from 'components/List'
import { IconGraph, IconToggle, IconWarning } from '@posthog/icons'
import usePlatformList from 'hooks/docs/usePlatformList'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import WizardCTA from 'components/WizardCTA'
import PlatformInstall from 'components/PlatformInstall'
import ElevenLabsLogo from 'components/CustomerLogos/ElevenLabsLogo'
import JuiceboxLogo from 'components/CustomerLogos/JuiceboxLogo'
import ExaLogo from 'components/CustomerLogos/ExaLogo'

const TOP_COUNT = 8
const PLATFORM_ORDER = [
    '/docs/session-replay/installation/react-native',
    '/docs/session-replay/installation/ios',
    '/docs/session-replay/installation/android',
    '/docs/session-replay/installation/web',
    '/docs/session-replay/installation/react',
    '/docs/session-replay/installation/nextjs',
    '/docs/session-replay/installation/flutter',
    '/docs/session-replay/installation/vue',
    '/docs/session-replay/installation/html-snippet',
    '/docs/session-replay/installation/angular',
    '/docs/session-replay/installation/svelte',
    '/docs/session-replay/installation/nuxt',
    '/docs/session-replay/installation/astro',
    '/docs/session-replay/installation/remix',
    '/docs/session-replay/installation/webflow',
    '/docs/session-replay/installation/framer',
    '/docs/session-replay/installation/bubble',
]

export default function SessionReplayLanding(): JSX.Element {
    const [showMore, setShowMore] = useState(false)
    const [isIdle, setIsIdle] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    const allPlatforms = usePlatformList('docs/session-replay/installation', 'session replay installation')
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
                title="Session replay that shows you exactly what happened"
                description="With PostHog MCP, your AI agent can query session replays, summarize user behavior, and turn bug reports into PRs, all from Claude Code, Cursor, Zed, or Windsurf. Free for 5,000 web + 2,500 mobile recordings/month."
                noindex
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                hideTitle
                title="Session replay that shows you exactly what happened"
                contentMaxWidthClass="max-w-5xl"
                showQuestions={false}
            >
                <div className="grid grid-cols-1 @lg:grid-cols-[1.2fr_1fr] gap-10 items-center mb-6 max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-3xl md:text-5xl !mb-4">
                            Session replay that shows you exactly what happened
                        </h1>
                        <p className="text-lg md:text-xl mb-6 text-secondary">
                            Automatic session capture, DevTools in every replay, and MCP for Claude Code, Cursor, or
                            your editor.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                Get started free
                            </CallToAction>
                            <CallToAction
                                type="secondary"
                                size="md"
                                onClick={() => {
                                    const el = document.getElementById(
                                        'quest-item-mcp-debug-without-leaving-your-editor'
                                    )
                                    if (el) {
                                        window.history.pushState(
                                            null,
                                            '',
                                            '#quest-item-mcp-debug-without-leaving-your-editor'
                                        )
                                        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    }
                                }}
                            >
                                Install MCP
                            </CallToAction>
                        </div>
                        <p className="text-sm !mb-0 text-secondary">
                            With{' '}
                            <Link to="/docs/model-context-protocol" state={{ newWindow: true }}>
                                PostHog MCP
                            </Link>
                            , your AI agent can query session replays, summarize user behavior, and turn bug reports
                            into PRs, all from Claude Code, Cursor, Zed, or Windsurf. Free for 5,000 web + 2,500 mobile
                            recordings/month, no per-seat pricing, and we won't even ask for your credit card.
                        </p>
                    </div>
                    <div>
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/presentation_55bc6acecd.png"
                            alt="Hedgehog presenting a heatmap"
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="mb-12 max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center gap-x-12 gap-y-6 text-primary dark:text-primary-dark">
                        <ElevenLabsLogo className="fill-current object-contain max-w-full h-8" />
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/kilocode_logo_c58c88f029.webp"
                            alt="Kilo Code"
                            imgClassName="object-contain max-w-full h-8 w-auto"
                        />
                        <JuiceboxLogo className="fill-current object-contain max-w-full h-8" />
                        <ExaLogo className="fill-current object-contain max-w-full h-8" />
                    </div>
                    <p className="text-xs mt-3 !mb-0">
                        <span className="font-semibold">These are some of our paying customers.</span>
                        <br />
                        <span className="text-muted">
                            (Yes they actually use us, no it's not just some random engineer who tried us out 2+ years
                            ago.)
                        </span>
                    </p>
                </div>

                <div className={isIdle ? 'quest-idle' : ''}>
                    <QuestLog firstSpeechBubble="Let's watch some sessions!" lastSpeechBubble="Time to start shipping!">
                        <QuestLogItem
                            title="Install with the PostHog Wizard"
                            subtitle="Automatic setup with one command"
                            icon="IconMagicWand"
                        >
                            <p>
                                <strong>PostHog Wizard</strong> analyzes your codebase and automatically sets up session
                                replay, autocapture, and dashboards tailored to your product. One command does it all:
                            </p>

                            <WizardCTA />

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                    Get started free
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem title="Catch exactly what users do" subtitle="Install the SDK" icon="IconCode2">
                            <p>
                                Install PostHog and enable session replay in a couple lines of config. PostHog captures
                                every click, scroll, input, and page change automatically (no manual event tagging).
                                Recording starts the moment a user lands on your page.
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
                                <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                    Install PostHog SDK
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="MCP: Debug without leaving your editor"
                            subtitle="Query replays from Claude Code, Cursor, Zed, or Windsurf"
                            icon="IconSparkles"
                        >
                            <p>
                                <strong>MCP (Model Context Protocol)</strong> lets your AI coding agent query PostHog
                                like it's part of your codebase. Point Claude Code, Cursor, Zed, Windsurf, or VS Code at
                                the{' '}
                                <Link to="/docs/model-context-protocol" state={{ newWindow: true }}>
                                    PostHog MCP server
                                </Link>{' '}
                                and ask it to find sessions, trace errors, and generate fixes without leaving your
                                editor. Bug report to PR, no context switching.
                            </p>

                            <h3>Install in 30 seconds</h3>

                            <PlatformInstall variant="inline" command="mcp add" slim />

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/mcp_session_replay_1080_de1089e7aa.mp4"
                                videoDark={undefined}
                                classes="rounded border border-primary"
                                autoPlay={true}
                            />

                            <h3>Try prompts like</h3>
                            <ul>
                                <li>
                                    <em>
                                        "A user reported checkout is broken at 2pm. Find the session and tell me what
                                        component errored."
                                    </em>
                                </li>
                                <li>
                                    <em>"Generate a regression test from the failing session in replay 12345."</em>
                                </li>
                                <li>
                                    <em>
                                        "Find every session where the CheckoutButton component threw an error in the
                                        last 24h and summarize the pattern."
                                    </em>
                                </li>
                                <li>
                                    <em>"Show me replays from enterprise users who rage clicked in the last day."</em>
                                </li>
                                <li>
                                    <em>
                                        "Find the most recent session for user with email user@example.com and summarize
                                        what they tried to do."
                                    </em>
                                </li>
                            </ul>

                            <h3>Or use AI inside PostHog</h3>
                            <p>
                                Can't watch every recording? PostHog AI can. Use natural language to search sessions, or
                                ask AI to summarize a batch of recordings and surface the patterns you'd otherwise miss.
                            </p>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/session_summaries_664cfbb85d.mp4"
                                videoDark={undefined}
                                classes="rounded border border-primary"
                                autoPlay={true}
                            />

                            <div className="flex flex-wrap gap-2 mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    onClick={() => {
                                        navigator.clipboard.writeText('npx @posthog/wizard mcp add')
                                        setIsCopied(true)
                                        setTimeout(() => setIsCopied(false), 2500)
                                    }}
                                >
                                    {isCopied ? 'npx command copied! 🚀' : 'Install the MCP'}
                                </CallToAction>
                                <CallToAction
                                    type="secondary"
                                    size="md"
                                    to="/docs/session-replay/session-summaries-ai"
                                    state={{ newWindow: true }}
                                >
                                    Explore AI features
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Get DevTools context, inside the replay"
                            subtitle="Watch your first recording"
                            icon="IconBrowser"
                        >
                            <p>
                                A session replay in PostHog isn't just a video. Open the activity panel during any
                                recording and you get the same context you'd have in DevTools, synced to the exact
                                moment in the timeline.
                            </p>
                            <p>
                                Console logs, network requests, rage clicks, dead clicks, performance data, all of it.
                                When a user says "it just broke," you no longer have to guess.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/annotated_replay_inspector_ec4ceb5761.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/annotated_replay_inspector_dark_c040e66ee5.png"
                                alt="Session replay activity panel"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <ul>
                                <li>Jump to any event in the timeline to skip straight to what matters</li>
                                <li>See console errors and warnings as they fired, in exact context</li>
                                <li>Inspect the network waterfall to find slow or failed API calls</li>
                                <li>Spot rage clicks and dead clicks automatically (no tagging needed)</li>
                            </ul>

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/session-replay/how-to-watch-recordings"
                                    state={{ newWindow: true }}
                                >
                                    Watching recordings docs
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Stop watching random recordings"
                            subtitle="Filter and search"
                            icon="IconVideoCamera"
                        >
                            <p>
                                The sessions you need are in there. Find them by filtering on rage clicks, JavaScript
                                errors, specific events, user properties, or feature flag variants. Save those filters
                                as collections so your whole team can pull up the right recordings without rebuilding
                                the query from scratch.
                            </p>
                            <p>
                                Or describe what you want (like{' '}
                                <em>"users who rage clicked after seeing variant B yesterday"</em>) and{' '}
                                <Link to="/docs/session-replay/search-replays-mcp" state={{ newWindow: true }}>
                                    PostHog MCP
                                </Link>{' '}
                                returns the matching collection in your editor.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_800,c_limit,q_auto,f_auto/light_playlist_annotated_d7f45dda32.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/h_800,c_limit,q_auto,f_auto/dark_playlist_annotated_cf1718f7c6.png"
                                alt="Session replay collection"
                                classes="rounded @md:max-w-[60%] !mx-auto"
                                padding={false}
                                zoom={undefined}
                            />

                            <ul>
                                <li>Filter by rage clicks, dead clicks, errors, custom events, or user properties</li>
                                <li>
                                    Filter by feature flag variant to see how users experienced version A vs. version B
                                </li>
                                <li>Save filters as named collections anyone on your team can access</li>
                                <li>
                                    Built-in "Frustration signals" collection surfaces rage clicks and errors
                                    automatically
                                </li>
                            </ul>

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/session-replay/how-to-watch-recordings#how-to-create-saved-filters"
                                    state={{ newWindow: true }}
                                >
                                    Explore filters and collections
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Go from insight to fix without switching tabs"
                            subtitle="Integrate with your stack"
                            icon="IconLogomark"
                        >
                            <h3>
                                <IconGraph className="text-blue w-7 -mt-1 inline-block" /> Product analytics
                            </h3>
                            <p>
                                Using Product Analytics and PostHog MCP, you can{' '}
                                <Link to="/docs/product-analytics/build-insights-mcp" state={{ newWindow: true }}>
                                    build funnels, retention charts, and user paths
                                </Link>{' '}
                                from your editor. Then drop straight into a playlist of session replays for the users
                                behind any data point.
                            </p>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/session_replay_funnel_1080_ff50e3d9c8.mp4"
                                videoDark={undefined}
                                classes="rounded border border-primary"
                                autoPlay={true}
                                loop={true}
                            />

                            <h3>
                                <IconToggle className="text-seagreen w-7 -mt-1 inline-block" /> Feature flags
                            </h3>
                            <p>
                                With Feature Flags, use the MCP to{' '}
                                <Link to="/docs/feature-flags/create-flags-mcp" state={{ newWindow: true }}>
                                    flip flags, target rollouts, and filter replays by variant
                                </Link>{' '}
                                from Claude Code or Cursor. Roll out fixes to affected users without a full deploy.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/sessionre_play_ff_light_b1a61f74a7.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/session_replay_ff_dark_b72ccea7ba.png"
                                alt="Session replay filtered by feature flag"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <h3>
                                <IconWarning className="text-orange w-7 -mt-1 inline-block" /> Error tracking
                            </h3>
                            <p>
                                Error Tracking + PostHog MCP means your agent can{' '}
                                <Link to="/docs/error-tracking/debug-errors-mcp" state={{ newWindow: true }}>
                                    pull the stack trace and session replay together
                                </Link>
                                , then write the fix. No reproduction needed, no tab switching.
                            </p>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/Error_tracking_sessions_0b0a535be8.mp4"
                                videoDark={undefined}
                                autoPlay={true}
                                loop={true}
                            />

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                    Install session replay
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Use for free"
                            subtitle="5,000 web + 2,500 mobile recordings/month"
                            icon="IconPiggyBank"
                        >
                            <p>
                                PostHog's Session Replay is built to be cost-effective by default, with a generous free
                                tier and transparent usage-based pricing. Since we don't charge per seat, more than 90%
                                of companies use PostHog for free.
                            </p>

                            <h2>TL;DR 💸</h2>

                            <ul>
                                <li>No credit card required to start</li>
                                <li>First 5,000 web recordings and 2,500 mobile recordings per month are free</li>
                                <li>
                                    Above that we have usage-based pricing starting at $0.005/recording with discounts
                                </li>
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
