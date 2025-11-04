export const devcycle = {
    name: 'DevCycle',
    key: 'devcycle',
    assets: {
        icon: '/images/competitors/devcycle.svg',
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
            },
        },
        experiments: {
            available: false,
        },
        product_analytics: {
            available: false,
            features: {
                cohorts: true,
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
            transparent_pricing: true,
        },
        security: {
            history_audit_logs: true,
            role_based_access_control: true,
        },
    },
    pricing: {
        model: 'Subscription',
    },
}
