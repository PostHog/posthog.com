export const growthbook = {
    name: 'GrowthBook',
    key: 'growthbook',
    assets: {
        icon: '/images/competitors/growthbook.svg',
        comparisonArticle: '/blog/posthog-vs-growthbook',
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
        open_source: true,
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
