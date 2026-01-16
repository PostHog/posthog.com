export const harness = {
    name: 'Harness',
    key: 'harness',
    assets: {
        icon: '/images/competitors/harness.svg',
    },
    products: {
        feature_flags: {
            available: true,
            features: {
                json_payloads: true,
            },
            implementation: {
                local_evaluation: true,
            },
            management: {
                flag_scheduling: true,
                multi_environment: true,
            },
        },
        experiments: {
            available: true,
            features: {
                funnel_tests: false,
            },
            analysis: {
                statistics_engine: 'Frequentist',
            },
        },
        product_analytics: {
            available: false,
            insights: {
                features: {
                    alerts: true,
                },
            },
        },
        session_replay: {
            available: false,
        },
    },
    platform: {
        deployment: {
            open_source: 'SDKs',
        },
        pricing: {
            self_serve: true,
            transparent_pricing: true,
        },
        developer: {
            api: 'Edit only',
        },
        security: {
            history_audit_logs: true,
            role_based_access_control: true,
        },
    },
    pricing: {
        model: 'Free + subscription',
    },
}
