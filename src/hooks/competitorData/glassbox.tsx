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
                group_analytics: {
                    available: false,
                },
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
        },
        web_analytics: {
            available: false,
        },
        session_replay: {
            available: true,
            features: {
                canvas_recording: true,
                privacy_masking: true,
            },
            analysis: {
                features: {
                    performance_monitoring: true,
                },
            },
        },
        heatmaps: {
            available: true,
            features: {
                clickmaps: true,
                heatmaps: true,
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
                issue_management: true,
            },
        },
        dashboards: {
            available: true,
        },
        surveys: {
            available: true,
        },
    },
    platform: {
        deployment: {
            open_source: false,
            self_host: false,
            eu_hosting: false,
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
        model: 'Quote-based',
    },
}
