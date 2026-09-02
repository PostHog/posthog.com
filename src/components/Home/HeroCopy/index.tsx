import React from 'react'
import { RenderInClient } from 'components/RenderInClient'
import usePostHog from '../../../hooks/usePostHog'
import { cn } from '../../../utils'
import { DEFAULT_HERO_COPY_VARIANT, resolveHeroCopyVariant } from './variants'
import type { HeroCopyVariant } from './variants'

export const HERO_COPY_FLAG = 'homepage-hero-copy'

function assignedVariant(posthog: ReturnType<typeof usePostHog>): HeroCopyVariant {
    return resolveHeroCopyVariant(posthog?.getFeatureFlag?.(HERO_COPY_FLAG)) ?? DEFAULT_HERO_COPY_VARIANT
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
    return <HeadlineMarkup headline={assignedVariant(usePostHog()).headline} className={className} />
}

function BodySlot(): JSX.Element {
    return <BodyMarkup Body={assignedVariant(usePostHog()).Body} />
}

/**
 * The headline and the body copy sit in different cells of the hero grid, so they resolve the flag
 * in two slots rather than one. Both read the same flag, so a visitor always gets a matched pair.
 *
 * Unlike the CTA slot, these render the control copy as the placeholder instead of nothing: the
 * hero holds the page's only `h1`, and it has to be in the server-rendered HTML for SEO. The cost
 * is that a visitor in a test variant sees control copy until flags resolve, then sees it swap.
 */
export const HeroHeadline = ({ className }: { className?: string }): JSX.Element => (
    <RenderInClient
        placeholder={<HeadlineMarkup headline={DEFAULT_HERO_COPY_VARIANT.headline} className={className} />}
        render={() => <HeadlineSlot className={className} />}
    />
)

export const HeroBody = (): JSX.Element => (
    <RenderInClient placeholder={<BodyMarkup Body={DEFAULT_HERO_COPY_VARIANT.Body} />} render={() => <BodySlot />} />
)

export { HERO_COPY_VARIANTS, DEFAULT_HERO_COPY_VARIANT, resolveHeroCopyVariant } from './variants'
export type { HeroCopyVariant } from './variants'
