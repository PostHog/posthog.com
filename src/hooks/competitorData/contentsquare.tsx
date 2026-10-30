import { surveys } from 'hooks/productData/surveys'

export const contentsquare = {
    name: 'Contentsquare',
    key: 'contentsquare',
    assets: {
        icon: '/images/competitors/contentsquare.svg',
    },
    products: {
        replay_vision: {
            available: true,
            features: {
                point_scanner: '100 per run',
                configurable_types: 'Planned analyses (Sense Analyst)',
                custom_prompt: 'Sense Analyst (beta)',
                yes_no_monitors: false,
                classify_tag: false,
                friction_score_trained: '0–100, ML-trained',
                friction_score_custom: false,
                theme_summary: '100 per run',
                nl_search: true,
                scheduled_runs: true,
                sampling_controls: false,
                deep_link_citations: true,
                mobile_replay_ai: true,
                findings_events: 'Frustration score only',
                insights_dashboards: 'Frustration score only',
                feed_experiments: 'Frustration score only',
                proactive_alerts: true,
                mcp_access: true,
                rest_api: true,
                self_driving: false,
                share_recordings: true,
                embed_recordings: 'Qualtrics only',
                export_recordings: false,
                flag_interlinking: 'Via Optimizely',
                product_analytics_platform: true,
                pii_redaction: true,
                ai_pricing: 'Tier + add-on',
            },
        },
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
                conditional_recording: true,
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
        },
    },
    platform: {
        deployment: {
            open_source: false,
            eu_hosting: true,
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
