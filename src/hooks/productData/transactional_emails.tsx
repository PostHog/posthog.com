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
    IconMessage,
    IconPieChart,
    IconRocket,
    IconLetter,
    IconSparkles,
} from '@posthog/icons'
import { getTool } from '../../data/tools'
import { applications, keyFeatures } from './transactional_emails/slides'

// This data powers the transactional emails page. The product is sent and billed through Workflows:
// one Emails meter, one free tier (`sharesFreeTier`), so no rate on this page is hard-coded.

const YES = true
const NO = false

export const transactionalEmails = {
    ...getTool('transactional_emails'),
    Icon: IconLetter,
    type: 'transactional_emails',
    // Must be a `Glow` colour, or the hero screenshot loses its glow.
    color: 'teal',
    colorSecondary: 'green-2',
    // The docs live under /docs/workflows, so the Docs tab is pointed there explicitly.
    docsSlug: 'workflows',
    teamSlug: 'workflows',
    forumTag: 'workflows',
    sharesFreeTier: 'workflows_emails',
    // The pricing calculator shows this product as billed with Email & Messaging on the Workflows Emails meter.
    billingType: 'workflows_emails',
    billedWith: 'Email & Messaging',
    billedWithSlug: 'messaging',
    // The Workflows billing product's plan features (push, destinations) read wrong here, so show platform features only.
    hideProductFeatures: true,
    label: 'Emails',
    seo: {
        title: 'Transactional emails - Send password resets and receipts from your code | PostHog',
        description:
            'Send transactional email with one call from the PostHog SDK you already run. Idempotent sends, delivery webhooks, and every email on the person who triggered it. 10K emails free monthly.',
    },
    overview: {
        title: 'Transactional email, on the person who triggered it',
        description: '"Set up a password reset email and write the code that sends it"',
        eli5: (
            <>
                <p>
                    Transactional emails are the one-off emails your product sends when a person does something:
                    password resets, sign-in codes, receipts, and invites. Design the email in PostHog or render it in
                    your code, then send it with one call from the SDK you already use for analytics.
                </p>
                <p>
                    Every send lands on the person who triggered it, next to their events, replays, and flags. So
                    instead of a delivery rate, you see whether the reset email got them back in.
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
        'Transactional and marketing emails share one meter and one free tier. The first 10,000 emails each month are free, then pricing starts at $0.003/email with volume discounts as usage grows.',
    slider: {
        marks: [10000, 1000000, 10000000],
        min: 10000,
        max: 10000000,
    },
    volume: 10000,
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/phone-hog-light.png',
        alt: 'A hedgehog sending an email',
        footerClasses: 'max-w-[360px]',
        classes: 'absolute bottom-0 right-0 w-auto h-auto max-w-[min(90vw,480px)] @2xl:max-w-xl',
    },
    hogs: {
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_hog_791169c2d0.png',
            alt: 'A hedgehog sending an email',
        },
        mobileHog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_066caea85f.png',
            alt: 'A hedgehog sending an email',
        },
    },
    // PLACEHOLDER: reuses the Workflows builder screenshot until the Transactional page is captured.
    screenshots: {
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflow_light_1_7afd43fd88.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflow_dark_1_9ebe26d46e.png',
            alt: 'Transactional emails screenshot',
            classes: 'justify-center px-4 @lg:px-6',
            imgClasses: 'rounded-tl-md rounded-tr-md shadow-2xl',
        },
    },
    useCases: {
        rows: [
            [
                'Backend Engineers',
                'Replace Resend, Postmark, or SendGrid with the PostHog SDK you already run, with one key and one less vendor',
            ],
            [
                'Product Engineers',
                'See whether the reset email was delivered, opened, and clicked on the same person as their session replay',
            ],
            ['Growth teams', 'Measure what people do after a receipt or an invite, down to the event and the revenue'],
            [
                'Teams on Workflows',
                'Keep marketing and product email in one place, on separate queues with separate opt-out rules',
            ],
        ],
    },
    ai: {
        intro: 'Ask PostHog AI, or your coding agent over MCP, to set up, debug, and keep your transactional emails in sync.',
        copyPrompts: true,
        groups: [
            {
                title: 'Set up',
                prompts: [
                    'Create a password reset email with our logo and a reset link, make it transactional, and write the Node.js code that sends it.',
                    'Write the Python code that sends our receipt email after a successful checkout.',
                ],
            },
            {
                title: 'Templates',
                prompts: [
                    'Make our existing welcome email transactional and give me the template ID.',
                    'Rewrite the receipt email in plain language and keep the variables the code sends.',
                ],
            },
            {
                title: 'Debug',
                prompts: [
                    'Why did the invite email to jane@example.com bounce yesterday?',
                    'What is the delivery rate of the sign-in code email over the last 7 days, by sending domain?',
                ],
            },
        ],
    },
    /**
     * MOCKUP: the competitor columns are not checked against vendor docs yet - check them before this ships.
     * Values are in column order: PostHog, Resend, Postmark, SendGrid.
     */
    comparison: {
        summary: {
            them: [
                { title: 'You need dedicated IPs, an SMTP relay, or inbound email parsing' },
                { title: 'You send tens of millions of emails a month and want an infrastructure contract' },
                { title: 'You only want an email API and nothing else from PostHog' },
            ],
            us: [
                { title: 'You already run the PostHog SDK and want one less vendor and one less key' },
                { title: 'You want to see what a person did after the email, not only whether it opened' },
                {
                    title: 'You send marketing and product email too and want one sender setup and one suppression list',
                },
            ],
        },
        companies: [
            { name: 'PostHog', key: 'posthog' },
            { name: 'Resend', key: 'resend' },
            { name: 'Postmark', key: 'postmark' },
            { name: 'SendGrid', key: 'sendgrid' },
        ],
        rows: [
            { label: 'Sending', description: 'Getting the email out' },
            { label: 'Send API with SDKs', values: [YES, YES, YES, YES] },
            {
                label: 'Idempotency keys',
                description: 'A retry never sends twice',
                values: [YES, YES, NO, NO],
            },
            {
                label: 'Status lookup by message ID',
                values: [YES, YES, YES, 'Paid add-on'],
            },
            { label: 'Templates', description: 'Where the email lives' },
            { label: 'Template editor in the dashboard', values: [YES, 'Beta', YES, YES] },
            { label: 'Render in code (React Email, HTML)', values: [YES, YES, YES, YES] },
            { label: 'After delivery', description: 'What the email did' },
            {
                label: 'Sends on the person timeline',
                description: 'Next to events, replays, and flags',
                values: [YES, NO, NO, NO],
            },
            {
                label: 'What happened after',
                description: 'Conversion and revenue after an email',
                values: [YES, NO, NO, NO],
            },
            {
                label: 'Marketing email in the same tool',
                description: 'Separate queue and opt-out rules',
                values: [YES, 'Broadcasts', NO, YES],
            },
            { label: 'Free tier', values: ['10K/month', '3K/month', '100/month', 'Trial only'] },
        ],
    },
    pairsWith: [
        {
            slug: 'messaging',
            description: 'Drip campaigns and broadcasts on the same senders, templates, and meter',
        },
        {
            slug: 'product-analytics',
            description: 'Put sent, delivered, opened, and clicked in a funnel with what the person did next',
        },
        {
            slug: 'session-replay',
            description: 'Watch what a person did after the reset link, from the send on their timeline',
        },
        {
            slug: 'feature-flags',
            description: 'Gate a new email on a flag and roll it out to a cohort before everyone gets it',
        },
    ],
    questions: [
        {
            question: 'How do I send a transactional email?',
            url: '/docs/workflows/transactional-emails',
        },
        {
            question: 'How do I send from Node.js?',
            url: '/docs/workflows/transactional-emails/node',
        },
        {
            question: 'How do I send from Python?',
            url: '/docs/workflows/transactional-emails/python',
        },
        {
            question: 'How do I send from any language with the API?',
            url: '/docs/workflows/transactional-emails/api',
        },
        {
            question: 'How do opt-outs and the suppression list treat transactional email?',
            url: '/docs/workflows/opt-outs',
        },
        {
            question: 'What is the sending allowance?',
            url: '/docs/workflows/sending-reputation',
        },
    ],
}
