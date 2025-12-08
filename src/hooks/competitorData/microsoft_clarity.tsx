export const microsoft_clarity = {
    name: 'Microsoft Clarity',
    key: 'microsoft_clarity',
    assets: {
        icon: '/images/competitors/microsoft-clarity.svg',
        comparisonArticle: 'blog/best-microsoft-clarity-alternatives',
    },
    products: {
        product_analytics: {
            available: false,
            funnels: {
                available: false,
            },
            user_paths: {
                available: false,
            },
        },
        session_replay: {
            available: true,
            pricing: {
                free_tier: true, // Completely free forever
            },
            features: {
                canvas_recording: false, // Cannot render canvas elements
                chat_with_recordings: true, // No AI chat feature
                clickmaps: true, // Yes
                conditional_recording: false, // No built-in conditional recording
                crash_reports: false, // Not available
                event_timeline: true, // Yes
                export_to_json: false, // No JSON export for recordings
                export_to_video: false, // No video export
                filter_by_user_or_event: true, // Yes, extensive filters
                identity_detection: true, // Yes, user identification
                iframe_recording: false, // Cannot record third-party iframes
                minimum_duration: false, // No minimum duration setting
                movement_maps: false, // No movement tracking
                notes_on_replays: true, // Yes, can add notes
                playlists: false, // No playlists, but has favorites
                privacy_masking: true, // Yes, automatic masking
                retention_policy: true, // 30 days standard, 13 months for favorites
                screenshot_mode: false, // Not available
                scrollmaps: true, // Yes
                search_by_network: false, // No network request filtering
                share_replays: true, // Yes, shareable links
                single_page_app: true, // Supports SPAs
                target_by_feature_flag: false, // No feature flag integration
                target_by_sample: false, // No sampling control
                target_by_url: true, // Yes, URL filtering
                wireframe_mode: false, // Not available
            },
            platform_support: {
                features: {
                    web_app_recordings: true,
                    mobile_app_recordings: true,
                    ios_recordings: true, // Native iOS SDK available
                    android_recordings: true, // Native Android SDK available
                    react_native_recordings: true,
                    flutter_recordings: true,
                },
            },
            analysis: {
                features: {
                    heatmaps: true, // Yes, click and scroll heatmaps
                    console_logs: false, // No console log capture
                    performance_monitoring: false, // No performance metrics
                    network_monitor: false, // No network monitoring
                    dom_explorer: false, // No DOM explorer
                },
            },
            ai: {
                features: {
                    ai_summaries: true, // Yes, Copilot AI summaries
                },
            },
        },
        heatmaps: {
            available: true,
            features: {
                clickmaps: true,
                dead_taps: true,
                heatmaps: true,
                rage_clicks: true,
                rage_taps: true,
                scrollmaps: true,
            },
        },
        surveys: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
        experiments: {
            available: false,
        },
        error_tracking: {
            available: false,
                },
            monitoring: {
                features: {
                    performance_monitoring: false,
                },
        },
    },
    platform: {
        deployment: {
            open_source: false,
        },
        pricing: {
            free_tier: true,
            transparent_pricing: true, // It's free, so pricing is clear
        },
    },
    pricing: {
        model: 'Free',
    },
}