import { IconDecisionTree } from '@posthog/icons'
import { PRODUCT_COLORS } from 'constants/productColors'

export const realtimeDestinations = {
    handle: 'realtime_destinations',
    name: 'Realtime destinations',
    Icon: IconDecisionTree,
    type: 'realtime_destinations',
    color: PRODUCT_COLORS.realtime_destinations,
    colorSecondary: 'green-2',
    // category: 'data', // Not set on purpose - this ensures it's hidden from navigation and products
    includeAddonRates: true,
    categoryName: 'Destinations',
    slider: {
        marks: [10000, 1000000, 10000000],
        min: 10000,
        max: 10000000,
    },
    volume: 10000,
    addonSliders: [
        {
            key: 'batch_exports',
            label: 'Batch exports',
            sliderConfig: {
                marks: [1000000, 25000000, 100000000],
                min: 1000000,
                max: 100000000,
            },
            volume: 1000000,
            unit: 'row',
        },
    ],
}
