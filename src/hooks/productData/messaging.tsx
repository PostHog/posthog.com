import React from 'react'
import {
    IconChat,
    IconCheckCircle,
    IconCode,
    IconConfetti,
    IconDecisionTree,
    IconEye,
    IconInfo,
    IconList,
    IconMagic,
    IconMessage,
    IconPieChart,
    IconRocket,
    IconSend,
    IconSparkles,
} from '@posthog/icons'
import { features } from './workflows/features'
import { transactional } from './messaging/transactional'
import { broadcasts } from './messaging/broadcasts'
import { automations } from './messaging/automation'
import { standout } from './messaging/standout'
import { getTool } from '../../data/tools'
import { PRODUCT_COLORS } from 'constants/productColors'

export const messaging = {
    ...getTool('messaging'),
    Icon: IconSend,
    type: 'messaging',
    teamSlug: 'workflows',
    docsSlug: 'messaging',
    forumTag: 'workflows',
    color: PRODUCT_COLORS.messaging,
    colorSecondary: 'green-2',
    // Billed with Workflows: emails and push are metered on the `workflows_emails` billing product.
    sharesFreeTier: 'workflows_emails',
    includeAddonRates: true,
    // Matches billing API / pricing page (Emails + push and other destinations free tiers + first paid tiers).
    pricingDescription:
        'First 10,000 emails and 10,000 push and other destination dispatches free each month. Then starts at $0.003/email and $0.00075/dispatch, with volume discounts as usage grows.',
    seo: {
        title: 'Messaging – Send email from your product data',
        description:
            'Send transactional email from the PostHog SDK, broadcasts to cohorts, and drip campaigns triggered by events. 10,000 emails a month free.',
    },
    /**
     * Sections rendered on the Product surface (`/messaging`). Each entry
     * resolves to a section template via `templateRegistry[item.template ?? item.slug]`,
     * so the slug doubles as the lookup key when no explicit `template` is set.
     * `props` is passed straight to the resolved section component (used here to
     * feed the carousel templates their slide arrays).
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
            slug: 'email-as-code',
            name: 'Email as code',
            group: 'divided',
            template: 'key-features',
            icon: <IconCode className="size-4" />,
            props: {
                slides: transactional,
                heading: 'Email as code',
                intro: (
                    <p>
                        Write password resets, sign-in codes, receipts, and invites in your codebase, and send them from
                        your backend with one call on the PostHog client.
                    </p>
                ),
            },
        },
        {
            slug: 'broadcasts',
            name: 'Broadcasts',
            group: 'divided',
            template: 'key-features',
            icon: <IconSend className="size-4" />,
            props: {
                slides: broadcasts,
                heading: 'Broadcasts',
                intro: (
                    <p>
                        Send a product update, changelog, or event invite to a cohort in PostHog. There's no list to
                        upload and no sync job to keep running.
                    </p>
                ),
            },
        },
        {
            slug: 'why-posthog',
            name: 'Why PostHog',
            group: 'divided',
            template: 'key-features',
            icon: <IconSparkles className="size-4" />,
            props: {
                slides: standout,
                heading: 'Why PostHog',
                intro: <p>Your email runs on the same data as the rest of your product, so it can do more.</p>,
            },
        },
        {
            slug: 'automations',
            name: 'Automations',
            group: 'divided',
            template: 'key-features',
            icon: <IconDecisionTree className="size-4" />,
            props: {
                slides: automations,
                heading: 'Automations',
                intro: (
                    <p>
                        Build a drip campaign, or any automation that starts from an event, a cohort, or a schedule.
                        Each step can wait, branch on what the person did, or send to any destination.
                    </p>
                ),
            },
        },
        {
            slug: 'ask-anything',
            name: 'AI prompts',
            group: 'divided',
            icon: <IconChat className="size-4" />,
        },
        {
            slug: 'installation',
            name: 'Install',
            group: 'divided',
            icon: <IconCode className="size-4" />,
        },
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
    /**
     * Sections rendered on the Pricing surface (`/messaging/pricing`).
     * Same shape as `productMenu`.
     */
    pricingMenu: [
        { slug: 'plans', name: 'Plans', icon: <IconCheckCircle className="size-4" /> },
        { slug: 'calculator', name: 'Pricing calculator', icon: <IconPieChart className="size-4" /> },
        { slug: 'comparison-summary', name: 'PostHog vs...', icon: <IconList className="size-4" /> },
        // Hidden footer CTA rendered at the bottom of the Pricing surface.
        { slug: 'pricing-cta', name: 'Get started', hideFromNav: true },
    ],
    overview: {
        title: 'Email people based on what they do in your product',
        description: '"Email new sign-ups who haven\'t created a project after two days"',
        eli5: (
            <>
                <p>
                    Messaging sends email, SMS, and push notifications to your users, using the events and cohorts you
                    have in PostHog. Write a password reset as code and send it from your backend, send a launch email
                    to a cohort, or build a drip campaign or a larger automation that also posts to Slack or calls a
                    webhook. Every send, open, and click is an event on the person, so you check if an email worked in
                    the same funnels and replays as everything else. The first 10,000 emails each month are free. After
                    that, 1,000 emails cost $3, with lower rates at higher volume.
                </p>
            </>
        ),
        textColor: 'text-black',
        layout: 'overlay',
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_overview_339c7cd37b.png',
            alt: 'Workflows overview',
            classes: '',
            imgClasses: 'rounded-t-md shadow-2xl max-w-5xl mx-auto',
            classesMobile: 'rounded-t-md',
            imgClassesMobile: '',
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/broadcasts_list_light_50450977b5.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/broadcasts_list_dark_c3d1d672e8.png',
            alt: 'Broadcasts in PostHog with sent, delivered, opened, clicked, and converted counts',
            classes: 'justify-center px-4 @lg:px-6',
            imgClasses: 'rounded-tl-md rounded-tr-md shadow-2xl',
        },
    },
    // Roles reshaped from contents/teams/workflows/index.mdx ICP + pairsWith use cases.
    useCases: {
        rows: [
            [
                'Founders',
                'Send onboarding emails and password resets from one tool, without separate Customer.io and Postmark accounts',
            ],
            [
                'Product Marketers',
                'Send a product update to a cohort you already built, and let people opt out of one category instead of everything',
            ],
            [
                'Growth Engineers',
                'Start an onboarding drip campaign at sign-up and email the people who stall before they activate',
            ],
            [
                'Backend Engineers',
                'Send password resets, sign-in codes, and receipts from the PostHog SDK, without a separate Resend or Postmark account',
            ],
        ],
    },
    features,
    mcp: {
        title: features.mcp.title,
        headline: features.mcp.headline,
        description: features.mcp.description,
    },
    // Description reshaped from contents/docs/workflows/installation.mdx
    installation: {
        title: 'Install',
        headline: 'Install',
        description:
            "You can build broadcasts and drip campaigns in PostHog without an SDK. To send transactional email from your backend, install a PostHog server SDK. It's the same SDK as Product Analytics, so if PostHog is installed already, you're set.",
        productSlug: 'workflows',
        categories: ['backend-languages'],
        // The server SDKs with an email send method, each linked to its send guide.
        hrefs: {
            nodejs: '/docs/messaging/transactional-emails/node',
            python: '/docs/messaging/transactional-emails/python',
            go: '/docs/messaging/transactional-emails/go',
            ruby: '/docs/messaging/transactional-emails/ruby',
            php: '/docs/messaging/transactional-emails/php',
            rust: '/docs/messaging/transactional-emails/rust',
            elixir: '/docs/messaging/transactional-emails/elixir',
        },
    },
    questions: [
        {
            question: 'How do I set up an email drip campaign?',
            url: '/docs/messaging/email-drip-campaign',
        },
        {
            question: 'How do I manage opt-outs and suppressions?',
            url: '/docs/messaging/opt-outs',
        },
        {
            question: 'How do I set up email, SMS, and push?',
            url: '/docs/messaging/automations/workflow-builder',
        },
        {
            question: 'How do I run A/B tests inside workflows?',
            url: '/tutorials/workflows-ab-testing',
        },
        {
            question: 'How do I create emails with PostHog AI?',
            url: '/docs/messaging/create-emails-ai',
        },
        {
            question: 'How do teams use Workflows for customer journeys?',
            url: '/tutorials/complete-workflows-guide',
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: "You send email that doesn't depend on product data",
                },
                {
                    title: 'You only need a newsletter tool',
                },
                {
                    title: 'You need granular permissioning and audit logs for a large org',
                },
            ],
            us: [
                {
                    title: 'You want an agent to build and test email from Claude Code or Cursor',
                },
                {
                    title: 'You want email that runs on your live product data',
                },
                {
                    title: 'You want to see what each person did after your email',
                },
                {
                    title: 'You want 10,000 free emails each month, then $3 per 1,000',
                },
                {
                    title: 'You already use PostHog for analytics, feature flags, or experiments',
                    subtitle: 'and want sends to use the same events and cohorts',
                },
            ],
        },
        // Values from the team's feature matrix (2026-11-18), in column order: PostHog, Resend, Loops, Customer.io.
        // Check the PostHog cells again at GA.
        companies: [
            { name: 'PostHog', key: 'posthog' },
            { name: 'Resend', key: 'resend' },
            { name: 'Loops', key: 'loops' },
            { name: 'Customer.io', key: 'customer_io' },
        ],
        rows: [
            { label: 'Sending' },
            { label: 'Transactional send API', values: ['Beta', true, true, true] },
            { label: 'Official SDKs', values: ['8 (beta)', '9', '4', '4, partial'] },
            { label: 'cc/bcc, attachments, idempotency', values: [true, true, 'Partial', 'Partial'] },
            { label: 'Custom headers and tags', values: [false, true, false, true] },
            { label: 'Batch and scheduled sends', values: [false, true, false, 'Partial'] },
            { label: 'SMTP relay and inbound email', values: [false, true, false, false] },
            { label: 'Delivery webhooks', values: ['Beta', true, true, true] },
            { label: 'React Email', values: [true, true, false, false] },
            { label: 'Dedicated IPs', values: [false, 'Add-on', false, 'Add-on'] },
            { label: 'Campaigns and channels' },
            { label: 'Broadcasts, segments, journey builder', values: [true, true, true, true] },
            { label: 'A/B test with a winner', values: ['Random split', false, true, true] },
            { label: 'Push notifications', values: ['Beta', false, false, true] },
            { label: 'SMS', values: ['Via Twilio', false, false, true] },
            { label: 'Slack, webhooks, other destinations', values: [true, false, false, 'Partial'] },
            { label: 'Product data' },
            { label: 'Email events in funnels and cohorts', values: ['Opt-in', false, 'Partial', 'Partial'] },
            { label: 'Session replay from an email click', values: [false, false, false, false] },
            { label: 'Experiments on a product outcome', values: ['Partial', false, 'Partial', 'Partial'] },
            { label: 'Replay Vision on the session behind a send', values: [true, false, false, false] },
            { label: 'Developer tools' },
            { label: 'MCP server and agent skills', values: [true, true, true, true] },
            { label: 'CLI', values: ['Via MCP tools', true, true, true] },
            { label: 'Pricing' },
            { label: 'Free emails each month', values: ['10,000', '3,000', '4,000', 'None'] },
            { label: 'Price at 100k emails a month', values: ['$210', '$35', '$49', 'About $145'] },
        ],
        excluded_sections: ['platform'],
    },
    pairsWith: [
        {
            slug: 'experiments',
            description: 'Send a different follow-up email, or a survey, to each experiment variant.',
        },
        {
            slug: 'product-analytics',
            description: 'Start a drip campaign from any event you track, and check the result in a funnel.',
        },
        {
            slug: 'feature-flags',
            description: 'Send a different message to each flag variant, or message the people in a new rollout group.',
        },
    ],
    worksWith: ['experiments', 'product-analytics', 'feature-flags'],
    ai: {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/transformer_hedgehog_2a379334d7.png',
        imageAlt: 'A robot hedgehog sending email',
        imageClasses: 'max-w-[360px]',
        description: 'build the email and ship it for you',
        intro: 'Install the PostHog AI plugin in Claude Code, Codex, or Cursor, and your agent loads the right skill from what you ask.',
        // Skills run in a coding agent, and transactional setup edits backend code, so prompts copy instead of opening PostHog AI.
        copyPrompts: true,
        hideSurfaces: true,
        mcpFeatures: ['workflows'],
        skills: [
            'Generates email templates for your content library',
            'Sets up drip campaigns from the triggers, conditions, and actions you describe',
            'Recommends which campaigns to build and when to send them based on your product metrics',
        ],
        // Skill names from products/{messaging,workflows}/skills in the PostHog monorepo.
        groups: [
            {
                title: 'Transactional email',
                tool: 'sending-transactional-emails',
                prompts: [
                    'Send password resets from our Node backend with PostHog',
                    'Send sign-in codes without PostHog logging them',
                    'Move our receipts from Postmark to PostHog',
                ],
            },
            {
                title: 'Broadcasts',
                tool: 'designing-email-templates, building-workflows',
                prompts: [
                    'Design a launch email for the new editor in our brand colors',
                    'Send it Tuesday at 9am to everyone on the old editor',
                ],
            },
            {
                title: 'Drip campaigns',
                tool: 'building-workflows, migrating-from-customer-io',
                prompts: [
                    "Build an onboarding drip campaign: a welcome email at sign-up, and a nudge two days later if they haven't created a project",
                    "Send a win-back email to people who haven't logged in for 30 days",
                    'Move our Customer.io campaigns into PostHog',
                ],
            },
            {
                title: 'Results',
                tool: 'measuring-email-performance',
                prompts: ["How did last week's product update do, and who upgraded after opening it?"],
            },
        ],
    },
    slider: {
        marks: [10000, 1000000, 10000000],
        min: 10000,
        max: 10000000,
    },
    volume: 10000,
    addonSliders: [
        {
            key: 'workflows_destinations',
            label: 'Push and other destinations',
            sliderConfig: {
                marks: [10000, 1000000, 10000000],
                min: 10000,
                max: 10000000,
            },
            volume: 10000,
            unit: 'dispatch',
        },
    ],
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/phone-hog-light.png',
        alt: 'A hedgehog wiring up a workflow',
        footerClasses: 'max-w-[360px]',
        classes: 'absolute bottom-0 right-0 w-auto h-auto max-w-[min(90vw,480px)] @2xl:max-w-xl',
    },
    hogs: {
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_hog_791169c2d0.png',
            alt: 'A hedgehog automating workflows',
        },
        // Perches on the bottom-right of the Overview screenshot.
        mobileHog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_066caea85f.png',
            alt: 'the automator hedgehog',
        },
    },
    videos: {
        automating_onboarding_with_posthog_workflows: {
            title: 'Automating onboarding with PostHog Workflows',
            author: 'Sara Miteva',
            wistia: '9npwnc8sm6',
            chapters: [
                {
                    title: 'Understanding triggers and user targeting',
                    time: 29,
                },
                {
                    title: 'Setting up workflow steps',
                    time: 72,
                },
                {
                    title: 'Incorporating delays and conditions',
                    time: 108,
                },
                {
                    title: 'Customizing user communication',
                    time: 137,
                },
                {
                    title: 'Email editor features',
                    time: 178,
                },
                {
                    title: 'Finalizing the onboarding sequence',
                    time: 229,
                },
            ],
        },
        workflows_space_demo: {
            title: 'PostHog Workflows demo in space',
            author: 'Jordo Dibb',
            wistia: '33f5pyiaxo',
            chapters: [
                {
                    title: 'Building user journeys',
                    time: 67,
                },
                {
                    title: 'Implementing conditional logic',
                    time: 97,
                },
                {
                    title: 'Chaining flows, audience splits, and integrations',
                    time: 184,
                },
            ],
        },
    },
    presenterNotes: {
        overview: '',
    },
}
