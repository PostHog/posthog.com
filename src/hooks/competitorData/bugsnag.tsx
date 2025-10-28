export const bugsnag = {
    name: 'Bugsnag',
    key: 'bugsnag',
    assets: {
        icon: '/images/competitors/bugsnag.svg',
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
                network_performance: true,
                source_map_support: true,
            },
            integrations: {
                ab_experiments: true,
            },
        },
    },
    platform: {
        open_source: false,
        self_host: false,
        usage_based_pricing: false,
        transparent_pricing: false,
        free_tier: true,
    },
    pricing: {
        model: 'Seat-based',
    },
}
