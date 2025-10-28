export const stripe = {
    name: 'Stripe',
    key: 'stripe',
    assets: {
        icon: '/images/competitors/stripe.svg',
    },
    products: {
        revenue_analytics: {
            available: true,
            features: {
                revenue_tracking: true,
                event_based_revenue_tracking: false,
                native_multi_source_revenue_tracking: false,
                deferred_revenue: true,
                product_analytics_integration: false,
                multi_currency_support: true,
                revenue_prediction: false,
                sql_access: false,
            },
        },
    },
    platform: {
        open_source: false,
        self_host: false,
        usage_based_pricing: true,
        transparent_pricing: true,
        free_tier: false,
    },
    pricing: {
        model: 'Transaction-based',
    },
}
