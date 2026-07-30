import React from 'react'
import { IconBrowser, IconClock, IconDecisionTree, IconPlug, IconSend } from '@posthog/icons'
import { IconEnvelope } from 'components/OSIcons'
import CloudinaryImage from 'components/CloudinaryImage'
import Glow from 'components/Glow'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { features as f } from './features'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import PlatformInstall from 'components/PlatformInstall'

/**
 * Applications = ways you show up to the product.
 * Only MCP has existing content ready for a slide — other application slides
 * (web app, etc.) are left for copy follow-up.
 */
export const applications: CarouselSlide[] = [
    {
        slug: 'editor-mcp',
        label: 'Editor / MCP',
        icon: <IconBrowser className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-teal',
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
    // TODO: web-app / other application slides — needs copy (see migration gaps).
]

/**
 * Top features carousel — restructured from the previous features array only.
 */
export const topFeatures: CarouselSlide[] = [
    {
        slug: 'workflow-builder',
        label: 'Builder',
        icon: <IconDecisionTree className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-teal',
        layout: 'float',
        heading: f.workflow_builder.headline,
        description: (
            <>
                <p>{f.workflow_builder.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.workflow_builder.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.workflow_builder.images[0].src,
            alt: f.workflow_builder.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'messaging',
        label: 'Messaging',
        icon: <IconEnvelope className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'float',
        heading: f.messaging.headline,
        description: (
            <>
                <p>{f.messaging.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.messaging.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.messaging.images[0].src,
            alt: f.messaging.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'flow-logic',
        label: 'Flow logic',
        icon: <IconClock className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-orange',
        layout: 'float',
        heading: f.flow_logic.headline,
        description: (
            <>
                <p>{f.flow_logic.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.flow_logic.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.flow_logic.images[0].src,
            alt: f.flow_logic.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'channels',
        label: 'Channels',
        icon: <IconSend className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'float',
        heading: f.channels.headline,
        description: (
            <>
                <p>{f.channels.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.channels.features.map((item) => ({
                            label: item.title,
                            description: item.description ?? '',
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.channels.images[0].src,
            alt: f.channels.images[0].alt,
            glow: true,
        },
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
