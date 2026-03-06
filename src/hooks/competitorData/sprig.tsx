export const sprig = {
    name: 'Sprig',
    key: 'sprig',
    assets: {
        icon: '/images/competitors/sprig.svg',
    },
    products: {
        product_analytics: {
            available: false,
            features: {
                ai_analysis: true,
            },
            funnels: {
                available: false,
                features: {
                    conversion_funnels: false,
                },
            },
            user_paths: {
                available: false,
            },
        },
        web_analytics: {
            available: false,
            features: {
                cookieless_tracking: true,
            },
        },
        session_replay: {
            available: true,
            pricing: {
                free_tier: '50 clips/mo',
            },
            features: {
                event_timeline: true,
            },
            platform_support: {
                features: {
                    web_app_recordings: true,
                    mobile_app_recordings: 'No Flutter',
                },
            },
            analysis: {
                features: {
                    console_logs: false,
                    network_monitor: false,
                },
            },
        },
        heatmaps: {
            available: true,
            features: {
                rage_clicks: false,
                scrollmaps: true,
            },
        },
        surveys: {
            available: true,
            features: {
                hosted_surveys: true,
                mobile_surveys: true,
                customizable_pop_ups: true,
                live_previews: true,
                multi_step_surveys: true,
                api_access: true,
                single_choice_questions: true,
                multiple_choice_questions: true,
                open_text_questions: true,
                rating_questions: true,
                nps_questions: true,
                csat_questions: true,
                target_by_url: true,
                target_by_cohort: true,
                target_by_person_property: true,
                user_targeting: true,
                user_filtering: true,
                feedback_button: true,
                integrations: true,
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
            platforms: {
                features: {
                    web: true,
                    mobile: 'No Flutter',
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
        },
    },
    platform: {
        deployment: {
            eu_hosting: false,
            managed_reverse_proxy: false,
            open_source: false,
            self_host: false,
        },
        pricing: {
            free_tier: true,
            transparent_pricing: false,
            usage_based_pricing: true,
        },
        developer: {
            api: true,
            collaboration: false,
            mobile_sdks: true,
            native_data_sources: false,
            proxies: false,
            sdks: true,
            server_side_sdks: false,
            sql: false,
        },
        tools: {
            cms: '',
            notebooks: false,
            project_management_tools: '',
        },
        integrations: {
            azure_blob: false,
            bigquery: true,
            cdp: false,
            ci_cd_integrations: false,
            community_integrations: false,
            csv_exports: false,
            customer_io: false,
            data_warehouse: false,
            datadog: false,
            email_reports: false,
            exports: false,
            gcs: false,
            google_ads: false,
            hubspot: false,
            imports: false,
            intercom: false,
            microsoft_teams: false,
            redshift: false,
            rudderstack: false,
            s3: false,
            salesforce: false,
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
            cookieless_tracking: true,
            data_anonymization: true,
            data_retention: false,
            gdpr_ready: true,
            hipaa_ready: true,
            history_audit_logs: true,
            reverse_proxy: false,
            saml_sso: true,
            soc2_certified: true,
            two_factor_auth: false,
            user_privacy_options: true,
        },
        analytics_integration: {
            built_in_analytics: false,
        },
    },
    pricing: {
        model: 'Bundle-based',
    },
}
