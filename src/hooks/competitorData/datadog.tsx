export const datadog = {
    name: 'Datadog',
    key: 'datadog',
    assets: {
        icon: '/images/competitors/datadog.svg',
    },
    products: {
        replay_vision: {
            // AI summaries, smart chapters, and AI Investigations run over replays, but as
            // fixed jobs – no scanners you point at a recording set with your own prompt.
            available: 'Partial',
            features: {
                point_scanner: false,
                configurable_types: 'Fixed job',
                custom_prompt: false,
                yes_no_monitors: false,
                classify_tag: false,
                friction_score_trained: false,
                friction_score_custom: 'Custom metrics, not AI',
                theme_summary: false,
                nl_search: 'Telemetry only',
                scheduled_runs: 'Fixed job',
                sampling_controls: false,
                deep_link_citations: true,
                mobile_replay_ai: false,
                findings_events: false,
                insights_dashboards: false,
                feed_experiments: false,
                proactive_alerts: false,
                mcp_access: 'RUM events only',
                rest_api: false,
                self_driving: false,
                share_recordings: true,
                embed_recordings: 'Datadog notebooks only',
                export_recordings: 'Segments via API',
                flag_interlinking: true,
                product_analytics_platform: true,
                pii_redaction: true,
                ai_pricing: 'Per 1k sessions',
            },
        },
        error_tracking: {
            available: true,
            features: {
                console_log_capture: true,
                error_alerts: true,
                error_grouping: true,
                exception_capture: true,
                issue_management: true,
                log_management: true,
                mobile_sdk_coverage: true,
                profiling: true,
                source_map_support: true,
                stack_tracing: true,
                user_device_context: true,
            },
            integrations: {
                datadog: false,
                session_replay: true,
            },
            monitoring: {
                features: {
                    distributed_tracing: true,
                    performance_monitoring: true,
                    release_tracking: true,
                },
            },
        },
        product_analytics: {
            available: true,
            features: {
                // RUM's trackUserInteractions collects clicks automatically.
                autocapture: true,
                // Bits AI + Conversion Analysis surface correlated attributes.
                ai_analysis: true,
                user_profiles: true,
                funnels: {
                    available: true,
                },
                // datadogRum.setAccount() stamps account.id onto RUM events (and propagates it
                // to backend traces), with an Account Profiles page and aggregation by account.
                // One account dimension, where PostHog allows up to 5 group types.
                group_analytics: {
                    available: true,
                },
                insights: {
                    features: {
                        sql_editor: true,
                    },
                },
            },
        },
        session_replay: {
            available: true,
            pricing: {
                free_tier: 'Trial',
            },
            features: {
                ai_summaries: true,
            },
            platform_support: {
                features: {
                    mobile_app_recordings: true,
                },
            },
            analysis: {
                features: {
                    network_monitor: true,
                },
            },
            export: {
                features: {
                    retention_policy: '30 days (15 months add-on)',
                },
            },
        },
        logs: {
            available: true,
            core_logging_and_ingestion: {
                features: {
                    centralized_log_ingestion_search: true,
                    live_tail_real_time_logs: true,
                    native_open_telemetry_ingest: 'Partial',
                    vendor_agnostic_sdks: true,
                    high_cardinality_indexing: true,
                    retention: '15 days (Flex to 15 months)',
                },
            },
            search: {
                features: {
                    full_text_search: true,
                    no_proprietary_query_language: 'Partial',
                },
            },
            investigation_workflow: {
                features: {
                    click_to_pivot_investigations: true,
                    logs_scoped_by_investigation_context: true,
                    ai_assisted_log_summaries: true,
                },
            },
            debugging_integrations: {
                features: {
                    built_in_error_tracking: true,
                    built_in_session_replay: true,
                    product_analytics_context: true,
                },
            },
            observability: {
                features: {
                    metrics: true,
                    traces: true,
                    alerting: true,
                    infra_monitoring: true,
                    synthetic_monitoring: true,
                    on_call_incident_management: true,
                    service_map: true,
                    code_level_profiling: true,
                },
            },
            security_and_compliance: {
                features: {
                    siem: 'Add-on',
                    enterprise_scale_compliance: true,
                    security_monitoring: true,
                },
            },
            pricing: {
                features: {
                    ingest_only_pricing: "$0.10 per GB",
                    no_query_compute_fees: false,
                    predictable_at_scale: false,
                },
            },
        },
        surveys: {
            available: false,
        },
        ai_observability: {
            available: true,
        },
        feature_flags: {
            available: true,
        },
        experiments: {
            available: true,
        },
        web_analytics: {
            available: false,
        },
        data_warehouse: {
            available: false,
        },
        cdp: {
            available: false,
        },
    },
    platform: {
        deployment: {
            eu_hosting: true,
            managed_reverse_proxy: false,
            managed_cloud: true,
            open_source: false,
            self_host: false,
        },
        pricing: {
            free_tier: 'Limited',
            self_serve: true,
            transparent_pricing: true,
            usage_based_pricing: true,
            free_team_members: 'Except on-call and incident seats',
            billing_units: 'Hosts, GB, events, sessions, seats',
        },
        developer: {
            api: true,
            mcp_scope: 'Most products, read and write',
            agent_surfaces: 'App, Slack, CLI, editors, mobile',
            collaboration: false,
            mobile_sdks: true,
            native_data_sources: false,
            proxies: false,
            sdks: true,
            server_side_sdks: false,
            sql: true,
        },
        tools: {
            cms: '',
            notebooks: true,
            project_management_tools: '',
            ai_assistant: true,
        },
        integrations: {
            azure_blob: true,
            bigquery: true,
            cdp: false,
            ci_cd_integrations: true,
            community_integrations: true,
            csv_exports: true,
            customer_io: false,
            data_warehouse: true,
            email_reports: true,
            exports: true,
            gcs: true,
            google_ads: false,
            hubspot: true,
            imports: false,
            intercom: true,
            microsoft_teams: true,
            redshift: true,
            rudderstack: false,
            s3: true,
            salesforce: true,
            segment: true,
            sentry: false,
            slack: true,
            snowflake: true,
            stripe: false,
            warehouse_import: false,
            wordpress: false,
            zapier: true,
            zendesk: false,
        },
        security: {
            bot_blocking: false,
            cookieless_tracking: false,
            data_anonymization: true,
            data_retention: true,
            gdpr_ready: true,
            hipaa_ready: true,
            history_audit_logs: true,
            reverse_proxy: false,
            role_based_access_control: true,
            saml_sso: true,
            siem: true,
            soc2_certified: true,
            two_factor_auth: true,
            user_privacy_options: true,
        },
        analytics_integration: {
            built_in_analytics: true,
        },
    },
    pricing: {
        model: 'Usage-based',
    },
}
