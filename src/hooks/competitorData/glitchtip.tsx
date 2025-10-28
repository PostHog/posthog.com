export const glitchtip = {
    name: 'GlitchTip',
    key: 'glitchtip',
    assets: {
        icon: '/images/competitors/glitchtip.svg',
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
        open_source: true,
        self_host: true,
        usage_based_pricing: false,
        transparent_pricing: true,
        free_tier: true,
        ci_cd_integrations: 'Limited',
    },
    pricing: {
        model: 'Free',
    },
}
