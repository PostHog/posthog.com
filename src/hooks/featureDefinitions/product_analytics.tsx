export const productAnalyticsFeatures = {
    summary: {
        name: 'Product Analytics',
        description: 'Track usage, retention, and feature adoption with comprehensive analytics',
    },
    features: {
        autocapture: {
            name: 'Autocapture',
            description: 'Capture events without manual tracking',
        },
    },
    insights: {
        description: 'Pre-built and custom insights to understand user behavior and product performance',
        features: {
            ready_made_insights: {
                name: 'Ready-made insight types',
                description: 'Pre-built insight types including trends, funnels, paths, retention, and lifecycle',
            },
            sql_mode: {
                name: 'SQL mode',
                description: 'Write SQL queries directly against your data without a separate data warehouse',
            },
            formula_mode: {
                name: 'Formula mode',
                description: 'Perform calculations and math operations on multiple event series',
            },
            sampling: {
                name: 'Sampling',
                description: 'Speed up long-running queries across large datasets with one-click sampling',
            },
        },
    },
    funnels: {
        description: 'Track users through a sequence of events to find drop-off and improve conversion',
        features: {
            conversion_funnels: {
                name: 'Conversion funnels',
                description: 'Track user progression through multi-step processes',
            },
            historical_trends: {
                name: 'Historical trends',
                description: 'See how funnel conversion rates change over time',
            },
            time_to_convert: {
                name: 'Time to convert insights',
                description: 'Measure how long it takes users to complete funnel steps',
            },
            step_ordering: {
                name: 'Sequential step order',
                description: 'Require steps to occur in a specific order',
            },
            strict_order: {
                name: 'Strict step order',
                description: 'Require steps to occur consecutively without interruptions',
            },
            any_order: {
                name: 'Any step order',
                description: 'Allow steps to occur in any order while still tracking completion',
            },
            exclusion_events: {
                name: 'Exclusion events',
                description: 'Exclude users who perform certain events from funnel analysis',
            },
            conversion_windows: {
                name: 'Conversion windows',
                description: 'Set time limits for funnel completion',
            },
            reveal_user_paths: {
                name: 'Reveal user paths between steps',
                description: 'See the actual paths users take between funnel steps',
            },
            anomaly_detection: {
                name: 'Anomaly detection',
                description: 'Automatically detect unusual changes in funnel performance',
            },
            filter_internal_users: {
                name: 'Filter internal and test users',
                description: 'Exclude team members and test accounts from analysis',
            },
            filter_by_cohort: {
                name: 'Filter by cohort',
                description: 'Limit funnel analysis to specific user cohorts',
            },
            filter_by_person_property: {
                name: 'Filter by person property',
                description: 'Apply filters based on user properties',
            },
            breakdown_by_person_property: {
                name: 'Breakdown by person property',
                description: 'Break down funnel results by user properties',
            },
            correlation_analysis: {
                name: 'Correlation analysis',
                description: 'Automatically identify significant factors that impact conversion',
            },
        },
    },
    paths: {
        description: 'Understand how users navigate through your product and where they get stuck',
        features: {
            reveal_paths_from_start: {
                name: 'Reveal paths from a start point',
                description: 'See where users go after a specific starting point',
            },
            reveal_paths_from_end: {
                name: 'Reveal paths from an end point',
                description: 'See where users came from before reaching a specific point',
            },
            reveal_paths_between: {
                name: 'Reveal paths between points',
                description: 'Track user navigation between two specific points',
            },
            reveal_paths_in_funnels: {
                name: 'Reveal paths within funnels',
                description: 'See navigation patterns within funnel steps',
            },
            zoom_in_out: {
                name: 'Zoom in/out',
                description: 'Adjust path visualization granularity',
            },
            define_user_count: {
                name: 'Define number of users on path',
                description: 'Control how many users are displayed on each path segment',
            },
            track_pageviews: {
                name: 'Track pageviews',
                description: 'Automatically capture and analyze page navigation',
            },
            track_custom_events: {
                name: 'Track custom events',
                description: 'Track any custom events alongside pageviews',
            },
            filter_by_cohort_paths: {
                name: 'Filter by cohort',
                description: 'Analyze paths for specific user cohorts',
            },
            filter_by_events_or_properties: {
                name: 'Filter by events or person property',
                description: 'Apply complex filters to path analysis',
            },
            include_exclude_wildcards: {
                name: 'Include and exclude wildcards',
                description: 'Use wildcards to group similar pages or events',
            },
            exclusion_events_paths: {
                name: 'Exclusion events',
                description: 'Exclude specific events from path analysis',
            },
            hide_repeating_steps: {
                name: 'Hide repeating steps',
                description: 'Simplify paths by hiding duplicate sequential steps',
            },
            regex_path_cleaning: {
                name: 'Regex for path cleaning',
                description: 'Clean and normalize paths using regular expressions',
            },
            max_steps: {
                name: 'Max number of steps',
                description: 'Control the maximum number of steps displayed in path analysis',
            },
        },
    },
    pricing: {
        free_tier: {
            name: 'Free usage',
        },
    },
}
