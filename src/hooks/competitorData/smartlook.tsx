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
                cohorts: false,
                custom_events: true,
                custom_properties: true,
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
        dashboards: {
            available: true,
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
            soc2_certified: false,
            saml_sso: false,
            two_factor_auth: true,
            user_privacy_options: true,
        },
    },
    pricing: {
        model: 'Usage-based',
    },
}
