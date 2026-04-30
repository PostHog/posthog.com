export const mailerlite = {
    name: 'MailerLite',
    key: 'mailerlite',
    products: {
        workflows: {
            available: true,
            features: {
                visual_builder: true,
                ai_assistant: false,
                native_event_triggers: false,
                user_identity: false,
                cohort_targeting: true,
                campaign_tracking: true,
            },
            channels: {
                features: {
                    email: true,
                    sms: true,
                    push: false,
                    webhooks: true,
                    whatsapp: false,
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
