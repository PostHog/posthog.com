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
                free_tier: true,
            },
            features: {
                automation: true,
                boolean_flags: true,
                early_access_management: true,
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
                    custom_targeting: true,
                    target_by_percentage: true,
                    target_by_person_properties: true,
                    target_by_cohorts: true,
                    geographic_targeting: true,
                    group_targeting: true,
                },
            },
            management: {
                features: {
                    approvals: 'Enterprise',
                    data_source: 'First-party',
                    flag_administration: 'Enterprise',
                    flag_scheduling: 'Enterprise',
                    history_activity: true,
                    instant_rollbacks: true,
                    lifecycle: 'Enterprise',
                    multi_environment: true,
                    permissioning: true,
                    triggers: 'Enterprise',
                },
            },
            testing: {
                features: {
                    flag_overrides: false,
                    toolbar_integration: true,
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
                free_tier: '100k MAU',
            },
            features: {
                count_value_metrics: true,
                custom_goals: true,
                dynamic_cohorts: false,
                experiment_analysis: true,
                funnel_metrics: true,
                funnel_tests: true,
                namespacing: false,
                native_goal_tracking: true,
                no_code_experiments: false,
                ratio_metrics: false,
                recommended_run_time: false,
                secondary_metrics: true,
                shared_metrics_library: true,
                split_testing: true,
                visual_editor: false,
            },
            supported_tests: {
                features: {
                    aa_testing: true,
                    ab_testing: true,
                    abn_testing: true,
                    data_warehouse_experiments: true,
                    fake_door_testing: false,
                    holdout_testing: true,
                    multi_armed_bandit: true,
                    mutually_exclusive_experiments: true,
                    redirect_testing: false,
                },
            },
            targeting: {
                features: {
                    cohort_integration: true,
                    custom_targeting: true,
                    exclusion_rules: false,
                    geographic_targeting: true,
                    group_level_experiments: true,
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
                    llm_support: true,
                    results_visualization: true,
                    side_effect_monitoring: true,
                    statistical_significance: true,
                    statistics_engine: 'Bayesian, Frequentist',
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
            available: true,
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
                    available: true,
                    features: {},
                },
                retention: {
                    available: true,
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
            available: true,
        },
        error_tracking: {
            available: true, // https://launchdarkly.com/docs/home/observability/errors
        },
        logs: {
            available: true, // https://launchdarkly.com/docs/home/observability/logs
        },
    },
    platform: {
        deployment: {
            eu_hosting: true,
            open_source: false,
            reverse_proxy: true,
            self_host: false,
        },
        developer: {
            api: true,
            native_data_sources: true,
            sdks: true,
            sql: false,
        },
        tools: {
            cms: true,
            notebooks: false,
            project_management_tools: true,
        },
        pricing: {
            free_tier: true,
            transparent_pricing: true,
            self_serve: true,
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
        model: 'Usage-based',
    },
}
