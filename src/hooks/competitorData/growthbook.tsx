export const growthbook = {
    name: 'GrowthBook',
    key: 'growthbook',
    assets: {
        icon: '/images/competitors/growthbook.svg',
        comparisonArticle: '/blog/posthog-vs-growthbook',
    },
    products: {
        feature_flags: {
            available: true,
            pricing: {
                free_tier: true,
            },
            features: {
                boolean_flags: true,
                multivariate_flags: false,
                json_payloads: true,
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
                    target_by_percentage: true,
                    target_by_person_properties: true,
                    target_by_cohorts: false,
                    geographic_targeting: false,
                    group_targeting: false,
                },
            },
            management: {
                features: {
                    approvals: false,
                    flag_administration: false,
                    flag_scheduling: true,
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
                    experimentation: true,
                    correlation_analysis: false,
                },
            },
            advanced: {
                features: {
                    persist_across_auth: false,
                    early_access_widget: false,
                },
            },
        },
        experiments: {
            available: true,
            pricing: {
                free_tier: true,
            },
            experiment_types: {
                features: {
                    count_value_metrics: false,
                    custom_goals: true,
                    funnel_metrics: false,
                    ratio_metrics: false,
                    secondary_metrics: true,
                    shared_metrics_library: false,
                },
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
                    statistics_engine: 'Bayesian, Frequentist',
                },
            },
            platforms: {
                features: {
                    mobile: false,
                    web: false,
                },
            },
            features: {
                dynamic_cohorts: false,
                experiment_analysis: false,
                namespaces: true,
                native_goal_tracking: false,
                no_code_experiments: false,
                recommended_run_time: false,
                split_testing: true,
                visual_editor: true,
            },
        },
        product_analytics: {
            available: false,
        },
        session_replay: {
            available: false,
        },
        web_analytics: {
            available: false,
        },
        dashboards: {
            available: false,
        },
    },
    platform: {
        deployment: {
            open_source: true,
            self_host: true,
        },
        developer: {
            api: 'Beta',
            local_evaluation: true,
            native_data_sources: false,
            notebooks: false,
            proxies: true,
            sdks: '11',
            sql: true,
        },
        pricing: {
            free_tier: true,
            transparent_pricing: true,
            usage_based_pricing: false,
        },
        integrations: {
            datadog: false,

            exports: false,
            imports: false,
            microsoft_teams: false,
            sentry: false,
            slack: false,
            zapier: false,
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
        analytics_integration: {
            built_in_analytics: false,
        },
    },
    pricing: {
        model: 'Seat-based',
    },
}
