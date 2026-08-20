import React from 'react'
import { IconBrackets, IconBrowser, IconClock, IconDecisionTree, IconLaptop, IconPlug, IconSend } from '@posthog/icons'
import { IconEnvelope } from 'components/OSIcons'
import CloudinaryImage from 'components/shared/media/CloudinaryImage'
import Glow from 'components/shared/animation/Glow'
import Link from 'components/shared/ui/Link'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { features as f } from './features'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import PlatformInstall from 'components/PlatformInstall'

/**
 * Applications = ways you show up to the product.
 * Copy reshaped from contents/docs/workflows (index + surfaces/*.mdx).
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
    {
        slug: 'web-app',
        label: 'Web app',
        icon: <IconLaptop className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Build workflows in the drag-and-drop builder',
        description: (
            <>
                <p>
                    The{' '}
                    <Link
                        to="/docs/workflows/surfaces/web-app"
                        state={{ newWindow: true }}
                        className="underline font-semibold"
                    >
                        PostHog web app
                    </Link>{' '}
                    is where workflows are built – the drag-and-drop builder, the content library where message
                    templates live, your channels, and your opt-out and suppression lists.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Build a workflow',
                                description:
                                    'Start from a trigger – an event, a webhook, a tracking pixel, a schedule, or a manual run – then add delays, audience splits, message dispatches, and PostHog actions until you reach an exit.',
                            },
                            {
                                label: 'Work in drafts, then publish',
                                description:
                                    'A workflow stays a draft until you enable it, so you can build and test without anyone receiving a message.',
                            },
                            {
                                label: 'Design message templates',
                                description:
                                    'Compose emails and other messages in the content library, personalize them with person properties, and reuse them across workflows.',
                            },
                            {
                                label: 'Manage channels & opt-outs',
                                description:
                                    'Verify a sending domain and connect email, Slack, or any real-time destination. Review message categories, recipient preferences, and the suppression list.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            ref: 'builder',
            maxWidth: 'max-w-none',
            containerClassName: 'pb-0 leading-[0]',
            imgClassName: 'border-b-0 rounded-b-none',
        },
    },
    {
        slug: 'api',
        label: 'API',
        icon: <IconBrackets className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-seagreen',
        layout: 'stack',
        heading: 'Manage workflows over the REST API',
        description: (
            <>
                <p>
                    Workflows are stored as hog flows and available over the PostHog{' '}
                    <Link
                        to="/docs/workflows/surfaces/api"
                        state={{ newWindow: true }}
                        className="underline font-semibold"
                    >
                        REST API
                    </Link>
                    . Use it when you want workflows under version control, generated from your own system, or created
                    as part of a deploy.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Manage workflows',
                                description:
                                    'List, create, read, update, and delete workflows – including their trigger, graph of actions, and enabled state.',
                            },
                            {
                                label: 'Reuse templates',
                                description:
                                    'Cover the workflow templates in your project via the hog flow templates API.',
                            },
                            {
                                label: 'Check blast radius before you publish',
                                description:
                                    "The API can report how many people a workflow's audience filters would match, so you don't accidentally message everyone.",
                            },
                            {
                                label: 'Inspect runs',
                                description:
                                    'Batch job status endpoints report on workflows triggered against a batch audience.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
    },
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
