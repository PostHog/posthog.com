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
                    name: 'New to PostHog?',
                },
                {
                    name: 'Start here',
                    url: '/docs/getting-started/install',
                    icon: 'IconFlag',
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
                            name: 'Person properties',
                            url: '/docs/getting-started/person-properties',
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
                            name: 'Enabling beta features',
                            url: '/docs/getting-started/enable-betas',
                        },
                    ],
                },
                {
                    name: 'SDKs',
                    url: '/docs/libraries',
                    icon: 'IconBox',
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
                            name: 'WordPress',
                            url: '/docs/libraries/wordpress',
                        },
                    ],
                },
                {
                    name: 'Reverse proxy',
                    url: '/docs/advanced/proxy',
                    icon: 'IconShare',
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
                    name: 'Migrate',
                    url: '/docs/migrate',
                    icon: 'IconRocket',
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
                    name: 'Advanced',
                    url: '/docs/advanced/cdp',
                    icon: 'IconAdvanced',
                    children: [
                        {
                            name: 'Using a CDP',
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
                    ],
                },
                {
                    name: 'Product OS',
                },
                {
                    name: 'What is Product OS?',
                    url: '/docs/product-os',
                    icon: 'IconInfo',
                },
                {
                    name: 'Data',
                    url: '/docs/data',
                    icon: 'IconHardDrive',
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
                            name: 'Channel type',
                            url: '/docs/data/channel-type',
                        },
                        {
                            name: 'Cohorts',
                            url: '/docs/data/cohorts',
                        },
                        {
                            name: 'Events',
                            url: '/docs/data/events',
                            children: [
                                {
                                    name: 'Anonymous vs identified events',
                                    url: '/docs/data/anonymous-vs-identified-events',
                                },
                            ],
                        },
                        {
                            name: 'Ingestion warnings',
                            url: '/docs/data/ingestion-warnings',
                        },
                        {
                            name: 'People',
                            url: '/docs/data/persons',
                        },
                        {
                            name: 'Sessions',
                            url: '/docs/data/sessions',
                        },
                        {
                            name: 'Timestamps',
                            url: '/docs/data/timestamps',
                        },
                        {
                            name: 'Person properties',
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
                    icon: 'IconHogQL',
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
                            name: 'Expressions',
                            url: '/docs/hogql/expressions',
                        },
                        {
                            name: 'Supported functions',
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
                    icon: 'IconToolbar',
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
                    name: 'Notebooks',
                    url: '/docs/notebooks',
                    icon: 'IconBook',
                },
                {
                    name: 'Settings',
                    url: '/docs/settings/organizations-and-projects',
                    icon: 'IconGear',
                    children: [
                        {
                            name: 'Organizations & projects',
                            url: '/docs/settings/organizations-and-projects',
                        },
                        {
                            name: 'Role-based access',
                            url: '/docs/settings/role-based-access',
                        },
                        {
                            name: 'SSO & SAML',
                            url: '/docs/settings/sso',
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
                            name: 'Query',
                            url: '/docs/api/query',
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
                            name: 'Groups',
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
                            name: 'Destinations',
                            url: '/docs/api/pipeline-destinations',
                        },
                        {
                            name: 'Destination configs',
                            url: '/docs/api/pipeline-destination-configs',
                        },
                        {
                            name: 'Frontend apps',
                            url: '/docs/api/pipeline-frontend-apps',
                        },
                        {
                            name: 'Frontend apps configs',
                            url: '/docs/api/pipeline-frontend-apps-configs',
                        },
                        {
                            name: 'Import apps',
                            url: '/docs/api/pipeline-import-apps',
                        },
                        {
                            name: 'Import apps configs',
                            url: '/docs/api/pipeline-import-apps-configs',
                        },
                        {
                            name: 'Transformations',
                            url: '/docs/api/pipeline-transformations',
                        },
                        {
                            name: 'Transformation configs',
                            url: '/docs/api/pipeline-transformation-configs',
                        },
                        {
                            name: 'Plugins',
                            url: '/docs/api/plugins',
                        },
                        {
                            name: 'Plugin configs',
                            url: '/docs/api/plugin-configs',
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
                            name: 'Trends',
                            url: '/docs/api/trend',
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
                    name: 'Command palette',
                    url: '/docs/cmd-k',
                    icon: 'IconSearch',
                },
                {
                    name: 'Hog',
                    url: '/docs/hog',
                    icon: 'IconCode',
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
                        {
                            name: 'Session replay',
                            url: '/docs/how-posthog-works/recordings-ingestion',
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
                    name: 'SQL',
                    url: '/docs/product-analytics/sql',
                    icon: 'IconHogQL',
                    color: 'purple',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
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
                    name: 'Web vitals',
                    url: '/docs/product-analytics/web-vitals',
                    icon: 'IconWrench',
                    color: 'seagreen',
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
                    name: 'Sampling',
                    url: '/docs/product-analytics/sampling',
                    icon: 'IconSampling',
                    color: 'purple',
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
                    name: 'Dashboard',
                    url: '/docs/web-analytics/dashboard',
                    icon: 'IconDashboard',
                    color: 'orange',
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
            description: 'Watch how users interact with your app in a DVR-like playback experience.',
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
                    name: 'Mobile session replay',
                    url: '/docs/session-replay/mobile',
                    icon: 'IconPhone',
                    color: 'blue',
                    featured: true,
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/session-replay/mobile',
                        },
                        {
                            name: 'Android',
                            url: '/docs/session-replay/android',
                        },
                        {
                            name: 'iOS',
                            url: '/docs/session-replay/ios',
                        },
                        {
                            name: 'React Native',
                            url: '/docs/session-replay/react-native',
                        },
                    ],
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
            description: 'Safely roll out features to specific users or groups.',
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
            description: 'Test changes with statistical significance with multivariate tests and robust targeting.',
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
                /*
                {
                    name: 'Getting started',
                    url: '/docs/experiments/start',
                    icon: 'IconGraduationCap',
                    color: 'red',
                },
                */
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
                    name: 'Methodology',
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
                {
                    name: 'Experiment significance',
                    url: '/docs/experiments/experiment-significance',
                    icon: 'IconMagicWand',
                    color: 'seagreen',
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
        {
            name: 'CDP',
            url: '/docs/cdp',
            color: 'sky-blue',
            icon: 'IconPlug',
            description: 'Collect, enrich, and send data to your destinations.',
            children: [
                {
                    name: 'Customer data platform',
                },
                {
                    name: 'Overview',
                    url: '/docs/cdp',
                    icon: 'IconHome',
                    color: 'seagreen',
                },
                {
                    name: 'Realtime destinations',
                    url: '/docs/cdp/destinations',
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
                    icon: 'IconLive',
                    color: 'salmon',
                    featured: true,
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/cdp/destinations',
                        },
                        {
                            name: 'Destinations',
                        },
                        {
                            name: 'Slack',
                            url: '/docs/cdp/destinations/slack',
                        },
                        {
                            name: 'Webhook',
                            url: '/docs/cdp/destinations/webhook',
                        },
                        {
                            name: 'ActiveCampaign',
                            url: '/docs/cdp/destinations/activecampaign',
                        },
                        {
                            name: 'Avo',
                            url: '/docs/cdp/destinations/avo',
                        },
                        {
                            name: 'AWS Kinesis',
                            url: '/docs/cdp/destinations/aws-kinesis',
                        },
                        {
                            name: 'Braze',
                            url: '/docs/cdp/destinations/braze',
                        },
                        {
                            name: 'Customer.io',
                            url: '/docs/cdp/destinations/customerio',
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
                            name: 'Google Cloud Storage',
                            url: '/docs/cdp/destinations/google-cloud-storage',
                        },
                        {
                            name: 'Google Pub/Sub',
                            url: '/docs/cdp/destinations/google-pubsub',
                        },
                        {
                            name: 'Hubspot',
                            url: '/docs/cdp/destinations/hubspot',
                        },
                        {
                            name: 'Intercom',
                            url: '/docs/cdp/destinations/intercom',
                        },
                        {
                            name: 'Knock',
                            url: '/docs/cdp/destinations/knock',
                        },
                        {
                            name: 'Loops',
                            url: '/docs/cdp/destinations/loops',
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
                            name: 'RudderStack',
                            url: '/docs/cdp/destinations/rudderstack',
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
                            name: 'Zapier',
                            url: '/docs/cdp/destinations/zapier',
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
                    badge: {
                        title: 'Beta',
                        className: 'uppercase !bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
                    },
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
                    url: '/docs/cdp/geoip-enrichment',
                    icon: 'IconWrench',
                    color: 'yellow',
                    featured: true,
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
                        {
                            url: '/docs/cdp/event-sequence-timer',
                            name: 'Event Sequence Timer',
                        },
                        {
                            url: '/docs/cdp/property-filter',
                            name: 'Property Filter',
                        },
                        {
                            url: '/docs/cdp/taxonomy-standardizer',
                            name: 'Taxonomy Standardizer',
                        },
                        {
                            url: '/docs/cdp/downsampling',
                            name: 'Downsampler',
                        },
                        {
                            url: '/docs/cdp/filter-out',
                            name: 'Filter Out',
                        },
                        {
                            url: '/docs/cdp/schema-enforcer',
                            name: 'Schema Enforcer',
                        },
                    ],
                },
                {
                    name: 'Troubleshooting and FAQs',
                    url: '/docs/cdp/common-questions',
                    icon: 'IconQuestion',
                    color: 'blue',
                    featured: true,
                },
            ],
        },
        {
            name: 'Data warehouse',
            url: '/docs/data-warehouse',
            color: 'lilac',
            icon: 'IconDatabase',
            description: 'Unify and query data from any source and analyze it alongside your product data.',
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
                    name: 'Link a source',
                    url: '/docs/data-warehouse/setup',
                    icon: 'IconBook',
                    color: 'blue',
                    featured: true,
                    children: [
                        {
                            name: 'Overview',
                            url: '/docs/data-warehouse/setup',
                        },
                        {
                            name: 'Managed',
                        },
                        {
                            name: 'Stripe',
                            url: '/docs/data-warehouse/setup/stripe',
                        },
                        {
                            name: 'Hubspot',
                            url: '/docs/data-warehouse/setup/hubspot',
                        },
                        {
                            name: 'Zendesk',
                            url: '/docs/data-warehouse/setup/zendesk',
                        },
                        {
                            name: 'Postgres',
                            url: '/docs/data-warehouse/setup/postgres',
                        },
                        {
                            name: 'Salesforce',
                            url: '/docs/data-warehouse/setup/salesforce',
                        },
                        {
                            name: 'MySQL',
                            url: '/docs/data-warehouse/setup/mysql',
                        },
                        {
                            name: 'Azure SQL Server',
                            url: '/docs/data-warehouse/setup/azure-db',
                        },
                        {
                            name: 'Snowflake',
                            url: '/docs/data-warehouse/setup/snowflake',
                        },
                        {
                            name: 'Vitally',
                            url: '/docs/data-warehouse/setup/vitally',
                        },
                        {
                            name: 'Self-managed',
                        },
                        {
                            name: 'S3',
                            url: '/docs/data-warehouse/setup/s3',
                        },
                        {
                            name: 'Azure Blob',
                            url: '/docs/data-warehouse/setup/azure-blob',
                        },
                        {
                            name: 'Cloudflare R2',
                            url: '/docs/data-warehouse/setup/r2',
                        },
                        {
                            name: 'Google Cloud Storage',
                            url: '/docs/data-warehouse/setup/gcs',
                        },
                    ],
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
            name: 'AI engineering',
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
                    name: 'AI engineering',
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
                    name: 'LLM insights',
                    url: '/docs/ai-engineering/llm-insights',
                    icon: 'IconAIText',
                    color: 'blue',
                    featured: true,
                },
                {
                    name: 'Tutorials and guides',
                    url: '/docs/ai-engineering/tutorials',
                    icon: 'IconGraduationCap',
                    color: 'yellow',
                    featured: true,
                },
                {
                    name: 'Integrations',
                },
                {
                    name: 'Helicone',
                    url: '/docs/ai-engineering/helicone-posthog',
                    icon: 'IconWrench',
                    color: 'green',
                },
                {
                    name: 'Keywords AI',
                    url: '/docs/ai-engineering/keywords-ai-posthog',
                    icon: 'IconWrench',
                    color: 'blue',
                },
                {
                    name: 'Langfuse',
                    url: '/docs/ai-engineering/langfuse-posthog',
                    icon: 'IconWrench',
                    color: 'red',
                },
                {
                    name: 'Traceloop',
                    url: '/docs/ai-engineering/traceloop-posthog',
                    icon: 'IconWrench',
                    color: 'purple',
                },
            ],
        },
    ],
}
