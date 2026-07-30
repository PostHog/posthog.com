export type ToolStatus = 'WIP' | 'alpha' | 'beta'

export interface Tool {
    handle: string
    name: string
    description?: string
    searchDescription?: string
    slug?: string
    category?: string
    status?: ToolStatus
    aliases?: readonly string[]
    /**
     * Title to use when this tool's page appears in search results. Set this only when `name` is
     * presentational for the OS UI (a document filename, an abbreviation) and would read poorly as
     * a search result. Everything else falls back to `name`.
     */
    searchTitle?: string
}

export const tools = [
    {
        handle: 'ai_observability',
        name: 'AI Observability',
        description: 'Track costs, performance, and usage of your AI features',
        slug: 'ai-observability',
        category: 'analytics',
        aliases: ['LLM observability', 'LLM analytics'],
    },
    {
        handle: 'cdp',
        name: 'CDP',
        description: 'Get data into PostHog and send it where it needs to go.',
        slug: 'cdp',
        category: 'data',
        aliases: ['Customer data platform', 'Data pipelines'],
    },
    {
        handle: 'data_warehouse',
        name: 'Managed warehouse',
        searchDescription: 'Query product and third-party data together in a managed warehouse.',
        slug: 'context-warehouse/managed-warehouse',
        category: 'data',
        status: 'beta',
        aliases: ['Data warehouse', 'PostHog warehouse'],
    },
    {
        handle: 'endpoints',
        name: 'Endpoints',
        description: 'Custom API endpoints powered by your PostHog data.',
        slug: 'endpoints',
        category: 'product_engineering',
        status: 'beta',
        aliases: ['Query API endpoint'],
    },
    {
        handle: 'error_tracking',
        name: 'Error Tracking',
        searchDescription: 'Catch and fix issues with full context.',
        slug: 'error-tracking',
        category: 'product_engineering',
        aliases: ['Errors', 'Exceptions'],
    },
    {
        handle: 'experiments',
        name: 'Experiments',
        searchDescription: 'Run A/B and multivariate tests to validate whether changes work.',
        slug: 'experiments',
        category: 'product_engineering',
        aliases: ['A/B testing', 'AB testing'],
    },
    {
        handle: 'feature_flags',
        name: 'Feature Flags',
        description: 'Control feature access with precision',
        slug: 'feature-flags',
        category: 'product_engineering',
    },
    {
        handle: 'inbox',
        name: 'Inbox',
        searchDescription: 'Review and act on signals from across your product.',
    },
    {
        handle: 'logs',
        name: 'Logs',
        description: 'Search and analyze your logs in PostHog',
        slug: 'logs',
        category: 'product_engineering',
        aliases: ['Logging'],
    },
    {
        handle: 'mcp_analytics',
        name: 'MCP Analytics',
        description: 'See how agents actually use your MCP server',
        slug: 'mcp-analytics',
        category: 'analytics',
        // The app feature is alpha, but "beta" keeps this tool clickable while rendering its badge.
        status: 'beta',
    },
    {
        handle: 'posthog_ai',
        name: 'PostHog AI',
        description: 'Your AI-powered product analyst and product manager',
        slug: 'ai',
        category: 'automation',
        aliases: ['Max AI', 'AI assistant'],
    },
    {
        handle: 'product_analytics',
        name: 'Product Analytics',
        searchDescription: 'Understand how people use your product.',
        slug: 'product-analytics',
        category: 'analytics',
    },
    {
        handle: 'session_replay',
        name: 'Session Replay',
        searchDescription: 'Watch people use your product.',
        slug: 'session-replay',
        category: 'product_engineering',
        aliases: ['Session recording', 'Replays'],
    },
    {
        handle: 'surveys',
        name: 'Surveys',
        searchDescription: 'Ask users anything with no-code surveys.',
        slug: 'surveys',
        category: 'communication',
    },
    {
        handle: 'traces',
        name: 'Traces',
        description: 'Distributed tracing that goes straight to the line that broke',
        slug: 'traces',
        category: 'product_engineering',
        status: 'beta',
    },
    {
        handle: 'web_analytics',
        name: 'Web Analytics',
        searchDescription: 'Track visitors, pageviews, and conversions without cookies.',
        slug: 'web-analytics',
        category: 'analytics',
        aliases: ['Website analytics', 'Traffic analytics'],
    },
    {
        handle: 'workflows_emails',
        name: 'Workflows',
        description: 'Automate workflows with your product data',
        slug: 'workflows',
        category: 'automation',
        aliases: ['Customer messaging'],
    },
    {
        handle: 'user_interviews',
        name: 'User interviews',
        description: 'Get feedback from users.',
        // Points at the tool directory as a placeholder. Give this a real slug before removing
        // WIP status, or search will treat /products as the User Interviews canonical page.
        slug: 'products',
        category: 'communication',
        status: 'WIP',
    },
    {
        handle: 'support',
        name: 'Support',
        description: 'Built-in customer support with chat widget and unified inbox.',
        slug: 'docs/support',
        category: 'communication',
        aliases: ['PostHog support', 'Customer support'],
    },
    {
        handle: 'posthog_code',
        name: 'PostHog Desktop',
        description: 'A desktop app for steering coding agents – and editing your product, not just your code',
        slug: 'desktop',
        category: 'automation',
        status: 'beta',
        aliases: ['PostHog code', 'Desktop app'],
    },
    {
        handle: 'posthog_slack',
        name: 'PostHog Slack app',
        description:
            'Tag @PostHog in any Slack thread to ship a fix, answer a data question, or edit content – without leaving the conversation.',
        slug: 'slack',
        category: 'product_os',
        status: 'beta',
    },
    {
        handle: 'group_analytics',
        name: 'Group Analytics',
        description: 'Analyze multi-seat accounts and other groups.',
        slug: 'group-analytics',
        category: 'analytics',
    },
    {
        handle: 'profiles',
        name: 'Activity timeline',
        description: 'Full event history for individuals and multi-seat accounts',
        slug: 'profiles',
        category: 'product_os',
    },
    {
        handle: 'dashboards',
        name: 'Custom dashboards',
        description: 'Track all your most important product and performance metrics in one place.',
        slug: 'dashboards',
        category: 'analytics',
    },
    {
        handle: 'data-stack',
        name: 'README: PostHog data stack.md',
        description: 'CDP manifesto',
        searchDescription: 'Collect, store, transform, and query all the context behind your product.',
        searchTitle: 'Data stack',
        slug: 'context-warehouse',
        category: 'data',
        aliases: ['Context warehouse', 'Context data warehouse'],
    },
    {
        handle: 'trends',
        name: 'Graphs & trends',
        searchDescription: 'Plot events over time with filters and breakdowns.',
        slug: 'trends',
        category: 'dataviz',
    },
    {
        handle: 'funnels',
        name: 'Funnels',
        searchDescription: 'Find drop-off across a series of actions.',
        slug: 'funnels',
        category: 'dataviz',
    },
    {
        handle: 'bi',
        name: 'BI',
        searchDescription: 'Explore and visualize product and business data in PostHog.',
        searchTitle: 'Business intelligence',
        slug: 'context-warehouse/business-intelligence',
        category: 'data',
    },
    {
        handle: 'user_paths',
        name: 'User Paths',
        searchDescription: 'See how users navigate your product, website, or conversion funnel.',
        slug: 'user-paths',
        category: 'dataviz',
    },
    {
        handle: 'correlation_analysis',
        name: 'Correlation Analysis',
        searchDescription: 'Discover which events correlate with conversion or churn.',
        slug: 'correlation-analysis',
        category: 'dataviz',
    },
    {
        handle: 'retention',
        name: 'Retention',
        searchDescription: 'See how many users return over time.',
        slug: 'retention',
        category: 'dataviz',
    },
    {
        handle: 'stickiness',
        name: 'Stickiness',
        searchDescription: 'Learn how often users perform events in a period.',
        slug: 'stickiness',
        category: 'dataviz',
    },
    {
        handle: 'lifecycle',
        name: 'Lifecycle',
        searchDescription: 'Understand how active users move through lifecycle stages.',
        slug: 'lifecycle',
        category: 'dataviz',
    },
    {
        handle: 'activity',
        name: 'User activity',
        description: 'See what users are doing in your product.',
        slug: 'activity',
        category: 'product_os',
    },
    {
        handle: 'toolbar',
        name: 'Toolbar',
        description: 'Interact with PostHog directly on your site.',
        slug: 'toolbar',
        category: 'product_os',
    },
    {
        handle: 'early_access',
        name: 'Early Access Features',
        description: 'Let users opt into betas and register interest in upcoming features',
        slug: 'early-access-features',
        category: 'product_engineering',
        status: 'beta',
    },
    {
        handle: 'replay_vision',
        name: 'Replay Vision',
        description: 'AI-powered session replay analysis that watches recordings for you',
        slug: 'replay-vision',
        category: 'product_engineering',
        status: 'beta',
    },
    {
        handle: 'api',
        name: 'API',
        description: 'Powerful APIs and SDKs to build analytics into your product',
        slug: 'api',
        category: 'product_os',
    },
    {
        handle: 'webhooks',
        name: 'Webhooks',
        searchDescription: 'Send event data from PostHog to any HTTP endpoint in real time.',
        slug: 'webhooks',
        category: 'automation',
    },
    {
        handle: 'notebooks',
        name: 'Notebooks',
        description: 'Combine analytics, replays, and notes in collaborative docs',
        slug: 'notebooks',
        category: 'product_os',
    },
    {
        handle: 'heatmaps',
        name: 'Heatmaps',
        description: 'See where users click, scroll, and move on your site',
        slug: 'heatmaps',
        category: 'dataviz',
    },
    {
        handle: 'data_in',
        name: 'Data sources & import (ELT)',
        description: 'Data sources & import (ELT)',
        searchDescription: 'Connect external data sources and import them into PostHog.',
        slug: 'context-warehouse/sources',
        category: 'data',
    },
    {
        handle: 'data_modeling',
        name: 'Data modeling',
        description: 'Model data',
        searchDescription: 'Transform, enrich, and model your data.',
        slug: 'context-warehouse/data-modeling',
        category: 'data',
        status: 'beta',
    },
    {
        handle: 'sql_editor',
        name: 'SQL editor',
        searchDescription: 'Query and analyze data from any source with SQL.',
        slug: 'context-warehouse/sql-editor',
        category: 'data',
    },
    {
        handle: 'data_out',
        name: 'Reverse ETL & export',
        description: 'Send data out of PostHog to other tools',
        searchDescription: 'Export and stream your PostHog data to external systems.',
        slug: 'context-warehouse/reverse-etl-export',
        category: 'data',
        status: 'alpha',
    },
] as const satisfies readonly Tool[]

export type ToolHandle = (typeof tools)[number]['handle']

export const getTool = <Handle extends ToolHandle>(
    handle: Handle
): Extract<(typeof tools)[number], { handle: Handle }> => {
    const tool = tools.find((tool) => tool.handle === handle)
    if (!tool) {
        throw new Error(`Unknown tool handle: ${handle}`)
    }
    return tool as Extract<(typeof tools)[number], { handle: Handle }>
}
