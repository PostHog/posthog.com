import React from 'react'
import { getTool } from '../../data/tools'
import {
    IconMessage,
    IconEye,
    IconSparkles,
    IconList,
    IconConfetti,
    IconRocket,
    IconPieChart,
    IconCheckCircle,
    IconInfo,
    IconCursorClick,
    IconMagic,
    IconChat,
    IconCode,
    IconArrowUpRight,
} from '@posthog/icons'
import { features } from './surveys/features'
import { applications, topFeatures } from './surveys/slides'

export const surveys = {
    ...getTool('surveys'),
    Icon: IconMessage,
    name: 'Surveys',
    description: 'Ask users anything with no-code surveys',
    handle: 'surveys',
    type: 'surveys',
    slug: 'surveys',
    teamSlug: 'surveys',
    forumTopicId: 347,
    color: 'salmon',
    colorSecondary: 'red',
    shortDescription: 'Ask users anything with no-code surveys',
    pricingDescription:
        'Your first 1500 survey responses are free every month, then pay for what you use. No limits on surveys created or questions asked.',
    seo: {
        title: 'Surveys – Collect product feedback with PostHog',
        description:
            'Collect and analyze product feedback with Surveys. Launch customizable no-code surveys fast on web and mobile with templates for NPS, CSAT, user interviews, and more.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/surveys_b918a1f9e9.jpg',
    },
    /**
     * Sections rendered on the Product surface (`/surveys`). Each entry
     * resolves to a section template via `templateRegistry[item.template ?? item.slug]`,
     * so the slug doubles as the lookup key when no explicit `template` is set.
     * `props` is passed straight to the resolved section component (used here to
     * feed the carousel templates their slide arrays).
     */
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
            slug: 'top-features',
            name: 'Top features',
            group: 'divided',
            icon: <IconSparkles className="size-4" />,
            props: { slides: topFeatures },
        },
        {
            slug: 'use-case-ramp',
            name: 'Ramp to self-driving',
            template: 'use-case-ramp',
            group: 'divided',
            icon: <IconArrowUpRight className="size-4" />,
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
     * Sections rendered on the Pricing surface (`/surveys/pricing`).
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
        title: 'Ask anything with no-code surveys',
        description:
            'Surveys is one of the tools that makes your product self-driving: the user feedback agents use to see what works. Built to natively work with product analytics, session replay, feature flags, and experiments.',
        eli5: 'Surveys let you ask users anything right inside your product – freeform text, multiple choice, NPS, ratings, emoji reactions – as a no-code popup or via the API. Target by URL, person properties, events, or Feature Flags so you ask the right people at the right moment. Responses connect to Product Analytics and Session Replay, so you can see who answered and what they were doing.',
        textColor: 'text-white', // tw
    },
    videos: {
        overview: {
            wistia: 'qn3p9oer5q',
        },
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/screenshot-surveys.png',
            alt: 'Screenshot of survey results in PostHog',
            classes: '',
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_surveys_light_3dfb9f57e9.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_surveys_dark_a492c37d9c.png',
            alt: 'Surveys screenshot',
            classes: 'justify-end items-end pl-4 @lg:pl-6',
            imgClasses: 'rounded-tl-md shadow-2xl',
        },
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/surveys_hog_99cd6e8e8b.png',
        alt: 'A hedgehog looking at survey results',
        classes: 'absolute bottom-0 right-0 max-w-md',
        footerClasses: 'max-w-[240px]',
    },
    hogs: {
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/surveys_hog_99cd6e8e8b.png',
            alt: 'A hedgehog looking at survey results',
        },
        mobileHog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/surveys-hog.png',
            alt: 'A hedgehog taking a survey with a rating scale',
            className: 'w-44 @lg/reader-content:w-56 @2xl/reader-content:w-72',
        },
    },
    slider: {
        marks: [1500, 5000, 20000, 100000],
        min: 1500,
        max: 100000,
    },
    volume: 1500,
    pricing: {
        free_tier: '1500 responses/month',
    },
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
    useCases: {
        intro: 'Surveys is used across teams depending on your role.',
        rows: [
            ['Product Managers', 'Run NPS, PMF, and CSAT surveys, or book user interviews from in-app templates'],
            ['Product Engineers', 'Gather beta feedback tied to feature flags after a rollout'],
            ['Growth Engineers', 'Ask the right cohort at the right moment – after activation, purchase, or churn'],
            [
                'Support Engineers',
                'Trigger satisfaction surveys after solved tickets and route urgent feedback to Slack',
            ],
            ['Founders', 'Collect testimonials and qualitative signal without a separate survey tool'],
        ],
    },
    useCaseRamp: {
        intro: 'Surveys work at three levels. You can write the questions and read the answers yourself, ask an agent to summarize what came back, or let PostHog work proactively with your data.',
        scenario: 'Dozens of users ask for the same feature: exporting their data to CSV',
        columns: [
            {
                level: 'Do it yourself',
                surfaces: ['web'],
                driver: 'You write the questions, choose who sees them, and read the answers yourself.',
                scenario: {
                    icon: 'IconMessage',
                    surfaces: ['web'],
                    steps: [
                        'You launch an open-text survey asking what feature people miss most',
                        'You read a few hundred responses and keep seeing the same request: export to CSV',
                        'You file it, argue for it in planning, and eventually someone builds it',
                    ],
                    outcome: 'The demand was in there. You just had to read everything to find it.',
                },
                points: [
                    {
                        title: 'Reading them is on you',
                        icon: 'IconHandwave',
                        body: "You wrote the question, so you're the one reading every answer. That works fine until there are hundreds of them.",
                    },
                    {
                        title: 'Point an agent at the answers instead',
                        icon: 'IconSparkles',
                        body: "Every response becomes something PostHog can act on. Point an agent at your survey and it will read every answer as it lands, catching a theme building before you'd ever finish reading them yourself.",
                    },
                ],
            },
            {
                level: 'Ask an agent',
                surfaces: ['ai', 'slack', 'mcp', 'cli'],
                driver: 'You describe the survey you want, and an agent drafts it and summarizes what came back.',
                scenario: {
                    icon: 'IconMagicWand',
                    surfaces: ['ai', 'slack'],
                    steps: [
                        'You ask PostHog AI for a survey asking what feature people want most',
                        'It drafts the questions and targeting. You edit and launch',
                        'In Slack you ask what people are asking for, and it summarizes the requests in the thread',
                    ],
                    outcome: 'Nobody read four hundred raw responses, but somebody still had to ask.',
                },
                points: [
                    {
                        title: 'Agents read what came back',
                        icon: 'IconSearch',
                        body: 'Summaries and themes come from the responses you already collected by hand. Every answer stays tied to the person who gave it, so an agent can also tell you whether the people asking for a feature are the ones paying you.',
                    },
                    {
                        title: 'The full prompt list is below',
                        icon: 'IconMessage',
                        body: 'AI prompts, right below this section, lists everything you can ask: drafting surveys, checking results, summarizing answers.',
                    },
                ],
            },
            {
                level: 'Ship with PostHog',
                surfaces: ['inbox', 'slack'],
                driver: 'A scout reads your responses on a schedule and flags what it finds, often with a pull request attached.',
                scenario: {
                    icon: 'IconPullRequest',
                    surfaces: ['inbox', 'slack'],
                    steps: [
                        'A surveys scout clusters the open-text answers on a schedule and sees CSV export requested again and again',
                        'The report lands in your Inbox with the count and a few quotes from people asking for it',
                        'You reply in the Slack thread telling PostHog to build it, and it opens a pull request',
                        'You ship it, and the next round of responses stops mentioning it',
                    ],
                    outcome:
                        'You never had to read every response yourself. The scout counted the requests, and shipping the most-wanted feature was one Slack reply away.',
                },
                points: [
                    {
                        title: 'Every request comes with a count',
                        icon: 'IconBrain',
                        body: "The scout doesn't just spot a request, it tracks how often it comes up. That's what turns a stray comment into a feature worth building.",
                    },
                    {
                        title: 'You stay in the loop',
                        icon: 'IconPeople',
                        body: 'Building a feature is a product decision, not an automatic fix, so the scout sends it to a person instead of writing code straight away. The pull request only happens once you ask for it, in the same thread.',
                    },
                ],
            },
        ],
    },
    features,
    mcp: {
        title: 'MCP',
        headline: 'Manage surveys from your editor',
        description:
            'Create, update, and analyze surveys from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
    },
    installation: {
        title: 'Install',
        headline: 'Install',
        description: 'SDKs for web and mobile – or build a custom UI with the Surveys API.',
        productSlug: 'surveys',
        categories: ['web', 'mobile', 'no-code'],
    },
    postHogOnPostHog: {
        title: 'How PostHog uses Surveys',
        benefits: [
            {
                title: 'Track NPS scores',
                description: 'by asking users if they would recommend us',
            },
            {
                title: 'Get beta feedback',
                description: 'by linking surveys to feature flags',
            },
            {
                title: 'Organize user interviews',
                description: 'because there is a template for that too',
            },
            {
                title: 'Improve customer support',
                description: 'by linking surveys to actions like solved tickets',
            },
            {
                title: 'Gather testimonials',
                description: 'by asking if anyone wants some free merch',
            },
        ],
    },
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
                    title: 'AI-powered analysis or recommendations based on results',
                },
                {
                    title: 'Limited formatting options',
                },
                {
                    title: 'WYSIWYG editor',
                },
            ],
            us: [
                {
                    title: 'Agents can act on what users tell you – the qualitative signal that powers self-driving',
                },
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
        rows: ['surveys'],
        excluded_sections: [
            'surveys.features',
            'surveys.question_types',
            'surveys.templates',
            'platform.libraries',
            'platform.integrations',
        ],
    },
    ai: {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/surveys_284d9e66f4.png',
        imageAlt: 'PostHog AI and surveys',
        description: 'collect what users say and act on the feedback to ship the fix',
        intro: 'Ask PostHog AI to create surveys, refine targeting, and summarize responses.',
        mcpFeatures: ['surveys'],
        skills: [
            'Generates complete surveys with display conditions and targeting',
            'Suggests appropriate question types (freeform text, rating scales, multiple choice, etc.) based on your research goals',
            'Analyzes the results and provides insights',
        ],
        // Prompts reshaped from existing ai.prompts + skillsData survey examples.
        // Tool names verified against src/data/mcp-tools.json.
        groups: [
            {
                title: 'Create',
                tool: 'survey-create',
                prompts: [
                    'Create an NPS survey for my mobile app users',
                    'Build a product satisfaction survey with rating questions',
                    'Help me create a survey to understand why users churn',
                    'Generate a post-purchase feedback survey',
                    'Launch the Sean Ellis PMF survey to engaged users and report the score',
                    'Launch a one-question poll asking if the new layout is better',
                ],
            },
            {
                title: 'Update targeting',
                tool: 'survey-update',
                prompts: [
                    'Narrow this survey to only enterprise admins',
                    'Retarget the running survey to activated users',
                    'Tighten survey targeting to the cohort that matters',
                ],
            },
            {
                title: 'Check stats',
                tool: 'survey-stats',
                prompts: [
                    'Aggregate our PMF survey responses by segment',
                    "What's the response rate and completion rate on our NPS survey?",
                    'Show me stats for the post-purchase feedback survey this month',
                ],
            },
            {
                title: 'Summarize',
                tool: 'surveys-summarize-responses-create',
                prompts: [
                    'Spin up a cancel survey for the churn cohort and summarize the reasons',
                    'What are users most frustrated about this month?',
                    'Pull NPS, retention, and survey quotes into a one-page PMF report',
                ],
            },
            {
                title: 'Clean up',
                tool: 'survey-delete',
                prompts: [
                    "Which surveys are stale? Retire the ones nobody's answering",
                    'Clean up old surveys that are still running',
                    "Archive the launch survey now that it's done",
                ],
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
            "<strong>Question types:</strong> Everything you'd expect like multiple choice, ratings (1-5, 1-7 for Likert, 0-10 for NPS), emojis, free text. Plus you can embed links as the survey's CTA – great for external forms or scheduling calls like user interviews.<br /><br /><strong>Templates:</strong> We've got many of the acronyms covered including <strong>NPS</strong> (Net Promoter Score), <strong>PMF</strong> (product-market fit), <strong>CSAT</strong> (customer satisfaction score), <strong>CES</strong> (customer effort score), and others like one that helps schedule user interviews, one for user-provided context that fires after hitting an exception, and of course a freeform text option for collecting user feedback. Start from a template or build your own from scratch.<br /><br /><strong>Display conditions:</strong> Target by URL, user properties, or feature flags. You can ask beta users about new features or survey only enterprise customers.<br /><br /><strong>Multi-step surveys:</strong> Up to 10 questions, progress bar included.<br /><br /><strong>Link somewhere:</strong> End with a calendar link for user interviews or send to a detailed feedback form. Mix in-app and external collection.<br /><br /><strong>No-code and API:</strong> Visual builder for most cases and an API when you need custom UI or complex logic – both use the same backend.<br /><br /><strong>More features:</strong><br /><br /><strong>Aggregated results:</strong> See response distributions, average scores, trends over time.<br /><br /><strong>Slack notifications:</strong> Get responses in real-time – great for catching urgent feedback.<br /><br /><strong>Customizable wait periods:</strong> Avoid annoying users new users – set delays before showing surveys so you trigger at the right time.",
        answers:
            'These are actual survey questions our customers use. User interviews? End with a Calendly link. PMF survey? Use the template. Support satisfaction? Time it after ticket resolution. The key is asking at the right moment - after they use a feature, complete a task, or hit a milestone.',
        pricing:
            "Use surveys free, or enter a credit card for advanced features. Either way, your first 1500 survey responses are free – every month, then it's simple usage-based pricing. No limits on surveys created or questions asked. Compare that to SurveyMonkey charging $99/month for basic features. We include everything – targeting, multi-step, API access – out of the box.",
        'comparison-summary':
            "Traditional survey tools (SurveyMonkey, Typeform) are disconnected from your product. Modern tools (Pendo, Sprig) are expensive and still siloed. We built surveys into the platform, so responses connect to user data, sessions, and analytics. Because it's one system, agents can act on what users tell you – it's the qualitative signal that makes your product self-driving. (We're the only one with feature flag targeting.)",
        'feature-comparison':
            "We have all the core features. What we don't have: AI analysis (yet) or complex form logic. But we uniquely support feature flag targeting - survey only users who have a specific feature enabled. Nobody else does that.",
        docs: "We've got clear setup guides for both no-code and API approaches with real-world examples of different survey types and when to use them. Common patterns like NPS calculation and user interview scheduling are documented with copy-paste examples.",
        'pairs-with':
            "Survey someone, then watch their session to see what they were doing. Run analytics on survey responses segmented by user properties. Target surveys to users with specific feature flags enabled. This integration is why response rates are so high - you're asking the right people at the right time.",
        'getting-started':
            "Build a survey in minutes: pick a template, customize the questions, set targeting rules. You'll start seeing responses immediately. The hardest part is deciding what to ask. Not sure where to start? Go simple: ask one question about the feature they just used. You can always iterate from there!",
    },
}
