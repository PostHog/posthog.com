export const optimizely = {
    name: 'Optimizely',
    key: 'optimizely',
    assets: {
        icon: '/images/competitors/optimizely.svg',
        comparisonArticle: '/blog/posthog-vs-optimizely',
    },
    products: {
        feature_flags: {
            available: true,
            features: {
                target_by_percentage: true,
                target_by_person_properties: true,
                flag_scheduling: false,
                experimentation: true,
                multivariate_flags: false,
                unlimited_flags_for_free: true,
                free_third_party_plugins: false,
                activity_logs: false,
                data_export: true,
                multi_environment_support: true,
            },
        },
    },
    platform: {
        open_source: false,
        self_host: false,
        usage_based_pricing: true,
        transparent_pricing: false,
        free_tier: true,
        built_in_analytics: false,
    },
    pricing: {
        model: 'Usage-based',
    },
}
