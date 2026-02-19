export const newrelic = {
    name: 'New Relic',
    key: 'newrelic',
    assets: {
        icon: '/images/competitors/newrelic.svg',
    },
    products: {
        error_tracking: {
            available: true,
            features: {
                console_log_capture: true,
                error_alerts: true,
                error_grouping: true,
                exception_capture: true,
                issue_management: true,
                log_management: true,
                mobile_sdk_coverage: true,
                profiling: true,
                source_map_support: true,
                stack_tracing: true,
                user_device_context: true,
            },
            monitoring: {
                features: {
                    cron_monitoring: true,
                    release_tracking: true,
                    performance_monitoring: true,
                    distributed_tracing: true,
                },
            },
            integrations: {
                product_analytics: false,
                session_replay: true,
            },
        },
        product_analytics: {
            available: false,
        },
        session_replay: {
            available: true,
        },
        logs: {
            // I have not checked any of this
            available: true,
            core_logging_and_ingestion: {
                features: {
                    centralized_log_ingestion_search: true,
                    live_tail_real_time_logs: true,
                    native_open_telemetry_ingest: true,
                    vendor_agnostic_sdks: true,
                },
            },
            investigation_workflow: {
                features: {
                    click_to_pivot_investigations: false,
                    logs_scoped_by_investigation_context: false,
                    ai_assisted_log_summaries: true,
                },
            },
            debugging_integrations: {
                features: {
                    built_in_error_tracking: true,
                    built_in_session_replay: false,
                    product_analytics_context: false,
                },
            },
            observability: {
                features: {
                    metrics: true,
                    traces: true,
                    alerting: true,
                    infra_monitoring: true,
                },
            },
            pricing: {
                features: {
                    ingest_only_pricing: false,
                    no_query_compute_fees: false,
                    predictable_at_scale: false,
                },
            },
        },
        llm_analytics: {
            available: false,
        },
        surveys: {
            available: false,
        },
    },
    platform: {
        deployment: {
            eu_hosting: true,
            managed_reverse_proxy: false,
            open_source: false,
            self_host: false,
        },
        pricing: {
            free_tier: true,
            transparent_pricing: true,
            usage_based_pricing: true,
            self_serve: true,
        },
        developer: {
            api: true,
            collaboration: true,
            mobile_sdks: true,
            native_data_sources: true,
            proxies: false,
            sdks: true,
            server_side_sdks: true,
            sql: true,
        },
        tools: {
            cms: '',
            notebooks: true,
            project_management_tools: '',
        },
        integrations: {
            azure_blob: true,
            bigquery: true,
            cdp: false,
            ci_cd_integrations: true,
            community_integrations: true,
            csv_exports: true,
            customer_io: false,
            data_warehouse: true,
            datadog: false,
            email_reports: true,
            exports: true,
            gcs: true,
            google_ads: false,
            hubspot: false,
            imports: true,
            intercom: false,
            microsoft_teams: true,
            postgres: true,
            redshift: true,
            rudderstack: false,
            s3: true,
            salesforce: true,
            segment: true,
            sentry: false,
            slack: true,
            snowflake: true,
            stripe: false,
            warehouse_import: true,
            wordpress: false,
            zapier: true,
            zendesk: true,
        },
        security: {
            bot_blocking: false,
            cookieless_tracking: false,
            data_anonymization: true,
            data_retention: true,
            gdpr_ready: true,
            hipaa_ready: true,
            history_audit_logs: true,
            reverse_proxy: false,
            role_based_access_control: true,
            saml_sso: true,
            siem: false,
            soc2_certified: true,
            two_factor_auth: true,
            user_privacy_options: true,
        },
        analytics_integration: {
            built_in_analytics: true,
        },
    },
    pricing: {
        model: 'Usage-based',
    },
}
