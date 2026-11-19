// Used as a column in the Warehouse comparison table. The row values live on
// src/hooks/productData/data_warehouse.tsx because they compare warehouse
// capabilities that aren't in featureDefinitions.
export const bigquery = {
    name: 'BigQuery',
    key: 'bigquery',
    products: {
        data_warehouse: {
            available: true,
        },
    },
}
