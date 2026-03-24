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
                experiment_analysis: true,
                funnel_metrics: true,
                funnel_tests: true,
                namespacing: false,
                native_goal_tracking: false,
                no_code_experiments: true,
                low_code_experiments: true,
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
                    multi_armed_bandit: true,
                    mutually_exclusive_experiments: false,
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
                    json_payloads: true,
                    multivariate_testing: true,
                },
            },
            analysis: {
                features: {
                    llm_support: false,
                    results_visualization: false,
                    side_effect_monitoring: false,
                    statistical_significance: true,
                    statistics_engine: 'Frequentist with sequential testing',
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
                remote_config: true,
                single_page_app_support: true,
                usage_logs: true,
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
                    geographic_targeting: false,
                    group_targeting: false,
                    target_by_cohorts: true,
                    target_by_percentage: true,
                    target_by_person_properties: true,
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
            features: {
                autocapture: false,
            },
            insights: {
                sql_editor: false,
            },
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
        heatmaps: {
            available: false,
        },
        data_warehouse: {
            features: {
                warehouse_sources: false,
                batch_exports: false,
            },
        },
        cdp: {
            available: true,
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
            client_side_sdks: true,
            mobile_sdks: true,
            native_data_sources: false,
            proxies: false,
            sdks: '14',
            server_side_sdks: true,
            sql: false,
            tv_sdks: true,
        },
        tools: {
            cms: true,
            notebooks: false,
            project_management_tools: true,
        },
        pricing: {
            free_tier: false,
            transparent_pricing: false,
            usage_based_pricing: false,
            self_serve: false,
        },
        integrations: {
            bigquery: true,
            datadog: false,
            exports: true,
            google_analytics: true,
            imports: false,
            microsoft_teams: true,
            sentry: false,
            s3: true,
            salesforce: 'Add-on',
            segment: true,
            slack: true,
            snowflake: true,
            zapier: false,
        },
        security: {
            cookieless_tracking: false,
            dpa: true,
            gdpr_ready: true,
            hipaa_ready: false,
            history_audit_logs: true,
            role_based_access_control: true,
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
