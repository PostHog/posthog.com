const MODELS_URL = 'https://ai-gateway.us.posthog.com/v1/models'
const COMPUTE_URL = 'https://us.posthog.com/api/code/sandbox-pricing/'
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

interface ModelPricing {
    prompt: string
    completion: string
    input_cache_read: string | null
    input_cache_write: string | null
}

interface Model {
    id: string
    display_name: string
    pricing: ModelPricing
}

interface GatewayModelPricing {
    prompt: string
    completion: string
    cache_read?: string | null
    cache_write?: string | null
}

interface GatewayModel {
    id: string
    name: string | null
    pricing: GatewayModelPricing | null
}

interface ComputeRateCard {
    cpu_core_second_usd: string
    memory_gib_second_usd: string
}

interface ModelsResponse {
    data: GatewayModel[]
}

interface ComputeResponse {
    current: ComputeRateCard | null
}

interface PostHogDesktopPricing {
    models: Model[]
    compute: ComputeRateCard | null
}

export const PRICING_CACHE_CONTROL = 's-maxage=3600, stale-while-revalidate=86400'

const fetchJson = async <T>(url: string): Promise<T> => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`${url} returned ${response.status}`)
    }
    return response.json() as Promise<T>
}

const getModelRecency = (modelId: string): number => {
    const match = modelId.toLowerCase().match(/-(\d+)(?:[-.](\d+))?/)
    if (!match) {
        return Number.MAX_SAFE_INTEGER
    }
    return Number(match[1]) * 1000 + Number(match[2] ?? 0)
}

const getModelFamilyRank = (modelId: string): number => {
    const rank = MODEL_FAMILY_ORDER.findIndex((family) => modelId.toLowerCase().includes(family))
    return rank === -1 ? MODEL_FAMILY_ORDER.length : rank
}

const compareModelsForPicker = (first: Model, second: Model): number => {
    const familyDifference = getModelFamilyRank(first.id) - getModelFamilyRank(second.id)
    return familyDifference || getModelRecency(second.id) - getModelRecency(first.id)
}

export const getPostHogDesktopPricing = async (): Promise<PostHogDesktopPricing> => {
    const [models, compute] = await Promise.all([
        fetchJson<ModelsResponse>(MODELS_URL),
        fetchJson<ComputeResponse>(COMPUTE_URL).catch(() => ({ current: null })),
    ])

    return {
        models: models.data
            .filter(
                (model): model is GatewayModel & { pricing: GatewayModelPricing } =>
                    !!model.pricing && DESKTOP_MODEL_IDS.has(model.id)
            )
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
