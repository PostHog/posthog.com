export const survicate = {
    name: 'Survicate',
    key: 'survicate',
    assets: {
        icon: '/images/competitors/survicate.svg',
    },
    products: {
        product_analytics: {
            available: false,
            features: {
                ai_analysis: false,
            },
            funnels: {
                available: false,
                features: {
                    conversion_funnels: false,
                },
            },
            user_paths: {
                available: false,
            },
        },
        web_analytics: {
            available: false,
            features: {
                cookieless_tracking: false,
            },
        },
        session_replay: {
            available: false,
        },
        heatmaps: {
            available: false,
            features: {
                rage_clicks: false,
                scrollmaps: false,
            },
        },
        surveys: {
            available: true,
            features: {
                integrations: true,
            },
            targeting: {
                features: {
                    custom_targeting: true,
                },
            },
            branching: {
                features: {
                    multi_step_surveys: true,
                },
            },
            platforms: {
                features: {
                    web: true,
                    mobile: true,
                },
            },
        },
        feature_flags: {
            available: false,
        },
        experiments: {
            available: false,
        },
        error_tracking: {
            available: false,
        },
    },
    platform: {
        deployment: {
            eu_hosting: false,
            managed_reverse_proxy: false,
            open_source: false,
            self_host: false,
        },
        pricing: {
            free_tier: false,
            transparent_pricing: false,
            usage_based_pricing: false,
        },
        developer: {
            api: true,
            collaboration: false,
            mobile_sdks: true,
            native_data_sources: false,
            proxies: false,
            sdks: true,
            server_side_sdks: false,
            sql: false,
        },
        tools: {
            cms: '',
            notebooks: false,
            project_management_tools: '',
        },
        integrations: {
            azure_blob: false,
            bigquery: false,
            cdp: false,
            ci_cd_integrations: false,
            community_integrations: false,
            csv_exports: true,
            customer_io: false,
            data_warehouse: false,
            datadog: false,
            email_reports: false,
            exports: true,
            gcs: false,
            google_ads: true,
            hubspot: true,
            imports: false,
            intercom: true,
            microsoft_teams: true,
            postgres: false,
            redshift: false,
            rudderstack: false,
            s3: false,
            salesforce: true,
            segment: true,
            sentry: false,
            slack: true,
            snowflake: false,
            stripe: false,
            warehouse_import: false,
            wordpress: false,
            zapier: true,
            zendesk: true,
        },
        security: {
            bot_blocking: false,
            cookieless_tracking: false,
            data_anonymization: true,
            data_retention: false,
            gdpr_ready: true,
            hipaa_ready: false,
            history_audit_logs: false,
            reverse_proxy: false,
            saml_sso: false,
            soc2_certified: false,
            two_factor_auth: true,
            user_privacy_options: true,
        },
        analytics_integration: {
            built_in_analytics: false,
        },
    },
    pricing: {
        model: 'Seat-based',
    },
}
