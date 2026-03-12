export const kissmetrics = {
    name: 'Kissmetrics',
    key: 'kissmetrics',
    products: {
        web_analytics: {
            available: true,
            features: {
                pageviews: true,
                bounce_rate: false,
                traffic_breakdown: 'Partial',
                utm_tracking: 'Partial',
                web_vitals: false,
                cookieless_tracking: false,
            },
        },
        product_analytics: {
            available: true,
            features: {
                autocapture: false,
                user_profiles: true,
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
            available: false,
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
            eu_hosting: false,
            open_source: false,
        },
    },
}
