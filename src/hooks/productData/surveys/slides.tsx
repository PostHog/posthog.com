import React from 'react'
import {
    IconBrowser,
    IconMessage,
    IconApps,
    IconTarget,
    IconDecisionTree,
    IconExternal,
    IconCode,
    IconPhone,
    IconPeople,
    IconRocket,
    IconGraph,
} from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import Glow from 'components/Glow'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { features as f } from './features'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import PlatformInstall from 'components/PlatformInstall'

/**
 * Applications = workflows / ways you show up to the product.
 * Capability detail belongs in `topFeatures`.
 */
export const applications: CarouselSlide[] = [
    {
        slug: 'editor-mcp',
        label: 'Editor / MCP',
        icon: <IconBrowser className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-salmon',
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
        slug: 'launch',
        label: 'Launch',
        icon: <IconRocket className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Pick a template, ask one good question, ship it',
        description: (
            <>
                <p>
                    Start from an NPS, PMF, CSAT, or freeform template – or build from scratch. Multiple choice,
                    ratings, emoji reactions, and free text are all available, and you can end with a link to book a
                    user interview or send people somewhere else.
                </p>
                <p>
                    No-code popovers and feedback buttons work with PostHog.js. Prefer a custom UI? Use the Surveys API
                    against the same backend.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Templates',
                                description: f.templates.description,
                            },
                            {
                                label: 'Question types',
                                description: f.question_types.description,
                            },
                            {
                                label: 'Presentation',
                                description: f.presentation_options.description,
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            src: f.templates.images[0].src,
            alt: f.templates.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'target',
        label: 'Target',
        icon: <IconTarget className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Ask the right people at the right moment',
        description: (
            <>
                <p>{f.display_conditions.description}</p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'URL or person properties',
                                description: 'Show a survey on a specific page or only to a matching segment.',
                            },
                            {
                                label: 'Feature flags',
                                description:
                                    'Connect a survey to a flag so beta users get asked about the change they just saw.',
                            },
                            {
                                label: 'Events & wait periods',
                                description:
                                    'Trigger when an event fires, optionally once, and set a delay so you do not annoy new users.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            src: f.display_conditions.images[0].src,
            alt: f.display_conditions.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'analyze',
        label: 'Analyze',
        icon: <IconGraph className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Read the answers, then dig into context',
        description: (
            <>
                <p>
                    See feedback summarized and broken down per response, send realtime replies to Slack or a CDP
                    destination, then jump into Product Analytics or Session Replay for the same people.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Aggregated results',
                                description:
                                    'Response distributions, average scores, and trends without exporting CSV.',
                            },
                            {
                                label: 'Partial responses',
                                description:
                                    'Log answers to individual questions as they come in – not only on survey completion.',
                            },
                            {
                                label: 'Pairs with Product Analytics & Session Replay',
                                description:
                                    'Break down scores over time, or watch the session around the response for full context.',
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
]

export const topFeatures: CarouselSlide[] = [
    {
        slug: 'question-types',
        label: 'Question types',
        icon: <IconMessage className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-salmon',
        layout: 'float',
        heading: f.question_types.headline,
        description: <p>{f.question_types.description}</p>,
        image: {
            src: f.question_types.images[0].src,
            alt: f.question_types.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'templates',
        label: 'Templates',
        icon: <IconApps className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'float',
        heading: f.templates.headline,
        description: <p>{f.templates.description}</p>,
        image: {
            src: f.templates.images[0].src,
            alt: f.templates.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'display-conditions',
        label: 'Display conditions',
        icon: <IconTarget className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'float',
        heading: f.display_conditions.headline,
        description: <p>{f.display_conditions.description}</p>,
        image: {
            src: f.display_conditions.images[0].src,
            alt: f.display_conditions.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'presentation-options',
        label: 'Presentation',
        icon: <IconBrowser className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'float',
        heading: f.presentation_options.headline,
        description: <p>{f.presentation_options.description}</p>,
        image: {
            src: f.presentation_options.images[0].src,
            alt: f.presentation_options.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'multi-step',
        label: 'Multi-step',
        icon: <IconDecisionTree className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-orange',
        layout: 'float',
        heading: f.multi_step.headline,
        description: <p>{f.multi_step.description}</p>,
        image: {
            src: f.multi_step.images[0].src,
            alt: f.multi_step.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'link-somewhere',
        label: 'Link somewhere',
        icon: <IconExternal className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-seagreen',
        layout: 'float',
        heading: f.link_somewhere.headline,
        description: <p>{f.link_somewhere.description}</p>,
        image: {
            src: f.link_somewhere.images[0].src,
            alt: f.link_somewhere.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'no-code-api',
        label: 'No-code & API',
        icon: <IconCode className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'float',
        heading: f.no_code_api.headline,
        description: <p>{f.no_code_api.description}</p>,
        image: {
            src: f.no_code_api.images[0].src,
            alt: f.no_code_api.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'supported-platforms',
        label: 'Platforms',
        icon: <IconPhone className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-salmon',
        layout: 'stack',
        heading: f.supported_platforms.headline,
        description: (
            <>
                <p>{f.supported_platforms.description}</p>
                {f.supported_platforms.children}
            </>
        ),
    },
    {
        slug: 'more-features',
        label: 'More',
        icon: <IconPeople className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: f.more_features.headline,
        description: (
            <div className="@container">
                <LabeledList
                    items={f.more_features.features.map((item) => ({
                        label: item.title,
                        description: item.description,
                    }))}
                />
            </div>
        ),
    },
    // MCP lives under Applications (Editor workflow) – avoid a second nearly-identical slide here.
]
