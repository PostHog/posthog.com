import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory'

export const hotjar = {
    name: 'Hotjar',
    key: 'hotjar',
    assets: {
        icon: '/images/competitors/hotjar.svg',
        comparisonArticle: '/blog/posthog-vs-hotjar',
    },
    products: {
        product_analytics: {
            available: false,
            features: {
                advertising_analytics: false,
                ai_analysis: false,
                autocapture: false,
                cohorts: false,
                custom_events: true,
                custom_properties: true,
                conversion_funnels: true,
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
        product_tours: {
            available: true,
        },
        session_replay: {
            available: true,
            pricing: {
                free_tier: '35/day',
            },
            features: {
                canvas_recording: false,
                chat_with_recordings: false,
                clickmaps: false,
                conditional_recording: false,
                event_timeline: true,
                crash_reports: false,
                export_to_json: true,
                export_to_video: false,
                filter_by_user_or_event: false,
                highlights: true,
                identity_detection: false,
                iframe_recording: false,
                minimum_duration: false,
                movement_maps: false,
                notes_on_replays: false,
                playlists: false,
                privacy_masking: false,
                retention_policy: false,
                screenshot_mode: false,
                scrollmaps: false,
                search_by_network: false,
                sentiment_scores: true,
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
                    mobile_app_recordings: false,
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
                    performance_monitoring: false,
                    network_monitor: false,
                    dom_explorer: false,
                },
            },
            ai: {
                features: {
                    ai_summaries: false,
                },
            },
        },
        heatmaps: {
            available: true,
            features: {
                heatmaps: true,
                clickmaps: true,
                scrollmaps: true,
                rage_clicks: true,
                save_heatmaps: true,
                toolbar: false,
            },
        },
        surveys: {
            available: true,
            features: {
                api_access: false,
                csat_surveys: true,
                custom_html: '',
                feedback_button: true,
                multiple_choice: true,
                nps_surveys: true,
                pmf_surveys: '',
                popover: true,
                sentiment_analysis: true,
                survey_templates: true,
                user_interview_requests: true,
                webhooks: true,
            },
            presentation: {
                features: {
                    popover: true,
                    feedback_button: true,
                    hosted_surveys: true,
                },
            },
            platforms: {
                features: {
                    web: true,
                    mobile: false,
                },
            },
            targeting: {
                features: {
                    display_conditions: true,
                    event_triggered: true,
                    linked_feature_flag: false,
                    custom_targeting: true,
                },
            },
            branching: {
                features: {
                    multi_step_surveys: true,
                },
            },
            question_types: {
                features: {
                    multiple_choice: true,
                    multi_select: true,
                    rating: true,
                    emoji_reaction: true,
                    embedded_links: true,
                    freeform_text: true,
                    interview_scheduling: true,
                },
            },
        },
        feature_flags: {
            available: false,
        },
        experiments: {
            available: false,
        },
        data_warehouse: {
            available: false,
        },
        error_tracking: {
            available: false,
            features: {
                issue_management: false,
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
        },
        pricing: {
            free_tier: true,
            self_serve: true,
            transparent_pricing: true,
            usage_based_pricing: false,
        },
        integrations: {
            azure_blob: false,
            bigquery: false,
            community_integrations: false,
            customer_io: false,
            csv_exports: true,
            datadog: false,
            discord: false,
            exports: true,
            gcs: false,
            google_ads: false,
            hubspot: false,
            imports: false,
            intercom: true,
            microsoft_teams: true,
            redshift: false,
            postgres: false,
            s3: false,
            salesforce: true,
            segment: true,
            slack: true,
            snowflake: false,
            sentry: false,
            stripe: false,
            zapier: true,
            zendesk: false,
        },
        developer: {},
        tools: {
            cms: '',
            notebooks: false,
            project_management_tools: '',
        },
        security: {
            ccpa_ready: true,
            cookieless_tracking: false,
            data_anonymization: true,
            gdpr_ready: true,
            hipaa_ready: true,
            history_audit_logs: false,
            saml_sso: false,
            soc2_certified: false,
            two_factor_auth: false,
            user_privacy_options: true,
        },
    },
    pricing: {
        model: 'Tiered subscription',
    },
}
