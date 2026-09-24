import { IconListCheck } from '@posthog/icons'

// Evaluations share AI Observability's product page and are billed as AI Observability events
// (same free tier, same rate). Listed here so the pricing table and calculator show them as
// "Billed with AI Observability", the same way Experiments points at Feature Flags.
// Name and icon match the app's product tree (`llm_evaluations`).
export const aiEvals = {
    name: 'Evaluations',
    Icon: IconListCheck,
    description: 'Run LLM-as-a-judge evaluations to catch regressions.',
    handle: 'llm_evals',
    type: 'llm_evals',
    color: 'lilac',
    colorSecondary: 'lilac',
    category: 'ai',
    slug: 'ai-observability',
    status: 'beta',
    // The billing service exposes AI Observability as `llm_analytics`.
    billingType: 'llm_analytics',
    // Keeps it sorted next to AI Observability in the pricing calculator.
    sharesFreeTier: 'ai_observability',
    billedWith: 'AI Observability',
    billedWithSlug: 'ai-observability',
}
