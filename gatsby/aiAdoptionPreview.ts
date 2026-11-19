// Illustrative model variants and trends for the design preview.
const families = [
    'claude',
    'gemini',
    'gpt',
    'grok',
    'deepseek',
    'mistral',
    'llama',
    'qwen',
    'command',
    'kimi',
    'glm',
    'minimax',
    'nova',
]
const variants = ['core', 'mini', 'instruct', 'preview', 'lite', 'reasoning', 'long-context', 'experimental-preview']
const labs = [
    'google',
    'anthropic',
    'openai',
    'mistral',
    'xai',
    'meta',
    'amazon',
    'deepseek',
    'perplexity',
    'qwen',
    'kimi',
    'nvidia',
    'cohere',
    'minimax',
    'zai',
    'xiaomi',
    'bytedance',
    'elevenlabs',
    'liquid',
    'baai',
    'voyage',
    'inception',
    'stepfun',
    'other',
]
const frameworks = [
    'langchain',
    'vercel',
    'claude-code',
    'openai-agents',
    'openclaw',
    'pi',
    'claude-agent-sdk',
    'Other reported integrations',
]
const months = Array.from({ length: 10 }, (_, index) => `2025-${String(index + 1).padStart(2, '0')}-01`)

export function aiAdoptionPreviewRows() {
    const series = (facet: string, label: string, share: (month: number) => number | null) => ({
        facet,
        label,
        points: months.map((month, index) => [month, share(index)]),
    })

    // Stagger the waves so the leaders trade places and long-tail rows have smaller shares.
    const rankings = (facet: string, labels: string[], peak: number) =>
        labels.map((label, rank) =>
            series(facet, label, (month) => {
                if (rank === labels.length - 1 && month < 3) return null
                const trend = 0.77 + 0.23 * Math.sin(month * 0.7 + rank * 1.9)
                return Number(((peak * trend) / (1 + rank * 0.17) ** 1.35).toFixed(2))
            })
        )

    const models = variants.flatMap((variant) => families.map((family) => `${family}-${variant}`))
    return [
        ...rankings('model', models, 48),
        series('model', 'Other models', (m) => 37 + m),
        ...rankings('lab', labs, 82),
        ...rankings('framework', frameworks, 75),
        series('provider_diversity', '1 provider', (m) => 62 - 2 * m),
        series('provider_diversity', '2 providers', (m) => 24 + m),
        series('provider_diversity', '3+ providers', (m) => 14 + m),
        series('provider_diversity', 'Not reported', (m) => 10 - m / 2),
        series('coverage', 'Provider reported', (m) => 90 + m / 2),
        series('coverage', 'Framework reported', (m) => 34 + 2 * m),
        series('coverage', 'Model reported', (m) => 96 + m / 4),
    ]
}
