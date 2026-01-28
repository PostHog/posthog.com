export const logrocket = {
    name: 'LogRocket',
    key: 'logrocket',
    assets: {
        icon: '/images/competitors/logrocketzd.svg',
        comparisonArticle: '/blog/posthog-vs-logrocket',
    },
    products: {
        product_analytics: {
            available: true,
            features: {
                actions: true,
                advertising_analytics: false,
                autocapture: true,
                cohorts: true,
                custom_events: true,
                custom_properties: true,
                monetization_analytics: false,
                predictive_insights: false,
                real_time_view: false,
                toolbar: false,
                user_profiles: false,
                insights: {
                    available: true,
                    features: {
                        formula_mode: false,
                        ready_made_insight_types: false,
                        sampling: false,
                        sql_editor: false,
                    },
                    alerts: true,
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
                    available: false,
                    features: {},
                },
            },
        },
        web_analytics: {
            available: false,
            features: {
                utm_tracking: true,
            },
        },
        session_replay: {
            available: true,
            pricing: {
                free_tier: true,
            },
            features: {
                canvas_recording: false,
                chat_with_recordings: false,
                clickmaps: false,
                conditional_recording: 'Add-on',
                crash_reports: true,
                event_timeline: true,
                // https://docs.logrocket.com/docs/streaming-data-export
                export_to_json: 'Add-on',
                export_to_video: false,
                filter_by_user_or_event: true,
                identity_detection: true,
                iframe_recording: false,
                minimum_duration: false,
                movement_maps: false,
                notes_on_replays: false,
                playlists: true,
                privacy_masking: true,
                retention_policy: false,
                screenshot_mode: false,
                scrollmaps: false,
                search_by_network: false,
                share_replays: false,
                single_page_app: false,
                target_by_feature_flag: false,
                target_by_sample: false,
                target_by_url: false,
                wireframe_mode: false,
            },
            platform_support: {
                features: {
                    web_app_recordings: true,
                    mobile_app_recordings: true,
                    ios_recordings: false,
                    android_recordings: false,
                    react_native_recordings: false,
                    flutter_recordings: false,
                },
            },
            analysis: {
                features: {
                    heatmaps: false,
                    console_logs: true,
                    performance_monitoring: true,
                    network_monitor: true,
                    dom_explorer: false,
                },
            },
            ai: {
                features: {
                    ai_summaries: true,
                },
            },
        },
        heatmaps: {
            available: true,
            features: {
                clickmaps: true,
                dead_taps: true,
                heatmaps: true,
                rage_clicks: true,
                rage_taps: true,
                scrollmaps: true,
            },
        },
        feature_flags: {
            available: false,
        },
        surveys: {
            available: false,
        },
        experiments: {
            available: false,
        },
        cdp: {
            // They have some integrations, but not at "CDP" levels: https://logrocket.com/products/integrations
            available: false,
        },
        error_tracking: {
            available: true,
            features: {
                code_context: true,
                error_alerts: true,
                error_grouping: true,
                console_log_capture: true,
                exception_capture: true,
                issue_management: true,
                log_management: true,
                mobile_sdk_coverage: true,
                profiling: false,
                stack_tracing: true,
                user_device_context: true,
            },
            monitoring: {
                features: {
                    cron_monitoring: false,
                    distributed_tracing: false,
                    release_tracking: true,
                    performance_monitoring: true,
                },
            },
            integrations: {
                session_replay: true,
                product_analytics: true,
            },
        },
        dashboards: {
            available: true,
        },
    },
    platform: {
        deployment: {
            eu_hosting: true,
            open_source: false,
            self_host: false,
            reverse_proxy: true,
        },
        libraries: {
            // https://docs.logrocket.com/reference/getting-started-with-sdks
            features: {
                android: true,
                flutter: false,
                ios: true,
                node: false,
                python: false,
                javascript: true,
                react_native: true,
                react: true,
                ruby: false,
            },
        },
        pricing: {
            free_tier: true,
            self_serve: true,
            transparent_pricing: false,
            usage_based_pricing: true,
        },
        // https://docs.logrocket.com/docs/streaming-data-export
        // https://docs.logrocket.com/docs/integrations
        integrations: {
            airbyte: false,
            azure_blob: false,
            bigquery: true,
            community_integrations: false,
            customer_io: false,
            datadog: false,
            exports: true,
            gcs: true,
            google_ads: false,
            hubspot: false,
            imports: true,
            intercom: true,
            microsoft_teams: false,
            redshift: true,
            rudderstack: false,
            s3: false,
            salesforce: true,
            segment: true,
            slack: false,
            snowflake: true,
            sentry: true,
            stripe: false,
            zapier: false,
            zendesk: false,
        },
        developer: {
            features: {
                cross_domain_tracking: true,
            },
        },
        tools: {
            cms: '',
            notebooks: false,
            project_management_tools: '',
        },
        security: {
            cookieless_tracking: false,
            data_anonymization: true,
            gdpr_ready: true,
            hipaa_ready: true,
            history_audit_logs: false,
            role_based_access_control: true,
            saml_sso: true,
            soc2_certified: true,
            two_factor_auth: true,
            user_privacy_options: true,
        },
    },
    pricing: {
        model: 'Usage-based',
    },
}
