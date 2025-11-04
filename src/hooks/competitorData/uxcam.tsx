export const uxcam = {
    name: 'UXCam',
    key: 'uxcam',
    assets: {
        icon: '/images/competitors/uxcam.svg',
    },
    products: {
        product_analytics: {
            available: true,
            features: {
                autocapture: true,
                cohorts: true,
            },
            group_analytics: {
                available: false,
            },
            funnels: {
                available: true,
            },
            user_paths: {
                available: true,
            },
        },
        session_replay: {
            available: true,
            platform_support: {
                features: {
                    mobile_app_recordings: true,
                    web_app_recordings: false,
                },
            },
        },
        heatmaps: {
            available: true,
        },
        experiments: {
            available: false,
        },
        feature_flags: {
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
    },
}
