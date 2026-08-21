import React from 'react'
import useSWR from 'swr'

import OSTable from 'components/OSTable'
import { ComputeRateCard, PUBLISHED_COMPUTE_RATE_CARD, PUBLISHED_RATES_DATE } from 'lib/posthogDesktopCompute'

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

interface PricingResponse {
    models: Model[]
    compute: ComputeRateCard | null
}

const TOKEN_COLUMNS = [
    { name: 'Input', rate: 'prompt' },
    { name: 'Cached input', rate: 'input_cache_read' },
    { name: 'Cache write', rate: 'input_cache_write' },
    { name: 'Output', rate: 'completion' },
] as const

const CREDIT_FORMAT = new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 })
const MODEL_DISPLAY_NAMES: Record<string, string> = {
    'claude-sonnet-5': 'Claude Sonnet 5',
    'claude-sonnet-4-6': 'Claude Sonnet 4.6',
    'claude-opus-4-7': 'Claude Opus 4.7',
    'claude-fable-5': 'Claude Fable 5',
    'claude-opus-5': 'Claude Opus 5',
    'claude-opus-4-8': 'Claude Opus 4.8',
    'gpt-5.6-sol': 'GPT-5.6 Sol',
    'gpt-5.6-terra': 'GPT-5.6 Terra',
    'gpt-5.6-luna': 'GPT-5.6 Luna',
    'gpt-5.5': 'GPT-5.5',
    'gpt-5.4': 'GPT-5.4',
    'zai-org/glm-5.3': 'GLM-5.3',
    '@cf/zai-org/glm-5.2': 'GLM-5.2',
    'moonshotai/kimi-k3': 'Kimi K3',
    'deepseek-ai/deepseek-v4-flash-0731': 'DeepSeek V4 Flash',
}

const FALLBACK_PRICING: PricingResponse = {
    models: [
        {
            id: 'claude-fable-5',
            display_name: 'claude-fable-5',
            pricing: {
                prompt: '0.00001',
                completion: '0.00005',
                input_cache_read: '0.000001',
                input_cache_write: '0.0000125',
            },
        },
        {
            id: 'claude-opus-5',
            display_name: 'claude-opus-5',
            pricing: {
                prompt: '0.000005',
                completion: '0.000025',
                input_cache_read: '0.0000005',
                input_cache_write: '0.00000625',
            },
        },
        {
            id: 'claude-opus-4-8',
            display_name: 'claude-opus-4-8',
            pricing: {
                prompt: '0.000005',
                completion: '0.000025',
                input_cache_read: '0.0000005',
                input_cache_write: '0.00000625',
            },
        },
        {
            id: 'claude-opus-4-7',
            display_name: 'claude-opus-4-7',
            pricing: {
                prompt: '0.000005',
                completion: '0.000025',
                input_cache_read: '0.0000005',
                input_cache_write: '0.00000625',
            },
        },
        {
            id: 'claude-sonnet-5',
            display_name: 'claude-sonnet-5',
            pricing: {
                prompt: '0.000002',
                completion: '0.00001',
                input_cache_read: '0.0000002',
                input_cache_write: '0.0000025',
            },
        },
        {
            id: 'claude-sonnet-4-6',
            display_name: 'claude-sonnet-4-6',
            pricing: {
                prompt: '0.000003',
                completion: '0.000015',
                input_cache_read: '0.0000003',
                input_cache_write: '0.00000375',
            },
        },
        {
            id: 'moonshotai/kimi-k3',
            display_name: 'moonshotai/kimi-k3',
            pricing: {
                prompt: '0.000003',
                completion: '0.000015',
                input_cache_read: '0.0000003',
                input_cache_write: '0.000003',
            },
        },
        {
            id: 'deepseek-ai/deepseek-v4-flash-0731',
            display_name: 'deepseek-ai/deepseek-v4-flash-0731',
            pricing: {
                prompt: '0.00000013',
                completion: '0.00000026',
                input_cache_read: '0.000000028',
                input_cache_write: '0.00000013',
            },
        },
        {
            id: 'gpt-5.6-sol',
            display_name: 'gpt-5.6-sol',
            pricing: {
                prompt: '0.000005',
                completion: '0.00003',
                input_cache_read: '0.0000005',
                input_cache_write: '0.00000625',
            },
        },
        {
            id: 'gpt-5.6-terra',
            display_name: 'gpt-5.6-terra',
            pricing: {
                prompt: '0.000002',
                completion: '0.000012',
                input_cache_read: '0.0000002',
                input_cache_write: '0.0000025',
            },
        },
        {
            id: 'gpt-5.6-luna',
            display_name: 'gpt-5.6-luna',
            pricing: {
                prompt: '0.0000002',
                completion: '0.0000012',
                input_cache_read: '0.00000002',
                input_cache_write: '0.00000025',
            },
        },
        {
            id: 'gpt-5.5',
            display_name: 'gpt-5.5',
            pricing: {
                prompt: '0.000005',
                completion: '0.00003',
                input_cache_read: '0.0000005',
                input_cache_write: '0.000005',
            },
        },
        {
            id: 'gpt-5.4',
            display_name: 'gpt-5.4',
            pricing: {
                prompt: '0.0000025',
                completion: '0.000015',
                input_cache_read: '0.00000025',
                input_cache_write: '0.0000025',
            },
        },
        {
            id: 'zai-org/glm-5.3',
            display_name: 'zai-org/glm-5.3',
            pricing: {
                prompt: '0.0000014',
                completion: '0.0000044',
                input_cache_read: '0.00000014',
                input_cache_write: '0.0000014',
            },
        },
        {
            id: '@cf/zai-org/glm-5.2',
            display_name: '@cf/zai-org/glm-5.2',
            pricing: {
                prompt: '0.0000014',
                completion: '0.0000044',
                input_cache_read: null,
                input_cache_write: null,
            },
        },
    ],
    // Shared with the Desktop tab in the /pricing calculator, which quotes the same card as an
    // hourly rate — see `lib/posthogDesktopCompute`.
    compute: PUBLISHED_COMPUTE_RATE_CARD,
}

const creditsPerMillionTokens = (rate: string | null): string => {
    if (rate === null) {
        return 'Not available'
    }

    return `${CREDIT_FORMAT.format(Number(rate) * 100_000_000)} credits`
}

const fetchPricing = async (url: string): Promise<PricingResponse> => {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Pricing request returned ${response.status}`)
    }
    const pricing = (await response.json()) as PricingResponse
    if (!Array.isArray(pricing.models) || pricing.models.length === 0) {
        throw new Error('Pricing response contains no models')
    }
    return pricing
}

export const PostHogDesktopPricing = (): React.ReactElement => {
    const { data, error } = useSWR<PricingResponse>('/api/posthog-desktop-pricing', fetchPricing)

    if (!data && !error) {
        return <p>Loading current pricing...</p>
    }

    const pricing = data?.models.length ? data : FALLBACK_PRICING
    const isFallback = pricing === FALLBACK_PRICING
    const rows = pricing.models.map((model) => ({
        key: model.id,
        cells: [
            { content: MODEL_DISPLAY_NAMES[model.id] ?? model.display_name },
            ...TOKEN_COLUMNS.map(({ rate }) => ({ content: creditsPerMillionTokens(model.pricing[rate]) })),
        ],
    }))

    return (
        <>
            {isFallback && (
                <p>Live pricing is temporarily unavailable. Showing rates published {PUBLISHED_RATES_DATE}.</p>
            )}
            <OSTable columns={[{ name: 'Model' }, ...TOKEN_COLUMNS]} rows={rows} width="full" />
            {pricing.compute && (
                <>
                    <h2>Cloud compute pricing</h2>
                    <p>Cloud tasks also consume credits for the CPU and memory used while your task is running.</p>
                    <OSTable
                        columns={[{ name: 'Resource' }, { name: 'Price' }]}
                        rows={[
                            {
                                key: 'cpu',
                                cells: [
                                    { content: 'CPU core-second' },
                                    { content: `$${pricing.compute.cpu_core_second_usd}` },
                                ],
                            },
                            {
                                key: 'memory',
                                cells: [
                                    { content: 'GiB-second of memory' },
                                    { content: `$${pricing.compute.memory_gib_second_usd}` },
                                ],
                            },
                        ]}
                        width="full"
                    />
                </>
            )}
        </>
    )
}
