export const webAnalyticsFeatures = {
    summary: {
        name: 'Web Analytics',
        description: 'Privacy-focused web analytics with real-time data and no sampling',
    },
    core_metrics: {
        description: 'Essential traffic and engagement metrics',
        features: {
            visitors_pageviews: {
                name: 'Visitors and pageviews',
                description: 'Track unique visitors and total page views with real-time updates',
            },
            sessions_duration: {
                name: 'Sessions and duration',
                description: 'Monitor visit frequency and how long users stay engaged',
            },
            bounce_rate: {
                name: 'Bounce rate',
                description: 'See what percentage of users leave after viewing one page',
            },
            entry_exit_paths: {
                name: 'Entry and exit paths',
                description: 'Understand where users start and end their journeys',
            },
        },
    },
    traffic_sources: {
        description: 'Understand where your users come from',
        features: {
            channel_attribution: {
                name: 'Channel attribution',
                description: 'Automatic categorization into Direct, Organic, Paid, Social, etc.',
            },
            referrer_tracking: {
                name: 'Referrer tracking',
                description: 'See which websites send you the most valuable traffic',
            },
            utm_parameters: {
                name: 'UTM parameters',
                description: 'Full support for campaign, source, medium, content, and term parameters',
            },
            custom_channels: {
                name: 'Custom channels',
                description: 'Define your own channels like AI, partners, or affiliates',
            },
            session_explorer: {
                name: 'Session explorer',
                description: 'Deep dive into individual session attribution details',
            },
        },
    },
    performance: {
        description: 'Monitor site speed and performance health',
        features: {
            core_web_vitals: {
                name: 'Core Web Vitals',
                description: 'Track LCP, FCP, INP, and CLS for performance optimization',
            },
            graph_changes_over_time: {
                name: 'Graph changes over time',
                description: 'Monitor changes to your performance optimization metrics',
            },
            path_performance: {
                name: 'Find which paths have good and bad performance',
                description: 'See paths broken down by load time',
            },
            filtering_options: {
                name: 'Filtering options',
                description: 'Analyze by domain, path, device type, and user properties',
            },
            performance_percentile: {
                name: 'Analyze by performance percentile',
                description: 'Start with p90 or optimize even further',
            },
        },
    },
    advanced: {
        description: 'Go beyond basic metrics with powerful insights',
        features: {
            scroll_depth_tracking: {
                name: 'Scroll depth tracking',
                description: 'See how far users scroll and what content they actually read',
            },
            conversion_goals: {
                name: 'Conversion goals',
                description: 'Set up and track multiple conversion events',
            },
            revenue_tracking: {
                name: 'Revenue tracking',
                description: 'Connect revenue data from events or payment platforms',
            },
            active_hours_heatmap: {
                name: 'Active hours heatmap',
                description: 'Visualize when your users are most active',
            },
        },
    },
    privacy: {
        description: 'Privacy-first analytics and resilient tracking',
        features: {
            cookieless_tracking: {
                name: 'Cookieless tracking',
                description: 'Option to track without cookies for strict privacy requirements',
            },
            anonymous_mode: {
                name: 'Anonymous mode',
                description: 'Significantly reduce costs with anonymous visitor tracking',
            },
            gdpr_compliant: {
                name: 'GDPR compliant',
                description: 'Built to comply with GDPR and other privacy regulations',
            },
            ad_blocker_resilient: {
                name: 'Ad blocker resilient',
                description: 'Better data coverage even when users have ad blockers enabled',
            },
        },
    },
    dashboards: {
        description: 'Visualize and share analytics',
        features: {
            pre_configured_dashboards: {
                name: 'Pre-configured dashboards',
                description: 'Get started immediately with built-in dashboards',
            },
            real_time_data: {
                name: 'Real-time data',
                description: 'See data as it happens with no delays',
            },
            no_sampling: {
                name: 'No sampling',
                description: 'View complete data without statistical sampling',
            },
        },
    },
}
