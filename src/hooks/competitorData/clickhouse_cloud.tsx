export const clickhouse_cloud = {
    name: 'ClickHouse Cloud',
    key: 'clickhouse_cloud',
    products: {
        endpoints: {
            available: true,
            features: {
                data_source: 'Raw data in ClickHouse',
                predefined_queries: false,
                apis_from_product_insights: false,
                sql_based_query_support: true,
                materialized_queries: true,
                stable_named_api_endpoints: false,
                built_in_caching: false,
                higher_limits_predefined_queries: false,
                embedded_analytics: false,
                product_analytics_context: false,
                real_time_analytics: true,
                general_purpose_analytics_db: true,
                no_separate_ingestion: false,
            },
        },
    },
    platform: {
        deployment: {
            open_core: true,
        },
    },
}
