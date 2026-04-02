export const vwo = {
    name: 'VWO',
    key: 'vwo',
    assets: {
        icon: '/images/competitors/vwo.svg',
    },
    products: {
        product_analytics: {
            available: false,
            features: {
                autocapture: false,
            },
            insights: {
                features: {
                    alerts: false,
                    sql_editor: false,
                },
            },
        },
        session_replay: {
            available: true,
        },
        heatmaps: {
            available: true,
        },
        surveys: {
            available: true,
        },
        error_tracking: {
            available: false,
        },
        feature_flags: {
            available: true,
            features: {
                automation: true,
            },
            management: {
                data_source: 'First-party',
                flag_scheduling: true,
                multi_environment: true,
            },
            implementation: {
                local_evaluation: true,
            },
        },
        experiments: {
            available: true,
            pricing: {
                free_tier: false,
            },
            features: {
                count_value_metrics: true,
                custom_goals: true,
                dynamic_cohorts: false,
                experiment_analysis: true,
                funnel_metrics: false,
                funnel_tests: true,
                namespacing: false,
                native_goal_tracking: false,
                no_code_experiments: true,
                ratio_metrics: false,
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
                    data_warehouse_experiments: false,
                    fake_door_testing: false,
                    holdout_testing: false,
                    multi_armed_bandit: true,
                    mutually_exclusive_experiments: true,
                    redirect_testing: true,
                },
            },
            targeting: {
                features: {
                    cohort_integration: false,
                    custom_targeting: true,
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
                    json_payloads: false,
                    multivariate_testing: true,
                },
            },
            analysis: {
                features: {
                    results_visualization: true,
                    side_effect_monitoring: false,
                    statistical_significance: true,
                    statistics_engine: 'Bayesian',
                },
            },
            platforms: {
                features: {
                    mobile: true,
                    web: true,
                },
            },
        },
    },
    platform: {
        deployment: {
            eu_hosting: true,
            open_source: false,
            self_host: false,
        },
        developer: {
            api: true,
            native_data_sources: false,
            proxies: false,
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
            usage_based_pricing: true,
            self_serve: false,
            transparent_pricing: false,
        },
        integrations: {
            datadog: false,
            exports: true,
            imports: false,
            microsoft_teams: false,
            sentry: false,
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
        analytics_integration: {
            built_in_analytics: false,
        },
    },
    pricing: {
        model: 'Tier-based',
    },
}
