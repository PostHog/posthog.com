export const etlFeatures = {
    summary: {
        name: 'ETL',
        description: 'Sync data from 1,300+ sources, then write it wherever you need it.',
        url: '/etl',
        docsUrl: '/docs/etl/start-here',
    },
    sources: {
        name: 'Sources',
        features: {
            number_of_sources: {
                name: 'Number of sources',
                description: 'Connectors available out of the box',
            },
            custom_rest_source: {
                name: 'Build your own connector',
                description: 'Point the product at a REST API it does not already know',
            },
            database_cdc: {
                name: 'Database change data capture',
                description: 'Stream changes from Postgres and other databases rather than polling',
            },
            incremental_sync: {
                name: 'Incremental syncs',
                description: 'Copy only the rows that changed since the last run',
            },
        },
    },
    destinations: {
        name: 'Destinations',
        features: {
            warehouse_destinations: {
                name: 'Write to your own warehouse',
                description: 'Send synced rows to Postgres, Snowflake, BigQuery, Redshift, or Databricks',
            },
            object_storage_destinations: {
                name: 'Write to object storage',
                description: 'Send synced rows to S3 or Azure Blob',
            },
            included_warehouse: {
                name: 'Warehouse included',
                description: 'Query the synced data without buying a warehouse separately',
            },
        },
    },
    analysis: {
        name: 'Analysis',
        features: {
            built_in_sql: {
                name: 'Query the data in place',
                description: 'Run SQL against synced tables without moving them again',
            },
            product_analytics_context: {
                name: 'Product analytics in the same place',
                description: 'Join synced business data to the events your product sends',
            },
            built_in_dashboards: {
                name: 'Dashboards and insights',
                description: 'Visualize the synced data without a separate BI tool',
            },
        },
    },
    operations: {
        name: 'Running it',
        features: {
            sync_health_dashboard: {
                name: 'Sync health in one page',
                description: 'What stopped, what moved, and what is running now',
            },
            open_source: {
                name: 'Open source',
                description: 'The code is public and you can read it',
            },
            self_host: {
                name: 'Self-hostable',
                description: 'Run it on your own infrastructure',
            },
        },
    },
    pricing: {
        name: 'Pricing',
        features: {
            per_row_pricing: {
                name: 'Priced per row synced',
                description: 'Rather than per monthly active row or per credit',
            },
            free_tier: {
                name: 'Free tier',
                description: 'A monthly allowance before anything is billed',
            },
            free_historical_backfill: {
                name: 'Free historical backfill',
                description: 'The first load of a new source is not billed',
            },
        },
    },
}
