export const experimentsFeatures = {
    summary: {
        name: 'Experiments',
        description: 'Run statistically rigorous A/B tests and validate ideas with confidence',
    },
    experiment_types: {
        funnel_metrics: {
            name: 'Funnel metrics',
            description: 'Track conversion rates across multi-step journeys, like signup flows or checkout',
        },
        count_value_metrics: {
            name: 'Count and value metrics',
            description:
                'Measure totals such as pageviews or clicks, or capture values like revenue, order size, or time spent',
        },
        ratio_metrics: {
            name: 'Ratio metrics',
            description: 'Test ratios such as percentage of positive feedback to capture deeper insights',
        },
        primary_secondary_metrics: {
            name: 'Primary and secondary metrics',
            description: 'Monitor main goals while watching for negative side effects',
        },
        shared_metrics_library: {
            name: 'Shared metrics library',
            description: 'Create reusable metrics across experiments for consistency and easy experiment setup',
        },
    },
    supported_tests: {
        ab_testing: {
            name: 'A/B testing',
            description: 'Compare two versions of a feature or flow using count, value, funnel, or ratio metrics',
        },
        aa_testing: {
            name: 'A/A testing',
            description:
                'Test identical variants to validate your setup and ensure results are not biased by random chance',
        },
        abn_testing: {
            name: 'A/B/N testing',
            description: 'Run experiments with three or more variants to quickly identify the best-performing option',
        },
        holdout_testing: {
            name: 'Holdout testing',
            description:
                'Reserve a group of users who do not see any changes, so you can measure long-term impact against a true baseline',
        },
        fake_door_testing: {
            name: 'Fake door testing',
            description:
                'Measure interest in a potential feature by exposing users to a "coming soon" entry point before building it',
        },
        redirect_testing: {
            name: 'Redirect testing',
            description: 'Send users to different versions of a page or flow to test changes at the navigation level',
        },
    },
    targeting: {
        cohort_integration: {
            name: 'Cohort integration',
            description: 'Target specific user segments or behavioral cohorts',
        },
        geographic_targeting: {
            name: 'Geographic targeting',
            description: 'Limit experiments to certain countries or regions to account for local differences',
        },
        percentage_rollouts: {
            name: 'Percentage rollouts',
            description: 'Start with a small slice of users and gradually expand once results look good',
        },
        group_level_experiments: {
            name: 'Group-level experiments',
            description: 'Run tests at the organization, account, or team level – ideal for B2B products',
        },
        holdouts: {
            name: 'Holdouts',
            description:
                'Set aside a random group of users who never see the change, giving you a clean baseline for long-term measurement',
        },
        exclusion_rules: {
            name: 'Exclusion rules',
            description: 'Exclude specific users, cohorts, or properties from experiments',
        },
    },
    implementation: {
        feature_flag_foundation: {
            name: 'Feature flag foundation',
            description:
                "Experiments run on PostHog's battle-tested feature flag infrastructure, with full support across all major SDKs",
        },
        json_payloads: {
            name: 'JSON payloads',
            description:
                'Pass structured data to variants, letting you dynamically configure and change user experiences without redeploys',
        },
        multivariate_testing: {
            name: 'Multivariate testing',
            description: 'Test multiple variables simultaneously to find optimal combinations',
        },
        api_access: {
            name: 'API access',
            description: 'Evaluate experiments programmatically using PostHog API',
        },
    },
    analysis: {
        statistical_significance: {
            name: 'Statistical significance',
            description: 'Automatic calculation of statistical significance with configurable confidence levels',
        },
        results_visualization: {
            name: 'Results visualization',
            description: 'Clear visualizations of experiment results with winners and losers highlighted',
        },
        side_effect_monitoring: {
            name: 'Side effect monitoring',
            description: 'Track secondary metrics to catch unintended consequences',
        },
    },
}
