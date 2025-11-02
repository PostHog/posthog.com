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
                    target_by_percentage: false,
                    target_by_person_properties: false,
                    target_by_cohorts: false,
                    geographic_targeting: false,
                    group_targeting: false,
                },
            },
            management: {
                features: {
                    approvals: true,
                    flag_administration: false,
                    flag_scheduling: 'Enterprise',
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
                funnel_metrics: false,
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
        product_analytics: {
            available: true,
            features: {
                advertising_analytics: false,
                autocapture: false,
                cohorts: false,
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
            available: false,
        },
        surveys: {
            available: false,
        },
        cdp: {
            available: true,
        },
        data_warehouse: {
            available: false,
        },
    },
    platform: {
        deployment: {
            open_source: 'Partial',
            self_host: false,
        },
        developer: {
            api: 'Pro',
            native_data_sources: false,
            notebooks: false,
            proxies: true,
            sdks: true,
            sql: false,
        },
        pricing: {
            free_tier: false,
            transparent_pricing: false,
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
            saml_sso: true,
            soc2_certified: true,
            two_factor_auth: true,
            user_privacy_options: true,
        },
        analytics_integration: {
            built_in_analytics: true,
        },
    },
    pricing: {
        model: 'Seat-based + usage',
    },
}
