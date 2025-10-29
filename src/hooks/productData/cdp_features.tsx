// Feature configuration for CDP feature comparison slide
export const cdpProductFeatures = [
    { type: 'header', label: 'Integrations' },
    {
        type: 'feature',
        product: 'cdp',
        feature: 'number_of_integrations',
        label: 'Number of integrations',
        description: 'Third-party tools you can connect to',
    },
    { type: 'header', label: 'Data movement' },
    {
        type: 'feature',
        product: 'cdp',
        feature: 'real_time_streaming',
        label: 'Real-time streaming',
        description: 'Send data immediately as events occur',
    },
    {
        type: 'feature',
        product: 'cdp',
        feature: 'batch_exports',
        label: 'Batch exports',
        description: 'Export data in scheduled batches',
    },
    {
        type: 'feature',
        product: 'cdp',
        feature: 'data_warehouse_sources',
        label: 'Data warehouse sources',
        description: 'Import data from warehouses like Snowflake or BigQuery',
    },
    { type: 'header', label: 'Platform features' },
    {
        type: 'feature',
        product: 'cdp',
        feature: 'built_in_analytics',
        label: 'Built-in analytics',
        description: 'Native analytics capabilities beyond data routing',
    },
]
