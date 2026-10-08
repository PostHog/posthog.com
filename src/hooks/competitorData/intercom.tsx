export const intercom = {
    name: 'Intercom',
    key: 'intercom',
    assets: {},
    products: {
        support: {
            available: true,
            features: {
                unified_helpdesk: true,
                in_app_widget: true,
                email_channel: true,
                slack_channel: 'Via integration',
                github_issues: 'Via integration',
                javascript_api: true,
                saved_views: true,
                private_notes: true,
                workflow_automation: true,
                sla_tracking: true,
                historical_import: true,
                ai_reply_agent: 'Fin, billed per resolution',
                session_replay_attached: 'Via integration',
                events_attached: true,
                errors_attached: false,
                previous_tickets: true,
                analytics_correlation: false,
                auto_fix_prs: false,
            },
        },
    },
    platform: {},
    pricing: {
        model: 'Per seat, plus usage-based AI',
    },
}
