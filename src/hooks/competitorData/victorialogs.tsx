export const victorialogs = {
    name: 'VictoriaLogs',
    key: 'victorialogs',
    assets: {
        icon: '/images/competitors/victoriametrics.svg',
    },
    products: {
        product_analytics: {
            available: false,
        },
        session_replay: {
            available: false,
        },
        error_tracking: {
            available: false,
        },
        ai_observability: {
            available: false,
        },
        logs: {
            available: true,
            core_logging_and_ingestion: {
                features: {
                    centralized_log_ingestion_search: true,
                    live_tail_real_time_logs: true,
                    native_open_telemetry_ingest: true,
                    vendor_agnostic_sdks: true,
                    high_cardinality_indexing: 'Partial',
                },
            },
            search: {
                features: {
                    full_text_search: true,
                    no_proprietary_query_language: 'LogsQL',
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
                    built_in_error_tracking: false,
                    built_in_session_replay: false,
                    product_analytics_context: false,
                },
            },
            observability: {
                features: {
                    metrics: false,
                    traces: false,
                    alerting: true,
                    infra_monitoring: false,
                },
            },
            security_and_compliance: {
                features: {
                    siem: false,
                    enterprise_scale_compliance: false,
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
    },
    platform: {
        deployment: {
            self_host: true,
            open_source: 'Apache 2.0',
            managed_cloud: 'VictoriaMetrics Cloud',
        },
        pricing: {
            self_serve: true,
            free_tier: false,
            transparent_pricing: true,
        },
        tools: {
            ai_assistant: false,
        },
        security: {
            siem: false,
        },
    },
}
