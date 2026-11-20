import { IconLaptop } from '@posthog/icons'
import { getTool } from '../../data/tools'
import { PRODUCT_COLORS } from 'constants/productColors'
import hedgehogNeuralPng from 'brand-hoggie-pngs/neural.png'

export const posthogDesktop = {
    ...getTool('posthog_code'),
    hog: {
        src: hedgehogNeuralPng,
        alt: 'A hedgehog at a wall of live data screens',
        classes: 'absolute bottom-0 right-0 max-w-md',
        footerClasses: 'max-w-[240px]',
    },
    Icon: IconLaptop,
    type: 'posthog_code',
    billingType: 'posthog_code_usage',
    color: PRODUCT_COLORS.posthog_code,
    colorDark: 'brown-dark',
    pricingBadge: 'Beta',
    slider: { marks: [2000, 10000, 50000, 200000], min: 2000, max: 200000 },
    volume: 2000,
}
