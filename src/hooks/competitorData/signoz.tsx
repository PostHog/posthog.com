export const signoz = {
    name: 'SigNoz',
    key: 'signoz',
    assets: {
        icon: '/images/competitors/signoz.svg',
    },
    products: {
        logs: {
            available: true,
            core_logging_and_ingestion: {
                features: {
                    centralized_log_ingestion_search: true,
                    live_tail_real_time_logs: true,
                    native_open_telemetry_ingest: true,
                    vendor_agnostic_sdks: true,
                },
            },
            search: {
                features: {
                    full_text_search: true,
                    no_proprietary_query_language: 'SQL / Query builder',
                },
            },
            investigation_workflow: {
                features: {
                    click_to_pivot_investigations: true,
                    logs_scoped_by_investigation_context: true,
                    ai_assisted_log_summaries: false,
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
            security_and_compliance: {
                features: {
                    siem: false,
                    enterprise_scale_compliance: 'Limited',
                },
            },
            pricing: {
                features: {
                    ingest_only_pricing: true,
                    no_query_compute_fees: true,
                    predictable_at_scale: true,
                },
            },
        },
        product_analytics: {
            available: false,
        },
        session_replay: {
            available: false,
        },
        ai_observability: {
            available: true,
        },
        error_tracking: {
            available: true,
            features: {
                console_log_capture: false,
                error_alerts: true,
                exception_capture: true,
                issue_management: true,
                error_grouping: true,
                stack_tracing: true,
                mobile_sdk_coverage: 'Partial',
                source_map_support: true,
                user_device_context: true,
            },
            monitoring: {
                features: {
                    cron_monitoring: '',
                    release_tracking: 'Partial',
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
    },
    platform: {
        deployment: {
            eu_hosting: true,
            managed_reverse_proxy: false,
            open_source: true,
            self_host: true,
        },
        pricing: {
            self_serve: true,
            free_tier: true,
            transparent_pricing: true,
            usage_based_pricing: false,
        },
        developer: {
            api: false,
            collaboration: false,
            mobile_sdks: 'Partial',
            native_data_sources: false,
            proxies: false,
            sdks: false,
            server_side_sdks: false,
            sql: true,
        },
        tools: {
            cms: '',
            notebooks: false,
            project_management_tools: '',
            ai_assistant: false,
        },
        integrations: {
            azure_blob: false,
            bigquery: false,
            cdp: false,
            ci_cd_integrations: true,
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
            siem: false,
            soc2_certified: false,
            two_factor_auth: false,
            user_privacy_options: false,
        },
        analytics_integration: {
            built_in_analytics: false,
        },
    },
    pricing: {
        model: 'Free',
    },
}