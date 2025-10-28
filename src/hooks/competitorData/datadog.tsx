export const datadog = {
    name: 'Datadog',
    key: 'datadog',
    assets: {
        icon: '/images/competitors/datadog.svg',
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
                session_replays: true,
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
