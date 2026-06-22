import { IconSparkles } from '@posthog/icons'

export const selfDriving = {
    name: 'Self-Driving',
    Icon: IconSparkles,
    handle: 'self_driving',
    type: 'self_driving',
    color: 'blue',
    // No category or slug yet: keep this visible on pricing surfaces, not product/app navigation.
    slider: {
        marks: [4500, 15000, 75000, 150000],
        min: 4500,
        max: 150000,
    },
    volume: 4500,
}
