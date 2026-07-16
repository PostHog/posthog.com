export const counter = {
    name: 'Counter',
    key: 'counter',
    products: {
        web_analytics: {
            available: true,
            features: {
                pageviews: true,
                bounce_rate: false,
                traffic_breakdown: 'Partial',
                utm_tracking: false,
                web_vitals: false,
                cookieless_tracking: true, // no cookies
            },
        },
        product_analytics: {
            available: false,
            features: {
                autocapture: false,
                user_profiles: false,
            },
            group_analytics: {
                available: false,
            },
            funnels: {
                available: false,
            },
            retention: {
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
    },
    platform: {
        available: true,
        deployment: {
            eu_hosting: false,
            open_source: true,
        },
    },
}
