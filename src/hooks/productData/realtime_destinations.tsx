import { IconDecisionTree } from '@posthog/icons'
import { PRODUCT_COLORS } from 'constants/productColors'
import hedgehogNeuralPng from 'brand-hoggie-pngs/neural.png'

export const realtimeDestinations = {
    handle: 'realtime_destinations',
    hog: {
        src: hedgehogNeuralPng,
        alt: 'A hedgehog at a wall of live data screens',
        classes: 'absolute bottom-0 right-0 max-w-md',
        footerClasses: 'max-w-[240px]',
    },
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
