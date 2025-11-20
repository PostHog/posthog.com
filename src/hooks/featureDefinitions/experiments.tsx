export const experimentsFeatures = {
    summary: {
        name: 'Experiments',
        description: 'Run statistically rigorous A/B/n tests and validate ideas with confidence',
        url: '/experiments',
        docsUrl: '/docs/experiments',
    },
    pricing: {
        free_tier: {
            name: 'Monthly free tier',
        },
    },
    features: {
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
        custom_goals: {
            name: 'Custom goals',
            description: 'Define your own goals and metrics to track',
        },
        secondary_metrics: {
            name: 'Secondary metrics',
            description: 'Monitor impact on unrelated metrics',
        },
        shared_metrics_library: {
            name: 'Shared metrics library',
            description: 'Create reusable metrics across experiments for consistency and easy experiment setup',
        },
        experiment_analysis: {
            name: 'Experiment analysis',
            description: 'Analyze results of A/B tests',
        },
        funnel_tests: {
            name: 'Funnel tests',
            description: 'Use conversion funnels as goals for your A/B test',
        },
        no_code_experiments: {
            name: 'No-code experiments',
            description: 'Modify your website and run experiments without writing code',
        },
        low_code_experiments: {
            name: 'Low-code experiments',
            description: 'Implement experiments with a small amount of code',
        },
        split_testing: {
            name: 'Split testing',
            description: 'Split participants into groups',
        },
        recommended_run_time: {
            name: 'Recommended run time',
            description: 'Automatically calculate the recommended run time and sample size',
        },
        dynamic_cohorts: {
            name: 'Dynamic cohorts',
            description: 'Add new users to an experiment automatically by setting a user property',
        },
        native_goal_tracking: {
            name: 'Native goal tracking',
            description: 'Track impact on goals without external sources',
        },
        namespacing: {
            name: 'Namespacing',
            description: 'Avoid conflicts by assigning all users to a namespace',
        },
        visual_editor: {
            name: 'Visual editor',
            description: 'Create and edit experiments in your app',
        },
    },
    supported_tests: {
        description: 'Run a variety of tests depending on your needs',
        features: {
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
                description:
                    'Run experiments with three or more variants to quickly identify the best-performing option',
            },
            data_warehouse_experiments: {
                name: 'Data warehouse experiments',
                description: 'Run A/B tests natively on data in your existing warehouse',
            },
            fake_door_testing: {
                name: 'Fake door testing',
                description:
                    'Measure interest in a potential feature by exposing users to a "coming soon" entry point before building it',
            },
            holdout_testing: {
                name: 'Holdout testing',
                description:
                    'Reserve a group of users who do not see any changes, so you can measure long-term impact against a true baseline',
            },
            multi_armed_bandit: {
                name: 'Multi-armed bandit',
                description: 'Optimize tests automatically by allocating traffic to the best performing variant',
            },
            mutually_exclusive_experiments: {
                name: 'Mutually exclusive experiments',
                description: 'Isolate user groups for simultaneous, independent experiments',
            },
            redirect_testing: {
                name: 'Redirect testing',
                description:
                    'Send users to different versions of a page or flow to test changes at the navigation level',
            },
        },
    },
    targeting: {
        description: 'Precisely target who sees each variant',
        features: {
            cohort_integration: {
                name: 'Cohort integration',
                description: 'Target specific user segments or behavioral cohorts',
            },
            custom_targeting: {
                name: 'Custom targeting',
                description: 'Target users by properties and other attributes',
            },
            geographic_targeting: {
                name: 'Geographic targeting',
                description: 'Limit experiments to certain countries or regions to account for local differences',
            },
            target_by_percentage: {
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
    },
    implementation: {
        description: 'Build on feature flags with developer-friendly tooling',
        features: {
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
                name: 'Multivariate (A/B/n) testing',
                description: 'Test multiple variables simultaneously to find optimal combinations',
            },
            api_access: {
                name: 'API access',
                description: 'Evaluate experiments programmatically using PostHog API',
            },
        },
    },
    analysis: {
        description: 'Measure results with statistical rigor',
        features: {
            llm_support: {
                name: 'AI/LLM support',
                description: 'Compare models with experiments, view performance, cost, and latency',
            },
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
            statistics_engine: {
                name: 'Statistics engine',
                description: 'How the results of an experiment are calculated',
            },
        },
    },
    platforms: {
        description: 'Run experiments across all major platforms',
        features: {
            web: {
                name: 'Web experiments',
                description: 'Run experiments on your website or app',
            },
            mobile: {
                name: 'Mobile experiments',
                description: 'Supports Android, iOS, React Native, and Flutter',
            },
        },
    },
}
