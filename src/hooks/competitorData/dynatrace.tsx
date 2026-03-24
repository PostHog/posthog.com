export const dynatrace = {
    name: 'Dynatrace',
    key: 'dynatrace',
    assets: {
        icon: '/images/competitors/dynatrace.svg',
    },
    products: {
        error_tracking: {
            available: true,
        },
        product_analytics: {
            available: false,
        },
        session_replay: {
            available: true,
        },
        logs: {
            available: true,
            core_logging_and_ingestion: {
                features: {
                    native_open_telemetry_ingest: 'Limited, proprietary',
                },
            },
            observability: {
                features: {
                    metrics: true,
                    traces: true,
                    alerting: true,
                },
            },
        },
        llm_analytics: {
            available: true,
        },
    },
    platform: {
        deployment: {
            self_host: false,
        },
        pricing: {
            transparent_pricing: false,
        },
        tools: {
            ai_assistant: true,
        },
        security: {
            siem: false,
        },
    },
}
