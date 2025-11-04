export const lucky_orange = {
    name: 'Lucky Orange',
    key: 'lucky_orange',
    assets: {
        icon: '/images/competitors/lucky_orange.svg',
    },
    products: {
        product_analytics: {
            available: 'Funnels',
        },
        web_analytics: {
            available: true,
        },
        session_replay: {
            available: true,
            pricing: {
                free_tier: '100/mo',
            },
            features: {
                event_timeline: true,
            },
            platform_support: {
                features: {
                    web_app_recordings: true,
                    mobile_app_recordings: false,
                },
            },
            analysis: {
                features: {
                    console_logs: false,
                    network_monitor: false,
                },
            },
        },
        heatmaps: {
            available: true,
            features: {
                rage_clicks: true,
                scrollmaps: true,
            },
        },
        surveys: {
            available: true,
            features: {
                feedback_button: true,
            },
            platforms: {
                features: {
                    web: true,
                    mobile: false,
                },
            },
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
    },
    platform: {
        deployment: {
            eu_hosting: false,
            open_source: false,
        },
        pricing: {
            self_serve: true,
        },
    },
}
