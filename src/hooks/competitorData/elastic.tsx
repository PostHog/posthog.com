export const elastic = {
    name: 'Elastic',
    key: 'elastic',
    assets: {
        icon: '/images/competitors/elastic.png',
    },
    products: {
        logs: {
            available: true,
            core_logging_and_ingestion: {
                features: {
                    centralized_log_ingestion_search: true,
                    live_tail_real_time_logs: false,
                    native_open_telemetry_ingest: 'Limited',
                    vendor_agnostic_sdks: true,
                },
            },
            investigation_workflow: {
                features: {
                    click_to_pivot_investigations: false,
                    logs_scoped_by_investigation_context: false,
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
    },
}
