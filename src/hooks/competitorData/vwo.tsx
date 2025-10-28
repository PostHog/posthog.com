export const vwo = {
    name: 'VWO',
    key: 'vwo',
    assets: {
        icon: '/images/competitors/vwo.svg',
    },
    products: {
        experiments: {
            available: true,
            features: {
                unlimited_experiments: true,
                bayesian_statistics: false,
                check_results_anytime: false,
                cross_domain_experiments: true,
                duration_prediction: true,
                group_level_experiments: false,
                integrated_session_replay: true,
                minimum_metrics: true,
                multivariate_experiments: true,
                secondary_metrics: true,
                shared_metrics_library: false,
                target_by_cohort: true,
                target_by_person_property: true,
                traffic_allocation: true,
            },
        },
    },
    platform: {
        open_source: false,
        self_host: false,
        usage_based_pricing: false,
        transparent_pricing: false,
        free_tier: false,
    },
    pricing: {
        model: 'Tier-based',
    },
}
