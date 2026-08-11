const MODELS_URL = 'https://gateway.us.posthog.com/posthog_code/v1/models'
const COMPUTE_URL = 'https://us.posthog.com/api/code/sandbox-pricing/'

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
        models: models.data.filter((model): model is Model & { pricing: ModelPricing } => model.pricing !== null),
        compute: compute.current,
    }
}
