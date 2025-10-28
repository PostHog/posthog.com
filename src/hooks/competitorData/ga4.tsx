export const ga4 = {
    name: 'GA4',
    key: 'ga4',
    assets: {
        icon: '/images/competitors/ga4.svg',
        comparisonArticle: '/blog/posthog-vs-ga4',
    },
    products: {
        web_analytics: {
            available: true,
            features: {
                pre_configured_dashboards: true,
                visitor_and_view_tracking: true,
                session_and_duration_tracking: true,
                bounce_rate_tracking: true,
                breakdown_by_geoip: true,
                breakdown_by_device_and_browser: true,
                web_vitals_reporting: true,
                revenue_tracking: true,
                real_time_reporting: true,
                open_source: false,
                first_party_cookies: true,
                cookieless_tracking: true,
                hipaa_compliance: false,
                integration_with_feature_flags: false,
                integration_with_session_replay: false,
                integration_with_surveys: false,
            },
        },
    },
    platform: {
        open_source: false,
        self_host: false,
        usage_based_pricing: true,
        transparent_pricing: false,
        free_tier: true,
    },
    pricing: {
        model: 'Free',
    },
}
