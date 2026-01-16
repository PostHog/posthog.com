export const featureFlagsFeatures = {
    summary: {
        name: 'Feature Flags',
        description: 'Control feature access with precision and safely roll out changes',
        url: '/feature-flags',
        docsUrl: '/docs/feature-flags',
    },
    pricing: {
        free_tier: {
            name: 'Monthly free tier',
        },
    },
    features: {
        automation: {
            name: 'Automation',
            description: 'Trigger flag states based on schedules, triggers',
        },
        boolean_flags: {
            name: 'Boolean flags',
            description: 'Simple on/off flags to enable or disable features',
        },
        early_access_management: {
            name: 'Early access feature opt-in widget',
            description: 'Allow users to opt in or out of specified features with a built-in widget or custom UI',
        },
        json_payloads: {
            name: 'Payloads',
            description:
                'Pass structured data (strings, numbers, or JSON objects) to variants for dynamic configuration without code changes',
        },
        multivariate_flags: {
            name: 'Multivariate flags',
            description: 'Test multiple variants of a feature in a single flag',
        },
        release_conditions: {
            name: 'Release conditions',
            description: 'Target flags by user properties, cohorts, geographic location, or traffic percentage',
        },
        remote_config: {
            name: 'Remote config',
            description: 'Replace hard-coded values in your app with remotely configurable parameters',
        },
        single_page_app_support: {
            name: 'Single-page app support',
            description: 'Use app frameworks like React and Vue',
        },
        usage_logs: {
            name: 'Flag usage logs',
            description: 'Track how many times a feature flag has been called',
        },
    },
    implementation: {
        description: 'Integrate flags efficiently across platforms',
        features: {
            api_access: {
                name: 'API access',
                description: 'Evaluate flags programmatically using PostHog API',
            },
            bootstrapping: {
                name: 'Bootstrapping',
                description: 'Make flags available immediately on page load without waiting for API response',
            },
            local_evaluation: {
                name: 'Local evaluation',
                description: 'Cache flag values for faster evaluation and reduced API calls',
            },
            sdk_support: {
                name: 'SDK support',
                description: 'Full support across all major SDKs including JavaScript, Python, Ruby, and more',
            },
        },
    },
    targeting: {
        description: 'Precisely target who sees each feature',
        features: {
            target_by_percentage: {
                name: 'Percentage-based rollouts',
                description: 'Roll out features gradually to a percentage of users',
            },
            target_by_person_properties: {
                name: 'Custom targeting',
                description: 'Target features based on user properties and attributes',
            },
            target_by_cohorts: {
                name: 'Target by cohorts',
                description: 'Target features to specific user segments or behavioral cohorts',
            },
            geographic_targeting: {
                name: 'Geographic targeting',
                description: 'Limit flags to specific countries or regions based on IP address',
            },
            group_targeting: {
                name: 'Group-level targeting',
                description: 'Run flags at the organization, account, or team level for B2B products',
            },
        },
    },
    management: {
        description: 'Operate flags safely at scale',
        features: {
            approvals: {
                name: 'Flag approvals',
                description: 'Require approvals to change flags',
            },
            data_source: {
                name: 'Data source',
                description: 'Main source of data used by flags and A/B tests',
            },
            flag_administration: {
                name: 'Flag administration',
                description: 'Control who can modify flags with user roles and permissions',
            },
            flag_scheduling: {
                name: 'Flag scheduling',
                description: 'Schedule flags to turn on or off automatically at specified times',
            },
            history_activity: {
                name: 'History and activity feed',
                description: "See who hit a feature flag, the flag's value, and which page they were on",
            },
            instant_rollbacks: {
                name: 'Instant rollbacks',
                description: 'Disable a feature without touching your codebase',
            },
            lifecycle: {
                name: 'Lifecycle management',
                description: 'Display new and old flags',
            },
            multi_environment: {
                name: 'Multi-environment support',
                description: 'Use the same flag key across PostHog projects for local development or staging',
            },
            permissioning: {
                name: 'Flag permissioning',
                description: 'Control who can edit and modify flags',
            },
            triggers: {
                name: 'Triggers',
                description: 'Trigger changes based on metrics',
            },
        },
    },
    testing: {
        description: 'Tools for validating and debugging flags',
        features: {
            flag_overrides: {
                name: 'Flag overrides',
                description: 'Override flag values locally for development and testing',
            },
            toolbar_integration: {
                name: 'Toolbar integration',
                description: 'Toggle flags directly from the PostHog toolbar while browsing your site',
            },
            user_assignment: {
                name: 'User assignment',
                description: 'Assign specific flag values to test users for manual testing',
            },
        },
    },
    experimentation: {
        description: 'Use flags to power experiments and measure impact',
        features: {
            experimentation: {
                name: 'Experimentation',
                description: 'Run A/B tests with feature flags integrated with experiments',
            },
            correlation_analysis: {
                name: 'Integration with analytics',
                description: 'View replays attached to a flag, analyze data based on a flag, and measure impact',
            },
        },
    },
    advanced: {
        description: 'Additional capabilities for robust rollouts',
        features: {
            persist_across_auth: {
                name: 'Persist across authentication',
                description:
                    "Persist feature flags across authentication events so flag values don't change when users log in",
            },
            automated_reports: {
                name: 'Automated usage reports',
                description: 'Get automated reports on flag usage and performance',
            },
            ip_resolution: {
                name: 'IP address resolution',
                description: 'Automatic IP address resolution for location-based targeting',
            },
        },
    },
}
