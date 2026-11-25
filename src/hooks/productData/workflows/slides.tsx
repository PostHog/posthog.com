import React from 'react'
import {
    IconBrackets,
    IconBrowser,
    IconClock,
    IconDecisionTree,
    IconLaptop,
    IconPlug,
    IconSend,
    IconSparkles,
} from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
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
                <aside className="my-4 @xl/reader-content:mt-2 @xl/reader-content:float-right max-w-[100%_+_1rem] @xl/reader-content:max-w-[300px] @3xl/reader-content:max-w-[360px] @4xl/reader-content:max-w-[440px] @xl/reader-content:ml-8 -mr-4 @2xl/reader-content:-mr-8 @4xl/reader-content:-mr-10">
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
                        to="/docs/workflows/workflow-builder"
                        state={{ newWindow: true }}
                        className="underline font-semibold"
                    >
                        PostHog web app
                    </Link>{' '}
                    is where workflows are built - the drag-and-drop builder and the destinations each step can send to.
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
                                    'A workflow stays a draft until you enable it, so you can build and test it before it runs for anyone.',
                            },
                            {
                                label: 'Connect destinations',
                                description:
                                    'Connect Slack, a webhook, or any real-time destination, and use it from any step.',
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
 * Key features carousel — restructured from the previous features array only.
 */
export const keyFeatures: CarouselSlide[] = [
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
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_complex_canvas_light_6ffea9518c.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_complex_canvas_dark_b696c34697.png',
            alt: 'A workflow with branches and steps on the canvas',
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
    // Copy reshaped from contents/docs/workflows/{ai-tasks,replay-vision}.mdx
    {
        slug: 'ai-steps',
        label: 'AI steps',
        icon: <IconSparkles className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'float',
        heading: 'Hand a step to an agent',
        description: (
            <>
                <p>
                    Some steps need judgment, not a rule. Add an AI step, and the workflow waits for the answer, then
                    continues with it.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Create AI task',
                                description:
                                    'Start an agent with your instructions, the triggering event and person, and the GitHub repositories, connectors, and skills you allow. It can tag a support ticket, open a pull request, or review trial accounts each week.',
                            },
                            {
                                label: 'Replay Vision',
                                description:
                                    'Have Replay Vision watch the session behind the event, then answer a question, categorize it, score it, or summarize it. Branch on the result.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/rv_workflow_canvas_light_bdd322e059.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/rv_workflow_canvas_dark_c31893e45c.png',
            alt: "A workflow that scores each signup's first session with Replay Vision, then branches on the score",
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
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/pp_destinations_picker_light_663523e7cc.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/pp_destinations_picker_dark_9bb8f235ea.png',
            alt: 'The step picker with email, SMS, Slack, webhook, push, and more destinations',
            maxWidth: 'max-w-lg',
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
