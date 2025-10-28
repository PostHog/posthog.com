export const mparticle = {
    name: 'mParticle',
    key: 'mparticle',
    assets: {
        icon: '/images/competitors/mparticle.svg',
    },
    products: {
        cdp: {
            available: true,
            features: {
                number_of_integrations: '300+',
                real_time_streaming: true,
                batch_exports: true,
                data_warehouse_sources: false,
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
