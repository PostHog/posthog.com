import React, { useEffect, useState } from 'react'
import { RenderInClient } from 'components/RenderInClient'
import usePostHog from '../../../hooks/usePostHog'
import { cn } from '../../../utils'
import { DEFAULT_HERO_COPY_VARIANT, resolveHeroCopyVariant } from './variants'
import type { HeroCopyVariant } from './variants'

export const HERO_COPY_FLAG = 'homepage-hero-copy-v2'

/**
 * Takes the assigned variant from the variant map that `onFeatureFlags` passes, and not from
 * `getFeatureFlag`, so a slot never reads the flag while the flag has no value. A read that
 * early makes posthog-js record a `$feature_flag_called` event with an empty response, and the
 * experiment then counts a visitor who has both an empty response and a real variant as
 * `$multiple`. `getFeatureFlag` still runs, but only after a real value exists, because that
 * call is what records the exposure.
 *
 * The first real value wins for the rest of the visit, so a later flag refresh cannot move a
 * visitor from one variant to the other.
 */
function useAssignedVariant(): HeroCopyVariant {
    const posthog = usePostHog()
    const [variant, setVariant] = useState<HeroCopyVariant>()

    useEffect(() => {
        // The snippet stub carries `onFeatureFlags` but not `getFeatureFlag`, and a callback that the
        // stub queues keeps the stub after `array.js` replaces it. Such a callback would paint the
        // assigned copy and record no exposure, so wait for the real SDK. `RenderInClient` renders
        // again when it gets flags, and this effect then subscribes on the real SDK.
        if (!posthog?.onFeatureFlags || typeof posthog.getFeatureFlag !== 'function' || variant) return
        return posthog.onFeatureFlags((_flags: string[], variants?: Record<string, string | boolean>) => {
            const value = variants?.[HERO_COPY_FLAG]
            const assigned = typeof value === 'string' ? resolveHeroCopyVariant(value) : null
            if (!assigned) return
            posthog.getFeatureFlag(HERO_COPY_FLAG)
            setVariant(assigned)
        })
    }, [posthog, variant])

    return variant ?? DEFAULT_HERO_COPY_VARIANT
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

function HeadlineSlot({ className }: { className?: string }): JSX.Element {
    const { headline } = useAssignedVariant()
    return <HeadlineMarkup headline={headline} className={className} />
}

function BodySlot(): JSX.Element {
    const { Body } = useAssignedVariant()
    return <BodyMarkup Body={Body} />
}

/**
 * The headline and the body copy sit in different cells of the hero grid, so they resolve the flag
 * in two slots rather than one. Both read the same flag, so a visitor always gets a matched pair.
 *
 * Unlike the CTA slot, these render the control copy as the placeholder instead of nothing: the
 * hero holds the page's only `h1`, and it has to be in the server-rendered HTML for SEO. The
 * placeholder is invisible so a visitor in the test variant does not see the control copy flash
 * before the assigned variant paints.
 */
export const HeroHeadline = ({ className }: { className?: string }): JSX.Element => (
    <RenderInClient
        placeholder={
            <div className="invisible">
                <HeadlineMarkup headline={DEFAULT_HERO_COPY_VARIANT.headline} className={className} />
            </div>
        }
        render={() => <HeadlineSlot className={className} />}
    />
)

export const HeroBody = (): JSX.Element => (
    <RenderInClient
        placeholder={
            <div className="invisible">
                <BodyMarkup Body={DEFAULT_HERO_COPY_VARIANT.Body} />
            </div>
        }
        render={() => <BodySlot />}
    />
)

export { HERO_COPY_VARIANTS, DEFAULT_HERO_COPY_VARIANT, resolveHeroCopyVariant } from './variants'
export type { HeroCopyVariant } from './variants'
