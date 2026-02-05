export const piwik_pro = {
    name: 'Piwik Pro',
    key: 'piwik_pro',
    assets: {
        icon: '/images/competitors/piwik-pro.svg',
    },
    products: {
        web_analytics: {
            available: true,
            features: {
                bounce_rate: true,
                cookieless_tracking: true,
                custom_channel_types: false,
                entry_exit_paths: true,
                pageviews: true,
                search_tools: true,
                snippet_install: true,
                traffic_breakdown: true,
                utm_tracking: true,
            },
        },
        product_analytics: {
            available: true,
            features: {
                autocapture: false,
                cohorts: true,
                custom_events: true,
                custom_properties: true,
                user_profiles: true,
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
                    features: {
                        conversion_funnels: true,
                    },
                },
                retention: {
                    available: false,
                    features: {},
                },
                user_paths: {
                    available: true,
                    features: {},
                },
                group_analytics: {
                    available: false,
                },
            },
        },
        session_replay: {
            available: false,
        },
        experiments: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
        heatmaps: {
            available: true,
        },
    },
    platform: {
        deployment: {
            open_source: false,
            self_host: true,
            eu_hosting: true,
            reverse_proxy: true,
        },
        pricing: {
            free_tier: false,
            self_serve: 'Trial only',
            transparent_pricing: false,
            usage_based_pricing: true,
        },
        developer: {
            api: true,
            sdks: true,
        },
        integrations: {
            email_reports: true,
            exports: true,
            imports: true,
        },
        security: {
            cookieless_tracking: true,
            gdpr_ready: true,
            hipaa_ready: true,
            soc2_certified: true,
            saml_sso: true,
            two_factor_auth: true,
        },
    },
    pricing: {
        model: 'Subscription',
    },
}
