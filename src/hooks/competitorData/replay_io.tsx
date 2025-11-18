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
                free_tier: true, // Free tier available for individuals
            },
            features: {
                canvas_recording: false, // Not mentioned as a specific feature
                chat_with_recordings: false, // No AI chat feature
                clickmaps: false, // Not available
                conditional_recording: false, // No conditional recording
                crash_reports: false, // Not a primary feature
                event_timeline: true, // Yes, test timeline available
                export_to_json: false, // No JSON export
                export_to_video: false, // No video export
                filter_by_user_or_event: false, // Limited filtering
                identity_detection: false, // Not a focus
                iframe_recording: false, // Not mentioned
                minimum_duration: false, // Not available
                movement_maps: false, // Not available
                notes_on_replays: true, // Yes, annotations and comments
                playlists: false, // Not available
                privacy_masking: false, // Not a primary focus (built for dev use)
                retention_policy: false, // Not clearly defined
                screenshot_mode: false, // Not available
                scrollmaps: false, // Not available
                search_by_network: true, // Yes, can search network requests
                share_replays: true, // Yes, shareable replay links
                single_page_app: true, // Supports SPAs
                target_by_feature_flag: false, // No feature flag integration
                target_by_sample: false, // No sampling
                target_by_url: false, // Not available
                wireframe_mode: false, // Not available
            },
            platform_support: {
                features: {
                    web_app_recordings: true, // Primary focus
                    mobile_app_recordings: false, // Not supported
                    ios_recordings: false, // Not supported
                    android_recordings: false, // Not supported
                    react_native_recordings: false, // Not supported
                    flutter_recordings: false, // Not supported
                },
            },
            analysis: {
                features: {
                    heatmaps: false, // Not available
                    console_logs: true, // Yes, full console access
                    performance_monitoring: true, // Yes, performance data
                    network_monitor: true, // Yes, network monitoring
                    dom_explorer: true, // Yes, Elements panel
                },
            },
            ai: {
                features: {
                    ai_summaries: false, // Not available (though moving towards AI with Nut)
                },
            },
        },
        heatmaps: {
            available: false, // No heatmaps
        },
    },
    pricing: {
        model: 'Usage-based', // Usage-based with team plans
    },
}
