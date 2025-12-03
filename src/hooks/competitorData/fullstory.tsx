export const fullstory = {
    name: 'FullStory',
    key: 'fullstory',
    assets: {
        icon: '/images/competitors/fullstory.svg',
        comparisonArticle: '/blog/posthog-vs-fullstory',
    },
    products: {
        heatmaps: {
            available: true,
            features: {
                clickmaps: true,
                dead_taps: true,
                heatmaps: true,
                rage_clicks: true,
                rage_taps: true,
                scrollmaps: true,
                movement_maps: true,
            },
        },
        product_analytics: {
            available: true,
            features: {
                actions: true,
                advertising_analytics: false,
                ai_analysis: false,
                autocapture: true,
                cohorts: true,
                conversion_funnels: true,
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
                    alerts: true,
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
            features: {
                clickmaps: true,
                heatmaps: true,
                scrollmaps: true,
                movement_maps: true,
            },
        },
        session_replay: {
            available: true,
            beta: false,
            pricing: {
                free_tier: false,
            },
            features: {
                canvas_recording: true,
                chat_with_recordings: false,
                conditional_recording: true,
                crash_reports: false,
                event_timeline: true,
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
                retention_policy: '1 month',
                screenshot_mode: false,
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
                    console_logs: true,
                    dead_taps: true,
                    dom_explorer: false,
                    heatmaps: true,
                    network_monitor: true,
                    performance_monitoring: true,
                    rage_clicks: true,
                    rage_taps: true,
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
            platforms: {
                features: {
                    web: false,
                    mobile: false,
                },
            },
        },
        experiments: {
            available: false,
            features: {
                no_code_experiments: false,
            },
            targeting: {
                features: {
                    custom_targeting: false,
                },
            },
        },
        error_tracking: {
            available: false,
            features: {
                issue_management: false,
                performance_monitoring: false,
            },
        },
        dashboards: {
            available: true,
        },
    },
    platform: {
        deployment: {
            open_source: false,
            reverse_proxy: true,
            self_host: false,
        },
        pricing: {
            free_tier: false,
            self_serve: false,
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
            rudderstack: true,
            s3: false,
            salesforce: true,
            segment: true,
            slack: false,
            snowflake: true,
            sentry: false,
            stripe: false,
            zapier: false,
            zendesk: false,
        },
        developer: {
            api: true,
            cross_domain_tracking: true,
            server_side_sdks: true,
        },
        tools: {
            cms: '',
            notebooks: false,
            project_management_tools: '',
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
            user_privacy_options: true,
        },
    },
    pricing: {
        model: 'Usage-based',
    },
}
