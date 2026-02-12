export const tealium = {
    name: 'Tealium',
    key: 'tealium',
    products: {
        cdp: {
            available: true,
            features: {
                realtime_streaming: true,
                custom_transformations: true,
                no_code_setup: true,
                },
            },
        product_analytics: {
            available: false,
        },
        session_replay: {
            available: false,
        },
    },
    platform: {
    pricing: {
        free_tier: false,
        transparent_pricing: false,
        usage_based_pricing: true,
    },
    security: {
        bot_blocking: true,
        cookieless_tracking: false,
        data_anonymization: true,
        data_retention: true,
        gdpr_ready: true,
        hipaa_ready: 'BAA available',
        history_audit_logs: true,
        reverse_proxy: false,
        saml_sso: true,
        soc2_certified: true,
        two_factor_auth: true,
        user_privacy_options: true,
    },
},
}