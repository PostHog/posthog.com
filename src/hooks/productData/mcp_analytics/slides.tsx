import React from 'react'
import { IconCode, IconDatabase, IconLaptop } from '@posthog/icons'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import { features as f } from './features'

type Feature = (typeof f)[keyof typeof f]

/** Renders `backtick` spans in copy as inline code. */
export const inlineCode = (text: string): React.ReactNode =>
    text
        .split(/(`[^`]+`)/g)
        .map((part, i) =>
            part.startsWith('`') && part.endsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : part
        )

const list = (items: { title: string; description: string }[]) => (
    <div className="@container">
        <LabeledList items={items.map((item) => ({ label: item.title, description: inlineCode(item.description) }))} />
    </div>
)

const featureSlide = (slug: string, feature: Feature, progressBar: string): CarouselSlide => ({
    slug,
    label: feature.title,
    icon: React.cloneElement(feature.icon, { className: 'size-5' }),
    color: 'bg-light dark:bg-dark',
    activeText: 'text-primary',
    progressBar,
    layout: 'stack',
    heading: feature.headline,
    description: (
        <>
            <p>{inlineCode(feature.description)}</p>
            {list(feature.features)}
        </>
    ),
})

/**
 * Applications = the surfaces you use MCP Analytics from.
 * Copy from the reviewed copy draft, reshaped from contents/docs/mcp-analytics/surfaces.
 */
export const applications: CarouselSlide[] = [
    {
        slug: 'editor-mcp',
        label: 'Editor / MCP',
        icon: <IconCode className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Ask your agent about your MCP server',
        description: (
            <>
                <p>
                    {inlineCode(
                        "Don't want to open a dashboard? Query MCP analytics from Claude Code, Cursor, or any client. Ask for this week's errors and slowest tools, then fix them in the same session."
                    )}
                </p>
                {list([
                    {
                        title: 'Query MCP tool stats',
                        description:
                            "Ask which tools are used, and if they're healthy. Check a tool's volume and confirm that events arrive after a deploy.",
                    },
                    {
                        title: 'Know client and harness breakdown',
                        description:
                            'Know which clients are calling and which models are used the most to adapt your MCP server to what your customers are using.',
                    },
                    {
                        title: 'Dig into tool quality',
                        description:
                            "Check reliability, p95 latency and sort a failing tool's errors into groups to find the cause before a fix.",
                    },
                ])}
            </>
        ),
    },
    {
        slug: 'web-app',
        label: 'Web app',
        icon: <IconLaptop className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Your debugging center for agent sessions',
        description: (
            <>
                <p>
                    {inlineCode(
                        "Monitor your MCP server and investigate the whole story: from summary dashboards down to a single session's traces."
                    )}
                </p>
                {list([
                    {
                        title: 'Explore sessions',
                        description:
                            "See each tool call and error in the session's context. Unique IDs keep calls from stateless servers in the same session.",
                    },
                    {
                        title: 'Understand intent',
                        description: 'Learn what agents and end users were trying to achieve in each call.',
                    },
                    {
                        title: 'Monitor live activity',
                        description:
                            'Check tool calls in real time through a live feed, and catch errors before they scale.',
                    },
                ])}
            </>
        ),
    },
    {
        slug: 'api-sql',
        label: 'API and SQL',
        icon: <IconDatabase className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Build your own views',
        description: (
            <>
                <p>
                    {inlineCode(
                        'Every MCP signal is a normal PostHog event. Query `$mcp_*` events in insights, dashboards, and the SQL editor, or use the API to put tool errors, durations, and trends into your weekly report or your issue tracker.'
                    )}
                </p>
                {list([
                    {
                        title: 'Get errors and failure rates',
                        description: 'Track error rates per tool, error types, and errors per week after a release.',
                    },
                    {
                        title: 'Know your top MCP users',
                        description:
                            'Connect the tool calls to people, orgs and workspaces to see which accounts use your MCP.',
                    },
                    {
                        title: 'Report on trends over time',
                        description: 'Check daily, weekly or monthly call volume for health and management reports.',
                    },
                ])}
            </>
        ),
    },
]

export const topFeatures: CarouselSlide[] = [
    featureSlide('tool-calls', f.tool_calls, 'bg-blue'),
    featureSlide('intent', f.intent, 'bg-seagreen'),
    featureSlide('tool-quality', f.tool_quality, 'bg-red'),
    featureSlide('sessions', f.sessions, 'bg-yellow'),
    featureSlide('missing-capabilities', f.missing_capabilities, 'bg-orange'),
    featureSlide('clients-and-models', f.clients_and_models, 'bg-purple'),
]
