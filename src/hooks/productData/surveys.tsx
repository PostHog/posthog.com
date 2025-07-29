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
            'Build in-app or on-page popups with freeform text responses, multiple choice, NPS, ratings, and emoji reactions. Or use the API for a headless implementation.',
        textColor: 'text-white', // tw
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
                    stylize: true,
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
                    title: 'Full page forms',
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
    presenterNotes: {
        overview:
            "Surveys let you ask users anything right inside your product. No-code for simple stuff, API if you want custom UI. What's different: it's connected to everything else. See who answered what, watch their session recordings, run analytics on responses. Most survey tools are islands - ours is part of the whole system.",
        customers:
            "Purplewave hit 25% response rates because the surveys show up exactly when users care. ElevenLabs uses them creatively - they pop surveys asking power users to review them on G2. Smart. These aren't email surveys people ignore. They're contextual, in-app, at the right moment.",
        features:
            "<strong>Question types:</strong> All the standards: multiple choice, ratings, emojis, free text. Plus embedded links - great for calendly scheduling or external forms.<br /><br /><strong>Templates:</strong> NPS, PMF, satisfaction, user interviews. Start from these or build your own. Takes minutes.<br /><br /><strong>Display conditions:</strong> Target by URL, user properties, or feature flags. Ask beta users about new features. Survey only enterprise customers. Whatever you need.<br /><br /><strong>Multi-step surveys:</strong> Up to 10 questions. Progress bar included. People actually complete multi-step surveys when they're contextual.<br /><br /><strong>Link somewhere:</strong> End with a calendar link for user interviews. Or send to a detailed feedback form. Mix in-app and external collection.<br /><br /><strong>No-code and API:</strong> Visual builder for most cases. API when you need custom UI or complex logic. Both use the same backend.<br /><br /><strong>More features:</strong><br /><br /><strong>Aggregated results:</strong> See response distributions, average scores, trends over time.<br /><br /><strong>Slack notifications:</strong> Get responses in real-time. Great for catching urgent feedback.<br /><br /><strong>Customizable wait periods:</strong> Don't annoy new users. Set delays before showing surveys.",
        answers:
            'These are actual survey questions our customers use. User interviews? End with a Calendly link. PMF survey? Use the template. Support satisfaction? Time it after ticket resolution. The key is asking at the right moment - after they use a feature, complete a task, or hit a milestone.',
        pricing:
            '250 responses free every month. Then simple usage pricing. No limits on surveys created or questions asked. Compare that to SurveyMonkey charging $99/month for basic features. We include everything - targeting, multi-step, API access - in the base product.',
        'comparison-summary':
            "Traditional survey tools (SurveyMonkey, Typeform) are disconnected from your product. Modern tools (Pendo, Sprig) are expensive and still siloed. We built surveys into the platform, so responses connect to user data, sessions, and analytics. Also, we're the only one with feature flag targeting.",
        'feature-comparison':
            "We have all the core features. What we don't have: AI analysis (yet) or complex form logic. But we uniquely support feature flag targeting - survey only users who have a specific feature enabled. Nobody else does that.",
        docs: 'Clear setup guides for both no-code and API approaches. We show real examples of different survey types and when to use them. Common patterns like NPS calculation and user interview scheduling are documented with copy-paste examples.',
        'pairs-with':
            "Survey someone, then watch their session to see what they were doing. Run analytics on survey responses segmented by user properties. Target surveys to users with specific feature flags enabled. This integration is why response rates are so high - you're asking the right people at the right time.",
        'getting-started':
            "Pick a template. Customize the questions. Set targeting rules. Launch. You'll see responses immediately. The hardest part is deciding what to ask. Start simple - one question about the feature they just used. You can always iterate from there.",
    },
}
