export const openreplay = {
    name: 'OpenReplay',
    key: 'openreplay',
    assets: {
        icon: '/images/competitors/openreplay.svg',
    },
    products: {
        session_replay: {
            available: true,
            pricing: {
                free_tier: true, // Free self-hosted option
            },
            features: {
                canvas_recording: false, // Not mentioned
                chat_with_recordings: false, // No AI chat feature
                clickmaps: true, // With heatmaps
                conditional_recording: true, // Yes, via filtering
                crash_reports: false, // Only mentioned here but vague: https://docs.openreplay.com/en/tutorials/issues/
                event_timeline: true, // Yes
                export_to_json: false, // Not mentioned
                export_to_video: false, // Not mentioned
                filter_by_user_or_event: true, // Yes, omni-search
                identity_detection: true, // Yes, user identification
                iframe_recording: true, // https://docs.openreplay.com/en/installation/crossdomain-iframe/
                minimum_duration: false, // Not mentioned
                movement_maps: false, // Not available
                notes_on_replays: true, // Yes, annotations
                playlists: false, // Not mentioned
                privacy_masking: true, // Yes, fine-grained controls
                retention_policy: true, // Yes, configurable
                screenshot_mode: false, // Not available
                scrollmaps: false, // Not available as separate feature
                search_by_network: true, // Yes, can search by network requests
                share_replays: true, // Yes, shareable
                single_page_app: true, // Yes, supports SPAs
                target_by_feature_flag: false, // Not mentioned
                target_by_sample: false, // Not mentioned
                target_by_url: true, // Yes, via filtering
                wireframe_mode: false, // Not available
            },
            platform_support: {
                features: {
                    web_app_recordings: true,
                    mobile_app_recordings: true, // Yes
                    ios_recordings: true, // Native iOS SDK
                    android_recordings: true, // Native Android SDK
                    react_native_recordings: true, // Yes
                    flutter_recordings: false, // Not mentioned
                },
            },
            analysis: {
                features: {
                    heatmaps: true, // Yes, available
                    console_logs: true, // Yes, full console capture
                    performance_monitoring: true, // Yes, Core Web Vitals, CPU, memory
                    network_monitor: true, // Yes, full network activity
                    dom_explorer: false, // Not mentioned
                },
            },
            ai: {
                features: {
                    ai_summaries: true, // Yes, AI-powered session summaries
                },
            },
        },
        heatmaps: {
            available: true,
            features: {
                clickmaps: true, // Part of heatmaps
                dead_taps: true, // Detects dead clicks
                heatmaps: true,
                rage_clicks: true, // Detects rage clicks
                rage_taps: true,
                scrollmaps: true, // Part of heatmaps
            },
        },
    },
    pricing: {
        model: 'Open source / Cloud hosting', // Free self-hosted, paid cloud
    },
}
