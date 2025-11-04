export const flagsmith = {
    name: 'Flagsmith',
    key: 'flagsmith',
    assets: {
        icon: '/images/competitors/flagsmith.svg',
    },
    products: {
        feature_flags: {
            available: true,
            pricing: {
                free_tier: true,
            },
            features: {
                boolean_flags: false,
                multivariate_flags: true,
                json_payloads: true,
                release_conditions: false,
                early_access_management: false,
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
            available: true,
            features: {
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
            notebooks: false,
            proxies: false,
            api: false,
            sql: false,
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
            user_privacy_options: false,
            history_audit_logs: false,
            gdpr_ready: false,
            hipaa_ready: false,
            soc2_certified: false,
            two_factor_auth: false,
            saml_sso: false,
        },
        analytics_integration: {
            built_in_analytics: false,
        },
    },
    pricing: {
        model: 'Usage-based',
    },
}
