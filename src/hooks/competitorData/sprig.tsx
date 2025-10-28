export const sprig = {
    name: 'Sprig',
    key: 'sprig',
    assets: {
        icon: '/images/competitors/sprig.svg',
    },
    products: {
        surveys: {
            available: true,
            features: {
                hosted_surveys: true,
                mobile_surveys: false,
                customizable_pop_ups: true,
                live_previews: true,
                multi_step_surveys: true,
                api_access: true,
                single_choice_questions: true,
                multiple_choice_questions: true,
                open_text_questions: true,
                rating_questions: true,
                nps_questions: true,
                csat_questions: true,
                target_by_url: true,
                target_by_cohort: false,
                target_by_person_property: false,
                user_targeting: true,
                user_filtering: true,
            },
        },
    },
    platform: {
        open_source: false,
        self_host: false,
        usage_based_pricing: true,
        transparent_pricing: false,
        free_tier: false,
    },
    pricing: {
        model: 'Usage-based',
    },
}
