import { IconDatabase } from '@posthog/icons'

import { COMPUTE_RAM_DIVISOR, HOURS_PER_MONTH } from '../../constants/pricing'

// Managed Data Warehouse (MDW) pricing entry.
//
// Billed as TWO products (compute + storage) so each can have its own limit, but presented
// as ONE product here: compute is the main slider, storage is an addon-slider. `useProducts`
// nests the storage billing product into this product's `billingData.addons` so the
// calculator can resolve storage's tiers (see useProducts.tsx).
export const managedDataWarehouse = {
    name: 'Managed data warehouse',
    Icon: IconDatabase,
    type: 'managed_data_warehouse',
    handle: 'managed_data_warehouse',
    slug: 'managed-data-warehouse',
    color: 'purple',
    colorSecondary: 'lilac',
    category: 'data',
    status: 'beta',
    includeAddonRates: true,
    categoryName: 'Managed data warehouse',
    productVariantName: 'Compute', // labels the main section in the calculator
    // Compute isn't a single dimension: cost depends on the worker size (vCPU + memory) you run and
    // for how long. So instead of one compute-hours slider, the calculator renders a worker
    // configurator (see StandaloneAddonsTab). It derives compute-hours from the worker + hours and
    // prices them with the same billing tiers, so the free tier + rate stay a single source of truth.
    //   compute-hours = (vCPU + RAM_GB / ramDivisor) × hours
    //   ramDivisor = 8: 1 GB = ⅛ of a vCPU, so $0.20/compute-hour decomposes to
    //   $0.20/vCPU-hour + $0.025/GB-hour.
    computeConfigurator: {
        ramDivisor: COMPUTE_RAM_DIVISOR,
        presets: [
            { vcpu: 4, memory: 8 },
            { vcpu: 8, memory: 16 }, // default
            { vcpu: 20, memory: 40 },
        ],
        defaultVcpu: 8,
        defaultMemory: 16,
        defaultHours: 100,
        maxVcpu: 96,
        maxMemory: 384,
        hoursMarks: [1, 24, 168, HOURS_PER_MONTH], // hour · day · week · full month
        maxHours: HOURS_PER_MONTH,
    },
    // Initial value only — used for the first-render cost until WorkerConfigurator mounts and
    // recomputes from its defaults (keep consistent with computeConfigurator's defaults:
    // (defaultVcpu + defaultMemory/ramDivisor) × defaultHours).
    volume: 1000,
    addonSliders: [
        {
            key: 'managed_data_warehouse_storage',
            label: 'Storage',
            // Storage is billed per GB-hour, so the slider and its tiers are in GB-hours (matching
            // billing). Marks are the GB levels 100 / 500 / 2k / 10k / 50k held all month (× 744).
            // The volumeAnnotation translates the current GB-hour value back into a steady GB level.
            sliderConfig: {
                marks: [100, 500, 2000, 10000, 50000].map((gb) => gb * HOURS_PER_MONTH),
                min: 100 * HOURS_PER_MONTH,
                max: 50000 * HOURS_PER_MONTH,
            },
            volume: 100 * HOURS_PER_MONTH,
            unit: 'GB-hour',
            freeAllocationText:
                'First 74,400 GB-hours free (≈ 100 GB held all month). Storage is billed per GB-hour on what you keep — it carries over and does not reset monthly.',
            volumeAnnotation: (volume: number) =>
                `≈ a steady ${Math.round(volume / HOURS_PER_MONTH).toLocaleString()} GB held over a full month`,
        },
    ],
}
