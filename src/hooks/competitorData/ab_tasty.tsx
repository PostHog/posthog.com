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
            },
        },
        experiments: {
            available: true,
            features: {
                funnel_tests: false,
            },
            analysis: {
                statistics_engine: 'Bayesian, Frequentist',
            },
        },
        product_analytics: {
            available: false,
        },
        session_replay: {
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
    },
    pricing: {
        model: 'Quote-based',
    },
}
