export const brevo = {
    name: 'Brevo',
    products: {
        workflows: {
            available: true,
            features: {
                visual_builder: true,
                ai_assistant: false,
                campaign_tracking: true,
                real_time_triggers: true,
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
                    email: true,
                    sms: true,
                    push: 'Professional',
                    webhooks: true,
                    whatsapp: 'Professional',
                },
            },
        },
    },
    platform: {
        pricing: {
            free_tier: true,
        },
        deployment: {
            open_source: false,
        },
    },
}
