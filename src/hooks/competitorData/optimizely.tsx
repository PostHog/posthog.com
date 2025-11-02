export const optimizely = {
    name: 'Optimizely',
    key: 'optimizely',
    assets: {
        icon: '/images/competitors/optimizely.svg',
        comparisonArticle: '/blog/posthog-vs-optimizely',
    },
    products: {
        experiments: {
            available: true,
            pricing: {
                free_tier: false,
            },
            features: {
                count_value_metrics: false,
                custom_goals: true,
                dynamic_cohorts: false,
                experiment_analysis: false,
                funnel_metrics: true,
                namespacing: false,
                native_goal_tracking: false,
                no_code_experiments: true,
                ratio_metrics: false,
                recommended_run_time: false,
                secondary_metrics: true,
                shared_metrics_library: false,
                split_testing: false,
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
                    percentage_rollouts: false,
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
                    results_visualization: false,
                    side_effect_monitoring: false,
                    statistical_significance: true,
                    statistics_engine: false,
                },
            },
            platforms: {
                features: {
                    mobile: false,
                    web: false,
                },
            },
        },
        feature_flags: {
            available: true,
            pricing: {
                free_tier: false,
            },
            features: {
                boolean_flags: true,
                early_access_management: false,
                multivariate_flags: false,
                json_payloads: false,
                release_conditions: false,
            },
            implementation: {
                features: {
                    local_evaluation: false,
                    bootstrapping: false,
                    api_access: false,
                    sdk_support: false,
                },
            },
            targeting: {
                features: {
                    target_by_percentage: false,
                    target_by_person_properties: false,
                    target_by_cohorts: false,
                    geographic_targeting: false,
                    group_targeting: false,
                },
            },
            management: {
                features: {
                    approvals: false,
                    flag_administration: false,
                    flag_scheduling: false,
                    history_activity: false,
                    instant_rollbacks: false,
                    multi_environment: true,
                    permissioning: true,
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
        product_analytics: {
            available: false,
        },
        web_analytics: {
            available: true,
        },
        session_replay: {
            available: false,
        },
        surveys: {
            available: false,
        },
    },
    platform: {
        deployment: {
            open_source: false,
            self_host: false,
        },
        developer: {
            api: true,
            native_data_sources: false,
            notebooks: false,
            proxies: false,
            sdks: '14',
            sql: false,
        },
        pricing: {
            free_tier: false,
            transparent_pricing: false,
            usage_based_pricing: true,
        },
        integrations: {
            datadog: false,

            exports: true,
            imports: false,
            microsoft_teams: true,
            sentry: false,
            slack: true,
            zapier: false,
        },
        security: {
            gdpr_ready: true,
            hipaa_ready: false,
            history_audit_logs: false,
            saml_sso: true,
            soc2_certified: false,
            two_factor_auth: true,
            user_privacy_options: false,
        },
        analytics_integration: {
            built_in_analytics: false,
        },
    },
    pricing: {
        model: 'Sales-driven',
    },
}
