export const better_stack = {
    name: 'Better Stack',
    key: 'better_stack',
    assets: {
        icon: '/images/competitors/betterstack.png',
    },
    products: {
        traces: {
            available: true,
            tracing: {
                features: {
                    distributed_trace_waterfall: true,
                    service_dependency_map: true,
                    code_level_profiling: false,
                    sampling_controls: true,
                    retention_controls: true,
                },
            },
            standards_and_setup: {
                features: {
                    native_open_telemetry_ingest: true,
                    no_proprietary_sdk_required: true,
                    instrumentation: 'eBPF',
                },
            },
            one_platform: {
                features: {
                    signals_alongside_traces: true,
                },
            },
            ai_and_self_driving: {
                features: {
                    ai_opens_code_fix_pr: false,
                    fix_and_open_pr_from_slack: false,
                },
            },
            pricing: {
                features: {
                    pricing_model: 'Per GB ingested',
                    free_tier: true,
                    open_source: false,
                },
            },
        },
        error_tracking: {
            available: true,
        },
        product_analytics: {
            available: false,
        },
        session_replay: {
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
                    high_cardinality_indexing: true,
                },
            },
            search: {
                features: {
                    full_text_search: 'Partial',
                    no_proprietary_query_language: 'SQL',
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
                    built_in_error_tracking: true,
                    built_in_session_replay: true,
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
            self_host: false,
            open_source: false,
            managed_cloud: true,
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
