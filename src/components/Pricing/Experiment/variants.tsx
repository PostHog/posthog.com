import React from 'react'
import ControlPage from './ControlPage'
import RedesignPage from './RedesignPage'

export type PricingVariant = {
    /** Must match the variant key configured on the PostHog flag exactly. */
    id: string
    Component: () => JSX.Element
}

export const PRICING_VARIANTS: PricingVariant[] = [
    {
        id: 'control',
        Component: ControlPage,
    },
    {
        id: 'redesign',
        Component: () => <RedesignPage calculator="section" />,
    },
    {
        id: 'redesign-calculator-minimized',
        Component: () => <RedesignPage calculator="minimized" />,
    },
]

/**
 * Control is the fallback everywhere: server-rendered output, ad-blocked visitors, flags that
 * never arrive, and any variant key we don't recognize.
 */
export const DEFAULT_PRICING_VARIANT = PRICING_VARIANTS[0]

export function resolvePricingVariant(value: string | boolean | null | undefined): PricingVariant | null {
    // A boolean means the flag is deployed as a simple rollout rather than a multivariate
    // experiment, which is a misconfiguration for a 3-way test — fall back rather than guess.
    if (!value || typeof value !== 'string') return null
    const normalized = value.trim().toLowerCase()
    return PRICING_VARIANTS.find(({ id }) => id === normalized) ?? null
}
