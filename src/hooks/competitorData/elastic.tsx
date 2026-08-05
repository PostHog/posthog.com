export const elastic = {
    name: 'Elastic',
    key: 'elastic',
    assets: {
        icon: '/images/competitors/elastic.png',
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
        logs: {
            available: true,
            core_logging_and_ingestion: {
                features: {
                    centralized_log_ingestion_search: true,
                    live_tail_real_time_logs: false,
                    native_open_telemetry_ingest: true,
                    vendor_agnostic_sdks: true,
                    high_cardinality_indexing: 'Partial',
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
                    predictable_at_scale: 'Tiered',
                },
            },
        },
        ai_observability: {
            available: true,
        },
    },
    platform: {
        deployment: {
            self_host: true,
            open_source: 'AGPL / source available',
            managed_cloud: 'Elastic Cloud',
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
