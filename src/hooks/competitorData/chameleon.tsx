export const chameleon = {
    name: 'Chameleon',
    key: 'chameleon',
    assets: {
        icon: '/images/competitors/chameleon.svg',
    },
    products: {
        product_analytics: {
            available: false,
            features: {
                autocapture: false,
            },
        },
        product_tours: {
            available: true,
        },
        surveys: {
            available: true,
        },
        session_replay: {
            available: false,
        },
        experiments: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
    },
    platform: {
        deployment: {
            eu_hosting: false,
            open_source: false,
        },
        pricing: {
            self_serve: true,
        },
        developer: {
            mobile_sdks: false,
        },
    },
}
