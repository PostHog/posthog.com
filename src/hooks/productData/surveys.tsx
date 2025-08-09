import { IconMessage } from '@posthog/icons'

export const surveys = {
    Icon: IconMessage,
    name: 'Surveys',
    handle: 'surveys',
    type: 'surveys',
    slug: 'surveys',
    color: 'salmon',
    colorSecondary: 'red',
    category: 'communication',
    seo: {
        title: 'Surveys - PostHog',
        description: 'Ask anything with no-code surveys – or use the API for complete control.',
    },
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
            headline: 'No-code? Yes. API? Also yes.',
            description:
                'Using PostHog.js? No more code required. But want to create your own UI? Check out the Surveys API.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/api.png',
                    alt: 'No-code and API',
                    stylize: true,
                    shadow: true,
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
        companies: [
            {
                name: 'Pendo',
                key: 'pendo',
                link: '/blog/posthog-vs-pendo',
            },
            {
                name: 'Hotjar',
                key: 'hotjar',
                link: '/blog/posthog-vs-hotjar',
            },
            {
                name: 'Sprig',
                key: 'sprig',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        features: [
            {
                feature: 'Customizable pop-ups',
                companies: {
                    pendo: true,
                    hotjar: true,
                    sprig: true,
                    postHog: true,
                },
            },
            {
                feature: 'Live previews',
                companies: {
                    pendo: true,
                    hotjar: true,
                    sprig: true,
                    postHog: true,
                },
            },
            {
                feature: 'Multi-step surveys',
                companies: {
                    pendo: true,
                    hotjar: true,
                    sprig: true,
                    postHog: true,
                },
            },
            {
                feature: 'API access',
                companies: {
                    pendo: true,
                    hotjar: true,
                    sprig: true,
                    postHog: true,
                },
            },
            {
                feature: 'Single choice questions',
                companies: {
                    pendo: true,
                    hotjar: true,
                    sprig: true,
                    postHog: true,
                },
            },
            {
                feature: 'Multiple choice questions',
                companies: {
                    pendo: true,
                    hotjar: true,
                    sprig: true,
                    postHog: true,
                },
            },
            {
                feature: 'Open text questions',
                companies: {
                    pendo: true,
                    hotjar: true,
                    sprig: true,
                    postHog: true,
                },
            },
            {
                feature: 'Numerical rating questions',
                companies: {
                    pendo: true,
                    hotjar: true,
                    sprig: true,
                    postHog: true,
                },
            },
            {
                feature: 'Emoji rating questions',
                companies: {
                    pendo: true,
                    hotjar: true,
                    sprig: true,
                    postHog: true,
                },
            },
            {
                feature: 'Third-party link support',
                companies: {
                    pendo: true,
                    hotjar: false,
                    sprig: true,
                    postHog: true,
                },
            },
            {
                feature: 'Target by property',
                companies: {
                    pendo: true,
                    hotjar: true,
                    sprig: true,
                    postHog: true,
                },
            },
            {
                feature: 'Target by URL',
                companies: {
                    pendo: true,
                    hotjar: true,
                    sprig: true,
                    postHog: true,
                },
            },
            {
                feature: 'Target by feature flag',
                companies: {
                    pendo: false,
                    hotjar: false,
                    sprig: false,
                    postHog: true,
                },
            },
            {
                feature: 'Survey scheduling',
                companies: {
                    pendo: true,
                    hotjar: false,
                    sprig: false,
                    postHog: false,
                },
            },
            {
                feature: 'Export responses',
                companies: {
                    pendo: true,
                    hotjar: true,
                    sprig: true,
                    postHog: true,
                },
            },
            {
                feature: 'Slack integration',
                companies: {
                    pendo: true,
                    hotjar: true,
                    sprig: true,
                    postHog: true,
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
            "<strong>Presenter notes:</strong> Surveys let you ask users anything right inside your product. No-code for simple stuff, API if you want a custom UI. But what's different about PostHog Surveys is that it works with other PostHog products. See <em>who</em> answered what, watch their session recordings, run analytics on responses. Most survey tools are siloed - ours is part of the whole system that let's you drill in for additional context.",
        customers:
            "<strong>Purplewave</strong> hit a 25% response rate by targeting active users who were more likely to respond which meant more actionable feedback from loyal users without annoying those who weren't likely to respond anyway. <strong>ElevenLabs</strong> uses them creatively - they pop surveys asking power users to review them on G2. Instead of email surveys people ignore, PostHog surveys are contextual, in-app, at can be tailored to show at exactly the right moment.",
        features:
            "<strong>Question types:</strong> Everything you'd expect like multiple choice, ratings (1-5, 1-7 for Likert, 0-10 for NPS), emojis, free text. Plus you can embed links as the survey's CTA – great for external forms or scheduling calls like user interviews.<br /><br /><strong>Templates:</strong> We've got many of the acronyms covered including <strong>NPS</strong> (Net Promoter Score), <strong>PMF</strong> (product-market tit), <strong>CSAT</strong> (customer satisfaction score), <strong>CES</strong> (customer effort score), and others like one that helps schedule user interviews, one for user-provided context that fires after hitting an exception, and of course a freeform text option for collecting user feedback. Start from a template or build your own from scratch.<br /><br /><strong>Display conditions:</strong> Target by URL, user properties, or feature flags. You can ask beta users about new features or survey only enterprise customers.<br /><br /><strong>Multi-step surveys:</strong> Up to 10 questions, progress bar included.<br /><br /><strong>Link somewhere:</strong> End with a calendar link for user interviews or send to a detailed feedback form. Mix in-app and external collection.<br /><br /><strong>No-code and API:</strong> Visual builder for most cases and an API when you need custom UI or complex logic – both use the same backend.<br /><br /><strong>More features:</strong><br /><br /><strong>Aggregated results:</strong> See response distributions, average scores, trends over time.<br /><br /><strong>Slack notifications:</strong> Get responses in real-time – great for catching urgent feedback.<br /><br /><strong>Customizable wait periods:</strong> Avoid annoying users new users – set delays before showing surveys so you trigger at the right time.",
        answers:
            'These are actual survey questions our customers use. User interviews? End with a Calendly link. PMF survey? Use the template. Support satisfaction? Time it after ticket resolution. The key is asking at the right moment - after they use a feature, complete a task, or hit a milestone.',
        pricing:
            "Use surveys free, or enter a credit card for advanced features. Either way, your first 250 survey responses are free – every month, then it's simple usage-based pricing. No limits on surveys created or questions asked. Compare that to SurveyMonkey charging $99/month for basic features. We include everything – targeting, multi-step, API access – out of the box.",
        'comparison-summary':
            "Traditional survey tools (SurveyMonkey, Typeform) are disconnected from your product. Modern tools (Pendo, Sprig) are expensive and still siloed. We built surveys into the platform, so responses connect to user data, sessions, and analytics. (We're the only one with feature flag targeting.)",
        'feature-comparison':
            "We have all the core features. What we don't have: AI analysis (yet) or complex form logic. But we uniquely support feature flag targeting - survey only users who have a specific feature enabled. Nobody else does that.",
        docs: "We've got clear setup guides for both no-code and API approaches with real-world examples of different survey types and when to use them. Common patterns like NPS calculation and user interview scheduling are documented with copy-paste examples.",
        'pairs-with':
            "Survey someone, then watch their session to see what they were doing. Run analytics on survey responses segmented by user properties. Target surveys to users with specific feature flags enabled. This integration is why response rates are so high - you're asking the right people at the right time.",
        'getting-started':
            "Build a survey in minutes: pick a template, customize the questions, set targeting rules. You'll start seeing responses immediately. The hardest part is deciding what to ask. Not sure where to start? Go simple: ask one question about the feature they just used. You can always iterate from there!",
    },
}
