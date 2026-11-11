import { IconNotification } from '@posthog/icons'
import { getTool } from '../../data/tools'

export const inbox = {
    ...getTool('inbox'),
    Icon: IconNotification,
    type: 'inbox',
    billingType: 'inbox_usage',
    color: 'blue',
    // No category or slug yet: keep this out of product/app navigation.
    // `inbox_usage` bills in credits ($0.01 each, so 100 credits = $1), like PostHog Desktop and Replay Vision.
    freeAllocationText: 'No monthly free tier – your first month includes 1,000 credits (worth $10)',
    slider: { marks: [1000, 10000, 50000, 100000], min: 0, max: 100000 },
    volume: 1000,
}
