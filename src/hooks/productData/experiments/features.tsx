import React from 'react'
import { IconFlask, IconTarget, IconGraph, IconCode, IconPlug, IconPieChart } from '@posthog/icons'
import MCPInstall from 'components/Products/MCPInstall'

export const features = {
    experiment_types: {
        title: 'Experiment types',
        headline: 'Choose the right metric for your goal and track side effects across your product.',
        description:
            'Supports conversion funnels, count-based trends, value-based metrics, retention metrics, and ratio metrics',
        icon: <IconGraph />,
        color: 'purple',
        features: [
            {
                title: 'Funnel metrics',
                description: 'Track conversion rates across multi-step journeys, like signup flows or checkout.',
            },
            {
                title: 'Count & value metrics',
                description:
                    'Measure totals such as pageviews or clicks, or capture values like revenue, order size, or time spent.',
            },
            {
                title: 'Ratio metrics',
                description: 'Test ratios such as percentage of positive feedback to capture deeper insights.',
            },
            {
                title: 'Primary & secondary metrics',
                description: 'Monitor main goals while watching for negative side effects',
            },
            {
                title: 'Shared metrics library',
                description: 'Create reusable metrics across experiments for consistency and easy experiment setup.',
            },
        ],
    },
    supported_tests: {
        title: 'Supported tests',
        headline: 'Run a variety of tests depending on your needs',
        icon: <IconFlask />,
        color: 'blue',
        features: [
            {
                title: 'A/B testing',
                description:
                    'Compare two versions of a feature or flow using count, value, funnel, or ratio metrics. The standard way to see what works best.',
            },
            {
                title: 'A/A testing',
                description:
                    'Run a test with no changes between variants to verify your experiment setup is working correctly and not producing false positives.',
            },
            {
                title: 'A/B/N testing',
                description:
                    'Run experiments with three or more variants to quickly identify the best-performing option.',
            },
            {
                title: 'Holdout testing',
                description:
                    "Reserve a group of users who don't see any changes, so you can measure long-term impact against a true baseline.",
            },
            {
                title: 'Fake door testing',
                description:
                    'Measure interest in a potential feature by exposing users to a “coming soon” entry point before building it.',
            },
            {
                title: 'Redirect testing',
                description:
                    'Send users to different versions of a page or flow (like a signup path) to test changes at the navigation level.',
            },
        ],
    },
    targeting_rules: {
        title: 'Targeting rules',
        headline: 'Target by user properties, cohorts, geographic location, or custom conditions',
        icon: <IconTarget />,
        color: 'yellow',
        features: [
            {
                title: 'Cohort integration',
                description: 'Target specific user segments or behavioral cohorts.',
            },
            {
                title: 'Geographic targeting',
                description: 'Limit experiments to certain countries or regions to account for local differences.',
            },
            {
                title: 'Percentage rollouts',
                description: 'Start with a small slice of users (e.g. 5%) and gradually expand once results look good.',
            },
            {
                title: 'Group-level experiments',
                description: 'Run tests at the organization, account, or team level – ideal for B2B products.',
            },
            {
                title: 'Holdouts',
                description:
                    'Set aside a random group of users who never see the change, giving you a clean baseline for long-term measurement.',
            },
        ],
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/us_posthog_com_project_2_feature_flags_160557_cc3f425138.png',
                alt: 'Targeting rules',
                shadow: true,
            },
        ],
    },
    customizable_metrics: {
        title: 'Customizable metrics',
        headline: 'Customizable metrics',
        description:
            'Conversion funnels or trends, secondary metrics, and range for statistical significance. You can also use a primary or secondary metric from a data warehouse table.',
        icon: <IconPieChart />,
        color: 'seagreen',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Screenshot_2026_04_02_at_09_41_55_b0364113d7.png',
                alt: 'Customizable metrics',
                shadow: true,
            },
        ],
    },
    // Auto recommendations (commented out in the previous product page – kept for future use)
    // auto_recommendations: {
    //     title: 'Auto recommendations',
    //     headline: 'Built-in guidance for successful experiments',
    //     description:
    //         'Get automatic recommendations for sample size, test duration, and minimum detectable effects based on your data',
    //     features: [
    //         {
    //             title: 'Sample size calculator',
    //             description: 'Know how many users you need based on your minimum detectable effect',
    //         },
    //         {
    //             title: 'Duration estimates',
    //             description: 'Get recommendations on how long to run your test',
    //         },
    //         {
    //             title: 'Pre-launch checklist',
    //             description: 'Ensure your experiment is set up correctly before launch',
    //         },
    //         {
    //             title: 'Health monitoring',
    //             description: 'Automatic alerts for sample ratio mismatch and other issues',
    //         },
    //     ],
    //     images: [
    //         {
    //             src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/AbTesting/images/recommendations.png',
    //             alt: 'Smart recommendations',
    //             stylize: true,
    //             shadow: true,
    //         },
    //     ],
    // },
    developer_friendly: {
        title: 'Developer-friendly implementation',
        headline: 'Simple integration with powerful capabilities',
        description: 'Built on our feature flag infrastructure with all major SDKs supported',
        icon: <IconCode />,
        color: 'blue',
        features: [
            {
                title: 'Feature flag foundation',
                description:
                    "Experiments run on PostHog's battle-tested feature flag infrastructure, with full support across all major SDKs.",
            },
            {
                title: 'JSON payloads',
                description:
                    'Pass structured data to variants, letting you dynamically configure and change user experiences without redeploys.',
            },
            {
                title: 'Multivariate testing',
                description:
                    'Run tests with up to 9 variants plus a control, giving you the flexibility to explore multiple approaches at once.',
            },
            {
                title: 'Local evaluation',
                description: 'Zero latency with flag values evaluated on your server.',
            },
            {
                title: 'Cross-platform SDKs',
                description:
                    'Web, mobile, backend, and server-side SDKs make it easy to run consistent experiments anywhere in your stack.',
            },
        ],
    },
    statistical_methods: {
        title: 'Statistical methods',
        headline: 'Bayesian vs. Frequentist',
        description: "Whether you're scrappy or super smart, we've got a statistical method for you.",
        icon: <IconPieChart />,
        color: 'purple',
        // Condensed from the previous StatisticalMethodsSlide – full advantage/best-for
        // tables are a content gap if you want them restored as a dedicated section.
        features: [
            {
                title: 'Bayesian',
                description: 'Popular with tech companies, check results anytime',
            },
            {
                title: 'Frequentist',
                description: 'Classical academic approach, fixed analysis',
            },
            {
                title: 'Bayesian – win probability',
                description: 'Direct probability that one variant outperforms another',
            },
            {
                title: 'Bayesian – credible intervals',
                description: 'The likely range of the true effect size',
            },
            {
                title: 'Frequentist – p-value',
                description: 'Probability of observing results if no real difference exists.',
            },
            {
                title: 'Frequentist – confidence intervals',
                description: 'The likely range of the true effect size',
            },
        ],
    },
    mcp: {
        title: 'MCP',
        headline: 'Run experiments from your editor',
        description:
            'Create A/B tests, check statistical significance, and manage the full experiment lifecycle from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
        icon: <IconPlug />,
        color: 'blue',
        features: [
            {
                title: 'Create experiments alongside your code',
                description: "Set up an A/B test for a feature you're building without leaving your editor.",
            },
            {
                title: 'Check results before shipping',
                description: 'Ask "what are the results of the checkout experiment?" to decide whether to merge.',
            },
            {
                title: 'Manage experiment lifecycle',
                description: 'Update targeting, adjust traffic splits, or archive completed experiments.',
            },
            {
                title: 'Validate implementation',
                description: 'Check that you correctly configured your feature flag before launching an experiment.',
            },
        ],
        children: <MCPInstall />,
    },
}
