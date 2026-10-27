import React from 'react'
import AgentPromptsPage from 'components/PocketGuides/AgentPromptsPage'

const chapterPrompts = [
    {
        title: 'Traces and generations',
        prompt: `Teach me PostHog AI Observability using one LLM feature in my product. Explain traces, spans, and generations, and what PostHog captures on each call. Help me find where my code calls a model, predict what a generation records, and read a real trace.`,
    },
    {
        title: 'Evals',
        prompt: `Teach me PostHog evaluations using an LLM feature in my product. Explain why an error rate can’t tell me whether an answer is good, and compare LLM-as-a-judge and code-based evals. Help me write one eval for a real failure mode and read its pass rate.`,
    },
    {
        title: 'AI cost',
        prompt: `Teach me how PostHog attributes AI cost using my product’s LLM calls. Explain how cost comes from tokens and the model, and which properties tie a generation to a person, a customer, and a feature. Help me find a call that’s missing those properties and break my cost down by feature.`,
    },
]

export default function AiObservabilityAgentTeaching(): JSX.Element {
    return (
        <AgentPromptsPage
            productHandle="ai_observability"
            productName="AI Observability"
            docsSlug="ai-observability"
            focus="LLM calls, traces, costs, and gaps"
            chapterPrompts={chapterPrompts}
        />
    )
}
