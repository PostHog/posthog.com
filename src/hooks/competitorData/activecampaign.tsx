export const activecampaign = {
    name: 'ActiveCampaign',
    key: 'activecampaign',
    products: {
        workflows: {
            available: true,
            features: {
                visual_builder: true,
                ai_assistant: true,
                // https://help.activecampaign.com/hc/en-us/articles/218788707-Automation-triggers-explained
                native_event_triggers: true,
                user_identity: true,
                cohort_targeting: true,
                campaign_tracking: true,
            },
            channels: {
                features: {
                    email: true,
                    sms: 'Add-on',
                    push: 'Via integration',
                    webhooks: true,
                    whatsapp: 'Add-on',
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
