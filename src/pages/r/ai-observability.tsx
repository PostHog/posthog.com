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
import LovableLogo from 'components/CustomerLogos/LovableLogo'
import PostHogLogo from 'components/CustomerLogos/PostHogLogo'

const TOP_COUNT = 8
const PLATFORM_ORDER = [
    '/docs/ai-observability/installation/openai',
    '/docs/ai-observability/installation/anthropic',
    '/docs/ai-observability/installation/langchain',
    '/docs/ai-observability/installation/langgraph',
    '/docs/ai-observability/installation/llamaindex',
    '/docs/ai-observability/installation/vercel-ai',
    '/docs/ai-observability/installation/google',
    '/docs/ai-observability/installation/groq',
    '/docs/ai-observability/installation/mistral',
    '/docs/ai-observability/installation/azure-openai',
    '/docs/ai-observability/installation/crewai',
    '/docs/ai-observability/installation/pydantic-ai',
    '/docs/ai-observability/installation/openai-agents',
    '/docs/ai-observability/installation/claude-agent-sdk',
    '/docs/ai-observability/installation/aws-bedrock',
    '/docs/ai-observability/installation/deepseek',
]

export default function AIObservabilityLanding(): JSX.Element {
    const [showMore, setShowMore] = useState(false)
    const [isIdle, setIsIdle] = useState(false)
    const [installMCPCopied, setInstallMCPCopied] = useState(false)

    const handleCopyMCP = () => {
        navigator.clipboard.writeText('npx @posthog/wizard mcp add')
        setInstallMCPCopied(true)
        setTimeout(() => setInstallMCPCopied(false), 2000)
    }

    const handleScrollToMCP = () => {
        const el = document.getElementById('quest-item-query-ai-traces-from-your-editor')
        if (el) {
            window.history.pushState(null, '', '#quest-item-query-ai-traces-from-your-editor')
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    const allPlatforms = usePlatformList('docs/ai-observability/installation', 'AI Observability installation')
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
                title="AI Observability for product engineers"
                description="Track every LLM conversation, know exactly what each model costs, and trace multi-step AI workflows — all in PostHog. Free for your first 100k events per month. No credit card needed."
                noindex
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                hideTitle
                title="AI Observability for product engineers"
                contentMaxWidthClass="max-w-5xl"
                showQuestions={false}
            >
                <div className="grid grid-cols-1 @lg:grid-cols-[1.2fr_1fr] gap-10 items-center mb-6 max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-3xl md:text-5xl !mb-4">X-ray vision for your AI product</h1>
                        <p className="text-lg md:text-xl mb-6 text-secondary">
                            Know exactly what every LLM call costs, broken down by model, feature, and user. Trace
                            latency and errors straight from your editor with{' '}
                            <span className="text-gradient-wizard font-semibold whitespace-nowrap">
                                the PostHog MCP
                            </span>
                            , for any model.
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
                            First{' '}
                            <Link to="/docs/ai-observability/start-here" state={{ newWindow: true }}>
                                100k LLM events
                            </Link>{' '}
                            per month are free. Works with OpenAI, Anthropic, LangChain, and{' '}
                            <Link to="/docs/ai-observability/installation" state={{ newWindow: true }}>
                                40+ more
                            </Link>
                            .
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Square_X_Ray_98b5f3e3dd.png"
                            alt="X-ray vision for your AI product"
                            className="w-full max-w-[450px] mx-auto"
                        />
                    </div>
                </div>

                <div className="mb-12 max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center gap-x-12 gap-y-6 text-primary dark:text-primary-dark">
                        <LovableLogo className="fill-current object-contain max-w-full h-10" />
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/e_trim,q_auto,f_auto/kilocodelogo_93f0668287.png"
                            alt="Kilo Code"
                            imgClassName="object-contain max-w-full h-10 w-auto"
                        />
                        <PostHogLogo className="fill-current object-contain max-w-full h-10" />
                    </div>
                    <p className="text-xs mt-3 !mb-0">
                        <span className="font-semibold">AI teams using PostHog AI Observability in production.</span>
                        <br />
                        <span className="text-muted">
                            (Yes, we use it ourselves. Hedgehogs need observability, too.)
                        </span>
                    </p>
                </div>

                <div className={isIdle ? 'quest-idle' : ''}>
                    <QuestLog firstSpeechBubble="Let's get observing!" lastSpeechBubble="Now go build something great!">
                        <QuestLogItem
                            title="Wrap your LLM calls, get instant visibility"
                            subtitle="40+ frameworks and providers supported"
                            icon="IconLlmPromptManagement"
                        >
                            <p>
                                Drop-in SDK wrappers sit in front of your existing LLM calls. Your code barely changes.
                                Inputs, outputs, tokens, cost, latency, model, and provider are captured automatically.
                            </p>

                            <WizardCTA />

                            <h3>Or pick your model directly</h3>

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
                                {showMore ? 'Show less' : 'See all integrations'}
                            </button>

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/ai-observability/installation"
                                    state={{ newWindow: true }}
                                >
                                    View all integrations
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Query AI traces from your editor"
                            subtitle="MCP tools so your agent can investigate without leaving the IDE"
                            icon="IconSparkles"
                        >
                            <p>
                                Install the PostHog MCP and your coding agent can query your LLM data directly — costs,
                                errors, latency, traces — without switching to a browser.
                            </p>

                            <SingleCodeBlock language="bash" showAskAI={false}>
                                npx @posthog/wizard mcp add
                            </SingleCodeBlock>

                            <ul>
                                <li>
                                    <em>"Why did my LLM costs spike 40% since last deploy?"</em>
                                </li>
                                <li>
                                    <em>"Which model is the most expensive for the chat feature this week?"</em>
                                </li>
                                <li>
                                    <em>"Are there any generation errors in the last 30 minutes?"</em>
                                </li>
                                <li>
                                    <em>"Show me the 10 slowest traces from today."</em>
                                </li>
                                <li>
                                    <em>"Compare token usage between GPT-4 and Claude on the search endpoint."</em>
                                </li>
                            </ul>

                            <div className="flex flex-wrap gap-2 mt-4">
                                <CallToAction type="primary" size="md" onClick={handleCopyMCP}>
                                    {installMCPCopied ? 'Copied! 🚀' : 'Copy install command'}
                                </CallToAction>
                                <CallToAction
                                    type="secondary"
                                    size="md"
                                    to="/docs/ai-observability/query-traces-mcp"
                                    state={{ newWindow: true }}
                                >
                                    MCP docs
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="See cost, tokens, inputs and outputs"
                            subtitle="Every LLM call, captured in full"
                            icon="IconRecord"
                        >
                            <p>
                                Each LLM call becomes a <strong>generation</strong> — a full record of what went in and
                                what came out, with token counts, automatic cost calculation, and latency attached.
                            </p>

                            <ul>
                                <li>Full conversation context — the complete message array, roles and all</li>
                                <li>
                                    Token counts + <strong>automatic cost calculation</strong> per model
                                </li>
                                <li>Response latency, model name, provider, and any tools called</li>
                                <li>Enrichable with user IDs, groups, and custom properties</li>
                            </ul>

                            <ProductVideo
                                videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/ai_generation_in_app_18f37057ca.mp4"
                                videoDark={undefined}
                                classes="rounded border border-primary"
                                autoPlay={true}
                                loop={true}
                            />

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/ai-observability/calculating-costs"
                                    state={{ newWindow: true }}
                                >
                                    Read the docs
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Your AI dashboard, zero config"
                            subtitle="Costs, latency, errors, and usage — out of the box"
                            icon="IconLineGraph"
                        >
                            <p>
                                First generation in, dashboard on. Costs by model, active users, latency trends, error
                                rates — all pre-built. Fully customizable when you need more.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/llma_dashboard_c710e66b5e.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/llma_dashboard_dark_aef0f67baf.png"
                                alt="AI Observability dashboard"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <div className="mt-4">
                                <CallToAction type="primary" size="md" to="https://app.posthog.com/ai-observability">
                                    Open the dashboard
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Trace multi-step AI workflows end to end"
                            subtitle="Traces, spans, and sessions for agents, RAG, and pipelines"
                            icon="IconGraph"
                        >
                            <p>
                                Group related LLM calls into <strong>traces</strong>, nest operations into{' '}
                                <strong>spans</strong>, and link traces into <strong>sessions</strong>. The full
                                hierarchy for agentic workflows, RAG pipelines, and multi-turn conversations.
                            </p>

                            <ProductScreenshot
                                imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/llm_generations_b12119af33.png"
                                imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/llm_geneerations_dark_03c996e8ad.png"
                                alt="AI Observability traces"
                                classes="rounded"
                                padding={false}
                                zoom={undefined}
                            />

                            <div className="mt-4">
                                <CallToAction
                                    type="primary"
                                    size="md"
                                    to="/docs/ai-observability/traces"
                                    state={{ newWindow: true }}
                                >
                                    Explore traces
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Working in Slack? Talk to the Hog."
                            subtitle="New from PostHog"
                            icon="IconBell"
                        >
                            <p>
                                PostHog watches your LLM metrics and pings your Slack channel when something's wrong —
                                cost threshold crossed, error rate spiked, latency jumped. Then tag{' '}
                                <code>@PostHog</code> to go from signal to fix without ever opening a dashboard.
                            </p>

                            <h3>Ask @PostHog about your AI product</h3>

                            <ul>
                                <li>
                                    <em>"Why did generation costs jump 40% since last deploy?"</em>
                                </li>
                                <li>
                                    <em>"Which users are hitting the most LLM errors today?"</em>
                                </li>
                                <li>
                                    <em>"Is average LLM latency trending up or down this week?"</em>
                                </li>
                                <li>
                                    <em>"Are error rates higher for Claude or GPT-4 on the search feature?"</em>
                                </li>
                            </ul>

                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/slack_app_aio_81db83f84c.png"
                                alt="PostHog Slack app showing AI observability alerts and answers"
                                className="rounded-md shadow border border-primary overflow-hidden my-4"
                                imgClassName="w-full"
                            />

                            <h3>Tag @PostHog to ship the fix</h3>

                            <p>
                                Once you've found the problem, tag <code>@PostHog</code> to fix it. It reads your
                                codebase, writes the change, and opens a draft PR — from the same Slack thread where you
                                spotted the issue. No editor required.
                            </p>

                            <div className="flex flex-wrap gap-2 mt-4">
                                <CallToAction type="primary" size="md" to="https://app.posthog.com/integrations/slack">
                                    Connect Slack
                                </CallToAction>
                                <CallToAction type="secondary" size="md" to="/slack-app" state={{ newWindow: true }}>
                                    Learn more
                                </CallToAction>
                            </div>
                        </QuestLogItem>

                        <QuestLogItem
                            title="Use for free"
                            subtitle="100k events per month, no credit card"
                            icon="IconPiggyBank"
                            idleGlow
                        >
                            <h3>TL;DR 💸</h3>

                            <ul>
                                <li>No credit card required to start</li>
                                <li>
                                    <strong>First 100k LLM events/mo are free</strong> with 30-day retention
                                </li>
                                <li>
                                    Above 100k: <strong>$0.00006/event</strong> with volume discounts
                                </li>
                                <li>Set billing limits to avoid surprise charges</li>
                                <li>
                                    See{' '}
                                    <Link to="/pricing" state={{ newWindow: true }}>
                                        pricing page
                                    </Link>{' '}
                                    for full details
                                </li>
                            </ul>

                            <hr className="my-6" />

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
                        Your LLMs are burning tokens and you're reading landing pages. Respect. Now go fix that.
                    </p>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Frame_10138_5169832152.png"
                        alt="PostHog hedgehog"
                        className="mx-auto mb-4"
                        imgClassName="w-28 h-auto"
                    />
                    <p className="text-sm text-secondary italic !mb-0">
                        Install the SDK, capture your first generation. Takes about{' '}
                        <Link to="/docs/ai-observability/installation" className="underline">
                            five minutes
                        </Link>
                        .
                    </p>
                </div>
            </ReaderView>
        </>
    )
}
