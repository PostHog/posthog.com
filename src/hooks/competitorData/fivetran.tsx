export const fivetran = {
    name: 'Fivetran',
    key: 'fivetran',
    assets: {
        icon: '/images/competitors/fivetran.svg',
    },
    products: {
        cdp: {
            available: true,
            features: {
                number_of_integrations: '500+',
                real_time_streaming: false,
                batch_exports: true,
                data_warehouse_sources: true,
                built_in_analytics: false,
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
        model: 'Usage-based',
    },
}
