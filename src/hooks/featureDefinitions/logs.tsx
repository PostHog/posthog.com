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
                description: 'Pay for what you send, not for indexing it a second time',
            },
            no_query_compute_fees: {
                name: 'No query/compute fees',
                description: 'Searching and analyzing your logs costs nothing extra',
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
                description:
                    'Collect logs from applications and infrastructure, then search and filter them in one place',
            },
            live_tail_real_time_logs: {
                name: 'Live tail & real-time logs',
            },
            native_open_telemetry_ingest: {
                name: 'Native OpenTelemetry ingestion',
                description: 'Natively ingest and process telemetry using OpenTelemetry APIs and formats',
            },
            vendor_agnostic_sdks: {
                name: 'Vendor agnostic SDKs',
            },
            high_cardinality_indexing: {
                name: 'High-cardinality indexing',
                description:
                    'Index fields like user_id, trace_id, or request_id without cardinality limits causing issues',
            },
            retention: {
                name: 'Log retention',
                description: 'How long ingested logs stay queryable',
            },
        },
    },
    search: {
        name: 'Search',
        features: {
            full_text_search: {
                name: 'Full-text search',
                description: 'Run arbitrary ad-hoc queries across raw log text',
            },
            no_proprietary_query_language: {
                name: 'No proprietary query language',
                description: 'Use standard SQL or attributes instead of a vendor-specific query language',
            },
        },
    },
    security_and_compliance: {
        name: 'Security and compliance',
        features: {
            siem: {
                name: 'SIEM',
                description: 'Security event correlation and threat detection',
            },
            enterprise_scale_compliance: {
                name: 'Compliance / enterprise scale',
                description: 'Petabyte-scale retention, compliance controls, and enterprise audit workflows',
            },
            security_monitoring: {
                name: 'Security monitoring',
                description: 'Cloud SIEM, cloud security management, and threat detection',
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
                description:
                    'Group exceptions into issues so teams can triage, assign, and debug errors alongside logs',
            },
            built_in_session_replay: {
                name: 'Built-in session replay',
                description: 'Jump from a log or error to the user session that produced it',
            },
            product_analytics_context: {
                name: 'Product analytics context',
                description: 'Connect logs to users, events, cohorts, funnels, retention, and feature usage',
            },
        },
    },
    observability: {
        name: 'Observability',
        features: {
            metrics: {
                name: 'Metrics',
                description: 'System and app performance over time',
            },
            traces: {
                name: 'Traces',
                description: 'Traces, request journey, and latency breakdown',
            },
            alerting: {
                name: 'Alerting',
                description: 'Threshold, anomaly, and forecast alerts',
            },
            infra_monitoring: {
                name: 'Infra monitoring',
                description: 'Monitor hosts, containers, Kubernetes, and cloud services',
            },
            synthetic_monitoring: {
                name: 'Synthetic monitoring',
                description: 'Scripted browser and API tests run on a schedule from managed locations',
            },
            on_call_incident_management: {
                name: 'On-call & incident management',
                description: 'Paging schedules, escalation policies, and incident response workflows',
            },
            service_map: {
                name: 'Service map',
                description: 'Auto-generated topology of services and their dependencies',
            },
            code_level_profiling: {
                name: 'Code-level profiling',
                description: 'Continuous CPU and memory profiling down to the line of code',
            },
        },
    },
}
