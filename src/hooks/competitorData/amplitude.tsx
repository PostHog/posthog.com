export const amplitude = {
    name: 'Amplitude',
    key: 'amplitude',
    assets: {
        icon: '/images/competitors/amplitude.svg',
        comparisonArticle: '/blog/posthog-vs-amplitude',
    },
    products: {
        product_analytics: {
            available: true,
            pricing: {
                free_tier: '10k monthly tracked users',
            },
            features: {
                advertising_analytics: true,
                autocapture: true,
                cohorts: true,
                custom_events: true,
                custom_properties: true,
                monetization_analytics: true,
                predictive_insights: true,
                real_time_view: true,
                toolbar: false,
                user_profiles: true,
                insights: {
                    available: true,
                    features: {
                        ai_insight_builder: true,
                        formula_mode: 'Plus plan or higher',
                        ready_made_insight_types: true,
                        sampling: false,
                        sql_editor: 'Add-on',
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
                    available: true,
                    features: {},
                },
                group_analytics: {
                    available: 'Paid add-on',
                    features: {},
                },
            },
        },
        dashboards: {
            available: true,
            features: {
                annotations: true,
                dashboard_level_permissions: true,
                dashboard_tags: true,
                embed_dashboards: true,
                pinned_dashboards: true,
                private_insights: true,
                project_level_permissions: true,
                share_dashboards_externally: true,
                subscribe_to_dashboards: true,
                user_level_permissions: true,
            },
        },
        web_analytics: {
            available: true,
            features: {
                search_tools: false,
            },
        },
        session_replay: {
            available: true,
            pricing: {
                free_tier: '1,000 recordings',
            },
            features: {
                canvas_recording: false,
                chat_with_recordings: false,
                clickmaps: false,
                conditional_recording: false,
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
                retention_policy: true,
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
                    console_logs: true,
                    performance_monitoring: false,
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
            available: true,
            pricing: {
                free_tier: '50k tracked users',
            },
            features: {
                boolean_flags: true,
                early_access_management: false,
                multivariate_flags: true,
                json_payloads: true,
                release_conditions: true,
            },
            implementation: {
                features: {
                    local_evaluation: true,
                    bootstrapping: true,
                    api_access: true,
                    sdk_support: true,
                },
            },
            targeting: {
                features: {
                    target_by_percentage: true,
                    target_by_person_properties: true,
                    target_by_cohorts: true,
                    geographic_targeting: true,
                    group_targeting: false,
                },
            },
            management: {
                features: {
                    approvals: true,
                    flag_administration: true,
                    flag_scheduling: true,
                    history_activity: true,
                    instant_rollbacks: true,
                    multi_environment: false,
                    permissioning: true,
                },
            },
            testing: {
                features: {
                    flag_overrides: false,
                    toolbar_integration: false,
                    user_assignment: true,
                },
            },
            experimentation: {
                features: {
                    experimentation: true,
                    correlation_analysis: false,
                },
            },
            advanced: {
                features: {
                    persist_across_auth: false,
                },
            },
        },
        experiments: {
            available: true,
            pricing: {
                free_tier: 'None',
            },
            features: {
                count_value_metrics: true,
                custom_goals: true,
                dynamic_cohorts: true,
                experiment_analysis: true,
                funnel_metrics: true,
                namespacing: false,
                native_goal_tracking: false,
                no_code_experiments: false,
                ratio_metrics: false,
                recommended_run_time: false,
                secondary_metrics: true,
                shared_metrics_library: false,
                split_testing: false,
                visual_editor: true,
            },
            supported_tests: {
                features: {
                    aa_testing: true,
                    ab_testing: true,
                    abn_testing: true,
                    data_warehouse_experiments: false,
                    fake_door_testing: true,
                    holdout_testing: true,
                    multi_armed_bandit: 'Enterprise',
                    mutually_exclusive_experiments: true,
                    redirect_testing: true,
                },
            },
            targeting: {
                features: {
                    cohort_integration: true,
                    custom_targeting: true,
                    exclusion_rules: false,
                    geographic_targeting: true,
                    group_level_experiments: false,
                    holdouts: true,
                    target_by_percentage: true,
                },
            },
            implementation: {
                features: {
                    api_access: true,
                    feature_flag_foundation: true,
                    json_payloads: false,
                    multivariate_testing: true,
                },
            },
            analysis: {
                features: {
                    llm_support: false,
                    results_visualization: true,
                    side_effect_monitoring: true,
                    statistical_significance: true,
                    statistics_engine: 'Frequentist default, Bayesian available',
                },
            },
            platforms: {
                features: {
                    mobile: true,
                    web: true,
                },
            },
        },
        cdp: {
            available: true,
            features: {
                realtime_streaming: true,
            },
        },
        data_warehouse: {
            available: true,
            features: {
                batch_exports: true,
                warehouse_sources: true,
            },
        },
        heatmaps: {
            available: true,
            features: {
                rage_clicks: true,
            },
        },
        surveys: {
            available: true,
            pricing: {
                free_tier: 'Paid only',
            },
            features: {
                aggregated_results: false,
                api_access: true,
                automatic_nps_calculation: false,
                calendar_invites: false,
                capture_partial_responses: false,
                cdp_destinations: false,
                completion_conditions: false,
                conditional_logic: true,
                csat_surveys: false,
                custom_html: true,
                custom_targeting: true,
                custom_ui: true,
                customizable_wait_periods: false,
                embedded_links: false,
                emoji_reaction: true,
                event_triggered: true,
                feedback_button: true,
                freeform_text: true,
                hosted_surveys: true,
                iframe_embedding: true,
                link_to_webpage: true,
                multi_select: true,
                multi_step_surveys: true,
                multiple_choice: true,
                no_code: true,
                nps_surveys: true,
                pmf_surveys: false,
                popover: true,
                rating: true,
                sdk_support: true,
                slack_integration: true,
                survey_templates: true,
                user_interview_requests: false,
            },
            targeting: {
                features: {
                    display_conditions: true,
                },
            },
        },
        revenue_analytics: {
            available: true,
            features: {
                revenue_tracking: true,
                event_based_revenue_tracking: true,
                native_multi_source_revenue_tracking: true,
                deferred_revenue: false,
                product_analytics_integration: true,
                multi_currency_support: false,
                revenue_prediction: false,
                sql_access: 'Add-on',
            },
        },
        product_tours: {
            available: true,
        },
        error_tracking: {
            available: false,
        },
        llm_analytics: {
            available: false,
        },
    },
    platform: {
        deployment: {
            eu_hosting: true,
            open_source: false,
            self_host: false,
        },
        pricing: {
            free_tier: true,
            self_serve: 'Starter, Plus plans only',
            transparent_pricing: true,
            usage_based_pricing: true,
        },
        integrations: {
            ci_cd_integrations: false,
            community_integrations: false,
            datadog: false,
            exports: true,
            google_ads: true,
            imports: true,
            microsoft_teams: true,
            segment: true,
            sentry: false,
            slack: true,
            zapier: false,
            zendesk: false,
        },
        security: {
            gdpr_ready: true,
            hipaa_ready: true,
            history_audit_logs: true,
            role_based_access_control: true,
            saml_sso: 'Growth and Enterprise',
            soc2_certified: true,
            two_factor_auth: true,
            user_privacy_options: true,
        },
        developer: {
            api: true,
            mobile_sdks: true,
            proxies: false,
            sdks: true,
            sql: true,
            terraform: false,
        },
        tools: {
            cms: '',
            notebooks: true,
            project_management_tools: '',
        },
    },
    pricing: {
        model: 'Usage-based + taxes',
    },
}
