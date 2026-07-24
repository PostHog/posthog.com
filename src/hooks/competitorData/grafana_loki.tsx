export const grafana_loki = {
    name: 'Grafana Loki',
    key: 'grafana_loki',
    assets: {
        icon: '/images/competitors/grafana-loki.png',
    },
    products: {
        product_analytics: {
            available: false,
        },
        session_replay: {
            available: false,
        },
        error_tracking: {
            available: true,
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
                },
            },
            search: {
                features: {
                    full_text_search: false,
                    no_proprietary_query_language: 'LogQL',
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
                    metrics: 'Via stack',
                    traces: 'Via stack',
                    alerting: 'Via stack',
                    infra_monitoring: 'Via stack',
                },
            },
            security_and_compliance: {
                features: {
                    siem: false,
                    enterprise_scale_compliance: true,
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
            open_source: true,
        },
        pricing: {
            self_serve: true,
            free_tier: true,
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