export const matomo = {
    name: 'Matomo',
    key: 'matomo',
    assets: {
        icon: '/images/competitors/matomo.svg',
        comparisonArticle: '/blog/posthog-vs-matomo',
    },
    products: {
        session_replay: {
            available: true,
            beta: false,
            features: {
                ai_summaries: false,
                single_page_app: true,
                ios_recordings: false,
                android_recordings: false,
                react_native_recordings: false,
                flutter_recordings: false,
                identity_detection: true,
                target_by_url: true,
                target_by_sample: true,
                filter_by_user_or_event: true,
                search_by_network: true,
                rage_click_detection: false,
                privacy_masking: true,
                export_to_json: true,
                export_to_video: false,
                retention_policy: '24 months',
            },
        },
    },
    platform: {
        open_source: true,
        self_host: true,
        usage_based_pricing: false,
        transparent_pricing: false,
        free_tier: true,
    },
    pricing: {
        model: 'Tier-based',
    },
}
