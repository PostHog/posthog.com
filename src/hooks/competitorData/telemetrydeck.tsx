export const telemetrydeck = {
    name: 'TelemetryDeck',
    key: 'telemetrydeck',
    products: {
        web_analytics: {
            available: 'Partial',
        },
        product_analytics: {
            available: true,
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
            available: 'A/B testing only',
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
                open_source: false,
            },
        },
    },
}
