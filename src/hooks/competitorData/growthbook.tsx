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
                    bootstrapping: false,
                    api_access: true,
                    sdk_support: true,
                },
            },
            targeting: {
                features: {
                    target_by_percentage: true,
                    target_by_person_properties: true,
                    target_by_cohorts: false,
                    geographic_targeting: true,
                    group_targeting: true,
                },
            },
            management: {
                features: {
                    approvals: 'Enterprise',
                    data_source: 'Third-party',
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
                },
            },
        },
        experiments: {
            available: true,
            pricing: {
                free_tier: true,
            },
            features: {
                count_value_metrics: false,
                custom_goals: true,
                dynamic_cohorts: false,
                experiment_analysis: false,
                funnel_metrics: true,
                funnel_tests: false,
                namespacing: true,
                native_goal_tracking: false,
                no_code_experiments: 'Pro',
                ratio_metrics: true,
                recommended_run_time: false,
                secondary_metrics: true,
                shared_metrics_library: true,
                split_testing: true,
                visual_editor: true,
            },
            supported_tests: {
                features: {
                    aa_testing: true,
                    ab_testing: true,
                    abn_testing: true,
                    data_warehouse_experiments: true,
                    fake_door_testing: false,
                    holdout_testing: true,
                    multi_armed_bandit: 'Pro',
                    mutually_exclusive_experiments: true,
                    redirect_testing: true,
                },
            },
            targeting: {
                features: {
                    cohort_integration: false,
                    exclusion_rules: false,
                    geographic_targeting: true,
                    group_level_experiments: false,
                    holdouts: false,
                    target_by_percentage: true,
                },
            },
            implementation: {
                features: {
                    api_access: true,
                    feature_flag_foundation: true,
                    json_payloads: true,
                    multivariate_testing: true,
                },
            },
            analysis: {
                features: {
                    llm_support: false,
                    results_visualization: true,
                    side_effect_monitoring: true,
                    statistical_significance: true,
                    statistics_engine: 'Bayesian or Frequentist',
                },
            },
            platforms: {
                features: {
                    mobile: true,
                    web: true,
                },
            },
        },
        product_analytics: {
            available: false,
            features: {
                autocapture: false,
                cohorts: true,
            },
            insights: {
                features: {
                    alerts: false,
                    sql_editor: 'Partial',
                },
            },
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
        surveys: {
            available: false,
        },
        cdp: {
            features: {
                realtime_streaming: false,
            },
        },
        data_warehouse: {
            features: {
                batch_exports: false,
                warehouse_sources: true,
            },
        },
    },
    platform: {
        deployment: {
            eu_hosting: 'Self-hosted',
            open_source: true,
            reverse_proxy: true,
            self_host: true,
        },
        developer: {
            api: true,
            native_data_sources: false,
            sdks: '20+',
            sql: true,
        },
        tools: {
            cms: '',
            notebooks: false,
            project_management_tools: '',
        },
        pricing: {
            free_tier: true,
            transparent_pricing: true,
            usage_based_pricing: false,
            self_serve: true,
        },
        integrations: {
            datadog: true,
            exports: false,
            imports: true,
            microsoft_teams: true,
            sentry: true,
            slack: true,
            zapier: true,
        },
        security: {
            gdpr_ready: true,
            hipaa_ready: true,
            history_audit_logs: 'Enterprise',
            role_based_access_control: true,
            saml_sso: 'Enterprise',
            soc2_certified: true,
            two_factor_auth: false,
            user_privacy_options: true,
        },
        analytics_integration: {
            built_in_analytics: false,
        },
    },
    pricing: {
        model: 'Seat-based',
    },
}
