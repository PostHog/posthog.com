export const mutiny = {
    name: 'Mutiny',
    key: 'mutiny',
    assets: {
        icon: '/images/competitors/mutiny.svg',
    },
    products: {
        feature_flags: {
            available: false,
        },
        experiments: {
            available: true,
            features: {
                funnel_tests: false,
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
        },
        pricing: {
            self_serve: false,
            transparent_pricing: false,
        },
        developer: {
            api: false,
        },
    },
    pricing: {
        model: 'Quote-based',
    },
}
