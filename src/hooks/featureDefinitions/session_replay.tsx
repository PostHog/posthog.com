export const sessionReplayFeatures = {
    summary: {
        name: 'Session Replay',
        description: 'Watch real user sessions to understand behavior and fix issues',
        url: '/session-replay',
        docsUrl: '/docs/session-replay',
    },
    pricing: {
        free_tier: {
            name: 'Monthly free tier',
        },
    },
    features: {
        canvas_recording: {
            name: 'Canvas recording',
            description: 'Capture canvas elements in your app',
        },
        chat_with_recordings: {
            name: 'Chat with your recordings',
            description: 'Discover useful recordings using AI-powered chat',
        },
        crash_reports: {
            name: 'Crash reports',
            description: 'Learn what happens before a crash without complex debugging or reproduction',
        },
        event_timeline: {
            name: 'Event timeline',
            description: 'See events triggered during recordings',
        },
        highlights: {
            name: 'Highlights',
            description: 'Create short clips from recordings',
        },
        iframe_recording: {
            name: 'Iframe recording',
            description: 'Record embedded iframes',
        },
        minimum_duration: {
            name: 'Minimum duration',
            description: 'Only record sessions longer than the minimum duration',
        },
        screenshot_mode: {
            name: 'Screenshot mode',
            description: 'Mobile session reconstructions using app screenshots',
        },
        sentiment_scores: {
            name: 'Frustration and engagement scores',
            description: 'Filter recordings by sentiment analysis',
        },
        wireframe_mode: {
            name: 'Wireframe mode',
            description: 'Low performance impact mobile recordings using wireframes',
        },
    },
    platform_support: {
        description: 'Record on web and mobile across major frameworks',
        features: {
            web_app_recordings: {
                name: 'Web app recordings',
                description: 'Capture recordings from single-page apps and websites',
            },
            mobile_app_recordings: {
                name: 'Mobile app recordings',
                description: 'Capture recordings in iOS and Android apps',
            },
            ios_recordings: {
                name: 'iOS recordings',
                description: 'Record sessions from iOS mobile apps',
            },
            android_recordings: {
                name: 'Android recordings',
                description: 'Record sessions from Android mobile apps',
            },
            react_native_recordings: {
                name: 'React Native recordings',
                description: 'Record sessions from React Native apps',
            },
            flutter_recordings: {
                name: 'Flutter recordings',
                description: 'Record sessions from Flutter apps',
            },
        },
    },
    analysis: {
        description: 'Tools to analyze and understand sessions',
        features: {
            heatmaps: {
                name: 'Heatmaps',
                description: 'Visualize where users click in your app or website',
            },
            console_logs: {
                name: 'Console logs',
                description: 'Capture console output from the browser for debugging',
            },
            performance_monitoring: {
                name: 'Performance monitoring',
                description: 'Track network events and performance metrics within a session',
            },
            network_monitor: {
                name: 'Network monitoring',
                description: 'Monitor network activity during sessions',
            },
            dom_explorer: {
                name: 'DOM explorer',
                description: 'Explore an interactive snapshot of replays',
            },
        },
    },
    ai: {
        description: 'AI enhancements that summarize and extract insights from recordings',
        features: {
            ai_summaries: {
                name: 'AI summaries',
                description: 'AI-generated summaries of session recordings',
            },
        },
    },
    targeting: {
        description: 'Control what gets recorded and how to find it later',
        features: {
            conditional_recording: {
                name: 'Conditional recording',
                description: 'Only capture the sessions you want based on conditions',
            },
            filter_by_user_or_event: {
                name: 'Filter recordings by user or event',
                description: 'Find specific recordings by filtering for users or events',
            },
            minimum_duration: {
                name: 'Minimum duration',
                description: 'Only record sessions longer than a specified duration',
            },
            search_by_network: {
                name: 'Search by network request',
                description: 'Search recordings by network requests made during the session',
            },
            target_by_url: {
                name: 'Target recordings by URL',
                description: 'Start or filter recordings based on specific URLs or URL patterns',
            },
            target_by_sample: {
                name: 'Sample recorded sessions',
                description: 'Restrict the percentage of sessions that will be recorded',
            },
            target_by_feature_flag: {
                name: 'Record via feature flag',
                description: 'Only record sessions for users that have the flag enabled',
            },
        },
    },
    organization: {
        description: 'Organize and manage your recordings',
        features: {
            playlists: {
                name: 'Playlists',
                description: 'Sort recordings into static and dynamic playlists',
            },
            share_replays: {
                name: 'Share replays',
                description: 'Generate timestamped short links for sharing',
            },
            notes_on_replays: {
                name: 'Add notes to replays',
                description: 'Add notes to a timebar when sharing',
            },
        },
    },
    privacy: {
        description: 'Protect user privacy and sensitive information',
        features: {
            privacy_masking: {
                name: 'Privacy masking for sensitive content',
                description: 'Automatic and manual masking of sensitive user data',
            },
        },
    },
    export: {
        description: 'Export and manage recordings',
        features: {
            export_to_json: {
                name: 'Export recordings to JSON',
                description: 'Export important recording data for offline storage',
            },
            export_to_video: {
                name: 'Export recordings to video',
                description: 'Export session recordings as video files',
            },
            retention_policy: {
                name: 'Recording retention policy',
                description: 'Configure how long recordings are stored before deletion',
            },
        },
    },
    identity: {
        description: 'Identify users for debugging and support',
        features: {
            identity_detection: {
                name: 'Identity detection',
                description: 'Identify users in recordings for debugging and support',
            },
        },
    },
}
