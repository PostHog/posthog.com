import { IconNotification } from '@posthog/icons'
import { getTool } from '../../data/tools'

export const inbox = {
    ...getTool('inbox'),
    Icon: IconNotification,
    type: 'inbox',
    billingType: 'inbox_usage',
    color: 'blue',
    // No category or slug yet: keep this out of product/app navigation.
    // `inbox_usage` bills $1 per USD of recorded AI and task spend, so the slider is in dollars, not credits.
    freeAllocationText: 'No monthly free tier – your first month includes 1,000 credits (worth $10)',
    slider: { marks: [10, 50, 200, 1000], min: 0, max: 1000 },
    volume: 10,
}
