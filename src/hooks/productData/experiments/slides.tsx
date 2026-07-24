import React from 'react'
import {
    IconBrowser,
    IconFlask,
    IconTarget,
    IconGraph,
    IconCode,
    IconPlug,
    IconPieChart,
    IconRocket,
    IconSearch,
    IconCheckCircle,
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
        progressBar: 'bg-purple',
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
        slug: 'run',
        label: 'Run a test',
        icon: <IconRocket className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Start simple with a clear metric',
        description: (
            <>
                <p>
                    Create the experiment – which automatically creates a feature flag – then implement the flag check
                    in your code. Launch to a slice of users and watch probability estimates roll in. Pick funnels like
                    a signup flow, single events such as revenue, or advanced metrics like ratios.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'A/B & A/B/n tests',
                                description: f.supported_tests.features.find((item) => item.title === 'A/B testing')
                                    ?.description,
                            },
                            {
                                label: 'Targeting',
                                description: f.targeting_rules.headline,
                            },
                            {
                                label: 'Primary & secondary metrics',
                                description: f.experiment_types.features.find(
                                    (item) => item.title === 'Primary & secondary metrics'
                                )?.description,
                            },
                        ]}
                    />
                </div>
            </>
        ),
        image: {
            ref: 'overview',
            maxWidth: 'max-w-none',
            containerClassName: 'pb-0 leading-[0]',
            imgClassName: 'border-b-0 rounded-b-none',
        },
    },
    {
        slug: 'analyze',
        label: 'Analyze',
        icon: <IconSearch className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Read the numbers, then watch the sessions',
        description: (
            <>
                <p>
                    Bayesian and frequentist engines give statistically rigorous results so you can decide with
                    confidence. When you need the why behind a variant, jump into session recordings for that test
                    group, or dig deeper in product analytics than your primary metric alone.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Bayesian',
                                description: f.statistical_methods.bayesian.subtitle,
                            },
                            {
                                label: 'Frequentist',
                                description: f.statistical_methods.frequentist.subtitle,
                            },
                            {
                                label: 'Session Replay',
                                description:
                                    "Watch recordings of users in a variant to discover nuances in why they did or didn't complete the goal",
                            },
                            {
                                label: 'Product Analytics',
                                description:
                                    'Run analysis based on the value of a test, or build a cohort of users from a test variant',
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
        slug: 'ship',
        label: 'Ship the winner',
        icon: <IconCheckCircle className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-seagreen',
        layout: 'stack',
        heading: 'Roll out the winner on the same flag',
        description: (
            <>
                <p>
                    Results live in one platform, so you can check whether a change actually worked and ship the winner.
                    If the experiment wins, roll it out gradually using the same feature flag – including JSON payloads
                    for each variant – without jumping between tools.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Feature Flags',
                                description:
                                    'Make changes to the feature flag the experiment uses - including JSON payload for each variant',
                            },
                            {
                                label: 'Holdout testing',
                                description: f.supported_tests.features.find((item) => item.title === 'Holdout testing')
                                    ?.description,
                            },
                            {
                                label: 'Shared metrics library',
                                description: 'Create consistent, reusable metrics across all experiments',
                            },
                        ]}
                    />
                </div>
            </>
        ),
    },
]

export const topFeatures: CarouselSlide[] = [
    {
        slug: 'experiment-types',
        label: 'Metrics',
        icon: <IconGraph className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: f.experiment_types.headline,
        description: (
            <>
                <p>{f.experiment_types.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.experiment_types.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
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
        slug: 'supported-tests',
        label: 'Test types',
        icon: <IconFlask className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: f.supported_tests.headline,
        description: (
            <>
                <div className="@container">
                    <LabeledList
                        items={f.supported_tests.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'targeting',
        label: 'Targeting',
        icon: <IconTarget className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'float',
        heading: f.targeting_rules.headline,
        description: (
            <>
                <div className="@container">
                    <LabeledList
                        items={f.targeting_rules.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.targeting_rules.images[0].src,
            alt: f.targeting_rules.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'metrics',
        label: 'Custom metrics',
        icon: <IconPieChart className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-seagreen',
        layout: 'float',
        heading: f.customizable_metrics.headline,
        description: <p>{f.customizable_metrics.description}</p>,
        image: {
            src: f.customizable_metrics.images[0].src,
            alt: f.customizable_metrics.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'stats',
        label: 'Statistics',
        icon: <IconPieChart className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: f.statistical_methods.headline,
        description: (
            <>
                <p>{f.statistical_methods.description}</p>
                <div className="@container space-y-8">
                    <div>
                        <h3 className="text-xl font-bold text-purple mb-1">Bayesian</h3>
                        <p className="text-secondary mb-3">{f.statistical_methods.bayesian.subtitle}</p>
                        <LabeledList
                            items={[
                                ...f.statistical_methods.bayesian.whatItTells.map((item) => ({
                                    label: item.term,
                                    description: item.description,
                                })),
                                ...f.statistical_methods.bayesian.advantages.map((advantage) => ({
                                    label: 'Advantage',
                                    description: advantage,
                                })),
                                ...f.statistical_methods.bayesian.bestFor.map((item) => ({
                                    label: 'Best for',
                                    description: item,
                                })),
                            ]}
                        />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-blue mb-1">Frequentist</h3>
                        <p className="text-secondary mb-3">{f.statistical_methods.frequentist.subtitle}</p>
                        <LabeledList
                            items={[
                                ...f.statistical_methods.frequentist.whatItTells.map((item) => ({
                                    label: item.term,
                                    description: item.description,
                                })),
                                ...f.statistical_methods.frequentist.advantages.map((advantage) => ({
                                    label: 'Advantage',
                                    description: advantage,
                                })),
                                ...f.statistical_methods.frequentist.bestFor.map((item) => ({
                                    label: 'Best for',
                                    description: item,
                                })),
                            ]}
                        />
                    </div>
                </div>
            </>
        ),
    },
    {
        slug: 'developer',
        label: 'SDKs',
        icon: <IconCode className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: f.developer_friendly.headline,
        description: (
            <>
                <p>{f.developer_friendly.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.developer_friendly.features.map((item) => ({
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
