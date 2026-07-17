export const vercel_analytics = {
    name: 'Vercel Web Analytics',
    key: 'vercel_analytics',
    products: {
        web_analytics: {
            available: true,
            features: {
                pageviews: true,
                bounce_rate: true,
                traffic_breakdown: true,
                utm_tracking: 'Plus/Enterprise',
                web_vitals: 'via Speed Insights',
                cookieless_tracking: true,
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
            available: 'Via integrations',
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
