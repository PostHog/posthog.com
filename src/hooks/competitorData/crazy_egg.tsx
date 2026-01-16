export const crazy_egg = {
    name: 'Crazy Egg',
    key: 'crazy_egg',
    assets: {
        icon: '/images/competitors/crazy_egg.svg',
    },
    products: {
        product_analytics: {
            available: false,
            features: {
                ai_analysis: false,
                funnels: {
                    available: true,
                },
            },
        },
        web_analytics: {
            available: true,
        },
        session_replay: {
            available: true,
            pricing: {
                free_tier: 'None',
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
                    console_logs: true,
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
            targeting: {
                features: {
                    custom_targeting: true,
                },
            },
            branching: {
                features: {
                    multi_step_surveys: true,
                },
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
            available: true,
        },
        error_tracking: {
            available: true,
        },
    },
    platform: {
        deployment: {
            eu_hosting: false,
            open_source: false,
        },
        pricing: {
            self_serve: 'Trial only',
        },
        security: {
            cookieless_tracking: false,
        },
    },
}
