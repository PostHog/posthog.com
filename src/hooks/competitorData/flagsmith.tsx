export const flagsmith = {
    name: 'Flagsmith',
    key: 'flagsmith',
    assets: {
        icon: '/images/competitors/flagsmith.svg',
    },
    products: {
        product_analytics: {
            available: false,
            features: {
                cohorts: true,
            },
        },
        feature_flags: {
            available: true,
            pricing: {
                free_tier: true,
            },
            features: {
                automation: true,
                boolean_flags: false,
                early_access_management: false,
                json_payloads: true,
                multivariate_flags: true,
                release_conditions: false,
                remote_config: true,
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
                    approvals: true,
                    data_source: 'Third-party',
                    flag_administration: false,
                    flag_scheduling: true,
                    history_activity: false,
                    instant_rollbacks: false,
                    multi_environment: false,
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
            available: 'Requires third-party analytics',
            features: {
                funnel_tests: false,
                llm_support: false,
                multivariate: false,
                statistics_engine: 'Bayesian, Frequentist',
            },
            analysis: {
                features: {
                    llm_support: false,
                    statistics_engine: 'Bayesian',
                },
            },
            supported_tests: {
                multi_armed_bandit: false,
            },
        },
        data_warehouse: {
            features: {
                warehouse_sources: false,
                batch_exports: false,
            },
        },
    },
    platform: {
        deployment: {
            eu_hosting: true,
            open_source: 'Open core',
            self_host: true,
        },
        pricing: {
            usage_based_pricing: true,
            self_serve: true,
            transparent_pricing: true,
            free_tier: true,
        },
        developer: {
            sdks: false,
            native_data_sources: false,
            proxies: false,
            api: false,
            sql: false,
        },
        tools: {
            cms: '',
            notebooks: false,
            project_management_tools: '',
        },
        integrations: {
            datadog: false,

            imports: false,
            exports: false,
            slack: false,
            microsoft_teams: false,
            zapier: false,
            sentry: false,
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
        model: 'Usage-based',
    },
}
