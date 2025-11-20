export const cdpFeatures = {
    summary: {
        name: 'CDP',
        description: 'Ingest, transform, and send data between 145+ tools',
        url: '/cdp',
        docsUrl: '/docs/cdp',
    },
    features: {
        realtime_streaming: {
            name: 'Realtime event streaming',
            description: 'Send events to Slack, webhooks, and 40+ tools as they happen',
        },
    },
    sources_destinations: {
        description: 'Connect tools to your data pipeline',
        features: {
            custom_transformations: {
                name: 'Custom transformations',
                description: 'Filter, modify, and enrich data before sending to destinations',
            },
            no_code_setup: {
                name: 'No-code setup',
                description: 'Configure sources and destinations through the UI, no engineering required',
            },
        },
    },
    data_transformation: {
        description: 'Clean, filter, and enrich your data',
        features: {
            schema_enforcement: {
                name: 'Schema enforcement',
                description: 'Ensure data quality by validating events against defined schemas',
            },
            event_labeling: {
                name: 'Event labeling',
                description: 'Add custom properties to categorize and organize your events',
            },
            data_filtering: {
                name: 'Data filtering',
                description: 'Remove unwanted events or properties before they reach destinations',
            },
            property_mapping: {
                name: 'Property mapping',
                description: 'Transform property names and values to match destination requirements',
            },
            custom_code: {
                name: 'Custom code',
                description: 'Write JavaScript transformations for complex logic',
            },
        },
    },
    reliability: {
        description: 'Enterprise-grade data pipeline',
        features: {
            automatic_retries: {
                name: 'Automatic retries',
                description: 'Failed deliveries retry automatically with exponential backoff',
            },
            error_monitoring: {
                name: 'Error monitoring',
                description: 'Track delivery success rates and debug failures',
            },
            dead_letter_queue: {
                name: 'Dead letter queue',
                description: 'Capture and recover events that fail processing',
            },
            performance_metrics: {
                name: 'Performance metrics',
                description: 'Monitor throughput, latency, and resource usage',
            },
            scalable_infrastructure: {
                name: 'Scalable infrastructure',
                description: 'Handles millions of events per day without breaking a sweat',
            },
        },
    },
}
