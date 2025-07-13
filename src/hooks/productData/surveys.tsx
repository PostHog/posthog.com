import { IconMessage } from '@posthog/icons'

export const surveys = {
    Icon: IconMessage,
    name: 'Surveys',
    handle: 'surveys',
    type: 'surveys',
    slug: 'surveys',
    color: 'salmon',
    colorSecondary: 'red',
    category: 'product',
    seo: {
        title: 'Surveys - PostHog',
        description: 'Ask anything with no-code surveys – or use the API for complete control.',
    },
    answersDescription: 'Get feedback from your users with customizable surveys',
    overview: {
        title: 'Ask anything with no-code surveys',
        description:
            'Build in-app popups with freeform text responses, multiple choice, NPS, ratings, and emoji reactions. Or use the API for complete control.',
        textColor: 'text-black', // tw
    },
    screenshots: [
        {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/screenshot-surveys.png',
            alt: 'Screenshot of survey results in PostHog',
            classes: '',
        },
    ],
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/surveys-hog.png',
        alt: 'A hedgehog looking at survey results',
        classes: 'absolute bottom-0 right-0 max-w-md',
    },
    slider: {
        marks: [250, 2000, 15000, 100000],
        min: 250,
        max: 100000,
    },
    volume: 250,
    customers: {
        purplewave: {
            headline: 'reached a 25% response rate with surveys',
            description:
                'I hate having to switch software. With PostHog, all our data and survey responses were centralized in one platform.',
        },
        elevenlabs: {
            headline: 'uses surveys to organize interviews and more',
            description:
                'We even use surveys to send a little pop-up to our most active users and ask them to review us on G2.',
        },
    },
    features: [
        {
            title: 'Question types',
            headline: 'Question types',
            description: 'Multiple choice, multi-select, numerical rating, emoji reaction, embedded links',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/question-types.png',
                    alt: 'Question types',
                },
            ],
        },
        {
            title: 'Templates',
            headline: 'Templates',
            description: 'Choose from the library or start from scratch',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/templates.png',
                    alt: 'Templates',
                },
            ],
        },
        {
            title: 'Display conditions',
            headline: 'Display conditions',
            description: 'Display surveys based on URL, person property, or feature flag when used with Feature Flags',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/targeting.png',
                    alt: 'Display conditions',
                },
            ],
        },
        {
            title: 'Multi-step surveys',
            headline: 'Multi-step surveys',
            description: 'Up to 10 questions',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/steps.png',
                    alt: 'Multi-step surveys',
                },
            ],
        },
        {
            title: 'Link somewhere',
            headline: 'Link somewhere',
            description: 'Send users to a webpage or invite them to book a meeting with a calendar invite',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/link-scheduler.png',
                    alt: 'Link somewhere',
                },
            ],
        },
        {
            title: 'No-code and API',
            headline: 'No-code? Yes. API? Yes.',
            description:
                'Using PostHog.js? No more code required. But want to create your own UI? Check out the Surveys API.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/api.png',
                    alt: 'No-code and API',
                },
            ],
        },
        {
            title: 'More features',
            headline: 'More features',
            features: [
                {
                    title: 'Aggregated results',
                    description: 'See feedback summarized and broken down per response',
                },
                {
                    title: 'Slack notifications',
                    description: 'Send realtime survey responses to a Slack channel',
                },
                {
                    title: 'Customizable wait periods',
                    description: 'Set a delay before a survey opens',
                },
            ],
        },
    ],
    questions: [
        {
            question: 'Would you like to book a user interview?',
            url: '/tutorials/feedback-interviews-site-apps',
        },
        {
            question: 'Would you like to be interviewed by our product team?',
        },
        {
            question: 'How would you feel if you could no longer use this product?',
        },
        {
            question: "How satisfied are you with the support you've received?",
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'Forms',
                    subtitle:
                        "PostHog offers multi-step surveys, but they won't be full-page forms such as Typeform or Google Forms",
                },
                {
                    title: 'AI-powered analysis or recommendations based on results',
                },
                {
                    title: 'Limited formatting options',
                },
            ],
            us: [
                {
                    title: 'No-code surveys with customizable colors and removable branding',
                },
                {
                    title: 'Automatic NPS score calculations',
                },
                {
                    title: 'Robust targeting & integration with feature flags',
                },
                {
                    title: 'Tight integration with analytics, experiments, and session replay',
                },
            ],
        },
        features: [
            {
                feature: 'Customizable pop-ups',
                companies: {
                    Pendo: true,
                    Hotjar: true,
                    Sprig: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Live previews',
                companies: {
                    Pendo: true,
                    Hotjar: true,
                    Sprig: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Multi-step surveys',
                companies: {
                    Pendo: true,
                    Hotjar: true,
                    Sprig: true,
                    PostHog: true,
                },
            },
            {
                feature: 'API access',
                companies: {
                    Pendo: true,
                    Hotjar: true,
                    Sprig: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Single choice questions',
                companies: {
                    Pendo: true,
                    Hotjar: true,
                    Sprig: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Multiple choice questions',
                companies: {
                    Pendo: true,
                    Hotjar: true,
                    Sprig: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Open text questions',
                companies: {
                    Pendo: true,
                    Hotjar: true,
                    Sprig: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Numerical rating questions',
                companies: {
                    Pendo: true,
                    Hotjar: true,
                    Sprig: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Emoji rating questions',
                companies: {
                    Pendo: true,
                    Hotjar: true,
                    Sprig: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Third-party link support',
                companies: {
                    Pendo: true,
                    Hotjar: false,
                    Sprig: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Target by property',
                companies: {
                    Pendo: true,
                    Hotjar: true,
                    Sprig: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Target by URL',
                companies: {
                    Pendo: true,
                    Hotjar: true,
                    Sprig: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Target by feature flag',
                companies: {
                    Pendo: false,
                    Hotjar: false,
                    Sprig: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Survey scheduling',
                companies: {
                    Pendo: true,
                    Hotjar: false,
                    Sprig: false,
                    PostHog: false,
                },
            },
            {
                feature: 'Export responses',
                companies: {
                    Pendo: true,
                    Hotjar: true,
                    Sprig: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Slack integration',
                companies: {
                    Pendo: true,
                    Hotjar: true,
                    Sprig: true,
                    PostHog: true,
                },
            },
        ],
    },
    pairsWith: [
        {
            slug: 'product-analytics',
            description: 'Use insights to breakdown average scores, analyze results over time, or find trends.',
        },
        {
            slug: 'feature-flags',
            description: 'Connect a survey to a feature flag to gather feedback on your latest ideas and tests.',
        },
        {
            slug: 'session-replay',
            description:
                "Watch recordings of users completing a survey to understand full context about a user's behavior.",
        },
    ],
}
