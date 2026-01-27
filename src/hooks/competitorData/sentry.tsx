export const sentry = {
    name: 'Sentry',
    key: 'sentry',
    assets: {
        icon: '/images/competitors/sentry.svg',
        comparisonArticle: '/blog/posthog-vs-sentry',
    },
    products: {
        error_tracking: {
            available: true,
            pricing: {
                free_tier: '5k',
            },
            features: {
                code_context: true,
                error_alerts: true,
                error_grouping: true,
                console_log_capture: true,
                exception_capture: true,
                issue_management: true,
                log_management: true,
                mobile_sdk_coverage: true,
                profiling: true,
                stack_tracing: true,
                user_device_context: true,
            },
            monitoring: {
                features: {
                    cron_monitoring: true,
                    distributed_tracing: true,
                    release_tracking: true,
                    performance_monitoring: true,
                },
            },
            integrations: {
                session_replay: true,
                product_analytics: false,
            },
        },
        llm_analytics: {
            available: true,
        },
        session_replay: {
            available: true,
            pricing: {
                free_tier: '50 recordings',
            },
            features: {
                canvas_recording: true,
                chat_with_recordings: false,
                conditional_recording: true,
                event_timeline: true,
                export_to_json: false,
                export_to_video: false,
                filter_by_user_or_event: true,
                identity_detection: true,
                iframe_recording: true,
                minimum_duration: true,
                movement_maps: false,
                notes_on_replays: false,
                playlists: false,
                privacy_masking: true,
                retention_policy: 'Plan-dependent',
                screenshot_mode: false,
                search_by_network: true,
                share_replays: true,
                single_page_app: true,
                target_by_feature_flag: false,
                target_by_sample: true,
                target_by_url: true,
                wireframe_mode: false,
            },
            platform_support: {
                features: {
                    web_app_recordings: true,
                    mobile_app_recordings: true,
                    ios_recordings: true,
                    android_recordings: true,
                    react_native_recordings: true,
                    flutter_recordings: true,
                },
            },
            analysis: {
                features: {
                    console_logs: true,
                    performance_monitoring: true,
                    network_monitor: true,
                    dom_explorer: true,
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
                clickmaps: false,
                heatmaps: false,
                rage_clicks: true,
                scrollmaps: false,
            },
        },
        surveys: {
            available: 'Feedback only',
            pricing: {
                free_tier: 'Included',
            },
            features: {
                capture_partial_responses: '',
            },
            question_types: {
                features: {
                    freeform_text: true,
                    rating: false,
                    multiple_choice: false,
                },
            },
            branching: {
                features: {
                    multi_step_surveys: false,
                },
            },
            presentation: {
                features: {
                    custom_ui: 'Limited customization',
                },
            },
            templates: {
                features: {
                    survey_templates: false,
                },
            },
            targeting: {
                features: {
                    custom_targeting: false,
                    event_triggered: false,
                },
            },
            implementation: {
                features: {
                    api_access: true,
                },
            },
        },
        product_analytics: {
            available: 'Partial',
            features: {
                advertising_analytics: false,
                alerts: true,
                autocapture: 'Errors only',
                cohorts: false,
                custom_events: true,
                custom_properties: false,
                monetization_analytics: false,
                predictive_insights: false,
                real_time_view: false,
                toolbar: false,
                user_profiles: false,
                insights: {
                    available: false,
                    features: {
                        formula_mode: false,
                        ready_made_insight_types: false,
                        sampling: false,
                        sql_editor: false,
                    },
                },
                trends: {
                    available: 'Trends only',
                    features: {},
                },
                funnels: {
                    available: false,
                    features: {},
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
            },
        },
        web_analytics: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
        experiments: {
            available: false,
        },
        dashboards: {
            available: true,
            features: {},
        },
        data_warehouse: {
            available: false,
            features: {
                batch_exports: false,
                warehouse_sources: false,
            },
        },
        cdp: {
            available: false,
            features: {
                realtime_streaming: '',
            },
        },
    },
    platform: {
        deployment: {
            eu_hosting: true,
            managed_reverse_proxy: false,
            open_source: 'Eventually',
            self_host: true,
        },
        pricing: {
            free_tier: 'Limited',
            transparent_pricing: true,
            usage_based_pricing: true,
            self_serve: true,
        },
        developer: {
            api: true,
            collaboration: true,
            mobile_sdks: true,
            native_data_sources: false,
            proxies: false,
            sdks: '100+',
            server_side_sdks: true,
            sql: false,
        },
        tools: {
            cms: true,
            notebooks: false,
            project_management_tools: true,
        },
        integrations: {
            azure_blob: false,
            bigquery: false,
            cdp: true,
            ci_cd_integrations: true,
            community_integrations: true,
            csv_exports: false,
            customer_io: false,
            data_warehouse: false,
            datadog: true,
            email_reports: true,
            exports: false,
            gcs: false,
            google_ads: false,
            hubspot: false,
            imports: false,
            intercom: false,
            microsoft_teams: true,
            project_management: true,
            postgres: false,
            redshift: false,
            rudderstack: false,
            s3: false,
            salesforce: false,
            segment: true,
            sentry: true,
            slack: true,
            snowflake: false,
            stripe: false,
            warehouse_import: false,
            wordpress: false,
            zapier: true,
            zendesk: false,
        },
        security: {
            bot_blocking: false,
            cookieless_tracking: false,
            data_anonymization: false,
            data_retention: false,
            gdpr_ready: true,
            hipaa_ready: true,
            history_audit_logs: true,
            reverse_proxy: false,
            role_based_access_control: true,
            saml_sso: true,
            soc2_certified: true,
            two_factor_auth: true,
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
