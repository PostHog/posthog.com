export const umami = {
    name: 'Umami',
    key: 'umami',
    assets: {
        icon: '/images/competitors/umami.svg',
    },
    products: {
        web_analytics: {
            available: true,
            features: {
                bounce_rate: false,
                cookieless_tracking: true,
                custom_channel_types: false,
                entry_exit_paths: false,
                pageviews: true,
                search_tools: false,
                snippet_install: true,
                traffic_breakdown: true,
                utm_tracking: true,
            },
        },
        product_analytics: {
            available: false,
            features: {
                conversion_funnels: false,
                user_profiles: false,
                cohorts: false,
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
    },
    platform: {
        deployment: {
            open_source: true,
            self_host: true,
            eu_hosting: false,
            reverse_proxy: false,
        },
        pricing: {
            free_tier: true,
            self_serve: true,
            transparent_pricing: true,
            usage_based_pricing: false,
        },
        developer: {
            api: true,
            sdks: false,
        },
        integrations: {
            email_reports: true,
            exports: false,
            imports: false,
        },
        security: {
            cookieless_tracking: true,
            gdpr_ready: true,
            hipaa_ready: false,
            soc2_certified: false,
            saml_sso: false,
            two_factor_auth: false,
        },
    },
    pricing: {
        model: 'Free + cloud subscription',
    },
}
