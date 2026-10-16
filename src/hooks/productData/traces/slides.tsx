import React from 'react'
import {
    IconAI,
    IconArrowUpRight,
    IconBell,
    IconBrowser,
    IconGanttChart,
    IconLaptop,
    IconRewindPlay,
    IconSearch,
    IconServer,
    IconStack,
} from '@posthog/icons'
import { IconOpenAI } from 'components/OSIcons'
import CloudinaryImage from 'components/CloudinaryImage'
import ProductContextDemo, { type ContextNode } from 'components/Home/HeroCarousel/ProductContextDemo'
import PlatformInstall, { mcpInstallSchema, type InstallSchema } from 'components/PlatformInstall'
import CodeBlock from 'components/Home/CodeBlock'
import Glow from 'components/Glow'
import Link from 'components/Link'
import { InlineCode, LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'

const TAB_STYLE = {
    color: 'bg-light dark:bg-dark',
    activeText: 'text-primary',
    progressBar: 'bg-blue',
}

/**
 * Applications = the surfaces you use Tracing through, mirroring the four tabs on
 * the Logs page (editor, web app, investigation, proactive monitoring). Content is
 * drawn from contents/docs/distributed-tracing.
 */
export const applications: CarouselSlide[] = [
    {
        slug: 'editor-mcp',
        label: 'Editor / MCP',
        icon: <IconBrowser className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-red',
        layout: 'stack',
        heading: 'Read traces from your editor',
        description: (
            <>
                <aside className="my-4 @lg/reader-content:mt-2 @lg/reader-content:float-right max-w-[100%_+_1rem] @lg/reader-content:max-w-[300px] @xl/reader-content:max-w-[360px] @3xl/reader-content:max-w-[440px] @lg/reader-content:ml-8 -mr-4 @2xl/reader-content:-mr-8 @4xl/reader-content:-mr-10">
                    <Glow color="black" intensity="gentle" rounded="lg">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/mcp_example_light_cf355dbe0d.png"
                            className="dark:hidden w-full"
                            imgClassName="w-full"
                        />
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/mcp_example_dark_c535f2d8b4.png"
                            className="hidden dark:inline-block w-full"
                            imgClassName="w-full"
                        />
                    </Glow>
                </aside>
                <p>
                    The PostHog MCP server gives coding agents direct access to your spans. Ask your agent which service
                    is slow, have it pull the trace behind a request, and fix the span it points at, without leaving
                    your editor.
                </p>
                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={[
                            {
                                label: 'Query and count spans',
                                description:
                                    'Filter by service, duration, status, and attributes, then pull counts or a sparkline to see how a regression is trending.',
                            },
                            {
                                label: 'Pull a whole trace',
                                description:
                                    'Retrieve every span under a trace ID so the agent reads the same waterfall you would.',
                            },
                            {
                                label: 'Find where the time goes',
                                description:
                                    'Aggregate the call tree, break latency down by attribute, and check a duration histogram or latency heatmap.',
                            },
                            {
                                label: "Discover what's available",
                                description:
                                    'List the services emitting spans and the attributes they carry, with the values you can filter on.',
                            },
                        ]}
                    />
                    <PlatformInstall />
                </div>
            </>
        ),
    },
    {
        slug: 'web-app',
        label: 'Web app',
        icon: <IconLaptop className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Search, filter, and follow a trace in PostHog',
        description: (
            <>
                <p>
                    The{' '}
                    <Link
                        to="/docs/distributed-tracing/basics"
                        state={{ newWindow: true }}
                        className="underline font-semibold"
                    >
                        PostHog web app
                    </Link>{' '}
                    is home base for Tracing. Most investigations start the same way: filter to a service, find the
                    request that ran long, then open it as a waterfall to see which span actually spent the time.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Search and filter spans',
                                description:
                                    'Narrow by service, status, duration, and any attribute you attached to the span.',
                            },
                            {
                                label: 'Follow a trace end to end',
                                description:
                                    'Open the waterfall to see every service, queue, and third-party call the request touched, in order.',
                            },
                            {
                                label: 'Spot slow and failing operations',
                                description:
                                    'Compare operations across services to find the ones dragging your p95 up or failing outright.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_16_at_18_46_01_2x_def7913786.png',
            alt: 'The tracing explorer in PostHog, with span volume over time above a filterable list of traces',
            maxWidth: 'max-w-none',
            containerClassName: 'pb-0 leading-[0]',
            imgClassName: 'border-b-0 rounded-b-none',
        },
    },
    {
        slug: 'investigate',
        label: 'Investigate',
        icon: <IconRewindPlay className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Jump from a slow span to everything around it',
        description: (
            <>
                <p>
                    Tracing runs on the same OpenTelemetry ingestion as Logs, in the same project as your replays,
                    errors, and analytics. So a span is one click from the rest of the story, instead of a dead end in a
                    separate tool.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Read the logs for a span',
                                description:
                                    'The span inspector shows correlated logs scoped to that span or the whole trace, and deep-links into Logs with the filters already applied.',
                            },
                            {
                                label: 'See the error it produced',
                                description:
                                    'Open the Error Tracking issue raised by the request, and the trace that led into it.',
                            },
                            {
                                label: 'Watch the user who waited',
                                description:
                                    'Go from a slow request to the session replay of the person sitting through it, and what they did next.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            ref: 'waterfall',
            maxWidth: 'max-w-none',
            containerClassName: 'pb-0 leading-[0]',
            imgClassName: 'border-b-0 rounded-b-none',
        },
    },
    {
        // Logs has an Alerts tab here. Tracing has no span alerting – see the
        // observability use-case handbook page – so the proactive surface is the
        // APM scout, which watches RED metrics per service on a schedule.
        slug: 'scouts',
        label: 'Scouts',
        icon: <IconBell className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-orange',
        layout: 'stack',
        heading: 'Let a scout watch your services',
        description: (
            <>
                <p>
                    Your traces feed{' '}
                    <Link to="/docs/self-driving" state={{ newWindow: true }} className="underline font-semibold">
                        Self-driving
                    </Link>
                    , the loop that turns product data into shipped fixes: something watches for the problem,
                    investigates what it finds, and opens a pull request for you to review and merge.
                </p>
                <p>
                    A{' '}
                    <Link
                        to="/docs/self-driving/scouts"
                        state={{ newWindow: true }}
                        className="underline font-semibold"
                    >
                        scout
                    </Link>{' '}
                    is the part that watches. It is an agent that runs on a schedule you set. PostHog ships a fleet of
                    them and you turn each on per project, so the one that reads your spans, the{' '}
                    <strong>APM scout</strong>, is already there waiting to be switched on.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'What it can watch',
                                description:
                                    'Out of the box, RED-metric regressions: error rate, p95 latency, and volume, plus new errors per service and per operation. Steer it with a note, or edit it to make it your own.',
                            },
                            {
                                label: 'Where its findings land',
                                description:
                                    'It files a report in your inbox, under the scout’s own name, with the traces behind it. An agent investigates from there, and an actionable report comes back as a pull request.',
                            },
                            {
                                label: 'Quiet by design',
                                description:
                                    'Most runs find nothing worth surfacing, and holding back is a decision the scout makes on purpose. It remembers what it has already raised, so the same regression doesn’t reach you twice.',
                            },
                            {
                                label: 'Or send it to Slack',
                                description:
                                    'Route a scout to a shared channel or direct to the people on call. Send the APM scout to #on-call, for instance.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Scout_troop_Mock_b59fadf110.png',
            alt: 'A scout watching latency per service',
            maxWidth: 'max-w-none',
            containerClassName: 'pb-0 leading-[0]',
            imgClassName: 'border-b-0 rounded-b-none',
        },
    },
]

/** The debugging signals an agent can reach over MCP. Tracing sits centered under the
 *  hub: it is the one that connects the whole request. */
const AGENT_CONTEXT_NODES: ContextNode[] = [
    { handle: 'product_analytics', x: 230, y: 140 },
    { handle: 'session_replay', x: 770, y: 140 },
    { handle: 'error_tracking', x: 160, y: 387 },
    { handle: 'logs', x: 840, y: 387 },
    { handle: 'traces', x: 500, y: 634 },
]

/** Same compact MCP card the home page uses, minus the supports row. */
const compactMcpSchema: InstallSchema = {
    ...mcpInstallSchema,
    supports: undefined,
    secondaryAction: { label: 'Docs', to: '/docs/model-context-protocol', state: { newWindow: true } },
    platforms: [
        ...mcpInstallSchema.platforms.filter(({ id }) => id === 'claude'),
        {
            id: 'chatgpt',
            label: 'ChatGPT',
            group: 'platforms',
            icon: <IconOpenAI className="size-4" />,
            href: 'https://chatgpt.com/plugins/plugin_asdk_app_699caef2d680819188727b0ddbb349dd',
        },
        ...mcpInstallSchema.platforms.filter(({ id }) => ['codex', 'cursor', 'vscode'].includes(id)),
    ],
}

export const topFeatures: CarouselSlide[] = [
    {
        slug: 'waterfall',
        label: 'Trace waterfall',
        icon: <IconGanttChart className="size-5" />,
        ...TAB_STYLE,
        layout: 'stack',
        heading: 'Every span of a request, in one waterfall',
        description: (
            <>
                <p>One request becomes a tree of spans across every service, queue, and third-party call it touches.</p>
                <p>
                    Follow the <InlineCode>trace_id</InlineCode> to see where the time went and which span actually
                    broke, even across async boundaries, where stack traces give up.
                </p>
            </>
        ),
        image: { ref: 'waterfall' },
    },
    {
        slug: 'queryable-spans',
        label: 'Queryable spans',
        icon: <IconSearch className="size-5" />,
        ...TAB_STYLE,
        progressBar: 'bg-red',
        layout: 'stack',
        heading: 'Find the slow ones, then find out why',
        description: (
            <>
                <p>Filter the span explorer by service, duration, status, or any attribute you attached.</p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Filter by anything on the span',
                                description: 'Service, duration, status, or your own attributes like user ID and plan.',
                            },
                            {
                                label: 'Compare two time windows',
                                description: 'Diff two ranges to see which spans got slower after a deploy.',
                            },
                            {
                                label: 'No proprietary query language',
                                description: 'Standard SQL and attributes, the same query layer as your logs.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_16_at_20_12_24_2x_caaaa8cce3.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_09_16_at_20_18_42_2x_def10e806f.png',
            alt: 'Spans compared across two time windows, grouped into regressed, improved, new, and gone, with count, p50, and p95 per service',
        },
    },
    {
        slug: 'opentelemetry',
        label: 'Built on OpenTelemetry',
        icon: <IconServer className="size-5" />,
        ...TAB_STYLE,
        progressBar: 'bg-green',
        layout: 'stack',
        heading: 'One setup covers logs and traces',
        description: (
            <>
                <p>Point your existing OTLP exporter at PostHog and you’re done.</p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'OTLP-compatible ingestion',
                                description:
                                    'Send spans with standard OpenTelemetry libraries. No proprietary agent required.',
                            },
                            {
                                label: 'One install, two products',
                                description:
                                    'Traces use the same ingestion as Logs, so a single OTel setup covers both.',
                            },
                            {
                                label: 'No lock-in',
                                description:
                                    'Already exporting traces somewhere? Point them at PostHog and compare before you commit.',
                            },
                        ]}
                    />
                    <p className="mt-6 mb-2">
                        Set these three environment variables on your own OpenTelemetry SDK to get started:
                    </p>
                    {/* `<ph_client_api_host>` and `<ph_project_token>` are filled in with the
                        reader's own project values when they are logged in – never hard-code a
                        real token here, or every reader who copies this sends us their traces. */}
                    <CodeBlock
                        language="bash"
                        code={`OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="<ph_client_api_host>/i/v1/traces"
OTEL_EXPORTER_OTLP_TRACES_HEADERS="Authorization=Bearer <ph_project_token>"
OTEL_SERVICE_NAME="my-app"`}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'full-stack-context',
        label: 'Full stack context',
        icon: <IconStack className="size-5" />,
        ...TAB_STYLE,
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'From a slow span to the person who waited',
        description: (
            <>
                <p>Traces land in the same project as your replays, errors, logs, and analytics.</p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Correlated logs on every span',
                                description: 'The Logs tab shows the lines from that span, filters already applied.',
                            },
                            {
                                label: 'Business context on the span',
                                description:
                                    'Attach the user ID, plan, and flag variant. When a trace is slow, you know who for.',
                            },
                            {
                                label: 'One investigation across four products',
                                description:
                                    'Shared IDs carry you from the slow span out to the error, the session, and the person.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/spans_light_updated_451a69c627.jpg',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/span_with_logs_list_dark_b8ea8c7348.jpg',
            alt: 'A span inspector open on the Logs tab, showing the log lines recorded during that span beside the trace waterfall',
        },
    },
    {
        slug: 'agent-context',
        label: 'Easy debugging with agents',
        icon: <IconAI className="size-5" />,
        ...TAB_STYLE,
        layout: 'stack',
        heading: 'Easy debugging with agents',
        description: (
            <>
                <div className="@container">
                    <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-start">
                        <ProductContextDemo nodes={AGENT_CONTEXT_NODES} />
                        <div className="flex flex-col gap-3">
                            <p className="m-0">
                                Your agent reads the same project you do over MCP: spans, logs, errors, replays, and
                                analytics. Every span in a request shares a trace ID, so tracing is what joins them.
                            </p>
                            <PlatformInstall
                                schema={compactMcpSchema}
                                linkOnly
                                hideSecondaryAction
                                className="!shadow-none !mb-0"
                            />
                            <p className="text-sm text-secondary m-0 inline-flex gap-1">
                                Or use{' '}
                                <Link
                                    to="/desktop"
                                    state={{ newWindow: true }}
                                    className="inline-flex items-center gap-1 underline underline-offset-2"
                                >
                                    <IconLaptop className="size-4" /> PostHog Desktop{' '}
                                    <IconArrowUpRight className="size-3" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        ),
    },
]
