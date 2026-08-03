import { IconNotification } from '@posthog/icons'
import { getTool } from '../../data/tools'

export const inbox = {
    ...getTool('inbox'),
    Icon: IconNotification,
    type: 'inbox',
    color: 'blue',
    pricingBadge: 'Beta',
    // No category or slug yet: keep this visible on pricing surfaces, not product/app navigation.
    slider: {
        marks: [3, 10, 50, 100],
        min: 3,
        max: 100,
    },
    volume: 3,
}
