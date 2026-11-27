const MODELS_URL = 'https://ai-gateway.us.posthog.com/v1/models'
const COMPUTE_URL = 'https://us.posthog.com/api/code/sandbox-pricing/'
const PRICING_CACHE_CONTROL = 's-maxage=3600, stale-while-revalidate=86400'
const DESKTOP_MODEL_IDS = new Set([
    'claude-fable-5-2',
    'claude-fable-5-1',
    'claude-fable-5',
    'claude-opus-5-5',
    'claude-opus-5',
    'claude-opus-4-8',
    'claude-sonnet-5-5',
    'claude-sonnet-5',
    'claude-haiku-5-5',
    'gpt-6.2-sol',
    'gpt-6.2-astra',
    'gpt-6.1-sol',
    'gpt-6-sol',
    'gpt-6-astra',
    'gpt-6-luna',
    'gpt-5.6-sol',
    'gpt-5.6-terra',
    'gpt-5.6-luna',
    'gpt-5.5',
    'gpt-5',
    'zai-org/glm-5.3',
    'zai-org/glm-5.3-flash',
    'moonshotai/kimi-k3.1-pro',
    'deepseek-ai/deepseek-v4.1-flash-1017',
    'deepseek-ai/deepseek-v4.1-flash-1017-fast',
])
const MODEL_FAMILY_ORDER = ['fable', 'opus', 'sonnet', 'haiku']

const fetchJson = async (url) => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`${url} returned ${response.status}`)
    }
    return response.json()
}

const getModelRecency = (modelId) => {
    const match = modelId.toLowerCase().match(/-(\d+)(?:[-.](\d+))?/)
    if (!match) {
        return Number.MAX_SAFE_INTEGER
    }
    return Number(match[1]) * 1000 + Number(match[2] ?? 0)
}

const getModelFamilyRank = (modelId) => {
    const rank = MODEL_FAMILY_ORDER.findIndex((family) => modelId.toLowerCase().includes(family))
    return rank === -1 ? MODEL_FAMILY_ORDER.length : rank
}

const compareModelsForPicker = (first, second) => {
    const familyDifference = getModelFamilyRank(first.id) - getModelFamilyRank(second.id)
    return familyDifference || getModelRecency(second.id) - getModelRecency(first.id)
}

const getPostHogDesktopPricing = async () => {
    const [models, compute] = await Promise.all([
        fetchJson(MODELS_URL),
        fetchJson(COMPUTE_URL).catch(() => ({ current: null })),
    ])

    return {
        models: models.data
            .filter((model) => model.pricing && DESKTOP_MODEL_IDS.has(model.id))
            .map((model) => ({
                id: model.id,
                display_name: model.name ?? model.id,
                pricing: {
                    prompt: model.pricing.prompt,
                    completion: model.pricing.completion,
                    input_cache_read: model.pricing.cache_read ?? null,
                    input_cache_write: model.pricing.cache_write ?? null,
                },
            }))
            .sort(compareModelsForPicker),
        compute: compute.current,
    }
}

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        res.setHeader('Cache-Control', PRICING_CACHE_CONTROL)
        return res.status(200).json(await getPostHogDesktopPricing())
    } catch (error) {
        console.error('Error fetching PostHog Desktop pricing:', error)
        return res.status(502).json({ error: 'Failed to fetch PostHog Desktop pricing' })
    }
}

module.exports = handler
