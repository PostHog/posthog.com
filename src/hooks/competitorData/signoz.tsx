export const signoz = {
    name: 'SigNoz',
    key: 'signoz',
    assets: {
        icon: '/images/competitors/signoz.svg',
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
        },
    },
    platform: {
        open_source: true,
        self_host: true,
        usage_based_pricing: false,
        transparent_pricing: true,
        free_tier: true,
        mobile_sdk_coverage: 'Partial',
        release_tracking: 'Partial',
        ci_cd_integrations: 'Partial',
    },
    pricing: {
        model: 'Free',
    },
}
