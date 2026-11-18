const MODELS_URL = 'https://gateway.us.posthog.com/posthog_code/v1/models'
const COMPUTE_URL = 'https://us.posthog.com/api/code/sandbox-pricing/'
const PRICING_CACHE_CONTROL = 's-maxage=3600, stale-while-revalidate=86400'
const BLOCKED_DESKTOP_MODEL_IDS = new Set([
    'gpt-5-mini',
    'openai/gpt-5-mini',
    'gpt-5.2',
    'openai/gpt-5.2',
    'gpt-5.3',
    'openai/gpt-5.3',
    'gpt-5.3-codex',
    'openai/gpt-5.3-codex',
    'claude-opus-4-5',
    'anthropic/claude-opus-4-5',
    'claude-opus-4-6',
    'anthropic/claude-opus-4-6',
    'claude-sonnet-4-5',
    'anthropic/claude-sonnet-4-5',
    'claude-haiku-4-5',
    'anthropic/claude-haiku-4-5',
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
            .filter((model) => model.pricing !== null && !BLOCKED_DESKTOP_MODEL_IDS.has(model.id.toLowerCase()))
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
