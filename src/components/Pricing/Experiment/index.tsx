import React from 'react'
import { RenderInClient } from 'components/shared/layout/RenderInClient'
import usePostHog from 'hooks/usePostHog'
import { DEFAULT_PRICING_VARIANT, resolvePricingVariant } from './variants'

export const PRICING_PAGE_FLAG = 'pricing-page-redesign'

function VariantSlot(): JSX.Element {
    const posthog = usePostHog()
    const { Component } = resolvePricingVariant(posthog?.getFeatureFlag?.(PRICING_PAGE_FLAG)) ?? DEFAULT_PRICING_VARIANT

    return <Component />
}

export default function PricingPageExperiment(): JSX.Element {
    return (
        <RenderInClient
            placeholder={
                <div className="invisible">
                    <DEFAULT_PRICING_VARIANT.Component />
                </div>
            }
            render={() => <VariantSlot />}
        />
    )
}

export { PRICING_VARIANTS, DEFAULT_PRICING_VARIANT, resolvePricingVariant } from './variants'
export type { PricingVariant } from './variants'
