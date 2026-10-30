export const customer_io = {
    name: 'Customer.io',
    products: {
        workflows: {
            available: true,
            features: {
                // Drag-and-drop visual workflow builder
                // https://docs.customer.io/messaging/send/workflows/builder/
                visual_builder: true,
                // AI Agent: create automations/campaigns from natural language
                // https://docs.customer.io/ai/agent/
                ai_assistant: true,
                // Native open/click/conversion metrics on automations
                // https://docs.customer.io/messaging/metrics/automation-metrics/
                campaign_tracking: true,
                real_time_triggers: true,
                // Design Studio + classic drag-and-drop email editors
                // https://docs.customer.io/messaging/channels/email/editors/choose/
                email_editor: true,
                cohort_targeting: true,
                native_event_triggers: false,
                user_identity: true,
                user_properties: true,
                branching_logic: true,
                no_data_syncing: false,
                unified_analytics: false,
                experiment_triggers: false,
                webhook_actions: true,
                run_based_pricing: false,
            },
            channels: {
                features: {
                    // https://docs.customer.io/journeys/channels/
                    email: true,
                    sms: true,
                    push: true,
                    webhooks: true,
                    whatsapp: true,
                },
            },
        },
    },
}
