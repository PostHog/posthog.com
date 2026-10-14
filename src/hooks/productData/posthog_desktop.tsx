import { IconLaptop } from '@posthog/icons'
import { getTool } from '../../data/tools'

export const posthogDesktop = {
    ...getTool('posthog_code'),
    Icon: IconLaptop,
    type: 'posthog_code',
    billingType: 'posthog_code_usage',
    color: 'brown',
    colorDark: 'brown-dark',
    pricingBadge: 'Beta',
    slider: { marks: [2000, 10000, 50000, 200000], min: 2000, max: 200000 },
    volume: 2000,
}
