import React from 'react'
import {
    IconBrowser,
    IconToggle,
    IconCode,
    IconTarget,
    IconBolt,
    IconFlask,
    IconPlug,
    IconRocket,
    IconSearch,
} from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import Glow from 'components/Glow'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { features as f } from './features'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import PlatformInstall from 'components/PlatformInstall'

/**
 * Applications = workflows / ways you show up to the product (like session replay's
 * Editor / Search / Browse). Capability detail belongs in `topFeatures`.
 */
export const applications: CarouselSlide[] = [
    {
        slug: 'editor-mcp',
        label: 'Editor / MCP',
        icon: <IconBrowser className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-seagreen',
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
        slug: 'ship',
        label: 'Ship',
        icon: <IconRocket className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Wrap the change, start small, then ramp up',
        description: (
            <>
                <p>
                    Open Feature Flags, create a flag, and put it around the new code. Start at 1–5%, watch metrics and
                    session replays for that cohort, then increase the percentage when you're confident – or turn the
                    flag off instantly if something breaks. No redeploy required for the kill switch.
                </p>
                <p>Same flow for canaries and internal dogfooding: target your team's emails first, then open it up.</p>
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
        icon: <IconSearch className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'When a rollout looks wrong, dig in',
        description: (
            <>
                <p>
                    Release a feature to 10% of users, then filter analytics by that flag. Conversion dropped? Watch
                    session replays for just those users. See the problem, fix it, roll out wider – same person
                    properties and flag values across the stack.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Filter by flag',
                                description: 'Run insights or funnels limited to a flag value or variant.',
                            },
                            {
                                label: 'Watch the cohort',
                                description: 'Open matching session replays for the people who got the change.',
                            },
                            {
                                label: 'Confirm evaluation',
                                description: 'Check who hit the flag, override locally, or toggle it in the toolbar.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            ref: 'release-conditions',
            maxWidth: 'max-w-none',
            containerClassName: 'pb-0 leading-[0]',
            imgClassName: 'border-b-0 rounded-b-none',
        },
    },
]

export const topFeatures: CarouselSlide[] = [
    {
        slug: 'boolean-multivariate',
        label: 'Boolean & multivariate',
        icon: <IconToggle className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-seagreen',
        layout: 'float',
        heading: f.boolean_multivariate.headline,
        description: (
            <>
                <p>{f.boolean_multivariate.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.more_features.features
                            .filter((item) =>
                                ['Instant rollbacks', 'Persist flags across authentication'].includes(item.title)
                            )
                            .map((item) => ({
                                label: item.title,
                                description: item.description,
                            }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.boolean_multivariate.images[0].src,
            alt: f.boolean_multivariate.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'payloads',
        label: 'Payloads',
        icon: <IconCode className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: f.payloads.headline,
        description: (
            <>
                <p>{f.payloads.description}</p>
                {f.payloads.children}
            </>
        ),
    },
    {
        slug: 'release-conditions',
        label: 'Release conditions',
        icon: <IconTarget className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'float',
        heading: f.release_conditions.headline,
        description: (
            <>
                <p>{f.release_conditions.description}</p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: f.early_access.title,
                                description: f.early_access.description,
                            },
                            {
                                label: f.automation.title,
                                description: f.automation.description,
                            },
                            {
                                label: 'Multi-environment support',
                                description: f.more_features.features.find(
                                    (item) => item.title === 'Multi-environment support'
                                )?.description,
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            src: f.release_conditions.images[0].src,
            alt: f.release_conditions.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'performance',
        label: 'Performance',
        icon: <IconBolt className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: f.local_evaluation.headline,
        description: (
            <>
                <p>{f.local_evaluation.description}</p>
                {f.local_evaluation.children}
                <h3 className="mt-8 mb-2">{f.bootstrapping.headline}</h3>
                <p>{f.bootstrapping.description}</p>
                {f.bootstrapping.children}
            </>
        ),
    },
    {
        slug: 'testing',
        label: 'Testing',
        icon: <IconFlask className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-orange',
        layout: 'stack',
        heading: f.testing.headline,
        description: (
            <>
                <p>{f.testing.description}</p>
                {f.testing.children}
                <div className="@container mt-8">
                    <LabeledList
                        items={f.more_features.features
                            .filter((item) =>
                                ['History & activity feed', 'Flag administration', 'SDKs or API'].includes(item.title)
                            )
                            .map((item) => ({
                                label: item.title,
                                description: item.description,
                            }))}
                    />
                </div>
            </>
        ),
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
