export const heap = {
    name: 'Heap',
    key: 'heap',
    assets: {
        icon: '/images/competitors/heap.svg',
        comparisonArticle: '/blog/posthog-vs-heap',
    },
    products: {
        product_analytics: {
            available: true,
            pricing: {
                free_tier: '10k monthly tracked users',
            },
            features: {
                advertising_analytics: false,
                autocapture: true,
                cohorts: true,
                custom_events: true,
                custom_properties: true,
                monetization_analytics: false,
                predictive_insights: false,
                real_time_view: false,
                toolbar: false,
                user_profiles: true,
                insights: {
                    available: true,
                    features: {
                        formula_mode: false,
                        ready_made_insight_types: true,
                        sampling: false,
                        sql_editor: 'Exports only',
                    },
                },
                trends: {
                    available: true,
                    features: {},
                },
                funnels: {
                    available: true,
                    features: {
                        correlation_analysis: true,
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
                    available: true,
                    features: {},
                },
                stickiness: {
                    available: false,
                    features: {},
                },
                group_analytics: {
                    available: true,
                    features: {},
                },
            },
        },
        web_analytics: {
            available: true,
        },
        session_replay: {
            available: true,
            pricing: {
                free_tier: 'Limited trial',
            },
            features: {
                canvas_recording: false,
                chat_with_recordings: false,
                clickmaps: false,
                conditional_recording: false,
                event_timeline: false,
                export_to_json: false,
                export_to_video: false,
                filter_by_user_or_event: false,
                identity_detection: true,
                iframe_recording: false,
                minimum_duration: false,
                movement_maps: false,
                notes_on_replays: false,
                playlists: false,
                privacy_masking: false,
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
                    console_logs: false,
                    performance_monitoring: false,
                    network_monitor: true,
                    dom_explorer: false,
                },
            },
            ai: {
                features: {
                    ai_summaries: false,
                },
            },
        },
        feature_flags: {
            available: false,
        },
        experiments: {
            available: false,
        },
        surveys: {
            available: false,
        },
        cdp: {
            available: false,
        },
        data_warehouse: {
            available: false,
        },
        error_tracking: {
            available: false,
        },
        dashboards: {
            available: true,
        },
        heatmaps: {
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
        analytics_integration: {
            built_in_analytics: true,
        },
        developer: {
            api: false,
            notebooks: false,
            proxies: false,
            sdks: false,
            sql: false,
        },
        integrations: {
            ci_cd_integrations: false,
            community_integrations: false,
            datadog: false,
            exports: false,
            google_ads: false,
            imports: false,
            microsoft_teams: false,
            segment: false,
            sentry: false,
            slack: false,
            zapier: false,
            zendesk: false,
        },
        security: {
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
        model: 'Usage-based',
    },
}
