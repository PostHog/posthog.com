export const supportFeatures = {
    summary: {
        name: 'Support',
        description: 'One inbox for every customer conversation, with product context attached',
        url: '/support',
        docsUrl: '/docs/support',
    },
    features: {
        unified_inbox: {
            name: 'Unified inbox',
            description: 'Read and reply to every conversation from one place',
        },
        in_app_widget: {
            name: 'In-app chat widget',
            description: 'Let customers start conversations without leaving your product',
        },
        email_channel: {
            name: 'Email',
            description: 'Turn inbound email into tickets, with replies threading back to the customer',
        },
        slack_channel: {
            name: 'Slack',
            description: 'Create tickets from messages, mentions, or reactions in shared channels',
        },
        github_issues: {
            name: 'GitHub issues',
            description: 'Turn issues into tickets, with replies posting back as comments',
        },
        javascript_api: {
            name: 'JavaScript API',
            description: 'Build a fully custom support UI on the same backend',
        },
        saved_views: {
            name: 'Saved views',
            description: 'Save filter combinations to switch between common queries',
        },
        private_notes: {
            name: 'Private notes',
            description: 'Leave internal context on tickets that customers never see',
        },
        workflow_automation: {
            name: 'Workflow automation',
            description: 'Rules that set SLAs, auto-assign, tag, and change status',
        },
        sla_tracking: {
            name: 'SLA tracking',
            description: 'See whether tickets are on track, at risk, or breached',
        },
        historical_import: {
            name: 'Historical ticket import',
            description: 'Bring ticket history from your previous helpdesk',
        },
        ai_reply_agent: {
            name: 'AI reply agent',
            description: 'AI-drafted replies to customer conversations',
        },
    },
    product_context: {
        description: 'What arrives attached to a ticket, without extra tools',
        features: {
            session_replay_attached: {
                name: 'Session replay attached',
                description: 'Watch what the customer did before they wrote in',
            },
            events_attached: {
                name: 'Product events attached',
                description: 'See the events from when the ticket was created',
            },
            errors_attached: {
                name: 'Errors attached',
                description: 'See exceptions from the customer’s session, linked to error tracking',
            },
            previous_tickets: {
                name: 'Previous tickets',
                description: 'Past conversations with the same person, in view',
            },
            analytics_correlation: {
                name: 'Product analytics correlation',
                description: 'Analyze tickets alongside retention, funnels, and trends',
            },
            auto_fix_prs: {
                name: 'Tickets to pull requests',
                description: 'Recurring issues become draft PRs for a human to review',
            },
        },
    },
}
