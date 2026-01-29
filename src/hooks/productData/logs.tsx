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
        // Values in GB (display_friendly=true converts MB to GB)
        marks: [50, 100, 500, 1000, 5000],
        min: 50,
        max: 5000,
    },
    volume: 50,
}
