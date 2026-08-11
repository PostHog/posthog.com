import React, { useEffect, useState } from 'react'

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
    pricing: ModelPricing | null
}

interface ComputeRateCard {
    cpu_core_second_usd: string
    memory_gib_second_usd: string
}

interface PricingResponse {
    models: Model[]
    compute: {
        current: ComputeRateCard | null
    }
}

const creditsPerMillionTokens = (rate: string | null): string => {
    if (rate === null) {
        return 'Not available'
    }

    return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(Number(rate) * 100_000_000)} credits`
}

const usdRate = (rate: string): string => `$${rate}`

export const PostHogDesktopPricing = (): JSX.Element => {
    const [pricing, setPricing] = useState<PricingResponse | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        const controller = new AbortController()

        fetch('/api/posthog-desktop-pricing', { signal: controller.signal })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Pricing request returned ${response.status}`)
                }
                return response.json() as Promise<PricingResponse>
            })
            .then(setPricing)
            .catch((requestError: unknown) => {
                if (requestError instanceof DOMException && requestError.name === 'AbortError') {
                    return
                }
                setError(true)
            })

        return () => controller.abort()
    }, [])

    if (error) {
        return <p>Pricing is currently unavailable. Refresh the page to try again.</p>
    }

    if (pricing === null) {
        return <p>Loading current pricing...</p>
    }

    const rows = pricing.models
        .filter((model) => model.pricing !== null)
        .map((model) => ({
            key: model.id,
            cells: [
                { content: model.display_name },
                { content: creditsPerMillionTokens(model.pricing?.prompt ?? null) },
                { content: creditsPerMillionTokens(model.pricing?.input_cache_read ?? null) },
                { content: creditsPerMillionTokens(model.pricing?.input_cache_write ?? null) },
                { content: creditsPerMillionTokens(model.pricing?.completion ?? null) },
            ],
        }))

    if (rows.length === 0) {
        return <p>Pricing is currently unavailable. Refresh the page to try again.</p>
    }

    return (
        <>
            <OSTable
                columns={[
                    { name: 'Model' },
                    { name: 'Input' },
                    { name: 'Cached input' },
                    { name: 'Cache write' },
                    { name: 'Output' },
                ]}
                rows={rows}
                width="full"
            />
            {pricing.compute.current && (
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
                                    { content: usdRate(pricing.compute.current.cpu_core_second_usd) },
                                ],
                            },
                            {
                                key: 'memory',
                                cells: [
                                    { content: 'GiB-second of memory' },
                                    { content: usdRate(pricing.compute.current.memory_gib_second_usd) },
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
