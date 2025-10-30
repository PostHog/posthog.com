export const platformFeatures = {
    deployment: {
        description: 'Options for how and where you deploy PostHog',
        features: {
            open_source: {
                name: 'Open-source',
                description: 'Fully open-source codebase',
            },
            self_host: {
                name: 'Self-host option',
                description: 'Deploy and run on your own infrastructure',
            },
        },
    },
    pricing: {
        description: 'Pricing model and transparency',
        features: {
            usage_based_pricing: {
                name: 'Usage-based pricing',
                description: 'Only pay for what you use',
            },
            transparent_pricing: {
                name: 'Transparent pricing',
                description: 'Clear, upfront pricing with no hidden fees',
            },
            free_tier: {
                name: 'Free tier',
                description: 'Generous free tier available',
            },
        },
    },
    support: {
        description: 'Support and services',
        features: {},
    },
    integrations: {
        description: 'Integrations with other tools and workflows',
        features: {
            imports: {
                name: 'Data imports',
                description: 'Import data from data warehouses and other sources',
            },
            exports: {
                name: 'Data exports',
                description: 'Export data to data warehouses and other destinations',
            },
            segment: {
                name: 'Segment integration',
                description: 'Send events via Segment',
            },
            zapier: {
                name: 'Zapier integration',
                description: 'Trigger Zapier automations',
            },
            sentry: {
                name: 'Sentry integration',
                description: 'Connect to Sentry data',
            },
            zendesk: {
                name: 'Zendesk integration',
                description: 'Two-way integration for customer support',
            },
            slack: {
                name: 'Slack integration',
                description: 'Alerts and notifications for Slack',
            },
            microsoft_teams: {
                name: 'Microsoft Teams integration',
                description: 'Alerts and notifications for Microsoft Teams',
            },
            community_integrations: {
                name: 'Community integrations',
                description: 'Build your own integration',
            },
            google_ads: {
                name: 'Google Ads integration',
                description: 'Import ROI data from Google Ads',
            },
            ci_cd_integrations: {
                name: 'CI/CD integrations',
                description: 'Connect with development tools and workflows',
            },
        },
    },
    analytics_integration: {
        description: 'Analytics features available platform-wide',
        features: {
            built_in_analytics: {
                name: 'Built-in product analytics',
                description: 'Combine error tracking with product analytics data',
            },
        },
    },
    security: {
        description: 'Security and compliance features',
        features: {
            user_privacy_options: {
                name: 'User privacy options',
                description: 'Anonymize users, drop personal data',
            },
            history_audit_logs: {
                name: 'History and audit logs',
                description: 'Manage and view edits and related users',
            },
            gdpr_ready: {
                name: 'GDPR-ready',
                description: 'Can be compliant with GDPR',
            },
            hipaa_ready: {
                name: 'HIPAA-ready',
                description: 'Can be compliant with HIPAA',
            },
            soc2_certified: {
                name: 'SOC 2 Type II',
                description: 'SOC 2 security certification',
            },
            two_factor_auth: {
                name: '2FA',
                description: 'Enforce login with two-factor authentication',
            },
            saml_sso: {
                name: 'SAML/SSO',
                description: 'Use SAML or single sign-on authentication',
            },
        },
    },
}
