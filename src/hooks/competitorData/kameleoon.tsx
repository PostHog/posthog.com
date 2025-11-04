export const kameleoon = {
    name: 'Kameleoon',
    key: 'kameleoon',
    assets: {
        icon: '/images/competitors/kameleoon.svg',
    },
    products: {
        feature_flags: {
            available: true,
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
            api: true,
        },
    },
    pricing: {
        model: 'Quote-based',
    },
}
