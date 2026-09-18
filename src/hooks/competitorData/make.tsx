export const make = {
    name: 'Make',
    products: {
        workflows: {
            available: true,
            features: {
                // "Drag, drop, and connect modules"
                // https://www.make.com/en/product
                visual_builder: true,
                // Maia: NL → scenarios, but marketing page is still Early Access waitlist
                // (GA planned later 2026). https://www.make.com/en/maia
                ai_assistant: 'Early access',
                // No native campaign open/click/conversion tracking; pulls from ESPs
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
                    // Native Email module (Send an Email): https://www.make.com/en/integrations/email
                    email: true,
                    // No native SMS; Twilio module: https://www.make.com/en/integrations/twilio
                    sms: 'Via integration',
                    // No native push; OneSignal / similar apps
                    push: 'Via integration',
                    // Native webhooks tool: https://www.make.com/en/help/tools/webhooks
                    webhooks: true,
                    // WhatsApp Business Cloud: https://www.make.com/en/integrations/whatsapp-business-cloud
                    whatsapp: 'Via integration',
                },
            },
        },
    },
}
