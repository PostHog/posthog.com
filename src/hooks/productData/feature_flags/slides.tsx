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
        slug: 'rollouts',
        label: 'Rollouts',
        icon: <IconRocket className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Ship to a slice of users, then ramp up',
        description: (
            <>
                <p>
                    Wrap new code in a flag and release it on your terms. Start at 1-5%, watch metrics and session
                    replays for that cohort, then increase the percentage when you're confident – or kill the flag
                    instantly if something breaks.
                </p>
                <div className="@container">
                    <LabeledList
                        columns={[1, 2]}
                        items={[
                            {
                                label: 'Phased rollouts',
                                description: 'Ship to a percentage of traffic, monitor, then gradually increase.',
                            },
                            {
                                label: 'Kill switches',
                                description: 'Disable a broken feature without redeploying.',
                            },
                            {
                                label: 'Canary releases',
                                description: 'Validate with a small cohort before everyone else sees it.',
                            },
                            {
                                label: 'Internal testing',
                                description: "Target your team's emails or an internal users cohort first.",
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
        slug: 'targeting',
        label: 'Targeting',
        icon: <IconTarget className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Show the right thing to the right people',
        description: (
            <>
                <p>
                    Target by person or group properties, cohorts, or traffic percentage – including AND/OR logic when
                    you need it specific. Use the same flags for beta opt-ins, entitlements, and remote config payloads
                    so you can change copy or behavior without a deploy.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: f.release_conditions.title,
                                description: f.release_conditions.description,
                            },
                            {
                                label: f.early_access.title,
                                description: f.early_access.description,
                            },
                            {
                                label: f.payloads.title,
                                description:
                                    'JSON payloads let you change text, visuals, or behavior from PostHog without a code deploy.',
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
