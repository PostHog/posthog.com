export const fullstory = {
    name: 'FullStory',
    key: 'fullstory',
    assets: {
        icon: '/images/competitors/fullstory.svg',
        comparisonArticle: '/blog/posthog-vs-fullstory',
    },
    products: {
        session_replay: {
            available: true,
            beta: false,
            features: {
                ai_summaries: true,
                single_page_app: true,
                ios_recordings: true,
                android_recordings: true,
                react_native_recordings: false,
                flutter_recordings: false,
                identity_detection: true,
                target_by_url: true,
                target_by_sample: false,
                filter_by_user_or_event: true,
                search_by_network: false,
                rage_click_detection: true,
                privacy_masking: true,
                export_to_json: true,
                export_to_video: false,
                retention_policy: '1 month',
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
