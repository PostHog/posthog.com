export const dataPipelines = {
    name: 'Data pipelines',
    url: '/docs/cdp',
    color: 'sky-blue',
    icon: 'IconPlug',
    description: 'Collect, enrich, and send data to your destinations',
    children: [
        {
            name: 'Overview',
            url: '/docs/cdp',
            icon: 'IconHome',
            color: 'seagreen',
        },
        {
            name: 'Sources',
            url: '/docs/cdp/sources',
            icon: 'IconBook',
            color: 'blue',
            featured: true,
            dynamicChildren: 'data-pipeline-source-webhooks',
            children: [
                {
                    name: 'Overview',
                    url: '/docs/cdp/sources/',
                },
                {
                    name: 'Incoming webhooks',
                    url: '/docs/cdp/sources/incoming-webhooks',
                },
                {
                    name: 'Managed',
                },
                {
                    name: 'Attio',
                    url: '/docs/cdp/sources/attio',
                },
                {
                    name: 'Stripe',
                    url: '/docs/cdp/sources/stripe',
                },
                {
                    name: 'Hubspot',
                    url: '/docs/cdp/sources/hubspot',
                },
                {
                    name: 'Klaviyo',
                    url: '/docs/cdp/sources/klaviyo',
                },
                {
                    name: 'Zendesk',
                    url: '/docs/cdp/sources/zendesk',
                },
                {
                    name: 'Postgres',
                    url: '/docs/cdp/sources/postgres',
                },
                {
                    name: 'Salesforce',
                    url: '/docs/cdp/sources/salesforce',
                },
                {
                    name: 'MySQL',
                    url: '/docs/cdp/sources/mysql',
                },
                {
                    name: 'MongoDB',
                    url: '/docs/cdp/sources/mongodb',
                },
                {
                    name: 'Azure SQL Server',
                    url: '/docs/cdp/sources/azure-db',
                },
                {
                    name: 'Snowflake',
                    url: '/docs/cdp/sources/snowflake',
                },
                {
                    name: 'Vitally',
                    url: '/docs/cdp/sources/vitally',
                },
                {
                    name: 'Chargebee',
                    url: '/docs/cdp/sources/chargebee',
                },
                {
                    name: 'BigQuery',
                    url: '/docs/cdp/sources/bigquery',
                },
                {
                    name: 'Google Ads',
                    url: '/docs/cdp/sources/google-ads',
                },
                {
                    name: 'Bing Ads',
                    url: '/docs/cdp/sources/bing-ads',
                },
                {
                    name: 'LinkedIn Ads',
                    url: '/docs/cdp/sources/linkedin-ads',
                },
                {
                    name: 'Reddit Ads',
                    url: '/docs/cdp/sources/reddit-ads',
                },
                {
                    name: 'Meta Ads',
                    url: '/docs/cdp/sources/meta-ads',
                },
                {
                    name: 'Tiktok Ads',
                    url: '/docs/cdp/sources/tiktok-ads',
                },
                {
                    name: 'Google Sheets',
                    url: '/docs/cdp/sources/google-sheets',
                },
                {
                    name: 'Temporal.io',
                    url: '/docs/cdp/sources/temporal',
                },
                {
                    name: 'DoIt',
                    url: '/docs/cdp/sources/doit',
                },
                {
                    name: 'Self-managed',
                },
                {
                    name: 'S3',
                    url: '/docs/cdp/sources/s3',
                },
                {
                    name: 'Azure Blob',
                    url: '/docs/cdp/sources/azure-blob',
                },
                {
                    name: 'Cloudflare R2',
                    url: '/docs/cdp/sources/r2',
                },
                {
                    name: 'Google Cloud Storage',
                    url: '/docs/cdp/sources/gcs',
                },
                {
                    name: 'Webhooks',
                },
            ],
        },
        {
            name: 'Realtime destinations',
            url: '/docs/cdp/destinations',
            icon: 'IconLive',
            color: 'salmon',
            featured: true,
            dynamicChildren: 'data-pipeline-destinations',
            children: [
                {
                    name: 'Overview',
                    url: '/docs/cdp/destinations',
                },
                {
                    name: 'Customization',
                    url: '/docs/cdp/destinations/customizing-destinations',
                },
                {
                    name: 'Destinations',
                },
                {
                    name: 'Slack',
                    url: '/docs/cdp/destinations/slack',
                    badge: {
                        title: 'Popular',
                        className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Webhook',
                    url: '/docs/cdp/destinations/webhook',
                    badge: {
                        title: 'Popular',
                        className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'ActiveCampaign',
                    url: '/docs/cdp/destinations/activecampaign',
                },
                {
                    name: 'Airtable',
                    url: '/docs/cdp/destinations/airtable',
                },
                {
                    name: 'Attio',
                    url: '/docs/cdp/destinations/attio',
                },
                {
                    name: 'Avo',
                    url: '/docs/cdp/destinations/avo',
                },
                {
                    name: 'AWS kinesis',
                    url: '/docs/cdp/destinations/aws-kinesis',
                },
                {
                    name: 'Braze',
                    url: '/docs/cdp/destinations/braze',
                },
                {
                    name: 'Brevo',
                    url: '/docs/cdp/destinations/brevo',
                },
                {
                    name: 'Customer.io',
                    url: '/docs/cdp/destinations/customerio',
                    badge: {
                        title: 'Popular',
                        className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Discord',
                    url: '/docs/cdp/destinations/discord',
                    badge: {
                        title: 'Popular',
                        className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Engage.so',
                    url: '/docs/cdp/destinations/engage',
                },
                {
                    name: 'Gleap',
                    url: '/docs/cdp/destinations/gleap',
                },
                {
                    name: 'Google Ads',
                    url: '/docs/cdp/destinations/google-ads',
                },
                {
                    name: 'Google cloud storage',
                    url: '/docs/cdp/destinations/google-cloud-storage',
                },
                {
                    name: 'Google pub/sub',
                    url: '/docs/cdp/destinations/google-pubsub',
                },
                {
                    name: 'Hubspot',
                    url: '/docs/cdp/destinations/hubspot',
                    badge: {
                        title: 'Popular',
                        className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Intercom',
                    url: '/docs/cdp/destinations/intercom',
                    badge: {
                        title: 'Popular',
                        className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'June',
                    url: '/docs/cdp/destinations/june',
                },
                {
                    name: 'Klaviyo',
                    url: '/docs/cdp/destinations/klaviyo',
                },
                {
                    name: 'Knock',
                    url: '/docs/cdp/destinations/knock',
                },
                {
                    name: 'Loops',
                    url: '/docs/cdp/destinations/loops',
                    badge: {
                        title: 'Popular',
                        className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Mailchimp',
                    url: '/docs/cdp/destinations/mailchimp',
                },
                {
                    name: 'Mailgun',
                    url: '/docs/cdp/destinations/mailgun',
                },
                {
                    name: 'Mailjet',
                    url: '/docs/cdp/destinations/mailjet',
                },
                {
                    name: 'Make',
                    url: '/docs/cdp/destinations/make',
                },
                {
                    name: 'Meta ads',
                    url: '/docs/cdp/destinations/meta-ads',
                    badge: {
                        title: 'Popular',
                        className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Microsoft teams',
                    url: '/docs/cdp/destinations/microsoft-teams',
                },
                {
                    name: 'PostHog',
                    url: '/docs/cdp/destinations/posthog',
                },
                {
                    name: 'RudderStack',
                    url: '/docs/cdp/destinations/rudderstack',
                },
                {
                    name: 'Reddit ads',
                    url: '/docs/cdp/destinations/reddit-ads-conversion-api',
                },
                {
                    name: 'Reddit pixel',
                    url: '/docs/cdp/destinations/reddit-ads-pixel',
                },
                {
                    name: 'Salesforce',
                    url: '/docs/cdp/destinations/salesforce',
                },
                {
                    name: 'Sendgrid',
                    url: '/docs/cdp/destinations/sendgrid',
                },
                {
                    name: 'Snapchat ads',
                    url: '/docs/cdp/destinations/snapchat-ads',
                },
                {
                    name: 'TikTok ads',
                    url: '/docs/cdp/destinations/tiktok-ads',
                },
                {
                    name: 'Twilio',
                    url: '/docs/cdp/destinations/twilio',
                },
                {
                    name: 'Zapier',
                    url: '/docs/cdp/destinations/zapier',
                    badge: {
                        title: 'Popular',
                        className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Zendesk',
                    url: '/docs/cdp/destinations/zendesk',
                },
            ],
        },
        {
            name: 'Batch exports',
            url: '/docs/cdp/batch-exports',
            icon: 'IconShare',
            color: 'purple',
            featured: true,
            children: [
                {
                    name: 'Amazon S3',
                    url: '/docs/cdp/batch-exports/s3',
                },
                {
                    name: 'Snowflake',
                    url: '/docs/cdp/batch-exports/snowflake',
                },
                {
                    name: 'BigQuery',
                    url: '/docs/cdp/batch-exports/bigquery',
                },
                {
                    name: 'Postgres',
                    url: '/docs/cdp/batch-exports/postgres',
                },
                {
                    name: 'Redshift',
                    url: '/docs/cdp/batch-exports/redshift',
                },
                {
                    name: 'Databricks',
                    url: '/docs/cdp/batch-exports/databricks',
                },
                {
                    name: 'Azure Blob Storage',
                    url: '/docs/cdp/batch-exports/azureblob',
                },
            ],
        },
        {
            name: 'Transformations',
            url: '/docs/cdp/transformations',
            icon: 'IconWrench',
            color: 'yellow',
            featured: true,
            children: [
                {
                    name: 'Overview',
                    url: '/docs/cdp/transformations',
                },
                {
                    name: 'Transformations',
                },
                {
                    name: 'Customization',
                    url: '/docs/cdp/transformations/customizing-transformations',
                },
                {
                    name: 'Drop Events',
                    url: '/docs/cdp/transformations/drop-events',
                },
            ],
            dynamicChildren: 'data-pipeline-transformations',
        },

        {
            name: 'Troubleshooting',
            url: '/docs/cdp/troubleshooting',
            icon: 'IconQuestion',
            color: 'blue',
            featured: true,
        },
        {
            name: 'Using Fivetran, Airbyte or other ETL tools with PostHog',
            url: '/docs/cdp/fivetran-airbyte',
        },
        {
            name: 'Changelog',
            url: '/docs/cdp/changelog',
            icon: 'IconRocket',
            color: 'purple',
        },
    ],
}

export const handbookSidebar = [
    {
        name: 'The Book of PostHog',
    },
    {
        name: 'Table of contents',
        url: '/handbook',
        // icon: 'IconInfo',
    },

    {
        name: 'Chapters',
        url: '',
        children: [
            {
                name: '1. Why does PostHog exist?',
                url: '/handbook/why-does-posthog-exist',
            },
            {
                name: '2. How we got here',
                url: '/handbook/story',
            },
            {
                name: '3. How we get users',
                url: '/handbook/how-we-get-users',
            },
            {
                name: '4. Who we are building for',
                url: '/handbook/who-we-build-for',
            },
            {
                name: '5. How we make users happy',
                url: '/handbook/making-users-happy',
            },
            {
                name: '6. How we make money',
                url: '/handbook/how-we-make-money',
            },
            {
                name: '7. Enduringly low prices',
                url: '/handbook/low-prices',
            },
            {
                name: '8. Deciding which products to build',
                url: '/handbook/which-products',
            },
            {
                name: '9. A wide company with small teams',
                url: '/handbook/wide-company',
            },
            {
                name: "10. How we're building a world-class team",
                url: '/handbook/strong-team',
            },
            {
                name: '11. What we value',
                url: '/handbook/values',
            },
            {
                name: '12. Providing a world-class engineering environment',
                url: '/handbook/world-class-engineering',
            },
            {
                name: '13. Not running out of money',
                url: '/handbook/finance',
            },
            {
                name: '14. Where are we going?',
                url: '/handbook/future',
            },
            {
                name: '15. How you can help',
                url: '/handbook/help',
            },
        ],
    },
    {
        name: 'Working here',
    },
    {
        name: 'How we work',
        url: '',
        children: [
            { name: 'Culture', url: '/handbook/company/culture' },
            { name: 'Lore', url: '/handbook/company/lore' },
            { name: 'A grown-up company', url: '/handbook/company/grown-ups' },
            { name: 'Small teams', url: '/handbook/company/small-teams' },
            { name: 'Fuzzy ownership', url: '/handbook/company/fuzzy-ownership' },
            { name: 'Goal setting', url: '/handbook/company/goal-setting' },
            { name: 'Sprints', url: '/handbook/company/sprints' },
            { name: 'Management', url: '/handbook/company/management' },
            { name: 'Communication', url: '/handbook/company/communication' },
            { name: 'Meetings', url: '/handbook/getting-started/meetings' },
            { name: 'Kudos', url: '/handbook/company/kudos' },
            { name: 'Offsites', url: '/handbook/company/offsites' },
        ],
    },
    {
        name: 'Tools & processes',
        url: '',
        children: [
            { name: 'Spending money', url: '/handbook/people/spending-money' },
            { name: 'Team changes', url: '/handbook/company/team-changes' },
            { name: 'Using GitHub', url: '/handbook/company/new-to-github' },
            { name: 'Adding tools', url: '/handbook/company/adding-tools' },
            { name: 'Security', url: '/handbook/company/security' },
            { name: 'Advisories & CVEs', url: '/handbook/company/security-advisories' },
        ],
    },
    {
        name: 'People ops',
        url: '',
        children: [
            { name: 'Onboarding', url: '/handbook/people/onboarding' },
            { name: 'Side gigs', url: '/handbook/people/side-gigs' },
            { name: 'Training', url: '/handbook/people/training' },
            { name: 'Feedback', url: '/handbook/people/feedback' },
            { name: 'Progression', url: '/handbook/people/career-progression' },
            { name: 'HR processes', url: '/handbook/people/grievances' },
            { name: 'BookHog', url: '/handbook/people/bookhog' },
            { name: 'Offboarding', url: '/handbook/people/offboarding' },
        ],
    },
    {
        name: 'Pay & perks',
        url: '',
        children: [
            { name: 'Compensation', url: '/handbook/people/compensation' },
            { name: 'Share options', url: '/handbook/people/share-options' },
            { name: 'Benefits', url: '/handbook/people/benefits' },
            { name: 'Time off', url: '/handbook/people/time-off' },
        ],
    },
    {
        name: 'Hiring',
        url: '',
        children: [
            { name: 'Hiring process', url: '/handbook/people/hiring-process' },
            { name: 'How to interview', url: '/handbook/people/hiring-process/how-to-interview' },
            { name: 'Engineering hiring', url: '/handbook/people/hiring-process/engineering-hiring' },
            { name: 'Marketing hiring', url: '/handbook/people/hiring-process/marketing-hiring' },
            { name: 'Operations hiring', url: '/handbook/people/hiring-process/operations-hiring' },
            { name: 'Design hiring', url: '/handbook/people/hiring-process/design-hiring' },
            { name: 'Leadership hiring', url: '/handbook/people/hiring-process/exec-hiring' },
            { name: 'Sales and CS hiring', url: '/handbook/people/hiring-process/sales-cs-hiring' },
        ],
    },
    {
        name: 'Resources',
    },
    {
        name: 'Blitzscale',
        url: '',
        children: [
            {
                name: 'Annual planning',
                url: '/handbook/exec/annual-planning',
            },
            {
                name: 'All hands topics',
                url: '/handbook/exec/all-hands-topics',
            },
        ],
    },
    {
        name: 'Brand & design',
        url: '',
        children: [
            {
                name: 'Overview',
                url: '/handbook/brand/overview',
            },
            {
                name: 'Brand strategy',
                url: '/handbook/strategy/brand',
            },
            {
                name: 'Art requests',
                url: '/handbook/brand/art-requests',
            },
            {
                name: 'Logos, brand, and hedgehogs',
                url: '/handbook/company/brand-assets',
            },
            {
                name: 'Our design philosophy',
                url: '/handbook/brand/philosophy',
            },
            {
                name: 'Product design for engineers',
                url: '/handbook/engineering/product-design',
            },
            {
                name: 'Product design process',
                url: '/handbook/brand/process',
            },
        ],
    },
    {
        name: 'Content',
        url: '',
        children: [
            {
                name: 'Overview',
                url: '/handbook/content',
            },
            {
                name: 'Brand guidelines and messaging',
                url: '/handbook/content/brand-message',
            },
            {
                name: 'Video',
                url: '/handbook/growth/marketing/video',
                children: [
                    {
                        name: 'Overview',
                        url: '/handbook/growth/marketing/video',
                    },
                    {
                        name: 'YouTube',
                        url: '/handbook/content/youtube',
                    },
                ],
            },
            {
                name: 'Newsletter',
                url: '/handbook/content/newsletter',
                children: [
                    {
                        name: 'Overview',
                        url: '/handbook/content/newsletter',
                    },
                    {
                        name: 'Newsletter ads',
                        url: '/handbook/content/newsletter-ads',
                    },
                ],
            },
            {
                name: 'SEO best practices',
                url: '/handbook/content/seo-guide',
            },
            {
                name: 'Style guide',
                url: '/handbook/content/posthog-style-guide',
            },
            {
                name: 'Writing metadata',
                url: '/handbook/content/metadata',
            },
        ],
    },
    {
        name: 'Docs & Wizard',
        url: '/handbook/docs-and-wizard',
        children: [
            {
                name: 'Overview',
                url: '/handbook/docs-and-wizard',
            },
            {
                name: 'How to publish changelog',
                url: '/handbook/docs-and-wizard/how-to-publish-changelog',
            },
            {
                name: 'Wizard',
            },
            {
                name: 'AI wizard',
                url: '/handbook/docs-and-wizard/developing-the-wizard',
            },
            {
                name: 'Context mill',
                url: '/handbook/docs-and-wizard/context-mill',
            },
            {
                name: 'Docs',
            },
            {
                name: 'Ownership',
                url: '/handbook/docs-and-wizard/docs-ownership',
            },
            {
                name: 'Style guide',
                url: '/handbook/docs-and-wizard/docs-style-guide',
            },
            {
                name: 'MDX and components',
                url: '/handbook/docs-and-wizard/mdx-and-components',
            },
            {
                name: 'How to write product docs',
                url: '/handbook/docs-and-wizard/writing-product-docs',
            },
            {
                name: 'Onboarding docs',
                url: '/handbook/docs-and-wizard/onboarding-docs',
            },
            {
                name: 'SDK reference docs',
                url: '/handbook/docs-and-wizard/sdk-reference-docs',
            },
            {
                name: 'API specs and docs',
                url: '/handbook/docs-and-wizard/api-specifications',
            },
        ],
    },
    {
        name: 'Engineering',
        url: '',
        children: [
            {
                name: 'Resources',
            },
            {
                name: 'Getting started',
                url: '',
                children: [
                    {
                        name: 'Developing locally',
                        url: '/handbook/engineering/developing-locally',
                    },
                    {
                        name: 'Tech stack',
                        url: '/handbook/engineering/stack',
                    },
                    {
                        name: 'Project structure',
                        url: '/handbook/engineering/project-structure',
                    },
                    {
                        name: 'How we review PRs',
                        url: '/handbook/engineering/how-we-review',
                    },
                    {
                        name: 'How to do product, as an engineer',
                        url: '/handbook/engineering/product-engineering',
                    },
                    {
                        name: 'Visiting customers as an engineer',
                        url: '/handbook/engineering/visiting-customers',
                    },
                    {
                        name: 'Writing docs (as an engineer)',
                        url: '/handbook/engineering/writing-docs',
                    },
                    {
                        name: 'Working with Data Warehouse',
                        url: '/handbook/engineering/data-warehouse',
                    },
                ],
            },
            {
                name: 'Coding conventions',
                url: '',
                children: [
                    {
                        name: 'Frontend coding',
                        url: '/handbook/engineering/conventions/frontend-coding',
                    },
                    {
                        name: 'Backend coding',
                        url: '/handbook/engineering/conventions/backend-coding',
                    },
                    {
                        name: 'Scripts',
                        url: '/handbook/engineering/conventions/scripts',
                    },
                ],
            },
            {
                name: 'Operations',
                url: '',
                children: [
                    {
                        name: 'Support hero',
                        url: '/handbook/engineering/operations/support-hero',
                    },
                    {
                        name: 'On-call rotation',
                        url: '/handbook/engineering/operations/on-call-rotation',
                    },
                    {
                        name: 'Handling incidents',
                        url: '/handbook/engineering/operations/incidents',
                    },
                    {
                        name: 'Post-mortems',
                        url: '/handbook/engineering/operations/post-mortems',
                    },
                ],
            },
            {
                name: 'Working with data',
                url: '',
                children: [
                    {
                        name: 'Making schema changes safely',
                        url: '/handbook/engineering/databases/schema-changes',
                    },
                    {
                        name: 'How to optimize queries',
                        url: '/handbook/engineering/databases/query-performance-optimization',
                    },
                    {
                        name: 'How to write an async migration',
                        url: '/handbook/engineering/databases/async-migrations',
                    },
                    {
                        name: 'How to run migrations on PostHog Cloud',
                        url: '/handbook/engineering/databases/clickhouse-event-table-migrations',
                    },
                    {
                        name: 'Working with ClickHouse materialized columns',
                        url: '/handbook/engineering/databases/materialized-columns',
                    },
                    {
                        name: 'Writing HogQL queries in Python',
                        url: '/handbook/engineering/databases/hogql-python',
                    },
                ],
            },
            {
                name: 'SDKs',
                url: '/handbook/engineering/sdks',
                children: [
                    {
                        name: 'Overview',
                        url: '/handbook/engineering/sdks',
                    },
                    {
                        name: 'Support rotation',
                        url: '/handbook/engineering/sdks/support-rotation',
                    },
                    {
                        name: 'Releases',
                        url: '/handbook/engineering/sdks/releases',
                    },
                ],
            },
            {
                name: 'PostHog AI',
                url: '',
                children: [
                    {
                        name: 'AI platform overview',
                        url: '/handbook/engineering/ai/ai-platform',
                    },
                    {
                        name: 'AI products',
                        url: '/handbook/engineering/ai/products',
                    },
                    {
                        name: 'AI platform architecture',
                        url: '/handbook/engineering/ai/architecture',
                    },
                    {
                        name: 'Implementing AI features',
                        url: '/handbook/engineering/ai/implementation',
                    },
                    {
                        name: 'Team structure and collaboration',
                        url: '/handbook/engineering/ai/team-structure',
                    },
                ],
            },
            {
                name: 'Deployments',
                url: '',
                children: [
                    {
                        name: 'Deployments support',
                        url: '/handbook/engineering/deployments-support',
                    },
                    {
                        name: 'Working with cloud providers',
                        url: '/handbook/engineering/cloud-providers',
                    },
                    {
                        name: 'How-to access PostHog Cloud infra',
                        url: '/handbook/engineering/how-to-access-posthog-cloud-infra',
                    },
                ],
            },
            {
                name: 'ClickHouse manual',
                url: '',
                children: [
                    {
                        name: 'Overview',
                        url: '/handbook/engineering/clickhouse',
                    },
                    {
                        name: 'Our Cluster Topologies',
                        url: '/handbook/engineering/clickhouse/clusters',
                    },
                    {
                        name: 'Data storage or what is a MergeTree',
                        url: '/handbook/engineering/clickhouse/data-storage',
                    },
                    {
                        name: 'Data replication',
                        url: '/handbook/engineering/clickhouse/replication',
                    },
                    {
                        name: 'Data ingestion',
                        url: '/handbook/engineering/clickhouse/data-ingestion',
                    },
                    {
                        name: 'Working with JSON',
                        url: '/handbook/engineering/clickhouse/working-with-json',
                    },
                    {
                        name: 'Query attribution',
                        url: '/handbook/engineering/clickhouse/query-attribution',
                    },
                    {
                        name: 'Query performance',
                        url: '/handbook/engineering/clickhouse/performance',
                    },
                    {
                        name: 'Operations',
                        url: '/handbook/engineering/clickhouse/operations',
                    },
                    {
                        name: 'Schema case studies',
                        url: '',
                        children: [
                            {
                                name: 'Overview',
                                url: '/handbook/engineering/clickhouse/schema',
                            },
                            {
                                name: 'sharded_events',
                                url: '/handbook/engineering/clickhouse/schema/sharded-events',
                            },
                            {
                                name: 'app_metrics',
                                url: '/handbook/engineering/clickhouse/schema/app-metrics',
                            },
                            {
                                name: 'person_distinct_id',
                                url: '/handbook/engineering/clickhouse/schema/person-distinct-id',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Feature ownership',
                url: '/handbook/engineering/feature-ownership',
            },
            {
                name: 'Bug prioritization',
                url: '/handbook/engineering/bug-prioritization',
            },
            {
                name: 'Shipping & releasing',
                url: '/handbook/engineering/development-process',
            },
            {
                name: 'Security best practices',
                url: '/handbook/engineering/security',
            },
            {
                name: 'Setting up SSL locally',
                url: '/handbook/engineering/setup-ssl-locally',
            },
            {
                name: 'Tech talks',
                url: '/handbook/engineering/tech-talks',
            },
        ],
    },
    {
        name: 'Growth',
        url: '',
        children: [
            {
                name: 'Growth reviews',
                url: '/handbook/growth/growth-engineering/growth-sessions',
            },
            {
                name: 'Pricing principles',
                url: '/handbook/engineering/feature-pricing',
            },
            {
                name: 'Revenue and forecasting',
                url: '/handbook/engineering/revenue-and-forecasting',
            },
            {
                name: 'Product intents',
                url: '/handbook/growth/growth-engineering/product-intents',
            },
            {
                name: 'Per-product activation',
                url: '/handbook/growth/growth-engineering/per-product-activation',
            },
        ],
    },
    {
        name: 'Marketing',
        url: '',
        children: [
            {
                name: 'Overview',
                url: '/handbook/growth/marketing',
            },
            {
                name: 'Product marketing',
                url: '/handbook/marketing/product-announcements',
            },
            {
                name: 'Paid ads',
                url: '/handbook/marketing/paid',
            },
            {
                name: 'Product positioning',
                url: '/handbook/marketing/positioning',
            },
            {
                name: 'Incident comms',
                url: '/handbook/growth/marketing/incident-comms',
            },
            {
                name: 'Events',
                url: '/handbook/marketing/events',
            },
            {
                name: 'Customer case studies',
                url: '/handbook/marketing/customer-case-studies',
            },
            {
                name: 'Co-marketing',
                url: '/handbook/marketing/co-marketing',
            },
            {
                name: 'Influencers',
                url: '/handbook/growth/marketing/influencers',
            },
            {
                name: 'Email & comms',
                url: '',
                children: [
                    {
                        name: 'Email marketing',
                        url: '/handbook/brand/email-comms',
                    },
                    {
                        name: 'In-app messaging',
                        url: '/handbook/brand/in-app',
                    },
                ],
            },
            {
                name: 'Partnerships & PR',
                url: '',
                children: [
                    {
                        name: 'Partnerships',
                        url: '/handbook/brand/partners',
                    },
                    {
                        name: 'Press & PR',
                        url: '/handbook/brand/press',
                    },
                    {
                        name: 'Startups & YC Programs',
                        url: '/handbook/brand/startups',
                    },
                    {
                        name: 'Testimonials & G2',
                        url: '/handbook/brand/testimonials',
                    },
                    {
                        name: 'Campaigns & coupons',
                        url: '/handbook/growth/marketing/campaigns-and-coupons',
                    },
                ],
            },
            {
                name: 'Who can help me?',
                url: '/handbook/growth/marketing/ownership',
            },
            {
                name: 'Other',
                url: '/handbook/growth/marketing/open-source-sponsorship',
                children: [
                    {
                        name: 'Sponsorships',
                        url: '/handbook/growth/marketing/open-source-sponsorship',
                    },
                    {
                        name: 'ICP scoring',
                        url: '/handbook/growth/marketing/icp',
                    },
                    {
                        name: 'Dashboard templates',
                        url: '/handbook/growth/marketing/templates',
                    },
                ],
            },
        ],
    },
    {
        name: 'People & Ops',
        url: '',
        children: [
            {
                name: 'Overview',
                url: '/handbook/people/overview',
            },
            {
                name: 'Finance',
                url: '/handbook/people/finance',
            },
            {
                name: 'Talent',
                url: '/handbook/people/talent',
            },
            {
                name: 'Hogpatch',
                url: '/handbook/people/hogpatch',
            },
            {
                name: 'Hogpatch operations',
                url: '/handbook/people/hogpatch-operations',
            },
            {
                name: 'Merch store',
                url: '/handbook/company/merch-store',
            },
        ],
    },
    {
        name: 'PostHog.com',
        url: '',
        children: [
            {
                name: 'Overview',
                url: '/handbook/engineering/posthog-com/overview',
            },
            {
                name: 'Developing the website',
                url: '/handbook/engineering/posthog-com/developing-the-website',
            },
            {
                name: 'How PostHog.com works',
                url: '/handbook/engineering/posthog-com/how-posthog-website-works',
            },
            {
                name: 'Designing PostHog.com',
                url: '/handbook/brand/designing-posthog-website',
            },
            {
                name: 'Technical architecture',
                url: '/handbook/engineering/posthog-com/technical-architecture',
            },
            {
                name: 'MDX setup',
                url: '/handbook/engineering/posthog-com/mdx-setup',
            },
            {
                name: 'MDX components',
                url: '/handbook/engineering/posthog-com/markdown',
            },
            {
                name: 'Uploading assets',
                url: '/handbook/engineering/posthog-com/assets',
            },
            {
                name: 'Merch store',
                url: '/handbook/engineering/posthog-com/merch-store',
            },
            {
                name: 'Posting a new job',
                url: '/handbook/engineering/posthog-com/jobs',
            },
            {
                name: 'Managing cool tech jobs',
                url: '/handbook/engineering/posthog-com/cool-tech-jobs',
            },
            {
                name: 'Managing small teams',
                url: '/handbook/engineering/posthog-com/small-teams',
            },
            {
                name: 'Adding a team member',
                url: '/handbook/engineering/posthog-com/add-team-member',
            },
            {
                name: 'Managing the company roadmap',
                url: '/handbook/engineering/posthog-com/roadmap',
            },
            {
                name: 'Changelog entries',
                url: '/handbook/engineering/posthog-com/changelog',
            },
            {
                name: 'Custom presentations',
                url: '/handbook/engineering/posthog-com/presentations',
            },
            {
                name: 'Product & feature comparisons',
                url: '/handbook/engineering/posthog-com/product-comparisons',
            },
            {
                name: 'Editing API docs',
                url: '/handbook/engineering/posthog-com/api-docs',
            },
            {
                name: 'Community',
                url: '',
                children: [
                    {
                        name: 'Overview',
                        url: '/handbook/community',
                    },
                    {
                        name: 'Answering community questions',
                        url: '/handbook/community/questions',
                    },
                    {
                        name: 'Profiles',
                        url: '/handbook/community/profiles',
                    },
                ],
            },
        ],
    },
    {
        name: 'Product',
        url: '',
        children: [
            {
                name: 'Overview',
                url: '/handbook/product/product-team',
            },
            {
                name: 'Product metrics',
                url: '/handbook/product/metrics',
            },
            {
                name: 'User feedback',
                url: '/handbook/product/user-feedback',
            },
            {
                name: 'In-Person Customer Visits',
                url: '/handbook/product/visiting-customers',
            },
            {
                name: 'Releasing new products and features',
                url: '/handbook/product/releasing-new-products-and-features',
            },
            {
                name: 'Per-product growth reviews',
                url: '/handbook/product/per-product-growth-reviews',
            },
            {
                name: 'Prioritizing work for mature products',
                url: '/handbook/product/prioritizing-work-for-mature-products',
            },
            {
                name: 'Product manager role',
                url: '/handbook/product/product-manager-role',
            },
            {
                name: 'Product manager hiring',
                url: '/handbook/product/product-manager-hiring',
            },
        ],
    },
    {
        name: 'Support',
        url: '',
        children: [
            {
                name: 'Overview',
                url: '/handbook/support/support-team',
            },
            {
                name: 'Customer support',
                url: '/handbook/support/customer-support',
            },
            {
                name: 'Support team incident response',
                url: '/handbook/support/support-incident-response',
            },
            {
                name: 'How we work',
                url: '',
                children: [
                    {
                        name: 'Technical support SMEs',
                        url: '/handbook/support/support-smes',
                    },
                    {
                        name: 'Support zero weeks',
                        url: '/handbook/support/support-zero',
                    },
                ],
            },
            {
                name: 'Troubleshooting tips',
                url: '/handbook/support/troubleshooting-tips',
            },
        ],
    },
    {
        name: 'Sales, CS & Onboarding',
        url: '',
        children: [
            {
                name: 'Overview',
                url: '/handbook/growth/sales/accounts-overview',
            },
            {
                name: 'Sales',
                url: '',
                children: [
                    {
                        name: 'Overview',
                        url: '/handbook/growth/sales/overview',
                    },
                    {
                        name: 'New team member onboarding',
                        url: '/handbook/growth/sales/new-hire-onboarding',
                    },
                    {
                        name: 'How we work',
                        url: '/handbook/growth/sales/how-we-work',
                    },
                    {
                        name: 'Why buy PostHog',
                        url: '/handbook/growth/sales/why-buy-posthog',
                    },
                    {
                        name: 'New business sales',
                        url: '/handbook/growth/sales/new-sales',
                    },
                    {
                        name: 'Outbound sales',
                        url: '/handbook/growth/sales/outbound-sales',
                    },
                    {
                        name: 'How to do discovery',
                        url: '/handbook/growth/sales/how-to-do-discovery',
                    },
                    {
                        name: 'Running trials',
                        url: '/handbook/growth/sales/running-trials',
                    },
                    {
                        name: 'Selling and procuring via AWS Marketplace',
                        url: '/handbook/growth/sales/selling-via-aws',
                    },
                    {
                        name: 'Utilization by business type',
                        url: '/handbook/growth/sales/utilization-by-business-type',
                    },
                    {
                        name: 'Professional services',
                        url: '/handbook/growth/sales/professional-services',
                    },
                    {
                        name: 'Product-led sales',
                        url: '/handbook/growth/sales/product-led-sales',
                        children: [
                            {
                                name: 'Expansion, cross-sell & retention',
                                url: '/handbook/growth/sales/expansion-and-retention',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Cross-selling',
                url: '',
                children: [
                    {
                        name: 'How we upsell and cross-sell',
                        url: '/handbook/growth/cross-selling/how-we-upsell-and-cross-sell',
                    },
                    {
                        name: 'Cross sell motions',
                        url: '/handbook/growth/cross-selling/cross-sell-motions',
                    },
                    {
                        name: 'Error Tracking cross-sell',
                        url: '/handbook/growth/cross-selling/error-tracking-cross-sell',
                    },
                ],
            },
            {
                name: 'Customer Success',
                url: '',
                children: [
                    {
                        name: 'Customer success overview',
                        url: '/handbook/cs-and-onboarding/customer-success',
                    },
                    {
                        name: 'Getting started with newly assigned customers',
                        url: '/handbook/cs-and-onboarding/getting-started-with-customers',
                    },
                    {
                        name: 'Basic account review checklist',
                        url: '/handbook/cs-and-onboarding/foundation-check',
                    },
                    {
                        name: 'Template for onboarding success plan',
                        url: '/handbook/cs-and-onboarding/onboarding-success-plan',
                    },
                    {
                        name: 'Renewals',
                        url: '/handbook/cs-and-onboarding/renewals',
                    },
                    {
                        name: 'New starter onboarding',
                        url: '/handbook/cs-and-onboarding/new-hire-onboarding',
                    },
                    {
                        name: 'How we work',
                        url: '/handbook/cs-and-onboarding/how-we-work',
                    },
                    {
                        name: 'Lifecycle of CSM engagement',
                        url: '/handbook/cs-and-onboarding/lifecycle-csm',
                    },
                    {
                        name: 'How we use automation',
                        url: '/handbook/cs-and-onboarding/how-we-use-automation',
                    },
                    {
                        name: 'Customer industry segments',
                        url: '/handbook/cs-and-onboarding/customer-industry-segments',
                    },
                    {
                        name: 'Common churn reasons',
                        url: '/handbook/cs-and-onboarding/churn-reasons',
                    },
                ],
            },
            {
                name: 'Onboarding',
                url: '',
                children: [
                    {
                        name: 'Onboarding team',
                        url: '/handbook/onboarding/onboarding-team',
                    },
                    {
                        name: 'Onboarding program',
                        url: '/handbook/onboarding/onboarding-program',
                    },
                    {
                        name: 'Onboarding tracking',
                        url: '/handbook/onboarding/onboarding-tracking',
                    },
                    {
                        name: 'Onboarding data',
                        url: '/handbook/onboarding/onboarding-data',
                    },
                    {
                        name: 'Sales handover',
                        url: '/handbook/onboarding/sales-handover',
                    },
                    {
                        name: 'New hire onboarding',
                        url: '/handbook/onboarding/new-hire-onboarding',
                    },
                ],
            },
            {
                name: 'Shared processes',
                url: '',
                children: [
                    {
                        name: 'Tools',
                        url: '/handbook/growth/sales/sales-and-cs-tools',
                    },
                    {
                        name: 'Managing our CRM',
                        url: '/handbook/growth/sales/crm',
                    },
                    {
                        name: 'Lead routing & scoring',
                        url: '/handbook/growth/sales/lead-scoring',
                    },
                    {
                        name: 'Matching PostHog to a business type',
                        url: '/handbook/growth/sales/utilization-by-business-type',
                    },
                    {
                        name: 'Contract rules',
                        url: '/handbook/growth/sales/contract-rules',
                    },
                    {
                        name: 'Creating contracts',
                        url: '/handbook/growth/sales/contracts',
                    },
                    {
                        name: 'Billing',
                        url: '/handbook/growth/sales/billing',
                    },
                    {
                        name: 'Trials',
                        url: '/handbook/growth/sales/trials',
                    },
                    {
                        name: 'Refunds',
                        url: '/handbook/growth/sales/refunds',
                    },
                    {
                        name: 'Allocating accounts',
                        url: '/handbook/growth/sales/account-allocation',
                    },
                    {
                        name: 'Account planning',
                        url: '/handbook/growth/sales/account-planning',
                    },
                    {
                        name: 'Automations',
                        url: '/handbook/growth/sales/automations',
                    },
                    {
                        name: 'User event streams',
                        url: '/handbook/growth/sales/user-event-streams',
                    },
                    {
                        name: 'Who we do business with',
                        url: '/handbook/growth/sales/who-we-do-business-with',
                    },
                    {
                        name: 'Handling customer issues',
                        url: '/handbook/cs-and-onboarding/handling-customer-issues',
                    },
                    {
                        name: 'Communications templates',
                        url: '/handbook/growth/sales/communications-templates',
                    },
                    {
                        name: 'Health tracking',
                        url: '/handbook/cs-and-onboarding/health-tracking',
                    },
                    {
                        name: 'Customer health checks',
                        url: '/handbook/cs-and-onboarding/health-checks',
                    },
                    {
                        name: 'Learn from churn',
                        url: '/handbook/cs-and-onboarding/customer-churn-retros',
                    },
                    {
                        name: 'Risk mitigation and churn prevention',
                        url: '/handbook/growth/sales/risk-mitigation-and-churn-prevention',
                    },
                    {
                        name: 'Historical imports',
                        url: '/handbook/growth/sales/historical-import',
                    },
                    {
                        name: 'Shared Slack channels',
                        url: '/handbook/growth/sales/slack-channels',
                    },
                    {
                        name: 'Tracking feature requests',
                        url: '/handbook/cs-and-onboarding/feature-requests',
                    },
                    {
                        name: 'New hire onboarding exercise',
                        url: '/handbook/cs-and-onboarding/new-hire-onboarding-exercise',
                    },
                    {
                        name: 'New customer onboarding',
                        url: '/handbook/growth/sales/customer-onboarding',
                    },
                    {
                        name: 'Customer on-sites',
                        url: '/handbook/growth/sales/customer-onsites',
                    },
                    {
                        name: 'Metabase account analysis',
                        url: '/handbook/onboarding/metabase-account-analysis',
                    },
                ],
            },
            {
                name: 'Use cases',
                url: '',
                children: [
                    {
                        name: 'Chrome Extension Billing Issues',
                        url: '/handbook/onboarding/chrome-extension-billing-case-study-wildfire',
                    },
                ],
            },
            {
                name: 'Getting people to talk to you',
                url: '/handbook/growth/sales/getting-people-to-talk-to-you',
            },
            {
                name: 'Customer FAQs',
                url: '/handbook/growth/sales/customer-faqs',
            },
        ],
    },
    {
        name: 'RevOps',
        url: '',
        children: [
            {
                name: 'Overview',
                url: '/handbook/growth/revops/overview',
            },
            {
                name: 'Revenue adjustments',
                url: '/handbook/growth/revops/revenue-adjustments',
            },
            {
                name: 'Retention metrics',
                url: '/handbook/growth/revops/retention-metrics',
            },
            {
                name: 'Lifecycle analysis',
                url: '/handbook/growth/revops/lifecycle-analysis',
            },
            {
                name: 'SalesOps',
                url: '',
                children: [
                    {
                        name: 'Refunds',
                        url: '/handbook/growth/sales/refunds',
                    },
                    {
                        name: 'Lead assignment during time off',
                        url: '/handbook/growth/revops/lead-assignment-ooo',
                    },
                    {
                        name: 'Giving credits to customers',
                        url: '/handbook/growth/revops/credits',
                    },
                ],
            },
        ],
    },
]

export const communityMenu = {
    name: 'Community',
    url: '/community',
    icon: 'IconChat',
    children: [
        {
            name: 'News',
            icon: 'IconNewspaper',
            color: 'blue',
            url: '/community',
        },
        {
            name: 'Posts',
            icon: 'IconBook',
            color: 'red',
            url: '/posts',
        },
        {
            name: 'Questions',
            icon: 'IconMessage',
            color: 'seagreen',
            url: '/questions',
        },
        {
            name: 'Guides',
            icon: 'IconMap',
            color: 'red',
            url: '/tutorials',
            children: [
                {
                    name: 'All guides',
                    icon: 'IconHome',
                    color: 'seagreen',
                    url: '/tutorials',
                },
                {
                    name: 'Product OS',
                    icon: 'IconStack',
                    color: 'salmon',
                    url: '/tutorials/categories/actions',
                    children: [
                        { name: 'Actions', url: '/tutorials/categories/actions' },
                        { name: 'Apps', url: '/tutorials/categories/apps' },
                        { name: 'Cohorts', url: '/tutorials/categories/cohorts' },
                        { name: 'Data management', url: '/tutorials/categories/data-management' },
                        { name: 'Events', url: '/tutorials/categories/events' },
                        { name: 'Heatmaps', url: '/tutorials/categories/heatmaps' },
                        { name: 'SQL', url: '/tutorials/categories/sql' },
                        { name: 'Insights', url: '/tutorials/categories/insights' },
                        { name: 'Persons', url: '/tutorials/categories/persons' },
                        { name: 'Sessions', url: '/tutorials/categories/sessions' },
                        { name: 'Settings', url: '/tutorials/categories/settings' },
                        { name: 'Site apps', url: '/tutorials/categories/site-apps' },
                        { name: 'Team collaboration', url: '/tutorials/categories/team-collaboration' },
                        { name: 'Toolbar', url: '/tutorials/categories/toolbar' },
                    ],
                },
                {
                    name: 'Product Analytics',
                    icon: 'IconGraph',
                    color: 'blue',
                    url: '/tutorials/categories/correlation-analysis',
                    children: [
                        { name: 'Correlation analysis', url: '/tutorials/categories/correlation-analysis' },
                        { name: 'Dashboards', url: '/tutorials/categories/dashboards' },
                        { name: 'Funnels', url: '/tutorials/categories/funnels' },
                        { name: 'Group analytics', url: '/tutorials/categories/group-analytics' },
                        { name: 'Lifecycle', url: '/tutorials/categories/lifecycle' },
                        { name: 'Paths', url: '/tutorials/categories/paths' },
                        { name: 'Retention', url: '/tutorials/categories/retention' },
                        { name: 'Stickiness', url: '/tutorials/categories/stickiness' },
                        { name: 'Subscriptions', url: '/tutorials/categories/subscriptions' },
                        { name: 'Trends', url: '/tutorials/categories/trends' },
                        { name: 'User paths', url: '/tutorials/categories/user-paths' },
                    ],
                },
                {
                    name: 'Session Replay',
                    color: 'yellow',
                    icon: 'IconRewindPlay',
                    url: '/tutorials/categories/session-replay',
                },
                {
                    name: 'Feature Flags',
                    icon: 'IconToggle',
                    color: 'seagreen',
                    url: '/tutorials/categories/feature-flags',
                },
                {
                    name: 'Experiments',
                    icon: 'IconFlask',
                    color: 'purple',
                    url: '/tutorials/categories/experimentation',
                    children: [{ name: 'Experimentation', url: '/tutorials/categories/experimentation' }],
                },
                {
                    name: 'CDP',
                    color: 'yellow',
                    icon: 'IconPerson',
                    url: '/tutorials/categories/filters',
                    children: [
                        { name: 'Filters', url: '/tutorials/categories/filters' },
                        { name: 'Zapier', url: '/tutorials/categories/zapier' },
                    ],
                },
                {
                    name: 'LLM Analytics',
                    color: 'purple',
                    icon: 'IconLlmAnalytics',
                    url: '/tutorials/ai-engineering',
                },
            ],
        },
        {
            name: 'Templates',
            icon: 'IconMagic',
            color: 'orange',
            url: '/templates',
        },
        {
            name: 'DeskHog',
            icon: 'IconDeskHog',
            color: 'seagreen',
            url: '/deskhog',
        },
        {
            name: 'Cool tech jobs',
            icon: 'IconLaptop',
            color: 'purple',
            url: '/cool-tech-jobs',
        },
        {
            name: 'Newsletter',
            icon: 'IconNewspaper',
            color: 'green',
            url: 'https://posthog.com/newsletter',
        },
        {
            name: 'Merch',
            icon: 'IconStore',
            color: 'seagreen',
            url: '/merch',
        },
    ],
}

export const sexyLegalMenu = {
    name: 'Terms',
    url: '/terms',
    icon: 'IconLogomark',
    children: [
        { name: 'Terms', icon: 'IconDocument', url: '/terms', color: 'blue' },
        { name: 'Privacy', icon: 'IconShield', url: '/privacy', color: 'seagreen' },
        { name: 'DPA generator', icon: 'IconPencil', url: '/dpa', color: 'red' },
        { name: 'BAA generator', icon: 'IconTie', url: '/baa', color: 'purple' },
    ],
}

export const companyMenu = {
    name: 'Company',
    url: '/about',
    icon: 'IconLogomark',
    children: [
        { name: 'About', icon: 'IconLogomark', url: '/about' },
        {
            name: 'Roadmap',
            icon: 'IconMap',
            color: 'orange',
            url: '/roadmap',
        },
        {
            name: 'Changelog',
            icon: 'IconCalendar',
            color: 'red',
            url: '/changelog',
        },
        { name: 'People', icon: 'IconPeople', color: 'blue', url: '/people' },
        { name: 'Handbook', icon: 'IconBook', color: 'seagreen', url: '/handbook', children: handbookSidebar },
        {
            name: 'Blog',
            icon: 'IconNewspaper',
            color: 'yellow',
            url: 'https://posthog.com/blog',
            children: [
                {
                    name: 'Blog',
                    url: '/blog',
                },
                {
                    name: 'CEO diaries',
                    url: '/blog/categories/ceo-diaries',
                },
                {
                    name: 'Engineering',
                    url: '/blog/categories/engineering',
                },
                {
                    name: 'Inside PostHog',
                    url: '/blog/categories/inside-posthog',
                },
                {
                    name: 'Newsletter',
                    url: '/blog/categories/newsletter',
                },
                {
                    name: 'PostHog news',
                    url: '/blog/categories/posthog-news',
                },
                {
                    name: 'Product growth',
                    url: '/blog/categories/product-growth',
                },
                {
                    name: 'Startups',
                    url: '/blog/categories/startups',
                },
                {
                    name: 'Using PostHog',
                    url: '/blog/categories/using-posthog',
                },
            ],
        },
        { name: 'Careers', icon: 'IconLaptop', color: 'purple', url: '/careers' },
    ],
}

export const docsMenu = {
    name: 'Docs',
    url: '/docs',
    icon: 'IconBook',
    children: [
        {
            name: 'Product OS',
            icon: 'IconStack',
            color: 'salmon',
            url: '/docs/product-os',
            description: 'The PostHog platform for building and improving your product',
            children: [
                {
                    name: 'Docs',
                },
                {
                    name: 'Overview',
                    url: '/docs',
                    icon: 'IconInfo',
                },
                {
                    name: 'Integration',
                },
                {
                    name: 'Install and configure',
                    url: '/docs/getting-started/install',
                    icon: 'IconWrench',
                    children: [
                        {
                            name: 'Install PostHog',
                            url: '/docs/getting-started/install?tab=snippet',
                        },
                        {
                            name: 'Send events',
                            url: '/docs/getting-started/send-events',
                        },
                        {
                            name: 'Identify users',
                            url: '/docs/getting-started/identify-users',
                        },
                        {
                            name: 'Deploy a proxy',
                            url: '/docs/advanced/proxy',
                        },
                        {
                            name: 'Next steps',
                            url: '/docs/getting-started/next-steps',
                        },
                    ],
                },
                {
                    name: 'SDKs',
                    url: '/docs/libraries',
                    icon: 'IconBox',
                    children: [
                        {
                            name: 'SDK comparison',
                            url: '/docs/libraries',
                        },
                        {
                            name: 'JavaScript Web',
                            url: '/docs/libraries/js',
                            badge: {
                                title: 'Popular',
                                className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                            children: [
                                {
                                    name: 'Setup',
                                    url: '/docs/libraries/js',
                                },
                                {
                                    name: 'Usage',
                                    url: '/docs/libraries/js/usage',
                                },
                                {
                                    name: 'Configuration',
                                    url: '/docs/libraries/js/config',
                                },
                                {
                                    name: 'Persistence',
                                    url: '/docs/libraries/js/persistence',
                                },
                                {
                                    name: 'Types',
                                    url: '/docs/libraries/js/types',
                                },
                                {
                                    name: 'Reference',
                                    url: '/docs/references/posthog-js',
                                },
                            ],
                        },
                        {
                            name: 'Android',
                            url: '/docs/libraries/android',
                            badge: {
                                title: 'Popular',
                                className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                        },
                        {
                            name: 'Capacitor',
                            url: '/docs/libraries/capacitor',
                            badge: {
                                title: '3rd party',
                            },
                        },
                        {
                            name: 'Elixir',
                            url: '/docs/libraries/elixir',
                        },
                        {
                            name: 'Flutter',
                            url: '/docs/libraries/flutter',
                        },
                        {
                            name: 'Go',
                            url: '/docs/libraries/go',
                        },
                        {
                            name: 'iOS',
                            url: '/docs/libraries/ios',
                            badge: {
                                title: 'Popular',
                                className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                            children: [
                                {
                                    name: 'Installation',
                                    url: '/docs/libraries/ios',
                                },
                                {
                                    name: 'Usage',
                                    url: '/docs/libraries/ios/usage',
                                },
                                {
                                    name: 'Configuration',
                                    url: '/docs/libraries/ios/configuration',
                                },
                            ],
                        },
                        {
                            name: 'Java',
                            url: '/docs/libraries/java',
                            badge: {
                                title: 'Beta',
                                className: '!bg-orange/10 !text-orange !dark:text-white !dark:bg-orange/50',
                            },
                        },
                        {
                            name: 'Node.js',
                            url: '/docs/libraries/node',
                            children: [
                                {
                                    name: 'Setup and usage',
                                    url: '/docs/libraries/node',
                                },
                                {
                                    name: 'Reference',
                                    url: '/docs/references/posthog-node',
                                },
                            ],
                        },
                        {
                            name: 'PHP',
                            url: '/docs/libraries/php',
                        },
                        {
                            name: 'Python',
                            url: '/docs/libraries/python',
                            children: [
                                {
                                    name: 'Setup and usage',
                                    url: '/docs/libraries/python',
                                },
                                {
                                    name: 'Reference',
                                    url: '/docs/references/posthog-python',
                                },
                            ],
                        },
                        {
                            name: 'React',
                            url: '/docs/libraries/react',
                            badge: {
                                title: 'Popular',
                                className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                        },
                        {
                            name: 'React Native',
                            url: '/docs/libraries/react-native',
                            badge: {
                                title: 'Popular',
                                className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                            children: [
                                {
                                    name: 'Setup and usage',
                                    url: '/docs/libraries/react-native',
                                },
                                {
                                    name: 'Reference',
                                    url: '/docs/references/posthog-react-native',
                                },
                            ],
                        },
                        {
                            name: 'Ruby',
                            url: '/docs/libraries/ruby',
                        },
                        {
                            name: 'Rust',
                            url: '/docs/libraries/rust',
                        },
                        {
                            name: 'Unity',
                            url: '/docs/libraries/unity',
                            badge: {
                                title: 'Beta',
                                className: '!bg-orange/10 !text-orange !dark:text-white !dark:bg-orange/50',
                            },
                        },
                        {
                            name: 'C#/.NET',
                            url: '/docs/libraries/dotnet',
                        },
                    ],
                },
                {
                    name: 'Frameworks',
                    url: '/docs/frameworks',
                    icon: 'IconBook',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/frameworks',
                        },
                        {
                            name: 'Angular',
                            url: '/docs/libraries/angular',
                        },
                        {
                            name: 'Astro',
                            url: '/docs/libraries/astro',
                        },
                        {
                            name: 'Cloudflare Workers',
                            url: '/docs/libraries/cloudflare-workers',
                        },
                        {
                            name: 'Django',
                            url: '/docs/libraries/django',
                        },
                        {
                            name: 'Docusaurus',
                            url: '/docs/libraries/docusaurus',
                        },
                        {
                            name: 'Flask',
                            url: '/docs/libraries/flask',
                        },
                        {
                            name: 'Gatsby',
                            url: '/docs/libraries/gatsby',
                        },
                        {
                            name: 'Hono',
                            url: '/docs/libraries/hono',
                        },
                        {
                            name: 'Laravel',
                            url: '/docs/libraries/laravel',
                        },
                        {
                            name: 'Next.js',
                            url: '/docs/libraries/next-js',
                        },
                        {
                            name: 'Nuxt.js',
                            url: '/docs/libraries/nuxt-js',
                            children: [
                                {
                                    name: '4.x and 3.7+',
                                    url: '/docs/libraries/nuxt-js',
                                },
                                {
                                    name: '3.0 to 3.6',
                                    url: '/docs/libraries/nuxt-js-3-6',
                                },
                                {
                                    name: '2.16 and below',
                                    url: '/docs/libraries/nuxt-js-2',
                                },
                            ],
                        },
                        {
                            name: 'Phoenix',
                            url: '/docs/libraries/phoenix',
                        },
                        {
                            name: 'React Router',
                            url: '/docs/libraries/react-router',
                            children: [
                                {
                                    name: 'Overview',
                                    url: '/docs/libraries/react-router',
                                },
                                {
                                    name: 'V7 Framework mode',
                                    url: '/docs/libraries/react-router/react-router-v7-framework-mode',
                                },
                                {
                                    name: 'V7 Declarative mode',
                                    url: '/docs/libraries/react-router/react-router-v7-declarative-mode',
                                },
                                {
                                    name: 'V7 Data mode',
                                    url: '/docs/libraries/react-router/react-router-v7-data-mode',
                                },
                                {
                                    name: 'V6',
                                    url: '/docs/libraries/react-router/react-router-v6',
                                },
                            ],
                        },
                        {
                            name: 'Remix',
                            url: '/docs/libraries/remix',
                        },
                        {
                            name: 'Svelte',
                            url: '/docs/libraries/svelte',
                        },
                        {
                            name: 'TanStack Start',
                            url: '/docs/libraries/tanstack-start',
                        },
                        {
                            name: 'Vue.js',
                            url: '/docs/libraries/vue-js',
                        },
                    ],
                },
                {
                    name: 'Services',
                    url: '/docs/services',
                    icon: 'IconApps',
                    children: [
                        {
                            name: 'Bubble',
                            url: '/docs/libraries/bubble',
                        },
                        {
                            name: 'Framer',
                            url: '/docs/libraries/framer',
                        },
                        {
                            name: 'Google Tag Manager',
                            url: '/docs/libraries/google-tag-manager',
                        },
                        {
                            name: 'MoEngage',
                            url: '/docs/libraries/moengage',
                        },
                        {
                            name: 'n8n',
                            url: '/docs/libraries/n8n',
                        },
                        {
                            name: 'Retool',
                            url: '/docs/libraries/retool',
                        },
                        {
                            name: 'RudderStack',
                            url: '/docs/libraries/rudderstack',
                        },
                        {
                            name: 'Segment',
                            url: '/docs/libraries/segment',
                        },
                        {
                            name: 'Shopify',
                            url: '/docs/libraries/shopify',
                        },
                        {
                            name: 'Slack',
                            url: '/docs/libraries/slack',
                        },
                        {
                            name: 'Vercel',
                            url: '/docs/libraries/vercel',
                        },
                        {
                            name: 'Webflow',
                            url: '/docs/libraries/webflow',
                        },
                        {
                            name: 'WooCommerce',
                            url: '/docs/libraries/woocommerce',
                        },
                        {
                            name: 'WordPress',
                            url: '/docs/libraries/wordpress',
                        },
                        {
                            name: 'Zapier',
                            url: '/docs/libraries/zapier',
                        },
                    ],
                },
                {
                    name: 'API',
                    url: '/docs/api',
                    icon: 'IconBrackets',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/api',
                        },
                        {
                            name: 'Popular',
                        },
                        {
                            name: 'Capture',
                            url: '/docs/api/capture',
                        },
                        {
                            name: 'Flags',
                            url: '/docs/api/flags',
                        },
                        {
                            name: 'Queries',
                            url: '/docs/api/queries',
                        },
                        {
                            name: 'More endpoints',
                        },
                        {
                            name: 'Actions',
                            url: '/docs/api/actions',
                        },
                        {
                            name: 'Alerts',
                            url: '/docs/api/alerts',
                        },
                        {
                            name: 'Activity log',
                            url: '/docs/api/activity-log',
                        },
                        {
                            name: 'Annotations',
                            url: '/docs/api/annotations',
                        },
                        {
                            name: 'Batch exports',
                            url: '/docs/api/batch-exports',
                        },
                        {
                            name: 'Cohorts',
                            url: '/docs/api/cohorts',
                        },
                        {
                            name: 'Dashboards',
                            url: '/docs/api/dashboards',
                        },
                        {
                            name: 'Dashboard templates',
                            url: '/docs/api/dashboard-templates',
                        },
                        {
                            name: 'Early access features',
                            url: '/docs/api/early-access-feature',
                        },
                        {
                            name: 'Endpoints',
                            url: '/docs/api/endpoints',
                        },
                        {
                            name: 'Environments',
                            url: '/docs/api/environments',
                        },
                        {
                            name: 'Event definitions',
                            url: '/docs/api/event-definitions',
                        },
                        {
                            name: 'Events',
                            url: '/docs/api/events',
                        },
                        {
                            name: 'Experiments',
                            url: '/docs/api/experiments',
                        },
                        {
                            name: 'Feature Flags',
                            url: '/docs/api/feature-flags',
                        },
                        {
                            name: 'Groups',
                            url: '/docs/api/groups',
                        },
                        {
                            name: 'Groups types',
                            url: '/docs/api/groups-types',
                        },
                        {
                            name: 'Hog functions',
                            url: '/docs/api/hog-functions',
                        },
                        {
                            name: 'Insights',
                            url: '/docs/api/insights',
                        },
                        {
                            name: 'Invites',
                            url: '/docs/api/invites',
                        },
                        {
                            name: 'Members',
                            url: '/docs/api/members',
                        },
                        {
                            name: 'Notebooks',
                            url: '/docs/api/notebooks',
                        },
                        {
                            name: 'Organizations',
                            url: '/docs/api/organizations',
                        },
                        {
                            name: 'Persons',
                            url: '/docs/api/persons',
                        },
                        {
                            name: 'Projects',
                            url: '/docs/api/projects',
                        },
                        {
                            name: 'Property definitions',
                            url: '/docs/api/property-definitions',
                        },
                        {
                            name: 'Query',
                            url: '/docs/api/query',
                        },
                        {
                            name: 'Roles',
                            url: '/docs/api/roles',
                        },
                        {
                            name: 'Session recordings',
                            url: '/docs/api/session-recordings',
                        },
                        {
                            name: 'Session recording playlists',
                            url: '/docs/api/session-recording-playlists',
                        },
                        {
                            name: 'Sessions',
                            url: '/docs/api/sessions',
                        },
                        {
                            name: 'Subscriptions',
                            url: '/docs/api/subscriptions',
                        },
                        {
                            name: 'Surveys',
                            url: '/docs/api/surveys',
                        },
                        {
                            name: 'Product Tours',
                            url: '/docs/api/product-tours',
                        },
                        {
                            name: 'Users',
                            url: '/docs/api/users',
                        },
                        {
                            name: 'Web Analytics',
                            url: '/docs/api/web-analytics',
                        },
                        {
                            name: 'Data model',
                            url: '/docs/how-posthog-works/data-model',
                        },
                    ],
                },
                {
                    name: 'Advanced',
                    url: '/docs/advanced/cdp',
                    icon: 'IconAdvanced',
                    children: [
                        {
                            name: 'Using a Customer Data Platform',
                            url: '/docs/advanced/cdp',
                        },
                        {
                            name: 'Using Content Security Policies',
                            url: '/docs/advanced/content-security-policy',
                        },
                        {
                            name: 'Browser extensions',
                            url: '/docs/advanced/browser-extension',
                        },
                        {
                            name: 'Enabling beta features',
                            url: '/docs/getting-started/enable-betas',
                        },
                        {
                            name: 'Data import and export',
                            url: '/docs/getting-started/data-import-export',
                        },
                        {
                            name: 'Ingestion warnings',
                            url: '/docs/data/ingestion-warnings',
                        },
                    ],
                },
                {
                    name: 'AI engineering',
                    url: '/docs/ai-engineering',
                    icon: 'IconLlmPromptEvaluation',
                    color: 'red',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/ai-engineering',
                        },
                        {
                            name: 'AI wizard',
                            url: '/docs/ai-engineering/ai-wizard',
                        },
                        {
                            name: 'Model Context Protocol (MCP)',
                            url: '/docs/model-context-protocol',
                        },
                        {
                            name: 'LLM Analytics ↗',
                            url: 'https://posthog.com/docs/llm-analytics',
                        },
                        {
                            name: 'Markdown and llms.txt',
                            url: '/docs/ai-engineering/markdown-llms-txt',
                        },
                    ],
                },
                {
                    name: 'Winning with PostHog',
                },
                {
                    name: 'Getting HogPilled',
                    url: '/docs/new-to-posthog/getting-hogpilled',
                    icon: 'IconCrown',
                },
                {
                    name: 'Measuring activation',
                    url: '/docs/new-to-posthog/activation',
                    icon: 'IconLightBulb',
                },
                {
                    name: 'Tracking retention',
                    url: '/docs/new-to-posthog/retention',
                    icon: 'IconLineGraph',
                },
                {
                    name: 'Capturing revenue',
                    url: '/docs/new-to-posthog/revenue',
                    icon: 'IconHandMoney',
                },
                {
                    name: 'Switching to PostHog',
                    icon: 'IconLeave',
                    url: '/docs/new-to-posthog/switch-guide/switching-to-posthog',
                    children: [
                        {
                            name: 'Convincing teammates',
                            url: '/docs/new-to-posthog/switch-guide/switching-to-posthog',
                        },
                        {
                            name: 'Planning your pilot',
                            url: '/docs/new-to-posthog/switch-guide/planning-your-pilot',
                        },
                        {
                            name: 'What to expect when migrating',
                            url: '/docs/new-to-posthog/switch-guide/migration-planning',
                        },
                    ],
                },
                {
                    name: 'PostHog explained',
                },
                {
                    name: 'What is Product OS?',
                    url: '/docs/product-os',
                    icon: 'IconInfo',
                },
                {
                    name: 'Data types',
                    url: '/docs/new-to-posthog/understand-posthog',
                    icon: 'IconHardDrive',
                    children: [
                        {
                            name: 'Your data in PostHog',
                            url: '/docs/new-to-posthog/understand-posthog',
                        },
                        {
                            name: 'Events',
                            url: '/docs/data/events',
                        },
                        {
                            name: 'Anonymous vs identified events',
                            url: '/docs/data/anonymous-vs-identified-events',
                        },
                        {
                            name: 'Actions',
                            url: '/docs/data/actions',
                        },
                        {
                            name: 'People',
                            url: '/docs/data/persons',
                        },
                        {
                            name: 'Cohorts',
                            url: '/docs/data/cohorts',
                        },
                        {
                            name: 'Sessions',
                            url: '/docs/data/sessions',
                        },
                        {
                            name: 'Data management',
                            url: '/docs/data',
                        },
                        {
                            name: 'Properties',
                            url: '/docs/data/event-spec/ecommerce-events',
                            children: [
                                {
                                    name: 'Ecommerce events spec',
                                    url: '/docs/data/event-spec/ecommerce-events',
                                },
                                {
                                    name: 'Channel type',
                                    url: '/docs/data/channel-type',
                                },
                                {
                                    name: 'Timestamps',
                                    url: '/docs/data/timestamps',
                                },
                                {
                                    name: 'UTM segmentation',
                                    url: '/docs/data/utm-segmentation',
                                },
                            ],
                        },
                        {
                            name: 'Query log',
                            url: '/docs/data/query-log',
                        },
                        {
                            name: 'Annotations',
                            url: '/docs/data/annotations',
                        },
                        {
                            name: 'Replay comments',
                            url: '/docs/data/comments',
                        },
                    ],
                },
                {
                    name: 'Tools and features',
                    url: '/docs/toolbar',
                    icon: 'IconToolbar',
                    children: [
                        {
                            name: 'Toolbar',
                            url: '/docs/toolbar',
                        },
                        {
                            name: 'Heatmaps',
                            url: '/docs/toolbar/heatmaps',
                        },

                        {
                            name: 'Notebooks',
                            url: '/docs/notebooks',
                        },
                        {
                            name: 'Activity',
                            url: '/docs/activity',
                        },
                        {
                            name: 'SDK doctor',
                            url: '/docs/sdk-doctor',
                        },
                        {
                            name: 'Organizations',
                            url: '/docs/settings/organizations',
                        },
                        {
                            name: 'Projects',
                            url: '/docs/settings/projects',
                        },
                        {
                            name: 'Hog',
                            url: '/docs/hog',
                        },
                        {
                            name: 'SQL access',
                            url: '/docs/sql',
                            children: [
                                {
                                    name: 'Overview',
                                    url: '/docs/sql',
                                },
                                {
                                    name: 'SQL expressions',
                                    url: '/docs/sql/expressions',
                                },
                                {
                                    name: 'Supported functions',
                                    url: '/docs/sql/clickhouse-functions',
                                },
                                {
                                    name: 'Supported aggregations',
                                    url: '/docs/sql/aggregations',
                                },
                                {
                                    name: 'Optimizing SQL queries',
                                    url: '/docs/sql/optimizing-queries',
                                },
                                {
                                    name: 'Tutorials',
                                    url: '/docs/sql/tutorials',
                                },
                            ],
                        },
                        {
                            name: 'Access control',
                            url: '/docs/settings/access-control',
                        },
                        {
                            name: 'Activity logs',
                            url: '/docs/settings/activity-logs',
                        },
                        {
                            name: 'Approvals',
                            url: '/docs/settings/approvals',
                        },
                        {
                            name: 'SSO, SAML, & SCIM',
                            url: '/docs/settings/sso',
                        },
                        {
                            name: 'Command palette',
                            url: '/docs/cmd-k',
                        },
                        {
                            name: 'Account settings',
                            url: '/docs/settings/account-settings',
                        },
                        {
                            name: 'Site Apps',
                            url: '/docs/site-apps',
                            children: [
                                {
                                    name: 'Overview',
                                    url: '/docs/site-apps',
                                },
                                {
                                    name: 'Notification Bar',
                                    url: '/docs/site-apps/notification-bar',
                                },
                                {
                                    name: 'Pineapple Mode',
                                    url: '/docs/site-apps/pineapple-mode',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'Resources',
                },
                {
                    name: 'Self-host',
                    url: '',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/self-host',
                        },
                        {
                            name: 'Configure',
                            url: '',
                            children: [
                                {
                                    name: 'Instance settings',
                                    url: '/docs/self-host/configure/instance-settings',
                                },
                                {
                                    name: 'Environment variables',
                                    url: '/docs/self-host/configure/environment-variables',
                                },
                                {
                                    name: 'Securing PostHog',
                                    url: '/docs/self-host/configure/securing-posthog',
                                },
                                {
                                    name: 'Running behind a proxy',
                                    url: '/docs/self-host/configure/running-behind-proxy',
                                },
                                {
                                    name: 'Configuring email',
                                    url: '/docs/self-host/configure/email',
                                },
                                {
                                    name: 'Configuring Slack',
                                    url: '/docs/self-host/configure/slack',
                                },
                                {
                                    name: 'Data egress',
                                    url: '/docs/self-host/configure/egress',
                                },
                            ],
                        },
                        {
                            name: 'Troubleshooting and FAQs',
                            url: '/docs/self-host/deploy/troubleshooting',
                        },
                        {
                            name: 'Support',
                            url: '/docs/self-host/open-source/support',
                        },
                        {
                            name: 'Disclaimer',
                            url: '/docs/self-host/open-source/disclaimer',
                        },
                    ],
                },
                {
                    name: 'Migrate',
                    url: '/docs/migrate',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/migrate',
                        },
                        {
                            name: 'Managed migrations',
                            url: '/docs/migrate/managed-migrations',
                        },
                        {
                            name: 'Migrate to PostHog Cloud',
                            url: '/docs/migrate/migrate-to-cloud',
                        },
                        {
                            name: 'Migrate from Amplitude',
                            url: '/docs/migrate/migrate-from-amplitude',
                        },
                        {
                            name: 'Migrate from Google Analytics',
                            url: '/docs/migrate/google-analytics',
                        },
                        {
                            name: 'Migrate from Heap',
                            url: '/docs/migrate/heap',
                        },
                        {
                            name: 'Migrate from LaunchDarkly',
                            url: '/docs/migrate/launchdarkly',
                        },
                        {
                            name: 'Migrate from Matomo',
                            url: '/docs/migrate/matomo',
                        },
                        {
                            name: 'Migrate from Mixpanel',
                            url: '/docs/migrate/mixpanel',
                        },
                        {
                            name: 'Migrate from Pendo',
                            url: '/docs/migrate/pendo',
                        },
                        {
                            name: 'Migrate from Plausible',
                            url: '/docs/migrate/plausible',
                        },
                        {
                            name: 'Migrate from Statsig',
                            url: '/docs/migrate/statsig',
                        },
                    ],
                },
                {
                    name: 'Reverse proxy',
                    url: '/docs/advanced/proxy',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/advanced/proxy',
                        },
                        {
                            name: 'Managed reverse proxy',
                            url: '/docs/advanced/proxy/managed-reverse-proxy',
                        },
                        {
                            name: 'AWS CloudFront',
                            url: '/docs/advanced/proxy/cloudfront',
                        },
                        {
                            name: 'Caddy',
                            url: '/docs/advanced/proxy/caddy',
                        },
                        {
                            name: 'Cloudflare',
                            url: '/docs/advanced/proxy/cloudflare',
                        },
                        {
                            name: 'Kubernetes',
                            url: '/docs/advanced/proxy/kubernetes-ingress-controller',
                        },
                        {
                            name: 'Netlify',
                            url: '/docs/advanced/proxy/netlify',
                        },
                        {
                            name: 'Next.js rewrites',
                            url: '/docs/advanced/proxy/nextjs',
                        },
                        {
                            name: 'Next.js proxy file',
                            url: '/docs/advanced/proxy/nextjs-middleware',
                        },
                        {
                            name: 'nginx',
                            url: '/docs/advanced/proxy/nginx',
                        },
                        {
                            name: 'Node',
                            url: '/docs/advanced/proxy/node',
                        },
                        {
                            name: 'Nuxt',
                            url: '/docs/advanced/proxy/nuxt',
                        },
                        {
                            name: 'Pomerium',
                            url: '/docs/advanced/proxy/pomerium',
                        },
                        {
                            name: 'Railway',
                            url: '/docs/advanced/proxy/railway',
                        },
                        {
                            name: 'Remix',
                            url: '/docs/advanced/proxy/remix',
                        },
                        {
                            name: 'SvelteKit',
                            url: '/docs/advanced/proxy/sveltekit',
                        },
                        {
                            name: 'Vercel',
                            url: '/docs/advanced/proxy/vercel',
                        },
                        {
                            name: 'Reference',
                            url: '/docs/advanced/proxy/proxy-reference',
                        },
                    ],
                },
                {
                    name: 'Billing',
                    url: '',
                    children: [
                        {
                            name: 'Billing limits and alerts',
                            url: '/docs/billing/limits-alerts',
                        },
                        {
                            name: 'Estimating usage and costs',
                            url: '/docs/billing/estimating-usage-costs',
                        },
                        {
                            name: 'Pre-paid plans',
                            url: '/docs/billing/pre-paid-plans',
                        },
                        {
                            name: 'Spike detection',
                            url: '/docs/billing/spike-detection',
                        },
                        {
                            name: 'Common questions about billing',
                            url: '/docs/billing/common-questions',
                        },
                    ],
                },
                {
                    name: 'Privacy',
                    url: '',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/privacy',
                        },
                        {
                            name: 'Data collection',
                            url: '/docs/privacy/data-collection',
                        },
                        {
                            name: 'Data storage',
                            url: '/docs/privacy/data-storage',
                        },
                        {
                            name: 'GDPR compliance',
                            url: '/docs/privacy/gdpr-compliance',
                        },

                        {
                            name: 'HIPAA guidance',
                            url: '/docs/privacy/hipaa-compliance',
                        },
                        {
                            name: 'CCPA guidance',
                            url: '/docs/privacy/ccpa-compliance',
                        },
                        {
                            name: 'SOC 2',
                            url: '/docs/privacy/soc2',
                        },
                        {
                            name: 'Ad blockers',
                            url: '/docs/privacy/ad-blockers',
                        },
                    ],
                },
                {
                    name: 'Contribute',
                    url: '/docs/contribute',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/contribute',
                        },
                        {
                            name: 'Code of conduct',
                            url: '/docs/contribute/code-of-conduct',
                        },
                        {
                            name: 'Recognizing contributions',
                            url: '/docs/contribute/recognizing-contributions',
                        },
                        {
                            name: 'Badge',
                            url: '/docs/contribute/badge',
                        },
                    ],
                },
                {
                    name: 'How PostHog works',
                    url: '',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/how-posthog-works',
                        },
                        {
                            name: 'Data model: fields',
                            url: '/docs/how-posthog-works/data-model',
                        },
                        {
                            name: 'Ingestion pipeline',
                            url: '/docs/how-posthog-works/ingestion-pipeline',
                        },
                        {
                            name: 'ClickHouse',
                            url: '/docs/how-posthog-works/clickhouse',
                        },
                        {
                            name: 'Querying data',
                            url: '/docs/how-posthog-works/queries',
                        },
                        {
                            name: 'Session Replay',
                            url: '/docs/how-posthog-works/recordings-ingestion',
                        },
                    ],
                },
                {
                    name: 'Support options',
                    url: '/docs/support-options',
                },
                {
                    name: 'Glossary',
                    url: '/docs/glossary',
                },
            ],
        },
        {
            name: 'Product Analytics',
            icon: 'IconGraph',
            color: 'blue',
            url: '/docs/product-analytics',
            description: 'Funnels, graphs, user paths, correlation analysis, retention, stickiness, lifecycle, SQL',
            children: [
                {
                    name: 'Product Analytics',
                },
                {
                    name: 'Overview',
                    url: '/docs/product-analytics',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Installation',
                    url: '/docs/product-analytics/installation',
                    icon: 'IconBook',
                    color: 'blue',
                    featured: true,
                    children: [
                        { name: 'Overview', url: '/docs/product-analytics/installation' },
                        { name: 'AI wizard', url: '/docs/product-analytics/installation/ai-wizard' },
                        { name: 'Web', url: '/docs/product-analytics/installation/web' },
                        { name: 'React', url: '/docs/product-analytics/installation/react' },
                        { name: 'Node.js', url: '/docs/product-analytics/installation/nodejs' },
                        { name: 'Python', url: '/docs/product-analytics/installation/python' },
                        { name: 'PHP', url: '/docs/product-analytics/installation/php' },
                        { name: 'Ruby', url: '/docs/product-analytics/installation/ruby' },
                        { name: 'Go', url: '/docs/product-analytics/installation/go' },
                        { name: 'React Native', url: '/docs/product-analytics/installation/react-native' },
                        { name: 'Android', url: '/docs/product-analytics/installation/android' },
                        { name: 'iOS', url: '/docs/product-analytics/installation/ios' },
                        { name: 'Java', url: '/docs/product-analytics/installation/java' },
                        { name: 'Rust', url: '/docs/product-analytics/installation/rust' },
                        { name: 'Elixir', url: '/docs/product-analytics/installation/elixir' },
                        { name: 'Flutter', url: '/docs/product-analytics/installation/flutter' },
                        { name: '.NET', url: '/docs/product-analytics/installation/dotnet' },
                        { name: 'API', url: '/docs/product-analytics/installation/api' },
                    ],
                },
                {
                    name: 'Capturing events',
                    url: '/docs/product-analytics/capture-events',
                    icon: 'IconSend',
                    color: 'orange',
                },
                {
                    name: 'Schema management',
                    url: '/docs/product-analytics/schema-management',
                    icon: 'IconDatabase',
                    color: 'blue',
                },
                {
                    name: 'Creating insights',
                    url: '/docs/product-analytics/insights',
                    icon: 'IconGraph',
                    color: 'red',
                },
                {
                    name: 'Identifying users',
                    url: '/docs/product-analytics/identify',
                    icon: 'IconPerson',
                    color: 'purple',
                },
                {
                    name: 'Setting person properties',
                    url: '/docs/product-analytics/person-properties',
                    icon: 'IconProfile',
                    color: 'seagreen',
                    featured: true,
                },
                {
                    name: 'Group analytics',
                    url: '/docs/product-analytics/group-analytics',
                    icon: 'IconPeople',
                    color: 'orange',
                },
                {
                    name: 'Best practices',
                    url: '/docs/product-analytics/best-practices',
                    icon: 'IconStar',
                    color: 'red',
                },
                {
                    name: 'Troubleshooting',
                    url: '/docs/product-analytics/troubleshooting',
                    icon: 'IconQuestion',
                    color: 'blue',
                },
                {
                    name: 'Tutorials and guides',
                    url: '/docs/product-analytics/tutorials',
                    icon: 'IconGraduationCap',
                    color: 'red',
                    featured: true,
                },
                {
                    name: 'Cutting costs',
                    url: '/docs/product-analytics/cutting-costs',
                    icon: 'IconPiggyBank',
                    color: 'purple',
                },
                {
                    name: 'Changelog',
                    url: '/docs/product-analytics/changelog',
                    icon: 'IconRocket',
                    color: 'purple',
                },
                {
                    type: 'divider',
                },
                {
                    name: 'Analysis views',
                },
                {
                    name: 'Trends',
                    url: '/docs/product-analytics/trends/overview',
                    icon: 'IconGraph',
                    color: 'blue',
                    children: [
                        {
                            name: 'Getting started',
                            url: '/docs/product-analytics/trends/overview',
                        },
                        {
                            name: 'Charts',
                            url: '/docs/product-analytics/trends/charts',
                        },
                        {
                            name: 'Filters',
                            url: '/docs/product-analytics/trends/filters',
                        },
                        {
                            name: 'Aggregations',
                            url: '/docs/product-analytics/trends/aggregations',
                        },
                        {
                            name: 'Breakdowns',
                            url: '/docs/product-analytics/trends/breakdowns',
                        },
                        {
                            name: 'Formulas',
                            url: '/docs/product-analytics/trends/formulas',
                        },
                        {
                            name: 'Statistical analysis',
                            url: '/docs/product-analytics/trends/statistical-analysis',
                        },
                        {
                            name: 'Tips',
                            url: '/docs/product-analytics/trends/tips',
                        },
                    ],
                },
                {
                    name: 'Funnels',
                    url: '/docs/product-analytics/funnels',
                    icon: 'IconFunnels',
                    color: 'yellow',
                },
                {
                    name: 'Dashboards',
                    url: '/docs/product-analytics/dashboards',
                    icon: 'IconDashboard',
                    color: 'purple',
                },
                {
                    name: 'User paths',
                    url: '/docs/product-analytics/paths',
                    icon: 'IconUserPaths',
                    color: 'seagreen',
                },
                {
                    name: 'Stickiness',
                    url: '/docs/product-analytics/stickiness',
                    icon: 'IconStickiness',
                    color: 'red',
                },
                {
                    name: 'Correlation analysis',
                    url: '/docs/product-analytics/correlation',
                    color: 'blue',
                    icon: 'IconArrowUpRight',
                },
                {
                    name: 'Retention',
                    url: '/docs/product-analytics/retention',
                    icon: 'IconRetention',
                    color: 'seagreen',
                },
                {
                    name: 'Lifecycle',
                    url: '/docs/product-analytics/lifecycle',
                    icon: 'IconLifecycle',
                    color: 'yellow',
                },
                {
                    name: 'SQL',
                    url: '/docs/data-warehouse/sql',
                    icon: 'IconHogQL',
                    color: 'purple',
                },
                {
                    name: 'Tools',
                },
                {
                    name: 'LLM insights',
                    url: 'https://posthog.com/docs/llm-analytics',
                    icon: 'IconAIText',
                    color: 'yellow',
                },
                {
                    name: 'Autocapture',
                    url: '/docs/product-analytics/autocapture',
                    icon: 'IconBolt',
                    color: 'red',
                },
                {
                    name: 'Privacy controls',
                    url: '/docs/product-analytics/privacy',
                    icon: 'IconShield',
                    color: 'orange',
                },
                {
                    name: 'Data management',
                    url: '/docs/data',
                    icon: 'IconDatabase',
                    color: 'blue',
                },
                {
                    name: 'Sharing & embedding',
                    url: '/docs/product-analytics/sharing',
                    icon: 'IconShare',
                    color: 'purple',
                },
                {
                    name: 'Subscriptions',
                    url: '/docs/product-analytics/subscriptions',
                    icon: 'IconBell',
                    color: 'red',
                },
                {
                    name: 'Alerts',
                    url: '/docs/alerts',
                    icon: 'IconBell',
                    color: 'orange',
                },
                {
                    name: 'Sampling',
                    url: '/docs/product-analytics/sampling',
                    icon: 'IconSampling',
                    color: 'purple',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Color themes',
                    url: '/docs/product-analytics/color-themes',
                    icon: 'IconPalette',
                    color: 'seagreen',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
            ],
        },
        {
            name: 'Web Analytics',
            icon: 'IconPieChart',
            color: '[#36C46F]',
            url: '/docs/web-analytics',
            description: 'Monitor your website traffic. Built for people who really liked GA3...',
            children: [
                {
                    name: 'Web Analytics',
                },
                {
                    name: 'Overview',
                    url: '/docs/web-analytics',
                    icon: 'IconHome',
                    color: 'seagreen',
                    featured: true,
                },
                {
                    name: 'Installation',
                    url: '/docs/web-analytics/installation',
                    icon: 'IconBook',
                    color: 'blue',
                    children: [
                        { name: 'Overview', url: '/docs/web-analytics/installation' },
                        { name: 'AI wizard', url: '/docs/web-analytics/installation/ai-wizard' },
                        { name: 'Web', url: '/docs/web-analytics/installation/web' },
                        { name: 'HTML snippet', url: '/docs/web-analytics/installation/html-snippet' },
                        { name: 'React', url: '/docs/web-analytics/installation/react' },
                        { name: 'Next.js', url: '/docs/web-analytics/installation/nextjs' },
                        { name: 'Vue', url: '/docs/web-analytics/installation/vue' },
                        { name: 'Nuxt', url: '/docs/web-analytics/installation/nuxt' },
                        { name: 'Angular', url: '/docs/web-analytics/installation/angular' },
                        { name: 'Svelte', url: '/docs/web-analytics/installation/svelte' },
                        { name: 'Astro', url: '/docs/web-analytics/installation/astro' },
                        { name: 'Remix', url: '/docs/web-analytics/installation/remix' },
                        { name: 'TanStack Start', url: '/docs/web-analytics/installation/tanstack' },
                        { name: 'iOS', url: '/docs/web-analytics/installation/ios' },
                        { name: 'Android', url: '/docs/web-analytics/installation/android' },
                        { name: 'React Native', url: '/docs/web-analytics/installation/react-native' },
                        { name: 'Flutter', url: '/docs/web-analytics/installation/flutter' },
                        { name: 'GTM', url: '/docs/web-analytics/installation/gtm' },
                        { name: 'Shopify', url: '/docs/web-analytics/installation/shopify' },
                        { name: 'WordPress', url: '/docs/web-analytics/installation/wordpress' },
                        { name: 'Webflow', url: '/docs/web-analytics/installation/webflow' },
                        { name: 'Framer', url: '/docs/web-analytics/installation/framer' },
                        { name: 'Bubble', url: '/docs/web-analytics/installation/bubble' },
                        { name: 'Docusaurus', url: '/docs/web-analytics/installation/docusaurus' },
                        { name: 'Phoenix', url: '/docs/web-analytics/installation/phoenix' },
                    ],
                },
                {
                    name: 'Getting started',
                    url: '/docs/web-analytics/getting-started',
                    icon: 'IconGraduationCap',
                    color: 'salmon',
                },
                {
                    name: 'Dashboard',
                    url: '/docs/web-analytics/dashboard',
                    icon: 'IconDashboard',
                    color: 'orange',
                },
                {
                    name: 'Conversion goals',
                    url: '/docs/web-analytics/conversion-goals',
                    icon: 'IconFunnels',
                    color: 'purple',
                },
                {
                    name: 'Web vs Product Analytics',
                    url: '/docs/web-analytics/web-vs-product-analytics',
                    icon: 'IconGraph',
                    color: 'red',
                },
                {
                    name: 'Web vitals',
                    url: '/docs/web-analytics/web-vitals',
                    icon: 'IconWrench',
                    color: 'seagreen',
                },
                {
                    name: 'Marketing analytics',
                    url: '/docs/web-analytics/marketing-analytics',
                    icon: 'IconGraph',
                    color: 'blue',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/web-analytics/marketing-analytics',
                        },
                        {
                            name: 'Column definitions',
                            url: '/docs/web-analytics/marketing-analytics-schema',
                        },
                    ],
                },
                {
                    name: 'Troubleshooting',
                    url: '/docs/web-analytics/troubleshooting',
                    icon: 'IconQuestion',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Changelog',
                    url: '/docs/web-analytics/changelog',
                    icon: 'IconRocket',
                    color: 'purple',
                },
            ],
        },
        {
            name: 'Session Replay',
            url: '/docs/session-replay',
            color: 'yellow',
            icon: 'IconRewindPlay',
            description: 'Watch how users interact with your app in a DVR-like playback experience',
            children: [
                {
                    name: 'Session Replay',
                },
                {
                    name: 'Overview',
                    url: '/docs/session-replay',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Installation',
                    url: '/docs/session-replay/installation',
                    icon: 'IconBook',
                    color: 'blue',
                    featured: true,
                    children: [
                        { name: 'Overview', url: '/docs/session-replay/installation' },
                        { name: 'Web', url: '/docs/session-replay/installation/web' },
                        { name: 'React', url: '/docs/session-replay/installation/react' },
                        { name: 'Next.js', url: '/docs/session-replay/installation/nextjs' },
                        { name: 'React Native', url: '/docs/session-replay/installation/react-native' },
                        { name: 'Android', url: '/docs/session-replay/installation/android' },
                        { name: 'iOS', url: '/docs/session-replay/installation/ios' },
                        { name: 'Flutter', url: '/docs/session-replay/installation/flutter' },
                        { name: 'Angular', url: '/docs/session-replay/installation/angular' },
                        { name: 'Astro', url: '/docs/session-replay/installation/astro' },
                        { name: 'Bubble', url: '/docs/session-replay/installation/bubble' },
                        { name: 'Framer', url: '/docs/session-replay/installation/framer' },
                        { name: 'HTML snippet', url: '/docs/session-replay/installation/html-snippet' },
                        { name: 'Nuxt', url: '/docs/session-replay/installation/nuxt' },
                        { name: 'Remix', url: '/docs/session-replay/installation/remix' },
                        { name: 'Svelte', url: '/docs/session-replay/installation/svelte' },
                        { name: 'Vue', url: '/docs/session-replay/installation/vue' },
                        { name: 'Webflow', url: '/docs/session-replay/installation/webflow' },
                    ],
                },
                {
                    name: 'Watching recordings',
                    url: '/docs/session-replay/how-to-watch-recordings',
                    icon: 'IconApp',
                    color: 'orange',
                    featured: true,
                },
                {
                    name: 'Controlling which sessions you record',
                    url: '/docs/session-replay/how-to-control-which-sessions-you-record',
                    icon: 'IconToggle',
                    color: 'red',
                },
                {
                    name: 'Mobile Session Replay',
                    url: '/docs/session-replay/mobile',
                    icon: 'IconPhone',
                    color: 'blue',
                },
                {
                    name: 'Troubleshooting',
                    url: '/docs/session-replay/troubleshooting',
                    icon: 'IconQuestion',
                    color: 'purple',
                },
                {
                    name: 'Tutorials and guides',
                    url: '/docs/session-replay/tutorials',
                    icon: 'IconGraduationCap',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Changelog',
                    url: '/docs/session-replay/changelog',
                    icon: 'IconRocket',
                    color: 'purple',
                },
                {
                    type: 'divider',
                },
                {
                    name: 'Features',
                },
                {
                    name: 'Network performance',
                    url: '/docs/session-replay/network-recording',
                    icon: 'IconDashboard',
                    color: 'seagreen',
                },
                {
                    name: 'Privacy controls',
                    url: '/docs/session-replay/privacy',
                    icon: 'IconShield',
                    color: 'orange',
                },
                {
                    name: 'Sharing & embedding',
                    url: '/docs/session-replay/sharing',
                    icon: 'IconShare',
                    color: 'purple',
                },
                {
                    name: 'Data retention',
                    url: '/docs/session-replay/data-retention',
                    icon: 'IconCalendar',
                    color: 'seagreen',
                },
                {
                    name: 'Iframe recording',
                    url: '/docs/session-replay/iframes',
                    icon: 'IconCode',
                    color: 'salmon',
                },
                {
                    name: 'Console log recording',
                    url: '/docs/session-replay/console-log-recording',
                    icon: 'IconCode',
                    color: 'seagreen',
                },
                {
                    name: 'Canvas recording',
                    url: '/docs/session-replay/canvas-recording',
                    icon: 'IconPalette',
                    color: 'blue',
                },
            ],
        },
        {
            name: 'Feature Flags',
            icon: 'IconToggle',
            color: 'seagreen',
            url: '/docs/feature-flags',
            description: 'Safely roll out features to specific users or groups',
            children: [
                {
                    name: 'Feature Flags',
                },
                {
                    name: 'Overview',
                    url: '/docs/feature-flags',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Getting started',
                },
                {
                    name: 'Start here',
                    url: '/docs/feature-flags/start-here',
                    icon: 'IconListCheck',
                    featured: true,
                    color: 'orange',
                },
                {
                    name: 'Installation',
                    url: '/docs/feature-flags/installation',
                    icon: 'IconBook',
                    color: 'blue',
                    featured: true,
                    children: [
                        { name: 'Overview', url: '/docs/feature-flags/installation' },
                        { name: 'Web', url: '/docs/feature-flags/installation/web' },
                        { name: 'React', url: '/docs/feature-flags/installation/react' },
                        { name: 'Node.js', url: '/docs/feature-flags/installation/nodejs' },
                        { name: 'Python', url: '/docs/feature-flags/installation/python' },
                        { name: 'PHP', url: '/docs/feature-flags/installation/php' },
                        { name: 'Ruby', url: '/docs/feature-flags/installation/ruby' },
                        { name: 'Go', url: '/docs/feature-flags/installation/go' },
                        { name: 'React Native', url: '/docs/feature-flags/installation/react-native' },
                        { name: 'Android', url: '/docs/feature-flags/installation/android' },
                        { name: 'iOS', url: '/docs/feature-flags/installation/ios' },
                        { name: 'Java', url: '/docs/feature-flags/installation/java' },
                        { name: 'Flutter', url: '/docs/feature-flags/installation/flutter' },
                        { name: 'Elixir', url: '/docs/feature-flags/installation/elixir' },
                        { name: 'Rust', url: '/docs/feature-flags/installation/rust' },
                        { name: '.NET', url: '/docs/feature-flags/installation/dotnet' },
                        { name: 'API', url: '/docs/feature-flags/installation/api' },
                    ],
                },
                {
                    name: 'Creating Feature Flags',
                    url: '/docs/feature-flags/creating-feature-flags',
                    icon: 'IconFlag',
                    color: 'orange',
                    featured: true,
                },
                {
                    name: 'Adding your code',
                    url: '/docs/feature-flags/adding-feature-flag-code',
                    icon: 'IconCode',
                    color: 'salmon',
                },
                {
                    name: 'Testing your flag',
                    url: '/docs/feature-flags/testing',
                    icon: 'IconTestTube',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Concepts',
                },
                {
                    name: 'Best practices',
                    url: '/docs/feature-flags/best-practices',
                    icon: 'IconStar',
                    color: 'red',
                    featured: true,
                },
                {
                    name: 'Server-side local evaluation',
                    url: '/docs/feature-flags/local-evaluation',
                    icon: 'IconBolt',
                    color: 'orange',
                    featured: true,
                    children: [
                        {
                            name: 'Local evaluation in distributed or stateless environments',
                            url: '/docs/feature-flags/local-evaluation/distributed-environments',
                        },
                    ],
                },
                {
                    name: 'Client-side bootstrapping',
                    url: '/docs/feature-flags/bootstrapping',
                    icon: 'IconLaptop',
                    color: 'salmon',
                    featured: true,
                },
                {
                    name: 'Evaluation contexts',
                    url: '/docs/feature-flags/evaluation-contexts',
                    icon: 'IconDecisionTree',
                    color: 'red',
                },
                {
                    name: 'Guides',
                },
                {
                    name: 'Do a phased rollout',
                    url: '/docs/feature-flags/phased-rollout',
                    icon: 'IconTrends',
                    color: 'green',
                    featured: true,
                },
                {
                    name: 'Run a canary release',
                    url: '/docs/feature-flags/canary-release',
                    icon: 'IconRocket',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Target flags with groups',
                    url: '/docs/feature-flags/targeting-groups',
                    icon: 'IconPeople',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Set up remote config',
                    url: '/docs/feature-flags/remote-config',
                    icon: 'IconGear',
                    color: 'green',
                    featured: true,
                },
                {
                    name: 'Use feature flag dependencies',
                    url: '/docs/feature-flags/dependencies',
                    icon: 'IconListTreeChild',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Manage early access features',
                    url: '/docs/feature-flags/early-access-feature-management',
                    icon: 'IconFeatures',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Schedule flag changes',
                    url: '/docs/feature-flags/scheduled-flag-changes',
                    icon: 'IconClock',
                    color: 'seagreen',
                    featured: true,
                },
                {
                    name: 'Use multi-project flags',
                    url: '/docs/feature-flags/multi-project-feature-flags',
                    icon: 'IconStack',
                    color: 'blue',
                },
                {
                    name: 'Override flag properties',
                    url: '/docs/feature-flags/property-overrides',
                    icon: 'IconPerson',
                    color: 'blue',
                },
                {
                    name: 'Resources',
                },
                {
                    name: 'Cutting costs',
                    url: '/docs/feature-flags/cutting-costs',
                    icon: 'IconPiggyBank',
                    color: 'yellow',
                    featured: true,
                },
                {
                    name: 'Project-wide settings',
                    url: '/docs/feature-flags/project-wide-settings',
                    icon: 'IconWrench',
                    color: 'green',
                },
                {
                    name: 'More tutorials',
                    url: '/docs/feature-flags/tutorials',
                    icon: 'IconGraduationCap',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Troubleshooting',
                    url: '/docs/feature-flags/troubleshooting',
                    icon: 'IconQuestion',
                    color: 'seagreen',
                    featured: true,
                },
                {
                    name: 'Changelog',
                    url: '/docs/feature-flags/changelog',
                    icon: 'IconRocket',
                    color: 'purple',
                },
            ],
        },
        {
            name: 'Experiments',
            icon: 'IconFlask',
            color: 'purple',
            url: '/docs/experiments',
            description: 'Test changes with statistical significance with multivariate tests and robust targeting',
            children: [
                {
                    name: 'Experiments',
                },
                {
                    name: 'Overview',
                    url: '/docs/experiments',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Getting started',
                },
                {
                    name: 'Start here',
                    url: '/docs/experiments/start-here',
                    icon: 'IconListCheck',
                    featured: true,
                    color: 'orange',
                },
                {
                    name: 'Installation',
                    url: '/docs/experiments/installation',
                    icon: 'IconCode',
                    featured: true,
                    color: 'blue',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/experiments/installation',
                        },
                        {
                            name: 'Web',
                            url: '/docs/experiments/installation/web',
                        },
                        {
                            name: 'React',
                            url: '/docs/experiments/installation/react',
                        },
                        {
                            name: 'Node.js',
                            url: '/docs/experiments/installation/node',
                        },
                        {
                            name: 'Python',
                            url: '/docs/experiments/installation/python',
                        },
                        {
                            name: 'PHP',
                            url: '/docs/experiments/installation/php',
                        },
                        {
                            name: 'Ruby',
                            url: '/docs/experiments/installation/ruby',
                        },
                        {
                            name: 'Go',
                            url: '/docs/experiments/installation/go',
                        },
                        {
                            name: 'React Native',
                            url: '/docs/experiments/installation/react-native',
                        },
                        {
                            name: 'Android',
                            url: '/docs/experiments/installation/android',
                        },
                        {
                            name: 'iOS',
                            url: '/docs/experiments/installation/ios',
                        },
                        {
                            name: '.NET',
                            url: '/docs/experiments/installation/dotnet',
                        },
                        {
                            name: 'Rust',
                            url: '/docs/experiments/installation/rust',
                        },
                        {
                            name: 'Angular',
                            url: '/docs/experiments/installation/angular',
                        },
                        {
                            name: 'Astro',
                            url: '/docs/experiments/installation/astro',
                        },
                        {
                            name: 'Bubble',
                            url: '/docs/experiments/installation/bubble',
                        },
                        {
                            name: 'Django',
                            url: '/docs/experiments/installation/django',
                        },
                        {
                            name: 'Flutter',
                            url: '/docs/experiments/installation/flutter',
                        },
                        {
                            name: 'Framer',
                            url: '/docs/experiments/installation/framer',
                        },
                        {
                            name: 'Laravel',
                            url: '/docs/experiments/installation/laravel',
                        },
                        {
                            name: 'Next.js',
                            url: '/docs/experiments/installation/nextjs',
                        },
                        {
                            name: 'Nuxt',
                            url: '/docs/experiments/installation/nuxt',
                        },
                        {
                            name: 'Remix',
                            url: '/docs/experiments/installation/remix',
                        },
                        {
                            name: 'Svelte',
                            url: '/docs/experiments/installation/svelte',
                        },
                        {
                            name: 'Vue',
                            url: '/docs/experiments/installation/vue',
                        },
                        {
                            name: 'Webflow',
                            url: '/docs/experiments/installation/webflow',
                        },
                    ],
                },
                {
                    name: 'Creating an experiment',
                    url: '/docs/experiments/creating-an-experiment',
                    icon: 'IconFlask',
                    featured: true,
                    color: 'purple',
                },
                {
                    name: 'Adding your code',
                    url: '/docs/experiments/adding-experiment-code',
                    icon: 'IconCode',
                    color: 'orange',
                },
                {
                    name: 'Testing and launching',
                    url: '/docs/experiments/testing-and-launching',
                    icon: 'IconRocket',
                    featured: true,
                    color: 'green',
                },
                {
                    name: 'Analyzing results',
                    url: '/docs/experiments/analyzing-results',
                    featured: true,
                    icon: 'IconGraph',
                    color: 'purple',
                },
                {
                    name: 'No-code experiments',
                    url: '/docs/experiments/no-code-web-experiments',
                    icon: 'IconToolbar',
                    color: 'yellow',
                    featured: true,
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Concepts',
                },
                {
                    name: 'Traffic allocation',
                    url: '/docs/experiments/traffic-allocation',
                    icon: 'IconPercentage',
                    color: 'blue',
                },
                {
                    name: 'Exposures',
                    url: '/docs/experiments/exposures',
                    icon: 'IconPerson',
                    color: 'red',
                },
                {
                    name: 'Metrics',
                    url: '/docs/experiments/metrics',
                    icon: 'IconGraph',
                    color: 'purple',
                },
                {
                    name: 'Running time',
                    url: '/docs/experiments/sample-size-running-time',
                    icon: 'IconCalculator',
                    color: 'orange',
                },
                {
                    name: 'Bayesian statistics',
                    url: '/docs/experiments/statistics-bayesian',
                    icon: 'IconFlask',
                    color: 'purple',
                },
                {
                    name: 'Frequentist statistics',
                    url: '/docs/experiments/statistics-frequentist',
                    icon: 'IconBook',
                    color: 'blue',
                },
                {
                    name: 'Holdouts',
                    url: '/docs/experiments/holdouts',
                    icon: 'IconPeople',
                    color: 'green',
                },
                {
                    name: 'Guides',
                },
                {
                    name: 'Experiments without Feature Flags',
                    url: '/docs/experiments/running-experiments-without-feature-flags',
                    icon: 'IconWrench',
                    color: 'red',
                },
                {
                    name: 'New user experiments',
                    url: '/tutorials/new-user-experiments',
                    icon: 'IconPerson',
                    color: 'blue',
                },
                {
                    name: 'A/A testing',
                    url: '/tutorials/aa-testing',
                    icon: 'IconBalance',
                    color: 'orange',
                },
                {
                    name: 'A/B/n testing',
                    url: '/tutorials/abn-testing',
                    icon: 'IconSplitTesting',
                    color: 'purple',
                },
                {
                    name: 'Holdout testing',
                    url: '/tutorials/holdout-testing',
                    icon: 'IconShieldPeople',
                    color: 'green',
                },
                {
                    name: 'Redirect testing',
                    url: '/tutorials/redirect-testing',
                    icon: 'IconArrowRight',
                    color: 'red',
                },
                {
                    name: 'Fake door test',
                    url: '/tutorials/fake-door-test',
                    icon: 'IconCursorClick',
                    color: 'blue',
                },
                {
                    name: 'LLM A/B tests',
                    url: '/tutorials/llm-ab-tests',
                    icon: 'IconAI',
                    color: 'orange',
                },

                {
                    name: 'Data Warehouse experiments',
                    url: '/docs/experiments/data-warehouse',
                    icon: 'IconDatabase',
                    color: 'purple',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Tutorials and framework guides',
                    url: '/docs/experiments/tutorials',
                    icon: 'IconGraduationCap',
                    color: 'green',
                },
                {
                    name: 'Resources',
                },
                {
                    name: 'Best practices',
                    url: '/docs/experiments/best-practices',
                    icon: 'IconStar',
                    color: 'blue',
                },
                {
                    name: 'Troubleshooting',
                    url: '/docs/experiments/troubleshooting',
                    icon: 'IconQuestion',
                    color: 'orange',
                    featured: true,
                },
                {
                    name: 'Changelog',
                    url: '/docs/experiments/changelog',
                    icon: 'IconRocket',
                    color: 'purple',
                },
            ],
        },
        {
            name: 'Error Tracking',
            url: '/docs/error-tracking',
            icon: 'IconWarning',
            color: 'orange',
            description: 'Track and monitor errors and exceptions in your code.',
            children: [
                {
                    name: 'Error Tracking',
                },
                {
                    name: 'Overview',
                    url: '/docs/error-tracking',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Getting started',
                },
                {
                    name: 'Start here',
                    url: '/docs/error-tracking/start-here',
                    icon: 'IconListCheck',
                    featured: true,
                    color: 'orange',
                },
                {
                    name: 'Installation',
                    url: '/docs/error-tracking/installation',
                    icon: 'IconBook',
                    color: 'blue',
                    featured: true,
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/error-tracking/installation',
                        },
                        {
                            name: 'Web',
                            url: '/docs/error-tracking/installation/web',
                        },
                        {
                            name: 'Next.js',
                            url: '/docs/error-tracking/installation/nextjs',
                        },
                        {
                            name: 'Python',
                            url: '/docs/error-tracking/installation/python',
                        },
                        {
                            name: 'Node.js',
                            url: '/docs/error-tracking/installation/node',
                        },
                        {
                            name: 'Ruby',
                            url: '/docs/error-tracking/installation/ruby',
                        },
                        {
                            name: 'React',
                            url: '/docs/error-tracking/installation/react',
                        },
                        {
                            name: 'Angular',
                            url: '/docs/error-tracking/installation/angular',
                        },
                        {
                            name: 'Nuxt',
                            url: '/docs/error-tracking/installation/nuxt',
                            children: [
                                {
                                    name: '3.7 and above',
                                    url: '/docs/error-tracking/installation/nuxt',
                                },
                                {
                                    name: '3.6 and below',
                                    url: '/docs/error-tracking/installation/nuxt-3-6',
                                },
                            ],
                        },
                        {
                            name: 'SvelteKit',
                            url: '/docs/error-tracking/installation/svelte',
                        },
                        {
                            name: 'Hono',
                            url: '/docs/error-tracking/installation/hono',
                        },
                        {
                            name: 'Android',
                            url: '/docs/error-tracking/installation/android',
                        },
                        {
                            name: 'Flutter',
                            url: '/docs/error-tracking/installation/flutter',
                        },
                        {
                            name: 'React Native',
                            url: '/docs/error-tracking/installation/react-native',
                        },
                        {
                            name: 'Manual/API',
                            url: '/docs/error-tracking/installation/manual',
                        },
                    ],
                },
                {
                    name: 'Upload source maps',
                    url: '/docs/error-tracking/upload-source-maps',
                    icon: 'IconCode',
                    color: 'green',
                    featured: true,
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/error-tracking/upload-source-maps',
                        },
                        {
                            name: 'Next.js',
                            url: '/docs/error-tracking/upload-source-maps/nextjs',
                        },
                        {
                            name: 'Nuxt',
                            url: '/docs/error-tracking/upload-source-maps/nuxt',
                        },
                        {
                            name: 'React',
                            url: '/docs/error-tracking/upload-source-maps/react',
                        },
                        {
                            name: 'Angular',
                            url: '/docs/error-tracking/upload-source-maps/angular',
                        },
                        {
                            name: 'Web',
                            url: '/docs/error-tracking/upload-source-maps/web',
                        },
                        {
                            name: 'Node.js',
                            url: '/docs/error-tracking/upload-source-maps/node',
                        },
                        {
                            name: 'React Native',
                            url: '/docs/error-tracking/upload-source-maps/react-native',
                        },
                        {
                            name: 'Android',
                            url: '/docs/error-tracking/upload-mappings/android',
                        },
                        {
                            name: 'Flutter',
                            url: '/docs/error-tracking/upload-source-maps/flutter',
                        },
                        {
                            name: 'Rollup',
                            url: '/docs/error-tracking/upload-source-maps/rollup',
                        },
                        {
                            name: 'Webpack',
                            url: '/docs/error-tracking/upload-source-maps/webpack',
                        },
                        {
                            name: 'Vite',
                            url: '/docs/error-tracking/upload-source-maps/vite',
                        },
                        {
                            name: 'CLI',
                            url: '/docs/error-tracking/upload-source-maps/cli',
                        },
                        {
                            name: 'GitHub Action',
                            url: '/docs/error-tracking/upload-source-maps/github-actions',
                        },
                    ],
                },
                {
                    name: 'Concepts',
                },
                {
                    name: 'Issues and exceptions',
                    url: '/docs/error-tracking/issues-and-exceptions',
                    icon: 'IconWarning',
                    color: 'yellow',
                    featured: true,
                },
                {
                    name: 'Stack traces',
                    url: '/docs/error-tracking/stack-traces',
                    icon: 'IconCode',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Fingerprints',
                    url: '/docs/error-tracking/fingerprints',
                    icon: 'IconBrackets',
                    color: 'blue',
                },
                {
                    name: 'Releases',
                    url: '/docs/error-tracking/releases',
                    icon: 'IconTag',
                    color: 'orange',
                },
                {
                    name: 'Guides',
                },
                {
                    name: 'Capture exceptions',
                    url: '/docs/error-tracking/capture',
                    icon: 'IconLaptop',
                    color: 'green',
                    featured: true,
                },
                {
                    name: 'Group exceptions into issues',
                    url: '/docs/error-tracking/grouping-issues',
                    icon: 'IconList',
                    color: 'yellow',
                    featured: true,
                },
                {
                    name: 'Monitor and search issues',
                    url: '/docs/error-tracking/monitoring',
                    icon: 'IconSearch',
                    color: 'seagreen',
                    featured: true,
                },
                {
                    name: 'Manage and resolve issues',
                    url: '/docs/error-tracking/managing-issues',
                    icon: 'IconDashboard',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Assign issues to teammates',
                    url: '/docs/error-tracking/assigning-issues',
                    icon: 'IconUser',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Set up integrations',
                    url: '/docs/error-tracking/integrations',
                    icon: 'IconApps',
                    color: 'green',
                    featured: true,
                },
                {
                    name: 'Send alerts',
                    url: '/docs/error-tracking/alerts',
                    icon: 'IconBell',
                    color: 'red',
                    featured: true,
                },
                {
                    name: 'Code variables',
                    url: '/docs/error-tracking/code-variables',
                    icon: 'IconBrackets',
                    color: 'purple',
                    featured: true,
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/error-tracking/code-variables',
                        },
                        {
                            name: 'Python',
                            url: '/docs/error-tracking/code-variables/python',
                        },
                    ],
                },
                {
                    name: 'PostHog AI',
                },
                {
                    name: 'Debugging with MCP',
                    url: '/docs/error-tracking/debugging-with-mcp',
                    icon: 'IconLlmPromptEvaluation',
                    color: 'green',
                    featured: true,
                },
                {
                    name: 'Fix with AI prompts',
                    url: '/docs/error-tracking/fix-with-ai-prompts',
                    icon: 'IconLlmPromptManagement',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Resources',
                },
                {
                    name: 'Pricing',
                    url: '/docs/error-tracking/pricing',
                    icon: 'IconPiggyBank',
                    color: 'salmon',
                    featured: true,
                },
                {
                    name: 'References',
                    url: '/docs/error-tracking/references',
                    icon: 'IconBox',
                    color: 'blue',
                    children: [
                        {
                            name: 'JavaScript web SDK',
                            url: '/docs/references/posthog-js?filter=error-tracking',
                        },
                        {
                            name: 'Node.js SDK',
                            url: '/docs/references/posthog-node?filter=error-tracking',
                        },
                        {
                            name: 'Python SDK',
                            url: '/docs/references/posthog-python?filter=error-tracking',
                        },
                        {
                            name: 'Error Tracking API',
                            url: '/docs/api',
                        },
                    ],
                },
                {
                    name: 'More tutorials',
                    url: '/docs/error-tracking/tutorials',
                    icon: 'IconGraduationCap',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Troubleshooting',
                    url: '/docs/error-tracking/troubleshooting',
                    icon: 'IconQuestion',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Changelog',
                    url: '/docs/error-tracking/changelog',
                    icon: 'IconRocket',
                    color: 'purple',
                },
            ],
        },
        {
            name: 'Surveys',
            url: '/docs/surveys',
            icon: 'IconMessage',
            color: 'salmon',
            description: 'In-app popups with a library of response templates, plus an API',
            children: [
                {
                    name: 'Surveys',
                },
                {
                    name: 'Overview',
                    url: '/docs/surveys',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Installation',
                    url: '/docs/surveys/installation',
                    icon: 'IconBook',
                    color: 'blue',
                    featured: true,
                    children: [
                        { name: 'Overview', url: '/docs/surveys/installation' },
                        { name: 'Web', url: '/docs/surveys/installation/web' },
                        { name: 'React Native', url: '/docs/surveys/installation/react-native' },
                        { name: 'iOS', url: '/docs/surveys/installation/ios' },
                        { name: 'Flutter', url: '/docs/surveys/installation/flutter' },
                    ],
                },
                {
                    name: 'Creating a survey',
                    url: '/docs/surveys/creating-surveys',
                    icon: 'IconTarget',
                    color: 'yellow',
                    featured: true,
                },
                {
                    name: 'Implementing custom surveys',
                    url: '/docs/surveys/implementing-custom-surveys',
                    icon: 'IconCode',
                    color: 'salmon',
                },
                {
                    name: 'Viewing results',
                    url: '/docs/surveys/viewing-results',
                    icon: 'IconGraph',
                    color: 'purple',
                },
                {
                    name: 'Troubleshooting',
                    url: '/docs/surveys/troubleshooting',
                    icon: 'IconQuestion',
                    color: 'seagreen',
                },
                {
                    name: 'Tutorials and guides',
                    url: '/docs/surveys/tutorials',
                    icon: 'IconGraduationCap',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Changelog',
                    url: '/docs/surveys/changelog',
                    icon: 'IconRocket',
                    color: 'purple',
                },
                {
                    type: 'divider',
                },
                {
                    name: 'Features',
                },
                {
                    name: 'Destinations',
                    url: '/docs/surveys/destinations',
                    icon: 'IconLive',
                    color: 'orange',
                },
                {
                    name: 'Conditional questions',
                    url: '/docs/surveys/conditional-questions',
                    icon: 'IconUserPaths',
                    color: 'blue',
                    featured: true,
                },
            ],
        },
        {
            name: 'Product Tours',
            url: '/docs/product-tours',
            icon: 'IconSpotlight',
            color: 'salmon',
            description: 'Guide users through your product with interactive tours and announcements',
            children: [
                {
                    name: 'Product Tours',
                },
                {
                    name: 'Overview',
                    url: '/docs/product-tours',
                    icon: 'IconHome',
                    color: 'salmon',
                },
                {
                    name: 'Getting started',
                },
                {
                    name: 'Start here',
                    url: '/docs/product-tours/start-here',
                    icon: 'IconRocket',
                    featured: true,
                    color: 'salmon',
                },
                {
                    name: 'Create product tours',
                    url: '/docs/product-tours/creating-product-tours',
                    icon: 'IconSpotlight',
                    color: 'orange',
                },
                {
                    name: 'Make an announcement',
                    url: '/docs/product-tours/creating-announcements',
                    icon: 'IconMessage',
                    color: 'orange',
                },
                {
                    name: 'Launch and manage tours',
                    url: '/docs/product-tours/managing-tours',
                    icon: 'IconToggle',
                    color: 'orange',
                },
                {
                    name: 'Concepts',
                },
                {
                    name: 'Element selection',
                    url: '/docs/product-tours/element-selection',
                    icon: 'IconCursorClick',
                    color: 'orange',
                },
                {
                    name: 'Tour progression',
                    url: '/docs/product-tours/tour-progression',
                    icon: 'IconArrowRight',
                    color: 'orange',
                },
                {
                    name: 'Button actions',
                    url: '/docs/product-tours/button-actions',
                    icon: 'IconButton',
                    color: 'orange',
                },
                {
                    name: 'Guides',
                },
                {
                    name: 'Target users and set display conditions',
                    url: '/docs/product-tours/targeting',
                    icon: 'IconTarget',
                    color: 'orange',
                },
                {
                    name: 'Customize styles and layouts',
                    url: '/docs/product-tours/customization',
                    icon: 'IconColor',
                    color: 'orange',
                },
                {
                    name: 'View and create analytics',
                    url: '/docs/product-tours/analytics',
                    icon: 'IconGraph',
                    color: 'orange',
                },
            ],
        },
        {
            name: 'Support',
            url: '/docs/support',
            icon: 'IconSupport',
            color: 'teal',
            description: 'Built-in customer support with chat widget, inbox, and session context',
            children: [
                {
                    name: 'Support',
                },
                {
                    name: 'Overview',
                    url: '/docs/support',
                    icon: 'IconHome',
                    color: 'teal',
                },
                {
                    name: 'Getting started',
                },
                {
                    name: 'Start here',
                    url: '/docs/support/start-here',
                    icon: 'IconRocket',
                    featured: true,
                    color: 'teal',
                },
                {
                    name: 'Guides',
                },
                {
                    name: 'Widget setup',
                    url: '/docs/support/widget',
                    icon: 'IconMessage',
                    color: 'orange',
                },
                {
                    name: 'JavaScript API',
                    url: '/docs/support/javascript-api',
                    icon: 'IconCode',
                    color: 'orange',
                },
                {
                    name: 'Inbox management',
                    url: '/docs/support/inbox',
                    icon: 'IconInbox',
                    color: 'orange',
                },
            ],
        },
        ...[dataPipelines],
        {
            name: 'Data Warehouse',
            url: '/docs/data-warehouse',
            color: 'lilac',
            icon: 'IconDatabase',
            description: 'Unify and query data from any source and analyze it alongside your product data',
            children: [
                {
                    name: 'Data Warehouse',
                },
                {
                    name: 'Overview',
                    url: '/docs/data-warehouse',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Getting started',
                },
                {
                    name: 'Start here',
                    url: '/docs/data-warehouse/start-here',
                    icon: 'IconListCheck',
                    color: 'orange',
                    featured: true,
                },
                {
                    name: 'Link sources',
                    url: '/docs/data-warehouse/sources',
                    icon: 'IconBook',
                    color: 'blue',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/data-warehouse/sources/',
                        },
                        {
                            name: 'PostHog as a source',
                            url: '/docs/data-warehouse/sources/posthog',
                        },
                        {
                            name: 'Managed',
                        },
                        {
                            name: 'Attio',
                            url: '/docs/data-warehouse/sources/attio',
                        },
                        {
                            name: 'Azure SQL Server',
                            url: '/docs/data-warehouse/sources/azure-db',
                        },
                        {
                            name: 'BigQuery',
                            url: '/docs/data-warehouse/sources/bigquery',
                        },
                        {
                            name: 'Chargebee',
                            url: '/docs/data-warehouse/sources/chargebee',
                        },
                        {
                            name: 'Clerk',
                            url: '/docs/data-warehouse/sources/clerk',
                        },
                        {
                            name: 'DoIt',
                            url: '/docs/data-warehouse/sources/doit',
                        },
                        {
                            name: 'Google Ads',
                            url: '/docs/data-warehouse/sources/google-ads',
                        },
                        {
                            name: 'Bing Ads',
                            url: '/docs/data-warehouse/sources/bing-ads',
                        },
                        {
                            name: 'LinkedIn Ads',
                            url: '/docs/data-warehouse/sources/linkedin-ads',
                        },
                        {
                            name: 'Reddit Ads',
                            url: '/docs/data-warehouse/sources/reddit-ads',
                        },
                        {
                            name: 'Meta Ads',
                            url: '/docs/data-warehouse/sources/meta-ads',
                        },
                        {
                            name: 'Tiktok Ads',
                            url: '/docs/data-warehouse/sources/tiktok-ads',
                        },
                        {
                            name: 'Shopify',
                            url: '/docs/data-warehouse/sources/shopify',
                        },
                        {
                            name: 'Supabase',
                            url: '/tutorials/supabase-query',
                        },
                        {
                            name: 'Google Sheets',
                            url: '/docs/data-warehouse/sources/google-sheets',
                        },
                        {
                            name: 'GitHub',
                            url: '/docs/data-warehouse/sources/github',
                        },
                        {
                            name: 'Hubspot',
                            url: '/docs/data-warehouse/sources/hubspot',
                            badge: {
                                title: 'Popular',
                                className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                        },
                        {
                            name: 'Klaviyo',
                            url: '/docs/data-warehouse/sources/klaviyo',
                        },
                        {
                            name: 'Mailchimp',
                            url: '/docs/data-warehouse/sources/mailchimp',
                        },
                        {
                            name: 'MongoDB',
                            url: '/docs/data-warehouse/sources/mongodb',
                        },
                        {
                            name: 'MySQL',
                            url: '/docs/data-warehouse/sources/mysql',
                            badge: {
                                title: 'Popular',
                                className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                        },
                        {
                            name: 'Postgres',
                            url: '/docs/data-warehouse/sources/postgres',
                            badge: {
                                title: 'Popular',
                                className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                        },
                        {
                            name: 'Salesforce',
                            url: '/docs/data-warehouse/sources/salesforce',
                        },
                        {
                            name: 'Snowflake',
                            url: '/docs/data-warehouse/sources/snowflake',
                        },
                        {
                            name: 'Stripe',
                            url: '/docs/data-warehouse/sources/stripe',
                            badge: {
                                title: 'Popular',
                                className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                        },
                        {
                            name: 'Temporal.io',
                            url: '/docs/data-warehouse/sources/temporal',
                        },
                        {
                            name: 'Vitally',
                            url: '/docs/data-warehouse/sources/vitally',
                        },
                        {
                            name: 'Zendesk',
                            url: '/docs/data-warehouse/sources/zendesk',
                        },
                        {
                            name: 'Self-managed',
                        },
                        {
                            name: 'Azure Blob',
                            url: '/docs/data-warehouse/sources/azure-blob',
                        },
                        {
                            name: 'Cloudflare R2',
                            url: '/docs/data-warehouse/sources/r2',
                        },
                        {
                            name: 'Google Cloud Storage',
                            url: '/docs/data-warehouse/sources/gcs',
                        },
                        {
                            name: 'S3',
                            url: '/docs/data-warehouse/sources/s3',
                        },
                    ],
                },
                {
                    name: 'Query with SQL',
                    url: '/docs/data-warehouse/query',
                    icon: 'IconCode',
                    color: 'green',
                },
                {
                    name: 'Visualize with insights',
                    url: '/docs/data-warehouse/insights',
                    icon: 'IconGraph',
                    color: 'red',
                },
                {
                    name: 'Concepts',
                },
                {
                    name: 'SQL commands',
                    url: '/docs/data-warehouse/sql',
                    icon: 'IconCode',
                    color: 'purple',
                },
                {
                    name: 'SQL functions',
                    url: '/docs/data-warehouse/sql/useful-functions',
                    icon: 'IconStar',
                    color: 'yellow',
                },
                {
                    name: 'Variables',
                    url: '/docs/data-warehouse/sql/variables',
                    icon: 'IconGear',
                    color: 'seagreen',
                },
                {
                    name: 'Views',
                    url: '/docs/data-warehouse/views',
                    icon: 'IconCalculator',
                    color: 'salmon',
                    featured: true,
                },
                {
                    name: 'Guides',
                },
                {
                    name: 'Accessing data',
                    url: '/docs/data-warehouse/sql/data-access',
                    icon: 'IconDatabase',
                    color: 'green',
                },
                {
                    name: 'Joining data',
                    url: '/docs/data-warehouse/join',
                    icon: 'IconList',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Materializing views',
                    url: '/docs/data-warehouse/views/materialize',
                    icon: 'IconCalculator',
                    color: 'yellow',
                },
                {
                    name: 'Resources',
                },
                {
                    name: 'Cutting costs',
                    url: '/docs/data-warehouse/cutting-costs',
                    icon: 'IconPiggyBank',
                    color: 'salmon',
                    featured: true,
                },
                {
                    name: 'More tutorials',
                    url: '/docs/data-warehouse/tutorials',
                    icon: 'IconGraduationCap',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Troubleshooting',
                    url: '/docs/data-warehouse/troubleshooting',
                    icon: 'IconQuestion',
                    color: 'green',
                },
                {
                    name: 'Under the hood',
                    url: '/docs/data-warehouse/under-the-hood',
                    icon: 'IconMagicWand',
                    color: 'seagreen',
                    featured: true,
                },
                {
                    name: 'Changelog',
                    url: '/docs/data-warehouse/changelog',
                    icon: 'IconRocket',
                    color: 'purple',
                },
            ],
        },
        {
            name: 'LLM Analytics',
            url: '/docs/llm-analytics',
            color: '[#681291]',
            colorDark: '[#C170E8]',
            icon: 'IconLlmAnalytics',
            description: 'Insights for building your AI and LLM products',
            children: [
                {
                    name: 'LLM Analytics',
                },
                {
                    name: 'Overview',
                    url: '/docs/llm-analytics',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Getting started',
                },
                {
                    name: 'Start here',
                    url: '/docs/llm-analytics/start-here',
                    icon: 'IconListCheck',
                    color: 'orange',
                    featured: true,
                },
                {
                    name: 'Installation',
                    url: '/docs/llm-analytics/installation',
                    icon: 'IconBook',
                    color: 'blue',
                    featured: true,
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/llm-analytics/installation',
                        },
                        {
                            name: 'OpenAI',
                            url: '/docs/llm-analytics/installation/openai',
                        },
                        {
                            name: 'Anthropic',
                            url: '/docs/llm-analytics/installation/anthropic',
                        },
                        {
                            name: 'Google',
                            url: '/docs/llm-analytics/installation/google',
                        },
                        {
                            name: 'LangChain',
                            url: '/docs/llm-analytics/installation/langchain',
                        },
                        {
                            name: 'Vercel AI SDK',
                            url: '/docs/llm-analytics/installation/vercel-ai',
                        },
                        {
                            name: 'OpenRouter',
                            url: '/docs/llm-analytics/installation/openrouter',
                        },
                        {
                            name: 'LiteLLM',
                            url: '/docs/llm-analytics/installation/litellm',
                        },
                        {
                            name: 'Manual capture',
                            url: '/docs/llm-analytics/installation/manual-capture',
                        },
                        {
                            name: 'OpenAI Agents',
                            url: '/docs/llm-analytics/installation/openai-agents',
                        },
                    ],
                },
                {
                    name: 'Privacy mode',
                    url: '/docs/llm-analytics/privacy-mode',
                    icon: 'IconLock',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Concepts',
                },
                {
                    name: 'Basics',
                    url: '/docs/llm-analytics/basics',
                    icon: 'IconBook',
                    color: 'red',
                },
                {
                    name: 'Generations',
                    url: '/docs/llm-analytics/generations',
                    icon: 'IconAIText',
                    color: 'seagreen',
                    featured: true,
                },
                {
                    name: 'Traces',
                    url: '/docs/llm-analytics/traces',
                    icon: 'IconUserPaths',
                    color: 'orange',
                    featured: true,
                },
                {
                    name: 'Spans',
                    url: '/docs/llm-analytics/spans',
                    icon: 'IconBrackets',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Sessions',
                    url: '/docs/llm-analytics/sessions',
                    icon: 'IconStack',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Errors',
                    url: '/docs/llm-analytics/errors',
                    icon: 'IconWarning',
                    color: 'red',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Embeddings',
                    url: '/docs/llm-analytics/embeddings',
                    icon: 'IconDatabase',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Calculating LLM costs',
                    url: '/docs/llm-analytics/calculating-costs',
                    icon: 'IconBalance',
                    color: 'green',
                    featured: true,
                },
                {
                    name: 'Guides',
                },
                {
                    name: 'Analyze LLM performance',
                    url: '/docs/llm-analytics/dashboard',
                    icon: 'IconDashboard',
                    color: 'red',
                },
                {
                    name: 'Tracking custom properties',
                    url: '/docs/llm-analytics/custom-properties',
                    icon: 'IconGear',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Evaluations',
                    url: '/docs/llm-analytics/evaluations',
                    icon: 'IconTarget',
                    color: 'yellow',
                    badge: {
                        title: 'Alpha',
                        className: 'uppercase !bg-yellow/10 !text-yellow !dark:text-white !dark:bg-yellow/50',
                    },
                },
                {
                    name: 'Trace summarization',
                    url: '/docs/llm-analytics/summarization',
                    icon: 'IconAI',
                    color: 'blue',
                    badge: {
                        title: 'Alpha',
                        className: 'uppercase !bg-yellow/10 !text-yellow !dark:text-white !dark:bg-yellow/50',
                    },
                },
                {
                    name: 'Link Session Replay',
                    url: '/docs/llm-analytics/link-session-replay',
                    icon: 'IconRewindPlay',
                    color: 'blue',
                },
                {
                    name: 'Link Error Tracking',
                    url: '/docs/llm-analytics/link-error-tracking',
                    icon: 'IconWarning',
                    color: 'red',
                },
                {
                    name: 'Resources',
                },
                {
                    name: 'Troubleshooting',
                    url: '/docs/llm-analytics/troubleshooting',
                    icon: 'IconQuestion',
                    color: 'purple',
                },
                {
                    name: 'Changelog',
                    url: '/docs/llm-analytics/changelog',
                    icon: 'IconRocket',
                    color: 'purple',
                },
                {
                    name: 'More tutorials',
                    url: '/docs/llm-analytics/tutorials',
                    icon: 'IconGraduationCap',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Third-party integrations',
                    url: '/docs/llm-analytics/integrations',
                    icon: 'IconApps',
                    featured: true,
                    color: 'yellow',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/llm-analytics/integrations',
                        },
                        {
                            name: 'Helicone',
                            url: '/docs/llm-analytics/integrations/helicone-posthog',
                        },
                        {
                            name: 'Langfuse',
                            url: '/docs/llm-analytics/integrations/langfuse-posthog',
                        },
                        {
                            name: 'Traceloop',
                            url: '/docs/llm-analytics/integrations/traceloop-posthog',
                        },
                        {
                            name: 'Keywords AI',
                            url: '/docs/llm-analytics/integrations/keywords-ai-posthog',
                        },
                    ],
                },
            ],
        },
        {
            name: 'Revenue Analytics',
            icon: 'IconPiggyBank',
            color: '[#36C46F]',
            url: '/docs/revenue-analytics',
            description: 'Track and analyze your revenue metrics to understand your business performance and growth.',
            badge: {
                title: 'Beta',
                className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
            },
            children: [
                {
                    name: 'Revenue Analytics',
                },
                {
                    name: 'Overview',
                    url: '/docs/revenue-analytics',
                    icon: 'IconHome',
                    color: 'seagreen',
                    featured: true,
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Getting started',
                },
                {
                    name: 'Start here',
                    url: '/docs/revenue-analytics/start-here',
                    icon: 'IconListCheck',
                    color: 'orange',
                    featured: true,
                },
                {
                    name: 'Payment platforms',
                    url: '/docs/revenue-analytics/payment-platforms',
                    icon: 'IconCode',
                    color: 'blue',
                    featured: true,
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/revenue-analytics/payment-platforms',
                        },
                        {
                            name: 'Stripe',
                            url: '/docs/revenue-analytics/payment-platforms/stripe',
                        },
                        {
                            name: 'Chargebee',
                            badge: {
                                title: 'Coming soon',
                            },
                        },
                        {
                            name: 'Polar',
                            badge: {
                                title: 'Coming soon',
                            },
                        },
                        {
                            name: 'RevenueCat',
                            badge: {
                                title: 'Coming soon',
                            },
                        },
                    ],
                },
                {
                    name: 'Capture revenue events',
                    featured: true,
                    url: '/docs/revenue-analytics/capture-revenue-events',
                    icon: 'IconCode',
                    color: 'green',
                },
                {
                    name: 'Dashboard',
                    featured: true,
                    url: '/docs/revenue-analytics/dashboard',
                    icon: 'IconDashboard',
                    color: 'red',
                },
                {
                    name: 'Concepts',
                },
                {
                    name: 'Connect to customers',
                    featured: true,
                    url: '/docs/revenue-analytics/connect-to-customers',
                    icon: 'IconPeople',
                    color: 'blue',
                },
                {
                    name: 'Deferred Revenue',
                    url: '/docs/revenue-analytics/deferred-revenue',
                    icon: 'IconBolt',
                    color: 'orange',
                },
                {
                    name: 'Managed views',
                    url: '/docs/revenue-analytics/managed-views',
                    icon: 'IconCalculator',
                    color: 'salmon',
                },
                {
                    name: 'Resources',
                },
                {
                    name: 'Troubleshooting',
                    url: '/docs/revenue-analytics/troubleshooting',
                    icon: 'IconQuestion',
                    color: 'blue',
                    featured: true,
                },
            ],
        },
        {
            name: 'Customer Analytics',
            icon: 'IconPeople',
            color: '[#FF6B6B]',
            url: '/docs/customer-analytics',
            description:
                'Understand your customers to build products that solve real problems and achieve product-market fit.',
            badge: {
                title: 'Beta',
                className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
            },
            children: [
                {
                    name: 'Customer Analytics',
                },
                {
                    name: 'Overview',
                    url: '/docs/customer-analytics',
                    icon: 'IconHome',
                    color: 'seagreen',
                    featured: true,
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Getting started',
                },
                {
                    name: 'Start here',
                    url: '/docs/customer-analytics/start-here',
                    icon: 'IconListCheck',
                    color: 'orange',
                    featured: true,
                },
                {
                    name: 'Concepts',
                },
                {
                    name: 'Dashboard metrics',
                    featured: true,
                    url: '/docs/customer-analytics/dashboard-metrics',
                    icon: 'IconBolt',
                    color: 'orange',
                },
                {
                    name: 'B2B mode',
                    featured: true,
                    url: '/docs/customer-analytics/b2b-mode',
                    icon: 'IconCohort',
                    color: 'red',
                },
                {
                    name: 'Usage metrics',
                    url: '/docs/customer-analytics/usage-metrics',
                    icon: 'IconTrends',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Customer profiles',
                    url: '/docs/customer-analytics/customer-profiles',
                    icon: 'IconPerson',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Saved views',
                    url: '/docs/customer-analytics/saved-views',
                    icon: 'IconBookmark',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Guides',
                },
                {
                    name: 'Configure your dashboard',
                    url: '/docs/customer-analytics/configure-your-dashboard',
                    icon: 'IconDashboard',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Create usage metrics',
                    url: '/docs/customer-analytics/create-usage-metrics',
                    icon: 'IconG',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'PostHog AI',
                },
                {
                    name: 'Configure dashboard with AI',
                    url: '/docs/customer-analytics/configure-dashboard-with-ai',
                    icon: 'IconSparkles',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Resources',
                },
                {
                    name: 'Troubleshooting',
                    url: '/docs/customer-analytics/troubleshooting',
                    icon: 'IconQuestion',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Changelog',
                    url: '/docs/customer-analytics/changelog',
                    icon: 'IconRocket',
                    color: 'purple',
                },
            ],
        },
        {
            name: 'PostHog AI',
            icon: 'IconSparkles',
            color: 'blue',
            url: '/docs/posthog-ai',
            description: 'AI-powered product analyst and assistant',
            children: [
                {
                    name: 'PostHog AI',
                },
                {
                    name: 'Overview',
                    url: '/docs/posthog-ai',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Getting started',
                },
                {
                    name: 'Start here',
                    url: '/docs/posthog-ai/start-here',
                    icon: 'IconBook',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Allow access',
                    url: '/docs/posthog-ai/allow-access',
                    icon: 'IconCheckCircle',
                    color: 'green',
                    featured: true,
                },
                {
                    name: 'Edit memory',
                    url: '/docs/posthog-ai/edit-memory',
                    icon: 'IconMemory',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Features',
                },
                {
                    name: 'Platform and chat UI',
                    url: '/docs/posthog-ai/platform-and-chat-ui',
                    icon: 'IconLlmPromptManagement',
                    color: 'orange',
                },
                {
                    name: 'Context and commands',
                    url: '/docs/posthog-ai/context-and-commands',
                    icon: 'IconChat',
                    color: 'seagreen',
                },
                {
                    name: 'Tools and capabilities',
                    url: '/docs/posthog-ai/tools',
                    icon: 'IconWrench',
                    color: 'blue',
                },
                {
                    name: 'Modes',
                    url: '/docs/posthog-ai/modes',
                    icon: 'IconToggle',
                    color: 'yellow',
                },
                {
                    name: 'Plan mode',
                    url: '/docs/posthog-ai/plan-mode',
                    icon: 'IconMap',
                    color: 'green',
                },
                {
                    name: 'Research mode',
                    url: '/docs/posthog-ai/research-mode',
                    icon: 'IconSearch',
                    color: 'seagreen',
                },
                {
                    name: 'Session summaries',
                    url: '/docs/posthog-ai/session-summaries',
                    icon: 'IconEye',
                    color: 'purple',
                },
                {
                    name: 'Guides',
                },
                {
                    name: 'Example prompts',
                    url: '/docs/posthog-ai/example-prompts',
                    icon: 'IconShield',
                    color: 'red',
                },
                {
                    name: 'Write and edit SQL',
                    url: '/docs/posthog-ai/write-and-edit-sql',
                    icon: 'IconShield',
                    color: 'red',
                },
                {
                    name: 'Investigate web traffic',
                    url: '/docs/posthog-ai/investigate-web-traffic',
                    icon: 'IconShield',
                    color: 'red',
                },
                {
                    name: 'Resources',
                },
                {
                    name: 'Pricing',
                    url: '/docs/posthog-ai/pricing',
                    icon: 'IconShield',
                    color: 'red',
                },
                {
                    name: 'Changelog',
                    url: '/docs/posthog-ai/changelog',
                    icon: 'IconRocket',
                    color: 'purple',
                },
                {
                    name: 'FAQ',
                    url: '/docs/posthog-ai/faq',
                    icon: 'IconShield',
                    color: 'red',
                },
            ],
        },
        {
            name: 'Workflows',
            icon: 'IconMegaphone',
            color: 'red',
            url: '/docs/workflows',
            description: 'Create automations or campaigns to send messages to your users.',
            children: [
                {
                    name: 'Workflows',
                },
                {
                    name: 'Overview',
                    url: '/docs/workflows',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Getting started',
                },
                {
                    name: 'Start here',
                    url: '/docs/workflows/start-here',
                    icon: 'IconListCheck',
                    color: 'orange',
                    featured: true,
                },
                {
                    name: 'Configure a channel',
                    url: '/docs/workflows/configure-channels',
                    icon: 'IconMegaphone',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Launch your first workflow',
                    url: '/docs/workflows/launch-workflow',
                    icon: 'IconMegaphone',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Concepts',
                },
                {
                    name: 'Workflow builder',
                    url: '/docs/workflows/workflow-builder',
                    icon: 'IconDatabase',
                    color: 'orange',
                },
                {
                    name: 'Content library and message templates',
                    url: '/docs/workflows/library',
                    icon: 'IconDatabase',
                    color: 'orange',
                },
                {
                    name: 'Guides',
                },
                {
                    name: 'Create a drip campaign',
                    url: '/docs/workflows/email-drip-campaign',
                    icon: 'IconDatabase',
                    color: 'orange',
                },
                {
                    name: 'Import opt-out lists from Customer.io',
                    url: '/docs/workflows/import-customerio-optouts',
                    icon: 'IconDatabase',
                    color: 'blue',
                },
                {
                    name: 'Best practices',
                    url: '/docs/workflows/best-practices',
                    icon: 'IconStar',
                    color: 'red',
                },
                {
                    name: 'Resources',
                },
                {
                    name: 'Troubleshooting',
                    url: '/docs/workflows/troubleshooting',
                    icon: 'IconQuestion',
                    color: 'red',
                },
                {
                    name: 'Changelog',
                    url: '/docs/workflows/changelog',
                    icon: 'IconRocket',
                    color: 'purple',
                },
            ],
        },
        {
            name: 'Logs',
            icon: 'IconSearch',
            color: 'blue',
            url: '/docs/logs',
            description: 'Search and analyze your application logs with OpenTelemetry.',
            children: [
                {
                    name: 'Logs',
                },
                {
                    name: 'Overview',
                    url: '/docs/logs',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Getting started',
                },
                {
                    name: 'Start here',
                    url: '/docs/logs/start-here',
                    icon: 'IconListCheck',
                    color: 'orange',
                    featured: true,
                },
                {
                    name: 'Install logging client',
                    url: '/docs/logs/installation',
                    icon: 'IconCode',
                    color: 'blue',
                    featured: true,
                    children: [
                        { name: 'Overview', url: '/docs/logs/installation' },
                        { name: 'Node.js', url: '/docs/logs/installation/nodejs' },
                        { name: 'Next.js', url: '/docs/logs/installation/nextjs' },
                        { name: 'Python', url: '/docs/logs/installation/python' },
                        { name: 'Java', url: '/docs/logs/installation/java' },
                        { name: 'Go', url: '/docs/logs/installation/go' },
                        { name: 'Datadog', url: '/docs/logs/installation/datadog' },
                        { name: 'Other', url: '/docs/logs/installation/other' },
                    ],
                },
                {
                    name: 'Search logs',
                    url: '/docs/logs/search',
                    icon: 'IconSearch',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Link Session Replay',
                    url: '/docs/logs/link-session-replay',
                    icon: 'IconRewindPlay',
                    color: 'blue',
                },
                {
                    name: 'Resources',
                },
                {
                    name: 'Troubleshooting',
                    url: '/docs/logs/troubleshooting',
                    icon: 'IconQuestion',
                    color: 'red',
                },
                {
                    name: 'Changelog',
                    url: '/docs/logs/changelog',
                    icon: 'IconRocket',
                    color: 'purple',
                },
            ],
        },
        {
            name: 'Endpoints',
            icon: 'IconCode2',
            color: 'blue',
            url: '/docs/endpoints',
            description: 'Create predefined queries from Insights or SQL and expose them as optimized API endpoints.',
            children: [
                {
                    name: 'Endpoints',
                },
                {
                    name: 'Overview',
                    url: '/docs/endpoints',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Start here',
                    url: '/docs/endpoints/start-here',
                    icon: 'IconListCheck',
                    color: 'orange',
                    featured: true,
                },
                {
                    name: 'Use cases and tips',
                    url: '/docs/endpoints/use-cases-and-tips',
                    icon: 'IconBook',
                    color: 'blue',
                },
                {
                    name: 'Additional features',
                    url: '/docs/endpoints/additional-features',
                    icon: 'IconBook',
                    color: 'blue',
                },
                {
                    name: 'Troubleshooting',
                    url: '/docs/endpoints/troubleshooting',
                    icon: 'IconQuestion',
                    color: 'red',
                },
                {
                    name: 'Changelog',
                    url: '/docs/endpoints/changelog',
                    icon: 'IconRocket',
                    color: 'purple',
                },
            ],
        },
    ],
}

export const pricingMenu = {
    name: 'Pricing',
    url: '/pricing',
    icon: 'IconReceipt',
    children: [
        {
            name: 'PostHog Cloud',
            icon: 'IconCloud',
            color: 'blue',
            url: '/pricing',
        },
        // {
        //     name: 'Event types',
        //     icon: 'IconCursorClick',
        //     color: 'purple',
        //     url: '/events',
        // },
        {
            name: 'Add-ons',
            icon: 'IconPuzzle',
            color: 'seagreen',
            url: '/addons',
        },
        {
            name: 'Platform packages',
            icon: 'IconServer',
            color: 'purple',
            url: '/platform-packages',
        },
        {
            name: 'Pricing philosophy',
            icon: 'IconLightBulb',
            color: 'yellow',
            url: '/pricing/philosophy',
        },
        {
            name: 'How we do "sales"',
            icon: 'IconPercentage',
            color: 'green',
            url: '/sales',
        },
        {
            name: 'Founder stack',
            icon: 'IconStack',
            color: 'salmon',
            url: '/founder-stack',
        },
    ],
}

const menu = [
    {
        name: 'Why PostHog?',
        url: '/why',
        icon: 'IconLightBulb',
        color: 'yellow',
    },
    pricingMenu,
    docsMenu,
    communityMenu,
    companyMenu,
]

export default menu
