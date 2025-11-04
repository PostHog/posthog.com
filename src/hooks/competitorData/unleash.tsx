export const unleash = {
    name: 'Unleash',
    key: 'unleash',
    assets: {
        icon: '/images/competitors/unleash.svg',
    },
    products: {
        product_analytics: {
            available: false,
            features: {
                cohorts: true,
            },
        },
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
            },
        },
        experiments: {
            available: 'Requires 3rd-party analytics',
        },
        session_replay: {
            available: false,
        },
    },
    platform: {
        deployment: {
            open_source: true,
            self_host: true,
            eu_hosting: true,
        },
        pricing: {
            self_serve: true,
            transparent_pricing: true,
        },
        security: {
            history_audit_logs: true,
            role_based_access_control: true,
        },
    },
    pricing: {
        model: 'Free + cloud subscription',
    },
}
