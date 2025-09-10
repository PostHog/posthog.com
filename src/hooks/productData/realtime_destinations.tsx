import React from 'react'
import {
    IconBell,
    IconClockRewind,
    IconDashboard,
    IconGraph,
    IconHandMoney,
    IconLightBulb,
    IconListTreeConnected,
    IconLlmAnalytics,
    IconPiggyBank,
    IconRewindPlay,
    IconShield,
    IconSparkles,
    IconTarget,
    IconTrends,
    IconUser,
    IconWarning,
    IconGlobe,
    IconListCheck,
    IconDecisionTree,
} from '@posthog/icons'
import {
    IconAnthropic,
    IconGemini,
    IconGrid,
    IconHelicone,
    IconKeywordsAI,
    IconLangChain,
    IconLangfuse,
    IconOpenAI,
    IconOpenRouter,
    IconTag,
    IconTraceloop,
    IconVercel,
} from 'components/OSIcons'

export const realtimeDestinations = {
    name: 'Realtime destinations',
    Icon: IconDecisionTree,
    // description: 'Send data to tools such as Slack, Zapier, or Customer.io to receive notifications, trigger automations, send emails, and more.',
    type: 'realtime_destinations',
    handle: 'realtime_destinations',
    slug: 'realtime-destinations',
    color: 'seagreen',
    colorSecondary: 'green-2',
    // category: 'data', // Not set on purpose - this ensures it's hidden from navigation and products
    slider: {
        marks: [10000, 50000, 250000, 1000000, 10000000],
        min: 10000,
        max: 10000000,
    },
    volume: 10000,
    addonSliders: [
        {
            key: 'batch_exports',
            label: 'Batch exports',
            sliderConfig: {
                marks: [1000000, 5000000, 25000000, 100000000],
                min: 1000000,
                max: 100000000,
            },
            volume: 1000000,
            freeAllocation: 1000000,
            unit: 'row',
        },
    ],
}
