export const tracesFeatures = {
    summary: {
        name: 'Tracing',
        description: 'Distributed tracing that goes straight to the line that broke.',
        url: '/tracing',
        docsUrl: '/docs/distributed-tracing',
    },
    pricing: {
        name: 'Pricing',
        features: {
            pricing_model: {
                name: 'Pricing model',
                description: 'What you are billed for – hosts, spans, or ingested volume',
            },
            free_tier: {
                name: 'Free tier',
                description: 'A permanent free allowance, not just a trial',
            },
            open_source: {
                name: 'Open source',
            },
        },
    },
    tracing: {
        name: 'Tracing',
        features: {
            distributed_trace_waterfall: {
                name: 'Distributed trace waterfall',
                description: 'See one request broken into spans across every service it touches',
            },
            service_dependency_map: {
                name: 'Service / dependency map',
                description: 'A generated graph of which services call which',
            },
            code_level_profiling: {
                name: 'Code-level profiling (flame graphs)',
                description: 'Profile CPU and memory down to the function that spent the time',
            },
            sampling_controls: {
                name: 'Sampling controls',
                description: 'Decide which traces get ingested',
            },
            retention_controls: {
                name: 'Retention controls',
                description: 'Decide how long traces are stored',
            },
        },
    },
    standards_and_setup: {
        name: 'Standards and setup',
        features: {
            native_open_telemetry_ingest: {
                name: 'Native OpenTelemetry ingestion',
                description: 'Natively ingest and process telemetry using OpenTelemetry APIs and formats',
            },
            no_proprietary_sdk_required: {
                name: 'No proprietary SDK required',
                description: 'Instrument with OpenTelemetry instead of adopting a vendor SDK',
            },
            instrumentation: {
                name: 'Instrumentation',
                description: 'How spans get collected from your services',
            },
        },
    },
    one_platform: {
        name: 'One platform',
        features: {
            signals_alongside_traces: {
                name: 'Errors, logs & session replay alongside traces',
                description: 'Jump from a slow span to the error, log line, or user session behind it',
            },
        },
    },
    ai_and_self_driving: {
        name: 'AI and self-driving',
        features: {
            ai_opens_code_fix_pr: {
                name: 'AI opens a code fix PR',
                description: 'An agent reads the trace, locates the fix, and opens the pull request',
            },
            fix_and_open_pr_from_slack: {
                name: 'Fix a bug and open a PR from Slack',
                description: 'Tag the agent in Slack and get a pull request back',
            },
        },
    },
}
