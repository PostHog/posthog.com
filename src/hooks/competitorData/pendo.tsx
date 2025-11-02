export const pendo = {
    name: 'Pendo',
    key: 'pendo',
    assets: {
        icon: '/images/competitors/pendo.svg',
        comparisonArticle: '/blog/posthog-vs-pendo',
    },
    products: {
        product_analytics: {
            available: true,
            features: {
                advertising_analytics: false,
                autocapture: false,
                cohorts: true,
                custom_events: true,
                custom_properties: true,
                monetization_analytics: false,
                predictive_insights: false,
                real_time_view: false,
                toolbar: false,
                user_profiles: true,
                insights: {
                    available: true,
                    features: {
                        formula_mode: false,
                        ready_made_insight_types: true,
                        sampling: false,
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
                    available: true,
                    features: {},
                },
            },
        },
        web_analytics: {
            available: false,
        },
        session_replay: {
            available: true,
        },
        surveys: {
            available: true,
        },
        feature_flags: {
            available: false,
        },
        experiments: {
            available: false,
        },
    },
    platform: {
        deployment: {
            open_source: false,
            self_host: false,
        },
        pricing: {
            free_tier: true,
            transparent_pricing: false,
            usage_based_pricing: false,
        },
        integrations: {
            azure_blob: false,
            bigquery: true,
            ci_cd_integrations: false,
            community_integrations: false,
            customer_io: false,
            datadog: false,
            exports: true,
            gcs: false,
            google_ads: false,
            hubspot: true,
            imports: true,
            intercom: true,
            microsoft_teams: true,
            redshift: true,
            rudderstack: false,
            s3: false,
            salesforce: true,
            segment: true,
            sentry: false,
            slack: true,
            snowflake: true,
            stripe: false,
            zapier: true,
            zendesk: false,
        },
        security: {
            gdpr_ready: true,
            hipaa_ready: true,
            history_audit_logs: false,
            saml_sso: true,
            soc2_certified: true,
            two_factor_auth: true,
            user_privacy_options: false,
        },
        analytics_integration: {
            built_in_analytics: false,
        },
        developer: {
            api: false,
            notebooks: false,
            proxies: false,
            sdks: false,
            sql: false,
        },
    },
    pricing: {
        model: 'Seat-based',
    },
}
