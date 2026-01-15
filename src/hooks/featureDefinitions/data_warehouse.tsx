export const dataWarehouseFeatures = {
    summary: {
        name: 'Data Stack',
        description: 'Import, query, model & visualize product and third party data together',
        url: '/data-stack',
        docsUrl: '/docs/data-warehouse',
    },
    features: {
        warehouse_sources: {
            name: 'Import from data warehouses',
            description: 'Import data from third-party sources like Postgres, S3, GCS, Stripe, HubSpot, and more',
        },
        batch_exports: {
            name: 'Batch exports',
            description: 'Schedule data exports to S3, Snowflake, BigQuery, and more',
        },
    },
    query: {
        description: 'Query with PostHog SQL',
        features: {
            sql_queries: {
                name: 'Add queries to notebooks',
                description:
                    'Use PostHog notebooks to collect warehouse info, research topics, or just as a scratch pad',
            },
            save_queries_as_views: {
                name: 'Save queries as views',
                description: 'Visualize your results as tables, graphs, and more, then save them for easy access',
            },
            ai_sql: {
                name: 'Write SQL without knowing SQL',
                description: 'Nobody likes writing SQL, except for PostHog AI',
            },
            simplified_syntax: {
                name: 'Simplified syntax',
                description: 'Access properties with dot notation like properties.$browser',
            },
            smart_joins: {
                name: 'Smart joins',
                description: 'Automatic joins between events, persons, and groups',
            },
            product_functions: {
                name: 'Product functions',
                description: 'Built-in functions for cohorts, feature flags, and more',
            },
        },
    },
    insights: {
        description: 'Custom analytics beyond standard charts',
        features: {
            complex_queries: {
                name: 'Complex queries',
                description: 'Multi-step CTEs, window functions, and subqueries',
            },
            multiple_visualizations: {
                name: 'Multiple visualizations',
                description: 'Tables, line charts, bar charts, and more',
            },
            save_share: {
                name: 'Save & share',
                description: 'Save queries as insights to add to dashboards',
            },
            export_results: {
                name: 'Export results',
                description: 'Download query results as CSV or JSON',
            },
        },
    },
    exploration: {
        description: 'Browse and query all available tables',
        features: {
            schema_browser: {
                name: 'Schema browser',
                description: 'See all tables, columns, and data types',
            },
            auto_complete: {
                name: 'Auto-complete',
                description: 'IntelliSense for tables, columns, and functions',
            },
            sample_data: {
                name: 'Sample data',
                description: 'Preview table contents before querying',
            },
            query_history: {
                name: 'Query history',
                description: 'Access and rerun previous queries',
            },
        },
    },
    external_sources: {
        description: 'Query PostHog alongside business data',
        features: {
            unified_queries: {
                name: 'Unified queries',
                description: 'JOIN PostHog events with external tables',
            },
            custom_views: {
                name: 'Custom views',
                description: 'Save data as views to reuse in other queries. Materialize them to improve performance',
            },
            scheduled_syncs: {
                name: 'Scheduled syncs',
                description: 'Keep external data fresh with automatic updates',
            },
            cloud_storage: {
                name: 'S3 & BigQuery',
                description: 'Query data directly from cloud storage',
            },
        },
    },
    api: {
        description: 'Programmatic access for automation',
        features: {
            rest_api: {
                name: 'REST API',
                description: 'Simple HTTP endpoints for SQL queries',
            },
            authentication: {
                name: 'Authentication',
                description: 'Secure access with personal API keys',
            },
            structured_responses: {
                name: 'Structured responses',
                description: 'JSON results with types and metadata',
            },
            sdks: {
                name: 'Python & JS SDKs',
                description: 'Native libraries for common languages',
            },
            bi_tool_integration: {
                name: 'BI tool integration',
                description: 'Connect Tableau, Looker, and other tools',
            },
        },
    },
}
