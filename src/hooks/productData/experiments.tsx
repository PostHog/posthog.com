import React from 'react'
import { IconFlask } from '@posthog/icons'

export const experiments = {
    Icon: IconFlask,
    name: 'Experiments',
    handle: 'experiments',
    type: 'feature_flags', // Uses feature_flags billing
    billedWith: 'Feature flags',
    sharesFreeTier: 'feature_flags',
    slug: 'experiments',
    color: 'purple',
    colorSecondary: 'lilac',
    category: 'product',
    seo: {
        title: 'Experiments - PostHog',
        description: 'Run statistically-significant multivariate tests and robust targeting & exclusion rules.',
    },
    answersDescription: 'Test changes with statistical significance',
    overview: {
        title: 'Test changes with statistical significance',
        description:
            'Run A/B tests with our advanced Bayesian statistical engine. Check results anytime without p-hacking concerns, get clear win probabilities, and make confident decisions faster.',
        textColor: 'text-white', // tw
    },
    screenshots: [
        {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Xnapper_2025_01_20_15_25_58_0867c02f69.png',
            alt: 'Screenshot of managing an A/B test in PostHog',
            classes: '',
        },
    ],
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/ab-testing-hog.png',
        alt: 'Hedgehog experimenting',
        classes: 'absolute bottom-0 right-0 max-w-md',
    },
    customers: {
        ycombinator: {
            headline: 'boosted community engagement by 40%',
            description:
                "Y Combinator uses PostHog's experiments to try new ideas, which has led to significant improvements.",
        },
        researchgate: {
            headline: 'tests product changes for over 25M users',
            description:
                'Our data scientists are able to rapidly and autonomously iterate on the data models that power our home feed.',
        },
        vendasta: {
            headline: 'increased registrations by 30%',
            description:
                "This experiment cuts drop-off in half – that's a 50% improvement without a single user complaining!",
        },
        assemblyai: {
            headline: 'switched from Mixpanel for a leaner stack',
            description: 'I feel like, every single week, we discover something new that makes a difference.',
        },
    },
    features: [
        {
            title: 'Bayesian statistical engine',
            headline: 'Advanced Bayesian statistics for faster decisions',
            description:
                'Check results anytime without p-hacking concerns. Get clear win probabilities and credible intervals that show the likely range of improvement.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/AbTesting/images/goals.png',
                    alt: 'Bayesian statistics visualization',
                },
            ],
            features: [
                {
                    title: 'Real-time results',
                    description: 'Check experiment results anytime without statistical penalties or peeking problems',
                },
                {
                    title: 'Clear probability statements',
                    description: 'Get direct statements like "95% probability that variant B is better than control"',
                },
                {
                    title: 'Credible intervals',
                    description: 'See the likely range of improvement with visual confidence bands',
                },
                {
                    title: 'No fixed sample sizes',
                    description: 'Make decisions when you have enough evidence, not when you hit an arbitrary number',
                },
            ],
        },
        {
            title: 'Flexible experiment types',
            headline: 'Test any metric that matters to your business',
            description: 'Support for conversion funnels, count-based trends, value-based metrics, and custom goals',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/AbTesting/images/targeting-ab.png',
                    alt: 'Experiment metrics and goals',
                },
            ],
            features: [
                {
                    title: 'Funnel metrics',
                    description: 'Test conversion rates through multi-step user journeys',
                },
                {
                    title: 'Count-based trends',
                    description: 'Measure events like pageviews, clicks, or feature usage',
                },
                {
                    title: 'Value-based trends',
                    description: 'Track revenue, time spent, or any numeric value',
                },
                {
                    title: 'Primary & secondary metrics',
                    description: 'Monitor main goals while watching for negative side effects',
                },
                {
                    title: 'Shared metrics library',
                    description: 'Create reusable metrics across experiments for consistency',
                },
            ],
        },
        {
            title: 'Smart recommendations',
            headline: 'Built-in guidance for successful experiments',
            description:
                'Get automatic recommendations for sample size, test duration, and minimum detectable effects based on your data',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/AbTesting/images/recommendations.png',
                    alt: 'Smart recommendations',
                },
            ],
            features: [
                {
                    title: 'Sample size calculator',
                    description: 'Know how many users you need based on your minimum detectable effect',
                },
                {
                    title: 'Duration estimates',
                    description: 'Get recommendations on how long to run your test',
                },
                {
                    title: 'Pre-launch checklist',
                    description: 'Ensure your experiment is set up correctly before launch',
                },
                {
                    title: 'Health monitoring',
                    description: 'Automatic alerts for sample ratio mismatch and other issues',
                },
            ],
        },
        {
            title: 'Advanced targeting',
            headline: 'Precise control over who sees your experiments',
            description: 'Target by user properties, cohorts, geographic location, or custom conditions',
            features: [
                {
                    title: 'User property targeting',
                    description: 'Target based on any user attribute you track',
                },
                {
                    title: 'Cohort integration',
                    description: 'Run experiments on specific user segments or behavioral cohorts',
                },
                {
                    title: 'Geographic targeting',
                    description: 'Test changes in specific countries or regions',
                },
                {
                    title: 'Percentage rollouts',
                    description: 'Start small with 5% of users and scale up safely',
                },
                {
                    title: 'Group-level experiments',
                    description: 'Test at organization or team level for B2B products',
                },
            ],
        },
        {
            title: 'Developer-friendly implementation',
            headline: 'Simple integration with powerful capabilities',
            description: 'Built on our feature flag infrastructure with all major SDKs supported',
            features: [
                {
                    title: 'Feature flag foundation',
                    description: 'Each experiment is a feature flag with statistical superpowers',
                },
                {
                    title: 'JSON payloads',
                    description: 'Pass configuration data to dynamically change experiences',
                },
                {
                    title: 'Multivariate testing',
                    description: 'Test up to 9 variants against a control group',
                },
                {
                    title: 'Local evaluation',
                    description: 'Zero latency with cached flag values',
                },
                {
                    title: 'All major platforms',
                    description: 'SDKs for web, mobile, backend, and more',
                },
            ],
        },
    ],
    questions: [
        {
            question: 'Does this new onboarding flow increase conversion?',
        },
        {
            question: 'How does this affect adoption in Europe?',
        },
        {
            question: 'Will enterprise customers like this new feature?',
        },
        {
            question: 'Which pricing model generates more revenue?',
        },
        {
            question: 'Does simplifying our signup form reduce drop-off?',
        },
        {
            question: 'Will this UI change improve user engagement?',
        },
        {
            question: 'Should we show social proof on the landing page?',
        },
        {
            question: 'Does the new checkout flow reduce cart abandonment?',
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'No-code experiments or CMS capabilities',
                    subtitle: "You'll still need a designer/engineer to create experiments",
                },
                {
                    title: 'No integration with Google Ads',
                    subtitle:
                        "PostHog can't run ad experiments, or target users into an experiment based on an ad variant engagement.",
                },
            ],
            us: [
                {
                    title: 'Bayesian statistical engine',
                    subtitle:
                        'Check results anytime without p-hacking. Get clear win probabilities instead of confusing p-values.',
                },
                {
                    title: 'Integration with other PostHog products',
                    subtitle:
                        'Attach surveys to experiments or view replays for a test group. Analyze results beyond your initial hypothesis or goal metric.',
                },
                {
                    title: 'No fixed sample size requirements',
                    subtitle: 'Make decisions when you have enough evidence, not when you hit an arbitrary number',
                },
                {
                    title: 'Group-level experiments for B2B',
                    subtitle:
                        'Test features at the organization level to avoid contamination between users in the same company',
                },
                {
                    title: 'Shared metrics library',
                    subtitle: 'Create consistent, reusable metrics across all experiments',
                },
            ],
        },
        features: [
            {
                feature: 'Unlimited experiments',
                companies: {
                    AmplitudeExperiments: true,
                    Optimizely: true,
                    VWO: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Multivariate experiments',
                companies: {
                    AmplitudeExperiments: true,
                    Optimizely: true,
                    VWO: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Secondary goals',
                companies: {
                    AmplitudeExperiments: true,
                    Optimizely: true,
                    VWO: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Minimum goals',
                companies: {
                    AmplitudeExperiments: true,
                    Optimizely: true,
                    VWO: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Duration prediction',
                companies: {
                    AmplitudeExperiments: false,
                    Optimizely: false,
                    VWO: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Cross-domain experiments',
                companies: {
                    AmplitudeExperiments: false,
                    Optimizely: true,
                    VWO: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Traffic allocation',
                companies: {
                    AmplitudeExperiments: false,
                    Optimizely: true,
                    VWO: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Target by location',
                companies: {
                    AmplitudeExperiments: true,
                    Optimizely: true,
                    VWO: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Target by cohort',
                companies: {
                    Pendo: true,
                    Optimizely: true,
                    VWO: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Target by person property',
                companies: {
                    Pendo: true,
                    Optimizely: true,
                    VWO: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Bayesian statistics',
                companies: {
                    AmplitudeExperiments: false,
                    Optimizely: false,
                    VWO: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Check results anytime',
                companies: {
                    AmplitudeExperiments: false,
                    Optimizely: false,
                    VWO: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Group-level experiments',
                companies: {
                    AmplitudeExperiments: false,
                    Optimizely: false,
                    VWO: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Integrated session replay',
                companies: {
                    AmplitudeExperiments: false,
                    Optimizely: false,
                    VWO: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Shared metrics library',
                companies: {
                    AmplitudeExperiments: false,
                    Optimizely: false,
                    VWO: false,
                    PostHog: true,
                },
            },
        ],
    },
    pairsWith: [
        {
            slug: 'product-analytics',
            description: 'Run analysis based on the value of a test, or build a cohort of users from a test variant',
        },
        {
            slug: 'session-replay',
            description:
                "Watch recordings of users in a variant to discover nuances in why they did or didn't complete the goal",
        },
        {
            slug: 'feature-flags',
            description:
                'Make changes to the feature flag the experiment uses - including JSON payload for each variant',
        },
    ],
}
