export const adobe_analytics = {
    name: 'Adobe Analytics',
    key: 'adobe_analytics',
    assets: {
        icon: '/images/competitors/adobe-analytics.svg',
    },
    products: {
        product_analytics: {
            available: true,
            features: {
                autocapture: false,
                cohorts: true,
                custom_events: true,
                custom_properties: true,
                insights: {
                    available: true,
                    features: {
                        formula_mode: true,
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
                group_analytics: {
                    available: false,
                    features: {},
                },
            },
        },
        web_analytics: {
            available: false,
        },
        session_replay: {
            available: false,
        },
        experiments: {
            available: false,
        },
        heatmaps: {
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
            free_tier: false,
            transparent_pricing: false,
            usage_based_pricing: true,
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
            hipaa_ready: true,
            soc2_certified: true,
            saml_sso: true,
            two_factor_auth: true,
        },
    },
    pricing: {
        model: 'Quote-based',
    },
}
