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
} from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import Glow from 'components/Glow'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { features as f } from './features'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import PlatformInstall from 'components/PlatformInstall'

/**
 * Applications = workflows / ways you show up to the product.
 * Only MCP exists in source content today – remaining application slides are a content gap.
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
