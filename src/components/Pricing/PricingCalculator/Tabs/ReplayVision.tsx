import React, { useEffect, useMemo, useState } from 'react'
import PricingEstimator, { MODELS, estimateReplayVisionPricing } from 'components/ReplayVision/PricingEstimator'

/*
 * Replay Vision's tab in the /pricing calculator. Registered in `productTabs`
 * in Tabbed.tsx (the ProductAnalyticsTab convention): renders the same
 * model-selector estimator as /replay-vision/pricing, but driven by the billing
 * API's credit tiers and synced into the shared calculator state.
 *
 * Denominations: the UI works in observations; shared state (`product.volume`,
 * the tab-list subtotal, the generated calculator URL) stays in credits – the
 * billing unit – so `setVolume` restores and `calculatePrice` agree with us.
 */
export default function ReplayVisionTab({
    activeProduct,
    setProduct,
}: {
    activeProduct: any
    setProduct: (handle: string, data: any) => void
    [key: string]: any
}): JSX.Element | null {
    // The same tier array `setVolume` walks, so the in-tab cost and the shared
    // subtotal cannot disagree. Empty deps: the tab remounts per tab switch
    // (`key={activeProduct.type}` in TabContent).
    const creditTiers = useMemo(() => activeProduct?.billingData?.plans.find((plan: any) => plan.tiers)?.tiers, [])
    const [modelKey, setModelKey] = useState(MODELS[0].key)
    // Seed from the shared credit volume so the estimate survives tab switches
    // (the productData default of 2,500 credits reads as 500 observations on Standard).
    const [observations, setObservations] = useState(() =>
        Math.round((Number(activeProduct.volume) || 0) / MODELS[0].creditsPerObservation)
    )

    const estimate = estimateReplayVisionPricing({ observations, modelKey, creditTiers })

    // Value deps only – `setProduct` is a new function on every `useProducts` render,
    // so listing it would loop the effect.
    useEffect(() => {
        if (!estimate) return
        setProduct('replay_vision', { cost: estimate.cost, volume: estimate.credits, costByTier: estimate.costByTier })
    }, [estimate?.cost, estimate?.credits, estimate?.model.key])

    // Adopt a volume written from outside the tab – Tabbed's mount effect restores
    // `?replay_vision[volume]=N` (credits) via setVolume after this component mounts.
    // Converges: once observations match, the next run sees equal credits and bails.
    useEffect(() => {
        if (!estimate) return
        const external = Number(activeProduct.volume)
        if (Number.isFinite(external) && external > 0 && external !== estimate.credits) {
            setObservations(Math.round(external / estimate.model.creditsPerObservation))
        }
    }, [activeProduct.volume])

    if (!estimate) return null

    return (
        <div className="@container mb-4">
            <div className="bg-accent border border-primary rounded-md px-4 py-3 mb-4 text-sm">
                An observation is a single scanner watching one recording. It costs credits (1 credit = $0.01) based on
                its AI model.
            </div>
            <PricingEstimator
                creditTiers={creditTiers}
                modelKey={modelKey}
                observations={observations}
                onModelKeyChange={setModelKey}
                onObservationsChange={setObservations}
            />
        </div>
    )
}
