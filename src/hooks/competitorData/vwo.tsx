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
                    multi_armed_bandit: true,
                    mutually_exclusive_experiments: true,
                    redirect_testing: false,
                },
            },
            targeting: {
                features: {
                    cohort_integration: false,
                    custom_targeting: true,
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
                    multivariate_testing: false,
                },
            },
            analysis: {
                features: {
                    results_visualization: true,
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
            eu_hosting: true,
            open_source: false,
            self_host: false,
        },
        developer: {
            api: false,
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
            usage_based_pricing: false,
            self_serve: false,
            transparent_pricing: false,
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
            history_audit_logs: true,
            role_based_access_control: true,
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
