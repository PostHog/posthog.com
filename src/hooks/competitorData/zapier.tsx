export const zapier = {
    name: 'Zapier',
    products: {
        workflows: {
            available: true,
            features: {
                // Visual Editor: drag-and-drop steps/paths
                // https://help.zapier.com/hc/en-us/articles/16722578092429
                visual_builder: true,
                // Copilot: create/edit Zaps from natural language (open beta, all plans)
                // https://help.zapier.com/hc/en-us/articles/15703650952077
                ai_assistant: true,
                // No native ESP campaign analytics; opens/clicks come from connected ESPs
                campaign_tracking: false,
                real_time_triggers: 'Webhook-based',
                email_editor: false,
                cohort_targeting: false,
                native_event_triggers: false,
                user_identity: false,
                user_properties: false,
                branching_logic: true,
                no_data_syncing: false,
                unified_analytics: false,
                experiment_triggers: false,
                webhook_actions: true,
                run_based_pricing: false,
            },
            channels: {
                features: {
                    // Email by Zapier: https://zapier.com/apps/email/integrations
                    email: true,
                    // SMS by Zapier (built-in, limited): https://zapier.com/apps/sms/integrations
                    sms: true,
                    // No native push; OneSignal etc.: https://zapier.com/apps/onesignal/integrations
                    push: 'Via integration',
                    // Webhooks by Zapier: https://zapier.com/apps/webhook/integrations
                    webhooks: true,
                    // WhatsApp Business (to users), not WhatsApp Notifications (to yourself)
                    // https://help.zapier.com/hc/en-us/articles/40123068069005
                    whatsapp: 'Via integration',
                },
            },
        },
    },
}
