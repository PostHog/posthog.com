export const plausible = {
    name: 'Plausible',
    key: 'plausible',
    assets: {
        icon: '/images/competitors/plausible.svg',
        comparisonArticle: '/blog/posthog-vs-plausible',
    },
    products: {
        web_analytics: {
            available: true,
            features: {
                advertising_analytics: false,
                bounce_rate_tracking: true,
                bounce_rate: true,
                breakdown_by_device_and_browser: true,
                breakdown_by_geoip: true,
                clickmaps: false,
                conversions: true,
                cookieless_tracking: true,
                custom_channel_types: false,
                entry_exit_paths: true,
                first_party_cookies: false,
                heatmaps: false,
                hipaa_compliance: false,
                integration_with_feature_flags: false,
                integration_with_session_replay: false,
                integration_with_surveys: false,
                migration: true,
                movement_maps: false,
                open_source: true,
                outbound_clicks: true,
                pageviews: true,
                pre_configured_dashboards: true,
                real_time_reporting: true,
                revenue_tracking: false,
                search_tools: 'Keywords',
                script_size: '<1 kB',
                session_and_duration_tracking: true,
                sessions: true,
                snippet_install: true,
                traffic_breakdown: true,
                utm_tracking: true,
                visitor_and_view_tracking: true,
                web_vitals_reporting: false,
                web_vitals: false,
            },
        },
        product_analytics: {
            available: false,
            features: {
                advertising_analytics: false,
                autocapture: 'Pageviews',
                cohorts: false,
                custom_events: true,
                custom_properties: 'Events only',
                monetization_analytics: false,
                predictive_insights: false,
                real_time_view: true,
                toolbar: false,
                user_profiles: false,
                trends: {
                    available: false,
                    features: {},
                },
                funnels: {
                    available: 'Business plan only',
                    features: {
                        correlation_analysis: false,
                        conversion_funnels: true,
                    },
                },
                retention: {
                    available: false,
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
                insights: {
                    available: false,
                    features: {
                        ai_insight_builder: false,
                        formula_mode: false,
                        ready_made_insight_types: false,
                        sampling: false,
                        sql_editor: false,
                    },
                },
            },
        },
        dashboards: {
            available: true,
            features: {
                custom_dashboards: false,
            },
        },
        cdp: {
            features: {
                realtime_streaming: '',
            },
        },
        data_warehouse: {
            available: false,
            features: {
                batch_exports: false,
                warehouse_sources: false,
            },
        },
        heatmaps: {
            available: false,
        },
        session_replay: {
            available: false,
        },
        experiments: {
            available: false,
        },
        surveys: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
        logs: {
            available: false,
        },
        workflows: {
            available: false,
        },
    },
    platform: {
        analytics_integration: {
            built_in_analytics: false,
        },
        deployment: {
            eu_hosting: true,
            open_source: true,
            reverse_proxy: true,
            self_host: true,
        },
        developer: {
            api: 'Partial',
            mobile_sdks: false,
            server_side_sdks: false,
            sql: false,
        },
        tools: {
            cms: '',
            notebooks: false,
            project_management_tools: '',
        },
        integrations: {
            csv_exports: true,
            datadog: false,
            exports: true,
            email_reports: true,
            google_search_console: true,
            hubspot: false,
            sentry: false,
            slack: 'Reports, anomalies',
            stripe: false,
            warehouse_import: false,
            zapier: false,
            zendesk: false,
        },
        pricing: {
            free_tier: false,
            self_serve: 'Trial only',
            transparent_pricing: true,
            usage_based_pricing: true,
        },
        security: {
            bot_blocking: true,
            cookieless_tracking: true,
            data_anonymization: true,
            data_retention: '3 years',
            gdpr_ready: true,
            hipaa_ready: false,
            reverse_proxy: true,
            saml_sso: 'Enterprise',
            soc2_certified: false,
            two_factor_auth: true,
        },
    },
    pricing: {
        model: 'Usage-based subscription',
    },
}
