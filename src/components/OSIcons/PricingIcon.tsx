import React, { useEffect, useState } from 'react'
import usePostHog from 'hooks/usePostHog'
import GlassIcon, { type GlyphPart } from './GlassIcon'
import {
    PRICING_DOLLAR_CUTOUT,
    PRICING_EURO_CUTOUT,
    PRICING_FRONT_DETAIL_SILHOUETTE,
    PRICING_FRONT_SILHOUETTE,
    PRICING_POUND_CUTOUT,
    PRICING_REAR_DETAIL_SILHOUETTE,
    PRICING_REAR_SILHOUETTE,
} from './glyphs'

const FLAG = 'pricing-currency'
type Currency = 'dollar' | 'pound' | 'euro'

const createPricingPaths = (cutout: string): GlyphPart[] => [
    { d: PRICING_REAR_SILHOUETTE },
    { d: PRICING_REAR_DETAIL_SILHOUETTE },
    { d: `${PRICING_FRONT_SILHOUETTE} ${cutout}`, fillRule: 'evenodd' },
    { d: `${PRICING_FRONT_DETAIL_SILHOUETTE} ${cutout}`, fillRule: 'evenodd' },
]

const PRICING_PATHS: Record<Currency, GlyphPart[]> = {
    dollar: createPricingPaths(PRICING_DOLLAR_CUTOUT),
    pound: createPricingPaths(PRICING_POUND_CUTOUT),
    euro: createPricingPaths(PRICING_EURO_CUTOUT),
}

interface PricingIconProps {
    className?: string
}

/**
 * The pricing desktop icon — a stack of bills whose currency symbol ($/£/€) matches the
 * visitor's location. The country → currency mapping lives in the PostHog multivariate
 * flag `pricing-currency` (GB → pound, eurozone → euro, else dollar); here we just read
 * the assigned variant and select the matching silhouette. Defaults to dollar until flags
 * resolve (and if they never do, e.g. blocked by an ad-blocker). The stack is rendered by
 * `GlassIcon`, so its fill, bevel, shadow, frost, and hover treatment match the other icons.
 */
export default function PricingIcon({ className = '' }: PricingIconProps) {
    const posthog = usePostHog()
    const [currency, setCurrency] = useState<Currency>('dollar')

    useEffect(() => {
        if (!posthog) return
        const update = () => {
            const variant = posthog.getFeatureFlag?.(FLAG)
            if (variant === 'pound' || variant === 'euro' || variant === 'dollar') {
                setCurrency(variant)
            }
        }
        update()
        posthog.onFeatureFlags?.(update)
    }, [posthog])

    return <GlassIcon path={PRICING_PATHS[currency]} className={className} />
}
