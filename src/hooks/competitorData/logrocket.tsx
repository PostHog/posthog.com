export const logrocket = {
    name: 'LogRocket',
    key: 'logrocket',
    assets: {
        icon: '/images/competitors/logrocketzd.svg',
        comparisonArticle: '/blog/posthog-vs-logrocket',
    },
    products: {
        product_analytics: {
            available: true,
            features: {
                advertising_analytics: false,
                autocapture: false,
                cohorts: true,
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
            pricing: {
                free_tier: true,
            },
            features: {
                canvas_recording: false,
                chat_with_recordings: false,
                clickmaps: false,
                conditional_recording: true,
                event_timeline: false,
                export_to_json: false,
                export_to_video: false,
                filter_by_user_or_event: false,
                identity_detection: true,
                iframe_recording: false,
                minimum_duration: false,
                movement_maps: false,
                notes_on_replays: false,
                playlists: true,
                privacy_masking: true,
                rage_click_detection: false,
                retention_policy: false,
                screenshot_mode: false,
                scrollmaps: false,
                search_by_network: false,
                share_replays: false,
                single_page_app: false,
                target_by_feature_flag: false,
                target_by_sample: false,
                target_by_url: false,
                wireframe_mode: false,
            },
            platform_support: {
                features: {
                    web_app_recordings: true,
                    mobile_app_recordings: true,
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
                    network_monitor: false,
                    dom_explorer: false,
                },
            },
            ai: {
                features: {
                    ai_summaries: false,
                },
            },
        },
        heatmaps: {
            available: true,
            features: {
                heatmaps: true,
                clickmaps: true,
                scrollmaps: true,
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
        cdp: {
            available: true,
        },
        error_tracking: {
            available: true,
        },
    },
    platform: {
        deployment: {
            open_source: false,
            self_host: false,
        },
        pricing: {
            free_tier: true,
            transparent_pricing: false,
            usage_based_pricing: true,
        },
        integrations: {
            azure_blob: false,
            bigquery: false,
            community_integrations: false,
            customer_io: true,
            datadog: false,

            exports: true,
            gcs: false,
            google_ads: false,
            hubspot: false,
            imports: true,
            intercom: true,
            microsoft_teams: false,
            redshift: false,
            s3: false,
            salesforce: true,
            segment: true,
            slack: false,
            snowflake: false,
            sentry: true,
            zapier: true,
            zendesk: false,
        },
        developer: {
            notebooks: false,
        },
        security: {
            cookieless_tracking: false,
            data_anonymization: true,
            gdpr_ready: true,
            hipaa_ready: false,
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
