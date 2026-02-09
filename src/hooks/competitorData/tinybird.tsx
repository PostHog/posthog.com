export const tinybird = {
    name: 'Tinybird',
    key: 'tinybird',
    assets: {
        icon: '/images/competitors/tinybird.png',
    },
    products: {
        endpoints: {
            available: true,
            features: {
                data_source: 'Ingested event/log data',
                create_apis_from_predefined_queries: true,
                create_apis_from_product_insights: false,
                sql_based_query_support: true,
                materialized_queries: true,
                stable_named_api_endpoints: true,
                built_in_caching_for_api_responses: true,
                higher_limits_for_predefined_api_queries: true,
                embedded_analytics_use_cases: true,
                product_analytics_context: false,
                real_time_analytics_on_raw_data_streams: true,
                general_purpose_analytics_database: false,
                no_separate_ingestion_or_data_modeling_required: false,
                open_source_core: false,
            },
        },
    },
}
