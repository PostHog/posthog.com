import { IconNotification } from '@posthog/icons'
import { getTool } from '../../data/tools'

export const inbox = {
    ...getTool('inbox'),
    Icon: IconNotification,
    type: 'inbox',
    color: 'blue',
    // No category or slug yet: keep this out of product/app navigation.
    // Billed in AI credits based on effort, so there's no per-unit price to show in the pricing table or calculator.
    hideFromPricingTableAndCalculator: true,
    slider: {
        marks: [3, 10, 50, 100],
        min: 3,
        max: 100,
    },
    volume: 3,
}
