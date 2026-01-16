export const kameleoon = {
    name: 'Kameleoon',
    key: 'kameleoon',
    assets: {
        icon: '/images/competitors/kameleoon.svg',
    },
    products: {
        feature_flags: {
            available: true,
            implementation: {
                features: {
                    local_evaluation: true,
                },
            },
            management: {
                features: {
                    flag_scheduling: true,
                    multi_environment: true,
                },
            },
        },
        experiments: {
            available: true,
            features: {
                funnel_tests: false,
                no_code_experiments: true,
                secondary_metrics: true,
            },
            supported_tests: {
                multi_armed_bandit: true,
                mutually_exclusive_experiments: false,
            },
        },
        product_analytics: {
            available: false,
            features: {
                autocapture: false,
            },
            insights: {
                features: {
                    alerts: true,
                    sql_editor: false,
                },
            },
        },
        session_replay: {
            available: false,
        },
        surveys: {
            available: true,
        },
    },
    platform: {
        deployment: {
            eu_hosting: true,
            open_source: false,
        },
        pricing: {
            self_serve: false,
            transparent_pricing: false,
        },
        developer: {
            api: true,
        },
        tools: {
            cms: false,
            notebooks: false,
            project_management_tools: false,
        },
        security: {
            history_audit_logs: true,
            role_based_access_control: true,
        },
    },
    pricing: {
        model: 'Quote-based',
    },
}
