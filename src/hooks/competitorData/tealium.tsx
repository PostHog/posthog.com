export const tealium = {
    name: 'Tealium',
    key: 'tealium',
    products: {
        cdp: {
            available: true,
            features: {
                realtime_streaming: true,
            },
            sources_destinations: {
                features: {
                    custom_transformations: true,
                    no_code_setup: true,
                },
            },
        },
        product_analytics: false,
        session_replay: false,
    },
}
