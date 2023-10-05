export const handbookSidebar = [
    {
        name: 'Handbook',
    },
    {
        name: 'Table of contents',
        url: '/handbook',
        // icon: 'Info',
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
                name: '4. How we make users happy',
                url: '/handbook/making-users-happy',
            },
            {
                name: '5. How we make money',
                url: '/handbook/how-we-make-money',
            },
            {
                name: '6. Enduringly low prices',
                url: '/handbook/low-prices',
            },
            {
                name: '7. Deciding which products to build',
                url: '/handbook/which-products',
            },
            {
                name: '8. A wide company with small teams',
                url: '/handbook/wide-company',
            },
            {
                name: "9. How we're building a world-class team",
                url: '/handbook/strong-team',
            },
            {
                name: '10. What we value',
                url: '/handbook/values',
            },
            {
                name: '11. Providing a world-class engineering environment',
                url: '/handbook/world-class-engineering',
            },
            {
                name: '12. Not running out of money',
                url: '/handbook/finance',
            },
            {
                name: '13. Where we are now',
                url: '/handbook/current-status',
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
        name: 'Departments & teams',
    },
    {
        name: 'Team structure',
        url: '/handbook/small-teams/team-structure',
    },
    {
        name: 'Customer success',
        url: '',
        children: [
            {
                name: 'Team',
                url: '/handbook/small-teams/customer-success',
            },
            {
                name: 'Customer support',
                url: '/handbook/growth/customer-support',
            },
            {
                name: 'Sales overview',
                url: '/handbook/growth/sales/overview',
            },
            {
                name: 'Sales operations',
                url: '/handbook/growth/sales/sales-operations',
                children: [
                    {
                        name: 'Managing our CRM',
                        url: '/handbook/growth/sales/crm',
                    },
                    {
                        name: 'New customer onboarding',
                        url: '/handbook/growth/sales/customer-onboarding',
                    },
                    {
                        name: 'YC onboarding',
                        url: '/handbook/growth/sales/yc-onboarding',
                    },
                    {
                        name: 'Demos',
                        url: '/handbook/growth/sales/demos',
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
                        name: 'Who we do business with',
                        url: '/handbook/growth/sales/who-we-do-business-with',
                    },
                    {
                        name: 'Historical import',
                        url: '/handbook/growth/sales/historical-import',
                    },
                ],
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
                name: 'Brand assets',
                url: '/handbook/company/brand-assets',
            },
            {
                name: 'Art requests',
                url: '/handbook/design/art-requests',
            },
            {
                name: 'Brand strategy',
                url: '/handbook/strategy/brand',
            },
        ],
    },
    {
        name: 'Engineering',
        url: '',
        children: [
            {
                name: 'Small teams',
            },
            {
                name: 'Data Warehouse',
                url: '/handbook/small-teams/dw',
            },
            {
                name: 'Feature Success',
                url: '/handbook/small-teams/feature-success',
            },
            {
                name: 'Infrastructure',
                url: '/handbook/small-teams/infrastructure',
            },
            {
                name: 'Monitoring',
                url: '/handbook/small-teams/monitoring',
            },
            {
                name: 'Pipeline',
                url: '/handbook/small-teams/pipeline',
            },
            {
                name: 'Product Analytics',
                url: '/handbook/small-teams/product-analytics',
            },
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
                        name: 'Releasing a new version',
                        url: '/handbook/engineering/release-new-version',
                    },
                    {
                        name: 'Handling incidents',
                        url: '/handbook/engineering/incidents',
                    },
                    {
                        name: 'On-call rotation',
                        url: '/handbook/engineering/oncall-rotation',
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
                        name: 'Event ingestion explained',
                        url: '/handbook/engineering/databases/event-ingestion',
                    },
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
                name: 'Shipping things, step by step',
                url: '/handbook/engineering/development-process',
            },
            {
                name: 'Feature flags specification',
                url: '/handbook/engineering/feature-flags-spec',
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
                name: 'Team',
                url: '/handbook/small-teams/exec',
            },
        ],
    },
    {
        name: 'Growth',
        url: '',
        children: [
            {
                name: 'Team',
                url: '/handbook/small-teams/growth',
            },
            {
                name: 'Growth reviews',
                url: '/handbook/growth/growth-engineering/growth-sessions',
            },
            {
                name: 'Pricing principles',
                url: '/handbook/engineering/feature-pricing',
            },
        ],
    },
    {
        name: 'Marketing & content',
        url: '',
        children: [
            {
                name: 'Team',
                url: '/handbook/small-teams/marketing',
            },
            {
                name: 'Overview',
                url: '/handbook/growth/marketing',
            },
            {
                name: 'Value proposition',
                url: '/handbook/growth/marketing/value-propositions',
            },
            {
                name: 'Marketing channels',
                url: '',
                children: [
                    {
                        name: 'Content & SEO',
                        url: '/handbook/growth/marketing/blog',
                    },
                    {
                        name: 'Email & newsletter',
                        url: '/handbook/growth/marketing/newsletter',
                    },
                    {
                        name: 'Paid ads',
                        url: '/handbook/growth/marketing/paid',
                    },
                    {
                        name: 'Sponsorships',
                        url: '/handbook/growth/marketing/open-source-sponsorship',
                    },
                    {
                        name: 'In-app',
                        url: '/handbook/growth/marketing/in-app',
                    },
                    {
                        name: 'PostHog for Startups',
                        url: '/handbook/growth/marketing/startups',
                    },
                    {
                        name: 'Press',
                        url: '/handbook/growth/marketing/press',
                    },
                    {
                        name: 'YouTube',
                        url: '/handbook/growth/marketing/youtube',
                    },
                ],
            },
            {
                name: 'Product announcements',
                url: '/handbook/growth/marketing/product-announcements',
            },
            {
                name: 'Testimonials',
                url: '/handbook/growth/marketing/testimonials',
            },
            {
                name: 'Dashboard templates',
                url: '/handbook/growth/marketing/templates',
            },
            {
                name: 'Style guide',
                url: '/handbook/growth/marketing/posthog-style-guide',
            },
        ],
    },
    {
        name: 'Ops & finance',
        url: '',
        children: [
            {
                name: 'Team',
                url: '/handbook/small-teams/people',
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
        name: 'People',
        url: '',
        children: [
            {
                name: 'Team',
                url: '/handbook/small-teams/people',
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
                name: 'Clubs',
                url: '/handbook/people/clubs',
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
                name: 'Hiring process',
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
                ],
            },
            {
                name: 'How we work',
                url: '',
                children: [
                    {
                        name: 'Culture',
                        url: '/handbook/company/culture',
                    },
                    {
                        name: 'Values',
                        url: '/handbook/company/values',
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
                        name: 'Goal setting',
                        url: '/handbook/company/goal-setting',
                    },
                    {
                        name: 'Diversity and inclusion',
                        url: '/handbook/company/diversity',
                    },
                    {
                        name: 'Communication',
                        url: '/handbook/company/communication',
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
                name: 'In-app prompts',
                url: '/handbook/product/in-app-prompts',
            },
        ],
    },
    {
        name: 'Web Analytics',
        url: '',
        children: [
            {
                name: 'Team',
                url: '/handbook/small-teams/web-analytics',
            },
        ],
    },
    {
        name: 'Website & Docs',
        url: '',
        children: [
            {
                name: 'Team',
                url: '/handbook/small-teams/website-docs',
            },
            {
                name: 'Community',
                url: '/handbook/small-teams/website-docs/community',
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
                        name: 'MDX setup',
                        url: '/handbook/engineering/posthog-com/mdx-setup',
                    },
                    {
                        name: 'Markdown',
                        url: '/handbook/engineering/posthog-com/markdown',
                    },
                    {
                        name: 'Posting a new job',
                        url: '/handbook/engineering/posthog-com/jobs',
                    },
                    {
                        name: 'Managing the company roadmap',
                        url: '/handbook/engineering/posthog-com/roadmap',
                    },
                    {
                        name: 'Editing API docs',
                        url: '/handbook/engineering/posthog-com/api-docs',
                    },
                ],
            },
        ],
    },
]

export const communityMenu = {
    name: 'Community',
    url: '/posts',
    icon: 'Chat',
    children: [
        {
            name: 'Posts',
            icon: 'Newspaper',
            color: 'red',
            url: '/posts',
        },
        {
            name: 'Questions',
            icon: 'Message',
            color: 'blue',
            url: '/questions',
        },
        {
            name: 'Guides',
            icon: 'Map',
            color: 'red',
            url: '/tutorials',
            children: [
                {
                    name: 'All guides',
                    icon: 'Home',
                    color: 'seagreen',
                    url: '/tutorials',
                },
                {
                    name: 'Product OS',
                    icon: 'Stack',
                    color: 'salmon',
                    url: '/tutorials/categories/actions',
                    children: [
                        { name: 'Actions', url: '/tutorials/categories/actions' },
                        { name: 'Apps', url: '/tutorials/categories/apps' },
                        { name: 'Cohorts', url: '/tutorials/categories/cohorts' },
                        { name: 'Data management', url: '/tutorials/categories/data-management' },
                        { name: 'Events', url: '/tutorials/categories/events' },
                        { name: 'Heatmaps', url: '/tutorials/categories/heatmaps' },
                        { name: 'HogQL', url: '/tutorials/categories/hogql' },
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
                    icon: 'Graph',
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
                    icon: 'RewindPlay',
                    url: '/tutorials/categories/session-replay',
                },
                {
                    name: 'Feature flags',
                    icon: 'Toggle',
                    color: 'seagreen',
                    url: '/tutorials/categories/feature-flags',
                },
                {
                    name: 'A/B testing',
                    icon: 'Flask',
                    color: 'purple',
                    url: '/tutorials/categories/experimentation',
                    children: [{ name: 'Experimentation', url: '/tutorials/categories/experimentation' }],
                },
                {
                    name: 'CDP',
                    color: 'yellow',
                    icon: 'Person',
                    url: '/tutorials/categories/filters',
                    children: [
                        { name: 'Filters', url: '/tutorials/categories/filters' },
                        { name: 'Sentry', url: '/tutorials/categories/sentry' },
                        { name: 'Zapier', url: '/tutorials/categories/zapier' },
                    ],
                },
            ],
        },
        {
            name: 'Templates',
            icon: 'Magic',
            color: 'orange',
            url: '/templates',
        },
        {
            name: 'Newsletter',
            icon: 'Newspaper',
            color: 'green',
            url: '/newsletter',
        },
        {
            name: 'Merch',
            icon: 'Store',
            color: 'seagreen',
            url: 'https://merch.posthog.com',
        },
    ],
}

export const companyMenu = {
    name: 'Company',
    url: '/about',
    icon: 'Logomark',
    children: [
        { name: 'About', icon: 'Logomark', url: '/about' },
        {
            name: 'Roadmap',
            icon: 'Map',
            color: 'orange',
            url: '/roadmap',
        },
        {
            name: 'Changelog',
            icon: 'Calendar',
            color: 'red',
            url: '/changelog/2023',
        },
        { name: 'Team', icon: 'Profile', color: 'blue', url: '/team' },
        { name: 'Handbook', icon: 'Book', color: 'seagreen', url: '/handbook', children: handbookSidebar },
        {
            name: 'Blog',
            icon: 'Newspaper',
            color: 'yellow',
            url: '/blog',
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
        { name: 'Careers', icon: 'Laptop', color: 'purple', url: '/careers' },
    ],
}

export const docsMenu = {
    name: 'Docs',
    url: '/docs',
    icon: 'Book',
    children: [
        {
            name: 'Product OS',
            icon: 'Stack',
            color: 'salmon',
            url: '/docs/product-os',
            children: [
                {
                    name: 'Docs',
                },
                {
                    name: 'Overview',
                    url: '/docs',
                    icon: 'Info',
                },
                {
                    name: 'New to PostHog?',
                },
                {
                    name: 'Start here',
                    url: '/docs/getting-started/install',
                    icon: 'Flag',
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
                            name: 'User properties',
                            url: '/docs/getting-started/user-properties',
                        },
                        {
                            name: 'Actions & insights',
                            url: '/docs/getting-started/actions-and-insights',
                        },
                        {
                            name: 'Group analytics',
                            url: '/docs/getting-started/group-analytics',
                        },
                        {
                            name: 'Next steps',
                            url: '/docs/getting-started/next-steps',
                        },
                        {
                            name: 'Enabling beta features',
                            url: '/docs/getting-started/enable-betas',
                        },
                    ],
                },
                {
                    name: 'SDKs',
                    url: '/docs/libraries',
                    icon: 'Box',
                    children: [
                        {
                            name: 'Library comparison',
                            url: '/docs/libraries',
                        },
                        {
                            name: 'JavaScript Web',
                            url: '/docs/libraries/js',
                            badge: {
                                title: 'Popular',
                                className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
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
                        },
                    ],
                },
                {
                    name: 'Framework guides',
                    url: '/docs/frameworks',
                    icon: 'Book',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/frameworks',
                        },
                        {
                            name: 'Docusaurus v2',
                            url: '/docs/libraries/docusaurus',
                            badge: {
                                title: '3rd party',
                            },
                        },
                        {
                            name: 'Framer',
                            url: '/tutorials/framer-analytics',
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
                            name: 'Next.js',
                            url: '/docs/libraries/next-js',
                        },
                        {
                            name: 'Nuxt.js',
                            url: '/docs/libraries/nuxt-js',
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
                            name: 'Slack',
                            url: '/docs/libraries/slack',
                        },
                        {
                            name: 'Shopify',
                            url: '/docs/libraries/shopify',
                        },
                        {
                            name: 'Vue.js',
                            url: '/docs/libraries/vue-js',
                        },
                        {
                            name: 'Webflow',
                            url: '/tutorials/webflow',
                        },
                        {
                            name: 'WordPress',
                            url: '/docs/libraries/wordpress',
                        },
                    ],
                },
                {
                    name: 'Advanced',
                    url: '/docs/advanced/cdp',
                    icon: 'Advanced',
                    children: [
                        {
                            name: 'Using a CDP',
                            url: '/docs/advanced/cdp',
                        },
                        {
                            name: 'Deploying a reverse proxy',
                            url: '/docs/advanced/proxy',
                            children: [
                                {
                                    name: 'Caddy',
                                    url: '/docs/advanced/proxy/caddy',
                                },
                                {
                                    name: 'Cloudflare',
                                    url: '/docs/advanced/proxy/cloudflare',
                                },
                                {
                                    name: 'AWS CloudFront',
                                    url: '/docs/advanced/proxy/cloudfront',
                                },
                                {
                                    name: 'Next.js',
                                    url: '/docs/advanced/proxy/nextjs',
                                },
                                {
                                    name: 'Netlify',
                                    url: '/docs/advanced/proxy/netlify',
                                },
                                {
                                    name: 'Vercel',
                                    url: '/docs/advanced/proxy/vercel',
                                },
                            ],
                        },
                        {
                            name: 'Browser extensions',
                            url: '/docs/advanced/browser-extension',
                        },
                    ],
                },
                {
                    name: 'Product OS',
                },
                {
                    name: 'What is Product OS?',
                    url: '/docs/product-os',
                    icon: 'Info',
                },
                {
                    name: 'Data',
                    url: '/docs/data',
                    icon: 'HardDrive',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/data',
                        },
                        {
                            name: 'Actions',
                            url: '/docs/data/actions',
                        },
                        {
                            name: 'Annotations',
                            url: '/docs/data/annotations',
                        },
                        {
                            name: 'Autocapture',
                            url: '/docs/data/autocapture',
                        },
                        {
                            name: 'Cohorts',
                            url: '/docs/data/cohorts',
                        },
                        {
                            name: 'Events',
                            url: '/docs/data/events',
                        },
                        {
                            name: 'Organizations & projects',
                            url: '/docs/data/organizations-and-projects',
                        },
                        {
                            name: 'Persons',
                            url: '/docs/data/persons',
                        },
                        {
                            name: 'Role-based access',
                            url: '/docs/data/role-based-access',
                        },
                        {
                            name: 'Sessions',
                            url: '/docs/data/sessions',
                        },
                        {
                            name: 'Settings',
                            url: '/docs/data/application-settings',
                        },
                        {
                            name: 'SSO & SAML',
                            url: '/docs/data/sso',
                        },
                        {
                            name: 'Team collaboration',
                            url: '/docs/data/team-collaboration',
                        },
                        {
                            name: 'User properties',
                            url: '/docs/data/user-properties',
                        },
                        {
                            name: 'UTM segmentation',
                            url: '/docs/data/utm-segmentation',
                        },
                    ],
                },
                {
                    name: 'HogQL',
                    url: '/docs/hogql',
                    icon: 'HogQL',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/hogql',
                        },
                        {
                            name: 'Guide',
                            url: '/docs/hogql/guide',
                        },
                        {
                            name: 'Expressions',
                            url: '/docs/hogql/expressions',
                        },
                        {
                            name: 'Supported ClickHouse functions',
                            url: '/docs/hogql/clickhouse-functions',
                        },
                        {
                            name: 'Supported aggregations',
                            url: '/docs/hogql/aggregations',
                        },
                        {
                            name: 'Tutorials',
                            url: '/docs/hogql/tutorials',
                        },
                    ],
                },
                {
                    name: 'Toolbar',
                    url: '/docs/toolbar',
                    icon: 'Toolbar',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/toolbar',
                        },
                        {
                            name: 'Heatmaps',
                            url: '/docs/toolbar/heatmaps',
                        },
                        {
                            name: 'Creating actions',
                            url: '/docs/toolbar/create-toolbar-actions',
                        },
                        {
                            name: 'Overriding feature flags',
                            url: '/docs/toolbar/override-feature-flags',
                        },
                    ],
                },
                {
                    name: 'Command palette',
                    url: '/docs/cmd-k',
                    icon: 'Search',
                },
                {
                    name: 'Apps',
                    url: '/docs/apps',
                    icon: 'Apps',
                    children: [
                        {
                            url: '/docs/apps/notification-bar',
                            name: 'Notification Bar',
                        },
                        {
                            url: '/docs/apps/pineapple-mode',
                            name: 'Pineapple Mode',
                        },
                        {
                            name: 'Build an app',
                            url: '',
                            children: [
                                {
                                    name: 'Overview',
                                    url: '/docs/apps/build',
                                },
                                {
                                    name: 'Tutorial',
                                    url: '/docs/apps/build/tutorial',
                                },
                                {
                                    name: 'Troubleshooting',
                                    url: '/docs/apps/enabling',
                                },
                                {
                                    name: 'Developer reference',
                                    url: '/docs/apps/build/reference',
                                },
                                {
                                    name: 'Using the PostHog API',
                                    url: '/docs/apps/build/api',
                                },
                                {
                                    name: 'Jobs',
                                    url: '/docs/apps/build/jobs',
                                },
                                {
                                    name: 'Testing',
                                    url: '/docs/apps/build/testing',
                                },
                                {
                                    name: 'TypeScript types',
                                    url: '/docs/apps/build/types',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'API',
                    url: '/docs/api',
                    icon: 'Brackets',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/api',
                        },
                        {
                            name: 'POST-only public endpoints',
                            url: '/docs/api/post-only-endpoints',
                        },
                        {
                            name: 'Actions',
                            url: '/docs/api/actions',
                        },
                        {
                            name: 'Annotations',
                            url: '/docs/api/annotations',
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
                            name: 'Funnels',
                            url: '/docs/api/funnel',
                        },
                        {
                            name: 'Group analytics',
                            url: '/docs/api/groups',
                        },
                        {
                            name: 'Groups types',
                            url: '/docs/api/groups-types',
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
                            name: 'Persons',
                            url: '/docs/api/persons',
                        },
                        {
                            name: 'Plugin configs',
                            url: '/docs/api/plugin-configs',
                        },
                        {
                            name: 'Plugins',
                            url: '/docs/api/plugins',
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
                            name: 'Session recordings',
                            url: '/docs/api/session-recordings',
                        },
                        {
                            name: 'Trends',
                            url: '/docs/api/trend',
                        },
                        {
                            name: 'Users',
                            url: '/docs/api/user',
                        },
                        {
                            name: 'Query',
                            url: '/docs/api/query',
                        },
                        {
                            name: 'Data model',
                            url: '/docs/data-model',
                        },
                    ],
                },
                {
                    name: 'Webhooks',
                    url: '/docs/webhooks',
                    icon: 'Webhooks',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/webhooks',
                        },
                        {
                            name: 'Microsoft Teams',
                            url: '/docs/webhooks/microsoft-teams',
                        },
                        {
                            name: 'Slack',
                            url: '/docs/webhooks/slack',
                        },
                        {
                            name: 'Discord',
                            url: '/docs/webhooks/discord',
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
                            name: 'Upgrading PostHog',
                            url: '',
                            children: [
                                {
                                    name: 'Overview',
                                    url: '/docs/runbook/upgrading-posthog',
                                },
                                {
                                    name: 'Upgrade notes',
                                    url: '/docs/runbook/upgrade-notes',
                                },
                            ],
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
                                    name: 'Monitoring with Grafana',
                                    url: '/docs/self-host/configure/monitoring-with-grafana',
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
                                    name: 'Helm chart configuration',
                                    url: '/docs/self-host/deploy/configuration',
                                },
                                {
                                    name: 'Deploying ClickHouse using Altinity.Cloud',
                                    url: '/docs/self-host/configure/using-altinity-cloud',
                                },
                                {
                                    name: 'Configuring Slack',
                                    url: '/docs/self-host/configure/slack',
                                },
                            ],
                        },
                        {
                            name: 'Runbook',
                            url: '',
                            children: [
                                {
                                    name: 'Overview',
                                    url: '/docs/runbook',
                                },
                                {
                                    name: 'Async migrations',
                                    url: '',
                                    children: [
                                        {
                                            name: 'Overview',
                                            url: '/docs/runbook/async-migrations',
                                        },
                                        {
                                            name: '0001-events-sample-by',
                                            url: '/docs/runbook/async-migrations/0001-events-sample-by',
                                        },
                                        {
                                            name: '0002_events_sample_by',
                                            url: '/docs/runbook/async-migrations/0002-events-sample-by',
                                        },
                                        {
                                            name: '0003_fill_person_distinct_id2',
                                            url: '/docs/runbook/async-migrations/0003-fill-person-distinct-id2',
                                        },
                                    ],
                                },
                                {
                                    name: 'Services',
                                    url: '',
                                    children: [
                                        {
                                            name: 'ClickHouse',
                                            url: '/docs/runbook/services/clickhouse',
                                            children: [
                                                {
                                                    name: 'Backup',
                                                    url: '/docs/runbook/services/clickhouse/backup',
                                                },
                                                {
                                                    name: 'Debug hanging / freezing process',
                                                    url: '/docs/runbook/services/clickhouse/debug-hanging-freezing-process',
                                                },
                                                {
                                                    name: 'Horizontal scaling (Sharding & replication)',
                                                    url: '/docs/runbook/services/clickhouse/sharding-and-replication',
                                                },
                                                {
                                                    name: 'Kafka Engine',
                                                    url: '/docs/runbook/services/clickhouse/kafka-engine',
                                                },
                                                {
                                                    name: 'Resize disk',
                                                    url: '/docs/runbook/services/clickhouse/resize-disk',
                                                },
                                                {
                                                    name: 'Restore',
                                                    url: '/docs/runbook/services/clickhouse/restore',
                                                },
                                                {
                                                    name: 'Vertical scaling',
                                                    url: '/docs/runbook/services/clickhouse/vertical-scaling',
                                                },
                                                {
                                                    name: 'Debugging load',
                                                    url: '/docs/runbook/services/clickhouse/debugging-load',
                                                },
                                            ],
                                        },
                                        {
                                            name: 'Kafka',
                                            url: '/docs/runbook/services/kafka',
                                            children: [
                                                {
                                                    name: 'Resize disk',
                                                    url: '/docs/runbook/services/kafka/resize-disk',
                                                },
                                                {
                                                    name: 'Log retention',
                                                    url: '/docs/runbook/services/kafka/log-retention',
                                                },
                                            ],
                                        },
                                        {
                                            name: 'PostgreSQL',
                                            url: '/docs/runbook/services/postgresql',
                                            children: [
                                                {
                                                    name: 'Resize disk',
                                                    url: '/docs/runbook/services/postgresql/resize-disk',
                                                },
                                                {
                                                    name: 'Troubleshooting long-running migrations',
                                                    url: '/docs/runbook/services/postgresql/long-migrations',
                                                },
                                            ],
                                        },
                                        {
                                            name: 'Plugin server',
                                            url: '/docs/runbook/services/plugin-server',
                                            children: [
                                                {
                                                    name: 'Overview',
                                                    url: '/docs/runbook/services/plugin-server',
                                                },
                                                {
                                                    name: 'Jobs not executing',
                                                    url: '/docs/runbook/services/plugin-server/jobs',
                                                },
                                                {
                                                    name: 'Scheduled tasks not executing',
                                                    url: '/docs/runbook/services/plugin-server/scheduled-tasks',
                                                },
                                            ],
                                        },
                                        {
                                            name: 'MinIO',
                                            url: '/docs/runbook/services/minio',
                                        },
                                        {
                                            name: 'Redis',
                                            url: '/docs/runbook/services/redis',
                                        },
                                        {
                                            name: 'Zookeeper',
                                            url: '/docs/runbook/services/zookeeper',
                                        },
                                    ],
                                },
                                {
                                    name: 'Disaster recovery',
                                    url: '/docs/runbook/disaster-recovery',
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
                    name: 'Migrate & export',
                    url: '',
                    children: [
                        {
                            name: 'Ingest historical data',
                            url: '/docs/migrate/ingest-historic-data',
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
                            name: 'Migrate to PostHog Cloud EU',
                            url: '/tutorials/migrate-eu-cloud',
                        },
                        {
                            name: 'Migrate from a broken self-hosted instance',
                            url: '/docs/migrate/migrate-broken-self-hosted',
                        },
                        {
                            name: 'Export your events',
                            url: '/docs/migrate/export-events',
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
                            name: 'Common questions about billing',
                            url: '/docs/billing/common-questions',
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
                            name: 'Data model',
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
            icon: 'Graph',
            color: 'blue',
            url: '/docs/product-analytics',
            children: [
                {
                    name: 'Product analytics',
                },
                {
                    name: 'Overview',
                    url: '/docs/product-analytics',
                    icon: 'Home',
                    color: 'seagreen',
                },
                {
                    name: 'Installation',
                    url: '/docs/product-analytics/installation',
                    icon: 'Book',
                    color: 'blue',
                },
                {
                    name: 'Capturing events',
                    url: '/docs/product-analytics/capture-events',
                    icon: 'Send',
                    color: 'orange',
                },
                {
                    name: 'Creating insights',
                    url: '/docs/product-analytics/insights',
                    icon: 'Graph',
                    color: 'red',
                },
                {
                    name: 'Identifying users',
                    url: '/docs/product-analytics/identify',
                    icon: 'Person',
                    color: 'purple',
                },
                {
                    name: 'Setting user properties',
                    url: '/docs/product-analytics/user-properties',
                    icon: 'Profile',
                    color: 'seagreen',
                },
                {
                    name: 'Group analytics',
                    url: '/docs/product-analytics/group-analytics',
                    icon: 'People',
                    color: 'orange',
                },
                {
                    name: 'Troubleshooting and FAQs',
                    url: '/docs/product-analytics/troubleshooting',
                    icon: 'Question',
                    color: 'blue',
                },
                {
                    name: 'Tutorials and guides',
                    url: '/docs/product-analytics/tutorials',
                    icon: 'GraduationCap',
                    color: 'red',
                },
                {
                    name: 'Analysis views',
                },
                {
                    name: 'Graphs & trends',
                    url: '/docs/product-analytics/trends',
                    icon: 'Trends',
                    color: 'blue',
                },
                {
                    name: 'Funnels',
                    url: '/docs/product-analytics/funnels',
                    icon: 'Funnels',
                    color: 'yellow',
                },
                {
                    name: 'Dashboards',
                    url: '/docs/product-analytics/dashboards',
                    icon: 'Dashboard',
                    color: 'purple',
                },
                {
                    name: 'User paths',
                    url: '/docs/product-analytics/paths',
                    icon: 'UserPaths',
                    color: 'seagreen',
                },
                {
                    name: 'Stickiness',
                    url: '/docs/product-analytics/stickiness',
                    icon: 'Stickiness',
                    color: 'red',
                },
                {
                    name: 'Correlation analysis',
                    url: '/docs/product-analytics/correlation',
                    color: 'blue',
                    icon: 'ArrowUpRight',
                },
                {
                    name: 'Retention',
                    url: '/docs/product-analytics/retention',
                    icon: 'Retention',
                    color: 'seagreen',
                },
                {
                    name: 'Lifecycle',
                    url: '/docs/product-analytics/lifecycle',
                    icon: 'Lifecycle',
                    color: 'yellow',
                },
                {
                    name: 'SQL',
                    url: '/docs/product-analytics/sql',
                    icon: 'HogQL',
                    color: 'purple',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Notifications',
                    url: '/docs/product-analytics/subscriptions',
                    icon: 'Bell',
                    color: 'red',
                },
                {
                    name: 'Tools',
                },
                {
                    name: 'Autocapture',
                    url: '/docs/product-analytics/autocapture',
                    icon: 'Bolt',
                    color: 'red',
                },
                {
                    name: 'Data management',
                    url: '/docs/data',
                    icon: 'Database',
                    color: 'blue',
                },
                {
                    name: 'Sampling',
                    url: '/docs/product-analytics/sampling',
                    icon: 'Sampling',
                    color: 'purple',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
            ],
        },
        {
            name: 'Session replay',
            url: '/docs/session-replay',
            color: 'yellow',
            icon: 'RewindPlay',
            children: [
                {
                    name: 'Session replay',
                },
                {
                    name: 'Overview',
                    url: '/docs/session-replay',
                    icon: 'Home',
                    color: 'seagreen',
                },
                {
                    name: 'Installation',
                    url: '/docs/session-replay/installation',
                    icon: 'Book',
                    color: 'blue',
                },
                {
                    name: 'Watching recordings',
                    url: '/docs/session-replay/how-to-watch-recordings',
                    icon: 'App',
                    color: 'orange',
                },
                {
                    name: 'Controlling which sessions you record',
                    url: '/docs/session-replay/how-to-control-which-sessions-you-record',
                    icon: 'Toggle',
                    color: 'red',
                },
                {
                    name: 'Troubleshooting and FAQs',
                    url: '/docs/session-replay/troubleshooting',
                    icon: 'Question',
                    color: 'purple',
                },
                {
                    name: 'Tutorials and guides',
                    url: '/docs/session-replay/tutorials',
                    icon: 'GraduationCap',
                    color: 'blue',
                },
                {
                    name: 'Features',
                },
                {
                    name: 'Console log recording',
                    url: '/docs/session-replay/console-log-recording',
                    icon: 'Code',
                    color: 'red',
                },
                {
                    name: 'Network performance',
                    url: '/docs/session-replay/network-recording',
                    icon: 'Dashboard',
                    color: 'seagreen',
                },
                {
                    name: 'Privacy controls',
                    url: '/docs/session-replay/privacy',
                    icon: 'Shield',
                    color: 'orange',
                },
                {
                    name: 'Sharing and embedding',
                    url: '/docs/session-replay/sharing',
                    icon: 'Share',
                    color: 'purple',
                },
                {
                    name: 'Data retention',
                    url: '/docs/session-replay/data-retention',
                    icon: 'Calendar',
                    color: 'seagreen',
                },
                {
                    name: 'Iframe recording',
                    url: '/docs/session-replay/iframes',
                    icon: 'Code',
                    color: 'salmon',
                },
            ],
        },
        {
            name: 'Feature flags',
            icon: 'Toggle',
            color: 'seagreen',
            url: '/docs/feature-flags',
            children: [
                {
                    name: 'Feature flags',
                },
                {
                    name: 'Overview',
                    url: '/docs/feature-flags',
                    icon: 'Home',
                    color: 'seagreen',
                },
                {
                    name: 'Installation',
                    url: '/docs/feature-flags/installation',
                    icon: 'Book',
                    color: 'blue',
                },
                {
                    name: 'Creating feature flags',
                    url: '/docs/feature-flags/creating-feature-flags',
                    icon: 'Flag',
                    color: 'orange',
                },
                {
                    name: 'Adding your code',
                    url: '/docs/feature-flags/adding-feature-flag-code',
                    icon: 'Code',
                    color: 'salmon',
                },
                {
                    name: 'Testing your flag',
                    url: '/docs/feature-flags/testing',
                    icon: 'TestTube',
                    color: 'purple',
                },
                {
                    name: 'Troubleshooting and FAQs',
                    url: '/docs/feature-flags/common-questions',
                    icon: 'Question',
                    color: 'seagreen',
                },
                {
                    name: 'Tutorials and guides',
                    url: '/docs/feature-flags/tutorials',
                    icon: 'GraduationCap',
                    color: 'blue',
                },
                {
                    name: 'Features',
                },
                {
                    name: 'Server-side local evaluation',
                    url: '/docs/feature-flags/local-evaluation',
                    icon: 'Bolt',
                    color: 'orange',
                },
                {
                    name: 'Client-side bootstrapping',
                    url: '/docs/feature-flags/bootstrapping',
                    icon: 'Laptop',
                    color: 'salmon',
                },
                {
                    name: 'Early access feature management',
                    url: '/docs/feature-flags/early-access-feature-management',
                    icon: 'Features',
                    color: 'purple',
                },
            ],
        },
        {
            name: 'A/B testing',
            icon: 'Flask',
            color: 'purple',
            url: '/docs/experiments',
            children: [
                {
                    name: 'A/B testing',
                },
                {
                    name: 'Overview',
                    url: '/docs/experiments',
                    icon: 'Home',
                    color: 'seagreen',
                },
                /*
                {
                    name: 'Getting started',
                    url: '/docs/experiments/start',
                    icon: 'GraduationCap',
                    color: 'red',
                },
                */
                {
                    name: 'Installation',
                    url: '/docs/experiments/installation',
                    icon: 'Book',
                    color: 'blue',
                },
                {
                    name: 'Creating an experiment',
                    url: '/docs/experiments/creating-an-experiment',
                    icon: 'Target',
                    color: 'orange',
                },
                {
                    name: 'Adding your code',
                    url: '/docs/experiments/adding-experiment-code',
                    icon: 'Code',
                    color: 'salmon',
                },
                {
                    name: 'Testing and launching',
                    url: '/docs/experiments/testing-and-launching',
                    icon: 'Rocket',
                    color: 'purple',
                },
                {
                    name: 'Troubleshooting and FAQs',
                    url: '/docs/experiments/common-questions',
                    icon: 'Question',
                    color: 'seagreen',
                },
                {
                    name: 'Tutorials and guides',
                    url: '/docs/experiments/tutorials',
                    icon: 'GraduationCap',
                    color: 'blue',
                },
                {
                    name: 'Features',
                },
                {
                    name: 'Statistical significance',
                    url: '/docs/experiments/significance',
                    icon: 'TestTube',
                    color: 'orange',
                },
                {
                    name: 'Under the hood',
                    url: '/docs/experiments/under-the-hood',
                    icon: 'Calculator',
                    color: 'purple',
                },
                {
                    name: 'Experiments without feature flags',
                    url: '/docs/experiments/running-experiments-without-feature-flags',
                    icon: 'Flag',
                    color: 'yellow',
                },
            ],
        },
        {
            name: 'Surveys',
            url: '/docs/surveys',
            icon: 'Message',
            color: 'blue',
            children: [
                {
                    name: 'Surveys',
                },
                {
                    name: 'Overview',
                    url: '/docs/surveys',
                    icon: 'Home',
                    color: 'seagreen',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Installation',
                    url: '/docs/surveys/installation',
                    icon: 'Book',
                    color: 'blue',
                },
                {
                    name: 'Creating a survey',
                    url: '/docs/surveys/creating-surveys',
                    icon: 'Target',
                    color: 'yellow',
                },
                {
                    name: 'Implementing custom surveys',
                    url: '/docs/surveys/implementing-custom-surveys',
                    icon: 'Code',
                    color: 'salmon',
                },
                {
                    name: 'Viewing results',
                    url: '/docs/surveys/viewing-results',
                    icon: 'Graph',
                    color: 'purple',
                },
            ],
        },
        {
            name: 'CDP',
            url: '/docs/cdp',
            color: 'yellow',
            icon: 'Person',
            children: [
                {
                    name: 'Customer data platform',
                },
                {
                    name: 'CDP',
                    url: '/docs/cdp',
                    badge: {
                        title: 'Preview',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Batch exports',
                    url: '',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/cdp/batch-exports',
                        },
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
                    ],
                },
                {
                    name: 'Sources',
                    url: '',
                    children: [
                        {
                            url: '/docs/cdp/segment',
                            name: 'Segment',
                        },
                        {
                            url: '/docs/cdp/replicator',
                            name: 'Event Replicator',
                            badge: {
                                title: 'Beta',
                                className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                        },
                        {
                            url: '/docs/cdp/n8n',
                            name: 'n8n',
                        },
                        {
                            url: '/docs/cdp/redshift-import',
                            name: 'Redshift',
                        },
                        {
                            url: '/docs/cdp/rudderstack-import',
                            name: 'Rudderstack',
                        },
                        {
                            url: '/docs/cdp/sentry-connector',
                            name: 'Sentry',
                        },
                        {
                            url: '/docs/cdp/zendesk-connector',
                            name: 'Zendesk',
                        },
                    ],
                },
                {
                    name: 'Destinations',
                    url: '',
                    children: [
                        {
                            url: '/docs/cdp/airbyte-export',
                            name: 'Airbyte',
                        },
                        {
                            url: '/docs/cdp/s3-export',
                            name: 'Amazon S3',
                            badge: {
                                title: 'Beta',
                                className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                        },
                        {
                            url: '/docs/cdp/avo-inspector',
                            name: 'Avo',
                        },
                        {
                            url: '/docs/cdp/bigquery-export',
                            name: 'BigQuery',
                            badge: {
                                title: 'Beta',
                                className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                        },
                        {
                            url: '/docs/cdp/customer-io',
                            name: 'Customer.io',
                        },
                        {
                            url: '/docs/cdp/engage-connector',
                            name: 'Engage.so',
                        },
                        {
                            url: '/docs/cdp/replicator',
                            name: 'Event Replicator',
                        },
                        {
                            url: '/docs/cdp/google-pub-sub-connector',
                            name: 'GCP Pub/Sub',
                        },
                        {
                            url: '/docs/cdp/google-cloud-export',
                            name: 'Google Cloud Storage',
                        },
                        {
                            url: '/docs/cdp/hubspot-connector',
                            name: 'Hubspot',
                        },
                        {
                            url: '/docs/cdp/intercom',
                            name: 'Intercom',
                        },
                        {
                            url: '/docs/cdp/postgres-export',
                            name: 'PostgreSQL',
                            badge: {
                                title: 'Beta',
                                className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                        },
                        {
                            url: '/docs/cdp/redshift-export',
                            name: 'Redshift',
                            badge: {
                                title: 'Beta',
                                className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                        },
                        {
                            url: '/docs/cdp/rudderstack-export',
                            name: 'RudderStack',
                        },
                        {
                            url: '/docs/cdp/salesforce-connector',
                            name: 'Salesforce',
                        },
                        {
                            url: '/docs/cdp/sendgrid-connector',
                            name: 'Sendgrid',
                        },
                        {
                            url: '/docs/cdp/sentry-connector',
                            name: 'Sentry',
                        },
                        {
                            url: '/docs/cdp/snowflake-export',
                            name: 'Snowflake',
                            badge: {
                                title: 'Beta',
                                className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                            },
                        },
                        {
                            url: '/docs/cdp/twilio',
                            name: 'Twilio',
                        },
                        {
                            url: '/docs/cdp/variance-connector',
                            name: 'Variance',
                        },
                        {
                            url: '/docs/cdp/pace-integration',
                            name: 'Pace',
                        },
                    ],
                },
                {
                    name: 'Ingestion filtering',
                    url: '',
                    children: [
                        {
                            url: '/docs/cdp/downsampling',
                            name: 'Downsampler',
                        },
                        {
                            url: '/docs/cdp/event-sequence-timer',
                            name: 'Event Sequence Timer',
                        },
                        {
                            url: '/docs/cdp/filter-out',
                            name: 'Filter Out',
                        },
                        {
                            url: '/docs/cdp/first-time-event-tracker',
                            name: 'First Time Event Tracker',
                        },
                        {
                            url: '/docs/cdp/property-filter',
                            name: 'Property Filter',
                        },
                        {
                            url: '/docs/cdp/schema-enforcer',
                            name: 'Schema Enforcer',
                        },
                        {
                            url: '/docs/cdp/taxonomy-standardizer',
                            name: 'Taxonomy Standardizer',
                        },
                    ],
                },
                {
                    name: 'Event transformation',
                    url: '',
                    children: [
                        {
                            url: '/docs/cdp/geoip-enrichment',
                            name: 'GeoIP Enricher',
                        },
                        {
                            url: '/docs/cdp/timestamp-parser',
                            name: 'Timestamp Parser',
                        },
                        {
                            url: '/docs/cdp/url-normalizer',
                            name: 'URL Normalizer',
                        },
                        {
                            url: '/docs/cdp/user-agent-populator',
                            name: 'User Agent Populator',
                        },
                    ],
                },
                {
                    name: 'Build a data connection',
                    url: '',
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/cdp/build',
                        },
                        {
                            name: 'Tutorial',
                            url: '/docs/cdp/build/tutorial',
                        },
                        {
                            name: 'Troubleshooting',
                            url: '/docs/cdp/enabling',
                        },
                        {
                            name: 'Developer reference',
                            url: '/docs/cdp/build/reference',
                        },
                        {
                            name: 'Testing',
                            url: '/docs/cdp/build/testing',
                        },
                        {
                            name: 'TypeScript types',
                            url: '/docs/cdp/build/types',
                        },
                    ],
                },
            ],
        },
        {
            name: 'Data warehouse',
            url: '/docs/data-warehouse',
            color: 'seagreen',
            icon: 'Server',
            children: [
                {
                    name: 'Data warehouse',
                },
                {
                    name: 'Overview',
                    url: '/docs/data-warehouse',
                    icon: 'Home',
                    color: 'seagreen',
                },
                {
                    name: 'Setup',
                    url: '/docs/data-warehouse/setup',
                    icon: 'Book',
                    color: 'blue',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Query',
                    url: '/docs/data-warehouse/query',
                    icon: 'HogQL',
                    color: 'purple',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
                {
                    name: 'Views',
                    url: '/docs/data-warehouse/views',
                    icon: 'Calculator',
                    color: 'salmon',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                },
            ],
        },
    ],
}

export const pricingMenu = {
    name: 'Pricing',
    url: '/pricing',
    icon: 'Receipt',
    children: [
        {
            name: 'All products',
            icon: 'Receipt',
            color: 'red',
            url: '/pricing',
        },
        {
            name: 'Product analytics',
            icon: 'Graph',
            color: 'blue',
            url: '/pricing?product=product-analytics',
        },
        {
            name: 'Session replay',
            url: '/pricing?product=session-replay',
            color: 'yellow',
            icon: 'RewindPlay',
        },
        {
            name: 'Feature flags',
            icon: 'Toggle',
            color: 'seagreen',
            url: '/pricing?product=feature-flags',
        },
        {
            name: 'A/B testing',
            icon: 'Flask',
            color: 'purple',
            url: '/pricing?product=ab-testing',
        },
    ],
}

const menu = [
    {
        name: 'Products',
        url: '/product-analytics',
        icon: 'Features',
        children: [
            {
                name: 'Product analytics',
                icon: 'Graph',
                color: 'blue',
                url: '/product-analytics',
                children: [
                    { name: 'Features', url: '/product-analytics' },
                    { name: 'Pricing', url: '/product-analytics/pricing' },
                    { name: 'Customers', url: '/product-analytics/customers' },
                    { name: 'Comparisons', url: '/product-analytics/comparisons' },
                    { name: 'Docs', url: '/product-analytics/documentation' },
                    { name: 'Tutorials', url: '/product-analytics/tutorials' },
                    { name: 'Roadmap', url: '/product-analytics/roadmap' },
                    { name: 'Questions', url: '/product-analytics/questions' },
                ],
            },
            {
                name: 'Session replay',
                icon: 'RewindPlay',
                color: 'yellow',
                url: '/session-replay',
                children: [
                    { name: 'Features', url: '/session-replay' },
                    { name: 'Pricing', url: '/session-replay/pricing' },
                    { name: 'Customers', url: '/session-replay/customers' },
                    { name: 'Comparisons', url: '/session-replay/comparisons' },
                    { name: 'Docs', url: '/session-replay/documentation' },
                    { name: 'Tutorials', url: '/session-replay/tutorials' },
                    { name: 'Roadmap', url: '/session-replay/roadmap' },
                    { name: 'Questions', url: '/session-replay/questions' },
                ],
            },
            {
                name: 'Feature flags',
                icon: 'Toggle',
                color: 'seagreen',
                url: '/feature-flags',
                children: [
                    { name: 'Features', url: '/feature-flags' },
                    { name: 'Pricing', url: '/feature-flags/pricing' },
                    { name: 'Customers', url: '/feature-flags/customers' },
                    { name: 'Comparisons', url: '/feature-flags/comparisons' },
                    { name: 'Docs', url: '/feature-flags/documentation' },
                    { name: 'Tutorials', url: '/feature-flags/tutorials' },
                    { name: 'Roadmap', url: '/feature-flags/roadmap' },
                    { name: 'Questions', url: '/feature-flags/questions' },
                ],
            },
            {
                name: 'A/B testing',
                icon: 'Flask',
                color: 'purple',
                url: '/ab-testing',
                children: [
                    { name: 'Features', url: '/ab-testing' },
                    { name: 'Pricing', url: '/ab-testing/pricing' },
                    { name: 'Customers', url: '/ab-testing/customers' },
                    { name: 'Comparisons', url: '/ab-testing/comparisons' },
                    { name: 'Docs', url: '/ab-testing/documentation' },
                    { name: 'Tutorials', url: '/ab-testing/tutorials' },
                    { name: 'Roadmap', url: '/ab-testing/roadmap' },
                    { name: 'Questions', url: '/ab-testing/questions' },
                ],
            },
            {
                name: 'Product OS',
                icon: 'Stack',
                color: 'salmon',
                url: '/product-os',
            },
        ],
    },
    pricingMenu,
    docsMenu,
    communityMenu,
    companyMenu,
]

export default menu
