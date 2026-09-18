export const splunk = {
    name: 'Splunk',
    products: {
        logs: {
            available: true,
            core_logging_and_ingestion: {
                features: {
                    centralized_log_ingestion_search: true,
                    live_tail_real_time_logs: true,
                    native_open_telemetry_ingest: 'Partial',
                    vendor_agnostic_sdks: false,
                },
            },
            search: {
                features: {
                    full_text_search: true,
                    no_proprietary_query_language: false,
                },
            },
            investigation_workflow: {
                features: {
                    click_to_pivot_investigations: true,
                    logs_scoped_by_investigation_context: true,
                    ai_assisted_log_summaries: true,
                },
            },
            debugging_integrations: {
                features: {
                    built_in_error_tracking: 'Add-on',
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
                    siem: true,
                    enterprise_scale_compliance: true,
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
    },
    platform: {
        pricing: {
            self_serve: false,
            free_tier: false,
        },
        deployment: {
            self_host: true,
            open_source: false,
        },
    },
}
