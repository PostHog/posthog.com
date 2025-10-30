export const revenueAnalyticsFeatures = {
    summary: {
        name: 'Revenue Analytics',
        description: 'Track revenue alongside product metrics with deferred recognition and multi-currency support',
        url: '/revenue-analytics',
        docsUrl: '/docs/revenue-analytics',
    },
    data_sources: {
        description: 'Flexible ways to collect revenue data',
        features: {
            revenue_tracking: {
                name: 'Revenue tracking',
                description: 'Comprehensive revenue tracking across multiple sources',
            },
            event_based_tracking: {
                name: 'Event-based revenue tracking',
                description: 'Add value and currency properties to any revenue-generating event',
            },
            stripe_integration: {
                name: 'Stripe integration',
                description: 'Connect Stripe directly for automatic revenue tracking',
            },
            backend_events: {
                name: 'Backend events',
                description: 'Track server-side purchases with session association',
            },
            native_multi_source: {
                name: 'Native multi-source revenue tracking',
                description: 'Track revenue from multiple sources in a unified platform',
            },
        },
    },
    subscriptions: {
        description: 'Purpose-built for recurring revenue businesses',
        features: {
            deferred_revenue: {
                name: 'Deferred revenue',
                description: 'Automatically spread subscription revenue across service periods',
            },
            mrr_arr_tracking: {
                name: 'MRR/ARR tracking',
                description: 'Monitor monthly and annual recurring revenue trends',
            },
            multiple_breakdowns: {
                name: 'Multiple breakdowns',
                description: 'Break revenue down by product, plan, customer, coupon, customer cohort, etc.',
            },
            churn_analysis: {
                name: 'Churn analysis',
                description: 'See revenue churn alongside user churn metrics',
            },
            expansion_revenue: {
                name: 'Expansion revenue',
                description: 'Track upgrades, downgrades, and expansion revenue',
            },
            future_revenue: {
                name: 'Future revenue',
                description: 'Visualize committed revenue from existing subscriptions',
            },
        },
    },
    integration: {
        description: 'Bring revenue and product data together',
        features: {
            product_analytics_integration: {
                name: 'Product analytics integration',
                description: 'Unified revenue and product data in one platform',
            },
            sql_access: {
                name: 'SQL access to all data',
                description: 'Query revenue data directly with PostHog SQL',
            },
            dashboard_integration: {
                name: 'Dashboard integration',
                description: 'Add revenue metrics to any dashboard relating to persons or groups',
            },
        },
    },
    multi_currency: {
        description: 'Operate globally with currency flexibility',
        features: {
            multi_currency_support: {
                name: 'Multi-currency support',
                description: 'Handle payments in any currency with automatic conversion to your favorite currency',
            },
            currency_conversion: {
                name: 'Automatic currency conversion',
                description: 'Automatic conversion between currencies for global revenue tracking',
            },
        },
    },
}
