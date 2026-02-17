export const tinybird = {
    name: 'Tinybird',
    key: 'tinybird',
    products: {
        endpoints: {
            available: true,
            features: {
                data_source: 'Ingested event/log data',
                predefined_queries: true,
                apis_from_product_insights: false,
                sql_based_query_support: true,
                materialized_queries: true,
                stable_named_api_endpoints: true,
                built_in_caching: true,
                higher_limits_predefined_queries: true,
                embedded_analytics: true,
                product_analytics_context: false,
                real_time_analytics: true,
                general_purpose_analytics_db: false,
                no_separate_ingestion: false,
            },
        },
    },
    platform: {
        deployment: {
            open_core: false,
        },
    },
}
