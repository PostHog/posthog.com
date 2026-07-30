import React from 'react'
import {
    IconDecisionTree,
    IconEye,
    IconSparkles,
    IconList,
    IconConfetti,
    IconRocket,
    IconPieChart,
    IconCheckCircle,
    // IconInfo, // uncomment with eli5 menu item
    IconCursorClick,
    // IconMagic, // uncomment with use-cases menu item
    IconChat,
    IconCode,
    // IconMessage, // uncomment with community menu item once forumTopicId exists
} from '@posthog/icons'
import { features } from './workflows/features'
import { applications, topFeatures } from './workflows/slides'
import { getTool } from '../../data/tools'

export const workflows = {
    ...getTool('workflows_emails'),
    productVariantName: 'Emails',
    Icon: IconDecisionTree,
    type: 'workflows_emails',
    // teamSlug: 'workflows', // verify against small-teams slug before enabling
    // forumTopicId: /* create/find topic, then uncomment community menu item below */,
    color: 'teal',
    colorSecondary: 'green-2',
    includeAddonRates: true,
    // From the previous CustomPricingSlide on /workflows (marketing page).
    // Docs pricing-table.mdx has slightly different tier rates — verify before publishing.
    pricingDescription:
        'First 10,000 messages free per channel each month. Then starts at $0.005/message for email, $0.02/message for SMS, $0.0015/message for push, and $0.00075/event for CDP destinations — with volume discounts as usage grows.',
    seo: {
        title: 'Workflows – Automate workflows with product data',
        description:
            'Automations that act on live user behavior – send Slack messages, emails, or events. The actions agents take to close the loop and make your product self-driving.',
    },
    /**
     * Sections rendered on the Product surface (`/workflows`). Each entry
     * resolves to a section template via `templateRegistry[item.template ?? item.slug]`,
     * so the slug doubles as the lookup key when no explicit `template` is set.
     * `props` is passed straight to the resolved section component (used here to
     * feed the carousel templates their slide arrays).
     */
    productMenu: [
        { slug: 'overview', name: 'Overview', icon: <IconEye className="size-4" /> },
        // Needs overview.eli5 — see content gaps.
        // {
        //     slug: 'eli5',
        //     name: 'What does it do?',
        //     hideFromNav: true,
        //     group: 'divided',
        //     icon: <IconInfo className="size-4" />,
        // },
        // Needs useCases — see content gaps.
        // {
        //     slug: 'use-cases',
        //     name: 'Who is it for?',
        //     hideFromNav: true,
        //     group: 'divided',
        //     icon: <IconMagic className="size-4" />,
        // },
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
        // Needs forumTopicId once a Workflows community topic exists.
        // { slug: 'community', name: 'Questions?', group: 'divided', icon: <IconMessage className="size-4" /> },
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
        title: 'Automate workflows with product data',
        description:
            'Workflows is one of the tools that makes your product self-driving: the actions agents take to close the loop. Trigger Slack messages, emails, or events based on live user behavior.',
        // eli5: /* write — see session_replay.overview.eli5 for shape */,
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
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflow_light_1_7afd43fd88.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflow_dark_1_9ebe26d46e.png',
            alt: 'Workflows screenshot',
            classes: 'justify-center px-4 @lg:px-6',
            imgClasses: 'rounded-tl-md rounded-tr-md shadow-2xl',
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
    // useCases: {
    //     intro: /* write — see feature_flags.useCases */,
    //     rows: [/* [role, description], … */],
    // },
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
            "Workflows is a no-code product – you can create and launch Workflows without installing any SDK. However, installing a PostHog SDK unlocks event-based triggers, letting you start Workflows when users perform specific actions in your app. These are the same SDKs used for Product Analytics – if you already have PostHog installed, you're good to go.",
        productSlug: 'workflows',
        categories: ['web', 'mobile', 'backend-languages', 'backend-frameworks'],
    },
    // Previous questions[] were LLM-analytics leftovers and are omitted (answers
    // was excluded from the old Slides config too). Write real Workflows Qs if needed.
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
            {
                name: 'Zapier',
                key: 'zapier',
            },
            {
                name: 'Make',
                key: 'make',
            },
            {
                name: 'Customer.io',
                key: 'customer_io',
            },
            {
                name: 'Brevo',
                key: 'brevo',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        rows: ['workflows'],
        excluded_sections: ['platform'],
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
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_hog_791169c2d0.png',
        imageAlt: 'A hedgehog automating workflows',
        imageClasses: 'max-w-[360px]',
        description: 'build the automation and ship it on your behalf',
        // intro: /* write — see feature_flags.ai.intro */,
        mcpFeatures: ['workflows'],
        skills: [
            'Generates email templates for your content library',
            'Sets up multi-step workflows from the triggers, conditions, and actions you describe',
            'Recommends which workflows to build and when to run them based on your product metrics',
        ],
        // Prompts reshaped from previous ai.prompts + contents/docs/workflows/create-emails-ai.mdx.
        // Tool names verified against src/data/mcp-tools.json (feature: workflows).
        groups: [
            {
                title: 'Create workflows',
                tool: 'workflows-create',
                prompts: [
                    'Build an onboarding email sequence to help new users get started',
                    'Create a workflow that notifies our Slack channel when someone upgrades to a paid plan',
                    'Generate a SMS sequence to encourage users to complete a survey',
                ],
            },
            {
                title: 'Create email templates',
                tool: 'workflows-create-email-template',
                prompts: [
                    'Create a welcome email for new users who just signed up',
                    "Write a re-engagement email for users who haven't logged in for 30 days",
                    'Generate an email template for announcing a new feature',
                    'Create an onboarding drip email series for trial users',
                    "Create a welcome email template with a hero image, greeting with the user's name, and a CTA button",
                ],
            },
            {
                title: 'Inspect templates',
                tool: 'workflows-show-email-template',
                prompts: ['Show me the current welcome email template'],
            },
            {
                title: 'Update templates',
                tool: 'workflows-update-email-template',
                prompts: ['Update the onboarding template to include their company name in the subject'],
            },
        ],
    },
    slider: {
        marks: [10000, 50000, 100000, 1000000, 10000000],
        min: 10000,
        max: 10000000,
    },
    volume: 10000,
    addonSliders: [
        {
            key: 'workflows_destinations',
            label: 'Destinations',
            sliderConfig: {
                marks: [10000, 50000, 100000, 1000000, 10000000],
                min: 10000,
                max: 10000000,
            },
            volume: 10000,
            unit: 'dispatch',
        },
    ],
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_066caea85f.png',
        alt: 'the automator hedgehog',
        classes: 'absolute bottom-0 right-0 w-auto h-auto max-w-[min(90vw,480px)] @2xl:max-w-xl',
    },
    hogs: {
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_066caea85f.png',
            alt: 'the automator hedgehog',
        },
        // mobileHog: /* asset + alt — see session_replay.hogs.mobileHog */,
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
