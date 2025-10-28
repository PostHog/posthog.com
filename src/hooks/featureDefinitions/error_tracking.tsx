export const errorTrackingFeatures = {
    core: {
        error_alerts: {
            name: 'Error alerts',
            description: 'Get notified in real time by email, Slack, or webhook when issues occur',
        },
        exception_capture: {
            name: 'Exception capture',
            description: 'Automatically capture and report errors as they happen',
        },
        issue_management: {
            name: 'Issue management',
            description: 'Manage and organize error issues with assignment and status tracking',
        },
        error_grouping: {
            name: 'Error grouping',
            description: 'Automatically group similar errors to reduce noise',
        },
        stack_tracing: {
            name: 'Stack tracing',
            description: 'Full stack traces with source code context',
        },
    },
    monitoring: {
        network_performance: {
            name: 'Network performance monitoring',
            description: 'Track network requests and performance metrics',
        },
        source_map_support: {
            name: 'Source map support',
            description: 'Support for source maps in minified code',
        },
    },
    integrations: {
        product_analytics: {
            name: 'Integration with product analytics',
            description: 'Connect error data with product usage analytics',
        },
        session_replays: {
            name: 'Integration with session replays',
            description: 'Link errors to session recordings for context',
        },
        ab_experiments: {
            name: 'Integration with A/B experiments',
            description: 'Connect error tracking with experimentation platform',
        },
    },
}
