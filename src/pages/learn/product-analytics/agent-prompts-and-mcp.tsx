import React from 'react'
import AgentPromptsPage from 'components/PocketGuides/AgentPromptsPage'

const chapterPrompts = [
    {
        title: 'Events and properties',
        prompt: `Teach me PostHog events and properties using one interaction in my product. Explain autocapture, custom events, and useful properties. Help me design an event, predict its payload, and compare event counts with unique people.`,
    },
    {
        title: 'Identity and sessions',
        prompt: `Teach me PostHog identity and sessions using my product’s sign-in journey. Explain distinct_id, session IDs, identify, and reset. Help me trace anonymous and signed-in activity, including browser and server events, and spot an identity gap.`,
    },
    {
        title: 'Trends and funnels',
        prompt: `Teach me PostHog trends and funnels using a real feature and user journey in my product. Compare event counts with unique people, define a funnel and conversion window, and investigate a drop-off. Distinguish attempted actions from successful outcomes.`,
    },
]

export default function ProductAnalyticsAgentTeaching(): JSX.Element {
    return (
        <AgentPromptsPage
            productHandle="product_analytics"
            productName="Product Analytics"
            docsSlug="product-analytics"
            focus="events, properties, funnels, and gaps"
            chapterPrompts={chapterPrompts}
        />
    )
}
