const MODELS_URL = 'https://gateway.us.posthog.com/posthog_code/v1/models'
const COMPUTE_URL = 'https://us.posthog.com/api/code/sandbox-pricing/'
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

interface ModelPricing {
    prompt: string
    completion: string
    input_cache_read: string | null
    input_cache_write: string | null
}

interface Model {
    id: string
    display_name: string
    pricing: ModelPricing | null
}

interface ComputeRateCard {
    cpu_core_second_usd: string
    memory_gib_second_usd: string
}

interface ModelsResponse {
    data: Model[]
}

interface ComputeResponse {
    current: ComputeRateCard | null
}

interface PostHogDesktopPricing {
    models: Array<Model & { pricing: ModelPricing }>
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

export const getPostHogDesktopPricing = async (): Promise<PostHogDesktopPricing> => {
    const [models, compute] = await Promise.all([
        fetchJson<ModelsResponse>(MODELS_URL),
        fetchJson<ComputeResponse>(COMPUTE_URL).catch(() => ({ current: null })),
    ])

    return {
        models: models.data.filter(
            (model): model is Model & { pricing: ModelPricing } =>
                model.pricing !== null && !BLOCKED_DESKTOP_MODEL_IDS.has(model.id.toLowerCase())
        ),
        compute: compute.current,
    }
}
