export const glitchtip = {
    name: 'GlitchTip',
    key: 'glitchtip',
    assets: {
        icon: '/images/competitors/glitchtip.svg',
    },
    products: {
        error_tracking: {
            available: true,
            features: {
                console_log_capture: false,
                error_alerts: true,
                error_grouping: true,
                exception_capture: true,
                issue_management: true,
                log_management: true,
                // https://glitchtip.com/sdkdocs
                mobile_sdk_coverage: true,
                profiling: false,
                source_map_support: true,
                stack_tracing: true,
                user_device_context: true,
            },
            monitoring: {
                features: {
                    // Heartbeat checks via uptime monitoring
                    cron_monitoring: 'Heartbeat checks',
                    distributed_tracing: false,
                    // https://glitchtip.com/documentation/cli (releases new / finalize / deploys)
                    release_tracking: true,
                    // https://glitchtip.com/documentation/performance
                    performance_monitoring: true,
                },
            },
            integrations: {
                ab_experiments: '',
                datadog: false,
                product_analytics: false,
                session_replay: false,
            },
        },
        product_analytics: {
            available: false,
        },
        session_replay: {
            available: false,
        },
        surveys: {
            available: false,
        },
    },
    platform: {
        deployment: {
            // EU (Germany) hosting on every hosted plan: https://glitchtip.com/pricing
            eu_hosting: true,
            managed_reverse_proxy: false,
            open_source: true,
            self_host: true,
        },
        pricing: {
            free_tier: true,
            self_serve: true,
            transparent_pricing: true,
            usage_based_pricing: false,
        },
        developer: {
            // https://app.glitchtip.com/api/docs
            api: true,
            collaboration: true,
            mobile_sdks: true,
            native_data_sources: false,
            proxies: false,
            sdks: 'Sentry SDKs',
            server_side_sdks: true,
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
            microsoft_teams: 'Via webhooks',
            redshift: false,
            rudderstack: false,
            s3: false,
            salesforce: false,
            segment: false,
            sentry: false,
            slack: 'Via webhooks',
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
            gdpr_ready: '',
            // https://glitchtip.com/hipaa (Large plan, BAA on request)
            hipaa_ready: 'Large plan',
            history_audit_logs: false,
            reverse_proxy: false,
            role_based_access_control: '',
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
        model: 'Free self-hosted; hosted from $15/month',
    },
}
