import React, { useEffect, useMemo, useState } from 'react'
import PricingEstimator, {
    MODELS,
    MAX_OBSERVATIONS,
    estimateReplayVisionPricing,
} from 'components/ReplayVision/PricingEstimator'

/*
 * Replay Vision's tab in the /pricing calculator. Registered in `productTabs`
 * in Tabbed.tsx (the ProductAnalyticsTab convention): renders the same
 * model-selector estimator as /replay-vision/pricing, but driven by the billing
 * API's credit tiers and synced into the shared calculator state.
 *
 * The product override retains the model and observations for sharing and tab switches.
 * Volume remains the derived credit amount used for billing.
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
    const [modelKey, setModelKey] = useState(activeProduct.model ?? MODELS[0].key)
    // Restore saved inputs, or derive the initial observations from the product's default credits.
    const [observations, setObservations] = useState(
        () =>
            activeProduct.observations ??
            Math.round((Number(activeProduct.volume) || 0) / MODELS[0].creditsPerObservation)
    )

    const estimate = estimateReplayVisionPricing({ observations, modelKey, creditTiers })

    // Value deps only – `setProduct` is a new function on every `useProducts` render,
    // so listing it would loop the effect.
    useEffect(() => {
        if (!estimate) return
        setProduct('replay_vision', {
            cost: estimate.cost,
            volume: estimate.credits,
            costByTier: estimate.costByTier,
            model: modelKey,
            observations,
        })
    }, [estimate?.cost, estimate?.credits, estimate?.model.key])

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
                onObservationsChange={(value) => setObservations(Math.min(value, MAX_OBSERVATIONS))}
            />
        </div>
    )
}
