export const smartlook = {
    name: 'Smartlook',
    key: 'smartlook',
    assets: {
        icon: '/images/competitors/smartlook.svg',
    },
    products: {
        product_analytics: {
            available: true,
            features: {
                autocapture: true,
                cohorts: true,
                custom_events: true,
                custom_properties: true,
                insights: {
                    available: true,
                    features: {
                        formula_mode: false,
                        ready_made_insight_types: true,
                        sql_editor: false,
                    },
                    alerts: true,
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
            group_analytics: {
                available: false,
            },
        },
        web_analytics: {
            available: true,
        },
        product_tours: {
            available: false,
        },
        session_replay: {
            available: true,
            features: {
                canvas_recording: true,
                console_logs: true,
                crash_reports: true,
                privacy_masking: true,
            },
            analysis: {
                features: {
                    performance_monitoring: false,
                    network_monitor: true,
                },
            },
            targeting: {
                features: {
                    filter_by_user_or_event: true,
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
                clickmaps: true,
                dead_taps: true,
                heatmaps: true,
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
        error_tracking: {
            available: false,
            features: {
                issue_management: false,
            },
        },
        dashboards: {
            available: true,
        },
        surveys: {
            available: false,
        },
    },
    platform: {
        deployment: {
            open_source: false,
            self_host: false,
            eu_hosting: true,
        },
        pricing: {
            free_tier: true,
            transparent_pricing: true,
            usage_based_pricing: true,
            self_serve: true,
        },
        developer: {
            api: true,
            sdks: true,
        },
        integrations: {
            exports: true,
            imports: true,
        },
        security: {
            gdpr_ready: true,
            hipaa_ready: false,
            soc2_certified: true,
            saml_sso: true,
            two_factor_auth: true,
            user_privacy_options: true,
        },
    },
    pricing: {
        model: 'Usage-based',
    },
}
