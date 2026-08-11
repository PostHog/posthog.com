import React from 'react'
import useSWR from 'swr'

import OSTable from 'components/OSTable'

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

interface ComputeRateCard {
    cpu_core_second_usd: string
    memory_gib_second_usd: string
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
    '@cf/zai-org/glm-5.2': 'GLM-5.2',
    'moonshotai/kimi-k3': 'Kimi K3',
    'deepseek-ai/deepseek-v4-flash-0731': 'DeepSeek V4 Flash',
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
    return response.json() as Promise<PricingResponse>
}

export const PostHogDesktopPricing = (): React.ReactElement => {
    const { data: pricing, error } = useSWR<PricingResponse>('/api/posthog-desktop-pricing', fetchPricing)

    if (error) {
        return <p>Pricing is currently unavailable. Refresh the page to try again.</p>
    }

    if (!pricing) {
        return <p>Loading current pricing...</p>
    }

    const rows = pricing.models.map((model) => ({
        key: model.id,
        cells: [
            { content: MODEL_DISPLAY_NAMES[model.id] ?? model.display_name },
            ...TOKEN_COLUMNS.map(({ rate }) => ({ content: creditsPerMillionTokens(model.pricing[rate]) })),
        ],
    }))

    if (rows.length === 0) {
        return <p>Pricing is currently unavailable. Refresh the page to try again.</p>
    }

    return (
        <>
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
