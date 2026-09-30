export const fivetran = {
    name: 'Fivetran',
    key: 'fivetran',
    assets: {
        icon: '/images/competitors/fivetran.svg',
        comparisonArticle: '/blog/posthog-vs-fivetran',
    },
    products: {
        etl: {
            available: true,
            sources: {
                features: {
                    number_of_sources: '700+',
                    custom_rest_source: true,
                    database_cdc: true,
                    incremental_sync: true,
                },
            },
            destinations: {
                features: {
                    warehouse_destinations: true,
                    object_storage_destinations: true,
                    included_warehouse: false,
                },
            },
            analysis: {
                features: {
                    built_in_sql: false,
                    product_analytics_context: false,
                    built_in_dashboards: false,
                },
            },
            operations: {
                features: {
                    sync_health_dashboard: true,
                    open_source: false,
                    self_host: false,
                },
            },
            pricing: {
                features: {
                    // Fivetran prices on monthly active rows, not rows synced.
                    per_row_pricing: false,
                    free_tier: true,
                    free_historical_backfill: false,
                },
            },
        },
        cdp: {
            available: true,
            features: {
                number_of_integrations: '500+',
                realtime_streaming: false,
                built_in_analytics: false,
            },
        },
        data_warehouse: {
            available: true,
            features: {
                batch_exports: true,
                warehouse_sources: true,
            },
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
            usage_based_pricing: true,
        },
        developer: {
            api: true,
            collaboration: false,
            mobile_sdks: false,
            native_data_sources: true,
            proxies: false,
            sdks: true,
            server_side_sdks: false,
            sql: true,
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
            csv_exports: false,
            customer_io: false,
            data_warehouse: false,
            datadog: false,
            email_reports: false,
            exports: false,
            gcs: false,
            google_ads: false,
            hubspot: false,
            imports: false,
            intercom: false,
            microsoft_teams: false,
            redshift: false,
            rudderstack: false,
            s3: false,
            salesforce: false,
            segment: false,
            sentry: false,
            slack: false,
            snowflake: false,
            stripe: false,
            warehouse_import: false,
            wordpress: false,
            zapier: false,
            zendesk: false,
        },
        security: {
            bot_blocking: false,
            cookieless_tracking: false,
            data_anonymization: false,
            data_retention: false,
            gdpr_ready: false,
            hipaa_ready: false,
            history_audit_logs: false,
            reverse_proxy: false,
            saml_sso: false,
            soc2_certified: false,
            two_factor_auth: false,
            user_privacy_options: false,
        },
        analytics_integration: {
            built_in_analytics: false,
        },
    },
    pricing: {
        model: 'Usage-based',
    },
}
