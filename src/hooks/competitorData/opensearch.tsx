export const opensearch = {
    name: 'OpenSearch',
    key: 'opensearch',
    assets: {
        icon: '/images/competitors/opensearch.svg',
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
                    native_open_telemetry_ingest: 'Partial',
                    vendor_agnostic_sdks: true,
                    high_cardinality_indexing: true,
                },
            },
            search: {
                features: {
                    full_text_search: true,
                    no_proprietary_query_language: 'Partial',
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
        deployment: {
            self_host: true,
            open_source: 'Apache 2.0',
            managed_cloud: 'Amazon OpenSearch Service',
        },
        pricing: {
            self_serve: true,
            free_tier: false,
            transparent_pricing: true,
        },
        tools: {
            ai_assistant: true,
        },
        security: {
            siem: true,
        },
    },
}