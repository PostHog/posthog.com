export const split = {
    name: 'Split',
    key: 'split',
    assets: {
        icon: '/images/competitors/split.svg',
    },
    products: {
        feature_flags: {
            available: true,
            features: {
                json_payloads: true,
            },
            implementation: {
                features: {
                    local_evaluation: true,
                },
            },
            management: {
                features: {
                    flag_scheduling: true,
                    multi_environment: true,
                },
            },
        },
        experiments: {
            available: true,
        },
        product_analytics: {
            available: false,
            features: {
                cohorts: true,
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
    },
    platform: {
        deployment: {
            open_source: false,
            self_host: false,
            eu_hosting: false,
        },
        pricing: {
            self_serve: true,
            transparent_pricing: false,
        },
        security: {
            history_audit_logs: true,
            role_based_access_control: true,
        },
    },
    pricing: {
        model: 'Quote-based',
    },
}
