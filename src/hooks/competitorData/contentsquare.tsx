export const contentsquare = {
    name: 'Contentsquare',
    key: 'contentsquare',
    assets: {
        icon: '/images/competitors/contentsquare.svg',
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
                crash_reports: true,
                console_logs: true,
                network_monitor: true,
            },
            targeting: {
                features: {
                    filter_by_user_or_event: true,
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
                dead_taps: false,
                rage_clicks: true,
                rage_taps: false,
                scrollmaps: true,
            },
        },
        experiments: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
    },
    platform: {
        deployment: {
            open_source: false,
        },
        pricing: {
            transparent_pricing: false,
        },
    },
}
