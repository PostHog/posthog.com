export const klaviyo = {
    name: 'Klaviyo',
    key: 'klaviyo',
    products: {
        workflows: {
            available: true,
            features: {
                visual_builder: true,
                ai_assistant: true,
                native_event_triggers: false,
                user_identity: true,
                cohort_targeting: true,
                campaign_tracking: true,
            },
            channels: {
                features: {
                    email: true,
                    sms: true,
                    push: true,
                    webhooks: true,
                    whatsapp: true,
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
