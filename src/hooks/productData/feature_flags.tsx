import React from 'react'
import { IconToggle } from '@posthog/icons'
import CodeBlock from 'components/Home/CodeBlock'

export const featureFlags = {
    Icon: IconToggle,
    name: 'Feature Flags',
    description: 'Control feature access with precision',
    handle: 'feature_flags',
    type: 'feature_flags',
    slug: 'feature-flags',
    color: 'green',
    colorSecondary: 'seagreen',
    category: 'product_engineering',
    seo: {
        title: 'Feature flags - PostHog',
        description: 'Safely roll out features to specific users or groups',
    },
    overview: {
        title: 'Safely roll out features to specific users or groups',
        description:
            'Test changes with small groups of users before rolling out wider. Then analyze usage with product analytics and session replay.',
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
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/hogs/feature-flags-hog.png',
        alt: 'A hedgehog toggling a feature flag',
        classes: 'absolute bottom-0 right-0 max-w-md',
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
    features: [
        {
            title: 'Boolean & multivariate feature flags',
            headline: 'Boolean & multivariate feature flags',
            description:
                'Create up to nine variants of a feature flag to test or release different versions of a feature.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/multivariate.png',
                    alt: 'Multivariate feature flags',
                    stylize: true,
                    shadow: true,
                },
            ],
        },
        {
            title: 'Test changes without pushing code',
            headline: 'Test changes without pushing code',
            description:
                'JSON payloads let you change text, visuals, or entire blocks of code directly from within PostHog – no code deployments needed – using <code>getFeatureFlagPayload()</code>.',
            // images: [
            //     {
            //         src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/payloads.png',
            //         alt: 'Test changes without touching your codebase',
            //     },
            // ],
            children: (
                <div className="grid grid-cols-12 gap-x-8 gap-y-4 -mt-4">
                    <div className="col-span-12">
                        <h4 className="text-xl mb-1">Feature flag payload</h4>
                        <p className="text-lg">
                            Enter the payload in the feature flag's settings (inside PostHog) as a value or an object.
                        </p>
                        <CodeBlock code={`{"title": "Test headline", "subtitle": "Test description"}`} language="js" />
                    </div>
                    <div className="col-span-7">
                        <h4 className="text-xl">Your code</h4>
                        <CodeBlock
                            code={`<h1>Default headline</h1>
<h2>Default description</h2>`}
                            language="html"
                        />
                        <CodeBlock
                            code={`posthog.onFeatureFlags(function () {
  if (posthog.isFeatureEnabled('headline-change')) {
    const swapText = posthog.getFeatureFlagPayload('headline-change');
    document.querySelector('h1').textContent = swapText.title;
    document.querySelector('h2').textContent = swapText.subtitle;
  }
});`}
                            language="js"
                        />
                    </div>
                    <div className="col-span-5">
                        <h4 className="text-xl">Output</h4>
                        <CodeBlock
                            code={`<h1>Test headline</h1>
<h2>Test description</h2>`}
                            language="html"
                        />
                        <p className="text-lg">
                            Serve any sort of changes from the payload like text or colors, or trigger functions.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: 'Release conditions',
            headline: 'Release conditions',
            description: 'Customize your rollout strategy by user or group properties, cohort, or traffic percentage.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/release-conditions.png',
                    alt: 'Release conditions',
                    stylize: true,
                    shadow: true,
                },
            ],
        },
        {
            title: 'Local evaluation ',
            headline: 'Local evaluation',
            description:
                "Improve speed by caching a flag's value on initial load.Or use the API to build your own UI. ",
            children: (
                <>
                    <h4 className="text-xl mb-1">
                        Use a single API request to get feature flag definitions and match your users locally.
                    </h4>
                    <p className="text-lg">The following will make an API request if the data is not already cached.</p>
                    <CodeBlock
                        code={`await client.getAllFlags('distinct id', {
  groups: {},
  personProperties: { is_authorized: True },
  groupProperties: {},
});`}
                        language="js"
                    />
                </>
            ),
        },
        {
            title: 'Bootstrapping',
            headline: 'Bootstrapping',
            description:
                'Bootstrap flags on initialization so all flags are available immediately, without having to make extra network requests.',
            children: (
                <div className="">
                    <h4 className="text-xl mb-1">
                        Make feature flags available at initialization without waiting for a response from PostHog.
                    </h4>
                    <p className="text-lg">
                        This is useful for redirecting to another page based on feature flag or showing variants
                        instantly.
                    </p>
                    <CodeBlock
                        code={`posthog.init('<ph_project_api_key>', {
  api_host: '<ph_client_api_host>',
  defaults: '<ph_posthog_js_defaults>',
  bootstrap: {
    distinctID: 'your-anonymous-id',
    featureFlags: {
      'flag-1': true,
      'variant-flag': 'control',
      'other-flag': false,
    },
  },
});
`}
                        language="js"
                    />
                </div>
            ),
        },
        {
            title: 'Testing & diagnostics',
            headline: 'Flag testing & diagnostics',
            description:
                'See how many times a flag has been evaluated, how many times each variant has been returned, and what values users received.',
            children: (
                <div className="-mt-5">
                    <h4 className="text-xl mb-1">Local development</h4>
                    <p className="text-lg">
                        When developing locally, you can set a flag's value in your browser's console.
                    </p>
                    <CodeBlock
                        code={`posthog.featureFlags.overrideFeatureFlags({ flags: {"myFlag": "test"}})`}
                        language="js"
                    />
                    <p className="text-lg">
                        This will persist until you call override again with the argument <code>false</code>.
                    </p>
                    <CodeBlock code={`posthog.featureFlags.overrideFeatureFlags(false)`} language="js" />
                </div>
            ),
        },
        {
            title: 'Developer-friendly automation',
            headline: 'Developer-friendly automation',
            description:
                'Automated usage reports, IP address resolution (for location-based targeting), and recall person properties to avoid passing them manually every time.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/reports.png',
                    alt: 'Developer-friendly automation',
                    stylize: true,
                    shadow: true,
                },
            ],
        },
        {
            title: 'Early access feature opt-in widget',
            headline: 'Early access feature opt-in widget',
            description:
                'Allow users to opt in to (or out of) specified features. Or use the API to build your own UI.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/FeatureFlags/images/early-access.png',
                    alt: 'Early access feature opt-in widget',
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
                    title: 'Persist flags across authentication',
                    description:
                        "Persist feature flags across authentication events so that flag values don't change when an anonymous user logs in and becomes identified.",
                },
                {
                    title: 'History & activity feed',
                    description: "See who hit a feature flag, the flag's value, and which page they were on",
                },
                {
                    title: 'Instant rollbacks',
                    description: 'Disable a feature without touching your codebase',
                },
                {
                    title: 'Bootstrapping',
                    description: 'Get flags and values to trigger changes immediately on page load',
                },
                {
                    title: 'Persist flags across authentication steps',
                    description: 'Make sure users have a consistent experience after login',
                },
                {
                    title: 'Flag administration',
                    description: 'See the history of a feature flag or control who can modify flags with user roles',
                },
                {
                    title: 'SDKs or API',
                    description: 'Copy code snippets for your library of choice, or implement yourself with the API',
                },
                {
                    title: 'Multi-environment support',
                    description:
                        'Test flags in local development or staging by using the same flag key across PostHog projects',
                },
            ],
        },
    ],
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
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'Triggers and workflows to enable/disable flags on other events',
                },
                {
                    title: 'Data exports',
                },
            ],
            us: [
                {
                    title: 'Integration with other analysis products',
                    subtitle: 'View replays attached to a flag, analyze data based on a flag, etc.',
                },
                {
                    title: 'JSON payloads',
                    subtitle: 'Flags can return JSON and trigger other in-app changes (like displaying a banner)',
                },
                {
                    title: 'Early access management suite for toggling betas or new features',
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
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        features: [
            {
                feature: 'Target by percentage',
                companies: {
                    launchdarkly: true,
                    optimizely: true,
                    flagsmith: true,
                    growthbook: true,
                    posthog: true,
                },
            },
            {
                feature: 'Target by person properties',
                companies: {
                    launchdarkly: true,
                    optimizely: true,
                    flagsmith: true,
                    growthbook: true,
                    posthog: true,
                },
            },
            {
                feature: 'Flag scheduling',
                companies: {
                    launchdarkly: true,
                    optimizely: false,
                    flagsmith: false,
                    growthbook: false,
                    posthog: true,
                },
            },
            {
                feature: 'Experimentation',
                companies: {
                    launchdarkly: true,
                    optimizely: true,
                    flagsmith: true,
                    growthbook: true,
                    posthog: true,
                },
            },
            {
                feature: 'Multivariate flags',
                companies: {
                    launchdarkly: true,
                    optimizely: false,
                    flagsmith: true,
                    growthbook: false,
                    posthog: true,
                },
            },
            {
                feature: 'Unlimited flags for free',
                companies: {
                    launchdarkly: false,
                    optimizely: true,
                    flagsmith: true,
                    growthbook: true,
                    posthog: true,
                },
            },
            {
                feature: 'Free third-party plugins',
                companies: {
                    launchdarkly: true,
                    optimizely: false,
                    flagsmith: true,
                    growthbook: false,
                    posthog: true,
                },
            },
            {
                feature: 'Activity logs',
                companies: {
                    launchdarkly: true,
                    optimizely: false,
                    flagsmith: true,
                    growthbook: false,
                    posthog: true,
                },
            },
            {
                feature: 'Data export',
                companies: {
                    launchdarkly: true,
                    optimizely: true,
                    flagsmith: false,
                    growthbook: true,
                    posthog: false,
                },
            },
            {
                feature: 'Multi-environment support',
                companies: {
                    launchdarkly: true,
                    optimizely: true,
                    flagsmith: true,
                    growthbook: true,
                    posthog: true,
                },
            },
            {
                feature: 'Automatic IP resolution',
                companies: {
                    launchdarkly: false,
                    optimizely: false,
                    flagsmith: false,
                    growthbook: false,
                    posthog: true,
                },
            },
            {
                feature: 'Recall person properties by default',
                companies: {
                    launchdarkly: false,
                    optimizely: false,
                    flagsmith: false,
                    growthbook: false,
                    posthog: true,
                },
            },
        ],
    },
    pairsWith: [
        {
            slug: 'product-analytics',
            description:
                "Run any insight filtered by a flag's value, or group by flag to see usage across a flag's variants",
        },
        {
            slug: 'product-analytics',
            description: "User paths: See how a flag's value influenced an intended outcome",
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
            'LaunchDarkly pioneered standalone flags. Optimizely came from A/B testing. We built flags as part of a complete platform. Everything shares the same data model. LaunchDarkly has more enterprise workflow stuff, but most teams just want flags that work with their analytics.',
        'feature-comparison':
            "We auto-resolve IPs and recall person properties. Sounds minor but eliminates whole bug categories. We don't have data export because... why would you? Your flag data is already in our analytics. Query it there.",
        docs: "Written by engineers who've actually built flag systems. Real code examples for every SDK. We cover the weird stuff - clock skew, network failures, race conditions. If something's broken, we tell you how to work around it.",
        'pairs-with':
            "Release a feature to 10% of users. Filter all analytics by that flag. Notice conversion dropped? Watch session replays of just those users. See the problem, fix it, roll out wider. This workflow only works when everything's actually integrated.",
        'getting-started':
            'One line to install. Create flag in UI. Add to code. Done. Later: add bootstrapping for instant flags, local evaluation for speed, multivariate for tests. Start simple, grow as needed.',
    },
}
