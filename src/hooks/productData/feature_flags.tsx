import React from 'react'
import {
    IconToggle,
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
    IconMessage,
    IconNewspaper,
} from '@posthog/icons'
import { features } from './feature_flags/features'
import { applications, topFeatures } from './feature_flags/slides'

export const featureFlags = {
    Icon: IconToggle,
    name: 'Feature Flags',
    description: 'Control feature access with precision',
    handle: 'feature_flags',
    type: 'feature_flags',
    slug: 'feature-flags',
    teamSlug: 'feature-flags',
    forumTopicId: 360,
    color: 'seagreen',
    colorSecondary: 'seagreen',
    category: 'product_engineering',
    wizardSupport: 'In development',
    shortDescription: 'Control feature access with precision',
    pricingDescription:
        'Feature flags are billed on requests – evaluations against your flags. You get 1 million free every month, then pay for what you use. No per-seat charges.',
    seo: {
        title: 'Feature Flags – Ship safely and control rollouts with PostHog',
        description:
            "Deploy new features confidently with Feature Flags. Test in production, target cohorts, and measure impact through PostHog's integrated analytics and experiments.",
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/feature_flags_f536371cce.jpg',
    },
    /**
     * Sections rendered on the Product surface (`/feature-flags`). Each entry
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
            slug: 'ask-anything',
            name: 'AI prompts',
            group: 'divided',
            icon: <IconChat className="size-4" />,
        },
        { slug: 'pairs-with', name: 'Pairs with...', hideFromNav: true, icon: <IconConfetti className="size-4" /> },
        { slug: 'changelog', name: 'Changelog', group: 'divided', icon: <IconNewspaper className="size-4" /> },
        { slug: 'community', name: 'Questions?', group: 'divided', icon: <IconMessage className="size-4" /> },
        {
            slug: 'feature-comparison',
            name: 'Feature comparison',
            group: 'divided',
            icon: <IconList className="size-4" />,
        },
        {
            slug: 'installation',
            name: 'Install',
            group: 'divided',
            icon: <IconCode className="size-4" />,
        },
        { slug: 'getting-started', name: 'Get started', group: 'divided', icon: <IconRocket className="size-4" /> },
    ],
    /**
     * Sections rendered on the Pricing surface (`/feature-flags/pricing`).
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
        title: 'Safely roll out features to specific users or groups',
        description:
            'Feature Flags is one of the tools that makes your product self-driving: the control layer agents use to roll a change out and roll it back. Built to work natively with product analytics, session replay, experiments, and surveys.',
        eli5: 'Feature Flags let you turn features on or off for specific users, groups, or percentages of traffic without redeploying code. Create a flag, check it in your app, then control who sees what from PostHog – phased rollouts, kill switches, multivariate variants, JSON payloads, and beta opt-ins. When something breaks, flip it off. When it works, roll it out wider and measure the impact in analytics and session replay.',
        textColor: 'text-white', // tw
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/FeatureFlags/images/screenshot-feature-flags.png',
            alt: 'Feature flags screenshot',
            classes: '',
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_feature_flags_light_6a7b1dfc70.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_feature_flags_dark_f091ddfb9b.png',
            alt: 'Feature flags screenshot',
            classes: 'justify-end items-end pl-4 @lg:pl-6',
            imgClasses: 'rounded-tl-md shadow-2xl',
        },
        multivariate: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/multivariate.png',
            alt: 'Multivariate feature flags',
        },
        'release-conditions': {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/release-conditions.png',
            alt: 'Release conditions',
        },
        'early-access': {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/early-access.png',
            alt: 'Early access feature opt-in widget',
        },
        reports: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/reports.png',
            alt: 'Developer-friendly automation',
        },
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/hogs/feature-flags-hog.png',
        alt: 'A hedgehog toggling a feature flag',
        classes: 'absolute bottom-0 right-0 max-w-md',
    },
    hogs: {
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/hogs/feature-flags-hog.png',
            alt: 'A hedgehog toggling a feature flag',
        },
        mobileHog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/FEATURE_FLAGS_hog_95e008723c.png',
            alt: 'A hedgehog toggling a feature flag',
        },
    },
    slider: {
        marks: [1000000, 10000000, 100000000, 1000000000],
        min: 1000000,
        max: 1000000000,
    },
    volume: 1000000,
    customers: {
        phantom: {
            headline: 'cut failure rates by 90%',
            description:
                'Feature flags are crucial for us. We use them as kill switches for all features and use the data to make decisions.',
        },
        contra: {
            headline: 'increased registrations 30%',
            description:
                "Teams used to use different tools. That led to confusion because flags didn't integrate with our analytics or replays.",
        },
        elevenlabs: {
            headline: 'uses flags for feature testing',
            description:
                'We test changes as simple as changing the null state of a page through to new onboarding flows or new pricing changes.',
        },
        carvertical: {
            headline: 'switched from in-house tools',
            description:
                "Feature flags immediately bought a lot of value. What's really elegant is how flags interlink with product analytics.",
        },
    },
    useCases: {
        intro: 'Feature Flags is used across teams depending on your role.',
        rows: [
            [
                'Product Engineers',
                'Ship behind a flag, canary to a slice of users, and kill a bad release without a redeploy',
            ],
            [
                'Product Managers',
                'Control beta access and rollout percentage once engineering wires the flag into the product',
            ],
            [
                'Growth Engineers',
                'Target cohorts, run multivariate variants, and measure impact next to analytics and replays',
            ],
            [
                'Platform / DevOps',
                'Gate infrastructure changes and migrations with gradual rollouts and instant rollback',
            ],
            ['Support Engineers', 'Enable a fix or workaround for a specific customer without shipping a new build'],
        ],
    },
    features,
    mcp: {
        title: 'MCP',
        headline: 'Manage flags from your editor',
        description:
            'Create flags, configure targeting rules, and check rollout status from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
    },
    installation: {
        title: 'Install',
        headline: 'Install',
        description: 'SDKs for web, mobile, and backend – or evaluate flags over the API.',
        productSlug: 'feature-flags',
        categories: ['web', 'mobile', 'backend-languages', 'backend-frameworks'],
    },
    postHogOnPostHog: {
        title: 'How PostHog uses Feature Flags',
        benefits: [
            {
                title: 'Test new ideas',
                description: 'with beta cohorts or random users',
            },
            {
                title: 'Make kill switches',
                description: 'with flags we can turn off',
            },
            {
                title: 'Stagger roll-outs',
                description: "so we don't break everything",
            },
            {
                title: 'Run simple experiments',
                description: 'to see what works best',
            },
            {
                title: 'Control access',
                description: 'by using flags as permissions',
            },
        ],
    },
    answersHeadline: "How-to's with Feature Flags",
    answersDescription: 'Learn how to do some interesting things with Feature Flags.',
    questions: [
        {
            question: 'How do I test features internally?',
            url: '/product-engineers/feature-flag-benefits-use-cases#3-test-changes-in-production',
        },
        {
            question: 'How do I set up an allow or deny list?',
            url: '/product-engineers/feature-flag-benefits-use-cases#4-manage-access',
        },
        {
            question: 'How do I do a canary release?',
            url: '/tutorials/canary-release',
        },
        {
            question: 'How do I sample events for a high-volume API?',
            url: '/tutorials/track-high-volume-apis',
        },
        {
            question: 'How can I set up a phased rollout?',
            url: '/tutorials/phased-rollout',
        },
        {
            question: 'How do I configure a location-based banner?',
            url: '/tutorials/location-based-banner',
        },
        {
            question: 'How do I update feature flags with the PostHog API?',
            url: '/tutorials/api-feature-flags',
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'Lifecycle management',
                    description: 'Clean up old flags automatically',
                },
                {
                    title: 'Trigger changes based on metrics',
                },
                {
                    title: 'Edge network support',
                    description: 'like Vercel Edge Config',
                },
                {
                    title: 'Approvals',
                },
                {
                    title: 'Multi-armed bandit',
                },
            ],
            us: [
                {
                    title: 'Agents can roll a change out and roll it back from flag context – the control that powers self-driving',
                },
                {
                    title: 'Integration with other analysis products',
                    subtitle: 'View replays attached to a flag, analyze data based on a flag, etc.',
                },
                {
                    title: 'Multi-variate flags with payloads',
                    subtitle: 'Flags can return JSON and trigger other in-app changes (like displaying a banner)',
                },
                {
                    title: 'Evaluate flags with API',
                },
            ],
        },
        companies: [
            {
                name: 'Optimizely',
                key: 'optimizely',
                link: '/blog/posthog-vs-optimizely',
            },
            {
                name: 'LaunchDarkly',
                key: 'launchdarkly',
                link: '/blog/posthog-vs-launchdarkly',
            },
            {
                name: 'Flagsmith',
                key: 'flagsmith',
            },
            {
                name: 'GrowthBook',
                key: 'growthbook',
                link: '/blog/posthog-vs-growthbook',
            },
            {
                name: 'Statsig',
                key: 'statsig',
                link: '/blog/posthog-vs-statsig',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        rows: ['feature_flags'],
        excluded_sections: ['platform.libraries', 'platform.developer', 'platform.integrations', 'platform.security'],
    },
    pairsWith: [
        {
            slug: 'product-analytics',
            description:
                "Run any insight filtered by a flag's value, or group by flag to see usage across a flag's variants",
        },
        {
            slug: 'experiments',
            description:
                'Run A/B tests on top of the same flags, with statistical significance tracking for each variant',
        },
        {
            slug: 'session-replay',
            description:
                'Filter recordings down to only when a feature flag was called, or to a specific value of a flag',
        },
    ],
    presenterNotes: {
        overview:
            "<strong>Presenter notes:</strong> Feature flags control who sees what. We fixed the two biggest problems: latency (down from 500ms to under 50ms with local evaluation) and that annoying flicker on page load (bootstrapping makes flags instant). Ship faster, roll back instantly, see the impact in analytics. That's it.",
        customers:
            'Phantom cut failure rates by 90% - they just turn off broken features instantly. Contra boosted registrations 30% because they could finally see flag data next to analytics data. CarVertical ditched their homegrown system because, turns out, building good feature flags is hard.',
        features:
            "<strong>Boolean & multivariate feature flags:</strong> Start with on/off, but multivariate is where it's at. Test 9 variants at once. Show variant A to 20% of free users, B to paid users, whatever you need.<br /><br /><strong>Test changes without pushing code:</strong> JSON payloads let you change text, colors, whole UI sections from PostHog. Teams use this for testing pricing, onboarding flows, even seasonal promos. No deploys needed.<br /><br /><strong>Release conditions:</strong> Target by user properties, cohorts, whatever. Use AND/OR logic. Like: '50% of users who signed up after Jan 1st AND are Pro OR in beta testers.' As specific as you need.<br /><br /><strong>Local evaluation:</strong> Instead of network requests every flag check, evaluate locally. Latency drops from 100s of milliseconds to single digits. Essential when you're checking flags thousands of times per second.<br /><br /><strong>Bootstrapping:</strong> Flags available on first page load. No flicker. Server evaluates once, passes to client. Perfect for feature-gated routes or anything that affects initial render.<br /><br /><strong>Testing & diagnostics:</strong> Override flags in browser console for testing. See exactly who got what value and when. Makes debugging production issues way easier.<br /><br /><strong>Developer-friendly automation:</strong> Auto usage reports. Auto IP geolocation. Auto person property recall. Small things that save tons of time.<br /><br /><strong>Early access feature opt-in widget:</strong> Let users opt into betas themselves. They self-select, you get eager testers. Win-win.<br /><br /><strong>More features:</strong><br /><br /><strong>Persist flags across authentication:</strong> Anonymous user logs in? Flags carry over. No jarring changes.<br /><br /><strong>History & activity feed:</strong> Every change logged. Who, what, when, from where.<br /><br /><strong>Instant rollbacks:</strong> Something broke? Turn it off. No code, no deploys.<br /><br /><strong>Multi-environment support:</strong> Same flag keys work in local, staging, prod. Different rules per environment.",
        answers:
            "Test internally? Flag your team's emails or make an 'internal users' cohort. Canary release? Start at 1-5%, watch metrics, ramp up slowly. Pro tip: watch session replays from your canary users to catch what metrics miss. High-volume API? Use sampling flags to track a percentage of requests.",
        pricing:
            "1 million requests free per month. Then pay for what you use. LaunchDarkly charges $10-20 per developer PLUS usage. We just charge usage. A typical SaaS uses 5-10M requests/month. Even at 100M requests, we're way cheaper. And no 'enterprise tier' gatekeeping.",
        'comparison-summary':
            "LaunchDarkly pioneered standalone flags. Optimizely came from A/B testing. We built flags as part of a complete platform. Everything shares the same data model. Because it's one system, agents can act on flag context directly – roll a change out, watch the impact, and roll it back – which is what makes your product self-driving. LaunchDarkly has more enterprise workflow stuff, but most teams just want flags that work with their analytics.",
        'feature-comparison':
            "We auto-resolve IPs and recall person properties. Sounds minor but eliminates whole bug categories. We don't have data export because... why would you? Your flag data is already in our analytics. Query it there.",
        docs: "Written by engineers who've actually built flag systems. Real code examples for every SDK. We cover the weird stuff - clock skew, network failures, race conditions. If something's broken, we tell you how to work around it.",
        'pairs-with':
            "Release a feature to 10% of users. Filter all analytics by that flag. Notice conversion dropped? Watch session replays of just those users. See the problem, fix it, roll out wider. This workflow only works when everything's actually integrated.",
        'getting-started':
            'One line to install. Create flag in UI. Add to code. Done. Later: add bootstrapping for instant flags, local evaluation for speed, multivariate for tests. Start simple, grow as needed.',
        ai: 'The PostHog MCP server lets your AI coding agent create and manage Feature Flags directly from your code editor. Create flags, configure targeting rules, and check rollout status – without switching to the PostHog app.',
    },
    ai: {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/FEATURE_FLAGS_hog_95e008723c.png',
        imageAlt: 'PostHog AI and feature flags',
        description: 'roll a change out, watch the impact, and roll it back',
        intro: 'Ask PostHog AI to create flags, explain targeting, and clean up stale ones.',
        mcpFeatures: ['flags'],
        skills: [
            'Configures and modifies flags with simple prompts – including rollout rules, targeting, and variants',
            'Identifies stale flags to remove from your codebase',
            'Summarizes rollout rules and targeting in plain english',
        ],
        groups: [
            {
                title: 'Create',
                tool: 'create-feature-flag',
                prompts: [
                    'Create a new multivariate feature flag for dark mode',
                    'Create a flag that rolls out new-checkout to 10% of free users',
                ],
            },
            {
                title: 'Update',
                tool: 'update-feature-flag',
                prompts: [
                    'Add a release condition so only users with email ending in @acme.com get the flag',
                    'Update pricing-test so variant_b is 50% of traffic',
                ],
            },
            {
                title: 'Inspect',
                tool: 'feature-flag-get-definition',
                prompts: [
                    'Explain how this flag is configured and who receives each variant',
                    'What payload does the headline-change flag return?',
                    'Get the full definition of new-onboarding',
                ],
            },
            {
                title: 'Test evaluation',
                tool: 'feature-flags-test-evaluation-create',
                prompts: [
                    'Would user_id 12345 get the new-checkout flag with their current properties?',
                    'Test evaluation for distinct_id demo@example.com against pricing-test',
                ],
            },
            {
                title: 'Blast radius',
                tool: 'feature-flags-user-blast-radius-create',
                prompts: [
                    "What's the blast radius if I roll new-checkout out to 100%?",
                    'How many users would a 10% rollout of pricing-test affect?',
                ],
            },
            {
                title: 'Clean up',
                tool: 'feature-flags-status-retrieve',
                prompts: [
                    'Is new-checkout stale?',
                    'Check the health status of pricing-test',
                    'Show me why this flag is marked stale',
                ],
            },
            {
                title: 'Schedule changes',
                tool: 'scheduled-changes-create',
                prompts: [
                    'Schedule new-checkout to go to 50% tomorrow at 9am UTC',
                    'Schedule this flag to turn off on Friday',
                ],
            },
        ],
    },
}
