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
import WizardCTA from 'components/WizardCTA'
import usePlatformList from 'hooks/docs/usePlatformList'
import ElevenLabsLogo from 'components/CustomerLogos/ElevenLabsLogo'
import LovableLogo from 'components/CustomerLogos/LovableLogo'
import HomeDepotLogo from 'components/CustomerLogos/HomeDepotLogo'
import MintlifyLogo from 'components/CustomerLogos/MintlifyLogo'
import { IconRewindPlay, IconWarning, IconCode2, IconChevronDown } from '@posthog/icons'

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
]

export default function PostHogObservabilityLanding(): JSX.Element {
    const [showMore, setShowMore] = useState(false)
    const [isIdle, setIsIdle] = useState(false)
    const [openQuestion, setOpenQuestion] = useState<number | null>(null)

    const handleScrollToMCP = () => {
        document.getElementById('quest-item-let-your-ai-agent-debug-for-you')?.scrollIntoView({ behavior: 'smooth' })
    }

    const [installMCPCopied, setInstallMCPCopied] = useState(false)

    const handleCopyMCP = () => {
        navigator.clipboard.writeText('npx @posthog/wizard mcp add')
        setInstallMCPCopied(true)
        setTimeout(() => setInstallMCPCopied(false), 2000)
    }

    const allPlatforms = usePlatformList('docs/error-tracking/installation', 'observability installation')
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
                title="Observability built for product engineers"
                description="PostHog Observability bundles error tracking, session replay, and logs into one SDK and one tool — wired up to MCP so your AI agent can investigate issues end-to-end. Free tier covers 100k exceptions, 5k recordings, and 50GB of logs every month."
                noindex
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                hideTitle
                title="Observability built for product engineers"
                contentMaxWidthClass="max-w-5xl"
                showQuestions={false}
            >
                <div className="grid grid-cols-1 @lg:grid-cols-[1.2fr_1fr] gap-10 items-center mb-6 max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-3xl md:text-5xl !mb-4">Observability built for product engineers</h1>
                        <p className="text-lg md:text-xl mb-6 text-secondary">
                            Error tracking, session replay, and logs in one tool. One SDK to install all three. One MCP
                            server so Claude Code, Cursor, or Codex can debug end-to-end without you opening a
                            dashboard.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                Get started free
                            </CallToAction>
                            <CallToAction type="secondary" size="md" onClick={handleScrollToMCP}>
                                Install MCP
                            </CallToAction>
                        </div>
                        <p className="text-sm !mb-0 text-secondary">
                            One install gets you{' '}
                            <Link to="/docs/error-tracking" state={{ newWindow: true }}>
                                error tracking
                            </Link>
                            ,{' '}
                            <Link to="/docs/session-replay" state={{ newWindow: true }}>
                                session replay
                            </Link>
                            , and{' '}
                            <Link to="/docs/logs" state={{ newWindow: true }}>
                                logs
                            </Link>{' '}
                            — already connected to each other. Free for 100k exceptions, 5k web + 2.5k mobile
                            recordings, and 50 GB of logs every month. No credit card, no per-seat pricing.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/magnifying_glass_hog_c994f17b25.png"
                            alt="PostHog hedgehog with a magnifying glass"
                            className="w-full max-w-[450px] mx-auto"
                        />
                    </div>
                </div>

                <div className="mb-12 max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center gap-x-12 gap-y-6 text-primary dark:text-primary-dark">
                        <LovableLogo className="fill-current object-contain max-w-full h-6" />
                        <ElevenLabsLogo className="fill-current object-contain max-w-full h-8" />
                        <HomeDepotLogo className="object-contain max-w-full h-12" />
                        <MintlifyLogo className="fill-current object-contain max-w-full h-8" />
                    </div>
                    <p className="text-xs mt-3 !mb-0">
                        <span className="font-semibold">A few PostHog customers debugging with us in production.</span>
                        <br />
                        <span className="text-muted">
                            (Yes they actually use us, no it's not just some random engineer who tried us out 2+ years
                            ago.)
                        </span>
                    </p>
                </div>

                <div className={isIdle ? 'quest-idle' : ''}>
                    <QuestLog firstSpeechBubble="Let's get observable!" lastSpeechBubble="Time to start shipping!">
                        <QuestLogItem
                            title="Install once, get all three"
                            subtitle="Error tracking, replay, and logs from one SDK"
                            icon="IconMagicWand"
                        >
                            <p>
                                One PostHog SDK install enables <strong>error tracking</strong>,{' '}
                                <strong>session replay</strong>, and <strong>logs</strong>. The Wizard handles config in
                                a single command — no copy-pasting three different snippets, no juggling three different
                                services.
                            </p>

                            <WizardCTA />

                            <p>
                                The three signals share the same user identity, the same session, and the same project.
                                An exception, a replay of the user who hit it, and the surrounding log lines are already
                                linked the moment they arrive.
                            </p>

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

                            <p className="mt-4 text-sm text-secondary">
                                Need platform-specific instructions for just one signal? See the{' '}
                                <Link to="/docs/session-replay/installation" state={{ newWindow: true }}>
                                    session replay
                                </Link>{' '}
                                or{' '}
                                <Link to="/docs/logs/installation" state={{ newWindow: true }}>
                                    logs
                                </Link>{' '}
                                install guides.
                            </p>

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                    Get started free
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Let your AI agent debug for you"
                            subtitle="MCP across errors, replays, and logs"
                            icon="IconSparkles"
                        >
                            <p>
                                <strong>
                                    Already shipping with Claude Code, Cursor, Codex, or Windsurf? You can basically
                                    stop here.
                                </strong>{' '}
                                Wire up the PostHog MCP server and your agent can investigate an exception, pull the
                                replay of the user who hit it, and tail the surrounding logs — all from your editor.
                                Everything below this quest is for the curious.
                            </p>

                            <h3>Install in 30 seconds</h3>

                            <SingleCodeBlock language="bash" showAskAI={false}>
                                npx @posthog/wizard mcp add
                            </SingleCodeBlock>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/mcp_error_tracking_debugging30_6e25828d88.mp4"
                                videoDark={undefined}
                                classes="rounded border border-primary"
                                autoPlay={true}
                                loop={true}
                            />

                            <h3>Try prompts like</h3>

                            <ul>
                                <li>
                                    <em>
                                        "Why are checkout errors spiking? Show me a replay of a user who hit one and the
                                        surrounding logs."
                                    </em>
                                </li>
                                <li>
                                    <em>
                                        "A user reported the dashboard is broken at 2pm. Find the session, the
                                        exception, and the matching log lines."
                                    </em>
                                </li>
                                <li>
                                    <em>
                                        "Generate a regression test from the failing session in replay 12345 using the
                                        stack trace and request payload."
                                    </em>
                                </li>
                                <li>
                                    <em>"Show error logs from the API service in the last hour and group by route."</em>
                                </li>
                                <li>
                                    <em>
                                        "Find every session where CheckoutButton threw an error in the last 24h and
                                        summarize the pattern."
                                    </em>
                                </li>
                            </ul>

                            <h3>Or use PostHog AI inside the app</h3>

                            <p>
                                Don't want to leave the browser?{' '}
                                <Link to="/docs/posthog-ai" state={{ newWindow: true }}>
                                    PostHog AI
                                </Link>{' '}
                                lives in the app and can search replays, summarize log patterns, and triage error
                                tracking issues in plain language.
                            </p>

                            <div className="flex flex-wrap gap-2 mt-4">
                                <CallToAction type="primary" size="md" onClick={handleCopyMCP}>
                                    {installMCPCopied ? 'npx command copied! 🚀' : 'Install MCP'}
                                </CallToAction>
                                <CallToAction type="secondary" size="md" to="https://app.posthog.com/signup">
                                    Get started free
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Catch every exception"
                            subtitle="Autocapture errors with real stack traces"
                            icon="IconWarning"
                        >
                            <p>
                                Flip on exception autocapture and PostHog catches <code>$exception</code> events the
                                moment they're thrown, client- or server-side. Upload your source maps and stack traces
                                point straight to your original code — file, line, and function.
                            </p>

                            <p>
                                Exceptions group into issues automatically. Assign them, resolve them, or wire up Slack,
                                Discord, Teams, or a webhook so the right person hears about it instead of your users.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250728_ryub_aa8398de10.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/SCR_20250728_rzmm_23fa3181c4.png"
                                alt="Error tracking issue with stack trace"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <ul>
                                <li>Autocapture exceptions in the browser, mobile, and server-side</li>
                                <li>Accurate stack traces via source maps</li>
                                <li>Customize issue grouping with rules</li>
                                <li>Alerts on triggers, filters, and trends</li>
                                <li>
                                    <IconRewindPlay className="text-yellow w-5 -mt-1 inline-block" /> Jump from any
                                    exception straight into the replay of the user who hit it
                                </li>
                            </ul>

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/error-tracking"
                                    state={{ newWindow: true }}
                                >
                                    Explore error tracking
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Watch what actually happened"
                            subtitle="Session replay with DevTools context"
                            icon="IconRewindPlay"
                        >
                            <p>
                                A session replay in PostHog isn't just a video. Open the activity panel and you get
                                DevTools-level context synced to the timeline: console logs, network requests,
                                performance data, rage clicks, dead clicks. When a user says "it just broke," you no
                                longer have to guess.
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
                                <li>Jump to any event in the timeline to skip to what matters</li>
                                <li>See console errors and network failures in exact context</li>
                                <li>Automatic rage-click and dead-click detection (no tagging needed)</li>
                                <li>Save filters as collections your team can reuse</li>
                                <li>
                                    <IconWarning className="text-orange w-5 -mt-1 inline-block" /> Every replay is
                                    linked to the exceptions and{' '}
                                    <IconCode2 className="text-purple w-5 -mt-1 inline-block" /> log lines from the same
                                    session
                                </li>
                            </ul>

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/session-replay"
                                    state={{ newWindow: true }}
                                >
                                    Explore session replay
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Search and tail your logs"
                            subtitle="OTel-native logs with full-text search"
                            icon="IconCode2"
                        >
                            <p>
                                PostHog Logs works with any OpenTelemetry client — no PostHog-specific packages
                                required. Point your existing OTel SDK at PostHog, drop in your project token, and your
                                structured logs land alongside everything else.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/logs_light_dd81ff5093.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/logs_dark_d7135f1b22.png"
                                alt="PostHog Logs search interface"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <ul>
                                <li>Full-text search with multiple tokens and negative filters</li>
                                <li>Filter by time, service, resource attributes, or log level</li>
                                <li>Alert when error logs spike or specific patterns appear</li>
                                <li>
                                    <IconRewindPlay className="text-yellow w-5 -mt-1 inline-block" /> One click from a
                                    log line to the session replay of the user who triggered it
                                </li>
                                <li>
                                    <IconWarning className="text-orange w-5 -mt-1 inline-block" /> Logs with{' '}
                                    <code>$exception</code> events automatically become issues in error tracking
                                </li>
                            </ul>

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="/docs/logs" state={{ newWindow: true }}>
                                    Explore logs
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="One signal, three views"
                            subtitle="Why the bundle beats three vendors"
                            icon="IconLogomark"
                        >
                            <p>
                                Most observability stacks are three tools stitched together with hope. PostHog
                                Observability is one tool with three lenses on the same data. Every exception already
                                knows the session it came from. Every log line already knows the user. Every replay
                                already has the network calls and console errors attached.
                            </p>

                            <h3>
                                <IconWarning className="text-orange w-7 -mt-1 inline-block" /> Error → Replay
                            </h3>
                            <p>
                                Click any exception to land in the replay of the user who hit it. No matching IDs, no
                                CSV exports, no copy-pasting timestamps between dashboards.
                            </p>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/Error_tracking_sessions_0b0a535be8.mp4"
                                videoDark={undefined}
                                autoPlay={true}
                                loop={true}
                                classes="rounded border border-primary"
                            />

                            <h3>
                                <IconCode2 className="text-purple w-7 -mt-1 inline-block" /> Logs → Session
                            </h3>
                            <p>
                                Log lines link to the session and user who produced them. Jump from a noisy log burst
                                straight into the recording to see what the user was actually doing.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/SCR_20260427_tlab_c79adf4315.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/SCR_20260427_tpbx_e2154c4155.png"
                                alt="Logs linked to a session replay"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <h3>
                                <IconRewindPlay className="text-yellow w-7 -mt-1 inline-block" /> Replay → Logs & Errors
                            </h3>
                            <p>
                                The activity panel inside every replay already shows the console errors, network
                                failures, and structured log lines for that session. Same data, same place, no tab
                                switching.
                            </p>

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                    Try the bundle — free
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Questions engineers ask us"
                            subtitle="Real questions, honest answers"
                            icon="IconThoughtBubble"
                        >
                            <p>Things people actually ask before signing up.</p>

                            <div className="not-prose divide-y divide-border">
                                {[
                                    {
                                        question: 'Wait, I thought PostHog was just product analytics?',
                                        answer: 'We took a long, hard look at the current observability environment and saw what was missing: something that connects customer data with classic observability tools. A few late nights, piña coladas, and AI agent negotiations later, voilà!',
                                        url: '',
                                    },
                                    {
                                        question: 'How is this different from Sentry + Datadog + FullStory?',
                                        answer: "Three subscriptions, three UIs, three alert configs, three different ways to spell 'observability' in your Slack messages. PostHog is one SDK, one tool, one bill. And the data is already linked — no CSV exports, no matching session IDs across dashboards.",
                                        url: '',
                                    },
                                    {
                                        question:
                                            'Does OTel support mean I can use my existing logging setup and fire away?',
                                        answer: 'Yes. Point your existing OTel SDK at PostHog, drop in your project token, and your structured logs land alongside everything else. No PostHog-specific packages required.',
                                        url: '/docs/logs/installation',
                                    },
                                    {
                                        question:
                                            'Can I use just one of the three, or do I have to commit to all three?',
                                        answer: "Monogamy is valid. But we've found most engineers end up appreciating all three. Start with one, see how you feel. Once an exception links directly to a session replay with the surrounding log lines attached... going back to a single tool feels limiting.",
                                        url: '',
                                    },
                                    {
                                        question: 'Is session replay going to make my privacy team panic?',
                                        answer: "We have PII masking, sampling controls, network request filtering, and fine-grained capture options. Your privacy team can sleep soundly. Your users' passwords will not be in the replay. (We checked.)",
                                        url: '/docs/session-replay/privacy',
                                    },
                                    {
                                        question: 'What happens when I blow past the free tier?',
                                        answer: 'Usage-based pricing kicks in — you only pay for what you use. You can set per-product billing limits so there are no surprise charges at the end of the month. Error tracking, session replay, and logs each have their own cap.',
                                        url: '/pricing',
                                    },
                                    {
                                        question:
                                            'Can the MCP agent really debug issues without me opening a dashboard?',
                                        answer: 'We like to think so. Your agent grabs the error, pulls the replay, tails the logs, and hands you a fix. You stay in the zone. The zone is beautiful. The zone is where bugs go to die. The zone is— okay, you get it. Install the MCP.',
                                        url: '/docs/model-context-protocol',
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="py-3">
                                        <button
                                            onClick={() => setOpenQuestion(openQuestion === i ? null : i)}
                                            className="w-full text-left flex items-center justify-between gap-4 font-semibold text-sm cursor-pointer hover:text-primary transition-colors"
                                        >
                                            <span>{item.question}</span>
                                            <IconChevronDown
                                                className={`shrink-0 size-4 transition-transform duration-200 ${
                                                    openQuestion === i ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </button>
                                        {openQuestion === i && (
                                            <div className="mt-2 text-sm">
                                                <p className="text-secondary !mb-2">{item.answer}</p>
                                                {item.url && (
                                                    <Link
                                                        to={item.url}
                                                        state={{ newWindow: true }}
                                                        className="text-red dark:text-yellow font-semibold text-xs hover:underline"
                                                    >
                                                        Read the docs →
                                                    </Link>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <CallToAction type="primary" size="md" to="https://app.posthog.com/signup">
                                    Get started free
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Use for free"
                            subtitle="Generous free tier on all three"
                            icon="IconPiggyBank"
                        >
                            <p>Good news: no per-seat pricing, no enterprise plan required.</p>
                            <p>
                                PostHog Observability is built to be cost-effective by default, with a generous free
                                tier on each product and transparent usage-based pricing. More than 90% of companies use
                                PostHog for free.
                            </p>

                            <h2>TL;DR 💸</h2>

                            <ul>
                                <li>No credit card required to start</li>
                                <li>
                                    <strong>Error tracking:</strong> 100k exceptions/mo free, then $0.000370 per
                                    exception with volume discounts
                                </li>
                                <li>
                                    <strong>Session replay:</strong> 5,000 web + 2,500 mobile recordings/mo free, then
                                    from $0.005 per recording
                                </li>
                                <li>
                                    <strong>Logs:</strong> 50 GB ingested/mo free, then $0.25/GB with discounts
                                </li>
                                <li>
                                    <strong>PostHog MCP is included</strong> on every plan (no enterprise plan required)
                                </li>
                                <li>Set billing limits per product to avoid surprise charges</li>
                                <li>
                                    See full pricing for{' '}
                                    <Link to="/docs/error-tracking/pricing" state={{ newWindow: true }}>
                                        error tracking
                                    </Link>
                                    ,{' '}
                                    <Link to="/docs/session-replay/pricing" state={{ newWindow: true }}>
                                        session replay
                                    </Link>
                                    , and{' '}
                                    <Link to="/docs/logs/pricing" state={{ newWindow: true }}>
                                        logs
                                    </Link>
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

                <div className="text-center py-16 mt-4 opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <p className="text-sm text-secondary italic !mb-4">
                        You made it to the bottom. That means you probably read stack traces before filing a bug report.
                        Mad respect.
                    </p>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Frame_10138_5169832152.png"
                        alt="PostHog hedgehog"
                        className="mx-auto mb-4"
                        imgClassName="w-28 h-auto"
                    />
                    <p className="text-sm text-secondary italic !mb-0">
                        Now go install the{' '}
                        <Link to="/docs/model-context-protocol" className="underline">
                            PostHog MCP
                        </Link>{' '}
                        and let your agent do the debugging. You've earned it.
                    </p>
                </div>
            </ReaderView>
        </>
    )
}
