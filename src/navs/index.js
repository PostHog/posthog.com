export const dataPipelines = {
    name: 'Data pipelines',
    url: '/docs/cdp',
    color: 'sky-blue',
    icon: 'IconPlug',
    description: 'Collect, enrich, and send data to your destinations',
    children: [
        {
            name: 'Data pipelines integrations',
        },
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
            children: [
                {
                    name: 'Overview',
                    url: '/docs/cdp/sources/',
                },
                {
                    name: 'Managed',
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
                // TODO: Add this back in once we support custom transformations
                // {
                //     name: 'Customization',
                //     url: '/docs/cdp/transformations/customizing-transformations',
                // },
                {
                    name: 'Drop Events',
                    url: '/docs/cdp/transformations/drop-events',
                },
            ],
            dynamicChildren: 'data-pipeline-transformations',
        },
        {
            name: 'Troubleshooting and FAQs',
            url: '/docs/cdp/common-questions',
            icon: 'IconQuestion',
            color: 'blue',
            featured: true,
        },
    ],
}

export const handbookSidebar = [
    {
        name: 'Handbook',
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
                url: '/handbook/who-we-are-building-for',
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
                name: '14. Where we are now',
                url: '/handbook/current-status',
            },
            {
                name: '15. Where are we going?',
                url: '/handbook/future',
            },
            {
                name: '16. How you can help',
                url: '/handbook/help',
            },
        ],
    },
    {
        name: 'Working at PostHog',
        url: '',
        children: [
            {
                name: 'How we work',
                url: '',
                children: [
                    {
                        name: 'Culture',
                        url: '/handbook/company/culture',
                    },
                    {
                        name: 'Small teams',
                        url: '/handbook/company/small-teams',
                    },
                    {
                        name: 'Meetings',
                        url: '/handbook/getting-started/meetings',
                    },
                    {
                        name: 'Using GitHub',
                        url: '/handbook/company/new-to-github',
                    },
                    {
                        name: 'Goal setting',
                        url: '/handbook/company/goal-setting',
                    },
                    {
                        name: 'A grown-up company',
                        url: '/handbook/company/grown-ups',
                    },
                    {
                        name: 'Communication',
                        url: '/handbook/company/communication',
                    },
                    {
                        name: 'Fuzzy ownership',
                        url: '/handbook/company/fuzzy-ownership',
                    },
                    {
                        name: 'Kudos',
                        url: '/handbook/company/kudos',
                    },
                    {
                        name: 'Management',
                        url: '/handbook/company/management',
                    },
                    {
                        name: 'Sprints',
                        url: '/handbook/company/sprints',
                    },
                    {
                        name: 'Offsites',
                        url: '/handbook/company/offsites',
                    },
                    {
                        name: 'Security',
                        url: '/handbook/company/security',
                    },
                    {
                        name: 'Adding tools',
                        url: '/handbook/company/adding-tools',
                    },
                ],
            },
            {
                name: 'Compensation',
                url: '/handbook/people/compensation',
            },
            {
                name: 'Share options',
                url: '/handbook/people/share-options',
            },
            {
                name: 'Benefits',
                url: '/handbook/people/benefits',
            },
            {
                name: 'Time off',
                url: '/handbook/people/time-off',
            },
            {
                name: 'Spending money',
                url: '/handbook/people/spending-money',
            },
            {
                name: 'Progression',
                url: '/handbook/people/career-progression',
            },
            {
                name: 'Training',
                url: '/handbook/people/training',
            },
            {
                name: 'Side gigs',
                url: '/handbook/people/side-gigs',
            },
            {
                name: 'Feedback',
                url: '/handbook/people/feedback',
            },
            {
                name: 'Clubs',
                url: '/handbook/people/clubs',
            },
            {
                name: 'Lore',
                url: '/handbook/company/lore',
            },
            {
                name: 'Onboarding',
                url: '/handbook/people/onboarding',
            },
            {
                name: 'Offboarding',
                url: '/handbook/people/offboarding',
            },
            {
                name: 'HR processes',
                url: '/handbook/people/grievances',
            },
            {
                name: 'Hiring processes',
                url: '',
                children: [
                    {
                        name: 'Overview',
                        url: '/handbook/people/hiring-process',
                    },
                    {
                        name: 'How to interview',
                        url: '/handbook/people/hiring-process/how-to-interview',
                    },
                    {
                        name: 'Engineering hiring',
                        url: '/handbook/people/hiring-process/engineering-hiring',
                    },
                    {
                        name: 'Marketing hiring',
                        url: '/handbook/people/hiring-process/marketing-hiring',
                    },
                    {
                        name: 'Operations hiring',
                        url: '/handbook/people/hiring-process/operations-hiring',
                    },
                    {
                        name: 'Design hiring',
                        url: '/handbook/people/hiring-process/design-hiring',
                    },
                    {
                        name: 'Exec hiring',
                        url: '/handbook/people/hiring-process/exec-hiring',
                    },
                    {
                        name: 'Sales and CS hiring',
                        url: '/handbook/people/hiring-process/sales-cs-hiring',
                    },
                ],
            },
        ],
    },
    {
        name: 'Resources',
    },
    {
        name: 'Team structure',
        url: '/handbook/team-structure',
    },
    {
        name: 'Content & Docs',
        url: '',
        children: [
            {
                name: 'Overview',
                url: '/handbook/content-and-docs',
            },
            {
                name: 'Docs ownership',
                url: '/handbook/content-and-docs/docs',
            },
            {
                name: 'Docs style guide',
                url: '/handbook/content-and-docs/docs-style-guide',
            },
            {
                name: 'Newsletter',
                url: '/handbook/content-and-docs/newsletter',
            },
            {
                name: 'YouTube',
                url: '/handbook/content-and-docs/youtube',
            },
            {
                name: 'Writing for PostHog',
                url: '',
                children: [
                    {
                        name: 'Overview',
                        url: '/handbook/content-and-docs/writing-for-posthog',
                    },
                    {
                        name: 'SEO best practices',
                        url: '/handbook/content-and-docs/seo-guide',
                    },
                    {
                        name: 'Style guide',
                        url: '/handbook/content-and-docs/posthog-style-guide',
                    },
                    {
                        name: 'Tags and categories',
                        url: '/handbook/content-and-docs/tags-and-categories',
                    },
                    {
                        name: 'Content components',
                        url: '/handbook/content-and-docs/components',
                    },
                ],
            },
        ],
    },
    {
        name: 'CS & Onboarding',
        url: '',
        children: [
            {
                name: 'Customer success team',
                url: '/handbook/cs-and-onboarding/customer-success',
            },
            {
                name: 'Onboarding team',
                url: '/handbook/cs-and-onboarding/onboarding-team',
            },
            {
                name: 'Health tracking',
                url: '/handbook/cs-and-onboarding/health-tracking',
            },
            {
                name: 'Feature requests',
                url: '/handbook/cs-and-onboarding/feature-requests',
            },
            {
                name: 'Customer health checks',
                url: '/handbook/cs-and-onboarding/health-checks',
            },
        ],
    },
    {
        name: 'Design',
        url: '',
        children: [
            {
                name: 'Our philosophy',
                url: '/handbook/design/philosophy',
            },
            {
                name: 'Product design process',
                url: '/handbook/design/process',
            },
            {
                name: 'Product design for engineers',
                url: '/handbook/engineering/product-design',
            },
            {
                name: 'Logos, brand, hedgehogs',
                url: '/handbook/company/brand-assets',
            },
            {
                name: 'Brand strategy',
                url: '/handbook/strategy/brand',
            },
            {
                name: 'Product positioning',
                url: '/handbook/design/positioning',
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
                ],
            },
            {
                name: 'Internal processes',
                url: '',
                children: [
                    {
                        name: 'Support hero',
                        url: '/handbook/engineering/support-hero',
                    },
                    {
                        name: 'Feature ownership',
                        url: '/handbook/engineering/feature-ownership',
                    },
                    {
                        name: 'Handling incidents',
                        url: '/handbook/engineering/incidents',
                    },
                    {
                        name: 'On-call rotation',
                        url: '/handbook/engineering/on-call-rotation',
                    },
                    {
                        name: 'Bug prioritization',
                        url: '/handbook/engineering/bug-prioritization',
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
                name: 'Shipping & releasing',
                url: '/handbook/engineering/development-process',
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
        name: 'Exec',
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
                name: 'Activation & product intents',
                url: '/handbook/growth/growth-engineering/product-intents',
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
                name: 'Marketing ownership',
                url: '/handbook/growth/marketing/ownership',
            },
            {
                name: 'Value proposition',
                url: '/handbook/growth/marketing/value-propositions',
            },
            {
                name: 'ICP scoring',
                url: '/handbook/growth/marketing/icp',
            },
            {
                name: 'Sponsorships',
                url: '/handbook/growth/marketing/open-source-sponsorship',
            },
            {
                name: 'Dashboard templates',
                url: '/handbook/growth/marketing/templates',
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
            {
                name: 'Designing PostHog.com',
                url: '/handbook/design/designing-posthog-website',
            },
            {
                name: 'Developing PostHog.com',
                url: '',
                children: [
                    {
                        name: 'Developing the website',
                        url: '/handbook/engineering/posthog-com/developing-the-website',
                    },
                    {
                        name: 'How PostHog.com works',
                        url: '/handbook/engineering/posthog-com/how-posthog-website-works',
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
                        name: 'Managing the company roadmap',
                        url: '/handbook/engineering/posthog-com/roadmap',
                    },
                    {
                        name: 'Changelog entries',
                        url: '/handbook/engineering/posthog-com/changelog',
                    },
                    {
                        name: 'Editing API docs',
                        url: '/handbook/engineering/posthog-com/api-docs',
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
                name: 'Releasing as beta',
                url: '/handbook/product/releasing-as-beta',
            },
            {
                name: 'Building new products fast',
                url: '/handbook/product/building-new-products-fast',
            },
            {
                name: 'Product manager role',
                url: '/handbook/product/product-manager-role',
            },
            {
                name: 'Per-product growth reviews',
                url: '/handbook/product/per-product-growth-reviews',
            },
            {
                name: 'In-product AI playbook',
                url: '/handbook/product/ai-playbook',
            },
            {
                name: 'Prioritizing work for mature products',
                url: '/handbook/product/prioritizing-work-for-mature-products',
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
                name: 'Incidents & maintenance',
                url: '/handbook/engineering/incidents#customer-communications',
            },
        ],
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
                name: 'Why buy PostHog',
                url: '/handbook/growth/sales/why-buy-posthog',
            },
            {
                name: 'New sales',
                url: '/handbook/growth/sales/new-sales',
            },
            {
                name: 'Product-led sales',
                url: '/handbook/growth/sales/product-led-sales',
            },
            {
                name: 'Expansion & Retention',
                url: '/handbook/growth/sales/expansion-and-retention',
            },
            {
                name: 'How we work',
                url: '/handbook/growth/sales/how-we-work',
            },
            {
                name: 'New team member onboarding',
                url: '/handbook/growth/sales/new-hire-onboarding',
            },
            {
                name: 'SalesOps',
                url: '',
                children: [
                    {
                        name: 'Managing our CRM',
                        url: '/handbook/growth/sales/crm',
                    },
                    {
                        name: 'Lead scoring',
                        url: '/handbook/growth/sales/lead-scoring',
                    },
                    {
                        name: 'YC onboarding',
                        url: '/handbook/growth/sales/yc-onboarding',
                    },
                    {
                        name: 'Contracts',
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
                        name: 'Automations',
                        url: '/handbook/growth/sales/automations',
                    },
                    {
                        name: 'Who we do business with',
                        url: '/handbook/growth/sales/who-we-do-business-with',
                    },
                    {
                        name: 'Historical imports',
                        url: '/handbook/growth/sales/historical-import',
                    },
                ],
            },
        ],
    },
    {
        name: 'RevOps',
        url: '/handbook/growth/revops',
    },
    {
        name: 'Comms',
        url: '',
        children: [
            {
                name: 'Overview',
                url: '/handbook/words-and-pictures/words-and-pictures',
            },
            {
                name: 'Art requests',
                url: '/handbook/words-and-pictures/art-requests',
            },
            {
                name: 'Email marketing',
                url: '/handbook/words-and-pictures/email-comms',
            },
            {
                name: 'In-app messaging',
                url: '/handbook/words-and-pictures/in-app',
            },
            {
                name: 'Partnerships',
                url: '/handbook/words-and-pictures/partners',
            },
            {
                name: 'Paid ads',
                url: '/handbook/words-and-pictures/paid',
            },
            {
                name: 'Press & PR',
                url: '/handbook/words-and-pictures/press',
            },
            {
                name: 'Product launches',
                url: '/handbook/words-and-pictures/product-announcements',
            },
            {
                name: 'Startups & YC Programs',
                url: '/handbook/words-and-pictures/startups',
            },
            {
                name: 'Testimonials & G2',
                url: '/handbook/words-and-pictures/testimonials',
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
                    name: 'Product analytics',
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
                    name: 'Session replay',
                    color: 'yellow',
                    icon: 'IconRewindPlay',
                    url: '/tutorials/categories/session-replay',
                },
                {
                    name: 'Feature flags',
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
                        { name: 'Sentry', url: '/tutorials/categories/sentry' },
                        { name: 'Zapier', url: '/tutorials/categories/zapier' },
                    ],
                },
                {
                    name: 'LLM observability',
                    color: 'purple',
                    icon: 'IconAI',
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
            name: 'WIP',
            icon: 'IconHourglass',
            color: 'seagreen',
            url: '/wip',
        },
        {
            name: 'Changelog',
            icon: 'IconCalendar',
            color: 'red',
            url: '/changelog/2025',
        },
        { name: 'People', icon: 'IconPeople', color: 'blue', url: '/people' },
        {
            name: 'Teams',
            icon: 'IconShieldPeople',
            color: 'purple',
            url: '/teams',
            children: [
                {
                    name: 'Small teams',
                    url: '/teams',
                },
                {
                    name: 'Engineering',
                },
                {
                    name: 'CDP',
                    url: '/teams/cdp',
                },
                {
                    name: 'ClickHouse',
                    url: '/teams/clickhouse',
                },
                {
                    name: 'CRM',
                    url: '/teams/crm',
                },
                {
                    name: 'Data Warehouse',
                    url: '/teams/data-warehouse',
                },
                {
                    name: 'Error Tracking',
                    url: '/teams/error-tracking',
                },
                {
                    name: 'Experiments',
                    url: '/teams/experiments',
                },
                {
                    name: 'Feature Flags',
                    url: '/teams/feature-flags',
                },
                {
                    name: 'Growth',
                    url: '/teams/growth',
                },
                {
                    name: 'Infrastructure',
                    url: '/teams/infrastructure',
                },
                {
                    name: 'Ingestion',
                    url: '/teams/ingestion',
                },
                {
                    name: 'LLM Observability',
                    url: '/teams/llm-observability',
                },
                {
                    name: 'Max AI',
                    url: '/teams/max-ai',
                },
                {
                    name: 'Messaging',
                    url: '/teams/messaging',
                },
                {
                    name: 'Product Analytics',
                    url: '/teams/product-analytics',
                },
                {
                    name: 'Replay',
                    url: '/teams/replay',
                },
                {
                    name: 'Revenue Analytics',
                    url: '/teams/revenue-analytics',
                },
                {
                    name: 'Surveys',
                    url: '/teams/surveys',
                },
                {
                    name: 'Web Analytics',
                    url: '/teams/web-analytics',
                },
                {
                    name: 'Not engineering',
                },
                {
                    name: 'Comms',
                    url: '/teams/words-pictures',
                },
                {
                    name: 'Content & Docs',
                    url: '/teams/marketing',
                },
                {
                    name: 'CS & Onboarding',
                    url: '/teams/cs-onboarding',
                },
                {
                    name: 'Exec',
                    url: '/teams/exec',
                },
                {
                    name: 'People & Ops',
                    url: '/teams/people',
                },
                {
                    name: 'Sales & CS',
                    url: '/teams/sales-cs',
                },
                {
                    name: 'Support',
                    url: '/teams/support',
                },
                {
                    name: 'Website & Vibes',
                    url: '/teams/website-vibes',
                },
            ],
        },
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
                                    name: 'Features',
                                    url: '/docs/libraries/js/features',
                                },
                                {
                                    name: 'Configuration',
                                    url: '/docs/libraries/js/config',
                                },
                                {
                                    name: 'Persistence',
                                    url: '/docs/libraries/js/persistence',
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
                        },
                        {
                            name: 'PHP',
                            url: '/docs/libraries/php',
                        },
                        {
                            name: 'Python',
                            url: '/docs/libraries/python',
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
                        },
                        {
                            name: 'Ruby',
                            url: '/docs/libraries/ruby',
                        },
                        {
                            name: 'Rust',
                            url: '/docs/libraries/rust',
                            badge: {
                                title: '3rd party',
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
                            name: 'Bubble',
                            url: '/docs/libraries/bubble',
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
                            name: 'Framer',
                            url: '/docs/libraries/framer',
                        },
                        {
                            name: 'Gatsby',
                            url: '/docs/libraries/gatsby',
                            badge: {
                                title: '3rd party',
                            },
                        },
                        {
                            name: 'Google Tag Manager',
                            url: '/docs/libraries/google-tag-manager',
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
                        },
                        {
                            name: 'n8n',
                            url: '/docs/libraries/n8n',
                        },
                        {
                            name: 'Phoenix',
                            url: '/docs/libraries/phoenix',
                        },
                        {
                            name: 'Remix',
                            url: '/docs/libraries/remix',
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
                            name: 'Sentry',
                            url: '/docs/libraries/sentry',
                        },
                        {
                            name: 'Shopify',
                            url: '/docs/libraries/shopify',
                            badge: {
                                title: '3rd party',
                            },
                        },
                        {
                            name: 'Svelte',
                            url: '/docs/libraries/svelte',
                        },
                        {
                            name: 'Vue.js',
                            url: '/docs/libraries/vue-js',
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
                            name: 'Decide',
                            url: '/docs/api/decide',
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
                            name: 'Feature flags',
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
                            name: 'Users',
                            url: '/docs/api/user',
                        },
                        {
                            name: 'Data model',
                            url: '/docs/data-model',
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
                            name: 'Annotations',
                            url: '/docs/data/annotations',
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
                    ],
                },
                {
                    name: 'Tools and features',
                    url: '/docs/max-ai',
                    icon: 'IconToolbar',
                    children: [
                        {
                            name: 'Max AI',
                            url: '/docs/max-ai',
                            badge: {
                                title: 'Beta',
                                className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                        },
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
                                    name: 'Variables',
                                    url: '/docs/sql/variables',
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
                            name: 'SSO & SAML',
                            url: '/docs/settings/sso',
                        },
                        {
                            name: 'Command palette',
                            url: '/docs/cmd-k',
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
                    url: '/docs/advanced/proxy/managed-reverse-proxy',
                    children: [
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
                            name: 'Next.js',
                            url: '/docs/advanced/proxy/nextjs',
                        },
                        {
                            name: 'Next.js middleware',
                            url: '/docs/advanced/proxy/nextjs-middleware',
                        },
                        {
                            name: 'nginx',
                            url: '/docs/advanced/proxy/nginx',
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
                            name: 'Remix',
                            url: '/docs/advanced/proxy/remix',
                        },
                        {
                            name: 'Vercel',
                            url: '/docs/advanced/proxy/vercel',
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
                            name: 'Annual plans',
                            url: '/docs/billing/annual-plans',
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
                            name: 'GDPR guidance',
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
                            url: '/handbook/company/security#soc-2',
                        },
                        {
                            name: 'Data egress & compliance',
                            url: '/docs/privacy/egress',
                        },
                        {
                            name: 'Data deletion',
                            url: '/docs/privacy/data-deletion',
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
                            name: 'Session replay',
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
            name: 'Product analytics',
            icon: 'IconGraph',
            color: 'blue',
            url: '/docs/product-analytics',
            description: 'Funnels, graphs, user paths, correlation analysis, retention, stickiness, lifecycle, SQL',
            children: [
                {
                    name: 'Product analytics',
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
                },
                {
                    name: 'Capturing events',
                    url: '/docs/product-analytics/capture-events',
                    icon: 'IconSend',
                    color: 'orange',
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
                    name: 'Troubleshooting and FAQs',
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
                    name: 'SQL insights',
                    url: '/docs/product-analytics/sql',
                    icon: 'IconHogQL',
                    color: 'purple',
                },
                {
                    name: 'Tools',
                },
                {
                    name: 'LLM insights',
                    url: '/docs/ai-engineering/llms',
                    icon: 'IconAIText',
                    color: 'yellow',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
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
            name: 'Web analytics',
            icon: 'IconPieChart',
            color: '[#36C46F]',
            url: '/docs/web-analytics',
            description: 'Monitor your website traffic. Built for people who really liked GA3...',
            children: [
                {
                    name: 'Web analytics',
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
                    name: 'Web vs product analytics',
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
                    name: 'Revenue analytics',
                    url: '/docs/web-analytics/revenue-analytics',
                    icon: 'IconPiggyBank',
                    color: 'salmon',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'FAQ',
                    url: '/docs/web-analytics/faq',
                    icon: 'IconQuestion',
                    color: 'blue',
                    featured: true,
                },
            ],
        },
        {
            name: 'Session replay',
            url: '/docs/session-replay',
            color: 'yellow',
            icon: 'IconRewindPlay',
            description: 'Watch how users interact with your app in a DVR-like playback experience',
            children: [
                {
                    name: 'Session replay',
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
                    name: 'Mobile session replay',
                    url: '/docs/session-replay/mobile',
                    icon: 'IconPhone',
                    color: 'blue',
                },
                {
                    name: 'Troubleshooting and FAQs',
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
                    name: 'Cutting costs',
                    url: '/docs/session-replay/cutting-costs',
                    icon: 'IconPiggyBank',
                    color: 'yellow',
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
            name: 'Feature flags',
            icon: 'IconToggle',
            color: 'seagreen',
            url: '/docs/feature-flags',
            description: 'Safely roll out features to specific users or groups',
            children: [
                {
                    name: 'Feature flags',
                },
                {
                    name: 'Overview',
                    url: '/docs/feature-flags',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Installation',
                    url: '/docs/feature-flags/installation',
                    icon: 'IconBook',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Creating feature flags',
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
                    name: 'Best practices',
                    url: '/docs/feature-flags/best-practices',
                    icon: 'IconStar',
                    color: 'red',
                },
                {
                    name: 'Troubleshooting and FAQs',
                    url: '/docs/feature-flags/common-questions',
                    icon: 'IconQuestion',
                    color: 'seagreen',
                },
                {
                    name: 'Tutorials and guides',
                    url: '/docs/feature-flags/tutorials',
                    icon: 'IconGraduationCap',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Cutting costs',
                    url: '/docs/feature-flags/cutting-costs',
                    icon: 'IconPiggyBank',
                    color: 'yellow',
                },
                {
                    name: 'Features',
                },
                {
                    name: 'Server-side local evaluation',
                    url: '/docs/feature-flags/local-evaluation',
                    icon: 'IconBolt',
                    color: 'orange',
                },
                {
                    name: 'Client-side bootstrapping',
                    url: '/docs/feature-flags/bootstrapping',
                    icon: 'IconLaptop',
                    color: 'salmon',
                },
                {
                    name: 'Remote config',
                    url: '/docs/feature-flags/remote-config',
                    icon: 'IconGear',
                    color: 'green',
                },
                {
                    name: 'Early access feature management',
                    url: '/docs/feature-flags/early-access-feature-management',
                    icon: 'IconFeatures',
                    color: 'purple',
                },
                {
                    name: 'Multi-project feature flags',
                    url: '/docs/feature-flags/multi-project-feature-flags',
                    icon: 'IconStack',
                    color: 'blue',
                },
                {
                    name: 'Scheduled flag changes',
                    url: '/docs/feature-flags/scheduled-flag-changes',
                    icon: 'IconClock',
                    color: 'seagreen',
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
                    name: 'Installation',
                    url: '/docs/experiments/installation',
                    icon: 'IconBook',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Creating an experiment',
                    url: '/docs/experiments/creating-an-experiment',
                    icon: 'IconTarget',
                    color: 'orange',
                    featured: true,
                },
                {
                    name: 'Creating a no-code experiment',
                    url: '/docs/experiments/no-code-web-experiments',
                    icon: 'IconApp',
                    color: 'seagreen',
                    featured: true,
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Experiment metrics',
                    url: '/docs/experiments/metrics',
                    icon: 'IconGraph',
                    color: 'red',
                },
                {
                    name: 'Adding your code',
                    url: '/docs/experiments/adding-experiment-code',
                    icon: 'IconCode',
                    color: 'salmon',
                },
                {
                    name: 'Testing and launching',
                    url: '/docs/experiments/testing-and-launching',
                    icon: 'IconRocket',
                    color: 'purple',
                    featured: true,
                },
                {
                    name: 'Best practices',
                    url: '/docs/experiments/best-practices',
                    icon: 'IconStar',
                    color: 'yellow',
                },
                {
                    name: 'Troubleshooting and FAQs',
                    url: '/docs/experiments/common-questions',
                    icon: 'IconQuestion',
                    color: 'seagreen',
                    featured: true,
                },
                {
                    name: 'Tutorials and guides',
                    url: '/docs/experiments/tutorials',
                    icon: 'IconGraduationCap',
                    color: 'blue',
                },
                {
                    name: 'Features',
                },
                {
                    name: 'Experiments without feature flags',
                    url: '/docs/experiments/running-experiments-without-feature-flags',
                    icon: 'IconFlag',
                    color: 'yellow',
                },
                {
                    name: 'Holdouts',
                    url: '/docs/experiments/holdouts',
                    icon: 'IconPeople',
                    color: 'orange',
                },
                {
                    name: 'New experimentation engine',
                    url: '/docs/experiments/new-experimentation-engine',
                    icon: 'IconTestTube',
                    color: 'green',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Data warehouse',
                    url: '/docs/experiments/data-warehouse',
                    icon: 'IconDatabase',
                    color: 'blue',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Under the hood',
                },
                {
                    name: 'Statistics overview',
                    url: '/docs/experiments/statistics',
                    icon: 'IconBook',
                    color: 'blue',
                },
                {
                    name: 'Funnels statistics',
                    url: '/docs/experiments/funnels-statistics',
                    icon: 'IconGraph',
                    color: 'yellow',
                },
                {
                    name: 'Trends count statistics',
                    url: '/docs/experiments/trends-count-statistics',
                    icon: 'IconGraph',
                    color: 'green',
                },
                {
                    name: 'Trends continuous statistics',
                    url: '/docs/experiments/trends-continuous-statistics',
                    icon: 'IconGraph',
                    color: 'red',
                },
                {
                    name: 'Traffic allocation',
                    url: '/docs/experiments/traffic-allocation',
                    icon: 'IconPeople',
                    color: 'orange',
                },
                {
                    name: 'Sample size and running time',
                    url: '/docs/experiments/sample-size-running-time',
                    icon: 'IconDashboard',
                    color: 'blue',
                },
            ],
        },
        {
            name: 'Error tracking',
            url: '/docs/error-tracking',
            icon: 'IconWarning',
            color: 'orange',
            description: 'Track and monitor errors and exceptions in your code.',
            children: [
                {
                    name: 'Error tracking',
                },
                {
                    name: 'Overview',
                    url: '/docs/error-tracking',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Installation',
                    url: '/docs/error-tracking/installation',
                    icon: 'IconBook',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Stack traces',
                    url: '/docs/error-tracking/stack-traces',
                    icon: 'IconCode',
                    color: 'purple',
                },
                {
                    name: 'Monitor errors',
                    url: '/docs/error-tracking/monitoring',
                    icon: 'IconGraph',
                    color: 'orange',
                    featured: true,
                },
                {
                    name: 'Alerts',
                    url: '/docs/error-tracking/alerts',
                    icon: 'IconBell',
                    color: 'red',
                },
                {
                    name: 'Troubleshooting and FAQs',
                    url: '/docs/error-tracking/common-questions',
                    icon: 'IconQuestion',
                    color: 'purple',
                    featured: true,
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
                    name: 'Troubleshooting and FAQs',
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
                    name: 'Features',
                },
                {
                    name: 'Webhook',
                    url: '/docs/surveys/webhook',
                    icon: 'IconLaptop',
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
        ...[dataPipelines],
        {
            name: 'Data warehouse',
            url: '/docs/data-warehouse',
            color: 'lilac',
            icon: 'IconDatabase',
            description: 'Unify and query data from any source and analyze it alongside your product data',
            children: [
                {
                    name: 'Data warehouse',
                },
                {
                    name: 'Overview',
                    url: '/docs/data-warehouse',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Creating insights from sources',
                    url: '/docs/data-warehouse/query',
                    icon: 'IconHogQL',
                    color: 'purple',
                },
                {
                    name: 'Joining data',
                    url: '/docs/data-warehouse/join',
                    icon: 'IconList',
                    color: 'orange',
                    featured: true,
                },
                {
                    name: 'Save views',
                    url: '/docs/data-warehouse/views',
                    icon: 'IconCalculator',
                    color: 'salmon',
                    featured: true,
                },
                {
                    name: 'Under the hood',
                    url: '/docs/data-warehouse/under-the-hood',
                    icon: 'IconMagicWand',
                    color: 'seagreen',
                    featured: true,
                },
                {
                    name: 'Tutorials and guides',
                    url: '/docs/data-warehouse/tutorials',
                    icon: 'IconGraduationCap',
                    color: 'blue',
                    featured: true,
                },
            ],
        },
        {
            name: 'LLM observability',
            url: '/docs/ai-engineering',
            color: '[#681291]',
            colorDark: '[#C170E8]',
            icon: 'IconAI',
            description: 'Insights for building your AI and LLM products',
            badge: {
                title: 'Beta',
                className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
            },
            children: [
                {
                    name: 'LLM observability',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Overview',
                    url: '/docs/ai-engineering',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Installation',
                    url: '/docs/ai-engineering/observability',
                    icon: 'IconBook',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Dashboard',
                    url: '/docs/ai-engineering/dashboard',
                    icon: 'IconDashboard',
                    color: 'red',
                },
                {
                    name: 'Traces and generations',
                    url: '/docs/ai-engineering/traces-generations',
                    icon: 'IconTarget',
                    color: 'orange',
                },
                {
                    name: 'Tutorials and guides',
                    url: '/docs/ai-engineering/tutorials',
                    icon: 'IconGraduationCap',
                    color: 'salmon',
                    featured: true,
                },
                {
                    name: 'Observability integrations',
                    url: '/docs/ai-engineering/llm-insights',
                    icon: 'IconAIText',
                    featured: true,
                    color: 'purple',
                    children: [
                        {
                            name: 'Helicone',
                            url: '/docs/ai-engineering/helicone-posthog',
                        },
                        {
                            name: 'Langfuse',
                            url: '/docs/ai-engineering/langfuse-posthog',
                        },
                        {
                            name: 'Traceloop',
                            url: '/docs/ai-engineering/traceloop-posthog',
                        },
                        {
                            name: 'Keywords AI',
                            url: '/docs/ai-engineering/keywords-ai-posthog',
                        },
                    ],
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

export const productMenu = {
    name: 'Products',
    url: '/products',
    icon: 'IconApps',
    children: [
        {
            name: 'All products',
            icon: 'IconApps',
            color: 'red',
            url: '/products',
        },
        {
            name: 'Product analytics',
            icon: 'IconGraph',
            color: 'blue',
            url: '/product-analytics',
        },
        {
            name: 'Web analytics',
            icon: 'IconPieChart',
            color: '[#36C46F]',
            url: '/web-analytics',
        },
        {
            name: 'Session replay',
            icon: 'IconRewindPlay',
            color: 'yellow',
            url: '/session-replay',
        },
        {
            name: 'Feature flags',
            icon: 'IconToggle',
            color: 'seagreen',
            url: '/feature-flags',
        },
        {
            name: 'Experiments',
            icon: 'IconFlask',
            color: 'purple',
            url: '/experiments',
        },
        {
            name: 'Error tracking',
            icon: 'IconWarning',
            color: 'orange',
            url: '/error-tracking',
        },
        {
            name: 'Surveys',
            icon: 'IconMessage',
            color: 'salmon',
            url: '/surveys',
        },
        {
            name: 'Data pipelines',
            icon: 'IconPlug',
            color: 'sky-blue',
            url: '/cdp',
        },
        {
            name: 'Data warehouse',
            icon: 'IconDatabase',
            color: 'lilac',
            url: '/data-warehouse',
        },
        {
            name: 'Product OS',
            icon: 'IconStack',
            color: 'blue',
            url: '/product-os',
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
    productMenu,
    pricingMenu,
    docsMenu,
    communityMenu,
    companyMenu,
]

export default menu
