import React from 'react'
import {
    IconBrowser,
    IconWarning,
    IconBell,
    IconPulse,
    IconList,
    IconPeople,
    IconRewindPlay,
    IconToggle,
} from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import Glow from 'components/Glow'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { features as f } from './features'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import PlatformInstall from 'components/PlatformInstall'

/**
 * Applications = workflows / ways you show up to the product.
 * Only MCP exists in current error-tracking content; other application slides are a content gap.
 */
export const applications: CarouselSlide[] = [
    {
        slug: 'editor-mcp',
        label: 'Editor / MCP',
        icon: <IconBrowser className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-orange',
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
        slug: 'stack-traces',
        label: 'Stack traces',
        icon: <IconWarning className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-orange',
        layout: 'float',
        heading: f.stack_traces.headline,
        description: <p>{f.stack_traces.description}</p>,
        image: {
            src: f.stack_traces.images[0].src,
            alt: f.stack_traces.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'alerts',
        label: 'Alerts',
        icon: <IconBell className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-red',
        layout: 'float',
        heading: f.alerts.headline,
        description: <p>{f.alerts.description}</p>,
        image: {
            src: f.alerts.images[0].src,
            alt: f.alerts.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'monitor-issues',
        label: 'Monitor',
        icon: <IconPulse className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-orange',
        layout: 'float',
        heading: f.monitor_issues.headline,
        description: <p>{f.monitor_issues.description}</p>,
        image: {
            src: f.monitor_issues.images[0].src,
            alt: f.monitor_issues.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'manage-organize',
        label: 'Organize',
        icon: <IconList className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'float',
        heading: f.manage_organize.headline,
        description: <p>{f.manage_organize.description}</p>,
        image: {
            src: f.manage_organize.images[0].src,
            alt: f.manage_organize.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'assign-triage',
        label: 'Assign',
        icon: <IconPeople className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'float',
        heading: f.assign_triage.headline,
        description: <p>{f.assign_triage.description}</p>,
        image: {
            src: f.assign_triage.images[0].src,
            alt: f.assign_triage.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'investigate-resolve',
        label: 'Investigate',
        icon: <IconRewindPlay className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'float',
        heading: f.investigate_resolve.headline,
        description: <p>{f.investigate_resolve.description}</p>,
        image: {
            src: f.investigate_resolve.images[0].src,
            alt: f.investigate_resolve.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'target-affected-users',
        label: 'Target users',
        icon: <IconToggle className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-seagreen',
        layout: 'float',
        heading: f.target_affected_users.headline,
        description: <p>{f.target_affected_users.description}</p>,
        image: {
            src: f.target_affected_users.images[0].src,
            alt: f.target_affected_users.images[0].alt,
            glow: true,
        },
    },
    // MCP lives under Applications (Editor workflow) – avoid a second nearly-identical slide here.
]
