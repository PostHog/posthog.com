import { IconNotification } from '@posthog/icons'
import { getTool } from '../../data/tools'
import { PRODUCT_COLORS } from 'constants/productColors'
import hedgehogGreekPng from 'hoggies/greek.png'

export const inbox = {
    ...getTool('inbox'),
    hog: {
        src: hedgehogGreekPng,
        alt: 'A hedgehog reading a very long scroll',
        classes: 'absolute bottom-0 right-0 max-w-md',
        footerClasses: 'max-w-[240px]',
    },
    Icon: IconNotification,
    type: 'inbox',
    billingType: 'inbox_usage',
    color: PRODUCT_COLORS.inbox,
    // No category or slug yet: keep this out of product/app navigation.
    // `inbox_usage` bills in credits ($0.01 each, so 100 credits = $1), like PostHog Desktop and Replay Vision.
    freeAllocationText: 'No monthly free tier – your first month includes 1,000 credits (worth $10)',
    slider: { marks: [1000, 10000, 50000, 100000], min: 0, max: 100000 },
    volume: 1000,
}
