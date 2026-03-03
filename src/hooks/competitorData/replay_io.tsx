export const replay_io = {
    name: 'Replay.io',
    key: 'replay_io',
    assets: {
        icon: '/images/competitors/replay-io.svg',
    },
    products: {
        session_replay: {
            available: true,
            pricing: {
                free_tier: true,
            },
            features: {
                canvas_recording: false,
                chat_with_recordings: false,
                clickmaps: false,
                conditional_recording: false,
                crash_reports: false,
                event_timeline: true,
                export_to_json: false,
                export_to_video: false,
                filter_by_user_or_event: false,
                identity_detection: false,
                iframe_recording: false,
                minimum_duration: false,
                movement_maps: false,
                notes_on_replays: true,
                playlists: false,
                privacy_masking: false,
                retention_policy: false,
                screenshot_mode: false,
                scrollmaps: false,
                search_by_network: true,
                share_replays: true,
                single_page_app: true,
                target_by_feature_flag: false,
                target_by_sample: false,
                target_by_url: false,
                wireframe_mode: false,
            },
            platform_support: {
                features: {
                    web_app_recordings: true,
                    mobile_app_recordings: false,
                    ios_recordings: false,
                    android_recordings: false,
                    react_native_recordings: false,
                    flutter_recordings: false,
                },
            },
            analysis: {
                features: {
                    heatmaps: false,
                    console_logs: true,
                    performance_monitoring: true,
                    network_monitor: true,
                    dom_explorer: true,
                },
            },
            ai: {
                features: {
                    ai_summaries: false,
                },
            },
        },
        heatmaps: {
            available: false,
            features: {
                clickmaps: false,
                dead_taps: false,
                heatmaps: false,
                rage_clicks: false,
                rage_taps: false,
                scrollmaps: false,
            },
        },
    },
    pricing: {
        model: 'Usage-based',
    },
}
