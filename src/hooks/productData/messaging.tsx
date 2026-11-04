import React from 'react'
import {
    IconChat,
    IconCheckCircle,
    IconConfetti,
    IconCursorClick,
    IconEye,
    IconInfo,
    IconList,
    IconMagic,
    IconMegaphone,
    IconMessage,
    IconPieChart,
    IconRocket,
    IconSparkles,
} from '@posthog/icons'
import { getTool } from '../../data/tools'
import { applications, keyFeatures } from './messaging/slides'

// This data powers the messaging page: broadcasts and drip campaigns, both built and billed through Workflows.
// One Emails meter, one free tier (`sharesFreeTier`), so no rate on this page is hard-coded.

const cloudinary = (name: string) => `https://res.cloudinary.com/dmukukwp6/image/upload/${name}.png`

const YES = true
const NO = false

export const messaging = {
    ...getTool('messaging'),
    Icon: IconMegaphone,
    type: 'messaging',
    // Must be a `Glow` colour, or the hero screenshot loses its glow.
    color: 'blue',
    colorSecondary: 'sky-blue',
    // The docs live under /docs/workflows, so the Docs tab is pointed there explicitly.
    docsSlug: 'workflows',
    teamSlug: 'workflows',
    forumTag: 'workflows',
    sharesFreeTier: 'workflows_emails',
    // The pricing calculator bills this product on the Workflows Emails meter.
    billingType: 'workflows_emails',
    // The Workflows billing product's plan features (push, destinations) read wrong here, so show platform features only.
    hideProductFeatures: true,
    label: 'Emails',
    seo: {
        title: 'Email & Messaging - Marketing automation on your product data | PostHog',
        description:
            'Marketing automation built on your product data. Broadcasts and drip campaigns triggered by events and cohorts, with conversion goals built in. A Customer.io alternative with 10K emails free monthly.',
    },
    overview: {
        title: 'Marketing automation that knows what people did',
        description: '"Send a welcome email on sign-up, then a nudge a day later if they haven’t finished onboarding"',
        eli5: (
            <>
                <p>
                    Email & Messaging is marketing automation inside PostHog: broadcasts and drip campaigns in one
                    place. A broadcast is one email to an audience, now or on a schedule. A drip campaign is a sequence
                    that starts when a person does something and waits, branches, and follows up based on what they do
                    next.
                </p>
                <p>
                    Both run on the events, cohorts, and person properties PostHog already has, so there is nothing to
                    sync. And every message lands on the person, next to what they did after it.
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
            slug: 'key-features',
            name: 'Key features',
            group: 'divided',
            icon: <IconSparkles className="size-4" />,
            props: { slides: keyFeatures },
        },
        { slug: 'ask-anything', name: 'AI prompts', group: 'divided', icon: <IconChat className="size-4" /> },
        {
            slug: 'feature-comparison',
            name: 'Feature comparison',
            group: 'divided',
            icon: <IconList className="size-4" />,
        },
        { slug: 'community', name: 'Questions?', group: 'divided', icon: <IconMessage className="size-4" /> },
        { slug: 'pairs-with', name: 'Pairs with...', hideFromNav: true, icon: <IconConfetti className="size-4" /> },
        { slug: 'getting-started', name: 'Get started', group: 'divided', icon: <IconRocket className="size-4" /> },
    ],
    pricingMenu: [
        { slug: 'plans', name: 'Plans', icon: <IconCheckCircle className="size-4" /> },
        { slug: 'calculator', name: 'Pricing calculator', icon: <IconPieChart className="size-4" /> },
        { slug: 'comparison-summary', name: 'PostHog vs...', icon: <IconList className="size-4" /> },
    ],
    pricingDescription:
        'Broadcasts, drip campaigns, and transactional emails share one meter and one free tier. The first 10,000 emails each month are free, then pricing starts at $0.003/email with volume discounts as usage grows. Push, Slack, and webhook steps bill as destinations.',
    slider: {
        marks: [10000, 1000000, 10000000],
        min: 10000,
        max: 10000000,
    },
    volume: 10000,
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/phone-hog-light.png',
        alt: 'A hedgehog sending a message',
        footerClasses: 'max-w-[360px]',
        classes: 'absolute bottom-0 right-0 w-auto h-auto max-w-[min(90vw,480px)] @2xl:max-w-xl',
    },
    hogs: {
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_hog_791169c2d0.png',
            alt: 'A hedgehog sending a message',
        },
        mobileHog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_066caea85f.png',
            alt: 'A hedgehog sending a message',
        },
    },
    // Slides point at these entries by key.
    screenshots: {
        home: {
            src: cloudinary('messaging_hero_light'),
            srcDark: cloudinary('messaging_hero_dark'),
            alt: 'An onboarding drip campaign on the workflow canvas, with how many people reached each step',
            classes: 'justify-center px-4 @lg:px-6',
            imgClasses: 'rounded-tl-md rounded-tr-md shadow-2xl',
        },
        dripCampaign: {
            src: cloudinary('messaging_drip_campaign_light'),
            srcDark: cloudinary('messaging_drip_campaign_dark'),
            alt: 'A wait step that branches on whether the person uploaded a file',
        },
        trigger: {
            src: cloudinary('messaging_trigger_light'),
            srcDark: cloudinary('messaging_trigger_dark'),
            alt: 'A workflow trigger on the signed_up event with a volume estimate',
        },
        broadcasts: {
            src: cloudinary('messaging_broadcasts_light'),
            srcDark: cloudinary('messaging_broadcasts_dark'),
            alt: 'Sent and scheduled broadcasts with delivery, open, click, and conversion counts',
        },
        results: {
            src: cloudinary('messaging_broadcast_results_light'),
            srcDark: cloudinary('messaging_broadcast_results_dark'),
            alt: 'A sent broadcast with delivery, open, click, and conversion rates',
        },
        audience: {
            src: cloudinary('messaging_audience_light'),
            srcDark: cloudinary('messaging_audience_dark'),
            alt: 'A broadcast audience filtered by person properties, with its estimated reach',
        },
        emailEditor: {
            src: cloudinary('messaging_email_editor_light'),
            srcDark: cloudinary('messaging_email_editor_dark'),
            alt: 'A product launch email in the PostHog email editor',
        },
        optOuts: {
            src: cloudinary('messaging_opt_outs_light'),
            srcDark: cloudinary('messaging_opt_outs_dark'),
            alt: 'Message categories and the marketing opt-out list',
        },
        channels: {
            src: cloudinary('messaging_channels_light'),
            srcDark: cloudinary('messaging_channels_dark'),
            alt: 'Email, Slack, and push channels connected in PostHog',
        },
    },
    useCases: {
        rows: [
            [
                'Solo founders and one-person teams',
                'Welcome, onboarding, and win-back emails that run themselves, without a marketing platform or a second copy of your users',
            ],
            [
                'Product engineers',
                'Trigger a sequence from the event you just shipped, and see the sends in the same funnel as the feature',
            ],
            [
                'Growth engineers',
                'Onboarding drips, upgrade nudges, and re-engagement sequences, with the conversion rate next to each step',
            ],
            [
                'Product marketers',
                'Launch announcements and a weekly digest to the right cohort, with opt-outs and the preferences page handled',
            ],
            [
                'Teams on Customer.io or Braze',
                'Move campaigns and opt-out lists over and stop paying for a sync between your product data and your messaging tool',
            ],
        ],
    },
    ai: {
        intro: 'Ask PostHog AI, or your coding agent over MCP, to build campaigns, write the emails, and read the results.',
        copyPrompts: true,
        groups: [
            {
                title: 'Build',
                prompts: [
                    'Build an onboarding sequence: welcome email on sign-up, then a nudge a day later to anyone who hasn’t created a project.',
                    'Create a weekly digest broadcast for active users, every Monday at 9am in their timezone.',
                ],
            },
            {
                title: 'Write',
                prompts: [
                    'Write a win-back email for people who haven’t logged in for 30 days, in our brand voice, with a merge tag for their name.',
                    'Rewrite the step 2 email to be shorter, with one call to action.',
                ],
            },
            {
                title: 'Measure',
                prompts: [
                    'Which step of the onboarding campaign do most people drop off at?',
                    'Compare the conversion rate of last week’s launch broadcast against the one before it.',
                ],
            },
        ],
    },
    /**
     * Competitor columns checked against official vendor docs on 2026-11-04 (Customer.io, Braze, Brevo help centers and pricing pages).
     * Values are in column order: PostHog, Customer.io, Braze, Brevo.
     */
    comparison: {
        summary: {
            them: [
                { title: 'You need WhatsApp, in-app messages, or dedicated IPs today' },
                { title: 'You send tens of millions of marketing messages a month and want an enterprise contract' },
                { title: 'You only want an email tool and nothing else from PostHog' },
            ],
            us: [
                { title: 'You already track events in PostHog and want to message on them without a sync' },
                { title: 'You want the conversion rate of a campaign, not only its open rate' },
                { title: 'You want transactional and marketing email on one sender setup and one bill' },
                { title: 'You want your agent to build the campaign for you' },
            ],
        },
        companies: [
            { name: 'PostHog', key: 'posthog' },
            { name: 'Customer.io', key: 'customer_io' },
            { name: 'Braze', key: 'braze' },
            { name: 'Brevo', key: 'brevo' },
        ],
        rows: [
            { label: 'Campaigns', description: 'Building and sending' },
            { label: 'Broadcasts', values: [YES, YES, YES, YES] },
            { label: 'Drip campaigns with branching', values: [YES, YES, YES, YES] },
            { label: 'Trigger on a product event', values: [YES, YES, YES, YES] },
            { label: 'Random split for A/B tests', values: [YES, YES, YES, YES] },
            { label: 'Build with an AI agent over MCP', values: [YES, YES, 'Beta', 'Email only'] },
            { label: 'Data', description: 'Who you can target' },
            {
                label: 'Same events as your analytics',
                description: 'No second SDK or sync to keep in step',
                values: [YES, NO, NO, NO],
            },
            { label: 'Cohorts from your analytics', values: [YES, 'Via sync', 'Via sync', NO] },
            { label: 'Results', description: 'What the message did' },
            { label: 'Open and click rates', values: [YES, YES, YES, YES] },
            { label: 'Conversion goals per campaign', values: [YES, YES, YES, YES] },
            {
                label: 'Messages in product funnels and replays',
                description: 'Sends as events on the person',
                values: [YES, NO, NO, NO],
            },
            { label: 'Channels', description: 'Where it goes' },
            { label: 'Email and push', values: [YES, YES, YES, 'Paid plans'] },
            { label: 'Slack and webhooks', values: [YES, YES, 'Webhooks only', 'Webhooks only'] },
            { label: 'Transactional email on the same senders', values: [YES, YES, 'Add-on', YES] },
            { label: 'Public pricing', values: [YES, YES, NO, YES] },
            { label: 'Free tier', values: ['10K emails/month', 'Trial only', 'Trial only', '300 emails/day'] },
        ],
    },
    pairsWith: [
        {
            slug: 'workflows',
            description:
                'Automations from the same triggers: Slack alerts, webhooks, and CRM updates with no email involved',
        },
        {
            slug: 'transactional-emails',
            description: 'Password resets and receipts from your code, on the same senders and the same meter',
        },
        {
            slug: 'product-analytics',
            description:
                'Put a campaign in a funnel with what people did after it, and build the next audience from it',
        },
        {
            slug: 'experiments',
            description: 'Message the people in a variant, or follow up with everyone when a test wins',
        },
        {
            slug: 'session-replay',
            description: 'Watch what a person did after the email, from the send on their timeline',
        },
    ],
    questions: [
        {
            question: 'How do I send a broadcast?',
            url: '/docs/workflows/broadcasts',
        },
        {
            question: 'How do I set up a drip campaign?',
            url: '/docs/workflows/email-drip-campaign',
        },
        {
            question: 'How do triggers, delays, and branches work?',
            url: '/docs/workflows/workflow-builder',
        },
        {
            question: 'How do opt-outs and message categories work?',
            url: '/docs/workflows/opt-outs',
        },
        {
            question: 'How do I personalize emails with merge tags?',
            url: '/docs/workflows/library',
        },
        {
            question: 'Which events do messages capture?',
            url: '/docs/workflows/engagement-events',
        },
    ],
}
