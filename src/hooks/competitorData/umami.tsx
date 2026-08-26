export const umami = {
    name: 'Umami',
    key: 'umami',
    assets: {
        icon: '/images/competitors/umami.svg',
    },
    products: {
        web_analytics: {
            available: true,
            features: {
                bounce_rate: true,
                cookieless_tracking: true,
                custom_channel_types: false,
                entry_exit_paths: true,
                pageviews: true,
                search_tools: false,
                snippet_install: true,
                traffic_breakdown: true,
                utm_tracking: true,
            },
        },
        product_analytics: {
            available: 'Limited',
            features: {
                advertising_analytics: false,
                autocapture: 'Pageviews',
                cohorts: true, // https://docs.umami.is/docs/cohorts
                custom_events: true,
                custom_properties: true, // https://docs.umami.is/docs/track-events
                monetization_analytics: true, // https://docs.umami.is/docs/revenue
                predictive_insights: false,
                real_time_view: true,
                toolbar: false,
                user_profiles: 'Distinct IDs only', // sessions are not merged across devices
                funnels: {
                    available: true, // https://docs.umami.is/docs/funnel
                    features: {
                        conversion_funnels: true,
                        conversion_windows: true,
                        step_ordering: true,
                        any_order: false,
                        correlation_analysis: false,
                    },
                },
                retention: {
                    available: true, // https://docs.umami.is/docs/retention
                    features: {},
                },
                user_paths: {
                    available: true, // https://docs.umami.is/docs/journey
                    features: {},
                },
            },
        },
        session_replay: {
            available: true, // https://docs.umami.is/docs/replays
            features: {
                canvas_recording: false,
                conditional_recording: false,
                privacy_masking: true,
            },
            targeting: {
                features: {
                    target_by_sample: true,
                },
            },
            export: {
                features: {
                    retention_policy: '30 days',
                },
            },
        },
        experiments: {
            available: false,
        },
        feature_flags: {
            available: false,
        },
        error_tracking: {
            available: false,
        },
        heatmaps: {
            available: true, // https://docs.umami.is/docs/heatmaps
            features: {
                clickmaps: true,
                heatmaps: true,
                scrollmaps: true,
                movement_maps: false,
                rage_clicks: false,
                toolbar: false,
            },
        },
    },
    platform: {
        deployment: {
            open_source: true,
            self_host: true,
            eu_hosting: true,
            reverse_proxy: true,
        },
        pricing: {
            free_tier: true,
            self_serve: true,
            transparent_pricing: true,
            usage_based_pricing: true,
        },
        developer: {
            api: true,
            sdks: true,
        },
        integrations: {
            email_reports: true,
            exports: true,
            imports: 'Cloud Pro only', // https://docs.umami.is/docs/cloud/import-data
        },
        security: {
            cookieless_tracking: true,
            gdpr_ready: true,
            hipaa_ready: false,
            soc2_certified: false,
            saml_sso: false,
            two_factor_auth: true, // https://docs.umami.is/docs/two-factor-authentication
        },
    },
    pricing: {
        model: 'Free + cloud subscription',
    },
}
