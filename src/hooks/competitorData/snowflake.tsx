// Used as a column in the Warehouse comparison table. The row values live on
// src/hooks/productData/data_warehouse.tsx because they compare warehouse
// capabilities that aren't in featureDefinitions.
export const snowflake = {
    name: 'Snowflake',
    key: 'snowflake',
    products: {
        data_warehouse: {
            available: true,
        },
    },
}
