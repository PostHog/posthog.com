export const survey_monkey = {
    name: 'SurveyMonkey',
    key: 'survey_monkey',
    assets: {
        icon: '/images/competitors/survey_monkey.svg',
    },
    products: {
        surveys: {
            available: true,
            features: {
                integrations: true,
            },
            targeting: {
                features: {
                    custom_targeting: true,
                },
            },
            branching: {
                features: {
                    multi_step_surveys: true,
                },
            },
            platforms: {
                features: {
                    web: true,
                    mobile: true,
                },
            },
        },
        session_replay: {
            available: false,
        },
        heatmaps: {
            available: false,
        },
        product_analytics: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
        experiments: {
            available: false,
        },
    },
    platform: {
        deployment: {
            eu_hosting: false,
            open_source: false,
        },
        pricing: {
            free_tier: false,
            transparent_pricing: true,
        },
    },
}
