import React from 'react'
import {
    IconBrowser,
    IconPieChart,
    IconTrends,
    IconPulse,
    IconSparkles,
    IconShield,
    IconGlobe,
    IconGraph,
    IconPlug,
} from '@posthog/icons'
import CloudinaryImage from 'components/CloudinaryImage'
import Glow from 'components/Glow'
import Link from 'components/Link'
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
        progressBar: 'bg-green',
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
    // Additional applications slides need copy — see content gaps.
]

export const topFeatures: CarouselSlide[] = [
    {
        slug: 'core-metrics',
        label: 'Core metrics',
        icon: <IconPieChart className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'float',
        heading: f.core_metrics.headline,
        description: (
            <>
                <p>{f.core_metrics.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.core_metrics.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.core_metrics.images[0].src,
            alt: f.core_metrics.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'traffic-sources',
        label: 'Traffic sources',
        icon: <IconTrends className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'float',
        heading: f.traffic_sources.headline,
        description: (
            <>
                <p>{f.traffic_sources.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.traffic_sources.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        // Local static image only (`/images/products/web-analytics/top-referrers.jpg`) —
        // CarouselSlide uses CloudinaryImage, so omit until a Cloudinary URL exists.
    },
    {
        slug: 'web-vitals',
        label: 'Web vitals',
        icon: <IconPulse className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-orange',
        layout: 'float',
        heading: f.web_vitals.headline,
        description: (
            <>
                <p>
                    Track LCP, FCP, INP, and CLS for performance optimization. Also available in PostHog Toolbar.{' '}
                    <Link
                        state={{ newWindow: true }}
                        to="/docs/web-analytics/web-vitals"
                        className="font-bold underline"
                    >
                        What do all these silly acronyms mean?
                    </Link>
                </p>
                <div className="@container">
                    <LabeledList
                        items={f.web_vitals.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: {
            src: f.web_vitals.images[0].src as `https://res.cloudinary.com/${string}`,
            alt: f.web_vitals.images[0].alt,
            glow: true,
        },
    },
    {
        slug: 'advanced-analytics',
        label: 'Advanced',
        icon: <IconSparkles className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: f.advanced_analytics.headline,
        description: (
            <>
                <p>{f.advanced_analytics.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.advanced_analytics.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'privacy',
        label: 'Privacy',
        icon: <IconShield className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-seagreen',
        layout: 'stack',
        heading: f.privacy.headline,
        description: (
            <>
                <p>{f.privacy.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.privacy.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'demographics',
        label: 'Audience',
        icon: <IconGlobe className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: f.demographics.headline,
        description: (
            <>
                <p>{f.demographics.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.demographics.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        // Local static image only (`/images/products/web-analytics/world-map.jpg`) —
        // CarouselSlide uses CloudinaryImage, so omit until a Cloudinary URL exists.
    },
    {
        slug: 'product-analytics',
        label: 'Product analytics',
        icon: <IconGraph className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: f.works_with_product_analytics.headline,
        description: (
            <>
                <p>{f.works_with_product_analytics.description}</p>
                <div className="@container">
                    <LabeledList
                        items={f.works_with_product_analytics.features.map((item) => ({
                            label: item.title,
                            description: item.description,
                        }))}
                    />
                </div>
            </>
        ),
        image: { ref: 'home', glow: true },
    },
    {
        slug: 'mcp',
        label: 'MCP',
        icon: <IconPlug className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
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
