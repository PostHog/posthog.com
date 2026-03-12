export const counter = {
    name: 'Counter',
    key: 'counter',
    products: {
        web_analytics: {
            available: true,
        },
        product_analytics: {
            available: false,
            features: {
                autocapture: false,
            },
            group_analytics: {
                available: false,
            },
        },
        session_replay: {
            available: false,
        },
        heatmaps: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
        experiments: {
            available: false,
        },
        error_tracking: {
            available: false,
        },
        surveys: {
            available: false,
        },
        platform: {
            available: true,
            deployment: {
                eu_hosting: true,
                open_source: true,
            },
        },
    },
}
