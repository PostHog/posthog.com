export const airbyte = {
    name: 'Airbyte',
    key: 'airbyte',
    assets: {
        icon: '/images/competitors/airbyte.svg',
    },
    products: {
        etl: {
            available: true,
            sources: {
                features: {
                    number_of_sources: '600+',
                    custom_rest_source: true,
                    database_cdc: true,
                    incremental_sync: true,
                },
            },
            destinations: {
                features: {
                    warehouse_destinations: true,
                    object_storage_destinations: true,
                    included_warehouse: false,
                },
            },
            analysis: {
                features: {
                    built_in_sql: false,
                    product_analytics_context: false,
                    built_in_dashboards: false,
                },
            },
            operations: {
                features: {
                    sync_health_dashboard: true,
                    open_source: true,
                    self_host: true,
                },
            },
            pricing: {
                features: {
                    per_row_pricing: false,
                    free_tier: true,
                    free_historical_backfill: false,
                },
            },
        },
    },
    platform: {
        deployment: {
            open_source: true,
            self_host: true,
            eu_hosting: true,
        },
        pricing: {
            usage_based_pricing: true,
            free_tier: true,
        },
        developer: {
            api: true,
            sql: false,
        },
    },
    pricing: {
        model: 'Usage-based (credits)',
    },
}
