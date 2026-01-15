export const uxcam = {
    name: 'UXCam',
    key: 'uxcam',
    assets: {
        icon: '/images/competitors/uxcam.svg',
    },
    products: {
        product_analytics: {
            available: true,
            features: {
                autocapture: true,
                cohorts: true,
            },
            group_analytics: {
                available: false,
            },
            funnels: {
                available: true,
            },
            user_paths: {
                available: true,
            },
        },
        session_replay: {
            available: true,
            features: {
                canvas_recording: false,
                crash_reports: true,
                event_timeline: true,
                filter_by_user_or_event: true,
            },
            analysis: {
                features: {
                    console_logs: true,
                    network_monitor: false,
                },
            },
            platform_support: {
                features: {
                    mobile_app_recordings: true,
                    web_app_recordings: false,
                },
            },
            ai: {
                features: {
                    ai_summaries: false,
                },
            },
        },
        heatmaps: {
            available: true,
            features: {
                dead_taps: true,
                rage_clicks: true,
                rage_taps: true,
                scrollmaps: true,
            },
        },
        experiments: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
        surveys: {
            available: false,
            features: {},
        },
    },
    platform: {
        deployment: {
            open_source: false,
        },
        pricing: {
            self_serve: false,
            transparent_pricing: false,
        },
    },
}
