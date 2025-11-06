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
                filter_by_user_or_event: true,
                identity_detection: true,
                iframe_recording: false,
                minimum_duration: false,
                movement_maps: false,
                notes_on_replays: false,
                playlists: false,
                privacy_masking: true,
                retention_policy: '30 days',
                screenshot_mode: false,
                scrollmaps: false,
                search_by_network: false,
                share_replays: false,
                single_page_app: true,
                target_by_feature_flag: false,
                target_by_sample: true,
                target_by_url: true,
                wireframe_mode: false,
            },
            platform_support: {
                features: {
                    web_app_recordings: true,
                    mobile_app_recordings: true,
                    ios_recordings: true,
                    android_recordings: true,
                    react_native_recordings: true,
                    flutter_recordings: true,
                },
            },
            analysis: {
                features: {
                    console_logs: false,
                    dead_taps: true,
                    dom_explorer: false,
                    network_monitor: false,
                    performance_monitoring: false,
                    rage_taps: true,
                },
            },
            ai: {
                features: {
                    ai_summaries: true,
                },
            },
        },
        heatmaps: {
            available: true,
            features: {
                dead_taps: true,
                heatmaps: true,
                rage_clicks: true,
                scrollmaps: true,
            },
        },
        surveys: {
            available: false,
            features: {
                feedback_button: false,
            },
            platforms: {
                features: {
                    web: false,
                    mobile: false,
                },
            },
        },
        product_analytics: {
            available: false,
            features: {
                autocapture: true,
                cohorts: true,
            },
            group_analytics: {
                available: false,
            },
        },
        web_analytics: {
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
    },
    platform: {
        deployment: {
            open_source: false,
            self_host: false,
        },
        pricing: {
            free_tier: true,
            transparent_pricing: true,
            usage_based_pricing: false,
        },
        integrations: {
            azure_blob: false,
            bigquery: false,
            community_integrations: false,
            customer_io: false,
            datadog: false,
            exports: false,
            gcs: false,
            google_ads: false,
            hubspot: false,
            imports: false,
            intercom: false,
            microsoft_teams: false,
            redshift: false,
            s3: false,
            salesforce: false,
            segment: false,
            slack: false,
            snowflake: false,
            sentry: false,
            zapier: false,
            zendesk: false,
        },
        developer: {},
        tools: {
            cms: '',
            notebooks: false,
            project_management_tools: '',
        },
        security: {
            cookieless_tracking: false,
            data_anonymization: false,
            gdpr_ready: false,
            hipaa_ready: false,
            history_audit_logs: false,
            saml_sso: false,
            soc2_certified: false,
            two_factor_auth: false,
            user_privacy_options: false,
        },
    },
    pricing: {
        model: 'Free',
    },
}
