export const launchdarkly = {
    name: 'LaunchDarkly',
    key: 'launchdarkly',
    assets: {
        icon: '/images/competitors/launchdarkly.svg',
        comparisonArticle: '/blog/posthog-vs-launchdarkly',
    },
    products: {
        feature_flags: {
            available: true,
            pricing: {
                free_tier: false,
            },
            features: {
                automation: true,
                boolean_flags: true,
                early_access_management: false,
                multivariate_flags: true,
                json_payloads: true,
                release_conditions: false,
            },
            implementation: {
                features: {
                    local_evaluation: true,
                    bootstrapping: true,
                    api_access: false,
                    sdk_support: false,
                },
            },
            targeting: {
                features: {
                    custom_targeting: false,
                    target_by_percentage: true,
                    target_by_person_properties: true,
                    target_by_cohorts: false,
                    geographic_targeting: false,
                    group_targeting: false,
                },
            },
            management: {
                features: {
                    approvals: true,
                    data_source: 'First-party',
                    flag_administration: false,
                    flag_scheduling: 'Enterprise',
                    history_activity: false,
                    instant_rollbacks: false,
                    lifecycle: 'Enterprise',
                    multi_environment: true,
                    permissioning: true,
                    triggers: 'Enterprise',
                },
            },
            testing: {
                features: {
                    flag_overrides: false,
                    toolbar_integration: false,
                    user_assignment: false,
                },
            },
            experimentation: {
                features: {
                    experimentation: false,
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
                free_tier: 'None, paid add-on',
            },
            features: {
                count_value_metrics: false,
                custom_goals: true,
                dynamic_cohorts: false,
                experiment_analysis: false,
                funnel_metrics: false,
                funnel_tests: true,
                namespacing: false,
                native_goal_tracking: false,
                no_code_experiments: false,
                ratio_metrics: false,
                recommended_run_time: false,
                secondary_metrics: true,
                shared_metrics_library: false,
                split_testing: true,
                visual_editor: false,
            },
            supported_tests: {
                features: {
                    aa_testing: false,
                    ab_testing: false,
                    abn_testing: false,
                    data_warehouse_experiments: false,
                    fake_door_testing: false,
                    holdout_testing: false,
                    multi_armed_bandit: false,
                    mutually_exclusive_experiments: false,
                    redirect_testing: false,
                },
            },
            targeting: {
                features: {
                    cohort_integration: false,
                    exclusion_rules: false,
                    geographic_targeting: false,
                    group_level_experiments: false,
                    holdouts: false,
                    target_by_percentage: false,
                },
            },
            implementation: {
                features: {
                    api_access: false,
                    feature_flag_foundation: false,
                    json_payloads: false,
                    multivariate_testing: true,
                },
            },
            analysis: {
                features: {
                    llm_support: true,
                    results_visualization: false,
                    side_effect_monitoring: false,
                    statistical_significance: true,
                    statistics_engine: 'Bayesian, Frequentist',
                },
            },
            platforms: {
                features: {
                    mobile: false,
                    web: false,
                },
            },
        },
        product_analytics: {
            available: 'Requires third-party data warehouse',
            features: {
                advertising_analytics: false,
                autocapture: false,
                cohorts: true,
                custom_events: true,
                custom_properties: false,
                monetization_analytics: false,
                predictive_insights: false,
                real_time_view: false,
                toolbar: false,
                user_profiles: false,
                insights: {
                    available: false,
                    features: {
                        alerts: true,
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
                    available: false,
                    features: {},
                },
                retention: {
                    available: false,
                    features: {},
                },
                user_paths: {
                    available: false,
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
        session_replay: {
            available: true,
        },
        surveys: {
            available: false,
        },
        cdp: {
            available: true,
            features: {
                realtime_streaming: 'Enterprise',
            },
        },
        data_warehouse: {
            available: false,
            features: {
                batch_exports: false,
                warehouse_sources: true,
            },
        },
        heatmaps: {
            available: false,
        },
    },
    platform: {
        deployment: {
            eu_hosting: true,
            open_source: 'Partial',
            reverse_proxy: true,
            self_host: false,
        },
        developer: {
            api: 'Pro',
            native_data_sources: false,
            sdks: true,
            sql: false,
        },
        tools: {
            cms: true,
            notebooks: false,
            project_management_tools: true,
        },
        pricing: {
            free_tier: false,
            transparent_pricing: true,
            self_serve: false,
            usage_based_pricing: true,
        },
        integrations: {
            datadog: true,

            exports: 'Enterprise',
            imports: true,
            microsoft_teams: true,
            sentry: true,
            slack: true,
            zapier: true,
        },
        security: {
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
        model: 'Seat-based + usage',
    },
}
