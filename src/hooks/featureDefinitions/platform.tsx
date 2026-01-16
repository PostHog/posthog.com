export const platformFeatures = {
    deployment: {
        description: 'Options for how and where you deploy PostHog',
        features: {
            eu_hosting: {
                name: 'EU hosting',
                description: 'Access and store your data in the EU',
            },
            open_source: {
                name: 'Open source',
                description: 'Audit code, contribute to roadmap, and build integrations',
            },
            reverse_proxy: {
                name: 'Reverse proxy',
                description: 'Avoid tracking blockers and capture more data',
            },
            managed_reverse_proxy: {
                name: 'Managed reverse proxy',
                description: 'Send events from your own domain, managed by us',
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
            self_serve: {
                name: 'Self-serve',
                description: 'No need to talk to sales',
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
            airbyte: {
                name: 'Airbyte',
                description: 'Extract and load data to external platforms',
            },
            azure_blob: {
                name: 'Azure Blob Storage',
                description: 'Export data to Microsoft Azure',
            },
            bigquery: {
                name: 'BigQuery',
                description: 'Export data to Google BigQuery for analysis',
            },
            ci_cd_integrations: {
                name: 'CI/CD integrations',
                description: 'Connect with development tools and workflows',
            },
            community_integrations: {
                name: 'Community integrations',
                description: 'Build your own integration',
            },
            csv_exports: {
                name: 'CSV exports',
                description: 'Export your data as a CSV',
            },
            customer_io: {
                name: 'Customer.io',
                description: 'Messaging and marketing automation',
            },
            datadog: {
                name: 'Datadog',
                description: 'Send feature flag and event data to Datadog',
            },
            discord: {
                name: 'Discord',
                description: 'Send survey responses and data to Discord',
            },
            email_reports: {
                name: 'Email reports',
                description: 'Send reports to email',
            },
            gcs: {
                name: 'Google Cloud Storage',
                description: 'Import/export data',
            },
            hubspot: {
                name: 'Hubspot',
                description: 'Send and receive data from Hubspot',
            },
            google_ads: {
                name: 'Google Ads',
                description: 'Import ROI data from Google Ads',
            },
            google_analytics: {
                name: 'Google Analytics',
                description: 'Connect with Google Analytics data',
            },
            google_search_console: {
                name: 'Google Search Console',
                description: 'Import data from Google Search Console',
            },
            intercom: {
                name: 'Intercom',
                description: 'Messaging and marketing automation',
            },
            microsoft_teams: {
                name: 'Microsoft Teams',
                description: 'Alerts and notifications for Microsoft Teams',
            },
            postgres: {
                name: 'Postgres',
                description: 'Import and export data to a Postgres database',
            },
            project_management: {
                name: 'Project management',
                description: 'Add issues to tools like Jira, Linear, and GitHub',
            },
            redshift: {
                name: 'Amazon Redshift',
                description: 'Export data to Redshift',
            },
            rudderstack: {
                name: 'Rudderstack',
                description: 'Send events via Rudderstack',
            },
            s3: {
                name: 'Amazon S3',
                description: 'Export data to a S3 bucket',
            },
            salesforce: {
                name: 'Salesforce',
                description: 'Sync event and person data',
            },
            shopify: {
                name: 'Shopify',
                description: 'Sync customer and order data',
            },
            slack: {
                name: 'Slack',
                description: 'Alerts and notifications for Slack',
            },
            snowflake: {
                name: 'Snowflake',
                description: 'Export data to Snowflake database',
            },
            stripe: {
                name: 'Stripe',
                description: 'Stripe customer data connector',
            },
            sentry: {
                name: 'Sentry',
                description: 'Send and receive data from Sentry',
            },
            segment: {
                name: 'Segment',
                description: 'Send events via Segment',
            },
            wordpress: {
                name: 'WordPress',
                description: 'Easily capture data from your WordPress site',
            },
            zapier: {
                name: 'Zapier',
                description: 'Trigger Zapier automations',
            },
            zendesk: {
                name: 'Zendesk',
                description: 'Send and receive data from Zendesk',
            },
        },
    },
    libraries: {
        description: 'Libraries for different languages and frameworks',
        features: {
            android: {
                name: 'Android',
            },
            ios: {
                name: 'iOS',
            },
            flutter: {
                name: 'Flutter',
            },
            javascript: {
                name: 'JavaScript',
            },
            react: {
                name: 'React',
            },
            react_native: {
                name: 'React Native',
            },
            ruby: {
                name: 'Ruby',
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
            client_side_sdks: {
                name: 'Client-side SDKs',
                description: 'Capture events and use features from JavaScript, React, and more',
            },
            cross_domain_tracking: {
                name: 'Cross-domain tracking',
                description: 'Track users across multiple domains and subdomains',
            },
            native_data_sources: {
                name: 'Native data sources',
                description: 'Compute metrics and results without integrations',
            },
            api: {
                name: 'API',
                description: 'Capture events, get stats, and make changes via API',
            },
            sql: {
                name: 'SQL',
                description: 'Query flag and product data directly via SQL',
            },
            terraform: {
                name: 'Terraform',
                description: 'Manage resources as infrastructure-as-code',
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
            tv_sdks: {
                name: 'OTT',
                description: 'Over-the-top TV applications',
            },
        },
    },
    security: {
        description: 'Security and compliance features',
        features: {
            bot_blocking: {
                name: 'Bot blocking',
                description: 'Block scrapers, crawlers, and other unwanted traffic from stats',
            },
            dpa: {
                name: 'DPA available',
                description: 'Data Processing Agreement',
            },
            data_anonymization: {
                name: 'Data anonymization',
                description: 'Anonymize user data for privacy',
            },
            data_retention: {
                name: 'Data retention',
                description: 'The length of time event data is retained',
            },
            cookieless_tracking: {
                name: 'Cookieless tracking option',
                description: 'Track users without cookies',
            },
            ccpa_ready: {
                name: 'CCPA-ready',
                description: 'Compliant with California Consumer Privacy Act',
            },
            gdpr_ready: {
                name: 'GDPR-ready',
                description: 'Can be compliant with GDPR',
            },
            history_audit_logs: {
                name: 'History and audit logs',
                description: 'Manage and view edits and related users',
            },
            hipaa_ready: {
                name: 'HIPAA-ready',
                description: 'Can be compliant with HIPAA',
            },
            role_based_access_control: {
                name: 'Role-based access control',
                description: 'Control access to features and data based on user roles and permissions',
            },
            saml_sso: {
                name: 'SAML/SSO',
                description: 'Use SAML or single sign-on authentication',
            },
            security_certification: {
                name: 'Security certification',
                description: 'Third-party security compliance frameworks',
            },
            soc2_certified: {
                name: 'SOC 2 Type II',
                description: 'SOC 2 security certification',
            },
            two_factor_auth: {
                name: '2FA',
                description: 'Enforce login with two-factor authentication',
            },
            user_privacy_options: {
                name: 'User privacy options',
                description: 'Anonymize users, drop personal data',
            },
        },
    },
    tools: {
        cms: {
            name: 'CMS',
            description: 'Produce and manage content to show on your site',
        },
        notebooks: {
            name: 'Notebooks',
            description: 'Collaborate on analysis in shareable notebooks',
        },
        project_management_tools: {
            name: 'Project management tools',
            description: 'Plan better with backlogs, boards, calendars, and more',
        },
    },
}
