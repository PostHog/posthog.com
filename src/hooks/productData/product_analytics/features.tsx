import React from 'react'
import {
    IconFunnels,
    IconTrends,
    IconLifecycle,
    IconUserPaths,
    IconCorrelationAnalysis,
    IconRetention,
    IconStickiness,
    IconDatabase,
    IconPeople,
    IconPlug,
} from '@posthog/icons'
import Link from 'components/Link'
import MCPInstall from 'components/Products/MCPInstall'

export const features = {
    funnels: {
        title: 'Funnels',
        headline: 'Find drop-off across a series of actions',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Products/Slider/images/funnel-basic.png',
                alt: 'Basic funnel visualization',
            },
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Products/Slider/images/funnel-grouped.png',
                alt: 'Grouped funnel visualization',
            },
        ],
        features: [
            {
                title: 'Filtering',
                description:
                    'Set filters for individual steps – or the entire funnel – by person property, group or cohort, or event property',
            },
            {
                title: 'Graph types',
                description:
                    "Track user progression between steps, conversion time between each step, and how a funnel's conversion rate changes over time",
            },
            {
                title: 'Step ordering',
                description:
                    'Choose between a sequential series of steps, a strict order, or any order of steps that lead to conversion',
            },
            {
                title: 'Granular controls',
                description:
                    'Set conversion window limit, add exclusionary steps, set attribution type, and see the relative conversion rate between each step',
            },
        ],
        icon: <IconFunnels />,
        color: 'blue',
    },
    trends: {
        title: 'Graph & trends',
        headline: 'Visualize user data with graphs, tables, charts, maps, and more',
        icon: <IconTrends />,
        color: 'yellow',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-trend-bar.png',
                alt: 'Trend bar visualization',
            },
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-trend-multiple-sparklines.png',
                alt: 'Multiple sparklines visualization',
            },
        ],
        features: [
            {
                title: 'Trends',
                description:
                    'Plot any event over time, such as a feature being used. You can even do math and multiple series.',
            },
            {
                title: 'Advanced filtering',
                description:
                    'Apply however many filters you need to or breakdown by any event, user or group property with advanced logic.',
            },
            {
                title: 'Breakout tables',
                description: 'Break out your trends by any event property.',
            },
            {
                title: 'Sampling',
                description: 'Speed up long running queries across large datasets in one click.',
            },
        ],
    },
    lifecycle: {
        title: 'Lifecycle',
        headline: 'Track user engagement over time',
        description:
            'Analyze active users break down, highlighting those who have recently stopped being active or those who have just become active for the first time.',
        icon: <IconLifecycle />,
        color: 'purple',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-lifecycle.png',
                alt: 'Lifecycle visualization',
            },
        ],
        features: [
            {
                title: 'User categories',
                description: 'Track new, returning, resurrecting, and dormant users to understand engagement patterns',
            },
            {
                title: 'Time-based analysis',
                description:
                    "Configure intervals (hour, day, week, month) to match your product's natural usage patterns",
            },
            {
                title: 'Detailed breakdowns',
                description:
                    'View individual users in each category and analyze their behavior through session recordings',
            },
            {
                title: 'Integration',
                description: 'Works with cohorts, feature flags, and other PostHog tools for comprehensive analysis',
            },
        ],
    },
    user_paths: {
        title: 'User Paths',
        headline: 'Understand user navigation patterns',
        description:
            "Track how users navigate through your product, identify where they get stuck, and discover why they aren't finding new features.",
        icon: <IconUserPaths />,
        color: 'green',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/user-guides/paths/example-light-mode.png',
                alt: 'User paths visualization',
            },
        ],
        features: [
            {
                title: 'Path visualization',
                description: 'See the most common paths users take through your product',
            },
            {
                title: 'Drop-off analysis',
                description: 'Identify where users are getting stuck or abandoning their journey',
            },
            {
                title: 'Session recordings',
                description: 'View recordings of user sessions to understand their behavior',
            },
            {
                title: 'Cohort creation',
                description: 'Create cohorts of users who follow specific paths for further analysis',
            },
        ],
    },
    correlation_analysis: {
        title: 'Correlation Analysis',
        headline: 'Discover factors affecting conversion',
        description: 'Automatically identify significant factors that impact user behavior and conversion rates.',
        icon: <IconCorrelationAnalysis />,
        color: 'red',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1716387676/posthog.com/contents/Screenshot_2024-05-22_at_3.20.17_PM.png',
                alt: 'Correlation analysis visualization',
            },
        ],
        features: [
            {
                title: 'Automatic detection',
                description: 'Automatically highlight significant factors affecting conversion',
            },
            {
                title: 'Property analysis',
                description: 'Analyze how different user properties impact behavior',
            },
            {
                title: 'Event correlation',
                description: 'Discover which events are most strongly correlated with success',
            },
            {
                title: 'Cohort creation',
                description: 'Create cohorts based on correlation analysis results',
            },
        ],
    },
    retention: {
        title: 'Retention',
        headline: 'Track user return rates',
        description:
            'Measure how many users come back to your product over time and compare retention between different user segments.',
        icon: <IconRetention />,
        color: 'blue',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/retention_light_805120c74c.png',
                alt: 'Retention visualization',
            },
        ],
        features: [
            {
                title: 'Cohort analysis',
                description: 'Compare retention rates between different user cohorts',
            },
            {
                title: 'Time-based tracking',
                description: 'Track retention over hours, days, weeks, or months',
            },
            {
                title: 'First-time vs recurring',
                description: 'Analyze both first-time and recurring user retention',
            },
            {
                title: 'Detailed breakdowns',
                description: 'Break down retention by user properties and segments',
            },
        ],
    },
    stickiness: {
        title: 'Stickiness',
        headline: 'Measure user engagement depth',
        description: 'Track how frequently users engage with your product and identify your most engaged users.',
        icon: <IconStickiness />,
        color: 'yellow',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1716289464/posthog.com/contents/stickiness-light.png',
                alt: 'Stickiness visualization',
            },
        ],
        features: [
            {
                title: 'Engagement frequency',
                description: 'Track how many times users perform specific actions',
            },
            {
                title: 'User segmentation',
                description: 'Identify your most engaged users and their characteristics',
            },
            {
                title: 'Feature analysis',
                description: 'Determine which features drive the most engagement',
            },
            {
                title: 'Time-based analysis',
                description: 'Analyze engagement patterns over different time periods',
            },
        ],
    },
    sql_editor: {
        title: 'SQL editor',
        headline: 'Write SQL against your data',
        description:
            'No separate data warehouse needed – though it works with yours if you have one, or you can use ours.',
        icon: <IconDatabase />,
        color: 'purple',
        layout: 'columns',
        features: [
            {
                title: 'Write custom queries',
                description: 'Query product data and join tables to bring warehouse data into the mix',
            },
            {
                title: 'Visualize data in tables, trends, charts and more',
                description: 'Customize visualizations with colors, goals, scales, legends, and more',
            },
            {
                title: 'Get help writing SQL',
                description: (
                    <>
                        <Link to="/ai" state={{ newWindow: true }}>
                            PostHog AI
                        </Link>{' '}
                        knows your data and can write syntax for you.
                    </>
                ),
            },
        ],
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_data_warehouse_light_b0cdbebe8f.png',
                alt: 'SQL editor',
                shadow: true,
            },
        ],
    },
    group_analytics: {
        title: 'Group analytics',
        headline: 'Track companies, not just individuals',
        description: 'See how all seat activity rolls up to the entire account level – essential for B2B.',
        icon: <IconPeople />,
        color: 'green',
        features: [
            {
                title: 'Track organizations, companies, teams, projects',
                description: '',
            },
            {
                title: 'Filter, build cohorts based on group properties',
                description: '',
            },
            {
                title: 'Measure activation and retention at a group level',
                description: '',
            },
            {
                title: 'Target feature flags at groups',
                description: '',
            },
        ],
    },
    mcp: {
        title: 'MCP',
        headline: 'Analyze product usage from your editor',
        description:
            'Query trends, funnels, retention, and usage metrics from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
        icon: <IconPlug />,
        color: 'blue',
        features: [
            {
                title: 'Query any metric from your editor',
                description: 'Pull trends, funnels, retention, paths, or custom SQL without switching to a dashboard.',
            },
            {
                title: 'Investigate metric changes',
                description: 'Connect drops or spikes in user behavior to recent code changes.',
            },
            {
                title: 'Save and share what you find',
                description: 'Turn a query into a saved insight and add it to a PostHog dashboard.',
            },
            {
                title: 'Ship with more context',
                description: 'Ground your next PR in actual usage data instead of assumptions.',
            },
        ],
        children: <MCPInstall />,
    },
}
