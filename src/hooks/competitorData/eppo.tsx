export const eppo = {
    name: 'Eppo',
    key: 'eppo',
    assets: {
        icon: '/images/competitors/eppo.svg',
    },
    products: {
        feature_flags: {
            available: true,
            features: {
                local_evaluation: false,
                json_payloads: true,
                scheduling: true,
            },
            management: {
                features: {
                    flag_scheduling: true,
                },
            },
        },
        experiments: {
            available: true,
            features: {
                llm_support: true,
                multivariate: true,
                statistics_engine: 'Bayesian, Frequentist',
            },
            supported_tests: {
                multi_armed_bandit: true,
            },
        },
        data_warehouse: {
            features: {
                warehouse_sources: true,
                batch_exports: true,
            },
        },
        cdp: {
            features: {
                realtime_streaming: '',
            },
        },
        product_analytics: {
            available: false,
        },
        session_replay: {
            available: false,
        },
    },
    platform: {
        deployment: {
            open_source: false,
            warehouse_native: true,
        },
        pricing: {
            free_tier: false,
            self_serve: false,
            transparent_pricing: false,
        },
    },
    pricing: {
        model: 'Quote-based',
    },
}
