export const ab_tasty = {
    name: 'AB Tasty',
    key: 'ab_tasty',
    assets: {
        icon: '/images/competitors/ab-tasty.svg',
    },
    products: {
        feature_flags: {
            available: true,
            features: {
                automation: true,
                json_payloads: true,
            },
            implementation: {
                local_evaluation: true,
            },
            management: {
                data_source: 'First-party',
                flag_scheduling: true,
                multi_environment: true,
            },
        },
        experiments: {
            available: true,
            features: {
                funnel_tests: false,
                no_code_experiments: true,
            },
            analysis: {
                statistics_engine: 'Bayesian, Frequentist',
            },
            targeting: {
                features: {
                    custom_targeting: true,
                },
            },
        },
        product_analytics: {
            available: false,
            features: {
                autocapture: false,
            },
            insights: {
                features: {
                    alerts: true,
                },
            },
        },
        session_replay: {
            available: false,
        },
        heatmaps: {
            available: false,
        },
        surveys: {
            available: false,
        },
    },
    platform: {
        deployment: {
            open_source: false,
        },
        pricing: {
            self_serve: false,
            transparent_pricing: false,
        },
        developer: {
            api: 'Edit only',
        },
        security: {
            history_audit_logs: false,
            role_based_access_control: true,
        },
        tools: {
            cms: false,
            notebooks: false,
            project_management_tools: false,
        },
    },
    pricing: {
        model: 'Quote-based',
    },
}
