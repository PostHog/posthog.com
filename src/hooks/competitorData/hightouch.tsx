export const hightouch = {
    name: 'Hightouch',
    key: 'hightouch',
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
        free_tier: true,
        // No money mentioned on https://hightouch.com/pricing
        transparent_pricing: false,
        usage_based_pricing: true,
    },
    security: {
        bot_blocking: false,
        cookieless_tracking: false,
        data_anonymization: true,
        data_retention: true,
        gdpr_ready: true,
        hipaa_ready: 'CDP plans',
        history_audit_logs: true,
        reverse_proxy: false,
        saml_sso: true,
        soc2_certified: true,
        two_factor_auth: false,
        user_privacy_options: true,
    },
},
}