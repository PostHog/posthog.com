export const glassbox = {
    name: 'Glassbox',
    key: 'glassbox',
    assets: {
        icon: '/images/competitors/glassbox.svg',
    },
    products: {
        product_analytics: {
            available: true,
            features: {
                autocapture: true,
                cohorts: true,
                custom_events: true,
                custom_properties: true,
                toolbar: false,
                conversion_funnels: true,
                alerts: true,
                anomaly_detection: true,
            },
            group_analytics: {
                available: false,
            },
            insights: {
                available: true,
                features: {
                    formula_mode: false,
                    ready_made_insight_types: true,
                    sql_editor: false,
                    alerts: true,
                },
            },
            trends: {
                available: true,
                features: {},
            },
            funnels: {
                available: true,
                features: {},
            },
            retention: {
                available: true,
                features: {},
            },
            user_paths: {
                available: true,
                features: {},
            },
            lifecycle: {
                available: false,
                features: {},
            },
            stickiness: {
                available: false,
                features: {},
            },
        },
        web_analytics: {
            available: true,
        },
        session_replay: {
            available: true,
            pricing: {
                free_tier: false,
            },
            features: {
                canvas_recording: true,
                conditional_recording: true,
                crash_reports: true,
                console_logs: true,
                privacy_masking: true,
                event_timeline: true,
                filter_by_user_or_event: true,
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
                    console_logs: true,
                    network_monitor: true,
                    performance_monitoring: true,
                    heatmaps: true,
                    rage_clicks: true,
                    dom_explorer: true,
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
                heatmaps: true,
                scrollmaps: true,
                rage_clicks: true,
                rage_taps: true,
                movement_maps: false,
            },
        },
        experiments: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
        error_tracking: {
            available: false,
            features: {
                issue_management: true,
                performance_monitoring: true,

            },
        },
        dashboards: {
            available: true,
        },
        surveys: {
            available: false,
        },
        data_warehouse: {
            available: false,
        },
    },
    platform: {
        deployment: {
            open_source: false,
            self_host: true,
            eu_hosting: true,
        },
        pricing: {
            free_tier: false,
            transparent_pricing: false,
            usage_based_pricing: false,
            self_serve: false,
        },
        developer: {
            api: true,
            sdks: true,
            cross_domain_tracking: true,
        },
        integrations: {
            exports: true,
            imports: true,
            segment: true,
            salesforce: true,
            slack: true,
        },
        security: {
            gdpr_ready: true,
            hipaa_ready: true,
            soc2_certified: true,
            saml_sso: true,
            two_factor_auth: true,
            user_privacy_options: true,
            data_anonymization: true,
            role_based_access_control: true,
            cookieless_tracking: false,
        },
    },
    pricing: {
        model: 'Quote-based',
    },
}
