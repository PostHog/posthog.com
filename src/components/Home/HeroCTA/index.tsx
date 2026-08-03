import React, { useEffect, useLayoutEffect, useState } from 'react'
import usePostHog from '../../../hooks/usePostHog'
import { DEFAULT_HERO_CTA_VARIANT, resolveHeroCtaVariant, type HeroCtaVariant } from './variants'

export const HERO_CTA_FLAG = 'homepage-cta'

const HeroCtaContext = React.createContext<HeroCtaVariant>(DEFAULT_HERO_CTA_VARIANT)

export function useHeroCtaVariant(): HeroCtaVariant {
    return React.useContext(HeroCtaContext)
}

let hasHydrated = false

/** `useLayoutEffect` warns when it runs during SSR, so fall back to `useEffect` there. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export function HeroCtaProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const posthog = usePostHog()

    const [variant, setVariant] = useState<HeroCtaVariant>(() => {
        if (!hasHydrated) return DEFAULT_HERO_CTA_VARIANT
        return resolveHeroCtaVariant(posthog?.getFeatureFlag?.(HERO_CTA_FLAG)) ?? DEFAULT_HERO_CTA_VARIANT
    })

    // Layout effect, not a passive one: on a cold load the control has to render for hydration, but
    // if the flag is already cached this applies the real variant in the same commit, before the
    // browser paints, so there's no visible swap. When the flag isn't cached yet it changes nothing
    // and the `onFeatureFlags` subscription below picks it up whenever it lands.
    useIsomorphicLayoutEffect(() => {
        hasHydrated = true
        if (!posthog) return
        const assigned = resolveHeroCtaVariant(posthog.getFeatureFlag?.(HERO_CTA_FLAG))
        if (assigned) setVariant(assigned)
    }, [posthog])

    useEffect(() => {
        if (!posthog) return
        const unsubscribe = posthog.onFeatureFlags?.(() => {
            const assigned = resolveHeroCtaVariant(posthog.getFeatureFlag?.(HERO_CTA_FLAG))
            if (assigned) setVariant(assigned)
        }) as unknown
        return typeof unsubscribe === 'function' ? (unsubscribe as () => void) : undefined
    }, [posthog])

    return <HeroCtaContext.Provider value={variant}>{children}</HeroCtaContext.Provider>
}

/** The CTA slot itself. Must be rendered inside `HeroCtaProvider`. */
export default function HeroCTA(): JSX.Element {
    const { Component } = useHeroCtaVariant()

    return (
        <div className="w-full flex flex-col items-center min-w-0">
            <Component />
        </div>
    )
}

export { HERO_CTA_VARIANTS, DEFAULT_HERO_CTA_VARIANT, resolveHeroCtaVariant } from './variants'
export type { HeroCtaVariant } from './variants'
