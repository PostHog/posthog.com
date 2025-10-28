export const flagsmith = {
    name: 'Flagsmith',
    key: 'flagsmith',
    assets: {
        icon: '/images/competitors/flagsmith.svg',
    },
    products: {
        feature_flags: {
            available: true,
            features: {
                target_by_percentage: true,
                target_by_person_properties: true,
                flag_scheduling: false,
                experimentation: true,
                multivariate_flags: true,
                unlimited_flags_for_free: true,
                free_third_party_plugins: true,
                activity_logs: true,
                data_export: false,
                multi_environment_support: true,
            },
        },
    },
    platform: {
        open_source: 'Open core',
        self_host: true,
        usage_based_pricing: true,
        transparent_pricing: true,
        free_tier: true,
        built_in_analytics: false,
    },
    pricing: {
        model: 'Usage-based',
    },
}
