export const logsFeatures = {
    summary: {
        name: 'Logs',
        description: 'Search and analyze your application logs with OpenTelemetry.',
        url: '/logs',
        docsUrl: '/docs/logs',
    },
    pricing: {
        name: 'Pricing',
        features: {
            ingest_only_pricing: {
                name: 'Ingest-only pricing',
            },
            no_query_compute_fees: {
                name: 'No query/compute fees',
            },
            predictable_at_scale: {
                name: 'Predictable at scale',
            },
        },
    },
    core_logging_and_ingestion: {
        name: 'Core logging and ingestion',
        features: {
            centralized_log_ingestion_search: {
                name: 'Centralized log ingestion & search',
            },
            live_tail_real_time_logs: {
                name: 'Live tail & real-time logs',
            },
            native_open_telemetry_ingest: {
                name: 'Native OpenTelemetry ingestion',
            },
            vendor_agnostic_sdks: {
                name: 'Vendor agnostic SDKs',
            },
        },
    },
    investigation_workflow: {
        name: 'Investigation workflow',
        features: {
            click_to_pivot_investigations: {
                name: 'Click-to-pivot investigations',
            },
            logs_scoped_by_investigation_context: {
                name: 'Logs scoped by investigation context',
            },
            ai_assisted_log_summaries: {
                name: 'AI-assisted log summaries',
            },
        },
    },
    debugging_integrations: {
        name: 'Debugging integrations',
        features: {
            built_in_error_tracking: {
                name: 'Built-in error tracking',
            },
            built_in_session_replay: {
                name: 'Built-in session replay',
            },
            product_analytics_context: {
                name: 'Product analytics context',
            },
        },
    },
    observability: {
        name: 'Observability',
        features: {
            metrics: {
                name: 'Metrics',
            },
            traces: {
                name: 'Traces',
            },
            infra_monitoring: {
                name: 'Infra monitoring',
            },
        },
    },
}
