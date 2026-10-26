import React from 'react'
import AgentPromptsPage from 'components/PocketGuides/AgentPromptsPage'

const chapterPrompts = [
    {
        title: 'Flags in code',
        prompt: `Teach me PostHog feature flags using one feature in my product. Explain how a flag separates deploy from release, and how PostHog decides who gets it. Help me add a flag check, decide whether to evaluate it on the server or the client, and keep both sides agreeing on who the person is.`,
    },
    {
        title: 'Rollouts and the off switch',
        prompt: `Teach me gradual rollouts in PostHog using a real change in my product. Explain release conditions, percentage rollouts, and how to turn a feature off without a rollback. Help me plan a rollout from my team to everyone, and decide what to watch at each step.`,
    },
    {
        title: 'Experiments and cleanup',
        prompt: `Teach me how a PostHog feature flag becomes an experiment, and how to remove a flag afterward. Explain variants, exposure events, and primary metrics. Help me find a flag in my code that has reached 100% and plan its removal from my code and from PostHog.`,
    },
]

export default function FeatureFlagsAgentTeaching(): JSX.Element {
    return (
        <AgentPromptsPage
            productHandle="feature_flags"
            productName="Feature Flags"
            docsSlug="feature-flags"
            focus="flags, rollouts, payloads, and gaps"
            chapterPrompts={chapterPrompts}
        />
    )
}
