import { surveys } from 'hooks/productData/surveys'

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
                canvas_recording: false,
                crash_reports: true,
                console_logs: true,
                network_monitor: true,
            },
            platform_support: {
                features: {
                    mobile_app_recordings: true,
                },
            },
            analysis: {
                features: {
                    performance_monitoring: true,
                },
            },
            targeting: {
                features: {
                    filter_by_user_or_event: true,
                    conditional_recording: true,
                },
            },
            privacy: {
                features: {
                    privacy_masking: true,
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
        surveys: {
            available: false,
        },
        error_tracking: {
            available: true,
             },
            monitoring: {
            features: {
                performance_monitoring: true,
            },
        }
    },
    platform: {
        deployment: {
            open_source: false,
        },
        pricing: {
            self_serve: false,
            transparent_pricing: false,
            free_tier: true,
        },
        security: {
            user_privacy_options: true,
            gdpr_ready: true,
            hipaa_ready: false,
        },
    },
}
