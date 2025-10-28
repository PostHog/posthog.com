export const chartmogul = {
    name: 'ChartMogul',
    key: 'chartmogul',
    assets: {
        icon: '/images/competitors/chartmogul.svg',
    },
    products: {
        revenue_analytics: {
            available: true,
            features: {
                revenue_tracking: true,
                event_based_revenue_tracking: true,
                native_multi_source_revenue_tracking: true,
                deferred_revenue: true,
                product_analytics_integration: false,
                multi_currency_support: true,
                revenue_prediction: true,
                sql_access: false,
            },
        },
    },
    platform: {
        open_source: false,
        self_host: false,
        usage_based_pricing: true,
        transparent_pricing: false,
        free_tier: false,
    },
    pricing: {
        model: 'Seat-based',
    },
}
