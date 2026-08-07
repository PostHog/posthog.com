import React from 'react'
import { RenderInClient } from 'components/RenderInClient'
import usePostHog from 'hooks/usePostHog'
import { DEFAULT_PRICING_VARIANT, resolvePricingVariant } from './variants'

export const PRICING_PAGE_FLAG = 'pricing-page-redesign'

function VariantSlot({ flagsReady }: { flagsReady: boolean }): JSX.Element {
    const posthog = usePostHog()
    // Before flags land we can't read the flag without risking a hydration mismatch against the
    // server-rendered control, so hold the default until RenderInClient says it's safe.
    const { Component } = flagsReady
        ? resolvePricingVariant(posthog?.getFeatureFlag?.(PRICING_PAGE_FLAG)) ?? DEFAULT_PRICING_VARIANT
        : DEFAULT_PRICING_VARIANT

    return <Component />
}

export default function PricingPageExperiment(): JSX.Element {
    // Both slots render VariantSlot so the element type at this position never changes. Swapping
    // types here would unmount and remount the whole page when flags arrive, throwing away scroll
    // position and calculator/plan state — including for the ~third of visitors on the control
    // arm, whose page doesn't change at all.
    //
    // hidePlaceholder keeps control in the DOM but unpainted until the flag resolves, so the two
    // redesign arms don't flash control first. Everyone pays for that: the page is blank until
    // flags land, control isn't an LCP candidate while hidden, and visitors whose flags never
    // arrive (ad blockers) wait out RenderInClient's timeout before control appears. See the
    // "Why control is the placeholder" section of README.md.
    return (
        <RenderInClient
            placeholder={<VariantSlot flagsReady={false} />}
            hidePlaceholder
            render={() => <VariantSlot flagsReady />}
        />
    )
}

export { PRICING_VARIANTS, DEFAULT_PRICING_VARIANT, resolvePricingVariant } from './variants'
export type { PricingVariant } from './variants'
