export const fullstory = {
    name: 'FullStory',
    key: 'fullstory',
    assets: {
        icon: '/images/competitors/fullstory.svg',
        comparisonArticle: '/blog/posthog-vs-fullstory',
    },
    products: {
        product_analytics: {
            available: true,
            features: {
                advertising_analytics: false,
                autocapture: false,
                cohorts: false,
                custom_events: true,
                custom_properties: true,
                monetization_analytics: false,
                predictive_insights: false,
                real_time_view: false,
                toolbar: false,
                user_profiles: false,
                insights: {
                    available: true,
                    features: {
                        formula_mode: false,
                        ready_made_insight_types: false,
                        sampling: false,
                        sql_editor: false,
                    },
                },
                trends: {
                    available: true,
                    features: {},
                },
                funnels: {
                    available: true,
                    features: {
                        correlation_analysis: false,
                    },
                },
                retention: {
                    available: true,
                    features: {},
                },
                user_paths: {
                    available: true,
                    features: {},
                },
                lifecycle: {
                    available: false,
                    features: {},
                },
                stickiness: {
                    available: false,
                    features: {},
                },
                group_analytics: {
                    available: false,
                    features: {},
                },
            },
        },
        web_analytics: {
            available: false,
        },
        session_replay: {
            available: true,
            beta: false,
            pricing: {
                free_tier: false,
            },
            features: {
                canvas_recording: false,
                chat_with_recordings: false,
                clickmaps: true,
                conditional_recording: true,
                event_timeline: false,
                export_to_json: true,
                export_to_video: false,
                filter_by_user_or_event: true,
                identity_detection: true,
                iframe_recording: false,
                minimum_duration: false,
                movement_maps: true,
                notes_on_replays: true,
                playlists: false,
                privacy_masking: true,
                rage_click_detection: true,
                retention_policy: '1 month',
                screenshot_mode: false,
                scrollmaps: true,
                search_by_network: false,
                share_replays: true,
                single_page_app: false,
                target_by_feature_flag: false,
                target_by_sample: false,
                target_by_url: true,
                wireframe_mode: false,
            },
            platform_support: {
                features: {
                    web_app_recordings: true,
                    mobile_app_recordings: true,
                    ios_recordings: true,
                    android_recordings: true,
                    react_native_recordings: false,
                    flutter_recordings: false,
                },
            },
            analysis: {
                features: {
                    heatmaps: true,
                    console_logs: false,
                    performance_monitoring: true,
                    network_monitor: false,
                    dom_explorer: false,
                },
            },
            ai: {
                features: {
                    ai_summaries: true,
                },
            },
        },
        feature_flags: {
            available: false,
        },
        surveys: {
            available: false,
        },
        experiments: {
            available: false,
        },
        dashboards: {
            available: true,
        },
    },
    platform: {
        deployment: {
            open_source: false,
            self_host: false,
        },
        pricing: {
            free_tier: false,
            transparent_pricing: false,
            usage_based_pricing: true,
        },
        integrations: {
            azure_blob: false,
            bigquery: true,
            community_integrations: false,
            customer_io: false,
            datadog: false,
            exports: true,
            gcs: true,
            google_ads: false,
            hubspot: false,
            imports: false,
            intercom: true,
            microsoft_teams: false,
            redshift: false,
            s3: false,
            salesforce: true,
            segment: true,
            slack: false,
            snowflake: true,
            sentry: false,
            zapier: false,
            zendesk: false,
        },
        developer: {
            notebooks: false,
        },
        security: {
            cookieless_tracking: false,
            data_anonymization: true,
            gdpr_ready: true,
            hipaa_ready: true,
            history_audit_logs: false,
            saml_sso: true,
            soc2_certified: true,
            two_factor_auth: true,
            user_privacy_options: false,
        },
    },
    pricing: {
        model: 'Usage-based',
    },
}
