export const quantum_metric = {
    name: 'Quantum Metric',
    key: 'quantum_metric',
    assets: {
        icon: '/images/competitors/quantum-metric.svg',
    },
    products: {
        product_analytics: {
            available: true,
            features: {
                autocapture: true,
                cohorts: true,
                conversion_funnels: true,
                alerts: true,
                anomaly_detection: true,
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
            pricing: {
                free_tier: false,
            },
            features: {
                canvas_recording: false,
                crash_reports: true,
            },
            platform_support: {
                features: {
                    web_app_recordings: true,
                    mobile_app_recordings: true,
                },
            },
            analysis: {
                features: {
                    console_logs: true,
                    network_monitor: true,
                    performance_monitoring: true,
                },
            },
            targeting: {
                features: {
                    conditional_recording: true,
                    filter_by_user_or_event: true,
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
                clickmaps: true,
                scrollmaps: true,
                rage_clicks: true,
            },
        },
        feature_flags: {
            available: false,
        },
        experiments: {
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
            free_tier: false,
            transparent_pricing: false,
        },
        security: {
            gdpr_ready: true,
            soc2_certified: true,
            hipaa_ready: true,
        },
    },
    pricing: {
        model: 'Quote-based',
    },
}
