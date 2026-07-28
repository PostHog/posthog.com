import { IconLlmPromptEvaluation } from '@posthog/icons'

export const replayVision = {
    name: 'Replay Vision',
    Icon: IconLlmPromptEvaluation,
    description: 'AI-powered session replay analysis that watches recordings for you',
    handle: 'replay_vision',
    type: 'replay_vision',
    color: 'yellow',
    colorSecondary: 'yellow',
    category: 'product_engineering',
    slug: 'replay-vision',
    slider: {
        // Values in credits. min doubles as the "first N credits free" copy, so it tracks the free allocation.
        marks: [2500, 10000, 50000, 100000],
        min: 2500,
        max: 100000,
    },
    volume: 2500,
}
