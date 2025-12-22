import React from 'react'
import { IconDecisionTree } from '@posthog/icons'
import { Link } from 'react-scroll/modules'

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
            key: 'workflows_push',
            label: 'Push notifications',
            sliderConfig: {
                marks: [10000, 50000, 100000, 1000000, 10000000],
                min: 10000,
                max: 10000000,
            },
            volume: 10000,
            unit: 'notification',
        },
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
        // home: {
        //     src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_llm_analytics_light_a436da72f7.png',
        //     srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_llm_analytics_dark_d8f32c249b.png',
        //     alt: 'LLM Analytics screenshot',
        //     classes: 'justify-end items-end pl-4 @lg:pl-6',
        //     imgClasses: 'rounded-tl-lg shadow-2xl',
        // },
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
    },
    features: [
        {
            title: 'Workflow builder',
            // handle: 'trace_monitoring',
            headline: 'Workflow builder',
            description:
                'Build automations with a drag-and-drop interface – no YAML, no API juggling. It only takes a few minutes to go from idea to live.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_canvas_029de986cd.png',
                    // srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_trace_dark_f49aa4dd89.png',
                    alt: 'Workflow builder',
                    className: 'rounded-tl-md shadow-2xl justify-end items-end @2xl:mt-8 ml-8 @2xl:ml-0',
                },
            ],
            // children: (<></>)
        },
        {
            title: 'Messaging',
            handle: 'messaging',
            // template: 'splitImage',
            headline: 'Messaging',
            description:
                'Send targeted emails, Slack posts, or webhook messages to users and cohorts based on live product data. Automate onboarding, activation, or feedback loops directly from PostHog.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_messaging_9d466af120.png',
                    // srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_dark_4e421717ba.png',
                    alt: 'Workflow messaging',
                    className: 'justify-center items-center',
                },
            ],
        },
        {
            title: 'Data-native',
            // template: 'splitImage',
            headline: 'Data-native',
            description:
                'Workflows runs on the product data you already track in PostHog. No need to connect extra tools or import events.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_events_d25a7eaebf.png',
                    // srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_dark_4e421717ba.png',
                    alt: 'Data-native',
                    className: 'justify-center items-center',
                },
            ],
        },
        {
            title: 'Triggers',
            // template: 'splitImage',
            headline: 'Triggers',
            description:
                'Start a workflow when a user signs up, clicks a feature, or completes an experiment. Trigger emails, Slack posts, or follow-up events automatically from that behavior.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_triggers_00b7e98a48.png',
                    // srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_dark_4e421717ba.png',
                    alt: 'Triggers',
                    className: 'justify-center items-center',
                },
            ],
        },
        {
            title: 'Conditions & splits',
            // template: 'splitImage',
            headline: 'Conditions & splits',
            description:
                'Branch logic visually based on user properties, cohorts or random variations, enabling targeted actions or A/B-style automation paths.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_conditions_92cdc86bf3.png',
                    // srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_dark_4e421717ba.png',
                    alt: 'Conditions & splits',
                    className: 'justify-center items-center',
                },
            ],
        },
        {
            title: 'Flow control',
            // template: 'splitImage',
            headline: 'Flow control',
            description:
                'Add delays, pauses, or conditional waits to match how users actually behave. Time actions precisely around engagement, churn, or trial limits.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_flow_5f0ac20268.png',
                    // srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_dark_4e421717ba.png',
                    alt: 'Flow control',
                    className: 'justify-center items-center',
                },
            ],
        },
        {
            title: 'Channels',
            // template: 'splitImage',
            headline: 'Channels',
            description: 'Reach users wherever they are – email, Slack, Discord, webhooks, or your own destinations.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_channels_9a8ee1d2d5.png',
                    // srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_dark_4e421717ba.png',
                    alt: 'Channels',
                    className: 'justify-center items-center',
                },
            ],
        },
        {
            title: 'More features',
            // template: 'splitImage',
            headline: 'More features',
            description:
                'Build advanced logic with loops, exit conditions, and custom actions. Trigger PostHog events, update user properties, or call APIs — all from one place.',
            children: (
                <>
                    <p>Check out our workflow guides:</p>
                    <ul>
                        <li>
                            <Link to="/docs/workflows/email-drip-campaign">Email drip campaign</Link>
                        </li>
                        <li>
                            <Link to="/docs/workflows/triggering-internal-notifications">
                                Triggering internal notifications
                            </Link>
                        </li>
                        <li>
                            <Link to="/docs/workflows/updating-user-properties">Updating user properties</Link>
                        </li>
                    </ul>
                </>
            ),
            // images: [
            //     {
            //         src: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_light_d986541535.png',
            //         srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/llm_perf_dark_4e421717ba.png',
            //         alt: 'LLM performance monitoring',
            //         className: 'justify-center items-center',
            //     },
            // ],
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
                name: 'Langfuse',
                key: 'langfuse',
                // link: '/blog/posthog-vs-langfuse',
            },
            {
                name: 'Langsmith',
                key: 'langsmith',
                // link: '/blog/posthog-vs-langsmith',
            },
            {
                name: 'Helicone',
                key: 'helicone',
                // link: '/blog/posthog-vs-helicone',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        rows: ['llm_analytics'],
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
}
