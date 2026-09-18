import React from 'react'
import { HERO_CTA_VARIANTS } from './variants'

export default function HeroCTA(): JSX.Element {
    const { Component, alignsWithHeadline } = HERO_CTA_VARIANTS.find(({ id }) => id === 'card-no-command')!

    return (
        <div
            {...(alignsWithHeadline ? { 'data-cta-aligned': '' } : {})}
            className="w-full flex flex-col items-center min-w-0"
        >
            <Component />
        </div>
    )
}

export { HERO_CTA_VARIANTS, DEFAULT_HERO_CTA_VARIANT, resolveHeroCtaVariant } from './variants'
export type { HeroCtaVariant } from './variants'
