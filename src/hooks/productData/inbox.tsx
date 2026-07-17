import { IconNotification } from '@posthog/icons'

export const inbox = {
    name: 'Inbox',
    Icon: IconNotification,
    handle: 'inbox',
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
