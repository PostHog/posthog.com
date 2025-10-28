export const rollbar = {
    name: 'Rollbar',
    key: 'rollbar',
    assets: {
        icon: '/images/competitors/rollbar.svg',
    },
    products: {
        error_tracking: {
            available: true,
            features: {
                error_alerts: true,
                exception_capture: true,
                issue_management: true,
                error_grouping: true,
                stack_tracing: true,
                network_performance: false,
                source_map_support: true,
            },
        },
    },
    platform: {
        open_source: false,
        self_host: false,
        usage_based_pricing: true,
        transparent_pricing: false,
        free_tier: true,
    },
    pricing: {
        model: 'Usage-based',
    },
}
