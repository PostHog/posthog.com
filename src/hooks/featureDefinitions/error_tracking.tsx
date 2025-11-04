export const errorTrackingFeatures = {
    summary: {
        name: 'Error tracking',
        description: 'Track and monitor errors and exceptions in your code',
        url: '/error-tracking',
        docsUrl: '/docs/error-tracking',
    },
    pricing: {
        free_tier: {
            name: 'Free errors',
            description: 'Free errors you can capture per month',
        },
    },
    features: {
        description: 'Core error capture and triage capabilities',
        features: {
            code_context: {
                name: 'Code context',
                description: 'See the code related to the issue',
            },
            error_alerts: {
                name: 'Error alerts',
                description: 'Get notified in real time by email, Slack, or webhook when issues occur',
            },
            exception_capture: {
                name: 'Realtime error capture',
                description: 'Automatically capture and report errors as they happen',
            },
            issue_management: {
                name: 'Issue management',
                description: 'Manage and organize error issues with assignment and status tracking',
            },
            error_grouping: {
                name: 'Error grouping & deduplication',
                description: 'Automatically group similar errors and remove duplicates',
            },
            log_management: {
                name: 'Log management',
                description:
                    'Aggregate and analyze logs in real-time to correlate events, identify issues, and gain insight into system performance',
            },
            stack_tracing: {
                name: 'Stack tracing',
                description: 'Track the path of a request across your system',
            },
            console_log_capture: {
                name: 'Console log capture',
                description: 'Capture console logs alongside error events',
            },
            mobile_sdk_coverage: {
                name: 'Mobile SDK coverage',
                description: 'SDKs for iOS, Android, and mobile frameworks',
            },
            profiling: {
                name: 'Profiling',
                description: 'Monitor and visualize code performance',
            },
            user_device_context: {
                name: 'User & device context',
                description: 'Capture user and device details with errors',
            },
        },
    },
    monitoring: {
        description: 'Visibility into performance and releases',
        features: {
            cron_monitoring: {
                name: 'Cron monitoring',
                description: 'Track scheduled job health',
            },
            distributed_tracing: {
                name: 'Distributed tracing',
                description:
                    'Follow a request across services to identify latency bottlenecks and inter-service dependencies',
            },
            performance_monitoring: {
                name: 'Performance monitoring',
                description: 'Trace requests or queries and profile functions',
            },
            release_tracking: {
                name: 'Release and deploy tracking',
                description: 'Track errors by release version and deployment',
            },
            source_map_support: {
                name: 'Source map support',
                description: 'Support for source maps in minified code',
            },
        },
    },
    integrations: {
        description: 'Connect error context with other tools and datasets',
        features: {
            product_analytics: {
                name: 'Integration with product analytics',
                description: 'Connect error data with product usage analytics',
            },
            session_replay: {
                name: 'Integration with session replay',
                description: 'Link errors to session recordings for context',
            },
            ab_experiments: {
                name: 'Integration with A/B experiments',
                description: 'Connect error tracking with experimentation platform',
            },
        },
    },
}
