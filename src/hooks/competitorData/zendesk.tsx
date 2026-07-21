export const zendesk = {
    name: 'Zendesk',
    key: 'zendesk',
    assets: {},
    products: {
        support: {
            available: true,
            features: {
                unified_inbox: true,
                in_app_widget: true,
                email_channel: true,
                slack_channel: true,
                github_issues: 'Via integration',
                javascript_api: true,
                saved_views: true,
                private_notes: true,
                workflow_automation: true,
                sla_tracking: true,
                historical_import: true,
                ai_reply_agent: 'Paid add-on',
                session_replay_attached: 'Via integration',
                events_attached: 'Via integration',
                errors_attached: false,
                previous_tickets: true,
                analytics_correlation: false,
                auto_fix_prs: false,
            },
        },
    },
    platform: {},
    pricing: {
        model: 'Per agent, per month',
    },
}
