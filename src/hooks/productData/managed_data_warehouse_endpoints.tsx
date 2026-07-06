import { IconDatabase } from '@posthog/icons'

// Standalone pricing entry for Managed Data Warehouse endpoints (its own product card, not
// grouped under "Managed data warehouse").
//
// Billed at the same rate as managed warehouse compute; compute-seconds surfaced as
// compute-hours. Pricing joins by `type` from /api/products-v2 at build time.
export const managedDataWarehouseEndpoints = {
    name: 'Data warehouse endpoints',
    Icon: IconDatabase,
    type: 'managed_data_warehouse_endpoints',
    handle: 'managed_data_warehouse_endpoints',
    slug: 'managed-data-warehouse-endpoints',
    color: 'purple',
    colorSecondary: 'lilac',
    category: 'data',
    status: 'beta',
    slider: {
        marks: [50, 250, 1000, 5000, 20000],
        min: 50,
        max: 20000,
    },
    volume: 50,
}
