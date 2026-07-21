import React from 'react'
import {
    IconFunnels,
    IconTrends,
    IconRetention,
    IconDatabase,
    IconPlug,
    IconBrowser,
    IconGraph,
    IconDashboard,
} from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import Glow from 'components/Glow'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { features as f } from './features'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import PlatformInstall from 'components/PlatformInstall'

export const applications: CarouselSlide[] = [
    {
        slug: 'editor-mcp',
        label: 'Editor / MCP',
        icon: <IconBrowser className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Query product data without leaving your editor',
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
                <p>{f.mcp.description}</p>
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
        slug: 'insights',
        label: 'Insights',
        icon: <IconGraph className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Build the insight that answers your question',
        description: (
            <>
                <p>
                    Open PostHog and pick the insight type that matches what you're trying to learn – trends for "is
                    this going up?", funnels for "where do people drop?", retention for "do they come back?", paths for
                    "what do they do next?".
                </p>
                <p>
                    Autocapture means you already have pageviews, clicks, and form submissions. Add custom events when
                    you need them, or define actions retroactively when you realize you forgot to track something.
                </p>
                <div className="@container">
                    <LabeledList
                        columns={[1, 2]}
                        items={[
                            {
                                label: 'Trends',
                                description: 'Plot any event over time, with formulas like DAU/MAU when you need them.',
                            },
                            {
                                label: 'Funnels',
                                description: 'Find the exact step where conversion dies – then jump to those sessions.',
                            },
                            {
                                label: 'Retention & stickiness',
                                description: 'Measure who comes back, and how often they do the things that matter.',
                            },
                            {
                                label: 'Paths & lifecycle',
                                description: 'See the routes people take and whether your base is growing or churning.',
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
        slug: 'dashboards',
        label: 'Dashboards',
        icon: <IconDashboard className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Pin the metrics you check every week',
        description: (
            <>
                <p>
                    Save insights to a dashboard so you're not rebuilding the same query every Monday. Share it with
                    your team, subscribe over Slack or email, or embed it wherever your company already looks.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Monitor KPIs',
                                description: 'Activation, retention, revenue events – whatever your team owns.',
                            },
                            {
                                label: 'Feature health',
                                description: 'Track adoption of something you just shipped without a separate tool.',
                            },
                            {
                                label: 'Ask PostHog AI',
                                description:
                                    'Describe the chart you want in plain English and drop the result on a dashboard.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: { ref: 'trends', glow: true },
    },
]

export const topFeatures: CarouselSlide[] = [
    {
        slug: 'funnels',
        label: 'Funnels',
        icon: <IconFunnels className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'float',
        heading: f.funnels.headline,
        description: (
            <>
                <p>
                    Find where people drop off across a series of actions – then jump from any step into the matching
                    session recordings.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            ...f.funnels.features.slice(0, 3).map((item) => ({
                                label: item.title,
                                description: item.description,
                            })),
                            {
                                label: f.correlation_analysis.title,
                                description: f.correlation_analysis.description,
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: { ref: 'funnels', glow: true },
    },
    {
        slug: 'trends',
        label: 'Trends',
        icon: <IconTrends className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'float',
        heading: f.trends.headline,
        description: (
            <>
                <p>
                    Plot any event over time, break it down by any property, and use formula mode for ratios like
                    DAU/MAU.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            ...f.trends.features.slice(0, 3).map((item) => ({
                                label: item.title,
                                description: item.description,
                            })),
                            {
                                label: f.lifecycle.title,
                                description: f.lifecycle.description,
                            },
                            {
                                label: f.stickiness.title,
                                description: f.stickiness.description,
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: { ref: 'trends', glow: true },
    },
    {
        slug: 'retention',
        label: 'Retention',
        icon: <IconRetention className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'float',
        heading: f.retention.headline,
        description: (
            <>
                <p>{f.retention.description}</p>
                <div className="@container">
                    <LabeledList
                        items={[
                            ...f.retention.features.slice(0, 3).map((item) => ({
                                label: item.title,
                                description: item.description,
                            })),
                            {
                                label: f.user_paths.title,
                                description: f.user_paths.description,
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: { ref: 'retention', glow: true },
    },
    {
        slug: 'sql-editor',
        label: 'SQL',
        icon: <IconDatabase className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'float',
        heading: f.sql_editor.headline,
        description: (
            <>
                <p>{f.sql_editor.description}</p>
                <div className="@container">
                    <LabeledList
                        items={[
                            ...f.sql_editor.features.map((item) => ({
                                label: item.title,
                                description: item.description,
                            })),
                            {
                                label: f.group_analytics.title,
                                description: f.group_analytics.description,
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: { ref: 'sql-editor', glow: true },
    },
    {
        slug: 'mcp',
        label: 'MCP',
        icon: <IconPlug className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
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
