export const microsoft_clarity = {
    name: 'Microsoft Clarity',
    key: 'microsoft_clarity',
    // ... existing assets ...
    products: {
        product_analytics: {
            available: false,
            features: {
                conversion_funnels: false,
                user_paths: false,
                cohorts: false,
            },
        },
        session_replay: {
            available: true,
            pricing: {
                free_tier: true,
            },
            features: {
                console_logs: false,
            },
            platform_support: {
                features: {
                    web_app_recordings: true,
                    mobile_app_recordings: true,
                    ios_recordings: true,
                    android_recordings: true,
                    react_native_recordings: true,
                    flutter_recordings: true,
                },
            },
            analysis: {
                features: {
                    heatmaps: true,
                    console_logs: false,
                    performance_monitoring: false,
                    network_monitor: false,
                    dom_explorer: false,
                },
            },
            ai: {
                features: {
                    ai_summaries: true,
                },
            },
        },
        heatmaps: {
            available: true,
            features: {
                clickmaps: true,
                dead_taps: true,
                heatmaps: true,
                rage_clicks: true,
                rage_taps: true,
                scrollmaps: true,
            },
        },
        surveys: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
        experiments: {
            available: false,
        },
    },
    platform: {
        deployment: {
            open_source: false,
        },
        pricing: {
            model: 'Free',
            free_tier: true,
            transparent_pricing: true,
        },
        security: {
            gdpr_ready: true,
            hipaa_ready: false,
            soc2_certified: false,
        },
    },
}
