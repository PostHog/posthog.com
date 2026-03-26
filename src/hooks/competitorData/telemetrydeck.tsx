export const telemetrydeck = {
    name: 'TelemetryDeck',
    key: 'telemetrydeck',
    products: {
        web_analytics: {
            available: 'Partial',
            features: {
                pageviews: true,
                bounce_rate: false,
                traffic_breakdown: 'Partial',
                utm_tracking: true,
                web_vitals: false,
                cookieless_tracking: true,
            },
        },
        product_analytics: {
            available: true,
            features: {
                autocapture: false,
                user_profiles: false,
            },
            group_analytics: {
                available: false,
            },
            funnels: {
                available: true,
            },
            retention: {
                available: true,
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
            available: 'Basic analysis only',
        },
        error_tracking: {
            available: false,
        },
        surveys: {
            available: false,
        },
    },
    platform: {
        available: true,
        deployment: {
            eu_hosting: true,
            open_source: false,
        },
    },
}
