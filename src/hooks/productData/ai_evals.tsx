import { IconTarget } from '@posthog/icons'

// AI Evals shares AI Observability's product page and is billed as AI Observability events
// (same free tier, same rate). Listed here so the pricing table and calculator show it as
// "Billed with AI Observability", the same way Experiments points at Feature Flags.
export const aiEvals = {
    name: 'AI Evals',
    Icon: IconTarget,
    description: 'Run LLM-as-a-judge evaluations to catch regressions.',
    handle: 'llm_evals',
    type: 'llm_evals',
    color: 'blue',
    colorSecondary: 'blue',
    category: 'ai',
    slug: 'ai-observability',
    status: 'beta',
    // The billing service exposes AI Observability as `llm_analytics`.
    billingType: 'llm_analytics',
    billedWith: 'AI Observability',
    billedWithSlug: 'ai-observability',
}
