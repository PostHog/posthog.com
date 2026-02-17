export const whatfix = {
    name: 'Whatfix',
    key: 'whatfix',
    assets: {
        icon: '/images/competitors/whatfix.svg',
        comparisonArticle: '',
    },
    products: {
        product_analytics: {
            available: true,
            features: {
                actions: false,
                advertising_analytics: false,
                autocapture: true,
                cohorts: true,
                custom_events: true,
                custom_properties: true,
                monetization_analytics: false,
                predictive_insights: false,
                real_time_view: true,
                toolbar: false,
                user_profiles: true,
                insights: {
                    available: true,
                    features: {
                        formula_mode: false,
                        ready_made_insight_types: true,
                        sampling: false,
                        sql_editor: false,
                    },
                    alerts: false,
                },
                trends: {
                    available: true,
                    features: {},
                },
                funnels: {
                    available: true,
                    features: {
                        correlation_analysis: false,
                    },
                },
                retention: {
                    available: true,
                    features: {},
                },
                user_paths: {
                    available: true,
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
                    available: true,
                    features: {},
                },
            },
        },
        product_tours: {
            available: true,
        },
        heatmaps: {
            available: false,
            features: {
                rage_clicks: false,
                scrollmaps: false,
            },
        },
        web_analytics: {
            available: false,
            features: {
                utm_tracking: false,
            },
        },
        dashboards: {
            available: true,
        },
        session_replay: {
            available: false,
            pricing: {
                free_tier: 'None',
            },
            features: {
                event_timeline: false,
            },
            platform_support: {
                features: {
                    web_app_recordings: false,
                    mobile_app_recordings: false,
                },
            },
            analysis: {
                features: {
                    console_logs: false,
                    network_monitor: false,
                    performance_monitoring: false,
                },
            },
        },
        surveys: {
            available: true,
            features: {
                in_app_prompts_messages: true,
                feedback_button: true,
            },
            platforms: {
                features: {
                    web: true,
                    mobile: true,
                },
            },
        },
        feature_flags: {
            available: false,
        },
        experiments: {
            available: false,
        },
        error_tracking: {
            available: false,
            features: {
                issue_management: false,
            },
        },
    },
    platform: {
        deployment: {
            eu_hosting: true,
            open_source: false,
            reverse_proxy: false,
            self_host: false,
        },
        libraries: {
            features: {
                android: true,
                flutter: true,
                ios: true,
                javascript: true,
                react: true,
                react_native: true,
                ruby: false,
            },
        },
        pricing: {
            free_tier: false,
            transparent_pricing: false,
            usage_based_pricing: false,
            model: 'Contact sales',
            self_serve: false,
        },
        integrations: {
            airbyte: false,
            azure_blob: false,
            bigquery: false,
            ci_cd_integrations: false,
            community_integrations: false,
            customer_io: false,
            datadog: false,
            discord: false,
            exports: true,
            gcs: false,
            google_ads: false,
            hubspot: true,
            imports: true,
            intercom: true,
            microsoft_teams: false,
            redshift: false,
            rudderstack: false,
            s3: false,
            salesforce: true,
            segment: false,
            sentry: false,
            shopify: false,
            slack: true,
            snowflake: false,
            stripe: false,
            zapier: true,
            zendesk: true,
        },
        security: {
            cookieless_tracking: false,
            data_anonymization: true,
            gdpr_ready: true,
            hipaa_ready: true,
            history_audit_logs: false,
            saml_sso: true,
            soc2_certified: true,
            two_factor_auth: true,
            user_privacy_options: true,
        },
        developer: {
            api: true,
            cross_domain_tracking: false,
            proxies: false,
            mobile_sdks: true,
            sdks: true,
            server_side_sdks: false,
            sql: false,
        },
        tools: {
            cms: '',
            notebooks: false,
            project_management_tools: '',
        },
    },
}
