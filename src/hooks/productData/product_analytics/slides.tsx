import React from 'react'
import {
    IconFunnels,
    IconTrends,
    IconLifecycle,
    IconUserPaths,
    IconCorrelationAnalysis,
    IconRetention,
    IconStickiness,
    IconDatabase,
    IconPeople,
    IconPlug,
    IconBrowser,
} from '@posthog/icons'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { features as f } from './features'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import PlatformInstall from 'components/PlatformInstall'

/**
 * "How do I use it?" carousel slides.
 * Only the MCP/editor slide is populated from existing product content.
 * Additional application slides still need to be written.
 */
export const applications: CarouselSlide[] = [
    {
        slug: 'editor-mcp',
        label: 'Editor / MCP',
        icon: <IconBrowser className="size-5" />,
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
]

export const topFeatures: CarouselSlide[] = [
    {
        slug: 'funnels',
        label: f.funnels.title,
        icon: <IconFunnels className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'float',
        heading: f.funnels.headline,
        description: (
            <>
                <div className="@container">
                    <LabeledList
                        items={f.funnels.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: { ref: 'funnels', glow: true },
    },
    {
        slug: 'trends',
        label: f.trends.title,
        icon: <IconTrends className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'float',
        heading: f.trends.headline,
        description: (
            <>
                <div className="@container">
                    <LabeledList
                        items={f.trends.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: { ref: 'trends', glow: true },
    },
    {
        slug: 'lifecycle',
        label: f.lifecycle.title,
        icon: <IconLifecycle className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'float',
        heading: f.lifecycle.headline,
        description: (
            <>
                <p>{f.lifecycle.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.lifecycle.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: { ref: 'lifecycle', glow: true },
    },
    {
        slug: 'user-paths',
        label: f.user_paths.title,
        icon: <IconUserPaths className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'float',
        heading: f.user_paths.headline,
        description: (
            <>
                <p>{f.user_paths.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.user_paths.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: { ref: 'user-paths', glow: true },
    },
    {
        slug: 'correlation-analysis',
        label: f.correlation_analysis.title,
        icon: <IconCorrelationAnalysis className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-red',
        layout: 'float',
        heading: f.correlation_analysis.headline,
        description: (
            <>
                <p>{f.correlation_analysis.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.correlation_analysis.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: { ref: 'correlation-analysis', glow: true },
    },
    {
        slug: 'retention',
        label: f.retention.title,
        icon: <IconRetention className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'float',
        heading: f.retention.headline,
        description: (
            <>
                <p>{f.retention.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.retention.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: { ref: 'retention', glow: true },
    },
    {
        slug: 'stickiness',
        label: f.stickiness.title,
        icon: <IconStickiness className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'float',
        heading: f.stickiness.headline,
        description: (
            <>
                <p>{f.stickiness.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.stickiness.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: { ref: 'stickiness', glow: true },
    },
    {
        slug: 'sql-editor',
        label: f.sql_editor.title,
        icon: <IconDatabase className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'float',
        heading: f.sql_editor.headline,
        description: (
            <>
                <p>{f.sql_editor.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.sql_editor.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: { ref: 'sql-editor', glow: true },
    },
    {
        slug: 'group-analytics',
        label: f.group_analytics.title,
        icon: <IconPeople className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'stack',
        heading: f.group_analytics.headline,
        description: (
            <>
                <p>{f.group_analytics.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.group_analytics.features
                            .filter((item) => item.title)
                            .map((item) => ({
                                label: item.title,
                                description: item.description || undefined,
                            }))}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'mcp',
        label: f.mcp.title,
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
