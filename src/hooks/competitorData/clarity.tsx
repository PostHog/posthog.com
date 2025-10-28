export const clarity = {
    name: 'Clarity',
    key: 'clarity',
    assets: {
        icon: '/images/competitors/clarity.svg',
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
                react_native_recordings: true,
                flutter_recordings: true,
                identity_detection: true,
                target_by_url: true,
                target_by_sample: true,
                filter_by_user_or_event: true,
                search_by_network: false,
                rage_click_detection: true,
                privacy_masking: true,
                export_to_json: false,
                export_to_video: false,
                retention_policy: '30 days',
            },
        },
    },
    platform: {
        open_source: false,
        self_host: false,
        usage_based_pricing: false,
        transparent_pricing: true,
        free_tier: true,
    },
    pricing: {
        model: 'Free',
    },
}
