export const getresponse = {
    name: 'GetResponse',
    key: 'getresponse',
    products: {
        workflows: {
            available: true,
            features: {
                visual_builder: true,
                ai_assistant: false,
                // https://www.getresponse.com/help/what-is-web-connect-and-how-can-i-use-it.html
                native_event_triggers: true,
                user_identity: true,
                cohort_targeting: true,
                campaign_tracking: true,
            },
            channels: {
                features: {
                    email: true,
                    sms: true,
                    push: 'Enterprise',
                    webhooks: true,
                    whatsapp: false,
                },
            },
        },
    },
    platform: {
        pricing: {
            // There's a free trial, but no free tier
            free_tier: false,
        },
        deployment: {
            open_source: false,
        },
    },
}
