import React from 'react'
import {
    IconPieChart,
    IconTrends,
    IconPulse,
    IconSparkles,
    IconShield,
    IconGlobe,
    IconGraph,
    IconPlug,
} from '@posthog/icons'
import Link from 'components/Link'
import MCPInstall from 'components/Products/MCPInstall'

export const features = {
    core_metrics: {
        title: 'Core metrics',
        headline: 'Track visitors. Cookies not required.',
        description:
            "If you're privacy-focused, our cookieless option means you don't need to add a cookie banner just for your web analytics.",
        icon: <IconPieChart />,
        color: 'green',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_top_light_mode_2024_10_be53cf5325.png',
                alt: 'Web analytics dashboard',
                stylize: true,
                shadow: true,
            },
        ],
        features: [
            {
                title: 'Visitors & pageviews',
                description: 'Track unique visitors and total page views with real-time updates',
            },
            {
                title: 'Sessions & duration',
                description: 'Monitor visit frequency and how long users stay engaged',
            },
            {
                title: 'Bounce rate',
                description: 'See what percentage of users leave after viewing one page',
            },
            {
                title: 'Entry & exit paths',
                description: 'Understand where users start and end their journeys',
            },
        ],
    },
    traffic_sources: {
        title: 'Traffic sources',
        headline: 'Check your sources',
        description:
            'Track channels, referrers, UTMs, and create custom attribution channels for comprehensive source analysis.',
        icon: <IconTrends />,
        color: 'blue',
        images: [
            {
                src: '/images/products/web-analytics/top-referrers.jpg',
                alt: 'Traffic sources',
                shadow: true,
            },
        ],
        imagesClasses: '-mr-8',
        layout: 'columns',
        features: [
            {
                title: 'Channel attribution',
                description: 'Automatic categorization into Direct, Organic, Paid, Social, etc.',
            },
            {
                title: 'Referrer tracking',
                description: 'See which websites send you the most valuable traffic',
            },
            {
                title: 'UTM parameters',
                description: 'Full support for campaign, source, medium, content, and term',
            },
            {
                title: 'Custom channels',
                description: 'Define your own channels like AI, partners, or affiliates',
            },
            {
                title: 'Session explorer',
                description: 'Deep dive into individual session attribution details',
            },
        ],
    },
    web_vitals: {
        title: 'Core Web Vitals',
        headline: 'Monitor Core Web Vitals',
        description: (
            <>
                Track LCP, FCP, INP, and CLS for performance optimization. Also available in PostHog Toolbar.{' '}
                <div className="text-base">
                    <Link state={{ newWindow: true }} to="/docs/web-analytics/web-vitals">
                        What do all these silly acronyms mean?
                    </Link>
                </div>
            </>
        ),
        icon: <IconPulse />,
        color: 'orange',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/w_1000,c_limit,q_auto,f_auto/web_vitals_4704da6644.png',
                alt: 'Web vitals',
                shadow: true,
            },
        ],
        features: [
            {
                title: 'Graph changes over time',
                description: 'Monitor changes to your performance optimization metrics',
            },
            {
                title: 'Find which paths have good and bad performance',
                description: 'See paths broken down by load time',
            },
            {
                title: 'Filtering options',
                description: 'Analyze by domain, path, device type, and user properties',
            },
            {
                title: 'Analyze by performance percentile',
                description: 'Start with p90 or optimize even further',
            },
        ],
    },
    advanced_analytics: {
        title: 'Advanced analytics',
        headline: 'Go beyond basic metrics with powerful insights',
        description: 'Track scroll depth, conversions, and revenue directly in your web analytics.',
        icon: <IconSparkles />,
        color: 'purple',
        features: [
            {
                title: 'Scroll depth tracking',
                description: 'See how far users scroll and what content they actually read',
            },
            {
                title: 'Conversion goals',
                description: 'Set up and track multiple conversion events',
            },
            {
                title: 'Revenue tracking',
                description: 'Connect revenue data from events or payment platforms',
            },
            {
                title: 'Active hours heatmap',
                description: 'Visualize when your users are most active',
            },
        ],
    },
    privacy: {
        title: 'Privacy & compliance',
        headline: 'Analytics that respects user privacy',
        description: 'GDPR compliant, cookieless options, and ad blocker resilient tracking for better data coverage.',
        icon: <IconShield />,
        color: 'seagreen',
        features: [
            {
                title: 'Cookieless tracking',
                description: 'Option to track without cookies for strict privacy requirements',
            },
            {
                title: 'Anonymous mode',
                description: 'Significantly reduce costs with anonymous visitor tracking',
            },
            {
                title: 'GDPR compliant',
                description: 'Built with privacy regulations in mind from the start',
            },
            {
                title: 'Ad blocker resilient',
                description: 'Reverse proxy option reduces blocking by 70%+',
            },
            {
                title: 'Data residency',
                description: 'Choose between US and EU cloud hosting',
            },
        ],
    },
    demographics: {
        title: 'Device & demographics',
        headline: 'Know your audience',
        description: 'Break down traffic by device, browser, OS, and location to optimize for your users.',
        icon: <IconGlobe />,
        color: 'blue',
        images: [
            {
                src: '/images/products/web-analytics/world-map.jpg',
                alt: 'Demographics',
                shadow: true,
            },
        ],
        imagesClasses: '-mr-8',
        layout: 'columns',
        features: [
            {
                title: 'Device types',
                description: 'Desktop vs mobile vs tablet breakdown',
            },
            {
                title: 'Browsers & OS',
                description: 'See which browsers and operating systems to support',
            },
            {
                title: 'Geographic data',
                description: 'Country and city-level visitor location data',
            },
            {
                title: 'Screen sizes',
                description: 'Optimize for your most common screen resolutions',
            },
            {
                title: 'Bot detection',
                description: 'Automatic filtering of crawler and bot traffic',
            },
        ],
    },
    works_with_product_analytics: {
        title: 'Works with product analytics',
        headline: 'More than just web analytics',
        description:
            'Switch between web and product analytics on the same events – the shared context agents act on to make your product self-driving.',
        icon: <IconGraph />,
        color: 'blue',
        features: [
            {
                title: 'Unified platform',
                description: 'Web analytics + product analytics + session replay + more',
            },
            {
                title: 'Shared events',
                description: 'Same events power multiple features, no duplicate tracking',
            },
            {
                title: 'Cross-domain tracking',
                description: 'Track users across multiple domains and subdomains',
            },
            {
                title: 'Backend integration',
                description: 'Connect server-side events with frontend sessions',
            },
            {
                title: 'Cost efficient',
                description: 'No additional cost beyond event usage',
            },
        ],
    },
    mcp: {
        title: 'MCP',
        headline: 'Query traffic from your editor',
        description:
            'Check traffic, investigate anomalies, and build traffic dashboards from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
        icon: <IconPlug />,
        color: 'green',
        features: [
            {
                title: 'Validate deploys',
                description: 'Check whether traffic to specific pages changed after an update.',
            },
            {
                title: 'Diagnose anomalies',
                description: 'Investigate sudden drops in pageviews or sessions as context for your coding agent.',
            },
            {
                title: 'Analyze traffic sources',
                description:
                    'Break down which referrers, UTMs, or channels are driving visits to prioritize what to build next.',
            },
            {
                title: 'Monitor page performance',
                description: 'Track bounce rates, session durations, and page-level trends to catch regressions early.',
            },
        ],
        children: <MCPInstall />,
    },
}
