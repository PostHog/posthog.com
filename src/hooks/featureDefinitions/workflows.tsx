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
