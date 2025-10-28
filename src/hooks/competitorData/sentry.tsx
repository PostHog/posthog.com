export const sentry = {
    name: 'Sentry',
    key: 'sentry',
    assets: {
        icon: '/images/competitors/sentry.svg',
        comparisonArticle: '/blog/posthog-vs-sentry',
    },
    products: {
        error_tracking: {
            available: true,
            features: {
                error_alerts: true,
                exception_capture: true,
                issue_management: true,
                error_grouping: true,
                stack_tracing: true,
                network_performance: true,
                source_map_support: true,
            },
            integrations: {
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
                react_native_recordings: false,
                flutter_recordings: false,
                identity_detection: true,
                target_by_url: true,
                target_by_sample: false,
                filter_by_user_or_event: true,
                search_by_network: true,
                rage_click_detection: true,
                privacy_masking: true,
                export_to_json: true,
                export_to_video: false,
                retention_policy: '1 month',
            },
        },
        product_analytics: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
    },
    platform: {
        open_source: 'Open core',
        self_host: true,
        usage_based_pricing: true,
        transparent_pricing: false,
        free_tier: true,
    },
    pricing: {
        model: 'Seat-based + usage',
    },
}
