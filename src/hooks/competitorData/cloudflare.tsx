export const cloudflare = {
    name: 'Cloudflare Web Analytics',
    key: 'cloudflare',
    assets: {
        icon: '/images/competitors/cloudflare.svg',
    },
    products: {
        web_analytics: {
            available: true,
            features: {
                // Core
                pageviews: true,
                traffic_breakdown: true,
                utm_tracking: false,
                conversions: false,
                entry_exit_paths: true,
                outbound_clicks: false,

                // Performance
                web_vitals: true,

                // Privacy + setup
                cookieless_tracking: true,
                snippet_install: true,
                script_size: 'Lightweight',

                sessions: true,
                bounce_rate: false,
                custom_channel_types: false,
                search_tools: false,
                migration: false,
                movement_maps: false,
            },
        },
        product_analytics: {
            available: false,
        },
        session_replay: {
            available: false,
        },
        heatmaps: {
            available: false,
        },
    },
    platform: {
        deployment: {
            eu_hosting: true,
            open_source: false,
            reverse_proxy: false,
            managed_reverse_proxy: false,
            self_host: false,
        },
        pricing: {
            free_tier: true,
            transparent_pricing: true,
            usage_based_pricing: false,
            self_serve: true,
        },
        developer: {
            // Cloudflare’s Analytics data is accessible via their GraphQL Analytics API.
            api: true,
            sql: false,
            client_side_sdks: false,
            server_side_sdks: false,
        },
        security: {
            cookieless_tracking: true,
            gdpr_ready: true,
            ccpa_ready: true,
            data_retention: '6 months',
        },
        integrations: {
            google_search_console: false,
        },
    },
    pricing: {
        model: 'Free',
    },
}
