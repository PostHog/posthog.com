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
import HasuraLogo from 'components/CustomerLogos/HasuraLogo'
import ElevenLabsLogo from 'components/CustomerLogos/ElevenLabsLogo'
import NetdataLogo from 'components/CustomerLogos/NetdataLogo'
import PryLogo from 'components/CustomerLogos/PryLogo'

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
                description="Automatic session capture, AI-powered debugging, and full DevTools context in one place. Free for 5,000 web + 2,500 mobile recordings/month."
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
                <div className="grid grid-cols-1 @lg:grid-cols-[1.2fr_1fr] gap-8 items-center mb-10 max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-3xl md:text-5xl !mb-4">
                            Session replay that shows you exactly what happened
                        </h1>
                        <p className="text-lg md:text-xl mb-6 opacity-75">
                            Automatic session capture, DevTools in every replay, and MCP for Claude Code, Cursor, or
                            your editor.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <CallToAction type="primary" size="md" to="https://us.posthog.com/signup">
                                Get started free
                            </CallToAction>
                            <CallToAction type="secondary" size="md" to="/talk-to-a-human" state={{ newWindow: true }}>
                                Talk to a human
                            </CallToAction>
                        </div>
                        <p className="text-sm opacity-75 !mb-0">
                            PostHog's Session Replay is built to be cost-effective by default, with a generous free tier
                            and transparent usage-based pricing. Since we don't charge per seat, more than 90% of
                            companies use PostHog for free — and with PostHog MCP, your AI coding agent can pull session
                            data straight into Claude Code or Cursor.
                        </p>
                    </div>
                    <div>
                        <img
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/presentation_55bc6acecd.png"
                            alt="Hedgehog presenting a heatmap"
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="mb-20 max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center gap-x-12 gap-y-6 text-primary dark:text-primary-dark">
                        <HasuraLogo className="fill-current object-contain max-w-full h-10" />
                        <ElevenLabsLogo className="fill-current object-contain max-w-full h-8" />
                        <NetdataLogo className="fill-current object-contain max-w-full h-8" />
                        <PryLogo className="fill-current object-contain max-w-full h-8" />
                    </div>
                    <p className="text-xs opacity-60 mt-3 !mb-0">
                        These are some of our paying customers.
                        <br />
                        (Yes they actually use us, no it's not just some random engineer who tried us out 2+ years ago.)
                    </p>
                </div>

                <div className={isIdle ? 'quest-idle' : ''}>
                    <QuestLog firstSpeechBubble="Let's watch some sessions!" lastSpeechBubble="Time to start shipping!">
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
                                <CallToAction type="primary" size="md" to="https://us.posthog.com/signup">
                                    Install PostHog SDK
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
                            title="MCP: Debug without leaving your editor"
                            subtitle="MCP, AI summaries, and natural language search"
                            icon="IconSparkles"
                        >
                            <p>Two ways to bring AI to your session data, pick the one that fits how you work.</p>

                            <h3>Use Claude Code, Cursor, or any MCP-compatible agent</h3>
                            <p>
                                Connect the PostHog{' '}
                                <Link to="/docs/model-context-protocol" state={{ newWindow: true }}>
                                    MCP server
                                </Link>{' '}
                                and your AI coding agent can query session replay data without you opening a browser
                                tab. Ask it to find sessions where a specific error occurred, have it pull the event
                                timeline, cross-reference with your codebase, and generate a fix, all from your terminal
                                or editor. Bug report to PR, no context switching.
                            </p>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/mcp_session_replay_1080_de1089e7aa.mp4"
                                videoDark={undefined}
                                classes="rounded border border-primary"
                                autoPlay={true}
                            />

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

                            <p>Try prompts like:</p>
                            <ul>
                                <li>
                                    <em>"Find sessions where users rage clicked on the pricing page"</em>
                                </li>
                                <li>
                                    <em>"What are users struggling with on the settings page?"</em>
                                </li>
                                <li>
                                    <em>"Summarize sessions from users who signed up today but didn't activate"</em>
                                </li>
                                <li>
                                    <em>
                                        "What behavioral differences do you see between variant A and variant B users?"
                                    </em>
                                </li>
                            </ul>

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/session-replay/session-summaries-ai"
                                    state={{ newWindow: true }}
                                >
                                    Explore AI features
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
                                Click any data point in your funnels, retention charts, or user paths and land directly
                                in a playlist of session replays for the users behind that number. No ID matching
                                between tools, no export, same data layer powering both.
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
                                Filter recordings by which feature flag variant a user had. See exactly how users
                                interacted with version A vs. version B. Roll out a fix to affected users without a full
                                deploy.
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
                                When an exception fires, jump to the session replay to see exactly what the user was
                                doing before and after the error. No reproduction needed.
                            </p>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/Error_tracking_sessions_0b0a535be8.mp4"
                                videoDark={undefined}
                                autoPlay={true}
                                loop={true}
                            />

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="https://us.posthog.com/signup">
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
                                <li>Set billing limits to avoid surprise charges</li>
                                <li>
                                    See our{' '}
                                    <Link to="/docs/session-replay/pricing" state={{ newWindow: true }}>
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
