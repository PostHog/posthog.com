export const dataflare = {
    name: 'Dataflare',
    key: 'dataflare',
    assets: {
        icon: '/images/competitors/dataflare.svg',
        comparisonArticle: '/compare/posthog-vs-dataflare',
    },
    products: {
        web_analytics: {
            available: true,
            features: {
                bounce_rate: true,
                // Event-based goals: mark an event as a conversion. URL goals are on the roadmap.
                conversions: 'Event goals',
                cookieless_tracking: true,
                entry_exit_paths: true,
                // $click carries an `outbound` property; no dedicated report is documented.
                outbound_clicks: 'As an event property',
                pageviews: true,
                sessions: true,
                snippet_install: true,
                traffic_breakdown: true,
                utm_tracking: true,
                web_vitals: true,
                // SDK docs and README say "about 4 KB gzipped"; the homepage says 4.5 KB.
                script_size: '~4 KB gzipped',
            },
        },
        product_analytics: {
            available: true,
            pricing: {
                free_tier: 'No fee; you pay Cloudflare for usage',
            },
            features: {
                // Roadmap: "threshold and anomaly alerts on any insight"
                alerts: false,
                // $pageview, $pageleave, $click (links and buttons), $exception, $web_vitals
                autocapture: 'Pageviews, link and button clicks',
                // Cohort filters work in queries; saved cohorts are on the roadmap.
                cohorts: 'As query filters',
                custom_events: true,
                custom_properties: true,
                user_profiles: true,
                trends: {
                    available: true,
                    features: {},
                },
                funnels: {
                    available: true,
                    features: {
                        conversion_funnels: true,
                    },
                },
                retention: {
                    available: true,
                    features: {},
                },
                // Roadmap: "Paths, stickiness and lifecycle insights"
                user_paths: {
                    available: false,
                },
                lifecycle: {
                    available: false,
                },
                stickiness: {
                    available: false,
                },
                // No group method in the SDK and no account-level analytics in docs or roadmap.
                group_analytics: {
                    available: false,
                },
                insights: {
                    available: true,
                    features: {
                        alerts: false,
                        sql_editor: 'Read-only SQL',
                    },
                },
            },
        },
        session_replay: {
            available: true,
            pricing: {
                free_tier: 'No fee; recordings stored in your R2 bucket',
            },
            features: {
                // The recorder sets recordCanvas: false.
                canvas_recording: false,
                // Off by default. Sampled, error-triggered (onErrorSampleRate), or started from code.
                conditional_recording: 'On error, or from code',
                // Inputs are always masked; maskAllText and block selectors are opt-in.
                privacy_masking: true,
                // summarise_replay returns a text transcript for the user's own agent.
                ai_summaries: 'Text transcript for your agent',
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
                    // warn and error by default; every level with console: true
                    console_logs: true,
                    // Method, URL, status, and timing of fetch and XHR calls; never headers or bodies.
                    network_monitor: true,
                    heatmaps: false,
                },
            },
            ai: {
                features: {
                    ai_summaries: 'Text transcript for your agent',
                    // No built-in scanner; an agent can read transcripts through the MCP server.
                    replay_vision: 'Via your own agent',
                },
            },
            targeting: {
                features: {
                    target_by_sample: true,
                },
            },
            privacy: {
                features: {
                    privacy_masking: true,
                },
            },
            export: {
                features: {
                    // GLASS_REPLAY_RETENTION_DAYS
                    retention_policy: '30 days by default, configurable',
                },
            },
        },
        feature_flags: {
            available: true,
            pricing: {
                free_tier: 'No fee; evaluated in your Worker',
            },
            features: {
                boolean_flags: true,
                multivariate_flags: true,
                // glass.flag() returns "on", a variant key, or null. No payloads documented.
                json_payloads: false,
                release_conditions: true,
                single_page_app_support: true,
            },
            implementation: {
                features: {
                    api_access: true,
                    sdk_support: 'Browser SDK only',
                },
            },
            targeting: {
                features: {
                    target_by_percentage: true,
                    target_by_person_properties: true,
                    // Rule conditions are person.*, country, device, browser, and os.
                    target_by_cohorts: false,
                    geographic_targeting: 'Country',
                    group_targeting: false,
                },
            },
        },
        experiments: {
            available: true,
            pricing: {
                free_tier: 'No fee; runs in your Worker',
            },
            features: {
                // "An experiment is a multivariate flag plus a goal event"
                custom_goals: 'One goal event',
                split_testing: true,
            },
            supported_tests: {
                features: {
                    ab_testing: true,
                },
            },
            analysis: {
                features: {
                    // Winner declared at >= 95% probability to beat control, with an SRM check.
                    statistical_significance: true,
                    // Beta-binomial for conversion rates; Welch's t-test for value metrics.
                    statistics_engine: 'Bayesian',
                },
            },
            platforms: {
                features: {
                    web: true,
                    mobile: false,
                },
            },
        },
        // Dataflare's own comparison page lists these as things PostHog has and it doesn't:
        // surveys, a data warehouse, error tracking, LLM analytics, and a CDP.
        surveys: {
            available: false,
        },
        error_tracking: {
            available: false,
            features: {
                // Uncaught errors and unhandled rejections are captured as $exception events.
                exception_capture: true,
                mobile_sdk_coverage: false,
            },
        },
        ai_observability: {
            available: false,
        },
        data_warehouse: {
            available: false,
        },
        cdp: {
            available: false,
        },
        // Not in the docs, README, roadmap, or the dashboard's page list.
        logs: {
            available: false,
        },
        heatmaps: {
            available: false,
        },
    },
    platform: {
        deployment: {
            open_source: true,
            self_host: true,
            // `init --eu` creates the D1 database and R2 buckets in Cloudflare's EU jurisdiction.
            // The Worker itself runs on Cloudflare's global network.
            eu_hosting: 'Optional EU storage',
            // `--route` serves the script and endpoints from your own domain.
            reverse_proxy: 'First-party route option',
        },
        pricing: {
            free_tier: true,
            self_serve: true,
            transparent_pricing: true,
            usage_based_pricing: 'Cloudflare usage only',
            billing_units: 'Cloudflare requests, rows, storage',
        },
        developer: {
            api: true,
            sdks: '1 (browser)',
            client_side_sdks: true,
            // Server events go to the Worker with a plain POST to /e.
            server_side_sdks: 'HTTP endpoint only',
            mobile_sdks: false,
            sql: 'Read-only',
            // The MCP server runs on the user's own Worker; a read-only key is available.
            mcp_scope: 'Analytics, replays, flags, experiments',
            agent_surfaces: 'MCP, CLI, HTTP API',
            // Dashboard sign-in is an API key; there are no user accounts.
            collaboration: 'Shared API keys',
        },
        security: {
            bot_blocking: true,
            cookieless_tracking: true,
            data_anonymization: 'IP addresses never stored',
            // Events are kept until GLASS_RETENTION_DAYS is set.
            data_retention: 'You choose',
            // No vendor to certify or sign a DPA; compliance is the deployer's to own.
            gdpr_ready: 'Self-managed',
            role_based_access_control: 'Admin and read-only keys',
            // Sign-in is an API key, so there are no accounts to put SSO or 2FA on.
            // Cloudflare Access support is on the roadmap.
            saml_sso: false,
            two_factor_auth: false,
            // An open-source project with no company behind it; nothing to certify.
            soc2_certified: false,
            user_privacy_options: 'Cookieless mode, consent API, person deletion',
        },
    },
    pricing: {
        model: 'Free and open source; you pay Cloudflare',
    },
}
