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
        title: 'Sources & destinations (ETL) - sync 1,300+ sources into PostHog',
        description:
            'Import from over 1,300 sources, query the data next to your product analytics, and write it onward to Postgres, Snowflake, BigQuery, Redshift, Databricks, S3, or Azure Blob.',
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
        title: 'Sync 1,300+ sources, then send the rows wherever you need them',
        eli5: 'ETL connects the tools your business already runs on, like Stripe, HubSpot, Salesforce, and your own Postgres, and copies their tables into PostHog on a schedule. Query those tables next to your product analytics, and write the same rows onward to your own Postgres, Snowflake, BigQuery, Redshift, Databricks, S3, or Azure Blob. One page shows you every sync, what it moved, and what broke.',
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
                'You maintain connectors nobody thanks you for. Point PostHog at the source instead, and watch the syncs from one page.',
            ],
            [
                'Product engineers',
                'You want revenue next to activation without filing a ticket. Sync Stripe, then join it to your events in SQL.',
            ],
            [
                'Founders and small teams',
                'You cannot justify a separate ETL bill on top of a warehouse bill. Sync the handful of sources you actually use and pay per row.',
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
            description: 'Query everything ETL syncs next to your product analytics, in SQL.',
        },
        {
            slug: 'cdp',
            description: 'Send PostHog events out to other tools as they happen.',
        },
        {
            slug: 'product-analytics',
            description: 'Join synced business data to the events your product already sends.',
        },
    ],
    comparison: {
        summary: {
            them: [
                { title: 'You need a connector we do not have, and you need it this quarter' },
                { title: 'Your warehouse is the centre of your stack and PostHog is one source among many' },
                { title: 'You have a data team who already run dbt and an orchestrator' },
            ],
            us: [
                { title: 'You want your business data next to your product data without running a pipeline' },
                { title: 'You would rather pay per row than per monthly active row' },
                {
                    title: 'You want one page that tells you a sync broke',
                    subtitle: 'Failing tables, rows per destination, and what is running right now',
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
