export const ga4 = {
    name: 'GA4',
    key: 'ga4',
    assets: {
        icon: '/images/competitors/ga4.svg',
        comparisonArticle: '/blog/posthog-vs-ga4',
    },
    products: {
        product_analytics: {
            available: true,
            features: {
                advertising_analytics: true,
                autocapture: false,
                cohorts: true,
                custom_events: true,
                custom_properties: true,
                monetization_analytics: true,
                predictive_insights: true,
                real_time_view: true,
                toolbar: false,
                user_profiles: true,
                trends: {
                    available: true,
                    features: {},
                },
                funnels: {
                    available: true,
                    features: {
                        correlation_analysis: false,
                    },
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
                insights: {
                    available: true,
                    features: {
                        formula_mode: false,
                        ready_made_insight_types: true,
                        sampling: false,
                        sql_editor: false,
                    },
                },
            },
        },
        web_analytics: {
            available: true,
            features: {
                advertising_analytics: false,
                bounce_rate: false,
                bounce_rate_tracking: true,
                breakdown_by_device_and_browser: true,
                breakdown_by_geoip: true,
                clickmaps: false,
                conversions: false,
                cookieless_tracking: true,
                custom_channel_types: false,
                entry_exit_paths: false,
                first_party_cookies: true,
                heatmaps: false,
                hipaa_compliance: false,
                integration_with_feature_flags: false,
                integration_with_session_replay: false,
                integration_with_surveys: false,
                migration: false,
                movement_maps: false,
                open_source: false,
                outbound_clicks: false,
                pageviews: false,
                pre_configured_dashboards: true,
                real_time_reporting: true,
                revenue_tracking: true,
                script_size: false,
                scrollmaps: false,
                session_and_duration_tracking: true,
                sessions: false,
                snippet_install: false,
                traffic_breakdown: false,
                utm_tracking: false,
                visitor_and_view_tracking: true,
                web_vitals: false,
                web_vitals_reporting: true,
            },
        },
        session_replay: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
        experiments: {
            available: false,
        },
        surveys: {
            available: false,
        },
        cdp: {
            available: false,
        },
        data_warehouse: {
            available: false,
        },
        dashboards: {
            available: true,
        },
    },
    platform: {
        analytics_integration: {
            built_in_analytics: false,
        },
        deployment: {
            eu_hosting: false,
            open_source: false,
            self_host: false,
        },
        developer: {
            api: false,
            mobile_sdks: false,
            notebooks: false,
            server_side_sdks: false,
        },
        integrations: {
            bigquery: true,
            customer_io: false,
            datadog: false,

            google_ads: true,
            hubspot: false,
            intercom: false,
            salesforce: false,
            sentry: false,
            stripe: true,
            zapier: true,
        },
        pricing: {
            free_tier: true,
            transparent_pricing: false,
            usage_based_pricing: false,
        },
        security: {
            data_anonymization: true,
            gdpr_ready: false,
            hipaa_ready: false,
            saml_sso: true,
            soc2_certified: false,
            two_factor_auth: true,
        },
    },
    pricing: {
        model: 'Free',
    },
}
