export const pendo = {
    name: 'Pendo',
    key: 'pendo',
    assets: {
        icon: '/images/competitors/pendo.svg',
        comparisonArticle: '/blog/posthog-vs-pendo',
    },
    products: {
        product_analytics: {
            available: true,
            features: {
                actions: false,
                advertising_analytics: false,
                ai_analysis: true,
                autocapture: 'Limited',
                cohorts: true,
                custom_events: true,
                custom_properties: true,
                monetization_analytics: false,
                predictive_insights: false,
                real_time_view: false,
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
            available: true,
            features: {
                rage_clicks: true,
                scrollmaps: false,
            },
        },
        web_analytics: {
            available: true,
            features: {
                utm_tracking: true,
            },
        },
        dashboards: {
            available: true,
        },
        session_replay: {
            available: true,
            pricing: {
                free_tier: 'None',
            },
            features: {
                event_timeline: true,
            },
            platform_support: {
                features: {
                    web_app_recordings: true,
                    mobile_app_recordings: true,
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
            targeting: {
                features: {
                    custom_targeting: true,
                },
            },
            branching: {
                features: {
                    multi_step_surveys: true,
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
            eu_hosting: 'Enterprise only',
            open_source: false,
            reverse_proxy: true,
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
            free_tier: true,
            transparent_pricing: false,
            usage_based_pricing: false,
            model: 'Seat-based',
            self_serve: true,
        },
        integrations: {
            airbyte: false,
            azure_blob: false,
            bigquery: true,
            ci_cd_integrations: false,
            community_integrations: true,
            customer_io: false,
            datadog: false,
            discord: false,
            exports: true,
            gcs: true,
            google_ads: false,
            hubspot: true,
            imports: true,
            intercom: true,
            microsoft_teams: true,
            redshift: true,
            rudderstack: false,
            s3: true,
            salesforce: true,
            segment: true,
            sentry: false,
            shopify: false,
            slack: true,
            snowflake: true,
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
        analytics_integration: {
            built_in_analytics: true,
        },
        developer: {
            api: true,
            cross_domain_tracking: true,
            proxies: false,
            mobile_sdks: true,
            sdks: true,
            server_side_sdks: true,
            sql: false,
            terraform: false,
        },
        tools: {
            cms: '',
            notebooks: false,
            project_management_tools: '',
        },
    },
}
