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
                free_tier: '10k monthly sessions',
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
                toolbar: true,
                user_profiles: true,
                insights: {
                    available: true,
                    features: {
                        ai_insight_builder: true,
                        formula_mode: false,
                        ready_made_insight_types: true,
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
                        conversion_funnels: true,
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
        product_tours: {
            available: false,
        },
        web_analytics: {
            available: true,
            features: {
                snippet_install: true,
                search_tools: false,
            },
        },
        session_replay: {
            available: 'Pro/Premier Add-on',
            pricing: {
                free_tier: false,
            },
            features: {
                canvas_recording: false,
                chat_with_recordings: false,
                clickmaps: true,
                conditional_recording: true,
                event_timeline: false,
                filter_by_user_or_event: true,
                identity_detection: true,
                iframe_recording: false,
                minimum_duration: false,
                movement_maps: false,
                notes_on_replays: false,
                playlists: false,
                privacy_masking: true,
                retention_policy: false,
                screenshot_mode: false,
                scrollmaps: false,
                search_by_network: false,
                share_replays: true,
                single_page_app: true,
                target_by_feature_flag: false,
                target_by_sample: true,
                target_by_url: true,
                wireframe_mode: false,
            },
            export: {
                features: {
                    export_to_json: false,
                    export_to_video: false,
                    retention_policy: '',
                },
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
                    heatmaps: true,
                    console_logs: false,
                    performance_monitoring: false,
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
        feature_flags: {
            available: false,
            pricing: {
                free_tier: 'n/a',
            },
            features: {
                boolean_flags: false,
                early_access_management: false,
                multivariate_flags: false,
                json_payloads: false,
                release_conditions: false,
                remote_config: false,
                single_page_app_support: false,
                usage_logs: false,
            },
            implementation: {
                features: {
                    bootstrapping: false,
                    local_evaluation: false,
                },
            },
            management: {
                features: {
                    flag_administration: false,
                    flag_scheduling: false,
                    history_activity: false,
                    instant_rollbacks: false,
                    multi_environment: false,
                },
            },
            targeting: {
                features: {
                    cohort_integration: false,
                    custom_targeting: false,
                    exclusion_rules: false,
                    geographic_targeting: false,
                    group_level_experiments: false,
                    target_by_percentage: false,
                    target_by_person_properties: false,
                },
            },
        },
        experiments: {
            available: false,
            pricing: {
                free_tier: 'n/a',
            },
            features: {
                count_value_metrics: false,
                custom_goals: false,
                dynamic_cohorts: false,
                experiment_analysis: false,
                funnel_metrics: false,
                namespacing: false,
                native_goal_tracking: false,
                no_code_experiments: false,
                ratio_metrics: false,
                recommended_run_time: false,
                secondary_metrics: false,
                shared_metrics_library: false,
                split_testing: false,
                visual_editor: false,
            },
            targeting: {
                features: {
                    cohort_integration: false,
                    custom_targeting: false,
                    exclusion_rules: false,
                    geographic_targeting: false,
                    group_level_experiments: false,
                },
            },
            implementation: {
                features: {
                    api_access: false,
                    feature_flag_foundation: false,
                    json_payloads: false,
                    multivariate_testing: false,
                },
            },
            analysis: {
                statistical_significance: false,
                statistics_engine: 'n/a',
            },
            supported_tests: {
                features: {
                    holdout_testing: 'n/a',
                },
            },
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
            features: {
                rage_clicks: false,
            },
        },
    },
    platform: {
        deployment: {
            eu_hosting: true,
            open_source: false,
            reverse_proxy: false,
            self_host: false,
        },
        pricing: {
            free_tier: true,
            transparent_pricing: false,
            self_serve: true,
            usage_based_pricing: true,
        },
        developer: {
            api: true,
            proxies: false,
            sdks: true,
            sql: false,
            terraform: false,
        },
        tools: {
            cms: '',
            notebooks: false,
            project_management_tools: '',
        },
        integrations: {
            ci_cd_integrations: false,
            community_integrations: true,
            datadog: false,
            email_reports: true,
            google_ads: false,
            imports: true,
            microsoft_teams: false,
            segment: true,
            sentry: false,
            slack: false,
            zapier: true,
            zendesk: false,
        },
        security: {
            cookieless_tracking: false,
            gdpr_ready: true,
            hipaa_ready: true,
            history_audit_logs: true,
            role_based_access_control: true,
            saml_sso: true,
            soc2_certified: true,
            two_factor_auth: true,
            user_privacy_options: true,
        },
    },
    pricing: {
        model: '',
    },
}
