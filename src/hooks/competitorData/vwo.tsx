export const vwo = {
    name: 'VWO',
    key: 'vwo',
    assets: {
        icon: '/images/competitors/vwo.svg',
    },
    products: {
        experiments: {
            available: true,
            pricing: {
                free_tier: false,
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
                    multivariate_testing: false,
                },
            },
            analysis: {
                features: {
                    results_visualization: false,
                    side_effect_monitoring: false,
                    statistical_significance: false,
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
    },
    platform: {
        deployment: {
            open_source: false,
            self_host: false,
        },
        developer: {
            api: false,
            native_data_sources: false,
            notebooks: false,
            proxies: false,
            sdks: false,
            sql: false,
        },
        pricing: {
            free_tier: false,
            transparent_pricing: false,
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
        model: 'Tier-based',
    },
}
