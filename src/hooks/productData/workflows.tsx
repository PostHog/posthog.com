import React from 'react'
import {
    IconChat,
    IconCheckCircle,
    IconCode,
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
} from '@posthog/icons'
import { features } from './workflows/features'
import { applications, keyFeatures } from './workflows/slides'
import { getTool } from '../../data/tools'
import { PRODUCT_COLORS } from 'constants/productColors'
import hedgehogMailboxPng from 'hoggies/mailbox.png'
import hedgehogTransformerPng from 'hoggies/transformer.png'
import hedgehogWorkflowsPng from 'hoggies/workflows.png'

export const workflows = {
    ...getTool('workflows_emails'),
    productVariantName: 'Emails',
    Icon: IconDecisionTree,
    type: 'workflows_emails',
    teamSlug: 'workflows',
    forumTag: 'workflows',
    color: PRODUCT_COLORS.workflows_emails,
    colorSecondary: 'green-2',
    includeAddonRates: true,
    // Matches billing API / pricing page (Emails + push and other destinations free tiers + first paid tiers).
    pricingDescription:
        'First 10,000 emails and 10,000 push and other destination dispatches free each month. Then starts at $0.003/email and $0.00075/dispatch, with volume discounts as usage grows.',
    seo: {
        title: 'Workflows - Email from your code, broadcasts, and automations on your product data',
        description:
            'Send transactional email from your backend, broadcasts to the right people, and automations that start on what users do. All next to your product data, with 10K emails free monthly.',
    },
    /**
     * Sections rendered on the Product surface (`/workflows`). Each entry
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
     * Sections rendered on the Pricing surface (`/workflows/pricing`).
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
        title: 'Email and automations on your product data',
        description: '"Email everyone who signed up but never uploaded a file"',
        // Reshaped from contents/docs/workflows/index.mdx + start-here.mdx
        eli5: (
            <>
                <p>
                    Workflows sends the messages your product needs. Transactional email goes out from your code,
                    broadcasts go to the people your product data picks, and automations start when someone does
                    something in your product. Every send lands next to the events, replays, and revenue you already
                    have in PostHog, so you can see what people did next.
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
        // From contents/docs/workflows/start-here.mdx
        builder: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/workflows_screenshot_light_a9f00e201e.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/workflows_screenshot_dark_83291e0b1c.png',
            alt: 'How to create a workflow in PostHog',
        },
    },
    customers: {
        grantable: {
            headline: 'replaced Zapier with PostHog Workflows and cut setup time by ~90%',
            description:
                'PostHog Workflows just lives on top of the event data and the amazing user data you already have. The setup was incredibly easy.',
        },
        croissant: {
            headline:
                'paired Workflows with Product Analytics, Web Analytics, and Surveys to power up their B2B motion',
            description:
                'Even at this early stage, Workflows is better for us than Zapier. It’s simpler, and it lets us move faster without adding another vendor to manage.',
        },
    },
    // Roles reshaped from contents/teams/workflows/index.mdx ICP + pairsWith use cases.
    useCases: {
        rows: [
            [
                'Product Engineers',
                'Password resets, sign-in codes, and receipts from your backend, with each send next to what the person did after it',
            ],
            [
                'Growth Engineers',
                'Onboarding drips, upgrade nudges, and win-back emails that start on real user behavior',
            ],
            [
                'Product Marketers',
                'Launch emails and newsletters to audiences picked from product data, with conversions and revenue per send',
            ],
            [
                'Teams on Resend or Customer.io',
                'Move templates, suppressions, and unsubscribes over, and drop a vendor that cannot see your product data',
            ],
            [
                'Automation-minded teams',
                'Slack alerts, webhooks, and property updates triggered by product events, without a separate automation tool',
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
            "You can build broadcasts and automations without installing anything. A PostHog SDK lets your backend send transactional email, and lets automations start when people do something in your app. These are the same SDKs used for Product Analytics, so if you already have PostHog installed, you're good to go.",
        productSlug: 'workflows',
        categories: ['web', 'mobile', 'backend-languages', 'backend-frameworks'],
    },
    questions: [
        {
            question: 'How do I send a password reset email from my backend?',
            url: '/docs/workflows/transactional-emails',
        },
        {
            question: 'How do I send a newsletter or launch email?',
            url: '/docs/workflows/broadcasts',
        },
        {
            question: 'How do I set up an email drip campaign?',
            url: '/docs/workflows/email-drip-campaign',
        },
        {
            question: 'Do I need to warm up an IP address?',
            url: '/docs/workflows/sending-reputation',
        },
        {
            question: 'How do I create emails with PostHog AI?',
            url: '/docs/workflows/create-emails-ai',
        },
        {
            question: 'How do I configure email, Slack, or other channels?',
            url: '/docs/workflows/configure-channels',
        },
        {
            question: 'How do I manage opt-outs and suppressions?',
            url: '/docs/workflows/opt-outs',
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'You only need workflows without the product data',
                },
                {
                    title: 'You only want simple marketing automations',
                },
                {
                    title: 'You need granular permissioning and audit logs for a large org',
                },
            ],
            us: [
                {
                    title: 'Agents can build automations that act on your product data – the actions that close the self-driving loop',
                },
                {
                    title: 'You want automations that run on top of your live product data',
                },
                {
                    title: 'You want to trigger actions from real user behavior',
                },
                {
                    title: 'You want usage-based pricing that grows with you',
                },
                {
                    title: 'You already use PostHog for analytics, feature flags, or experiments',
                    subtitle: '– Workflows connects everything on top of the PostHog product stack',
                },
            ],
        },
        companies: [
            { name: 'Resend', key: 'resend' },
            { name: 'Loops', key: 'loops' },
            { name: 'Customer.io', key: 'customer_io' },
            { name: 'PostHog', key: 'posthog' },
        ],
        // From the Workflows team's feature matrix (November 2026). Columns: PostHog, Resend, Loops, Customer.io.
        rows: [
            { label: "Where we're different" },
            { label: 'Email events in funnels and cohorts', values: [true, false, 'Partly', 'Partly'] },
            { label: 'Session replay of the people you email', values: [true, false, false, false] },
            { label: 'Replay Vision on the session behind a send', values: [true, false, false, false] },
            { label: 'Slack, webhooks, and hundreds of other destinations', values: [true, false, false, 'Partly'] },
            { label: 'SMS and push', values: [true, false, false, true] },
            { label: 'React Email', values: [true, true, false, false] },
            { label: 'Free every month', values: ['10,000 emails', '3,000 emails', '4,000 sends', 'None'] },
            { label: 'Send from code' },
            { label: 'Transactional send API', values: [true, true, true, true] },
            { label: 'Official SDKs', values: ['8', '9', '4', '4'] },
            { label: 'cc and bcc, attachments, idempotency', values: [true, true, 'Partly', 'Partly'] },
            { label: 'Delivery webhooks', values: [true, true, true, true] },
            { label: 'Custom headers and tags', values: [true, true, false, true] },
            { label: 'Batch and scheduled send', values: [true, true, false, 'Partly'] },
            { label: 'Inbound email', values: [false, true, false, false] },
            { label: 'SMTP relay', values: [false, true, false, false] },
            { label: 'Broadcasts and automations' },
            { label: 'Broadcasts, segments, and a journey builder', values: [true, true, true, true] },
            { label: 'A/B test emails and send the winner', values: ['Partly', false, true, true] },
            { label: 'Agents' },
            { label: 'MCP server and agent skills', values: ['79 tools, 9 skills', true, true, true] },
            { label: 'CLI', values: [true, true, true, true] },
        ],
    },
    pairsWith: [
        {
            slug: 'experiments',
            description:
                'Automatically follow up with users from test variants: send feedback surveys, activate successful groups, or roll out winning experiences.',
        },
        {
            slug: 'product-analytics',
            description:
                'Trigger automations from real user behavior. Every click, session, or conversion can start a workflow.',
        },
        {
            slug: 'feature-flags',
            description:
                'React when a feature is turned on, off, or rolled out to a specific segment. Target messages or follow-ups based on flag variations.',
        },
        {
            slug: 'error-tracking',
            description:
                'Trigger alerts or messages when errors spike, or notify engineering teams directly in Slack when exceptions occur.',
        },
    ],
    worksWith: ['experiments', 'product-analytics', 'feature-flags', 'error-tracking'],
    ai: {
        image: hedgehogTransformerPng,
        imageAlt: 'A robot hedgehog running a workflow',
        imageClasses: 'max-w-[360px]',
        description: 'build the automation and ship it on your behalf',
        // Reshaped from ai.skills + contents/docs/workflows/create-emails-ai.mdx
        intro: 'Ask PostHog AI to write emails, draft broadcasts, and set up automations from the triggers, conditions, and actions you describe.',
        mcpFeatures: ['workflows', 'messaging'],
        skills: [
            'Generates email templates for your content library',
            'Sets up multi-step workflows from the triggers, conditions, and actions you describe',
            'Recommends which workflows to build and when to run them based on your product metrics',
        ],
        // One group per agent skill in PostHog/posthog products/workflows/skills and products/messaging/skills.
        groups: [
            {
                title: 'Send transactional email',
                tool: 'sending-transactional-emails',
                prompts: [
                    'Send our password reset emails through PostHog from our Node.js backend',
                    'Send a receipt from our order template every time someone pays',
                ],
            },
            {
                title: 'Draft broadcasts',
                tool: 'building-workflows',
                prompts: [
                    'Draft a broadcast about our new feature for users who were active this month',
                    'Turn last month’s newsletter into a broadcast for free-plan users',
                ],
            },
            {
                title: 'Build automations',
                tool: 'building-workflows',
                prompts: [
                    'Build an onboarding email sequence to help new users get started',
                    "Email people 3 days after they sign up if they haven't uploaded a file",
                    'Create a workflow that notifies our Slack channel when someone upgrades to a paid plan',
                ],
            },
            {
                title: 'Design email templates',
                tool: 'designing-email-templates',
                prompts: [
                    'Create a welcome email for new users who just signed up',
                    "Create a welcome email template with a hero image, greeting with the user's name, and a CTA button",
                    'Update the onboarding template to include their company name in the subject',
                ],
            },
            {
                title: 'Check results',
                tool: 'measuring-email-performance',
                prompts: [
                    "How did last week's launch email do, and did people use the feature after?",
                    'How many password reset emails bounced this week?',
                ],
            },
            {
                title: 'Set up a sending domain',
                tool: 'setting-up-an-email-domain',
                prompts: ['Set up and verify our domain so we can send email from it'],
            },
            {
                title: 'Move from another provider',
                tool: 'migrating-from-email-providers',
                prompts: [
                    'Import our templates, suppressions, and unsubscribes from Resend',
                    'Move our Customer.io automations into PostHog',
                ],
            },
        ],
        // The MCP tools tab: one row per use case, in the same order as the prompts.
        // A tool lands in the first group whose prefix it matches.
        toolGroups: [
            {
                name: 'Send transactional email',
                summary: 'Send one email from a template, and see what happened to it.',
                prefixes: [
                    'workflows-send-email',
                    'workflows-make-email-template-transactional',
                    'workflows-transactional-',
                ],
            },
            {
                name: 'Draft broadcasts',
                summary: 'Draft a broadcast, and check how many people it reaches.',
                prefixes: ['broadcasts-', 'workflows-convert-to-broadcast', 'workflows-blast-radius'],
            },
            {
                name: 'Design email templates',
                summary: 'Create and edit the emails in your template library.',
                prefixes: [
                    'workflows-create-email-template',
                    'workflows-get-email-template',
                    'workflows-list-email-templates',
                    'workflows-patch-email-template',
                    'workflows-show-email-template',
                    'workflows-update-email-template',
                ],
            },
            {
                name: 'Build, test, and debug automations',
                summary: 'Build an automation, test it, turn it on, and see why a run did what it did.',
                prefixes: [
                    'workflows-create',
                    'workflows-email-drafts-create',
                    'workflows-data-suggestions-',
                    'workflows-suggest',
                    'workflows-list-proposals',
                    'workflows-get',
                    'workflows-list',
                    'workflows-update',
                    'workflows-patch-',
                    'workflows-test-run',
                    'workflows-publish',
                    'workflows-enable',
                    'workflows-disable',
                    'workflows-discard-draft',
                    'workflows-archive',
                    'workflows-schedule-create',
                    'workflows-run-batch',
                    'workflows-logs',
                    'workflows-restore-revision',
                ],
            },
            {
                name: 'Check results',
                summary: 'Sends, opens, clicks, and what people did after an email.',
                prefixes: ['workflows-stats', 'workflows-global-stats', 'workflows-version-stats', 'workflows-email'],
            },
            {
                name: 'Deliverability and opt-outs',
                summary: 'Sending health, frequency caps, suppressions, and opt-outs.',
                prefixes: [
                    'workflows-setup-status',
                    'workflows-reputation-get',
                    'workflows-sending-rules-',
                    'suppressions-',
                    'opt-outs-',
                    'message-categories-',
                ],
            },
            {
                name: 'Move from another provider',
                summary: 'Bring templates, lists, and automations from Customer.io, Resend, and others.',
                prefixes: ['provider-imports-', 'workflows-import-'],
            },
            {
                name: 'Supabase auth emails',
                summary: 'Send Supabase sign-up and sign-in emails through your PostHog templates.',
                prefixes: ['supabase-auth-emails-'],
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
        src: hedgehogWorkflowsPng,
        alt: 'A hedgehog holding up a workflow',
        footerClasses: 'max-w-[360px]',
        classes: 'absolute bottom-0 right-0 w-auto h-auto max-w-[min(90vw,480px)] @2xl:max-w-xl',
    },
    hogs: {
        default: {
            src: hedgehogWorkflowsPng,
            alt: 'A hedgehog automating workflows',
        },
        mobileHog: {
            src: hedgehogMailboxPng,
            alt: 'A hedgehog holding a letter by a mailbox',
            // The mailbox art has more empty space than other hoggies, and cannot be cropped.
            className: 'h-44 @3xl/reader-content:h-56 @6xl/reader-content:h-64',
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
