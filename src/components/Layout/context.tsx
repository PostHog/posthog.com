import {
    Book,
    Calendar,
    Flag,
    Flask,
    Graph,
    Laptop,
    Logomark,
    Map,
    Message,
    Newspaper,
    Profile,
    Receipt,
    RewindPlay,
    Stack,
    Toggle,
} from 'components/NewIcons'
import React, { createContext } from 'react'

export const Context = createContext<any>(undefined)

const handbookMenu = [
    {
        name: 'Handbook',
        url: '/handbook',
    },
    {
        name: 'Getting started',
        url: '',
        children: [
            {
                name: 'Start here',
                url: '/handbook/getting-started/start-here',
            },
            {
                name: 'Meetings',
                url: '/handbook/getting-started/meetings',
            },
        ],
    },
    {
        name: 'Company',
        url: '',
        children: [
            {
                name: 'Story',
                url: '/handbook/company/story',
            },
            {
                name: 'Team',
                url: '/handbook/company/team',
            },
            {
                name: 'Investors',
                url: '/handbook/strategy/investors',
            },
        ],
    },
    {
        name: 'Strategy',
        url: '',
        children: [
            {
                name: 'Strategy overview',
                url: '/handbook/strategy/overview',
            },
            {
                name: 'Ideal Customer Persona',
                url: '/handbook/strategy/ideal-customer-persona',
            },
            {
                name: 'Business model',
                url: '/handbook/strategy/business-model',
            },
            {
                name: 'Objectives',
                url: '/handbook/strategy/objectives',
            },
            {
                name: 'Roadmap',
                url: '/roadmap',
            },
            {
                name: 'Brand',
                url: '/handbook/strategy/brand',
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
                name: 'Brand assets',
                url: '/handbook/company/brand-assets',
            },
        ],
    },
    {
        name: 'Small teams',
        url: '',
        children: [
            {
                name: 'Team structure',
                url: '/handbook/small-teams/team-structure',
            },
            {
                name: 'Customer Success',
                url: '/handbook/small-teams/customer-success',
            },
            {
                name: 'Exec',
                url: '/handbook/small-teams/exec',
            },
            {
                name: 'Feature Success',
                url: '/handbook/small-teams/feature-success',
            },
            {
                name: 'Growth',
                url: '/handbook/small-teams/growth',
            },
            {
                name: 'Infrastructure',
                url: '/handbook/small-teams/infrastructure',
            },
            {
                name: 'Marketing',
                url: '/handbook/small-teams/marketing',
            },
            {
                name: 'People & Ops',
                url: '/handbook/small-teams/people',
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
                name: 'Monitoring',
                url: '/handbook/small-teams/monitoring',
            },
            {
                name: 'Website & Docs',
                url: '/handbook/small-teams/website-docs',
            },
        ],
    },
    {
        name: 'People & Ops',
        url: '',
        children: [
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
                name: 'Onboarding',
                url: '/handbook/people/onboarding',
            },
            {
                name: 'Offboarding',
                url: '/handbook/people/offboarding',
            },
            {
                name: 'Ramp up plans',
                url: '',
                children: [
                    {
                        name: 'Product Manager ramp up',
                        url: '/handbook/people/ramp-up/product-manager',
                    },
                ],
            },
            {
                name: 'Finance',
                url: '/handbook/people/finance',
            },
            {
                name: 'Merch store',
                url: '/handbook/company/merch-store',
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
        ],
    },
    {
        name: 'Engineering',
        url: '',
        children: [
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
                        name: 'Working with product design',
                        url: '/handbook/engineering/product-design',
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
                name: 'PostHog.com',
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
                        name: 'Jobs',
                        url: '/handbook/engineering/posthog-com/jobs',
                    },
                    {
                        name: 'Roadmap',
                        url: '/handbook/engineering/posthog-com/roadmap',
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
                name: 'Designing posthog.com',
                url: '/handbook/design/designing-posthog-website',
            },
        ],
    },
    {
        name: 'Marketing & Content',
        url: '',
        children: [
            {
                name: 'Overview',
                url: '/handbook/growth/marketing',
            },
            {
                name: 'Personas',
                url: '/handbook/growth/marketing/customer-personas',
            },
            {
                name: 'Testimonials',
                url: '/handbook/growth/marketing/testimonials',
            },
            {
                name: 'Value propositions',
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
                        name: 'Sponsorship',
                        url: '/handbook/growth/marketing/open-source-sponsorship',
                    },
                    {
                        name: 'Paid ads',
                        url: '/handbook/growth/marketing/paid',
                    },
                    {
                        name: 'Email',
                        url: '/handbook/growth/marketing/newsletter',
                    },
                    {
                        name: 'In-app',
                        url: '/handbook/growth/marketing/in-app',
                    },
                    {
                        name: 'Startups',
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
                    {
                        name: 'Dashboard templates',
                        url: '/handbook/growth/marketing/templates',
                    },
                ],
            },
        ],
    },
    {
        name: 'Customer success',
        url: '',
        children: [
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
                ],
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
        ],
    },
]

const menu = [
    {
        name: 'Products',
        url: '/product-analytics/features',
        internal: [
            {
                name: 'Product analytics',
                Icon: Graph,
                color: 'blue',
                url: '/product-analytics/features',
                children: [
                    { name: 'Features', url: '/product-analytics/features' },
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
                Icon: RewindPlay,
                color: 'yellow',
                url: '/session-replay/features',
                children: [
                    { name: 'Features', url: '/session-replay/features' },
                    { name: 'Pricing', url: '/session-replay/pricing' },
                    { name: 'Customers', url: '/session-replay/customers' },
                    { name: 'Comparisons', url: '/session-replay/comparisons' },
                    { name: 'Roadmap', url: '/session-replay/roadmap' },
                    { name: 'Docs', url: '/session-replay/documentation' },
                    { name: 'Tutorials', url: '/session-replay/tutorials' },
                    { name: 'Questions', url: '/session-replay/questions' },
                ],
            },
            {
                name: 'Feature flags',
                Icon: Toggle,
                color: 'seagreen',
                url: '/feature-flags/features',
                children: [
                    { name: 'Features', url: '/feature-flags/features' },
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
                Icon: Flask,
                color: 'purple',
                url: '/ab-testing/features',
                children: [
                    { name: 'Features', url: '/ab-testing/features' },
                    { name: 'Pricing', url: '/ab-testing/pricing' },
                    { name: 'Customers', url: '/ab-testing/customers' },
                    { name: 'Comparisons', url: '/ab-testing/comparisons' },
                    { name: 'Docs', url: '/ab-testing/documentation' },
                    { name: 'Tutorials', url: '/ab-testing/tutorials' },
                    { name: 'Roadmap', url: '/ab-testing/roadmap' },
                    { name: 'Questions', url: '/ab-testing/questions' },
                ],
            },
        ],
    },
    {
        name: 'Pricing',
        url: '/pricing',
        internal: [
            {
                name: 'All products',
                Icon: Receipt,
                color: 'red',
                url: '/pricing',
            },
            {
                name: 'Product analytics',
                Icon: Graph,
                color: 'blue',
                url: '/pricing?product=product-analytics',
            },
            {
                name: 'Session replay',
                url: '/pricing?product=session-replay',
                color: 'yellow',
                Icon: RewindPlay,
            },
            {
                name: 'Feature flags',
                Icon: Toggle,
                color: 'seagreen',
                url: '/pricing?product=feature-flags',
            },
            {
                name: 'A/B testing',
                Icon: Flask,
                color: 'purple',
                url: '/pricing?product=experiments',
            },
        ],
    },
    {
        name: 'Docs',
        url: '/docs',
        internal: [
            {
                name: 'Getting started',
                Icon: Flag,
                color: 'teal',
                url: '/docs/getting-started/start-here',
                children: [
                    {
                        name: 'Overview',
                        url: '/docs',
                    },
                    {
                        name: 'Start here',
                        url: '/docs/getting-started/start-here',
                    },
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
                        name: 'SDKs',
                        url: '',
                        children: [
                            {
                                name: 'JavaScript',
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
                        name: 'Integrations',
                        url: '',
                        children: [
                            {
                                name: 'Overview',
                                url: '/docs/integrations',
                            },
                            {
                                name: 'Docusaurus v2',
                                url: '/docs/libraries/docusaurus',
                                badge: {
                                    title: '3rd party',
                                },
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
                                name: 'WordPress',
                                url: '/docs/libraries/wordpress',
                            },
                        ],
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
                                name: 'Migrate between PostHog instances',
                                url: '/docs/migrate/migrate-between-posthog-instances',
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
                ],
            },
            {
                name: 'Product OS',
                Icon: Stack,
                color: 'salmon',
                url: '/docs/data',
                children: [
                    {
                        name: 'Data',
                        url: '/docs/data',
                        icon: 'DataManagement',
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
                                name: 'Data management',
                                url: '/docs/data/data-management',
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
                                name: 'UTM segmentation',
                                url: '/docs/data/utm-segmentation',
                            },
                        ],
                    },
                    {
                        name: 'Apps',
                        url: '/docs/apps',
                        icon: 'AppLibrary',
                        children: [
                            {
                                url: '/docs/apps/feedback-widget',
                                name: 'Feedback Widget',
                            },
                            {
                                url: '/docs/apps/notification-bar',
                                name: 'Notification Bar',
                            },
                            {
                                url: '/docs/apps/nps-survey-app',
                                name: 'NPS Survey',
                            },
                            {
                                url: '/docs/apps/pineapple-mode',
                                name: 'Pineapple Mode',
                            },
                            {
                                url: '/docs/apps/user-interviewer',
                                name: 'User Interviewer',
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
                ],
            },
            {
                name: 'Product analytics',
                Icon: Graph,
                color: 'blue',
                url: '/docs/product-analytics',
                children: [
                    {
                        name: 'Product analytics',
                        url: '/docs/product-analytics',
                        icon: 'Analytics',
                        children: [
                            {
                                name: 'Overview',
                                url: '/docs/product-analytics',
                            },
                            {
                                name: 'Correlation analysis',
                                url: '/docs/product-analytics/correlation',
                            },
                            {
                                name: 'Dashboards',
                                url: '/docs/product-analytics/dashboards',
                            },
                            {
                                name: 'Funnels',
                                url: '/docs/product-analytics/funnels',
                            },
                            {
                                name: 'Group analytics',
                                url: '/docs/product-analytics/group-analytics',
                            },
                            {
                                name: 'HogQL',
                                url: '/docs/product-analytics/hogql',
                                badge: {
                                    title: 'Beta',
                                    className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                                },
                            },
                            {
                                name: 'Insights',
                                url: '/docs/product-analytics/insights',
                            },
                            {
                                name: 'Lifecycle',
                                url: '/docs/product-analytics/lifecycle',
                            },
                            {
                                name: 'Retention',
                                url: '/docs/product-analytics/retention',
                            },
                            {
                                name: 'Sampling',
                                url: '/docs/product-analytics/sampling',
                                badge: {
                                    title: 'Beta',
                                    className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                                },
                            },
                            {
                                name: 'Stickiness',
                                url: '/docs/product-analytics/stickiness',
                            },
                            {
                                name: 'Subscriptions',
                                url: '/docs/product-analytics/subscriptions',
                            },
                            {
                                name: 'Toolbar',
                                url: '/docs/product-analytics/toolbar',
                            },
                            {
                                name: 'Trends',
                                url: '/docs/product-analytics/trends',
                            },
                            {
                                name: 'User paths',
                                url: '/docs/product-analytics/paths',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Session replay',
                url: '/docs/session-replay',
                color: 'yellow',
                Icon: RewindPlay,
                children: [
                    {
                        name: 'Session replay',
                        url: '/docs/session-replay',
                        icon: 'SessionRecording',
                        children: [
                            {
                                name: 'Overview',
                                url: '/docs/session-replay',
                            },
                            {
                                name: 'Product manual',
                                url: '/docs/session-replay/manual',
                            },
                            {
                                name: 'Privacy Controls',
                                url: '/docs/session-replay/privacy',
                            },
                            {
                                name: 'Sharing and emedding',
                                url: '/docs/session-replay/sharing',
                            },
                            {
                                name: 'Data retention',
                                url: '/docs/session-replay/data-retention',
                            },
                            {
                                name: 'Iframe recording',
                                url: '/docs/session-replay/iframes',
                            },
                            {
                                name: 'Troubleshooting and FAQs',
                                url: '/docs/session-replay/troubleshooting',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Feature flags',
                Icon: Toggle,
                color: 'seagreen',
                url: '/docs/feature-flags',
                children: [
                    {
                        name: 'Feature flags',
                        url: '/docs/feature-flags',
                        icon: 'FeatureFlags',
                        children: [
                            {
                                name: 'Overview',
                                url: '/docs/feature-flags',
                            },
                            {
                                name: 'Product manual',
                                url: '/docs/feature-flags/manual',
                            },
                            {
                                name: 'Bootstrapping & local evaluation',
                                url: '/docs/feature-flags/bootstrapping-and-local-evaluation',
                            },
                            {
                                name: 'Rollout strategies',
                                url: '/docs/feature-flags/rollout-strategies',
                            },
                            {
                                name: 'Multivariate feature flags',
                                url: '/docs/feature-flags/multivariate-flags',
                            },
                            {
                                name: 'Payloads',
                                url: '/docs/feature-flags/payloads',
                            },

                            {
                                name: 'Early Access Feature Management',
                                url: '/docs/feature-flags/early-access-feature-management',
                            },

                            {
                                name: 'Common questions about feature flags',
                                url: '/docs/feature-flags/common-questions',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'A/B testing',
                Icon: Flask,
                color: 'purple',
                url: '/docs/experiments',
                children: [
                    {
                        name: 'A/B testing',
                        url: '/docs/experiments',
                        icon: 'Experiments',
                        children: [
                            {
                                name: 'Overview',
                                url: '/docs/experiments',
                            },
                            {
                                name: 'Product manual',
                                url: '/docs/experiments/manual',
                            },
                            {
                                name: 'Statistical significance',
                                url: '/docs/experiments/significance',
                            },
                            {
                                name: 'Under the hood',
                                url: '/docs/experiments/under-the-hood',
                            },
                            {
                                name: 'Common questions about experiments',
                                url: '/docs/experiments/common-questions',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'Community',
        url: '/questions/topic/product-analytics',
        internal: [
            {
                name: 'Edition',
                Icon: Newspaper,
            },
            {
                name: 'Questions',
                Icon: Message,
                color: 'teal',
                url: '/questions/topic/product-analytics',
                children: [
                    { name: 'Topics' },
                    { name: 'Product analytics', url: '/questions/topic/product-analytics' },
                    { name: 'Session replay', url: '/questions/topic/session-replay' },
                    { name: 'Feature flags', url: '/questions/topic/feature-flags' },
                    { name: 'A/B testing', url: '/questions/topic/ab-testing' },
                    { name: 'Product OS' },
                    { name: 'API', url: '/questions/topic/api' },
                    { name: 'Apps', url: '/questions/topic/apps' },
                    { name: 'Data management' },
                    { name: 'Events & actions', url: '/questions/topic/events-actions' },
                    { name: 'Persons', url: '/questions/topic/people-and-properties' },
                ],
            },
            {
                name: 'Roadmap',
                Icon: Map,
                color: 'orange',
                url: '/roadmap',
            },
            {
                name: 'Changelog',
                Icon: Calendar,
                color: 'seagreen',
                url: '/changelog/2023',
                children: [
                    { name: '2023', url: '/changelog/2023' },
                    { name: '2022', url: '/changelog/2022' },
                    { name: '2021', url: '/changelog/2021' },
                    { name: '2020', url: '/changelog/2020' },
                ],
            },
        ],
    },
    {
        name: 'Company',
        url: '/about',
        internal: [
            { name: 'About', Icon: Logomark, url: '/about' },
            {
                name: 'Blog',
                Icon: Newspaper,
                color: 'teal',
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
            { name: 'Team', Icon: Profile, color: 'yellow', url: '/handbook/company/team', children: handbookMenu },
            { name: 'Handbook', Icon: Book, color: 'seagreen', url: '/handbook', children: handbookMenu },
            { name: 'Careers', Icon: Laptop, color: 'purple', url: '/careers' },
        ],
    },
]

function recursiveSearch(array, value) {
    for (let i = 0; i < array?.length || 0; i++) {
        const element = array[i]

        if (element === value) {
            return true
        }

        if (typeof element === 'object' && element !== null) {
            const found = recursiveSearch(Object.values(element), value)
            if (found) {
                return true
            }
        }
    }

    return false
}

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const parent = menu.find(({ internal, url }) => {
        const currentURL = window?.location?.pathname + (window?.location?.search ?? '')
        return currentURL === url || recursiveSearch(internal, currentURL)
    })

    const internalMenu = parent?.internal

    const activeInternalMenu = internalMenu?.find((menuItem) => {
        const currentURL = window?.location?.pathname + (window?.location?.search ?? '')
        return currentURL === menuItem.url || recursiveSearch(menuItem.children, currentURL)
    })

    return <Context.Provider value={{ menu, parent, internalMenu, activeInternalMenu }}>{children}</Context.Provider>
}
