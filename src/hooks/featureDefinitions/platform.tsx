export const platformFeatures = {
    deployment: {
        description: 'Options for how and where you deploy PostHog',
        features: {
            eu_hosting: {
                name: 'EU hosting',
                description: 'Access and store your data in the EU',
            },
            open_source: {
                name: 'Open-source',
                description: 'Fully open-source codebase',
            },
            self_host: {
                name: 'Self-host option',
                description: 'Deploy and run on your own infrastructure',
            },
            managed_reverse_proxy: {
                name: 'Managed reverse proxy',
                description: 'Send events from your own domain, managed by us',
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
            redshift: {
                name: 'Amazon Redshift',
                description: 'Export data to Redshift',
            },
            s3: {
                name: 'Amazon S3',
                description: 'Export data to a S3 bucket',
            },
            azure_blob: {
                name: 'Azure Blob Storage',
                description: 'Export data to Microsoft Azure',
            },
            gcs: {
                name: 'Google Cloud Storage',
                description: 'Export data to GCS',
            },
            snowflake: {
                name: 'Snowflake',
                description: 'Export data to Snowflake database',
            },
            bigquery: {
                name: 'BigQuery',
                description: 'Export data to Google BigQuery for analysis',
            },
            warehouse_import: {
                name: 'Warehouse import',
                description: 'Import data from third-party warehouse',
            },
            stripe: {
                name: 'Stripe',
                description: 'Stripe customer data connector',
            },
            zendesk: {
                name: 'Zendesk',
                description: 'Send and receive data from Zendesk',
            },
            hubspot: {
                name: 'Hubspot',
                description: 'Send and receive data from Hubspot',
            },
            salesforce: {
                name: 'Salesforce',
                description: 'Sync event and person data',
            },
            sentry: {
                name: 'Sentry',
                description: 'Send and receive data from Sentry',
            },
            segment: {
                name: 'Segment',
                description: 'Send events via Segment',
            },
            rudderstack: {
                name: 'Rudderstack',
                description: 'Send events via Rudderstack',
            },
            zapier: {
                name: 'Zapier',
                description: 'Trigger Zapier automations',
            },
            customer_io: {
                name: 'Customer.io',
                description: 'Messaging and marketing automation',
            },
            intercom: {
                name: 'Intercom',
                description: 'Messaging and marketing automation',
            },
            slack: {
                name: 'Slack',
                description: 'Alerts and notifications for Slack',
            },
            microsoft_teams: {
                name: 'Microsoft Teams',
                description: 'Alerts and notifications for Microsoft Teams',
            },
            community_integrations: {
                name: 'Community integrations',
                description: 'Build your own integration',
            },
            google_ads: {
                name: 'Google Ads',
                description: 'Import ROI data from Google Ads',
            },
            ci_cd_integrations: {
                name: 'CI/CD integrations',
                description: 'Connect with development tools and workflows',
            },
            wordpress: {
                name: 'WordPress',
                description: 'Easily capture data from your WordPress site',
            },
            csv_exports: {
                name: 'CSV exports',
                description: 'Export your data as a CSV',
            },
            datadog: {
                name: 'Datadog',
                description: 'Send feature flag and event data to Datadog',
            },
            email_reports: {
                name: 'Email reports',
                description: 'Send reports to email',
            },
        },
    },
    developer: {
        description: 'Developer tools and APIs',
        features: {
            sdks: {
                name: 'SDKs',
                description: 'Number of SDKs available',
            },
            native_data_sources: {
                name: 'Native data sources',
                description: 'Compute metrics and results without integrations',
            },
            proxies: {
                name: 'Proxies',
                description: 'Reverse proxy to avoid blockers',
            },
            api: {
                name: 'API',
                description: 'Capture events, get stats, and make changes via API',
            },
            local_evaluation: {
                name: 'Local evaluation (aka streaming)',
                description: 'Faster flags by not having to rely on the server for evaluation',
            },
            sql: {
                name: 'SQL',
                description: 'Query flag and product data directly via SQL',
            },
            collaboration: {
                name: 'Collaboration',
                description: 'Share your projects and sites with teammates',
            },
            server_side_sdks: {
                name: 'Server-side SDKs',
                description: 'Capture events and use features from Python, Node, and more',
            },
            mobile_sdks: {
                name: 'Mobile SDKs',
                description: 'Capture events and use features from Android, iOS, and more',
            },
            notebooks: {
                name: 'Notebooks',
                description: 'Collaborate on analysis in shareable notebooks',
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
            data_retention: {
                name: 'Data retention',
                description: 'The length of time event data is retained',
            },
            bot_blocking: {
                name: 'Bot blocking',
                description: 'Block scrapers, crawlers, and other unwanted traffic from stats',
            },
            reverse_proxy: {
                name: 'Reverse proxy',
                description: 'Avoid tracking blockers and capture more data',
            },
            user_privacy_options: {
                name: 'User privacy options',
                description: 'Anonymize users, drop personal data',
            },
            data_anonymization: {
                name: 'Data anonymization',
                description: 'Anonymize user data for privacy',
            },
            cookieless_tracking: {
                name: 'Cookieless tracking option',
                description: 'Track users without cookies',
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
