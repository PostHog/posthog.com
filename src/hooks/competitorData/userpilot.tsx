export const userpilot = {
    name: 'Userpilot',
    key: 'userpilot',
    assets: {
        icon: '/images/competitors/userpilot.svg',
    },
    products: {
        product_analytics: {
            available: true,
            features: {
                autocapture: true,
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
            eu_hosting: '$749/mo+ plans',
            open_source: false,
        },
        pricing: {
            self_serve: false,
        },
        developer: {
            mobile_sdks: false,
        },
    },
}
