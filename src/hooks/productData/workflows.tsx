import React from 'react'
import {
    IconBolt,
    IconClock,
    IconDatabase,
    IconDecisionTree,
    IconGraph,
    IconMessage,
    IconPeople,
    IconPlug,
    IconSend,
    IconTestTube,
    IconWarning,
} from '@posthog/icons'
import { IconEnvelope, IconLink, IconMessages } from 'components/OSIcons'

export const workflows = {
    name: 'Workflows',
    productVariantName: 'Emails',
    Icon: IconDecisionTree,
    description: 'Automate workflows with your product data',
    handle: 'workflows_emails',
    type: 'workflows_emails',
    slug: 'workflows',
    color: 'teal',
    colorSecondary: 'green-2',
    category: 'automation',
    status: 'beta',
    includeAddonRates: true,
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
    seo: {
        title: 'Workflows – Automate workflows with product data',
        description: 'Trigger Slack messages, emails, or events based on live user behavior.',
    },
    overview: {
        title: 'Automate workflows with product data',
        description: 'Trigger Slack messages, emails, or events based on live user behavior.',
        textColor: 'text-black',
        layout: 'overlay',
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_overview_339c7cd37b.png',
            // srcMobile: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_overview_mobile_b9565d0690.png',
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
    // hog: {
    //   src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
    //   alt: 'AI-powered hedgehog',
    //   classes: 'absolute bottom-0 right-4 max-w-lg',
    // },
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
    features: [
        {
            title: 'Workflow automation builder',
            handle: 'workflow_builder',
            template: 'splitImage',
            headline: 'Workflow automation builder',
            description: 'No YAML, no syncing, no API juggling.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Group_10157_1_3d5bffb9a5.png',
                    alt: 'Workflow automation builder',
                    className: '@2xl:w-[80%] @2xl:ml-auto @2xl:mt-8',
                },
            ],
            features: [
                {
                    icon: <IconDecisionTree />,
                    title: 'Drag-and-drop steps',
                    description: 'Build onboarding, activation, and retention flows in minutes',
                },
                {
                    icon: <IconPeople />,
                    title: 'Event and cohort triggers',
                    description: 'Start workflows from real product behavior',
                },
                {
                    icon: <IconDatabase />,
                    title: 'Data-native',
                    description: 'Use the events, actions, and properties already tracked in PostHog',
                },
                {
                    icon: <IconTestTube />,
                    title: 'Testing & execution logs',
                    description: 'Preview how a workflow behaves for a real user and view detailed run history',
                },
            ],
        },
        {
            title: 'Behavior-triggered messaging',
            handle: 'messaging',
            template: 'splitImage',
            headline: 'Behavior-triggered messaging',
            description: 'Send emails, Slack posts, or webhook messages based on product activity.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Group_10158_1_5b25e98912.png',
                    alt: 'Behavior-triggered messaging',
                    containerClassName: 'flex justify-end items-end @2xl:w-[85%] @2xl:ml-auto -mb-2',
                },
            ],
            features: [
                {
                    icon: <IconEnvelope />,
                    title: 'Built-in email editor',
                    description: 'Create onboarding, activation, and transactional emails directly in PostHog',
                },
                {
                    icon: <IconBolt />,
                    title: 'Behavior-triggered delivery',
                    description: 'Messages fire the moment users perform key actions',
                },
                {
                    icon: <IconPeople />,
                    title: 'Cohort & property personalization',
                    description: 'Tailor content using user properties, segments, and experiment variants',
                },
                {
                    icon: <IconGraph />,
                    title: 'Unified with your product data',
                    description: 'No syncing, all context comes from PostHog natively',
                },
            ],
        },
        {
            title: 'Flow logic & timing controls',
            handle: 'flow_logic',
            template: 'splitImage',
            headline: 'Flow logic & timing controls',
            description: 'Shape user journeys with conditions, splits, delays, and lifecycle-based steps.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Group_10159_1_2ff0d42149.png',
                    alt: 'Flow logic & timing controls',
                    containerClassName: 'flex justify-end items-center @2xl:w-[85%] @2xl:ml-auto',
                },
            ],
            features: [
                {
                    icon: <IconDecisionTree />,
                    title: 'Smart branching',
                    description: 'Route users with conditions based on properties, events, or random splits',
                },
                {
                    icon: <IconClock />,
                    title: 'Precise timing',
                    description: 'Add delays or scheduled waits to build multi-step journeys',
                },
                {
                    icon: <IconSend />,
                    title: 'Conditional waits',
                    description: 'Continue only when a user completes a specific action',
                },
                {
                    icon: <IconWarning />,
                    title: 'Step-level error handling',
                    description: 'Build resilient automations with fallback paths',
                },
            ],
        },
        {
            title: 'Channels',
            handle: 'channels',
            template: 'splitImage',
            headline: 'Channels',
            description:
                'Reach users wherever they are. Pick from the standard channels or connect to one of the 35+ integrations (and counting) that we have.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_channels_2_1f26ef04dd.png',
                    alt: 'Channels',
                    containerClassName: 'flex justify-end items-center @2xl:ml-auto',
                },
            ],
            features: [
                {
                    icon: <IconEnvelope />,
                    title: 'Email',
                },
                {
                    icon: <IconMessage />,
                    title: 'SMS',
                },
                {
                    icon: <IconMessages />,
                    title: 'Slack',
                },
                {
                    icon: <IconLink />,
                    title: 'Webhook',
                },
                {
                    icon: <IconPlug />,
                    title: '35+ integrations',
                    description: 'ClickUp, Discord, GitHub, GitLab, Google Ads, Google Cloud Storage, and more',
                },
            ],
        },
    ],
    questions: [
        {
            question: 'What are my LLM costs by customer?',
        },
        {
            question: 'Which AI features have the highest error rates?',
        },
        {
            question: 'Are there latency spikes in my LLM calls?',
        },
        {
            question: 'Do AI features improve user retention?',
        },
        {
            question: 'Which prompts are most expensive?',
        },
        {
            question: 'How many tokens does each feature consume?',
        },
        {
            question: "What's the ROI of our AI features?",
        },
        {
            question: 'Which model gives the best cost/performance ratio?',
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
                // {
                //     title: 'Deep mobile support',
                //     subtitle: "if you're building a mobile-specific product",
                // },
                // {
                //     title: "You don't want to use an open source product",
                // },
            ],
            us: [
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
    presenterNotes: {
        overview:
            '<strong>Presenter notes:</strong> Track conversations, model performance, spans, costs, latency, and traces in LLM applications – all as regular PostHog events - roughly 10x cheaper than other LLM observability tools.',
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_hog_791169c2d0.png',
        alt: 'A hedgehog automating workflows',
        classes: 'absolute bottom-0 right-4 max-w-[250px]',
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
}
