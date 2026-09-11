import React, { createContext, useContext, useEffect, useState } from 'react'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { cn } from '../../../utils'
import { DEFAULT_HERO_COPY_VARIANT, HERO_COPY_VARIANTS, resolveHeroCopyVariant } from './variants'
import type { HeroCopyVariant } from './variants'

const HERO_PARAM = 'hero'

type HeroCopyContextValue = {
    variant: HeroCopyVariant
    setVariantId: (id: string) => void
}

const HeroCopyContext = createContext<HeroCopyContextValue | null>(null)

function readHeroParam(): string | null {
    if (typeof window === 'undefined') return null
    return new URLSearchParams(window.location.search).get(HERO_PARAM)
}

function writeHeroParam(id: string) {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    url.searchParams.set(HERO_PARAM, id)
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
}

export function HeroCopyProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [variantId, setVariantIdState] = useState(DEFAULT_HERO_COPY_VARIANT.id)

    useEffect(() => {
        const fromUrl = resolveHeroCopyVariant(readHeroParam())
        if (fromUrl) setVariantIdState(fromUrl.id)
    }, [])

    const setVariantId = (id: string) => {
        if (!resolveHeroCopyVariant(id)) return
        setVariantIdState(id)
        writeHeroParam(id)
    }

    const variant = resolveHeroCopyVariant(variantId) ?? DEFAULT_HERO_COPY_VARIANT

    return <HeroCopyContext.Provider value={{ variant, setVariantId }}>{children}</HeroCopyContext.Provider>
}

function useHeroCopy(): HeroCopyContextValue {
    return (
        useContext(HeroCopyContext) ?? {
            variant: DEFAULT_HERO_COPY_VARIANT,
            setVariantId: () => undefined,
        }
    )
}

export const HeroCopySwitcher = (): JSX.Element => {
    const { variant, setVariantId } = useHeroCopy()

    return (
        <div className="absolute bottom-0 right-0 z-50 print:hidden not-prose" data-scheme="primary">
            <div className="group p-3">
                <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <ToggleGroup
                        title="Hero copy"
                        hideTitle
                        size="sm"
                        className="shadow-md [&_button]:whitespace-nowrap [&_button]:px-2"
                        value={variant.id}
                        onValueChange={setVariantId}
                        options={HERO_COPY_VARIANTS.map(({ id, label }) => ({ label, value: id }))}
                    />
                </div>
            </div>
        </div>
    )
}

const HeadlineMarkup = ({ headline, className }: { headline: HeroCopyVariant['headline']; className?: string }) => (
    <h1 className={cn('!text-3xl @xl:!text-4xl mt-0', className)}>
        {headline.lead}{' '}
        <span className="bg-blue/10 dark:bg-blue/20 text-blue rounded-md px-1 @xl:whitespace-nowrap">
            {headline.emphasis}
        </span>
    </h1>
)

const BodyMarkup = ({ Body }: { Body: HeroCopyVariant['Body'] }) => (
    <>
        <Body />
        <p className="text-balance @xl:text-wrap text-secondary">Join 500,000+ teams already shipping with PostHog.</p>
    </>
)

export const HeroHeadline = ({ className }: { className?: string }): JSX.Element => {
    const { variant } = useHeroCopy()
    return <HeadlineMarkup key={variant.id} headline={variant.headline} className={className} />
}

export const HeroBody = (): JSX.Element => {
    const { variant } = useHeroCopy()
    return <BodyMarkup key={variant.id} Body={variant.Body} />
}

export { HERO_COPY_VARIANTS, DEFAULT_HERO_COPY_VARIANT, resolveHeroCopyVariant } from './variants'
export type { HeroCopyVariant } from './variants'
