export const drip = {
    name: 'Drip',
    key: 'drip',
    products: {
        workflows: {
            available: true,
            features: {
                visual_builder: true,
                ai_assistant: false,
                native_event_triggers: true,
                user_identity: true,
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
            free_tier: false,
        },
        deployment: {
            open_source: false,
        },
    },
}
