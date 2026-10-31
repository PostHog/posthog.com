import React, { useState } from 'react'
import Link from 'components/Link'
import useProduct from 'hooks/useProduct'
import { StickerAi } from 'components/Stickers/Stickers'
import ProductIcon from 'components/PostHogAI/ProductIcon'
import CloudinaryImage from 'components/CloudinaryImage'

const groups = [
    {
        name: 'Analyze and investigate',
        tools: [
            {
                handle: 'product_analytics',
                task: 'Build insights, funnels, cohorts, and dashboards from a question.',
                to: '/docs/posthog-ai/tools',
            },
            {
                handle: 'web_analytics',
                task: 'Investigate traffic changes, referrals, and conversions.',
                to: '/docs/posthog-ai/investigate-web-traffic',
            },
            {
                handle: 'session_replay',
                task: 'Find relevant sessions and summarize where users got stuck.',
                to: '/docs/session-replay',
            },
            {
                handle: 'error_tracking',
                task: 'Find issues and investigate the users and sessions they affect.',
                to: '/docs/error-tracking',
            },
            {
                handle: 'logs',
                task: 'Explain a log record, or query logs through MCP.',
                to: '/docs/logs/explain-logs-ai',
            },
            {
                handle: 'ai_observability',
                task: 'Find LLM traces by model, cost, latency, and errors.',
                to: '/docs/ai-observability',
            },
        ],
    },
    {
        name: 'Build and connect',
        tools: [
            {
                handle: 'data_warehouse',
                task: 'Write and run SQL across product data and connected sources.',
                to: '/docs/posthog-ai/write-and-edit-sql',
            },
            {
                handle: 'feature_flags',
                task: 'Create flags and inspect the settings before rollout.',
                to: '/docs/posthog-ai/tools',
            },
            {
                handle: 'experiments',
                task: 'Prepare an experiment and summarize its results.',
                to: '/docs/posthog-ai/tools',
            },
            {
                handle: 'surveys',
                task: 'Create surveys and group responses into themes.',
                to: '/docs/posthog-ai/tools',
            },
            {
                handle: 'cdp',
                task: 'Write transformations and configure function filters and inputs.',
                to: '/docs/posthog-ai/tools',
            },
            {
                handle: 'endpoints',
                task: 'Create and debug callable queries through MCP or Desktop.',
                to: '/docs/endpoints',
            },
        ],
    },
    {
        name: 'Run and report',
        tools: [
            {
                handle: 'workflows_emails',
                task: 'Start AI tasks from triggers and generate message templates.',
                to: '/docs/workflows/ai-tasks',
            },
            {
                handle: 'replay_vision',
                task: 'Turn recordings into structured observations you can query.',
                to: '/docs/replay-vision',
            },
            {
                handle: 'inbox',
                task: 'Review scout findings and proposed pull requests.',
                to: '/docs/self-driving/inbox',
            },
            {
                handle: 'notebooks',
                task: 'Create reports with text, insights, and session replays.',
                to: '/docs/posthog-ai/tools',
            },
            {
                handle: 'support',
                task: 'Draft replies from business knowledge and investigate ticket data.',
                to: '/docs/support/ai-agent',
                availability: 'Private beta',
            },
        ],
    },
]

const embeddedTools = [
    {
        name: 'SQL assistance',
        task: 'Generate, explain, and fix queries in the editor.',
        to: '/docs/posthog-ai/write-and-edit-sql',
    },
    {
        name: 'AI functions in SQL',
        task: 'Classify rows with jev() and decide().',
        to: '/docs/sql/ai-functions',
    },
    {
        name: 'SDK wizard',
        task: 'Install, audit, and debug your PostHog integration.',
        to: '/docs/ai-engineering/ai-wizard',
    },
]

const engineeringTools = [
    {
        handle: 'ai_observability',
        to: '/docs/ai-observability',
        task: 'Inspect prompts, responses, tool calls, latency, tokens, and cost in one trace.',
    },
    {
        handle: 'llm_evals',
        to: '/docs/ai-evals',
        task: 'Evaluate model output to find poor answers and catch regressions.',
    },
    {
        handle: 'mcp_analytics',
        to: '/docs/mcp-analytics',
        task: 'See agent intent, failed tool calls, and capabilities missing from your MCP server.',
    },
    {
        handle: 'endpoints',
        to: '/docs/endpoints',
        task: 'Turn a saved query into an API endpoint your agent can call. Keep the query in PostHog.',
    },
]

export function AIEngineering(): JSX.Element | null {
    const products = useProduct()
    if (!Array.isArray(products)) return null

    return (
        <section
            id="building-ai"
            className="my-12 rounded-md border border-green bg-green/10 p-5 shadow-xl @xl/reader-content:p-7"
        >
            <div className="grid items-center gap-6 @3xl/reader-content:grid-cols-[minmax(0,1fr)_14rem]">
                <div className="min-w-0">
                    <h2 className="m-0 flex items-center gap-3 text-2xl font-bold @xl/reader-content:text-3xl">
                        <StickerAi className="size-10 shrink-0 -rotate-6" />
                        Building your own AI?
                    </h2>
                    <p className="mb-5 mt-3 max-w-2xl text-base text-secondary">
                        See what your agents are actually up to: each prompt, tool call, cost, and failure, next to the
                        product data they use.
                    </p>
                    <ul className="m-0 grid list-none gap-x-6 gap-y-4 p-0 @xl/reader-content:grid-cols-2">
                        {engineeringTools.map(({ handle, to, task }) => {
                            const product = products.find((item) => item.handle === handle)
                            if (!product) return null
                            return (
                                <li key={handle} className="border-t border-green/30 pt-3">
                                    <Link to={to} state={{ newWindow: true }} className="group block !no-underline">
                                        <h3 className="m-0 flex items-center gap-2 text-base font-bold group-hover:underline">
                                            <ProductIcon product={product} className="size-5 shrink-0" />
                                            {product.name} →
                                        </h3>
                                        <p className="mb-0 mt-1 text-sm font-normal text-secondary">{task}</p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/transformer_hedgehog_2a379334d7.png"
                    alt=""
                    loading="lazy"
                    width={360}
                    className="hidden @3xl/reader-content:block"
                    imgClassName="mx-auto max-h-56 w-auto"
                />
            </div>
        </section>
    )
}

export default function Capabilities(): JSX.Element | null {
    const products = useProduct()
    const [open, setOpen] = useState(false)
    if (!Array.isArray(products)) return null

    return (
        <div id="ai-tools" className="not-prose mt-4">
            <p className="mb-0 text-center text-sm text-secondary">
                AI across the tools you use.{' '}
                <button
                    type="button"
                    aria-expanded={open}
                    aria-controls="ai-tool-list"
                    onClick={() => setOpen(!open)}
                    className="font-semibold text-red underline dark:text-yellow"
                >
                    {open ? 'Hide the tool list' : 'Explore the full tool list'}
                </button>
            </p>
            <div id="ai-tool-list" hidden={!open} className="mt-4 border-t border-primary pt-5">
                <div className="grid gap-x-7 gap-y-5 @xl/reader-content:grid-cols-2 @4xl/reader-content:grid-cols-1">
                    {groups.map(({ name, tools }) => (
                        <div key={name}>
                            <h4 className="mb-0 mt-0 border-b border-primary pb-3 text-sm font-bold">{name}</h4>
                            <dl className="m-0 divide-y divide-primary">
                                {tools.map(({ handle, task, to, ...tool }) => {
                                    const product = products.find((item) => item.handle === handle)
                                    if (!product) return null
                                    return (
                                        <div key={handle} className="py-3">
                                            <dt className="flex items-start gap-2 text-sm font-semibold">
                                                <ProductIcon product={product} className="size-5 shrink-0" />
                                                <Link to={to} state={{ newWindow: true }}>
                                                    {product.name}
                                                </Link>
                                                {'availability' in tool && (
                                                    <span className="rounded bg-yellow/20 px-1.5 py-0.5 text-xs font-normal">
                                                        {tool.availability}
                                                    </span>
                                                )}
                                            </dt>
                                            <dd className="mb-0 ml-7 mt-1 text-sm text-secondary">{task}</dd>
                                        </div>
                                    )
                                })}
                            </dl>
                        </div>
                    ))}
                </div>
                <div className="mt-3 grid gap-4 rounded border border-primary bg-accent/30 p-4 @xl/reader-content:grid-cols-3 @4xl/reader-content:grid-cols-1">
                    {embeddedTools.map(({ name, task, to }) => (
                        <div key={name}>
                            <Link to={to} state={{ newWindow: true }} className="text-sm font-semibold">
                                {name} →
                            </Link>
                            <p className="mb-0 mt-1 text-sm text-secondary">{task}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
