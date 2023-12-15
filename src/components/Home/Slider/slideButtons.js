import {
    IconDatabase,
    IconDecisionTree,
    IconFlask,
    IconGraph,
    IconMessage,
    IconPieChart,
    IconRewindPlay,
    IconServer,
    IconTerminal,
    IconToggle,
} from '@posthog/icons'

export const slideButtons = [
    {
        title: 'Product analytics',
        Icon: IconGraph,
        color: 'blue',
    },
    {
        title: 'Web analytics',
        Icon: IconPieChart,
        color: 'aqua',
        label: 'Alpha',
    },
    {
        title: 'Session replay',
        Icon: IconRewindPlay,
        color: 'yellow',
    },
    {
        title: 'Feature flags',
        Icon: IconToggle,
        color: 'teal',
    },
    {
        title: 'A/B testing',
        Icon: IconFlask,
        color: 'purple',
    },
    {
        title: 'Surveys',
        Icon: IconMessage,
        color: 'salmon',
    },
    {
        title: 'Data pipeline',
        Icon: IconDecisionTree,
        color: 'yellow',
        label: 'Beta',
    },
    {
        title: 'Data warehouse',
        Icon: IconServer,
        color: 'seagreen',
        label: 'Beta',
    },
]
