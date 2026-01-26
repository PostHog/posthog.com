export const workflowsFeatures = {
    summary: {
        name: 'Workflows',
        description: 'Automate workflows with your product data',
        url: '/workflows',
        docsUrl: '/docs/workflows',
    },
    pricing: {
        free_tier: {
            name: 'Monthly free tier',
        },
    },
    features: {
        real_time_triggers: {
            name: 'Real-time triggers',
            description: 'Trigger workflows in real-time based on user events',
        },
        email_editor: {
            name: 'Email editor/sender built-in',
            description: 'Built-in email editor and sending capabilities',
        },
        cohort_targeting: {
            name: 'Cohort/segment-based targeting',
            description: 'Target users based on cohorts and segments',
        },
        native_event_triggers: {
            name: 'Native product event triggers',
            description: 'Trigger workflows from native product events',
        },
        user_identity: {
            name: 'User identity & profiles',
            description: 'Access to user identity and profile data',
        },
        user_properties: {
            name: 'User properties updating',
            description: 'Update user properties within workflows',
        },
        branching_logic: {
            name: 'Branching/conditional logic',
            description: 'Create conditional branches in workflows',
        },
        no_data_syncing: {
            name: 'Automations without data syncing',
            description: 'Run automations without needing to sync data externally',
        },
        unified_analytics: {
            name: 'Unified analytics + automation',
            description: 'Analytics and automation in one platform',
        },
        experiment_triggers: {
            name: 'Experiments/feature flag triggers',
            description: 'Trigger workflows from experiments and feature flags',
        },
        webhook_actions: {
            name: 'Webhook actions',
            description: 'Send webhook requests as workflow actions',
        },
        run_based_pricing: {
            name: 'Predictable run-based pricing',
            description: 'Pay based on workflow runs',
        },
        api: {
            name: 'API',
            description: 'Programmatically start a workflow with a webhook',
        },
        logs: {
            name: 'Usage logs & metrics',
            description: 'Track how many times a workflow has been run, and what the results were',
        },
    },
    channels: {
        description: 'Reach users on different platforms',
        features: {
            email: {
                name: 'Email',
                description: 'Send emails to users',
            },
            slack: {
                name: 'Slack',
                description: 'Send messages to Slack',
            },
            webhooks: {
                name: 'Webhooks',
                description: 'Send messages to webhooks',
            },
            sms: {
                name: 'SMS',
                description: 'Send SMS messages to users',
            },
            push: {
                name: 'Push notifications',
                description: 'Send push notifications to users',
            },
            cdp: {
                name: 'CDP destinations',
                description: 'Send messages to CDP destinations',
            },
        },
    },
}
