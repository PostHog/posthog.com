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
                multivariate_flags: false,
                json_payloads: true,
                release_conditions: false,
            },
            implementation: {
                features: {
                    local_evaluation: true,
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
                funnel_metrics: false,
                funnel_tests: false,
                namespacing: true,
                native_goal_tracking: false,
                no_code_experiments: 'Pro',
                ratio_metrics: false,
                recommended_run_time: false,
                secondary_metrics: true,
                shared_metrics_library: false,
                split_testing: true,
                visual_editor: true,
            },
            supported_tests: {
                features: {
                    aa_testing: false,
                    ab_testing: false,
                    abn_testing: false,
                    data_warehouse_experiments: false,
                    fake_door_testing: false,
                    holdout_testing: false,
                    multi_armed_bandit: 'Pro',
                    mutually_exclusive_experiments: true,
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
                    llm_support: false,
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
            sdks: '11',
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
            microsoft_teams: false,
            sentry: false,
            slack: true,
            zapier: false,
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
