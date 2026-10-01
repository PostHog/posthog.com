import React from 'react'
import {
    IconChat,
    IconConfetti,
    IconCursorClick,
    IconDatabase,
    IconEye,
    IconInfo,
    IconList,
    IconMagic,
    IconRocket,
    IconSparkles,
} from '@posthog/icons'
import { features } from './etl/features'
import { applications, topFeatures } from './etl/slides'
import { getTool } from '../../data/tools'

export const etl = {
    ...getTool('etl'),
    Icon: IconDatabase,
    type: 'data_warehouse',
    // ETL has no meter of its own. Rows it syncs are billed on the managed warehouse
    // product, so the calculator and the pricing table read from that one.
    billingType: 'data_warehouse',
    billedWith: 'Managed warehouse',
    teamSlug: 'warehouse-sources',
    color: 'purple',
    colorSecondary: 'lilac',
    seo: {
        title: 'Sources & destinations (ETL) – import data from 1,300+ sources',
        description:
            'Import data from 1,300+ sources, query it alongside your product analytics, and write it to Postgres, Snowflake, BigQuery, Redshift, Databricks, S3, or Azure Blob.',
    },
    /**
     * Sections rendered on the Product surface (`/etl`). Each entry resolves to a section
     * template via `templateRegistry[item.template ?? item.slug]`, so the slug doubles as
     * the lookup key when no explicit `template` is set.
     */
    productMenu: [
        {
            slug: 'overview',
            name: 'Overview',
            icon: <IconEye className="size-4" />,
        },
        {
            slug: 'eli5',
            name: 'What does it do?',
            hideFromNav: true,
            group: 'divided',
            icon: <IconInfo className="size-4" />,
        },
        {
            slug: 'use-cases',
            name: 'Who is it for?',
            hideFromNav: true,
            group: 'divided',
            icon: <IconMagic className="size-4" />,
        },
        {
            slug: 'applications',
            name: 'How do I use it?',
            group: 'divided',
            icon: <IconCursorClick className="size-4" />,
            props: { slides: applications },
        },
        {
            slug: 'top-features',
            name: 'Top features',
            group: 'divided',
            icon: <IconSparkles className="size-4" />,
            props: { slides: topFeatures },
        },
        {
            slug: 'ask-anything',
            name: 'AI prompts',
            group: 'divided',
            icon: <IconChat className="size-4" />,
        },
        {
            slug: 'feature-comparison',
            name: 'Feature comparison',
            group: 'divided',
            icon: <IconList className="size-4" />,
        },
        { slug: 'pairs-with', name: 'Pairs with...', hideFromNav: true, icon: <IconConfetti className="size-4" /> },
        { slug: 'getting-started', name: 'Get started', group: 'divided', icon: <IconRocket className="size-4" /> },
    ],
    overview: {
        title: 'Import data from 1,300+ sources',
        eli5: 'ETL copies tables from tools like Stripe, HubSpot, Salesforce, and your own Postgres into PostHog on a schedule. Once a table is in, you can query it alongside the events your product sends, so revenue and activation are one SQL query rather than an export and a spreadsheet. You can also send the same rows to your own Postgres, Snowflake, BigQuery, Redshift, Databricks, S3, or Azure Blob.',
        textColor: 'text-white',
        layout: 'overlay',
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/products/data-warehouse/warehouse-hog.png',
        alt: 'A hedgehog moving data around',
        classes: 'hidden @2xl:block max-w-sm',
        footerClasses: 'max-w-[240px]',
    },
    screenshots: {
        // TODO before launch: replace with real ETL scene captures, uploaded through the
        // on-site moderator tool. These are the managed warehouse images as a placeholder.
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/dw_temp_528efa76a2.png',
            alt: 'The ETL overview in PostHog',
            classes: 'max-w-5xl mt-auto',
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_data_warehouse_light_b0cdbebe8f.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_data_warehouse_dark_8f465ecfaa.png',
            alt: 'ETL screenshot',
            classes: 'justify-center items-end px-4 @lg:px-6',
            imgClasses: 'rounded-t shadow-2xl',
        },
    },
    useCases: {
        rows: [
            [
                'Data engineers',
                'Connect a source instead of building and maintaining the connector. Sync status for every table is on one page.',
            ],
            [
                'Product engineers',
                'Sync Stripe or HubSpot, then join it to your product events in SQL without waiting on a data team.',
            ],
            [
                'Founders and small teams',
                'Pay per row synced, with the first million free each month. The warehouse is included, so there is no second bill.',
            ],
        ],
    },
    features,
    questions: [
        { question: 'How do I connect a source?', url: '/docs/data-warehouse/sources' },
        { question: 'Where can I write the rows?', url: '/docs/etl/destinations' },
        { question: 'How much does a sync cost?', url: '/docs/etl/pricing' },
        { question: 'A sync stopped. What now?', url: '/docs/data-warehouse/troubleshooting' },
    ],
    pairsWith: [
        {
            slug: 'context-warehouse/managed-warehouse',
            description: 'Query synced tables alongside your product analytics in SQL.',
        },
        {
            slug: 'cdp',
            description: 'Send PostHog events out to other tools as they happen.',
        },
        {
            slug: 'product-analytics',
            description: 'Join synced tables to the events your product sends.',
        },
    ],
    comparison: {
        summary: {
            them: [
                { title: 'You need a connector we do not have yet' },
                { title: 'Your own warehouse is the center of your stack, and PostHog is one source among many' },
                { title: 'You already run dbt and an orchestrator, and want ingestion to fit that setup' },
            ],
            us: [
                { title: 'You want business data alongside product data without running a pipeline' },
                { title: 'You want per-row pricing rather than monthly active rows' },
                {
                    title: 'You want sync status in one place',
                    subtitle: 'Failing tables, rows per destination, and runs in progress',
                },
            ],
        },
        companies: [
            { name: 'Fivetran', key: 'fivetran' },
            { name: 'Airbyte', key: 'airbyte' },
            { name: 'PostHog', key: 'posthog' },
        ],
        rows: ['etl'],
        excluded_sections: ['platform'],
    },
}
