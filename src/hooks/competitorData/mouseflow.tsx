export const mouseflow = {
    name: 'Mouseflow',
    key: 'mouseflow',
    assets: {
        icon: '/images/competitors/mouseflow.svg',
    },
    products: {
        product_analytics: {
            available: false,
        },
        web_analytics: {
            available: false,
        },
        session_replay: {
            available: true,
            pricing: {
                free_tier: '500/mo',
            },
            features: {
                canvas_recording: false,
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
            eu_hosting: true,
            open_source: false,
        },
        security: {
            role_based_access_control: '',
        },
        pricing: {
            transparent_pricing: '',
            self_serve: true,
        },
        tools: {
            notebooks: '',
        },
    },
}
