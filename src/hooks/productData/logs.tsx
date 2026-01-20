import { IconTerminal } from '@posthog/icons'

export const logs = {
    name: 'Logs',
    Icon: IconTerminal,
    type: 'logs',
    handle: 'logs',
    slug: 'logs',
    color: 'blue',
    colorSecondary: 'purple',
    // category not set - hidden from navigation/products until full marketing content added
    slider: {
        marks: [50000, 100000, 500000, 1000000, 5000000],
        min: 50000,
        max: 5000000,
    },
    volume: 50000,
}
