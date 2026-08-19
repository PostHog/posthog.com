import React from 'react'
import { RenderInClient } from 'components/shared/layout/RenderInClient'
import usePostHog from '../../../hooks/usePostHog'
import { DEFAULT_HERO_CTA_VARIANT, resolveHeroCtaVariant } from './variants'

export const HERO_CTA_FLAG = 'homepage-cta'

function VariantSlot(): JSX.Element {
    const posthog = usePostHog()
    const { Component, alignsWithHeadline } =
        resolveHeroCtaVariant(posthog?.getFeatureFlag?.(HERO_CTA_FLAG)) ?? DEFAULT_HERO_CTA_VARIANT

    return (
        <div
            {...(alignsWithHeadline ? { 'data-cta-aligned': '' } : {})}
            className="w-full flex flex-col items-center min-w-0"
        >
            <Component />
        </div>
    )
}

/** The CTA slot. Renders nothing until flags resolve, so the hero never shows the wrong variant. */
export default function HeroCTA(): JSX.Element {
    return <RenderInClient render={() => <VariantSlot />} />
}

export { HERO_CTA_VARIANTS, DEFAULT_HERO_CTA_VARIANT, resolveHeroCtaVariant } from './variants'
export type { HeroCtaVariant } from './variants'
