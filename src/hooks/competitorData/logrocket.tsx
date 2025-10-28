export const logrocket = {
    name: 'LogRocket',
    key: 'logrocket',
    assets: {
        icon: '/images/competitors/logrocketzd.svg',
        comparisonArticle: '/blog/posthog-vs-logrocket',
    },
    products: {
        error_tracking: {
            available: true,
            features: {
                error_alerts: true,
                exception_capture: true,
                issue_management: false,
                error_grouping: true,
                stack_tracing: false,
                network_performance: true,
                source_map_support: true,
            },
            integrations: {
                product_analytics: true,
                session_replays: true,
            },
        },
        session_replay: {
            available: true,
            beta: false,
            features: {
                ai_summaries: true,
                single_page_app: true,
                ios_recordings: true,
                android_recordings: true,
                react_native_recordings: true,
                flutter_recordings: false,
                identity_detection: true,
                target_by_url: true,
                target_by_sample: false,
                filter_by_user_or_event: true,
                search_by_network: true,
                rage_click_detection: true,
                privacy_masking: true,
                export_to_json: false,
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
        free_tier: true,
    },
    pricing: {
        model: 'Usage-based',
    },
}
