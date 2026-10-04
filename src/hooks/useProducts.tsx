import React from 'react'
import { calculatePrice } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import billingProductsJson from '@data/products-billing.json'
import type { BillingProducts } from '~/data-layer/queries/products'
import { useMemo, useState } from 'react'

// Import individual product data
import { productAnalytics } from './productData/product_analytics'
import { sessionReplay } from './productData/session_replay'
import { featureFlags } from './productData/feature_flags'
import { surveys } from './productData/surveys'
import { dataWarehouse } from './productData/data_warehouse'
import { errorTracking } from './productData/error_tracking'
import { cdp } from './productData/cdp'
import { webAnalytics } from './productData/web_analytics'
import { experiments } from './productData/experiments'
import { posthog_ai } from './productData/posthog_ai'
import { aiObservability } from './productData/ai_observability'
import { aiEvals } from './productData/ai_evals'
import { workflows } from './productData/workflows'
import { logs } from './productData/logs'
import { realtimeDestinations } from './productData/realtime_destinations'
import { endpoints } from './productData/endpoints'
import { inbox } from './productData/inbox'
import { posthogDesktop } from './productData/posthog_desktop'
import { replayVision } from './productData/replay_vision'

const initialProducts = [
    productAnalytics,
    sessionReplay,
    featureFlags,
    surveys,
    dataWarehouse,
    realtimeDestinations,
    errorTracking,
    cdp,
    webAnalytics,
    experiments,
    posthog_ai,
    aiObservability,
    aiEvals,
    logs,
    workflows,
    inbox,
    posthogDesktop,
    endpoints,
    replayVision,
]

export default function useProducts() {
    const billingProducts = billingProductsJson as BillingProducts

    const baseProducts = useMemo(
        () =>
            initialProducts.map((product) => {
                const billingData =
                    product.billingData ||
                    billingProducts.find(
                        (billingProduct: any) =>
                            billingProduct.type === ((product as any).billingType || product.handle)
                    )
                const paidPlan = billingData?.plans.find((plan: any) => plan.tiers)
                const startsAt = paidPlan?.tiers?.find((tier: any) => tier.unit_amount_usd !== '0')?.unit_amount_usd
                const freeLimit = paidPlan?.tiers?.find((tier: any) => tier.unit_amount_usd === '0')?.up_to
                const unit = billingData?.unit
                return {
                    ...product,
                    cost: 0,
                    billingData,
                    costByTier: paidPlan?.tiers
                        ? calculatePrice((product as any).volume || 0, paidPlan.tiers).costByTier
                        : [],
                    freeLimit,
                    startsAt: startsAt && startsAt.length <= 3 ? Number(startsAt).toFixed(2) : startsAt,
                    unit,
                }
            }),
        [billingProducts]
    )

    const [overrides, setOverrides] = useState<Record<string, Record<string, any>>>({})

    const products = useMemo(
        () => baseProducts.map((product) => ({ ...product, ...(overrides[product.handle] || {}) })),
        [baseProducts, overrides]
    )

    const monthlyTotal = useMemo(() => products.reduce((acc, product) => acc + (product.cost || 0), 0), [products])

    const setProduct = (handle: string, data: any) => {
        const target = baseProducts.find((product) => product.handle === handle)
        if (!target || (target as any).billedWith) return
        setOverrides((prev) => ({ ...prev, [handle]: { ...(prev[handle] || {}), ...data } }))
    }

    const setVolume = (handle: string, volume: number) => {
        const rounded = Math.round(volume)
        const product = baseProducts.find((product) => product.handle === handle)
        const { total, costByTier } = calculatePrice(
            rounded,
            product?.billingData?.plans.find((plan: any) => plan.tiers)?.tiers
        )
        setProduct(handle, {
            volume: rounded,
            cost: total,
            costByTier,
        })
    }

    return { products, setVolume, setProduct, monthlyTotal }
}
