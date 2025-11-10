export const dynamic_yield = {
    name: 'Dynamic Yield',
    key: 'dynamic_yield',
    assets: {
        icon: '/images/competitors/dynamic-yield.svg',
    },
    products: {
        feature_flags: {
            available: true,
        },
        experiments: {
            available: true,
            features: {
                funnel_tests: false,
                no_code_experiments: true,
            },
        },
        product_analytics: {
            available: false,
        },
        session_replay: {
            available: false,
        },
    },
    platform: {
        deployment: {
            open_source: false,
        },
        pricing: {
            self_serve: false,
            transparent_pricing: false,
        },
        developer: {
            api: 'Evaluate only',
        },
        tools: {
            cms: false,
            notebooks: false,
            project_management_tools: false,
        },
    },
    pricing: {
        model: 'Quote-based',
    },
}
