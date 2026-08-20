import React from 'react'
import {
    IconBrowser,
    IconSearch,
    IconServer,
    IconStack,
    IconPlug,
    IconLaptop,
    IconRewindPlay,
    IconBell,
} from '@posthog/icons'
import CloudinaryImage from 'components/shared/media/CloudinaryImage'
import Glow from 'components/shared/animation/Glow'
import Link from 'components/shared/ui/Link'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { features as f } from './features'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import PlatformInstall from 'components/PlatformInstall'

/**
 * Applications = workflows / ways you show up to the product.
 * Copy reshaped from contents/docs/logs (surfaces, link-session-replay, patterns, alerts).
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
        heading: f.mcp.headline,
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
                    The PostHog MCP server gives coding agents direct access to your logs. Ask your agent to search,
                    filter, and analyze log data without leaving your editor, then fix the bug in the same session.
                </p>
                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={f.mcp.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
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
        heading: 'Search, filter, and mine patterns in PostHog',
        description: (
            <>
                <p>
                    The{' '}
                    <Link
                        to="/docs/logs/surfaces/web-app"
                        state={{ newWindow: true }}
                        className="underline font-semibold"
                    >
                        PostHog web app
                    </Link>{' '}
                    is home base for Logs. Most investigations start the same way: filter to a service and severity,
                    find the log line that matters, then pivot to the session replay, person, or error attached to it.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Search and filter',
                                description:
                                    'Narrow logs with the facet rail, the filter bar, or free-text search, and save a filter combination as a view.',
                            },
                            {
                                label: 'Mine patterns',
                                description:
                                    'Group similar log lines into templates to spot noisy logging, new error shapes, and changes in your traffic.',
                            },
                            {
                                label: 'Explain a log with PostHog AI',
                                description:
                                    'Open a log record and have PostHog AI write up what it means and what probably caused it.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            ref: 'home',
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
        heading: 'Jump from a log line to the user who hit it',
        description: (
            <>
                <p>
                    Because your logs live next to the rest of your data, a log line is one click from the session
                    replay, person, and error it belongs to. Add a session ID and distinct ID and each log line links to
                    the replay and person behind it.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'See the full user journey',
                                description:
                                    'Navigate from a log entry directly to the session replay to see what the user was doing.',
                            },
                            {
                                label: 'Debug a specific user',
                                description:
                                    "Jump from the person's profile straight to every backend log written while they were active.",
                            },
                            {
                                label: 'View related errors',
                                description:
                                    'See Error Tracking issues that occurred during the same session directly in the log details.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            src: f.full_stack_context.images[0].src,
            alt: f.full_stack_context.images[0].alt,
            maxWidth: 'max-w-none',
            containerClassName: 'pb-0 leading-[0]',
            imgClassName: 'border-b-0 rounded-b-none',
        },
    },
    {
        slug: 'alerts',
        label: 'Alerts',
        icon: <IconBell className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-orange',
        layout: 'stack',
        heading: 'Get notified when log volume crosses a threshold',
        description: (
            <>
                <p>
                    Log alerts notify you when the volume of logs matching specific filters crosses a threshold. Use
                    them to catch spikes in errors, drops in expected traffic, or unusual patterns across your services
                    – with noise-reduction settings so brief spikes don't wake anyone up.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Filter by severity, service, and attributes',
                                description: 'Scope the alert to the exact slice of log traffic you care about.',
                            },
                            {
                                label: 'Simulate before you commit',
                                description:
                                    'Preview which logs would have matched your filters and threshold against recent historical data.',
                            },
                            {
                                label: 'Feed Self-driving',
                                description:
                                    'When a log alert fires, it emits a signal into Self-driving so recurring failures become a report you can act on.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            src: f.queryable_logs.images[0].src,
            alt: f.queryable_logs.images[0].alt,
            maxWidth: 'max-w-none',
            containerClassName: 'pb-0 leading-[0]',
            imgClassName: 'border-b-0 rounded-b-none',
        },
    },
]

export const topFeatures: CarouselSlide[] = [
    {
        slug: 'queryable-logs',
        label: 'Queryable logs',
        icon: <IconSearch className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-red',
        layout: 'float',
        heading: f.queryable_logs.headline,
        description: (
            <>
                <p>{f.queryable_logs.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.queryable_logs.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.queryable_logs.images[0].src,
            alt: f.queryable_logs.images[0].alt,
        },
    },
    {
        slug: 'opentelemetry',
        label: 'OpenTelemetry',
        icon: <IconServer className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'float',
        heading: f.opentelemetry.headline,
        description: (
            <>
                <p>{f.opentelemetry.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.opentelemetry.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.opentelemetry.images[0].src,
            alt: f.opentelemetry.images[0].alt,
        },
    },
    {
        slug: 'full-stack-context',
        label: 'Full stack context',
        icon: <IconStack className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'float',
        heading: f.full_stack_context.headline,
        description: (
            <>
                <p>{f.full_stack_context.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.full_stack_context.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.full_stack_context.images[0].src,
            alt: f.full_stack_context.images[0].alt,
        },
    },
    {
        slug: 'mcp',
        label: 'MCP',
        icon: <IconPlug className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: f.mcp.headline,
        description: (
            <>
                <p>{f.mcp.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.mcp.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                    {f.mcp.children}
                </div>
            </>
        ),
    },
]
