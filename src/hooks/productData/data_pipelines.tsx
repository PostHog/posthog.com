import React from 'react'
import {
    IconChat,
    IconConfetti,
    IconCursorClick,
    IconDecisionTree,
    IconEye,
    IconInfo,
    IconList,
    IconMagic,
    IconMessage,
    IconPieChart,
    IconRocket,
    IconSparkles,
    IconCheckCircle,
} from '@posthog/icons'
import { HedgehogConstruction } from '@posthog/brand/hoggies'
import { getTool } from '../../data/tools'
import { applications, GetStarted, PricingIntro, topFeatures } from './data_pipelines/slides'
import { dataWarehouse } from './data_warehouse'
import { realtimeDestinations } from './realtime_destinations'

// this data powers the data pipelines page. It reuses the CDP tool entry (whose aliases include "Data pipelines").

const YES = true
const NO = false

// Data pipelines bills on two meters, so each pricing section is pointed at one of them with `props.productData`.
// Sources are billed as warehouse rows synced; destinations as realtime events plus batch export rows.
// Neither meter has paid-only product features, so the plans show platform features only.
const sourcesBilling = { ...dataWarehouse, label: 'Sources', hideProductFeatures: true }
const destinationsBilling = { ...realtimeDestinations, label: 'Destinations', hideProductFeatures: true }

const HedgehogCarryingPipe = (props: React.ComponentProps<typeof HedgehogConstruction>) => (
    <HedgehogConstruction variant="2" {...props} />
)

export const dataPipelines = {
    ...getTool('cdp'),
    handle: 'data_pipelines',
    name: 'Data pipelines',
    slug: 'data-pipelines',
    Icon: IconDecisionTree,
    type: 'data_pipelines',
    // Must be a `Glow` colour, or the hero screenshot loses its glow.
    color: 'blue',
    colorSecondary: 'blue',
    docsSlug: 'data-pipelines',
    forumTag: 'cdp-and-pipelines',
    teamSlug: 'warehouse-sources',
    wizardCommand: 'warehouse',
    seo: {
        title: 'Data pipelines – Move your data anywhere | PostHog',
        description:
            'Sync data in from hundreds of tools and databases, transform events as they arrive, and send them to the rest of your stack in real time or in batches.',
    },
    overview: {
        title: 'Move your data anywhere',
        description:
            'Sync data from hundreds of tools and databases, clean it up as it arrives, and send it wherever it needs to go. In real time or on a schedule.',
        eli5: (
            <>
                <p>
                    Data pipelines is how you move data from one place to another. Bring revenue and CRM data from tools
                    like Stripe and HubSpot into PostHog, change events as they arrive, and send them to Slack, your
                    CRM, or your warehouse.
                </p>
                <p>
                    Export your PostHog data (events, persons, sessions, and groups) to an external tool. Use your data
                    to feed the rest of PostHog, or to move data between systems that never touch PostHog at all.
                </p>
            </>
        ),
        textColor: 'text-white', // tw
    },
    productMenu: [
        { slug: 'overview', name: 'Overview', icon: <IconEye className="size-4" /> },
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
        { slug: 'ask-anything', name: 'AI prompts', group: 'divided', icon: <IconChat className="size-4" /> },
        { slug: 'pairs-with', name: 'Pairs with...', hideFromNav: true, icon: <IconConfetti className="size-4" /> },
        {
            slug: 'feature-comparison',
            name: 'Feature comparison',
            group: 'divided',
            icon: <IconList className="size-4" />,
        },
        { slug: 'community', name: 'Questions?', group: 'divided', icon: <IconMessage className="size-4" /> },
        {
            slug: 'get-started',
            name: 'Get started',
            group: 'divided',
            icon: <IconRocket className="size-4" />,
            component: GetStarted,
        },
    ],
    /**
     * Same sections as the other product pricing pages, once per billing meter. Transformations are free,
     * so they have no section.
     */
    pricingMenu: [
        {
            slug: 'sources',
            name: 'Sources',
            template: 'plans',
            icon: <IconCheckCircle className="size-4" />,
            props: {
                productData: sourcesBilling,
                meterName: 'Sources',
                calculatorId: 'sources-calculator',
                intro: <PricingIntro />,
            },
        },
        {
            slug: 'sources-calculator',
            name: 'Sources calculator',
            template: 'calculator',
            icon: <IconPieChart className="size-4" />,
            props: { productData: sourcesBilling },
        },
        {
            slug: 'destinations',
            name: 'Destinations',
            template: 'plans',
            icon: <IconCheckCircle className="size-4" />,
            props: {
                productData: destinationsBilling,
                // The pricing notes column already shows next to Sources.
                hidePricingDetails: true,
                meterName: 'Destinations',
                calculatorId: 'destinations-calculator',
            },
        },
        {
            slug: 'destinations-calculator',
            name: 'Destinations calculator',
            template: 'calculator',
            icon: <IconPieChart className="size-4" />,
            props: { productData: destinationsBilling },
        },
        // Hidden footer CTA rendered at the bottom of the Pricing surface.
        { slug: 'pricing-cta', name: 'Get started', hideFromNav: true },
    ],
    // Shown in the "Still here?" box at the bottom of the Pricing page.
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/construction_hog_80a362973d.png',
        alt: 'A hedgehog in a hard hat building a pipeline',
        footerClasses: 'max-w-[220px]',
    },
    hogs: {
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/construction_hog_80a362973d.png',
            alt: 'A hedgehog in a hard hat building a pipeline',
        },
        // `mobileHog` renders on the Overview hero screenshot.
        mobileHog: {
            Component: HedgehogCarryingPipe,
            alt: 'A hedgehog in a hard hat carrying a pipe',
        },
    },
    screenshots: {
        home: {
            // These two files are named the wrong way round: the "dark" one is the light screenshot.
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_cdp_dark_5610c405b2.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_cdp_light_97bc52e8f9.png',
            alt: 'Data pipelines screenshot',
            classes: 'justify-center items-end px-4 @lg:px-6',
            imgClasses: 'rounded-t shadow-2xl',
        },
    },
    useCases: {
        rows: [
            ['Data Engineers', 'Replace a separate ELT, CDP, and reverse ETL vendor with a single tool'],
            [
                'Product Engineers',
                'Send key events to Slack, Intercom, or an internal service over webhooks, without a queue',
            ],
            [
                'Growth & Marketing',
                'Send conversions to ad platforms and keep CRM contacts up to date with product usage as it happens',
            ],
            [
                'Finance & RevOps',
                "Sync Stripe and CRM data next to product data, and use PostHog's BI tools to build dashboards",
            ],
            [
                'Security & Compliance',
                'Remove PII, hash IDs, and drop junk events at ingestion, before they are stored',
            ],
        ],
    },
    ai: {
        intro: 'Ask PostHog AI to build, check, and fix your pipelines.',
        copyPrompts: true,
        groups: [
            {
                title: 'Sources',
                prompts: [
                    'Connect our Stripe account and sync invoices and subscriptions every hour.',
                    'Which sources failed to sync in the last 24 hours, and why?',
                ],
            },
            {
                title: 'Transformations',
                prompts: [
                    'Write a transformation that removes email addresses from all event properties.',
                    'Add a page_category property to pageviews based on the URL path.',
                ],
            },
            {
                title: 'Destinations',
                prompts: [
                    'Post a message in #sales when a company with more than 50 employees signs up.',
                    'Why is my HubSpot destination returning errors? Fix the mapping.',
                ],
            },
        ],
    },
    /**
     * MOCKUP: the competitor columns are not checked against vendor docs yet – check them before this ships.
     * Values are in column order: PostHog, Segment, Fivetran, Hightouch.
     */
    comparison: {
        companies: [
            { name: 'PostHog', key: 'posthog' },
            { name: 'Segment', key: 'segment' },
            { name: 'Fivetran', key: 'fivetran' },
            { name: 'Hightouch', key: 'hightouch' },
        ],
        rows: [
            { label: 'Sources', description: 'Getting data in' },
            {
                label: 'Managed ELT connectors',
                description: 'SaaS tools and databases, synced on a schedule',
                values: [YES, 'Limited', YES, NO],
            },
            {
                label: 'Postgres CDC',
                description: 'Row-level changes in near real time',
                values: ['Alpha', NO, YES, NO],
            },
            {
                label: 'Product events included',
                description: 'No separate tracking SDK to set up',
                values: [YES, YES, NO, 'Add-on'],
            },
            { label: 'Transformations', description: 'Changing data as it arrives' },
            { label: 'Transform at ingestion', values: [YES, YES, NO, 'Partial'] },
            { label: 'Custom code', values: [YES, YES, 'Partial', 'Partial'] },
            { label: 'Free transformations', description: 'No per-event charge', values: [YES, NO, NO, NO] },
            { label: 'Destinations', description: 'Getting data out' },
            { label: 'Realtime destinations', values: [YES, YES, NO, YES] },
            { label: 'Batch export to a warehouse', values: [YES, YES, YES, YES] },
            {
                label: 'Test with real events',
                description: 'Before you turn it on',
                values: [YES, YES, NO, YES],
            },
            { label: 'In the product', description: 'Using the data after it moves' },
            {
                label: 'Analytics on the same data',
                description: 'Funnels, retention, SQL, and replay',
                values: [YES, NO, NO, NO],
            },
        ],
    },
    pairsWith: [
        {
            slug: 'warehouse',
            description: 'Query synced sources next to your events, or point BI tools at them directly',
        },
        {
            slug: 'product-analytics',
            description: 'Break down funnels and retention by Stripe plan, MRR, or CRM deal stage',
        },
        {
            slug: 'workflows',
            description: 'Trigger emails, Slack messages, and webhooks from the same events',
        },
        {
            slug: 'experiments',
            description: 'Measure experiments on revenue from synced Stripe data, not just clicks',
        },
    ],
}
