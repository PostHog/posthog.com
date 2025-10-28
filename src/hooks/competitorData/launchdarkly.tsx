export const launchdarkly = {
    name: 'LaunchDarkly',
    key: 'launchdarkly',
    assets: {
        icon: '/images/competitors/launchdarkly.svg',
        comparisonArticle: '/blog/posthog-vs-launchdarkly',
    },
    products: {
        feature_flags: {
            available: true,
            features: {
                target_by_percentage: true,
                target_by_person_properties: true,
                flag_scheduling: true,
                experimentation: true,
                multivariate_flags: true,
                unlimited_flags_for_free: false,
                free_third_party_plugins: true,
                activity_logs: true,
                data_export: true,
                multi_environment_support: true,
            },
        },
    },
    platform: {
        open_source: false,
        self_host: false,
        usage_based_pricing: false,
        transparent_pricing: false,
        free_tier: false,
        built_in_analytics: false,
    },
    pricing: {
        model: 'Seat-based + usage',
    },
}
