export const better_stack = {
    name: 'Better Stack',
    key: 'better_stack',
    assets: {
        icon: '/images/competitors/betterstack.png',
    },
    products: {
        error_tracking: {
            available: true,
        },
        product_analytics: {
            available: false,
        },
        session_replay: {
            available: false,
        },
        llm_analytics: {
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
            self_host: false,
        },
        pricing: {
            transparent_pricing: true,
        },
        tools: {
            ai_assistant: true,
        },
        security: {
            siem: false,
        },
    },
}
